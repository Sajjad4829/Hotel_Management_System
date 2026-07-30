import { useEffect, useRef, useState } from "react";
import { Menu, Search, Bell, ChevronDown, User, Settings, LogOut } from "lucide-react";

/**
 * TopNavbar
 *
 * Sticky top bar. The hamburger button only renders its click
 * as visible (via lg:hidden) on mobile/tablet, where it opens
 * the off-canvas Sidebar.
 *
 * Props
 * ----
 * onMenuClick : () => void   opens the mobile sidebar
 * title       : string       current page title, shown next to the
 *                            hamburger (defaults to "Dashboard")
 * user        : { name, role, avatarUrl }  profile shown in the
 *                            dropdown (all optional, has defaults)
 * onLogout    : () => void   called when "Log out" is clicked
 */
export default function TopNavbar({
  onMenuClick,
  title = "Dashboard",
  user = { name: "Amelia Front", role: "Front Desk Manager", avatarUrl: null },
  onLogout,
}) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // Close the dropdown on outside click / Escape
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    function handleEscape(event) {
      if (event.key === "Escape") setIsProfileOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center gap-3 border-b border-slate-200 bg-white px-4 sm:px-6">
      {/* Hamburger — mobile only */}
      <button
        onClick={onMenuClick}
        className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 lg:hidden"
        aria-label="Open sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Dynamic page title */}
      <h1 className="truncate text-base font-semibold text-slate-900 sm:text-lg">
        {title}
      </h1>

      {/* Search — hidden on small screens to make room for the title */}
      <div className="relative ml-4 hidden flex-1 max-w-md md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search bookings, guests, rooms..."
          className="w-full rounded-md border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-[#C9A24B] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#C9A24B]"
        />
      </div>

      {/* Push remaining items to the right */}
      <div className="ml-auto flex items-center gap-2 sm:gap-4">
        {/* Notifications */}
        <button
          className="relative rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#C9A24B]" />
        </button>

        <div className="hidden h-6 w-px bg-slate-200 sm:block" />

        {/* Profile + dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-md py-1.5 pl-1 pr-2 hover:bg-slate-100"
            aria-haspopup="menu"
            aria-expanded={isProfileOpen}
          >
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-slate-200" />
            )}
            <span className="hidden text-sm font-medium text-slate-700 sm:block">
              {user.name}
            </span>
            <ChevronDown
              className={`hidden h-4 w-4 text-slate-400 transition-transform duration-150 sm:block ${
                isProfileOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>

          {/* Dropdown menu */}
          <div
            role="menu"
            className={`absolute right-0 z-30 mt-2 w-56 origin-top-right rounded-md border border-slate-200 bg-white py-1 shadow-lg transition-all duration-150 ${
              isProfileOpen
                ? "translate-y-0 opacity-100"
                : "pointer-events-none -translate-y-1 opacity-0"
            }`}
          >
            <div className="border-b border-slate-100 px-4 py-3">
              <p className="truncate text-sm font-medium text-slate-900">
                {user.name}
              </p>
              <p className="truncate text-xs text-slate-500">{user.role}</p>
            </div>

            <button
              role="menuitem"
              onClick={() => setIsProfileOpen(false)}
              className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            >
              <User className="h-4 w-4" />
              My Profile
            </button>
            <button
              role="menuitem"
              onClick={() => setIsProfileOpen(false)}
              className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            >
              <Settings className="h-4 w-4" />
              Settings
            </button>

            <div className="my-1 border-t border-slate-100" />

            <button
              role="menuitem"
              onClick={() => {
                setIsProfileOpen(false);
                onLogout?.();
              }}
              className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              Log out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}