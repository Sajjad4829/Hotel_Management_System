// src/pages/ForgotPassword.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FiMail, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";

/* ------------------------------------------------------------------ */
/*  Design tokens — warm neutral luxury palette (shared with Login/Register) */
/* ------------------------------------------------------------------ */

const GOLD = "#C8A45D";
const GOLD_SOFT = "#DEC08A";
const CHARCOAL = "#241F1A";

const BG_IMAGE =
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2400&q=80";

/* ------------------------------------------------------------------ */
/*  Reusable pieces                                                    */
/* ------------------------------------------------------------------ */

const fieldVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.06 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

function FloatingInput({
  icon: Icon,
  label,
  type = "text",
  register,
  name,
  error,
  rightSlot,
  index,
  ...rest
}) {
  return (
    <motion.div
      custom={index}
      variants={fieldVariants}
      initial="hidden"
      animate="visible"
      className="relative"
    >
      <label
        htmlFor={name}
        className="mb-0.5 block text-[11.5px] font-medium tracking-wide text-[#6B5D4D]"
      >
        {label}
      </label>
      <div
        className={`group relative flex items-center rounded-xl border bg-[#FBF7F0]/80 backdrop-blur-sm transition-all duration-300
          ${
            error
              ? "border-rose-400 shadow-[0_0_0_3px_rgba(244,63,94,0.1)]"
              : "border-[#C8A45D]/25 focus-within:border-[#C8A45D] focus-within:shadow-[0_0_0_3px_rgba(200,164,93,0.18)] hover:border-[#C8A45D]/45"
          }`}
      >
        <span className="pl-3 text-[#A98A56] group-focus-within:text-[#C8A45D] transition-colors">
          <Icon size={15} />
        </span>
        <input
          id={name}
          type={type}
          autoComplete="off"
          className="peer w-full bg-transparent px-2.5 py-2 text-[13.5px] text-[#2C2620] placeholder:text-[#B2A38E] outline-none"
          {...register(name)}
          {...rest}
        />
        {rightSlot && <div className="pr-3">{rightSlot}</div>}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-[11px] font-medium text-rose-500"
        >
          {error.message}
        </motion.p>
      )}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Forgot Password Page                                               */
/* ------------------------------------------------------------------ */

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const onSubmit = async (data) => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    console.log("Forgot password payload:", data);
    setSubmitting(false);
    setSent(true);
  };

  return (
    <div className="relative flex w-full items-center justify-center overflow-hidden px-4 py-6">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600&display=swap');
        .font-luxury { font-family: 'Playfair Display', serif; }
      `}</style>

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${BG_IMAGE})` }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(36,31,26,0.55) 0%, rgba(36,31,26,0.72) 55%, rgba(20,17,14,0.85) 100%)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-[#C8A45D]/10 via-transparent to-transparent" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[
          { top: "12%", left: "10%", size: 5, delay: 0, duration: 7 },
          { top: "24%", left: "88%", size: 4, delay: 0.7, duration: 8 },
          { top: "72%", left: "6%", size: 6, delay: 1.1, duration: 6.5 },
          { top: "82%", left: "92%", size: 4, delay: 0.4, duration: 7.5 },
          { top: "45%", left: "3%", size: 3, delay: 1.6, duration: 6 },
        ].map((p, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              background: `radial-gradient(circle, ${GOLD_SOFT} 0%, ${GOLD} 65%, transparent 100%)`,
              boxShadow: "0 0 8px 2px rgba(200,164,93,0.45)",
            }}
            animate={{ y: [0, -16, 0], opacity: [0.25, 0.85, 0.25] }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-[400px] rounded-[1.5rem] border border-[#C8A45D]/25 bg-[#FBF7F0]/12 p-5 shadow-[0_25px_70px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-6"
      >
        <span className="pointer-events-none absolute left-4 top-4 h-5 w-5 rounded-tl-lg border-l border-t border-[#C8A45D]/40" />
        <span className="pointer-events-none absolute right-4 top-4 h-5 w-5 rounded-tr-lg border-r border-t border-[#C8A45D]/40" />
        <span className="pointer-events-none absolute bottom-4 left-4 h-5 w-5 rounded-bl-lg border-b border-l border-[#C8A45D]/40" />
        <span className="pointer-events-none absolute bottom-4 right-4 h-5 w-5 rounded-br-lg border-b border-r border-[#C8A45D]/40" />

        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.45 }}
          className="mb-3.5 flex flex-col items-center text-center"
        >
          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#DEC08A] to-[#C8A45D] shadow-[0_6px_18px_rgba(200,164,93,0.4)]">
            <HiOutlineBuildingOffice2 className="text-[#241F1A]" size={17} />
          </div>
          <h1 className="font-luxury text-[18px] font-semibold tracking-tight text-[#F7F1E6]">
            Forgot Password
          </h1>
          <p className="mt-0.5 text-[12px] text-[#D9CBB4]">
            Enter your email to receive a reset link
          </p>
        </motion.div>

        {sent ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-3 py-3 text-center"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#C8A45D]/15 border border-[#C8A45D]/40">
              <FiMail className="text-[#DEC08A]" size={18} />
            </div>
            <p className="text-[13px] text-[#F7F1E6]">
              A password reset link has been sent to your email.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-2.5">
            <FloatingInput
              index={0}
              icon={FiMail}
              label="Email Address"
              type="email"
              name="email"
              placeholder="you@example.com"
              error={errors.email}
              register={register}
            />

            <motion.button
              custom={1}
              variants={fieldVariants}
              initial="hidden"
              animate="visible"
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={submitting}
              className="group relative mt-1 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#DEC08A] to-[#C8A45D] py-2 text-[13px] font-semibold text-[#241F1A] shadow-[0_10px_25px_rgba(200,164,93,0.3)] transition-transform duration-300 hover:shadow-[0_10px_32px_rgba(200,164,93,0.45)] disabled:opacity-70"
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#241F1A]/30 border-t-[#241F1A]" />
                  Sending…
                </span>
              ) : (
                <>
                  Send Reset Link
                  <FiArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </>
              )}
            </motion.button>
          </form>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-3 flex items-center justify-center gap-1.5 text-center text-[11.5px] text-[#D9CBB4]"
        >
          <FiArrowLeft size={12} className="text-[#DEC08A]" />
          <Link
            to="/login"
            className="font-semibold text-[#DEC08A] hover:text-[#F0DBA9] transition-colors"
          >
            Back to Sign In
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}