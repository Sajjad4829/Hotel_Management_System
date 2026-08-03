import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { locationsData } from './locationsData';
import { MapPin, Phone, Navigation } from 'lucide-react';
import L from 'leaflet';

// Fix leaflet default icon issue in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    iconSize: [25, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Component to handle flying to the selected location
function MapUpdater({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 13, { animate: true, duration: 1.5 });
    }
  }, [center, map]);
  return null;
}

export default function LocationsPage() {
  const [activeLocation, setActiveLocation] = useState(locationsData[0]);

  return (
    <div className="h-[calc(100vh-57px)] lg:h-[calc(100vh-106px)] bg-slate-50 flex flex-col md:flex-row overflow-hidden">
      {/* Left Panel - List */}
      <div className="w-full md:w-1/3 lg:w-1/4 h-[50vh] md:h-full bg-white border-r border-slate-200 overflow-y-auto shadow-xl z-10 flex flex-col relative">
        <div className="p-6 border-b border-slate-100 sticky top-0 bg-white/95 backdrop-blur-sm z-20">
          <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: "Georgia, serif" }}>Our Locations</h1>
          <p className="text-sm text-slate-500 mt-1">Find an Aurum property near you</p>
        </div>
        
        <div className="flex-1 p-4 space-y-4">
          {locationsData.map((loc) => (
            <div 
              key={loc.id}
              onClick={() => setActiveLocation(loc)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                activeLocation.id === loc.id 
                  ? 'border-amber-500 bg-amber-50 shadow-md ring-1 ring-amber-500' 
                  : 'border-slate-200 hover:border-amber-300 hover:bg-slate-50'
              }`}
            >
              <h3 className="font-bold text-slate-800 text-lg">{loc.name}</h3>
              <p className="text-xs text-amber-700 font-semibold uppercase tracking-wider mb-2">{loc.city}</p>
              
              <div className="flex items-start gap-2 text-sm text-slate-600 mb-2">
                <MapPin size={16} className="shrink-0 mt-0.5 text-slate-400" />
                <span>{loc.address}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-slate-600 mb-4">
                <Phone size={16} className="shrink-0 text-slate-400" />
                <span>{loc.phone}</span>
              </div>

              <a 
                href={`https://www.google.com/maps/dir/?api=1&destination=${loc.coordinates[0]},${loc.coordinates[1]}`}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-amber-700 transition-colors"
              >
                <Navigation size={16} /> Get Directions
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Map */}
      <div className="w-full md:w-2/3 lg:w-3/4 h-[50vh] md:h-full relative z-0">
        <MapContainer 
          center={activeLocation.coordinates} 
          zoom={6} 
          style={{ height: '100%', width: '100%' }}
          zoomControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapUpdater center={activeLocation.coordinates} />
          
          {locationsData.map((loc) => (
            <Marker 
              key={loc.id} 
              position={loc.coordinates}
              eventHandlers={{
                click: () => setActiveLocation(loc),
              }}
            >
              <Popup>
                <div className="w-48 font-sans">
                  <img src={loc.image} alt={loc.name} className="w-full h-24 object-cover rounded-t-lg mb-2" />
                  <h3 className="font-bold text-slate-800 leading-tight text-sm mb-1">{loc.name}</h3>
                  <p className="text-[11px] text-slate-500 leading-tight mb-2">{loc.address}</p>
                  <a 
                    href={`https://www.google.com/maps/dir/?api=1&destination=${loc.coordinates[0]},${loc.coordinates[1]}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-700 text-[11px] font-bold uppercase tracking-wide block hover:underline"
                  >
                    Get Directions →
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
