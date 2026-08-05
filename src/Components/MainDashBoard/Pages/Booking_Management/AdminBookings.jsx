import React, { useState, useEffect } from "react";
import api from "../../../../services/api";
import { FiSearch, FiFilter, FiDollarSign, FiCalendar, FiCreditCard, FiCheckCircle, FiClock, FiAlertTriangle, FiRefreshCw } from "react-icons/fi";

const INITIAL_BOOKINGS = [
  {
    id: "RES-894215",
    guestName: "Sofia Martinez",
    email: "sofia.m@example.com",
    room: "Executive Presidential Suite",
    hotel: "Grand Horizon Resort & Spa",
    checkIn: "2026-08-10",
    checkOut: "2026-08-15",
    totalPrice: 1250,
    paymentMethod: "Credit Card",
    paymentStatus: "Paid",
    bookingStatus: "Confirmed",
    createdAt: "2026-08-01"
  },
  {
    id: "RES-742918",
    guestName: "David Okafor",
    email: "david.o@example.com",
    room: "Deluxe King Room",
    hotel: "Azure Coast Beachfront Hotel",
    checkIn: "2026-08-12",
    checkOut: "2026-08-14",
    totalPrice: 480,
    paymentMethod: "Pay at Hotel",
    paymentStatus: "Pending",
    bookingStatus: "Confirmed",
    createdAt: "2026-08-02"
  },
  {
    id: "RES-631049",
    guestName: "Hana Kobayashi",
    email: "hana.k@example.com",
    room: "Royal Oceanfront Suite",
    hotel: "Sunset View Sanctuary",
    checkIn: "2026-08-15",
    checkOut: "2026-08-20",
    totalPrice: 2400,
    paymentMethod: "Mobile Wallet",
    paymentStatus: "Paid",
    bookingStatus: "Confirmed",
    createdAt: "2026-08-03"
  },
  {
    id: "RES-519284",
    guestName: "Marcus Vance",
    email: "m.vance@example.com",
    room: "Standard Queen Room",
    hotel: "Grand Horizon Resort & Spa",
    checkIn: "2026-08-18",
    checkOut: "2026-08-21",
    totalPrice: 660,
    paymentMethod: "Credit Card",
    paymentStatus: "Refunded",
    bookingStatus: "Cancelled",
    createdAt: "2026-08-04"
  }
];

