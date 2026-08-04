import React, { useEffect, useRef } from "react";
import TypingIndicator from "./TypingIndicator";
import { Link } from "react-router-dom";
import { Sparkles, MapPin, Star, CheckCircle2 } from "lucide-react";


function HotelCard({ hotel }) {
  const topAmenities = hotel.amenities?.slice(0, 3) || [];
  
  return (
    <div className="flex flex-col bg-white border border-[#2C4A6E]/15 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Top Section with Image */}
      <div className="relative h-28 w-full">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2 bg-white/95 backdrop-blur px-2 py-0.5 rounded-md text-[10px] font-bold text-[#C9A24B] shadow-sm flex items-center gap-1 border border-white/50">
          <Sparkles size={10} />
          <span>AI Match</span>
        </div>
        <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur px-1.5 py-0.5 rounded-md text-[10px] font-bold text-white flex items-center gap-1">
          <Star size={10} className="text-amber-400 fill-amber-400" />
          <span>{hotel.guestRating > 0 ? hotel.guestRating.toFixed(1) : "New"}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-3">
        <h4 className="text-sm font-bold text-[#2C4A6E] truncate mb-0.5" style={{ fontFamily: "Georgia, serif" }}>{hotel.name}</h4>
        
        <div className="flex justify-between items-end mb-2">
          <div className="flex items-center gap-1 text-[11px] text-slate-500 truncate max-w-[60%]">
            <MapPin size={10} className="shrink-0" />
            <span className="truncate">{hotel.location}</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-500 block leading-tight">From</span>
            <span className="text-xs font-bold text-[#C9A24B] leading-tight">${hotel.pricePerNight}</span>
          </div>
        </div>

        {topAmenities.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {topAmenities.map((am, i) => (
              <div key={i} className="flex items-center gap-0.5 text-[9px] font-medium text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                <CheckCircle2 size={8} className="text-emerald-500" />
                <span className="capitalize">{am}</span>
              </div>
            ))}
          </div>
        )}

        {hotel.shortDescription && (
          <p className="text-[10px] text-slate-500 line-clamp-2 mb-3 leading-relaxed">
            {hotel.shortDescription}
          </p>
        )}

        <Link 
          to={`/hotel/${hotel.id}`}
          className="block w-full py-1.5 text-center text-xs font-semibold text-white bg-[#2C4A6E] hover:bg-[#1c3350] rounded-lg transition-colors"
        >
          View Details
        </Link>
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