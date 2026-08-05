import { Calendar, Users, ArrowRight, Shield, Tag,Pencil, ChevronUp, ChevronDown, CheckCircle } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function BookingCard({ hotel, checkIn, checkOut, guests, children, roomsCount, selectedRooms = {}, rooms = [] }) {
const [showGuestPopup, setShowGuestPopup] = useState(false);
  const navigate = useNavigate();

const [newCheckIn, setNewCheckIn] = useState(checkIn || "");
const [newCheckOut, setNewCheckOut] = useState(checkOut || "");
const [newGuests, setNewGuests] = useState(typeof guests === "object" && guests !== null ? (Number(guests.adults) || 2) : (Number(guests) || 2));
const [newChildren, setNewChildren] = useState(typeof guests === "object" && guests !== null ? (Number(guests.children) || 0) : (Number(children) || 0));
const [newRoomsCount, setNewRoomsCount] = useState(roomsCount || 1);
const [dateError, setDateError] = useState(false);

useEffect(() => {
  if (newCheckIn && newCheckOut) setDateError(false);
}, [newCheckIn, newCheckOut]);

useEffect(() => {
  if (checkIn) setNewCheckIn(checkIn);
  if (checkOut) setNewCheckOut(checkOut);
  if (guests) {
    if (typeof guests === "object" && guests !== null) {
      setNewGuests(Number(guests.adults) || 2);
      if (guests.children !== undefined) setNewChildren(Number(guests.children) || 0);
    } else {
      setNewGuests(Number(guests) || 2);
    }
  }
  if (children && typeof guests !== "object") setNewChildren(Number(children) || 0);
  if (roomsCount) setNewRoomsCount(roomsCount);
}, [checkIn, checkOut, guests, children, roomsCount]);

const hasSelections = Object.keys(selectedRooms).length > 0;

const handleSelectRoom = () => {
  if (hasSelections) {
    if (!newCheckIn || !newCheckOut) {
      setDateError(true);
      return;
    }
    setDateError(false);
    // Map selectedRooms to the format expected by BookingPage
    const mappedSelectedRooms = Object.entries(selectedRooms).map(([roomId, qty]) => {
      const roomObj = rooms.find(r => String(r.id || r._id) === String(roomId));
      return { room: roomObj, qty };
    }).filter(item => item.room);

    navigate(`/book`, {
      state: {
        hotelId: hotel.id,
        checkIn: newCheckIn,
        checkOut: newCheckOut,
        guests: newGuests,
        children: newChildren,
        fromSelectRoom: Boolean(newCheckIn && newCheckOut),
        selectedRooms: mappedSelectedRooms,
      },
    });
  } else {
    // If no rooms selected, scroll to the rooms section smoothly
    const roomsSection = document.getElementById('rooms-section');
    if (roomsSection) {
      roomsSection.scrollIntoView({ behavior: 'smooth' });
    }
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

      {/* Date Selectors */}
      <div className="flex items-center gap-3 mb-2">
        <div className="flex-1">
          <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Check-in</label>
          <input 
            type="date"
            className="w-full border border-slate-200 rounded-lg p-2 text-[13px] font-semibold text-[#1E2A38] focus:border-[#2C4A6E] outline-none"
            value={newCheckIn}
            onChange={(e) => setNewCheckIn(e.target.value)}
          />
        </div>
        <div className="flex-1">
          <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Check-out</label>
          <input 
            type="date"
            className="w-full border border-slate-200 rounded-lg p-2 text-[13px] font-semibold text-[#1E2A38] focus:border-[#2C4A6E] outline-none"
            value={newCheckOut}
            min={newCheckIn || undefined}
            onChange={(e) => setNewCheckOut(e.target.value)}
          />
        </div>
      </div>

      {/* Unified Guests Box */}
      <div className="relative">
        <div 
          onClick={() => setShowGuestPopup(!showGuestPopup)}
          className="relative flex items-center justify-between border border-slate-200 rounded-xl p-3 cursor-pointer hover:border-[#2C4A6E] transition-colors bg-white"
        >
          <div className="flex items-center">
            <Users size={22} className="text-[#2C4A6E] mr-3" />
            <div className="flex flex-col">
              <p className="text-[12px] text-slate-500 font-medium">Select occupancy</p>
              <div className="text-[14px] font-bold text-[#1E2A38] mt-0.5">
                {`${typeof newGuests === 'object' ? (newGuests?.adults || 2) : newGuests} adults · ${typeof newChildren === 'object' ? 0 : newChildren} children · ${newRoomsCount} room`}
              </div>
            </div>
          </div>
          <ChevronDown size={18} className="text-[#2C4A6E]" />
        </div>

        {/* Guest Popup */}
        {showGuestPopup && (
          <div className="absolute top-full left-0 mt-2 w-full bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-700">Adults</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => setNewGuests(Math.max(1, (typeof newGuests === 'object' ? (newGuests?.adults || 2) : newGuests) - 1))} className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:border-[#2C4A6E] transition-colors">-</button>
                  <span className="w-4 text-center text-sm font-semibold">{typeof newGuests === 'object' ? (newGuests?.adults || 2) : newGuests}</span>
                  <button onClick={() => setNewGuests((typeof newGuests === 'object' ? (newGuests?.adults || 2) : newGuests) + 1)} className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:border-[#2C4A6E] transition-colors">+</button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-700">Children</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => setNewChildren(Math.max(0, newChildren - 1))} className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:border-[#2C4A6E] transition-colors">-</button>
                  <span className="w-4 text-center text-sm font-semibold">{newChildren}</span>
                  <button onClick={() => setNewChildren(newChildren + 1)} className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:border-[#2C4A6E] transition-colors">+</button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-700">Rooms</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => setNewRoomsCount(Math.max(1, newRoomsCount - 1))} className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:border-[#2C4A6E] transition-colors">-</button>
                  <span className="w-4 text-center text-sm font-semibold">{newRoomsCount}</span>
                  <button onClick={() => setNewRoomsCount(newRoomsCount + 1)} className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:border-[#2C4A6E] transition-colors">+</button>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setShowGuestPopup(false)}
              className="mt-5 w-full py-2.5 bg-[#0071c2] text-white rounded-lg text-sm font-bold hover:bg-[#005c9e] transition-colors"
            >
              Done
            </button>
          </div>
        )}
      </div>

      {/* CTA */}
      <button
        onClick={handleSelectRoom}
        className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-[14px] font-bold text-white transition-all duration-200 hover:shadow-lg active:scale-95 ${hasSelections ? "bg-[#0071c2] hover:bg-[#005c9e]" : "bg-[#2C4A6E]"}`}
      >
        {hasSelections ? "Reserve Selected" : "Select Room"}
        <ArrowRight size={16} />
      </button>

      {hasSelections && (!newCheckIn || !newCheckOut) && (
        <p className={`text-[12px] font-semibold transition-colors duration-200 mt-1 ${dateError ? "text-red-600 animate-pulse" : "text-amber-600"}`}>
          ⚠️ Please select check-in and check-out dates above to reserve.
        </p>
      )}

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
