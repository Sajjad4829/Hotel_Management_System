import { motion } from "framer-motion";
import { luxuryAmenities } from "./premiumOfferData";
import { Waves, UtensilsCrossed, Sun, Car } from "lucide-react";

const iconMap = {
  Waves: Waves,
  UtensilsCrossed: UtensilsCrossed,
  Sun: Sun,
  Car: Car,
};

export default function LuxuryAmenities() {
  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-amber-500/5 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/5 blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-[0.2em] text-amber-500 uppercase mb-3"
          >
            Unrivaled Comfort
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-light font-serif"
          >
            Premium Amenities
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {luxuryAmenities.map((amenity, index) => {
            const Icon = iconMap[amenity.icon];
            
            return (
              <motion.div
                key={amenity.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300 backdrop-blur-sm"
              >
                <div className="w-14 h-14 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                  {Icon && <Icon size={24} strokeWidth={1.5} />}
                </div>
                <h4 className="text-xl font-serif mb-3">{amenity.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {amenity.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
