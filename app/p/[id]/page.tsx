"use client";

import { use } from "react";
import { usePasteView } from "@/hooks/usePasteView";
import { Footer } from "@/components/Footer";
import { PasteErrorView } from "@/components/paste-view/PasteErrorView";
import { PasswordGate } from "@/components/paste-view/PasswordGate";
import { PasteHeaderControls } from "@/components/paste-view/PasteHeaderControls";
import { PasteMetadata } from "@/components/paste-view/PasteMetadata";
import { PasteContentViewer } from "@/components/paste-view/PasteContentViewer";

export default function PasteViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const {
    paste,
    isLoading,
    error,
    refetch,
    password,
    setPassword,
    copied,
    isReported,
    isReporting,
    unlockError,
    handleUnlockSubmit,
    handleReportSubmit,
    handleCopyLink,
    getRelativeExpiry,
    isUnlocking,
    clientSanitizedHtml,
  } = usePasteView(id);

  return (
    <div className="flex-1 w-full px-6 sm:px-8 py-8 flex flex-col justify-between min-h-screen text-[#24292f]">
      <meta name="robots" content="noindex" />

      <PasteHeaderControls copied={copied} handleCopyLink={handleCopyLink} />

      <main className="flex-1 flex flex-col items-start w-full">
        {isLoading || error || !paste || (paste && paste.error) ? (
          <PasteErrorView
            isLoading={isLoading}
            error={error}
            paste={paste}
            refetch={refetch}
          />
        ) : paste.locked && !paste.contentHtml ? (
          <PasswordGate
            password={password}
            setPassword={setPassword}
            unlockError={unlockError}
            isUnlocking={isUnlocking}
            handleUnlockSubmit={handleUnlockSubmit}
          />
        ) : (
          <>
            <PasteMetadata
              id={id}
              activePaste={paste}
              getRelativeExpiry={getRelativeExpiry}
            />
            <PasteContentViewer
              clientSanitizedHtml={clientSanitizedHtml}
              isReported={isReported}
              isReporting={isReporting}
              handleReportSubmit={handleReportSubmit}
            />
          </>
        )}
      </main>

      <Footer customText="Privately hosted, zero logs." />
    </div>
  );
}
