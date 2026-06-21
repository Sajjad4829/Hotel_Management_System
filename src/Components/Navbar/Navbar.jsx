import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

/* ─── navigation ─────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: "Book", to: "/book" },
  { label: "Offers", to: "/offers" },
  { label: "Rooms", to: "/rooms" },
  { label: "Facilities", to: "/facility" },
  { label: "Dining", to: "/dining" },
  { label: "Locations", to: "/locations" },
];

const MOBILE_LINKS = [
  {
    label: "Book"},
  { label: "Offers" },
  { label: "Rooms" },
  { label: "Facility" },
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
  const [drawerOpen, setDrawerOpen] = useState(false);
 


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  


  return (
    <>
      <header
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
  {NAV_LINKS.map((link) => (
    <NavLink
      key={link.label}
      to={link.to}
      className={({ isActive }) =>
        `relative px-4 py-5 text-[12.5px] font-semibold tracking-wide uppercase transition-colors duration-150 group ${
          isActive
            ? "text-amber-700"
            : "text-stone-700 hover:text-amber-700"
        }`
      }
    >
      {({ isActive }) => (
        <>
          {link.label}
          <span
            className={`absolute bottom-0 left-4 right-4 h-[2px] transition-all duration-200 ${
              isActive
                ? "bg-amber-600"
                : "bg-transparent group-hover:bg-amber-300"
            }`}
          />
        </>
      )}
    </NavLink>
  ))}
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

       
      </header>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {/* Spacer */}
      <div className="h-[57px] lg:h-[106px]" aria-hidden="true" />
    </>
  );
}