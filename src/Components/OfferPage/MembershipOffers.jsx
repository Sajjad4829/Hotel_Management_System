import { motion } from "framer-motion";
import { Check, X, Coffee, Clock3, ArrowUpCircle, Wine } from "lucide-react";

const perkMeta = [
  { key: "breakfast", label: "Free Breakfast", icon: Coffee },
  { key: "lateCheckout", label: "Late Checkout", icon: Clock3 },
  { key: "roomUpgrade", label: "Room Upgrade", icon: ArrowUpCircle },
  { key: "loungeAccess", label: "Lounge Access", icon: Wine },
];

const tierStyles = {
  silver: {
    ring: "border-slate-200",
    badge: "bg-slate-100 text-slate-600",
    cta: "bg-slate-700 hover:bg-slate-800",
  },
  gold: {
    ring: "border-[#C9A24B]",
    badge: "bg-[#C9A24B] text-[#1F3B64]",
    cta: "bg-[#C9A24B] hover:bg-[#dab766] text-[#1F3B64]",
  },
  vip: {
    ring: "border-[#1F3B64]",
    badge: "bg-[#1F3B64] text-white",
    cta: "bg-[#1F3B64] hover:bg-[#152a49]",
  },
};

/**
 * MembershipOffers
 * Compares Silver / Gold / VIP tiers and their perks.
 */
export default function MembershipOffers({ tiers }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12 text-center">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C9A24B]">
          Loyalty Rewards
        </span>
        <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-bold text-[#1F3B64]">
          Membership Offers
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {tiers.map((tier, i) => {
          const style = tierStyles[tier.id] || tierStyles.silver;
          const isGold = tier.id === "gold";
          return (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className={`relative flex flex-col rounded-3xl border-2 bg-white p-8 shadow-sm transition-shadow hover:shadow-xl ${style.ring} ${
                isGold ? "sm:-translate-y-2 sm:shadow-lg" : ""
              }`}
            >
              {isGold && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#C9A24B] px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-[#1F3B64] shadow">
                  Most Popular
                </span>
              )}

              <span
                className={`w-fit rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${style.badge}`}
              >
                {tier.name}
              </span>

              <p className="mt-5 font-serif text-4xl font-extrabold text-[#1F3B64]">
                {tier.discount}%
                <span className="ml-1 text-sm font-semibold text-slate-400">off stays</span>
              </p>

              <ul className="mt-6 space-y-3">
                {perkMeta.map(({ key, label, icon: Icon }) => {
                  const has = tier.perks[key];
                  return (
                    <li
                      key={key}
                      className={`flex items-center gap-3 text-sm ${
                        has ? "text-[#1F3B64] font-medium" : "text-slate-300"
                      }`}
                    >
                      <Icon size={16} className={has ? "text-[#C9A24B]" : "text-slate-300"} />
                      {label}
                      {has ? (
                        <Check size={14} className="ml-auto text-emerald-500" />
                      ) : (
                        <X size={14} className="ml-auto text-slate-200" />
                      )}
                    </li>
                  );
                })}
              </ul>

              <button
                className={`mt-8 w-full rounded-xl py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F3B64] ${style.cta}`}
              >
                Join {tier.name}
              </button>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
