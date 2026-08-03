import React, { useState } from "react";
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiX } from "react-icons/fi";
import { useRoomContext } from "../../../../Context/RoomContext";

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden">
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

export default function RoomCategories() {
  const { categories, addCategory, updateCategory, deleteCategory } = useRoomContext();
  
  const [search, setSearch] = useState("");
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const initialFormState = {
    name: "",
    code: "",
    description: "",
    displayOrder: 0,
    isActive: true
  };

  const [formData, setFormData] = useState(initialFormState);

  // Sort categories by displayOrder
  const sortedCategories = [...categories].sort((a, b) => a.displayOrder - b.displayOrder);

  const filteredCategories = sortedCategories.filter((cat) => {
    const s = search.toLowerCase();
    return (
      cat.name?.toLowerCase().includes(s) ||
      cat.code?.toLowerCase().includes(s)
    );
  });

  const handleOpenAdd = () => {
    setFormData(initialFormState);
    setSelectedCategory(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (cat) => {
    setFormData(cat);
    setSelectedCategory(cat);
    setIsFormModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category? This action cannot be undone.")) {
      deleteCategory(id);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (selectedCategory) {
      updateCategory(selectedCategory.id, formData);
    } else {
      addCategory(formData);
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

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Room Categories</h1>
          <p className="mt-1 text-sm text-slate-500">Manage room classifications, codes, and display order.</p>
        </div>
        <button onClick={handleOpenAdd} className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-700 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-amber-800">
          <FiPlus className="h-4 w-4" /> Add Category
        </button>
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-xs">
          <FiSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search categories..." className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-700 focus:border-amber-700 focus:ring-1 focus:ring-amber-700 outline-none" />
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                {["Order", "Category Name", "Code", "Description", "Status", "Actions"].map(
                  (col) => <th key={col} className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">{col}</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((cat) => (
                  <tr key={cat.id} className={`hover:bg-slate-50 ${!cat.isActive ? 'opacity-50' : ''}`}>
                    <td className="whitespace-nowrap px-4 py-3 text-sm font-mono text-slate-500">{cat.displayOrder}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-slate-900">{cat.name}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600 font-mono">{cat.code || "-"}</td>
                    <td className="px-4 py-3 text-sm text-slate-600 truncate max-w-xs">{cat.description || "-"}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm">
                      {cat.isActive 
                        ? <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">Active</span>
                        : <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-500/20">Inactive</span>
                      }
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm">
                      <div className="flex items-center gap-3">
                        <button onClick={() => handleOpenEdit(cat)} className="text-slate-400 hover:text-amber-700"><FiEdit2 className="h-4 w-4" /></button>
                        <button onClick={() => handleDelete(cat.id)} className="text-slate-400 hover:text-red-600"><FiTrash2 className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-sm text-slate-500">No categories found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isFormModalOpen} onClose={() => setIsFormModalOpen(false)} title={selectedCategory ? "Edit Category" : "Add New Category"}>
        <form onSubmit={handleFormSubmit} className="space-y-4 bg-white p-5 rounded-lg shadow-sm border border-slate-200">
          
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Category Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="e.g. Presidential Suite" className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-amber-700 outline-none" />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Category Code (Optional)</label>
            <input type="text" name="code" value={formData.code} onChange={handleChange} placeholder="e.g. PRS" className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-amber-700 outline-none uppercase" />
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

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3 mt-6">
            <button type="button" onClick={() => setIsFormModalOpen(false)} className="px-5 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition">Cancel</button>
            <button type="submit" className="px-6 py-2.5 bg-amber-700 text-white rounded-lg text-sm font-medium hover:bg-amber-800 transition shadow-sm">
              {selectedCategory ? "Save Changes" : "Create Category"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
