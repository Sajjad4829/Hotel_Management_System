import React, { useState } from 'react';
import { usePageContext } from '../../../../Context/PageContext';
import { Eye, EyeOff, Plus, Trash2, GripVertical, Settings, Save, X, ArrowUp, ArrowDown } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

export default function FacilitiesEditor() {
  const { pagesData, updatePageData } = usePageContext();
  const facilities = pagesData.home?.facilities || {};
  const [editingCardIdx, setEditingCardIdx] = useState(null);

  const handleUpdate = (field, value) => {
    updatePageData('home', 'facilities', field, value);
  };

  const handleArrayUpdate = (index, field, value) => {
    const arr = [...(facilities.items || [])];
    arr[index] = { ...arr[index], [field]: value };
    handleUpdate('items', arr);
  };

  const handleArrayAdd = () => {
    const newItems = [
      ...(facilities.items || []),
      {
        id: `fac-${Date.now()}`,
        name: "New Facility",
        desc: "Description of the facility",
        gradient: "linear-gradient(135deg, #0ea5e9, #6366f1)",
        icon: "Star",
        status: "Active",
        displayOrder: (facilities.items?.length || 0) + 1
      }
    ];
    handleUpdate('items', newItems);
    setEditingCardIdx(newItems.length - 1);
  };

  const handleArrayRemove = (index) => {
    const newItems = [...(facilities.items || [])];
    newItems.splice(index, 1);
    handleUpdate('items', newItems);
  };

  const moveItem = (index, direction) => {
    const newItems = [...(facilities.items || [])];
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

  const AVAILABLE_ICONS = [
    "Wifi", "Waves", "Dumbbell", "Car", "Utensils", "Coffee", "Clock", "Star", 
    "ShieldCheck", "Tv", "Wind", "Bath", "Music", "Wine", "Key", "MapPin", "Heart", "ThumbsUp", "Award", "Briefcase"
  ];

  const renderIcon = (iconName) => {
    const IconComponent = LucideIcons[iconName];
    return IconComponent ? <IconComponent size={20} /> : <LucideIcons.HelpCircle size={20} />;
  };

  return (
    <div className="space-y-6">
      {/* Visibility Toggle */}
      <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200">
        <div>
          <h3 className="font-semibold text-slate-800">Facilities Section Visibility</h3>
          <p className="text-sm text-slate-500">Show or hide this entire section on the homepage.</p>
        </div>
        <button
          onClick={() => handleUpdate('isVisible', facilities.isVisible === false ? true : false)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
            facilities.isVisible !== false 
              ? 'bg-green-100 text-green-700 hover:bg-green-200' 
              : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
          }`}
        >
          {facilities.isVisible !== false ? <Eye size={18} /> : <EyeOff size={18} />}
          {facilities.isVisible !== false ? 'Visible' : 'Hidden'}
        </button>
      </div>

      {/* Section Details */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-semibold text-slate-800 mb-4 border-b border-slate-100 pb-2">Section Configuration</h3>
        
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1">Badge Text</label>
          <input
            type="text"
            value={facilities.badgeText || ''}
            onChange={(e) => handleUpdate('badgeText', e.target.value)}
            className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#b45309] outline-none"
            placeholder="e.g. Premium Amenities"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1">Title (Normal Text)</label>
            <input
              type="text"
              value={facilities.title || ''}
              onChange={(e) => handleUpdate('title', e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#b45309] outline-none"
              placeholder="e.g. Hotel"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1">Title (Highlighted / Italicized)</label>
            <input
              type="text"
              value={facilities.titleHighlight || ''}
              onChange={(e) => handleUpdate('titleHighlight', e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#b45309] outline-none"
              placeholder="e.g. Facilities"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1">Subtitle / Description</label>
          <textarea
            value={facilities.subtitle || ''}
            onChange={(e) => handleUpdate('subtitle', e.target.value)}
            className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#b45309] outline-none min-h-[80px]"
            placeholder="Description text below the title..."
          />
        </div>
      </div>

      {/* Facilities Cards */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-2">
          <h3 className="font-semibold text-slate-800">Facilities Cards</h3>
          <button 
            onClick={handleArrayAdd}
            className="flex items-center gap-1.5 text-sm bg-[#b45309] hover:bg-orange-700 text-white px-3 py-1.5 rounded-lg transition-colors font-semibold"
          >
            <Plus size={16} /> Add Facility
          </button>
        </div>

        {(!facilities.items || facilities.items.length === 0) ? (
          <p className="text-slate-500 italic text-center py-6">No facilities added yet.</p>
        ) : (
          <div className="space-y-3">
            {facilities.items.map((item, idx) => (
              <div key={item.id || idx} className="border border-slate-200 rounded-xl overflow-hidden transition-all duration-200 bg-slate-50">
                {/* List View */}
                {editingCardIdx !== idx ? (
                  <div className="flex items-center p-3 gap-4">
                    <div className="flex flex-col gap-1 text-slate-400">
                      <button onClick={() => moveItem(idx, 'up')} disabled={idx === 0} className="hover:text-slate-700 disabled:opacity-30"><ArrowUp size={16} /></button>
                      <button onClick={() => moveItem(idx, 'down')} disabled={idx === facilities.items.length - 1} className="hover:text-slate-700 disabled:opacity-30"><ArrowDown size={16} /></button>
                    </div>
                    
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white shrink-0" style={{ background: item.gradient }}>
                      {renderIcon(item.icon)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-800">{item.name}</h4>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${item.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-600'}`}>
                          {item.status || 'Active'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1">{item.desc}</p>
                    </div>

                    <div className="flex items-center gap-2 pr-2">
                      <button onClick={() => setEditingCardIdx(idx)} className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:text-[#b45309] hover:border-[#b45309] transition-colors">
                        <Settings size={16} />
                      </button>
                      <button onClick={() => handleArrayRemove(idx)} className="p-2 bg-white border border-slate-200 rounded-lg text-red-500 hover:bg-red-50 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Editor View */
                  <div className="p-5 bg-white border-b-4 border-[#b45309]">
                    <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
                      <h4 className="font-bold text-[#1e3a5f]">Editing: {item.name || 'New Facility'}</h4>
                      <button onClick={() => setEditingCardIdx(null)} className="flex items-center gap-1 bg-[#1e3a5f] hover:bg-[#0f2942] text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors">
                        <Save size={14} /> Done
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Facility Name</label>
                        <input type="text" value={item.name || ''} onChange={(e) => handleArrayUpdate(idx, 'name', e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Status</label>
                        <select value={item.status || 'Active'} onChange={(e) => handleArrayUpdate(idx, 'status', e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg text-sm bg-white">
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Description</label>
                        <textarea value={item.desc || ''} onChange={(e) => handleArrayUpdate(idx, 'desc', e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg text-sm h-16" />
                      </div>

                      {/* Icon & Color Config */}
                      <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-2">Select Icon</label>
                          <div className="grid grid-cols-5 gap-2 max-h-40 overflow-y-auto p-2 border border-slate-200 rounded-lg bg-slate-50">
                            {AVAILABLE_ICONS.map(iconName => {
                              const isSelected = item.icon === iconName;
                              return (
                                <button
                                  key={iconName}
                                  onClick={() => handleArrayUpdate(idx, 'icon', iconName)}
                                  className={`p-2 flex justify-center rounded-lg transition-all ${isSelected ? 'bg-[#b45309] text-white shadow-md scale-105' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
                                  title={iconName}
                                >
                                  {renderIcon(iconName)}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Gradient Background</label>
                          <p className="text-[10px] text-slate-400 mb-2">CSS linear-gradient string for icon background</p>
                          <input 
                            type="text" 
                            value={item.gradient || ''} 
                            onChange={(e) => handleArrayUpdate(idx, 'gradient', e.target.value)} 
                            className="w-full p-2 border border-slate-300 rounded-lg text-sm mb-3 font-mono text-xs" 
                            placeholder="linear-gradient(135deg, #6366f1, #8b5cf6)"
                          />
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-semibold text-slate-600">Preview:</span>
                              <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white shadow-md" style={{ background: item.gradient || 'linear-gradient(135deg, #ccc, #999)' }}>
                                {renderIcon(item.icon)}
                              </div>
                            </div>
                          </div>
                          
                          <div className="sm:col-span-2">
                            <label className="block text-xs font-semibold text-slate-500 mb-1">Icon Layout / Position</label>
                            <select
                              value={item.iconPosition || 'top-left'}
                              onChange={(e) => handleArrayUpdate(idx, 'iconPosition', e.target.value)}
                              className="w-full p-2 border border-slate-300 rounded-lg text-sm bg-white"
                            >
                              <option value="top-left">Top (Left Aligned)</option>
                              <option value="top-center">Top (Center Aligned)</option>
                              <option value="left">Left Side (Row)</option>
                              <option value="right">Right Side (Row)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
