import React, { useState } from 'react';
import { ArrowLeft, Plus, Trash2, Image as ImageIcon, Map as MapIcon, Globe, Calendar, Navigation, Info, Settings, Eye, EyeOff, ArrowUp, ArrowDown } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import RoomManager from './RoomManager';

const AVAILABLE_ICONS = [
  "Wifi", "Waves", "Dumbbell", "Car", "Utensils", "Coffee", "Clock", "Star", 
  "ShieldCheck", "Tv", "Wind", "Bath", "Music", "Wine", "Key", "MapPin", "Heart", "ThumbsUp", "Award", "Briefcase"
];

const renderIcon = (iconName) => {
  const IconComponent = LucideIcons[iconName];
  return IconComponent ? <IconComponent size={20} /> : <LucideIcons.HelpCircle size={20} />;
};

export default function DestinationDetailsBuilder({ destination, onUpdate, onBack }) {
  const [activeTab, setActiveTab] = useState('hero');
  const [editingRoomsForHotelIdx, setEditingRoomsForHotelIdx] = useState(null);
  const [editingFacilityIdx, setEditingFacilityIdx] = useState(null);
  const details = destination.details || {};

  const handleUpdate = (section, field, value) => {
    let newDetails = {
      ...details,
      [section]: {
        ...details[section],
        [field]: value
      }
    };
    
    let updatedDest = { ...destination };
    
    // Auto generate slug when hero title changes
    if (section === 'hero' && field === 'title') {
      const autoSlug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      newDetails.seo = { ...newDetails.seo, slug: autoSlug };
      updatedDest.slug = autoSlug;
      
      if (!updatedDest.buttonLink || updatedDest.buttonLink === '#' || updatedDest.buttonLink.startsWith('/destination/')) {
        updatedDest.buttonLink = `/destination/${autoSlug}`;
      }
    }
    
    // Keep outer destination slug and buttonLink in sync if seo.slug is manually updated
    if (section === 'seo' && field === 'slug') {
      updatedDest.slug = value;
      if (!updatedDest.buttonLink || updatedDest.buttonLink === '#' || updatedDest.buttonLink.startsWith('/destination/')) {
        updatedDest.buttonLink = `/destination/${value}`;
      }
    }
    
    updatedDest.details = newDetails;
    onUpdate(updatedDest);
  };

  const handleArrayUpdate = (section, field, index, itemField, value) => {
    const arr = [...(details[section]?.[field] || [])];
    arr[index] = { ...arr[index], [itemField]: value };
    handleUpdate(section, field, arr);
  };

  const handleArrayAdd = (section, field, emptyVal) => {
    const arr = [...(details[section]?.[field] || []), emptyVal];
    handleUpdate(section, field, arr);
  };

  const handleArrayRemove = (section, field, index) => {
    const arr = [...(details[section]?.[field] || [])];
    arr.splice(index, 1);
    handleUpdate(section, field, arr);
  };

  const tabs = [
    { id: 'hero', label: 'Hero Section' },
    { id: 'highlights', label: 'Top Highlights' },
    { id: 'hotels', label: 'Hotels List' },
    { id: 'facilities', label: 'Hotel Facilities' },
    { id: 'cta', label: 'Search Availability' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'attractions', label: 'Attractions' },
    { id: 'travelInfo', label: 'Travel Information' },
    { id: 'seo', label: 'SEO & Settings' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Details Page: {destination.name}
            </h2>
            <p className="text-sm text-slate-500">Manage the dedicated page content for this destination</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-slate-100 custom-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'bg-[#1e3a5f] text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
        
        {/* HERO TAB */}
        {activeTab === 'hero' && (
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-800 mb-4">Hero Section Settings</h3>
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1">Hero Background Image URL</label>
              <input 
                type="text" 
                value={details.hero?.bgImage || ''}
                onChange={(e) => handleUpdate('hero', 'bgImage', e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-lg"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-1">Page Label (e.g. "Destination")</label>
                <input 
                  type="text" 
                  value={details.hero?.pageLabel || ''}
                  onChange={(e) => handleUpdate('hero', 'pageLabel', e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-1">Page Title</label>
                <input 
                  type="text" 
                  value={details.hero?.title || ''}
                  onChange={(e) => handleUpdate('hero', 'title', e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1">Hero Description</label>
              <textarea 
                value={details.hero?.description || ''}
                onChange={(e) => handleUpdate('hero', 'description', e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-lg min-h-[100px]"
              />
            </div>
            <div className="grid grid-cols-3 gap-4 border-t border-slate-200 pt-4 mt-4">
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-1">Back Button Text</label>
                <input 
                  type="text" 
                  value={details.hero?.backButtonText || ''}
                  onChange={(e) => handleUpdate('hero', 'backButtonText', e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-1">Hero CTA Button Text</label>
                <input 
                  type="text" 
                  value={details.hero?.ctaButtonText || ''}
                  onChange={(e) => handleUpdate('hero', 'ctaButtonText', e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-1">Hero CTA Button Link</label>
                <input 
                  type="text" 
                  value={details.hero?.ctaButtonLink || ''}
                  onChange={(e) => handleUpdate('hero', 'ctaButtonLink', e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg"
                />
              </div>
            </div>
          </div>
        )}

        {/* HIGHLIGHTS TAB */}
        {activeTab === 'highlights' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1">Section Title</label>
              <input 
                type="text" 
                value={details.topHighlights?.sectionTitle || ''}
                onChange={(e) => handleUpdate('topHighlights', 'sectionTitle', e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-slate-600">Dynamic Highlight List</label>
                <button onClick={() => handleArrayAdd('topHighlights', 'items', { name: '', icon: 'CheckCircle' })} className="text-[#b45309] text-sm font-semibold flex items-center gap-1 hover:underline">
                  <Plus size={14} /> Add Highlight
                </button>
              </div>
              <div className="space-y-3">
                {(details.topHighlights?.items || []).map((highlight, idx) => (
                  <div key={idx} className="flex gap-2 items-center bg-white p-2 rounded-lg border border-slate-200">
                    <input 
                      type="text" 
                      placeholder="Icon Name (e.g. CheckCircle)"
                      value={highlight.icon || ''}
                      onChange={(e) => handleArrayUpdate('topHighlights', 'items', idx, 'icon', e.target.value)}
                      className="w-1/3 p-2 border border-slate-300 rounded-lg text-sm"
                    />
                    <input 
                      type="text" 
                      placeholder="Highlight Name"
                      value={highlight.name || ''}
                      onChange={(e) => handleArrayUpdate('topHighlights', 'items', idx, 'name', e.target.value)}
                      className="w-full p-2 border border-slate-300 rounded-lg text-sm"
                    />
                    <button onClick={() => handleArrayRemove('topHighlights', 'items', idx)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* HOTELS LIST TAB */}
        {activeTab === 'hotels' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-1">Section Title</label>
                <input 
                  type="text" 
                  value={details.hotelsList?.sectionTitle || ''}
                  onChange={(e) => handleUpdate('hotelsList', 'sectionTitle', e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-1">Total Properties Badge Text</label>
                <input 
                  type="text" 
                  value={details.hotelsList?.totalBadge || ''}
                  onChange={(e) => handleUpdate('hotelsList', 'totalBadge', e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-semibold text-slate-600">Dynamic Hotel List</label>
                <button onClick={() => handleArrayAdd('hotelsList', 'items', { image: '', name: '', description: '', rating: '', category: '', buttonText: 'View Hotel', buttonLink: '' })} className="text-[#b45309] text-sm font-semibold flex items-center gap-1 hover:underline">
                  <Plus size={14} /> Add Hotel
                </button>
              </div>
              <div className="space-y-4">
                {(details.hotelsList?.items || []).map((hotel, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 relative">
                    <button onClick={() => handleArrayRemove('hotelsList', 'items', idx)} className="absolute top-2 right-2 text-red-500 hover:bg-red-50 p-1.5 rounded">
                      <Trash2 size={18} />
                    </button>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Hotel Name</label>
                        <input type="text" value={hotel.name || ''} onChange={(e) => handleArrayUpdate('hotelsList', 'items', idx, 'name', e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Image URL</label>
                        <input type="text" value={hotel.image || ''} onChange={(e) => handleArrayUpdate('hotelsList', 'items', idx, 'image', e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg text-sm" />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Short Description</label>
                      <textarea value={hotel.description || ''} onChange={(e) => handleArrayUpdate('hotelsList', 'items', idx, 'description', e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg text-sm h-16" />
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Rating (e.g. 4.5/5)</label>
                        <input type="text" value={hotel.rating || ''} onChange={(e) => handleArrayUpdate('hotelsList', 'items', idx, 'rating', e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Category (e.g. 5 Star)</label>
                        <input type="text" value={hotel.category || ''} onChange={(e) => handleArrayUpdate('hotelsList', 'items', idx, 'category', e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Button Text</label>
                        <input type="text" value={hotel.buttonText || ''} onChange={(e) => handleArrayUpdate('hotelsList', 'items', idx, 'buttonText', e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Button Link</label>
                        <input type="text" value={hotel.buttonLink || ''} onChange={(e) => handleArrayUpdate('hotelsList', 'items', idx, 'buttonLink', e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg text-sm" />
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center bg-slate-50 -mx-4 -mb-4 p-4 rounded-b-xl">
                      <div className="text-sm text-slate-500">
                        <span className="font-semibold text-slate-700">{hotel.rooms?.length || 0}</span> Rooms Configured
                      </div>
                      <button onClick={() => setEditingRoomsForHotelIdx(idx)} className="flex items-center gap-1.5 bg-[#b45309] hover:bg-orange-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors">
                        <Settings size={14} /> Manage Rooms
                      </button>
                    </div>
                  </div>
                ))}
                {(!details.hotelsList?.items || details.hotelsList.items.length === 0) && (
                  <p className="text-slate-500 text-sm italic">No manually curated hotels added.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* FACILITIES TAB */}
        {activeTab === 'facilities' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200">
              <div>
                <h3 className="font-semibold text-slate-800">Facilities Visibility</h3>
                <p className="text-sm text-slate-500">Show or hide facilities for this destination.</p>
              </div>
              <button
                onClick={() => handleUpdate('facilities', 'isVisible', details.facilities?.isVisible === false ? true : false)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                  details.facilities?.isVisible !== false ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-600'
                }`}
              >
                {details.facilities?.isVisible !== false ? <Eye size={18} /> : <EyeOff size={18} />}
                {details.facilities?.isVisible !== false ? 'Visible' : 'Hidden'}
              </button>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4">
              <h3 className="font-semibold text-slate-800">Section Configuration</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-1">Section Title</label>
                  <input type="text" value={details.facilities?.sectionTitle || ''} onChange={(e) => handleUpdate('facilities', 'sectionTitle', e.target.value)} className="w-full p-2.5 border border-slate-300 rounded-lg" placeholder="e.g. Hotel Facilities" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-1">Badge Text</label>
                  <input type="text" value={details.facilities?.badgeText || ''} onChange={(e) => handleUpdate('facilities', 'badgeText', e.target.value)} className="w-full p-2.5 border border-slate-300 rounded-lg" placeholder="e.g. Premium Amenities" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-slate-600 mb-1">Section Subtitle</label>
                  <textarea value={details.facilities?.sectionSubtitle || ''} onChange={(e) => handleUpdate('facilities', 'sectionSubtitle', e.target.value)} className="w-full p-2.5 border border-slate-300 rounded-lg min-h-[60px]" placeholder="Description..." />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-800">Facilities Cards</h3>
                <button onClick={() => handleArrayAdd('facilities', 'items', { id: `fac-${Date.now()}`, name: 'New Facility', icon: 'Star', gradient: 'linear-gradient(135deg, #0ea5e9, #6366f1)', status: 'Active', displayOrder: (details.facilities?.items?.length || 0) + 1 })} className="flex items-center gap-1.5 text-sm bg-[#b45309] text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-orange-700">
                  <Plus size={16} /> Add Facility
                </button>
              </div>
              
              <div className="space-y-3">
                {(details.facilities?.items || []).map((item, idx) => (
                  <div key={item.id || idx} className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                    {editingFacilityIdx !== idx ? (
                      <div className="flex items-center p-3 gap-4">
                        <div className="flex flex-col gap-1 text-slate-400">
                          <button onClick={() => {
                            const newItems = [...(details.facilities.items || [])];
                            if (idx > 0) { [newItems[idx-1], newItems[idx]] = [newItems[idx], newItems[idx-1]]; }
                            newItems.forEach((i, x) => i.displayOrder = x + 1);
                            handleUpdate('facilities', 'items', newItems);
                          }} disabled={idx === 0} className="hover:text-slate-700 disabled:opacity-30"><ArrowUp size={16} /></button>
                          <button onClick={() => {
                            const newItems = [...(details.facilities.items || [])];
                            if (idx < newItems.length - 1) { [newItems[idx+1], newItems[idx]] = [newItems[idx], newItems[idx+1]]; }
                            newItems.forEach((i, x) => i.displayOrder = x + 1);
                            handleUpdate('facilities', 'items', newItems);
                          }} disabled={idx === (details.facilities?.items?.length || 0) - 1} className="hover:text-slate-700 disabled:opacity-30"><ArrowDown size={16} /></button>
                        </div>
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white shrink-0" style={{ background: item.gradient || '#333' }}>
                          {React.createElement(LucideIcons[item.icon] || LucideIcons.HelpCircle, { size: 20 })}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-slate-800">{item.name}</h4>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${item.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-600'}`}>{item.status || 'Active'}</span>
                          </div>
                          <p className="text-xs text-slate-500 line-clamp-1">{item.desc}</p>
                        </div>
                        <div className="flex items-center gap-2 pr-2">
                          <button onClick={() => setEditingFacilityIdx(idx)} className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:text-[#b45309]"><Settings size={16} /></button>
                          <button onClick={() => handleArrayRemove('facilities', 'items', idx)} className="p-2 bg-white border border-slate-200 rounded-lg text-red-500 hover:bg-red-50"><Trash2 size={16} /></button>
                        </div>
                      </div>
                    ) : (
                      <div className="p-5 bg-white border-b-4 border-[#b45309]">
                        <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
                          <h4 className="font-bold text-[#1e3a5f]">Editing Facility</h4>
                          <button onClick={() => setEditingFacilityIdx(null)} className="flex items-center gap-1 bg-[#1e3a5f] text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#0f2942]">Done</button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div><label className="block text-xs font-semibold text-slate-500 mb-1">Name</label><input type="text" value={item.name || ''} onChange={(e) => handleArrayUpdate('facilities', 'items', idx, 'name', e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg text-sm" /></div>
                          <div><label className="block text-xs font-semibold text-slate-500 mb-1">Status</label><select value={item.status || 'Active'} onChange={(e) => handleArrayUpdate('facilities', 'items', idx, 'status', e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg text-sm bg-white"><option value="Active">Active</option><option value="Inactive">Inactive</option></select></div>
                          <div className="sm:col-span-2"><label className="block text-xs font-semibold text-slate-500 mb-1">Description</label><textarea value={item.desc || ''} onChange={(e) => handleArrayUpdate('facilities', 'items', idx, 'desc', e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg text-sm h-16" /></div>
                          
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
                                      onClick={() => handleArrayUpdate('facilities', 'items', idx, 'icon', iconName)}
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
                                onChange={(e) => handleArrayUpdate('facilities', 'items', idx, 'gradient', e.target.value)} 
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
                                onChange={(e) => handleArrayUpdate('facilities', 'items', idx, 'iconPosition', e.target.value)}
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
                {(!details.facilities?.items || details.facilities.items.length === 0) && <p className="text-slate-500 text-sm italic py-4 text-center">No facilities added yet.</p>}
              </div>
            </div>
          </div>
        )}

        {/* CTA TAB */}
        {activeTab === 'cta' && (
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-800 mb-4">Search Availability Card</h3>
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1">Card Title</label>
              <input type="text" value={details.ctaBox?.title || ''} onChange={(e) => handleUpdate('ctaBox', 'title', e.target.value)} className="w-full p-2.5 border border-slate-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1">Card Description</label>
              <textarea value={details.ctaBox?.description || ''} onChange={(e) => handleUpdate('ctaBox', 'description', e.target.value)} className="w-full p-2.5 border border-slate-300 rounded-lg min-h-[80px]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-1">Button Text</label>
                <input type="text" value={details.ctaBox?.buttonText || ''} onChange={(e) => handleUpdate('ctaBox', 'buttonText', e.target.value)} className="w-full p-2.5 border border-slate-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-1">Button Link</label>
                <input type="text" value={details.ctaBox?.buttonLink || ''} onChange={(e) => handleUpdate('ctaBox', 'buttonLink', e.target.value)} className="w-full p-2.5 border border-slate-300 rounded-lg" />
              </div>
            </div>
          </div>
        )}

        {/* GALLERY TAB */}
        {activeTab === 'gallery' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-semibold text-slate-600">Gallery Images</label>
              <button onClick={() => handleArrayAdd('gallery', 'items', { image: '', title: '' })} className="text-[#b45309] text-sm font-semibold flex items-center gap-1 hover:underline">
                <Plus size={14} /> Add Image
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(details.gallery?.items || []).map((item, idx) => (
                <div key={idx} className="bg-white p-3 border border-slate-200 rounded-xl space-y-2">
                  <input type="text" placeholder="Image URL" value={item.image || ''} onChange={(e) => handleArrayUpdate('gallery', 'items', idx, 'image', e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg text-sm" />
                  <input type="text" placeholder="Image Title (Optional)" value={item.title || ''} onChange={(e) => handleArrayUpdate('gallery', 'items', idx, 'title', e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg text-sm" />
                  <div className="flex justify-between items-center">
                    <div className="h-20 w-32 bg-slate-100 rounded overflow-hidden">
                      {item.image && <img src={item.image} alt="" className="w-full h-full object-cover" />}
                    </div>
                    <button onClick={() => handleArrayRemove('gallery', 'items', idx)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ATTRACTIONS TAB */}
        {activeTab === 'attractions' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-semibold text-slate-600">Attractions / Things to Do</label>
              <button onClick={() => handleArrayAdd('attractions', 'items', { image: '', title: '', description: '' })} className="text-[#b45309] text-sm font-semibold flex items-center gap-1 hover:underline">
                <Plus size={14} /> Add Attraction
              </button>
            </div>
            <div className="space-y-4">
              {(details.attractions?.items || []).map((attr, idx) => (
                <div key={idx} className="bg-white p-4 border border-slate-200 rounded-xl relative flex gap-4">
                  <div className="w-32 shrink-0 space-y-2">
                    <div className="h-24 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                      {attr.image ? <img src={attr.image} alt="" className="w-full h-full object-cover" /> : <ImageIcon className="w-full h-full p-6 text-slate-300" />}
                    </div>
                    <input type="text" placeholder="Image URL" value={attr.image || ''} onChange={(e) => handleArrayUpdate('attractions', 'items', idx, 'image', e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg text-xs" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between">
                      <input type="text" placeholder="Attraction Title" value={attr.title || ''} onChange={(e) => handleArrayUpdate('attractions', 'items', idx, 'title', e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg text-sm font-bold" />
                      <button onClick={() => handleArrayRemove('attractions', 'items', idx)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg ml-2">
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <textarea placeholder="Description" value={attr.description || ''} onChange={(e) => handleArrayUpdate('attractions', 'items', idx, 'description', e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg text-sm h-16" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TRAVEL INFO TAB */}
        {activeTab === 'travelInfo' && (
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-800 mb-4">Travel Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-600 mb-1"><Calendar size={16}/> Best Time to Visit</label>
                <input type="text" value={details.travelInfo?.bestTimeToVisit || ''} onChange={(e) => handleUpdate('travelInfo', 'bestTimeToVisit', e.target.value)} className="w-full p-2.5 border border-slate-300 rounded-lg" />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-600 mb-1"><Globe size={16}/> Weather Overview</label>
                <input type="text" value={details.travelInfo?.weather || ''} onChange={(e) => handleUpdate('travelInfo', 'weather', e.target.value)} className="w-full p-2.5 border border-slate-300 rounded-lg" />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-600 mb-1"><Navigation size={16}/> Transportation</label>
                <textarea value={details.travelInfo?.transportation || ''} onChange={(e) => handleUpdate('travelInfo', 'transportation', e.target.value)} className="w-full p-2.5 border border-slate-300 rounded-lg h-24" />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-600 mb-1"><Info size={16}/> Local Tips</label>
                <textarea value={details.travelInfo?.localTips || ''} onChange={(e) => handleUpdate('travelInfo', 'localTips', e.target.value)} className="w-full p-2.5 border border-slate-300 rounded-lg h-24" />
              </div>
            </div>
          </div>
        )}

        {/* SEO TAB */}
        {activeTab === 'seo' && (
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-800 mb-4">SEO & Page Settings</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-1">Page Slug</label>
                <input type="text" value={details.seo?.slug || ''} onChange={(e) => handleUpdate('seo', 'slug', e.target.value)} className="w-full p-2.5 border border-slate-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-1">Status (Published/Draft)</label>
                <select value={details.seo?.status || 'Published'} onChange={(e) => handleUpdate('seo', 'status', e.target.value)} className="w-full p-2.5 border border-slate-300 rounded-lg">
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1">Meta Title</label>
              <input type="text" value={details.seo?.metaTitle || ''} onChange={(e) => handleUpdate('seo', 'metaTitle', e.target.value)} className="w-full p-2.5 border border-slate-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1">Meta Description</label>
              <textarea value={details.seo?.metaDescription || ''} onChange={(e) => handleUpdate('seo', 'metaDescription', e.target.value)} className="w-full p-2.5 border border-slate-300 rounded-lg min-h-[100px]" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1">Featured Image URL (For Social Sharing)</label>
              <input type="text" value={details.seo?.featuredImage || ''} onChange={(e) => handleUpdate('seo', 'featuredImage', e.target.value)} className="w-full p-2.5 border border-slate-300 rounded-lg" />
            </div>
          </div>
        )}
      </div>

      {editingRoomsForHotelIdx !== null && (
        <RoomManager
          hotel={details.hotelsList.items[editingRoomsForHotelIdx]}
          onUpdateRooms={(newRooms) => {
            const arr = [...(details.hotelsList?.items || [])];
            arr[editingRoomsForHotelIdx] = { ...arr[editingRoomsForHotelIdx], rooms: newRooms };
            handleUpdate('hotelsList', 'items', arr);
          }}
          onClose={() => setEditingRoomsForHotelIdx(null)}
        />
      )}
    </div>
  );
}
