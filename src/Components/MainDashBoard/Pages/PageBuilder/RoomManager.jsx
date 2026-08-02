import React, { useState } from 'react';
import { X, Plus, Trash2, Edit3, Save, Image as ImageIcon } from 'lucide-react';

export default function RoomManager({ hotel, onUpdateRooms, onClose }) {
  const [rooms, setRooms] = useState(hotel.rooms || []);
  const [editingRoomIdx, setEditingRoomIdx] = useState(null);
  
  // Create a blank room
  const createNewRoom = () => ({
    id: `room-${Date.now()}`,
    name: 'New Room',
    type: 'Standard',
    images: ['https://placehold.co/600x400?text=Room'],
    pricePerNight: 100,
    discountPrice: 0,
    size: '300 sq ft',
    bedType: '1 Queen Bed',
    maxGuests: 2,
    availableCount: 5,
    description: 'A comfortable room.',
    amenities: ['WiFi', 'Air Conditioning', 'TV'],
    features: 'City View',
    cancellationPolicy: 'Free cancellation up to 24 hours before check-in',
    breakfastIncluded: false,
    status: 'Available',
    displayOrder: rooms.length + 1,
    bookButtonText: 'Book Now',
    bookButtonLink: '/booking'
  });

  const handleAddRoom = () => {
    const newRooms = [...rooms, createNewRoom()];
    setRooms(newRooms);
    onUpdateRooms(newRooms);
    setEditingRoomIdx(newRooms.length - 1); // Open the new room for editing
  };

  const handleRemoveRoom = (idx) => {
    const newRooms = [...rooms];
    newRooms.splice(idx, 1);
    setRooms(newRooms);
    onUpdateRooms(newRooms);
  };

  const handleRoomFieldChange = (idx, field, value) => {
    const newRooms = [...rooms];
    newRooms[idx] = { ...newRooms[idx], [field]: value };
    setRooms(newRooms);
    onUpdateRooms(newRooms);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4 sm:p-8">
      <div className="bg-white w-full max-w-5xl h-full max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50 shrink-0">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Room Management</h2>
            <p className="text-sm text-slate-500">Managing rooms for <span className="font-semibold text-slate-700">{hotel.name || 'Unnamed Hotel'}</span></p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
          {editingRoomIdx !== null ? (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                <h3 className="text-lg font-bold text-[#1e3a5f]">Edit Room: {rooms[editingRoomIdx].name}</h3>
                <button onClick={() => setEditingRoomIdx(null)} className="flex items-center gap-2 bg-[#1e3a5f] hover:bg-[#0f2942] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                  <Save size={16} /> Done Editing
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Basic Info */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-700 border-b pb-2">Basic Info</h4>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Room Name</label>
                    <input type="text" value={rooms[editingRoomIdx].name || ''} onChange={e => handleRoomFieldChange(editingRoomIdx, 'name', e.target.value)} className="w-full p-2 text-sm border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#b45309] outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Room Type</label>
                    <input type="text" value={rooms[editingRoomIdx].type || ''} onChange={e => handleRoomFieldChange(editingRoomIdx, 'type', e.target.value)} className="w-full p-2 text-sm border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#b45309] outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Price / Night</label>
                      <input type="number" value={rooms[editingRoomIdx].pricePerNight || 0} onChange={e => handleRoomFieldChange(editingRoomIdx, 'pricePerNight', parseFloat(e.target.value) || 0)} className="w-full p-2 text-sm border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#b45309] outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Discount Price</label>
                      <input type="number" value={rooms[editingRoomIdx].discountPrice || 0} onChange={e => handleRoomFieldChange(editingRoomIdx, 'discountPrice', parseFloat(e.target.value) || 0)} className="w-full p-2 text-sm border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#b45309] outline-none" />
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-700 border-b pb-2">Room Details</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Room Size</label>
                      <input type="text" value={rooms[editingRoomIdx].size || ''} onChange={e => handleRoomFieldChange(editingRoomIdx, 'size', e.target.value)} className="w-full p-2 text-sm border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#b45309] outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Max Guests</label>
                      <input type="number" value={rooms[editingRoomIdx].maxGuests || 1} onChange={e => handleRoomFieldChange(editingRoomIdx, 'maxGuests', parseInt(e.target.value) || 1)} className="w-full p-2 text-sm border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#b45309] outline-none" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Bed Type</label>
                      <input type="text" value={rooms[editingRoomIdx].bedType || ''} onChange={e => handleRoomFieldChange(editingRoomIdx, 'bedType', e.target.value)} className="w-full p-2 text-sm border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#b45309] outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Available Count</label>
                      <input type="number" value={rooms[editingRoomIdx].availableCount || 0} onChange={e => handleRoomFieldChange(editingRoomIdx, 'availableCount', parseInt(e.target.value) || 0)} className="w-full p-2 text-sm border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#b45309] outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Status</label>
                    <select value={rooms[editingRoomIdx].status || 'Available'} onChange={e => handleRoomFieldChange(editingRoomIdx, 'status', e.target.value)} className="w-full p-2 text-sm border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#b45309] outline-none">
                      <option value="Available">Available</option>
                      <option value="Sold Out">Sold Out</option>
                    </select>
                  </div>
                </div>

                {/* Features & Amenities */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-700 border-b pb-2">Features & Amenities</h4>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Amenities (Comma separated)</label>
                    <input type="text" value={(rooms[editingRoomIdx].amenities || []).join(', ')} onChange={e => handleRoomFieldChange(editingRoomIdx, 'amenities', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} placeholder="WiFi, AC, TV" className="w-full p-2 text-sm border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#b45309] outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Features (Comma separated)</label>
                    <input type="text" value={rooms[editingRoomIdx].features || ''} onChange={e => handleRoomFieldChange(editingRoomIdx, 'features', e.target.value)} placeholder="Ocean View, Balcony" className="w-full p-2 text-sm border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#b45309] outline-none" />
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <input type="checkbox" id="breakfast" checked={rooms[editingRoomIdx].breakfastIncluded || false} onChange={e => handleRoomFieldChange(editingRoomIdx, 'breakfastIncluded', e.target.checked)} className="w-4 h-4 text-[#b45309] rounded focus:ring-[#b45309]" />
                    <label htmlFor="breakfast" className="text-sm text-slate-700 font-medium">Breakfast Included</label>
                  </div>
                </div>

                {/* Description & Policies */}
                <div className="space-y-4 lg:col-span-2">
                  <h4 className="font-semibold text-slate-700 border-b pb-2">Description & Policies</h4>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Room Description</label>
                    <textarea value={rooms[editingRoomIdx].description || ''} onChange={e => handleRoomFieldChange(editingRoomIdx, 'description', e.target.value)} className="w-full p-2 text-sm border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#b45309] outline-none min-h-[80px]" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Cancellation Policy</label>
                    <input type="text" value={rooms[editingRoomIdx].cancellationPolicy || ''} onChange={e => handleRoomFieldChange(editingRoomIdx, 'cancellationPolicy', e.target.value)} className="w-full p-2 text-sm border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#b45309] outline-none" />
                  </div>
                </div>

                {/* Media & Actions */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-700 border-b pb-2">Media & CTA</h4>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Images (Comma separated URLs)</label>
                    <textarea value={(rooms[editingRoomIdx].images || []).join(',\n')} onChange={e => handleRoomFieldChange(editingRoomIdx, 'images', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} placeholder="https://...,&#10;https://..." className="w-full p-2 text-sm border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#b45309] outline-none min-h-[80px]" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Book Text</label>
                      <input type="text" value={rooms[editingRoomIdx].bookButtonText || ''} onChange={e => handleRoomFieldChange(editingRoomIdx, 'bookButtonText', e.target.value)} className="w-full p-2 text-sm border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#b45309] outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Book Link</label>
                      <input type="text" value={rooms[editingRoomIdx].bookButtonLink || ''} onChange={e => handleRoomFieldChange(editingRoomIdx, 'bookButtonLink', e.target.value)} className="w-full p-2 text-sm border border-slate-300 rounded-lg focus:ring-1 focus:ring-[#b45309] outline-none" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-800">Rooms List</h3>
                <button onClick={handleAddRoom} className="flex items-center gap-2 bg-[#b45309] hover:bg-[#92400e] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                  <Plus size={16} /> Add New Room
                </button>
              </div>

              {rooms.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
                  <div className="bg-orange-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <ImageIcon size={24} className="text-[#b45309]" />
                  </div>
                  <p className="text-slate-500 font-medium">No rooms added to this hotel yet.</p>
                  <p className="text-sm text-slate-400 mt-1 mb-4">Add rooms to allow users to see accommodation options.</p>
                  <button onClick={handleAddRoom} className="inline-flex items-center gap-2 text-[#b45309] font-semibold hover:underline">
                    <Plus size={16} /> Create First Room
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {rooms.map((room, idx) => (
                    <div key={room.id || idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h4 className="font-bold text-slate-800 line-clamp-1">{room.name}</h4>
                          <p className="text-xs text-slate-500 font-medium">{room.type} • {room.bedType}</p>
                        </div>
                        <div className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs font-bold ml-2 shrink-0">
                          ${room.discountPrice > 0 ? room.discountPrice : room.pricePerNight} / night
                        </div>
                      </div>
                      
                      {room.images && room.images.length > 0 && (
                        <div className="w-full h-32 rounded-lg overflow-hidden mb-3">
                          <img src={room.images[0]} alt={room.name} className="w-full h-full object-cover" />
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2 mt-auto pt-2 border-t border-slate-100">
                        <button onClick={() => setEditingRoomIdx(idx)} className="flex-1 flex justify-center items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors">
                          <Edit3 size={14} /> Edit Room
                        </button>
                        <button onClick={() => handleRemoveRoom(idx)} className="p-1.5 text-red-500 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
