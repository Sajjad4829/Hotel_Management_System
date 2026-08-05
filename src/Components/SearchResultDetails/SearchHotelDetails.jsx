import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, AlertCircle, MapPin, Star, Image as ImageIcon } from "lucide-react";

import { useState } from "react";
import { usePropertyContext } from "../../Context/PropertyContext";
import { usePageContext } from "../../Context/PageContext";
import { useRoomContext } from "../../Context/RoomContext";
import HotelGallery from "./HotelGallery";
import HotelInfo from "./HotelInfo";
import Facilities from "./Facilities";
import RoomSelectionCard from "./RoomSelectionCard";
import BookingCard from "./BookingCard";
import Reviews from "./Reviews";
import AiRecommendedHotels from "./AiRecommendedHotels";

console.log("=== HOTEL DETAILS FILE LOADED ===");
/* ─── NOT FOUND FALLBACK ────────────────────────────────── */
const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center text-center px-6"
    style={{ background: "#F7F9FB" }}>
    <AlertCircle size={48} className="text-slate-300 mb-4" />
    <h2 className="text-[22px] font-bold text-[#1E2A38] mb-2">Hotel Not Found</h2>
    <p className="text-slate-500 mb-6 max-w-sm">
      We couldn't find a hotel matching that ID. It may have been removed or the link is incorrect.
    </p>
    <Link
      to="/"
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-bold text-white"
      style={{ background: "#2C4A6E" }}
    >
      <ArrowLeft size={14} />
      Back to Search
    </Link>
  </div>
);

/* ─── SECTION WRAPPER ───────────────────────────────────── */
const Section = ({ children, className = "" }) => (
  <section className={`bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-7 ${className}`}>
    {children}
  </section>
);

