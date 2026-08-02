import {
  FiHome,
  FiCheckCircle,
  FiKey,
  FiLogIn,
  FiLogOut,
  FiDollarSign,
} from "react-icons/fi";
import StatCard from "./Statcard";
import RecentBookings from "./RecentBookings";
import RoomStatus from "./Roomstatus";
import QuickActions from "./Quicaction";

const STATS = [
  { label: "Total Rooms", value: "80", icon: FiHome },
  { label: "Booked Rooms", value: "58", icon: FiCheckCircle },
  { label: "Available Rooms", value: "22", icon: FiKey },
  { label: "Today's Check-ins", value: "14", icon: FiLogIn },
  { label: "Today's Check-outs", value: "9", icon: FiLogOut },
  { label: "Revenue", value: "$8,420", icon: FiDollarSign, hint: "Today" },
];

export default function Dashboard() {
return (
  <>
    <div className="mb-6">
      <h1 className="text-2xl font-semibold text-slate-900">Overview</h1>
      <p className="mt-1 text-sm text-slate-500">
        Welcome back. Here's what's happening at your property today.
      </p>
    </div>

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {STATS.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>

    <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
      <div className="xl:col-span-2">
        <RecentBookings />
      </div>

      <div className="flex flex-col gap-4">
        <RoomStatus />
        <QuickActions />
      </div>
    </div>
  </>
);
}