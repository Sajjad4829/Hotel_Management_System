import React, { useState, useRef, useMemo, useEffect } from "react";
import RoomSelector from "./RoomSelector";
import TourControls from "./TourControls";
import InfoCard from "./InfoCard";

import VirtualViewer from "./Virtualviewer";
import { getRoomsByHotelId, roomVirtualTourData } from "./roomVirtualTourData";


export default function RoomVirtualTour({ hotelId, rooms }) {
 
  const resolvedRooms = rooms ?? (hotelId ? getRoomsByHotelId(hotelId) : roomVirtualTourData);

 console.log("Hotel ID:", hotelId);
console.log("Rooms:", resolvedRooms);


  const [activeRoomId, setActiveRoomId] = useState(resolvedRooms?.[0]?.id ?? null);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(true);
  const viewerRef = useRef(null);

  // If `hotelId`/`rooms` changes (e.g. navigating to a different hotel
  // while this component stays mounted), fall back to that hotel's first
  // room whenever the currently active room id no longer belongs to it.
  useEffect(() => {
    if (!resolvedRooms?.some((r) => r.id === activeRoomId)) {
      setActiveRoomId(resolvedRooms?.[0]?.id ?? null);
      setActiveHotspot(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedRooms]);

  const activeRoom = useMemo(
    () => resolvedRooms?.find((r) => r.id === activeRoomId) ?? null,
    [resolvedRooms, activeRoomId]
  );

  const hasTour = Boolean(activeRoom?.panoramaImage);

  const handleSelectRoom = (id) => {
    setActiveRoomId(id);
    setActiveHotspot(null);
  };

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-10 bg-gradient-to-b from-white to-[#f7f9fb]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center sm:text-left animate-[fadeIn_0.5s_ease-out]">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#C9A24B] font-semibold mb-2">
            Immersive Experience
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2C4A6E]">
            360° Virtual Room Tour
          </h2>
          <p className="text-[#2C4A6E]/60 mt-2">Experience the room before booking.</p>
        </div>

        <RoomSelector rooms={resolvedRooms} activeId={activeRoomId} onSelect={handleSelectRoom} />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
          {/* Viewer */}
          <div className="relative h-[420px] sm:h-[520px] rounded-2xl shadow-[0_25px_60px_rgba(28,51,80,0.25)] border border-white/60 overflow-hidden animate-[scaleIn_0.4s_ease-out]">
            {hasTour && isViewerOpen ? (
              <>
                <VirtualViewer
                  key={activeRoom.id}
                  ref={viewerRef}
                  panoramaImage={activeRoom.panoramaImage}
                  hotspots={activeRoom.hotspots}
                  onHotspotClick={setActiveHotspot}
                  onFullscreenChange={setIsFullscreen}
                />

                <TourControls
                  isFullscreen={isFullscreen}
                  onZoomIn={() => viewerRef.current?.zoomIn()}
                  onZoomOut={() => viewerRef.current?.zoomOut()}
                  onReset={() => {
                    viewerRef.current?.reset();
                    setActiveHotspot(null);
                  }}
                  onFullscreen={() => viewerRef.current?.toggleFullscreen()}
                  onClose={() => setIsViewerOpen(false)}
                />

                {/* Clicked hotspot detail card */}
                {activeHotspot && (
                  <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs z-20 bg-white/90 backdrop-blur-lg border border-white/70 rounded-2xl shadow-xl p-4 flex items-start gap-3 animate-[slideUp_0.3s_ease-out]">
                    <span className="text-2xl">{activeHotspot.icon}</span>
                    <div className="min-w-0">
                      <p className="font-semibold text-[#2C4A6E] text-sm">{activeHotspot.label}</p>
                      <p className="text-xs text-[#2C4A6E]/60 mt-0.5">{activeHotspot.description}</p>
                    </div>
                    <button
                      onClick={() => setActiveHotspot(null)}
                      className="ml-auto text-[#2C4A6E]/40 hover:text-[#2C4A6E] shrink-0"
                      aria-label="Dismiss"
                    >
                      ✕
                    </button>
                  </div>
                )}

                <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md border border-white/60 rounded-full px-3 py-1.5 text-xs font-semibold text-[#2C4A6E] shadow-sm z-20">
                  360° · Drag to explore
                </div>
              </>
            ) : (
              <EmptyState onReopen={hasTour ? () => setIsViewerOpen(true) : undefined} />
            )}
          </div>

          {/* Info Card */}
          <InfoCard room={activeRoom} />
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </section>
  );
}

function EmptyState({ onReopen }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#f0f3f7] to-[#e6ebf1] text-center px-6">
      <div className="w-20 h-20 rounded-full bg-white/70 border border-[#2C4A6E]/10 flex items-center justify-center shadow-inner">
        <svg viewBox="0 0 24 24" className="w-9 h-9 text-[#2C4A6E]/30" fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
          <path d="M3 12h18M12 3c2.5 2.5 4 5.5 4 9s-1.5 6.5-4 9c-2.5-2.5-4-5.5-4-9s1.5-6.5 4-9z" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
      <div>
        <p className="text-[#2C4A6E] font-semibold">No 360° Tour Available</p>
        <p className="text-[#2C4A6E]/50 text-sm mt-1 max-w-xs">
          This room doesn't have an immersive tour yet — check back soon.
        </p>
      </div>
      {onReopen && (
        <button
          onClick={onReopen}
          className="mt-1 text-xs font-semibold text-[#C9A24B] hover:text-[#2C4A6E] underline underline-offset-2"
        >
          Reopen viewer
        </button>
      )}
    </div>
  );
}