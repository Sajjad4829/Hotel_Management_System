import React, { useState } from "react";
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiX, FiImage, FiUpload } from "react-icons/fi";
import { usePropertyContext } from "../../../../Context/PropertyContext";

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        <div className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between shrink-0">
          <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition p-1">
            <FiX size={24} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto bg-slate-50 custom-scrollbar">{children}</div>
      </div>
    </div>
  );
}

export default function Destinations() {
  const { destinations, addDestination, updateDestination, deleteDestination } = usePropertyContext();
  
  const [search, setSearch] = useState("");
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);

  const initialFormState = {
    name: "",
    image: "",
    description: "",
    displayOrder: 0,
    isActive: true,
    gallery: [],
    quickFacts: {
      bestTime: "",
      weather: "",
      language: "",
      currency: ""
    }
  };

  const [formData, setFormData] = useState(initialFormState);

  // Sort destinations by displayOrder
  const sortedDestinations = [...destinations].sort((a, b) => a.displayOrder - b.displayOrder);

  const filteredDestinations = sortedDestinations.filter((dest) => {
    const s = search.toLowerCase();
    return (
      dest.name?.toLowerCase().includes(s) ||
      dest.description?.toLowerCase().includes(s)
    );
  });

  const handleOpenAdd = () => {
    setFormData(initialFormState);
    setSelectedDestination(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (dest) => {
    setFormData({
      ...initialFormState,
      ...dest,
      gallery: dest.gallery || [],
      quickFacts: { ...initialFormState.quickFacts, ...(dest.quickFacts || {}) }
    });
    setSelectedDestination(dest);
    setIsFormModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this destination? This action cannot be undone.")) {
      deleteDestination(id);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (selectedDestination) {
      updateDestination(selectedDestination.id, formData);
    } else {
      addDestination(formData);
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

  const handleQuickFactChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      quickFacts: {
        ...prev.quickFacts,
        [name]: value
      }
    }));
  };

  const handleCoverUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryFileUpload = (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          gallery: [...prev.gallery, reader.result]
        }));
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    });
  };

  const handleRemoveGalleryImage = (index) => {
    setFormData(prev => {
      const newGallery = prev.gallery.filter((_, i) => i !== index);
      return { ...prev, gallery: newGallery };
    });
  };

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-6 pb-0">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Destinations</h1>
          <p className="mt-1 text-sm text-slate-500">Manage locations and regions where properties are located.</p>
        </div>
        <button onClick={handleOpenAdd} className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-700 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-amber-800">
          <FiPlus className="h-4 w-4" /> Add Destination
        </button>
      </div>

      <div className="px-6 mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-xs">
          <FiSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search destinations..." className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-700 focus:border-amber-700 focus:ring-1 focus:ring-amber-700 outline-none" />
        </div>
      </div>

      <div className="px-6 pb-6">
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  {["Order", "Cover", "Destination Name", "Description", "Status", "Actions"].map(
                    (col) => <th key={col} className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">{col}</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredDestinations.length > 0 ? (
                  filteredDestinations.map((dest) => (
                    <tr key={dest.id} className={`hover:bg-slate-50 ${!dest.isActive ? 'opacity-50' : ''}`}>
                      <td className="whitespace-nowrap px-4 py-3 text-sm font-mono text-slate-500">{dest.displayOrder}</td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <div className="h-10 w-16 rounded overflow-hidden bg-slate-100 flex items-center justify-center border border-slate-200">
                          {dest.image ? (
                            <img src={dest.image} alt={dest.name} className="h-full w-full object-cover" />
                          ) : (
                            <FiImage className="text-slate-400" />
                          )}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-slate-900">{dest.name}</td>
                      <td className="px-4 py-3 text-sm text-slate-600 truncate max-w-xs">{dest.description || "-"}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm">
                        {dest.isActive 
                          ? <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">Active</span>
                          : <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-500/20">Inactive</span>
                        }
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm">
                        <div className="flex items-center gap-3">
                          <button onClick={() => handleOpenEdit(dest)} className="text-slate-400 hover:text-amber-700"><FiEdit2 className="h-4 w-4" /></button>
                          <button onClick={() => handleDelete(dest.id)} className="text-slate-400 hover:text-red-600"><FiTrash2 className="h-4 w-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan={6} className="px-4 py-8 text-center text-sm text-slate-500">No destinations found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal isOpen={isFormModalOpen} onClose={() => setIsFormModalOpen(false)} title={selectedDestination ? "Edit Destination" : "Add New Destination"}>
        <form onSubmit={handleFormSubmit} className="space-y-6">
          
          <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200 space-y-4">
            <h3 className="font-semibold text-slate-800 border-b border-slate-100 pb-2">Basic Info</h3>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Destination Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="e.g. Dhaka" className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-amber-700 outline-none" />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Cover Image</label>
              <div className="flex gap-2">
                <input type="url" name="image" value={formData.image} onChange={handleChange} placeholder="Image URL or upload file..." className="flex-1 rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-amber-700 outline-none" />
                <div>
                  <input type="file" accept="image/*" id="cover-upload" className="hidden" onChange={handleCoverUpload} />
                  <label htmlFor="cover-upload" className="flex items-center justify-center px-3 py-2 bg-slate-100 border border-slate-200 rounded-md text-slate-600 cursor-pointer hover:bg-slate-200 transition text-sm">
                    <FiUpload />
                  </label>
                </div>
              </div>
              {formData.image && (
                <div className="mt-2 h-32 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => e.target.style.display='none'} />
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-amber-700 outline-none"></textarea>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Display Order</label>
                <input type="number" name="displayOrder" value={formData.displayOrder} onChange={handleChange} required className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-amber-700 outline-none" />
              </div>
              
              <div className="flex items-end pb-2">
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
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200 space-y-4">
            <h3 className="font-semibold text-slate-800 border-b border-slate-100 pb-2">Quick Facts</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Best Time to Visit</label>
                <input type="text" name="bestTime" value={formData.quickFacts.bestTime} onChange={handleQuickFactChange} placeholder="e.g. Sept to Mar" className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-amber-700 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Avg. Temperature</label>
                <input type="text" name="weather" value={formData.quickFacts.weather} onChange={handleQuickFactChange} placeholder="e.g. 25°C" className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-amber-700 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Primary Language</label>
                <input type="text" name="language" value={formData.quickFacts.language} onChange={handleQuickFactChange} placeholder="e.g. Bengali, English" className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-amber-700 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Currency</label>
                <input type="text" name="currency" value={formData.quickFacts.currency} onChange={handleQuickFactChange} placeholder="e.g. BDT" className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-amber-700 outline-none" />
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-semibold text-slate-800">Gallery Images (Upload)</h3>
              <div>
                <input type="file" accept="image/*" multiple id="gallery-upload" className="hidden" onChange={handleGalleryFileUpload} />
                <label htmlFor="gallery-upload" className="text-amber-700 text-xs font-medium hover:underline flex items-center gap-1 cursor-pointer">
                  <FiUpload /> Upload Images
                </label>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              {formData.gallery.map((imgUrl, idx) => (
                <div key={idx} className="relative group rounded border border-slate-200 overflow-hidden h-24">
                  <img src={imgUrl} alt="" className="w-full h-full object-cover bg-slate-100" onError={(e) => e.target.style.display='none'} />
                  <button type="button" onClick={() => handleRemoveGalleryImage(idx)} className="absolute top-1 right-1 bg-red-500/90 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition shadow-sm hover:bg-red-600">
                    <FiTrash2 size={14} />
                  </button>
                </div>
              ))}
              {formData.gallery.length === 0 && (
                <div className="col-span-3 text-xs text-slate-500 italic text-center py-6 border-2 border-dashed border-slate-200 rounded-lg">
                  No gallery images uploaded. Click "Upload Images" to browse your device.
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 sticky bottom-0 bg-slate-50 p-4 border-t border-slate-200 -mx-6 -mb-6 mt-6">
            <button type="button" onClick={() => setIsFormModalOpen(false)} className="px-5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition">Cancel</button>
            <button type="submit" className="px-6 py-2.5 bg-amber-700 text-white rounded-lg text-sm font-medium hover:bg-amber-800 transition shadow-sm">
              {selectedDestination ? "Save Changes" : "Create Destination"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