/* ─── POLICIES ──────────────────────────────────────────── */
const Policies = ({ policies }) => {
  if (!policies) return null;
  const { checkIn, checkOut, cancellationPolicy } = policies;


  return (




    <div>
      <h2 className="text-[16px] font-bold text-[#1E2A38] mb-4">Hotel Policies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {checkIn && (
          <div className="flex items-start gap-3 bg-slate-50 rounded-xl p-4 border border-slate-100">
            <Clock size={16} className="text-[#2C4A6E] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Check-in</p>
              <p className="text-[14px] font-semibold text-[#1E2A38]">From {checkIn}</p>
            </div>
          </div>
        )}
        {checkOut && (
          <div className="flex items-start gap-3 bg-slate-50 rounded-xl p-4 border border-slate-100">
            <Clock size={16} className="text-[#2C4A6E] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Check-out</p>
              <p className="text-[14px] font-semibold text-[#1E2A38]">Until {checkOut}</p>
            </div>
          </div>
        )}
        {cancellationPolicy && (
          <div className="flex items-start gap-3 bg-slate-50 rounded-xl p-4 border border-slate-100 sm:col-span-1">
            <AlertCircle size={16} className="text-[#2C4A6E] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Cancellation</p>
              <p className="text-[13px] text-slate-600 leading-relaxed">{cancellationPolicy}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════════════════
   MAIN PAGE
   ════════════════════════════════════════════════════════ */
export default function SearchHotelDetails() {
  

  const location = useLocation();
  const navigate = useNavigate();

  // Selected rooms state for the new room cards: { [roomId]: qty }
  const [selectedRooms, setSelectedRooms] = useState({});

  const handleRoomQtyChange = (roomId, qty) => {
    setSelectedRooms(prev => {
      const next = { ...prev };
      if (qty <= 0) {
        delete next[roomId];
      } else {
        next[roomId] = qty;
      }
      return next;
    });
  };




// console.log(location.state);
//   console.log("sajjad");
//   alert("HotelDetails Loaded");

//   console.log("HotelDetails Component Render");
//   console.log(location.state);

//   console.log("HotelDetails state:", location.state);



  const { id } = useParams();
  const { hotels } = usePropertyContext();
  const hotelBase = hotels.find((h) => String(h.id) === String(id));

  const { pagesData } = usePageContext();
  const { rooms: allRooms } = useRoomContext();

  if (!hotelBase) return <NotFound />;

  // Get config from CMS
  const config = pagesData?.hotelDetails?.configs?.find(c => c.hotelId === id) || {};
  
  // Get associated rooms
  const hotelRooms = (allRooms || []).filter(r => String(r.propertyId) === String(id) && r.isActive);

  // Construct composite hotel object for backwards compatibility with child components
  const hotel = {
    ...hotelBase,
    location: hotelBase.address || hotelBase.city,
    gallery: [hotelBase.image], // Can be expanded if locationsData gets a gallery
    facilities: hotelBase.amenities || [],
    rooms: hotelRooms,
    policies: {
      checkIn: "2:00 PM",
      checkOut: "12:00 PM",
      cancellationPolicy: "Free cancellation up to 48 hours before check-in.",
      ...(typeof config.policies === 'string' ? { 
         // Basic parsing of the policies text field from CMS
         checkIn: config.policies.match(/Check-in:\s*(.*)/i)?.[1] || "2:00 PM",
         checkOut: config.policies.match(/Check-out:\s*(.*)/i)?.[1] || "12:00 PM",
      } : {})
    },
    reviews: [],
    guestRating: hotelBase.rating ? parseFloat(hotelBase.rating) : 4.5,
    ratingLabel: "Excellent",
    reviewCount: 100,
    highlights: config.highlights || [],
    customBlocks: config.customBlocks || [],
  };

  const {
    name,
    gallery,
    facilities,
    rooms,
    policies,
    reviews,
    guestRating,
    ratingLabel,
    reviewCount,
  } = hotel;

  return (
    <div className="min-h-screen" style={{ background: "#F7F9FB", fontFamily: "'Inter', sans-serif" }}>
      {/* ── Unique Hero Section ── */}
      <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[550px] mb-8 overflow-hidden bg-slate-900 shadow-2xl">
        <img 
          src={gallery[0] || 'https://images.unsplash.com/photo-1542314831-c6a4d14d8363?auto=format&fit=crop&w=1920&q=80'} 
          alt={name} 
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111827]/60 via-transparent to-transparent" />

        <div className="absolute top-0 left-0 w-full p-6 sm:p-8 flex justify-between items-center z-10 max-w-7xl mx-auto right-0">
          <button
            onClick={() => {
              if (window.history.state && window.history.state.idx > 0) {
                navigate(-1);
              } else {
                navigate("/search-results", { state: location.state });
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[13px] font-bold text-white hover:bg-white/20 transition-all cursor-pointer shadow-lg"
          >
            <ArrowLeft size={16} />
            Back to search results
          </button>
          
          {gallery.length > 1 && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[13px] font-bold text-white shadow-lg">
              <ImageIcon size={16} />
              {gallery.length} Photos
            </div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6 sm:p-10 lg:p-14 z-10 max-w-7xl mx-auto right-0">
          <div className="max-w-3xl">
            {hotel.stars > 0 && (
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: Math.min(hotel.stars, 5) }).map((_, i) => (
                  <Star key={i} size={20} fill="#febb02" stroke="none" className="drop-shadow-sm" />
                ))}
              </div>
            )}
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-5 drop-shadow-md leading-tight">
              {name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              {hotel.location && (
                <div className="flex items-center gap-2 text-white/90 bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10">
                  <MapPin size={18} className="text-[#febb02]" />
                  <span className="text-[14px] sm:text-[15px] font-semibold">{hotel.location}</span>
                </div>
              )}
              
              {hotel.guestRating != null && (
                <div className="flex items-center gap-3 bg-black/30 backdrop-blur-sm rounded-full pr-4 pl-1.5 py-1.5 border border-white/10">
                  <div className="bg-[#febb02] text-black font-bold px-2.5 py-1 rounded-full text-[14px] sm:text-[15px]">
                    {hotel.guestRating}
                  </div>
                  <div className="flex items-center gap-2">
                    {hotel.ratingLabel && (
                      <span className="font-bold text-white text-[14px] sm:text-[15px]">{hotel.ratingLabel}</span>
                    )}
                    {hotel.reviewCount != null && (
                      <span className="text-[13px] sm:text-[14px] text-white/70">({hotel.reviewCount} reviews)</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 space-y-5 -mt-2">
        {/* ── Main 2-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">

          {/* ── LEFT: Content column (2/3) ── */}
          <div className="lg:col-span-2 space-y-5">

            {/* Hotel info */}
            <Section>
              <HotelInfo hotel={hotel} hideHeader={true} />
            </Section>

            {/* Facilities */}
            {facilities?.length > 0 && (
              <Section>
                <Facilities facilities={facilities} />
              </Section>
            )}

            {/* Available Rooms */}
            {rooms?.length > 0 && (
              <Section id="rooms-section" className="p-0 sm:p-0 overflow-hidden bg-transparent border-0 shadow-none">
                <div className="mb-4 px-2">
                  <h2 className="text-[20px] font-bold text-[#1E2A38]">Select your room</h2>
                </div>
                <div className="flex flex-col gap-4">
                  {rooms.map(room => {
                    const rId = String(room.id || room._id || '');
                    return (
                      <RoomSelectionCard 
                        key={rId} 
                        room={room} 
                        qty={selectedRooms[rId] || 0}
                        onQtyChange={(qty) => handleRoomQtyChange(rId, qty)}
                      />
                    );
                  })}
                </div>
              </Section>
            )}

            {/* Policies */}
            {policies && (
              <Section>
                <Policies policies={policies} />
              </Section>
            )}

            {/* Reviews */}
            {reviews?.length > 0 && (
              <Section>
                <Reviews
                  reviews={reviews}
                  guestRating={guestRating}
                  ratingLabel={ratingLabel}
                  reviewCount={reviewCount}
                />
              </Section>
            )}

          </div>

          {/* ── RIGHT: Sticky booking card (1/3) ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <BookingCard
                hotel={hotel}
                checkIn={location.state?.checkIn}
                checkOut={location.state?.checkOut}
                guests={location.state?.adults}
                children={location.state?.children}
                roomsCount={location.state?.rooms}
                selectedRooms={selectedRooms}
                rooms={rooms}
              />
            </div>
          </div>

        </div>
      </div>

      <AiRecommendedHotels currentHotelId={id} />
    </div>
  );
}
