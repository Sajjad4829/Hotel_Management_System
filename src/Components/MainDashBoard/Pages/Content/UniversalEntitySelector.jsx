import React from 'react';
import { usePropertyContext } from '../../../../Context/PropertyContext';
import { useRoomContext } from '../../../../Context/RoomContext';
import { Hotel, BedDouble, Check } from 'lucide-react';

export default function UniversalEntitySelector({ 
  hotelId, 
  roomId, 
  onChange, 
  allowMultipleRooms = false 
}) {
  const { rooms } = useRoomContext();
  const { hotels } = usePropertyContext();
  
  const selectedHotel = hotels.find(l => l.id === hotelId);
  const hotelRooms = rooms.filter(r => r.propertyId === hotelId);
  
  const selectedRooms = Array.isArray(roomId) 
    ? rooms.filter(r => roomId.includes(r.id))
    : (roomId ? [rooms.find(r => r.id === roomId)].filter(Boolean) : []);

  const handleHotelChange = (e) => {
    const newHotelId = e.target.value;
    onChange('hotelId', newHotelId);
    // Reset room selection when hotel changes
    onChange('roomId', allowMultipleRooms ? [] : null);
  };

  const handleRoomToggle = (id) => {
    if (allowMultipleRooms) {
      const current = Array.isArray(roomId) ? roomId : [];
      if (current.includes(id)) {
        onChange('roomId', current.filter(rId => rId !== id));
      } else {
        onChange('roomId', [...current, id]);
      }
    } else {
      onChange('roomId', id);
    }
  };

  return (
    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 space-y-4">
      <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2 border-b border-slate-200 pb-2">
        <Hotel size={16} className="text-[#b45309]" /> Master Data Selection
      </h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hotel Selection */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Select Hotel</label>
          <select 
            value={hotelId || ''} 
            onChange={handleHotelChange}
            className="w-full p-2.5 text-sm border border-slate-300 rounded-lg bg-white focus:ring-1 focus:ring-[#b45309] outline-none"
          >
            <option value="">-- Choose a Hotel --</option>
            {hotels.map(loc => (
              <option key={loc.id} value={loc.id}>{loc.name} ({loc.address || loc.category})</option>
            ))}
          </select>

          {selectedHotel && (
            <div className="mt-3 p-3 bg-white border border-slate-200 rounded-lg flex gap-3 items-center">
              <img src={selectedHotel.image} alt={selectedHotel.name} className="w-12 h-12 object-cover rounded" />
              <div>
                <div className="text-sm font-bold text-slate-800">{selectedHotel.name}</div>
                <div className="text-xs text-slate-500">{selectedHotel.category} • {selectedHotel.rating}</div>
              </div>
            </div>
          )}
        </div>

        {/* Room Selection */}
        <div className={!hotelId ? 'opacity-50 pointer-events-none' : ''}>
          <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center justify-between">
            <span>Select Room{allowMultipleRooms ? 's' : ''}</span>
            {allowMultipleRooms && <span className="text-[10px] text-slate-400 font-normal">Multiple allowed</span>}
          </label>
          
          <div className="bg-white border border-slate-300 rounded-lg max-h-[160px] overflow-y-auto p-2 space-y-1 custom-scrollbar">
            {!hotelId ? (
              <div className="text-xs text-slate-400 p-2 italic text-center">Select a hotel first</div>
            ) : hotelRooms.length === 0 ? (
              <div className="text-xs text-slate-400 p-2 italic text-center">No rooms configured for this hotel</div>
            ) : (
              hotelRooms.map(room => {
                const isSelected = allowMultipleRooms 
                  ? (Array.isArray(roomId) && roomId.includes(room.id))
                  : roomId === room.id;
                  
                return (
                  <div 
                    key={room.id}
                    onClick={() => handleRoomToggle(room.id)}
                    className={`flex items-center gap-3 p-2 rounded cursor-pointer transition-colors ${isSelected ? 'bg-orange-50 border border-orange-200' : 'hover:bg-slate-50 border border-transparent'}`}
                  >
                    <div className={`shrink-0 w-4 h-4 rounded border flex items-center justify-center ${isSelected ? 'bg-[#b45309] border-[#b45309]' : 'border-slate-300'}`}>
                      {isSelected && <Check size={12} className="text-white" />}
                    </div>
                    <div className="w-10 h-10 rounded bg-slate-200 overflow-hidden shrink-0">
                      {room.mainImage ? (
                        <img src={room.mainImage} alt={room.roomName} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400"><BedDouble size={16} /></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-slate-800 truncate">{room.roomName}</div>
                      <div className="text-xs text-slate-500">From ${room.price} • Cap: {room.capacity}</div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
