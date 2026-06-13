// import { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// // ১. একই ফোল্ডারের পাশে থাকা HotelLogo ইম্পোর্ট করলাম
// import HotelLogo from "../HotelLogo/HotelLogo"; 

// // মেনুর লিংকগুলো একটা অ্যারেতে রাখলাম
// const NAV_LINKS = [
//   { label: "Home", to: "/" },
//   { label: "Rooms", to: "/rooms" },
//   { label: "Facilities", to: "/facilities" },
//   { label: "Reviews", to: "/reviews" },
//   { label: "Contact", to: "/contact" },
// ];

// // একটিভ লিংকের জন্য টেইলউইন্ড ক্লাস
// const navLinkClass = ({ isActive }) => [
//   "relative text-sm font-medium tracking-wide transition-colors duration-200 pb-0.5",
//   "after:absolute after:left-0 after:bottom-0 after:h-[1.5px] after:bg-amber-500 after:transition-all after:duration-300",
//   isActive ? "text-amber-600 after:w-full" : "text-stone-600 hover:text-stone-900 after:w-0 hover:after:w-full",
// ].join(" ");

// export default function Header() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   // স্ক্রোল করলে ব্যাকগ্রাউন্ড চেঞ্জ হওয়ার লজিক
//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 12);
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   // স্ক্রিন বড় করলে মোবাইল মেনু বন্ধ হওয়ার লজিক
//   useEffect(() => {
//     const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
//     window.addEventListener("resize", onResize);
//     return () => window.removeEventListener("resize", onResize);
//   }, []);

//   return (
//     <header className={["fixed top-0 inset-x-0 z-50 transition-all duration-300", scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm border-b border-stone-100" : "bg-white border-b border-transparent"].join(" ")}>
//       <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
          
//           {/* ২. এখানে আপনার সুন্দর লোগোটি বসে গেল */}
//           <HotelLogo />

//           {/* ৩. ডেস্কটপ মেনু লিংকসমূহ */}
//           <ul className="hidden md:flex items-center gap-8">
//             {NAV_LINKS.map(({ label, to }) => (
//               <li key={to}>
//                 <NavLink to={to} end={to === "/"} className={navLinkClass}>
//                   {label}
//                 </NavLink>
//               </li>
//             ))}
//           </ul>

//           {/* ৪. ডেস্কটপ লগইন বাটন */}
//           <div className="hidden md:flex items-center gap-3">
//             <NavLink to="/login" className="px-5 py-2 text-sm font-semibold tracking-wide text-white bg-amber-600 rounded-sm hover:bg-amber-500 transition-colors duration-200">
//               Login
//             </NavLink>
//           </div>

//           {/* ৫. মোবাইল হ্যামবার্গার বাটন */}
//           <button type="button" onClick={() => setMenuOpen((prev) => !prev)} className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] rounded">
//             <span className={["block w-5 h-[1.5px] bg-stone-700 transition-all duration-300", menuOpen ? "rotate-45 translate-y-[6.5px]" : ""].join(" ")} />
//             <span className={["block w-5 h-[1.5px] bg-stone-700 transition-all duration-300", menuOpen ? "opacity-0 scale-x-0" : ""].join(" ")} />
//             <span className={["block w-5 h-[1.5px] bg-stone-700 transition-all duration-300", menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""].join(" ")} />
//           </button>
//         </div>
//       </nav>

//       {/* ৬. মোবাইল ড্রপডাউন মেনু */}
//       <div className={["md:hidden overflow-hidden transition-all duration-300 ease-in-out", menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"].join(" ")}>
//         <div className="bg-white border-t border-stone-100 px-4 pt-3 pb-5 space-y-1 shadow-md">
//           {NAV_LINKS.map(({ label, to }) => (
//             <NavLink key={to} to={to} end={to === "/"} onClick={() => setMenuOpen(false)} className={({ isActive }) => ["flex items-center gap-2 px-3 py-2.5 rounded-sm text-sm font-medium tracking-wide transition-colors duration-150", isActive ? "text-amber-600 bg-amber-50" : "text-stone-600 hover:text-stone-900 hover:bg-stone-50"].join(" ")}>
//               {({ isActive }) => (
//                 <>
//                   <span className={["inline-block w-1 h-1 rounded-full", isActive ? "bg-amber-500" : "bg-stone-300"].join(" ")} />
//                   {label}
//                 </>
//               )}
//             </NavLink>
//           ))}
//           <div className="pt-3 border-t border-stone-100">
//             <NavLink to="/login" onClick={() => setMenuOpen(false)} className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-semibold text-white bg-amber-600 rounded-sm">
//               Login
//             </NavLink>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }




