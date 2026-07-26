import React from "react";

const STAR_OPTIONS = [5, 4, 3, 2, 1];
const GUEST_RATING_OPTIONS = [
  { value: 9, label: "9+ Exceptional" },
  { value: 8, label: "8+ Excellent" },
  { value: 7, label: "7+ Very Good" },
  { value: 6, label: "6+ Good" },
];

const StarIcon = ({ filled }) => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill={filled ? "#C9A66B" : "none"}
    stroke={filled ? "#C9A66B" : "#CBD4DF"}
    strokeWidth="1.5"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const RatingFilter = ({
  starRating,
  onStarChange,
  guestRating,
  onGuestRatingChange,
}) => {
  const toggleStar = (n) => {
    onStarChange(
      starRating.includes(n)
        ? starRating.filter((s) => s !== n)
        : [...starRating, n]
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold text-[#1E2A38] mb-3">
          Hotel Rating
        </h3>
        <div className="flex flex-col gap-2.5">
          {STAR_OPTIONS.map((n) => (
            <label
              key={n}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={starRating.includes(n)}
                onChange={() => toggleStar(n)}
                className="peer sr-only"
              />
              <span className="w-[18px] h-[18px] rounded-md border border-[#CBD4DF] flex items-center justify-center peer-checked:bg-[#1E2A38] peer-checked:border-[#1E2A38] transition-colors shrink-0">
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="hidden peer-checked:block"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </span>
              <span className="flex items-center gap-0.5">
                {Array.from({ length: n }).map((_, i) => (
                  <StarIcon key={i} filled />
                ))}
              </span>
              <span className="text-sm text-[#3D4A5C] group-hover:text-[#1E2A38] transition-colors">
                {n} Star{n > 1 ? "s" : ""}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-[#1E2A38] mb-3">
          Guest Rating
        </h3>
        <div className="flex flex-col gap-2.5">
          {GUEST_RATING_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <input
                type="radio"
                name="guestRating"
                checked={guestRating === opt.value}
                onChange={() =>
                  onGuestRatingChange(
                    guestRating === opt.value ? 0 : opt.value
                  )
                }
                className="peer sr-only"
              />
              <span className="w-[18px] h-[18px] rounded-full border border-[#CBD4DF] flex items-center justify-center peer-checked:border-[#1E2A38] transition-colors shrink-0">
                <span className="hidden peer-checked:block w-2.5 h-2.5 rounded-full bg-[#1E2A38]" />
              </span>
              <span className="text-sm text-[#3D4A5C] group-hover:text-[#1E2A38] transition-colors">
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RatingFilter;