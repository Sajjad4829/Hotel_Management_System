// src/pages/OfferDetails.jsx
import React, { useEffect, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Tag,
  CalendarClock,
  BadgeCheck,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Star,
  ChevronDown,
} from "lucide-react";

import offersData, { getOfferById, getOfferByIdOrSlug, getSimilarOffers, } from "../OfferPage/offersData";

import Breadcrumb from "./Breadcrumb";
import CountdownTimer from "./CountdownTimer";
import ImageGallery from "./ImageGallery";
import RelatedRoomCard from "./RelatedRoomCard";
import SimilarOffers from "./SimilarOffers";

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const OfferDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();



  const offer = useMemo(() => getOfferByIdOrSlug(id), [id]);
  const similarOffers = useMemo(
    () => (offer ? getSimilarOffers(offer.id, 3) : []),
    [offer]
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [id]);

  if (!offer) {
    return (
      <div className="min-h-screen bg-ink-900 flex flex-col items-center justify-center px-6 text-center">
        <p className="text-brass-400 text-sm uppercase tracking-[0.2em] mb-3">Offer not found</p>
        <h1 className="font-serif text-3xl text-ivory-50 mb-6">
          This offer may have expired or been removed.
        </h1>
        <Link
          to="/offers"
          className="rounded-full bg-brass-500 text-ink-900 px-6 py-3 text-sm font-semibold hover:bg-brass-400 transition-colors"
        >
          Browse all offers
        </Link>
      </div>
    );
  }
  const currentDate = new Date();
  const isExpired = useMemo(() => {
    return new Date(offer.expiry).getTime() < new Date().getTime();
  }, [offer.expiry]);
  // const isExpired = new Date(offer.expiry).getTime() < Date.now();

  const handleBookNow = () => {
    navigate("/book", { state: { offer, room: offer.roomName } });
  };

  const galleryImages = [offer.mainImage, ...(offer.gallery || [])].filter(
    (img, idx, arr) => arr.indexOf(img) === idx
  );

  return (
    <div className="min-h-screen bg-ink-900 text-ivory-100">
      <section className="relative h-[64vh] min-h-[440px] w-full overflow-hidden">
        {/* Slow continuous "Ken Burns" pan */}
        <motion.img
          src={offer.mainImage || offer.image}
          alt={offer.title}
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: [1.08, 1.14, 1.08], opacity: 1 }}
          transition={{
            opacity: { duration: 1.1, ease: "easeOut" },
            scale: { duration: 18, ease: "easeInOut", repeat: Infinity },
          }}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Only a light top scrim for nav legibility — most of the image
            stays bright and vivid instead of a full dark wash.
            Uses inline rgba (not Tailwind's /NN opacity syntax) so it
            renders correctly regardless of Tailwind version. */}
        <div
          className="absolute top-0 left-0 right-0 h-32"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.65), rgba(0,0,0,0))" }}
        />

        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 max-w-6xl mx-auto px-6 pt-6 flex items-center gap-2 text-xs font-medium"
        >
          <Link to="/" className="text-white hover:text-amber-400 transition-colors">
            Home
          </Link>
          <span className="text-slate-400">/</span>
          <Link to="/offers" className="text-white hover:text-amber-400 transition-colors">
            Offers
          </Link>
          <span className="text-slate-400">/</span>
          <span className="text-amber-400 line-clamp-1 max-w-[220px] sm:max-w-none">
            {offer.title}
          </span>
        </motion.nav> 
        
        {/* ── Floating glass info dock, anchored to the bottom ── */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
          }}
          className="absolute bottom-6 left-0 right-0 z-10"
        >
          <div className="max-w-6xl mx-auto px-6">
            <div
              className="rounded-3xl border shadow-2xl px-6 py-6 sm:px-8 sm:py-7 max-w-3xl backdrop-blur-xl"
              style={{
                backgroundColor: "rgba(0,0,0,0.78)",
                borderColor: "rgba(255,255,255,0.12)",
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.6)",
              }}
            >
              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 mb-4">
                {offer.badge && (
                  <motion.span
                    animate={{
                      boxShadow: [
                        "0 0 0px rgba(245,158,11,0)",
                        "0 0 18px rgba(245,158,11,0.55)",
                        "0 0 0px rgba(245,158,11,0)",
                      ],
                    }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex items-center gap-1.5 rounded-full bg-amber-500 text-slate-900 text-xs font-bold uppercase tracking-wide px-3.5 py-1.5"
                  >
                    <Sparkles size={13} />
                    {offer.badge}
                  </motion.span>
                )}
                {offer.category && (
                  <span
                    className="rounded-full border text-white text-xs font-semibold uppercase tracking-wide px-3.5 py-1.5"
                    style={{ borderColor: "rgba(255,255,255,0.3)" }}
                  >
                    {offer.category}
                  </span>
                )}
                {isExpired && (
                  <span className="rounded-full bg-red-600 text-white text-xs font-bold uppercase tracking-wide px-3.5 py-1.5">
                    Expired
                  </span>
                )}
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-serif text-2xl sm:text-4xl font-bold text-white leading-tight"
              >
                {offer.title}
              </motion.h1>

              <motion.p variants={fadeUp} className="mt-3 text-slate-300 text-sm sm:text-base">
                {offer.shortDescription}
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-4 flex items-center gap-2 text-sm font-medium text-white"
              >
                <Star size={15} className="text-amber-400" fill="currentColor" strokeWidth={0} />
                {offer.rating}
                <span className="text-slate-400">({offer.reviewCount} reviews)</span>
                <span className="text-slate-500">•</span>
                {offer.hotelName}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Gentle bouncing scroll cue */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-2 right-6 z-10 text-white"
        >
          <ChevronDown size={22} />
        </motion.div>
      </section>
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left / main column */}
        <div className="lg:col-span-2 space-y-12">
          {/* Price + expiry card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-brass-400/20 bg-gradient-to-br from-ink-800 to-ink-800/60 p-6 sm:p-8"
          >
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-ivory-400/60 mb-2">
                  Package Rate
                </p>
                <div className="flex items-baseline gap-3">
                  <span className="text-ivory-400/50 line-through text-lg">
                    {offer.currency} {offer.originalPrice}
                  </span>
                  <span className="font-serif text-4xl text-ivory-50">
                    {offer.currency} {offer.discountedPrice}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-3 text-sm">
                  <span className="flex items-center gap-1 text-brass-400 font-medium">
                    <Tag size={14} />
                    Save {offer.currency} {offer.offerSavings} ({offer.offerDiscountPercent}% off)
                  </span>
                </div>
              </div>

              <div className="text-right">
                <p className="flex items-center justify-end gap-1.5 text-xs uppercase tracking-[0.2em] text-ivory-400/60 mb-2">
                  <CalendarClock size={13} />
                  Offer expires
                </p>
                <p className="text-ivory-100 font-medium">{formatDate(offer.expiry)}</p>
              </div>
            </div>

            {!isExpired && (
              <div className="mt-6 pt-6 border-t border-ivory-100/10">
                <p className="text-xs uppercase tracking-[0.2em] text-ivory-400/60 mb-3">
                  Offer ends in
                </p>
                <CountdownTimer expiry={offer.expiry} />
              </div>
            )}
          </motion.div>

          {/* Large cover image + gallery */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <ImageGallery images={galleryImages} />
          </motion.div>

          {/* Full description */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-serif text-2xl text-ivory-50 mb-4">About This Offer</h2>
            <p className="text-ivory-300/75 leading-relaxed">{offer.offerDescription}</p>
          </motion.div>

          {/* What's included */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-serif text-2xl text-ivory-50 mb-5">What's Included</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {offer.offerIncludes.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 rounded-xl bg-ink-800/60 border border-ivory-100/10 px-4 py-3.5"
                >
                  <BadgeCheck size={18} className="text-brass-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-ivory-200/85">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Terms & conditions */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-serif text-2xl text-ivory-50 mb-5 flex items-center gap-2">
              <ShieldCheck size={20} className="text-brass-400" />
              Terms &amp; Conditions
            </h2>
            <ul className="space-y-2.5">
              {offer.terms.map((term, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-ivory-300/70">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-brass-400/70 shrink-0" />
                  {term}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-ivory-400/50">
              Valid from {offer?.validFrom ? formatDate(offer.validFrom) : "N/A"} to {formatDate(offer.expiry)}.
            </p>
          </motion.div>

          {/* Related room information */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-serif text-2xl text-ivory-50 mb-5">Your Room </h2>
            <RelatedRoomCard room={offer} />
          </motion.div>
        </div>

        {/* Right / sticky booking column */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className="lg:sticky lg:top-8 rounded-2xl border border-brass-400/25 bg-ink-800 p-6 sm:p-7"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-ivory-400/60 mb-1">
              {offer.hotelName}
            </p>
            <h3 className="font-serif text-xl text-ivory-50 mb-4">{offer.offerTitle}</h3>

            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-ivory-400/50 line-through text-sm">
                {offer.currency} {offer.originalPrice}
              </span>
              <span className="rounded-full bg-brass-500/15 text-brass-300 text-xs font-semibold px-2 py-0.5">
                -{offer.offerDiscountPercent}%
              </span>
            </div>
            <p className="font-serif text-3xl text-ivory-50 mb-1">
              {offer.currency} {offer.discountedPrice}
            </p>
            <p className="text-sm text-brass-400 mb-6">
              You save {offer.currency} {offer.savings}
            </p>

            <dl className="space-y-2.5 text-sm border-t border-ivory-100/10 pt-5 mb-6">
              <div className="flex justify-between">
                <dt className="text-ivory-400/60">Valid from</dt>
                <dd className="text-ivory-200">{formatDate(offer.validFrom)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ivory-400/60">Valid until</dt>
                <dd className="text-ivory-200">{formatDate(offer.expiry)}</dd>
              </div>
              {offer.roomName && (
                <div className="flex justify-between">
                  <dt className="text-ivory-400/60">Room</dt>
                  <dd className="text-ivory-200 text-right">{offer.roomName}</dd>
                </div>
              )}
            </dl>

            <button
              type="button"
              onClick={handleBookNow}
              disabled={isExpired}
              className="w-full flex items-center justify-center gap-2 rounded-full bg-brass-500 text-ink-900 font-semibold py-3.5 hover:bg-brass-400 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isExpired ? "Offer Expired" : "Book Now"}
              {!isExpired && <ArrowRight size={17} />}
            </button>

            <p className="mt-3 text-center text-xs text-ivory-400/50">
              No payment taken until you confirm your stay.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Similar offers                                                    */}
      {/* ---------------------------------------------------------------- */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <SimilarOffers offers={similarOffers} />
      </div>
    </div>
  );
};

export default OfferDetails;
