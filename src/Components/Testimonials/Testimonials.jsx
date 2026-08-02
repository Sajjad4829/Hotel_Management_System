import { Star, Quote, ShieldCheck, MapPin, Users, Award, Repeat, Globe, TrendingUp, Heart, CheckCircle, Building, HelpCircle } from "lucide-react";
import { usePageContext } from "../../Context/PageContext";

/* ════════════════════════════════════════════════════════
   DATA
   ════════════════════════════════════════════════════════ */
const TESTIMONIALS = [
  {
    name: "Sophia Bennett",
    location: "London, United Kingdom",
    rating: 5,
    review:
      "An absolutely stunning property. From the moment we arrived, the staff anticipated every need. The infinity pool and spa were the highlight of our trip — we'll be back.",
    initials: "SB",
    color: "linear-gradient(135deg, #f59e0b, #6366f1)",
  },
  {
    name: "Daniel Mensah",
    location: "Accra, Ghana",
    rating: 5,
    review:
      "Service was impeccable and the rooms exceeded expectations. The breakfast spread alone is worth the stay. Highly recommend the Ocean Suite for the views.",
    initials: "DM",
    color: "linear-gradient(135deg, #0ea5e9, #f59e0b)",
  },
  {
    name: "Aiko Tanaka",
    location: "Tokyo, Japan",
    rating: 4.5,
    review:
      "Beautifully designed, peaceful, and quiet despite being in the city center. The concierge helped plan our entire itinerary — truly five-star hospitality.",
    initials: "AT",
    color: "linear-gradient(135deg, #6366f1, #8b5cf6)",
  },
  {
    name: "Lucas Martin",
    location: "Paris, France",
    rating: 5,
    review:
      "We celebrated our anniversary here and it was magical. The presidential suite, the private dining experience, everything felt curated just for us.",
    initials: "LM",
    color: "linear-gradient(135deg, #14b8a6, #f59e0b)",
  },
  {
    name: "Priya Sharma",
    location: "Mumbai, India",
    rating: 4.5,
    review:
      "Exceptional attention to detail. The spa treatments were rejuvenating and the staff went above and beyond to make our family feel at home.",
    initials: "PS",
    color: "linear-gradient(135deg, #f59e0b, #0ea5e9)",
  },
  {
    name: "Ethan Walker",
    location: "Sydney, Australia",
    rating: 5,
    review:
      "Best hotel experience we've had in years. Clean, modern, luxurious — and the staff remembered our names from day one. Can't recommend it enough.",
    initials: "EW",
    color: "linear-gradient(135deg, #8b5cf6, #f59e0b)",
  },
];

// Dynamically loaded from PageContext

/* ════════════════════════════════════════════════════════
   REUSABLE COMPONENTS
   ════════════════════════════════════════════════════════ */

/* Floating blur shape */
const BlurShape = ({ className, size, color, duration }) => (
  <div
    className={`absolute rounded-full pointer-events-none animate-pulse ${className}`}
    style={{
      width: size,
      height: size,
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      filter: "blur(50px)",
      animationDuration: duration,
    }}
    aria-hidden="true"
  />
);

/* Star rating */
const StarRating = ({ rating }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < full;
          const isHalf = i === full && half;
          return (
            <span key={i} className="relative inline-block" style={{ width: 14, height: 14 }}>
              <Star size={14} stroke="#f59e0b" strokeWidth={1.5} fill="none" className="absolute inset-0" />
              {(filled || isHalf) && (
                <span className="absolute inset-0 overflow-hidden" style={{ width: isHalf ? "50%" : "100%" }}>
                  <Star size={14} stroke="#f59e0b" strokeWidth={1.5} fill="#f59e0b" />
                </span>
              )}
            </span>
          );
        })}
      </div>
      <span className="text-[12px] font-semibold ml-1" style={{ color: "#1f2937" }}>
        {rating.toFixed(1)}
      </span>
      <span className="text-[11px]" style={{ color: "#9ca3af" }}>
        / 5
      </span>
    </div>
  );
};

