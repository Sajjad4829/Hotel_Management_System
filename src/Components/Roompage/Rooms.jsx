import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useRoomContext } from "../../Context/RoomContext";
import { usePageContext } from "../../Context/PageContext";
import { usePropertyContext } from "../../Context/PropertyContext";
import { motion } from "framer-motion";

// Premium Components
import HeroBanner from "./PremiumSections/HeroBanner";
import RoomCategories from "./PremiumSections/RoomCategories";
import WhyChooseUs from "./PremiumSections/WhyChooseUs";
import ExclusiveExperiences from "./PremiumSections/ExclusiveExperiences";
import GuestReviews from "./PremiumSections/GuestReviews";
import FAQSection from "./PremiumSections/FAQSection";
import Newsletter from "./PremiumSections/Newsletter";
import PremiumBookingCTA from "./PremiumSections/PremiumBookingCTA";
import RoomCard from "./Roomcard";

export default function RoomsPage() {
  const { rooms, categories } = useRoomContext();
  const { hotels, destinations } = usePropertyContext();

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchFilters, setSearchFilters] = useState({
    destination: "All",
    type: "All"
  });

  // Attach location data to each room for filtering
  const allRooms = rooms.map(room => {
    const hotel = hotels.find(l => String(l.id) === String(room.propertyId));
    const dest = hotel ? destinations.find(d => String(d.id) === String(hotel.destinationId)) : null;
    return {
      ...room,
      hotelName: hotel ? hotel.name : "Unknown Hotel",
      destinationName: dest ? dest.name : "Unknown Destination",
      capacity: (room.maxAdults || 0) + (room.maxChildren || 0),
    };
  });

  const uniqueDestinations = ["All", ...new Set(allRooms.map(r => r.destinationName).filter(Boolean))];
  const roomTypes = ["All", ...categories.map(c => c.name)];

  const handleSearch = (filters) => {
    setSearchFilters(filters);
    setActiveCategory(filters.type); // Sync category with search type
  };

  const handleCategorySelect = (category) => {
    setActiveCategory(category);
    setSearchFilters(prev => ({ ...prev, type: category }));
  };

  // Filter Logic
  const filtered = allRooms.filter((r) => {
    if (!r.isActive) return false;
    
    const matchDest = searchFilters.destination === "All" || r.destinationName === searchFilters.destination;
    const matchType = searchFilters.type === "All" || r.type === searchFilters.type;
    const matchCat = activeCategory === "All" || r.type === activeCategory;

    return matchDest && matchType && matchCat;
  });

  return (
    <div className="min-h-screen bg-[#FAFAF8] font-sans antialiased">
      {/* 1. Hero Banner */}
      <HeroBanner />

      {/* 3. Room Categories */}
      <RoomCategories 
        categories={roomTypes} 
        activeCategory={activeCategory} 
        onSelectCategory={handleCategorySelect} 
      />

      {/* 4. Featured Rooms Grid */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4">
          <div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-amber-600 text-xs font-semibold uppercase tracking-widest mb-3"
            >
              Our Collection
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-light text-stone-900 font-serif"
            >
              Curated <span className="italic text-stone-500">Accommodations</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-stone-500 font-light"
          >
            {filtered.length} {filtered.length === 1 ? "Suite" : "Suites"} Available
          </motion.p>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-3xl border border-stone-100 shadow-xl shadow-stone-200/50">
            <h3 className="text-2xl font-serif text-stone-800 mb-2">No Availability</h3>
            <p className="text-stone-500">We couldn't find any rooms matching your luxurious standards right now.</p>
            <button 
              onClick={() => handleSearch({destination: "All", type: "All"})}
              className="mt-6 text-amber-600 font-bold uppercase tracking-widest text-xs hover:text-amber-500 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
              >
                <RoomCard room={room} />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* 5. Why Choose Us */}
      <WhyChooseUs />

      {/* 6. Exclusive Experiences */}
      <ExclusiveExperiences />

      {/* 7. Guest Reviews */}
      <GuestReviews />

      {/* 8. FAQ Section */}
      <FAQSection />

      {/* 9. Newsletter */}
      <Newsletter />

      {/* 10. Premium Booking CTA */}
      <PremiumBookingCTA />
      
    </div>
  );
}