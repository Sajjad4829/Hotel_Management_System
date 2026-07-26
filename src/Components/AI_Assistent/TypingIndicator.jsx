import React from "react";

export default function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 animate-[fadeIn_0.3s_ease-out]">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#F5D68A] to-[#C9A24B] flex items-center justify-center shrink-0">
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-[#1c3350]" fill="none">
          <path d="M12 3l1.6 4.6L18 9l-4.4 1.4L12 15l-1.6-4.6L6 9l4.4-1.4L12 3z" fill="currentColor" />
        </svg>
      </div>
      <div className="bg-white/80 border border-[#2C4A6E]/10 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
        <div className="flex gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2C4A6E]/50 animate-bounce [animation-delay:-0.3s]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#2C4A6E]/50 animate-bounce [animation-delay:-0.15s]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#2C4A6E]/50 animate-bounce" />
        </div>
      </div>
    </div>
  );
}