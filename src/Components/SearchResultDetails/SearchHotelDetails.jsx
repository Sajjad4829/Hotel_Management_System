import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, AlertCircle } from "lucide-react";

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-5">

        {/* ── Back breadcrumb ── */}
        <button
          onClick={() => {
            if (window.history.state && window.history.state.idx > 0) {
              navigate(-1);
            } else {
              navigate("/search-results", { state: location.state });
            }
          }}
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#2C4A6E] hover:text-[#003580] transition-colors bg-transparent border-0 cursor-pointer p-0"
        >
          <ArrowLeft size={15} />
          Back to search results
        </button>

        {/* ── Gallery ── */}
        <HotelGallery gallery={gallery} name={name} />

        {/* ── Main 2-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">

          {/* ── LEFT: Content column (2/3) ── */}
          <div className="lg:col-span-2 space-y-5">

            {/* Hotel info */}
            <Section>
              <HotelInfo hotel={hotel} />
            </Section>

            {/* Facilities */}
            {facilities?.length > 0 && (
              <Section>
                <Facilities facilities={facilities} />
              </Section>
            )}

            {/* Available Rooms */}
            {rooms?.length > 0 && (
              <Section className="p-0 sm:p-0 overflow-hidden bg-transparent border-0 shadow-none">
                <div className="mb-4 px-2">
                  <h2 className="text-[20px] font-bold text-[#1E2A38]">Select your room</h2>
                </div>
                <div className="flex flex-col gap-4">
                  {rooms.map(room => (
                    <RoomSelectionCard 
                      key={room.id} 
                      room={room} 
                      qty={selectedRooms[room.id] || 0}
                      onQtyChange={(qty) => handleRoomQtyChange(room.id, qty)}
                    />
                  ))}
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
    </div>
  );
}
