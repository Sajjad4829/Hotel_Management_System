import React, { useState } from 'react';
import { X } from 'lucide-react';

const galleryData = [
  { id: 1, src: "https://images.unsplash.com/photo-1542314831-c6a4d27ce66f?auto=format&fit=crop&w=1200&q=80", title: "Luxury Suite", category: "Rooms" },
  { id: 2, src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80", title: "Tranquil Spa", category: "Wellness" },
  { id: 3, src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80", title: "Eco Resort Exterior", category: "Exterior" },
  { id: 4, src: "https://images.unsplash.com/photo-1551882547-ff40eb591366?auto=format&fit=crop&w=1200&q=80", title: "Fine Dining", category: "Dining" },
  { id: 5, src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80", title: "Lounge Area", category: "Interior" },
  { id: 6, src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80", title: "Infinity Pool", category: "Facilities" },
  { id: 7, src: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=80", title: "Grand Lobby", category: "Interior" },
  { id: 8, src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80", title: "Presidential Bedroom", category: "Rooms" },
  { id: 9, src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80", title: "Fitness Center", category: "Wellness" },
  { id: 10, src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80", title: "Rooftop Restaurant", category: "Dining" }
];

export default function Gallery() {
  const [activeImage, setActiveImage] = useState(null);

  return (
    <div className="pt-24 lg:pt-32 pb-20 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-3 mb-4 justify-center">
            <span className="h-px w-8 bg-amber-700" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-700">
              Visual Journey
            </span>
            <span className="h-px w-8 bg-amber-700" />
          </div>
          <h1 className="text-4xl md:text-5xl font-light text-slate-900 mb-4" style={{ fontFamily: "Georgia, serif" }}>
            The <span className="italic text-slate-700">Aurum</span> Experience
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto">
            Immerse yourself in the world of Aurum Hotels & Resorts. From award-winning dining to tranquil spas, every detail is designed for perfection.
          </p>
        </div>

        {/* CSS Columns Masonry Layout */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryData.map((item, index) => (
            <div 
              key={item.id} 
              className="relative group overflow-hidden rounded-2xl cursor-pointer break-inside-avoid shadow-sm hover:shadow-xl transition-all duration-500"
              onClick={() => setActiveImage(item)}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <img 
                src={item.src} 
                alt={item.title} 
                className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <span className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {item.category}
                </span>
                <h3 className="text-white text-xl font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75" style={{ fontFamily: "Georgia, serif" }}>
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeImage && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/95 backdrop-blur-sm p-4 animate-fade-in"
            onClick={() => setActiveImage(null)}
          >
            <button 
              className="absolute top-6 right-6 lg:top-10 lg:right-10 text-white/50 hover:text-white transition-colors"
              onClick={() => setActiveImage(null)}
            >
              <X size={32} />
            </button>
            <img 
              src={activeImage.src} 
              alt={activeImage.title} 
              className="max-w-full max-h-[85vh] rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()} 
            />
            <div className="absolute bottom-6 lg:bottom-10 text-center w-full pointer-events-none">
              <h3 className="text-white text-2xl font-medium" style={{ fontFamily: "Georgia, serif" }}>
                {activeImage.title}
              </h3>
              <p className="text-amber-500/80 uppercase tracking-widest text-xs mt-2 font-semibold">
                {activeImage.category}
              </p>
            </div>
          </div>
        )}

      </div>
      
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
}
