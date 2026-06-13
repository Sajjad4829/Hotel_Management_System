const FEATURES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M3 22V12a9 9 0 0 1 18 0v10" />
        <path d="M3 18h18" />
        <path d="M9 22v-4h6v4" />
      </svg>
    ),
    title: "Luxury Rooms",
    desc: "Meticulously designed suites with premium bedding, panoramic views, and bespoke amenities for an unmatched stay.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M5 12.55a11 11 0 0 1 14.08 0" />
        <path d="M1.42 9a16 16 0 0 1 21.16 0" />
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
        <circle cx="12" cy="20" r="1" fill="currentColor" />
      </svg>
    ),
    title: "Free High-Speed WiFi",
    desc: "Complimentary fibre-optic internet throughout every corner of the property — from poolside to penthouse.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M3 11l19-9-9 19-2-8-8-2z" />
      </svg>
    ),
    title: "Fine Dining Restaurant",
    desc: "Award-winning cuisine crafted by Michelin-starred chefs, featuring seasonal menus and curated wine pairings.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.94-.94a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.73 16z" />
      </svg>
    ),
    title: "24/7 Customer Support",
    desc: "Our dedicated concierge team is available around the clock to fulfil every request and exceed every expectation.",
  },
];

const STATS = [
  { value: "25+", label: "Years of Excellence" },
  { value: "340", label: "Luxury Rooms & Suites" },
  { value: "98%", label: "Guest Satisfaction" },
  { value: "12", label: "Awards & Accolades" },
];

