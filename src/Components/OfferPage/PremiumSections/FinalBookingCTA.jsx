import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { usePageContext } from "../../../Context/PageContext";

export default function FinalBookingCTA() {
  const { pagesData } = usePageContext();
  const fallbackCtaData = {
    title: "Your Extraordinary Stay Awaits",
    tag: "Discover a world of unparalleled luxury and unforgettable moments. Reserve your preferred suite today.",
    buttonText: "Book Your Stay",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
  };
  const ctaData = { ...fallbackCtaData, ...(pagesData.offers?.finalBookingCTA || {}) };

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <motion.img 
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true }}
          src={ctaData.image} 
          alt="Luxury Resort Evening" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>
        
        {/* Soft floating glow elements */}
        <div className="absolute top-[20%] left-[20%] w-[40%] h-[40%] bg-amber-500/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[20%] right-[20%] w-[30%] h-[30%] bg-emerald-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-7xl font-light text-white font-serif leading-tight mb-6"
        >
          {ctaData.title}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-200 font-light mb-12 max-w-2xl mx-auto"
        >
          {ctaData.tag}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link 
            to="/rooms" 
            className="group relative inline-flex items-center gap-4 bg-amber-500 hover:bg-amber-400 px-10 py-5 rounded-full text-slate-900 overflow-hidden transition-all duration-300 shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:shadow-[0_0_40px_rgba(245,158,11,0.5)] hover:-translate-y-1"
          >
            <span className="relative z-10 text-base font-bold tracking-widest uppercase">
              {ctaData.buttonText}
            </span>
            <span className="relative z-10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-2">
              <ArrowRight size={20} strokeWidth={2.5} />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
