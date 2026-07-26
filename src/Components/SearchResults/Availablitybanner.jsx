import React from "react";

const FlameIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2s-2.5 3.5-2.5 6.5A2.5 2.5 0 0 0 12 11a2.5 2.5 0 0 0 2.5-2.5C14.5 5.5 12 2 12 2z" />
    <path d="M7 13c0 4 2 8 5 8s5-4 5-8c0-1.8-.7-3-1.5-4-.2 1.5-1 2.5-2 2.5S11.7 8.5 11.5 7C9.8 8.5 7 10 7 13z" />
  </svg>
);

const AvailabilityBanner = ({ message }) => {
  return (
    <div className="mx-4 sm:mx-6 mb-4 flex items-center gap-2.5 bg-[#FBF3EA] border border-[#F0DFC7] text-[#8A5A2A] text-sm font-medium rounded-xl px-4 py-3">
      <FlameIcon />
      {message || "High demand for these dates — several properties are almost fully booked."}
    </div>
  );
};

export default AvailabilityBanner;