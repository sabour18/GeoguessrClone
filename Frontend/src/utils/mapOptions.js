import MouseCrosshair from "@/assets/crosshair.png";

export const guessOptions = {
  center: { lat: 0, lng: 0 },
  zoom: 1,
  disableDefaultUI: true,
  clickableIcons: false,
  zoomControl: true,
  draggableCursor: MouseCrosshair,
  draggingCursor: MouseCrosshair,
};

export const roundResultOptions = {
  center: { lat: 0, lng: 0 },
  zoom: 2,
  disableDefaultUI: true,
  mapId: "DEMO_MAP_ID"
};

export const streetViewOptions = {
  pov: { heading: 165, pitch: 0 },
  addressControl: false,
  fullscreenControl: false,
  scaleControl: false,
  showRoadLabels: false
};
