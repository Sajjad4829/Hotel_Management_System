import React from 'react';
import { Type, Image as ImageIcon, Plus, Trash2, ArrowUp, ArrowDown, Settings, Palette } from 'lucide-react';

export default function NavbarEditor({ data, onChange }) {
  
  // Helpers to update specific array fields
  const handleArrayAdd = (arrayName) => {
    const newArray = [...(data[arrayName] || [])];
    const newId = newArray.length > 0 ? Math.max(...newArray.map(item => item.id)) + 1 : 1;
    newArray.push({ id: newId, label: 'New Item', link: '/' });
    onChange(arrayName, newArray);
  };

  const handleArrayUpdate = (arrayName, index, field, value) => {
    const newArray = [...(data[arrayName] || [])];
    newArray[index] = { ...newArray[index], [field]: value };
    onChange(arrayName, newArray);
  };

  const handleArrayDelete = (arrayName, index) => {
    const newArray = [...(data[arrayName] || [])];
    newArray.splice(index, 1);
    onChange(arrayName, newArray);
  };

  const handleArrayMove = (arrayName, index, direction) => {
    const newArray = [...(data[arrayName] || [])];
    if (direction === 'up' && index > 0) {
      [newArray[index - 1], newArray[index]] = [newArray[index], newArray[index - 1]];
      onChange(arrayName, newArray);
    } else if (direction === 'down' && index < newArray.length - 1) {
      [newArray[index + 1], newArray[index]] = [newArray[index], newArray[index + 1]];
      onChange(arrayName, newArray);
    }
  };

  // Common UI for array items (navMenu or headerButtons)
  const renderArrayList = (arrayName, title) => {
    const items = data[arrayName] || [];
    return (
      <div className="mb-8 border border-slate-200 rounded-xl p-4 bg-slate-50">
        <div className="flex items-center justify-between mb-4">
          <label className="text-sm font-bold text-slate-700">{title}</label>
          <button 
            onClick={() => handleArrayAdd(arrayName)}
            className="flex items-center gap-1 text-xs font-semibold text-[#b45309] bg-orange-100 hover:bg-orange-200 px-3 py-1.5 rounded-lg transition-colors"
          >
            <  room manage editor not Plus size={14} /> Add Item
          </button>
        </div>
        
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={item.id} className="flex items-center gap-2 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
              <div className="flex flex-col gap-1 shrink-0">
                <button 
                  onClick={() => handleArrayMove(arrayName, index, 'up')}
                  disabled={index === 0}
                  className="text-slate-400 hover:text-[#b45309] disabled:opacity-30 disabled:hover:text-slate-400"
                >
                  <ArrowUp size={14} />
                </button>
                <button 
                  onClick={() => handleArrayMove(arrayName, index, 'down')}
                  disabled={index === items.length - 1}
                  className="text-slate-400 hover:text-[#b45309] disabled:opacity-30 disabled:hover:text-slate-400"
                >
                  <ArrowDown size={14} />
                </button>
              </div>
              
              <div className="flex-1 grid grid-cols-2 gap-2">
                <input 
                  type="text" 
                  value={item.label}
                  onChange={(e) => handleArrayUpdate(arrayName, index, 'label', e.target.value)}
                  placeholder="Label (e.g. Home)"
                  className="w-full p-2 text-sm border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#b45309] focus:border-[#b45309] outline-none"
                />
                <input 
                  type="text" 
                  value={item.link}
                  onChange={(e) => handleArrayUpdate(arrayName, index, 'link', e.target.value)}
                  placeholder="URL (e.g. /)"
                  className="w-full p-2 text-sm border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#b45309] focus:border-[#b45309] outline-none"
                />
              </div>

              <button 
                onClick={() => handleArrayDelete(arrayName, index)}
                className="text-red-400 hover:text-red-600 p-2 shrink-0"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          {items.length === 0 && (
            <p className="text-sm text-slate-500 italic text-center py-2">No items added yet.</p>
          )}
        </div>
      </div>
    );
  };

  // Common UI for Toggles
  const renderToggle = (key, label) => {
    const isChecked = !!data[key];
    return (
      <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl mb-3">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        <button
          onClick={() => onChange(key, !isChecked)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isChecked ? 'bg-[#b45309]' : 'bg-slate-300'}`}
        >
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isChecked ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
      </div>
    );
  };

  // Common UI for Colors
  const renderColorPicker = (key, label) => {
    return (
      <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl mb-3">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 uppercase font-mono">{data[key] || '#000000'}</span>
          <input
            type="color"
            value={data[key] || '#000000'}
            onChange={(e) => onChange(key, e.target.value)}
            className="w-8 h-8 rounded cursor-pointer border-0 p-0"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Basic Settings */}
      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Settings size={18} className="text-[#b45309]" /> Brand Settings
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <Type size={14} className="text-[#b45309]" /> Website Name
            </label>
            <input
              type="text"
              value={data.websiteName || ''}
              onChange={(e) => onChange('websiteName', e.target.value)}
              className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#b45309] outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <ImageIcon size={14} className="text-[#b45309]" /> Logo Image URL
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={data.logoImage || ''}
                onChange={(e) => onChange('logoImage', e.target.value)}
                placeholder="https://..."
                className="flex-1 p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#b45309] outline-none"
              />
              {data.logoImage && (
                <div className="w-12 h-12 rounded border border-slate-200 shrink-0 overflow-hidden bg-slate-100 flex items-center justify-center">
                  <img src={data.logoImage} alt="Logo" className="max-w-full max-h-full object-contain" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Menu & Buttons */}
      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Type size={18} className="text-[#b45309]" /> Navigation
        </h3>
        {renderArrayList('navMenu', 'Main Menu Items')}
        {renderArrayList('headerButtons', 'Call to Action Buttons')}
      </div>

      {/* Toggles & Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Settings size={18} className="text-[#b45309]" /> Features
          </h3>
          {renderToggle('isSticky', 'Sticky Header')}
          {renderToggle('showSearchIcon', 'Show Search Icon')}
          {renderToggle('showWishlistIcon', 'Show Wishlist Icon')}
          {renderToggle('showNotificationIcon', 'Show Notification Icon')}
          {renderToggle('showProfileIcon', 'Show Profile Icon')}
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Palette size={18} className="text-[#b45309]" /> Styling
          </h3>
          {renderColorPicker('headerBgColor', 'Background Color')}
          {renderColorPicker('textColor', 'Text Color')}
          {renderColorPicker('buttonColor', 'Primary Button Color')}
        </div>
      </div>

    </div>
  );
}
