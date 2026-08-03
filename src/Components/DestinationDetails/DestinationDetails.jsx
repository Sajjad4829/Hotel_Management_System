import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Search, Map as MapIcon, Calendar, Globe, Languages, Banknote, Navigation, Info, ArrowDown, ChevronRight } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { usePageContext } from "../../Context/PageContext";
import { usePropertyContext } from "../../Context/PropertyContext";

const renderIcon = (iconName, props) => {
  const Icon = LucideIcons[iconName] || LucideIcons.CheckCircle;
  return <Icon {...props} />;
};

/* ─── NOT FOUND FALLBACK ────────────────────────────────── */
const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-slate-50">
    <h2 className="text-[22px] font-bold text-slate-800 mb-2">Destination Not Found</h2>
    <p className="text-slate-500 mb-6 max-w-sm">We couldn't find a destination matching that ID or Slug.</p>
    <Link to="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors">
      <ArrowLeft size={14} /> Back to Home
    </Link>
  </div>
);

export default function DestinationDetails() {
  const { id } = useParams();
  const { pagesData } = usePageContext();
  const { destinations: contextDestinations } = usePropertyContext();

  const [scrolled, setScrolled] = useState(false);
  const rightPanelRef = useRef(null);

  const featuredDestinations = pagesData.home?.featuredCollection?.destinations || [];
  const allDestinations = [...featuredDestinations, ...(contextDestinations || [])];
  const destination = allDestinations.find((d) => d.slug === id || d.id === id);

  useEffect(() => {
    if (destination?.details?.seo) {
      document.title = destination.details.seo.metaTitle || `${destination.name} - Explore`;
    }
  }, [destination]);

  useEffect(() => {
    const handleScroll = () => {
      if (rightPanelRef.current) {
        setScrolled(rightPanelRef.current.scrollTop > 50);
      }
    };
    
    const panel = rightPanelRef.current;
    if (panel) {
      panel.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (panel) panel.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!destination) return <NotFound />;

  const details = destination.details || {};
  const ctaBox = details.ctaBox || {};
  const highlights = details.topHighlights?.items || [];
  
  // Prefer dashboard gallery if it exists and has valid items, otherwise fallback to page builder gallery
  const dashboardGallery = (destination.gallery || []).filter(img => img && img.trim() !== "");
  const pageBuilderGallery = (details.gallery?.items || []).map(g => g.image).filter(img => img && img.trim() !== "");
  const finalGallery = dashboardGallery.length > 0 ? dashboardGallery : pageBuilderGallery;
  
  const attractions = details.attractions?.items || [];
  
  // Quick facts: dashboard fields take precedence over page builder travel info
  const travelInfo = details.travelInfo || {};
  const qf = destination.quickFacts || {};
  
  const bestTime = qf.bestTime || travelInfo.bestTimeToVisit || "Year-round";
  const weather = qf.weather || travelInfo.weather || "Tropical Climate";
  const language = qf.language || travelInfo.language || "English";
  const currency = qf.currency || travelInfo.currency || "USD";

  return (
    <div className="h-screen w-full overflow-hidden bg-black flex flex-col md:flex-row font-sans">
      
      {/* LEFT PANEL - FIXED IMMERSIVE BACKGROUND */}
      <div className="relative h-[40vh] md:h-screen md:w-[45%] lg:w-1/2 flex-shrink-0 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={destination.image || details.hero?.bgImage} 
            alt={destination.name} 
            className="w-full h-full object-cover opacity-80 scale-105 animate-[slowZoom_30s_ease-in-out_infinite]"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full justify-between p-6 md:p-12 lg:p-16">
          <Link to="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors w-fit group">
            <div className="bg-white/10 p-2 rounded-full backdrop-blur-md group-hover:bg-white/20 transition-all">
              <ArrowLeft size={16} />
            </div>
            <span className="text-sm font-medium tracking-wide">Back to Explore</span>
          </Link>

          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-white/90 text-xs font-semibold tracking-[0.2em] uppercase mb-4 border border-white/20">
              <MapPin size={12} />
              Destination
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-4 tracking-tight leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>
              {destination.name}
            </h1>
            
            <p className="text-white/70 text-base md:text-lg max-w-md leading-relaxed font-light mb-8 line-clamp-3">
              {destination.description || details.hero?.description}
            </p>

            <Link 
              to={ctaBox.buttonLink || "/search-results"} 
              state={{ location: destination.name }}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold tracking-wide hover:bg-slate-200 transition-all group"
            >
              <span>{ctaBox.buttonText || "Search Availability"}</span>
              <div className="bg-black text-white p-1 rounded-full group-hover:translate-x-1 transition-transform">
                <ChevronRight size={16} />
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center gap-2 text-white/50 text-xs tracking-widest uppercase animate-pulse">
            <ArrowDown size={14} /> Scroll to explore
          </div>
        </div>
      </div>

      {/* RIGHT PANEL - SCROLLING GLASSMORPHISM CONTENT */}
      <div 
        ref={rightPanelRef}
        className="flex-1 h-[60vh] md:h-screen overflow-y-auto overflow-x-hidden relative scroll-smooth custom-scrollbar bg-slate-50"
      >
        <div className="min-h-full p-6 md:p-12 lg:p-16 space-y-12 md:space-y-24 max-w-4xl mx-auto">
          
          {/* About Section */}
          <section className="relative">
            <div className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase mb-4">01 // Overview</div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              The Vibe
            </h2>
            <p className="text-slate-600 text-lg md:text-xl leading-relaxed font-light">
              {details.hero?.description || destination.description}
            </p>
          </section>

          {/* Quick Facts Glass Grid */}
          <section>
            <div className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase mb-4">02 // Essential Info</div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col gap-3 hover:-translate-y-1 transition-transform">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                  <Calendar size={18} />
                </div>
                <div>
                  <span className="block text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-1">Best Time</span>
                  <span className="block text-slate-900 font-semibold">{bestTime}</span>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col gap-3 hover:-translate-y-1 transition-transform">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                  <Globe size={18} />
                </div>
                <div>
                  <span className="block text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-1">Weather</span>
                  <span className="block text-slate-900 font-semibold">{weather}</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col gap-3 hover:-translate-y-1 transition-transform">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                  <Languages size={18} />
                </div>
                <div>
                  <span className="block text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-1">Language</span>
                  <span className="block text-slate-900 font-semibold">{language}</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col gap-3 hover:-translate-y-1 transition-transform">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                  <Banknote size={18} />
                </div>
                <div>
                  <span className="block text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-1">Currency</span>
                  <span className="block text-slate-900 font-semibold">{currency}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Dynamic Gallery */}
          {finalGallery.length > 0 && (
            <section>
              <div className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase mb-4">03 // Gallery</div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                {finalGallery.map((img, idx) => (
                  <div key={idx} className={`rounded-3xl overflow-hidden relative group cursor-pointer ${idx === 0 ? 'col-span-2 row-span-2 h-[250px] md:h-[400px]' : 'h-[120px] md:h-[192px]'}`}>
                    <img src={img} alt="Gallery" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Top Highlights */}
          {highlights.length > 0 && (
            <section>
              <div className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase mb-4">04 // Highlights</div>
              <div className="flex flex-wrap gap-3">
                {highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-3 px-5 py-3 rounded-full bg-white shadow-sm border border-slate-100 hover:border-slate-300 transition-colors">
                    <span className="text-slate-800">{renderIcon(highlight.icon, { size: 16 })}</span>
                    <span className="text-slate-700 text-sm font-semibold">{highlight.name}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Footer Padding */}
          <div className="h-20"></div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slowZoom {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.1); 
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0,0,0,0.2); 
        }
      `}} />
    </div>
  );
}
