import React from "react";
import { ROOM_TYPE_OPTIONS,FACILITY_OPTIONS } from "./Mockdata";
const XIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const Chip = ({ label, onRemove }) => (
  <span className="inline-flex items-center gap-1.5 bg-[#F0F4F8] border border-[#E3E9F0] text-[#1E2A38] text-xs font-medium rounded-full pl-3 pr-2 py-1.5">
    {label}
    <button
      type="button"
      onClick={onRemove}
      className="text-[#8A97A8] hover:text-[#1E2A38] transition-colors"
    >
      <XIcon />
    </button>
  </span>
);

const ActiveFilters = ({ filters, setFilters, defaultFilters }) => {
  const chips = [];

  if (filters.priceRange[0] !== defaultFilters.priceRange[0] || filters.priceRange[1] !== defaultFilters.priceRange[1]) {
    chips.push({
      key: "priceRange",
      label: `৳${filters.priceRange[0].toLocaleString()} - ৳${filters.priceRange[1].toLocaleString()}`,
      onRemove: () => setFilters((p) => ({ ...p, priceRange: defaultFilters.priceRange })),
    });
  }

  filters.roomTypes.forEach((id) => {
    const opt = ROOM_TYPE_OPTIONS.find((o) => o.id === id);
    chips.push({
      key: `room-${id}`,
      label: opt?.label,
      onRemove: () =>
        setFilters((p) => ({ ...p, roomTypes: p.roomTypes.filter((r) => r !== id) })),
    });
  });

  filters.starRating.forEach((n) => {
    chips.push({
      key: `star-${n}`,
      label: `${n} Star`,
      onRemove: () =>
        setFilters((p) => ({ ...p, starRating: p.starRating.filter((s) => s !== n) })),
    });
  });

  if (filters.guestRating > 0) {
    chips.push({
      key: "guestRating",
      label: `${filters.guestRating}+ Guest Rating`,
      onRemove: () => setFilters((p) => ({ ...p, guestRating: 0 })),
    });
  }

  if (filters.breakfastIncluded) {
    chips.push({
      key: "breakfast",
      label: "Breakfast Included",
      onRemove: () => setFilters((p) => ({ ...p, breakfastIncluded: false })),
    });
  }

  if (filters.freeCancellation) {
    chips.push({
      key: "freeCancellation",
      label: "Free Cancellation",
      onRemove: () => setFilters((p) => ({ ...p, freeCancellation: false })),
    });
  }

  filters.facilities.forEach((id) => {
    const opt = FACILITY_OPTIONS.find((o) => o.id === id);
    chips.push({
      key: `facility-${id}`,
      label: opt?.label,
      onRemove: () =>
        setFilters((p) => ({ ...p, facilities: p.facilities.filter((f) => f !== id) })),
    });
  });

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 px-4 sm:px-6 pb-4">
      {chips.map((chip) => (
        <Chip key={chip.key} label={chip.label} onRemove={chip.onRemove} />
      ))}
      <button
        type="button"
        onClick={() => setFilters(defaultFilters)}
        className="text-xs font-medium text-[#2C4A6E] hover:text-[#1E2A38] transition-colors ml-1"
      >
        Clear all
      </button>
    </div>
  );
};

export default ActiveFilters;