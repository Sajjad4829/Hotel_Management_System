import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { usePageContext } from "../../../Context/PageContext";

export default function Newsletter() {
  const { pagesData } = usePageContext();
  const data = pagesData.rooms?.newsletter || {};

  return (
    <section className="py-24 bg-[#1a1a1a] text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-4"
        >
          {data.tag || "Join The Inner Circle"}
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-light font-serif mb-6"
        >
          {data.title ? data.title : <>Exclusive <span className="italic text-white/50">Offers & Updates</span></>}
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/60 mb-10 max-w-xl mx-auto font-light"
        >
          {data.description || "Subscribe to our newsletter to receive priority access to seasonal promotions, curated experiences, and insider news."}
        </motion.p>

        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="max-w-lg mx-auto relative flex items-center"
          onSubmit={(e) => e.preventDefault()}
        >
          <input 
            type="email" 
            placeholder="Enter your email address" 
            className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-6 pr-32 text-white placeholder-white/30 focus:outline-none focus:border-amber-500/50 transition-colors"
          />
          <button 
            type="submit"
            className="absolute right-1 top-1 bottom-1 bg-amber-500 hover:bg-amber-400 text-stone-900 rounded-full px-6 font-bold uppercase tracking-widest text-xs transition-colors flex items-center gap-2"
          >
            Subscribe
          </button>
        </motion.form>
      </div>
    </section>
  );
}
