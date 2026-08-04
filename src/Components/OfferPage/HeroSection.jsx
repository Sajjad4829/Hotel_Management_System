import { motion } from "framer-motion";

/**
 * HeroSection
 * Large banner introducing the offers page with a title, subtitle and CTA.
 */
export default function HeroSection({ onViewOffers, data = {} }) {
  const bgImg = data.backgroundGallery?.[0] || data.bgImage || "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1920&auto=format&fit=crop";
  const badgeText = data.hotelTagline || data.badgeText || "MEMBERS-ONLY SAVINGS";
  const title = data.mainTitle || data.title || "Exclusive Hotel Offers";
  const subtitle = data.description || data.subtitle || "Save more on your next stay with our exclusive deals and luxury packages.";
  const btnText = data.primaryButtonText || data.btnText || "View Offers";

  return (
    <section className="relative h-[70vh] min-h-[520px] w-full overflow-hidden">
      {data.backgroundVideo ? (
        <video
          src={data.backgroundVideo}
          autoPlay loop muted playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <img
          src={bgImg}
          alt="Luxury hotel exterior at dusk"
          loading="eager"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(31,59,100,0.55) 0%, rgba(15,23,42,0.65) 55%, rgba(15,23,42,0.85) 100%)",
        }}
      />

      <div className="relative z-10 flex h-full max-w-7xl mx-auto flex-col items-center justify-center px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 inline-block rounded-full border border-[#C9A24B]/50 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-[#E9D5A0] backdrop-blur-sm"
        >
          {badgeText}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-5 max-w-xl text-base sm:text-lg text-white/85"
        >
          {subtitle}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={onViewOffers}
          className="mt-9 rounded-full bg-[#C9A24B] px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-[#1F3B64] shadow-lg shadow-[#C9A24B]/30 transition-colors hover:bg-[#dab766] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F3B64]"
        >
          {btnText}
        </motion.button>
      </div>
    </section>
  );
}
