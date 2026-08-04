// AIUtils.js
// Dynamic AI logic over the local hotel dataset.

import { FALLBACK_RESPONSE } from "./AIResponses";

const listHotels = (hotels, intro) => {
  if (!hotels || !hotels.length) {
    return { text: FALLBACK_RESPONSE, hotels: [] };
  }
  return { text: intro, hotels };
};

const getNumericRating = (ratingStr) => {
  const parsed = parseFloat(ratingStr);
  return isNaN(parsed) ? 0 : parsed;
};

// Process hotels with their minimum room price and format
const processHotels = (rawHotels, rooms) => {
  return rawHotels.filter(h => h.isActive).map(hotel => {
    const hotelRooms = rooms.filter(r => r.hotelId === hotel.id && r.isActive);
    const minPrice = hotelRooms.length > 0 ? Math.min(...hotelRooms.map(r => r.pricePerNight)) : 0;
    
    return {
      ...hotel,
      pricePerNight: minPrice,
      guestRating: getNumericRating(hotel.rating),
      location: hotel.city || "Various",
      roomType: hotelRooms.length > 0 ? hotelRooms[0].title : "Standard Room",
      amenities: hotel.amenities || []
    };
  }).filter(h => h.pricePerNight > 0); // Only return hotels that have active rooms with prices
};

