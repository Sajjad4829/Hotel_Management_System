// src/components/SimilarOffers.jsx
import React from "react";
import { motion } from "framer-motion";
import OfferCard from "./OfferCard";

/**
 * Renders a row of related offers (same category, current offer excluded).
 * Pass the already-filtered `offers` array in (see getSimilarOffers in offersData.js).
 */
const SimilarOffers = ({ offers = [] }) => {
  if (!offers.length) return null;

  return (
    <section className="mt-16">
      <div className="flex items-end justify-between mb-6">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-brass-300/90 mb-1">
            You might also like
          </p>
          <h3 className="font-serif text-2xl sm:text-3xl text-ivory-50">Similar Offers</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer, idx) => (
          <motion.div
            key={offer.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
          >
            <OfferCard offer={offer} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SimilarOffers;
