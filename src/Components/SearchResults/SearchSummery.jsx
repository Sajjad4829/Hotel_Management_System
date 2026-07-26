import React from "react";

const LocationIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 1 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const SearchSummary = ({ destination, checkIn, checkOut, adults, resultsCount }) => {
  return (
    <div className="px-4 sm:px-6 pt-6 pb-4">
      <div className="flex items-center gap-2 text-[#5B6B7D] text-sm mb-1.5">
        <LocationIcon />
        <span className="font-medium text-[#1E2A38]">{destination}</span>
        <span className="text-[#CBD4DF]">•</span>
        <span>{checkIn} - {checkOut}</span>
        <span className="text-[#CBD4DF]">•</span>
        <span>{adults} Adults</span>
      </div>
      <h1 className="font-serif text-2xl sm:text-3xl text-[#1E2A38] tracking-tight">
        {resultsCount} {resultsCount === 1 ? "Result" : "Results"} Found
      </h1>
    </div>
  );
};

export default SearchSummary;