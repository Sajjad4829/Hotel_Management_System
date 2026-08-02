import React, { useState } from 'react';
import { usePageContext } from '../../../../Context/PageContext';
import { Eye, EyeOff, Plus, Trash2, GripVertical, Settings, Save, X, ArrowUp, ArrowDown } from 'lucide-react';

export default function ReviewsEditor() {
  const { pagesData, updatePageData } = usePageContext();
  const reviews = pagesData.home?.reviews || {};
  const [editingCardIdx, setEditingCardIdx] = useState(null);

  const handleUpdate = (field, value) => {
    updatePageData('home', 'reviews', field, value);
  };

  const handleArrayUpdate = (index, field, value) => {
    const arr = [...(reviews.items || [])];
    arr[index] = { ...arr[index], [field]: value };
    handleUpdate('items', arr);
  };

  const handleArrayAdd = () => {
    const newItems = [
      ...(reviews.items || []),
      {
        id: `rev-${Date.now()}`,
        name: "New Guest",
        location: "City, Country",
        rating: 5,
        review: "This is a new guest review.",
        initials: "NG",
        color: "linear-gradient(135deg, #0ea5e9, #6366f1)",
        status: "Active",
        displayOrder: (reviews.items?.length || 0) + 1
      }
    ];
    handleUpdate('items', newItems);
    setEditingCardIdx(newItems.length - 1);
  };

  const handleArrayRemove = (index) => {
    const newItems = [...(reviews.items || [])];
    newItems.splice(index, 1);
    handleUpdate('items', newItems);
  };

  const moveItem = (index, direction) => {
    const newItems = [...(reviews.items || [])];
    if (direction === 'up' && index > 0) {
      [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
    } else if (direction === 'down' && index < newItems.length - 1) {
      [newItems[index + 1], newItems[index]] = [newItems[index], newItems[index + 1]];
    }
    
    // Update display orders
    newItems.forEach((item, idx) => {
      item.displayOrder = idx + 1;
    });
    
    handleUpdate('items', newItems);
  };

  return (
    <div className="space-y-6">
      {/* Visibility Toggle */}
      <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200">
        <div>
          <h3 className="font-semibold text-slate-800">Reviews Section Visibility</h3>
          <p className="text-sm text-slate-500">Show or hide this entire section on the homepage.</p>
        </div>
        <button
          onClick={() => handleUpdate('isVisible', reviews.isVisible === false ? true : false)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
            reviews.isVisible !== false 
              ? 'bg-green-100 text-green-700 hover:bg-green-200' 
              : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
          }`}
        >
          {reviews.isVisible !== false ? <Eye size={18} /> : <EyeOff size={18} />}
          {reviews.isVisible !== false ? 'Visible' : 'Hidden'}
        </button>
      </div>

      {/* Section Details */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-semibold text-slate-800 mb-4 border-b border-slate-100 pb-2">Section Configuration</h3>
        
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1">Badge Text</label>
          <input
            type="text"
            value={reviews.badgeText || ''}
            onChange={(e) => handleUpdate('badgeText', e.target.value)}
            className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#b45309] focus:border-transparent outline-none"
            placeholder="e.g. Guest Stories"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1">Title (Normal Text)</label>
            <input
              type="text"
              value={reviews.title || ''}
              onChange={(e) => handleUpdate('title', e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#b45309] focus:border-transparent outline-none"
              placeholder="e.g. What Our"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1">Title (Highlighted / Italic)</label>
            <input
              type="text"
              value={reviews.titleHighlight || ''}
              onChange={(e) => handleUpdate('titleHighlight', e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#b45309] focus:border-transparent outline-none"
              placeholder="e.g. Guests Say"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1">Subtitle</label>
          <textarea
            value={reviews.subtitle || ''}
            onChange={(e) => handleUpdate('subtitle', e.target.value)}
            rows={2}
            className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#b45309] focus:border-transparent outline-none"
            placeholder="Real experiences from our happy guests around the world."
          />
        </div>
      </div>

      {/* Review Cards Manager */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-2">
          <h3 className="font-semibold text-slate-800">Guest Reviews ({reviews.items?.length || 0})</h3>
          <button
            onClick={handleArrayAdd}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#b45309] text-white rounded-lg hover:bg-[#92400e] transition-colors text-sm font-medium"
          >
            <Plus size={16} /> Add Review
          </button>
        </div>

        {/* List of Reviews */}
        {editingCardIdx === null ? (
          <div className="space-y-3">
            {(!reviews.items || reviews.items.length === 0) ? (
              <div className="text-center py-8 text-slate-400 text-sm">
                No reviews created yet. Click "Add Review" to create one.
              </div>
            ) : (
              [...(reviews.items || [])].map((item, idx) => (
                <div key={item.id || idx} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col gap-1 text-slate-400">
                      <button onClick={() => moveItem(idx, 'up')} disabled={idx === 0} className="hover:text-slate-700 disabled:opacity-30">
                        <ArrowUp size={14} />
                      </button>
                      <button onClick={() => moveItem(idx, 'down')} disabled={idx === reviews.items.length - 1} className="hover:text-slate-700 disabled:opacity-30">
                        <ArrowDown size={14} />
                      </button>
                    </div>
                    
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                    ) : (
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ background: item.color || '#9ca3af' }}>
                        {item.initials}
                      </div>
                    )}

                    <div>
                      <h4 className="font-semibold text-slate-800 text-sm">{item.name}</h4>
                      <p className="text-xs text-slate-500">{item.rating} / 5 Rating — {item.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${item.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-600'}`}>
                      {item.status || 'Active'}
                    </span>
                    <button
                      onClick={() => setEditingCardIdx(idx)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                      title="Edit Review"
                    >
                      <Settings size={18} />
                    </button>
                    <button
                      onClick={() => handleArrayRemove(idx)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                      title="Delete Review"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          /* Editor View for Single Review */
          <div className="border border-[#b45309] rounded-xl p-5 bg-orange-50/30">
            <div className="flex justify-between items-center mb-5 border-b border-orange-200 pb-3">
              <h4 className="font-bold text-[#b45309]">Editing Review: {reviews.items[editingCardIdx]?.name}</h4>
              <button 
                onClick={() => setEditingCardIdx(null)}
                className="flex items-center gap-1 text-slate-500 hover:text-slate-700 text-sm font-medium"
              >
                <X size={16} /> Close Editor
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Guest Name</label>
                <input
                  type="text"
                  value={reviews.items[editingCardIdx]?.name || ''}
                  onChange={(e) => handleArrayUpdate(editingCardIdx, 'name', e.target.value)}
                  className="w-full p-2 text-sm border border-slate-300 rounded-lg outline-none focus:border-[#b45309]"
                />
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Location</label>
                <input
                  type="text"
                  value={reviews.items[editingCardIdx]?.location || ''}
                  onChange={(e) => handleArrayUpdate(editingCardIdx, 'location', e.target.value)}
                  className="w-full p-2 text-sm border border-slate-300 rounded-lg outline-none focus:border-[#b45309]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Initials</label>
                <input
                  type="text"
                  value={reviews.items[editingCardIdx]?.initials || ''}
                  maxLength={3}
                  onChange={(e) => handleArrayUpdate(editingCardIdx, 'initials', e.target.value)}
                  className="w-full p-2 text-sm border border-slate-300 rounded-lg outline-none focus:border-[#b45309]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Rating (Out of 5)</label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={reviews.items[editingCardIdx]?.rating || 5}
                  onChange={(e) => handleArrayUpdate(editingCardIdx, 'rating', parseFloat(e.target.value))}
                  className="w-full p-2 text-sm border border-slate-300 rounded-lg outline-none focus:border-[#b45309]"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-600 mb-1">Review Text</label>
                <textarea
                  value={reviews.items[editingCardIdx]?.review || ''}
                  onChange={(e) => handleArrayUpdate(editingCardIdx, 'review', e.target.value)}
                  rows={3}
                  className="w-full p-2 text-sm border border-slate-300 rounded-lg outline-none focus:border-[#b45309]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Avatar Image URL (Overrides Initials/Color)</label>
                <input
                  type="text"
                  value={reviews.items[editingCardIdx]?.image || ''}
                  onChange={(e) => handleArrayUpdate(editingCardIdx, 'image', e.target.value)}
                  className="w-full p-2 text-sm border border-slate-300 rounded-lg outline-none focus:border-[#b45309]"
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Avatar Gradient (CSS Fallback)</label>
                <input
                  type="text"
                  value={reviews.items[editingCardIdx]?.color || ''}
                  onChange={(e) => handleArrayUpdate(editingCardIdx, 'color', e.target.value)}
                  className="w-full p-2 text-sm border border-slate-300 rounded-lg outline-none focus:border-[#b45309]"
                  placeholder="linear-gradient(135deg, #f59e0b, #6366f1)"
                />
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Status</label>
                <select
                  value={reviews.items[editingCardIdx]?.status || 'Active'}
                  onChange={(e) => handleArrayUpdate(editingCardIdx, 'status', e.target.value)}
                  className="w-full p-2 text-sm border border-slate-300 rounded-lg outline-none focus:border-[#b45309]"
                >
                  <option value="Active">Active (Visible)</option>
                  <option value="Inactive">Inactive (Hidden)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-orange-200">
              <button
                onClick={() => setEditingCardIdx(null)}
                className="flex items-center gap-2 px-4 py-2 bg-[#b45309] text-white rounded-lg hover:bg-[#92400e] font-medium text-sm"
              >
                <Save size={16} /> Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
