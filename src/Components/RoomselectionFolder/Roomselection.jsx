import { useState, useMemo } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { Star, MapPin, ArrowLeft, BedDouble } from "lucide-react";
import hotelDetailsData from "../Resultdetails/HotelDetailsData";

import BookingSummary from "./BookingSummary";
import RoomCard from "./Roomcard";

/* ── HOTEL SUMMARY CARD ─────────────────────────────────── */
function HotelSummaryCard({ hotel }) {
  if (!hotel) return null;

  const { name, location, image, stars = 0, guestRating, ratingLabel, reviewCount } = hotel;

  const ratingBg = guestRating >= 9 ? "#003580" : guestRating >= 8 ? "#1a3c5e" : "#374151";

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="flex flex-col sm:flex-row gap-0">
        {/* Image */}
        <div className="sm:w-44 flex-shrink-0 overflow-hidden h-36 sm:h-auto group">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        {/* Info */}
        <div className="flex flex-1 flex-col justify-center px-5 py-4 gap-2.5">
          <div>
            <div className="flex items-center gap-0.5 mb-1.5">
              {Array.from({ length: Math.min(stars, 5) }).map((_, i) => (
                <Star key={i} size={12} fill="#f59e0b" stroke="none" />
              ))}
            </div>
            <h2 className="text-[17px] font-bold text-[#1a3c5e] leading-snug">{name}</h2>
          </div>
          <div className="flex items-center gap-1.5 text-[12px] text-[#1a3c5e]">
            <MapPin size={12} className="flex-shrink-0" />
            <span className="underline underline-offset-2 cursor-pointer hover:text-[#003580]">{location}</span>
          </div>
          {guestRating != null && (
            <div className="flex items-center gap-2.5">
              <span className="text-[13px] font-bold text-white px-2.5 py-1 rounded-lg"
                style={{ background: ratingBg }}>
                {guestRating}
              </span>
              <div>
                {ratingLabel && <p className="text-[13px] font-bold text-[#1a3c5e]">{ratingLabel}</p>}
                {reviewCount && <p className="text-[11px] text-slate-400">{reviewCount.toLocaleString()} reviews</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── MAIN PAGE ───────────────────────────────────────────── */
export default function RoomSelection() {
  const { id } = useParams();
  const location = useLocation();

  const hotelId = id ? Number(id) : location.state?.hotelId ?? 1;


const hotel = useMemo(
  () => hotelDetailsData.find((h) => h.id === hotelId),
  [hotelId]
);

const rooms = hotel?.rooms || [];

  const [selectedRooms, setSelectedRooms] = useState({});

  const handleDecrement = (roomId) =>
    setSelectedRooms((prev) => ({
      ...prev,
      [roomId]: Math.max(0, (prev[roomId] ?? 0) - 1),
    }));

  const handleIncrement = (roomId, max) =>
    setSelectedRooms((prev) => ({
      ...prev,
      [roomId]: Math.min(max, (prev[roomId] ?? 0) + 1),
    }));

  const totalSelected = Object.values(selectedRooms).reduce((a, b) => a + b, 0);

//   console.log("params id =", id);
// console.log("hotelId =", hotelId);
console.log( location.state);


  return (
    <div className="min-h-screen" style={{ background: "#F7F9FB", fontFamily: "'Inter', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

        {/* Breadcrumb */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <Link
            to={`/hotel/${hotelId}`}
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#1a3c5e] hover:text-[#003580] transition-colors"
          >
            <ArrowLeft size={15} />
            Back to hotel details
          </Link>
          {totalSelected > 0 && (
            <span className="text-[12px] font-semibold text-white bg-[#1a3c5e] px-3 py-1.5 rounded-full">
              {totalSelected} room{totalSelected > 1 ? "s" : ""} selected
            </span>
          )}
        </div>

        {/* Hotel summary */}
        <HotelSummaryCard hotel={hotel} />

        {/* Section heading */}
        <div className="flex items-center gap-3">
          <BedDouble size={22} className="text-[#1a3c5e]" />
          <div>
            <h1 className="text-[20px] font-bold text-[#1a3c5e]">Choose your room</h1>
            <p className="text-[13px] text-slate-500 mt-0.5">
              {rooms.length} room type{rooms.length !== 1 ? "s" : ""} available
            </p>
          </div>
        </div>

        {/* Main 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px] gap-6 items-start">

          {/* ── Room cards column ── */}
          <div className="space-y-4">
            {rooms.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
                <BedDouble size={40} className="text-slate-200 mx-auto mb-3" />
                <p className="text-[16px] font-semibold text-slate-500">No rooms available</p>
                <p className="text-[13px] text-slate-400 mt-1">Try selecting a different hotel.</p>
              </div>
            ) : (
              rooms.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  count={selectedRooms[room.id] ?? 0}
                  onDecrement={() => handleDecrement(room.id)}
                  onIncrement={() => handleIncrement(room.id, room.availableRooms)}
                />
              ))
            )}
          </div>

          {/* ── Sticky booking summary ── */}
          <div className="lg:sticky lg:top-6">
            <BookingSummary
              hotel={hotel}
              selectedRooms={selectedRooms}
              rooms={rooms}
            />
          </div>

        </div>
      </div>
    </div>
  );
}