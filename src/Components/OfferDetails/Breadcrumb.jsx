// src/components/Breadcrumb.jsx
import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

/**
 * Reusable breadcrumb trail.
 * items: [{ label: string, to?: string }]
 * The last item is treated as the current page (no link, muted-gold text).
 */
const Breadcrumb = ({ items = [] }) => {
  return (
    <nav aria-label="Breadcrumb" className="w-full">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        <li className="flex items-center gap-1.5">
          <Link
            to="/"
            className="flex items-center gap-1 text-ivory-400/70 hover:text-brass-400 transition-colors duration-200"
          >
            <Home size={14} strokeWidth={2} />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center gap-1.5">
              <ChevronRight size={14} className="text-ivory-400/30" />
              {isLast || !item.to ? (
                <span
                  className="text-brass-400 font-medium truncate max-w-[220px]"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.to}
                  className="text-ivory-400/70 hover:text-brass-400 transition-colors duration-200 truncate max-w-[220px]"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
