import { motion } from "framer-motion";
import { usePageContext } from "../../../Context/PageContext";
import * as LucideIcons from "lucide-react";

const fallbackSteps = [
  {
    icon: "Search",
    title: "Choose Offer",
    description: "Browse our curated selection of premium experiences and seasonal escapes.",
  },
  {
    icon: "CreditCard",
    title: "Book Suite",
    description: "Secure your luxury reservation instantly with our seamless booking system.",
  },
  {
    icon: "CheckCircle",
    title: "Confirmation",
    description: "Receive a personalized itinerary and welcome guide via email.",
  },
  {
    icon: "Coffee",
    title: "Enjoy Stay",
    description: "Arrive at The Haven and let our VIP concierge take care of everything.",
  }
];

export default function BookingJourney() {
  const { pagesData } = usePageContext();
  const steps = pagesData.offers?.bookingJourney?.length > 0 
    ? pagesData.offers.bookingJourney 
    : fallbackSteps;

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-[0.2em] text-slate-400 uppercase mb-3"
          >
            Seamless Experience
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-light text-slate-900 font-serif"
          >
            Your Journey Begins Here
          </motion.h3>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-[1px] bg-slate-200">
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-full h-full bg-amber-400 origin-left"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
            {steps.map((step, index) => {
              const Icon = LucideIcons[step.icon] || LucideIcons.Heart;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="w-20 h-20 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center mb-6 text-slate-400 group-hover:border-amber-400 group-hover:text-amber-500 transition-colors duration-300 relative">
                    <Icon size={32} strokeWidth={1.5} />
                    {/* Pulsing effect on hover */}
                    <div className="absolute inset-0 rounded-full border border-amber-400 scale-100 opacity-0 group-hover:animate-ping"></div>
                  </div>
                  
                  <h4 className="text-xl font-serif text-slate-900 mb-3">{step.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed max-w-[200px]">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
