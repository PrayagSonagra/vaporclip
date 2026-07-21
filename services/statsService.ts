import { connectToDatabase } from "@/lib/mongodb";
import { GlobalStatsDoc, GlobalStatsResponse } from "@/types/stats";

export async function getGlobalStatsFromDb(): Promise<GlobalStatsResponse> {
  const { db } = await connectToDatabase();

  const statsDoc = await db
    .collection<GlobalStatsDoc>("stats")
    .findOne({ _id: "global_stats" as any });

  const activePastes = await db.collection("pastes").countDocuments({
    expiresAt: { $gt: new Date() },
  });

  return {
    totalPastesCreated: statsDoc?.totalPastesCreated || 0,
    totalViews: statsDoc?.totalViews || 0,
    activePastes,
    timestamp: new Date().toISOString(),
  };
}

export async function incrementPastesCreatedInDb(): Promise<void> {
  const { db } = await connectToDatabase();
  await db.collection<GlobalStatsDoc>("stats").updateOne(
    { _id: "global_stats" as any },
    {
      $inc: { totalPastesCreated: 1 },
      $set: { updatedAt: new Date() },
    },
    { upsert: true }
  );
}

export async function incrementViewsInDb(): Promise<void> {
  const { db } = await connectToDatabase();
  await db.collection<GlobalStatsDoc>("stats").updateOne(
    { _id: "global_stats" as any },
    {
      $inc: { totalViews: 1 },
      $set: { updatedAt: new Date() },
    },
    { upsert: true }
  );
}
