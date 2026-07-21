import { useQuery } from "@tanstack/react-query";
import { GlobalStatsResponse } from "@/types/stats";

export function useStats() {
  const { data: stats, isLoading, error } = useQuery<GlobalStatsResponse>({
    queryKey: ["global-stats"],
    queryFn: async () => {
      const res = await fetch("/api/stats");
      if (!res.ok) {
        throw new Error("Failed to fetch stats");
      }
      return res.json();
    },
    staleTime: 30 * 1000, // Refetch every 30 seconds
    refetchInterval: 30 * 1000,
  });

  return {
    stats,
    isLoading,
    error,
  };
}
