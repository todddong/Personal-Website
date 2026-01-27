"use client";

import { useEffect, useState, createContext, useContext, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline, GeoJSON, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import CloudImage from "./CloudImage";
import { X } from "lucide-react";
import { localPathToSupabasePath } from "@/lib/imageUtils";

// Context for photo click handler
const PhotoClickContext = createContext<((photoSrc: string, lat: number, lng: number) => void) | null>(null);

// Fix for default marker icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Custom marker icon - modern red map pin
const createCustomIcon = () => {
  return L.divIcon({
    className: "custom-marker",
    html: `<svg class="marker-pin" width="20" height="28" viewBox="0 0 20 28" xmlns="http://www.w3.org/2000/svg" style="cursor: pointer; transition: all 0.3s ease;">
      <path d="M10 0C5.86 0 2.5 3.36 2.5 7.5c0 5.62 7.5 18.5 7.5 18.5s7.5-12.88 7.5-18.5C17.5 3.36 14.14 0 10 0z" fill="#ef4444" stroke="#ffffff" stroke-width="1.5"/>
      <circle cx="10" cy="7.5" r="2.5" fill="#ffffff"/>
    </svg>`,
    iconSize: [20, 28],
    iconAnchor: [10, 28],
    popupAnchor: [0, -28],
  });
};

// Function to create arc path between two points (great circle approximation)
const createArcPath = (start: [number, number], end: [number, number], numPoints: number = 50): [number, number][] => {
  const points: [number, number][] = [];
  
  // Calculate midpoint with offset for arc
  const midLat = (start[0] + end[0]) / 2;
  const midLng = (start[1] + end[1]) / 2;
  
  // Calculate distance
  const latDiff = end[0] - start[0];
  const lngDiff = end[1] - start[1];
  const distance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
  
  // Arc height (adjust for curvature)
  const arcHeight = distance * 0.3;
  
  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints;
    const lat = start[0] + (end[0] - start[0]) * t;
    const lng = start[1] + (end[1] - start[1]) * t;
    
    // Add arc curvature
    const arcOffset = Math.sin(t * Math.PI) * arcHeight;
    const latOffset = arcOffset * Math.cos(Math.atan2(lngDiff, latDiff));
    const lngOffset = arcOffset * Math.sin(Math.atan2(lngDiff, latDiff));
    
    points.push([lat + latOffset, lng + lngOffset]);
  }
  
  return points;
};

// Calculate distance in miles between two coordinates using Haversine formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3959; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const NASHVILLE_COORDS = { lat: 36.1627, lng: -86.7816 };

