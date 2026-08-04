import { X, RotateCcw } from "lucide-react";

const ROOM_TYPES = ["Standard Room", "Deluxe Suite", "Family Suite", "Presidential Suite"];
const AMENITIES_LIST = [
  { key: "wifi", label: "Free WiFi" },
  { key: "pool", label: "Swimming Pool" },
  { key: "spa", label: "Spa & Wellness" },
  { key: "gym", label: "Fitness Center" },
  { key: "parking", label: "Free Parking" },
  { key: "restaurant", label: "Restaurant" },
];
const GUEST_RATINGS = [
  { min: 9, label: "Exceptional 9+" },
  { min: 8, label: "Excellent 8+" },
  { min: 7, label: "Good 7+" },
];

const Divider = () => <div className="h-px bg-slate-100 my-5" />;

const SectionTitle = ({ children }) => (
  <p className="text-[12px] font-bold tracking-[0.12em] uppercase text-[#1E2A38] mb-3">
    {children}
  </p>
);

const CheckboxRow = ({ id, label, checked, onChange }) => (
  <label
    htmlFor={id}
    className="flex items-center gap-2.5 cursor-pointer group py-1"
  >
    <div
      className={`w-4 h-4 rounded-[5px] border-2 flex items-center justify-center flex-shrink-0 transition-colors duration-150 ${
        checked ? "bg-[#2C4A6E] border-[#2C4A6E]" : "border-slate-300 group-hover:border-[#2C4A6E]"
      }`}
    >
      {checked && (
        <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
          <path d="M1 3L3.5 5.5L8 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
    <input
      id={id}
      type="checkbox"
      className="sr-only"
      checked={checked}
      onChange={onChange}
    />
    <span className="text-[13px] text-slate-600 group-hover:text-[#1E2A38] transition-colors duration-150">
      {label}
    </span>
  </label>
);

export default function FilterSidebar({ filters, onFilterChange, onReset, isMobileOpen, onMobileClose }) {
  const handlePriceChange = (key, value) =>
    onFilterChange({ ...filters, price: { ...filters.price, [key]: Number(value) } });

  const handleRoomType = (type) =>
    onFilterChange({ ...filters, roomType: filters.roomType === type ? "" : type });

  const handleStars = (star) => {
    const updated = filters.stars.includes(star)
      ? filters.stars.filter((s) => s !== star)
      : [...filters.stars, star];
    onFilterChange({ ...filters, stars: updated });
  };

  const handleGuestRating = (min) =>
    onFilterChange({ ...filters, guestRatingMin: filters.guestRatingMin === min ? 0 : min });

  const handleAmenity = (key) => {
    const updated = filters.amenities.includes(key)
      ? filters.amenities.filter((a) => a !== key)
      : [...filters.amenities, key];
    onFilterChange({ ...filters, amenities: updated });
  };

  const sidebar = (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-[15px] font-bold text-[#1E2A38]">Filters</p>
        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-[11px] font-semibold text-[#2C4A6E] hover:text-[#1E2A38] transition-colors"
          >
            <RotateCcw size={12} />
            Reset
          </button>
          {/* Mobile close */}
          {isMobileOpen && (
            <button onClick={onMobileClose} className="ml-2 text-slate-400 hover:text-slate-700">
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Price Range */}
      <SectionTitle>Price per Night (USD)</SectionTitle>
      <div className="flex items-center justify-between text-[12px] font-semibold text-[#2C4A6E] mb-2">
        <span>${filters.price.min}</span>
        <span>${filters.price.max}</span>
      </div>
      <input
        type="range"
        min={0}
        max={1000000}
        value={filters.price.max}
        onChange={(e) => handlePriceChange("max", e.target.value)}
        className="w-full accent-[#2C4A6E] cursor-pointer"
      />

      <Divider />

      {/* Room Type */}
      <SectionTitle>Room Type</SectionTitle>
      <div className="flex flex-col">
        {ROOM_TYPES.map((t) => (
          <CheckboxRow
            key={t}
            id={`room-${t}`}
            label={t}
            checked={filters.roomType === t}
            onChange={() => handleRoomType(t)}
          />
        ))}
      </div>

      <Divider />

      {/* Star Rating */}
      <SectionTitle>Hotel Stars</SectionTitle>
      <div className="flex gap-2 flex-wrap">
        {[3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleStars(star)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border text-[12px] font-semibold transition-all duration-150 ${
              filters.stars.includes(star)
                ? "bg-[#2C4A6E] text-white border-[#2C4A6E]"
                : "bg-white text-slate-600 border-slate-200 hover:border-[#2C4A6E]"
            }`}
          >
            {"★".repeat(star)}
          </button>
        ))}
      </div>

      <Divider />

      {/* Guest Rating */}
      <SectionTitle>Guest Rating</SectionTitle>
      <div className="flex flex-col">
        {GUEST_RATINGS.map(({ min, label }) => (
          <CheckboxRow
            key={min}
            id={`rating-${min}`}
            label={label}
            checked={filters.guestRatingMin === min}
            onChange={() => handleGuestRating(min)}
          />
        ))}
      </div>

      <Divider />

      {/* Breakfast & Cancellation */}
      <SectionTitle>Policies</SectionTitle>
      <div className="flex flex-col">
        <CheckboxRow
          id="breakfast"
          label="Breakfast Included"
          checked={filters.breakfast}
          onChange={() => onFilterChange({ ...filters, breakfast: !filters.breakfast })}
        />
        <CheckboxRow
          id="cancellation"
          label="Free Cancellation"
          checked={filters.freeCancellation}
          onChange={() => onFilterChange({ ...filters, freeCancellation: !filters.freeCancellation })}
        />
      </div>

      <Divider />

      {/* Amenities */}
      <SectionTitle>Amenities</SectionTitle>
      <div className="flex flex-col">
        {AMENITIES_LIST.map(({ key, label }) => (
          <CheckboxRow
            key={key}
            id={`amenity-${key}`}
            label={label}
            checked={filters.amenities.includes(key)}
            onChange={() => handleAmenity(key)}
          />
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:block sticky top-[120px] w-72 flex-shrink-0">
        {sidebar}
      </div>

      {/* Mobile drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40" onClick={onMobileClose} />
          {/* Drawer */}
          <div className="absolute top-0 left-0 h-full w-80 max-w-[90vw] bg-[#F7F9FB] overflow-y-auto p-4 shadow-2xl">
            {sidebar}
          </div>
        </div>
      )}
    </>
  );
}