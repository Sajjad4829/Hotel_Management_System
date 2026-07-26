// src/components/RelatedRoomCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, BedDouble, Star, Wifi, Wind, Car, Coffee } from "lucide-react";

const amenityIcon = (label = "") => {
  const l = label.toLowerCase();
  if (l.includes("wi-fi") || l.includes("wifi")) return <Wifi size={13} />;
  if (l.includes("air") || l.includes("condition")) return <Wind size={13} />;
  if (l.includes("park")) return <Car size={13} />;
  if (l.includes("coffee") || l.includes("espresso") || l.includes("tea")) return <Coffee size={13} />;
  return <span className="w-1.5 h-1.5 rounded-full bg-brass-400 inline-block" />;
};

/**
 * Displays the room automatically linked to an offer via offer.roomId.
 * Pass the resolved `room` object in (looked up from roomsData by the parent).
 */
const RelatedRoomCard = ({ room }) => {
  if (!room) return null;

  const {
    id,
    roomName,
    roomType,
    mainImage,
    capacity,
    bedType,
    bedCount,
    amenities = [],
    rating,
    reviewCount,
    price,
    discountPrice,
    currency,
  } = room;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col sm:flex-row overflow-hidden rounded-2xl bg-ink-800 border border-ivory-100/10"
    >
      <div className="sm:w-2/5 h-56 sm:h-auto overflow-hidden">
        <img src={mainImage} alt={roomName} className="w-full h-full object-cover" />
      </div>

      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-brass-300/90 mb-1">
            {roomType} Room
          </p>
          <h4 className="font-serif text-xl text-ivory-50">{roomName}</h4>

          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ivory-300/70">
            <span className="flex items-center gap-1.5">
              <Users size={14} /> Sleeps {capacity}
            </span>
            <span className="flex items-center gap-1.5">
              <BedDouble size={14} /> {bedCount} × {bedType}
            </span>
            <span className="flex items-center gap-1.5 text-brass-300">
              <Star size={14} fill="currentColor" strokeWidth={0} /> {rating}
              <span className="text-ivory-400/50">({reviewCount})</span>
            </span>
          </div>

          {amenities.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {amenities.slice(0, 5).map((a) => (
                <span
                  key={a}
                  className="flex items-center gap-1.5 rounded-full bg-ink-900/60 border border-ivory-100/10 px-3 py-1 text-xs text-ivory-300/80"
                >
                  {amenityIcon(a)}
                  {a}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="mt-5 flex items-end justify-between border-t border-ivory-100/10 pt-4">
          <div>
            {price ? (
              <span className="block text-xs text-ivory-400/50 line-through">
                {currency} {price}
              </span>
            ) : null}
            <span className="font-serif text-lg text-ivory-50">
              {currency} {discountPrice ?? price}
              <span className="text-xs text-ivory-400/50 font-sans"> / night</span>
            </span>
          </div>

          <Link
            to={`/rooms/${id}`}
            className="rounded-full border border-brass-400/50 px-5 py-2 text-sm text-brass-300 hover:bg-brass-500 hover:text-ink-900 hover:border-brass-500 transition-colors duration-200"
          >
            View Room Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default RelatedRoomCard;
