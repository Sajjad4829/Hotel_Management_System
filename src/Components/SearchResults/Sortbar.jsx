import React, { useState, useRef, useEffect } from "react";
import { SORT_OPTIONS } from "./Mockdata";

const ChevronIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const FilterIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 6h16M7 12h10M10 18h4" />
  </svg>
);

const SortBar = ({ sort, onSortChange, onOpenMobileFilters, resultsCount, activeFilterCount }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const currentLabel =
    SORT_OPTIONS.find((o) => o.id === sort)?.label || "Recommended";

  return (
    <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-[#E3E9F0]">
      <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5">
        <button
          type="button"
          onClick={onOpenMobileFilters}
          className="lg:hidden relative inline-flex items-center gap-2 text-sm font-medium text-[#1E2A38] border border-[#E3E9F0] rounded-xl px-4 py-2.5"
        >
          <FilterIcon />
          Filters
          {activeFilterCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-4.5 h-[18px] min-w-[18px] px-1 flex items-center justify-center rounded-full bg-[#1E2A38] text-white text-[10px] font-semibold">
              {activeFilterCount}
            </span>
          )}
        </button>

        <p className="hidden sm:block text-sm text-[#5B6B7D]">
          <span className="font-semibold text-[#1E2A38]">
            {resultsCount}
          </span>{" "}
          properties found
        </p>

        <div className="relative ml-auto" ref={ref}>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#1E2A38] border border-[#E3E9F0] rounded-xl px-4 py-2.5 hover:border-[#CBD4DF] transition-colors"
          >
            <span className="text-[#8A97A8] font-normal hidden sm:inline">
              Sort by:
            </span>
            {currentLabel}
            <ChevronIcon />
          </button>

          <div
            className={`absolute right-0 mt-2 w-56 bg-white border border-[#E3E9F0] rounded-xl shadow-xl overflow-hidden origin-top-right transition-all duration-200 ${
              open
                ? "opacity-100 scale-100 pointer-events-auto"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  onSortChange(opt.id);
                  setOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                  sort === opt.id
                    ? "bg-[#F7F9FB] text-[#1E2A38] font-semibold"
                    : "text-[#3D4A5C] hover:bg-[#F7F9FB]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortBar;