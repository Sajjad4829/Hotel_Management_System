import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function getTimeLeft(targetDate) {
  const diff = Math.max(0, targetDate.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function TimeBlock({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-[#C9A24B]/30 bg-white/10 backdrop-blur-md sm:h-24 sm:w-24">
        <motion.span
          key={value}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="font-serif text-3xl font-bold text-white sm:text-4xl"
        >
          {String(value).padStart(2, "0")}
        </motion.span>
      </div>
      <span className="mt-3 text-xs font-semibold uppercase tracking-widest text-white/60">
        {label}
      </span>
    </div>
  );
}

/**
 * CountdownTimer
 * Live-ticking countdown toward a fixed target date (mock offer deadline).
 */
export default function CountdownTimer({ targetDate = "2026-08-15T23:59:59" }) {
  const target = new Date(targetDate);
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(target));

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetDate]);

  return (
    <section className="relative overflow-hidden bg-[#1F3B64] py-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(201,162,75,0.25) 0%, transparent 45%), radial-gradient(circle at 80% 80%, rgba(201,162,75,0.15) 0%, transparent 45%)",
        }}
      />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C9A24B]">
          Don't Miss Out
        </span>
        <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-bold text-white">
          Limited Time Offer
        </h2>

        <div className="mt-10 flex justify-center gap-4 sm:gap-6">
          <TimeBlock value={timeLeft.days} label="Days" />
          <TimeBlock value={timeLeft.hours} label="Hours" />
          <TimeBlock value={timeLeft.minutes} label="Minutes" />
          <TimeBlock value={timeLeft.seconds} label="Seconds" />
        </div>
      </div>
    </section>
  );
}
