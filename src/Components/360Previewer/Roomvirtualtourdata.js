
const DEMO_PANORAMA = "https://photo-sphere-viewer-data.netlify.app/assets/sphere.jpg";

function makeRoom(hotelId, roomId, data) {
  return {
    id: `${hotelId}__${roomId}`, // globally unique — used as React key / active-tab id
    hotelId,
    roomId, // plain per-hotel identifier
    ...data,
  };
}

export const hotelsData = {
  1: {
    hotelId: 1,
    hotelName: "The Regal Meridian",
    rooms: [
      makeRoom(1, "deluxe-room", {
        roomName: "Deluxe Room",
        panoramaImage: DEMO_PANORAMA,
        price: 210,
        capacity: 2,
        bedType: "1 King Bed",
        size: "32 m²",
        amenities: ["wifi", "ac", "smartTv", "miniBar", "coffeeMachine", "roomService"],
        hotspots: [
          { id: "bed", icon: "🛏", label: "King Bed", longitude: -20, latitude: -10, description: "Premium king-size bed with hotel-grade linens." },
          { id: "tv", icon: "📺", label: "Smart TV", longitude: 45, latitude: 0, description: "55\" Smart TV with streaming apps built in." },
          { id: "bathroom", icon: "🚿", label: "Luxury Bathroom", longitude: 120, latitude: -5, description: "Rainfall shower and marble vanity." },
          { id: "minibar", icon: "☕", label: "Mini Bar", longitude: -100, latitude: -8, description: "Stocked mini bar and espresso machine." },
          { id: "balcony", icon: "🪟", label: "Balcony", longitude: 175, latitude: 2, description: "Private balcony with city views." },
        ],
      }),
      makeRoom(1, "family-suite", {
        roomName: "Family Suite",
        panoramaImage: DEMO_PANORAMA,
        price: 340,
        capacity: 4,
        bedType: "1 King + 2 Twin Beds",
        size: "58 m²",
        amenities: ["wifi", "pool", "ac", "smartTv", "miniBar", "breakfast", "roomService"],
        hotspots: [
          { id: "bed", icon: "🛏", label: "King Bed", longitude: -35, latitude: -8, description: "Separate master area with a king-size bed." },
          { id: "kids", icon: "🛏", label: "Kids Beds", longitude: 60, latitude: -6, description: "Two twin beds in a connected nook." },
          { id: "tv", icon: "📺", label: "Smart TV", longitude: 10, latitude: 2, description: "Living area Smart TV for family movie nights." },
          { id: "bathroom", icon: "🚿", label: "Luxury Bathroom", longitude: 140, latitude: -10, description: "Double-vanity bathroom with a soaking tub." },
          { id: "balcony", icon: "🪟", label: "Balcony", longitude: -150, latitude: 3, description: "Wide balcony overlooking the pool." },
        ],
      }),
      makeRoom(1, "presidential-suite", {
        roomName: "Presidential Suite",
        panoramaImage: DEMO_PANORAMA,
        price: 890,
        capacity: 4,
        bedType: "1 King Bed + Lounge",
        size: "110 m²",
        amenities: ["wifi", "pool", "spa", "gym", "parking", "ac", "smartTv", "miniBar", "breakfast", "roomService"],
        hotspots: [
          { id: "bed", icon: "🛏", label: "King Bed", longitude: -25, latitude: -10, description: "Grand king bed in a private sleeping wing." },
          { id: "tv", icon: "📺", label: "Smart TV", longitude: 30, latitude: 0, description: "75\" Smart TV in the lounge area." },
          { id: "bathroom", icon: "🚿", label: "Luxury Bathroom", longitude: 100, latitude: -8, description: "Spa-style bathroom with a walk-in rain shower." },
          { id: "minibar", icon: "☕", label: "Mini Bar", longitude: -110, latitude: -6, description: "Full mini bar and private dining nook." },
          { id: "balcony", icon: "🪟", label: "Balcony", longitude: 165, latitude: 4, description: "Panoramic wraparound terrace." },
        ],
      }),
    ],
  },

  2: {
    hotelId: 2,
    hotelName: "Aurelia Grand Hotel",
    rooms: [
      makeRoom(2, "deluxe-king", {
        roomName: "Deluxe King",
        panoramaImage: DEMO_PANORAMA,
        price: 180,
        capacity: 2,
        bedType: "1 King Bed",
        size: "28 m²",
        amenities: ["wifi", "pool", "ac", "breakfast", "smartTv"],
        hotspots: [
          { id: "bed", icon: "🛏", label: "King Bed", longitude: -15, latitude: -8, description: "Plush king bed with city-view headboard." },
          { id: "tv", icon: "📺", label: "Smart TV", longitude: 50, latitude: 2, description: "50\" Smart TV with streaming apps." },
          { id: "bathroom", icon: "🚿", label: "Bathroom", longitude: 130, latitude: -6, description: "Modern glass-walled shower." },
          { id: "balcony", icon: "🪟", label: "Balcony", longitude: -160, latitude: 3, description: "Compact Juliet balcony." },
        ],
      }),
      makeRoom(2, "honeymoon-suite", {
        roomName: "Honeymoon Suite",
        panoramaImage: DEMO_PANORAMA,
        price: 420,
        capacity: 2,
        bedType: "1 King Bed",
        size: "60 m²",
        amenities: ["wifi", "spa", "ac", "miniBar", "roomService", "smartTv"],
        hotspots: [
          { id: "bed", icon: "🛏", label: "King Bed", longitude: -30, latitude: -10, description: "Romantic canopy king bed." },
          { id: "tub", icon: "🚿", label: "Soaking Tub", longitude: 90, latitude: -8, description: "Private in-room soaking tub." },
          { id: "minibar", icon: "☕", label: "Mini Bar", longitude: -110, latitude: -5, description: "Champagne-stocked mini bar." },
          { id: "balcony", icon: "🪟", label: "Balcony", longitude: 170, latitude: 4, description: "Sunset-facing private terrace." },
        ],
      }),
    ],
  },

  3: {
    hotelId: 3,
    hotelName: "Pinehill Family Resort",
    rooms: [
      makeRoom(3, "standard-room", {
        roomName: "Standard Room",
        panoramaImage: DEMO_PANORAMA,
        price: 95,
        capacity: 2,
        bedType: "2 Twin Beds",
        size: "24 m²",
        amenities: ["wifi", "parking", "ac"],
        hotspots: [
          { id: "beds", icon: "🛏", label: "Twin Beds", longitude: -20, latitude: -8, description: "Two comfortable twin beds." },
          { id: "bathroom", icon: "🚿", label: "Bathroom", longitude: 110, latitude: -6, description: "Compact ensuite bathroom." },
        ],
      }),
      makeRoom(3, "family-suite", {
        roomName: "Family Suite",
        panoramaImage: DEMO_PANORAMA,
        price: 265,
        capacity: 5,
        bedType: "1 King + 2 Twin Beds",
        size: "70 m²",
        amenities: ["wifi", "pool", "gym", "parking", "breakfast", "smartTv"],
        hotspots: [
          { id: "bed", icon: "🛏", label: "King Bed", longitude: -40, latitude: -8, description: "Master king bed for parents." },
          { id: "kids", icon: "🛏", label: "Kids Beds", longitude: 55, latitude: -6, description: "Bunk-style twin beds for kids." },
          { id: "tv", icon: "📺", label: "Smart TV", longitude: 15, latitude: 2, description: "Family lounge Smart TV." },
          { id: "balcony", icon: "🪟", label: "Balcony", longitude: -155, latitude: 3, description: "Lakeview balcony." },
        ],
      }),
      makeRoom(3, "garden-cottage", {
        roomName: "Garden Cottage",
        panoramaImage: null,
        price: 150,
        capacity: 3,
        bedType: "1 Queen Bed",
        size: "35 m²",
        amenities: ["wifi", "parking", "breakfast"],
        hotspots: [],
      }),
    ],
  },

  4: {
    hotelId: 4,
    hotelName: "Silverpine Mountain Lodge",
    rooms: [
      makeRoom(4, "alpine-room", {
        roomName: "Alpine Room",
        panoramaImage: DEMO_PANORAMA,
        price: 140,
        capacity: 2,
        bedType: "1 Queen Bed",
        size: "26 m²",
        amenities: ["wifi", "ac", "parking", "breakfast"],
        hotspots: [
          { id: "bed", icon: "🛏", label: "Queen Bed", longitude: -20, latitude: -8, description: "Cozy queen bed with wool throws." },
          { id: "fireplace", icon: "🔥", label: "Fireplace", longitude: 60, latitude: -4, description: "Wood-burning fireplace for cold nights." },
          { id: "bathroom", icon: "🚿", label: "Bathroom", longitude: 130, latitude: -6, description: "Stone-tiled ensuite bathroom." },
        ],
      }),
      makeRoom(4, "summit-suite", {
        roomName: "Summit Suite",
        panoramaImage: DEMO_PANORAMA,
        price: 310,
        capacity: 3,
        bedType: "1 King Bed",
        size: "50 m²",
        amenities: ["wifi", "spa", "ac", "smartTv", "breakfast", "parking"],
        hotspots: [
          { id: "bed", icon: "🛏", label: "King Bed", longitude: -25, latitude: -8, description: "King bed facing the mountain view window." },
          { id: "tv", icon: "📺", label: "Smart TV", longitude: 40, latitude: 0, description: "Smart TV above the fireplace." },
          { id: "balcony", icon: "🪟", label: "Balcony", longitude: 150, latitude: 4, description: "Balcony overlooking the peaks." },
        ],
      }),
    ],
  },

  5: {
    hotelId: 5,
    hotelName: "Coral Bay Beach Resort",
    rooms: [
      makeRoom(5, "ocean-view-room", {
        roomName: "Ocean View Room",
        panoramaImage: DEMO_PANORAMA,
        price: 195,
        capacity: 2,
        bedType: "1 King Bed",
        size: "30 m²",
        amenities: ["wifi", "pool", "ac", "smartTv", "breakfast"],
        hotspots: [
          { id: "bed", icon: "🛏", label: "King Bed", longitude: -20, latitude: -8, description: "King bed with ocean-facing headboard." },
          { id: "tv", icon: "📺", label: "Smart TV", longitude: 45, latitude: 0, description: "Smart TV mounted opposite the bed." },
          { id: "balcony", icon: "🪟", label: "Balcony", longitude: 170, latitude: 4, description: "Balcony with direct ocean view." },
        ],
      }),
      makeRoom(5, "beachfront-villa", {
        roomName: "Beachfront Villa",
        panoramaImage: DEMO_PANORAMA,
        price: 560,
        capacity: 4,
        bedType: "2 King Beds",
        size: "95 m²",
        amenities: ["wifi", "pool", "spa", "ac", "miniBar", "breakfast", "roomService"],
        hotspots: [
          { id: "bed", icon: "🛏", label: "King Beds", longitude: -30, latitude: -8, description: "Two king beds across separate rooms." },
          { id: "pool", icon: "🏊", label: "Private Pool", longitude: 100, latitude: -10, description: "Private plunge pool on the terrace." },
          { id: "minibar", icon: "☕", label: "Mini Bar", longitude: -110, latitude: -6, description: "Fully stocked mini bar." },
        ],
      }),
      makeRoom(5, "garden-bungalow", {
        roomName: "Garden Bungalow",
        panoramaImage: null,
        price: 160,
        capacity: 2,
        bedType: "1 Queen Bed",
        size: "28 m²",
        amenities: ["wifi", "ac", "breakfast"],
        hotspots: [],
      }),
    ],
  },

  6: {
    hotelId: 6,
    hotelName: "Ivory Tower Business Hotel",
    rooms: [
      makeRoom(6, "executive-room", {
        roomName: "Executive Room",
        panoramaImage: DEMO_PANORAMA,
        price: 165,
        capacity: 1,
        bedType: "1 Queen Bed",
        size: "24 m²",
        amenities: ["wifi", "ac", "smartTv", "coffeeMachine", "gym"],
        hotspots: [
          { id: "bed", icon: "🛏", label: "Queen Bed", longitude: -20, latitude: -8, description: "Queen bed with ergonomic headboard." },
          { id: "desk", icon: "💼", label: "Work Desk", longitude: 60, latitude: -4, description: "Dedicated work desk with fast wifi." },
          { id: "tv", icon: "📺", label: "Smart TV", longitude: 120, latitude: 0, description: "Smart TV with business channels preset." },
        ],
      }),
      makeRoom(6, "corner-suite", {
        roomName: "Corner Suite",
        panoramaImage: DEMO_PANORAMA,
        price: 280,
        capacity: 2,
        bedType: "1 King Bed",
        size: "45 m²",
        amenities: ["wifi", "gym", "ac", "smartTv", "miniBar", "roomService"],
        hotspots: [
          { id: "bed", icon: "🛏", label: "King Bed", longitude: -25, latitude: -8, description: "King bed with skyline view." },
          { id: "lounge", icon: "🛋", label: "Lounge Area", longitude: 70, latitude: -2, description: "Separate lounge and meeting nook." },
          { id: "balcony", icon: "🪟", label: "Balcony", longitude: 160, latitude: 4, description: "Corner balcony with double skyline view." },
        ],
      }),
    ],
  },

  7: {
    hotelId: 7,
    hotelName: "Harbour Lights Hotel",
    rooms: [
      makeRoom(7, "standard-room", {
        roomName: "Standard Room",
        panoramaImage: DEMO_PANORAMA,
        price: 110,
        capacity: 2,
        bedType: "1 Queen Bed",
        size: "22 m²",
        amenities: ["wifi", "ac", "parking"],
        hotspots: [
          { id: "bed", icon: "🛏", label: "Queen Bed", longitude: -20, latitude: -8, description: "Queen bed with harbour-facing window." },
          { id: "bathroom", icon: "🚿", label: "Bathroom", longitude: 110, latitude: -6, description: "Compact ensuite bathroom." },
        ],
      }),
      makeRoom(7, "harbour-view-suite", {
        roomName: "Harbour View Suite",
        panoramaImage: DEMO_PANORAMA,
        price: 300,
        capacity: 3,
        bedType: "1 King Bed",
        size: "48 m²",
        amenities: ["wifi", "ac", "smartTv", "miniBar", "breakfast", "roomService"],
        hotspots: [
          { id: "bed", icon: "🛏", label: "King Bed", longitude: -25, latitude: -8, description: "King bed facing the harbour lights." },
          { id: "tv", icon: "📺", label: "Smart TV", longitude: 40, latitude: 0, description: "Smart TV in the sitting area." },
          { id: "balcony", icon: "🪟", label: "Balcony", longitude: 165, latitude: 4, description: "Balcony overlooking the harbour." },
        ],
      }),
    ],
  },

  8: {
    hotelId: 8,
    hotelName: "Willow Creek Countryside Inn",
    rooms: [
      makeRoom(8, "cottage-room", {
        roomName: "Cottage Room",
        panoramaImage: DEMO_PANORAMA,
        price: 100,
        capacity: 2,
        bedType: "1 Queen Bed",
        size: "25 m²",
        amenities: ["wifi", "parking", "breakfast"],
        hotspots: [
          { id: "bed", icon: "🛏", label: "Queen Bed", longitude: -20, latitude: -8, description: "Queen bed with quilted countryside linens." },
          { id: "window", icon: "🪟", label: "Garden View", longitude: 100, latitude: 0, description: "Window overlooking the herb garden." },
        ],
      }),
      makeRoom(8, "farmhouse-suite", {
        roomName: "Farmhouse Suite",
        panoramaImage: DEMO_PANORAMA,
        price: 220,
        capacity: 4,
        bedType: "1 King + 1 Sofa Bed",
        size: "55 m²",
        amenities: ["wifi", "parking", "breakfast", "smartTv", "ac"],
        hotspots: [
          { id: "bed", icon: "🛏", label: "King Bed", longitude: -30, latitude: -8, description: "King bed in the main sleeping area." },
          { id: "sofa", icon: "🛋", label: "Sofa Bed", longitude: 50, latitude: -4, description: "Pull-out sofa bed in the sitting nook." },
          { id: "tv", icon: "📺", label: "Smart TV", longitude: 130, latitude: 0, description: "Smart TV above the fireplace mantle." },
        ],
      }),
    ],
  },
};

