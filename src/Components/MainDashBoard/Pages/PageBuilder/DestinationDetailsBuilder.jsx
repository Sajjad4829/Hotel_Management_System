import React, { useState } from 'react';
import { ArrowLeft, Plus, Trash2, Image as ImageIcon, Map as MapIcon, Globe, Calendar, Navigation, Info, Settings } from 'lucide-react';
import RoomManager from './RoomManager';

export default function DestinationDetailsBuilder({ destination, onUpdate, onBack }) {
  const [activeTab, setActiveTab] = useState('hero');
  const [editingRoomsForHotelIdx, setEditingRoomsForHotelIdx] = useState(null);
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