const locations = [
  {
    id: 1,
    name: "Pittsburgh, PA",
    lat: 40.4406,
    lng: -79.9959,
    visitCount: 10, // Most visited - CMU + multiple photos
    activities: [
      {
        title: "Carnegie Mellon University",
        period: "2024 - Present",
        logo: "/media/logos/cmu.jpg",
      },
      {
        title: "CMU Varsity Swim Team",
        period: "2024 - Present",
        logo: "/media/logos/cmu.jpg",
      },
      {
        title: "Carnegie Mellon Human Computer Interaction Institute",
        period: "Aug 2025 - Present",
        logo: "/media/logos/cmu.jpg",
      },
    ],
    photos: [
      { src: "/media/swim-1.jpg", alt: "Swim Photo 1" },
      { src: "/media/swim-2.jpg", alt: "Swim Photo 2" },
      { src: "/media/swim-3.jpg", alt: "Swim Photo 3" },
      { src: "/media/general/sushi.jpg", alt: "Sushi" },
      { src: "/media/general/photo-5.jpg", alt: "Photo 5" },
    ],
  },
  {
    id: 2,
    name: "Anchorage, AK",
    lat: 61.1894,
    lng: -149.8264,
    visitCount: 1,
    activities: [
      {
        title: "University of Alaska Anchorage AI Lab",
        period: "Jun 2025 - Aug 2025",
        logo: "/media/logos/uaa.png",
      },
    ],
  },
  {
    id: 10,
    name: "Flat Top Mountain, AK",
    lat: 61.1278,
    lng: -149.6731,
    visitCount: 1,
    activities: [],
    photos: [
      { src: "/media/general/photo-3.jpg", alt: "Flat Top Mountain" },
    ],
  },
  {
    id: 3,
    name: "Raleigh, NC",
    lat: 35.7796,
    lng: -78.6382,
    visitCount: 1,
    activities: [
      {
        title: "First Citizens Bank",
        period: "2026",
        logo: "/media/logos/first-citizens.jpg",
      },
    ],
  },
  {
    id: 4,
    name: "Ocoee River, Chattanooga, TN",
    lat: 35.1,
    lng: -84.5,
    visitCount: 1,
    activities: [],
    photos: [
      { src: "/media/general/photo-2.jpg", alt: "Ocoee River" },
    ],
  },
  {
    id: 5,
    name: "Lake Lanier, GA",
    lat: 34.2,
    lng: -83.9,
    visitCount: 1,
    activities: [],
    photos: [
      { src: "/media/general/photo-4.jpg", alt: "Lake Lanier" },
    ],
  },
  {
    id: 6,
    name: "Downtown Pittsburgh, PA",
    lat: 40.44,
    lng: -80.0,
    visitCount: 1,
    activities: [],
    photos: [
      { src: "/media/general/photo-6.jpg", alt: "Downtown Pittsburgh" },
    ],
  },
  {
    id: 7,
    name: "Nashville, TN",
    lat: 36.1627,
    lng: -86.7816,
    visitCount: 3,
    activities: [
      {
        title: "Hometown",
        period: "Childhood",
        logo: null,
      },
    ],
    photos: [
      { src: "/media/alaska/nashville.jpg", alt: "Nashville, TN" },
    ],
  },
  {
    id: 8,
    name: "Cleveland, OH",
    lat: 41.4993,
    lng: -81.6944,
    visitCount: 1,
    activities: [
      {
        title: "Birthplace",
        period: "Born",
        logo: null,
      },
    ],
    photos: [
      { src: "/media/alaska/cleveland.jpg", alt: "Cleveland" },
    ],
  },
  {
    id: 9,
    name: "Schenley Park, Pittsburgh, PA",
    lat: 40.4378,
    lng: -79.9486,
    visitCount: 1,
    activities: [],
    photos: [
      { src: "/media/cmu-about.jpg", alt: "Schenley Park Sunset" },
    ],
  },
  {
    id: 11,
    name: "Girdwood, AK",
    lat: 60.9428,
    lng: -149.1664,
    visitCount: 1,
    activities: [],
    photos: [
      { src: "/media/alaska/alaska-3.jpg", alt: "Girdwood, Alaska" },
    ],
  },
  {
    id: 12,
    name: "Port of Anchorage, AK",
    lat: 61.2233,
    lng: -149.9000,
    visitCount: 1,
    activities: [],
    photos: [
      { src: "/media/alaska/alaska-11.jpg", alt: "Port of Anchorage" },
    ],
  },
  {
    id: 14,
    name: "Universal Studios, Orlando, FL",
    lat: 28.4744,
    lng: -81.4682,
    visitCount: 1,
    activities: [],
    photos: [
      { src: "/media/alaska/universal florida.jpg", alt: "Universal Studios, Orlando" },
    ],
  },
  {
    id: 15,
    name: "Emory University, Atlanta, GA",
    lat: 33.7915,
    lng: -84.3233,
    visitCount: 1,
    activities: [],
    photos: [
      { src: "/media/swim-team-podium.jpg", alt: "Swim Team Podium at Emory University" },
    ],
  },
  {
    id: 16,
    name: "Bahamas",
    lat: 25.0343,
    lng: -77.3963,
    visitCount: 1,
    activities: [],
    photos: [
      { src: "/media/general/bahamas.jpg", alt: "Bahamas" },
    ],
  },
  {
    id: 17,
    name: "South Beach, Miami, FL",
    lat: 25.7907,
    lng: -80.1300,
    visitCount: 1,
    activities: [],
    photos: [
      { src: "/media/alaska/south beach.jpg", alt: "South Beach, Miami" },
    ],
  },
  {
    id: 18,
    name: "Stone Mountain, GA",
    lat: 33.8082,
    lng: -84.1444,
    visitCount: 1,
    activities: [],
    photos: [
      { src: "/media/general/stone mountain.jpg", alt: "Stone Mountain, Georgia" },
    ],
  },
  {
    id: 19,
    name: "Yosemite National Park, CA",
    lat: 37.8651,
    lng: -119.5383,
    visitCount: 1,
    activities: [],
    photos: [
      { src: "/media/general/yosemite.jpg", alt: "Yosemite National Park" },
    ],
  },
  {
    id: 20,
    name: "Lake Tahoe, CA/NV",
    lat: 39.0968,
    lng: -120.0324,
    visitCount: 1,
    activities: [],
    photos: [
      { src: "/media/general/lake tahoe.jpg", alt: "Lake Tahoe" },
    ],
  },
  {
    id: 21,
    name: "Golden Gate Bridge, San Francisco, CA",
    lat: 37.8199,
    lng: -122.4783,
    visitCount: 1,
    activities: [],
    photos: [
      { src: "/media/alaska/golden gate.jpg", alt: "Golden Gate Bridge" },
    ],
  },
  {
    id: 22,
    name: "Santa Monica Pier, CA",
    lat: 34.0089,
    lng: -118.4973,
    visitCount: 1,
    activities: [],
    photos: [
      { src: "/media/alaska/santa monica.jpg", alt: "Santa Monica Pier" },
    ],
  },
  {
    id: 23,
    name: "Shanghai, China",
    lat: 31.2304,
    lng: 121.4737,
    visitCount: 1,
    activities: [],
    photos: [
      { src: "/media/alaska/shanghai.jpg", alt: "Shanghai, China" },
    ],
  },
  {
    id: 24,
    name: "Lincoln Road, Miami Beach, FL",
    lat: 25.7907,
    lng: -80.1300,
    visitCount: 1,
    activities: [],
    photos: [
      { src: "/media/alaska/lincoln road.jpg", alt: "Lincoln Road, Miami Beach" },
    ],
  },
];

