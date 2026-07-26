import React from "react";

export default function FloatingButton({ isOpen, onClick, hasUnread }) {
  return (
    <button
      onClick={onClick}
      aria-label={isOpen ? "Close AI Concierge" : "Open AI Concierge"}
      className="fixed bottom-6 right-6 z-50 group focus:outline-none focus-visible:ring-4 focus-visible:ring-[#C9A24B]/40 rounded-full"
    >
      {/* Pulse ring — only animates while closed */}
      {!isOpen && (
        <span className="absolute inset-0 rounded-full bg-[#2C4A6E]/40 animate-ping" />
      )}

      <span
        className={`relative flex items-center justify-center w-16 h-16 rounded-full
          bg-gradient-to-br from-[#2C4A6E] to-[#16283f]
          shadow-[0_8px_30px_rgba(44,74,110,0.45)]
          border border-[#C9A24B]/40
          transition-all duration-300 ease-out
          group-hover:scale-110 group-hover:shadow-[0_12px_36px_rgba(201,162,75,0.35)]
          ${isOpen ? "rotate-90" : "rotate-0"}`}
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#F5D68A]" fill="none">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="w-7 h-7 text-[#F5D68A]" fill="none">
            <path
              d="M12 3l1.6 4.6L18 9l-4.4 1.4L12 15l-1.6-4.6L6 9l4.4-1.4L12 3z"
              fill="currentColor"
            />
            <circle cx="18.5" cy="17" r="1.4" fill="currentColor" className="opacity-80" />
            <circle cx="6" cy="16" r="1" fill="currentColor" className="opacity-60" />
          </svg>
        )}

        {hasUnread && !isOpen && (
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#C9A24B] border-2 border-white" />
        )}
      </span>
    </button>
  );
}