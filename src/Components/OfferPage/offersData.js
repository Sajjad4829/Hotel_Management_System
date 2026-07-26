// Mock data only — no backend, no API calls.

export const categories = [
  { id: "all", label: "All Offers" },
  { id: "weekend", label: "Weekend Deals" },
  { id: "family", label: "Family Packages" },
  { id: "honeymoon", label: "Honeymoon" },
  { id: "business", label: "Business" },
  { id: "suites", label: "Luxury Suites" },
  { id: "spa", label: "Spa & Wellness" },
  { id: "restaurant", label: "Restaurant" },
  { id: "seasonal", label: "Seasonal Offers" },
];

const offersdatas = [
  {
    id: "1",
    slug: "weekend-escape-regal-meridian",

    category: "weekend",
    badge: "30% OFF",

    title: "Weekend Escape at The Regal Meridian",
    heroTitle: "Your Weekend, Elevated",
    heroSubtitle: "Two nights of quiet luxury in the heart of the city, at 30% off.",

    description:
      "Unwind in a Deluxe King Room with breakfast for two, late checkout, and a complimentary welcome amenity.",
    shortDescription:
      "Unwind in a Deluxe King Room with breakfast for two, late checkout, and a complimentary welcome amenity.",
    fullDescription:
      "Step away from the everyday and into a suite designed for stillness. The Weekend Escape package pairs a beautifully appointed Deluxe King Room with a leisurely breakfast for two, a late 2 PM checkout so your Sunday never has to rush, and a welcome amenity waiting in your room on arrival. Ideal for couples or solo travelers craving a short, restorative city break without compromising on comfort.",

    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=85",
    mainImage:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=85",
    panoramaImage: "https://pannellum.org/images/alma.jpg",

    gallery: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=85",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1600&q=85",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1600&q=85",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1600&q=85",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1600&q=85",
    ],

    originalPrice: 320,
    discountedPrice: 224,
    savings: 96,
    price: 224,

    expiry: "2026-08-31",

    hotelId: 1,
    hotelName: "The Regal Meridian",
    location: "Dhaka",
    country: "Bangladesh",

    roomName: "Deluxe King Room",
    roomType: "Deluxe Room",
    roomSize: "32 m²",
    bedType: "1 King Bed",
    bedCount: 1,
    capacity: 2,
    roomNumber: "312",
    view: "City View",
    floor: 3,
    balcony: false,
    bathroomType: "Ensuite Bathroom",
    smoking: false,

    rating: 4.7,
    reviewCount: 312,

    amenities: [
      "Free WiFi",
      "Air Conditioning",
      "Smart TV",
      "Mini Bar",
      "Coffee Machine",
      "Room Service",
    ],

    highlights: [
      "Prime city-center location",
      "Late checkout until 2 PM",
      "Complimentary welcome amenity",
    ],

    offerIncludes: [
      "2 nights in a Deluxe King Room",
      "Daily breakfast for two",
      "Late checkout (2 PM)",
      "Welcome amenity on arrival",
      "Complimentary WiFi",
    ],

    exclusions: ["Airport transfers", "Spa treatments"],

    terms: [
      "Valid for bookings made at least 3 days in advance.",
      "Subject to room availability at time of booking.",
      "Cannot be combined with other promotional offers.",
      "Rates are per room, per stay, based on double occupancy.",
    ],

    cancellationPolicy: "Free cancellation up to 48 hours before check-in.",

    checkIn: "14:00",
    checkOut: "12:00",

    breakfastIncluded: true,
    parkingIncluded: true,
    wifiIncluded: true,
    airConditioning: true,
    petsAllowed: false,

    featured: true,

    promoCode: "WEEKEND30",

    available: true,
    currency: "USD",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-06-01T00:00:00.000Z",

    ctaText: "Book Now",
  },

  {
    id: "2",
    slug: "honeymoon-suite-aurelia-grand",

    category: "honeymoon",
    badge: "Limited Time",

    title: "Honeymoon Suite & Champagne Package",
    heroTitle: "Where Your Forever Begins",
    heroSubtitle: "A private suite, champagne on arrival, and a candlelight dinner for two.",

    description:
      "Celebrate in a private suite with sparkling champagne on arrival and a candlelight dinner for two.",
    shortDescription:
      "Celebrate in a private suite with sparkling champagne on arrival and a candlelight dinner for two.",
    fullDescription:
      "Designed for newlyweds and hopeless romantics alike, this package places you in our most intimate suite — soft lighting, a soaking tub built for two, and rose petals waiting on the bed. Champagne arrives chilled the moment you check in, and one evening during your stay is reserved for a private candlelight dinner curated by our culinary team. A getaway meant to be remembered, not just booked.",

    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1600&q=85",
    mainImage:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1600&q=85",
    panoramaImage: "https://pannellum.org/images/alma.jpg",

    gallery: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1600&q=85",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1600&q=85",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1600&q=85",
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=1600&q=85",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1600&q=85",
    ],

    originalPrice: 780,
    discountedPrice: 599,
    savings: 181,
    price: 599,

    expiry: "2026-09-15",

    hotelId: 2,
    hotelName: "Aurelia Grand Hotel",
    location: "Sylhet",
    country: "Bangladesh",

    roomName: "Honeymoon Suite",
    roomType: "Junior Suite",
    roomSize: "58 m²",
    bedType: "1 King Bed",
    bedCount: 1,
    capacity: 2,
    roomNumber: "204",
    view: "Garden View",
    floor: 2,
    balcony: true,
    bathroomType: "Bathtub Ensuite",
    smoking: false,

    rating: 4.9,
    reviewCount: 187,

    amenities: [
      "Free WiFi",
      "Air Conditioning",
      "Bathtub",
      "Balcony",
      "Mini Bar",
      "Rain Shower",
    ],

    highlights: [
      "Private candlelight dinner included",
      "Champagne on arrival",
      "Soaking tub for two",
    ],

    offerIncludes: [
      "2 nights in the Honeymoon Suite",
      "Bottle of champagne on arrival",
      "Private candlelight dinner for two",
      "Rose petal turndown service",
      "Daily breakfast in bed",
    ],

    exclusions: ["Spa treatments", "Alcoholic beverages beyond welcome champagne"],

    terms: [
      "Valid for couples only, proof of booking name required at check-in.",
      "Candlelight dinner must be scheduled 24 hours in advance.",
      "Non-refundable within 72 hours of check-in.",
      "Subject to availability during peak wedding season.",
    ],

    cancellationPolicy: "Free cancellation up to 72 hours before check-in.",

    checkIn: "15:00",
    checkOut: "12:00",

    breakfastIncluded: true,
    parkingIncluded: false,
    wifiIncluded: true,
    airConditioning: true,
    petsAllowed: false,

    featured: true,

    promoCode: "LOVE20",

    available: true,
    currency: "USD",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-06-01T00:00:00.000Z",

    ctaText: "Book Now",
  },

  {
    id: "3",
    slug: "family-suite-pinehill-resort",

    category: "family",
    badge: "Best Seller",

    title: "Family Suite with Kids Stay Free",
    heroTitle: "Made for Family Memories",
    heroSubtitle: "Two connecting rooms, full pool access, and kids stay free.",

    description:
      "Two connecting rooms, complimentary kids' breakfast, and full pool access for the whole family.",
    shortDescription:
      "Two connecting rooms, complimentary kids' breakfast, and full pool access for the whole family.",
    fullDescription:
      "Built for families who want space without sacrificing togetherness, this suite connects a parents' room to a dedicated kids' nook with its own twin beds. Little ones eat breakfast free, and the resort's pool, kids' club, and game room are all included in your stay. Spend the day making memories and the evening relaxing — we've taken care of the rest.",

    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1600&q=85",
    mainImage:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1600&q=85",
    panoramaImage: "https://pannellum.org/images/alma.jpg",

    gallery: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1600&q=85",
      "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=1600&q=85",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1600&q=85",
      "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?w=1600&q=85",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1600&q=85",
    ],

    originalPrice: 540,
    discountedPrice: 432,
    savings: 108,
    price: 432,

    expiry: "2026-08-20",

    hotelId: 3,
    hotelName: "Pinehill Family Resort",
    location: "Cox's Bazar",
    country: "Bangladesh",

    roomName: "Family Suite",
    roomType: "Family Room",
    roomSize: "70 m²",
    bedType: "1 King + 2 Twin Beds",
    bedCount: 3,
    capacity: 5,
    roomNumber: "108",
    view: "Garden View",
    floor: 1,
    balcony: true,
    bathroomType: "Ensuite Bathroom",
    smoking: false,

    rating: 4.6,
    reviewCount: 421,

    amenities: [
      "Free WiFi",
      "Air Conditioning",
      "Smart TV",
      "Pool Access",
      "Kids Club",
      "Parking",
    ],

    highlights: [
      "Kids stay and eat breakfast free",
      "Two connecting rooms",
      "Full resort pool & kids' club access",
    ],

    offerIncludes: [
      "3 nights in a Family Suite (2 connecting rooms)",
      "Daily breakfast for the whole family",
      "Full pool and kids' club access",
      "Welcome gift for children",
      "Free parking",
    ],

    exclusions: ["Babysitting services", "Off-site excursions"],

    terms: [
      "Kids stay free applies to children under 12 sharing existing bedding.",
      "Valid for stays of minimum 2 nights.",
      "Kids' club access subject to age requirements (4-12 years).",
      "Blackout dates may apply during public holidays.",
    ],

    cancellationPolicy: "Free cancellation up to 72 hours before check-in.",

    checkIn: "14:00",
    checkOut: "11:00",

    breakfastIncluded: true,
    parkingIncluded: true,
    wifiIncluded: true,
    airConditioning: true,
    petsAllowed: true,

    featured: false,

    promoCode: "FAMILYFREE",

    available: true,
    currency: "USD",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-06-01T00:00:00.000Z",

    ctaText: "Book Now",
  },

  {
    id: "4",
    slug: "executive-business-ivory-tower",

    category: "business",
    badge: "30% OFF",

    title: "Executive Business Stay",
    heroTitle: "Built for the Business Traveler",
    heroSubtitle: "High-speed WiFi, a dedicated workspace, and airport transfers included.",

    description:
      "High-speed WiFi, dedicated workspace, and complimentary airport transfer for the working traveler.",
    shortDescription:
      "High-speed WiFi, dedicated workspace, and complimentary airport transfer for the working traveler.",
    fullDescription:
      "When the trip is about the work, every detail should make that easier. The Executive Business Stay includes a quiet room with a proper desk, reliable high-speed internet, priority check-in so you're never waiting in a lobby, and a complimentary airport transfer on arrival. Meeting room credit is included for anyone who needs to bring the boardroom to the hotel.",

    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1600&q=85",
    mainImage:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1600&q=85",
    panoramaImage: "https://pannellum.org/images/alma.jpg",

    gallery: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1600&q=85",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1600&q=85",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1600&q=85",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1600&q=85",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1600&q=85",
    ],

    originalPrice: 260,
    discountedPrice: 182,
    savings: 78,
    price: 182,

    expiry: "2026-09-01",

    hotelId: 4,
    hotelName: "Ivory Tower Business Hotel",
    location: "Dhaka",
    country: "Bangladesh",

    roomName: "Executive Business Room",
    roomType: "Executive Room",
    roomSize: "36 m²",
    bedType: "1 King Bed",
    bedCount: 1,
    capacity: 2,
    roomNumber: "515",
    view: "City View",
    floor: 5,
    balcony: false,
    bathroomType: "Ensuite Bathroom",
    smoking: false,

    rating: 4.5,
    reviewCount: 264,

    amenities: [
      "Free WiFi",
      "Air Conditioning",
      "Work Desk",
      "Coffee Machine",
      "Safe Box",
      "Smart TV",
    ],

    highlights: [
      "Complimentary airport transfer",
      "Priority check-in",
      "Meeting room credit included",
    ],

    offerIncludes: [
      "1 night in an Executive Business Room",
      "Complimentary airport transfer (one-way)",
      "Priority check-in",
      "Meeting room credit ($50)",
      "Daily breakfast",
    ],

    exclusions: ["Return airport transfer", "Printing and courier services"],

    terms: [
      "Airport transfer must be requested 24 hours prior to arrival.",
      "Meeting room credit valid during the stay only, non-transferable.",
      "Valid for single or double occupancy.",
      "Corporate ID may be requested at check-in.",
    ],

    cancellationPolicy: "Free cancellation up to 24 hours before check-in.",

    checkIn: "13:00",
    checkOut: "12:00",

    breakfastIncluded: true,
    parkingIncluded: true,
    wifiIncluded: true,
    airConditioning: true,
    petsAllowed: false,

    featured: false,

    promoCode: "BIZ30",

    available: true,
    currency: "USD",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-06-01T00:00:00.000Z",

    ctaText: "Book Now",
  },

  {
    id: "5",
    slug: "spa-retreat-coral-bay",

    category: "spa",
    badge: "Limited Time",

    title: "Spa Retreat & Wellness Package",
    heroTitle: "Slow Down. Breathe In.",
    heroSubtitle: "Two nights, a couples massage, and full access to the thermal suite.",

    description:
      "Two nights, a 90-minute couples massage, and full access to the thermal suite and ocean-view terrace.",
    shortDescription:
      "Two nights, a 90-minute couples massage, and full access to the thermal suite and ocean-view terrace.",
    fullDescription:
      "This is a package built entirely around rest. Your stay includes a 90-minute couples massage, unlimited access to the thermal suite — steam room, sauna, and heated relaxation pool — and a herbal tea ritual served on the ocean-view terrace each evening. Rooms are appointed with rainfall showers and soft, breathable linens, so even the in-between moments feel like part of the treatment.",

    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1600&q=85",
    mainImage:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1600&q=85",
    panoramaImage: "https://pannellum.org/images/alma.jpg",

    gallery: [
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1600&q=85",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1600&q=85",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1600&q=85",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1600&q=85",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1600&q=85",
    ],

    originalPrice: 610,
    discountedPrice: 458,
    savings: 152,
    price: 458,

    expiry: "2026-08-25",

    hotelId: 5,
    hotelName: "Coral Bay Beach Resort",
    location: "Cox's Bazar",
    country: "Bangladesh",

    roomName: "Ocean Breeze Junior Suite",
    roomType: "Junior Suite",
    roomSize: "48 m²",
    bedType: "1 King Bed",
    bedCount: 1,
    capacity: 3,
    roomNumber: "622",
    view: "Ocean View",
    floor: 6,
    balcony: true,
    bathroomType: "Rain Shower Ensuite",
    smoking: false,

    rating: 4.9,
    reviewCount: 356,

    amenities: [
      "Free WiFi",
      "Air Conditioning",
      "Balcony",
      "Ocean View",
      "Rain Shower",
      "Mini Bar",
    ],

    highlights: [
      "90-minute couples massage included",
      "Unlimited thermal suite access",
      "Ocean-view private balcony",
    ],

    offerIncludes: [
      "2 nights in an Ocean Breeze Junior Suite",
      "90-minute couples massage",
      "Unlimited thermal suite access",
      "Evening herbal tea ritual",
      "Daily healthy breakfast menu",
    ],

    exclusions: ["Additional spa treatments beyond the included massage", "Alcoholic beverages"],

    terms: [
      "Spa treatments must be booked in advance and are subject to availability.",
      "Thermal suite access is for registered guests aged 16 and above.",
      "Rescheduling of spa appointments requires 12 hours' notice.",
      "Package is per room, based on double occupancy.",
    ],

    cancellationPolicy: "Free cancellation up to 72 hours before check-in.",

    checkIn: "15:00",
    checkOut: "12:00",

    breakfastIncluded: true,
    parkingIncluded: true,
    wifiIncluded: true,
    airConditioning: true,
    petsAllowed: false,

    featured: true,

    promoCode: "SPARELAX",

    available: true,
    currency: "USD",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-06-01T00:00:00.000Z",

    ctaText: "Book Now",
  },

  {
    id: "6",
    slug: "presidential-suite-regal-meridian",

    category: "suites",
    badge: "Best Seller",

    title: "Presidential Suite Experience",
    heroTitle: "The Pinnacle of the Collection",
    heroSubtitle: "110 m² of pure luxury with a private butler and panoramic city views.",

    description:
      "110 m² of pure luxury with a private butler and panoramic city views.",
    shortDescription:
      "110 m² of pure luxury with a private butler and panoramic city views.",
    fullDescription:
      "An entire corner of the top floor, reimagined as a private residence for the duration of your stay. The Presidential Suite pairs a sweeping living area with panoramic skyline views, a marble bathroom built for two, and a dedicated butler on call throughout your visit. Every detail — from the in-suite dining setup to the turndown ritual — is handled so your only responsibility is to enjoy it.",

    image:
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=1600&q=85",
    mainImage:
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=1600&q=85",
    panoramaImage: "https://pannellum.org/images/alma.jpg",

    gallery: [
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=1600&q=85",
      "https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=1600&q=85",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1600&q=85",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1600&q=85",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1600&q=85",
    ],

    originalPrice: 1450,
    discountedPrice: 1150,
    savings: 300,
    price: 1150,

    expiry: "2026-09-30",

    hotelId: 1,
    hotelName: "The Regal Meridian",
    location: "Dhaka",
    country: "Bangladesh",

    roomName: "Grand Presidential Suite",
    roomType: "Presidential Suite",
    roomSize: "110 m²",
    bedType: "1 King Bed + Lounge",
    bedCount: 1,
    capacity: 4,
    roomNumber: "PH1",
    view: "Panoramic City View",
    floor: 20,
    balcony: true,
    bathroomType: "Marble Rain Shower + Soaking Tub",
    smoking: false,

    rating: 5.0,
    reviewCount: 98,

    amenities: [
      "Free WiFi",
      "Air Conditioning",
      "Smart TV",
      "Mini Bar",
      "Bathtub",
      "Room Service",
    ],

    highlights: [
      "Dedicated private butler",
      "Panoramic skyline views",
      "Separate living and dining area",
    ],

    offerIncludes: [
      "2 nights in the Grand Presidential Suite",
      "Private butler service throughout your stay",
      "Daily breakfast served in-suite",
      "Complimentary airport limousine transfer",
      "Evening canapés and champagne",
    ],

    exclusions: ["Spa treatments", "Off-site dining experiences"],

    terms: [
      "Subject to availability; advance booking of at least 7 days recommended.",
      "Butler service available during standard hotel hours (7 AM – 11 PM).",
      "Non-refundable within 7 days of check-in.",
      "Rate is per suite, per stay, based on double occupancy.",
    ],

    cancellationPolicy: "Free cancellation up to 7 days before check-in.",

    checkIn: "15:00",
    checkOut: "12:00",

    breakfastIncluded: true,
    parkingIncluded: true,
    wifiIncluded: true,
    airConditioning: true,
    petsAllowed: false,

    featured: true,

    promoCode: "PRESIDENTIAL",

    available: true,
    currency: "USD",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-06-01T00:00:00.000Z",

    ctaText: "Book Now",
  },

  {
    id: "7",
    slug: "seasonal-monsoon-getaway-willow-creek",

    category: "seasonal",
    badge: "Seasonal",

    title: "Monsoon Getaway at Willow Creek",
    heroTitle: "Rainy Days, Cozy Stays",
    heroSubtitle: "A countryside escape with fireside evenings and warm comfort food.",

    description:
      "A cozy countryside package with a wood-burning fireplace, warm comfort food, and rain-soaked garden views.",
    shortDescription:
      "A cozy countryside package with a wood-burning fireplace, warm comfort food, and rain-soaked garden views.",
    fullDescription:
      "There's a particular kind of comfort found in a countryside inn during monsoon season — the sound of rain against the window, a fire crackling in the room, and a menu built around warm, hearty comfort food. This seasonal package includes a Farmhouse Suite with its own fireplace, a nightly set dinner, and unlimited access to the reading lounge and garden veranda, rain or shine.",

    image:
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=1600&q=85",
    mainImage:
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=1600&q=85",
    panoramaImage: "https://pannellum.org/images/alma.jpg",

    gallery: [
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=1600&q=85",
      "https://images.unsplash.com/photo-1595877244574-e90ce41ce089?w=1600&q=85",
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1600&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=85",
      "https://images.unsplash.com/photo-1523755231516-e43fd2e8dca5?w=1600&q=85",
    ],

    originalPrice: 220,
    discountedPrice: 165,
    savings: 55,
    price: 165,

    expiry: "2026-08-31",

    hotelId: 6,
    hotelName: "Willow Creek Countryside Inn",
    location: "Sylhet",
    country: "Bangladesh",

    roomName: "Farmhouse Suite",
    roomType: "Superior Room",
    roomSize: "42 m²",
    bedType: "1 King + 1 Sofa Bed",
    bedCount: 2,
    capacity: 4,
    roomNumber: "14",
    view: "Garden View",
    floor: 1,
    balcony: false,
    bathroomType: "Ensuite Bathroom",
    smoking: false,

    rating: 4.6,
    reviewCount: 143,

    amenities: [
      "Free WiFi",
      "Fireplace",
      "Garden View",
      "Smart TV",
      "Breakfast Included",
      "Parking",
    ],

    highlights: [
      "In-room wood-burning fireplace",
      "Nightly set dinner included",
      "Unlimited access to the reading lounge",
    ],

    offerIncludes: [
      "2 nights in the Farmhouse Suite",
      "Nightly set dinner for two",
      "Daily breakfast",
      "Unlimited reading lounge & veranda access",
      "Late checkout on departure day",
    ],

    exclusions: ["À la carte dining beyond the set dinner", "Guided countryside tours"],

    terms: [
      "Offer valid only during the seasonal monsoon period (June–September).",
      "Set dinner menu is fixed and does not include alcoholic beverages.",
      "Subject to weather-related activity changes.",
      "Rate is per suite, per stay, based on double occupancy.",
    ],

    cancellationPolicy: "Free cancellation up to 48 hours before check-in.",

    checkIn: "14:00",
    checkOut: "11:00",

    breakfastIncluded: true,
    parkingIncluded: true,
    wifiIncluded: true,
    airConditioning: false,
    petsAllowed: true,

    featured: false,

    promoCode: "MONSOON25",

    available: true,
    currency: "USD",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-06-01T00:00:00.000Z",

    ctaText: "Book Now",
  },

  {
    id: "8",
    slug: "sunset-dining-harbour-lights",

    category: "restaurant",
    badge: "Exclusive",

    title: "Sunset Dining & Harbour View Stay",
    heroTitle: "Dinner With a View",
    heroSubtitle: "A harbour-view suite paired with a private five-course sunset dinner.",

    description:
      "A harbour-view suite paired with a private five-course tasting dinner as the sun sets over the water.", 
    shortDescription:
      "A harbour-view suite paired with a private five-course tasting dinner as the sun sets over the water.",
    fullDescription:
      "Reserved for guests who want their evening to matter as much as their room. This package pairs a Harbour View Suite with a private table set on the terrace for a five-course tasting dinner, timed to the sunset over the harbour. Each course is paired with a non-alcoholic signature mocktail, and the evening closes with a dessert tasting brought tableside. Mornings after are just as considered, with breakfast served on your private balcony.",

    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=85",
    mainImage:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=85",
    panoramaImage: "https://pannellum.org/images/alma.jpg",

    gallery: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=85",
      "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=1600&q=85",
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1600&q=85",
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1600&q=85",
      "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=1600&q=85",
    ],

    originalPrice: 410,
    discountedPrice: 328,
    savings: 82,
    price: 328,

    expiry: "2026-09-10",

    hotelId: 7,
    hotelName: "Harbour Lights Hotel",
    location: "Chittagong",
    country: "Bangladesh",

    roomName: "Harbour View Suite",
    roomType: "Junior Suite",
    roomSize: "48 m²",
    bedType: "1 King Bed",
    bedCount: 1,
    capacity: 3,
    roomNumber: "7",
    view: "Ocean View",
    floor: 1,
    balcony: true,
    bathroomType: "Ensuite Bathroom",
    smoking: false,

    rating: 4.8,
    reviewCount: 176,

    amenities: [
      "Free WiFi",
      "Air Conditioning",
      "Balcony",
      "Ocean View",
      "Mini Bar",
      "Room Service",
    ],

    highlights: [
      "Private five-course sunset dinner",
      "Harbour-view private balcony",
      "Breakfast served balcony-side",
    ],

    offerIncludes: [
      "1 night in the Harbour View Suite",
      "Private five-course sunset tasting dinner",
      "Signature mocktail pairing with each course",
      "Breakfast served on your private balcony",
      "Late checkout (1 PM)",
    ],

    exclusions: ["Alcoholic beverage pairing", "Additional in-room dining"],

    terms: [
      "Dinner reservation time is subject to sunset hours and season.",
      "Advance booking of 48 hours required to confirm the tasting menu.",
      "Dietary restrictions must be communicated at time of booking.",
      "Rate is per suite, per night, based on double occupancy.",
    ],

    cancellationPolicy: "Free cancellation up to 48 hours before check-in.",

    checkIn: "14:00",
    checkOut: "13:00",

    breakfastIncluded: true,
    parkingIncluded: false,
    wifiIncluded: true,
    airConditioning: true,
    petsAllowed: false,

    featured: true,

    promoCode: "SUNSET15",

    available: true,
    currency: "USD",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-06-01T00:00:00.000Z",

    ctaText: "Book Now",
  },
];

