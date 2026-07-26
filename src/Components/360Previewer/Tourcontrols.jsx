import React from "react";

const ControlButton = ({ onClick, label, children }) => (
  <button
    onClick={onClick}
    aria-label={label}
    title={label}
    className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-white/60
      flex items-center justify-center text-[#2C4A6E] shadow-md
      hover:bg-[#2C4A6E] hover:text-[#F5D68A] hover:scale-110
      transition-all duration-200"
  >
    {children}
  </button>
);

export default function TourControls({ onZoomIn, onZoomOut, onReset, onFullscreen, onClose, isFullscreen }) {
  return (
    <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
      <ControlButton onClick={onZoomIn} label="Zoom in">
        <svg viewBox="0 0 24 24" className="w-4.5 h-4.5" fill="none">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
          <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </ControlButton>

      <ControlButton onClick={onZoomOut} label="Zoom out">
        <svg viewBox="0 0 24 24" className="w-4.5 h-4.5" fill="none">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
          <path d="M21 21l-4.3-4.3M8 11h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </ControlButton>

      <ControlButton onClick={onReset} label="Reset view">
        <svg viewBox="0 0 24 24" className="w-4.5 h-4.5" fill="none">
          <path d="M4 4v6h6M20 20v-6h-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4.5 15a8 8 0 1013.9-6.5M19.5 9a8 8 0 00-13.9 6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </ControlButton>

      <ControlButton onClick={onFullscreen} label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}>
        <svg viewBox="0 0 24 24" className="w-4.5 h-4.5" fill="none">
          <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </ControlButton>

      <ControlButton onClick={onClose} label="Close tour">
        <svg viewBox="0 0 24 24" className="w-4.5 h-4.5" fill="none">
          <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </ControlButton>
    </div>
  );
}