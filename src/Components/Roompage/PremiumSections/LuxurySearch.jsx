import { useState } from "react";
import { Search, Calendar, Users, Building2 } from "lucide-react";
import { motion } from "framer-motion";

export default function LuxurySearch({ 
  onSearch, 
  destinations = [], 
  roomTypes = [] 
}) {
  const [destination, setDestination] = useState("All");
  const [type, setType] = useState("All");

  return (
    <section className="relative z-20 max-w-7xl mx-auto px-6 -mt-16 mb-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="bg-[#121212]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl shadow-black/50"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Destination */}
          <div className="relative group">
            <label className="block text-xs font-semibold text-white/50 uppercase tracking-widest mb-2">
              Destination
            </label>
            <div className="relative">
              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400 w-5 h-5" />
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white appearance-none cursor-pointer focus:outline-none focus:border-amber-400/50 transition-colors"
              >
                {destinations.map(d => (
                  <option key={d} value={d} className="bg-[#1a1a1a] text-white">
                    {d === "All" ? "All Destinations" : d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Dates */}
          <div className="relative group">
            <label className="block text-xs font-semibold text-white/50 uppercase tracking-widest mb-2">
              Stay Dates
            </label>
            <div className="relative flex items-center bg-white/5 border border-white/10 rounded-xl overflow-hidden focus-within:border-amber-400/50 transition-colors">
              <div className="pl-4">
                <Calendar className="text-amber-400 w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Check-in - Check-out"
                className="w-full bg-transparent py-3.5 px-3 text-white placeholder-white/40 focus:outline-none"
              />
            </div>
          </div>

          {/* Room Type */}
          <div className="relative group">
            <label className="block text-xs font-semibold text-white/50 uppercase tracking-widest mb-2">
              Room Type
            </label>
            <div className="relative">
              <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400 w-5 h-5" />
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white appearance-none cursor-pointer focus:outline-none focus:border-amber-400/50 transition-colors"
              >
                {roomTypes.map(t => (
                  <option key={t} value={t} className="bg-[#1a1a1a] text-white">
                    {t === "All" ? "All Room Types" : t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div className="flex items-end">
            <button
              onClick={() => onSearch({ destination, type })}
              className="w-full bg-amber-500 hover:bg-amber-400 text-[#0A0A0A] font-bold uppercase tracking-widest text-sm py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              Check Availability
            </button>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
