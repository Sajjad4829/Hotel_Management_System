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
  FiLayout,
} from "react-icons/fi";
import { MdOutlineBed } from "react-icons/md";
import { NavLink } from "react-router-dom";
// `children` (optional) turns an item into a nested/expandable menu.
const NAV_ITEMS = [
  { label: "Overview", icon: FiGrid, href: "#" },
  {
    label: "Page Builder",
    icon: FiLayout,
    path: "/dashboard/page-builder",
    children: []
  },
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
      { label: "All Rooms", path: "/dashboard/rooms" },
      { label: "Room Types", path: "/dashboard/rooms/types" },
      { label: "Availability", path: "/dashboard/rooms/availability" },
    ],
  },
  { label: "Guests", icon: FiUsers, href: "#" },
  { label: "Settings", icon: FiSettings, href: "#" },
];

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
        className={`fixed inset-0 z-30 bg-slate-950/50 transition-opacity duration-200 lg:hidden ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"
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
              className={`whitespace-nowrap text-base font-semibold tracking-wide text-white transition-opacity duration-150 ${isCollapsed ? "lg:hidden lg:opacity-0" : "opacity-100"
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
          {NAV_ITEMS.map(({ label, icon: Icon, href, path, children }) => {
            const hasChildren = Boolean(children?.length);
            const isMenuOpen = openMenus[label];
            const isActive = activeItem === label;

            const content = (
              <>
                <Icon
                  className={`h-[18px] w-[18px] shrink-0 transition-colors duration-150 ${isActive
                      ? "text-[#C9A24B]"
                      : "text-slate-400 group-hover:text-white"
                    }`}
                />
                <span
                  className={`flex-1 truncate ${isCollapsed ? "lg:hidden" : ""
                    }`}
                >
                  {label}
                </span>
                {hasChildren && (
                  <FiChevronDown
                    className={`h-4 w-4 shrink-0 transition-transform duration-200 ${isMenuOpen ? "rotate-180" : "rotate-0"
                      } ${isCollapsed ? "lg:hidden" : ""}`}
                  />
                )}
              </>
            );

            const linkClass = `group flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors duration-150 ${isActive
              ? "bg-[#C9A24B]/15 text-[#C9A24B]"
              : "text-slate-400 hover:bg-white/5 hover:text-white"
            } ${isCollapsed ? "lg:justify-center" : ""}`;

            return (
              <div key={label}>
                {path ? (
                  <NavLink
                    to={path}
                    onClick={() => selectItem(label)}
                    title={isCollapsed ? label : undefined}
                    className={linkClass}
                  >
                    {content}
                  </NavLink>
                ) : (
                  <a
                    href={hasChildren ? undefined : href}
                    onClick={() =>
                      hasChildren ? toggleMenu(label) : selectItem(label)
                    }
                    title={isCollapsed ? label : undefined}
                    className={linkClass}
                  >
                    {content}
                  </a>
                )}

                {/* Nested menu */}
                {hasChildren && (
                  <div
                    className={`overflow-hidden transition-all duration-200 ease-in-out ${isMenuOpen && !isCollapsed
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                      } ${isCollapsed ? "lg:hidden" : ""}`}
                  >
                    <div className="ml-4 mt-1 space-y-1 border-l border-white/10 pl-4">
                      {children.map((child) => {
                       // const childActive = activeItem === child.label;
                        return (
                          <NavLink
                            key={child.label}
                            to={child.path}
                            onClick={() => selectItem(child.label)}
                            className={({ isActive }) =>
                              `block rounded-md px-3 py-2 text-sm transition-colors duration-150 ${isActive
                                ? "text-[#C9A24B]"
                                : "text-slate-400 hover:text-white"
                              }`
                            }
                          >
                            {child.label}
                          </NavLink>
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
            className={`flex items-center gap-3 rounded-md px-2 py-2 ${isCollapsed ? "lg:justify-center" : ""
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