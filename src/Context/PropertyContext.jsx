import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

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

const INITIAL_HOTELS = [
  {
    id: "dhaka-gulshan",
    destinationId: "dest-dhaka",
    name: "Aurum Hotel Dhaka",
    category: "5 Star Luxury",
    rating: "4.9/5",
    address: "Gulshan-2, Dhaka, Bangladesh",
    description: "Our flagship property in the heart of the capital, offering unparalleled luxury and city views.",
    amenities: ["Free WiFi", "Infinity Pool", "Spa", "Rooftop Bar"],
    gallery: ["https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80"],
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80",
    isActive: true,
  },
  {
    id: "coxs-bazar-resort",
    destinationId: "dest-coxs-bazar",
    name: "Aurum Resort Cox's Bazar",
    category: "5 Star Beach Resort",
    rating: "4.8/5",
    address: "Marine Drive Road, Inani, Cox's Bazar",
    description: "A breathtaking beachfront resort on the world's longest natural sea beach.",
    amenities: ["Private Beach", "Seafood Restaurant", "Water Sports", "Gym"],
    gallery: ["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80"],
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
    isActive: true,
  },
  {
    id: "sylhet-eco",
    destinationId: "dest-sylhet",
    name: "Aurum Eco Resort Sylhet",
    category: "Eco Boutique Resort",
    rating: "4.7/5",
    address: "Khadimnagar, Sylhet, Bangladesh",
    description: "Nestled amongst lush tea gardens, offering a serene escape into nature.",
    amenities: ["Nature Trails", "Organic Dining", "Yoga Pavilion", "Spa"],
    gallery: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"],
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    isActive: true,
  },
  {
    id: "sreemangal-boutique",
    destinationId: "dest-sreemangal",
    name: "Aurum Boutique Sreemangal",
    category: "Boutique Hotel",
    rating: "4.9/5",
    address: "Radhanagar, Sreemangal, Moulvibazar",
    description: "An intimate boutique hotel surrounded by the tea capital's rolling hills.",
    amenities: ["Tea Tasting", "Bicycle Rental", "Library", "Fire Pit"],
    gallery: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"],
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    isActive: true,
  }
];

export const PropertyProvider = ({ children }) => {
  const [destinations, setDestinations] = useState(() => {
    const saved = localStorage.getItem('property_destinations');
    return saved ? JSON.parse(saved) : INITIAL_DESTINATIONS;
  });

  const [hotels, setHotels] = useState(() => {
    const saved = localStorage.getItem('property_hotels');
    return saved ? JSON.parse(saved) : INITIAL_HOTELS;
  });
  const [loadingHotels, setLoadingHotels] = useState(false);

  // Fetch real hotel inventory from Express MongoDB backend on initial mount
  useEffect(() => {
    const fetchHotelsFromAPI = async () => {
      try {
        setLoadingHotels(true);
        const res = await api.get('/hotels');
        if (res.data && res.data.data) {
          setHotels(res.data.data);
          localStorage.setItem('property_hotels', JSON.stringify(res.data.data));
        }
      } catch (err) {
        console.warn('⚠️ Backend offline or unreachable: Utilizing locally cached hotel inventory.', err.message);
      } finally {
        setLoadingHotels(false);
      }
    };
    fetchHotelsFromAPI();
  }, []);

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

  // Hotel Operations connected to Live Admin Protected Backend
  const addHotel = async (hotel) => {
    const slug = generateSlug(hotel.name);
    try {
      const res = await api.post('/hotels', { ...hotel, slug });
      if (res.data && res.data.data) {
        setHotels(prev => [res.data.data, ...prev]);
        return res.data.data;
      }
    } catch (error) {
      console.error('API Add Hotel Error, applying local fallback:', error);
      const fallbackHotel = { ...hotel, id: `hotel-${Date.now()}`, _id: `hotel-${Date.now()}`, slug };
      setHotels(prev => [...prev, fallbackHotel]);
      throw error;
    }
  };

  const updateHotel = async (id, updatedData) => {
    const targetId = updatedData._id || id;
    try {
      const res = await api.put(`/hotels/${targetId}`, updatedData);
      if (res.data && res.data.data) {
        setHotels(prev => prev.map(hotel => (hotel._id === targetId || hotel.id === targetId || hotel.id === id) ? res.data.data : hotel));
        return res.data.data;
      }
    } catch (error) {
      console.error('API Update Hotel Error, updating locally:', error);
      setHotels(prev => prev.map(hotel => (hotel._id === targetId || hotel.id === targetId || hotel.id === id) ? { ...hotel, ...updatedData } : hotel));
      throw error;
    }
  };

  const deleteHotel = async (id) => {
    try {
      await api.delete(`/hotels/${id}`);
      setHotels(prev => prev.filter(hotel => hotel.id !== id && hotel._id !== id));
    } catch (error) {
      console.error('API Delete Hotel Error, removing locally:', error);
      setHotels(prev => prev.filter(hotel => hotel.id !== id && hotel._id !== id));
      throw error;
    }
  };

  return (
    <PropertyContext.Provider value={{
      destinations,
      addDestination,
      updateDestination,
      deleteDestination,
      hotels,
      loadingHotels,
      addHotel,
      updateHotel,
      deleteHotel,
    }}>
      {children}
    </PropertyContext.Provider>
  );
};
