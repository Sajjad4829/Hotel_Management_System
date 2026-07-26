import React from "react";

export default function RoomSelector({ rooms, activeId, onSelect }) {
  if (!rooms || rooms.length <= 1) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-5">
      {rooms.map((room) => {
        const isActive = room.id === activeId;
        return (
          <button
            key={room.id}
            onClick={() => onSelect(room.id)}
            className={`relative px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide
              transition-all duration-300 border
              ${
                isActive
                  ? "bg-gradient-to-r from-[#2C4A6E] to-[#1c3350] text-[#F5D68A] border-[#2C4A6E] shadow-[0_6px_20px_rgba(44,74,110,0.35)]"
                  : "bg-white/70 text-[#2C4A6E] border-[#2C4A6E]/15 hover:border-[#C9A24B] hover:text-[#C9A24B] shadow-sm"
              }`}
          >
            {room.roomName}
          </button>
        );
      })}
    </div>
  );
}