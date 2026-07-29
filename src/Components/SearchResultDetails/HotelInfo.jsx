import { MapPin, Star } from "lucide-react";

const getRatingBg = (r) => {
  if (r >= 9) return "#003580";
  if (r >= 8) return "#2C4A6E";
  if (r >= 7) return "#0369a1";
  return "#374151";
};

export default function HotelInfo({ hotel }) {
  const { name, location, stars = 0, guestRating, ratingLabel, reviewCount, description } = hotel;

  return (
    <div className="space-y-4">
      {/* Stars + Name row */}
      <div>
        {stars > 0 && (
          <div className="flex items-center gap-0.5 mb-2">
            {Array.from({ length: Math.min(stars, 5) }).map((_, i) => (
              <Star key={i} size={14} fill="#f59e0b" stroke="none" />
            ))}
          </div>
        )}
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1E2A38] leading-tight">{name}</h1>
      </div>

      {/* Location */}
      {location && (
        <div className="flex items-center gap-1.5 text-[#2C4A6E]">
          <MapPin size={16} className="flex-shrink-0" />
          <span className="text-[14px] font-medium underline underline-offset-2 cursor-pointer hover:text-[#003580] transition-colors">
            {location}
          </span>
        </div>
      )}

      {/* Rating row */}
      {guestRating != null && (
        <div className="flex items-center gap-3 flex-wrap">
          <div
            className="px-3 py-1.5 rounded-tl-none rounded-xl text-white font-bold text-[15px]"
            style={{ background: getRatingBg(guestRating) }}
          >
            {guestRating}
          </div>
          <div>
            {ratingLabel && (
              <p className="font-bold text-[#1E2A38] text-[15px] leading-none">{ratingLabel}</p>
            )}
            {reviewCount != null && (
              <p className="text-[12px] text-slate-500 mt-0.5">
                {reviewCount.toLocaleString()} reviews
              </p>
            )}
          </div>
        </div>
      )}

      {/* Description */}
      {description && (
        <div className="pt-2 border-t border-slate-100">
          <h2 className="text-[16px] font-bold text-[#1E2A38] mb-2">About this hotel</h2>
          <p className="text-[14px] text-slate-600 leading-relaxed">{description}</p>
        </div>
      )}
    </div>
  );
}
