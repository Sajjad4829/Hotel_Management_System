import { FiArrowUp, FiArrowDown } from "react-icons/fi";

// Color tokens -> icon chip classes, light + dark friendly.
// Extend this map if you need more accent colors.
const COLOR_MAP = {
  gold: "bg-[#C9A24B]/10 text-[#C9A24B] dark:bg-[#C9A24B]/15",
  blue: "bg-blue-500/10 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400",
  green:
    "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400",
  red: "bg-red-500/10 text-red-600 dark:bg-red-500/15 dark:text-red-400",
  purple:
    "bg-purple-500/10 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400",
  slate:
    "bg-slate-500/10 text-slate-600 dark:bg-slate-500/15 dark:text-slate-400",
};

/**
 * StatCard
 *
 * A single reusable summary metric tile. Drop as many as you need
 * into a grid to build a stats section.
 *
 * Props
 * ----
 * title : string            metric name, e.g. "Total Rooms"
 * value : string | number   metric value, e.g. 80 or "$8,420"
 * icon  : Component         icon component (e.g. from react-icons)
 * color : keyof COLOR_MAP   accent color, defaults to "gold"
 *                           one of: gold | blue | green | red | purple | slate
 * trend : { value: string, direction: "up" | "down" }  optional
 *                           e.g. { value: "12%", direction: "up" }
 */
export default function StatCard({
  title,
  value,
  icon: Icon,
  color = "gold",
  trend,
}) {
  const iconClasses = COLOR_MAP[color] ?? COLOR_MAP.gold;
  const isUp = trend?.direction === "up";

  return (
    <div
      className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5
      transition-all duration-200 ease-out
      hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md
      dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:shadow-black/20"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-slate-500 dark:text-slate-400">
            {title}
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white sm:text-2xl">
            {value}
          </p>
        </div>

        {Icon && (
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-transform duration-200 ease-out group-hover:scale-105 ${iconClasses}`}
          >
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>

      {trend && (
        <div className="mt-3 flex items-center gap-1.5">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-xs font-medium ${
              isUp
                ? "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400"
                : "bg-red-500/10 text-red-600 dark:bg-red-500/15 dark:text-red-400"
            }`}
          >
            {isUp ? (
              <FiArrowUp className="h-3 w-3" />
            ) : (
              <FiArrowDown className="h-3 w-3" />
            )}
            {trend.value}
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500">
            vs last period
          </span>
        </div>
      )}
    </div>
  );
}