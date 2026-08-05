import React, { useState, useEffect } from "react";
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiX, FiCheck, FiFilter, FiAlertCircle, FiLoader } from "react-icons/fi";
import api from "../../../../services/api";

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md transition-opacity animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-100">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white px-6 py-5 flex items-center justify-between shrink-0">
          <h2 className="text-lg font-semibold tracking-wide flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#C9A24B]"></span>
            {title}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition p-1 rounded-lg hover:bg-slate-700/50">
            <FiX size={22} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto bg-slate-50">{children}</div>
      </div>
    </div>
  );
}

export default function Amenities() {
  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAmenity, setSelectedAmenity] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);

  const initialFormState = {
    name: "",
    type: "hotel",
    icon: "FiCheck",
    description: "",
    isActive: true,
  };
  const [formData, setFormData] = useState(initialFormState);

  // Fetch live amenities from Express / MongoDB backend
  const fetchAmenities = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/amenities");
      if (res.data && res.data.data) {
        setAmenities(res.data.data);
      }
    } catch (err) {
      console.error("Failed to load amenities:", err);
      setError(err.response?.data?.message || "Error communicating with backend database.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAmenities();
  }, []);

  const showToast = (message, isError = false) => {
    setNotification({ message, isError });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleOpenAdd = () => {
    setFormData(initialFormState);
    setSelectedAmenity(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setFormData({
      name: item.name || "",
      type: item.type || "hotel",
      icon: item.icon || "FiCheck",
      description: item.description || "",
      isActive: item.isActive !== undefined ? item.isActive : true,
    });
    setSelectedAmenity(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you certain you wish to remove "${name}" from the facility catalog?`)) {
      try {
        await api.delete(`/amenities/${id}`);
        showToast("Amenity deleted successfully.");
        setAmenities((prev) => prev.filter((item) => item._id !== id));
      } catch (err) {
        showToast(err.response?.data?.message || "Failed to delete amenity.", true);
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (selectedAmenity) {
        const res = await api.put(`/amenities/${selectedAmenity._id}`, formData);
        showToast("Amenity successfully updated.");
        setAmenities((prev) =>
          prev.map((item) => (item._id === selectedAmenity._id ? res.data.data : item))
        );
      } else {
        const res = await api.post("/amenities", formData);
        showToast("New amenity added to database inventory.");
        setAmenities((prev) => [res.data.data, ...prev]);
      }
      setIsModalOpen(false);
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to save amenity.", true);
    } finally {
      setSubmitting(false);
    }
  };

  // Filter & Search logic
  const filteredAmenities = amenities.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(search.toLowerCase()));
    const matchesType = typeFilter === "all" ? true : item.type === typeFilter || item.type === "both";
    return matchesSearch && matchesType;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAmenities.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAmenities.length / itemsPerPage) || 1;

  return (
    <div className="space-y-6">
      {/* Toast Banner */}
      {notification && (
        <div
          className={`fixed top-5 right-5 z-50 px-6 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 transition-all transform animate-bounce ${
            notification.isError ? "bg-rose-600 text-white" : "bg-emerald-600 text-white"
          }`}
        >
          <FiAlertCircle size={20} />
          <span className="font-medium text-sm">{notification.message}</span>
        </div>
      )}

      {/* Page Title & Add Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Amenities & Facilities</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage global property amenities and individual room comfort specifications.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 bg-[#C9A24B] hover:bg-[#b8923b] text-slate-900 font-semibold px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all transform active:scale-95"
        >
          <FiPlus size={18} />
          <span>Add New Amenity</span>
        </button>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
        <div className="relative w-full sm:w-80">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search by amenity name or description..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A24B] focus:bg-white transition"
          />
        </div>
        
        {/* Type Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl w-full sm:w-auto overflow-x-auto">
          {["all", "hotel", "room"].map((type) => (
            <button
              key={type}
              onClick={() => {
                setTypeFilter(type);
                setCurrentPage(1);
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition-all ${
                typeFilter === type
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
              }`}
            >
              {type === "all" ? "All Catalog" : `${type} Amenities`}
            </button>
          ))}
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl text-rose-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FiAlertCircle size={22} className="shrink-0 text-rose-500" />
            <p className="text-sm font-medium">{error}</p>
          </div>
          <button
            onClick={fetchAmenities}
            className="text-xs font-bold underline text-rose-700 hover:text-rose-900"
          >
            Retry Connection
          </button>
        </div>
      )}

      {/* Data Table View */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 flex flex-col items-center justify-center gap-3 text-slate-400">
            <FiLoader size={36} className="animate-spin text-[#C9A24B]" />
            <p className="text-sm font-medium">Synchronizing inventory with MongoDB Atlas...</p>
          </div>
        ) : currentItems.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <p className="text-base font-medium">No amenities found matching your current filter criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200/80">
                  <th className="py-4 px-6">Amenity Name</th>
                  <th className="py-4 px-6">Category Type</th>
                  <th className="py-4 px-6">Icon Key</th>
                  <th className="py-4 px-6">Description</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                {currentItems.map((item) => (
                  <tr key={item._id || item.name} className="hover:bg-slate-50/60 transition-colors group">
                    <td className="py-4 px-6 font-semibold text-slate-900 flex items-center gap-2">
                      <span className="p-2 bg-amber-50 rounded-lg text-[#C9A24B] font-mono text-xs">★</span>
                      {item.name}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                          item.type === "hotel"
                            ? "bg-blue-50 text-blue-700 border border-blue-200/60"
                            : item.type === "room"
                            ? "bg-purple-50 text-purple-700 border border-purple-200/60"
                            : "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                        }`}
                      >
                        {item.type}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-mono text-xs text-slate-500">{item.icon || "FiCheck"}</td>
                    <td className="py-4 px-6 max-w-xs truncate text-slate-500">{item.description}</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50/80 px-2 py-1 rounded-md border border-emerald-200">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        Active
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        title="Edit Amenity"
                        className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition"
                      >
                        <FiEdit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id, item.name)}
                        title="Delete Amenity"
                        className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination bar */}
        {!loading && filteredAmenities.length > 0 && (
          <div className="py-4 px-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 bg-slate-50/40">
            <span>
              Showing <strong className="text-slate-800">{indexOfFirstItem + 1}</strong> -{" "}
              <strong className="text-slate-800">{Math.min(indexOfLastItem, filteredAmenities.length)}</strong> of{" "}
              <strong className="text-slate-800">{filteredAmenities.length}</strong> amenities
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 border border-slate-200 rounded-lg bg-white font-medium disabled:opacity-40 hover:bg-slate-100 transition"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 border border-slate-200 rounded-lg bg-white font-medium disabled:opacity-40 hover:bg-slate-100 transition"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedAmenity ? "Edit Amenity Record" : "Register New Amenity"}
      >
        <form onSubmit={handleFormSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Amenity Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Infinity Pool, Private Beach, AC..."
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#C9A24B] focus:outline-none bg-white transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Target Type *
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#C9A24B] focus:outline-none bg-white font-medium text-slate-700 transition"
              >
                <option value="hotel">Hotel Amenity (Pool, Restaurant, Spa)</option>
                <option value="room">Room Amenity (AC, TV, Balcony, Mini Bar)</option>
                <option value="both">Both Property & Room (WiFi, Safe)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Icon Key Identifier (React Icons)
            </label>
            <input
              type="text"
              placeholder="e.g. FiWifi, FiCoffee, FiWind, FiSun"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl font-mono focus:ring-2 focus:ring-[#C9A24B] focus:outline-none bg-white transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Detailed Description
            </label>
            <textarea
              rows={3}
              placeholder="Provide a compelling brief summary of this luxury facility..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#C9A24B] focus:outline-none bg-white transition"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 bg-[#C9A24B] hover:bg-[#b8923b] disabled:opacity-50 text-slate-900 font-semibold px-6 py-2.5 rounded-xl shadow-md transition"
            >
              {submitting && <FiLoader className="animate-spin" size={16} />}
              <span>{selectedAmenity ? "Save Changes" : "Register Amenity"}</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
