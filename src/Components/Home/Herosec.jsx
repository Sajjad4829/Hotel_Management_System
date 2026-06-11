import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SLIDES = [
  {
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80",
    label: "Grand Suite",
  },
  {
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920&q=80",
    label: "Infinity Pool",
  },
  {
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1920&q=80",
    label: "Beachfront Villa",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % SLIDES.length);
        setFading(false);
      }, 600);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index) => {
    if (index === current) return;
    setFading(true);
    setTimeout(() => {
      setCurrent(index);
      setFading(false);
    }, 400);
  };

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">

      {/* Background image */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
          fading ? "opacity-0" : "opacity-100"
        }`}
        style={{ backgroundImage: `url(${SLIDES[current].image})` }}
        aria-hidden="true"
      />

      {/* Layered overlay — deep gradient from bottom + dark tint */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(10,8,5,0.82) 0%, rgba(10,8,5,0.45) 50%, rgba(10,8,5,0.25) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Subtle vignette ring */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.35) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Slide label — top right */}
      <div className="absolute top-8 right-8 hidden md:flex items-center gap-2">
        <span className="w-5 h-px bg-amber-400/70" />
        <span className="text-amber-300/80 text-xs tracking-[0.2em] uppercase font-medium">
          {SLIDES[current].label}
        </span>
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">

        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-8 bg-amber-400/60" />
          <span className="text-amber-400 text-xs tracking-[0.3em] uppercase font-medium">
            Aurum Hotel &amp; Resort
          </span>
          <span className="h-px w-8 bg-amber-400/60" />
        </div>

        {/* Main heading */}
        <h1
          className="text-white font-light leading-[1.1] mb-5"
          style={{
            fontFamily: "'Georgia', 'Times New Roman', serif",
            fontSize: "clamp(2.4rem, 6vw, 5rem)",
            letterSpacing: "-0.01em",
          }}
        >
          Experience{" "}
          <em
            className="not-italic"
            style={{ color: "#fbbf24", fontStyle: "italic" }}
          >
            Luxury
          </em>
          <br />
          &amp; Comfort
        </h1>

        {/* Sub heading */}
        <p
          className="text-stone-300/90 font-light mb-10 max-w-xl"
          style={{
            fontSize: "clamp(0.95rem, 2vw, 1.125rem)",
            lineHeight: "1.75",
            letterSpacing: "0.01em",
          }}
        >
          Book your perfect stay with us and enjoy world-class hospitality
          crafted for every detail of your journey.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Primary — Book Now */}
          <Link
            to="/booking"
            className="group relative inline-flex items-center gap-2 px-8 py-3.5 overflow-hidden"
            style={{
              background: "#d97706",
              borderRadius: "2px",
              transition: "background 0.25s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "#b45309")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "#d97706")
            }
          >
            <span
              className="text-white font-medium tracking-widest uppercase"
              style={{ fontSize: "0.75rem" }}
            >
              Book Now
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 h-3.5 text-white transition-transform duration-200 group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>

          {/* Secondary — Explore Rooms */}
          <Link
            to="/rooms"
            className="group inline-flex items-center gap-2 px-8 py-3.5 border border-white/40 text-white/90 hover:border-white hover:text-white transition-all duration-250"
            style={{ borderRadius: "2px" }}
          >
            <span
              className="font-medium tracking-widest uppercase"
              style={{ fontSize: "0.75rem" }}
            >
              Explore Rooms
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Slide indicators */}
        <div className="flex items-center gap-2 mt-14">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="transition-all duration-300"
              style={{
                height: "2px",
                width: i === current ? "28px" : "14px",
                background:
                  i === current
                    ? "#fbbf24"
                    : "rgba(255,255,255,0.35)",
                border: "none",
                cursor: "pointer",
                borderRadius: "2px",
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
        <span className="text-white text-[10px] tracking-[0.25em] uppercase">
          Scroll
        </span>
        <div
          className="w-px bg-white/50"
          style={{
            height: "32px",
            animation: "scrollPulse 2s ease-in-out infinite",
          }}
        />
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(0.6); transform-origin: top; }
          50% { opacity: 0.9; transform: scaleY(1); transform-origin: top; }
        }
      `}</style>
    </section>
  );
}