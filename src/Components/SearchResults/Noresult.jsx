import React from "react";

const EmptyIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#B9C4D0" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.35-4.35" />
    <path d="M8.5 11h5" />
  </svg>
);

const NoResults = ({ onReset }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6 animate-fade-in-up">
      <div className="w-24 h-24 rounded-full bg-[#F7F9FB] border border-[#E9ECF1] flex items-center justify-center mb-6">
        <EmptyIcon />
      </div>
      <h3 className="font-serif text-xl sm:text-2xl text-[#1E2A38] mb-2">
        No properties match your filters
      </h3>
      <p className="text-sm text-[#5B6B7D] max-w-sm mb-6">
        Try widening your price range or removing a few filters to see more
        available stays for your dates.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="bg-[#1E2A38] hover:bg-[#2C4A6E] text-white text-sm font-medium rounded-xl px-6 py-3 transition-colors"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default NoResults;