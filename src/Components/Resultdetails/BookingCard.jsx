import { Calendar, Users, ArrowRight, Shield, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function BookingCard({ hotel, checkIn, checkOut, guests, children, roomsCount }) {

  const navigate = useNavigate();


  const handleSelectRoom = () => {
    navigate(`/room-selection/${hotel.id}`, {
      state: {
        hotelId: hotel.id,
        checkIn,
        checkOut,
        guests,
        children,
        roomsCount,
      },
    });
  };

  if (!hotel) return null;
  const { price, originalPrice, guestRating, ratingLabel, freeCancellation } = hotel;

  const discount =
    originalPrice && price && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 space-y-5">
      {/* Price block */}
      <div>
        {discount > 0 && originalPrice && (
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] text-slate-400 line-through">${originalPrice}/night</span>
            <span className="text-[11px] font-bold text-white bg-rose-500 px-2 py-0.5 rounded-full">
              -{discount}%
            </span>
          </div>
        )}
        {price != null && (
          <p className="text-[28px] font-bold text-[#1E2A38] leading-none">
            ${price}
            <span className="text-[14px] font-normal text-slate-500 ml-1">/night</span>
          </p>
        )}
        <p className="text-[11px] text-slate-400 mt-1">Includes taxes &amp; fees</p>
      </div>

      {/* Rating mini */}
      {guestRating != null && (
        <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2.5 border border-slate-100">
          <span className="text-[13px] font-bold text-white bg-[#003580] rounded-lg px-2 py-0.5">
            {guestRating}
          </span>
          {ratingLabel && (
            <span className="text-[13px] font-semibold text-[#1E2A38]">{ratingLabel}</span>
          )}
        </div>
      )}

      {/* Date inputs */}
      <div className="grid grid-cols-2 gap-2">
        <div className="border border-slate-200 rounded-xl p-3 cursor-pointer hover:border-[#2C4A6E] transition-colors">
          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-1">Check-in</p>
          <div className="flex items-center gap-1.5 text-[13px] font-semibold text-[#1E2A38]">
            <Calendar size={13} className="text-[#2C4A6E]" />
            {checkIn || "Select date"}
          </div>
        </div>
        <div className="border border-slate-200 rounded-xl p-3 cursor-pointer hover:border-[#2C4A6E] transition-colors">
          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-1">Check-out</p>
          <div className="flex items-center gap-1.5 text-[13px] font-semibold text-[#1E2A38]">
            <Calendar size={13} className="text-[#2C4A6E]" />
            {checkOut || "Select date"}
          </div>
        </div>
      </div>

      {/* Guests */}
      <div className="border border-slate-200 rounded-xl p-3 cursor-pointer hover:border-[#2C4A6E] transition-colors">
        <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-1">Guests</p>
        <div className="flex items-center gap-1.5 text-[13px] font-semibold text-[#1E2A38]">
          <Users size={13} className="text-[#2C4A6E]" />
          {guests
            ? `${guests} Adults · ${children || 0} Children`
            : "2 Adults · 0 Children"}
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={handleSelectRoom}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-[14px] font-bold text-white transition-all duration-200 hover:shadow-lg active:scale-95"
        style={{ background: "#2C4A6E" }}
      // onMouseEnter={(e) => (e.currentTarget.style.background = "#003580")}
      // onMouseLeave={(e) => (e.currentTarget.style.background = "#2C4A6E")}
      >
        Select Room
        <ArrowRight size={16} />
      </button>

      {/* Trust badges */}
      <div className="space-y-2 pt-1">
        {freeCancellation && (
          <div className="flex items-center gap-2 text-[12px] text-emerald-700">
            <Shield size={13} />
            Free cancellation available
          </div>
        )}
        <div className="flex items-center gap-2 text-[12px] text-slate-500">
          <Tag size={13} />
          No hidden fees — price is all-inclusive
        </div>
      </div>
    </div>
  );
}
