import {
  FiWifi,
  FiSun,
  FiActivity,
  FiCoffee,
  FiHeart,
  FiClock,
  FiBell,
  FiTruck,
  FiUsers,
  FiBriefcase,
  FiNavigation,
  FiWind,
  FiCheckCircle,
  FiAward,
  FiSmile,
  FiThumbsUp,
} from "react-icons/fi";

/* ════════════════════════════════════════════════════════
   DATA
   ════════════════════════════════════════════════════════ */
const FACILITIES = [
  {
    icon: <FiWifi size={26} />,
    name: "Free High-Speed WiFi",
    desc: "Stay connected with complimentary fibre-optic internet throughout the property.",
  },
  {
    icon: <FiSun size={26} />,
    name: "Swimming Pool",
    desc: "A temperature-controlled pool with sun loungers and panoramic views.",
  },
  {
    icon: <FiActivity size={26} />,
    name: "Fitness Center",
    desc: "Fully-equipped 24-hour gym with modern equipment and personal trainers.",
  },
  {
    icon: <FiCoffee size={26} />,
    name: "Restaurant & Dining",
    desc: "Award-winning cuisine crafted by world-class chefs in an elegant setting.",
  },
  {
    icon: <FiHeart size={26} />,
    name: "Spa & Wellness",
    desc: "Rejuvenating treatments, sauna, and steam rooms for total relaxation.",
  },
  {
    icon: <FiClock size={26} />,
    name: "24/7 Reception",
    desc: "Our dedicated concierge team is on hand around the clock to assist you.",
  },
  {
    icon: <FiBell size={26} />,
    name: "Room Service",
    desc: "In-room dining available any time of day, prepared to perfection.",
  },
  {
    icon: <FiTruck size={26} />,
    name: "Valet Parking",
    desc: "Secure, complimentary valet parking for all hotel guests.",
  },
  {
    icon: <FiUsers size={26} />,
    name: "Conference Hall",
    desc: "Elegant, fully-equipped venues for meetings, conferences and events.",
  },
  {
    icon: <FiBriefcase size={26} />,
    name: "Business Center",
    desc: "Private workstations, printing, and meeting rooms for business travelers.",
  },
  {
    icon: <FiNavigation size={26} />,
    name: "Airport Shuttle",
    desc: "Complimentary shuttle service to and from the airport, on schedule.",
  },
  {
    icon: <FiWind size={26} />,
    name: "Laundry Service",
    desc: "Same-day laundry and dry-cleaning service for a refreshed wardrobe.",
  },
];

const WHY_CHOOSE = [
  {
    icon: <FiCheckCircle size={28} />,
    title: "Premium Comfort",
    desc: "Thoughtfully designed spaces crafted for total relaxation and ease.",
  },
  {
    icon: <FiAward size={28} />,
    title: "Professional Service",
    desc: "A dedicated team trained to deliver excellence at every touchpoint.",
  },
  {
    icon: <FiSmile size={28} />,
    title: "Modern Amenities",
    desc: "State-of-the-art facilities that blend convenience with luxury.",
  },
  {
    icon: <FiThumbsUp size={28} />,
    title: "Guest Satisfaction",
    desc: "Consistently rated five stars by guests for an unforgettable stay.",
  },
];

const GOLD = "#C89B3C";

/* ════════════════════════════════════════════════════════
   REUSABLE COMPONENTS
   ════════════════════════════════════════════════════════ */

