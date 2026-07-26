import React from "react";
import { FACILITY_OPTIONS } from "./Mockdata";

const FacilitiesFilter = ({ selected, onChange }) => {
  const toggle = (id) => {
    onChange(
      selected.includes(id)
        ? selected.filter((s) => s !== id)
        : [...selected, id]
    );
  };

  return (
    <div>
      <h3 className="text-sm font-semibold text-[#1E2A38] mb-3">
        Amenities
      </h3>
      <div className="flex flex-col gap-2.5 max-h-64 overflow-y-auto pr-1 -mr-1">
        {FACILITY_OPTIONS.map((opt) => (
          <label
            key={opt.id}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={selected.includes(opt.id)}
              onChange={() => toggle(opt.id)}
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
            <span className="text-sm text-[#3D4A5C] group-hover:text-[#1E2A38] transition-colors">
              {opt.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FacilitiesFilter;