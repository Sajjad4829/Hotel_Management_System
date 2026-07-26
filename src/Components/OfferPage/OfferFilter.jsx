import { Search } from "lucide-react";
import { motion } from "framer-motion";

/**
 * OfferFilter
 * Horizontal scrollable category pills + a search input for filtering offers.
 */
export default function OfferFilter({
  categories,
  activeCategory,
  onCategoryChange,
  searchTerm,
  onSearchChange,
}) {
  return (
    <div id="offers" className="mx-auto max-w-7xl px-6 pt-16">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide sm:flex-wrap sm:overflow-visible">
          {categories.map((cat) => {
            const isActive = cat.id === activeCategory;
            return (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(cat.id)}
                className={`relative whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3B64] ${
                  isActive
                    ? "text-white"
                    : "text-[#1F3B64] hover:bg-[#1F3B64]/5 border border-[#1F3B64]/15"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-category-pill"
                    className="absolute inset-0 rounded-full bg-[#1F3B64]"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
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
            className="w-full rounded-full border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-[#1F3B64] placeholder:text-slate-400 shadow-sm focus:border-[#C9A24B] focus:outline-none focus:ring-2 focus:ring-[#C9A24B]/30"
          />
        </div>
      </div>
    </div>
  );
}
