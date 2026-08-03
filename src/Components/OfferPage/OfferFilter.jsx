import { Search, Filter } from "lucide-react";
import { motion } from "framer-motion";

/**
 * OfferFilter
 * Contains search and dropdown filters for dynamic offer fields.
 */
export default function OfferFilter({
  occasions,
  discounts,
  hotels,
  roomCategories,
  activeFilters,
  onFilterChange,
  searchTerm,
  onSearchChange,
}) {
  return (
    <div id="offers" className="mx-auto max-w-7xl px-6 pt-16">
      <div className="flex flex-col gap-5 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        
        {/* Top row: Search and Occasion pills (if we want to use pills for occasion) */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide sm:flex-wrap sm:overflow-visible flex-1">
            <button
              onClick={() => onFilterChange('occasion', 'All')}
              className={`relative whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold transition-colors focus:outline-none ${
                activeFilters.occasion === 'All'
                  ? "text-white"
                  : "text-[#1F3B64] hover:bg-[#1F3B64]/5 border border-[#1F3B64]/15"
              }`}
            >
              {activeFilters.occasion === 'All' && (
                <motion.span
                  layoutId="active-occ-pill"
                  className="absolute inset-0 rounded-full bg-[#1F3B64]"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative z-10">All Occasions</span>
            </button>
            
            {occasions.filter(o => o !== 'All').map((occ) => {
              const isActive = occ === activeFilters.occasion;
              return (
                <button
                  key={occ}
                  onClick={() => onFilterChange('occasion', occ)}
                  className={`relative whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold transition-colors focus:outline-none ${
                    isActive
                      ? "text-white"
                      : "text-[#1F3B64] hover:bg-[#1F3B64]/5 border border-[#1F3B64]/15"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-occ-pill"
                      className="absolute inset-0 rounded-full bg-[#1F3B64]"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{occ}</span>
                </button>
              );
            })}
          </div>

          <div className="relative w-full sm:w-72">
            <Search
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search offers..."
              aria-label="Search offers"
              className="w-full rounded-full border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm text-[#1F3B64] placeholder:text-slate-400 shadow-sm focus:border-[#C9A24B] focus:outline-none focus:ring-2 focus:ring-[#C9A24B]/30"
            />
          </div>
        </div>

        {/* Bottom row: Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
          <select
            value={activeFilters.discount}
            onChange={(e) => onFilterChange('discount', e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-4 text-sm text-[#1F3B64] focus:outline-none focus:border-[#C9A24B] focus:ring-1 focus:ring-[#C9A24B]/30"
          >
            {discounts.map(d => (
              <option key={d} value={d}>{d === 'All' ? 'All Discounts' : d}</option>
            ))}
          </select>

          <select
            value={activeFilters.hotel}
            onChange={(e) => onFilterChange('hotel', e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-4 text-sm text-[#1F3B64] focus:outline-none focus:border-[#C9A24B] focus:ring-1 focus:ring-[#C9A24B]/30"
          >
            {hotels.map(h => (
              <option key={h} value={h}>{h === 'All' ? 'All Hotels' : h}</option>
            ))}
          </select>

          <select
            value={activeFilters.roomCategory}
            onChange={(e) => onFilterChange('roomCategory', e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-4 text-sm text-[#1F3B64] focus:outline-none focus:border-[#C9A24B] focus:ring-1 focus:ring-[#C9A24B]/30"
          >
            {roomCategories.map(c => (
              <option key={c} value={c}>{c === 'All' ? 'All Room Categories' : c}</option>
            ))}
          </select>
        </div>

      </div>
    </div>
  );
}
