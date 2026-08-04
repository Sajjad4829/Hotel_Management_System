import React, { useMemo } from 'react';
import { Heart, MapPin, Star, Building2, CheckCircle2, ThumbsUp } from 'lucide-react';
import { usePropertyContext } from '../../Context/PropertyContext';
import { Link } from 'react-router-dom';

export default function AiRecommendedHotels({ currentHotelId }) {
  const { hotels } = usePropertyContext();

  // The AI Recommendation Algorithm
  const recommendedHotels = useMemo(() => {
    if (!hotels || hotels.length === 0 || !currentHotelId) return [];

    const currentHotel = hotels.find(h => h.id === currentHotelId);
    if (!currentHotel) return [];

    // Parse numeric rating from string (e.g., "4.9/5" -> 4.9)
    const getNumericRating = (ratingStr) => {
      const parsed = parseFloat(ratingStr);
      return isNaN(parsed) ? 0 : parsed;
    };

    const currentAmenities = new Set(currentHotel.amenities || []);

    // 1. Exclude the currently viewed hotel
    const eligibleHotels = hotels.filter(h => h.id !== currentHotelId && h.isActive);

    const scoredHotels = eligibleHotels.map(hotel => {
      let score = 0;

      // 2. Highest priority: Same location (city)
      if (hotel.city === currentHotel.city) {
        score += 50;
      }

      // 3. Same category (e.g. 5 Star Luxury)
      if (hotel.category === currentHotel.category) {
        score += 30;
      }

      // 4. Shared amenities overlap
      const hotelAmenities = hotel.amenities || [];
      let sharedAmenitiesCount = 0;
      hotelAmenities.forEach(amenity => {
        if (currentAmenities.has(amenity)) {
          sharedAmenitiesCount++;
        }
      });
      score += (sharedAmenitiesCount * 5); // +5 points per shared amenity

      // 5. Featured / Top-rated (Rating >= 4.5)
      const numericRating = getNumericRating(hotel.rating);
      if (numericRating >= 4.5) {
        score += 10;
      }
      
      // Tie-breaker: use rating
      score += numericRating;

      return {
        ...hotel,
        matchScore: score,
        sharedAmenitiesCount,
        numericRating
      };
    });

    // 6. Sort descending by score
    scoredHotels.sort((a, b) => b.matchScore - a.matchScore);

    // 7. Return maximum of 4 hotels
    return scoredHotels.slice(0, 4);
  }, [hotels, currentHotelId]);

  if (recommendedHotels.length === 0) return null;

  return (
    <div className="py-16 mt-16 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6 animate-fade-in-up">
          <div>
            <div className="inline-flex items-center gap-2 mb-3 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
              <Heart className="w-4 h-4 text-amber-600" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-700">Guest Favorites</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-slate-900" style={{ fontFamily: "Georgia, serif" }}>
              You might also <span className="italic text-slate-600">love</span>
            </h2>
            <p className="text-slate-500 mt-2 max-w-xl">
              Guests who viewed this property also liked these carefully curated alternative stays.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recommendedHotels.map((hotel, idx) => (
            <Link 
              to={`/hotel/${hotel.id}`}
              key={hotel.id}
              className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img 
                  src={hotel.image} 
                  alt={hotel.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Recommendation Badge */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur px-2.5 py-1 rounded-md text-xs font-bold text-amber-700 shadow-sm flex items-center gap-1.5 border border-white/50">
                  <ThumbsUp size={12} />
                  <span>{hotel.matchScore > 60 ? 'Highly Recommended' : 'Popular Choice'}</span>
                </div>
                
                {/* Rating Badge */}
                <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold text-white flex items-center gap-1">
                  <Star size={12} className="text-amber-400 fill-amber-400" />
                  <span>{hotel.numericRating.toFixed(1)}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-1 group-hover:text-amber-700 transition-colors" style={{ fontFamily: "Georgia, serif" }}>
                  {hotel.name}
                </h3>
                
                <div className="flex items-center gap-1.5 text-slate-500 text-sm mb-4">
                  <MapPin size={14} className="shrink-0 text-slate-400" />
                  <span className="truncate">{hotel.address}</span>
                </div>

                {/* AI Insight Reason */}
                <div className="mt-auto pt-4 border-t border-slate-100 space-y-2">
                  <div className="flex items-start gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <Building2 size={14} className="text-blue-500 mt-0.5 shrink-0" />
                    <span>Same standard: <strong>{hotel.category}</strong></span>
                  </div>
                  
                  {hotel.sharedAmenitiesCount > 0 && (
                    <div className="flex items-start gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                      <span>Shares <strong>{hotel.sharedAmenitiesCount}</strong> similar amenities</span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
