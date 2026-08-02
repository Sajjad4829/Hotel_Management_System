import React, { useState, useRef } from 'react';
import { Settings, Plus, Search, Trash2, Copy, GripVertical, ChevronDown, ChevronUp, Image as ImageIcon, MapPin, Eye, EyeOff, Edit3 } from 'lucide-react';
import DestinationDetailsBuilder from './DestinationDetailsBuilder';

export default function FeaturedCollectionEditor({ data, onChange }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [editingDetailsId, setEditingDetailsId] = useState(null); // Deep dive mode
  
  // Drag and Drop state
  const dragItem = useRef();
  const dragOverItem = useRef();

  const handleDragStart = (e, index) => {
    dragItem.current = index;
    // Optional: make it look slightly transparent while dragging
    e.currentTarget.style.opacity = '0.5';
  };

  const handleDragEnter = (e, index) => {
    dragOverItem.current = index;
  };

  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = '1';
    if (dragItem.current !== undefined && dragOverItem.current !== undefined && dragItem.current !== dragOverItem.current) {
      const newDestinations = [...(data.destinations || [])];
      const draggedItemContent = newDestinations[dragItem.current];
      newDestinations.splice(dragItem.current, 1);
      newDestinations.splice(dragOverItem.current, 0, draggedItemContent);
      onChange('destinations', newDestinations);
    }
    dragItem.current = null;
    dragOverItem.current = null;
  };

  const handleUpdateSection = (field, value) => {
    onChange(field, value);
  };

  const handleUpdateDestination = (id, field, value) => {
    const newDestinations = (data.destinations || []).map(dest => {
      if (dest.id === id) {
        let updatedDest = { ...dest, [field]: value };
        
        // Auto-generate slug and update buttonLink when name changes
        if (field === 'name') {
          const autoSlug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
          updatedDest.slug = autoSlug;
          
          if (updatedDest.details && updatedDest.details.seo) {
            updatedDest.details.seo.slug = autoSlug;
          }
          if (!updatedDest.buttonLink || updatedDest.buttonLink === '#' || updatedDest.buttonLink.startsWith('/destination/')) {
            updatedDest.buttonLink = `/destination/${autoSlug}`;
          }
        }
        
        // Sync buttonLink if slug is manually edited
        if (field === 'slug') {
          if (updatedDest.details && updatedDest.details.seo) {
            updatedDest.details.seo.slug = value;
          }
          if (!updatedDest.buttonLink || updatedDest.buttonLink === '#' || updatedDest.buttonLink.startsWith('/destination/')) {
            updatedDest.buttonLink = `/destination/${value}`;
          }
        }
        
        return updatedDest;
      }
      return dest;
    });
    onChange('destinations', newDestinations);
  };

  const handleUpdateFullDestination = (updatedDest) => {
    const newDestinations = (data.destinations || []).map(dest => {
      if (dest.id === updatedDest.id) {
        return updatedDest;
      }
      return dest;
    });
    onChange('destinations', newDestinations);
  };

  const handleAddDestination = () => {
    const newId = `dest-${Date.now()}`;
    const newDestinations = [...(data.destinations || [])];
    newDestinations.unshift({
      id: newId,
      name: 'New Destination',
      slug: 'new-destination',
      description: 'Enter a short description here.',
      image: 'https://placehold.co/600x400?text=New+Destination',
      highlights: 'Highlight 1, Highlight 2',
      hotelsCount: 0,
      buttonText: 'Explore',
      buttonLink: '#',
      isVisible: true,
      details: {
        seo: { metaTitle: 'New Destination', metaDescription: '' },
        hero: { bgImage: 'https://placehold.co/1920x800', title: 'New Destination', subtitle: 'Explore' },
        description: 'Enter a short description here.',
        highlights: ['Highlight 1', 'Highlight 2'],
        gallery: [],
        nearbyAttractions: [],
        mapUrl: '',
        ctaBox: { title: 'Ready to explore?', subtitle: 'Book your stay today.', buttonText: 'Search Availability', buttonLink: '/search-results' },
        hotelsList: { title: 'Hotels in New Destination', isVisible: true }
      }
    });
    onChange('destinations', newDestinations);
    setExpandedId(newId);
    setSearchQuery('');
  };

  const handleDuplicate = (dest) => {
    const newId = `dest-${Date.now()}`;
    const newDestinations = [...(data.destinations || [])];
    const index = newDestinations.findIndex(d => d.id === dest.id);
    newDestinations.splice(index + 1, 0, { ...dest, id: newId, name: `${dest.name} (Copy)` });
    onChange('destinations', newDestinations);
  };

  const handleDelete = (id) => {
    if(window.confirm('Are you sure you want to delete this destination?')) {
      const newDestinations = (data.destinations || []).filter(d => d.id !== id);
      onChange('destinations', newDestinations);
      if (expandedId === id) setExpandedId(null);
    }
  };

  const renderToggle = (key, label) => {
    const isChecked = data[key] !== false;
    return (
      <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl mb-3">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        <button
          onClick={() => handleUpdateSection(key, !isChecked)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isChecked ? 'bg-[#b45309]' : 'bg-slate-300'}`}
        >
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isChecked ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
      </div>
    );
  };

  const destinations = data.destinations || [];

  // Deep dive editing mode
  if (editingDetailsId) {
    const destToEdit = destinations.find(d => d.id === editingDetailsId);
    if (destToEdit) {
      return (
        <DestinationDetailsBuilder 
          destination={destToEdit} 
          onUpdate={handleUpdateFullDestination}
          onBack={() => setEditingDetailsId(null)}
        />
      );
    }
  }

  const filteredDestinations = destinations.filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-8">
      
      {/* Section Global Settings */}
      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Settings size={18} className="text-[#b45309]" /> Section Settings
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            {renderToggle('isVisible', 'Show Featured Collection Section')}
            
            <label className="block text-xs font-semibold text-slate-500 mb-1 mt-4">Section Title</label>
            <input
              type="text"
              value={data.title || ''}
              onChange={(e) => handleUpdateSection('title', e.target.value)}
              className="w-full p-2.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#b45309] outline-none mb-4"
            />
            
            <label className="block text-xs font-semibold text-slate-500 mb-1">Section Subtitle</label>
            <textarea
              value={data.subtitle || ''}
              onChange={(e) => handleUpdateSection('subtitle', e.target.value)}
              className="w-full p-2.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#b45309] outline-none min-h-[80px]"
            />
          </div>
          <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 h-fit">
            <p className="text-sm text-slate-600 mb-2">
              <strong>Destination Management</strong>
            </p>
            <p className="text-xs text-slate-500">
              Drag and drop the cards below to reorder them. Hidden destinations will not appear on the frontend. The tags should be comma separated.
            </p>
          </div>
        </div>
      </div>

      {/* Destinations List */}
      <div>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <MapPin size={18} className="text-[#b45309]" /> Destinations ({destinations.length})
          </h3>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-[#b45309] outline-none w-full md:w-64"
              />
            </div>
            <button 
              onClick={handleAddDestination}
              className="flex items-center gap-1 bg-[#b45309] hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap"
            >
              <Plus size={16} /> Add New
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {filteredDestinations.length === 0 ? (
            <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-slate-500">
              No destinations found.
            </div>
          ) : (
            filteredDestinations.map((dest, index) => {
              const isExpanded = expandedId === dest.id;
              
              return (
                <div 
                  key={dest.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragEnter={(e) => handleDragEnter(e, index)}
                  onDragEnd={handleDragEnd}
                  onDragOver={(e) => e.preventDefault()}
                  className={`bg-white border ${isExpanded ? 'border-[#b45309]' : 'border-slate-200'} rounded-xl shadow-sm overflow-hidden transition-all`}
                >
                  {/* Header (Always Visible) */}
                  <div className="flex items-center p-3 gap-3 bg-slate-50 hover:bg-slate-100 transition-colors">
                    <div className="cursor-grab text-slate-400 hover:text-slate-600 px-1">
                      <GripVertical size={18} />
                    </div>
                    
                    <div className="w-12 h-12 rounded bg-slate-200 overflow-hidden shrink-0">
                      {dest.image ? (
                        <img src={dest.image} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="w-full h-full p-3 text-slate-400" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0" onClick={() => setExpandedId(isExpanded ? null : dest.id)}>
                      <h4 className={`font-semibold truncate cursor-pointer ${!dest.isVisible ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                        {dest.name}
                      </h4>
                      <p className="text-xs text-slate-500">{dest.hotelsCount} Properties</p>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button 
                        onClick={() => handleUpdateDestination(dest.id, 'isVisible', !dest.isVisible)}
                        className={`p-1.5 rounded hover:bg-slate-200 transition-colors ${dest.isVisible ? 'text-green-600' : 'text-slate-400'}`}
                        title={dest.isVisible ? "Visible" : "Hidden"}
                      >
                        {dest.isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
                      </button>
                      <button 
                        onClick={() => handleDuplicate(dest)}
                        className="p-1.5 rounded hover:bg-slate-200 text-slate-500 transition-colors"
                        title="Duplicate"
                      >
                        <Copy size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(dest.id)}
                        className="p-1.5 rounded hover:bg-red-100 text-red-500 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                      <button 
                        onClick={() => setExpandedId(isExpanded ? null : dest.id)}
                        className="p-1.5 rounded hover:bg-slate-200 text-slate-500 transition-colors ml-1"
                      >
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                    </div>
                  </div>

                  {/* Body (Expanded Form) */}
                  {isExpanded && (
                    <div className="p-5 border-t border-slate-200 bg-white">
                      
                      {/* NEW: Dedicated Details Builder Button and Status */}
                      <div className="mb-6 flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-200">
                        <div className="flex items-center gap-3">
                          <label className="block text-sm font-semibold text-slate-700">Status:</label>
                          <select
                            value={dest.isVisible !== false ? 'active' : 'inactive'}
                            onChange={(e) => handleUpdateDestination(dest.id, 'isVisible', e.target.value === 'active')}
                            className="p-1.5 text-sm border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#b45309] outline-none font-medium"
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        </div>
                        <button 
                          onClick={() => setEditingDetailsId(dest.id)}
                          className="flex items-center gap-2 bg-[#1e3a5f] hover:bg-[#0f2942] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm"
                        >
                          <Edit3 size={16} /> Edit Destination Details Page
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Left Col */}
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-semibold text-slate-500 mb-1">Destination Name</label>
                              <input
                                type="text"
                                value={dest.name}
                                onChange={(e) => handleUpdateDestination(dest.id, 'name', e.target.value)}
                                className="w-full p-2 text-sm border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#b45309] outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-slate-500 mb-1">Slug (Destination Name)</label>
                              <input
                                type="text"
                                value={dest.slug || ''}
                                onChange={(e) => handleUpdateDestination(dest.id, 'slug', e.target.value)}
                                placeholder="e.g. coxs-bazar"
                                className="w-full p-2 text-sm border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#b45309] outline-none"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-semibold text-slate-500 mb-1">Featured Image URL</label>
                              <input
                                type="text"
                                value={dest.image}
                                onChange={(e) => handleUpdateDestination(dest.id, 'image', e.target.value)}
                                className="w-full p-2 text-sm border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#b45309] outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-slate-500 mb-1">Property Count</label>
                              <input
                                type="number"
                                min="0"
                                value={dest.hotelsCount}
                                onChange={(e) => handleUpdateDestination(dest.id, 'hotelsCount', parseInt(e.target.value) || 0)}
                                className="w-full p-2 text-sm border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#b45309] outline-none"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-1">Short Description</label>
                            <textarea
                              value={dest.description}
                              onChange={(e) => handleUpdateDestination(dest.id, 'description', e.target.value)}
                              className="w-full p-2 text-sm border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#b45309] outline-none h-24"
                            />
                          </div>
                        </div>

                        {/* Right Col */}
                        <div className="space-y-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-1">Attractions (Multiple, comma separated)</label>
                            <input
                              type="text"
                              value={dest.highlights || ''}
                              onChange={(e) => handleUpdateDestination(dest.id, 'highlights', e.target.value)}
                              placeholder="e.g. Beach, Forest, Resort"
                              className="w-full p-2 text-sm border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#b45309] outline-none"
                            />
                          </div>

                          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mt-4">
                            <h5 className="text-xs font-bold text-slate-600 mb-3 border-b border-slate-200 pb-2">Button Setup</h5>
                            <div className="space-y-3">
                              <div>
                                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Button Text</label>
                                <input
                                  type="text"
                                  value={dest.buttonText || ''}
                                  onChange={(e) => handleUpdateDestination(dest.id, 'buttonText', e.target.value)}
                                  className="w-full p-2 text-sm border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#b45309] outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Button URL</label>
                                <input
                                  type="text"
                                  value={dest.buttonLink || ''}
                                  onChange={(e) => handleUpdateDestination(dest.id, 'buttonLink', e.target.value)}
                                  className="w-full p-2 text-sm border border-slate-200 rounded-lg focus:ring-1 focus:ring-[#b45309] outline-none"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
