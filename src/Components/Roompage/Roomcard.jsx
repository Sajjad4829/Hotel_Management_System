import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Users,
  BedDouble,
  Maximize2,
  Heart,
  Scale,
  Eye,
  MapPin,
  Wifi,
  Wind,
  Tv,
  Wine,
  Coffee,
  DoorOpen,
  Building2,
  Waves,
  Mountain,
  Laptop,
  Bath,
  ShowerHead,
  Lock,
  Shirt,
  BellRing,
  ParkingCircle,
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
  Coffee as BreakfastIcon,
  ShieldCheck,
  Share2
} from "lucide-react";

const amenityIconMap = {
  "Free WiFi": "Wifi",
  "Air Conditioning": "Wind",
  "Flat-screen TV": "Tv",
  "Mini Bar": "Wine",
  "Coffee Maker": "Coffee",
  "Balcony": "DoorOpen",
  "City View": "Building2",
  "Ocean View": "Waves",
  "Mountain View": "Mountain",
  "Work Desk": "Laptop",
  "Bathtub": "Bath",
  "Rain Shower": "ShowerHead",
  "Safe": "Lock",
  "Ironing Board": "Iron",
  "Bathrobes": "Shirt",
  "Room Service": "BellRing",
  "Free Parking": "ParkingCircle",
  "Washing Machine": "WashingMachine"
};

const ICONS = {
  Wifi, Wind, Tv, Wine, Coffee, DoorOpen, Building2, Waves, Mountain,
  Laptop, Bath, ShowerHead, Lock, Shirt, BellRing, ParkingCircle,
  WashingMachine: Sparkles, Iron: Sparkles,
};

function AmenityIcon({ label, className }) {
  const iconKey = amenityIconMap[label];
  const Icon = ICONS[iconKey] || Sparkles;
  return <Icon className={className} />;
}

