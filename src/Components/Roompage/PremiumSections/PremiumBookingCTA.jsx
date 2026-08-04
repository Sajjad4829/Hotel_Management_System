import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { usePageContext } from "../../../Context/PageContext";

export default function PremiumBookingCTA() {
  const { pagesData } = usePageContext();
  const data = pagesData.rooms?.premiumBookingCTA || {};

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <motion.img 
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true }}
          src={data.image || "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070&auto=format&fit=crop"}
          alt="Luxury Bedroom"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-stone-900/60" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-6"
        >
          {data.tag || "Your Next Escape Awaits"}
        </motion.p>
        
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl font-light text-white font-serif leading-tight mb-8"
        >
          {data.title ? data.title : <>Experience <span className="italic">The Unforgettable</span></>}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg text-white/70 font-light mb-12 max-w-2xl mx-auto"
        >
          {data.description || "Reserve your suite today and let us tailor an experience that goes beyond imagination. Elevate your stay with our bespoke services and world-class amenities."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Link 
            to="/rooms"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group relative inline-flex items-center gap-4 bg-white hover:bg-stone-100 px-10 py-5 rounded-full text-stone-900 transition-all duration-300 shadow-2xl hover:-translate-y-1"
          >
            <span className="relative z-10 text-sm font-bold tracking-widest uppercase">
              {data.buttonText || "Check Availability"}
            </span>
            <span className="relative z-10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-2">
              <ArrowRight size={18} strokeWidth={2.5} className="text-amber-600" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
