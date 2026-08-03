import { Bed, Users, Maximize2, Check, Minus, Plus } from "lucide-react";
import { Link } from "react-router-dom";

export default function RoomSelectionCard({ room, qty, onQtyChange }) {
  if (!room) return null;

  const guests = (room.maxAdults || 0) + (room.maxChildren || 0);
  const breakfast = room.amenities?.includes("Breakfast") || true;
  const freeCancellation = true;
  
  const isSelected = qty > 0;

  return (
    <div className={`relative flex flex-col sm:flex-row gap-4 p-5 rounded-2xl border-2 transition-all duration-300 ${isSelected ? "border-[#0071c2] bg-[#f0f6fd]" : "border-slate-100 bg-white hover:border-slate-200"}`}>
      
      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute -top-3 -right-3 bg-[#0071c2] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md z-10 flex items-center gap-1">
          <Check size={12} />
          SELECTED
        </div>
      )}

      {/* Image */}
      <div className="sm:w-48 shrink-0 relative overflow-hidden rounded-xl">
        {room.thumbnailImage ? (
          <img src={room.thumbnailImage} alt="room" className="w-full h-32 sm:h-full object-cover" />
        ) : (
          <div className="w-full h-32 sm:h-full bg-slate-100 flex items-center justify-center text-slate-400 text-xs font-medium">No Image</div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Title and details */}
        <div className="flex justify-between items-start gap-3 mb-2">
          <div>
            <h3 className="text-[18px] font-bold text-[#1E2A38] leading-snug mb-2">{room.roomName}</h3>
            <div className="flex flex-wrap gap-x-4 gap-y-2 mb-3">
              {room.bedType && (
                <div className="flex items-center gap-1.5 text-[13px] text-slate-600">
                  <Bed size={15} className="text-[#0071c2]" />
                  <span>1 {room.bedType}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 text-[13px] text-slate-600">
                <Users size={15} className="text-[#0071c2]" />
                <span>{guests} {guests === 1 ? 'guest' : 'guests'} max</span>
              </div>
              {room.roomSize && (
                <div className="flex items-center gap-1.5 text-[13px] text-slate-600">
                  <Maximize2 size={15} className="text-[#0071c2]" />
                  <span>{room.roomSize} sq.ft</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Policies */}
        <div className="flex flex-wrap gap-4 mb-4">
          {breakfast && (
            <div className="flex items-center gap-1.5 text-[12px] font-bold text-[#008009]">
              <Check size={14} />
              <span>Breakfast included</span>
            </div>
          )}
          {freeCancellation && (
            <div className="flex items-center gap-1.5 text-[12px] font-bold text-[#008009]">
              <Check size={14} />
              <span>Free cancellation</span>
            </div>
          )}
        </div>
        
        {/* View Details Link */}
        <Link to={`/rooms/${room.id || ''}`} className="inline-flex text-[12px] font-semibold text-[#0071c2] hover:underline mt-auto">
          View all room details &amp; photos
        </Link>
      </div>

      {/* Right Column: Price and Qty */}
      <div className="flex flex-col sm:w-40 shrink-0 justify-between items-end border-t sm:border-t-0 sm:border-l border-slate-200 pt-4 sm:pt-0 sm:pl-4 mt-2 sm:mt-0">
        
        <div className="text-right mb-4">
          <p className="text-[12px] text-slate-500 mb-0.5">1 night</p>
          <p className="text-[22px] font-bold text-[#1E2A38] leading-none mb-1">
            US${room.price}
          </p>
          <p className="text-[10px] text-slate-400 leading-tight">Includes taxes<br/>and charges</p>
        </div>

        {/* Quantity Selector */}
        <div className="w-full flex flex-col gap-2">
          <p className="text-[12px] font-bold text-slate-700 text-center">Select Rooms</p>
          <div className={`flex items-center justify-between p-1 rounded-xl border-2 transition-colors ${isSelected ? 'border-[#0071c2] bg-white' : 'border-slate-200 bg-slate-50'}`}>
            <button 
              onClick={() => onQtyChange(Math.max(0, qty - 1))}
              className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${qty > 0 ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer' : 'text-slate-300 cursor-not-allowed'}`}
              disabled={qty === 0}
            >
              <Minus size={16} />
            </button>
            <span className="text-[15px] font-bold w-6 text-center">
              {qty}
            </span>
            <button 
              onClick={() => onQtyChange(qty + 1)}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#0071c2] text-white hover:bg-[#005c9e] transition-colors cursor-pointer shadow-sm"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
