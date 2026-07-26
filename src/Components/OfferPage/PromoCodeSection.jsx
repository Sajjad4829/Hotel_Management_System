import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tag, CheckCircle2 } from "lucide-react";

/**
 * PromoCodeSection
 * Centered banner where guests can apply a promo code. Mock-validates
 * against a small local list — no backend involved.
 */
const VALID_CODES = ["LUXURY10", "GOLD20", "WELCOME15"];

export default function PromoCodeSection() {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState(null); // null | "success" | "error"

  const handleApply = (e) => {
    e.preventDefault();
    if (!code.trim()) return;
    const isValid = VALID_CODES.includes(code.trim().toUpperCase());
    setStatus(isValid ? "success" : "error");
  };

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <div className="relative overflow-hidden rounded-3xl border border-[#C9A24B]/30 bg-gradient-to-br from-[#1F3B64] to-[#16294a] px-8 py-14 text-center shadow-xl">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #C9A24B 0%, transparent 70%)" }}
        />
        <div
          className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #C9A24B 0%, transparent 70%)" }}
        />

        <Tag className="mx-auto mb-4 text-[#C9A24B]" size={28} />
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
          Have a Promo Code?
        </h2>
        <p className="mt-2 text-sm text-white/70">
          Apply your code at checkout to unlock extra savings.
        </p>

        <form
          onSubmit={handleApply}
          className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <input
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setStatus(null);
            }}
            placeholder="Enter promo code"
            aria-label="Promo code"
            className="w-full rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm text-white placeholder:text-white/50 backdrop-blur-sm focus:border-[#C9A24B] focus:outline-none focus:ring-2 focus:ring-[#C9A24B]/40"
          />
          <button
            type="submit"
            className="whitespace-nowrap rounded-full bg-[#C9A24B] px-7 py-3 text-sm font-bold uppercase tracking-wide text-[#1F3B64] transition-colors hover:bg-[#dab766] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Apply
          </button>
        </form>

        <AnimatePresence mode="wait">
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mx-auto mt-5 flex w-fit items-center gap-2 rounded-full bg-emerald-500/15 px-4 py-2 text-sm font-semibold text-emerald-300"
            >
              <CheckCircle2 size={16} />
              Code applied! Enjoy your extra discount.
            </motion.div>
          )}
          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mx-auto mt-5 w-fit rounded-full bg-red-500/15 px-4 py-2 text-sm font-semibold text-red-300"
            >
              That code isn't valid. Try LUXURY10, GOLD20, or WELCOME15.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
