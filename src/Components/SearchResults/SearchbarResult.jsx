import { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { usePropertyContext } from "../../Context/PropertyContext";
import SearchResultHeader from "./SearchResultHeader";
import FilterSidebar from "./FilterSidebar";
import { EmptyState, LoadingSkeleton, Pagination } from "./Ui";
import { useSearchParams } from "react-router-dom";
import HotelCard from "./Hotelcard";
/* ─── CONSTANTS ─────────────────────────────────────────── */
const HOTELS_PER_PAGE = 5;

const DEFAULT_FILTERS = {
  price: { min: 0, max: 1000 },
  roomType: "",
  stars: [],
  guestRatingMin: 0,
  breakfast: false,
  freeCancellation: false,
  amenities: [],
};


/* ─── HELPERS ────────────────────────────────────────────── */
const applyFilters = (hotels, filters, searchData, destinations = []) =>
  hotels.filter((h) => {
    // Filter by location if searchData has a location or destination
    const searchTerm = searchData?.location || searchData?.destination;
    if (searchTerm) {
      const target = searchTerm.toLowerCase();
      
      // Find matching destination by name to catch dynamically created destination IDs
      const matchedDest = destinations.find(d => (d.name || "").toLowerCase() === target);
      const matchedDestId = matchedDest?.id?.toLowerCase();

      const hotelCity = (h.city || "").toLowerCase();
      const hotelAddress = (h.address || "").toLowerCase();
      const hotelDestId = (h.destinationId || "").toLowerCase();
      const destIdTarget = `dest-${target.replace(/[^a-z0-9]+/g, '-')}`;
      
      if (
        !hotelCity.includes(target) && 
        !hotelAddress.includes(target) && 
        hotelDestId !== target && 
        hotelDestId !== destIdTarget &&
        (!matchedDestId || hotelDestId !== matchedDestId)
      ) {
        return false;
      }
    }

    const price = h.price || Math.floor(Math.random() * 300) + 50; // Fallback price
    if (price < filters.price.min || price > filters.price.max) return false;
    if (filters.roomType && h.roomType && h.roomType !== filters.roomType) return false;
    
    const stars = Number(h.stars) || (h.category?.includes('5') ? 5 : h.category?.includes('4') ? 4 : 3);
    if (filters.stars.length > 0 && !filters.stars.includes(stars)) return false;
    
    const rating = h.guestRating || (h.rating ? parseFloat(h.rating) : 8.0);
    if (filters.guestRatingMin > 0 && rating < filters.guestRatingMin) return false;
    
    if (filters.breakfast && h.breakfast === false) return false;
    if (filters.freeCancellation && h.freeCancellation === false) return false;
    if (
      filters.amenities.length > 0 &&
      !filters.amenities.every((a) => (h.amenities || []).some(ha => ha.toLowerCase().includes(a.toLowerCase())))
    )
      return false;
    return true;
  });

const applySort = (hotels, sortBy) => {
  const arr = [...hotels];
  switch (sortBy) {
    case "price_asc":
      return arr.sort((a, b) => a.price - b.price);
    case "price_desc":
      return arr.sort((a, b) => b.price - a.price);
    case "rating_desc":
      return arr.sort((a, b) => b.guestRating - a.guestRating);
    case "popular":
      return arr.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
    case "newest":
      return arr.sort((a, b) => (b.newest ? 1 : 0) - (a.newest ? 1 : 0));
    default:
      return arr;
  }
};

/* ════════════════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════════════════ */
export default function SearchbarResult() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchData] = useState(() => {
    if (location.state && Object.keys(location.state).length > 0) {
      return location.state;
    }
    // Fallback to URL search parameters if location.state is null (e.g. on refresh or direct link)
    return {
      destination: searchParams.get("destination") || searchParams.get("location") || "",
      location: searchParams.get("location") || searchParams.get("destination") || "",
      checkIn: searchParams.get("checkIn") || "",
      checkOut: searchParams.get("checkOut") || "",
      adults: searchParams.get("adults") || "2",
      children: searchParams.get("children") || "0",
      rooms: searchParams.get("rooms") || "1",
    };
  });

  const pageFromUrl = Number(searchParams.get("page")) || 1;

  const { hotels: liveHotels, destinations } = usePropertyContext();
  const [hotels, setHotels] = useState(liveHotels);

  // Sync with context if it changes
  useEffect(() => {
    setHotels(liveHotels);
  }, [liveHotels]);

  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [sortBy, setSortBy] = useState("recommended");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(pageFromUrl);

  // Sync search state and pagination to URL parameters so it survives refreshes
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    
    newParams.set("page", currentPage);
    
    if (searchData.destination || searchData.location) {
      newParams.set("destination", searchData.destination || searchData.location);
    }
    if (searchData.checkIn) newParams.set("checkIn", searchData.checkIn);
    if (searchData.checkOut) newParams.set("checkOut", searchData.checkOut);
    if (searchData.adults) newParams.set("adults", searchData.adults);
    if (searchData.children) newParams.set("children", searchData.children);
    if (searchData.rooms) newParams.set("rooms", searchData.rooms);

    setSearchParams(newParams, { replace: true });
  }, [currentPage, searchData]);
  // Commented out code removed for brevity

  /* Simulate initial load */
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  /* Reset to page 1 when filters or sort changes */
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
      setSearchParams({ page: 1 });
    }
  }, [filters, sortBy]);


  const filteredHotels = useMemo(() => {
    return applyFilters(hotels, filters, searchData, destinations);
  }, [hotels, filters, searchData, destinations]);
  const sortedHotels = useMemo(() => applySort(filteredHotels, sortBy), [filteredHotels, sortBy]);
  const totalPages = Math.ceil(sortedHotels.length / HOTELS_PER_PAGE);
  const paginatedHotels = useMemo(
    () => sortedHotels.slice((currentPage - 1) * HOTELS_PER_PAGE, currentPage * HOTELS_PER_PAGE),
    [sortedHotels, currentPage]
  );

  /* ── Handlers ── */
  const handleFilterChange = (updated) => setFilters(updated);
  const handleFilterReset = () => setFilters(DEFAULT_FILTERS);
  //console.log(paginatedHotels);
  return (
    <div className="min-h-screen" style={{ background: "#F7F9FB", fontFamily: "'Inter', sans-serif" }}>

      {/* ─── Header ─── */}
      <SearchResultHeader
        searchParams={searchData}
        totalFound={filteredHotels.length}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onMobileFilterOpen={() => setIsMobileFilterOpen(true)}
      />

      {/* ─── Body ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex gap-6 items-start">

        {/* ─── Filter Sidebar ─── */}
        <FilterSidebar
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleFilterReset}
          isMobileOpen={isMobileFilterOpen}
          onMobileClose={() => setIsMobileFilterOpen(false)}
        />

        {/* ─── Results Column ─── */}
        <main className="flex-1 min-w-0 flex flex-col gap-4">
          {loading ? (
            <LoadingSkeleton count={HOTELS_PER_PAGE} />
          ) : paginatedHotels.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              {paginatedHotels.map((hotel) => (
                <HotelCard
                  key={hotel.id}
                  hotel={hotel}
                  currentPage={currentPage}
                  searchData={searchData}
                />
              ))}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => {
                  setCurrentPage(page);
                  setSearchParams({ page });
                }}
              />
            </>
          )}
        </main>

      </div>
    </div>
  );
}