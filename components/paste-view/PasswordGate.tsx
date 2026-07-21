import Link from "next/link";
import { Lock, Unlock } from "lucide-react";

interface PasswordGateProps {
  password: string;
  setPassword: (val: string) => void;
  unlockError: string;
  isUnlocking: boolean;
  handleUnlockSubmit: (e: React.FormEvent) => void;
}

export function PasswordGate({
  password,
  setPassword,
  unlockError,
  isUnlocking,
  handleUnlockSubmit,
}: PasswordGateProps) {
  return (
    <div className="w-full flex flex-col items-center justify-center my-auto py-8">
      <form
        onSubmit={handleUnlockSubmit}
        className="w-full bg-white border border-[#d0d7de] p-8 sm:p-12 rounded-lg flex flex-col items-center text-center"
      >
        <div className="bg-[#f6f8fa] border border-[#d0d7de] text-[#24292f] p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-6 shadow-sm">
          <Lock className="h-5 w-5 text-[#24292f]" />
        </div>

        <div className="max-w-md w-full flex flex-col items-center text-center">
          <h2 className="text-base font-semibold text-[#24292f] mb-2">
            Password Protected Clip
          </h2>
          <p className="text-xs text-[#57606a] mb-6 leading-relaxed">
            The creator of this clip has protected it with a password. Please enter
            it below to decrypt and view the contents.
          </p>

          {unlockError && (
            <div className="w-full mb-4 p-3 rounded-md bg-[#ffebe9] border border-[#ffc0c0] text-xs text-[#cf222e] text-center">
              {unlockError}
            </div>
          )}

          <div className="flex flex-col gap-4 w-full">
            <input
              type="password"
              placeholder="Enter clip password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border border-[#d0d7de] focus:border-[#0891b2] focus:ring-1 focus:ring-[#0891b2]/30 rounded-md px-3.5 py-2.5 text-xs text-[#24292f] outline-none transition-all text-center placeholder:text-[#8c959f]"
              disabled={isUnlocking}
              autoFocus
            />

            <button
              type="submit"
              disabled={isUnlocking}
              className="w-full py-2.5 rounded-md bg-[#0891b2] hover:bg-[#0e7490] text-white font-medium text-xs transition-all duration-120 flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
            >
              {isUnlocking ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Unlocking...</span>
                </>
              ) : (
                <>
                  <Unlock className="h-3.5 w-3.5" />
                  <span>Decrypt Clip</span>
                </>
              )}
            </button>

            <Link
              href="/"
              className="text-xs text-[#0891b2] hover:text-[#0e7490] hover:underline mt-2 transition-colors font-medium block"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
