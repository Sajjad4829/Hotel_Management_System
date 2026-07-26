import { motion } from "framer-motion";
import { BadgeCheck, ShieldCheck, Zap, Headset } from "lucide-react";

const icons = { BadgeCheck, ShieldCheck, Zap, Headset };

/**
 * WhyBookDirect
 * Four reassurance cards explaining the benefit of booking directly.
 */
export default function WhyBookDirect({ items }) {
  return (
    <section className="bg-[#FAF9F6] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C9A24B]">
            The Direct Advantage
          </span>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-bold text-[#1F3B64]">
            Why Book Direct?
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const Icon = icons[item.icon] || BadgeCheck;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center rounded-3xl border border-slate-100 bg-white px-6 py-9 text-center shadow-sm transition-shadow hover:shadow-xl hover:shadow-[#1F3B64]/10"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#1F3B64]/5 text-[#C9A24B]">
                  <Icon size={26} strokeWidth={1.7} />
                </div>
                <h3 className="font-serif text-base font-bold text-[#1F3B64]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
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
