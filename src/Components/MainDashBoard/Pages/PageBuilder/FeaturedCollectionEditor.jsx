import React, { useState, useRef } from 'react';
import { Settings, Plus, Search, Trash2, GripVertical, ChevronDown, ChevronUp, Image as ImageIcon, MapPin, Eye, EyeOff, Hotel, Check } from 'lucide-react';
import { usePropertyContext } from '../../../../Context/PropertyContext';
import { useRoomContext } from '../../../../Context/RoomContext';

export default function FeaturedCollectionEditor({ data, onChange }) {
  const [expandedId, setExpandedId] = useState(null);
  
  const { destinations: masterDestinations, hotels: masterHotels } = usePropertyContext();
  const { rooms } = useRoomContext();
  
  // Drag and Drop state
  const dragItem = useRef();
  const dragOverItem = useRef();

  const handleDragStart = (e, index) => {
    dragItem.current = index;
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

  const handleUpdateFeaturedDest = (id, field, value) => {
    const newDestinations = (data.destinations || []).map(dest => {
      if (dest.id === id) {
        return { ...dest, [field]: value };
      }
      return dest;
    });
    onChange('destinations', newDestinations);
  };

  const handleUpdateFeaturedDestMulti = (id, updates) => {
    const newDestinations = (data.destinations || []).map(dest => {
      if (dest.id === id) {
        return { ...dest, ...updates };
      }
      return dest;
    });
    onChange('destinations', newDestinations);
  };

  const handleAddDestination = () => {
    const newId = `featured-${Date.now()}`;
    const newDestinations = [...(data.destinations || [])];
    newDestinations.unshift({
      id: newId,
      destinationId: "", // Master destination ID
      isVisible: true,
      includedHotels: [], // Array of hotel IDs
    });
    onChange('destinations', newDestinations);
    setExpandedId(newId);
  };

  const handleDelete = (id) => {
    if(window.confirm('Are you sure you want to remove this destination from the homepage?')) {
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

  const featuredDestinations = data.destinations || [];

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
              <strong>Curated Destinations Module</strong>
            </p>
            <p className="text-xs text-slate-500">
              Select existing Destinations from your master Property database to feature on the homepage. Then, select which hotels within that destination should appear.
            </p>
          </div>
        </div>
      </div>

      {/* Destinations List */}
      <div>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <MapPin size={18} className="text-[#b45309]" /> Featured Destinations ({featuredDestinations.length})
          </h3>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleAddDestination}
              className="flex items-center gap-1 bg-[#b45309] hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap"
            >
              <Plus size={16} /> Add Featured Destination
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {featuredDestinations.length === 0 ? (
            <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-slate-500">
              No featured destinations added yet.
            </div>
          ) : (
            featuredDestinations.map((featDest, index) => {
              const isExpanded = expandedId === featDest.id;
              const masterDest = masterDestinations.find(d => String(d.id) === String(featDest.destinationId));
              
              const destinationName = masterDest ? masterDest.name : 'Select a Destination...';
              const destinationImage = masterDest ? masterDest.image : null;
              
              const availableHotels = masterDest 
                ? masterHotels.filter(h => String(h.destinationId) === String(masterDest.id) && h.isActive)
                : [];
              
              return (
                <div 
                  key={featDest.id}
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
                      {destinationImage ? (
                        <img src={destinationImage} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="w-full h-full p-3 text-slate-400" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0" onClick={() => setExpandedId(isExpanded ? null : featDest.id)}>
                      <h4 className={`font-semibold truncate cursor-pointer ${!featDest.isVisible ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                        {destinationName}
                      </h4>
                      <p className="text-xs text-slate-500">{featDest.includedHotels?.length || 0} Hotels Featured</p>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button 
                        onClick={() => handleUpdateFeaturedDest(featDest.id, 'isVisible', !featDest.isVisible)}
                        className={`p-1.5 rounded hover:bg-slate-200 transition-colors ${featDest.isVisible ? 'text-green-600' : 'text-slate-400'}`}
                        title={featDest.isVisible ? "Visible" : "Hidden"}
                      >
                        {featDest.isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
                      </button>
                      <button 
                        onClick={() => handleDelete(featDest.id)}
                        className="p-1.5 rounded hover:bg-red-100 text-red-500 transition-colors"
                        title="Remove"
                      >
                        <Trash2 size={16} />
                      </button>
                      <button 
                        onClick={() => setExpandedId(isExpanded ? null : featDest.id)}
                        className="p-1.5 rounded hover:bg-slate-200 text-slate-500 transition-colors ml-1"
                      >
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                    </div>
                  </div>

                  {/* Body (Expanded Form) */}
                  {isExpanded && (
                    <div className="p-5 border-t border-slate-200 bg-white">
                      
                      <div className="mb-6 flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-200">
                        <div className="flex items-center gap-3 w-full max-w-md">
                          <label className="block text-sm font-semibold text-slate-700">Master Destination:</label>
                          <select
                            value={featDest.destinationId || ''}
                            onChange={(e) => {
                              handleUpdateFeaturedDestMulti(featDest.id, {
                                destinationId: e.target.value,
                                includedHotels: [] // Reset included hotels when destination changes
                              });
                            }}
                            className="flex-1 p-2 text-sm border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#b45309] outline-none font-medium"
                          >
                            <option value="">-- Select Destination --</option>
                            {masterDestinations.filter(d => d.isActive).map(d => (
                              <option key={d.id} value={d.id}>{d.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {featDest.destinationId && (
                        <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                          <h5 className="text-sm font-bold text-blue-800 mb-3 border-b border-blue-200 pb-2 flex items-center gap-2">
                            <Hotel size={16} /> Select Hotels to Feature from {masterDest?.name}
                          </h5>
                          
                          <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                            {availableHotels.length === 0 ? (
                              <div className="text-sm text-slate-500 italic p-2">
                                No active hotels found for this destination. Add hotels in Property Management first.
                              </div>
                            ) : (
                              availableHotels.map((hotel) => {
                                const isSelected = (featDest.includedHotels || []).some(id => String(id) === String(hotel.id));
                                return (
                                  <label key={hotel.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${isSelected ? 'bg-blue-50 border-blue-300' : 'bg-white border-slate-200 hover:bg-slate-50'}`}>
                                    <div className={`flex items-center justify-center w-5 h-5 rounded border ${isSelected ? 'bg-blue-600 border-blue-600' : 'bg-white border-slate-300'}`}>
                                      {isSelected && <Check size={14} className="text-white" />}
                                    </div>
                                    <input 
                                      type="checkbox" 
                                      className="hidden"
                                      checked={isSelected}
                                      onChange={(e) => {
                                        const curr = featDest.includedHotels || [];
                                        let next = [];
                                        if (e.target.checked) {
                                          next = [...curr, String(hotel.id)];
                                        } else {
                                          next = curr.filter(id => String(id) !== String(hotel.id));
                                        }
                                        handleUpdateFeaturedDest(featDest.id, 'includedHotels', next);
                                      }}
                                    />
                                    <img src={hotel.image} alt={hotel.name} className="w-10 h-10 object-cover rounded shadow-sm" />
                                    <div>
                                      <div className="text-sm font-bold text-slate-800">{hotel.name}</div>
                                      <div className="text-xs text-slate-500">{hotel.category} • {hotel.rating}</div>
                                    </div>
                                  </label>
                                );
                              })
                            )}
                          </div>
                        </div>
                      )}
                      
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