export default offersdatas;

export const getOfferById = (id) => offersdatas.find((offer) => offer.id === String(id));

export const getOfferBySlug = (slug) => offersdatas.find((offer) => offer.slug === slug);

export const getOfferByIdOrSlug = (value) =>
  offersdatas.find((offer) => offer.id === String(value) || offer.slug === value);

export const getSimilarOffers = (id, limit = 3) => {
  const current = getOfferById(id);
  if (!current) return [];

  const sameCategory = offersdatas.filter(
    (offer) => offer.id !== current.id && offer.category === current.category
  );

  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);

  const fallback = offersdatas.filter(
    (offer) => offer.id !== current.id && !sameCategory.includes(offer)
  );

  return [...sameCategory, ...fallback].slice(0, limit);
};


export const packages = [
  {
    id: "pkg-romantic",
    name: "Romantic Escape",
    icon: "Heart",
    benefits: ["Candlelight dinner", "Rose petal turndown", "Late checkout"],
    included: ["2 nights suite stay", "Champagne on arrival", "Couples spa access"],
    price: 599,
    duration: "2 Nights",
  },
  {
    id: "pkg-family",
    name: "Family Vacation",
    icon: "Users",
    benefits: ["Kids stay free", "Pool & game room access", "Family breakfast"],
    included: ["Connecting rooms", "Daily kids' activities", "Welcome gift for children"],
    price: 432,
    duration: "3 Nights",
  },
  {
    id: "pkg-business",
    name: "Business Package",
    icon: "Briefcase",
    benefits: ["Priority check-in", "Meeting room credit", "Airport transfer"],
    included: ["Executive room", "High-speed WiFi", "Daily breakfast"],
    price: 280,
    duration: "1 Night",
  },
  {
    id: "pkg-spa",
    name: "Spa Retreat",
    icon: "Sparkles",
    benefits: ["90-min massage", "Thermal suite access", "Herbal tea ritual"],
    included: ["2 nights stay", "Spa credit $100", "Healthy breakfast menu"],
    price: 458,
    duration: "2 Nights",
  },
  {
    id: "pkg-weekend",
    name: "Weekend Getaway",
    icon: "CalendarDays",
    benefits: ["Flexible check-in", "Late checkout", "Welcome drink"],
    included: ["2 nights deluxe room", "Breakfast for two", "Free parking"],
    price: 224,
    duration: "2 Nights",
  },
  {
    id: "pkg-luxury",
    name: "Luxury Experience",
    icon: "Crown",
    benefits: ["Private butler", "Airport limousine", "Exclusive lounge access"],
    included: ["Presidential suite", "5-course tasting menu", "Personal concierge"],
    price: 1150,
    duration: "2 Nights",
  },
];

