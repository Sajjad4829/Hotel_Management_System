import React, { useState } from 'react';
import { 
  Type, 
  Image as ImageIcon, 
  Layout, 
  MousePointer2, 
  ChevronDown, 
  ChevronUp, 
  Plus, 
  X, 
  GripVertical 
} from 'lucide-react';

export default function HeroEditor({ data = {}, onChange }) {
  const [openSection, setOpenSection] = useState('content');
  const [draggedIdx, setDraggedIdx] = useState(null);

  // Helper to ensure safe nested updates
  const handleNestedChange = (field, value) => {
    onChange(field, value);
  };

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const SectionHeader = ({ id, icon: Icon, title, description }) => (
    <button
      onClick={() => toggleSection(id)}
      className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors border-b border-slate-100"
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${openSection === id ? 'bg-[#b45309] text-white' : 'bg-white text-slate-500 shadow-sm'}`}>
          <Icon size={18} />
        </div>
        <div className="text-left">
          <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
          <p className="text-xs text-slate-500">{description}</p>
        </div>
      </div>
      {openSection === id ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
    </button>
  );

  // ---- GALLERY DRAG & DROP ----
  const gallery = Array.isArray(data.backgroundGallery) ? data.backgroundGallery : [];
  
  const handleDragStart = (e, index) => {
    setDraggedIdx(index);
    e.dataTransfer.effectAllowed = "move";
  };
  
  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === index) return;
    
    const newGallery = [...gallery];
    const draggedItem = newGallery[draggedIdx];
    newGallery.splice(draggedIdx, 1);
    newGallery.splice(index, 0, draggedItem);
    
    setDraggedIdx(index);
    handleNestedChange('backgroundGallery', newGallery);
  };
  
  const handleDragEnd = () => {
    setDraggedIdx(null);
  };

  const addGalleryImage = () => {
    handleNestedChange('backgroundGallery', [...gallery, '']);
  };

  const updateGalleryImage = (index, value) => {
    const newGallery = [...gallery];
    newGallery[index] = value;
    handleNestedChange('backgroundGallery', newGallery);
  };

  const removeGalleryImage = (index) => {
    const newGallery = [...gallery];
    newGallery.splice(index, 1);
    handleNestedChange('backgroundGallery', newGallery);
  };

  return (
    <div className="flex flex-col h-full font-sans">
      
      {/* 1. Typography & Content */}
      <div className="border border-slate-200 rounded-xl overflow-hidden mb-4 bg-white shadow-sm">
        <SectionHeader 
          id="content" 
          icon={Type} 
          title="Typography & Content" 
          description="Headings, subtitles, and descriptions"
        />
        {openSection === 'content' && (
          <div className="p-5 space-y-5 animate-in slide-in-from-top-2 duration-200">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Category Badge</label>
              <input
                type="text"
                value={data.hotelTagline || ''}
                onChange={(e) => handleNestedChange('hotelTagline', e.target.value)}
                placeholder="e.g. LUXURY RESORT"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#b45309] focus:border-[#b45309] outline-none text-sm text-slate-700"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Main Title</label>
                <input
                  type="text"
                  value={data.mainTitle || ''}
                  onChange={(e) => handleNestedChange('mainTitle', e.target.value)}
                  placeholder="e.g. Experience"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#b45309] focus:border-[#b45309] outline-none text-sm text-slate-700"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Highlighted Word</label>
                <input
                  type="text"
                  value={data.highlightedWord || ''}
                  onChange={(e) => handleNestedChange('highlightedWord', e.target.value)}
                  placeholder="e.g. Luxury"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#b45309] focus:border-[#b45309] outline-none text-sm text-slate-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Second Line Title</label>
              <input
                type="text"
                value={data.secondLineTitle || ''}
                onChange={(e) => handleNestedChange('secondLineTitle', e.target.value)}
                placeholder="e.g. & Tranquility"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#b45309] focus:border-[#b45309] outline-none text-sm text-slate-700"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Description / Subtitle</label>
              <textarea
                value={data.description || ''}
                onChange={(e) => handleNestedChange('description', e.target.value)}
                placeholder="Immerse yourself in unparalleled luxury..."
                rows={3}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#b45309] focus:border-[#b45309] outline-none text-sm text-slate-700 resize-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* 2. Media & Background */}
      <div className="border border-slate-200 rounded-xl overflow-hidden mb-4 bg-white shadow-sm">
        <SectionHeader 
          id="media" 
          icon={ImageIcon} 
          title="Media & Gallery" 
          description="Background videos and images"
        />
        {openSection === 'media' && (
          <div className="p-5 space-y-6 animate-in slide-in-from-top-2 duration-200">
            
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Background Video (Optional)</span>
                {data.backgroundVideo && (
                  <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full lowercase tracking-normal">active</span>
                )}
              </label>
              <input
                type="url"
                value={data.backgroundVideo || ''}
                onChange={(e) => handleNestedChange('backgroundVideo', e.target.value)}
                placeholder="https://example.com/video.mp4"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#b45309] focus:border-[#b45309] outline-none text-sm text-slate-700"
              />
              <p className="text-xs text-slate-400 mt-1.5">If a video is provided, the gallery images will be ignored.</p>
            </div>

            <div className="border-t border-slate-100 pt-5">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">Background Gallery Images</label>
                <button 
                  onClick={addGalleryImage}
                  className="flex items-center gap-1 text-xs font-semibold text-[#b45309] hover:text-[#92400e] transition-colors bg-orange-50 px-2 py-1 rounded"
                >
                  <Plus size={14} /> Add Image
                </button>
              </div>

              {gallery.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
                  <ImageIcon size={24} className="mx-auto text-slate-300 mb-2" />
                  <p className="text-sm text-slate-500">No images added yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {gallery.map((imgUrl, idx) => (
                    <div 
                      key={idx}
                      draggable
                      onDragStart={(e) => handleDragStart(e, idx)}
                      onDragOver={(e) => handleDragOver(e, idx)}
                      onDragEnd={handleDragEnd}
                      className={`flex items-center gap-3 p-3 bg-white border rounded-xl shadow-sm transition-all ${draggedIdx === idx ? 'border-[#b45309] shadow-md opacity-50' : 'border-slate-200 hover:border-slate-300'}`}
                    >
                      <div className="cursor-grab text-slate-400 hover:text-slate-600 active:cursor-grabbing p-1">
                        <GripVertical size={16} />
                      </div>
                      
                      <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                        {imgUrl ? (
                          <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon size={16} className="text-slate-400" />
                        )}
                      </div>
                      
                      <input
                        type="url"
                        value={imgUrl}
                        onChange={(e) => updateGalleryImage(idx, e.target.value)}
                        placeholder="Image URL"
                        className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#b45309] focus:border-[#b45309] outline-none text-sm text-slate-700"
                      />
                      
                      <button 
                        onClick={() => removeGalleryImage(idx)}
                        className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Remove image"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}
      </div>

      {/* 3. Action Buttons */}
      <div className="border border-slate-200 rounded-xl overflow-hidden mb-4 bg-white shadow-sm">
        <SectionHeader 
          id="actions" 
          icon={MousePointer2} 
          title="Action Buttons" 
          description="Call-to-action buttons configuration"
        />
        {openSection === 'actions' && (
          <div className="p-5 space-y-6 animate-in slide-in-from-top-2 duration-200">
            
            {/* Primary Button */}
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-[#b45309]"></div>
                <h4 className="text-sm font-bold text-slate-800">Primary Button</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Button Text</label>
                  <input
                    type="text"
                    value={data.primaryButtonText || ''}
                    onChange={(e) => handleNestedChange('primaryButtonText', e.target.value)}
                    placeholder="e.g. Discover More"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#b45309] focus:border-[#b45309] outline-none text-sm text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Route / URL</label>
                  <input
                    type="text"
                    value={data.primaryButtonLink || ''}
                    onChange={(e) => handleNestedChange('primaryButtonLink', e.target.value)}
                    placeholder="e.g. /rooms"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#b45309] focus:border-[#b45309] outline-none text-sm text-slate-700"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Updates automatically when Target Page changes.</p>
                </div>
              </div>
            </div>

            {/* Secondary Button */}
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                <h4 className="text-sm font-bold text-slate-800">Secondary Button</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Button Text</label>
                  <input
                    type="text"
                    value={data.secondaryButtonText || ''}
                    onChange={(e) => handleNestedChange('secondaryButtonText', e.target.value)}
                    placeholder="e.g. View Video"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#b45309] focus:border-[#b45309] outline-none text-sm text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Video Modal URL (Optional)</label>
                  <input
                    type="url"
                    value={data.secondaryButtonVideoUrl || ''}
                    onChange={(e) => handleNestedChange('secondaryButtonVideoUrl', e.target.value)}
                    placeholder="https://youtube.com/..."
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#b45309] focus:border-[#b45309] outline-none text-sm text-slate-700"
                  />
                </div>
              </div>
            </div>

          </div>
        )}
      </div>

    </div>
  );
}
