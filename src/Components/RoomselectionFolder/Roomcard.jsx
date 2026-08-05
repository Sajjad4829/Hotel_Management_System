import { Link } from "react-router-dom";
import {
  Wifi, Wind, Coffee, Tv2, Bath, ShoppingBag, CupSoda,
  Users, Maximize2, BedDouble, CheckCircle, XCircle, ShieldCheck,
} from "lucide-react";
import RoomCounter from "./RoomCounter";

const FACILITY_CONFIG = {
  wifi:             { icon: <Wifi size={13} />,         label: "Free WiFi" },
  ac:               { icon: <Wind size={13} />,         label: "Air Conditioning" },
  breakfast:        { icon: <Coffee size={13} />,       label: "Breakfast Included" },
  freeCancellation: { icon: <ShieldCheck size={13} />,  label: "Free Cancellation" },
  tv:               { icon: <Tv2 size={13} />,          label: "Flat-screen TV" },
  bathroom:         { icon: <Bath size={13} />,         label: "Private Bathroom" },
  minibar:          { icon: <ShoppingBag size={13} />,  label: "Mini Bar" },
  coffee:           { icon: <CupSoda size={13} />,      label: "Coffee Machine" },
};

export default function RoomCard({ room, count, onDecrement, onIncrement }) {
  const discount = room.originalPrice > room.price
    ? Math.round(((room.originalPrice - room.price) / room.originalPrice) * 100)
    : 0;

  const isLowAvailability = room.availableRooms <= 2;

  return (
    <div className={`bg-white rounded-2xl border overflow-hidden shadow-sm transition-all duration-300
                     hover:shadow-lg hover:-translate-y-0.5 ${count > 0 ? "border-[#1a3c5e] ring-1 ring-[#1a3c5e]/20" : "border-slate-100"}`}>

      <div className="flex flex-col lg:flex-row">

        {/* ── Room Image ── */}
        <div className="relative lg:w-72 xl:w-80 flex-shrink-0 overflow-hidden group">
          <img
            src={room.image}
            alt={room.name}
            className="w-full h-52 lg:h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {room.badge && (
            <span
              className="absolute top-3 left-3 text-[11px] font-bold text-white px-2.5 py-1 rounded-full shadow"
              style={{ background: room.badgeColor }}
            >
              {room.badge}
            </span>
          )}

          {discount > 0 && (
            <span className="absolute top-3 right-3 text-[11px] font-bold text-white bg-rose-500 px-2 py-0.5 rounded-full shadow">
              -{discount}%
            </span>
          )}
        </div>

        {/* ── Content ── */}
        <div className="flex flex-col flex-1 p-5 lg:p-6 gap-4">

          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <h3 className="text-[17px] font-bold text-[#1a3c5e] leading-snug">
                  {room.name}
                </h3>
                <Link to={`/rooms/${room.id}`} className="text-[11px] font-medium text-[#2563eb] hover:text-white hover:bg-[#2563eb] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200 transition-colors">
                  View Details
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1.5 text-[12px] text-slate-500">
                  <Maximize2 size={12} className="text-[#2563eb]" />
                  {room.roomSize} m²
                </span>
                <span className="flex items-center gap-1.5 text-[12px] text-slate-500">
                  <Users size={12} className="text-[#2563eb]" />
                  Up to {typeof room.maxGuests === "object" ? `${room.maxGuests.adults || 2}` : room.maxGuests} guests
                </span>
                <span className="flex items-center gap-1.5 text-[12px] text-slate-500">
                  <BedDouble size={12} className="text-[#2563eb]" />
                  {room.bedType}
                </span>
              </div>
            </div>

            {/* Availability */}
            {isLowAvailability && (
              <span className="text-[11px] font-semibold text-rose-600 bg-rose-50 border border-rose-100 px-2.5 py-1 rounded-full flex-shrink-0">
                Only {room.availableRooms} left
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-[13px] text-slate-500 leading-relaxed line-clamp-2">
            {room.description}
          </p>

          {/* Facilities */}
          <div className="flex flex-wrap gap-2">
            {room.facilities?.map((key) => {
              const item = FACILITY_CONFIG[key];
              if (!item) return null;
              return (
                <span
                  key={key}
                  className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-600
                             bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-full"
                >
                  <span className="text-[#2563eb]">{item.icon}</span>
                  {item.label}
                </span>
              );
            })}
          </div>

          {/* Policy quick-view */}
          <div className="flex flex-wrap gap-3">
            <span className={`flex items-center gap-1.5 text-[12px] font-medium ${room.breakfast ? "text-emerald-700" : "text-slate-400"}`}>
              {room.breakfast
                ? <CheckCircle size={13} />
                : <XCircle size={13} />}
              {room.breakfast ? "Breakfast included" : "Breakfast not included"}
            </span>
            <span className={`flex items-center gap-1.5 text-[12px] font-medium ${room.freeCancellation ? "text-emerald-700" : "text-rose-600"}`}>
              {room.freeCancellation
                ? <CheckCircle size={13} />
                : <XCircle size={13} />}
              {room.freeCancellation ? "Free cancellation" : "Non-refundable"}
            </span>
          </div>

          {/* Divider */}
          <div className="h-px bg-slate-100" />

          {/* Price + Counter */}
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              {room.originalPrice > room.price && (
                <p className="text-[12px] text-slate-400 line-through">
                  ${room.originalPrice.toLocaleString()}/night
                </p>
              )}
              <p className="text-[24px] font-bold text-[#1a3c5e] leading-none">
                ${room.price.toLocaleString()}
                <span className="text-[13px] font-normal text-slate-400 ml-1">/night</span>
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">Includes taxes &amp; fees</p>
            </div>

            <RoomCounter
              count={count}
              max={room.availableRooms}
              onDecrement={onDecrement}
              onIncrement={onIncrement}
            />
          </div>

        </div>
      </div>
    </div>
  );
}