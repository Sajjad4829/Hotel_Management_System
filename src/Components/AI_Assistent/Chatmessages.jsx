import React, { useEffect, useRef } from "react";
import TypingIndicator from "./TypingIndicator";


function HotelCard({ hotel }) {
  return (
    <div className="flex gap-3 bg-white/80 border border-[#2C4A6E]/10 rounded-xl p-2.5 shadow-sm hover:shadow-md transition-shadow">
      <img
        src={hotel.image}
        alt={hotel.name}
        className="w-16 h-16 rounded-lg object-cover shrink-0"
      />
      <div className="min-w-0">
        <p className="text-sm font-semibold text-[#2C4A6E] truncate">{hotel.name}</p>
        <p className="text-xs text-[#2C4A6E]/60">{hotel.roomType} · {hotel.location}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs font-bold text-[#C9A24B]">${hotel.pricePerNight}/night</span>
          <span className="text-[11px] text-[#2C4A6E]/70 flex items-center gap-0.5">
            ⭐ {hotel.guestRating}
          </span>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ message }) {
  const isUser = message.sender === "user";
  return (
    <div
      className={`flex flex-col gap-2 max-w-[85%] animate-[fadeIn_0.35s_ease-out] ${
        isUser ? "ml-auto items-end" : "items-start"
      }`}
    >
      <div className="flex items-end gap-2">
        {!isUser && (
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#F5D68A] to-[#C9A24B] flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-[#1c3350]" fill="none">
              <path d="M12 3l1.6 4.6L18 9l-4.4 1.4L12 15l-1.6-4.6L6 9l4.4-1.4L12 3z" fill="currentColor" />
            </svg>
          </div>
        )}

        <div
          className={`px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line shadow-sm ${
            isUser
              ? "bg-gradient-to-br from-[#2C4A6E] to-[#1c3350] text-white rounded-2xl rounded-br-sm"
              : "bg-white/80 border border-[#2C4A6E]/10 text-[#1c2b3d] rounded-2xl rounded-bl-sm"
          }`}
        >
          {message.text}
        </div>
      </div>

      {message.hotels?.length > 0 && (
        <div className={`flex flex-col gap-2 w-full max-w-[290px] ${isUser ? "mr-9" : "ml-9"}`}>
          {message.hotels.map((h) => (
            <HotelCard key={h.id} hotel={h} />
          ))}
        </div>
      )}

      <span className={`text-[10px] text-[#2C4A6E]/40 px-1 ${isUser ? "mr-1" : "ml-9"}`}>
        {message.time}
      </span>
    </div>
  );
}

export default function ChatMessages({ messages, isTyping }) {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scroll-smooth">
      {messages.map((m) => (
        <MessageBubble key={m.id} message={m} />
      ))}
      {isTyping && <TypingIndicator />}
      <div ref={endRef} />
    </div>
  );
}