import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { usePageContext } from "../../../Context/PageContext";

const defaultFaqs = [
  {
    q: "What time is check-in and check-out?",
    a: "Check-in begins at 3:00 PM and check-out is at 12:00 PM. We offer early check-in and late check-out based on availability for our premium suite guests."
  },
  {
    q: "Are the rates inclusive of breakfast?",
    a: "Yes, all our luxury rooms and suites include a complimentary gourmet breakfast served at our signature restaurant or via room service."
  },
  {
    q: "Do you offer airport transportation?",
    a: "We offer complimentary chauffeur-driven airport transfers for guests staying in our Executive and Presidential suites. Other guests can arrange transfers for an additional fee."
  },
  {
    q: "Is there a dress code for the restaurants?",
    a: "Our fine dining establishments require smart casual attire in the evenings. Swimwear and flip-flops are restricted to the pool and beach areas."
  }
];

export default function FAQSection() {
  const { pagesData } = usePageContext();
  const rawFaqs = pagesData.rooms?.faqSection;
  const faqs = Array.isArray(rawFaqs) && rawFaqs.length > 0 ? rawFaqs : defaultFaqs;

  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-24 bg-white border-t border-stone-100">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-light text-stone-900 font-serif"
          >
            Frequently Asked <span className="italic text-stone-500">Questions</span>
          </motion.h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border-b border-stone-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
                >
                  <span className={`text-lg font-serif transition-colors ${isOpen ? 'text-amber-600' : 'text-stone-800 group-hover:text-amber-600'}`}>
                    {faq.question || faq.q}
                  </span>
                  <div className={`ml-4 flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${isOpen ? 'border-amber-500 bg-amber-50 text-amber-600' : 'border-stone-200 text-stone-400 group-hover:border-amber-500 group-hover:text-amber-600'}`}>
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="pb-6 text-stone-500 leading-relaxed pr-12">
                        {faq.answer || faq.a}
                      </p>
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
