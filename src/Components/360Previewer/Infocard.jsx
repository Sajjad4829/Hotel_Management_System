import React from "react";
import { AMENITY_META } from "./roomVirtualTourData";

export default function InfoCard({ room }) {
  if (!room) return null;

  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-2xl shadow-[0_20px_50px_rgba(28,51,80,0.15)] p-6 flex flex-col gap-5 h-full">
      <div>
        <p className="text-[11px] uppercase tracking-widest text-[#C9A24B] font-semibold mb-1">
          Room Details
        </p>
        <h3 className="text-2xl font-bold text-[#2C4A6E]">{room.roomName}</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Stat label="Size" value={room.size} />
        <Stat label="Guests" value={`${room.capacity} guests`} />
        <Stat label="Bed Type" value={room.bedType} />
        <Stat label="Price" value={`$${room.price} / night`} accent />
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-[#2C4A6E]/15 to-transparent" />

      <div>
        <p className="text-[11px] uppercase tracking-widest text-[#2C4A6E]/50 font-semibold mb-3">
          Amenities
        </p>
        <div className="grid grid-cols-2 gap-2.5">
          {room.amenities.map((key) => {
            const meta = AMENITY_META[key];
            if (!meta) return null;
            return (
              <div
                key={key}
                className="flex items-center gap-2 bg-white/70 border border-[#2C4A6E]/10 rounded-lg px-3 py-2 text-sm text-[#1c2b3d] hover:border-[#C9A24B]/50 hover:shadow-sm transition-all"
              >
                <span className="text-base">{meta.icon}</span>
                <span className="truncate">{meta.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <button className="mt-auto w-full py-3 rounded-full bg-gradient-to-r from-[#2C4A6E] to-[#1c3350] text-[#F5D68A] font-semibold text-sm tracking-wide shadow-md hover:shadow-[0_10px_30px_rgba(44,74,110,0.4)] hover:scale-[1.02] transition-all duration-300">
        Book This Room
      </button>
    </div>
  );
}

function Stat({ label, value, accent }) {
  return (
    <div>
      <p className="text-[11px] text-[#2C4A6E]/50 font-medium mb-0.5">{label}</p>
      <p className={`text-sm font-semibold ${accent ? "text-[#C9A24B]" : "text-[#2C4A6E]"}`}>
        {value}
      </p>
    </div>
  );
}