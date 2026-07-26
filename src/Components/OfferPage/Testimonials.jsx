import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

/**
 * Testimonials
 * Guest review cards with star rating, avatar, name and country.
 */
export default function Testimonials({ testimonials }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12 text-center">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C9A24B]">
          Guest Stories
        </span>
        <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-bold text-[#1F3B64]">
          What Our Guests Say
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="relative flex flex-col rounded-3xl border border-slate-100 bg-white p-7 shadow-sm"
          >
            <Quote size={28} className="mb-3 text-[#C9A24B]/40" />

            <div className="mb-3 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star
                  key={s}
                  size={15}
                  className={s < t.rating ? "fill-[#C9A24B] text-[#C9A24B]" : "text-slate-200"}
                />
              ))}
            </div>

            <p className="flex-1 text-sm leading-relaxed text-slate-600">"{t.review}"</p>

            <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
              <img
                src={t.avatar}
                alt={t.name}
                loading="lazy"
                className="h-11 w-11 rounded-full object-cover ring-2 ring-[#C9A24B]/30"
              />
              <div>
                <p className="text-sm font-bold text-[#1F3B64]">{t.name}</p>
                <p className="text-xs text-slate-400">{t.country}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
