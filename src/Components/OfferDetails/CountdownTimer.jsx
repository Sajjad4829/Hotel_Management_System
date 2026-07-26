// src/components/CountdownTimer.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const getTimeParts = (expiry) => {
  const total = new Date(expiry).getTime() - Date.now();
  if (total <= 0) {
    return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / (1000 * 60)) % 60);
  const seconds = Math.floor((total / 1000) % 60);
  return { total, days, hours, minutes, seconds };
};

const Unit = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <div className="relative w-14 sm:w-16 rounded-lg bg-ink-800/80 border border-brass-500/20 py-2 text-center shadow-inner">
      <span className="font-serif text-xl sm:text-2xl text-ivory-100 tabular-nums">
        {String(value).padStart(2, "0")}
      </span>
    </div>
    <span className="mt-1.5 text-[10px] uppercase tracking-[0.15em] text-ivory-400/60">
      {label}
    </span>
  </div>
);

/**
 * Optional countdown shown on the Offer Details page.
 * Renders nothing (returns null) once the offer has expired.
 */
const CountdownTimer = ({ expiry }) => {
  const [time, setTime] = useState(() => getTimeParts(expiry));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeParts(expiry));
    }, 1000);
    return () => clearInterval(interval);
  }, [expiry]);

  if (time.total <= 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-2.5 sm:gap-3"
    >
      <Unit value={time.days} label="Days" />
      <span className="text-brass-500/40 font-serif text-xl -mt-4">:</span>
      <Unit value={time.hours} label="Hrs" />
      <span className="text-brass-500/40 font-serif text-xl -mt-4">:</span>
      <Unit value={time.minutes} label="Min" />
      <span className="text-brass-500/40 font-serif text-xl -mt-4">:</span>
      <Unit value={time.seconds} label="Sec" />
    </motion.div>
  );
};

export default CountdownTimer;
