import Image from "next/image";
import Link from "next/link";
import { Paperclip } from "lucide-react";

interface VaporClipLogoProps {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
}

export function VaporClipLogo({
  size = "md",
  showTagline = true,
}: VaporClipLogoProps) {
  const iconSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-3xl",
  };

  const taglineSizes = {
    sm: "text-[10px]",
    md: "text-xs",
    lg: "text-sm",
  };

  return (
    <Link href="/" className="flex items-center gap-3 group select-none">
      <div className="relative flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
        <Image
          src="/logo-bg.png"
          alt="VaporClip Logo"
          width={64}
          height={64}
          className={`${iconSizes[size]} object-contain drop-shadow-[0_2px_8px_rgba(56,189,248,0.3)]`}
          priority
        />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center">
          <span
            className={`font-black tracking-tight ${textSizes[size]} bg-gradient-to-r from-[#2563eb] via-[#7c3aed] to-[#c026d3] bg-clip-text text-transparent flex items-center leading-none`}
          >
            vaporcli
            <span className="relative inline-flex items-center">
              p
              <Paperclip className="inline-block h-3.5 w-3.5 -ml-1 text-[#c026d3] rotate-45 stroke-[2.5]" />
            </span>
          </span>
        </div>
        {showTagline && (
          <span
            className={`${taglineSizes[size]} font-medium text-[#475569] tracking-wider mt-0.5`}
          >
            Quick. Digital. Share.
          </span>
        )}
      </div>
    </Link>
  );
}
