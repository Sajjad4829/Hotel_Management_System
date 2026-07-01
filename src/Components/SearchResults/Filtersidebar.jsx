import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBookingBar = () => {
  const navigate = useNavigate();

  const [searchData, setSearchData] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    adults: "2",
    children: "0",
    rooms: "1",
  });

  const [error, setError] = useState("");

  const handleChange = (field) => (e) => {
    setSearchData((prev) => ({ ...prev, [field]: e.target.value }));
    if (error) setError("");
  };

  const handleSearch = () => {
    if (!searchData.destination.trim()) {
      setError("Please tell us where you'd like to stay.");
      return;
    }
    if (!searchData.checkIn || !searchData.checkOut) {
      setError("Please select your check-in and check-out dates.");
      return;
    }
    setError("");
    navigate("/hotels", { state: searchData });
  };

  const fieldIcon = (paths) => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      {paths}
    </svg>
  );

  return (
    <section className="relative bg-gradient-to-b from-[#F7F9FB] to-[#EFF3F7] pt-10 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        {/* Intro */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-[#8A97A8] font-semibold mb-2">
            Plan Your Stay
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#1E2A38] tracking-tight mb-1.5">
            Find Your Perfect Room
          </h2>
          <p className="text-[#5B6B7D] text-sm max-w-md mx-auto">
            Handpicked rooms and suites, tailored to your stay.
          </p>
        </div>

        {/* Search Card */}
        <div className="relative bg-white border border-[#E3E9F0] rounded-[18px] shadow-[0_16px_40px_-12px_rgba(30,42,56,0.18)] md:-mb-14 md:h-[90px] px-3 py-3 md:px-4 md:py-0">
          <div className="flex flex-col md:flex-row md:items-stretch md:h-full">
            {/* Destination */}
            <div className="flex-[1.6] flex items-center gap-2.5 px-3 py-2.5 md:py-0 border-b md:border-b-0 md:border-r border-[#E9ECF1]">
              <span className="text-[#8A97A8]">
                {fieldIcon(
                  <>
                    <path d="M21 21l-4.35-4.35" />
                    <circle cx="11" cy="11" r="7" />
                  </>
                )}
              </span>
              <div className="flex flex-col w-full">
                <label className="text-[10px] font-semibold text-[#8A97A8] uppercase tracking-wide">
                  Destination
                </label>
                <input
                  type="text"
                  value={searchData.destination}
                  onChange={handleChange("destination")}
                  placeholder="Where would you like to stay?"
                  className="w-full bg-transparent text-[#1E2A38] placeholder-[#9AA6B4] text-sm font-medium focus:outline-none"
                />
              </div>
            </div>

            {/* Check-in */}
            <div className="flex-1 flex items-center gap-2.5 px-3 py-2.5 md:py-0 border-b md:border-b-0 md:border-r border-[#E9ECF1]">
              <span className="text-[#8A97A8]">
                {fieldIcon(
                  <>
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </>
                )}
              </span>
              <div className="flex flex-col w-full">
                <label className="text-[10px] font-semibold text-[#8A97A8] uppercase tracking-wide">
                  Check-in
                </label>
                <input
                  type="date"
                  value={searchData.checkIn}
                  onChange={handleChange("checkIn")}
                  className="w-full bg-transparent text-[#1E2A38] text-sm font-medium focus:outline-none"
                />
              </div>
            </div>

            {/* Check-out */}
            <div className="flex-1 flex items-center gap-2.5 px-3 py-2.5 md:py-0 border-b md:border-b-0 md:border-r border-[#E9ECF1]">
              <span className="text-[#8A97A8]">
                {fieldIcon(
                  <>
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </>
                )}
              </span>
              <div className="flex flex-col w-full">
                <label className="text-[10px] font-semibold text-[#8A97A8] uppercase tracking-wide">
                  Check-out
                </label>
                <input
                  type="date"
                  value={searchData.checkOut}
                  onChange={handleChange("checkOut")}
                  className="w-full bg-transparent text-[#1E2A38] text-sm font-medium focus:outline-none"
                />
              </div>
            </div>

            {/* Adults & Children */}
            <div className="flex-[1.2] flex items-center gap-2.5 px-3 py-2.5 md:py-0 border-b md:border-b-0 md:border-r border-[#E9ECF1]">
              <span className="text-[#8A97A8]">
                {fieldIcon(
                  <>
                    <circle cx="9" cy="8" r="3.2" />
                    <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
                    <circle cx="17" cy="8.5" r="2.4" />
                    <path d="M15.8 14c2.3.3 4.2 2 4.2 5" />
                  </>
                )}
              </span>
              <div className="flex w-full gap-2">
                <div className="flex flex-col w-full">
                  <label className="text-[10px] font-semibold text-[#8A97A8] uppercase tracking-wide">
                    Adults
                  </label>
                  <select
                    value={searchData.adults}
                    onChange={handleChange("adults")}
                    className="w-full bg-transparent text-[#1E2A38] text-sm font-medium focus:outline-none appearance-none"
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col w-full">
                  <label className="text-[10px] font-semibold text-[#8A97A8] uppercase tracking-wide">
                    Children
                  </label>
                  <select
                    value={searchData.children}
                    onChange={handleChange("children")}
                    className="w-full bg-transparent text-[#1E2A38] text-sm font-medium focus:outline-none appearance-none"
                  >
                    {[0, 1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Rooms */}
            <div className="flex-[0.8] flex items-center gap-2.5 px-3 py-2.5 md:py-0 border-b md:border-b-0 md:border-r border-[#E9ECF1]">
              <span className="text-[#8A97A8]">
                {fieldIcon(
                  <>
                    <path d="M4 21V9l8-5 8 5v12" />
                    <path d="M9 21v-6h6v6" />
                  </>
                )}
              </span>
              <div className="flex flex-col w-full">
                <label className="text-[10px] font-semibold text-[#8A97A8] uppercase tracking-wide">
                  Rooms
                </label>
                <select
                  value={searchData.rooms}
                  onChange={handleChange("rooms")}
                  className="w-full bg-transparent text-[#1E2A38] text-sm font-medium focus:outline-none appearance-none"
                >
                  {[1, 2, 3, 4].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Search button */}
            <div className="flex items-center py-2.5 md:py-0 md:pl-3">
              <button
                type="button"
                onClick={handleSearch}
                className="w-full md:w-auto h-[52px] md:h-[70px] inline-flex items-center justify-center gap-2 bg-[#1E2A38] hover:bg-[#2C4A6E] text-white font-medium text-sm tracking-wide rounded-xl md:rounded-2xl px-7 transition-colors duration-300"
              >
                {fieldIcon(<path d="M21 21l-4.35-4.35M18 11a7 7 0 1 1-14 0 7 7 0 0 1 14 0z" />)}
                Search
              </button>
            </div>
          </div>
        </div>

        {error && (
          <p className="text-center mt-3 md:mt-16 text-sm text-[#B4483D] font-medium">
            {error}
          </p>
        )}
      </div>
    </section>
  );
};

export default SearchBookingBar;