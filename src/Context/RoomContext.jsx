import React, { createContext, useContext, useState, useEffect } from 'react';

const defaultRooms = [
  { 
    id: "rm-1", propertyId: "dhaka-gulshan", roomNo: "101", roomName: "Deluxe King Room", type: "Deluxe", floor: "1", 
    price: 150, status: "Available", shortDescription: "A beautifully appointed room with stunning city views.",
    thumbnailImage: "https://images.unsplash.com/photo-1542314831-c6a4d27ce66f?auto=format&fit=crop&w=800&q=80",
    galleryImages: [], bedType: "King", roomSize: 450, maxAdults: 2, maxChildren: 1,
    amenities: ["WiFi", "AC", "TV", "Mini Bar"], isFeatured: true, displayOrder: 1, isActive: true
  },
  { 
    id: "rm-2", propertyId: "dhaka-gulshan", roomNo: "301", roomName: "Presidential Suite", type: "Suite", floor: "3", 
    price: 450, status: "Available", shortDescription: "The pinnacle of luxury with panoramic views and separate living area.",
    thumbnailImage: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
    galleryImages: [], bedType: "King", roomSize: 850, maxAdults: 4, maxChildren: 2,
    amenities: ["WiFi", "AC", "TV", "Mini Bar", "Balcony", "Room Service"], isFeatured: true, displayOrder: 2, isActive: true
  },
  { 
    id: "rm-3", propertyId: "coxs-bazar-resort", roomNo: "102", roomName: "Ocean View Twin", type: "Standard", floor: "1", 
    price: 120, status: "Booked", shortDescription: "Comfortable room facing the ocean beach.",
    thumbnailImage: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
    galleryImages: [], bedType: "Twin", roomSize: 320, maxAdults: 2, maxChildren: 2,
    amenities: ["WiFi", "AC", "TV", "Ocean View"], isFeatured: false, displayOrder: 3, isActive: true
  }
];

const RoomContext = createContext();

export function RoomProvider({ children }) {
  const [rooms, setRooms] = useState(() => {
    const saved = localStorage.getItem('havenRoomsData');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse rooms data", e);
      }
    }
    return defaultRooms;
  });

  useEffect(() => {
    localStorage.setItem('havenRoomsData', JSON.stringify(rooms));
  }, [rooms]);

  const addRoom = (roomData) => {
    const newRoom = {
      id: `rm-${Date.now()}`,
      ...roomData,
      price: Number(roomData.price) || 0,
      roomSize: Number(roomData.roomSize) || 0,
      maxAdults: Number(roomData.maxAdults) || 1,
      maxChildren: Number(roomData.maxChildren) || 0,
      displayOrder: Number(roomData.displayOrder) || 0,
      isFeatured: Boolean(roomData.isFeatured),
      isActive: Boolean(roomData.isActive)
    };
    setRooms(prev => [...prev, newRoom]);
  };

  const updateRoom = (id, updatedData) => {
    setRooms(prev => prev.map(room => 
      room.id === id ? { 
        ...room, 
        ...updatedData, 
        price: Number(updatedData.price) || room.price,
        roomSize: Number(updatedData.roomSize) || room.roomSize,
        maxAdults: Number(updatedData.maxAdults) || room.maxAdults,
        maxChildren: Number(updatedData.maxChildren) || room.maxChildren,
        displayOrder: Number(updatedData.displayOrder) || room.displayOrder,
        isFeatured: Boolean(updatedData.isFeatured),
        isActive: Boolean(updatedData.isActive)
      } : room
    ));
  };

  const deleteRoom = (id) => {
    setRooms(prev => prev.filter(room => room.id !== id));
  };

  const getRoomsByProperty = (propertyId) => {
    return rooms.filter(room => room.propertyId === propertyId);
  };

  return (
    <RoomContext.Provider value={{ rooms, addRoom, updateRoom, deleteRoom, getRoomsByProperty }}>
      {children}
    </RoomContext.Provider>
  );
}

export const useRoomContext = () => useContext(RoomContext);
