import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Images } from "lucide-react";

export default function HotelGallery({ gallery = [], name = "" }) {
  const [lightbox, setLightbox] = useState(null); // index of open image

  const open = (i) => setLightbox(i);
  const close = () => setLightbox(null);
  const prev = () => setLightbox((lightbox - 1 + gallery.length) % gallery.length);
  const next = () => setLightbox((lightbox + 1) % gallery.length);

  const main = gallery[0] ?? "";
  const thumbs = gallery.slice(1, 5);

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-4 grid-rows-2 gap-2 rounded-2xl overflow-hidden h-64 sm:h-80 md:h-96">
        {/* Main image — spans 2 cols + 2 rows */}
        <div
          className="col-span-2 row-span-2 relative cursor-pointer group"
          onClick={() => open(0)}
        >
          <img
            src={main}
            alt={`${name} main`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>

        {/* Thumbnails */}
        {thumbs.map((src, i) => (
          <div
            key={i}
            className="relative cursor-pointer group overflow-hidden"
            onClick={() => open(i + 1)}
          >
            <img
              src={src}
              alt={`${name} ${i + 2}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
            {/* "See all photos" overlay on last thumb */}
            {i === thumbs.length - 1 && gallery.length > 5 && (
              <div className="absolute inset-0 bg-black/45 flex flex-col items-center justify-center text-white">
                <Images size={20} className="mb-1" />
                <span className="text-[12px] font-semibold">+{gallery.length - 5} more</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={close}
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            onClick={close}
            aria-label="Close"
          >
            <X size={28} />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous"
          >
            <ChevronLeft size={36} />
          </button>
          <img
            src={gallery[lightbox]}
            alt={`${name} ${lightbox + 1}`}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next"
          >
            <ChevronRight size={36} />
          </button>
          <p className="absolute bottom-5 text-white/60 text-sm">
            {lightbox + 1} / {gallery.length}
          </p>
        </div>
      )}
    </>
  );
}
