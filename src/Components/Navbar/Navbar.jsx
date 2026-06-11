import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
// ১. একই ফোল্ডারের পাশে থাকা HotelLogo ইম্পোর্ট করলাম
import HotelLogo from "../HotelLogo/HotelLogo"; 

// মেনুর লিংকগুলো একটা অ্যারেতে রাখলাম
const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Rooms", to: "/rooms" },
  { label: "Facilities", to: "/facilities" },
  { label: "Reviews", to: "/reviews" },
  { label: "Contact", to: "/contact" },
];

// একটিভ লিংকের জন্য টেইলউইন্ড ক্লাস
const navLinkClass = ({ isActive }) => [
  "relative text-sm font-medium tracking-wide transition-colors duration-200 pb-0.5",
  "after:absolute after:left-0 after:bottom-0 after:h-[1.5px] after:bg-amber-500 after:transition-all after:duration-300",
  isActive ? "text-amber-600 after:w-full" : "text-stone-600 hover:text-stone-900 after:w-0 hover:after:w-full",
].join(" ");

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // স্ক্রোল করলে ব্যাকগ্রাউন্ড চেঞ্জ হওয়ার লজিক
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // স্ক্রিন বড় করলে মোবাইল মেনু বন্ধ হওয়ার লজিক
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className={["fixed top-0 inset-x-0 z-50 transition-all duration-300", scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm border-b border-stone-100" : "bg-white border-b border-transparent"].join(" ")}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* ২. এখানে আপনার সুন্দর লোগোটি বসে গেল */}
          <HotelLogo />

          {/* ৩. ডেস্কটপ মেনু লিংকসমূহ */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, to }) => (
              <li key={to}>
                <NavLink to={to} end={to === "/"} className={navLinkClass}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* ৪. ডেস্কটপ লগইন বাটন */}
          <div className="hidden md:flex items-center gap-3">
            <NavLink to="/login" className="px-5 py-2 text-sm font-semibold tracking-wide text-white bg-amber-600 rounded-sm hover:bg-amber-500 transition-colors duration-200">
              Login
            </NavLink>
          </div>

          {/* ৫. মোবাইল হ্যামবার্গার বাটন */}
          <button type="button" onClick={() => setMenuOpen((prev) => !prev)} className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] rounded">
            <span className={["block w-5 h-[1.5px] bg-stone-700 transition-all duration-300", menuOpen ? "rotate-45 translate-y-[6.5px]" : ""].join(" ")} />
            <span className={["block w-5 h-[1.5px] bg-stone-700 transition-all duration-300", menuOpen ? "opacity-0 scale-x-0" : ""].join(" ")} />
            <span className={["block w-5 h-[1.5px] bg-stone-700 transition-all duration-300", menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""].join(" ")} />
          </button>
        </div>
      </nav>

      {/* ৬. মোবাইল ড্রপডাউন মেনু */}
      <div className={["md:hidden overflow-hidden transition-all duration-300 ease-in-out", menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"].join(" ")}>
        <div className="bg-white border-t border-stone-100 px-4 pt-3 pb-5 space-y-1 shadow-md">
          {NAV_LINKS.map(({ label, to }) => (
            <NavLink key={to} to={to} end={to === "/"} onClick={() => setMenuOpen(false)} className={({ isActive }) => ["flex items-center gap-2 px-3 py-2.5 rounded-sm text-sm font-medium tracking-wide transition-colors duration-150", isActive ? "text-amber-600 bg-amber-50" : "text-stone-600 hover:text-stone-900 hover:bg-stone-50"].join(" ")}>
              {({ isActive }) => (
                <>
                  <span className={["inline-block w-1 h-1 rounded-full", isActive ? "bg-amber-500" : "bg-stone-300"].join(" ")} />
                  {label}
                </>
              )}
            </NavLink>
          ))}
          <div className="pt-3 border-t border-stone-100">
            <NavLink to="/login" onClick={() => setMenuOpen(false)} className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-semibold text-white bg-amber-600 rounded-sm">
              Login
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}
