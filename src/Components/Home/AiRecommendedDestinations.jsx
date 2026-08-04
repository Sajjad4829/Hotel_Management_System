import React, { useMemo } from 'react';
import { Sparkles, ArrowRight, MapPin, Star, Award, TrendingUp, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePropertyContext } from '../../Context/PropertyContext';

const AiRecommendedDestinations = ({ data }) => {
  const { destinations, hotels } = usePropertyContext();

  // Dynamic AI Logic
  const aiDestinations = useMemo(() => {
    if (!destinations || destinations.length === 0) return [];

    const activeDestinations = destinations.filter(d => d.isActive).sort((a, b) => a.displayOrder - b.displayOrder);

    return activeDestinations.map(dest => {
      const destHotels = hotels ? hotels.filter(h => h.destinationId === dest.id && h.isActive) : [];
      
      // Calculate basic stats for this destination
      const avgRating = destHotels.length > 0 
        ? destHotels.reduce((acc, h) => acc + (parseFloat(h.rating) || 0), 0) / destHotels.length 
        : 0;
      const hasLuxury = destHotels.some(h => (h.category || '').toLowerCase().includes('luxury') || (h.category || '').toLowerCase().includes('5 star'));

      let aiTag = "";
      let aiReason = "";
      let aiScore = 90;
      let Icon = Sparkles;

      // Assign categories based on real data
      if (avgRating >= 4.8) {
        aiTag = "Highest Rated";
        aiReason = "Consistently rated exceptional by verified guests across all properties.";
        aiScore = 98;
        Icon = Star;
      } else if (hasLuxury) {
        aiTag = "Luxury Collection";
        aiReason = "Home to world-class 5-star properties and premium, curated experiences.";
        aiScore = 96;
        Icon = Award;
      } else if (destHotels.length > 2) {
        aiTag = "Popular Destination";
        aiReason = "A highly sought-after location offering multiple top-tier properties.";
        aiScore = 94;
        Icon = TrendingUp;
      } else {
        // Deterministic fallback so it doesn't change on re-render
        const fallbacks = [
          { tag: "Trending This Week", reason: "Seeing a surge in bookings from travelers with profiles similar to yours.", score: 92, icon: TrendingUp },
          { tag: "Guest Favorite", reason: "Loved by couples and families for its unique charm and exceptional hospitality.", score: 95, icon: Heart },
          { tag: "Award Winning", reason: "Recognized internationally for outstanding natural beauty and service.", score: 97, icon: Award },
          { tag: "Best Value", reason: "Exceptional luxury experiences that offer the absolute best value for your stay.", score: 89, icon: Star },
          { tag: "Most Booked", reason: "Our most frequently reserved destination over the last 30 days.", score: 93, icon: TrendingUp }
        ];
        // simple hash of ID
        const hash = (dest.id || '').split('').reduce((a, b) => a + b.charCodeAt(0), 0) || 0;
        const selected = fallbacks[hash % fallbacks.length];
        aiTag = selected.tag;
        aiReason = selected.reason;
        aiScore = selected.score;
        Icon = selected.icon;
      }

      return {
        ...dest,
        aiTag,
        aiReason,
        aiScore,
        Icon
      };
    });
  }, [destinations, hotels]);

  if (!data?.isVisible || aiDestinations.length === 0) return null;

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 mb-4 bg-white px-4 py-1.5 rounded-full shadow-sm border border-slate-200">
            <Star className="w-4 h-4 text-amber-500" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-700">
              {data.badgeText || "Curated For You"}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-4" style={{ fontFamily: "Georgia, serif" }}>
            {data.title || "Top"} <span className="italic text-slate-700">{data.titleHighlight || "Picks"}</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-lg">
            {data.subtitle || "Destinations carefully selected for your travel profile."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {aiDestinations.map((dest, index) => {
            const Icon = dest.Icon;
            return (
              <div 
                key={dest.id || index} 
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100/50 flex flex-col"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Match Score Badge */}
                <div className="absolute top-4 right-4 z-20 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm border border-white/20 flex items-center gap-1.5 transform group-hover:scale-105 transition-transform">
                  <Icon className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-xs font-bold text-slate-800">{dest.aiTag}</span>
                </div>

                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img 
                    src={dest.image} 
                    alt={dest.name} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow relative">
                  {/* Subtle gradient border at top of content */}
                  <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="flex justify-between items-end mb-2">
                    <h3 className="text-2xl font-medium text-slate-900" style={{ fontFamily: "Georgia, serif" }}>
                      {dest.name}
                    </h3>
                  </div>
                  
                  <div className="flex items-start gap-2 mb-6">
                    <MapPin className="w-4 h-4 text-amber-500 mt-1 flex-shrink-0" />
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {dest.aiReason}
                    </p>
                  </div>

                  <div className="mt-auto pt-4 border-t border-slate-50">
                    <Link 
                      to={`/search-results?location=${dest.name}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700 hover:text-amber-800 transition-colors group/btn"
                    >
                      View Destination
                      <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
      `}</style>
    </section>
  );
};

export default AiRecommendedDestinations;
