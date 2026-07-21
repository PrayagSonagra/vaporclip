import Link from "next/link";
import { ShieldAlert, FileQuestion } from "lucide-react";

interface PasteErrorViewProps {
  isLoading: boolean;
  error?: any;
  paste?: any;
  refetch: () => void;
}

export function PasteErrorView({
  isLoading,
  error,
  paste,
  refetch,
}: PasteErrorViewProps) {
  if (isLoading) {
    return (
      <div className="w-full flex flex-col gap-6 animate-pulse">
        <div className="flex justify-between items-center mb-4">
          <div className="h-9 w-48 bg-white border border-[#d0d7de] rounded-md" />
          <div className="h-9 w-24 bg-white border border-[#d0d7de] rounded-md" />
        </div>
        <div className="h-96 w-full bg-white border border-[#d0d7de] rounded-md" />
      </div>
    );
  }

  if (error || (paste && paste.error)) {
    const errorMsg = error?.message || paste?.error || "Error retrieving paste.";
    const is403 =
      errorMsg.includes("IP restriction") || errorMsg.includes("Access denied");

    return (
      <div className="w-full bg-white border border-[#d0d7de] p-8 sm:p-10 rounded-lg text-left">
        <div className="bg-[#ffebe9] border border-[#ffc0c0] text-[#cf222e] p-3 rounded-lg w-10 h-10 flex items-center justify-center mb-6">
          <ShieldAlert className="h-5 w-5" />
        </div>
        <h2 className="text-base font-semibold text-[#24292f] mb-2">
          {is403 ? "Access Restricted" : "Clip Vaporized"}
        </h2>
        <p className="text-xs text-[#57606a] mb-6 leading-relaxed">
          {is403 ? errorMsg : "This clip has vaporized."}
        </p>
        <div className="flex gap-3 justify-start">
          <Link
            href="/"
            className="px-3.5 py-1.5 rounded-md bg-white border border-[#d0d7de] hover:bg-[#f6f8fa] hover:border-[#afb8c1] text-[#24292f] text-xs font-medium transition-colors"
          >
            Back to Home
          </Link>
          <button
            onClick={() => refetch()}
            className="px-3.5 py-1.5 rounded-md bg-[#0891b2] hover:bg-[#0e7490] text-white text-xs font-medium transition-colors cursor-pointer"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!paste) {
    return (
      <div className="w-full bg-white border border-[#d0d7de] p-8 sm:p-10 rounded-lg text-left">
        <FileQuestion className="h-8 w-8 text-[#57606a] mb-4" />
        <p className="text-[#24292f] text-xs">Failed to retrieve clip info.</p>
      </div>
    );
  }

  return null;
}
