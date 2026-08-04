import { motion } from "framer-motion";
import { whyGuestsLove } from "./premiumOfferData";
import { Tag, Star, CalendarCheck } from "lucide-react";

const iconMap = {
  Tag: Tag,
  Star: Star,
  CalendarCheck: CalendarCheck,
};

export default function WhyGuestsLove() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-[0.2em] text-slate-400 uppercase mb-3"
          >
            The Haven Promise
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-light text-slate-900 font-serif"
          >
            Why Guests Love Booking Direct
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {whyGuestsLove.map((item, index) => {
            const Icon = iconMap[item.icon];
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-10 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6">
                  {Icon && <Icon size={24} strokeWidth={1.5} />}
                </div>
                <h4 className="text-xl font-serif text-slate-900 mb-3">{item.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
