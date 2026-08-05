import React, { useState } from "react";
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiX, FiImage, FiMapPin, FiUpload, FiLoader } from "react-icons/fi";
import { usePropertyContext } from "../../../../Context/PropertyContext";
import api from "../../../../services/api";

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
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

export default function Hotels() {
  const { hotels, destinations, addHotel, updateHotel, deleteHotel, loadingHotels } = usePropertyContext();
  
  const [search, setSearch] = useState("");
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [submittingForm, setSubmittingForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const initialFormState = {
    destinationId: "",
    name: "",
    category: "",
    rating: "",
    originalPrice: "",
    price: "",
    address: "",
    description: "",
    amenities: "",
    gallery: "",
    image: "",
    distanceFromCenter: "",
    reviewCount: "",
    tag: "",
    tagColor: "#2C4A6E",
    breakfast: false,
    freeCancellation: false,
    payAtProperty: false,
    isActive: true
  };

  const [formData, setFormData] = useState(initialFormState);

  const filteredHotels = hotels.filter((hotel) => {
    const s = search.toLowerCase();
    return (
      hotel.name?.toLowerCase().includes(s) ||
      hotel.address?.toLowerCase().includes(s)
    );
  });

  const handleOpenAdd = () => {
    setFormData(initialFormState);
    setSelectedHotel(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (hotel) => {
    setFormData({
      ...hotel,
      amenities: hotel.amenities ? hotel.amenities.join(", ") : "",
      gallery: hotel.gallery ? hotel.gallery.join(", ") : "",
      distanceFromCenter: hotel.distanceFromCenter || "",
      reviewCount: hotel.reviewCount || "",
      tag: hotel.tag || "",
      tagColor: hotel.tagColor || "#2C4A6E",
      breakfast: hotel.breakfast || false,
      freeCancellation: hotel.freeCancellation || false,
      payAtProperty: hotel.payAtProperty || false,
    });
    setSelectedHotel(hotel);
    setIsFormModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this hotel? This action cannot be undone.")) {
      deleteHotel(id);
    }
  };

  const handleImageUpload = async (e, isGallery = false) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingImage(true);
    const formPayload = new FormData();
    formPayload.append("image", file);
    formPayload.append("folder", "hotel_properties");
    try {
      const res = await api.post("/upload", formPayload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const uploadedUrl = res.data.data.url;
      if (isGallery) {
        setFormData((prev) => ({
          ...prev,
          gallery: prev.gallery ? `${prev.gallery}, ${uploadedUrl}` : uploadedUrl,
        }));
      } else {
        setFormData((prev) => ({ ...prev, image: uploadedUrl }));
      }
    } catch (err) {
      alert(err.response?.data?.message || "Image upload failed. Ensure you are signed in as Admin.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmittingForm(true);
    try {
      // Process comma separated lists and numbers
      const processedData = {
        ...formData,
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null,
        price: formData.price ? Number(formData.price) : null,
        reviewCount: formData.reviewCount ? Number(formData.reviewCount) : 0,
        amenities: formData.amenities ? formData.amenities.split(",").map(a => a.trim()).filter(a => a) : [],
        gallery: formData.gallery ? formData.gallery.split(",").map(g => g.trim()).filter(g => g) : [],
      };

      if (selectedHotel) {
        await updateHotel(selectedHotel.id || selectedHotel._id, processedData);
      } else {
        await addHotel(processedData);
      }
      setIsFormModalOpen(false);
    } catch (error) {
      alert("Failed to preserve hotel property changes: " + (error.response?.data?.message || error.message));
    } finally {
      setSubmittingForm(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentHotels = filteredHotels.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredHotels.length / itemsPerPage) || 1;

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-6 pb-0">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Hotels</h1>
          <p className="mt-1 text-sm text-slate-500">Manage your property portfolio across all destinations.</p>
        </div>
        <button onClick={handleOpenAdd} className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-700 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-amber-800">
          <FiPlus className="h-4 w-4" /> Add Hotel
        </button>
      </div>

      <div className="px-6 mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-xs">
          <FiSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search hotels by name or location..." className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-700 focus:border-amber-700 focus:ring-1 focus:ring-amber-700 outline-none" />
        </div>
      </div>

      <div className="px-6 pb-6">
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  {["Hotel", "Destination", "Category", "Rating", "Status", "Actions"].map(
                    (col) => <th key={col} className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">{col}</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loadingHotels ? (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-slate-400 font-medium">
                      <FiLoader size={24} className="animate-spin mx-auto mb-2 text-amber-700" />
                      Synchronizing property portfolio with backend...
                    </td>
                  </tr>
                ) : currentHotels.length > 0 ? (
                  currentHotels.map((hotel) => {
                    const destination = destinations.find(d => d.id === hotel.destinationId || d.id === hotel.destination || d._id === hotel.destination);
                    return (
                      <tr key={hotel.id} className={`hover:bg-slate-50 ${!hotel.isActive ? 'opacity-50' : ''}`}>
                        <td className="whitespace-nowrap px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded overflow-hidden bg-slate-100 flex items-center justify-center border border-slate-200 shrink-0">
                              {hotel.image ? (
                                <img src={hotel.image} alt={hotel.name} className="h-full w-full object-cover" />
                              ) : (
                                <FiImage className="text-slate-400" />
                              )}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-slate-900">{hotel.name}</div>
                              <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5"><FiMapPin size={10} /> {hotel.address || "-"}</div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-[#2C4A6E]">
                          {destination ? destination.name : <span className="text-rose-500 text-xs">Unassigned</span>}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600">{hotel.category || "-"}</td>
                        <td className="whitespace-nowrap px-4 py-3 text-sm font-mono text-amber-600 font-medium">{hotel.rating || "-"}</td>
                        <td className="whitespace-nowrap px-4 py-3 text-sm">
                          {hotel.isActive 
                            ? <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">Active</span>
                            : <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-500/20">Inactive</span>
                          }
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-sm">
                          <div className="flex items-center gap-3">
                            <button onClick={() => handleOpenEdit(hotel)} className="text-slate-400 hover:text-amber-700"><FiEdit2 className="h-4 w-4" /></button>
                            <button onClick={() => handleDelete(hotel.id)} className="text-slate-400 hover:text-red-600"><FiTrash2 className="h-4 w-4" /></button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr><td colSpan={6} className="px-4 py-8 text-center text-sm text-slate-500">No hotels found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal isOpen={isFormModalOpen} onClose={() => setIsFormModalOpen(false)} title={selectedHotel ? "Edit Hotel" : "Add New Hotel"}>
        <form onSubmit={handleFormSubmit} className="space-y-4 bg-white p-5 rounded-lg shadow-sm border border-slate-200">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-700 mb-1">Hotel Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="e.g. Aurum Hotel Dhaka" className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-amber-700 outline-none" />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Select Destination</label>
              <select name="destinationId" value={formData.destinationId} onChange={handleChange} required className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-amber-700 outline-none bg-white">
                <option value="" disabled>Select a destination...</option>
                {destinations.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Category</label>
              <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="e.g. 5 Star Luxury" className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-amber-700 outline-none" />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Main Price ($) (Original)</label>
              <input type="number" name="originalPrice" value={formData.originalPrice || ""} onChange={handleChange} placeholder="e.g. 200" className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-amber-700 outline-none" />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Discount Price ($) (Final)</label>
              <input type="number" name="price" value={formData.price || ""} onChange={handleChange} required placeholder="e.g. 150" className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-amber-700 outline-none" />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Rating</label>
              <input type="text" name="rating" value={formData.rating} onChange={handleChange} placeholder="e.g. 4.9/5" className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-amber-700 outline-none" />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Address</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Full address" className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-amber-700 outline-none" />
            </div>
            
            <div className="sm:col-span-2">
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-medium text-slate-700">Cover Image URL</label>
                <label className="cursor-pointer text-xs text-amber-700 hover:text-amber-800 font-semibold flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {uploadingImage ? <FiLoader className="animate-spin" size={12} /> : <FiUpload size={12} />}
                  <span>Upload via Cloudinary</span>
                  <input type="file" accept="image/*" className="hidden" disabled={uploadingImage} onChange={(e) => handleImageUpload(e, false)} />
                </label>
              </div>
              <input type="url" name="image" value={formData.image} onChange={handleChange} placeholder="https://..." className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-amber-700 outline-none" />
              {formData.image && <img src={formData.image} alt="Preview" className="h-20 w-32 object-cover rounded mt-2 border" />}
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-700 mb-1">Amenities (Comma separated)</label>
              <input type="text" name="amenities" value={formData.amenities} onChange={handleChange} placeholder="e.g. Free WiFi, Infinity Pool, Spa" className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-amber-700 outline-none" />
            </div>

            <div className="sm:col-span-2">
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-medium text-slate-700">Gallery Image URLs (Comma separated)</label>
                <label className="cursor-pointer text-xs text-amber-700 hover:text-amber-800 font-semibold flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {uploadingImage ? <FiLoader className="animate-spin" size={12} /> : <FiUpload size={12} />}
                  <span>Append Cloudinary Image</span>
                  <input type="file" accept="image/*" className="hidden" disabled={uploadingImage} onChange={(e) => handleImageUpload(e, true)} />
                </label>
              </div>
              <textarea name="gallery" value={formData.gallery} onChange={handleChange} rows="2" placeholder="https://image1.jpg, https://image2.jpg" className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-amber-700 outline-none"></textarea>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-700 mb-1">Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-amber-700 outline-none"></textarea>
            </div>

            {/* New CMS Fields */}
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Distance from City Centre</label>
              <input type="text" name="distanceFromCenter" value={formData.distanceFromCenter} onChange={handleChange} placeholder="e.g. 2.5 km from center" className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-amber-700 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Total Review Count</label>
              <input type="number" name="reviewCount" value={formData.reviewCount} onChange={handleChange} placeholder="e.g. 120" className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-amber-700 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Offer Badge (Optional)</label>
              <input type="text" name="tag" value={formData.tag} onChange={handleChange} placeholder="e.g. Limited Time Offer" className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-amber-700 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Badge Color</label>
              <input type="color" name="tagColor" value={formData.tagColor} onChange={handleChange} className="w-full h-9 rounded-md border border-slate-200 px-1 py-1 cursor-pointer focus:border-amber-700 outline-none" />
            </div>

            <div className="sm:col-span-2 mt-2 border-t border-slate-100 pt-3">
              <span className="block text-xs font-semibold text-slate-700 mb-3 uppercase tracking-wider">Features & Options</span>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="breakfast" checked={formData.breakfast} onChange={handleChange} className="w-4 h-4 text-amber-700 rounded border-slate-300 focus:ring-amber-700" />
                  <span className="text-sm text-slate-700">Breakfast Included</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="freeCancellation" checked={formData.freeCancellation} onChange={handleChange} className="w-4 h-4 text-amber-700 rounded border-slate-300 focus:ring-amber-700" />
                  <span className="text-sm text-slate-700">Free Cancellation</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="payAtProperty" checked={formData.payAtProperty} onChange={handleChange} className="w-4 h-4 text-amber-700 rounded border-slate-300 focus:ring-amber-700" />
                  <span className="text-sm text-slate-700">Pay at Property</span>
                </label>
              </div>
            </div>

            <div className="sm:col-span-2 flex justify-between items-center mt-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <div className="relative">
                  <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} className="sr-only" />
                  <div className={`block w-10 h-6 rounded-full transition-colors ${formData.isActive ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                  <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${formData.isActive ? 'transform translate-x-4' : ''}`}></div>
                </div>
                <span className="text-sm font-medium text-slate-900">Active Status</span>
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3 mt-6">
            <button type="button" onClick={() => setIsFormModalOpen(false)} className="px-5 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition">Cancel</button>
            <button type="submit" disabled={submittingForm || uploadingImage} className="inline-flex items-center gap-2 px-6 py-2.5 bg-amber-700 text-white rounded-lg text-sm font-medium hover:bg-amber-800 disabled:opacity-50 transition shadow-sm">
              {submittingForm && <FiLoader className="animate-spin" size={14} />}
              <span>{selectedHotel ? "Save Changes" : "Create Hotel"}</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* Pagination controls */}
      {!loadingHotels && filteredHotels.length > itemsPerPage && (
        <div className="mx-6 mb-6 py-3 px-4 border border-slate-200 rounded-xl flex items-center justify-between text-xs text-slate-600 bg-white shadow-sm">
          <span>Showing <strong>{indexOfFirstItem + 1}</strong> to <strong>{Math.min(indexOfLastItem, filteredHotels.length)}</strong> of <strong>{filteredHotels.length}</strong> hotels</span>
          <div className="flex gap-2">
            <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className="px-3 py-1.5 rounded border border-slate-200 bg-slate-50 font-medium hover:bg-slate-100 disabled:opacity-40">Previous</button>
            <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="px-3 py-1.5 rounded border border-slate-200 bg-slate-50 font-medium hover:bg-slate-100 disabled:opacity-40">Next</button>
          </div>
        </div>
      )}
    </>
  );
}
