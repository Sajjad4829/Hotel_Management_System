import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { featuredOffer } from "./premiumOfferData";

export default function FeaturedLuxuryOffer() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Immersive Background Image */}
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          src={featuredOffer.image}
          alt={featuredOffer.title}
          className="w-full h-full object-cover object-center opacity-70"
        />
        {/* Soft luxury gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-20 flex flex-col justify-center h-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          {/* Floating discount badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 backdrop-blur-md mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">{featuredOffer.discount}</span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-light text-white leading-tight mb-4 font-serif">
            {featuredOffer.title}
          </h2>
          <h3 className="text-xl md:text-2xl text-slate-300 font-light mb-6 tracking-wide">
            {featuredOffer.subtitle}
          </h3>
          <p className="text-slate-400 text-base md:text-lg mb-10 max-w-xl leading-relaxed">
            {featuredOffer.description}
          </p>

          <Link
            to={featuredOffer.link}
            className="group relative inline-flex items-center gap-4 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 rounded-full text-white overflow-hidden transition-all duration-300"
          >
            <span className="relative z-10 text-sm font-semibold tracking-wider uppercase">Book This Offer</span>
            <span className="relative z-10 w-8 h-8 flex items-center justify-center rounded-full bg-amber-500 text-white group-hover:bg-amber-400 transition-colors">
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