const FacilityCard = ({ facility }) => (
  <div
    className="group relative bg-white rounded-2xl p-7 border border-stone-100 shadow-sm
               transition-all duration-300 ease-in-out cursor-default
               hover:-translate-y-2 hover:shadow-2xl hover:border-transparent"
  >
    {/* Icon badge */}
    <div
      className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300
                 group-hover:scale-110 group-hover:rotate-3"
      style={{ background: "rgba(200,155,60,0.1)", color: GOLD }}
    >
      {facility.icon}
    </div>

    {/* Title */}
    <h3 className="text-stone-800 font-bold text-[16px] mb-2 tracking-wide">
      {facility.name}
    </h3>

    {/* Description */}
    <p className="text-stone-500 text-[13px] leading-relaxed">
      {facility.desc}
    </p>

    {/* Bottom accent line */}
    <div
      className="absolute bottom-0 left-7 right-7 h-[2px] rounded-full transition-all duration-300 scale-x-0 group-hover:scale-x-100"
      style={{ background: GOLD, transformOrigin: "left" }}
    />
  </div>
);

const WhyCard = ({ item }) => (
  <div
    className="group relative bg-white rounded-2xl p-7 text-center border border-stone-100 shadow-sm
               transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl"
  >
    <div
      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 transition-transform duration-300 group-hover:scale-110"
      style={{ background: "rgba(200,155,60,0.1)", color: GOLD }}
    >
      {item.icon}
    </div>
    <h4 className="text-stone-800 font-semibold text-[16px] mb-2">{item.title}</h4>
    <p className="text-stone-500 text-[13px] leading-relaxed">{item.desc}</p>
  </div>
);