// Find Cleveland and Nashville locations
const cleveland = locations.find(loc => loc.name === "Cleveland, OH");
const nashville = locations.find(loc => loc.name === "Nashville, TN");

// Create edges: Cleveland to Nashville, then Nashville to all other points
const edgePaths: [number, number][][] = [];

if (cleveland && nashville) {
  // Edge from Cleveland to Nashville
  edgePaths.push(createArcPath([cleveland.lat, cleveland.lng], [nashville.lat, nashville.lng]));
  
  // Edges from Nashville to all other locations (except Cleveland)
  locations.forEach(loc => {
    if (loc.id !== cleveland.id && loc.id !== nashville.id) {
      edgePaths.push(createArcPath([nashville.lat, nashville.lng], [loc.lat, loc.lng]));
    }
  });
}

// Create sub-locations for places with multiple items (for zoomed-in view)
const subLocations = [
  // CMU sub-locations
  { parentId: 1, name: "Carnegie Mellon University", lat: 40.4426, lng: -79.9456, type: 'activity' as const, data: locations[0].activities[0] },
  { parentId: 1, name: "CMU Varsity Swim Team", lat: 40.4416, lng: -79.9456, type: 'activity' as const, data: locations[0].activities[1] },
  { parentId: 1, name: "CMU HCII", lat: 40.4436, lng: -79.9446, type: 'activity' as const, data: locations[0].activities[2] },
  // Downtown Pittsburgh sub-location
  { parentId: 6, name: "Downtown Pittsburgh", lat: 40.44, lng: -80.0, type: 'photo' as const, data: locations.find(loc => loc.id === 6)?.photos?.[0] },
].filter((subLoc): subLoc is { parentId: number; name: string; lat: number; lng: number; type: 'activity' | 'photo'; data: any } => !!subLoc.data);

// Heat map data - region-based (city-level circles)
const heatMapData = [
  // Pittsburgh region (combines CMU and Downtown)
  { lat: 40.4406, lng: -79.9959, radius: 80000, opacity: 0.15, intensity: 11 },
  // Nashville region
  { lat: 36.1627, lng: -86.7816, radius: 50000, opacity: 0.12, intensity: 3 },
  // Other single locations
  { lat: 35.7796, lng: -78.6382, radius: 30000, opacity: 0.08, intensity: 1 }, // Raleigh
  { lat: 35.1, lng: -84.5, radius: 30000, opacity: 0.08, intensity: 1 }, // Ocoee River
  { lat: 34.2, lng: -83.9, radius: 30000, opacity: 0.08, intensity: 1 }, // Lake Lanier
  { lat: 41.4993, lng: -81.6944, radius: 30000, opacity: 0.08, intensity: 1 }, // Cleveland
];

