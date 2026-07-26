import React from "react";

const AMENITY_ICONS = {
  wifi: (
    <path d="M5 12.5a11 11 0 0 1 14 0M8 15.7a6.5 6.5 0 0 1 8 0M11.5 19a1.5 1.5 0 0 1 1-.02" />
  ),
  ac: <path d="M12 3v18M5 7l14 10M19 7L5 17" />,
  breakfast: <path d="M4 11h16v2a7 7 0 0 1-7 7h-2a7 7 0 0 1-7-7v-2zM8 11V7a4 4 0 1 1 8 0v4" />,
  balcony: <path d="M4 21V9l8-5 8 5v12M4 21h16M8 21v-6h8v6" />,
  oceanView: <path d="M2 18c1.5-2 3-2 4.5 0s3 2 4.5 0 3-2 4.5 0 3 2 4.5 0M4 12l8-7 8 7" />,
  petFriendly: <circle cx="12" cy="12" r="8" />,
};

const AmenityIcon = ({ id }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {AMENITY_ICONS[id] || <circle cx="12" cy="12" r="9" />}
  </svg>
);

const GuestsIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
    <circle cx="17" cy="8.5" r="2.4" />
    <path d="M15.8 14c2.3.3 4.2 2 4.2 5" />
  </svg>
);

const BedIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6M3 18v2M21 18v2M3 12V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" />
  </svg>
);

const SizeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h6M4 4v6M4 4l6 6M20 4h-6M20 4v6M20 4l-6 6M4 20h6M4 20v-6M4 20l6-6M20 20h-6M20 20v-6M20 20l-6-6" />
  </svg>
);

const RoomCard = ({ room, image, onBook }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 border border-[#E9ECF1] rounded-xl p-3 hover:border-[#CBD4DF] transition-colors">
      <div className="sm:w-40 h-28 sm:h-auto rounded-lg overflow-hidden shrink-0 bg-[#F0F4F8]">
        <img
          src={image}
          alt={room.name}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-[#1E2A38] mb-1.5">
          {room.name}
        </h4>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#5B6B7D] mb-2">
          <span className="flex items-center gap-1.5">
            <GuestsIcon /> {room.guests} Guests
          </span>
          <span className="flex items-center gap-1.5">
            <BedIcon /> {room.bedType}
          </span>
          <span className="flex items-center gap-1.5">
            <SizeIcon /> {room.sizeSqm} m²
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-1">
          {room.amenities.map((a) => (
            <span
              key={a}
              className="inline-flex items-center gap-1 text-[11px] text-[#5B6B7D] bg-[#F7F9FB] border border-[#E9ECF1] rounded-full px-2 py-1"
            >
              <AmenityIcon id={a} /> {a}
            </span>
          ))}
        </div>
        <p className="text-[11px] text-[#B4483D] font-medium">
          Only {room.availableRooms} room{room.availableRooms > 1 ? "s" : ""} left
        </p>
      </div>

      <div className="flex sm:flex-col items-end sm:items-end justify-between sm:justify-center gap-2 sm:w-36 shrink-0 sm:border-l sm:border-[#E9ECF1] sm:pl-4">
        <div className="text-right">
          <p className="text-[11px] text-[#8A97A8]">Per night</p>
          <p className="text-lg font-semibold text-[#1E2A38]">
            ৳{room.price.toLocaleString()}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onBook?.(room)}
          className="bg-[#1E2A38] hover:bg-[#2C4A6E] text-white text-xs font-medium rounded-lg px-4 py-2.5 transition-colors whitespace-nowrap"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default RoomCard;