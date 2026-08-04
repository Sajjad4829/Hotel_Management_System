import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { premiumFaqs as fallbackPremiumFaqs } from "./premiumOfferData";
import { usePageContext } from "../../../Context/PageContext";
import { Plus, Minus } from "lucide-react";

export default function PremiumFAQ() {
  const [openIndex, setOpenIndex] = useState(0); // First item open by default
  const { pagesData } = usePageContext();
  const premiumFaqs = pagesData.offers?.premiumFaqs?.length > 0
    ? pagesData.offers.premiumFaqs
    : fallbackPremiumFaqs;

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-[0.2em] text-slate-400 uppercase mb-3"
          >
            Details & Information
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-light text-slate-900 font-serif"
          >
            Frequently Asked Questions
          </motion.h3>
        </div>

        <div className="space-y-4">
          {premiumFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${
                  isOpen ? "bg-white border-amber-200 shadow-sm" : "bg-transparent border-slate-200 hover:border-slate-300"
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left px-8 py-6 flex items-center justify-between gap-6"
                >
                  <h4 className={`text-lg font-serif transition-colors duration-300 ${isOpen ? "text-amber-600" : "text-slate-900"}`}>
                    {faq.question}
                  </h4>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${isOpen ? "bg-amber-100 text-amber-600" : "bg-slate-100 text-slate-400"}`}>
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-8 pb-6 text-slate-500 text-sm leading-relaxed border-t border-slate-50 mt-2 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
