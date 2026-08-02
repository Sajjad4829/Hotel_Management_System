import { useState } from "react";

import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiEye } from "react-icons/fi";


// Dummy data — no API, no backend calls.
const ROOMS = [
  { id: 1, roomNo: "101", type: "Standard", floor: "1", capacity: 2, price: "$80", status: "Available" },
  { id: 2, roomNo: "102", type: "Standard", floor: "1", capacity: 2, price: "$80", status: "Booked" },
  { id: 3, roomNo: "201", type: "Deluxe", floor: "2", capacity: 3, price: "$120", status: "Available" },
  { id: 4, roomNo: "202", type: "Deluxe", floor: "2", capacity: 3, price: "$120", status: "Occupied" },
  { id: 5, roomNo: "301", type: "Suite", floor: "3", capacity: 4, price: "$220", status: "Maintenance" },
  { id: 6, roomNo: "302", type: "Suite", floor: "3", capacity: 4, price: "$220", status: "Available" },
  { id: 7, roomNo: "401", type: "Deluxe", floor: "4", capacity: 3, price: "$130", status: "Booked" },
  { id: 8, roomNo: "402", type: "Standard", floor: "4", capacity: 2, price: "$85", status: "Available" },
];

const STATUS_OPTIONS = ["All", "Available", "Booked", "Occupied", "Maintenance"];

const STATUS_STYLES = {
  Available: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Booked: "bg-amber-50 text-amber-700 ring-amber-600/20",
  Occupied: "bg-blue-50 text-blue-700 ring-blue-600/20",
  Maintenance: "bg-red-50 text-red-700 ring-red-600/20",
};

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${
        STATUS_STYLES[status] || "bg-slate-50 text-slate-700 ring-slate-600/20"
      }`}
    >
      {status}
    </span>
  );
}

export default function RoomManagement() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredRooms = ROOMS.filter((room) => {
    const matchesSearch =
      room.roomNo.toLowerCase().includes(search.toLowerCase()) ||
      room.type.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || room.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <>
    {/* Page header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Room Management</h1>
          <p className="mt-1 text-sm text-slate-500">
            View, search, and manage all rooms in your property.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800"
        >
          <FiPlus className="h-4 w-4" />
          Add Room
        </button>
      </div>

      {/* Search + Filter bar */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-xs">
          <FiSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by room no or type..."
            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400 sm:w-48"
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option === "All" ? "All Statuses" : option}
            </option>
          ))}
        </select>
      </div>

      {/* Room Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                {["Room No", "Type", "Floor", "Capacity", "Price", "Status", "Actions"].map(
                  (col) => (
                    <th
                      key={col}
                      className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                    >
                      {col}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRooms.length > 0 ? (
                filteredRooms.map((room) => (
                  <tr key={room.id} className="hover:bg-slate-50">
                    <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-slate-900">
                      {room.roomNo}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600">
                      {room.type}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600">
                      {room.floor}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600">
                      {room.capacity}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600">
                      {room.price}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm">
                      <StatusBadge status={room.status} />
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          title="View"
                          className="text-slate-400 transition hover:text-slate-700"
                        >
                          <FiEye className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          title="Edit"
                          className="text-slate-400 transition hover:text-blue-600"
                        >
                          <FiEdit2 className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          title="Delete"
                          className="text-slate-400 transition hover:text-red-600"
                        >
                          <FiTrash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-sm text-slate-500">
                    No rooms match your search or filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    
    </>
  );
}

