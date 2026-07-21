"use client";

import { useEditorState } from "@/hooks/useEditorState";
import { useCreatePaste } from "@/hooks/useCreatePaste";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toast } from "@/components/Toast";
import { CreatedClipSuccess } from "@/components/editor/CreatedClipSuccess";
import { EditorWorkspace } from "@/components/editor/EditorWorkspace";

export default function Home() {
  const {
    editorRef,
    fileInputRef,
    isEmpty,
    checkIsEmpty,
    execCmd,
    handleLink,
    handleImageUpload,
    handlePaste,
    handleDrop,
    handleDragOver,
    resetEditorContent,
  } = useEditorState();

  const {
    expiry,
    setExpiry,
    ipRestricted,
    setIpRestricted,
    passwordProtected,
    setPasswordProtected,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    errorMsg,
    createdClipId,
    isEvaporating,
    toastMessage,
    copiedLink,
    handleCopyLinkManual,
    handleResetEditor,
    handleSubmit,
    isPending,
  } = useCreatePaste(editorRef, isEmpty, resetEditorContent);

  return (
    <div className="flex-1 w-full px-6 sm:px-8 py-8 flex flex-col justify-between min-h-screen text-[#24292f]">
      <Header />

      <main className="flex-1 flex flex-col items-start w-full">
        {createdClipId ? (
          <CreatedClipSuccess
            createdClipId={createdClipId}
            copiedLink={copiedLink}
            handleCopyLinkManual={handleCopyLinkManual}
            handleResetEditor={handleResetEditor}
          />
        ) : (
          <EditorWorkspace
            editorRef={editorRef}
            fileInputRef={fileInputRef}
            isEmpty={isEmpty}
            isEvaporating={isEvaporating}
            errorMsg={errorMsg}
            isPending={isPending}
            checkIsEmpty={checkIsEmpty}
            execCmd={execCmd}
            handleLink={handleLink}
            handleImageUpload={handleImageUpload}
            handlePaste={handlePaste}
            handleDrop={handleDrop}
            handleDragOver={handleDragOver}
            handleSubmit={handleSubmit}
            expiry={expiry}
            setExpiry={setExpiry}
            ipRestricted={ipRestricted}
            setIpRestricted={setIpRestricted}
            passwordProtected={passwordProtected}
            setPasswordProtected={setPasswordProtected}
            password={password}
            setPassword={setPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        )}
      </main>

      <Toast message={toastMessage} />
      <Footer />
    </div>
  );
}
