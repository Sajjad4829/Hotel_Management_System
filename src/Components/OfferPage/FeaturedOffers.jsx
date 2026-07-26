import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, SearchX } from "lucide-react";
import OfferCard from "./OfferCard";

function CardSkeleton() {
  return (
    <div className="w-[300px] flex-shrink-0 animate-pulse overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm sm:w-[340px]">
      <div className="h-56 w-full bg-slate-200" />
      <div className="space-y-3 p-6">
        <div className="h-4 w-3/4 rounded bg-slate-200" />
        <div className="h-3 w-full rounded bg-slate-200" />
        <div className="h-3 w-2/3 rounded bg-slate-200" />
        <div className="h-9 w-full rounded-xl bg-slate-200" />
      </div>
    </div>
  );
}

/**
 * FeaturedOffers
 * Horizontally scrollable slider of OfferCards. Simulates a brief loading
 * state (skeleton) whenever the active category/search changes.
 */
export default function FeaturedOffers({ offers }) {
  const scrollRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const t = setTimeout(() => setIsLoading(false), 450);
    return () => clearTimeout(t);
  }, [offers]);

  const scrollBy = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 360, behavior: "smooth" });
  };

  return (
    <div className="relative mx-auto max-w-7xl px-6 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F3B64]">
          Featured Offers
        </h2>
        <div className="hidden gap-2 sm:flex">
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Scroll left"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#1F3B64]/15 text-[#1F3B64] transition-colors hover:bg-[#1F3B64] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A24B]"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scrollBy(1)}
            aria-label="Scroll right"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#1F3B64]/15 text-[#1F3B64] transition-colors hover:bg-[#1F3B64] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A24B]"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {!isLoading && offers.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-slate-200 bg-slate-50 py-16 text-center">
          <SearchX size={32} className="text-slate-300" />
          <p className="text-sm font-semibold text-slate-500">No offers match your search.</p>
          <p className="text-xs text-slate-400">Try a different category or keyword.</p>
        </div>
      ) : (
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scroll-smooth scrollbar-hide"
        >
          <AnimatePresence mode="popLayout">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={`sk-${i}`} />)
              : offers.map((offer, i) => (
                  <div key={offer.id} className="w-[300px] flex-shrink-0 sm:w-[340px]">
                    <OfferCard offer={offer} index={i} />
                  </div>
                ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
