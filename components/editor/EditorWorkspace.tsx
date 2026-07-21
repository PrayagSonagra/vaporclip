import { EditorToolbar } from "./EditorToolbar";
import { OptionsPanel } from "./OptionsPanel";

interface EditorWorkspaceProps {
  editorRef: React.RefObject<HTMLDivElement | null>;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  isEmpty: boolean;
  isEvaporating: boolean;
  errorMsg: string;
  isPending: boolean;
  checkIsEmpty: () => void;
  execCmd: (command: string, value?: string) => void;
  handleLink: () => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePaste: (e: React.ClipboardEvent) => void;
  handleDrop: (e: React.DragEvent) => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleSubmit: (e: React.FormEvent) => void;
  expiry: "1h" | "1d" | "30d";
  setExpiry: (val: "1h" | "1d" | "30d") => void;
  ipRestricted: boolean;
  setIpRestricted: (val: boolean) => void;
  passwordProtected: boolean;
  setPasswordProtected: (val: boolean) => void;
  password: string;
  setPassword: (val: string) => void;
  showPassword: boolean;
  setShowPassword: (val: boolean) => void;
}

export function EditorWorkspace({
  editorRef,
  fileInputRef,
  isEmpty,
  isEvaporating,
  errorMsg,
  isPending,
  checkIsEmpty,
  execCmd,
  handleLink,
  handleImageUpload,
  handlePaste,
  handleDrop,
  handleDragOver,
  handleSubmit,
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
}: EditorWorkspaceProps) {
  return (
    <form
      onSubmit={handleSubmit}
      className={`flex-1 flex flex-col gap-6 items-start w-full transition-all ${
        isEvaporating ? "animate-evaporate" : ""
      }`}
    >
      {/* Editor Container */}
      <div className="w-full flex flex-col bg-white rounded-lg border border-[#d0d7de] overflow-hidden focus-within:border-cyan-500/80 focus-within:ring-1 focus-within:ring-cyan-500/10 transition-all duration-200">
        <EditorToolbar
          execCmd={execCmd}
          handleLink={handleLink}
          handleImageUpload={handleImageUpload}
          fileInputRef={fileInputRef}
        />

        {/* Editable Area */}
        <div className="relative flex-1 bg-white">
          {isEmpty && (
            <div className="absolute pointer-events-none p-6 text-xs font-mono text-[#57606a]">
              Write your content here, paste rich formatting/VS Code code directly, or drag & drop / paste images...
            </div>
          )}
          <div
            ref={editorRef}
            contentEditable
            onInput={checkIsEmpty}
            onKeyUp={checkIsEmpty}
            onPaste={handlePaste}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="tiptap-content prose prose-zinc max-w-none focus:outline-none p-6 min-h-[300px] outline-none"
          />
        </div>
      </div>

      {/* Error Message */}
      {errorMsg && (
        <div className="w-full p-4 rounded-lg bg-[#ffebe9] border border-[#ffc0c0] text-xs text-[#cf222e]">
          {errorMsg}
        </div>
      )}

      {/* Options Panel */}
      <OptionsPanel
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

      {/* Action Button */}
      <div className="mt-2 w-full flex justify-start">
        <button
          type="submit"
          disabled={isPending}
          className="px-5 py-2.5 rounded-md bg-[#0891b2] hover:bg-[#0e7490] text-white font-medium text-xs transition-all duration-120 cursor-pointer flex items-center gap-1.5 active:scale-98"
        >
          {isPending ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Vaporizing...</span>
            </>
          ) : (
            <span>Vaporize</span>
          )}
        </button>
      </div>
    </form>
  );
}