/* Testimonial card */
const TestimonialCard = ({ t }) => (
  <div
    className="group relative rounded-2xl p-7 transition-all duration-300 ease-in-out cursor-default
               bg-white/70 backdrop-blur-xl border hover:-translate-y-1.5 hover:scale-[1.02]"
    style={{ borderColor: "#e5efff", boxShadow: "0 4px 20px rgba(59,130,246,0.06)" }}
    onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow = "0 18px 44px rgba(59,130,246,0.16), 0 0 0 1px rgba(59,130,246,0.18)";
      e.currentTarget.style.borderColor = "rgba(59,130,246,0.25)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = "0 4px 20px rgba(59,130,246,0.06)";
      e.currentTarget.style.borderColor = "#e5efff";
    }}
  >
    {/* Quote icon */}
    <Quote
      size={34}
      strokeWidth={1.5}
      style={{ color: "rgba(59,130,246,0.15)" }}
      className="absolute top-6 right-6"
    />

    {/* Rating */}
    <div className="mb-4">
      <StarRating rating={t.rating} />
    </div>

    {/* Review text */}
    <p className="text-[13.5px] leading-relaxed mb-6" style={{ color: "#4b5563" }}>
      "{t.review}"
    </p>

    {/* Guest info */}
    <div className="flex items-center gap-3 pt-5 border-t" style={{ borderColor: "#e5efff" }}>
      {t.image ? (
        <img 
          src={t.image} 
          alt={t.name} 
          className="w-11 h-11 rounded-full object-cover flex-shrink-0 border" 
          style={{ borderColor: "#e5efff" }}
        />
      ) : (
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center text-white font-semibold text-[13px] flex-shrink-0"
          style={{ background: t.color || '#9ca3af' }}
        >
          {t.initials}
        </div>
      )}
      <div className="leading-tight">
        <p className="font-semibold text-[13.5px]" style={{ color: "#1f2937" }}>
          {t.name}
        </p>
        <p className="text-[11.5px]" style={{ color: "#9ca3af" }}>
          {t.location}
        </p>
      </div>
    </div>

    {/* Bottom accent line */}
    <div
      className="absolute bottom-0 left-7 right-7 h-[2px] rounded-full transition-all duration-300 scale-x-0 group-hover:scale-x-100"
      style={{ background: "#f59e0b", transformOrigin: "left" }}
    />
  </div>
);

/* Stat card */
const StatCard = ({ stat }) => {
  // Map icon string to component
  const icons = {
    Users, Award, Repeat, Globe, Star, TrendingUp, Heart, CheckCircle, Building, MapPin
  };
  const IconComp = icons[stat.icon] || HelpCircle;

  return (
  <div
    className="group relative bg-white rounded-3xl p-8 border hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    style={{ borderColor: "#f1f5f9", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}
  >
    <div
      className="absolute top-0 right-0 w-24 h-24 rounded-bl-[100px] opacity-0 group-hover:opacity-10 transition-opacity duration-300"
      style={{ background: "linear-gradient(135deg, #f59e0b, #6366f1)" }}
    />
    <div
      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
      style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.1), rgba(99,102,241,0.1))", color: "#f59e0b" }}
    >
      <IconComp size={26} />
    </div>
    <div className="relative z-10">
      <h3 className="font-bold mb-2 tracking-tight" style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)", color: "#1f2937" }}>
        {stat.value}{stat.suffix}
      </h3>
      <p className="font-semibold uppercase tracking-widest text-[11px]" style={{ color: "#9ca3af" }}>
        {stat.label}
      </p>
    </div>
  </div>
)};

