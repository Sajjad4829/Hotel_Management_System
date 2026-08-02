import { useState } from "react";
import { Link } from "react-router-dom";

/* ─── DATA ──────────────────────────────────────────────── */
import destinationData from "../DestinationDetails/DestinationData";

const DESTINATIONS = destinationData;

const FILTERS = ["All Destinations", "Dhaka", "Cox's Bazar", "Sylhet"];

/* ─── DESTINATION CARD ──────────────────────────────────── */
const DestinationCard = ({ destination }) => (
  <div className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col">

    {/* Image block */}
    <div className="relative overflow-hidden aspect-[16/10]">
      <img
        src={destination.image}
        alt={destination.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />

      {/* Glass gradient overlay */}
      <div className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0.1) 50%, transparent 100%)",
        }} />

      {/* Glass properties badge */}
      <div
        className="absolute top-3 right-3 backdrop-blur-md rounded-xl px-3 py-1.5 flex flex-col items-end"
        style={{ background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.3)" }}
      >
        <span className="text-white font-bold text-lg leading-none" style={{ fontFamily: "Georgia, serif" }}>
          {destination.hotelsCount}
        </span>
        <span className="text-white/70 text-[9px] tracking-widest uppercase font-medium leading-none mt-1">Properties</span>
      </div>

      {/* Location tag on image — prominently displayed */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
        <div className="bg-[#b45309] p-2 rounded-full shrink-0 shadow-lg">
           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
             <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
             <circle cx="12" cy="10" r="3" />
           </svg>
        </div>
        <div>
          <h4 className="text-white font-semibold text-lg leading-tight drop-shadow-md" style={{ fontFamily: "Georgia, serif" }}>
            {destination.name}
          </h4>
        </div>
      </div>
    </div>

    {/* Card body */}
    <div className="flex flex-col flex-1 p-5 gap-3">
      {/* Description */}
      <p className="text-slate-500 text-[13px] leading-relaxed line-clamp-2">
        {destination.description}
      </p>

      {/* Highlights */}
      <div className="flex flex-wrap gap-1.5 mt-1">
        {(typeof destination.highlights === 'string' 
            ? destination.highlights.split(',').map(h => h.trim()).filter(Boolean) 
            : (destination.highlights || [])
          ).slice(0, 3).map((h, i) => (
          <span key={i} className="flex items-center gap-1 text-[10px] text-slate-600 bg-slate-50 px-2 py-1 rounded-full border border-slate-100">
            • {h}
          </span>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px bg-slate-100 mt-2" />

      {/* Buttons */}
      <div className="flex gap-2 mt-auto pt-2">
        <Link
          to={(destination.buttonLink && destination.buttonLink !== '#') ? destination.buttonLink : `/destination/${destination.slug || destination.id}`}
          className="flex-1 py-2.5 rounded-xl text-[12px] font-semibold tracking-wide text-white transition-all duration-200 hover:opacity-90 active:scale-95 text-center block"
          style={{
            background: "linear-gradient(135deg, #1e3a5f 0%, #0f2942 50%, #b45309 100%)",
            backgroundSize: "200% 200%",
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundPosition = "right center"}
          onMouseLeave={e => e.currentTarget.style.backgroundPosition = "left center"}
        >
          {destination.buttonText || "Explore Destination"}
        </Link>
      </div>
    </div>
  </div>
);

/* ─── MAIN SECTION ───────────────────────────────────────── */
export default function CuratedDestinations({ data = {} }) {
  const [activeFilter, setActiveFilter] = useState("All Destinations");

  const config = {
    isVisible: data.isVisible !== false,
    title: data.title || "Curated Destinations",
    subtitle: data.subtitle || "Discover our most popular locations and hand-picked properties — each destination crafted to exceed every expectation.",
    destinations: (data.destinations || []).filter(d => d.isVisible !== false)
  };

  // Generate dynamic filters based on visible destinations
  const FILTERS = ["All Destinations", ...new Set(config.destinations.map(d => d.name))];

  const filtered = activeFilter === "All Destinations"
    ? config.destinations
    : config.destinations.filter((d) => d.name === activeFilter);

  if (!config.isVisible) return null;

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
              Explore The World
            </span>
            <span className="h-px w-8" style={{ background: "#b45309" }} />
          </div>
          <h2
            className="text-slate-900 font-light leading-tight mb-4"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "clamp(2rem, 4.5vw, 3rem)" }}
            dangerouslySetInnerHTML={{
              __html: config.title.replace(/Destinations/gi, '<span style="color: #1e3a5f; font-style: italic;">$&</span>')
            }}
          />
          <p className="text-slate-500 max-w-lg mx-auto" style={{ fontSize: "clamp(0.88rem, 1.8vw, 1rem)", lineHeight: 1.8 }}>
            {config.subtitle}
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

        {/* Destination grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <p className="text-lg">No destinations match this filter.</p>
          </div>
        ) : (
          <div
            className="grid gap-6"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}
          >
            {filtered.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
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
            <Link to="/search-results">
              View All Destinations
            </Link>

            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}