// Component to set map view - center on continental US
function MapView() {
  const map = useMap();
  
  useEffect(() => {
    // Center on continental US with standard zoom
    map.setView([39.8283, -98.5795], 4.5);
    // Make zoom less sensitive by adjusting wheel zoom delta
    // Higher value = less sensitive (requires more scrolling to zoom)
    (map as any).options.wheelPxPerZoomLevel = 300;
  }, [map]);
  
  return null;
}

// Component to set map ref for accessing map instance
function MapRefSetter({ mapRef }: { mapRef: React.MutableRefObject<L.Map | null> }) {
  const map = useMap();
  
  useEffect(() => {
    mapRef.current = map;
  }, [map, mapRef]);
  
  return null;
}

// Component to recenter the map
function RecenterButton() {
  const map = useMap();
  const ORIGINAL_CENTER: [number, number] = [39.8283, -98.5795];
  const ORIGINAL_ZOOM = 4.5;

  const handleRecenter = () => {
    map.setView(ORIGINAL_CENTER, ORIGINAL_ZOOM, {
      animate: true,
      duration: 0.5,
    });
  };

  return (
    <button
      onClick={handleRecenter}
      className="absolute top-4 right-4 z-[1000] bg-white hover:bg-gray-50 text-gray-700 px-3 py-2 rounded-md shadow-md border border-gray-200 text-sm font-medium transition-all hover:shadow-lg"
      title="Recenter map"
    >
      Recenter
    </button>
  );
}

