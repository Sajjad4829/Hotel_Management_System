// src/Components/Login/Login.jsx
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiSun,
  FiMoon,
  FiArrowRight,
} from "react-icons/fi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import Input from "./Input";
import Button from "./Button";
import { Link } from "react-router-dom";

function Skyline() {
  const windows = useMemo(() => {
    const cols = [
      { x: 40, h: 210, w: 46 },
      { x: 96, h: 300, w: 58 },
      { x: 164, h: 380, w: 66 },
      { x: 240, h: 260, w: 50 },
      { x: 300, h: 180, w: 40 },
    ];
    let all = [];
    cols.forEach((c, ci) => {
      const rows = Math.floor(c.h / 26);
      for (let r = 0; r < rows; r++) {
        for (let k = 0; k < Math.floor(c.w / 20); k++) {
          all.push({
            id: `${ci}-${r}-${k}`,
            x: c.x + 6 + k * 18,
            y: 460 - c.h + 10 + r * 26,
            delay: Math.random() * 6,
            dur: 3 + Math.random() * 3,
            lit: Math.random() > 0.45,
          });
        }
      }
    });
    return all;
  }, []);

  return (
    <svg
      viewBox="0 0 420 470"
      className="w-full h-full"
      preserveAspectRatio="xMidYMax meet"
    >
      <defs>
        <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3B4252" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#1A1F2B" stopOpacity="0.75" />
        </linearGradient>
        <radialGradient id="win" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#F3D089" />
          <stop offset="100%" stopColor="#C9A455" />
        </radialGradient>
      </defs>

      {[
        { x: 40, h: 210, w: 46 },
        { x: 96, h: 300, w: 58 },
        { x: 164, h: 380, w: 66 },
        { x: 240, h: 260, w: 50 },
        { x: 300, h: 180, w: 40 },
      ].map((c, i) => (
        <rect
          key={i}
          x={c.x}
          y={460 - c.h}
          width={c.w}
          height={c.h}
          rx="6"
          fill="url(#glass)"
          stroke="rgba(201,164,85,0.25)"
          strokeWidth="1"
        />
      ))}

      {windows.map((w) => (
        <motion.rect
          key={w.id}
          x={w.x}
          y={w.y}
          width="8"
          height="12"
          rx="1.5"
          fill={w.lit ? "url(#win)" : "rgba(255,255,255,0.06)"}
          animate={w.lit ? { opacity: [0.25, 1, 0.25] } : { opacity: 0.06 }}
          transition={{
            duration: w.dur,
            repeat: Infinity,
            delay: w.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  );
}

export default function Login() {
  const [theme, setTheme] = useState("dark");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1400);
  };

  return (
    <div
      className={`${theme === "dark" ? "dark" : ""} relative min-h-screen w-full overflow-hidden transition-colors duration-500`}
    >
      <div className="absolute inset-0 bg-[#F7F3EA] dark:bg-[#0B0E14] transition-colors duration-500" />

      <motion.div
        className="absolute -top-40 -left-32 h-[520px] w-[520px] rounded-full blur-[110px] opacity-40 dark:opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(201,164,85,0.9) 0%, rgba(201,164,85,0) 70%)",
        }}
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full blur-[130px] opacity-30 dark:opacity-25"
        style={{
          background:
            "radial-gradient(circle, rgba(88,101,242,0.35) 0%, rgba(88,101,242,0) 70%)",
        }}
        animate={{ x: [0, -25, 0], y: [0, -15, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.06),transparent_60%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.04),transparent_60%)]" />

      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="absolute top-6 right-6 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/[0.05] backdrop-blur-md text-[#3A3120] dark:text-[#EFE6D2] hover:scale-105 transition-transform"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
      </button>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 lg:flex-row lg:justify-between lg:px-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hidden lg:flex flex-col items-start w-[420px] shrink-0"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-b from-[#F0D28A] to-[#C9A455] shadow-[0_8px_24px_-6px_rgba(201,164,85,0.6)]">
              <HiOutlineBuildingOffice2 className="text-[#1A1406]" size={22} />
            </div>
            <span className="font-medium tracking-[0.15em] text-xs text-[#8A7A50] dark:text-[#C9A455] uppercase">
              Aurelia Suites
            </span>
          </div>

          <h1
            className="text-[42px] leading-[1.08] text-[#1E1A10] dark:text-[#F5EFDF] mb-4"
            style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}
          >
            Smart Hotel
            <br />
            Management System
          </h1>
          <p className="text-[#6B6350] dark:text-[#B9AE93] text-[15px] mb-10">
            Manage your hotel smarter.
          </p>

          <div className="h-[300px] w-full opacity-90">
            <Skyline />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex lg:hidden flex-col items-center text-center mb-8"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-b from-[#F0D28A] to-[#C9A455] shadow-[0_8px_24px_-6px_rgba(201,164,85,0.6)] mb-4">
            <HiOutlineBuildingOffice2 className="text-[#1A1406]" size={22} />
          </div>
          <h1
            className="text-[26px] leading-tight text-[#1E1A10] dark:text-[#F5EFDF] mb-1"
            style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}
          >
            Smart Hotel Management System
          </h1>
          <p className="text-[#6B6350] dark:text-[#B9AE93] text-sm">
            Manage your hotel smarter.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[420px] rounded-[28px] border border-black/10 dark:border-white/10 bg-white/55 dark:bg-white/[0.045] backdrop-blur-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.35)] p-8 sm:p-10"
        >
          <div className="mb-8">
            <h2
              className="text-[26px] text-[#1E1A10] dark:text-[#F5EFDF] mb-1.5"
              style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}
            >
              Welcome back
            </h2>
            <p className="text-[#6B6350] dark:text-[#B9AE93] text-sm">
              Sign in to access your dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email address"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              icon={<FiMail />}
              autoComplete="email"
              required
            />

            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              icon={<FiLock />}
              autoComplete="current-password"
              required
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="text-[#8A7A50] dark:text-[#B9AE93] hover:text-[#C9A455] transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <FiEyeOff size={17} /> : <FiEye size={17} />}
                </button>
              }
            />

            <div className="flex items-center justify-between pt-1 pb-2">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <button
                  type="button"
                  onClick={() => setRemember((r) => !r)}
                  className={`relative h-5 w-9 rounded-full transition-colors duration-300 ${remember
                      ? "bg-gradient-to-r from-[#E8C77E] to-[#C9A455]"
                      : "bg-black/15 dark:bg-white/15"
                    }`}
                >
                  <motion.span
                    layout
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm"
                    style={{ left: remember ? 18 : 2 }}
                  />
                </button>
                <span className="text-[13px] text-[#6B6350] dark:text-[#B9AE93]">
                  Remember me
                </span>
              </label>

              <Link
                to="/forgot-password"
                className="text-[13px] font-medium text-[#A9843F] dark:text-[#C9A455] hover:underline underline-offset-4"
              >
                Forgot password?
              </Link>
            </div>

            <Button type="submit" isLoading={loading} className="mt-2 group">
              <span className="flex items-center gap-2">
                Sign in
                <FiArrowRight className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-black/10 dark:border-white/10 text-center">
            <p className="text-[12px] text-[#8A7A50] dark:text-[#8C8264]">
              © 2026 Aurelia Suites · Smart Hotel Management System
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}