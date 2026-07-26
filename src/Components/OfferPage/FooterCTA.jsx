import { motion } from "framer-motion";

/**
 * FooterCTA
 * Final full-width call-to-action banner before the page footer.
 */
export default function FooterCTA({ onBookNow }) {
  return (
    <section className="relative overflow-hidden py-24">
      <img
        src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1920&auto=format&fit=crop"
        alt="Luxury hotel suite"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(15,23,42,0.75) 0%, rgba(31,59,100,0.85) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-serif text-3xl sm:text-4xl font-bold text-white"
        >
          Ready for Your Luxury Stay?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-3 text-sm text-white/70"
        >
          Reserve today and experience hospitality redefined.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBookNow}
          className="mt-8 rounded-full bg-[#C9A24B] px-9 py-4 text-sm font-bold uppercase tracking-wider text-[#1F3B64] shadow-lg shadow-[#C9A24B]/30 transition-colors hover:bg-[#dab766] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          Book Your Room
        </motion.button>
      </div>
    </section>
  );
}
