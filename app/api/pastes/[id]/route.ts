import { NextRequest, NextResponse } from "next/server";
import { getClientIp } from "@/lib/http";
import { getPasteByIdFromDb, unlockPasteWithPasswordInDb } from "@/services/pasteService";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const ip = getClientIp(req);

  try {
    const result = await getPasteByIdFromDb(id, ip);

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    return NextResponse.json(result.data, { status: result.status });
  } catch (error: any) {
    console.error("Error fetching paste:", error);
    return NextResponse.json({ error: "Failed to fetch paste." }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const ip = getClientIp(req);

  try {
    const body = await req.json();
    const { password } = body;

    const result = await unlockPasteWithPasswordInDb(id, password, ip);

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    return NextResponse.json(result.data, { status: result.status });
  } catch (error: any) {
    console.error("Error unlocking paste:", error);
    return NextResponse.json({ error: "Failed to unlock paste." }, { status: 500 });
  }
}
