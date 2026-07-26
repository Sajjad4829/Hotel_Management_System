import { Star, Wifi, Waves, Sparkles, Dumbbell, Car, UtensilsCrossed, Heart, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
const AMENITY_ICONS = {
  wifi: { icon: <Wifi size={12} />, label: "WiFi" },
  pool: { icon: <Waves size={12} />, label: "Pool" },
  spa: { icon: <Sparkles size={12} />, label: "Spa" },
  gym: { icon: <Dumbbell size={12} />, label: "Gym" },
  parking: { icon: <Car size={12} />, label: "Parking" },
  restaurant: { icon: <UtensilsCrossed size={12} />, label: "Dining" },
};

const ratingBg = (rating) => {
  if (rating >= 9) return "#1E2A38";
  if (rating >= 8) return "#2C4A6E";
  if (rating >= 7) return "#0369a1";
  return "#374151";
};

export default function HotelCard({hotel,currentPage,}) {

  const navigate = useNavigate();
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
    amenities = [],
    tag,
    tagColor,
  } = hotel;

  const hasDiscount =
    typeof originalPrice === "number" &&
    typeof price === "number" &&
    originalPrice > price;

  const discount = hasDiscount
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const starCount = Math.max(0, Math.min(5, Number(stars) || 0));

  return (
    <div className="group bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col sm:flex-row transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
      {/* Image */}
      <div className="relative sm:w-64 md:w-72 flex-shrink-0 overflow-hidden bg-slate-100">
        {image ? (
          <img
            src={image}
            alt={name || "Hotel"}
            className="w-full h-52 sm:h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-52 sm:h-full flex items-center justify-center text-slate-300 text-xs font-medium">
            No image available
          </div>
        )}

        {/* Tag */}
        {tag && (
          <span
            className="absolute top-3 left-3 text-[10px] font-bold tracking-wide text-white px-2.5 py-1 rounded-full"
            style={{ background: tagColor || "#2C4A6E" }}
          >
            {tag}
          </span>
        )}

        {/* Wishlist */}
        <button
          type="button"
          aria-label="Add to wishlist"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-slate-400 hover:text-rose-500 transition-colors duration-200"
        >
          <Heart size={15} />
        </button>

        {/* Discount badge */}
        {hasDiscount && discount > 0 && (
          <span className="absolute bottom-3 left-3 text-[10px] font-bold text-white bg-rose-500 px-2 py-0.5 rounded-full">
            -{discount}%
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Top row */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="min-w-0">
            {/* Stars */}
            {starCount > 0 && (
              <div className="flex items-center gap-0.5 mb-1">
                {Array.from({ length: starCount }).map((_, i) => (
                  <Star key={i} size={11} fill="#f59e0b" stroke="none" />
                ))}
              </div>
            )}

            <h3 className="text-[16px] font-bold text-[#1E2A38] leading-snug truncate">
              {name || "Unnamed Hotel"}
            </h3>

            {location && (
              <p className="text-[12px] text-slate-500 mt-0.5 truncate">{location}</p>
            )}
          </div>

          {/* Guest rating */}
          {typeof guestRating === "number" && (
            <div className="flex flex-col items-end flex-shrink-0">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-[13px]"
                style={{ background: ratingBg(guestRating) }}
              >
                {guestRating}
              </div>
              {ratingLabel && (
                <p className="text-[10px] font-semibold text-slate-500 mt-1">{ratingLabel}</p>
              )}
              <p className="text-[10px] text-slate-400">
                {reviewCount.toLocaleString()} reviews
              </p>
            </div>
          )}
        </div>

        {/* Room type */}
        {roomType && (
          <p className="text-[12px] font-semibold text-[#2C4A6E] mb-3">{roomType}</p>
        )}

        {/* Policies */}
        {(breakfast || freeCancellation) && (
          <div className="flex flex-wrap gap-2 mb-3">
            {breakfast && (
              <span className="text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full font-medium">
                ✓ Breakfast included
              </span>
            )}
            {freeCancellation && (
              <span className="text-[11px] text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full font-medium">
                ✓ Free cancellation
              </span>
            )}
          </div>
        )}

        {/* Amenities */}
        {Array.isArray(amenities) && amenities.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {amenities.slice(0, 5).map((key) =>
              AMENITY_ICONS[key] ? (
                <span
                  key={key}
                  className="inline-flex items-center gap-1 text-[10px] text-slate-500 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-full"
                >
                  {AMENITY_ICONS[key].icon}
                  {AMENITY_ICONS[key].label}
                </span>
              ) : null
            )}
          </div>
        )}

        {/* Price + CTA */}
        <div className="mt-auto flex items-end justify-between gap-3 pt-3 border-t border-slate-50">
          <div>
            {hasDiscount && (
              <p className="text-[11px] text-slate-400 line-through">
                ${originalPrice}/night
              </p>
            )}
            <p className="text-[22px] font-bold text-[#1E2A38] leading-none">
              {typeof price === "number" ? `$${price}` : "N/A"}
              <span className="text-[12px] font-medium text-slate-500 ml-1">/night</span>
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5">Includes taxes & fees</p>
          </div>

          <button
            type="button"
            onClick={() => navigate(`/hotel/${hotel.id}?page=${currentPage}`)}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-[12px] font-bold text-white transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
            style={{
              background: "#2C4A6E",
              boxShadow: "0 6px 18px rgba(44,74,110,0.3)"
            }}
          >
            See Availability
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}