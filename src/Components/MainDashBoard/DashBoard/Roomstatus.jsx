// Dummy data — replace with real counts once an API/backend exists.
const ROOM_STATUS = [
  {
    label: "Available Rooms",
    count: 22,
    barClasses: "bg-emerald-500 dark:bg-emerald-400",
  },
  {
    label: "Occupied Rooms",
    count: 41,
    barClasses: "bg-blue-500 dark:bg-blue-400",
  },
  {
    label: "Reserved Rooms",
    count: 12,
    barClasses: "bg-[#C9A24B] dark:bg-[#C9A24B]",
  },
  {
    label: "Maintenance Rooms",
    count: 5,
    barClasses: "bg-red-500 dark:bg-red-400",
  },
];

/**
 * RoomStatus
 *
 * Breaks down room inventory into Available / Occupied / Reserved /
 * Maintenance, each shown as a labeled progress bar relative to the
 * total room count.
 *
 * Props
 * ----
 * data       : Array   optional override for the dummy data above,
 *                      same shape as ROOM_STATUS: { label, count, barClasses }
 * totalRooms : number  optional override for the total used to size
 *                      each bar (defaults to the sum of `data` counts)
 */
export default function RoomStatus({ data = ROOM_STATUS, totalRooms }) {
  const total = totalRooms ?? data.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-1">
        <h2 className="text-base font-semibold text-slate-900 dark:text-white">
          Room Status
        </h2>
        <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
          {total} rooms total
        </p>
      </div>

      <div className="mt-4 space-y-5">
        {data.map(({ label, count, barClasses }) => {
          const percent = total > 0 ? Math.round((count / total) * 100) : 0;

          return (
            <div key={label}>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="font-medium text-slate-600 dark:text-slate-300">
                  {label}
                </span>
                <span className="text-slate-400 dark:text-slate-500">
                  {count} <span className="text-xs">({percent}%)</span>
                </span>
              </div>

              <div
                role="progressbar"
                aria-label={label}
                aria-valuenow={percent}
                aria-valuemin={0}
                aria-valuemax={100}
                className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
              >
                <div
                  className={`h-full rounded-full transition-[width] duration-500 ease-out ${barClasses}`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}