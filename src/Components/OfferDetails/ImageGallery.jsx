// src/components/ImageGallery.jsx
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";

/**
 * Large cover image + thumbnail strip, with a lightbox for the full gallery.
 * images: string[] (first image is treated as the cover/main image)
 */
const ImageGallery = ({ images = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!images.length) return null;

  const goTo = (dir) => {
    setActiveIndex((prev) => (prev + dir + images.length) % images.length);
  };

  return (
    <div>
      {/* Large cover image */}
      <div className="relative overflow-hidden rounded-2xl group">
        <motion.img
          key={images[activeIndex]}
          src={images[activeIndex]}
          alt="Offer view"
          initial={{ opacity: 0.4, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full h-[280px] sm:h-[420px] md:h-[480px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/40 via-transparent to-transparent pointer-events-none" />
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-ink-900/70 backdrop-blur-sm border border-brass-400/30 px-4 py-2 text-xs uppercase tracking-wide text-ivory-100 hover:bg-ink-900/90 hover:border-brass-400/60 transition-all duration-200"
        >
          <Expand size={14} />
          View full gallery
        </button>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-3">
          {images.map((img, idx) => (
            <button
              key={img + idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`relative overflow-hidden rounded-lg aspect-[4/3] border transition-all duration-200 ${
                idx === activeIndex
                  ? "border-brass-400 ring-1 ring-brass-400/50"
                  : "border-ivory-100/10 opacity-70 hover:opacity-100"
              }`}
            >
              <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/95 backdrop-blur-sm px-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="absolute top-5 right-5 text-ivory-100/80 hover:text-brass-400 transition-colors"
              aria-label="Close gallery"
            >
              <X size={28} />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goTo(-1);
              }}
              className="absolute left-3 sm:left-8 text-ivory-100/70 hover:text-brass-400 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={36} />
            </button>

            <motion.img
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              src={images[activeIndex]}
              alt={`Gallery image ${activeIndex + 1}`}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[80vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
            />

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goTo(1);
              }}
              className="absolute right-3 sm:right-8 text-ivory-100/70 hover:text-brass-400 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={36} />
            </button>

            <div className="absolute bottom-6 text-ivory-100/60 text-xs tracking-wide">
              {activeIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageGallery;
