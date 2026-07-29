import { Star } from "lucide-react";

const getRatingColor = (r) => {
  if (r >= 9) return "bg-[#003580]";
  if (r >= 8) return "bg-[#2C4A6E]";
  if (r >= 7) return "bg-[#0369a1]";
  return "bg-slate-400";
};

const ReviewCard = ({ review }) => {
  const { user, rating, comment } = review;
  return (
    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
      <div className="flex items-center justify-between gap-2 mb-2">
        {/* Avatar + name */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-[#2C4A6E] flex items-center justify-center text-white font-bold text-[13px] flex-shrink-0">
            {user?.charAt(0) ?? "G"}
          </div>
          <p className="text-[14px] font-semibold text-[#1E2A38]">{user ?? "Guest"}</p>
        </div>
        {/* Score */}
        {rating != null && (
          <span className={`text-[12px] font-bold text-white px-2.5 py-1 rounded-lg ${getRatingColor(rating)}`}>
            {rating}
          </span>
        )}
      </div>
      {/* Stars visual */}
      <div className="flex items-center gap-0.5 mb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={12} fill={i < Math.round((rating / 10) * 5) ? "#f59e0b" : "none"} stroke="#f59e0b" strokeWidth={1.5} />
        ))}
      </div>
      {comment && <p className="text-[13px] text-slate-600 leading-relaxed">{comment}</p>}
    </div>
  );
};

export default function Reviews({ reviews = [], guestRating, ratingLabel, reviewCount }) {
  if (!reviews.length) return null;

  return (
    <div>
      {/* Section header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[16px] font-bold text-[#1E2A38]">Guest Reviews</h2>
        {guestRating != null && (
          <div className="flex items-center gap-2">
            <span className="text-[22px] font-bold text-[#003580]">{guestRating}</span>
            <div>
              {ratingLabel && <p className="text-[13px] font-semibold text-[#1E2A38]">{ratingLabel}</p>}
              {reviewCount != null && (
                <p className="text-[11px] text-slate-500">{reviewCount.toLocaleString()} reviews</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Review cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {reviews.map((r, i) => (
          <ReviewCard key={i} review={r} />
        ))}
      </div>
    </div>
  );
}