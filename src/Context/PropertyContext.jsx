import React, { createContext, useContext, useState, useEffect } from 'react';
import { locationsData } from '../Components/Locations/locationsData';

const PropertyContext = createContext();

export const usePropertyContext = () => useContext(PropertyContext);

const INITIAL_DESTINATIONS = [
  {
    id: "dest-dhaka",
    name: "Dhaka",
    description: "The bustling capital city of Bangladesh.",
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80",
    displayOrder: 1,
    isActive: true,
  },
  {
    id: "dest-coxs-bazar",
    name: "Cox's Bazar",
    description: "Home to the world's longest natural sea beach.",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
    displayOrder: 2,
    isActive: true,
  },
  {
    id: "dest-sylhet",
    name: "Sylhet",
    description: "The land of two leaves and a bud, surrounded by tea gardens.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    displayOrder: 3,
    isActive: true,
  },
  {
    id: "dest-sreemangal",
    name: "Sreemangal",
    description: "The tea capital of Bangladesh.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    displayOrder: 4,
    isActive: true,
  }
];

const INITIAL_HOTELS = locationsData.map(loc => ({
  id: loc.id,
  destinationId: loc.city === 'Dhaka' ? 'dest-dhaka' : 
                 loc.city === "Cox's Bazar" ? 'dest-coxs-bazar' :
                 loc.city === 'Sylhet' ? 'dest-sylhet' : 'dest-sreemangal',
  name: loc.name,
  category: loc.category,
  rating: loc.rating,
  address: loc.address,
  description: loc.description,
  amenities: loc.amenities || [],
  gallery: [loc.image],
  image: loc.image, // Cover image
  isActive: true,
}));

export const PropertyProvider = ({ children }) => {
  const [destinations, setDestinations] = useState(() => {
    const saved = localStorage.getItem('property_destinations');
    return saved ? JSON.parse(saved) : INITIAL_DESTINATIONS;
  });

  const [hotels, setHotels] = useState(() => {
    const saved = localStorage.getItem('property_hotels');
    return saved ? JSON.parse(saved) : INITIAL_HOTELS;
  });

  useEffect(() => {
    localStorage.setItem('property_destinations', JSON.stringify(destinations));
  }, [destinations]);

  useEffect(() => {
    localStorage.setItem('property_hotels', JSON.stringify(hotels));
  }, [hotels]);

  // Sync state across tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'property_destinations' && e.newValue) {
        try { setDestinations(JSON.parse(e.newValue)); } catch (err) {}
      }
      if (e.key === 'property_hotels' && e.newValue) {
        try { setHotels(JSON.parse(e.newValue)); } catch (err) {}
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const generateSlug = (name) => {
    return (name || '').toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  // Destination Operations
  const addDestination = (destination) => {
    const slug = generateSlug(destination.name);
    setDestinations(prev => [...prev, { ...destination, id: `dest-${Date.now()}`, slug }]);
  };

  const updateDestination = (id, updatedData) => {
    setDestinations(prev => prev.map(dest => dest.id === id ? { ...dest, ...updatedData } : dest));
  };

  const deleteDestination = (id) => {
    setDestinations(prev => prev.filter(dest => dest.id !== id));
  };

  // Hotel Operations
  const addHotel = (hotel) => {
    const slug = generateSlug(hotel.name);
    setHotels(prev => [...prev, { ...hotel, id: `hotel-${Date.now()}`, slug }]);
  };

  const updateHotel = (id, updatedData) => {
    setHotels(prev => prev.map(hotel => hotel.id === id ? { ...hotel, ...updatedData } : hotel));
  };

  const deleteHotel = (id) => {
    setHotels(prev => prev.filter(hotel => hotel.id !== id));
  };

  return (
    <PropertyContext.Provider value={{
      destinations,
      addDestination,
      updateDestination,
      deleteDestination,
      hotels,
      addHotel,
      updateHotel,
      deleteHotel,
    }}>
      {children}
    </PropertyContext.Provider>
  );
};