export function getAIResponse(message, rawHotels, rooms) {
  const m = message.toLowerCase().trim();
  const processedHotels = processHotels(rawHotels || [], rooms || []);

  const RULES = [
    {
      test: (m) => /cheap|budget|lowest price|affordable|under/.test(m),
      run: () => {
        const sorted = [...processedHotels].sort((a, b) => a.pricePerNight - b.pricePerNight);
        return listHotels(sorted.slice(0, 3), "Here are our most budget-friendly options:");
      },
    },
    {
      test: (m) => /luxury|premium|five star|5 star|top tier|best room/.test(m),
      run: () => {
        let luxury = processedHotels.filter(h => h.category && h.category.toLowerCase().includes("luxury"));
        if(luxury.length === 0) luxury = [...processedHotels].sort((a, b) => b.pricePerNight - a.pricePerNight);
        return listHotels(luxury.slice(0, 3), "Here are our top luxury picks for an unforgettable stay:");
      },
    },
    {
      test: (m) => /family|kids|children/.test(m),
      run: () => {
        // Find hotels that have "family" in their room types
        const familyHotels = processedHotels.filter(h => {
          const hotelRooms = rooms.filter(r => r.hotelId === h.id);
          return hotelRooms.some(r => r.title.toLowerCase().includes("family"));
        });
        if (familyHotels.length > 0) return listHotels(familyHotels.slice(0, 3), "Here are excellent hotels offering Family Suites and kid-friendly amenities:");
        return listHotels(processedHotels.slice(0, 3), "These spacious properties are great choices for families:");
      },
    },
    {
      test: (m) => /best rated|best hotel|highest rated|top rated/.test(m),
      run: () => {
        const sorted = [...processedHotels].sort((a, b) => b.guestRating - a.guestRating);
        return listHotels(sorted.slice(0, 3), "Our highest-rated properties based on guest reviews:");
      },
    },
    {
      test: (m) => /pool|swim/.test(m),
      run: () => {
        const results = processedHotels.filter((h) => h.amenities.some(a => a.toLowerCase().includes("pool")));
        if (results.length > 0) return listHotels(results.slice(0, 3), "These hotels feature beautiful swimming pools:");
        return listHotels(processedHotels.slice(0, 3), "I couldn't find a pool, but here are some top alternatives:");
      },
    },
    {
      test: (m) => /gym|fitness|workout/.test(m),
      run: () => {
        const results = processedHotels.filter((h) => h.amenities.some(a => a.toLowerCase().includes("gym") || a.toLowerCase().includes("fitness")));
        if (results.length > 0) return listHotels(results.slice(0, 3), "Stay fit on the go! Here are hotels with fully-equipped gyms:");
        return listHotels(processedHotels.slice(0, 3), "I couldn't find a gym, but here are some active-friendly stays:");
      },
    },
    {
      test: (m) => /spa/.test(m),
      run: () => {
        const results = processedHotels.filter((h) => h.amenities.some(a => a.toLowerCase().includes("spa") || a.toLowerCase().includes("massage")));
        if (results.length > 0) return listHotels(results.slice(0, 3), "Relax and rejuvenate at these hotels featuring full-service spas:");
        return listHotels(processedHotels.slice(0, 3), "These top properties are perfect for relaxing:");
      },
    },
    {
      test: (m) => /breakfast/.test(m),
      run: () => {
        const results = processedHotels.filter((h) => h.amenities.some(a => a.toLowerCase().includes("breakfast")));
        if (results.length > 0) return listHotels(results.slice(0, 3), "Start your day right! These hotels offer complimentary breakfast:");
        return listHotels(processedHotels.slice(0, 3), "Here are some great options for your stay:");
      },
    },
    {
      test: (m) => /parking/.test(m),
      run: () => {
        const results = processedHotels.filter((h) => h.amenities.some(a => a.toLowerCase().includes("parking")));
        if (results.length > 0) return listHotels(results.slice(0, 3), "Traveling by car? These hotels provide convenient parking:");
        return listHotels(processedHotels.slice(0, 3), "Here are our top properties:");
      },
    },
    {
      test: (m) => /cancel/.test(m),
      run: () => {
        // Free cancellation is usually on the room level
        const flexHotels = processedHotels.filter(h => {
          const hotelRooms = rooms.filter(r => r.hotelId === h.id);
          return hotelRooms.some(r => r.policies && r.policies.some(p => p.toLowerCase().includes("cancel")));
        });
        if (flexHotels.length > 0) return listHotels(flexHotels.slice(0, 3), "These properties offer flexible rooms with free cancellation:");
        return listHotels(processedHotels.slice(0, 3), "Here are some great options (check individual room policies for free cancellation):");
      },
    },
    {
      test: (m) => /couple|romantic|honeymoon/.test(m),
      run: () => {
        const sorted = [...processedHotels].sort((a, b) => b.guestRating - a.guestRating).filter(h => h.amenities.some(a => /spa|pool|view/i.test(a)));
        return listHotels(sorted.slice(0, 3), "Perfect for a romantic getaway. We highly recommend these properties:");
      },
    },
    {
      test: (m) => /beach|sea|ocean/.test(m),
      run: () => {
        const results = processedHotels.filter(h => h.city.toLowerCase().includes("cox") || h.amenities.some(a => /beach|sea|ocean/i.test(a)));
        if (results.length > 0) return listHotels(results.slice(0, 3), "Enjoy the waves! Here are our top seaside and beach resort options:");
        return listHotels(processedHotels.slice(0, 3), "We don't have beach resorts matching that, but here are top stays:");
      },
    },
    {
      test: (m) => /business|work/.test(m),
      run: () => {
        const results = processedHotels.filter((h) => h.amenities.some(a => a.toLowerCase().includes("wifi") || a.toLowerCase().includes("internet") || a.toLowerCase().includes("meeting")));
        return listHotels(results.slice(0, 3), "Great for business travelers! These hotels offer fast Wi-Fi and work amenities:");
      },
    },
    {
      // Destination matching fallback
      test: (m) => {
        return processedHotels.some(h => m.includes(h.city.toLowerCase()));
      },
      run: () => {
        const matchedCity = processedHotels.find(h => m.includes(h.city.toLowerCase()))?.city;
        const results = processedHotels.filter(h => h.city === matchedCity);
        return listHotels(results.slice(0, 3), `Here are some fantastic options in ${matchedCity}:`);
      }
    }
  ];

  for (const rule of RULES) {
    if (rule.test(m)) {
      return rule.run();
    }
  }

  // Fallback: If no rule matched, just return top 3 overall
  const sorted = [...processedHotels].sort((a, b) => b.guestRating - a.guestRating);
  return { 
    text: FALLBACK_RESPONSE, 
    hotels: sorted.slice(0, 3) 
  };
}

export function formatTime(date = new Date()) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function makeMessage({ sender, text, hotels = [] }) {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    sender, // "user" | "ai"
    text,
    hotels,
    time: formatTime(),
  };
}