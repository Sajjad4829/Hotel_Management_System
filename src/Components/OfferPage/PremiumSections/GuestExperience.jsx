import { motion } from "framer-motion";
import { guestReviews } from "./premiumOfferData";
import { Star } from "lucide-react";

export default function GuestExperience() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-[0.2em] text-amber-600 uppercase mb-3"
          >
            Testimonials
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-light text-slate-900 font-serif"
          >
            A Lasting Impression
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {guestReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col md:flex-row gap-8 items-center bg-slate-50 p-8 rounded-3xl"
            >
              <div className="w-40 h-40 md:w-48 md:h-48 flex-shrink-0 overflow-hidden rounded-full border-4 border-white shadow-lg">
                <img 
                  src={review.image} 
                  alt={review.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div>
                <div className="flex gap-1 mb-4 text-amber-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <p className="text-slate-700 font-serif text-lg md:text-xl italic mb-6 leading-relaxed">
                  "{review.text}"
                </p>
                <div>
                  <h4 className="text-slate-900 font-bold uppercase tracking-wider text-sm">{review.name}</h4>
                  <p className="text-slate-400 text-xs mt-1">{review.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
