import { Bed, Users, Maximize2, Check, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function RoomCard({ room }) {
  if (!room) return null;

  const {
    id,
    roomName,
    thumbnailImage: image,
    bedType,
    maxAdults,
    maxChildren,
    roomSize: size,
    price,
    amenities = [],
  } = room;
  const guests = (maxAdults || 0) + (maxChildren || 0);
  const breakfast = amenities.includes("Breakfast") || true; // Mocked for now
  const freeCancellation = true; // Mocked for now

  return (
    <div className="flex flex-col w-80 shrink-0 snap-start bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
      {/* Room image */}
      <Link to={`/rooms/${id || ''}`} className="relative w-full h-48 overflow-hidden group block">
        {image ? (
          <img
            src={image}
            alt={roomName}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300 text-sm">
            No Image
          </div>
        )}
      </Link>

      {/* Room content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Name */}
        <Link to={`/rooms/${id || ''}`} className="block hover:text-[#2C4A6E] transition-colors">
          <h3 className="text-[15px] font-bold text-[#1E2A38]">{roomName}</h3>
        </Link>

        {/* Specs row */}
        <div className="flex flex-wrap gap-3">
          {bedType && (
            <div className="flex items-center gap-1.5 text-[12px] text-slate-600">
              <Bed size={13} className="text-[#2C4A6E]" />
              {bedType}
            </div>
          )}
          {guests != null && (
            <div className="flex items-center gap-1.5 text-[12px] text-slate-600">
              <Users size={13} className="text-[#2C4A6E]" />
              {guests} {guests === 1 ? "guest" : "guests"}
            </div>
          )}
          {size && (
            <div className="flex items-center gap-1.5 text-[12px] text-slate-600">
              <Maximize2 size={13} className="text-[#2C4A6E]" />
              {size} sq.ft
            </div>
          )}
        </div>

        {/* Policies */}
        <div className="flex flex-wrap gap-2">
          <span className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-0.5 rounded-full ${
            breakfast
              ? "text-emerald-700 bg-emerald-50 border border-emerald-100"
              : "text-slate-400 bg-slate-50 border border-slate-100 line-through"
          }`}>
            {breakfast ? <Check size={11} /> : <X size={11} />}
            {breakfast ? "Breakfast included" : "No breakfast"}
          </span>
          <span className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-0.5 rounded-full ${
            freeCancellation
              ? "text-blue-700 bg-blue-50 border border-blue-100"
              : "text-rose-600 bg-rose-50 border border-rose-100"
          }`}>
            {freeCancellation ? <Check size={11} /> : <X size={11} />}
            {freeCancellation ? "Free cancellation" : "Non-refundable"}
          </span>
        </div>

        {/* Price + CTA */}
        <div className="mt-auto flex flex-col gap-3 pt-3 border-t border-slate-50">
          <div className="flex items-end justify-between flex-wrap">
            <div>
              <p className="text-[11px] text-slate-400">from</p>
              <p className="text-[22px] font-bold text-[#1E2A38] leading-none">
                ${price}
                <span className="text-[12px] font-normal text-slate-400 ml-1">/night</span>
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">Includes taxes &amp; fees</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link
              to={`/rooms/${id || ''}`}
              className="flex-1 flex items-center justify-center py-2.5 rounded-xl text-[12px] font-bold text-[#1e3a5f] bg-slate-100 transition-all hover:bg-slate-200"
            >
              View Details
            </Link>
            <Link
              to={`/book/${id || ''}`}
              className="flex-1 flex items-center justify-center py-2.5 rounded-xl text-[12px] font-bold text-white transition-all hover:-translate-y-0.5 active:scale-95"
              style={{ background: "#2C4A6E", boxShadow: "0 4px 12px rgba(44,74,110,0.2)" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#003580")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#2C4A6E")}
            >
              Select Room
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