/* ════════════════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════════════════ */
export default function TestimonialsPage({ data = {} }) {
  const { pagesData } = usePageContext();
  const statistics = pagesData?.home?.statistics || {};

  const badgeText = data.badgeText || "Guest Stories";
  const title = data.title || "What Our";
  const titleHighlight = data.titleHighlight || "Guests Say";
  const subtitle = data.subtitle || "Real experiences from our happy guests around the world.";

  const rawItems = Array.isArray(data.items) ? data.items : [];
  const visibleItems = rawItems
    .filter(item => item.status !== 'Inactive')
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  const statsItems = Array.isArray(statistics.items) ? statistics.items : [];
  const visibleStats = statsItems
    .filter(item => item.status !== 'Inactive')
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  return (
    <div style={{ fontFamily: "'Inter', 'Poppins', sans-serif", color: "#1f2937" }}>

      {/* ═══ 1. HERO SECTION ═══ */}
      {data.isVisible !== false && (
        <>
        <section
        className="relative py-12 lg:py-16 overflow-hidden text-center"
        style={{ background: "linear-gradient(180deg, #ffffff 0%, #f5f9ff 100%)" }}
      >
        <BlurShape className="top-10 -left-32" size="420px" color="rgba(59,130,246,0.10)" duration="8s" />
        <BlurShape className="bottom-0 -right-24" size="380px" color="rgba(59,130,246,0.10)" duration="10s" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)", filter: "blur(70px)" }}
          aria-hidden="true"
        />

        <div className="relative max-w-3xl mx-auto px-6">
          {badgeText && (
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="h-px w-8" style={{ background: "#f59e0b" }} />
              <span className="text-[11px] tracking-[0.3em] uppercase font-semibold" style={{ color: "#f59e0b" }}>
                {badgeText}
              </span>
              <span className="h-px w-8" style={{ background: "#f59e0b" }} />
            </div>
          )}
          <h1
            className="font-light leading-tight mb-5"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "clamp(2.2rem, 6vw, 4rem)", color: "#1f2937" }}
          >
            {title} <span style={{ color: "#f59e0b", fontStyle: "italic" }}>{titleHighlight}</span>
          </h1>
          <p className="max-w-xl mx-auto" style={{ fontSize: "clamp(0.95rem, 2vw, 1.15rem)", lineHeight: 1.8, color: "#6b7280" }}>
            {subtitle}
          </p>
        </div>
      </section>

      {/* ═══ 2. TESTIMONIAL GRID ═══ */}
      <section className="relative py-8 lg:py-12 overflow-hidden" style={{ background: "linear-gradient(180deg, #f5f9ff 0%, #ffffff 100%)" }}>
        <BlurShape className="top-0 -left-28" size="360px" color="rgba(59,130,246,0.10)" duration="7s" />
        <BlurShape className="bottom-0 -right-28" size="380px" color="rgba(59,130,246,0.10)" duration="9s" />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleItems.length > 0 ? (
              visibleItems.map((t, idx) => (
                <TestimonialCard key={t.id || t.name || idx} t={t} />
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-slate-400">
                <p>No guest reviews available.</p>
              </div>
            )}
          </div>
        </div>
      </section>
        </>
      )}

      {/* ═══ 3. STATS SECTION ═══ */}
      {statistics.isVisible !== false && (
      <section className="relative py-8 lg:py-12 overflow-hidden bg-white">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)", filter: "blur(80px)" }}
          aria-hidden="true"
        />

        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-14">
            {statistics.badgeText && (
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="h-px w-8" style={{ background: "#f59e0b" }} />
                <span className="text-[11px] tracking-[0.28em] uppercase font-semibold" style={{ color: "#f59e0b" }}>
                  {statistics.badgeText}
                </span>
                <span className="h-px w-8" style={{ background: "#f59e0b" }} />
              </div>
            )}
            <h2
              className="font-light leading-tight mb-4"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "clamp(1.9rem, 4vw, 2.75rem)", color: "#1f2937" }}
            >
              {statistics.title} <span style={{ color: "#f59e0b", fontStyle: "italic" }}>{statistics.titleHighlight}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleStats.length > 0 ? (
              visibleStats.map((stat) => (
                <StatCard key={stat.id || stat.label} stat={stat} />
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-slate-400">
                No statistics available.
              </div>
            )}
          </div>
        </div>
      </section>
      )}

      {/* ═══ 4. CTA SECTION ═══ */}
      <section className="relative py-10 lg:py-16 overflow-hidden text-center" style={{ background: "linear-gradient(180deg, #f5f9ff 0%, #ffffff 100%)" }}>
        <BlurShape className="top-0 left-1/3" size="420px" color="rgba(59,130,246,0.12)" duration="8s" />
        <BlurShape className="bottom-0 right-1/4" size="320px" color="rgba(59,130,246,0.10)" duration="11s" />

        <div className="relative max-w-2xl mx-auto px-6">
          <h2
            className="font-light leading-tight mb-4"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "clamp(1.9rem, 4.5vw, 2.75rem)", color: "#1f2937" }}
          >
            Ready to Experience <span style={{ color: "#f59e0b", fontStyle: "italic" }}>Luxury Stay?</span>
          </h2>
          <p className="max-w-md mx-auto mb-8" style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "#6b7280" }}>
            Join thousands of satisfied guests and book your perfect stay today.
          </p>
          <button
            className="inline-flex items-center gap-2.5 px-9 py-4 rounded-xl text-[13px] font-semibold tracking-wide text-white transition-all duration-300 hover:-translate-y-1 active:scale-95"
            style={{ background: "#f59e0b", boxShadow: "0 10px 30px rgba(59,130,246,0.35)" }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 14px 40px rgba(59,130,246,0.45)")}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 10px 30px rgba(59,130,246,0.35)")}
          >
            Book Now
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>

    </div>
  );
}