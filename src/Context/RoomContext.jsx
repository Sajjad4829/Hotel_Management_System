import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

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

const defaultCategories = [
  { id: "cat-1", name: "Standard", code: "STD", description: "Basic comfortable room for everyday stays.", displayOrder: 1, isActive: true },
  { id: "cat-2", name: "Deluxe", code: "DLX", description: "Upgraded room with better views and amenities.", displayOrder: 2, isActive: true },
  { id: "cat-3", name: "Suite", code: "SUI", description: "Spacious suite with separate living area.", displayOrder: 3, isActive: true },
  { id: "cat-4", name: "Presidential", code: "PRS", description: "Top-tier luxury accommodation.", displayOrder: 4, isActive: true },
  { id: "cat-5", name: "Villa", code: "VIL", description: "Private standalone villa.", displayOrder: 5, isActive: true }
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
  const [loadingRooms, setLoadingRooms] = useState(false);

  // Synchronize live rooms from MongoDB Atlas via Express API
  useEffect(() => {
    const fetchRoomsFromAPI = async () => {
      try {
        setLoadingRooms(true);
        const res = await api.get('/rooms');
        if (res.data && res.data.data) {
          setRooms(res.data.data);
          localStorage.setItem('havenRoomsData', JSON.stringify(res.data.data));
        }
      } catch (err) {
        console.warn('⚠️ Unable to fetch live room inventory from server: using cached storage.', err.message);
      } finally {
        setLoadingRooms(false);
      }
    };
    fetchRoomsFromAPI();
  }, []);

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('havenCategoriesData');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse categories data", e);
      }
    }
    return defaultCategories;
  });

  useEffect(() => {
    localStorage.setItem('havenRoomsData', JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem('havenCategoriesData', JSON.stringify(categories));
  }, [categories]);

  const generateSlug = (name) => {
    return (name || '').toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const addRoom = async (roomData) => {
    const slug = generateSlug(roomData.roomName || roomData.name);
    try {
      const res = await api.post('/rooms', { ...roomData, slug });
      if (res.data && res.data.data) {
        setRooms(prev => [res.data.data, ...prev]);
        return res.data.data;
      }
    } catch (error) {
      console.error('API Add Room Error, applying local backup:', error);
      const newRoom = {
        id: `rm-${Date.now()}`,
        _id: `rm-${Date.now()}`,
        slug,
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
      throw error;
    }
  };

  const updateRoom = async (id, updatedData) => {
    const targetId = updatedData._id || id;
    try {
      const res = await api.put(`/rooms/${targetId}`, updatedData);
      if (res.data && res.data.data) {
        setRooms(prev => prev.map(room => (room.id === targetId || room._id === targetId || room.id === id) ? res.data.data : room));
        return res.data.data;
      }
    } catch (error) {
      console.error('API Update Room Error, updating local state:', error);
      setRooms(prev => prev.map(room => 
        (room.id === targetId || room._id === targetId || room.id === id) ? { 
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
      throw error;
    }
  };

  const deleteRoom = async (id) => {
    try {
      await api.delete(`/rooms/${id}`);
      setRooms(prev => prev.filter(room => room.id !== id && room._id !== id));
    } catch (error) {
      console.error('API Delete Room Error, removing from local state:', error);
      setRooms(prev => prev.filter(room => room.id !== id && room._id !== id));
      throw error;
    }
  };

  const getRoomsByProperty = (propertyId) => {
    return rooms.filter(room => {
      const pId = room.propertyId || (room.hotelId && (room.hotelId._id || room.hotelId));
      return pId && pId.toString() === propertyId.toString();
    });
  };

  const addCategory = (catData) => {
    const newCat = {
      id: `cat-${Date.now()}`,
      ...catData,
      displayOrder: Number(catData.displayOrder) || 0,
      isActive: Boolean(catData.isActive)
    };
    setCategories(prev => [...prev, newCat]);
  };

  const updateCategory = (id, updatedData) => {
    setCategories(prev => prev.map(cat => 
      cat.id === id ? { 
        ...cat, 
        ...updatedData,
        displayOrder: Number(updatedData.displayOrder) || cat.displayOrder,
        isActive: Boolean(updatedData.isActive)
      } : cat
    ));
  };

  const deleteCategory = (id) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
  };

  return (
    <RoomContext.Provider value={{ 
      rooms, loadingRooms, addRoom, updateRoom, deleteRoom, getRoomsByProperty,
      categories, addCategory, updateCategory, deleteCategory
    }}>
      {children}
    </RoomContext.Provider>
  );
}

export const useRoomContext = () => useContext(RoomContext);
