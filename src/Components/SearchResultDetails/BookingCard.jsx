import { Calendar, Users, ArrowRight, Shield, Tag,Pencil, ChevronUp, ChevronDown, CheckCircle } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function BookingCard({ hotel, checkIn, checkOut, guests, children, roomsCount, selectedRooms = {}, rooms = [] }) {
const [showSearchEdit, setShowSearchEdit] = useState(false);
  const navigate = useNavigate();

const [newCheckIn, setNewCheckIn] = useState(checkIn || "");
const [newCheckOut, setNewCheckOut] = useState(checkOut || "");
const [newGuests, setNewGuests] = useState(guests || 2);
const [newChildren, setNewChildren] = useState(children || 0);
const [newRoomsCount, setNewRoomsCount] = useState(roomsCount || 1);


useEffect(() => {
  if (checkIn) setNewCheckIn(checkIn);
  if (checkOut) setNewCheckOut(checkOut);
  if (guests) setNewGuests(guests);
  if (children) setNewChildren(children);
  if (roomsCount) setNewRoomsCount(roomsCount);
}, [checkIn, checkOut, guests, children, roomsCount]);

const handleUpdateSearch = () => {
  navigate(`/hotel/${hotel.id}`, {
    replace: true,
    state: {
      checkIn: newCheckIn,
      checkOut: newCheckOut,
      adults: newGuests,
      children: newChildren,
      rooms: newRoomsCount,
    },
  });
  
  setShowSearchEdit(false);
};

const isFromSearch = Boolean(checkIn && checkOut);
const hasSelections = Object.keys(selectedRooms).length > 0;

const handleSelectRoom = () => {
  if (hasSelections) {
    // Map selectedRooms to the format expected by BookingPage
    const mappedSelectedRooms = Object.entries(selectedRooms).map(([roomId, qty]) => {
      const roomObj = rooms.find(r => String(r.id) === String(roomId));
      return { room: roomObj, qty };
    });

    navigate(`/book`, {
      state: {
        hotelId: hotel.id,
        checkIn: newCheckIn,
        checkOut: newCheckOut,
        guests: newGuests,
        children: newChildren,
        selectedRooms: mappedSelectedRooms,
      },
    });
  } else {
    // Fallback if no rooms selected, maybe scroll to rooms or just go to default book
    navigate(`/book/${hotel?.id || ''}`);
  }
};

  // Calculate dynamic total price
  const dynamicTotal = useMemo(() => {
    if (!hasSelections) return null;
    return Object.entries(selectedRooms).reduce((total, [roomId, qty]) => {
      const room = rooms.find(r => String(r.id) === String(roomId));
      const roomPrice = room ? (Number(room.discountPrice) || Number(room.price) || 0) : 0;
      return total + (roomPrice * qty);
    }, 0);
  }, [selectedRooms, rooms, hasSelections]);

  if (!hotel) return null;
  const { price, originalPrice, guestRating, ratingLabel, freeCancellation } = hotel;

  const discount =
    originalPrice && price && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  const displayPrice = hasSelections ? dynamicTotal : price;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 space-y-5">
      {/* Price block */}
      <div>
        {hasSelections && (
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-white bg-emerald-600 px-2 py-0.5 rounded-full mb-2">
            <CheckCircle size={12} />
            {Object.values(selectedRooms).reduce((a, b) => a + b, 0)} Room(s) Selected
          </div>
        )}
        {!hasSelections && discount > 0 && originalPrice && (
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] text-slate-400 line-through">${originalPrice}/night</span>
            <span className="text-[11px] font-bold text-white bg-rose-500 px-2 py-0.5 rounded-full">
              -{discount}%
            </span>
          </div>
        )}
        {displayPrice != null && (
          <p className="text-[28px] font-bold text-[#1E2A38] leading-none">
            ${displayPrice}
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
        <div 
          onClick={() => isFromSearch && setShowSearchEdit(true)}
          className={`border border-slate-200 rounded-xl p-3 transition-colors ${isFromSearch ? 'cursor-pointer hover:border-[#2C4A6E]' : 'opacity-75'}`}
        >
          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-1">Check-in</p>
          <div className="flex items-center gap-1.5 text-[13px] font-semibold text-[#1E2A38]">
            <Calendar size={13} className="text-[#2C4A6E]" />
           {newCheckIn || "Select date"}
          </div>
        </div>
        <div 
          onClick={() => isFromSearch && setShowSearchEdit(true)}
          className={`border border-slate-200 rounded-xl p-3 transition-colors ${isFromSearch ? 'cursor-pointer hover:border-[#2C4A6E]' : 'opacity-75'}`}
        >
          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-1">Check-out</p>
          <div className="flex items-center gap-1.5 text-[13px] font-semibold text-[#1E2A38]">
            <Calendar size={13} className="text-[#2C4A6E]" />
            {newCheckOut || "Select date"}
          </div>
        </div>
      </div>

      {/* Guests */}
      <div 
        onClick={() => isFromSearch && setShowSearchEdit(true)}
        className={`border border-slate-200 rounded-xl p-3 transition-colors ${isFromSearch ? 'cursor-pointer hover:border-[#2C4A6E]' : 'opacity-75'}`}
      >
        <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-1">Guests</p>
        <div className="flex items-center gap-1.5 text-[13px] font-semibold text-[#1E2A38]">
          <Users size={13} className="text-[#2C4A6E]" />
          {`${newGuests} Adults · ${newChildren} Children`}
        </div>
      </div>
      {/* Modify Button */}
      {isFromSearch && (
        <button
          type="button"
          onClick={() => setShowSearchEdit(!showSearchEdit)}
          className="mt-4 mb-4 flex w-full items-center justify-center gap-2 rounded-xl border border-[#2C4A6E] bg-white py-3 text-sm font-semibold text-[#2C4A6E] transition-all duration-200 hover:bg-[#2C4A6E] hover:text-white"
        >
          <Pencil size={16} />
          Modify Search
          {showSearchEdit ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
        </button>
      )}

{showSearchEdit && (
  <div className="mb-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      <div>
        <label className="mb-1 block text-xs font-semibold text-slate-500">
          Check In
        </label>
        <input
          type="date"
          value={newCheckIn}
         onChange={(e) => setNewCheckIn(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-3 py-2 focus:border-[#2C4A6E] focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-semibold text-slate-500">
          Check Out
        </label>
        <input
          type="date"
         value={newCheckOut}
          onChange={(e) => setNewCheckOut(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-3 py-2 focus:border-[#2C4A6E] focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-semibold text-slate-500">
          Adults
        </label>
        <input
          type="number"
          min="1"
          value={newGuests}
          onChange={(e) => setNewGuests(Number(e.target.value))}
          className="w-full rounded-xl border border-slate-300 px-3 py-2 focus:border-[#2C4A6E] focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-semibold text-slate-500">
          Children
        </label>
        <input
          type="number"
          min="0"
          value={newChildren}
          onChange={(e) => setNewChildren(Number(e.target.value))}
          className="w-full rounded-xl border border-slate-300 px-3 py-2 focus:border-[#2C4A6E] focus:outline-none"
        />
      </div>

      

    </div>

    <button
     onClick={handleUpdateSearch}
      className="mt-4 w-full rounded-xl bg-[#2C4A6E] py-3 font-semibold text-white hover:bg-[#1E3553]"
      
    >
      Update Search
    </button>
  </div>
)}


      {/* CTA */}
      <button
        onClick={handleSelectRoom}
        className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-[14px] font-bold text-white transition-all duration-200 hover:shadow-lg active:scale-95 ${hasSelections ? "bg-[#0071c2] hover:bg-[#005c9e]" : "bg-[#2C4A6E]"}`}
      >
        {hasSelections ? "Reserve Selected" : "Select Room"}
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
