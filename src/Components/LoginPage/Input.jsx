// src/Components/Login/Input.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  icon,
  rightElement,
  placeholder = "",
  autoComplete,
  required = false,
}) {
  const [focused, setFocused] = useState(false);
  const floated = focused || (value && value.length > 0);

  return (
    <div className="relative">
      <div
        className={`flex items-center gap-3 rounded-2xl border px-4 pt-5 pb-2.5 backdrop-blur-md transition-colors duration-300 ${
          focused
            ? "border-[#C9A455]/70 bg-white/60 dark:bg-white/[0.06] shadow-[0_0_0_4px_rgba(201,164,85,0.14)]"
            : "border-black/10 dark:border-white/10 bg-white/40 dark:bg-white/[0.03]"
        }`}
      >
        {icon && (
          <span className="text-[#8A7A50] dark:text-[#C9A455]/80 text-[17px] shrink-0">
            {icon}
          </span>
        )}

        <div className="relative flex-1">
          <motion.label
            htmlFor={name}
            initial={false}
            animate={{
              top: floated ? 2 : 14,
              fontSize: floated ? 11 : 15,
              letterSpacing: floated ? "0.04em" : "0em",
            }}
            transition={{ type: "spring", stiffness: 500, damping: 32 }}
            className="absolute left-0 origin-left text-[#6B6350] dark:text-[#B9AE93] pointer-events-none select-none"
          >
            {label}
          </motion.label>

          <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            required={required}
            autoComplete={autoComplete}
            placeholder={floated ? placeholder : ""}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="w-full bg-transparent pt-3 pb-0.5 text-[15px] text-[#1E1A10] dark:text-[#F5EFDF] outline-none placeholder:text-[#B9AE93]/70"
          />
        </div>

        {rightElement && <span className="shrink-0">{rightElement}</span>}
      </div>
    </div>
  );
}