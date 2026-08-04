import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { usePageContext } from "../../../Context/PageContext";

export default function HeroBanner() {
  const { pagesData } = usePageContext();

  const heroConfig = pagesData?.rooms?.hero || pagesData?.rooms || {};
  const bgImg = heroConfig.backgroundGallery?.[0] || heroConfig.heroBgImage || heroConfig.backgroundImage || "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop";
  const mainTitle = heroConfig.mainTitle || heroConfig.heroTitle || heroConfig.title || "Luxurious";
  const highlightedWord = heroConfig.highlightedWord || "Accommodations";
  const secondLineTitle = heroConfig.secondLineTitle || "";
  const heroSubtitle = heroConfig.description || heroConfig.heroSubtitle || heroConfig.subtitle || "Experience the pinnacle of hospitality. Every detail of our rooms and suites is crafted for your utmost comfort and serenity.";
  const tagline = heroConfig.hotelTagline || heroConfig.tagline || "The Grandeur Collection";
  const video = heroConfig.backgroundVideo;

  return (
    <section className="relative h-[85vh] min-h-[600px] w-full flex flex-col justify-end overflow-hidden">
      {/* Background Image / Video */}
      <motion.div 
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        {video ? (
          <video
            src={video}
            autoPlay loop muted playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={bgImg}
            alt="Luxury Hotel Room"
            className="w-full h-full object-cover"
          />
        )}
      </motion.div>

      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-[#0A0A0A]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-24 w-full">
        <motion.nav 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-2 text-xs text-white/60 mb-8 uppercase tracking-widest font-medium"
        >
          <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-amber-400">Accommodations</span>
        </motion.nav>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-amber-400 text-sm font-semibold uppercase tracking-[0.3em] mb-4"
        >
          {tagline}
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl font-light text-white leading-tight mb-6 font-serif max-w-3xl"
        >
          {mainTitle} <span className="italic">{highlightedWord}</span>
          {secondLineTitle && (
            <>
              <br />
              {secondLineTitle}
            </>
          )}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-white/70 text-lg md:text-xl max-w-xl font-light leading-relaxed"
        >
          {heroSubtitle}
        </motion.p>
      </div>
    </section>
  );
}
