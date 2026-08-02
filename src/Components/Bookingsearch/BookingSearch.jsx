import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBookingBar = ({ data = {} }) => {
    const navigate = useNavigate();

    // Default configuration (merged with incoming data)
    const config = {
        isVisible: data.isVisible !== false,
        cardBgColor: data.cardBgColor || "#ffffff",
        
        showDestination: data.showDestination !== false,
        destinationLabel: data.destinationLabel || "Destination",
        destinationPlaceholder: data.destinationPlaceholder || "Where to?",
        destinationOptions: data.destinationOptions || ["Dhaka", "Cox's Bazar", "Sylhet", "Chattogram", "Rajshahi", "Khulna", "Bandarban", "Rangamati"],
        
        showCheckIn: data.showCheckIn !== false,
        checkInLabel: data.checkInLabel || "Check-in",
        showCheckOut: data.showCheckOut !== false,
        checkOutLabel: data.checkOutLabel || "Check-out",
        
        showAdults: data.showAdults !== false,
        adultsLabel: data.adultsLabel || "Adults",
        adultsMax: data.adultsMax || 6,
        
        showChildren: data.showChildren !== false,
        childrenLabel: data.childrenLabel || "Children",
        childrenMax: data.childrenMax || 4,
        
        showRooms: data.showRooms !== false,
        roomsLabel: data.roomsLabel || "Rooms",
        roomsMax: data.roomsMax || 4,
        
        buttonText: data.buttonText || "Search",
        buttonBgColor: data.buttonBgColor || "#d97706",
        buttonTextColor: data.buttonTextColor || "#ffffff"
    };

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
        if (config.showDestination && !searchData.destination.trim()) {
            setError("Please tell us where you'd like to stay.");
            return;
        }

        if ((config.showCheckIn && !searchData.checkIn) || (config.showCheckOut && !searchData.checkOut)) {
            setError("Please select your check-in and check-out dates.");
            return;
        }

        setError("");

        navigate("/search-results", {
            state: searchData,
        });
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

    if (!config.isVisible) return null;

    return (
        <section className="relative z-20 pt-[56px] lg:pt-[64px] pb-[16px] px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto">
                <div 
                    className="relative border border-[#E3E9F0] rounded-[20px] shadow-lg md:h-[100px] px-4 py-4 md:px-6 md:py-0 w-full"
                    style={{ backgroundColor: config.cardBgColor }}
                >
                    <div className="flex flex-col md:flex-row md:items-stretch md:h-full gap-3 md:gap-0">
                        
                        {/* Destination */}
                        {config.showDestination && (
                            <div className="flex-[1.6] flex flex-col items-center justify-center gap-1.5 px-3 py-3 md:py-0 border-b md:border-b-0 md:border-r border-[#E9ECF1] bg-amber-50/50 md:rounded-xl hover:bg-amber-50 transition-colors cursor-pointer relative">
                                <label className="text-[10px] font-bold text-[#d97706] uppercase tracking-widest flex items-center gap-1.5 pointer-events-none">
                                    {fieldIcon(
                                        <>
                                            <path d="M21 21l-4.35-4.35" />
                                            <circle cx="11" cy="11" r="7" />
                                        </>
                                    )}
                                    {config.destinationLabel}
                                </label>
                                <select
                                    value={searchData.destination}
                                    onChange={handleChange("destination")}
                                    className="w-full bg-transparent text-[#1E2A38] text-base font-bold text-center focus:outline-none appearance-none cursor-pointer"
                                >
                                    <option value="">{config.destinationPlaceholder}</option>
                                    {config.destinationOptions.map(opt => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Check-in */}
                        {config.showCheckIn && (
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
                                        {config.checkInLabel}
                                    </label>
                                    <input
                                        type="date"
                                        value={searchData.checkIn}
                                        onChange={handleChange("checkIn")}
                                        className="w-full bg-transparent text-[#1E2A38] text-sm font-medium focus:outline-none"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Check-out */}
                        {config.showCheckOut && (
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
                                        {config.checkOutLabel}
                                    </label>
                                    <input
                                        type="date"
                                        value={searchData.checkOut}
                                        onChange={handleChange("checkOut")}
                                        className="w-full bg-transparent text-[#1E2A38] text-sm font-medium focus:outline-none"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Guests (Adults & Children) */}
                        {(config.showAdults || config.showChildren) && (
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
                                    {config.showAdults && (
                                        <div className="flex flex-col w-full">
                                            <label className="text-[10px] font-semibold text-[#8A97A8] uppercase tracking-wide">
                                                {config.adultsLabel}
                                            </label>
                                            <select
                                                value={searchData.adults}
                                                onChange={handleChange("adults")}
                                                className="w-full bg-transparent text-[#1E2A38] text-sm font-medium focus:outline-none appearance-none"
                                            >
                                                {Array.from({ length: config.adultsMax }, (_, i) => i + 1).map((n) => (
                                                    <option key={n} value={n}>{n}</option>
                                                ))}
                                            </select>
                                        </div>
                                    )}
                                    {config.showChildren && (
                                        <div className="flex flex-col w-full">
                                            <label className="text-[10px] font-semibold text-[#8A97A8] uppercase tracking-wide">
                                                {config.childrenLabel}
                                            </label>
                                            <select
                                                value={searchData.children}
                                                onChange={handleChange("children")}
                                                className="w-full bg-transparent text-[#1E2A38] text-sm font-medium focus:outline-none appearance-none"
                                            >
                                                {Array.from({ length: config.childrenMax + 1 }, (_, i) => i).map((n) => (
                                                    <option key={n} value={n}>{n}</option>
                                                ))}
                                            </select>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Rooms */}
                        {config.showRooms && (
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
                                        {config.roomsLabel}
                                    </label>
                                    <select
                                        value={searchData.rooms}
                                        onChange={handleChange("rooms")}
                                        className="w-full bg-transparent text-[#1E2A38] text-sm font-medium focus:outline-none appearance-none"
                                    >
                                        {Array.from({ length: config.roomsMax }, (_, i) => i + 1).map((n) => (
                                            <option key={n} value={n}>{n}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        )}

                        {/* Search button */}
                        <div className="flex items-center py-2 md:py-0 md:pl-5">
                            <button
                                type="button"
                                onClick={handleSearch}
                                style={{ backgroundColor: config.buttonBgColor, color: config.buttonTextColor }}
                                className="w-full md:w-[140px] h-[52px] md:h-[64px] inline-flex items-center justify-center gap-2 font-semibold text-[15px] tracking-wide rounded-xl md:rounded-2xl transition-all duration-300 shadow-lg shadow-amber-600/20 hover:shadow-amber-600/40 hover:-translate-y-0.5"
                            >
                                {fieldIcon(<path d="M21 21l-4.35-4.35M18 11a7 7 0 1 1-14 0 7 7 0 0 1 14 0z" />)}
                                {config.buttonText}
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