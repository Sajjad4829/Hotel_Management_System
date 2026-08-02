import React, { useState } from 'react';
import { usePageContext } from '../../../../Context/PageContext';
import { Eye, EyeOff, Plus, Trash2, GripVertical, Settings, Save, X, ArrowUp, ArrowDown } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

export default function StatisticsEditor() {
  const { pagesData, updatePageData } = usePageContext();
  const statistics = pagesData.home?.statistics || {};
  const [editingCardIdx, setEditingCardIdx] = useState(null);

  const handleUpdate = (field, value) => {
    updatePageData('home', 'statistics', field, value);
  };

  const handleArrayUpdate = (index, field, value) => {
    const arr = [...(statistics.items || [])];
    arr[index] = { ...arr[index], [field]: value };
    handleUpdate('items', arr);
  };

  const handleArrayAdd = () => {
    const arr = [...(statistics.items || [])];
    arr.push({
      id: `stat-${Date.now()}`,
      icon: 'Award',
      value: '0',
      suffix: '+',
      label: 'New Stat',
      status: 'Active',
      displayOrder: arr.length + 1
    });
    handleUpdate('items', arr);
    setEditingCardIdx(arr.length - 1);
  };

  const handleArrayRemove = (index) => {
    if (window.confirm('Are you sure you want to delete this stat?')) {
      const arr = [...(statistics.items || [])];
      arr.splice(index, 1);
      handleUpdate('items', arr);
      if (editingCardIdx === index) setEditingCardIdx(null);
    }
  };

  const moveItem = (index, direction) => {
    const arr = [...(statistics.items || [])];
    if (direction === 'up' && index > 0) {
      const temp = arr[index];
      arr[index] = arr[index - 1];
      arr[index - 1] = temp;
    } else if (direction === 'down' && index < arr.length - 1) {
      const temp = arr[index];
      arr[index] = arr[index + 1];
      arr[index + 1] = temp;
    }
    // Update display orders
    const updatedArr = arr.map((item, idx) => ({ ...item, displayOrder: idx + 1 }));
    handleUpdate('items', updatedArr);
  };

  // Pre-selected icons for statistics
  const iconOptions = ['Users', 'Award', 'Repeat', 'Globe', 'Star', 'TrendingUp', 'Heart', 'CheckCircle', 'Building', 'MapPin'];

  return (
    <div className="space-y-6">
      {/* 1. Global Section Settings */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
            Statistics Settings
          </h3>
          <button
            onClick={() => handleUpdate('isVisible', !statistics.isVisible)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              statistics.isVisible ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-600'
            }`}
          >
            {statistics.isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
            {statistics.isVisible ? 'Visible' : 'Hidden'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Section Badge</label>
            <input
              type="text"
              value={statistics.badgeText || ''}
              onChange={(e) => handleUpdate('badgeText', e.target.value)}
              className="w-full p-2 text-sm border border-slate-300 rounded-lg outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Title</label>
            <input
              type="text"
              value={statistics.title || ''}
              onChange={(e) => handleUpdate('title', e.target.value)}
              className="w-full p-2 text-sm border border-slate-300 rounded-lg outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Highlighted Word</label>
            <input
              type="text"
              value={statistics.titleHighlight || ''}
              onChange={(e) => handleUpdate('titleHighlight', e.target.value)}
              className="w-full p-2 text-sm border border-slate-300 rounded-lg outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* 2. Items Manager */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-800 text-lg">Counter Cards</h3>
          <button
            onClick={handleArrayAdd}
            className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} /> Add Stat
          </button>
        </div>

        {/* List of Stats */}
        {editingCardIdx === null ? (
          <div className="space-y-3">
            {(!statistics.items || statistics.items.length === 0) ? (
              <div className="text-center py-8 text-slate-400 text-sm">
                No stats created yet. Click "Add Stat" to create one.
              </div>
            ) : (
              [...(statistics.items || [])].map((item, idx) => {
                const IconComponent = LucideIcons[item.icon] || LucideIcons.HelpCircle;
                return (
                  <div key={item.id || idx} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col gap-1 text-slate-400">
                        <button onClick={() => moveItem(idx, 'up')} disabled={idx === 0} className="hover:text-slate-700 disabled:opacity-30">
                          <ArrowUp size={14} />
                        </button>
                        <button onClick={() => moveItem(idx, 'down')} disabled={idx === statistics.items.length - 1} className="hover:text-slate-700 disabled:opacity-30">
                          <ArrowDown size={14} />
                        </button>
                      </div>
                      
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-blue-600 bg-blue-100">
                        <IconComponent size={20} />
                      </div>

                      <div>
                        <h4 className="font-bold text-slate-800 text-lg leading-tight">{item.value}{item.suffix}</h4>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{item.label}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${item.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-600'}`}>
                        {item.status || 'Active'}
                      </span>
                      <button
                        onClick={() => setEditingCardIdx(idx)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                        title="Edit Stat"
                      >
                        <Settings size={18} />
                      </button>
                      <button
                        onClick={() => handleArrayRemove(idx)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                        title="Delete Stat"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        ) : (
          /* Editor View for Single Stat */
          <div className="border border-blue-500 rounded-xl p-5 bg-blue-50/30">
            <div className="flex justify-between items-center mb-5 border-b border-blue-200 pb-3">
              <h4 className="font-bold text-blue-800">Editing Stat: {statistics.items[editingCardIdx]?.label}</h4>
              <button 
                onClick={() => setEditingCardIdx(null)}
                className="flex items-center gap-1 text-slate-500 hover:text-slate-700 text-sm font-medium"
              >
                <X size={16} /> Close Editor
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Value (Number)</label>
                <input
                  type="text"
                  value={statistics.items[editingCardIdx]?.value || ''}
                  onChange={(e) => handleArrayUpdate(editingCardIdx, 'value', e.target.value)}
                  className="w-full p-2 text-sm border border-slate-300 rounded-lg outline-none focus:border-blue-500"
                  placeholder="e.g. 25,000"
                />
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Suffix (e.g. +, %, /5)</label>
                <input
                  type="text"
                  value={statistics.items[editingCardIdx]?.suffix || ''}
                  onChange={(e) => handleArrayUpdate(editingCardIdx, 'suffix', e.target.value)}
                  className="w-full p-2 text-sm border border-slate-300 rounded-lg outline-none focus:border-blue-500"
                  placeholder="e.g. +"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Label</label>
                <input
                  type="text"
                  value={statistics.items[editingCardIdx]?.label || ''}
                  onChange={(e) => handleArrayUpdate(editingCardIdx, 'label', e.target.value)}
                  className="w-full p-2 text-sm border border-slate-300 rounded-lg outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-2">Icon Selection</label>
                <div className="flex flex-wrap gap-2">
                  {iconOptions.map(iconName => {
                    const IconComp = LucideIcons[iconName];
                    const isSelected = statistics.items[editingCardIdx]?.icon === iconName;
                    return (
                      <button
                        key={iconName}
                        onClick={() => handleArrayUpdate(editingCardIdx, 'icon', iconName)}
                        className={`p-2 rounded-lg border transition-all ${
                          isSelected ? 'border-blue-600 bg-blue-50 text-blue-600 shadow-sm scale-105' : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                        }`}
                        title={iconName}
                      >
                        <IconComp size={20} />
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Status</label>
                <select
                  value={statistics.items[editingCardIdx]?.status || 'Active'}
                  onChange={(e) => handleArrayUpdate(editingCardIdx, 'status', e.target.value)}
                  className="w-full p-2 text-sm border border-slate-300 rounded-lg outline-none focus:border-blue-500 bg-white"
                >
                  <option value="Active">Active (Visible)</option>
                  <option value="Inactive">Inactive (Hidden)</option>
                </select>
              </div>

            </div>

            <div className="flex justify-end pt-3 border-t border-blue-200">
              <button
                onClick={() => setEditingCardIdx(null)}
                className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
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
