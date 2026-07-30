// Dummy data — replace with real bookings once an API/backend exists.
const BOOKINGS = [
  {
    id: "BK-1042",
    guest: "Sofia Martinez",
    room: "Deluxe King — 204",
    checkIn: "Jul 29, 2026",
    checkOut: "Aug 02, 2026",
    status: "Checked In",
  },
  {
    id: "BK-1041",
    guest: "David Okafor",
    room: "Standard Twin — 118",
    checkIn: "Jul 29, 2026",
    checkOut: "Jul 31, 2026",
    status: "Confirmed",
  },
  {
    id: "BK-1040",
    guest: "Hana Kobayashi",
    room: "Suite — 501",
    checkIn: "Jul 28, 2026",
    checkOut: "Aug 03, 2026",
    status: "Checked In",
  },
  {
    id: "BK-1039",
    guest: "Liam O'Connor",
    room: "Deluxe Queen — 312",
    checkIn: "Jul 27, 2026",
    checkOut: "Jul 29, 2026",
    status: "Checked Out",
  },
  {
    id: "BK-1038",
    guest: "Priya Nair",
    room: "Standard King — 226",
    checkIn: "Jul 30, 2026",
    checkOut: "Aug 01, 2026",
    status: "Cancelled",
  },
];

// Status -> badge classes, light + dark friendly.
const STATUS_STYLES = {
  "Checked In":
    "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400",
  Confirmed:
    "bg-blue-500/10 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400",
  "Checked Out":
    "bg-slate-500/10 text-slate-600 dark:bg-slate-500/15 dark:text-slate-400",
  Cancelled: "bg-red-500/10 text-red-600 dark:bg-red-500/15 dark:text-red-400",
};

function StatusBadge({ status }) {
  const classes = STATUS_STYLES[status] ?? STATUS_STYLES["Checked Out"];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${classes}`}
    >
      {status}
    </span>
  );
}

/**
 * RecentBookings
 *
 * Shows the latest 5 bookings. Renders as a real table on
 * larger screens and stacks into cards on mobile so nothing
 * gets cramped or scrolls sideways.
 *
 * Props
 * ----
 * bookings : Array  optional override for the dummy data above,
 *                   same shape as BOOKINGS. Only the first 5 are shown.
 */
export default function RecentBookings({ bookings = BOOKINGS }) {
  const rows = bookings.slice(0, 5);

  return (
    <div className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
        <div>
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">
            Recent Bookings
          </h2>
          <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
            Latest 5 reservations
          </p>
        </div>
      </div>

      {/* Table — sm and up */}
      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <th className="px-5 py-3 font-medium text-slate-500 dark:text-slate-400">
                Guest Name
              </th>
              <th className="px-5 py-3 font-medium text-slate-500 dark:text-slate-400">
                Room
              </th>
              <th className="px-5 py-3 font-medium text-slate-500 dark:text-slate-400">
                Check-in
              </th>
              <th className="px-5 py-3 font-medium text-slate-500 dark:text-slate-400">
                Check-out
              </th>
              <th className="px-5 py-3 font-medium text-slate-500 dark:text-slate-400">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((b) => (
              <tr
                key={b.id}
                className="border-b border-slate-100 last:border-0 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50"
              >
                <td className="px-5 py-3.5 font-medium text-slate-900 dark:text-white">
                  {b.guest}
                </td>
                <td className="px-5 py-3.5 text-slate-600 dark:text-slate-300">
                  {b.room}
                </td>
                <td className="px-5 py-3.5 text-slate-600 dark:text-slate-300">
                  {b.checkIn}
                </td>
                <td className="px-5 py-3.5 text-slate-600 dark:text-slate-300">
                  {b.checkOut}
                </td>
                <td className="px-5 py-3.5">
                  <StatusBadge status={b.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card list — mobile only */}
      <div className="divide-y divide-slate-100 sm:hidden dark:divide-slate-800">
        {rows.map((b) => (
          <div key={b.id} className="space-y-2 px-5 py-4">
            <div className="flex items-start justify-between gap-3">
              <p className="font-medium text-slate-900 dark:text-white">
                {b.guest}
              </p>
              <StatusBadge status={b.status} />
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {b.room}
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-400 dark:text-slate-500">
              <span>In: {b.checkIn}</span>
              <span>Out: {b.checkOut}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}