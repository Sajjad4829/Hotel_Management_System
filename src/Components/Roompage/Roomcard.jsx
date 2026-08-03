import { useState } from "react";
import { Link } from "react-router-dom";
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
    WashingMachine: Sparkles,
    Iron: Sparkles,
};

function AmenityIcon({ label, className }) {
    const iconKey = amenityIconMap[label];
    const Icon = ICONS[iconKey] || Sparkles;
    return <Icon className={className} />;
}

/**
 * RoomCard
 * Fully data-driven luxury room card. Every visible value comes from the
 * `room` prop — nothing here is hardcoded. Used across the Rooms page (and
 * anywhere else the shared roomsData is rendered).
 */
export default function RoomCard({ room }) {
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isComparing, setIsComparing] = useState(false);
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

    const hasDiscount = Boolean(room.discountPrice) && room.discountPrice < room.price;
    const discountPercent = hasDiscount
        ? Math.round(((room.price - room.discountPrice) / room.price) * 100)
        : 0;
    const displayPrice = hasDiscount ? room.discountPrice : room.price;

    return (
        <>
            <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/60 bg-white/70 shadow-lg shadow-slate-200/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#1F3B64]/15">
                <div className="relative h-56 w-full overflow-hidden">
                    <img
                        src={room.thumbnailImage || "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200"}
                        alt={room.roomName}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

                    {/* Floating discount badge */}
                    {hasDiscount && (
                        <span className="absolute left-4 top-4 rounded-full bg-[#C9A24B] px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-[#1F3B64] shadow-md">
                            {discountPercent}% OFF
                        </span>
                    )}

                    {/* Availability badge */}
                    <span
                        className={`absolute right-4 top-4 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide shadow-md ${room.status === "Available" ? "bg-emerald-500 text-white" : "bg-slate-500 text-white"
                            }`}
                    >
                        {room.status === "Available" ? "Available" : "Booked"}
                    </span>

                    {/* Wishlist + Compare quick actions */}
                    <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <button
                            onClick={() => setIsWishlisted((v) => !v)}
                            aria-label="Toggle wishlist"
                            aria-pressed={isWishlisted}
                            className={`flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md transition-colors ${isWishlisted ? "bg-[#C9A24B] text-[#1F3B64]" : "bg-white/80 text-[#1F3B64] hover:bg-white"
                                }`}
                        >
                            <Heart size={15} fill={isWishlisted ? "currentColor" : "none"} />
                        </button>
                        <button
                            onClick={() => setIsComparing((v) => !v)}
                            aria-label="Toggle compare"
                            aria-pressed={isComparing}
                            className={`flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md transition-colors ${isComparing ? "bg-[#C9A24B] text-[#1F3B64]" : "bg-white/80 text-[#1F3B64] hover:bg-white"
                                }`}
                        >
                            <Scale size={15} />
                        </button>
                        <button
                            onClick={() => setIsQuickViewOpen(true)}
                            aria-label="Quick view"
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-[#1F3B64] backdrop-blur-md transition-colors hover:bg-white"
                        >
                            <Eye size={15} />
                        </button>
                    </div>
                </div>

                {/* ── Body ── */}
                <div className="flex flex-1 flex-col gap-3 p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-[#C9A24B]">
                            <MapPin size={12} />
                            {room.hotelName}{room.destinationName ? `, ${room.destinationName}` : ""}
                        </div>
                        {room.type && (
                            <span className="rounded-full bg-[#1F3B64]/5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#1F3B64]">
                                {room.type}
                            </span>
                        )}
                    </div>

                    <h3 className="font-serif text-lg font-bold leading-snug text-[#1F3B64]">
                        {room.roomName}
                    </h3>

                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                    key={i}
                                    size={13}
                                    className={
                                        i < Math.round(room.rating)
                                            ? "fill-[#C9A24B] text-[#C9A24B]"
                                            : "text-slate-200"
                                    }
                                />
                            ))}
                        </div>
                        <span className="text-xs text-slate-400">
                            {room.rating} ({room.reviewCount})
                        </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-500">
                        <div className="flex items-center gap-1.5">
                            <Users size={14} className="text-[#b45309]" />
                            <span>{room.capacity || 2} Guests</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <BedDouble size={14} className="text-[#b45309]" />
                            <span className="truncate">{room.bedType || "King"}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Maximize2 size={14} className="text-[#b45309]" />
                            <span>{room.roomSize} sq.ft</span>
                        </div>
                    </div>

                    {room.amenities?.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {room.amenities.slice(0, 4).map((label) => (
                                <span
                                    key={label}
                                    className="flex items-center gap-1.5 rounded-full border border-slate-100 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600"
                                >
                                    <AmenityIcon label={label} className="h-3 w-3 text-[#C9A24B]" />
                                    {label}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="mt-1 flex items-end gap-2 border-t border-dashed border-slate-200 pt-4">
                        <span className="text-xl font-extrabold text-[#1F3B64]">${displayPrice}</span>
                        {hasDiscount && (
                            <span className="text-sm text-slate-400 line-through">${room.price}</span>
                        )}
                        <span className="text-xs text-slate-400">/ night</span>
                    </div>

                    <div className="flex gap-2">
                        <Link
                            to={`/rooms/${room.id}`}
                            className="flex-1 rounded-xl border border-[#1F3B64]/15 py-2.5 text-center text-xs font-bold text-[#1F3B64] transition-colors hover:border-[#C9A24B] hover:text-[#C9A24B]"
                        >
                            View Details
                        </Link>
                        <Link
                            to={`/book/${room.id}`}
                            state={{ type: "room", room }}
                            aria-disabled={room.status !== "Available"}
                            className={`flex-1 rounded-xl py-2.5 text-center text-xs font-bold transition-colors ${room.status === "Available"
                                    ? "bg-[#C9A24B] text-[#1F3B64] hover:bg-[#dab766]"
                                    : "pointer-events-none cursor-not-allowed bg-slate-100 text-slate-400"
                                }`}
                        >
                            {room.status === "Available" ? "Book Now" : "Unavailable"}
                        </Link>
                    </div>
                </div>
            </div>

            {/* ── Quick View modal ── */}
            {isQuickViewOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
                    onClick={(e) => e.target === e.currentTarget && setIsQuickViewOpen(false)}
                >
                    <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">
                        <button
                            onClick={() => setIsQuickViewOpen(false)}
                            aria-label="Close quick view"
                            className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-[#1F3B64] backdrop-blur-md hover:bg-white"
                        >
                            <X size={16} />
                        </button>
                        <img src={room.mainImage} alt={room.roomName} className="h-56 w-full object-cover" />
                        <div className="p-6">
                            <p className="text-xs font-semibold uppercase tracking-wide text-[#C9A24B]">
                                {room.hotelName}
                            </p>
                            <h3 className="mt-1 font-serif text-xl font-bold text-[#1F3B64]">
                                {room.roomName}
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-slate-500">
                                {room.shortDescription || room.description}
                            </p>
                            <div className="mt-4 flex items-end gap-2">
                                <span className="text-xl font-extrabold text-[#1F3B64]">${displayPrice}</span>
                                {hasDiscount && (
                                    <span className="text-sm text-slate-400 line-through">${room.price}</span>
                                )}
                                <span className="text-xs text-slate-400">/ night</span>
                            </div>
                            {/* <Link
                to={`/book/${room.id}`}
                state={{ type: "room", room }}
                className="mt-5 block w-full rounded-xl bg-[#C9A24B] py-3 text-center text-sm font-bold text-[#1F3B64] transition-colors hover:bg-[#dab766]"
              >
                Book Now
              </Link> */}
                            <Link
                                to={`/book/${room.id}`}
                                state={{
                                    type: "room",
                                    room: room,
                                }}
                            >
                                Book Now
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}