"use client";

import { FileText, Eye, Flame } from "lucide-react";
import { useStats } from "@/hooks/useStats";
import { VaporClipLogo } from "@/components/VaporClipLogo";

export function Header() {
  const { stats, isLoading } = useStats();

  return (
    <header className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">
      <VaporClipLogo size="md" showTagline={true} />

      {/* Live Global Statistics Badges */}
      <div className="flex items-center gap-2 bg-[#f6f8fa] border border-[#d0d7de] px-3 py-1.5 rounded-lg text-xxs font-mono text-[#57606a]">
        {isLoading ? (
          <div className="h-4 w-32 bg-white rounded animate-pulse" />
        ) : (
          <>
            <div className="flex items-center gap-1.5 hover:text-[#24292f] transition-colors" title="Total clips created">
              <FileText className="h-3 w-3 text-[#0891b2]" />
              <span className="font-semibold text-[#24292f]">
                {stats?.totalPastesCreated.toLocaleString() || 0}
              </span>
              <span>clips</span>
            </div>

            <div className="w-px h-3 bg-[#d0d7de]" />

            <div className="flex items-center gap-1.5 hover:text-[#24292f] transition-colors" title="Total views">
              <Eye className="h-3 w-3 text-emerald-600" />
              <span className="font-semibold text-[#24292f]">
                {stats?.totalViews.toLocaleString() || 0}
              </span>
              <span>views</span>
            </div>

            <div className="w-px h-3 bg-[#d0d7de]" />

            <div className="flex items-center gap-1.5 hover:text-[#24292f] transition-colors" title="Active live clips">
              <Flame className="h-3 w-3 text-amber-500" />
              <span className="font-semibold text-[#24292f]">
                {stats?.activePastes.toLocaleString() || 0}
              </span>
              <span>active</span>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
