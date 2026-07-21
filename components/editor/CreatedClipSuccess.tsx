import NextLink from "next/link";
import { Check } from "lucide-react";

interface CreatedClipSuccessProps {
  createdClipId: string;
  copiedLink: boolean;
  handleCopyLinkManual: () => void;
  handleResetEditor: () => void;
}

export function CreatedClipSuccess({
  createdClipId,
  copiedLink,
  handleCopyLinkManual,
  handleResetEditor,
}: CreatedClipSuccessProps) {
  const shareUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/p/${createdClipId}`;

  return (
    <div className="w-full bg-white border border-[#d0d7de] p-6 rounded-lg text-left animate-condense">
      <h2 className="text-sm font-semibold text-[#24292f] flex items-center gap-1.5 mb-2">
        <Check className="h-4 w-4 text-cyan-600" />
        <span>Clip Vaporized</span>
      </h2>
      <p className="text-xs text-[#57606a] mb-6 leading-relaxed">
        Your clip is now live and stored securely. Anyone with the link can view
        it until it vaporizes.
      </p>

      <div className="relative mt-2 flex items-center gap-2 w-full">
        <input
          type="text"
          readOnly
          value={shareUrl}
          className="w-full bg-[#f6f8fa] border border-[#d0d7de] rounded-md px-3 py-2 text-xs font-mono text-[#24292f] outline-none"
          onClick={(e) => (e.target as HTMLInputElement).select()}
        />
        <button
          type="button"
          onClick={handleCopyLinkManual}
          className="px-3 py-1.5 rounded-md bg-white border border-[#d0d7de] hover:bg-[#f6f8fa] hover:border-[#afb8c1] text-[#24292f] text-xs font-medium cursor-pointer transition-colors whitespace-nowrap"
        >
          {copiedLink ? "Copied" : "Copy Link"}
        </button>
      </div>

      <div className="flex gap-3 mt-6">
        <NextLink
          href={`/p/${createdClipId}`}
          className="px-4 py-2 rounded-md bg-[#0891b2] hover:bg-[#0e7490] text-white text-xs font-medium transition-colors"
        >
          View Clip
        </NextLink>
        <button
          type="button"
          onClick={handleResetEditor}
          className="px-4 py-2 rounded-md bg-white border border-[#d0d7de] hover:bg-[#f6f8fa] hover:border-[#afb8c1] text-[#24292f] text-xs font-medium transition-colors"
        >
          Create New Clip
        </button>
      </div>
    </div>
  );
}
