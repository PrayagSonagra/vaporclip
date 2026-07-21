import { NextRequest, NextResponse } from "next/server";
import { getClientIp } from "@/lib/http";
import { isAllowed } from "@/lib/rateLimit";
import { reportPasteInDb } from "@/services/pasteService";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const ip = getClientIp(req);

  // Rate Limiting: 5 report submissions per minute per IP
  if (!isAllowed(`report:${ip}`, 5, 60000)) {
    return NextResponse.json(
      { error: "Too many report requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const result = await reportPasteInDb(id);

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    return NextResponse.json(
      { success: result.success, message: result.message },
      { status: result.status }
    );
  } catch (error: any) {
    console.error("Error reporting clip:", error);
    return NextResponse.json(
      { error: "Failed to submit clip report." },
      { status: 500 }
    );
  }
}
