import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import { Viewer } from "@photo-sphere-viewer/core";
import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";
import "@photo-sphere-viewer/core/index.css";
import "@photo-sphere-viewer/markers-plugin/index.css";
import LoadingSkeleton from "./LoadingSkeleton";
import { renderHotspotMarkerHTML, HOTSPOT_MARKER_CSS } from "./Hotspot";

const DEFAULT_ZOOM = 50;

/**
 * VirtualViewer
 * Thin React wrapper around Photo Sphere Viewer. Owns the actual
 * <Viewer> instance and exposes imperative controls (zoom/reset/
 * fullscreen) to the parent via ref, since those are viewer-instance
 * methods rather than React props.
 */
const VirtualViewer = forwardRef(function VirtualViewer(
  { panoramaImage, hotspots = [], onHotspotClick, onFullscreenChange },
  ref
) {
  const containerRef = useRef(null);
  const viewerRef = useRef(null);
  const markersPluginRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize the viewer once on mount.
  useEffect(() => {
    if (!containerRef.current) return;

    // Inject hotspot marker styles once (markers render outside React's tree).
    if (!document.getElementById("psv-hotspot-style")) {
      const style = document.createElement("style");
      style.id = "psv-hotspot-style";
      style.textContent = HOTSPOT_MARKER_CSS;
      document.head.appendChild(style);
    }
    console.log("Panorama:", panoramaImage);

    const viewer = new Viewer({
      container: containerRef.current,
      panorama: panoramaImage,
      defaultZoomLvl: DEFAULT_ZOOM,
      navbar: false, // we render our own luxury TourControls instead
      loadingImg: undefined,
      touchmoveTwoFingers: false,
      mousewheelCtrlKey: false,
      plugins: [MarkersPlugin],
    });

    viewerRef.current = viewer;
    markersPluginRef.current = viewer.getPlugin(MarkersPlugin);

    viewer.addEventListener("ready", () => setIsLoading(false));
    viewer.addEventListener("panorama-loaded", () => setIsLoading(false));

    markersPluginRef.current.addEventListener("select-marker", ({ marker }) => {
      const hotspot = hotspots.find((h) => h.id === marker.id);
      if (hotspot) onHotspotClick?.(hotspot);
    });

    return () => {
      viewer.destroy();
      viewerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Swap panorama + hotspots whenever the selected room changes.
  useEffect(() => {
    const viewer = viewerRef.current;
    const markersPlugin = markersPluginRef.current;
    if (!viewer || !markersPlugin || !panoramaImage) return;

    setIsLoading(true);
    viewer
      .setPanorama(panoramaImage, { transition: true, showLoader: false })
      .then(() => {
        setIsLoading(false);
        markersPlugin.setMarkers(
          hotspots.map((h) => ({
            id: h.id,
            position: { longitude: `${h.longitude}deg`, latitude: `${h.latitude}deg` },
            html: renderHotspotMarkerHTML(h),
            anchor: "center center",
            tooltip: h.label,
          }))
        );
      })
      .catch(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [panoramaImage]);

  useImperativeHandle(ref, () => ({
    zoomIn: () => viewerRef.current?.zoomIn(10),
    zoomOut: () => viewerRef.current?.zoomOut(10),
    reset: () =>
      viewerRef.current?.animate({
        yaw: 0,
        pitch: 0,
        zoom: DEFAULT_ZOOM,
        speed: "8rpm",
      }),
    toggleFullscreen: () => {
      const viewer = viewerRef.current;
      if (!viewer) return;
      viewer.toggleFullscreen();
    },
  }));

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    const handler = () => onFullscreenChange?.(viewer.isFullscreenEnabled());
    viewer.addEventListener("fullscreen", handler);
    return () => viewer.removeEventListener("fullscreen", handler)
  }, [onFullscreenChange]);

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#0d1b2a]">
      <div ref={containerRef} className="absolute inset-0" />
      {isLoading && <LoadingSkeleton />}
    </div>
  );
});

export default VirtualViewer;