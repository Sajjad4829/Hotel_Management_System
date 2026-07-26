import React from "react";

const MIN = 0;
const MAX = 50000;

const PriceRange = ({ value, onChange }) => {
  const [min, max] = value;

  const handleMinChange = (e) => {
    const next = Math.min(Number(e.target.value), max - 500);
    onChange([next, max]);
  };

  const handleMaxChange = (e) => {
    const next = Math.max(Number(e.target.value), min + 500);
    onChange([min, next]);
  };

  const minPct = ((min - MIN) / (MAX - MIN)) * 100;
  const maxPct = ((max - MIN) / (MAX - MIN)) * 100;

  return (
    <div>
      <h3 className="text-sm font-semibold text-[#1E2A38] mb-3">
        Price Range (per night)
      </h3>

      <div className="relative h-1.5 rounded-full bg-[#E9ECF1] mb-4">
        <div
          className="absolute h-1.5 rounded-full bg-[#2C4A6E]"
          style={{ left: `${minPct}%`, right: `${100 - maxPct}%` }}
        />
        <input
          type="range"
          min={MIN}
          max={MAX}
          step={500}
          value={min}
          onChange={handleMinChange}
          className="range-thumb absolute w-full top-1/2 -translate-y-1/2 appearance-none bg-transparent pointer-events-none"
        />
        <input
          type="range"
          min={MIN}
          max={MAX}
          step={500}
          value={max}
          onChange={handleMaxChange}
          className="range-thumb absolute w-full top-1/2 -translate-y-1/2 appearance-none bg-transparent pointer-events-none"
        />
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="px-3 py-1.5 rounded-lg bg-[#F7F9FB] border border-[#E3E9F0] text-[#1E2A38] font-medium">
          ৳{min.toLocaleString()}
        </span>
        <span className="text-[#8A97A8]">—</span>
        <span className="px-3 py-1.5 rounded-lg bg-[#F7F9FB] border border-[#E3E9F0] text-[#1E2A38] font-medium">
          ৳{max.toLocaleString()}
        </span>
      </div>

      <style>{`
        .range-thumb::-webkit-slider-thumb {
          pointer-events: all;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 9999px;
          background: #1E2A38;
          border: 2px solid white;
          box-shadow: 0 1px 4px rgba(30,42,56,0.4);
          cursor: pointer;
        }
        .range-thumb::-moz-range-thumb {
          pointer-events: all;
          width: 16px;
          height: 16px;
          border-radius: 9999px;
          background: #1E2A38;
          border: 2px solid white;
          box-shadow: 0 1px 4px rgba(30,42,56,0.4);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default PriceRange;