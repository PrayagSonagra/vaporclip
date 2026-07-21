import { NextRequest, NextResponse } from "next/server";
import { getClientIp } from "@/lib/http";
import { isAllowed } from "@/lib/rateLimit";
import { createPasteInDb } from "@/services/pasteService";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);

  // Rate Limiting: 5 requests per minute
  if (!isAllowed(ip, 5, 60000)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a minute." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const { contentHtml, expiry, ipRestricted, password } = body;

    const id = await createPasteInDb({
      contentHtml,
      expiry,
      ipRestricted,
      password,
      creatorIp: ip,
    });

    return NextResponse.json({ id, url: `/p/${id}` }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating paste:", error);
    const status = error.message === "Paste content cannot be empty." ? 400 : 500;
    return NextResponse.json({ error: error.message || "Failed to create paste." }, { status });
  }
}
