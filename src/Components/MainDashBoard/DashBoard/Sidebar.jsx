import { useState } from "react";
import {
  FiGrid,
  FiCalendar,
  FiUsers,
  FiSettings,
  FiX,
  FiChevronDown,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";
import { MdOutlineBed } from "react-icons/md";

// `children` (optional) turns an item into a nested/expandable menu.
const NAV_ITEMS = [
  { label: "Overview", icon: FiGrid, href: "#" },
  {
    label: "Bookings",
    icon: FiCalendar,
    children: [
      { label: "All Bookings", href: "#" },
      { label: "New Booking", href: "#" },
      { label: "Cancellations", href: "#" },
    ],
  },
  {
    label: "Rooms",
    icon: MdOutlineBed,
    children: [
      { label: "Room Types", href: "#" },
      { label: "Availability", href: "#" },
    ],
  },
  { label: "Guests", icon: FiUsers, href: "#" },
  { label: "Settings", icon: FiSettings, href: "#" },
];

/**
 * Sidebar
 *
 * Desktop  -> always visible, fixed to the left, pushes content over.
 *             Can be collapsed to an icon-only rail via the toggle
 *             button in the footer.
 * Mobile   -> hidden off-canvas by default, slides in as a drawer
 *             when `isOpen` is true. `onClose` is called by the
 *             backdrop and by the in-panel close button.
 *
 * Props
 * ----
 * isOpen  : boolean    controls the off-canvas drawer state on mobile
 * onClose : () => void closes the drawer (mobile only)
 */
export default function Sidebar({ isOpen, onClose }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState({});
  const [activeItem, setActiveItem] = useState("Overview");

  const toggleMenu = (label) => {
    if (isCollapsed) return; // nested menus don't expand in rail mode
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const selectItem = (label) => setActiveItem(label);

  return (
    <>
      {/* Backdrop — mobile only, shown while the drawer is open */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-30 bg-slate-950/50 transition-opacity duration-200 lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
      />

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col bg-[#111827] text-slate-300 transition-all duration-200 ease-in-out
        lg:static lg:z-auto lg:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        ${isCollapsed ? "w-64 lg:w-20" : "w-64"}`}
      >
        {/* Brand */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-5 lg:px-4">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#C9A24B] text-sm font-semibold text-slate-900">
              H
            </div>
            <span
              className={`whitespace-nowrap text-base font-semibold tracking-wide text-white transition-opacity duration-150 ${
                isCollapsed ? "lg:hidden lg:opacity-0" : "opacity-100"
              }`}
            >
              Haven Admin
            </span>
          </div>

          {/* Close button — mobile only */}
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-white/5 hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 space-y-1 overflow-y-auto overflow-x-hidden px-3 py-4">
          {NAV_ITEMS.map(({ label, icon: Icon, href, children }) => {
            const hasChildren = Boolean(children?.length);
            const isMenuOpen = openMenus[label];
            const isActive = activeItem === label;

            return (
              <div key={label}>
                <a
                  href={hasChildren ? undefined : href}
                  onClick={() =>
                    hasChildren ? toggleMenu(label) : selectItem(label)
                  }
                  title={isCollapsed ? label : undefined}
                  className={`group flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors duration-150 ${
                    isActive
                      ? "bg-[#C9A24B]/15 text-[#C9A24B]"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  } ${isCollapsed ? "lg:justify-center" : ""}`}
                >
                  <Icon
                    className={`h-[18px] w-[18px] shrink-0 transition-colors duration-150 ${
                      isActive
                        ? "text-[#C9A24B]"
                        : "text-slate-400 group-hover:text-white"
                    }`}
                  />
                  <span
                    className={`flex-1 truncate ${
                      isCollapsed ? "lg:hidden" : ""
                    }`}
                  >
                    {label}
                  </span>
                  {hasChildren && (
                    <FiChevronDown
                      className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                        isMenuOpen ? "rotate-180" : "rotate-0"
                      } ${isCollapsed ? "lg:hidden" : ""}`}
                    />
                  )}
                </a>

                {/* Nested menu */}
                {hasChildren && (
                  <div
                    className={`overflow-hidden transition-all duration-200 ease-in-out ${
                      isMenuOpen && !isCollapsed
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    } ${isCollapsed ? "lg:hidden" : ""}`}
                  >
                    <div className="ml-4 mt-1 space-y-1 border-l border-white/10 pl-4">
                      {children.map((child) => {
                        const childActive = activeItem === child.label;
                        return (
                          <a
                            key={child.label}
                            href={child.href}
                            onClick={() => selectItem(child.label)}
                            className={`block rounded-md px-3 py-2 text-sm transition-colors duration-150 ${
                              childActive
                                ? "text-[#C9A24B]"
                                : "text-slate-400 hover:text-white"
                            }`}
                          >
                            {child.label}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer — user card + collapse toggle (desktop only) */}
        <div className="shrink-0 border-t border-white/10 p-3">
          <div
            className={`flex items-center gap-3 rounded-md px-2 py-2 ${
              isCollapsed ? "lg:justify-center" : ""
            }`}
          >
            <div className="h-9 w-9 shrink-0 rounded-full bg-slate-700" />
            <div className={`min-w-0 ${isCollapsed ? "lg:hidden" : ""}`}>
              <p className="truncate text-sm font-medium text-white">
                Amelia Front
              </p>
              <p className="truncate text-xs text-slate-400">
                Front Desk Manager
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCollapsed((prev) => !prev)}
            className="mt-2 hidden w-full items-center justify-center gap-2 rounded-md py-2 text-xs font-medium text-slate-400 transition-colors duration-150 hover:bg-white/5 hover:text-white lg:flex"
          >
            {isCollapsed ? (
              <FiChevronsRight className="h-4 w-4" />
            ) : (
              <>
                <FiChevronsLeft className="h-4 w-4" />
                Collapse
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}