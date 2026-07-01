import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiSearch,
  FiStar,
  FiUsers,
  FiChevronRight,
  FiCheck,
  FiPhone,
  FiShield,
  FiAward,
  FiClock,
  FiTag,
  FiWifi,
  FiDroplet,
  FiSun,
  FiCoffee,
  FiTv, // এখানে 'FiTV' পরিবর্তন করে 'FiTv' করা হয়েছে
} from "react-icons/fi";
import { MdOutlineKingBed, MdOutlineBathtub, MdOutlinePool } from "react-icons/md";
import { TbMassage } from "react-icons/tb";
import { useSearchParams } from "react-router-dom";
const roomsData = [
  {
    id: 1,
    name: "Classic Standard Room",
    type: "Standard",
    location: "Dhaka",
    city: "Dhaka",
    country: "Bangladesh",

    price: 149,

    rating: 4.3,
    reviews: 128,

    capacity: 2,
    beds: 1,
    bathrooms: 1,
    size: "32 m²",

    breakfast: true,
    wifi: true,
    parking: true,
    ac: true,
    tv: true,
    minibar: false,

    cancellation: true,
    featured: true,
    available: true,

    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",

    gallery: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200",
    ],

    description:
      "A well-appointed room with elegant interiors, premium bedding, city views, complimentary WiFi, and modern amenities for a relaxing luxury stay.",
  },

  {
    id: 2,
    name: "Deluxe Garden View",
    type: "Deluxe",
    location: "Cox's Bazar",
    city: "Sylhet",
    country: "Bangladesh",

    price: 229,

    rating: 4.6,
    reviews: 94,

    capacity: 2,
    beds: 1,
    bathrooms: 1,
    size: "38 m²",

    breakfast: true,
    wifi: true,
    parking: true,
    ac: true,
    tv: true,
    minibar: true,

    cancellation: true,
    featured: true,
    available: true,

    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",

    gallery: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200",
    ],

    description:
      "A beautifully designed deluxe room overlooking lush gardens, featuring a king-size bed, marble bathroom, luxury furnishings, and a private balcony.",
  },

  {
    id: 3,
    name: "Executive Suite",
    type: "Executive",
    location: "Sylhet",
    city: "Dhaka",
    country: "Bangladesh",

    price: 389,

    rating: 4.8,
    reviews: 67,

    capacity: 3,
    beds: 1,
    bathrooms: 2,
    size: "55 m²",

    breakfast: true,
    wifi: true,
    parking: true,
    ac: true,
    tv: true,
    minibar: true,

    cancellation: true,
    featured: true,
    available: true,

    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",

    gallery: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200",
    ],

    description:
      "An elegant executive suite with a spacious living area, panoramic skyline views, luxury bathroom, premium workspace, and exclusive executive lounge access.",
  },

  {
    id: 4,
    name: "Family Suite",
    type: "Family Suite",
    location: "Chattogram",
    city: "Cox's Bazar",
    country: "Bangladesh",

    price: 449,

    rating: 4.7,
    reviews: 52,

    capacity: 5,
    beds: 3,
    bathrooms: 2,
    size: "75 m²",

    breakfast: true,
    wifi: true,
    parking: true,
    ac: true,
    tv: true,
    minibar: true,

    cancellation: true,
    featured: false,
    available: false,

    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80",

    gallery: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200",
    ],

    description:
      "A spacious family suite with two bedrooms, elegant lounge, dining space, luxury amenities, and beautiful sea-facing windows for memorable family vacations.",
  },

  {
    id: 5,
    name: "Ocean View Deluxe",
    type: "Deluxe",
    location: "Cox's Bazar",
    city: "Cox's Bazar",
    country: "Bangladesh",

    price: 269,

    rating: 4.9,
    reviews: 113,

    capacity: 2,
    beds: 1,
    bathrooms: 1,
    size: "42 m²",

    breakfast: true,
    wifi: true,
    parking: true,
    ac: true,
    tv: true,
    minibar: true,

    cancellation: true,
    featured: true,
    available: true,

    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",

    gallery: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200",
    ],

    description:
      "Wake up to breathtaking ocean views in this luxury deluxe room offering a private balcony, premium furnishings, king-size bed, and exceptional comfort.",
  },
  {
    id: 6,
    name: "Classic Standard Room",
    type: "Standard",
    location: "Dhaka",
    city: "Dhaka",
    country: "Bangladesh",

    price: 149,

    rating: 4.3,
    reviews: 128,

    capacity: 2,
    beds: 1,
    bathrooms: 1,
    size: "32 m²",

    breakfast: true,
    wifi: true,
    parking: true,
    ac: true,
    tv: true,
    minibar: false,

    cancellation: true,
    featured: true,
    available: true,

    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",

    gallery: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200",
    ],

    description:
      "A well-appointed room with elegant interiors, premium bedding, city views, complimentary WiFi, and modern amenities for a relaxing luxury stay.",
  },

  {
    id: 7,
    name: "Deluxe Garden View",
    type: "Deluxe",
    location: "Rajshahi",
    city: "Sylhet",
    country: "Bangladesh",

    price: 229,

    rating: 4.6,
    reviews: 94,

    capacity: 2,
    beds: 1,
    bathrooms: 1,
    size: "38 m²",

    breakfast: true,
    wifi: true,
    parking: true,
    ac: true,
    tv: true,
    minibar: true,

    cancellation: true,
    featured: true,
    available: true,

    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",

    gallery: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200",
    ],

    description:
      "A beautifully designed deluxe room overlooking lush gardens, featuring a king-size bed, marble bathroom, luxury furnishings, and a private balcony.",
  },

  {
    id: 8,
    name: "Executive Suite",
    type: "Executive",
    location: "Khulna",
    city: "Dhaka",
    country: "Bangladesh",

    price: 389,

    rating: 4.8,
    reviews: 67,

    capacity: 3,
    beds: 1,
    bathrooms: 2,
    size: "55 m²",

    breakfast: true,
    wifi: true,
    parking: true,
    ac: true,
    tv: true,
    minibar: true,

    cancellation: true,
    featured: true,
    available: true,

    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",

    gallery: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200",
    ],

    description:
      "An elegant executive suite with a spacious living area, panoramic skyline views, luxury bathroom, premium workspace, and exclusive executive lounge access.",
  },

  {
    id: 9,
    name: "Family Suite",
    type: "Family Suite",
    location: "Bandarban",
    city: "Cox's Bazar",
    country: "Bangladesh",

    price: 449,

    rating: 4.7,
    reviews: 52,

    capacity: 5,
    beds: 3,
    bathrooms: 2,
    size: "75 m²",

    breakfast: true,
    wifi: true,
    parking: true,
    ac: true,
    tv: true,
    minibar: true,

    cancellation: true,
    featured: false,
    available: false,

    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80",

    gallery: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200",
    ],

    description:
      "A spacious family suite with two bedrooms, elegant lounge, dining space, luxury amenities, and beautiful sea-facing windows for memorable family vacations.",
  },

  {
    id: 10,
    name: "Ocean View Deluxe",
    type: "Deluxe",
    location: "Rangamati",
    city: "Cox's Bazar",
    country: "Bangladesh",

    price: 269,

    rating: 4.9,
    reviews: 113,

    capacity: 2,
    beds: 1,
    bathrooms: 1,
    size: "42 m²",

    breakfast: true,
    wifi: true,
    parking: true,
    ac: true,
    tv: true,
    minibar: true,

    cancellation: true,
    featured: true,
    available: true,

    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",

    gallery: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200",
    ],

    description:
      "Wake up to breathtaking ocean views in this luxury deluxe room offering a private balcony, premium furnishings, king-size bed, and exceptional comfort.",
  },



























];