export default function AboutHotel() {
  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Section header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-px w-8" style={{ background: "#d97706" }} />
            <span className="text-[11px] tracking-[0.28em] uppercase font-semibold" style={{ color: "#b45309" }}>
              Our Story
            </span>
            <span className="h-px w-8" style={{ background: "#d97706" }} />
          </div>
          <h2
            className="text-stone-900 font-light leading-tight mb-4"
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
            }}
          >
            About Our <em style={{ fontStyle: "italic", color: "#b45309" }}>Hotel</em>
          </h2>
          <p className="text-stone-500 max-w-xl mx-auto" style={{ fontSize: "clamp(0.9rem, 1.8vw, 1.05rem)", lineHeight: 1.8 }}>
            Experience luxury, comfort, and exceptional hospitality.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20 lg:mb-24">

          {/* Left — image */}
          <div className="relative">
            {/* Main image */}
            <div className="relative rounded-sm overflow-hidden shadow-2xl aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80"
                alt="Aurum Hotel lobby — grand entrance with marble floors"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              {/* Amber accent overlay strip */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1"
                style={{ background: "linear-gradient(to right, #b45309, #f59e0b)" }}
              />
            </div>

            {/* Floating stat badge */}
            <div
              className="absolute -bottom-6 -right-4 sm:-right-6 bg-white rounded-sm shadow-xl px-6 py-4 border-l-2"
              style={{ borderColor: "#d97706" }}
            >
              <p className="text-[11px] text-stone-400 uppercase tracking-widest mb-0.5">Est.</p>
              <p
                className="font-semibold text-stone-900"
                style={{ fontFamily: "Georgia, serif", fontSize: "1.6rem", lineHeight: 1 }}
              >
                1999
              </p>
            </div>

            {/* Decorative dot grid */}
            <div
              className="absolute -top-5 -left-5 w-24 h-24 hidden sm:block"
              style={{
                backgroundImage: "radial-gradient(circle, #d9770640 1.5px, transparent 1.5px)",
                backgroundSize: "10px 10px",
              }}
              aria-hidden="true"
            />
          </div>

          {/* Right — content */}
          <div className="flex flex-col gap-7">
            <div>
              <h3
                className="text-stone-800 font-semibold mb-3"
                style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.3rem, 2.5vw, 1.65rem)", lineHeight: 1.3 }}
              >
                A Legacy of World-Class Hospitality
              </h3>
              <p className="text-stone-500 leading-relaxed" style={{ fontSize: "0.95rem" }}>
                Nestled in the heart of the city, Aurum Hotel & Resort has been redefining luxury travel since 1999.
                With over two decades of curating unforgettable experiences, we blend timeless elegance with modern
                refinement — offering every guest a sanctuary that feels both grand and intimately personal.
              </p>
            </div>

            {/* Mission */}
            <div
              className="border-l-2 pl-5 py-1"
              style={{ borderColor: "#d97706" }}
            >
              <p className="text-[11px] uppercase tracking-[0.2em] font-semibold mb-2" style={{ color: "#b45309" }}>
                Our Mission
              </p>
              <p className="text-stone-600 italic leading-relaxed" style={{ fontFamily: "Georgia, serif", fontSize: "1rem" }}>
                "To craft extraordinary moments by pairing impeccable service with spaces that inspire — where every
                detail is a quiet declaration of care."
              </p>
            </div>

            {/* Customer satisfaction */}
            <p className="text-stone-500 leading-relaxed" style={{ fontSize: "0.95rem" }}>
              Guest satisfaction sits at the core of everything we do. Our team of over 300 hospitality
              professionals undergoes continuous training to anticipate needs before they are expressed —
              delivering an experience that is seamlessly personal, every single time.
            </p>

            {/* CTA */}
            <div className="flex items-center gap-4 pt-1">
              <button
                className="inline-flex items-center gap-2 px-7 py-3 text-white text-[12px] font-semibold tracking-widest uppercase transition-colors duration-200"
                style={{ background: "#b45309", borderRadius: "2px" }}
                onMouseEnter={e => e.currentTarget.style.background = "#92400e"}
                onMouseLeave={e => e.currentTarget.style.background = "#b45309"}
              >
                Explore Rooms
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <button
                className="text-[12px] font-semibold tracking-widest uppercase text-stone-500 hover:text-stone-900 transition-colors duration-200 underline underline-offset-4"
                style={{ textDecorationColor: "#d97706" }}
              >
                Our Story
              </button>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-stone-100 rounded-sm overflow-hidden mb-20 lg:mb-24 shadow-sm">
          {STATS.map(({ value, label }) => (
            <div
              key={label}
              className="bg-white text-center py-8 px-4 group hover:bg-stone-50 transition-colors duration-200"
            >
              <p
                className="font-light mb-1 group-hover:text-amber-700 transition-colors duration-200"
                style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", color: "#b45309" }}
              >
                {value}
              </p>
              <p className="text-stone-400 text-[11px] tracking-[0.18em] uppercase font-medium">{label}</p>
            </div>
          ))}
        </div>

        {/* Feature cards */}
        <div className="text-center mb-10">
          <p className="text-[11px] tracking-[0.28em] uppercase font-semibold mb-2" style={{ color: "#b45309" }}>
            What We Offer
          </p>
          <h3
            className="text-stone-800 font-light"
            style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.5rem, 3vw, 2.1rem)" }}
          >
            Crafted for Your Comfort
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="group relative bg-white border border-stone-100 rounded-sm p-7 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-default overflow-hidden"
            >
              {/* Amber top accent — slides in on hover */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] transition-all duration-300"
                style={{ background: "linear-gradient(to right, #b45309, #f59e0b)", transform: "scaleX(0)", transformOrigin: "left" }}
                ref={el => {
                  if (!el) return;
                  const card = el.parentElement;
                  const show = () => (el.style.transform = "scaleX(1)");
                  const hide = () => (el.style.transform = "scaleX(0)");
                  card.addEventListener("mouseenter", show);
                  card.addEventListener("mouseleave", hide);
                }}
              />

              {/* Icon */}
              <div
                className="inline-flex items-center justify-center w-11 h-11 rounded-sm mb-5 transition-colors duration-300"
                style={{ background: "#fef3c7", color: "#b45309" }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "#b45309";
                  e.currentTarget.style.color = "#fff";
                }}
              >
                {icon}
              </div>

              <h4
                className="text-stone-800 font-semibold mb-2 group-hover:text-amber-800 transition-colors duration-200"
                style={{ fontSize: "0.95rem", letterSpacing: "0.01em" }}
              >
                {title}
              </h4>
              <p className="text-stone-400 leading-relaxed" style={{ fontSize: "0.83rem" }}>
                {desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
