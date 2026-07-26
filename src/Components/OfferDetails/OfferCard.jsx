// src/components/OfferCard.jsx
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
      className="group relative cursor-pointer overflow-hidden rounded-2xl bg-ink-800 border border-ivory-100/10 hover:border-brass-400/40 shadow-lg shadow-black/20 transition-colors duration-300"
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={mainImage}
          alt={offerTitle}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/10 to-transparent" />

        {offerBadge && (
          <span className="absolute top-4 left-4 rounded-full bg-brass-500 text-ink-900 text-[11px] font-semibold uppercase tracking-wide px-3 py-1 shadow-md">
            {offerBadge}
          </span>
        )}

        {offerDiscountPercent ? (
          <span className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-ink-900/80 backdrop-blur-sm border border-brass-400/40 text-brass-300 text-[11px] font-semibold px-3 py-1">
            <Tag size={11} />
            -{offerDiscountPercent}%
          </span>
        ) : null}

        <div className="absolute bottom-3 left-4 right-4">
          <p className="text-[11px] uppercase tracking-[0.2em] text-brass-300/90 mb-1">
            {offerCategory}
          </p>
          <h3 className="font-serif text-lg text-ivory-50 leading-snug">
            {offerTitle}
          </h3>
        </div>
      </div>

      <div className="p-5">
        <p className="text-sm text-ivory-300/70 line-clamp-2 min-h-[2.5rem]">
          {shortDescription}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1 text-brass-300 text-sm">
            <Star size={14} fill="currentColor" strokeWidth={0} />
            <span>{rating}</span>
            <span className="text-ivory-400/50 text-xs">({reviewCount})</span>
          </div>
          <span className="text-xs text-ivory-400/50">{hotelName}</span>
        </div>

        <div className="mt-4 flex items-end justify-between border-t border-ivory-100/10 pt-4">
          <div>
            {offerOriginalPrice ? (
              <span className="block text-xs text-ivory-400/50 line-through">
                {currency} {offerOriginalPrice}
              </span>
            ) : null}
            <span className="font-serif text-xl text-ivory-50">
              {currency} {offerDiscountPrice}
            </span>
          </div>

          <span className="flex items-center gap-1 text-sm text-brass-400 group-hover:gap-2 transition-all duration-300">
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