export default function AdminBookings() {
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTab, setFilterTab] = useState("All");

  const fetchAllBookings = async () => {
    setLoading(true);
    try {
      const response = await api.get("/bookings/all");
      if (response.data?.success && Array.isArray(response.data.data) && response.data.data.length > 0) {
        const mapped = response.data.data.map((item) => ({
          id: item.bookingId || item._id,
          _id: item._id,
          guestName: item.user?.fullName || item.user?.email || "Customer",
          email: item.user?.email || "N/A",
          room: item.room?.roomName || "Selected Accommodation",
          hotel: item.hotel?.name || "Grand Horizon Resort",
          checkIn: new Date(item.checkIn).toISOString().split("T")[0],
          checkOut: new Date(item.checkOut).toISOString().split("T")[0],
          totalPrice: item.totalPrice || 0,
          paymentMethod: item.paymentMethod || (item.paymentStatus === "Paid" ? "Credit Card" : "Pay at Hotel"),
          paymentStatus: item.paymentStatus || "Pending",
          bookingStatus: item.bookingStatus || "Confirmed",
          createdAt: new Date(item.createdAt || Date.now()).toLocaleDateString()
        }));
        setBookings(mapped);
      }
    } catch (error) {
      console.warn("Using locally cached sample bookings due to server status:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBookings();
  }, []);

  // Filter logic
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.room.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterTab === "All") return matchesSearch;
    if (filterTab === "Paid") return matchesSearch && b.paymentStatus === "Paid";
    if (filterTab === "Pending") return matchesSearch && b.paymentStatus === "Pending";
    if (filterTab === "Cancelled") return matchesSearch && b.bookingStatus === "Cancelled";
    return matchesSearch;
  });

  // KPI calculations
  const totalRevenue = bookings
    .filter((b) => b.paymentStatus === "Paid" && b.bookingStatus !== "Cancelled")
    .reduce((acc, curr) => acc + curr.totalPrice, 0);
  const paidCount = bookings.filter((b) => b.paymentStatus === "Paid").length;
  const pendingCount = bookings.filter((b) => b.paymentStatus === "Pending").length;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
            <FiCreditCard className="text-[#0071c2]" />
            Booking & Payment Management
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Monitor room reservations, track revenue, and audit payment transaction records.
          </p>
        </div>
        <button
          onClick={fetchAllBookings}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl bg-[#0071c2] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#005fa3] transition-all shadow-sm active:scale-95 disabled:opacity-50 w-fit"
        >
          <FiRefreshCw className={loading ? "animate-spin" : ""} />
          Refresh Records
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Bookings</span>
            <div className="rounded-xl bg-blue-500/10 p-2.5 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
              <FiCalendar size={18} />
            </div>
          </div>
          <p className="mt-4 text-2xl font-black text-slate-900 dark:text-white">{bookings.length}</p>
          <p className="mt-1 text-xs font-medium text-emerald-600">Active reservation history</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Collected Revenue</span>
            <div className="rounded-xl bg-emerald-500/10 p-2.5 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">
              <FiDollarSign size={18} />
            </div>
          </div>
          <p className="mt-4 text-2xl font-black text-slate-900 dark:text-white">${totalRevenue.toLocaleString()}</p>
          <p className="mt-1 text-xs font-medium text-slate-500">From paid reservations</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Paid Reservations</span>
            <div className="rounded-xl bg-purple-500/10 p-2.5 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400">
              <FiCheckCircle size={18} />
            </div>
          </div>
          <p className="mt-4 text-2xl font-black text-slate-900 dark:text-white">{paidCount}</p>
          <p className="mt-1 text-xs font-medium text-emerald-600">Card & Mobile wallet transactions</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Pending Payments</span>
            <div className="rounded-xl bg-amber-500/10 p-2.5 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400">
              <FiClock size={18} />
            </div>
          </div>
          <p className="mt-4 text-2xl font-black text-slate-900 dark:text-white">{pendingCount}</p>
          <p className="mt-1 text-xs font-medium text-amber-600">Pay at Hotel cash guarantee</p>
        </div>
      </div>

      {/* Filter and Search controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm dark:bg-slate-900 dark:border-slate-800">
        <div className="flex items-center gap-1 overflow-x-auto p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          {["All", "Paid", "Pending", "Cancelled"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterTab(tab)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                filterTab === tab
                  ? "bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white"
                  : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
              }`}
            >
              {tab} Bookings
            </button>
          ))}
        </div>

        <div className="relative flex-1 max-w-md">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by Guest Name, Email, or Booking ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0071c2] dark:bg-slate-800 dark:border-slate-700 dark:text-white"
          />
        </div>
      </div>

      {/* Main Bookings & Payment Record Table */}
      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
        <div className="hidden overflow-x-auto sm:block">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-[12px] uppercase tracking-wider dark:border-slate-800 dark:bg-slate-800/40">
                <th className="px-6 py-4 font-bold text-slate-600 dark:text-slate-400">Reservation ID</th>
                <th className="px-6 py-4 font-bold text-slate-600 dark:text-slate-400">Guest Info</th>
                <th className="px-6 py-4 font-bold text-slate-600 dark:text-slate-400">Accommodation</th>
                <th className="px-6 py-4 font-bold text-slate-600 dark:text-slate-400">Stay Timeline</th>
                <th className="px-6 py-4 font-bold text-slate-600 dark:text-slate-400">Payment Record</th>
                <th className="px-6 py-4 font-bold text-slate-600 dark:text-slate-400">Booking Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-400">
                    <p className="text-base font-semibold">No bookings match your current filter criteria.</p>
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/75 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-mono font-bold text-[#0071c2] dark:text-blue-400">{b.id}</span>
                      <p className="text-[11px] text-slate-400 mt-0.5">Booked: {b.createdAt}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900 dark:text-white">{b.guestName}</div>
                      <div className="text-xs text-slate-500">{b.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-800 dark:text-slate-200">{b.room}</div>
                      <div className="text-xs text-slate-400">{b.hotel}</div>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-600 dark:text-slate-300">
                      <span className="font-semibold">In:</span> {b.checkIn} <br />
                      <span className="font-semibold">Out:</span> {b.checkOut}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-slate-900 dark:text-white">${b.totalPrice.toLocaleString()}</span>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold border ${
                            b.paymentStatus === "Paid" ? "bg-emerald-50 text-emerald-700 border-emerald-300/60 dark:bg-emerald-500/10 dark:text-emerald-400" :
                            b.paymentStatus === "Pending" ? "bg-amber-50 text-amber-700 border-amber-300/60 dark:bg-amber-500/10 dark:text-amber-400" :
                            "bg-purple-50 text-purple-700 border-purple-300/60 dark:bg-purple-500/10 dark:text-purple-400"
                          }`}>
                            {b.paymentStatus}
                          </span>
                        </div>
                        <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                          <FiCreditCard size={12} className="text-slate-400" />
                          {b.paymentMethod}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold ${
                        b.bookingStatus === "Confirmed" ? "bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-500/10 dark:text-blue-400" :
                        b.bookingStatus === "Cancelled" ? "bg-red-50 text-red-700 border border-red-200 dark:bg-red-500/10 dark:text-red-400" :
                        "bg-slate-100 text-slate-700 border border-slate-200"
                      }`}>
                        {b.bookingStatus}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards View */}
        <div className="divide-y divide-slate-100 sm:hidden dark:divide-slate-800">
          {filteredBookings.map((b) => (
            <div key={b.id} className="p-5 space-y-3.5">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-[#0071c2]">{b.id}</span>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mt-0.5">{b.guestName}</h3>
                  <p className="text-xs text-slate-500">{b.email}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  b.bookingStatus === "Confirmed" ? "bg-blue-50 text-blue-700 border border-blue-200" : "bg-red-50 text-red-700"
                }`}>
                  {b.bookingStatus}
                </span>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200">{b.room}</div>
                <div className="text-[11px] text-slate-400">{b.hotel}</div>
                <div className="mt-2 text-xs flex justify-between pt-2 border-t border-slate-200/60 dark:border-slate-700">
                  <span>In: <strong>{b.checkIn}</strong></span>
                  <span>Out: <strong>{b.checkOut}</strong></span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div>
                  <span className="text-base font-black text-slate-900 dark:text-white">${b.totalPrice.toLocaleString()}</span>
                  <div className="text-xs font-medium text-slate-400 flex items-center gap-1">
                    <FiCreditCard /> {b.paymentMethod}
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                  b.paymentStatus === "Paid" ? "bg-emerald-50 text-emerald-700 border-emerald-300" : "bg-amber-50 text-amber-700 border-amber-300"
                }`}>
                  {b.paymentStatus}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