export const membershipTiers = [
  {
    id: "silver",
    name: "Silver Member",
    discount: 10,
    perks: { breakfast: true, lateCheckout: false, roomUpgrade: false, loungeAccess: false },
  },
  {
    id: "gold",
    name: "Gold Member",
    discount: 20,
    perks: { breakfast: true, lateCheckout: true, roomUpgrade: true, loungeAccess: false },
  },
  {
    id: "vip",
    name: "VIP Member",
    discount: 30,
    perks: { breakfast: true, lateCheckout: true, roomUpgrade: true, loungeAccess: true },
  },
];

export const whyBookDirect = [
  {
    id: "price",
    icon: "BadgeCheck",
    title: "Best Price Guarantee",
    description: "Find it cheaper elsewhere and we'll match it, plus give you 10% off.",
  },
  {
    id: "cancel",
    icon: "ShieldCheck",
    title: "Free Cancellation",
    description: "Plans change. Cancel up to 24 hours before check-in at no charge.",
  },
  {
    id: "confirm",
    icon: "Zap",
    title: "Instant Confirmation",
    description: "Your booking is confirmed the moment you complete checkout.",
  },
  {
    id: "support",
    icon: "Headset",
    title: "24/7 Customer Support",
    description: "Our concierge team is available around the clock, every day.",
  },
];

