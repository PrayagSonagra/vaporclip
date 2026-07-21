import { Clock, Shield, Lock, Unlock, Eye, EyeOff } from "lucide-react";

interface OptionsPanelProps {
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

export function OptionsPanel({
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
}: OptionsPanelProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white border border-[#d0d7de] rounded-lg p-5 w-full">
        {/* Expiry Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-[#24292f] flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-[#57606a]" />
            <span>Paste Expiry</span>
          </label>
          <select
            value={expiry}
            onChange={(e) => setExpiry(e.target.value as any)}
            className="w-full bg-white border border-[#d0d7de] hover:border-[#afb8c1] focus:border-[#0891b2] rounded-md px-3 py-2 text-[#24292f] outline-none text-xs transition-colors cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M5%207.5L10%2012.5L15%207.5%22%20stroke%3D%22%2357606a%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[length:18px_18px] bg-[right_12px_center] bg-no-repeat"
          >
            <option value="1h">1 Hour</option>
            <option value="1d">1 Day</option>
            <option value="30d">30 Days</option>
          </select>
          <span className="text-xxs text-[#57606a]">
            Will vaporize automatically after expiry
          </span>
        </div>

        {/* IP Restriction Toggle */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-[#24292f] flex items-center gap-1.5">
            <Shield className="h-3.5 w-3.5 text-[#57606a]" />
            <span>IP Restricted</span>
          </label>
          <div
            onClick={() => setIpRestricted(!ipRestricted)}
            className="w-full bg-white border border-[#d0d7de] hover:border-[#afb8c1] rounded-md px-3.5 py-2 text-[#24292f] flex items-center justify-between text-xs transition-all cursor-pointer"
          >
            <span className="text-[#57606a] text-xxs">
              Limit access to my current IP
            </span>
            <div
              className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 cursor-pointer ${
                ipRestricted ? "bg-[#0891b2]" : "bg-[#d0d7de]"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white shadow-sm transform duration-200 ${
                  ipRestricted ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </div>
          </div>
          <span className="text-xxs text-[#57606a]">
            Blocks access if request is from other IPs
          </span>
        </div>

        {/* Password Protection Toggle */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-[#24292f] flex items-center gap-1.5">
            {passwordProtected ? (
              <Lock className="h-3.5 w-3.5 text-[#57606a]" />
            ) : (
              <Unlock className="h-3.5 w-3.5 text-[#57606a]" />
            )}
            <span>Password Lock</span>
          </label>
          <div
            onClick={() => setPasswordProtected(!passwordProtected)}
            className="w-full bg-white border border-[#d0d7de] hover:border-[#afb8c1] rounded-md px-3.5 py-2 text-[#24292f] flex items-center justify-between text-xs transition-all cursor-pointer"
          >
            <span className="text-[#57606a] text-xxs">
              Protect paste with password
            </span>
            <div
              className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 cursor-pointer ${
                passwordProtected ? "bg-[#0891b2]" : "bg-[#d0d7de]"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white shadow-sm transform duration-200 ${
                  passwordProtected ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </div>
          </div>
          <span className="text-xxs text-[#57606a]">
            Encrypt and gate content behind entry screen
          </span>
        </div>
      </div>

      {/* Password Input (conditional) */}
      {passwordProtected && (
        <div className="flex flex-col gap-2 w-full max-w-xs bg-white border border-[#d0d7de] p-4 rounded-lg animate-in slide-in-from-bottom-1 duration-150">
          <label className="text-xxs font-bold uppercase tracking-wider text-[#57606a]">
            Set Paste Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter secure password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border border-[#d0d7de] focus:border-[#0891b2] focus:ring-1 focus:ring-[#0891b2]/30 rounded-md pl-3 pr-9 py-2 text-xs text-[#24292f] outline-none transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#57606a] hover:text-[#24292f]"
            >
              {showPassword ? (
                <EyeOff className="h-3.5 w-3.5" />
              ) : (
                <Eye className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
