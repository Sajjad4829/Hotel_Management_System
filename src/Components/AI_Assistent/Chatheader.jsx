import React from "react";

export default function ChatHeader({ onClose, onClear, onMinimize }) {
  return (
    <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-[#2C4A6E] to-[#1c3350] rounded-t-2xl">
      <div className="flex items-center gap-3">
        {/* Hotel logo */}
        <div className="w-9 h-9 rounded-lg bg-white/10 border border-[#C9A24B]/50 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#F5D68A]" fill="none">
            <path d="M3 21h18M5 21V8l7-4 7 4v13M9 21v-6h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* AI avatar */}
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F5D68A] to-[#C9A24B] flex items-center justify-center shadow-md">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#1c3350]" fill="none">
              <path d="M12 3l1.6 4.6L18 9l-4.4 1.4L12 15l-1.6-4.6L6 9l4.4-1.4L12 3z" fill="currentColor" />
            </svg>
          </div>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#2C4A6E]" />
        </div>

        <div>
          <h3 className="text-white font-semibold text-sm tracking-wide">Hotel AI Concierge</h3>
          <p className="text-[#C9A24B] text-xs">Ask me anything</p>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={onClear}
          title="Clear chat"
          className="w-8 h-8 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
            <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          onClick={onMinimize}
          title="Minimize"
          className="w-8 h-8 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
            <path d="M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
        <button
          onClick={onClose}
          title="Close"
          className="w-8 h-8 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}