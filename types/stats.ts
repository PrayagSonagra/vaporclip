export interface GlobalStatsDoc {
  _id: "global_stats";
  totalPastesCreated: number;
  totalViews: number;
  updatedAt?: Date;
}

export interface GlobalStatsResponse {
  totalPastesCreated: number;
  totalViews: number;
  activePastes: number;
  timestamp: string;
}
