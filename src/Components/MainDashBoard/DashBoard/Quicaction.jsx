import {
  FiPlusCircle,
  FiCalendar,
  FiLogIn,
  FiLogOut,
  FiUserPlus,
} from "react-icons/fi";

// Actions are UI-only — `onClick` is a no-op placeholder until
// real handlers/routes/modals exist.
const ACTIONS = [
  {
    key: "add-room",
    label: "Add Room",
    icon: FiPlusCircle,
    iconClasses:
      "bg-[#C9A24B]/10 text-[#C9A24B] dark:bg-[#C9A24B]/15",
  },
  {
    key: "new-booking",
    label: "New Booking",
    icon: FiCalendar,
    iconClasses:
      "bg-blue-500/10 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400",
  },
  {
    key: "check-in",
    label: "Check-in",
    icon: FiLogIn,
    iconClasses:
      "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400",
  },
  {
    key: "check-out",
    label: "Check-out",
    icon: FiLogOut,
    iconClasses:
      "bg-red-500/10 text-red-600 dark:bg-red-500/15 dark:text-red-400",
  },
  {
    key: "add-guest",
    label: "Add Guest",
    icon: FiUserPlus,
    iconClasses:
      "bg-purple-500/10 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400",
  },
];

/**
 * QuickActions
 *
 * A card of shortcut buttons for common front-desk tasks. No
 * backend wiring — pass an `onAction` handler and switch on the
 * action key to hook up real behavior (open a modal, navigate, etc.).
 *
 * Props
 * ----
 * onAction : (key: string) => void   optional, called with the
 *                                    action's key when a button is clicked
 */
export default function QuickActions({ onAction }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-slate-900 dark:text-white">
          Quick Actions
        </h2>
        <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
          Common front-desk tasks
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {ACTIONS.map(({ key, label, icon: Icon, iconClasses }) => (
          <button
            key={key}
            type="button"
            onClick={() => onAction?.(key)}
            className="group flex flex-col items-center gap-2.5 rounded-lg border border-slate-200 bg-white px-3 py-4
            text-center transition-all duration-200 ease-out
            hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md
            dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:shadow-black/20"
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-transform duration-200 ease-out group-hover:scale-105 ${iconClasses}`}
            >
              <Icon className="h-5 w-5" />
            </div>
            <span className="text-xs font-medium text-slate-600 dark:text-slate-300 sm:text-sm">
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}