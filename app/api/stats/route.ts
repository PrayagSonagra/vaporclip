import { NextRequest, NextResponse } from "next/server";
import { getGlobalStatsFromDb } from "@/services/statsService";

export async function GET(req: NextRequest) {
  try {
    const stats = await getGlobalStatsFromDb();

    return NextResponse.json(stats, {
      status: 200,
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error: any) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch global statistics." },
      { status: 500 }
    );
  }
}
