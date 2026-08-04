import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function LimitedTimeDeal() {
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 14,
    minutes: 25,
    seconds: 50
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              }
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num) => num.toString().padStart(2, "0");

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 shadow-2xl">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070&auto=format&fit=crop" 
              alt="Luxury suite" 
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
          </div>

          <div className="relative z-10 p-10 md:p-16 lg:p-24 flex flex-col lg:flex-row items-center justify-between gap-12">
            
            <div className="max-w-xl text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex px-4 py-1.5 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-400 text-xs font-bold tracking-widest uppercase mb-6"
              >
                Flash Sale
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-serif text-white mb-4 leading-tight"
              >
                Book 3 Nights, <br /> Get 1 Free
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-slate-300 text-lg mb-8"
              >
                Secure your luxury getaway now and enjoy an extra night on us. Valid for all premium suites.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Link to="/rooms" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-slate-900 font-semibold tracking-wide hover:bg-slate-100 transition-colors">
                  Claim Offer Now
                </Link>
              </motion.div>
            </div>

            {/* Countdown Timer */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex gap-4 md:gap-6"
            >
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
                { label: "Seconds", value: timeLeft.seconds }
              ].map((time, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                    <span className="text-2xl md:text-4xl font-light text-white font-serif">{formatNumber(time.value)}</span>
                  </div>
                  <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">{time.label}</span>
                </div>
              ))}
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
