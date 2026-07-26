import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, CheckCircle2 } from "lucide-react";

/**
 * Newsletter
 * Simple email capture form (mock — no backend call).
 */
export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <div className="rounded-3xl border border-slate-100 bg-white p-10 text-center shadow-sm sm:p-14">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#1F3B64]/5 text-[#C9A24B]">
          <Mail size={22} />
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F3B64]">
          Never Miss an Offer
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">
          Subscribe for early access to new deals, seasonal packages, and member-only pricing.
        </p>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-5 py-2.5 text-sm font-semibold text-emerald-600"
            >
              <CheckCircle2 size={16} />
              You're subscribed. Welcome!
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                aria-label="Email address"
                className="w-full rounded-full border border-slate-200 px-5 py-3 text-sm text-[#1F3B64] placeholder:text-slate-400 focus:border-[#C9A24B] focus:outline-none focus:ring-2 focus:ring-[#C9A24B]/30"
              />
              <button
                type="submit"
                className="whitespace-nowrap rounded-full bg-[#1F3B64] px-7 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#152a49] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A24B]"
              >
                Subscribe
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
