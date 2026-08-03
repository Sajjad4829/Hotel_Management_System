import React, { useState } from "react";
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiEye, FiX, FiCheck } from "react-icons/fi";
import { useRoomContext } from "../../../../Context/RoomContext";
import { usePropertyContext } from "../../../../Context/PropertyContext";

const STATUS_OPTIONS = ["All", "Available", "Booked", "Occupied", "Maintenance"];
const AMENITIES_LIST = ["WiFi", "AC", "TV", "Mini Bar", "Balcony", "Ocean View", "Room Service", "Coffee Maker"];
const BED_TYPES = ["King", "Queen", "Twin", "Double"];

const STATUS_STYLES = {
  Available: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Booked: "bg-amber-50 text-amber-700 ring-amber-600/20",
  Occupied: "bg-blue-50 text-blue-700 ring-blue-600/20",
  Maintenance: "bg-red-50 text-red-700 ring-red-600/20",
};

function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${STATUS_STYLES[status] || "bg-slate-50 text-slate-700 ring-slate-600/20"}`}>
      {status}
    </span>
  );
}

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        <div className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between shrink-0">
          <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition p-1">
            <FiX size={24} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto bg-slate-50">{children}</div>
      </div>
    </div>
  );
}

export default function RoomManagement() {
  const { rooms, categories, addRoom, updateRoom, deleteRoom } = useRoomContext();
  const { hotels } = usePropertyContext();
  
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Default to first active category, or fallback to 'Standard'
  const defaultCategory = categories.find(c => c.isActive)?.name || "Standard";

  const initialFormState = {
    propertyId: hotels.length > 0 ? hotels[0].id : "",
    roomNo: "",
    roomName: "",
    type: defaultCategory,
    floor: "",
    price: 100,
    status: "Available",
    shortDescription: "",
    thumbnailImage: "",
    galleryImages: "", // textarea string
    bedType: "King",
    roomSize: 300,
    maxAdults: 2,
    maxChildren: 0,
    amenities: [],
    isFeatured: false,
    displayOrder: 0,
    isActive: true
  };

  const [formData, setFormData] = useState(initialFormState);

  const filteredRooms = rooms.filter((room) => {
    const s = search.toLowerCase();
    const matchesSearch =
      room.roomNo?.toLowerCase().includes(s) ||
      room.roomName?.toLowerCase().includes(s) ||
      room.type?.toLowerCase().includes(s);
    const matchesStatus = statusFilter === "All" || room.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenAdd = () => {
    setFormData(initialFormState);
    setSelectedRoom(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (room) => {
    setFormData({ 
      ...room,
      amenities: room.amenities || [],
      galleryImages: Array.isArray(room.galleryImages) ? room.galleryImages.join(",\n") : (room.galleryImages || "")
    });
    setSelectedRoom(room);
    setIsFormModalOpen(true);
  };

  const handleOpenView = (room) => {
    setSelectedRoom(room);
    setIsViewModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this room? This action cannot be undone.")) {
      deleteRoom(id);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      galleryImages: formData.galleryImages ? formData.galleryImages.split(",").map(s => s.trim()).filter(Boolean) : []
    };
    if (selectedRoom) {
      updateRoom(selectedRoom.id, payload);
    } else {
      addRoom(payload);
    }
    setIsFormModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleAmenityToggle = (amenity) => {
    setFormData(prev => {
      const currentAmenities = prev.amenities || [];
      const isSelected = currentAmenities.includes(amenity);
      return {
        ...prev,
        amenities: isSelected 
          ? currentAmenities.filter(a => a !== amenity)
          : [...currentAmenities, amenity]
      };
    });
  };

  const getPropertyName = (propertyId) => {
    const property = hotels.find(loc => loc.id === propertyId);
    return property ? property.name : "Unknown Property";
  };

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Room Management</h1>
          <p className="mt-1 text-sm text-slate-500">View, search, and manage comprehensive room details.</p>
        </div>
        <button onClick={handleOpenAdd} className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-700 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-amber-800">
          <FiPlus className="h-4 w-4" /> Add Room
        </button>
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-xs">
          <FiSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search room no or name..." className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-700 focus:border-amber-700 focus:ring-1 focus:ring-amber-700 outline-none" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 focus:border-amber-700 focus:ring-1 focus:ring-amber-700 outline-none sm:w-48">
          {STATUS_OPTIONS.map((option) => (
            <option key={option} value={option}>{option === "All" ? "All Statuses" : option}</option>
          ))}
        </select>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                {["Property", "Room No", "Room Name", "Type", "Price", "Status", "Featured", "Actions"].map(
                  (col) => <th key={col} className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">{col}</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRooms.length > 0 ? (
                filteredRooms.map((room) => (
                  <tr key={room.id} className={`hover:bg-slate-50 ${!room.isActive ? 'opacity-50' : ''}`}>
                    <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-slate-900 truncate max-w-[150px]">{getPropertyName(room.propertyId)}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-900 font-mono">{room.roomNo}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-900 font-medium">{room.roomName || "-"}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600">{room.type}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600">${room.price}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm"><StatusBadge status={room.status} /></td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm">
                      {room.isFeatured ? <span className="text-amber-600 bg-amber-50 px-2 py-1 rounded text-xs font-bold">Featured</span> : "-"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm">
                      <div className="flex items-center gap-3">
                        <button onClick={() => handleOpenView(room)} className="text-slate-400 hover:text-slate-700"><FiEye className="h-4 w-4" /></button>
                        <button onClick={() => handleOpenEdit(room)} className="text-slate-400 hover:text-amber-700"><FiEdit2 className="h-4 w-4" /></button>
                        <button onClick={() => handleDelete(room.id)} className="text-slate-400 hover:text-red-600"><FiTrash2 className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={8} className="px-4 py-8 text-center text-sm text-slate-500">No rooms found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isFormModalOpen} onClose={() => setIsFormModalOpen(false)} title={selectedRoom ? "Edit Room Details" : "Add New Room"}>
        <form onSubmit={handleFormSubmit} className="space-y-6">
          
          {/* Section 1: Basic Details */}
          <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider">Basic Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-3">
                <label className="block text-xs font-medium text-slate-700 mb-1">Room Name</label>
                <input type="text" name="roomName" value={formData.roomName} onChange={handleChange} placeholder="e.g. Deluxe King Ocean View" required className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-amber-700 outline-none" />
              </div>
              <div className="lg:col-span-3">
                <label className="block text-xs font-medium text-slate-700 mb-1">Short Description</label>
                <textarea name="shortDescription" value={formData.shortDescription} onChange={handleChange} rows="2" className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-amber-700 outline-none"></textarea>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Hotel Property</label>
                <select name="propertyId" value={formData.propertyId} onChange={handleChange} required className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-amber-700 outline-none">
                  {hotels.map(loc => <option key={loc.id} value={loc.id}>{loc.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Room No</label>
                <input type="text" name="roomNo" value={formData.roomNo} onChange={handleChange} required className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-amber-700 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Type / Category</label>
                <select name="type" value={formData.type} onChange={handleChange} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-amber-700 outline-none">
                  {categories.filter(c => c.isActive).map(cat => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                  {/* Fallback if somehow a room has a deleted category */}
                  {!categories.some(c => c.name === formData.type && c.isActive) && formData.type && (
                    <option value={formData.type}>{formData.type} (Inactive)</option>
                  )}
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Specs & Pricing */}
          <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider">Specifications & Pricing</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Bed Type</label>
                <select name="bedType" value={formData.bedType} onChange={handleChange} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-amber-700 outline-none">
                  {BED_TYPES.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Room Size (sq ft)</label>
                <input type="number" name="roomSize" value={formData.roomSize} onChange={handleChange} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-amber-700 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Max Adults</label>
                <input type="number" name="maxAdults" value={formData.maxAdults} onChange={handleChange} min="1" className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-amber-700 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Max Children</label>
                <input type="number" name="maxChildren" value={formData.maxChildren} onChange={handleChange} min="0" className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-amber-700 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Floor</label>
                <input type="text" name="floor" value={formData.floor} onChange={handleChange} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-amber-700 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Price per Night ($)</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} step="0.01" min="0" className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-amber-700 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Status</label>
                <select name="status" value={formData.status} onChange={handleChange} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-amber-700 outline-none">
                  {STATUS_OPTIONS.filter(s => s !== 'All').map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Media */}
          <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider">Media</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Thumbnail Image URL</label>
                <input type="url" name="thumbnailImage" value={formData.thumbnailImage} onChange={handleChange} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-amber-700 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Gallery Images (Comma Separated URLs)</label>
                <textarea name="galleryImages" value={formData.galleryImages} onChange={handleChange} rows="3" placeholder="https://image1.jpg, https://image2.jpg" className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-amber-700 outline-none"></textarea>
              </div>
            </div>
          </div>

          {/* Section 4: Amenities (Multi-Select) */}
          <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {AMENITIES_LIST.map(amenity => {
                const isSelected = (formData.amenities || []).includes(amenity);
                return (
                <label key={amenity} className="flex items-center gap-2 cursor-pointer group">
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isSelected ? 'bg-amber-700 border-amber-700 text-white' : 'border-slate-300 group-hover:border-amber-700'}`}>
                    {isSelected && <FiCheck size={12} />}
                  </div>
                  <span className="text-sm text-slate-700 select-none">{amenity}</span>
                  <input type="checkbox" className="hidden" checked={isSelected} onChange={() => handleAmenityToggle(amenity)} />
                </label>
                );
              })}
            </div>
          </div>

          {/* Section 5: Settings */}
          <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider">Visibility Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <div className="relative">
                  <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="sr-only" />
                  <div className={`block w-10 h-6 rounded-full transition-colors ${formData.isFeatured ? 'bg-amber-700' : 'bg-slate-300'}`}></div>
                  <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${formData.isFeatured ? 'transform translate-x-4' : ''}`}></div>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-slate-900">Featured Room</p>
                  <p className="text-xs text-slate-500">Show on homepage</p>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <div className="relative">
                  <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} className="sr-only" />
                  <div className={`block w-10 h-6 rounded-full transition-colors ${formData.isActive ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                  <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${formData.isActive ? 'transform translate-x-4' : ''}`}></div>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-slate-900">Active Status</p>
                  <p className="text-xs text-slate-500">Visible to customers</p>
                </div>
              </label>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Display Order</label>
                <input type="number" name="displayOrder" value={formData.displayOrder} onChange={handleChange} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-amber-700 outline-none" />
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 bg-white border-t border-slate-200 pt-4 pb-2 flex justify-end gap-3 z-10">
            <button type="button" onClick={() => setIsFormModalOpen(false)} className="px-5 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition">Cancel</button>
            <button type="submit" className="px-6 py-2.5 bg-amber-700 text-white rounded-lg text-sm font-medium hover:bg-amber-800 transition shadow-sm">
              {selectedRoom ? "Save All Changes" : "Create Room"}
            </button>
          </div>
        </form>
      </Modal>

      {/* View Modal */}
      <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} title="Room Overview">
        {selectedRoom && (
          <div className="space-y-6">
            {selectedRoom.thumbnailImage && (
              <div className="w-full h-48 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                <img src={selectedRoom.thumbnailImage} alt={selectedRoom.roomName} className="w-full h-full object-cover" />
              </div>
            )}
            
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900" style={{fontFamily: "Georgia, serif"}}>{selectedRoom.roomName}</h3>
                  <p className="text-amber-700 font-medium">{getPropertyName(selectedRoom.propertyId)}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-light text-slate-900">${selectedRoom.price}<span className="text-sm text-slate-500">/night</span></p>
                  <StatusBadge status={selectedRoom.status} />
                </div>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">{selectedRoom.shortDescription}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-100">
              <div><p className="text-xs text-slate-500 mb-1">Room No</p><p className="font-semibold text-slate-900">{selectedRoom.roomNo}</p></div>
              <div><p className="text-xs text-slate-500 mb-1">Bed Type</p><p className="font-semibold text-slate-900">{selectedRoom.bedType}</p></div>
              <div><p className="text-xs text-slate-500 mb-1">Size</p><p className="font-semibold text-slate-900">{selectedRoom.roomSize} sq ft</p></div>
              <div><p className="text-xs text-slate-500 mb-1">Max Guests</p><p className="font-semibold text-slate-900">{selectedRoom.maxAdults} Adults, {selectedRoom.maxChildren} Children</p></div>
            </div>

            {selectedRoom.amenities && selectedRoom.amenities.length > 0 && (
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Amenities</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedRoom.amenities.map(am => (
                    <span key={am} className="px-3 py-1 bg-white border border-slate-200 text-slate-700 text-xs rounded-full shadow-sm">{am}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
              <button onClick={() => { setIsViewModalOpen(false); handleOpenEdit(selectedRoom); }} className="px-6 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition shadow-sm flex items-center gap-2">
                <FiEdit2 className="w-4 h-4" /> Edit Room
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
