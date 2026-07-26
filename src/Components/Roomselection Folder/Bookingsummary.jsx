import { ArrowRight, ShoppingCart, Tag, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TAX_RATE = 0.12;
const SERVICE_FEE_RATE = 0.05;

export default function BookingSummary({ hotel, selectedRooms, rooms }) {
  const navigate = useNavigate();

  const selectedEntries = Object.entries(selectedRooms).filter(([, qty]) => qty > 0);
  const totalRoomsCount = selectedEntries.reduce((sum, [, qty]) => sum + qty, 0);

  const subtotal = selectedEntries.reduce((sum, [roomId, qty]) => {
    const room = rooms.find((r) => r.id === Number(roomId));
    return sum + (room ? room.price * qty : 0);
  }, 0);

  const taxes = Math.round(subtotal * TAX_RATE);
  const serviceFee = Math.round(subtotal * SERVICE_FEE_RATE);
  const grandTotal = subtotal + taxes + serviceFee;

  const canContinue = totalRoomsCount > 0;

  const handleContinue = () => {
    console.log("Hotel:", hotel);
  console.log("Hotel ID:", hotel?.id);
    if (!canContinue) return;

    const roomsPayload = selectedEntries.map(([roomId, qty]) => ({
      room: rooms.find((r) => r.id === Number(roomId)),
      qty,
    }));

    

    navigate(`/book/${hotel.id}`, {
      state: {
        hotelId: hotel?.id,
        hotel,
        selectedRooms: roomsPayload,
        totalPrice: grandTotal,
      },
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-lg overflow-hidden">

      {/* Header */}
      <div className="px-5 py-4 bg-[#1a3c5e] text-white flex items-center gap-2.5">
        <ShoppingCart size={17} />
        <p className="text-[14px] font-bold tracking-wide">Booking Summary</p>
      </div>

      <div className="p-5 space-y-5">

        {/* Selected rooms list */}
        {selectedEntries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="w-12 h-12 rounded-full bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center mb-3">
              <ShoppingCart size={20} className="text-slate-300" />
            </div>
            <p className="text-[13px] font-semibold text-slate-500">No rooms selected</p>
            <p className="text-[11px] text-slate-400 mt-1">Use the + button on a room to add it</p>
          </div>
        ) : (
          <div className="space-y-3">
            {selectedEntries.map(([roomId, qty]) => {
              const room = rooms.find((r) => r.id === Number(roomId));
              if (!room) return null;
              return (
                <div key={roomId} className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold text-[#1a3c5e] leading-snug truncate">{room.name}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {qty} × ${room.price.toLocaleString()}/night
                    </p>
                  </div>
                  <p className="text-[13px] font-bold text-[#1a3c5e] flex-shrink-0">
                    ${(room.price * qty).toLocaleString()}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* Price breakdown */}
        {subtotal > 0 && (
          <>
            <div className="h-px bg-slate-100" />
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-slate-500">Subtotal</span>
                <span className="font-semibold text-slate-700">${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-[13px]">
                <span className="flex items-center gap-1 text-slate-500">
                  Taxes (12%)
                  <Info size={11} className="text-slate-300" />
                </span>
                <span className="font-semibold text-slate-700">${taxes.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-slate-500">Service Fee (5%)</span>
                <span className="font-semibold text-slate-700">${serviceFee.toLocaleString()}</span>
              </div>
            </div>

            <div className="h-px bg-slate-100" />
            <div className="flex items-center justify-between">
              <span className="text-[15px] font-bold text-[#1a3c5e]">Grand Total</span>
              <span className="text-[20px] font-bold text-[#1a3c5e]">${grandTotal.toLocaleString()}</span>
            </div>
            <p className="text-[11px] text-slate-400 -mt-3">All prices include VAT &amp; applicable taxes</p>
          </>
        )}

        {/* Promo hint */}
        {subtotal > 0 && (
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-xl px-3.5 py-2.5">
            <Tag size={13} className="text-emerald-600 flex-shrink-0" />
            <p className="text-[11px] text-emerald-700 font-medium">
              You're saving ${selectedEntries.reduce((sum, [roomId, qty]) => {
                const room = rooms.find((r) => r.id === Number(roomId));
                return sum + (room ? (room.originalPrice - room.price) * qty : 0);
              }, 0).toLocaleString()} on this booking!
            </p>
          </div>
        )}

        {/* CTA */}
        <button
           onClick={handleContinue}
          disabled={!canContinue}
          className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-[14px] font-bold
                      transition-all duration-200 active:scale-95 ${canContinue
              ? "bg-[#1a3c5e] text-white hover:bg-[#0f2640] shadow-lg shadow-[#1a3c5e]/25 hover:-translate-y-0.5"
              : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
        >
          Continue to Booking
          <ArrowRight size={16} />
        </button>

        {!canContinue && (
          <p className="text-[11px] text-slate-400 text-center -mt-2">
            Select at least one room to continue
          </p>
        )}
      </div>
    </div>
  );
}