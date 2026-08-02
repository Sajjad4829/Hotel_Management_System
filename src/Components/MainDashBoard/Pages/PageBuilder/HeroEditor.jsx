import React from 'react';
import { Type, Settings, Palette, Image as ImageIcon, Link as LinkIcon, Plus, Trash2, Layout, Clock, PlaySquare } from 'lucide-react';

export default function HeroEditor({ data, onChange }) {

  const renderToggle = (key, label) => {
    const isChecked = data[key] !== false;
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

  const renderTextarea = (key, label) => (
    <div className="mb-4">
      <label className="block text-xs font-semibold text-slate-500 mb-1">{label}</label>
      <textarea
        value={data[key] || ''}
        onChange={(e) => onChange(key, e.target.value)}
        className="w-full p-2.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#b45309] focus:border-[#b45309] outline-none min-h-[80px]"
      />
    </div>
  );

  const renderColorPicker = (key, label, defaultColor = '#000000') => (
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

  const renderSelect = (key, label, options) => (
    <div className="mb-4">
      <label className="block text-xs font-semibold text-slate-500 mb-1">{label}</label>
      <select
        value={data[key] || options[0].value}
        onChange={(e) => onChange(key, e.target.value)}
        className="w-full p-2.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#b45309] focus:border-[#b45309] outline-none bg-white"
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );

  const handleSlideAdd = () => {
    const newSlides = [...(data.slides || [])];
    newSlides.push({ image: 'https://images.unsplash.com/photo-1542314831-c6a4d1409e1c?auto=format&fit=crop&w=1920&q=80', label: 'New Slide' });
    onChange('slides', newSlides);
  };

  const handleSlideUpdate = (index, field, value) => {
    const newSlides = [...(data.slides || [])];
    newSlides[index] = { ...newSlides[index], [field]: value };
    onChange('slides', newSlides);
  };

  const handleSlideDelete = (index) => {
    const newSlides = [...(data.slides || [])];
    newSlides.splice(index, 1);
    onChange('slides', newSlides);
  };

  return (
    <div className="space-y-8">
      
      {/* General Settings */}
      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Settings size={18} className="text-[#b45309]" /> General Settings
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            {renderToggle('isVisible', 'Show Hero Section')}
            {renderSelect('overlayIntensity', 'Background Overlay Intensity', [
              { value: 'light', label: 'Light' },
              { value: 'medium', label: 'Medium' },
              { value: 'dark', label: 'Dark' }
            ])}
            {renderSelect('sliderInterval', 'Slider Animation Speed', [
              { value: 3000, label: 'Fast (3 seconds)' },
              { value: 5000, label: 'Normal (5 seconds)' },
              { value: 8000, label: 'Slow (8 seconds)' },
              { value: 12000, label: 'Very Slow (12 seconds)' }
            ])}
          </div>
          <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 h-fit">
            <p className="text-sm text-slate-600">
              The Hero section is the first thing users see. Ensure your background images are high quality (1920x1080 recommended) and your overlay intensity allows text to be readable.
            </p>
          </div>
        </div>
      </div>

      {/* Typography */}
      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Type size={18} className="text-[#b45309]" /> Typography
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            {renderTextInput('badgeText', 'Badge Text', 'Aurum Hotel & Resort')}
            {renderTextarea('description', 'Description (Subtitle)')}
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-500 mb-3 border-b border-slate-200 pb-2">Main Title Construction</label>
            {renderTextInput('titlePrefix', 'Prefix', 'Experience')}
            {renderTextInput('highlightText', 'Highlighted Word', 'Luxury')}
            {renderTextInput('titleSuffix', 'Suffix', '& Comfort')}
            <div className="mt-2 p-3 bg-slate-800 rounded-lg text-center">
              <span className="text-white font-serif italic mr-1">{data.titlePrefix || 'Experience'}</span>
              <span className="text-amber-400 font-serif italic mr-1">{data.highlightText || 'Luxury'}</span>
              <span className="text-white font-serif italic">{data.titleSuffix || '& Comfort'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Background Slider */}
      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <PlaySquare size={18} className="text-[#b45309]" /> Background Slider
          </div>
          <button onClick={handleSlideAdd} className="text-[#b45309] hover:bg-orange-50 px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-1 transition-colors border border-[#b45309]">
            <Plus size={14} /> Add Slide
          </button>
        </h3>
        <div className="space-y-4">
          {(data.slides || []).map((slide, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative group">
              <button 
                onClick={() => handleSlideDelete(index)} 
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={12} />
              </button>
              
              <div className="w-full md:w-48 h-32 bg-slate-100 rounded-lg overflow-hidden shrink-0 border border-slate-200">
                <img src={slide.image} alt={slide.label} className="w-full h-full object-cover" onError={(e) => e.target.src='https://placehold.co/600x400?text=Invalid+Image'} />
              </div>
              
              <div className="flex-1 space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Image URL</label>
                  <input
                    type="text"
                    value={slide.image}
                    onChange={(e) => handleSlideUpdate(index, 'image', e.target.value)}
                    className="w-full p-2 text-sm border border-slate-200 rounded focus:ring-1 focus:ring-[#b45309] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Slide Label (Top Right)</label>
                  <input
                    type="text"
                    value={slide.label}
                    onChange={(e) => handleSlideUpdate(index, 'label', e.target.value)}
                    className="w-full p-2 text-sm border border-slate-200 rounded focus:ring-1 focus:ring-[#b45309] outline-none"
                  />
                </div>
              </div>
            </div>
          ))}
          {(!data.slides || data.slides.length === 0) && (
            <div className="text-center p-8 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-slate-500">
              No slides configured. Add at least one slide.
            </div>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <LinkIcon size={18} className="text-[#b45309]" /> Call to Action Buttons
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 md:col-span-2">
            <h4 className="font-semibold text-slate-700 mb-3 border-b border-slate-200 pb-2">Primary Button</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>{renderTextInput('primaryButtonText', 'Text', 'Book Now')}</div>
              <div>{renderTextInput('primaryButtonLink', 'Link', '/booking')}</div>
              <div>{renderColorPicker('primaryButtonColor', 'Background Color', '#d97706')}</div>
            </div>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 md:col-span-2">
            <h4 className="font-semibold text-slate-700 mb-3 border-b border-slate-200 pb-2 flex items-center justify-between">
              Secondary Button
              <span className="text-xs text-slate-400 font-normal">Outline style</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>{renderTextInput('secondaryButtonText', 'Text', 'Explore Rooms')}</div>
              <div>{renderTextInput('secondaryButtonLink', 'Link', '/rooms')}</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
