import { connectToDatabase } from "@/lib/mongodb";
import { nanoid } from "@/lib/nanoid";
import { sanitizeHtml } from "@/lib/sanitize";
import bcrypt from "bcryptjs";
import { PasteDocument, CreatePasteParams, PasteResponseData } from "@/types/paste";
import { incrementPastesCreatedInDb, incrementViewsInDb } from "./statsService";

export async function createPasteInDb(params: CreatePasteParams): Promise<string> {
  const { contentHtml, expiry, ipRestricted, password, creatorIp } = params;

  if (!contentHtml || typeof contentHtml !== "string" || contentHtml.trim() === "") {
    throw new Error("Paste content cannot be empty.");
  }

  // 1. Sanitize HTML
  const cleanHtml = sanitizeHtml(contentHtml);

  // 2. Generate unique secure random ID
  const id = nanoid();

  // 3. Compute expiration date
  let durationMs = 24 * 60 * 60 * 1000;
  if (expiry === "1h") {
    durationMs = 60 * 60 * 1000;
  } else if (expiry === "1d") {
    durationMs = 24 * 60 * 60 * 1000;
  } else if (expiry === "30d") {
    durationMs = 30 * 24 * 60 * 60 * 1000;
  }
  const expiresAt = new Date(Date.now() + durationMs);

  // 4. Handle password hashing if protected
  const locked = !!password && password.trim().length > 0;
  let passwordHash: string | undefined = undefined;
  if (locked) {
    passwordHash = await bcrypt.hash(password, 10);
  }

  // 5. Connect and save to MongoDB
  const { db } = await connectToDatabase();
  const paste: PasteDocument = {
    _id: id,
    contentHtml: cleanHtml,
    createdAt: new Date(),
    expiresAt,
    creatorIp,
    ipRestricted: !!ipRestricted,
    locked,
    ...(passwordHash && { passwordHash }),
    views: 0,
  };

  await db.collection<PasteDocument>("pastes").insertOne(paste);

  // 6. Update global stats counter
  await incrementPastesCreatedInDb();

  return id;
}

export async function getPasteByIdFromDb(
  id: string,
  clientIp: string
): Promise<{ status: number; data?: PasteResponseData; error?: string }> {
  const { db } = await connectToDatabase();
  const paste = await db.collection<PasteDocument>("pastes").findOne({ _id: id });

  if (!paste) {
    return { status: 404, error: "Paste not found." };
  }

  // IP restriction check
  if (paste.ipRestricted && paste.creatorIp !== clientIp) {
    return {
      status: 403,
      error: "Access denied: Creator IP restriction in place.",
    };
  }

  // Password locking check
  if (paste.locked) {
    return {
      status: 200,
      data: {
        _id: paste._id,
        locked: true,
        createdAt: paste.createdAt,
        expiresAt: paste.expiresAt,
        ipRestricted: paste.ipRestricted,
        views: paste.views,
        reported: !!paste.reported,
      },
    };
  }

  // Increment view counts on paste & global stats
  await Promise.all([
    db.collection<PasteDocument>("pastes").updateOne({ _id: id }, { $inc: { views: 1 } }),
    incrementViewsInDb(),
  ]);

  return {
    status: 200,
    data: {
      _id: paste._id,
      locked: false,
      contentHtml: sanitizeHtml(paste.contentHtml),
      createdAt: paste.createdAt,
      expiresAt: paste.expiresAt,
      ipRestricted: paste.ipRestricted,
      views: paste.views + 1,
      reported: !!paste.reported,
    },
  };
}

export async function unlockPasteWithPasswordInDb(
  id: string,
  passwordInput: string,
  clientIp: string
): Promise<{ status: number; data?: PasteResponseData; error?: string }> {
  const { db } = await connectToDatabase();
  const paste = await db.collection<PasteDocument>("pastes").findOne({ _id: id });

  if (!paste) {
    return { status: 404, error: "Paste not found." };
  }

  // IP restriction check
  if (paste.ipRestricted && paste.creatorIp !== clientIp) {
    return {
      status: 403,
      error: "Access denied: Creator IP restriction in place.",
    };
  }

  if (!paste.locked) {
    return {
      status: 200,
      data: {
        _id: paste._id,
        locked: false,
        contentHtml: sanitizeHtml(paste.contentHtml),
        createdAt: paste.createdAt,
        expiresAt: paste.expiresAt,
        ipRestricted: paste.ipRestricted,
        views: paste.views,
        reported: !!paste.reported,
      },
    };
  }

  if (!passwordInput) {
    return { status: 400, error: "Password is required to unlock this paste." };
  }

  const match = await bcrypt.compare(passwordInput, paste.passwordHash || "");
  if (!match) {
    return { status: 401, error: "Incorrect password." };
  }

  // Increment view count on paste & global stats
  await Promise.all([
    db.collection<PasteDocument>("pastes").updateOne({ _id: id }, { $inc: { views: 1 } }),
    incrementViewsInDb(),
  ]);

  return {
    status: 200,
    data: {
      _id: paste._id,
      locked: true,
      unlocked: true,
      contentHtml: sanitizeHtml(paste.contentHtml),
      createdAt: paste.createdAt,
      expiresAt: paste.expiresAt,
      ipRestricted: paste.ipRestricted,
      views: paste.views + 1,
      reported: !!paste.reported,
    },
  };
}

export async function reportPasteInDb(
  id: string
): Promise<{ status: number; success?: boolean; error?: string; message?: string }> {
  const { db } = await connectToDatabase();
  const paste = await db.collection<PasteDocument>("pastes").findOne({ _id: id });

  if (!paste) {
    return { status: 404, error: "Clip not found." };
  }

  await db.collection<PasteDocument>("pastes").updateOne(
    { _id: id },
    {
      $set: { reported: true, reportedAt: new Date() },
      $inc: { reportCount: 1 },
    }
  );

  return {
    status: 200,
    success: true,
    message: "This clip has been reported for review.",
  };
}
