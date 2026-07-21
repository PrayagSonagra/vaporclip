import Link from "next/link";
import { Plus, Copy, Check } from "lucide-react";
import { VaporClipLogo } from "@/components/VaporClipLogo";

interface PasteHeaderControlsProps {
  copied: boolean;
  handleCopyLink: () => void;
}

export function PasteHeaderControls({
  copied,
  handleCopyLink,
}: PasteHeaderControlsProps) {
  return (
    <header className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">
      <VaporClipLogo size="sm" showTagline={true} />
      <div className="flex items-center gap-3 self-start sm:self-auto">
        <Link
          href="/"
          className="px-3 py-1.5 rounded-md bg-[#f6f8fa] border border-[#d0d7de] hover:bg-white hover:border-[#afb8c1] text-[#24292f] text-xxs font-medium transition-colors flex items-center gap-1 cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5 text-[#2563eb]" />
          <span>New Clip</span>
        </Link>
        <button
          onClick={handleCopyLink}
          className="px-3.5 py-1.5 rounded-md bg-white border border-[#d0d7de] hover:bg-[#f6f8fa] hover:border-[#afb8c1] text-[#24292f] text-xxs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-[#24292f]" />
              <span className="text-[#24292f]">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 text-[#57606a]" />
              <span>Copy Share Link</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
}
