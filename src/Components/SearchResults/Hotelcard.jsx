import { Star, Wifi, Waves, Sparkles, Dumbbell, Car, UtensilsCrossed, Heart, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRoomContext } from "../../Context/RoomContext";

const AMENITY_ICONS = {
  wifi: { icon: <Wifi size={12} />, label: "WiFi" },
  pool: { icon: <Waves size={12} />, label: "Pool" },
  spa: { icon: <Sparkles size={12} />, label: "Spa" },
  gym: { icon: <Dumbbell size={12} />, label: "Gym" },
  parking: { icon: <Car size={12} />, label: "Parking" },
  restaurant: { icon: <UtensilsCrossed size={12} />, label: "Dining" },
};


export default function HotelCard({ hotel, currentPage, searchData }) {

  const navigate = useNavigate();
  const { rooms: allRooms } = useRoomContext();

  console.log("HotelCard searchData:", searchData);
  if (!hotel) return null;

  const {
    name,
    location,
    image,
    stars = 0,
    guestRating,
    ratingLabel,
    reviewCount = 0,
    price,
    originalPrice,
    roomType,
    breakfast,
    freeCancellation,
    payAtProperty,
    amenities = [],
    tag,
    tagColor,
    address,
    category,
    rating,
    distanceFromCenter,
  } = hotel;

  // Fetch all rooms from context to calculate dynamic fields
  const hotelRooms = (allRooms || []).filter(r => String(r.propertyId) === String(hotel.id) && r.isActive);
  
  // Calculate Rooms Left
  const roomsLeft = hotelRooms.filter(r => r.status === "Available").length;
  
  // Calculate Featured Room
  const featuredRoom = hotelRooms.find(r => r.isFeatured)?.roomName || hotelRooms[0]?.roomName || roomType;

  // Fallbacks for data created in dashboard
  const displayLocation = location || address;
  const displayPrice = typeof price === "number" ? price : (Number(price) || null);
  const displayRating = guestRating || (rating ? parseFloat(rating) : null);
  
  // Try to extract stars from category if not explicitly provided
  let extractedStars = Number(stars) || 0;
  if (!extractedStars && category && typeof category === 'string') {
    const match = category.match(/(\d+)\s*[sS]tar/);
    if (match) extractedStars = parseInt(match[1]);
  }
  const starCount = Math.max(0, Math.min(5, extractedStars));

  const numPrice = Number(displayPrice);
  const numOriginalPrice = originalPrice ? Number(originalPrice) : (numPrice ? Math.round(numPrice * 1.25) : 0);

  const hasDiscount =
    !isNaN(numOriginalPrice) &&
    numOriginalPrice > 0 &&
    !isNaN(numPrice) &&
    numOriginalPrice > numPrice;

  const discount = hasDiscount
    ? Math.round(((numOriginalPrice - numPrice) / numOriginalPrice) * 100)
    : 0;

  return (
    <div className="group bg-white border border-slate-200 rounded-lg shadow-sm p-4 flex flex-col sm:flex-row gap-4 transition-all duration-300 hover:shadow-md">
      {/* Image */}
      <div className="relative sm:w-64 md:w-64 h-56 flex-shrink-0 overflow-hidden bg-slate-100 rounded-lg">
        {image ? (
          <img
            src={image}
            alt={name || "Hotel"}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-52 sm:h-full flex items-center justify-center text-slate-300 text-xs font-medium">
            No image available
          </div>
        )}

        {/* Wishlist */}
        <button
          type="button"
          aria-label="Add to wishlist"
          className="absolute top-3 right-3 w-8 h-8 rounded-full
           bg-white/80 backdrop-blur-sm flex items-center justify-center
            text-slate-400 hover:text-rose-500 transition-colors duration-200"
        >
          <Heart size={15} />
        </button>

      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 min-w-0">
        
        {/* Top/Middle/Right wrapper */}
        <div className="flex flex-col sm:flex-row flex-1 gap-4">
          
          {/* Center Panel: Title, Location, Specs */}
          <div className="flex-1 flex flex-col min-w-0">
          <div className="flex items-start justify-between gap-3 mb-1">
            <h3 
              className="text-[20px] font-bold text-[#0071c2] leading-snug cursor-pointer hover:underline truncate"
              onClick={() => navigate(`/hotel/${hotel.id}?page=${currentPage}`, { state: searchData })}
            >
              {name || "Unnamed Hotel"}
            </h3>
            {/* Stars */}
            {starCount > 0 && (
              <div className="flex items-center gap-0.5 mt-1 shrink-0">
                {Array.from({ length: starCount }).map((_, i) => (
                  <Star key={i} size={12} fill="#febb02" stroke="none" />
                ))}
              </div>
            )}
          </div>

          {displayLocation && (
            <p className="text-[12px] text-[#0071c2] underline cursor-pointer hover:text-[#005c9e] mt-0.5 truncate mb-3">
              {displayLocation}
              {distanceFromCenter && <span className="text-slate-500 no-underline"> • {distanceFromCenter}</span>}
              <span className="text-slate-500 no-underline hover:underline ml-1"> • Show on map</span>
            </p>
          )}

          {/* Room type and Availability */}
          <div className="mb-2 border-l-2 border-[#e5e7eb] pl-3 py-1">
            {featuredRoom && (
              <p className="text-[13px] font-bold text-[#333333] mb-1">{featuredRoom}</p>
            )}
            {hotelRooms.length > 0 && (
              <p className={`text-[12px] font-bold mt-0.5 ${roomsLeft > 0 && roomsLeft <= 5 ? "text-[#cc0000]" : "text-[#008009]"}`}>
                {roomsLeft > 0 && roomsLeft <= 5 ? `Only ${roomsLeft} room${roomsLeft > 1 ? 's' : ''} left at this price on our site` : (roomsLeft > 0 ? "Available" : "Currently sold out")}
              </p>
            )}
          </div>

          {/* Policies */}
          {(breakfast || freeCancellation || payAtProperty) && (
            <div className="flex flex-col gap-1 mb-3">
              {breakfast && (
                <span className="text-[12px] font-bold text-[#008009]">
                  Breakfast included
                </span>
              )}
              {freeCancellation && (
                <span className="text-[12px] font-bold text-[#008009]">
                  Free cancellation
                </span>
              )}
              {payAtProperty && (
                <span className="text-[12px] font-bold text-[#008009]">
                  No prepayment needed – pay at the property
                </span>
              )}
            </div>
          )}

          {/* Amenities */}
          {Array.isArray(amenities) && amenities.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-auto pt-2">
              {amenities.slice(0, 4).map((key) =>
                AMENITY_ICONS[key] ? (
                  <span
                    key={key}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded"
                  >
                    {AMENITY_ICONS[key].icon}
                    {AMENITY_ICONS[key].label}
                  </span>
                ) : null
              )}
            </div>
          )}
        </div>

        {/* Right Panel: Rating, Price, Action */}
        <div className="flex flex-col sm:w-48 shrink-0 justify-between">
          
          {/* Guest rating */}
          {displayRating ? (
            <div className="flex items-start justify-end gap-2 mb-4">
              <div className="flex flex-col items-end">
                <p className="text-[14px] font-bold text-[#333333] leading-none mb-1">{ratingLabel || "Very Good"}</p>
                {reviewCount > 0 && (
                  <p className="text-[12px] text-slate-500">
                    {reviewCount.toLocaleString()} reviews
                  </p>
                )}
              </div>
              <div
                className="w-8 h-8 rounded-t-md rounded-br-md rounded-bl-sm flex items-center justify-center text-white font-bold text-[14px]"
                style={{ background: "#003580" }}
              >
                {displayRating}
              </div>
            </div>
          ) : (
            <div className="mb-4"></div>
          )}

          {/* Price + CTA */}
          <div className="mt-auto flex flex-col items-end text-right">
            {hasDiscount && (
              <div className="bg-[#cc0000] text-white text-[11px] font-bold px-2 py-0.5 rounded-sm mb-1.5">
                Limited-time Deal
              </div>
            )}
            <p className="text-[12px] text-slate-500 mb-0.5">1 night, 2 adults</p>
            <div className="flex flex-col items-end justify-end mt-1">
              {hasDiscount && (
                <span className="text-[14px] text-slate-500 line-through font-medium mb-1">
                  US${numOriginalPrice}
                </span>
              )}
              <div className="flex items-center gap-2">
                <span className="text-[24px] font-bold text-[#1E2A38] leading-none">
                  {numPrice ? `US$${numPrice}` : "N/A"}
                </span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mt-1 mb-3">Includes taxes and charges</p>

            <button
              type="button"
              onClick={() =>
                navigate(`/hotel/${hotel.id}?page=${currentPage}`, {
                  state: searchData,
                })
              }
              className="w-full flex items-center justify-center gap-1.5 px-4 py-2 rounded text-[14px] font-bold text-white transition-all duration-200 hover:bg-[#005c9e]"
              style={{ background: "#0071c2" }}
            >
              See availability
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

      </div>
      </div>
    </div>
  );
}