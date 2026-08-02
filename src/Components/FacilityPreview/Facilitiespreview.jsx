import React from "react";
import * as LucideIcons from "lucide-react";

/* ─── FACILITY CARD COMPONENT ───────────────────────────────── */
const FacilityCard = ({ facility }) => {
  const alignment = facility.iconPosition || 'top-left';
  // Try to render the Lucide icon based on the string name, fallback to HelpCircle
  const IconComponent = LucideIcons[facility.icon] || LucideIcons.HelpCircle;

  let containerClass = '';
  let iconAlignClass = '';

  switch (alignment) {
    case 'top-center':
      containerClass = 'flex-col text-center items-center';
      iconAlignClass = 'mx-auto mb-6';
      break;
    case 'left':
      containerClass = 'flex-row items-start text-left gap-5';
      iconAlignClass = 'shrink-0 mt-1 mb-2';
      break;
    case 'right':
      containerClass = 'flex-row-reverse items-start text-right gap-5';
      iconAlignClass = 'shrink-0 mt-1 mb-2';
      break;
    case 'top-left':
    default:
      containerClass = 'flex-col text-left';
      iconAlignClass = 'mr-auto mb-6';
      break;
  }

  const isRow = alignment === 'left' || alignment === 'right';

  return (
    <div className={`group relative bg-white rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-slate-100 overflow-hidden h-full flex ${containerClass}`}>
      
      {/* Icon Wrapper */}
      <div
        className={`w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-lg transition-transform duration-300 group-hover:scale-110 ${iconAlignClass}`}
        style={{ background: facility.gradient || 'linear-gradient(135deg, #0f2942, #1e3a5f)' }}
      >
        <IconComponent size={24} />
      </div>

      <div className={`flex flex-col ${isRow ? 'flex-1' : ''} h-full`}>
        {/* Title */}
        <h3 className="text-slate-800 font-bold text-lg mb-2 tracking-tight">
          {facility.name}
        </h3>

        {/* Description */}
        <p className="text-slate-500 text-[12.5px] leading-relaxed mb-4 flex-1">
          {facility.desc}
        </p>
      </div>

      {/* Bottom gradient accent line — grows on hover */}
      <div
        className={`absolute bottom-0 ${alignment === 'right' ? 'right-6' : alignment === 'top-left' || alignment === 'left' ? 'left-6' : 'left-6 right-6'} h-[2px] rounded-full transition-all duration-300 scale-x-0 group-hover:scale-x-100`}
        style={{ 
          background: facility.gradient || 'linear-gradient(135deg, #0f2942, #1e3a5f)', 
          transformOrigin: alignment === 'right' ? 'right' : alignment === 'top-center' ? 'center' : 'left',
          width: alignment === 'top-left' || alignment === 'right' || alignment === 'left' ? '40%' : 'auto'
        }}
      />
    </div>
  );
};

/* ─── MAIN SECTION ────────────────────────────────────────── */
export default function FacilitiesPreview({ data = {} }) {
  // Don't render if explicitly hidden
  if (data.isVisible === false) return null;

  // Fallback default values
  const badgeText = data.badgeText || "Premium Amenities";
  const title = data.title || "Hotel";
  const titleHighlight = data.titleHighlight || "Facilities";
  const subtitle = data.subtitle || "Enjoy world-class amenities for a comfortable stay — every detail considered, every comfort included.";
  
  // Sort items by display order, filter out inactive
  const rawItems = Array.isArray(data.items) ? data.items : [];
  const visibleItems = rawItems
    .filter(item => item.status !== 'Inactive')
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  return (
    <section className="relative pt-20 pb-[10px] lg:pt-24 lg:pb-[10px] overflow-hidden" style={{ background: "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)" }}>

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
          {badgeText && (
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 text-[11px] font-semibold tracking-[0.18em] uppercase"
              style={{
                background: "rgba(217,119,6,0.08)",
                color: "#b45309",
                border: "1px solid rgba(217,119,6,0.18)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#d97706" }} />
              {badgeText}
            </div>
          )}

          <h2
            className="text-slate-900 font-light leading-tight mb-4"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "clamp(2rem, 4.5vw, 3rem)" }}
          >
            {title} <span style={{ color: "#b45309", fontStyle: "italic" }}>{titleHighlight}</span>
          </h2>

          <p className="text-slate-500 max-w-lg mx-auto" style={{ fontSize: "clamp(0.88rem, 1.8vw, 1rem)", lineHeight: 1.8 }}>
            {subtitle}
          </p>
        </div>

        {/* Grid */}
        {visibleItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {visibleItems.map((facility) => (
              <FacilityCard key={facility.id || facility.name} facility={facility} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-400">
            <p>No facilities available to display.</p>
          </div>
        )}

      </div>
    </section>
  );
}