import React from "react";
import { motion } from "framer-motion";

export default function Button({
  children,
  type = "button",
  onClick,
  isLoading = false,
  variant = "primary",
  className = "",
  ...rest
}) {
  const base =
    "relative w-full inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 font-medium text-[15px] tracking-wide transition-shadow duration-300 disabled:opacity-60 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "text-[#1A1406] bg-gradient-to-b from-[#F0D28A] to-[#C9A455] shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_10px_30px_-8px_rgba(201,164,85,0.55)] hover:shadow-[0_1px_0_rgba(255,255,255,0.7)_inset,0_14px_36px_-6px_rgba(201,164,85,0.7)]",
    ghost:
      "text-[#3A3120] dark:text-[#EFE6D2] bg-white/40 dark:bg-white/[0.04] border border-black/10 dark:border-white/10 backdrop-blur-md hover:bg-white/60 dark:hover:bg-white/[0.08]",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className={`${base} ${variants[variant]} ${className}`}
      {...rest}
    >
      {isLoading ? (
        <>
          <span className="h-4 w-4 rounded-full border-2 border-[#1A1406]/30 border-t-[#1A1406] animate-spin" />
          <span>Signing in…</span>
        </>
      ) : (
        children
      )}
    </motion.button>
  );
}