import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Search, Map as MapIcon, Image as ImageIcon, Calendar, Globe, Navigation, Info } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { usePageContext } from "../../Context/PageContext";

const renderIcon = (iconName, props) => {
  const Icon = LucideIcons[iconName] || LucideIcons.CheckCircle;
  return <Icon {...props} />;
};

/* ─── NOT FOUND FALLBACK ────────────────────────────────── */
const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center text-center px-6" style={{ background: "#F7F9FB" }}>
    <h2 className="text-[22px] font-bold text-[#1E2A38] mb-2">Destination Not Found</h2>
    <p className="text-slate-500 mb-6 max-w-sm">We couldn't find a destination matching that ID or Slug.</p>
    <Link to="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-bold text-white bg-[#b45309]">
      <ArrowLeft size={14} /> Back to Home
    </Link>
  </div>
);

export default function DestinationDetails() {
  const { id } = useParams();
  const { pagesData } = usePageContext();

  const destinations = pagesData.home?.featuredCollection?.destinations || [];
  const destination = destinations.find((d) => d.slug === id || d.id === id);

  useEffect(() => {
    if (destination?.details?.seo) {
      document.title = destination.details.seo.metaTitle || `${destination.name} - Destination Details`;
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = "description";
        document.head.appendChild(metaDesc);
      }
      metaDesc.content = destination.details.seo.metaDescription || destination.description;
    }
  }, [destination]);

  if (!destination) return <NotFound />;

  const details = destination.details || {};
  const hero = details.hero || {};
  const ctaBox = details.ctaBox || {};
  const hotelsListConfig = details.hotelsList || {};
  const highlights = details.topHighlights?.items || [];
  const gallery = details.gallery?.items || [];
  const attractions = details.attractions?.items || [];
  const travelInfo = details.travelInfo || {};
  const facilitiesConfig = details.facilities || {};

  return (
    <div className="min-h-screen pb-16" style={{ background: "#F7F9FB", fontFamily: "'Inter', sans-serif" }}>
      {/* Hero Section */}
      <div className="relative h-[400px] sm:h-[500px]">
        <img 
          src={hero.bgImage || destination.image} 
          alt={hero.title || destination.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <Link to="/" className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-white/80 hover:text-white transition-colors mb-6 backdrop-blur-sm bg-black/20 px-3 py-1.5 rounded-lg w-fit">
              <ArrowLeft size={15} /> {hero.backButtonText || "Back"}
            </Link>
            
            <div className="flex items-center gap-2 mb-2">
              <MapPin size={20} className="text-[#b45309]" />
              <span className="text-[#b45309] font-bold tracking-widest uppercase text-sm">{hero.pageLabel || "Destination"}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: "Georgia, serif" }}>
              {hero.title || destination.name}
            </h1>
            <p className="text-slate-200 text-lg max-w-2xl leading-relaxed mb-6">
              {hero.description || destination.description}
            </p>
            {hero.ctaButtonText && (
              <a href={hero.ctaButtonLink || "#"} className="inline-flex items-center justify-center px-6 py-3 bg-[#b45309] hover:bg-orange-700 text-white rounded-xl font-bold transition-colors shadow-lg">
                {hero.ctaButtonText}
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Description & Highlights */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8">
              {(details.hero?.description || destination.description) && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-[#1E2A38] mb-4" style={{ fontFamily: "Georgia, serif" }}>About {destination.name}</h2>
                  <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{details.hero?.description || destination.description}</p>
                </div>
              )}

              {highlights.length > 0 && (
                <>
                  <h2 className="text-xl font-bold text-[#1E2A38] mb-4" style={{ fontFamily: "Georgia, serif" }}>{details.topHighlights?.sectionTitle || "Top Highlights"}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <div className="text-[#b45309] shrink-0">
                          {renderIcon(highlight.icon, { size: 20 })}
                        </div>
                        <span className="text-slate-700 font-medium">{highlight.name}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Travel Info */}
            {(travelInfo.bestTimeToVisit || travelInfo.weather || travelInfo.transportation || travelInfo.localTips) && (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-[#1E2A38] mb-6" style={{ fontFamily: "Georgia, serif" }}>Travel Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {travelInfo.bestTimeToVisit && (
                    <div className="flex gap-4">
                      <div className="bg-orange-50 text-[#b45309] p-3 rounded-xl h-fit"><Calendar size={20} /></div>
                      <div>
                        <h4 className="font-bold text-slate-800 mb-1">Best Time to Visit</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">{travelInfo.bestTimeToVisit}</p>
                      </div>
                    </div>
                  )}
                  {travelInfo.weather && (
                    <div className="flex gap-4">
                      <div className="bg-blue-50 text-blue-600 p-3 rounded-xl h-fit"><Globe size={20} /></div>
                      <div>
                        <h4 className="font-bold text-slate-800 mb-1">Weather Overview</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">{travelInfo.weather}</p>
                      </div>
                    </div>
                  )}
                  {travelInfo.transportation && (
                    <div className="flex gap-4">
                      <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl h-fit"><Navigation size={20} /></div>
                      <div>
                        <h4 className="font-bold text-slate-800 mb-1">Transportation</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">{travelInfo.transportation}</p>
                      </div>
                    </div>
                  )}
                  {travelInfo.localTips && (
                    <div className="flex gap-4">
                      <div className="bg-purple-50 text-purple-600 p-3 rounded-xl h-fit"><Info size={20} /></div>
                      <div>
                        <h4 className="font-bold text-slate-800 mb-1">Local Tips</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">{travelInfo.localTips}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Gallery */}
            {gallery.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-6">
                  <ImageIcon className="text-[#b45309]" size={24} />
                  <h2 className="text-2xl font-bold text-[#1E2A38]" style={{ fontFamily: "Georgia, serif" }}>Gallery</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {gallery.map((item, idx) => (
                    <div key={idx} className={`rounded-xl overflow-hidden relative group ${idx === 0 ? 'col-span-2 row-span-2 h-64' : 'h-32'}`}>
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      {item.title && (
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-8">
                          <p className="text-white font-medium text-sm drop-shadow">{item.title}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Attractions */}
            {attractions.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-6">
                  <MapIcon className="text-[#b45309]" size={24} />
                  <h2 className="text-2xl font-bold text-[#1E2A38]" style={{ fontFamily: "Georgia, serif" }}>Attractions & Things to Do</h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {attractions.map((attr, idx) => (
                    <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex gap-4">
                      {attr.image && (
                        <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden border border-slate-200">
                          <img src={attr.image} alt={attr.title} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div>
                        <h4 className="font-bold text-slate-800 mb-1">{attr.title}</h4>
                        <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed">{attr.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hotels in Destination (Manual List) */}
            {hotelsListConfig.isVisible !== false && hotelsListConfig.items?.length > 0 && (
              <div id="hotels" className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-[#1E2A38]" style={{ fontFamily: "Georgia, serif" }}>
                    {hotelsListConfig.sectionTitle || `Hotels in ${destination.name}`}
                  </h2>
                  {hotelsListConfig.totalBadge && (
                    <span className="text-sm font-semibold text-[#b45309] bg-orange-50 px-3 py-1 rounded-full">
                      {hotelsListConfig.totalBadge}
                    </span>
                  )}
                </div>
                
                <div className="space-y-4">
                  {hotelsListConfig.items.map((hotel, idx) => (
                    <div key={idx} className="flex flex-col gap-4 p-4 rounded-xl border border-slate-100 hover:border-slate-300 hover:shadow-md transition-all">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="w-full sm:w-48 h-32 rounded-lg overflow-hidden shrink-0">
                          {hotel.image ? (
                            <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400"><ImageIcon size={32}/></div>
                          )}
                        </div>
                        <div className="flex flex-col flex-1 py-1">
                          <div className="flex justify-between items-start">
                            <h3 className="text-lg font-bold text-slate-900">{hotel.name}</h3>
                            {hotel.rating && (
                              <div className="bg-[#1e3a5f] text-white px-2 py-1 rounded text-xs font-bold">
                                {hotel.rating}
                              </div>
                            )}
                          </div>
                          <p className="text-slate-500 text-sm mt-1 mb-3 line-clamp-2">{hotel.description}</p>
                          
                          <div className="mt-auto flex justify-between items-center">
                            <span className="text-sm font-semibold text-slate-600">
                              {hotel.category}
                            </span>
                            {hotel.buttonLink && (
                              <Link to={hotel.buttonLink} className="text-[#b45309] text-sm font-bold hover:underline">
                                {hotel.buttonText || "View Hotel"} →
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Dynamic Rooms Rendering */}
                      {hotel.rooms && hotel.rooms.length > 0 && (
                        <div className="mt-2 border-t border-slate-100 pt-4">
                          <h4 className="font-bold text-[#1E2A38] mb-4 text-sm uppercase tracking-wide">Available Accommodation</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[...hotel.rooms].sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)).map((room, rIdx) => (
                              <div key={rIdx} className="bg-slate-50 border border-slate-200 rounded-lg overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
                                {room.images && room.images.length > 0 && (
                                  <div className="w-full h-40 overflow-hidden relative">
                                    <img src={room.images[0]} alt={room.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    {room.breakfastIncluded && (
                                      <div className="absolute top-2 left-2 bg-white/90 backdrop-blur text-[#b45309] text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">
                                        Breakfast Included
                                      </div>
                                    )}
                                  </div>
                                )}
                                <div className="p-4 flex flex-col flex-1">
                                  <div className="flex justify-between items-start mb-2">
                                    <div>
                                      <h5 className="font-bold text-slate-800 leading-tight">{room.name}</h5>
                                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">{room.type} • {room.bedType} • Up to {room.maxGuests} Guests</p>
                                    </div>
                                    <div className="text-right shrink-0 ml-3">
                                      {room.discountPrice > 0 && room.discountPrice < room.pricePerNight ? (
                                        <div className="flex flex-col items-end">
                                          <span className="text-[10px] text-slate-400 line-through leading-none">${room.pricePerNight}</span>
                                          <span className="text-[#b45309] font-bold text-lg leading-tight">${room.discountPrice}</span>
                                        </div>
                                      ) : (
                                        <div className="text-[#b45309] font-bold text-lg leading-tight">${room.pricePerNight}</div>
                                      )}
                                      <p className="text-[9px] text-slate-500 uppercase tracking-wider">per night</p>
                                    </div>
                                  </div>
                                  
                                  <p className="text-xs text-slate-600 line-clamp-2 mb-3 leading-relaxed">{room.description}</p>
                                  
                                  <div className="flex flex-wrap gap-1.5 mb-4">
                                    {room.amenities?.slice(0, 3).map((amenity, aIdx) => (
                                      <span key={aIdx} className="text-[10px] bg-white border border-slate-200 px-2 py-1 rounded text-slate-600 font-medium">
                                        {amenity}
                                      </span>
                                    ))}
                                    {room.amenities?.length > 3 && (
                                      <span className="text-[10px] bg-slate-200 px-2 py-1 rounded text-slate-600 font-medium">+{room.amenities.length - 3}</span>
                                    )}
                                  </div>

                                  <div className="mt-auto flex justify-between items-center pt-3 border-t border-slate-200/60">
                                    <div className="flex items-center gap-1.5 text-[11px] font-bold">
                                      <div className={`w-1.5 h-1.5 rounded-full ${room.status === 'Available' ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
                                      <span className={room.status === 'Available' ? 'text-emerald-700' : 'text-rose-700'}>
                                        {room.status === 'Available' ? `${room.availableCount} Available` : 'Sold Out'}
                                      </span>
                                    </div>
                                    <Link to={room.bookButtonLink || "/booking"} className={`px-4 py-2 rounded-lg text-[11px] uppercase tracking-wide font-bold text-white transition-all ${room.status === 'Available' ? 'bg-[#1e3a5f] hover:bg-[#0f2942] hover:shadow-md' : 'bg-slate-300 pointer-events-none'}`}>
                                      {room.bookButtonText || "Book Now"}
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hotel Facilities (Specific to this destination) */}
            {facilitiesConfig.isVisible !== false && facilitiesConfig.items?.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8" style={{ background: facilitiesConfig.backgroundStyle || '#ffffff' }}>
                {facilitiesConfig.badgeText && (
                  <span className="inline-block px-3 py-1 bg-orange-50 text-[#b45309] text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                    {facilitiesConfig.badgeText}
                  </span>
                )}
                {facilitiesConfig.sectionTitle && (
                  <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a5f] mb-4" style={{ fontFamily: "Georgia, serif" }}>
                    {facilitiesConfig.sectionTitle}
                  </h2>
                )}
                {facilitiesConfig.sectionSubtitle && (
                  <p className="text-slate-600 mb-8 max-w-2xl">{facilitiesConfig.sectionSubtitle}</p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {facilitiesConfig.items
                    .filter(item => item.status === 'Active')
                    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
                    .map((facility, idx) => {
                      const alignment = facility.iconPosition || 'top-left';
                      let containerClass = '';
                      let iconAlignClass = '';

                      switch (alignment) {
                        case 'top-center':
                          containerClass = 'flex-col text-center items-center';
                          iconAlignClass = 'mx-auto mb-6';
                          break;
                        case 'left':
                          containerClass = 'flex-row items-start text-left gap-5';
                          iconAlignClass = 'shrink-0 mt-1 mb-2';
                          break;
                        case 'right':
                          containerClass = 'flex-row-reverse items-start text-right gap-5';
                          iconAlignClass = 'shrink-0 mt-1 mb-2';
                          break;
                        case 'top-left':
                        default:
                          containerClass = 'flex-col text-left';
                          iconAlignClass = 'mr-auto mb-6';
                          break;
                      }

                      const isRow = alignment === 'left' || alignment === 'right';
                      
                      return (
                        <div key={idx} className={`bg-white rounded-2xl p-6 border border-slate-100 hover:border-orange-200 transition-all hover:-translate-y-1 hover:shadow-lg group flex ${containerClass}`}>
                          <div 
                            className={`w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-110 ${iconAlignClass}`}
                            style={{ background: facility.gradient || 'linear-gradient(135deg, #b45309, #d97706)' }}
                          >
                            {renderIcon(facility.icon, { size: 28 })}
                          </div>
                          <div className={`flex flex-col ${isRow ? 'flex-1' : ''} h-full`}>
                            <h3 className="text-lg font-bold text-[#1e3a5f] mb-2">{facility.name}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed mb-1 flex-1">{facility.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
            
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#1e3a5f] rounded-2xl shadow-lg p-6 text-white sticky top-6">
              <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "Georgia, serif" }}>
                {ctaBox.title || "Ready to explore?"}
              </h3>
              <p className="text-white/80 text-sm mb-6 leading-relaxed">
                {ctaBox.description || `Book your stay in ${destination.name} and experience the trip of a lifetime with our premium curated hotels.`}
              </p>
              <Link to={ctaBox.buttonLink || "/search-results"} className="flex items-center justify-center gap-2 w-full py-3 bg-[#b45309] hover:bg-orange-700 text-white rounded-xl font-bold transition-colors">
                <Search size={16} /> {ctaBox.buttonText || "Search Availability"}
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
