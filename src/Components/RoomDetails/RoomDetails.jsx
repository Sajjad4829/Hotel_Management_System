import { useState } from "react";
import { useParams, Link } from "react-router-dom";

// ─── FEATHER ICONS (FI) ──────────────────────────────────────────────────────
// এখান থেকে 'FiBed' বাদ দেওয়া হয়েছে
import {
  FiWifi, 
  FiTv, 
  FiWind, 
  FiCoffee, 
  FiShield,
  FiUsers, 
  FiMaximize, 
  FiCheck, 
  FiArrowRight,
  FiChevronRight, 
  FiPhone, 
  FiMail, 
  FiMapPin,
} from "react-icons/fi";

// ─── MATERIAL DESIGN ICONS (MD) ──────────────────────────────────────────────
// এখানে আপনার প্রয়োজনীয় বেড আইকন 'MdOutlineBed' এবং রেটিং স্টার যোগ করা হয়েছে
import {
  MdOutlineRoomService, 
  MdOutlineLocalBar, 
  MdOutlineBathtub,
  MdOutlineBalcony, 
  MdOutlinePool, 
  MdOutlineSpa, 
  MdOutlineKitchen,
  MdOutlineDirectionsCar,
  MdOutlineBed,  // <-- এইটিই আপনার বেড আইকন (FiBed এর জায়গায় বসবে)
} from "react-icons/md";

