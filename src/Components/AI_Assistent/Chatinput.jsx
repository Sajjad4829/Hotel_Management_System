import React, { useState } from "react";

export default function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="px-4 py-3 border-t border-[#2C4A6E]/10 bg-white/70 backdrop-blur-sm rounded-b-2xl">
      <div className="flex items-center gap-2 bg-white rounded-full border border-[#2C4A6E]/15 pl-4 pr-1.5 py-1.5 shadow-sm focus-within:border-[#C9A24B] focus-within:ring-2 focus-within:ring-[#C9A24B]/20 transition-all">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about rooms, prices, amenities..."
          className="flex-1 bg-transparent outline-none text-sm text-[#1c2b3d] placeholder:text-[#2C4A6E]/40"
        />
        <button
          onClick={handleSend}
          disabled={disabled || !value.trim()}
          aria-label="Send message"
          className="w-9 h-9 shrink-0 rounded-full bg-gradient-to-br from-[#2C4A6E] to-[#1c3350]
            flex items-center justify-center text-[#F5D68A]
            disabled:opacity-40 disabled:cursor-not-allowed
            hover:shadow-md transition-all"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
            <path d="M4 12l16-7-6 16-2.5-6L4 12z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" fill="currentColor" />
          </svg>
        </button>
      </div>
    </div>
  );
}