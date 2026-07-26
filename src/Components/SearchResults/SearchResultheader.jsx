import { MapPin, Calendar, Users, ChevronDown, Map, SlidersHorizontal } from "lucide-react";
import SearchBookingBar from "../Bookingsearch/BookingSearch";

const SORT_OPTIONS = [
  { value: "recommended", label: "Recommended" },
  { value: "price_asc", label: "Lowest Price" },
  { value: "price_desc", label: "Highest Price" },
  { value: "rating_desc", label: "Highest Rating" },
  { value: "popular", label: "Most Popular" },
  { value: "newest", label: "Newest" },
];

export default function SearchResultHeader({
  searchParams,
  totalFound,
  sortBy,
  onSortChange,
  onMobileFilterOpen,
}) {
  const { location, checkIn, checkOut, adults, children, rooms } = searchParams;

  return (
   <>
       
   
    <div className="bg-white border-b border-slate-100 sticky top-0 z-30">
      {/* Search Summary Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center gap-3">
        {/* Location */}
        <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2 border border-slate-200">
          <MapPin size={14} className="text-[#2C4A6E] flex-shrink-0" />
          <span className="text-[13px] font-semibold text-[#1E2A38]">{location}</span>
        </div>
        {/* Check-in / Check-out */}
        <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2 border border-slate-200">
          <Calendar size={14} className="text-[#2C4A6E] flex-shrink-0" />
          <span className="text-[12px] text-slate-600">
            {checkIn} &rarr; {checkOut}
          </span>
        </div>
        {/* Guests */}
        <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2 border border-slate-200">
          <Users size={14} className="text-[#2C4A6E] flex-shrink-0" />
          <span className="text-[12px] text-slate-600">
            {adults} Adults · {children} Children · {rooms} Room{rooms > 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Results Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-3 flex-wrap">
        {/* Total count */}
        <p className="text-[13px] text-slate-500">
          <span className="font-bold text-[#1E2A38] text-[15px]">{totalFound}</span>{" "}
          properties found in{" "}
          <span className="font-semibold text-[#2C4A6E]">{location}</span>
        </p>

        <div className="flex items-center gap-3 ml-auto">
          {/* Map button */}
          <button className="hidden sm:flex items-center gap-1.5 text-[12px] font-semibold text-[#2C4A6E] border border-[#2C4A6E]/30 rounded-xl px-3 py-2 hover:bg-[#2C4A6E]/5 transition-colors duration-200">
            <Map size={14} />
            Map View
          </button>

          {/* Mobile filter button */}
          <button
            onClick={onMobileFilterOpen}
            className="lg:hidden flex items-center gap-1.5 text-[12px] font-semibold text-white bg-[#2C4A6E] rounded-xl px-3 py-2 hover:bg-[#1E2A38] transition-colors duration-200"
          >
            <SlidersHorizontal size={14} />
            Filters
          </button>

          {/* Sort dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none bg-white border border-slate-200 rounded-xl text-[12px] font-semibold text-[#1E2A38] px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-[#2C4A6E]/20 cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  Sort: {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
   </>
  );
}