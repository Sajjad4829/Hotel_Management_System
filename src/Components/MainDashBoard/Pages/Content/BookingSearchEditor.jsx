import React from 'react';
import { Type, Settings, Palette, Layout, Search, Users, Calendar, Plus, Trash2 } from 'lucide-react';

export default function BookingSearchEditor({ data, onChange }) {

  // Common UI for Toggles
  const renderToggle = (key, label) => {
    const isChecked = data[key] !== false; // default true if undefined
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
  const renderColorPicker = (key, label, defaultColor = '#000000') => {
    return (
      <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl mb-3">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 uppercase font-mono">{data[key] || defaultColor}</span>
          <input
            type="color"
            value={data[key] || defaultColor}
            onChange={(e) => onChange(key, e.target.value)}
            className="w-8 h-8 rounded cursor-pointer border-0 p-0"
          />
        </div>
      </div>
    );
  };

  // UI for string inputs
  const renderTextInput = (key, label, placeholder = '') => (
    <div className="mb-4">
      <label className="block text-xs font-semibold text-slate-500 mb-1">{label}</label>
      <input
        type="text"
        value={data[key] || ''}
        onChange={(e) => onChange(key, e.target.value)}
        placeholder={placeholder}
        className="w-full p-2.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#b45309] focus:border-[#b45309] outline-none"
      />
    </div>
  );

  // UI for number inputs (limits)
  const renderNumberInput = (key, label, min = 1, max = 10) => (
    <div className="mb-4">
      <label className="block text-xs font-semibold text-slate-500 mb-1">{label}</label>
      <input
        type="number"
        value={data[key] || min}
        onChange={(e) => onChange(key, parseInt(e.target.value))}
        min={min}
        max={max}
        className="w-full p-2.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#b45309] focus:border-[#b45309] outline-none"
      />
    </div>
  );

  // Array manager for destination options
  const handleOptionAdd = () => {
    const newOptions = [...(data.destinationOptions || [])];
    newOptions.push('New City');
    onChange('destinationOptions', newOptions);
  };

  const handleOptionUpdate = (index, value) => {
    const newOptions = [...(data.destinationOptions || [])];
    newOptions[index] = value;
    onChange('destinationOptions', newOptions);
  };

  const handleOptionDelete = (index) => {
    const newOptions = [...(data.destinationOptions || [])];
    newOptions.splice(index, 1);
    onChange('destinationOptions', newOptions);
  };

  return (
    <div className="space-y-8">
      
      {/* General Settings */}
      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Settings size={18} className="text-[#b45309]" /> General
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            {renderToggle('isVisible', 'Show Booking Search Section')}
            {renderColorPicker('cardBgColor', 'Card Background Color', '#ffffff')}
          </div>
          <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
            <p className="text-sm text-slate-600">
              The Booking Search section allows users to quickly select a destination, dates, and guests to jump directly into the search results page.
            </p>
          </div>
        </div>
      </div>

      {/* Button Settings */}
      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Palette size={18} className="text-[#b45309]" /> Search Button
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
             {renderTextInput('buttonText', 'Button Text', 'Search')}
          </div>
          <div className="md:col-span-1">
             {renderColorPicker('buttonBgColor', 'Button Background', '#d97706')}
          </div>
          <div className="md:col-span-1">
             {renderColorPicker('buttonTextColor', 'Button Text Color', '#ffffff')}
          </div>
        </div>
      </div>

      {/* Fields Configuration */}
      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Layout size={18} className="text-[#b45309]" /> Field Configuration
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Destination */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 font-semibold text-slate-700 mb-3 border-b border-slate-200 pb-2">
              <Search size={16} /> Destination
            </div>
            {renderToggle('showDestination', 'Show Field')}
            {data.showDestination !== false && (
              <>
                <div className="grid grid-cols-2 gap-2">
                  {renderTextInput('destinationLabel', 'Field Label', 'Destination')}
                  {renderTextInput('destinationPlaceholder', 'Placeholder', 'Where to?')}
                </div>
                
                <div className="mt-4">
                  <label className="block text-xs font-semibold text-slate-500 mb-2 flex justify-between items-center">
                    Available Options
                    <button onClick={handleOptionAdd} className="text-[#b45309] hover:text-orange-700 flex items-center gap-1">
                      <Plus size={12} /> Add
                    </button>
                  </label>
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                    {(data.destinationOptions || []).map((opt, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={opt}
                          onChange={(e) => handleOptionUpdate(i, e.target.value)}
                          className="flex-1 p-1.5 text-sm border border-slate-200 rounded focus:ring-1 focus:ring-[#b45309] outline-none"
                        />
                        <button onClick={() => handleOptionDelete(i)} className="text-red-400 hover:text-red-600">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Dates */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 font-semibold text-slate-700 mb-3 border-b border-slate-200 pb-2">
              <Calendar size={16} /> Dates
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                {renderToggle('showCheckIn', 'Check-in')}
                {data.showCheckIn !== false && renderTextInput('checkInLabel', 'Label', 'Check-in')}
              </div>
              <div>
                {renderToggle('showCheckOut', 'Check-out')}
                {data.showCheckOut !== false && renderTextInput('checkOutLabel', 'Label', 'Check-out')}
              </div>
            </div>
          </div>

          {/* Guests & Rooms */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 font-semibold text-slate-700 mb-3 border-b border-slate-200 pb-2">
              <Users size={16} /> Guests & Rooms
            </div>
            
            {renderToggle('showAdults', 'Show Adults')}
            {data.showAdults !== false && (
              <div className="mt-2">
                {renderTextInput('adultsLabel', 'Label', 'Adults')}
              </div>
            )}

            <div className="my-2 border-t border-slate-200" />
            
            {renderToggle('showChildren', 'Show Children')}
            {data.showChildren !== false && (
              <div className="mt-2">
                {renderTextInput('childrenLabel', 'Label', 'Children')}
              </div>
            )}

            <div className="my-2 border-t border-slate-200" />

            {renderToggle('showRooms', 'Show Rooms')}
            {data.showRooms !== false && (
              <div className="mt-2">
                {renderTextInput('roomsLabel', 'Label', 'Rooms')}
              </div>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}
