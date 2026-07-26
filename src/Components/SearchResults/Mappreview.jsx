import React from "react";

const PinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1E2A38" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 1 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ExpandIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
  </svg>
);

const MapPreview = ({ onOpenFullMap }) => {
  return (
    <div className="hidden lg:block sticky top-24">
      <div className="relative rounded-2xl overflow-hidden border border-[#E3E9F0] h-64 bg-[#EAF0F5]">
        {/* Placeholder map pattern */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(#DCE5EE 1px, transparent 1px), linear-gradient(90deg, #DCE5EE 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center">
            <PinIcon />
          </span>
        </div>
        <button
          type="button"
          onClick={onOpenFullMap}
          className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 bg-white text-[#1E2A38] text-xs font-semibold rounded-lg px-3 py-2 shadow-md hover:bg-[#F7F9FB] transition-colors"
        >
          <ExpandIcon />
          Open Full Map
        </button>
      </div>
      <p className="text-xs text-[#8A97A8] mt-2.5 text-center">
        See all properties near your destination
      </p>
    </div>
  );
};

export default MapPreview;