// ─── OTHER ICONS ─────────────────────────────────────────────────────────────
import { GiVacuumCleaner } from "react-icons/gi";
import { PiArmchairFill } from "react-icons/pi";
import { TbMassage } from "react-icons/tb";
import { BsHouseDoor, BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

// ─── SHARED ROOM DATA ────────────────────────────────────────────────────────
export const roomsData = [
  {
    id: 1,
    name: "The Grand Presidential Suite",
    type: "Presidential Suite",
    price: 1850,
    rating: 4.9,
    reviews: 214,
    size: "185 m²",
    bed: "King Bed + Sofa Bed",
    guests: 4,
    available: true,
    description:
      "An unrivalled expression of hotel living, the grand presidential suite commands sweeping panoramic views from its private wraparound terrace. Curated antiques, hand-laid marble, and bespoke Italian furnishings establish an atmosphere of quiet authority.",
    images: [
      "https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=1200",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200",
    ],
    highlights: [
      "Ocean View",
      "Private Terrace",
      "Butler Service",
      "Daily Housekeeping",
    ],
    tag: "Most Popular",
  },

  {
    id: 2,
    name: "Deluxe Garden View",
    type: "Deluxe",
    price: 229,
    rating: 4.6,
    reviews: 94,
    size: "42 m²",
    bed: "King Bed",
    guests: 2,
    available: true,
    description:
      "Elegant deluxe room overlooking landscaped gardens with a private balcony, luxury bathroom, and premium amenities.",
    images: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200",
    ],
    highlights: [
      "Garden View",
      "Private Balcony",
      "Rain Shower",
      "Mini Bar",
    ],
    tag: "Best Seller",
  },

  {
    id: 3,
    name: "Executive Suite",
    type: "Executive",
    price: 389,
    rating: 4.8,
    reviews: 67,
    size: "68 m²",
    bed: "King Bed",
    guests: 2,
    available: true,
    description:
      "Modern executive suite with a separate living room, work station, and access to the executive lounge.",
    images: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200",
    ],
    highlights: [
      "Executive Lounge",
      "Living Area",
      "City View",
      "Workspace",
    ],
    tag: "Business Choice",
  },

  {
    id: 4,
    name: "Family Suite",
    type: "Family Suite",
    price: 449,
    rating: 4.7,
    reviews: 52,
    size: "92 m²",
    bed: "2 Bedrooms",
    guests: 5,
    available: false,
    description:
      "Designed for families, this spacious suite features two bedrooms, a cozy lounge, and family-friendly amenities.",
    images: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200",
    ],
    highlights: [
      "Family Friendly",
      "Kids Area",
      "Large Lounge",
      "Pool View",
    ],
    tag: "Family Pick",
  },

  {
    id: 5,
    name: "Ocean View Deluxe",
    type: "Deluxe",
    price: 269,
    rating: 4.9,
    reviews: 113,
    size: "48 m²",
    bed: "King Bed",
    guests: 2,
    available: true,
    description:
      "Wake up to breathtaking ocean views from a private terrace in this beautifully designed deluxe room.",
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200",
    ],
    highlights: [
      "Ocean View",
      "Private Terrace",
      "Luxury Bathroom",
      "Mini Bar",
    ],
    tag: "Romantic Escape",
  },

  {
    id: 6,
    name: "Classic Twin Room",
    type: "Standard",
    price: 159,
    rating: 4.2,
    reviews: 87,
    size: "34 m²",
    bed: "Twin Beds",
    guests: 2,
    available: true,
    description:
      "Comfortable twin room perfect for friends or colleagues, featuring modern conveniences and stylish décor.",
    images: [
      "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=1200",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200",
    ],
    highlights: [
      "Twin Beds",
      "City View",
      "Free WiFi",
      "Work Desk",
    ],
    tag: "Budget Friendly",
  },

  {
    id: 7,
    name: "Grand Presidential Suite",
    type: "Presidential Suite",
    price: 1299,
    rating: 5.0,
    reviews: 29,
    size: "220 m²",
    bed: "2 King Beds",
    guests: 4,
    available: true,
    description:
      "A full-floor luxury suite with a private pool, personal butler, dining area, and breathtaking skyline views.",
    images: [
      "https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=1200",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200",
    ],
    highlights: [
      "Private Pool",
      "Butler Service",
      "Skyline View",
      "VIP Transfer",
    ],
    tag: "Ultra Luxury",
  },

  {
    id: 8,
    name: "Executive Penthouse",
    type: "Executive",
    price: 599,
    rating: 4.9,
    reviews: 41,
    size: "125 m²",
    bed: "King Bed",
    guests: 3,
    available: false,
    description:
      "Exclusive penthouse retreat featuring floor-to-ceiling windows, rooftop access, and a gourmet kitchen.",
    images: [
      "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=1200",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200",
    ],
    highlights: [
      "Rooftop Access",
      "Gourmet Kitchen",
      "Panoramic View",
      "Luxury Living",
    ],
    tag: "Premium Choice",
  },
];
// ─── Star Rating ──────────────────────────────────────────────────────────────
function StarRating({ rating }) {
  const stars = [];
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  for (let i = 0; i < full; i++) stars.push(<BsStarFill key={i} className="text-amber-400" />);
  if (half) stars.push(<BsStarHalf key="h" className="text-amber-400" />);
  while (stars.length < 5) stars.push(<BsStar key={`e${stars.length}`} className="text-amber-300" />);
  return <span className="flex items-center gap-0.5">{stars}</span>;
}

// ─── Testimonials data ───────────────────────────────────────────────────────
const testimonials = [
  {
    name: "Isabella Montrose",
    country: "United Kingdom",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80",
    rating: 5,
    text: "Arriving felt like stepping into a painting. Every surface tells a story of restrained opulence, and the staff read the room — present when needed, invisible when not. We will return without question.",
  },
  {
    name: "Kenji Watanabe",
    country: "Japan",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
    rating: 5,
    text: "The precision here rivals anything I have experienced in Tokyo — and the views surpass them. Breakfast on the terrace as the light changed over the water was the finest moment of my year.",
  },
  {
    name: "Camille Fontaine",
    country: "France",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
    rating: 5,
    text: "I have stayed at the finest addresses in Paris and Monaco. This room — the light, the quiet, the attention — surpassed them all. The bed alone deserves its own award.",
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function RoomDetails() {
  const { id } = useParams();
  const room = roomsData.find((r) => r.id === Number(id));
  const [activeImage, setActiveImage] = useState(0);

  // ── Not Found ──────────────────────────────────────────────────────────────
  if (!room) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center px-6 text-center">
        <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center mb-6 border border-amber-200">
          <BsHouseDoor className="text-amber-500 text-3xl" />
        </div>
        <h1 className="text-4xl font-light tracking-wide text-stone-800 mb-3">Room Not Found</h1>
        <p className="text-stone-500 text-lg mb-8 max-w-md">
          The room you are looking for does not exist or may no longer be available. Let us help you find your perfect accommodation.
        </p>
        <Link
          to="/rooms"
          className="inline-flex items-center gap-2 bg-stone-900 text-white px-8 py-3 text-sm tracking-widest uppercase hover:bg-amber-600 transition-colors duration-300"
        >
          Browse All Rooms <FiArrowRight />
        </Link>
      </div>
    );
  }

  const similarRooms = roomsData.filter((r) => r.id !== room.id).slice(0, 3);

  const features = [
    { icon: <FiWifi />, label: "High-Speed WiFi" },
    { icon: <FiTv />, label: "Smart 4K TV" },
    { icon: <FiWind />, label: "Climate Control" },
    { icon: <MdOutlineLocalBar />, label: "Curated Mini Bar" },
    { icon: <MdOutlineBathtub />, label: "Luxury Bathroom" },
    { icon: <MdOutlineRoomService />, label: "24h Room Service" },
    { icon: <FiShield />, label: "Safe Deposit Box" },
    { icon: <FiCoffee />, label: "Nespresso Machine" },
  ];

  const amenities = [
    { icon: <MdOutlinePool />, label: "Infinity Pool" },
    { icon: <TbMassage />, label: "Spa Access" },
    { icon: <MdOutlineSpa />, label: "Wellness Centre" },
    { icon: <MdOutlineKitchen />, label: "Private Kitchen" },
    { icon: <MdOutlineDirectionsCar />, label: "Valet Parking" },
    { icon: <PiArmchairFill />, label: "Concierge" },
    { icon: <GiVacuumCleaner />, label: "Housekeeping" },
    { icon: <MdOutlineBalcony />, label: "Private Terrace" },
  ];
  const highlightIcons = {
    "Ocean View": <FiMapPin />,
    "Private Terrace": <MdOutlineBalcony />,
    "Private Balcony": <MdOutlineBalcony />,
    "Private Pool": <MdOutlinePool />,
    "Private Spa": <MdOutlineSpa />,
    "Butler Service": <MdOutlineRoomService />,
    "Garden View": <BsHouseDoor />,
    "Heritage Interior": <BsHouseDoor />,
    "Courtyard View": <BsHouseDoor />,
    "Premium Interior": <PiArmchairFill />,
    "Daily Housekeeping": <GiVacuumCleaner />,
    "Wellness": <TbMassage />,
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative h-[70vh] min-h-[520px] overflow-hidden">
        <img
          src={room.images[0]}
          alt={room.name}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-900/30 to-transparent" />

        {/* Breadcrumb */}
        <div className="absolute top-8 left-0 right-0 px-6 md:px-12">
          <nav className="flex items-center gap-2 text-stone-300 text-xs tracking-widest uppercase">
            <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <FiChevronRight className="text-stone-500 text-[10px]" />
            <Link to="/rooms" className="hover:text-amber-400 transition-colors">Rooms</Link>
            <FiChevronRight className="text-stone-500 text-[10px]" />
            <span className="text-amber-400">{room.type}</span>
          </nav>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-10">
          <div className="max-w-5xl">
            <span className="inline-block bg-amber-500 text-white text-[10px] tracking-[0.2em] uppercase px-3 py-1 mb-4">
              {room.tag}
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-light text-white tracking-tight leading-tight mb-4">
              {room.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4">
              <StarRating rating={room.rating} />
              <span className="text-amber-400 font-semibold">{room.rating}</span>
              <span className="text-stone-300 text-sm">({room.reviews} verified reviews)</span>
              <span className="hidden md:inline-block w-px h-4 bg-stone-500" />
              <span className="text-stone-300 text-sm tracking-wide">{room.type}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── BODY WRAPPER ─────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-12">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* ── LEFT COLUMN ──────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0 space-y-14">

            {/* Gallery */}
            <section>
              <div className="overflow-hidden rounded-sm shadow-lg aspect-[16/9]">
                <img
                  src={room.images[activeImage]}
                  alt={`Room view ${activeImage + 1}`}
                  className="w-full h-full object-cover transition-all duration-500"
                />
              </div>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {room.images.slice(1, 5).map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i + 1)}
                    className={`aspect-[4/3] overflow-hidden rounded-sm transition-all duration-200 ${
                      activeImage === i + 1
                        ? "ring-2 ring-amber-400 ring-offset-2"
                        : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt={`Thumb ${i + 2}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </section>

            {/* Room Overview */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px flex-1 bg-stone-200" />
                <span className="text-[10px] tracking-[0.25em] text-amber-600 uppercase">Overview</span>
                <div className="h-px flex-1 bg-stone-200" />
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-stone-800 mb-4 tracking-tight">
                Room Overview
              </h2>
              <p className="text-stone-600 leading-relaxed text-base mb-8">{room.description}</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: <FiMaximize />, label: "Room Size", value: room.size },
                  { icon: <MdOutlineBed />, label: "Bed Type", value: room.bed },
                  { icon: <FiUsers />, label: "Guests", value: `Up to ${room.guests}` },
                  {
                    icon: <FiCheck />,
                    label: "Status",
                    value: room.available ? "Available" : "Unavailable",
                    accent: room.available,
                  },
                ].map(({ icon, label, value, accent }) => (
                  <div key={label} className="bg-white border border-stone-100 p-4 rounded-sm flex flex-col gap-2 shadow-sm">
                    <div className="text-amber-500 text-xl">{icon}</div>
                    <div className="text-[10px] tracking-widest uppercase text-stone-400">{label}</div>
                    <div
                      className={`text-sm font-medium ${
                        accent === true
                          ? "text-emerald-600"
                          : accent === false
                          ? "text-rose-500"
                          : "text-stone-800"
                      }`}
                    >
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Features */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px flex-1 bg-stone-200" />
                <span className="text-[10px] tracking-[0.25em] text-amber-600 uppercase">In-Room</span>
                <div className="h-px flex-1 bg-stone-200" />
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-stone-800 mb-6 tracking-tight">
                Room Features
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {features.map(({ icon, label }) => (
                  <div
                    key={label}
                    className="group bg-white border border-stone-100 rounded-sm p-4 flex flex-col items-center gap-3 shadow-sm hover:border-amber-200 hover:shadow-md transition-all duration-300"
                  >
                    <div className="text-2xl text-amber-500 group-hover:scale-110 transition-transform duration-200">
                      {icon}
                    </div>
                    <span className="text-xs text-stone-600 text-center leading-tight">{label}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Highlights */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px flex-1 bg-stone-200" />
                <span className="text-[10px] tracking-[0.25em] text-amber-600 uppercase">Highlights</span>
                <div className="h-px flex-1 bg-stone-200" />
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-stone-800 mb-6 tracking-tight">
                Luxury Inclusions
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {room.highlights.map((h) => (
                  <div
                    key={h}
                    className="relative overflow-hidden bg-gradient-to-br from-stone-800 to-stone-900 rounded-sm p-5 flex items-center gap-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 text-xl flex-shrink-0">
                      {highlightIcons[h] || <FiCheck />}
                    </div>
                    <span className="text-stone-100 text-sm font-light">{h}</span>
                    <div className="absolute top-0 right-0 w-16 h-16 bg-amber-400/5 rounded-full translate-x-4 -translate-y-4" />
                  </div>
                ))}
              </div>
            </section>

            {/* Amenities */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px flex-1 bg-stone-200" />
                <span className="text-[10px] tracking-[0.25em] text-amber-600 uppercase">Hotel</span>
                <div className="h-px flex-1 bg-stone-200" />
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-stone-800 mb-6 tracking-tight">
                Hotel Amenities
              </h2>
              <div className="grid grid-cols-4 sm:grid-cols-4 gap-4">
                {amenities.map(({ icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-2 py-4">
                    <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 text-xl">
                      {icon}
                    </div>
                    <span className="text-[11px] text-stone-500 text-center leading-tight">{label}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Testimonials */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px flex-1 bg-stone-200" />
                <span className="text-[10px] tracking-[0.25em] text-amber-600 uppercase">Guests</span>
                <div className="h-px flex-1 bg-stone-200" />
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-stone-800 mb-6 tracking-tight">
                Guest Experiences
              </h2>
              <div className="space-y-4">
                {testimonials.map((t) => (
                  <div
                    key={t.name}
                    className="bg-white border border-stone-100 rounded-sm p-6 shadow-sm"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-12 h-12 rounded-full object-cover flex-shrink-0 border-2 border-amber-100"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
                          <div>
                            <div className="font-medium text-stone-800 text-sm">{t.name}</div>
                            <div className="text-stone-400 text-xs">{t.country}</div>
                          </div>
                          <StarRating rating={t.rating} />
                        </div>
                        <p className="text-stone-600 text-sm leading-relaxed italic mt-3">
                          "{t.text}"
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Similar Rooms */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px flex-1 bg-stone-200" />
                <span className="text-[10px] tracking-[0.25em] text-amber-600 uppercase">Explore</span>
                <div className="h-px flex-1 bg-stone-200" />
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-stone-800 mb-6 tracking-tight">
                You May Also Like
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {similarRooms.map((r) => (
                  <div
                    key={r.id}
                    className="group bg-white border border-stone-100 rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={r.images[0]}
                        alt={r.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[9px] tracking-widest uppercase text-amber-600">{r.type}</span>
                        <span className="flex items-center gap-1 text-xs text-stone-500">
                          <BsStarFill className="text-amber-400 text-[10px]" /> {r.rating}
                        </span>
                      </div>
                      <h3 className="text-stone-800 font-light text-sm leading-tight mb-3">{r.name}</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-base font-semibold text-stone-900">${r.price.toLocaleString()}</span>
                          <span className="text-stone-400 text-xs"> / night</span>
                        </div>
                        <Link
                          to={`/rooms/${r.id}`}
                          className="text-[10px] tracking-widest uppercase text-amber-600 hover:text-amber-700 flex items-center gap-1 transition-colors"
                        >
                          View <FiArrowRight />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section className="relative overflow-hidden rounded-sm bg-stone-900 px-8 py-14 text-center">
              <div className="absolute inset-0 opacity-10">
                <img
                  src={room.images[0]}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative z-10">
                <div className="inline-block text-[10px] tracking-[0.3em] uppercase text-amber-400 mb-4">
                  Reserve Your Stay
                </div>
                <h2 className="text-2xl md:text-4xl font-light text-white mb-3 tracking-tight">
                  Begin Your Journey
                </h2>
                <p className="text-stone-400 mb-8 max-w-lg mx-auto text-sm leading-relaxed">
                  Every detail of {room.name} has been curated for your comfort. Secure your dates today and arrive to an experience designed entirely around you.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button className="bg-amber-500 hover:bg-amber-400 text-white px-8 py-3 text-xs tracking-widest uppercase transition-colors duration-300 w-full sm:w-auto">
                    Reserve Now — ${room.price.toLocaleString()}/night
                  </button>
                  <button className="border border-stone-600 hover:border-stone-400 text-stone-300 hover:text-white px-8 py-3 text-xs tracking-widest uppercase transition-colors duration-300 w-full sm:w-auto flex items-center justify-center gap-2">
                    <FiPhone /> Speak to Concierge
                  </button>
                </div>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-stone-500 text-xs">
                  <span className="flex items-center gap-2"><FiCheck className="text-amber-500" /> Free cancellation</span>
                  <span className="flex items-center gap-2"><FiCheck className="text-amber-500" /> Best rate guarantee</span>
                  <span className="flex items-center gap-2"><FiCheck className="text-amber-500" /> Instant confirmation</span>
                </div>
              </div>
            </section>

          </div>

          {/* ── STICKY BOOKING CARD ──────────────────────────────────────── */}
          <aside className="lg:w-80 xl:w-96 flex-shrink-0">
            <div className="lg:sticky lg:top-8 space-y-4">

              <div className="bg-white border border-stone-200 rounded-sm shadow-lg overflow-hidden">
                <div className="bg-stone-900 px-6 py-5">
                  <div className="text-[10px] tracking-[0.2em] uppercase text-stone-400 mb-1">Starting from</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-light text-white">${room.price.toLocaleString()}</span>
                    <span className="text-stone-400 text-sm">/ night</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <StarRating rating={room.rating} />
                    <span className="text-stone-400 text-xs">({room.reviews} reviews)</span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="space-y-3 text-sm">
                    {[
                      { label: "Room Type", value: room.type },
                      { label: "Room Size", value: room.size },
                      { label: "Bed", value: room.bed },
                      { label: "Guests", value: `Up to ${room.guests} guests` },
                      {
                        label: "Availability",
                        value: room.available ? "Available Now" : "Currently Unavailable",
                        accent: room.available,
                      },
                    ].map(({ label, value, accent }) => (
                      <div key={label} className="flex items-center justify-between py-2 border-b border-stone-100">
                        <span className="text-stone-400 text-xs tracking-wide">{label}</span>
                        <span
                          className={`text-xs font-medium ${
                            accent === true
                              ? "text-emerald-600"
                              : accent === false
                              ? "text-rose-500"
                              : "text-stone-800"
                          }`}
                        >
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    disabled={!room.available}
                    className={`w-full py-3.5 text-xs tracking-[0.2em] uppercase font-medium transition-colors duration-300 ${
                      room.available
                        ? "bg-amber-500 hover:bg-amber-400 text-white"
                        : "bg-stone-200 text-stone-400 cursor-not-allowed"
                    }`}
                  >
                    {room.available ? "Book This Room" : "Currently Unavailable"}
                  </button>

                  <div className="text-center">
                    <span className="text-stone-400 text-xs">or</span>
                  </div>

                  <button className="w-full border border-stone-300 hover:border-stone-500 text-stone-600 hover:text-stone-800 py-3 text-xs tracking-widest uppercase transition-colors duration-200 flex items-center justify-center gap-2">
                    <FiPhone className="text-sm" /> Call Reservations
                  </button>
                </div>

                <div className="bg-amber-50 border-t border-amber-100 px-6 py-4">
                  <div className="flex items-center gap-2 text-amber-700 text-xs mb-1">
                    <FiCheck /> Free cancellation up to 48h prior
                  </div>
                  <div className="flex items-center gap-2 text-amber-700 text-xs">
                    <FiCheck /> Best rate guarantee
                  </div>
                </div>
              </div>

              {/* Contact Card */}
              <div className="bg-white border border-stone-200 rounded-sm p-5 shadow-sm">
                <div className="text-[10px] tracking-[0.2em] uppercase text-stone-400 mb-3">Need Assistance?</div>
                <div className="space-y-2.5">
                  <a
                    href="tel:+18005551234"
                    className="flex items-center gap-3 text-stone-600 hover:text-amber-600 text-sm transition-colors"
                  >
                    <FiPhone className="text-amber-500 flex-shrink-0" />
                    +1 800 555 1234
                  </a>
                  <a
                    href="mailto:reservations@hotel.com"
                    className="flex items-center gap-3 text-stone-600 hover:text-amber-600 text-sm transition-colors"
                  >
                    <FiMail className="text-amber-500 flex-shrink-0" />
                    reservations@hotel.com
                  </a>
                  <div className="flex items-center gap-3 text-stone-500 text-sm">
                    <FiMapPin className="text-amber-500 flex-shrink-0" />
                    Available 24 hours / 7 days
                  </div>
                </div>
              </div>

            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}