/* ════════════════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════════════════ */
export default function FacilitiesPage() {
  return (
    <div className="bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ═══ 1. HERO BANNER ═══ */}
      <section className="relative h-[60vh] min-h-[420px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1920&q=80')" }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(15,15,15,0.55) 0%, rgba(15,15,15,0.78) 100%)" }}
          aria-hidden="true"
        />

        <div className="relative z-10 text-center px-6 max-w-3xl">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="h-px w-10" style={{ background: GOLD }} />
            <span className="text-[11px] tracking-[0.3em] uppercase font-semibold" style={{ color: GOLD }}>
              Aurum Hotel &amp; Resort
            </span>
            <span className="h-px w-10" style={{ background: GOLD }} />
          </div>
          <h1
            className="text-white font-light leading-tight mb-5"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "clamp(2.2rem, 6vw, 4rem)" }}
          >
            World-Class Hotel <span style={{ color: GOLD, fontStyle: "italic" }}>Facilities</span>
          </h1>
          <p className="text-stone-200 max-w-xl mx-auto" style={{ fontSize: "clamp(0.95rem, 2vw, 1.15rem)", lineHeight: 1.8 }}>
            Experience premium amenities designed for your comfort and convenience.
          </p>
        </div>
      </section>

      {/* ═══ 2. FACILITIES GRID SECTION ═══ */}
      <section className="relative py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

          <div className="text-center mb-14 lg:mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="h-px w-8" style={{ background: GOLD }} />
              <span className="text-[11px] tracking-[0.28em] uppercase font-semibold" style={{ color: GOLD }}>
                Premium Amenities
              </span>
              <span className="h-px w-8" style={{ background: GOLD }} />
            </div>
            <h2
              className="text-stone-900 font-light leading-tight mb-4"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "clamp(1.9rem, 4vw, 2.75rem)" }}
            >
              Everything You Need, <span style={{ color: GOLD, fontStyle: "italic" }}>Beautifully Delivered</span>
            </h2>
            <p className="text-stone-500 max-w-lg mx-auto" style={{ fontSize: "clamp(0.88rem, 1.8vw, 1rem)", lineHeight: 1.8 }}>
              Every facility is crafted with the same standard of excellence found at the world's finest hotels.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FACILITIES.map((facility) => (
              <FacilityCard key={facility.name} facility={facility} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 3. FEATURED FACILITY — INFINITY POOL ═══ */}
      <section className="relative py-20 lg:py-28" style={{ background: "#faf8f4" }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] order-1 lg:order-none">
              <img
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80"
                alt="Luxury Infinity Pool"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div
                className="absolute bottom-0 left-0 right-0 h-1"
                style={{ background: `linear-gradient(to right, ${GOLD}, #e8c873)` }}
              />
            </div>

            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="h-px w-8" style={{ background: GOLD }} />
                <span className="text-[11px] tracking-[0.28em] uppercase font-semibold" style={{ color: GOLD }}>
                  Featured Facility
                </span>
              </div>
              <h2
                className="text-stone-900 font-light leading-tight mb-5"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "clamp(1.9rem, 4vw, 2.75rem)" }}
              >
                Luxury <span style={{ color: GOLD, fontStyle: "italic" }}>Infinity Pool</span>
              </h2>
              <p className="text-stone-500 leading-relaxed mb-4" style={{ fontSize: "0.98rem" }}>
                Perched above the city skyline, our signature infinity pool blurs the line between
                water and horizon. Heated year-round and surrounded by private cabanas, it's the
                perfect place to unwind with a curated cocktail menu and uninterrupted views.
              </p>
              <p className="text-stone-500 leading-relaxed mb-8" style={{ fontSize: "0.98rem" }}>
                Open daily from sunrise to midnight, with dedicated poolside service and
                complimentary towels and refreshments for every guest.
              </p>
              <button
                className="inline-flex items-center gap-2.5 px-8 py-3.5 text-white text-[12px] font-semibold tracking-widest uppercase rounded-lg transition-all duration-300 hover:-translate-y-1"
                style={{ background: GOLD, boxShadow: `0 10px 28px ${GOLD}55` }}
              >
                Explore the Pool
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ═══ 4. WHY CHOOSE OUR FACILITIES ═══ */}
      <section className="relative py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-14 lg:mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="h-px w-8" style={{ background: GOLD }} />
              <span className="text-[11px] tracking-[0.28em] uppercase font-semibold" style={{ color: GOLD }}>
                The Aurum Standard
              </span>
              <span className="h-px w-8" style={{ background: GOLD }} />
            </div>
            <h2
              className="text-stone-900 font-light leading-tight mb-4"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "clamp(1.9rem, 4vw, 2.75rem)" }}
            >
              Why Choose Our <span style={{ color: GOLD, fontStyle: "italic" }}>Facilities</span>
            </h2>
            <p className="text-stone-500 max-w-lg mx-auto" style={{ fontSize: "clamp(0.88rem, 1.8vw, 1rem)", lineHeight: 1.8 }}>
              A standard of excellence that defines every corner of your stay.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CHOOSE.map((item) => (
              <WhyCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 5. CTA SECTION ═══ */}
      <section className="relative py-20 lg:py-28 overflow-hidden text-center" style={{ background: "#0f0f0f" }}>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${GOLD}22 0%, transparent 70%)`, filter: "blur(80px)" }}
          aria-hidden="true"
        />

        <div className="relative max-w-2xl mx-auto px-6">
          <h2
            className="text-white font-light leading-tight mb-5"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "clamp(1.9rem, 4.5vw, 2.75rem)" }}
          >
            Ready for an <span style={{ color: GOLD, fontStyle: "italic" }}>Unforgettable Stay?</span>
          </h2>
          <p className="max-w-md mx-auto mb-10 text-stone-400" style={{ fontSize: "0.95rem", lineHeight: 1.8 }}>
            Reserve your room today and experience every facility Aurum Hotel &amp; Resort has to offer.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              className="inline-flex items-center gap-2.5 px-9 py-4 rounded-lg text-[12px] font-semibold tracking-widest uppercase text-stone-900 transition-all duration-300 hover:-translate-y-1"
              style={{ background: GOLD, boxShadow: `0 10px 30px ${GOLD}55` }}
            >
              Book Your Room
            </button>
            <button
              className="inline-flex items-center gap-2.5 px-9 py-4 rounded-lg text-[12px] font-semibold tracking-widest uppercase text-white border border-white/25 transition-all duration-300 hover:border-white hover:-translate-y-1"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}