const featureCards = [
  {
    icon: <FiTag className="w-7 h-7" />,
    title: "Best Price Guarantee",
    desc: "We match any price you find — book direct and pay less, guaranteed.",
  },
  {
    icon: <FiAward className="w-7 h-7" />,
    title: "Premium Facilities",
    desc: "From infinity pools to spa sanctuaries — every amenity crafted for indulgence.",
  },
  {
    icon: <FiClock className="w-7 h-7" />,
    title: "24/7 Concierge Support",
    desc: "Our team is always on hand, day or night, to ensure a flawless experience.",
  },
  {
    icon: <FiShield className="w-7 h-7" />,
    title: "Secure Booking",
    desc: "Your data and payments are protected with bank-grade SSL encryption.",
  },
];

const ROOM_TYPES = ["All", "Standard", "Deluxe", "Executive", "Family Suite", "Presidential Suite"];

const StarRating = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <FiStar
        key={s}
        className={`w-3.5 h-3.5 ${s <= Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-stone-300"}`}
      />
    ))}
  </div>
);

const TypeBadge = ({ type }) => {
  const colors = {
    Standard: "bg-stone-100 text-stone-600",
    Deluxe: "bg-blue-50 text-blue-700",
    Executive: "bg-violet-50 text-violet-700",
    "Family Suite": "bg-emerald-50 text-emerald-700",
    "Presidential Suite": "bg-amber-50 text-amber-700",
  };
  return (
    <span className={`text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full ${colors[type] || "bg-stone-100 text-stone-600"}`}>
      {type}
    </span>
  );
};

