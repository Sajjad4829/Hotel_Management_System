import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { seasonalOffers } from "./premiumOfferData";
import { Calendar } from "lucide-react";

export default function SeasonalOffers() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-sm font-bold tracking-[0.2em] text-slate-400 uppercase mb-3"
            >
              Limited Time
            </motion.h2>
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-light text-slate-900 font-serif"
            >
              Seasonal Escapes
            </motion.h3>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/rooms" className="text-sm font-semibold tracking-wider text-amber-600 hover:text-amber-700 uppercase border-b-2 border-amber-600 pb-1">
              View All Offers
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {seasonalOffers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-slate-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={offer.image} 
                  alt={offer.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold tracking-wider text-slate-900 uppercase">
                  {offer.discount}
                </div>
              </div>

              <div className="p-8">
                <h4 className="text-2xl font-serif text-slate-900 mb-3">{offer.title}</h4>
                <div className="flex items-center gap-2 text-slate-500 text-sm mb-6">
                  <Calendar size={14} />
                  <span>{offer.validity}</span>
                </div>
                
                <div className="flex items-end justify-between mt-auto pt-6 border-t border-slate-200">
                  <div>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">From</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-light text-slate-900">{offer.price}</span>
                      <span className="text-sm text-slate-400 line-through">{offer.originalPrice}</span>
                    </div>
                  </div>
                  <Link to="/rooms" className="px-5 py-2.5 rounded-full bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors">
                    Book
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