export default function RoomCard({ room }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isComparing, setIsComparing] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  const hasDiscount = Boolean(room.discountPrice) && room.discountPrice < room.price;
  const displayPrice = hasDiscount ? room.discountPrice : room.price;

  // Fallback multiple images for slider demonstration if room only has one
  const images = room.images?.length > 1 ? room.images : [
    room.thumbnailImage || room.mainImage || "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200",
    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200",
    "https://images.unsplash.com/photo-1590490360182-c33d5773342b?w=1200"
  ];

  const nextImage = (e) => {
    e.preventDefault();
    setCurrentImageIdx((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.preventDefault();
    setCurrentImageIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="group relative flex flex-col bg-white overflow-hidden rounded-2xl shadow-xl shadow-stone-200/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-stone-100"
      >
        {/* IMAGE SLIDER */}
        <div className="relative h-64 w-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIdx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={images[currentImageIdx]}
              alt={room.roomName}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/20 opacity-80" />

          {/* Luxury Badge */}
          {room.isPremium && (
            <span className="absolute top-4 left-4 bg-amber-500/90 backdrop-blur-sm text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full flex items-center gap-1 shadow-lg">
              <Sparkles size={10} /> Signature
            </span>
          )}

          {/* Availability Badge */}
          <span className={`absolute top-4 right-4 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg backdrop-blur-sm ${
            room.status === "Available" ? "bg-emerald-500/90 text-white" : "bg-red-500/90 text-white"
          }`}>
            {room.status === "Available" ? "Available" : "Booked"}
          </span>

          {/* Slider Controls */}
          {images.length > 1 && (
            <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button onClick={prevImage} className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-stone-900 transition-colors">
                <ChevronLeft size={16} />
              </button>
              <button onClick={nextImage} className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-stone-900 transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>
          )}

          {/* Slider Dots */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-10">
              {images.map((_, idx) => (
                <div key={idx} className={`h-1 rounded-full transition-all duration-300 ${idx === currentImageIdx ? 'w-4 bg-amber-500' : 'w-1 bg-white/50'}`} />
              ))}
            </div>
          )}

          {/* Quick Actions (Floating) */}
          <div className="absolute top-1/2 right-4 -translate-y-1/2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-stone-700 hover:bg-amber-500 hover:text-white transition-colors shadow-lg"
            >
              <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} className={isWishlisted ? "text-amber-500 hover:text-white" : ""} />
            </button>
            <button
              onClick={() => setIsComparing(!isComparing)}
              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-stone-700 hover:bg-amber-500 hover:text-white transition-colors shadow-lg"
            >
              <Scale size={18} />
            </button>
            <button
              onClick={() => {}}
              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-stone-700 hover:bg-amber-500 hover:text-white transition-colors shadow-lg"
            >
              <Share2 size={18} />
            </button>
            <button
              onClick={() => setIsQuickViewOpen(true)}
              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-stone-700 hover:bg-amber-500 hover:text-white transition-colors shadow-lg"
            >
              <Eye size={18} />
            </button>
          </div>
        </div>

        {/* BODY */}
        <div className="p-6 flex flex-col flex-1">
          {/* Header row */}
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1.5">
                <MapPin size={10} />
                {room.hotelName}{room.destinationName ? `, ${room.destinationName}` : ""}
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-900 leading-tight">
                {room.roomName}
              </h3>
            </div>
            
            {/* Rating */}
            <div className="flex flex-col items-end">
              <div className="flex items-center bg-amber-50 px-2 py-1 rounded border border-amber-100">
                <Star size={12} className="fill-amber-500 text-amber-500 mr-1" />
                <span className="text-xs font-bold text-stone-800">{room.rating || 5.0}</span>
              </div>
              <span className="text-[10px] text-stone-400 mt-1 uppercase tracking-wider">{room.reviewCount || 24} Reviews</span>
            </div>
          </div>

          <p className="text-sm text-stone-500 line-clamp-2 mb-4 leading-relaxed">
            {room.shortDescription || room.description}
          </p>

          {/* Key Features Grid */}
          <div className="grid grid-cols-3 gap-y-3 gap-x-2 mb-5 py-4 border-y border-stone-100">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-stone-400">
                <Users size={14} />
                <span className="text-[10px] uppercase tracking-wider font-semibold">Guests</span>
              </div>
              <span className="text-xs font-medium text-stone-700">{room.capacity || 2} Max</span>
            </div>
            
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-stone-400">
                <Maximize2 size={14} />
                <span className="text-[10px] uppercase tracking-wider font-semibold">Size</span>
              </div>
              <span className="text-xs font-medium text-stone-700">{room.roomSize} ft²</span>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-stone-400">
                <BedDouble size={14} />
                <span className="text-[10px] uppercase tracking-wider font-semibold">Bed</span>
              </div>
              <span className="text-xs font-medium text-stone-700 truncate">{room.bedType || "King"}</span>
            </div>
          </div>

          {/* Perks / Inclusions */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded">
              <ShieldCheck size={12} /> Free Cancellation
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-2.5 py-1 rounded">
              <BreakfastIcon size={12} /> Breakfast Included
            </span>
            {room.amenities?.slice(0,2).map(label => (
              <span key={label} className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-stone-600 bg-stone-50 border border-stone-100 px-2.5 py-1 rounded">
                <AmenityIcon label={label} className="w-3 h-3 text-stone-400" />
                {label}
              </span>
            ))}
          </div>

          {/* Footer (Price + CTA) */}
          <div className="mt-auto flex items-end justify-between pt-2">
            <div className="flex flex-col">
              <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mb-0.5">Starting from</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-serif font-bold text-stone-900">${displayPrice}</span>
                <span className="text-xs text-stone-500">/ night</span>
              </div>
              {hasDiscount && (
                <span className="text-xs text-stone-400 line-through decoration-red-500/50">${room.price}</span>
              )}
            </div>

            <Link
              to={`/rooms/${room.id}`}
              className="bg-stone-900 hover:bg-amber-500 text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors shadow-lg shadow-stone-900/20"
            >
              View Details
            </Link>
          </div>
        </div>
      </motion.div>

      {/* QUICK VIEW MODAL (Simplified for now) */}
      <AnimatePresence>
        {isQuickViewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={(e) => e.target === e.currentTarget && setIsQuickViewOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setIsQuickViewOpen(false)}
                className="absolute right-4 top-4 z-10 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-stone-900 hover:bg-stone-900 hover:text-white transition-colors shadow-lg"
              >
                <X size={16} />
              </button>
              
              <div className="h-72 w-full">
                <img src={images[0]} alt={room.roomName} className="w-full h-full object-cover" />
              </div>
              
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-3xl font-serif font-bold text-stone-900 mb-2">{room.roomName}</h3>
                    <div className="flex gap-4 text-sm text-stone-500">
                      <span className="flex items-center gap-1.5"><Users size={16}/> {room.capacity} Guests</span>
                      <span className="flex items-center gap-1.5"><BedDouble size={16}/> {room.bedType}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-serif font-bold text-amber-500">${displayPrice}</div>
                    <div className="text-sm text-stone-400">/ night</div>
                  </div>
                </div>

                <p className="text-stone-600 leading-relaxed mb-8">
                  {room.description || room.shortDescription}
                </p>

                <div className="flex gap-4">
                  <Link
                    to={`/book/${room.id}`}
                    state={{ type: "room", room }}
                    className="flex-1 text-center bg-amber-500 hover:bg-amber-400 text-stone-900 py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-colors"
                  >
                    Reserve Now
                  </Link>
                  <Link
                    to={`/rooms/${room.id}`}
                    className="flex-1 text-center bg-stone-100 hover:bg-stone-200 text-stone-900 py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-colors"
                  >
                    Full Details
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}