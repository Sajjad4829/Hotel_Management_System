import { useState } from "react";

/* ─── DATA ──────────────────────────────────────────────── */
const ROOMS = [
  {
    id: 1,
    category: "Luxury",
    name: "Deluxe Ocean Suite",
    tagline: "Panoramic sea views from a private terrace",
    desc: "Floor-to-ceiling windows frame the horizon from your king-size sanctuary. Includes a rain shower, soaking tub, and dedicated butler.",
    price: 420,
    rating: 4.9,
    reviews: 218,
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=900&q=80",
    amenities: ["wifi", "ac", "breakfast", "pool"],
    badge: "Best Seller",
    badgeColor: "#d97706",
  },
  {
    id: 2,
    category: "VIP",
    name: "Presidential Suite",
    tagline: "The pinnacle of Aurum luxury",
    desc: "A full private floor with a wraparound terrace, in-suite spa, chef's kitchen, and 24-hour private concierge service.",
    price: 1200,
    rating: 5.0,
    reviews: 84,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80",
    amenities: ["wifi", "ac", "breakfast", "pool"],
    badge: "VIP Only",
    badgeColor: "#7c3aed",
  },
  {
    id: 3,
    category: "Family",
    name: "Family Garden Villa",
    tagline: "Space, privacy & a private plunge pool",
    desc: "Two bedrooms, a living area, and your own garden terrace with a heated plunge pool — designed for families who want it all.",
    price: 680,
    rating: 4.8,
    reviews: 142,
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=900&q=80",
    amenities: ["wifi", "ac", "breakfast", "pool"],
    badge: "Family Pick",
    badgeColor: "#059669",
  },
  {
    id: 4,
    category: "Budget",
    name: "Classic Garden Room",
    tagline: "Elegant comfort at an accessible price",
    desc: "A serene retreat overlooking the manicured gardens with premium bedding, a marble bathroom, and complimentary breakfast.",
    price: 195,
    rating: 4.6,
    reviews: 306,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    amenities: ["wifi", "ac", "breakfast"],
    badge: "Great Value",
    badgeColor: "#0369a1",
  },
  {
    id: 5,
    category: "Luxury",
    name: "Skyline Penthouse",
    tagline: "City lights, private pool, 360° views",
    desc: "The ultimate urban escape — a private rooftop pool, chef's breakfast, and a living room that frames the entire skyline.",
    price: 890,
    rating: 4.9,
    reviews: 97,
    image: "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?auto=format&fit=crop&w=900&q=80",
    amenities: ["wifi", "ac", "breakfast", "pool"],
    badge: "Editor's Choice",
    badgeColor: "#b45309",
  },
  {
    id: 6,
    category: "Family",
    name: "Coastal Family Suite",
    tagline: "Beachfront bliss for the whole family",
    desc: "Direct beach access, bunk beds for kids, an ocean-view master bedroom, and a terrace with loungers right on the sand.",
    price: 520,
    rating: 4.7,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=900&q=80",
    amenities: ["wifi", "ac", "breakfast", "pool"],
    badge: null,
    badgeColor: null,
  },
];

const FILTERS = ["All Rooms", "Luxury", "Family", "Budget", "VIP"];

/* ─── AMENITY ICONS ─────────────────────────────────────── */
const AmenityIcon = ({ type }) => {
  const icons = {
    wifi: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 12.55a11 11 0 0 1 14.08 0" /><path d="M1.42 9a16 16 0 0 1 21.16 0" />
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><circle cx="12" cy="20" r="1" fill="currentColor" />
      </svg>
    ),
    ac: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="6" width="20" height="8" rx="2" /><path d="M6 18h.01M10 18h.01M14 18h.01M18 18h.01" strokeLinecap="round" strokeWidth="2.5" />
        <path d="M6 10h12" />
      </svg>
    ),
    breakfast: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
    pool: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 20c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2" />
        <path d="M2 16c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2" />
        <path d="M12 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill="currentColor" opacity=".4" />
        <path d="M12 4v4l3 3" />
      </svg>
    ),
  };
  const labels = { wifi: "WiFi", ac: "AC", breakfast: "Breakfast", pool: "Pool" };
  return (
    <span className="flex items-center gap-1 text-[10px] text-slate-500 bg-slate-50 px-2 py-1 rounded-full border border-slate-100">
      {icons[type]}
      {labels[type]}
    </span>
  );
};

/* ─── STAR RATING ────────────────────────────────────────── */
const Stars = ({ rating }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24"
          fill={i < full ? "#f59e0b" : i === full && half ? "url(#half)" : "none"}
          stroke="#f59e0b" strokeWidth="1.5">
          {i === full && half && (
            <defs>
              <linearGradient id="half"><stop offset="50%" stopColor="#f59e0b" /><stop offset="50%" stopColor="transparent" /></linearGradient>
            </defs>
          )}
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </span>
  );
};

