import {
  FileText,
  Calendar,
  Clock,
  Eye,
  Lock,
  ShieldAlert,
} from "lucide-react";
import { PasteResponse } from "@/hooks/usePasteView";

interface PasteMetadataProps {
  id: string;
  activePaste: PasteResponse;
  getRelativeExpiry: (expiresAt: string) => string;
}

export function PasteMetadata({
  id,
  activePaste,
  getRelativeExpiry,
}: PasteMetadataProps) {
  return (
    <div className="w-full bg-[#f6f8fa] border border-[#d0d7de] rounded-lg p-4 mb-4 flex flex-wrap gap-4 items-center justify-between text-xxs text-[#57606a]">
      <div className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-md border border-[#d0d7de] font-mono text-[#24292f]">
        <FileText className="h-3.5 w-3.5 text-[#57606a]" />
        <span>id: {id}</span>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 text-[#57606a]" />
          <span>
            Created: {new Date(activePaste.createdAt).toLocaleDateString()}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-[#57606a]" />
          <span>
            {getRelativeExpiry(activePaste.expiresAt) === "Vaporized"
              ? "Vaporized"
              : `Vaporizes ${getRelativeExpiry(activePaste.expiresAt)}`}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <Eye className="h-3.5 w-3.5 text-[#57606a]" />
          <span>
            {activePaste.views} view{activePaste.views !== 1 ? "s" : ""}
          </span>
        </div>

        {activePaste.locked && (
          <div className="flex items-center gap-1 bg-white text-[#24292f] border border-[#d0d7de] px-2 py-0.5 rounded-md">
            <Lock className="h-3 w-3 text-[#57606a]" />
            <span>Locked</span>
          </div>
        )}

        {activePaste.ipRestricted && (
          <div className="flex items-center gap-1 bg-white text-[#cf222e] border border-[#ffc0c0] px-2 py-0.5 rounded-md">
            <ShieldAlert className="h-3 w-3 text-[#cf222e]" />
            <span>IP Restricted</span>
          </div>
        )}
      </div>
    </div>
  );
}