import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

/* ─── DATA ─────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: "Book", to: "/book", hasMega: true },
  { label: "Offers", to: "/offers" },
  { label: "Rooms", to: "/rooms" },
  { label: "Facilities", to: "/facilities" },
  { label: "Dining", to: "/dining" },
  { label: "Locations", to: "/locations" },
];

const MEGA_LEFT = [
  { label: "Find a Hotel", desc: "Search thousands of destinations" },
  { label: "Homes & Villas", desc: "Premium private residences" },
  { label: "Explore Destinations", desc: "Curated city & resort guides" },
  { label: "Luxury Travel", desc: "Ultra-premium experiences" },
  { label: "Resorts & Beaches", desc: "Sun, sand & serenity" },
  { label: "All-Inclusive Stays", desc: "Everything included, nothing missed" },
];

const MOBILE_LINKS = [
  {
    label: "Book",
    children: MEGA_LEFT.map((i) => i.label),
  },
  { label: "Offers" },
  { label: "Rooms" },
  { label: "Facilities" },
  { label: "Dining" },
  { label: "Locations" },
];

/* ─── ICONS (inline SVG — no react-icons dep needed) ───── */
const IconHelp = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" strokeLinecap="round" strokeWidth="2.4" />
  </svg>
);
const IconGlobe = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
  </svg>
);
const IconTrips = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    <line x1="12" y1="12" x2="12" y2="16" />
    <line x1="10" y1="14" x2="14" y2="14" />
  </svg>
);
const IconChevron = ({ open }) => (
  <svg
    width="12" height="12" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.2"
    className={`transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);
const IconMenu = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
const IconClose = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

/* ─── LOGO ───────────────────────────────────────────────── */
const Logo = () => (
  <NavLink to="/" className="flex items-center gap-2.5 select-none group shrink-0">
    <div className="w-8 h-8 rounded-sm flex items-center justify-center"
      style={{ background: "linear-gradient(135deg,#b45309 0%,#d97706 100%)" }}>
      <svg viewBox="0 0 24 24" fill="none" className="w-4.5 h-4.5" width="18" height="18">
        <path d="M3 21V9L12 3L21 9V21H15V15H9V21H3Z" fill="white" opacity="0.95" />
        <rect x="10" y="10" width="4" height="4" rx="0.5" fill="#d97706" />
      </svg>
    </div>
    <div className="leading-none">
      <div className="text-[13px] font-semibold tracking-[0.18em] uppercase text-stone-900">
        Aurum
      </div>
      <div className="text-[9px] tracking-[0.22em] uppercase font-medium" style={{ color: "#b45309" }}>
        Hotels & Resorts
      </div>
    </div>
  </NavLink>
);

/* ─── MEGA MENU ──────────────────────────────────────────── */
const MegaMenu = ({ visible }) => (
  <div
    className="absolute top-full left-0 right-0 z-50 pointer-events-none"
    style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(-8px)",
      transition: "opacity 0.22s ease, transform 0.22s ease",
      pointerEvents: visible ? "auto" : "none",
    }}
  >
    <div className="h-px w-full" style={{ background: "#d97706" }} />
    <div className="bg-white shadow-2xl">
      <div className="max-w-6xl mx-auto px-8 py-8 grid grid-cols-[1fr_340px] gap-10">

        {/* Left — links */}
        <div className="grid grid-cols-2 gap-x-10 gap-y-1">
          <div className="col-span-2 mb-3">
            <span className="text-[10px] tracking-[0.22em] uppercase font-semibold text-stone-400">
              Explore & Book
            </span>
          </div>
          {MEGA_LEFT.map((item) => (
            <NavLink
              key={item.label}
              to="#"
              className="group flex flex-col py-3 border-b border-stone-100 hover:border-amber-300 transition-colors duration-200"
            >
              <span className="text-[13px] font-semibold text-stone-800 group-hover:text-amber-700 transition-colors duration-200 tracking-wide">
                {item.label}
              </span>
              <span className="text-[11px] text-stone-400 mt-0.5 group-hover:text-stone-500 transition-colors duration-200">
                {item.desc}
              </span>
            </NavLink>
          ))}
        </div>

        {/* Right — featured card */}
        <div className="relative rounded-sm overflow-hidden group cursor-pointer" style={{ minHeight: 260 }}>
          <img
            src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=75"
            alt="Featured — Maldives Overwater Villa"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(10,8,5,0.82) 0%, rgba(10,8,5,0.2) 60%, transparent 100%)" }} />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <p className="text-[10px] tracking-[0.22em] uppercase text-amber-300 font-medium mb-1">
              Featured Escape
            </p>
            <h3 className="text-white font-semibold text-base leading-snug mb-3"
              style={{ fontFamily: "Georgia, serif" }}>
              Maldives Overwater<br />Villa Experience
            </h3>
            <button
              className="text-[11px] font-semibold tracking-widest uppercase px-4 py-2 text-white border border-white/50 hover:bg-white hover:text-stone-900 transition-all duration-200"
              style={{ borderRadius: "2px" }}
            >
              Discover More
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
);

/* ─── MOBILE DRAWER ──────────────────────────────────────── */
const MobileDrawer = ({ open, onClose }) => {
  const [openAccordion, setOpenAccordion] = useState(null);

  useEffect(() => {
    if (!open) setOpenAccordion(null);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Drawer */}
      <div
        className="fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white z-50 lg:hidden flex flex-col shadow-2xl"
        style={{
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.32s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
          <Logo />
          <button onClick={onClose} className="text-stone-500 hover:text-stone-800 p-1">
            <IconClose />
          </button>
        </div>

        {/* Links */}
        <div className="flex-1 overflow-y-auto py-4">
          {MOBILE_LINKS.map((item) => (
            <div key={item.label} className="border-b border-stone-50">
              {item.children ? (
                <>
                  <button
                    onClick={() => setOpenAccordion(openAccordion === item.label ? null : item.label)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left text-[13px] font-semibold tracking-wide text-stone-800 hover:text-amber-700 transition-colors"
                  >
                    {item.label}
                    <IconChevron open={openAccordion === item.label} />
                  </button>
                  <div
                    style={{
                      maxHeight: openAccordion === item.label ? "400px" : "0px",
                      overflow: "hidden",
                      transition: "max-height 0.3s ease",
                    }}
                  >
                    {item.children.map((child) => (
                      <NavLink
                        key={child}
                        to="#"
                        onClick={onClose}
                        className="flex items-center gap-2 px-8 py-3 text-[12px] text-stone-500 hover:text-amber-700 hover:bg-amber-50 transition-colors"
                      >
                        <span className="w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        {child}
                      </NavLink>
                    ))}
                  </div>
                </>
              ) : (
                <NavLink
                  to={`/${item.label.toLowerCase()}`}
                  onClick={onClose}
                  className="flex items-center px-6 py-4 text-[13px] font-semibold tracking-wide text-stone-800 hover:text-amber-700 transition-colors"
                >
                  {item.label}
                </NavLink>
              )}
            </div>
          ))}
        </div>

        {/* Drawer footer CTAs */}
        <div className="px-6 py-5 border-t border-stone-100 space-y-3">
          <button className="w-full py-3 text-[12px] font-semibold tracking-widest uppercase text-white transition-colors duration-200"
            style={{ background: "#b45309", borderRadius: "2px" }}>
            Join Now
          </button>
          <button className="w-full py-3 text-[12px] font-semibold tracking-widest uppercase text-stone-700 border border-stone-300 hover:border-stone-500 transition-colors duration-200"
            style={{ borderRadius: "2px" }}>
            Sign In
          </button>
        </div>
      </div>
    </>
  );
};

/* ─── NAVBAR ─────────────────────────────────────────────── */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const megaRef = useRef(null);
  const megaTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openMega = () => {
    clearTimeout(megaTimer.current);
    setMegaOpen(true);
  };

  const closeMega = () => {
    megaTimer.current = setTimeout(() => setMegaOpen(false), 120);
  };

  return (
    <>
      <header
        ref={megaRef}
        className="fixed top-0 inset-x-0 z-40 bg-white transition-shadow duration-300"
        style={{ boxShadow: scrolled ? "0 1px 16px rgba(0,0,0,0.09)" : "0 1px 0 rgba(0,0,0,0.07)" }}
      >
        {/* Top utility bar */}
        <div className="border-b border-stone-100 hidden lg:block">
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-end gap-5 py-2">
            <button className="flex items-center gap-1.5 text-[11px] text-stone-500 hover:text-stone-800 tracking-wide transition-colors">
              <IconHelp />
              <span>Help</span>
            </button>
            <button className="flex items-center gap-1.5 text-[11px] text-stone-500 hover:text-stone-800 tracking-wide transition-colors">
              <IconGlobe />
              <span>EN</span>
              <IconChevron />
            </button>
            <button className="flex items-center gap-1.5 text-[11px] text-stone-500 hover:text-stone-800 tracking-wide transition-colors">
              <IconTrips />
              <span>Trips</span>
            </button>
            <div className="w-px h-4 bg-stone-200" />
            <button className="text-[11px] font-semibold tracking-widest uppercase text-stone-600 hover:text-stone-900 transition-colors">
              Sign In
            </button>
            <button
              className="text-[11px] font-semibold tracking-widest uppercase px-4 py-1.5 text-white transition-colors duration-200"
              style={{ background: "#b45309", borderRadius: "2px" }}
              onMouseEnter={e => e.currentTarget.style.background = "#92400e"}
              onMouseLeave={e => e.currentTarget.style.background = "#b45309"}
            >
              Join Now
            </button>
          </div>
        </div>

        {/* Main nav bar */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-14 lg:h-16">
            <Logo />

            {/* Desktop nav links */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) =>
                link.hasMega ? (
                  <div
                    key={link.label}
                    onMouseEnter={openMega}
                    onMouseLeave={closeMega}
                    className="relative"
                  >
                    <button
                      className={`flex items-center gap-1 px-4 py-5 text-[12.5px] font-semibold tracking-wide uppercase transition-colors duration-150 ${
                        megaOpen ? "text-amber-700" : "text-stone-700 hover:text-amber-700"
                      }`}
                    >
                      {link.label}
                      <IconChevron open={megaOpen} />
                    </button>
                    <div
                      className="absolute bottom-0 left-4 right-4 h-[2px] transition-all duration-200"
                      style={{ background: megaOpen ? "#d97706" : "transparent" }}
                    />
                  </div>
                ) : (
                  <NavLink
                    key={link.label}
                    to={link.to}
                    className={({ isActive }) =>
                      `relative px-4 py-5 text-[12.5px] font-semibold tracking-wide uppercase transition-colors duration-150 group ${
                        isActive ? "text-amber-700" : "text-stone-700 hover:text-amber-700"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {link.label}
                        <span
                          className={`absolute bottom-0 left-4 right-4 h-[2px] transition-all duration-200 ${
                            isActive ? "bg-amber-600" : "bg-transparent group-hover:bg-amber-300"
                          }`}
                        />
                      </>
                    )}
                  </NavLink>
                )
              )}
            </nav>

            {/* Mobile hamburger */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden text-stone-700 hover:text-stone-900 p-1 transition-colors"
              aria-label="Open menu"
            >
              <IconMenu />
            </button>
          </div>
        </div>

        {/* Mega menu */}
        <div onMouseEnter={openMega} onMouseLeave={closeMega}>
          <MegaMenu visible={megaOpen} />
        </div>
      </header>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {/* Spacer */}
      <div className="h-[57px] lg:h-[106px]" aria-hidden="true" />
    </>
  );
}