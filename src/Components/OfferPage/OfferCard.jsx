import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";




const badgeStyles = {
  "30% OFF": "bg-[#C9A24B] text-[#1F3B64]",
  "Limited Time": "bg-[#1F3B64] text-white",
  "Best Seller": "bg-white text-[#1F3B64] border border-[#C9A24B]",
};

function formatExpiry(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * OfferCard
 * Glass-effect card used across the Featured Offers slider / grid.
 */
export default function OfferCard({ offer, index = 0 }) {

  
  const navigate = useNavigate();
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ y: -6 }}
      className="group relative flex w-full flex-shrink-0 flex-col overflow-hidden rounded-3xl border border-white/40 bg-white/70 shadow-lg shadow-slate-200/60 backdrop-blur-xl transition-shadow hover:shadow-2xl hover:shadow-[#1F3B64]/10"
    >
      <div className="relative h-56 w-full overflow-hidden">
        <img
          src={offer.image}
          alt={offer.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        <motion.span
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.06 + 0.2, type: "spring", stiffness: 300 }}
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide shadow-md ${badgeStyles[offer.badge] || "bg-[#1F3B64] text-white"
            }`}
        >
          {offer.badge}
        </motion.span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="font-serif text-lg font-bold text-[#1F3B64] leading-snug">
          {offer.title}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed">{offer.description}</p>

        <div className="mt-1 flex items-end gap-2">
          <span className="text-2xl font-extrabold text-[#1F3B64]">
            ${offer.discountedPrice}
          </span>
          <span className="text-sm text-slate-400 line-through">${offer.originalPrice}</span>
          <span className="ml-auto text-xs font-bold text-emerald-600">
            Save ${offer.savings}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Clock size={13} />
          <span>Expires {formatExpiry(offer.expiry)}</span>
        </div>



console.log("Offer sending:", offer);
        <Link

          className="mt-2 w-full rounded-xl bg-[#1F3B64] py-3 text-center text-sm font-bold text-white transition-colors hover:bg-[#152a49] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A24B]"
          to="/book"
          state={{
            offer,
          }}
        >
          Book Now
        </Link>


        
      </div>
    </motion.article>
  );
}