export default function RoomsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [maxPrice, setMaxPrice] = useState(1500);
  const [capacityFilter, setCapacityFilter] = useState("Any");
  const [availabilityFilter, setAvailabilityFilter] = useState("All");
  const [activeFilters, setActiveFilters] = useState(null);

  const [searchParams] = useSearchParams();

  const location = searchParams.get("location");
  const adults = Number(searchParams.get("adults"));
const filteredRooms = roomsData.filter((room) => {
  const matchLocation =
    !location ||
    room.location.toLowerCase().includes(location.toLowerCase());

  const matchCapacity = room.capacity >= adults;

  return matchLocation && matchCapacity;
});


  const applySearch = () => {
    setActiveFilters({ search, typeFilter, maxPrice, capacityFilter, availabilityFilter });
  };

  const filters = activeFilters || { search: "", typeFilter: "All", maxPrice: 1500, capacityFilter: "Any", availabilityFilter: "All" };

  const filtered = filteredRooms.filter((r) => {
    const matchName = r.name.toLowerCase().includes(filters.search.toLowerCase());
    const matchType = filters.typeFilter === "All" || r.type === filters.typeFilter;
    const matchPrice = r.price <= filters.maxPrice;
    const matchCap =
      filters.capacityFilter === "Any" ||
      (filters.capacityFilter === "1" && r.capacity >= 1) ||
      (filters.capacityFilter === "2" && r.capacity >= 2) ||
      (filters.capacityFilter === "3" && r.capacity >= 3) ||
      (filters.capacityFilter === "4+" && r.capacity >= 4);
    const matchAvail =
      filters.availabilityFilter === "All" ||
      (filters.availabilityFilter === "Available" && r.available) ||
      (filters.availabilityFilter === "Unavailable" && !r.available);
    return matchName && matchType && matchPrice && matchCap && matchAvail;
  });

  return (
    <div className="min-h-screen bg-[#FAFAF8] font-sans antialiased">

      {/* ── HERO ── */}
      <section className="relative h-[540px] md:h-[620px] flex flex-col justify-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600&q=85"
          alt="Luxury hotel lobby"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
          style={{ filter: "brightness(0.45)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 pb-14 md:pb-20 w-full">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-white/50 mb-6 tracking-wide uppercase font-medium">
            <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <FiChevronRight className="w-3 h-3" />
            <span className="text-amber-400">Rooms & Suites</span>
          </nav>

          <p className="text-amber-400 text-xs font-semibold uppercase tracking-[0.3em] mb-3">
            The Grandeur Collection
          </p>
          <h1 className="text-4xl md:text-6xl font-light text-white leading-[1.1] mb-4 max-w-2xl">
            Discover Our <span className="italic text-amber-300">Luxury</span> Rooms & Suites
          </h1>
          <p className="text-white/60 text-base md:text-lg max-w-xl font-light">
            Choose the perfect room for your stay — from serene classics to sky-high penthouses.
          </p>
        </div>
      </section>

      {/* ── SEARCH & FILTER ── */}
      <section className="max-w-6xl mx-auto px-6 -mt-10 relative z-20 mb-16">
        <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.10)] p-6 md:p-8 border border-stone-100">
          <p className="text-xs text-amber-600 font-semibold uppercase tracking-widest mb-5">Search Rooms</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {/* Search */}
            <div className="relative">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search room name…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition"
              />
            </div>

            {/* Type */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition appearance-none cursor-pointer"
            >
              {ROOM_TYPES.map((t) => (
                <option key={t} value={t}>{t === "All" ? "All Room Types" : t}</option>
              ))}
            </select>

            {/* Capacity */}
            <select
              value={capacityFilter}
              onChange={(e) => setCapacityFilter(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition appearance-none cursor-pointer"
            >
              <option value="Any">Any Capacity</option>
              <option value="1">1+ Guest</option>
              <option value="2">2+ Guests</option>
              <option value="3">3+ Guests</option>
              <option value="4+">4+ Guests</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
            {/* Price Range */}
            <div>
              <div className="flex justify-between text-xs text-stone-500 mb-2">
                <span>Max Price / Night</span>
                <span className="text-amber-600 font-semibold">${maxPrice}</span>
              </div>
              <input
                type="range"
                min={100}
                max={1500}
                step={50}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Availability */}
            <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition appearance-none cursor-pointer"
            >
              <option value="All">All Availability</option>
              <option value="Available">Available Only</option>
              <option value="Unavailable">Unavailable</option>
            </select>

            {/* Search Button */}
            <button
              onClick={applySearch}
              className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm py-3 px-6 rounded-xl transition-all duration-200 shadow-md shadow-amber-200 active:scale-95"
            >
              <FiSearch className="w-4 h-4" />
              Search Rooms
            </button>
          </div>
        </div>
      </section>

      {/* ── ROOMS GRID ── */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs text-amber-600 font-semibold uppercase tracking-widest mb-1">Our Collection</p>
            <h2 className="text-3xl md:text-4xl font-light text-stone-800">
              Available <span className="italic text-stone-500">Accommodations</span>
            </h2>
          </div>
          <p className="text-sm text-stone-400 hidden sm:block">
            {filtered.length} room{filtered.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-stone-400">
            <MdOutlineKingBed className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-light">No rooms match your criteria.</p>
            <p className="text-sm mt-1">Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((room) => (
              <div
                key={room.id}
                className="group bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative overflow-hidden h-48">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-3 left-3">
                    <TypeBadge type={room.type} />
                  </div>
                  <div className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-1 rounded-full ${room.available ? "bg-emerald-500 text-white" : "bg-stone-400 text-white"}`}>
                    {room.available ? "Available" : "Booked"}
                  </div>
                </div>

                {/* Body */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-1.5">
                    <h3 className="text-[15px] font-semibold text-stone-800 leading-snug pr-2">{room.name}</h3>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <StarRating rating={room.rating} />
                    <span className="text-xs text-stone-400">{room.rating} ({room.reviews})</span>
                  </div>

                  <p className="text-xs text-stone-500 leading-relaxed mb-3 line-clamp-2">{room.description}</p>

                  <div className="flex items-center gap-3 text-xs text-stone-500 mb-4">
                    <span className="flex items-center gap-1">
                      <FiUsers className="w-3.5 h-3.5 text-amber-500" /> {room.capacity} Guests
                    </span>
                    <span className="flex items-center gap-1">
                      <MdOutlineKingBed className="w-3.5 h-3.5 text-amber-500" /> En-suite
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-xl font-bold text-stone-800">${room.price}</span>
                      <span className="text-xs text-stone-400 ml-1">/ night</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      to={`/rooms/${room.id}`}
                      className="flex-1 text-center text-xs font-semibold text-stone-700 border border-stone-200 rounded-lg py-2 hover:border-amber-400 hover:text-amber-600 transition-colors"
                    >
                      View Details
                    </Link>
                    <Link
                      to={`/book/${room.id}`}
                      className={`flex-1 text-center text-xs font-semibold py-2 rounded-lg transition-colors ${room.available
                        ? "bg-amber-500 text-white hover:bg-amber-600"
                        : "bg-stone-100 text-stone-400 cursor-not-allowed pointer-events-none"
                        }`}
                    >
                      {room.available ? "Book Now" : "Unavailable"}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── FEATURED LUXURY SUITE ── */}
      <section className="bg-stone-900 py-20 mb-0 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl">
            {/* Image Side */}
            <div className="relative h-72 lg:h-auto min-h-[460px]">
              <img
                src="https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=1000&q=85"
                alt="Grand Presidential Suite"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-stone-900/60" />
              <div className="absolute top-6 left-6 bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
                Featured Suite
              </div>
            </div>

            {/* Content Side */}
            <div className="bg-[#1C1A17] p-10 lg:p-14 flex flex-col justify-center">
              <p className="text-amber-400 text-xs font-semibold uppercase tracking-[0.3em] mb-4">
                The Crown Jewel
              </p>
              <h2 className="text-3xl md:text-4xl font-light text-white mb-4 leading-snug">
                Grand <span className="italic text-amber-300">Presidential</span> Suite
              </h2>
              <p className="text-stone-400 text-sm leading-relaxed mb-8 font-light">
                An entire floor transformed into a private sanctuary. This suite commands panoramic skyline views,
                features a private heated pool, dedicated butler, and interiors curated by an award-winning designer.
                The pinnacle of what a hotel stay can be.
              </p>

              {/* Premium Features */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { icon: <MdOutlinePool className="w-4 h-4" />, label: "Private Rooftop Pool" },
                  { icon: <TbMassage className="w-4 h-4" />, label: "In-Suite Spa" },
                  { icon: <FiWifi className="w-4 h-4" />, label: "Ultra-Fast Wi-Fi" },
                  { icon: <FiTv className="w-4 h-4" />, label: "Home Theatre" },
                  { icon: <FiCoffee className="w-4 h-4" />, label: "Personal Butler" },
                  { icon: <MdOutlineBathtub className="w-4 h-4" />, label: "Marble Rain Shower" },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-stone-300 text-xs">
                    <span className="text-amber-400">{f.icon}</span>
                    {f.label}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-5">
                <div>
                  <span className="text-3xl font-bold text-white">$1,299</span>
                  <span className="text-stone-400 text-sm ml-1">/ night</span>
                </div>
                <Link
                  to="/book/7"
                  className="flex-1 text-center bg-amber-500 hover:bg-amber-400 text-white font-semibold text-sm py-3.5 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-amber-500/20 active:scale-95"
                >
                  Book This Suite
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY STAY WITH US ── */}
      <section className="py-20 bg-[#FAFAF8]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs text-amber-600 font-semibold uppercase tracking-widest mb-3">Our Commitment</p>
            <h2 className="text-3xl md:text-4xl font-light text-stone-800">
              Why Stay <span className="italic text-stone-500">With Us</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featureCards.map((card, i) => (
              <div
                key={i}
                className="group bg-white rounded-2xl p-7 border border-stone-100 hover:border-amber-200 hover:shadow-lg transition-all duration-300 text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-50 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300 mb-5 mx-auto">
                  {card.icon}
                </div>
                <h3 className="text-[15px] font-semibold text-stone-800 mb-2">{card.title}</h3>
                <p className="text-xs text-stone-500 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AMENITIES STRIP ── */}
      <section className="bg-stone-800 py-8 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
            {[
              { icon: <FiWifi />, label: "Complimentary Wi-Fi" },
              { icon: <MdOutlinePool />, label: "Infinity Pool" },
              { icon: <TbMassage />, label: "Spa & Wellness" },
              { icon: <FiDroplet />, label: "Private Jacuzzi" },
              { icon: <FiSun />, label: "Panoramic Terrace" },
              { icon: <FiCoffee />, label: "Gourmet Breakfast" },
              { icon: <FiPhone />, label: "24/7 Room Service" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-stone-400 text-xs">
                <span className="text-amber-400 text-base">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="relative py-24 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1600&q=80"
          alt="Luxury pool at night"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.3)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 to-stone-900/80" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <p className="text-amber-400 text-xs font-semibold uppercase tracking-[0.3em] mb-4">
            Start Your Journey
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-white mb-5 leading-tight">
            Ready For Your <span className="italic text-amber-300">Next Stay?</span>
          </h2>
          <p className="text-white/60 text-base font-light mb-10 max-w-lg mx-auto">
            Reserve your room today and experience the art of effortless luxury. Every night is a story worth telling.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/rooms"
              className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-semibold text-sm py-4 px-10 rounded-xl transition-all duration-200 shadow-xl shadow-amber-500/20 active:scale-95"
            >
              <MdOutlineKingBed className="w-5 h-5" />
              Book A Room
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 border border-white/30 hover:border-amber-400 text-white hover:text-amber-300 font-semibold text-sm py-4 px-10 rounded-xl transition-all duration-200 backdrop-blur-sm active:scale-95"
            >
              <FiPhone className="w-4 h-4" />
              Contact Us
            </Link>
          </div>

          <div className="flex items-center justify-center gap-6 mt-10">
            {["No hidden fees", "Free cancellation", "Instant confirmation"].map((t, i) => (
              <div key={i} className="flex items-center gap-1.5 text-white/50 text-xs">
                <FiCheck className="w-3.5 h-3.5 text-amber-400" />
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}