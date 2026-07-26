import { motion } from "framer-motion";
import { Heart, Users, Briefcase, Sparkles, CalendarDays, Crown, Check } from "lucide-react";

const icons = { Heart, Users, Briefcase, Sparkles, CalendarDays, Crown };

/**
 * PackageSection
 * Grid of curated stay packages (romantic, family, business, spa, etc.)
 */
export default function PackageSection({ packages }) {
  return (
    <section className="bg-[#FAF9F6] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C9A24B]">
            Curated For You
          </span>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-bold text-[#1F3B64]">
            Special Packages
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg, i) => {
            const Icon = icons[pkg.icon] || Sparkles;
            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                whileHover={{ y: -5 }}
                className="flex flex-col rounded-3xl border border-slate-100 bg-white p-7 shadow-sm transition-shadow hover:shadow-xl hover:shadow-[#1F3B64]/10"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1F3B64]/5 text-[#C9A24B]">
                  <Icon size={22} strokeWidth={1.8} />
                </div>

                <h3 className="font-serif text-lg font-bold text-[#1F3B64]">{pkg.name}</h3>
                <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  {pkg.duration}
                </p>

                <ul className="mt-4 space-y-2">
                  {pkg.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-slate-600">
                      <Check size={15} className="mt-0.5 flex-shrink-0 text-[#C9A24B]" />
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="mt-4 border-t border-dashed border-slate-200 pt-4">
                  <p className="mb-1 text-[11px] font-bold uppercase tracking-wide text-slate-400">
                    Includes
                  </p>
                  <p className="text-xs leading-relaxed text-slate-500">
                    {pkg.included.join(" · ")}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xl font-extrabold text-[#1F3B64]">
                    ${pkg.price}
                    <span className="text-xs font-medium text-slate-400"> /pkg</span>
                  </span>
                  <button className="rounded-full bg-[#C9A24B] px-5 py-2 text-xs font-bold uppercase tracking-wide text-[#1F3B64] transition-colors hover:bg-[#dab766] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3B64]">
                    Select
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
