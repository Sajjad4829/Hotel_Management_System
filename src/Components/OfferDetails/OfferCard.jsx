
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Tag, ArrowRight } from "lucide-react";

/**
 * Offer summary card. Navigates to the Offer Details page — it does NOT
 * open the booking flow directly (per the offers module spec).
 */
const OfferCard = ({ offer }) => {
  const navigate = useNavigate();

  if (!offer) return null;

  const {
    id,
    offerTitle,
    offerBadge,
    offerCategory,
    shortDescription,
    mainImage,
    currency,
    offerOriginalPrice,
    offerDiscountPrice,
    offerDiscountPercent,
    rating,
    reviewCount,
    hotelName,
  } = offer;

  const goToDetails = () => navigate(`/offers/${id}`);

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onClick={goToDetails}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && goToDetails()}
      className="group relative cursor-pointer overflow-hidden rounded-2xl bg-slate-900 border border-white/10 hover:border-amber-400/50 shadow-lg shadow-black/30 transition-colors duration-300"
    >
      {/* ── Image ── */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={mainImage}
          alt={offerTitle}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Subtle top scrim so the floating badges stay legible on any image */}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/70 to-transparent pointer-events-none" />

        {offerBadge && (
          <span className="absolute top-4 left-4 rounded-full bg-amber-500 text-slate-900 text-[11px] font-bold uppercase tracking-wide px-3 py-1 shadow-md">
            {offerBadge}
          </span>
        )}

        {offerDiscountPercent ? (
          <span className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-black/85 border border-amber-400/40 text-amber-300 text-[11px] font-bold px-3 py-1">
            <Tag size={11} />
            -{offerDiscountPercent}%
          </span>
        ) : null}

        {/* Category chip — solid dark pill, always readable regardless of the photo */}
        <span className="absolute bottom-4 left-4 rounded-full bg-black/85 border border-amber-400/30 text-amber-300 text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1">
          {offerCategory}
        </span>
      </div>

      {/* ── Solid title panel straddling the image/body seam ── */}
      <div className="relative -mt-6 mx-4 rounded-xl bg-slate-900 border border-white/10 shadow-lg shadow-black/40 px-4 py-3">
        <h3 className="font-serif text-lg text-white leading-snug line-clamp-1">
          {offerTitle}
        </h3>
        <div className="mt-1 flex items-center gap-1 text-amber-400 text-xs">
          <Star size={12} fill="currentColor" strokeWidth={0} />
          <span className="text-white font-semibold">{rating}</span>
          <span className="text-slate-400">({reviewCount})</span>
          <span className="mx-1.5 text-slate-600">•</span>
          <span className="text-slate-400 truncate">{hotelName}</span>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="px-5 pb-5 pt-4">
        <p className="text-sm text-slate-400 line-clamp-2 min-h-[2.5rem]">
          {shortDescription}
        </p>

        <div className="mt-4 flex items-end justify-between border-t border-white/10 pt-4">
          <div>
            {offerOriginalPrice ? (
              <span className="block text-xs text-slate-500 line-through">
                {currency} {offerOriginalPrice}
              </span>
            ) : null}
            <span className="font-serif text-xl font-bold text-white">
              {currency} {offerDiscountPrice}
            </span>
          </div>

          <span className="flex items-center gap-1 text-sm font-semibold text-amber-400 group-hover:gap-2 transition-all duration-300">
            <Link to={`/offers/${offer.id}`}>
              View Offer
            </Link>
            <ArrowRight size={15} />
          </span>
        </div>
      </div>
    </motion.article>
  );
};

export default OfferCard;