/* ─── ROOM CARD ──────────────────────────────────────────── */
const RoomCard = ({ room }) => (
  <div className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col">

    {/* Image block */}
    <div className="relative overflow-hidden aspect-[16/10]">
      <img
        src={room.image}
        alt={room.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />

      {/* Glass gradient overlay */}
      <div className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(15,23,42,0.72) 0%, rgba(15,23,42,0.1) 50%, transparent 100%)",
        }} />

      {/* Glass price badge */}
      <div
        className="absolute top-3 right-3 backdrop-blur-md rounded-xl px-3 py-1.5 flex flex-col items-end"
        style={{ background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.3)" }}
      >
        <span className="text-white/70 text-[9px] tracking-widest uppercase font-medium leading-none mb-0.5">per night</span>
        <span className="text-white font-bold text-lg leading-none" style={{ fontFamily: "Georgia, serif" }}>
          ${room.price.toLocaleString()}
        </span>
      </div>

      {/* Category badge */}
      {room.badge && (
        <div
          className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide text-white"
          style={{ background: room.badgeColor }}
        >
          {room.badge}
        </div>
      )}

      {/* Tagline on image — glass pill */}
      <div className="absolute bottom-3 left-3 right-3">
        <div
          className="backdrop-blur-sm rounded-lg px-3 py-2"
          style={{ background: "rgba(15,23,42,0.45)", border: "1px solid rgba(255,255,255,0.15)" }}
        >
          <p className="text-white/90 text-[11px] font-medium tracking-wide leading-tight">{room.tagline}</p>
        </div>
      </div>
    </div>

    {/* Card body */}
    <div className="flex flex-col flex-1 p-5 gap-3">

      {/* Name + rating */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-slate-900 font-semibold leading-tight" style={{ fontSize: "1rem", fontFamily: "Georgia, serif" }}>
          {room.name}
        </h3>
        <div className="flex flex-col items-end gap-0.5 shrink-0">
          <div className="flex items-center gap-1">
            <Stars rating={room.rating} />
            <span className="text-slate-700 text-[12px] font-semibold">{room.rating.toFixed(1)}</span>
          </div>
          <span className="text-slate-400 text-[10px]">{room.reviews} reviews</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-slate-500 text-[13px] leading-relaxed line-clamp-2">{room.desc}</p>

      {/* Amenities */}
      <div className="flex flex-wrap gap-1.5">
        {room.amenities.map((a) => <AmenityIcon key={a} type={a} />)}
      </div>

      {/* Divider */}
      <div className="h-px bg-slate-100" />

      {/* Buttons */}
      <div className="flex gap-2 mt-auto">
        <button
          className="flex-1 py-2.5 rounded-xl text-[12px] font-semibold tracking-wide text-white transition-all duration-200 hover:opacity-90 active:scale-95"
          style={{
            background: "linear-gradient(135deg, #1e3a5f 0%, #0f2942 50%, #b45309 100%)",
            backgroundSize: "200% 200%",
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundPosition = "right center"}
          onMouseLeave={e => e.currentTarget.style.backgroundPosition = "left center"}
        >
          Book Now
        </button>
        <button className="flex-1 py-2.5 rounded-xl text-[12px] font-semibold tracking-wide text-slate-700 border border-slate-200 hover:border-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-all duration-200 active:scale-95">
          View Details
        </button>
      </div>
    </div>
  </div>
);

/* ─── MAIN SECTION ───────────────────────────────────────── */
export default function FeaturedRooms() {
  const [activeFilter, setActiveFilter] = useState("All Rooms");

  const filtered = activeFilter === "All Rooms"
    ? ROOMS
    : ROOMS.filter((r) => r.category === activeFilter);

  return (
    <section className="relative py-20 lg:py-15 overflow-hidden" style={{ background: "#f8fafc" }}>

      {/* Decorative blur orbs — premium background feel */}
      <div
        className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(180,83,9,0.06) 0%, transparent 70%)", filter: "blur(40px)" }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -right-20 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(30,58,95,0.07) 0%, transparent 70%)", filter: "blur(40px)" }}
        aria-hidden="true"
      />
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Section header */}
        <div className="text-center mb-12 lg:mb-14">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-px w-8" style={{ background: "#b45309" }} />
            <span className="text-[11px] tracking-[0.28em] uppercase font-semibold" style={{ color: "#b45309" }}>
              Curated Stays
            </span>
            <span className="h-px w-8" style={{ background: "#b45309" }} />
          </div>
          <h2
            className="text-slate-900 font-light leading-tight mb-4"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "clamp(2rem, 4.5vw, 3rem)" }}
          >
            Featured <span style={{ color: "#1e3a5f", fontStyle: "italic" }}>Rooms</span>
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto" style={{ fontSize: "clamp(0.88rem, 1.8vw, 1rem)", lineHeight: 1.8 }}>
            Discover our most popular luxury stays — each space crafted to exceed every expectation.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
          {FILTERS.map((f) => {
            const isActive = activeFilter === f;
            return (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="px-5 py-2 rounded-full text-[12px] font-semibold tracking-wide transition-all duration-200"
                style={
                  isActive
                    ? {
                        background: "linear-gradient(135deg, #1e3a5f, #0f2942)",
                        color: "#fff",
                        boxShadow: "0 4px 14px rgba(30,58,95,0.28)",
                      }
                    : {
                        background: "#fff",
                        color: "#64748b",
                        border: "1px solid #e2e8f0",
                      }
                }
              >
                {f}
              </button>
            );
          })}
        </div>

        {/* Room grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <p className="text-lg">No rooms match this filter.</p>
          </div>
        ) : (
          <div
            className="grid gap-6"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}
          >
            {filtered.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-14">
          <button
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-[13px] font-semibold tracking-wide text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #1e3a5f 0%, #0f2942 60%, #b45309 100%)",
              boxShadow: "0 6px 24px rgba(30,58,95,0.25)",
            }}
          >
            View All Rooms
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}