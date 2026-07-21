import { Check } from "lucide-react";

interface ToastProps {
  message: string;
}

export function Toast({ message }: ToastProps) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 left-6 bg-[#24292f] text-white text-xs px-4 py-3 rounded-lg shadow-md border border-zinc-800 animate-condense flex items-center gap-2 z-50">
      <Check className="h-4 w-4 text-cyan-400" />
      <span>{message}</span>
    </div>
  );
}
