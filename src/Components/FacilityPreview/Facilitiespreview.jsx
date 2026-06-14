/* ─── DATA ──────────────────────────────────────────────── */
const FACILITIES = [
  {
    name: "Free WiFi",
    desc: "High-speed fibre internet everywhere",
    gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12.55a11 11 0 0 1 14.08 0" />
        <path d="M1.42 9a16 16 0 0 1 21.16 0" />
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
        <circle cx="12" cy="20" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "Swimming Pool",
    desc: "Heated infinity pool with skyline views",
    gradient: "linear-gradient(135deg, #0ea5e9, #6366f1)",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 18c1.7 0 1.7-1.5 3.4-1.5S7 18 8.7 18s1.7-1.5 3.4-1.5S13.7 18 15.4 18s1.7-1.5 3.4-1.5S20.5 18 22 18" />
        <path d="M2 21.5c1.7 0 1.7-1.5 3.4-1.5s1.7 1.5 3.4 1.5 1.7-1.5 3.4-1.5 1.7 1.5 3.4 1.5 1.7-1.5 3.4-1.5 1.7 1.5 3.4 1.5" />
        <path d="M14 2 8 8" />
        <path d="M17 5 11 11" />
        <circle cx="16.5" cy="3.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "Fitness Center",
    desc: "24-hour gym with personal trainers",
    gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6.5 6.5 17.5 17.5" />
        <path d="M21 21l-1-1" />
        <path d="M3 3l1 1" />
        <path d="M18 22l4-4" />
        <path d="M2 6l4-4" />
        <path d="M3 10l7-7" />
        <path d="M14 21l7-7" />
      </svg>
    ),
  },
  {
    name: "Valet Parking",
    desc: "Secure on-site parking & valet service",
    gradient: "linear-gradient(135deg, #14b8a6, #0ea5e9)",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="8" rx="2" />
        <path d="M5 11 6.4 6.6A2 2 0 0 1 8.3 5h7.4a2 2 0 0 1 1.9 1.6L19 11" />
        <circle cx="7.5" cy="19" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="16.5" cy="19" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "Room Service",
    desc: "In-room dining around the clock",
    gradient: "linear-gradient(135deg, #ec4899, #f43f5e)",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3a2 2 0 0 0-2 2c0 1.1.7 1.8 1 2.5L8 12h8l-3-4.5c.3-.7 1-1.4 1-2.5a2 2 0 0 0-2-2z" />
        <path d="M3 15h18" />
        <path d="M5 15a7 7 0 0 0 14 0" />
        <path d="M2 21h20" />
      </svg>
    ),
  },
  {
    name: "Gourmet Breakfast",
    desc: "Fresh, locally-sourced morning buffet",
    gradient: "linear-gradient(135deg, #f97316, #f59e0b)",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
  },
  {
    name: "24/7 Reception",
    desc: "Always-on concierge & front desk",
    gradient: "linear-gradient(135deg, #8b5cf6, #6366f1)",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    name: "Spa & Wellness",
    desc: "Rejuvenating treatments & sauna",
    gradient: "linear-gradient(135deg, #d97706, #b45309)",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2c1 3-1 4-1 6a3 3 0 0 0 6 0c0-2-2-3-1-6" />
        <path d="M7 22c0-4 2-6 5-6s5 2 5 6" />
        <path d="M5 14c1-2 2-3 2-5" />
        <path d="M19 14c-1-2-2-3-2-5" />
      </svg>
    ),
  },
];

/* ─── CARD ────────────────────────────────────────────────── */
const FacilityCard = ({ facility }) => (
  <div
    className="group relative rounded-2xl p-6 transition-all duration-300 cursor-default
               hover:-translate-y-1.5 hover:scale-[1.02]"
    style={{
      background: "rgba(255,255,255,0.6)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      border: "1px solid rgba(255,255,255,0.6)",
      boxShadow: "0 4px 20px rgba(15,23,42,0.05)",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow = `0 16px 40px rgba(15,23,42,0.10), 0 0 0 1px rgba(217,119,6,0.15), 0 0 32px -8px ${facility.gradient.match(/#[0-9a-fA-F]{6}/)[0]}66`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = "0 4px 20px rgba(15,23,42,0.05)";
    }}
  >
    {/* Gradient icon badge */}
    <div
      className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
      style={{
        background: facility.gradient,
        boxShadow: `0 8px 20px -6px ${facility.gradient.match(/#[0-9a-fA-F]{6}/)[0]}80`,
      }}
    >
      {facility.icon}
    </div>

    {/* Name */}
    <h3 className="text-slate-800 font-semibold text-[15px] mb-1 tracking-wide">
      {facility.name}
    </h3>

    {/* Description */}
    <p className="text-slate-500 text-[12.5px] leading-relaxed">
      {facility.desc}
    </p>

    {/* Bottom gradient accent line — grows on hover */}
    <div
      className="absolute bottom-0 left-6 right-6 h-[2px] rounded-full transition-all duration-300 scale-x-0 group-hover:scale-x-100"
      style={{ background: facility.gradient, transformOrigin: "left" }}
    />
  </div>
);

/* ─── MAIN SECTION ────────────────────────────────────────── */
export default function FacilitiesPreview() {
  return (
    <section className="relative py-20 lg:py-0 overflow-hidden" style={{ background: "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)" }}>

      {/* Animated blur orbs */}
      <div
        className="absolute top-10 -left-24 w-80 h-80 rounded-full pointer-events-none animate-pulse"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 70%)", filter: "blur(50px)", animationDuration: "6s" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none animate-pulse"
        style={{ background: "radial-gradient(circle, rgba(217,119,6,0.10) 0%, transparent 70%)", filter: "blur(50px)", animationDuration: "8s" }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(14,165,233,0.05) 0%, transparent 70%)", filter: "blur(60px)" }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 text-[11px] font-semibold tracking-[0.18em] uppercase"
            style={{
              background: "rgba(217,119,6,0.08)",
              color: "#b45309",
              border: "1px solid rgba(217,119,6,0.18)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#d97706" }} />
            Premium Amenities
          </div>

          <h2
            className="text-slate-900 font-light leading-tight mb-4"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "clamp(2rem, 4.5vw, 3rem)" }}
          >
            Hotel <span style={{ color: "#b45309", fontStyle: "italic" }}>Facilities</span>
          </h2>

          <p className="text-slate-500 max-w-lg mx-auto" style={{ fontSize: "clamp(0.88rem, 1.8vw, 1rem)", lineHeight: 1.8 }}>
            Enjoy world-class amenities for a comfortable stay — every detail considered, every comfort included.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FACILITIES.map((facility) => (
            <FacilityCard key={facility.name} facility={facility} />
          ))}
        </div>

      </div>
    </section>
  );
}