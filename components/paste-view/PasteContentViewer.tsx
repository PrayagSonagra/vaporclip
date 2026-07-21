import { AlertTriangle } from "lucide-react";

interface PasteContentViewerProps {
  clientSanitizedHtml: string;
  isReported: boolean;
  isReporting: boolean;
  handleReportSubmit: () => void;
}

export function PasteContentViewer({
  clientSanitizedHtml,
  isReported,
  isReporting,
  handleReportSubmit,
}: PasteContentViewerProps) {
  return (
    <>
      {/* Content Viewer */}
      <article className="w-full bg-white border border-[#d0d7de] rounded-lg p-6 sm:p-8 min-h-[300px] text-[#24292f] overflow-hidden">
        <div
          className="tiptap-content prose prose-zinc max-w-none w-full overflow-x-auto break-words"
          dangerouslySetInnerHTML={{ __html: clientSanitizedHtml }}
        />
      </article>

      {/* Footer controls & Report */}
      <div className="w-full mt-6 flex justify-between items-center text-xxs text-[#57606a]">
        <div>
          {isReported ? (
            <span className="text-[#cf222e] flex items-center gap-1.5 font-medium">
              <AlertTriangle className="h-4 w-4" />
              <span>This clip has been reported for review.</span>
            </span>
          ) : (
            <button
              onClick={handleReportSubmit}
              disabled={isReporting}
              className="hover:text-[#cf222e] transition-colors flex items-center gap-1.5 cursor-pointer hover:underline disabled:opacity-50"
            >
              {isReporting ? (
                <>
                  <div className="w-3 h-3 border-2 border-[#57606a]/30 border-t-[#cf222e] rounded-full animate-spin" />
                  <span>Reporting clip...</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="h-3.5 w-3.5 text-[#57606a]" />
                  <span>Report this clip</span>
                </>
              )}
            </button>
          )}
        </div>
        <div>
          <span>Content is rendering in a secure, sandboxed container.</span>
        </div>
      </div>
    </>
  );
}
