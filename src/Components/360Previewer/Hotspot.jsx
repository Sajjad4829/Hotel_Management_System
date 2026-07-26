import React from "react";

/**
 * Hotspot
 * Standalone visual reference for a single 360° hotspot pin + tooltip.
 * Not rendered directly inside the panorama (Photo Sphere Viewer's
 * MarkersPlugin renders DOM markers from an HTML string — see
 * `renderHotspotMarkerHTML` below, which mirrors this exact markup/style
 * so the two stay visually identical).
 */
export default function Hotspot({ hotspot, active, onClick }) {
  return (
    <div className="relative inline-flex flex-col items-center">
      <button
        onClick={onClick}
        aria-label={hotspot.label}
        className="w-9 h-9 rounded-full bg-white/90 border-2 border-[#C9A24B] text-base
          flex items-center justify-center shadow-[0_4px_14px_rgba(0,0,0,0.25)]
          hover:scale-110 transition-transform duration-200 animate-pulse"
      >
        <span>{hotspot.icon}</span>
      </button>

      {active && (
        <div className="absolute bottom-11 w-max max-w-[180px] bg-white/95 backdrop-blur-md border border-[#2C4A6E]/10 rounded-xl shadow-xl px-3 py-2 text-left animate-[fadeIn_0.2s_ease-out]">
          <p className="text-xs font-semibold text-[#2C4A6E]">{hotspot.label}</p>
          {hotspot.description && (
            <p className="text-[11px] text-[#2C4A6E]/60 mt-0.5">{hotspot.description}</p>
          )}
          <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white/95 rotate-45 border-r border-b border-[#2C4A6E]/10" />
        </div>
      )}
    </div>
  );
}

/**
 * renderHotspotMarkerHTML
 * Returns an HTML string used as a Photo Sphere Viewer marker's `html`
 * option, since MarkersPlugin renders markers as plain DOM, not React.
 * Styling intentionally mirrors the <Hotspot /> component above.
 */
export function renderHotspotMarkerHTML(hotspot) {
  return `
    <div class="psv-hotspot-pin" data-hotspot-id="${hotspot.id}">
      <span>${hotspot.icon}</span>
    </div>
  `;
}

/**
 * Inject once (e.g. in VirtualViewer) so marker HTML above has real styles,
 * since PSV markers live outside React's render tree.
 */
export const HOTSPOT_MARKER_CSS = `
  .psv-hotspot-pin {
    width: 36px;
    height: 36px;
    border-radius: 9999px;
    background: rgba(255,255,255,0.92);
    border: 2px solid #C9A24B;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    box-shadow: 0 4px 14px rgba(0,0,0,0.28);
    cursor: pointer;
    transition: transform 0.2s ease;
    animation: psv-pulse 2.2s infinite;
  }
  .psv-hotspot-pin:hover {
    transform: scale(1.15);
  }
  @keyframes psv-pulse {
    0%, 100% { box-shadow: 0 4px 14px rgba(0,0,0,0.28), 0 0 0 0 rgba(201,162,75,0.5); }
    50% { box-shadow: 0 4px 14px rgba(0,0,0,0.28), 0 0 0 8px rgba(201,162,75,0); }
  }
`;