export const testimonials = [
  {
    id: "t-1",
    name: "Isabelle Moreau",
    country: "France",
    rating: 5,
    avatar: "https://i.pravatar.cc/100?img=47",
    review:
      "The honeymoon package exceeded every expectation. The suite, the service, the little details — pure luxury from start to finish.",
  },
  {
    id: "t-2",
    name: "Daniel Osei",
    country: "United Kingdom",
    rating: 5,
    avatar: "https://i.pravatar.cc/100?img=12",
    review:
      "Booked the business package for a work trip and it saved me so much time. Seamless check-in and a beautifully quiet room to work from.",
  },
  {
    id: "t-3",
    name: "Hana Kobayashi",
    country: "Japan",
    rating: 4,
    avatar: "https://i.pravatar.cc/100?img=32",
    review:
      "The spa retreat was exactly what we needed. Thoughtful staff, a gorgeous thermal suite, and genuinely relaxing from check-in to checkout.",
  },
];

export const faqs = [
  {
    id: "faq-1",
    question: "How do I redeem a promo code?",
    answer:
      "Enter your code in the Promo Code box on this page or at checkout. The discount applies automatically before you confirm your booking.",
  },
  {
    id: "faq-2",
    question: "Can I combine two offers?",
    answer:
      "Offers can't be combined, but we'll always apply whichever discount gives you the better rate.",
  },
  {
    id: "faq-3",
    question: "What is the cancellation policy for these offers?",
    answer:
      "Most offers include free cancellation up to 24 hours before check-in. Check the specific offer card for any exceptions.",
  },
  {
    id: "faq-4",
    question: "Do membership discounts apply automatically?",
    answer:
      "Yes. Once you're signed in with your membership account, your tier discount is applied automatically at checkout.",
  },
  {
    id: "faq-5",
    question: "Is breakfast included in every package?",
    answer:
      "Breakfast inclusion varies by package — it's listed under 'Included' on each package card so you know exactly what you're getting.",
  },
];
