import { useMemo, useState } from "react";

import OfferFilter from "./OfferFilter";
import FeaturedOffers from "./FeaturedOffers";
import PackageSection from "./PackageSection";
import PromoCodeSection from "./PromoCodeSection";
import CountdownTimer from "./CountdownTimer";
import MembershipOffers from "./MembershipOffers";
import WhyBookDirect from "./WhyBookDirect";
import Testimonials from "./Testimonials";
import FAQ from "./FAQ";
import Newsletter from "./Newsletter";
import FooterCTA from "./FooterCTA";
import { usePageContext } from "../../Context/PageContext";
import { useRoomContext } from "../../Context/RoomContext";
import { usePropertyContext } from "../../Context/PropertyContext";
import { categories, packages, membershipTiers, whyBookDirect, testimonials, faqs } from "./offersData";
import HeroSection from "./HeroSection";

export default function OffersPage() {
  const { pagesData } = usePageContext();
  const { rooms, categories: roomTypes } = useRoomContext();
  const { hotels } = usePropertyContext();
  
  const [activeFilters, setActiveFilters] = useState({
    occasion: "All",
    discount: "All",
    hotel: "All",
    roomCategory: "All",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilterChange = (filterType, value) => {
    setActiveFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const processedOffers = useMemo(() => {
    const rawOffers = pagesData?.offers?.items || [];
    
    return rawOffers
      .filter(o => o.status === 'Active')
      .map(offer => {
        // Resolve relational data
        const hotel = hotels.find(l => l.id === offer.hotelId) || {};
        
        // Handle multiple rooms
        const roomIds = Array.isArray(offer.roomId) ? offer.roomId : [offer.roomId].filter(Boolean);
        const mappedRooms = roomIds.map(rId => rooms.find(r => r.id === rId)).filter(Boolean);
        // If no rooms specifically selected, fallback to just mapping by hotel if any? 
        // Actually, the new architecture states an offer selects one or multiple rooms.
        // We'll use the first room's price as baseline if multiple, or compute a range if needed.
        const baseRoom = mappedRooms[0] || rooms.find(r => r.propertyId === offer.hotelId) || {};
        
        // Find unique categories of selected rooms
        const categoriesOfRooms = [...new Set(mappedRooms.map(r => r.type).filter(Boolean))];

        // Calculate prices based on base room
        const originalPrice = baseRoom.price || 0;
        let discountPercent = 0;
        // Parse e.g. "30% OFF" -> 30
        const match = offer.discount?.match(/(\d+)%/);
        if (match) discountPercent = parseInt(match[1]);
        
        const savings = Math.round(originalPrice * (discountPercent / 100));
        const discountedPrice = originalPrice - savings;

        return {
          ...offer,
          image: offer.offerBanner || baseRoom.thumbnailImage || hotel.image || "",
          badge: offer.offerBadge || offer.discount,
          title: offer.offerTitle,
          description: offer.description,
          originalPrice,
          discountedPrice,
          savings,
          expiry: offer.countdown, // or endDate
          hotelName: hotel.name,
          roomCategories: categoriesOfRooms,
        };
      })
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }, [pagesData, rooms, hotels]);

  // Extract unique filter options dynamically from processedOffers
  const uniqueOccasions = ["All", ...new Set(processedOffers.map(o => o.occasion).filter(Boolean))];
  const uniqueDiscounts = ["All", ...new Set(processedOffers.map(o => o.discount).filter(Boolean))];
  const uniqueHotels = ["All", ...new Set(processedOffers.map(o => o.hotelName).filter(Boolean))];
  const uniqueRoomCategories = ["All", ...new Set(processedOffers.flatMap(o => o.roomCategories).filter(Boolean))];

  const filteredOffers = useMemo(() => {
    return processedOffers.filter((o) => {
      const matchesOccasion = activeFilters.occasion === "All" || o.occasion === activeFilters.occasion;
      const matchesDiscount = activeFilters.discount === "All" || o.discount === activeFilters.discount;
      const matchesHotel = activeFilters.hotel === "All" || o.hotelName === activeFilters.hotel;
      const matchesCategory = activeFilters.roomCategory === "All" || o.roomCategories.includes(activeFilters.roomCategory);
      const matchesSearch = o.title.toLowerCase().includes(searchTerm.toLowerCase().trim());
      
      return matchesOccasion && matchesDiscount && matchesHotel && matchesCategory && matchesSearch;
    });
  }, [activeFilters, searchTerm, processedOffers]);

  const scrollToOffers = () => {
    document.getElementById("offers")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <HeroSection onViewOffers={scrollToOffers} />

      <OfferFilter
        occasions={uniqueOccasions}
        discounts={uniqueDiscounts}
        hotels={uniqueHotels}
        roomCategories={uniqueRoomCategories}
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      

      <FeaturedOffers offers={filteredOffers} />

      <PackageSection packages={packages} />

      <PromoCodeSection />

      <CountdownTimer />

      <MembershipOffers tiers={membershipTiers} />

      <WhyBookDirect items={whyBookDirect} />

      <Testimonials testimonials={testimonials} />

      <FAQ faqs={faqs} />

      <Newsletter />

      <FooterCTA onBookNow={scrollToOffers} />
    </div>
  );
}