// ---------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------

/** Returns the rooms array for a given hotel, or [] if the hotel is unknown. */
export function getRoomsByHotelId(hotelId) {
  return hotelsData[hotelId]?.rooms ?? [];
}

/** Returns a single room by hotelId + roomId (the plain per-hotel id), or null. */
export function getRoomByIds(hotelId, roomId) {
  return getRoomsByHotelId(hotelId).find((r) => r.roomId === roomId) ?? null;
}

/** Returns { hotelId, hotelName } for every hotel in the dataset. */
export function getHotelList() {
  return Object.values(hotelsData).map(({ hotelId, hotelName }) => ({ hotelId, hotelName }));
}

// ---------------------------------------------------------------------
// Backward-compatible default export
// ---------------------------------------------------------------------
// Existing code that imports `roomVirtualTourData` directly (the old flat
// array shape) keeps working unchanged — it now simply resolves to the
// first hotel's rooms.
const DEFAULT_HOTEL_ID = Object.keys(hotelsData)[0];
export const roomVirtualTourData = getRoomsByHotelId(DEFAULT_HOTEL_ID);

// Master amenity list with icons/labels used by InfoCard.
export const AMENITY_META = {
  wifi: { label: "WiFi", icon: "📶" },
  pool: { label: "Pool", icon: "🏊" },
  spa: { label: "Spa", icon: "💆" },
  gym: { label: "Gym", icon: "💪" },
  parking: { label: "Parking", icon: "🚗" },
  breakfast: { label: "Breakfast", icon: "🍽" },
  ac: { label: "Air Conditioning", icon: "❄️" },
  miniBar: { label: "Mini Bar", icon: "🍷" },
  coffeeMachine: { label: "Coffee Machine", icon: "☕" },
  roomService: { label: "Room Service", icon: "🛎" },
  smartTv: { label: "Smart TV", icon: "📺" },
};