// Component for photo funnel overlay - must be inside MapContainer
function PhotoFunnelOverlayInner({ 
  photo, 
  markerPosition, 
  onClose 
}: { 
  photo: string | null; 
  markerPosition: { lat: number; lng: number; name?: string } | null;
  onClose: () => void;
}) {
  const map = useMap();
  const [photoPosition, setPhotoPosition] = useState<{ x: number; y: number } | null>(null);
  const [markerPixelPosition, setMarkerPixelPosition] = useState<{ x: number; y: number } | null>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (!photo || !markerPosition) return;
    setImageError(false); // Reset error state when photo changes

    const updatePosition = () => {
      // Get marker position in pixels
      const markerPoint = map.latLngToContainerPoint([markerPosition.lat, markerPosition.lng]);
      setMarkerPixelPosition({ x: markerPoint.x, y: markerPoint.y });

      // Position photo to the right and above the marker, within map bounds
      const mapSize = map.getSize();
      // Responsive photo size based on screen width
      const isMobile = window.innerWidth < 640;
      const photoWidth = isMobile ? 240 : 280;
      const photoHeight = isMobile ? 300 : 350;
      const offsetX = 150; // Offset to the right
      const offsetY = -200; // Offset upward

      let photoX = markerPoint.x + offsetX;
      let photoY = markerPoint.y + offsetY;

      // Keep within map bounds
      if (photoX + photoWidth > mapSize.x) {
        photoX = markerPoint.x - offsetX - photoWidth; // Move to left side
      }
      if (photoY < 0) {
        photoY = markerPoint.y + 50; // Move below if too high
      }
      if (photoY + photoHeight > mapSize.y) {
        photoY = mapSize.y - photoHeight - 10; // Keep within bottom
      }

      setPhotoPosition({ x: photoX, y: photoY });
    };

    updatePosition();
    
    // Update on zoom/pan
    map.on('moveend', updatePosition);
    map.on('zoomend', updatePosition);

    return () => {
      map.off('moveend', updatePosition);
      map.off('zoomend', updatePosition);
    };
  }, [photo, markerPosition, map]);

  if (!photo || !photoPosition || !markerPixelPosition) return null;

  // Calculate line from photo center to marker - responsive sizes
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const photoWidth = isMobile ? 240 : 280;
  const photoHeight = isMobile ? 300 : 350;
  const photoCenterX = photoPosition.x + photoWidth / 2; // Center X of photo
  const photoCenterY = photoPosition.y + photoHeight / 2; // Center Y of photo
  const markerX = markerPixelPosition.x;
  const markerY = markerPixelPosition.y;

  // Calculate direction vector from photo center to marker
  const dx = markerX - photoCenterX;
  const dy = markerY - photoCenterY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  // Normalize direction vector
  const dirX = dx / distance;
  const dirY = dy / distance;

  // Find intersection point where line from center exits the photo
  // We need to find which edge of the photo the line intersects
  const photoLeft = photoPosition.x;
  const photoRight = photoPosition.x + photoWidth;
  const photoTop = photoPosition.y;
  const photoBottom = photoPosition.y + photoHeight;

  let lineStartX = photoCenterX;
  let lineStartY = photoCenterY;

  // Calculate intersection with each edge
  // Top edge
  if (dirY < 0) {
    const t = (photoTop - photoCenterY) / dirY;
    const x = photoCenterX + t * dirX;
    if (x >= photoLeft && x <= photoRight) {
      lineStartX = x;
      lineStartY = photoTop;
    }
  }
  // Bottom edge
  if (dirY > 0) {
    const t = (photoBottom - photoCenterY) / dirY;
    const x = photoCenterX + t * dirX;
    if (x >= photoLeft && x <= photoRight) {
      lineStartX = x;
      lineStartY = photoBottom;
    }
  }
  // Left edge
  if (dirX < 0) {
    const t = (photoLeft - photoCenterX) / dirX;
    const y = photoCenterY + t * dirY;
    if (y >= photoTop && y <= photoBottom) {
      lineStartX = photoLeft;
      lineStartY = y;
    }
  }
  // Right edge
  if (dirX > 0) {
    const t = (photoRight - photoCenterX) / dirX;
    const y = photoCenterY + t * dirY;
    if (y >= photoTop && y <= photoBottom) {
      lineStartX = photoRight;
      lineStartY = y;
    }
  }

  const mapSize = map.getSize();

  return (
    <>
      {/* Solid red line SVG overlay - covers entire map */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: 0,
          top: 0,
          width: `${mapSize.x}px`,
          height: `${mapSize.y}px`,
          zIndex: 1000,
        }}
      >
        <svg
          width={mapSize.x}
          height={mapSize.y}
          style={{ position: 'absolute', left: 0, top: 0 }}
        >
          {/* Solid red line from photo edge to marker */}
          <line
            x1={lineStartX}
            y1={lineStartY}
            x2={markerX}
            y2={markerY}
            stroke="#ef4444"
            strokeWidth="4"
          />
        </svg>
      </div>

      {/* Photo container */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="absolute pointer-events-auto"
          style={{
            left: `${photoPosition.x}px`,
            top: `${photoPosition.y}px`,
            zIndex: 1001,
          }}
        >
          <div className="relative w-[240px] h-[300px] sm:w-[280px] sm:h-[350px] bg-white rounded-xl overflow-hidden border-2 border-gray-300 shadow-xl">
            <button
              onClick={onClose}
              className="absolute top-2 right-2 z-10 text-gray-700 hover:text-gray-900 transition-colors bg-white/90 rounded-full p-1 shadow-md hover:bg-white"
            >
              <X size={18} />
            </button>
            <div className="relative w-full h-full">
              {imageError ? (
                <div className="flex items-center justify-center h-full bg-gray-100 text-gray-500 text-sm p-4 text-center">
                  Image not found
                </div>
              ) : photo.startsWith('/media/') ? (
                <CloudImage
                  src={localPathToSupabasePath(photo)}
                  alt="Selected photo"
                  fill
                  className="object-cover"
                  objectFit="cover"
                  fallback={photo}
                  onError={() => setImageError(true)}
                />
              ) : (
                <Image
                  src={photo}
                  alt="Selected photo"
                  fill
                  className="object-cover"
                  onError={() => setImageError(true)}
                />
              )}
              {/* Location name label */}
              {markerPosition?.name && (
                <div className="absolute bottom-4 left-4 right-4 z-10 flex justify-center">
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 inline-block shadow-lg">
                    <p 
                      className="text-white text-xs font-medium"
                      style={{ 
                        textShadow: '0 2px 6px rgba(0,0,0,0.8), 0 0 10px rgba(0,0,0,0.5)',
                        letterSpacing: '0.3px'
                      }}
                    >
                      {markerPosition.name}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

// Component for US state boundaries
function StateBoundaries() {
  const map = useMap();
  const [geoJsonData, setGeoJsonData] = useState<any>(null);

  useEffect(() => {
    // Load US states GeoJSON from a public source
    fetch("https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json")
      .then((response) => response.json())
      .then((data) => setGeoJsonData(data))
      .catch((error) => console.error("Error loading state boundaries:", error));
  }, []);

  if (!geoJsonData) return null;

  return (
    <GeoJSON
      data={geoJsonData}
      style={{
        color: "#666",
        weight: 1,
        opacity: 0.4,
        fill: false,
      }}
    />
  );
}

// Component to track zoom level and show sub-locations
function ZoomBasedMarkers() {
  const map = useMap();
  const [zoomLevel, setZoomLevel] = useState(map.getZoom());
  const onPhotoClick = useContext(PhotoClickContext);

  useEffect(() => {
    const updateZoom = () => {
      setZoomLevel(map.getZoom());
    };
    
    map.on('zoomend', updateZoom);
    updateZoom();
    
    return () => {
      map.off('zoomend', updateZoom);
    };
  }, [map]);

  const showSubLocations = zoomLevel >= 8; // Show sub-locations when zoomed in to city level

  return (
    <>
      {/* Main location markers - hide parent locations when showing sub-locations */}
      {locations.map((location) => {
        // Hide Pittsburgh and Downtown Pittsburgh when zoomed in (will show sub-locations instead)
        if (showSubLocations && (location.id === 1 || location.id === 6)) {
          return null;
        }
        return (
          <Marker
            key={location.id}
            position={[location.lat, location.lng]}
            icon={createCustomIcon()}
            eventHandlers={{
              mouseover: (e) => {
                e.target.openPopup();
              },
              mouseout: (e) => {
                e.target.closePopup();
              },
              click: () => {
                // If location has photos, open the first photo in lightbox
                if (location.photos && location.photos.length > 0 && onPhotoClick) {
                  onPhotoClick(location.photos[0].src, location.lat, location.lng);
                }
              },
            }}
          >
            <Popup className="custom-popup" maxWidth={220} closeButton={false} autoClose={false} closeOnClick={false}>
              <div className="p-3">
                <h3 className="font-semibold text-gray-900 text-xs mb-2">{location.name}</h3>
                {location.activities.length > 0 && (
                  <div className="space-y-2 mb-2">
                    {location.activities.map((activity, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        {activity.logo && (
                          <div className="relative w-5 h-5 bg-white rounded border border-gray-200 overflow-hidden flex-shrink-0 mt-0.5">
                            <Image
                              src={activity.logo}
                              alt={`${activity.title} logo`}
                              fill
                              className="object-contain p-0.5"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-800 text-xs leading-tight">{activity.title}</h4>
                          {activity.period && (
                            <span className="text-xs text-gray-500">{activity.period}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {location.photos && location.photos.length > 0 && (
                  <div className="mt-2">
                    <div className="grid grid-cols-2 gap-1.5">
                      {location.photos.map((photo, idx) => {
                        const distance = location.name !== "Nashville, TN" 
                          ? calculateDistance(location.lat, location.lng, NASHVILLE_COORDS.lat, NASHVILLE_COORDS.lng)
                          : null;
                        return (
                          <div key={idx} className="flex flex-col">
                            <a
                              href="#highlights"
                              onClick={(e) => {
                                e.preventDefault();
                                const element = document.querySelector('#highlights');
                                if (element) {
                                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }
                              }}
                              className="relative w-full aspect-square rounded-md overflow-hidden border border-gray-200 shadow-sm hover:border-gray-300 transition-all cursor-pointer"
                            >
                              {photo.src.startsWith('/media/') ? (
                                <CloudImage
                                  src={localPathToSupabasePath(photo.src)}
                                  alt={photo.alt}
                                  fill
                                  className="object-cover"
                                  objectFit="cover"
                                  fallback={photo.src}
                                />
                              ) : (
                                <Image
                                  src={photo.src}
                                  alt={photo.alt}
                                  fill
                                  className="object-cover"
                                />
                              )}
                            </a>
                            {distance !== null && (
                              <div className="mt-0.5 text-center">
                                <span className="text-gray-500 text-[10px] font-normal">
                                  {Math.round(distance)} mi
                                </span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        );
      })}
      
      {/* Sub-location markers - only show when zoomed in */}
      {showSubLocations && subLocations.map((subLoc, idx) => (
        <Marker
          key={`sub-${idx}`}
          position={[subLoc.lat, subLoc.lng]}
          icon={createCustomIcon()}
          eventHandlers={{
            mouseover: (e) => {
              e.target.openPopup();
            },
            mouseout: (e) => {
              e.target.closePopup();
            },
            click: () => {
              // If sub-location has photos, open the photo in lightbox
              if (subLoc.type === 'photo' && subLoc.data && onPhotoClick) {
                onPhotoClick(subLoc.data.src, subLoc.lat, subLoc.lng);
              }
            },
          }}
        >
          <Popup className="custom-popup" maxWidth={220} closeButton={false} autoClose={false} closeOnClick={false}>
            <div className="p-3">
              <h3 className="font-semibold text-gray-900 text-xs mb-2">{subLoc.name}</h3>
              {subLoc.type === 'activity' && subLoc.data && (
                <div className="flex items-start gap-2">
                  {subLoc.data.logo && (
                    <div className="relative w-5 h-5 bg-white rounded border border-gray-200 overflow-hidden flex-shrink-0 mt-0.5">
                      <Image
                        src={subLoc.data.logo}
                        alt={`${subLoc.data.title} logo`}
                        fill
                        className="object-contain p-0.5"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-800 text-xs leading-tight">{subLoc.data.title}</h4>
                    {subLoc.data.period && (
                      <span className="text-xs text-gray-500">{subLoc.data.period}</span>
                    )}
                  </div>
                </div>
              )}
              {subLoc.type === 'photo' && subLoc.data && (() => {
                const parentLocation = locations.find(loc => loc.id === subLoc.parentId);
                const distance = parentLocation && parentLocation.name !== "Nashville, TN"
                  ? calculateDistance(subLoc.lat, subLoc.lng, NASHVILLE_COORDS.lat, NASHVILLE_COORDS.lng)
                  : null;
                return (
                  <div className="flex flex-col">
                    <a
                      key={`subphoto-${subLoc.name}`}
                      href="#highlights"
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.querySelector('#highlights');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className="relative w-full aspect-square rounded-md overflow-hidden border border-gray-200 shadow-sm hover:border-gray-300 transition-all cursor-pointer block"
                    >
                      {subLoc.data.src.startsWith('/media/') ? (
                        <CloudImage
                          src={localPathToSupabasePath(subLoc.data.src)}
                          alt={subLoc.data.alt}
                          fill
                          className="object-cover"
                          objectFit="cover"
                          fallback={subLoc.data.src}
                        />
                      ) : (
                        <Image
                          src={subLoc.data.src}
                          alt={subLoc.data.alt}
                          fill
                          className="object-cover"
                        />
                      )}
                    </a>
                    {distance !== null && (
                      <div className="mt-0.5 text-center">
                        <span className="text-gray-500 text-[10px] font-normal">
                          {Math.round(distance)} mi
                        </span>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
}

export default function LocationMap() {
  const [isClient, setIsClient] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [markerPosition, setMarkerPosition] = useState<{ lat: number; lng: number; name?: string } | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const container = mapContainerRef.current;

    const preventPageZoom = (e: WheelEvent) => {
      if (container.contains(e.target as Node)) {
        e.stopPropagation();
      }
    };

    const preventTouchZoom = (e: TouchEvent) => {
      if (container.contains(e.target as Node) && e.touches.length > 1) {
        e.preventDefault();
      }
    };

    document.addEventListener('wheel', preventPageZoom, { passive: false });
    document.addEventListener('touchmove', preventTouchZoom, { passive: false });

    return () => {
      document.removeEventListener('wheel', preventPageZoom);
      document.removeEventListener('touchmove', preventTouchZoom);
    };
  }, [isClient]);

  const handlePhotoClick = (photoSrc: string, lat: number, lng: number) => {
    // Find location name from photo source - check main locations and sub-locations
    let locationName = "Location";
    
    // First check main locations
    const mainLocation = locations.find(loc => 
      loc.photos?.some(p => p.src === photoSrc) ||
      (Math.abs(loc.lat - lat) < 0.01 && Math.abs(loc.lng - lng) < 0.01)
    );
    
    if (mainLocation) {
      locationName = mainLocation.name;
    } else {
      // Check sub-locations array (zoom-based markers)
      const subLoc = subLocations.find(sl => 
        sl.type === 'photo' && sl.data?.src === photoSrc
      );
      if (subLoc) {
        locationName = subLoc.name || subLoc.data?.alt || "Location";
      } else {
        // Fallback: find by coordinates in subLocations
        const coordMatch = subLocations.find(sl => 
          Math.abs(sl.lat - lat) < 0.01 && Math.abs(sl.lng - lng) < 0.01
        );
        if (coordMatch) {
          locationName = coordMatch.name || "Location";
        }
      }
    }
    
    setSelectedPhoto(photoSrc);
    setMarkerPosition({ lat, lng, name: locationName });
  };

  if (!isClient) {
    return (
      <div className="w-full h-[600px] sm:h-[700px] md:h-[800px] bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center">
        <p className="text-gray-600">Loading map...</p>
      </div>
    );
  }

  return (
    <motion.div
      ref={mapContainerRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full h-[600px] sm:h-[700px] md:h-[800px] rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-white"
      style={{ touchAction: 'none' }}
    >
      <MapContainer
        center={[39.8283, -98.5795]}
        zoom={4.5}
        minZoom={4.5}
        maxZoom={15}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
        zoomControl={false}
        scrollWheelZoom={true}
        doubleClickZoom={false}
        dragging={true}
        touchZoom={true}
        worldCopyJump={true}
        className="map-container"
      >
        <MapView />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          noWrap={false}
        />
        
        {/* State boundaries overlay using GeoJSON */}
        <StateBoundaries />
        
        {/* Edge paths: Cleveland to Nashville to all other points */}
        {edgePaths.map((path, idx) => (
          <Polyline
            key={`edge-${idx}`}
            positions={path}
            pathOptions={{
              color: "#ef4444",
              weight: 1,
              opacity: 0.5,
            }}
          />
        ))}
        
        {/* Markers - zoom-based */}
        <PhotoClickContext.Provider value={handlePhotoClick}>
          <ZoomBasedMarkers />
          <MapRefSetter mapRef={mapRef} />
          <RecenterButton />
          {selectedPhoto && markerPosition && (
            <PhotoFunnelOverlayInner
              photo={selectedPhoto}
              markerPosition={markerPosition}
              onClose={() => {
                setSelectedPhoto(null);
                setMarkerPosition(null);
              }}
            />
          )}
        </PhotoClickContext.Provider>
      </MapContainer>
      
      <style jsx global>{`
        .map-container {
          background-color: #fafafa;
          touch-action: none;
        }
        .leaflet-container {
          background-color: #fafafa !important;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          touch-action: none !important;
        }
        .leaflet-container * {
          touch-action: none !important;
        }
        .leaflet-tile-container img {
          filter: brightness(1.02) contrast(1.05) saturate(0.95);
        }
        .custom-popup .leaflet-popup-content-wrapper {
          background: white;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
          padding: 0;
          border: 1px solid rgba(0,0,0,0.05);
        }
        .custom-popup .leaflet-popup-tip {
          background: white;
          border: 1px solid rgba(0,0,0,0.05);
        }
        .custom-marker {
          background: transparent !important;
          border: none !important;
        }
        .custom-marker .marker-pin {
          transition: all 0.3s ease;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));
        }
        .custom-marker:hover .marker-pin {
          transform: scale(1.4);
          filter: drop-shadow(0 4px 12px rgba(239, 68, 68, 0.4));
        }
        .custom-marker:hover .marker-pin path {
          fill: #dc2626;
        }
        .leaflet-control-zoom {
          border: none !important;
          background: rgba(255,255,255,0.98) !important;
          border-radius: 8px !important;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08) !important;
          overflow: hidden;
        }
        .leaflet-control-zoom a {
          background-color: transparent !important;
          color: #4a5568 !important;
          border: none !important;
          border-radius: 0 !important;
          width: 32px !important;
          height: 32px !important;
          line-height: 32px !important;
          font-size: 18px !important;
          transition: all 0.2s ease !important;
        }
        .leaflet-control-zoom a:first-child {
          border-bottom: 1px solid rgba(0,0,0,0.05) !important;
        }
        .leaflet-control-zoom a:hover {
          background-color: rgba(59,130,246,0.08) !important;
          color: #3b82f6 !important;
        }
        .leaflet-popup-close-button {
          color: #9ca3af !important;
          font-size: 20px !important;
          width: 24px !important;
          height: 24px !important;
          line-height: 24px !important;
          transition: all 0.2s ease !important;
        }
        .leaflet-popup-close-button:hover {
          color: #374151 !important;
          background-color: rgba(0,0,0,0.04) !important;
        }
        .leaflet-popup-content {
          margin: 0 !important;
        }
      `}</style>
    </motion.div>
  );
}
