"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline, GeoJSON, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";
import Image from "next/image";

// Fix for default marker icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Custom marker icon - small red dot with no outline
const createCustomIcon = () => {
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="
      width: 8px;
      height: 8px;
      background-color: #ef4444;
      border-radius: 50%;
      cursor: pointer;
      transition: transform 0.2s;
    "></div>`,
    iconSize: [8, 8],
    iconAnchor: [4, 4],
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
      { src: "/media/swim-team-podium.jpg", alt: "Swim Team Podium" },
      { src: "/media/general/photo-1.jpg", alt: "Photo 1" },
      { src: "/media/general/photo-5.jpg", alt: "Photo 5" },
    ],
  },
  {
    id: 2,
    name: "Anchorage, AK",
    lat: 61.2181,
    lng: -149.9003,
    visitCount: 2,
    activities: [
      {
        title: "University of Alaska Anchorage AI Lab",
        period: "Jun 2025 - Aug 2025",
        logo: "/media/logos/uaa.png",
      },
    ],
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
  },
];

// Create arc paths between locations (in order of timeline)
const arcPaths = [
  createArcPath([locations[0].lat, locations[0].lng], [locations[1].lat, locations[1].lng]), // Pittsburgh to Anchorage
  createArcPath([locations[1].lat, locations[1].lng], [locations[0].lat, locations[0].lng]), // Anchorage back to Pittsburgh
  createArcPath([locations[0].lat, locations[0].lng], [locations[2].lat, locations[2].lng]), // Pittsburgh to Raleigh
];

// Heat map data - create circles for frequently visited locations (much smaller)
const heatMapData = locations.map(loc => ({
  lat: loc.lat,
  lng: loc.lng,
  intensity: loc.visitCount,
  radius: Math.min(loc.visitCount * 15000, 60000), // Much smaller radius
  opacity: Math.min(0.08 + (loc.visitCount * 0.03), 0.2), // Lighter opacity
}));

// Component to set map view - center on US with Alaska visible in bottom right
function MapView() {
  const map = useMap();
  
  useEffect(() => {
    // Set bounds to show continental US centered with Alaska visible in bottom right
    // This creates a view that shows the continental US well while keeping Alaska visible
    const bounds = L.latLngBounds(
      [24.0, -180.0], // Southwest corner (includes Alaska on the left side of the map)
      [72.0, -50.0] // Northeast corner
    );
    // Fit bounds with padding, but adjust to show Alaska in bottom right
    map.fitBounds(bounds, { 
      padding: [20, 20],
      maxZoom: 5
    });
    
    // Adjust pan to better position Alaska in bottom right
    setTimeout(() => {
      const currentCenter = map.getCenter();
      // Slight adjustment to show Alaska better
      map.setView([currentCenter.lat - 2, currentCenter.lng + 15], map.getZoom(), { animate: false });
    }, 100);
  }, [map]);
  
  return null;
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

export default function LocationMap() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="w-full h-[500px] bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center">
        <p className="text-gray-600">Loading map...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full h-[500px] rounded-lg overflow-hidden border border-gray-300 shadow-lg bg-white"
    >
      <MapContainer
        center={[39.8283, -98.5795]}
        zoom={4}
        minZoom={3}
        maxZoom={10}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
        zoomControl={true}
        scrollWheelZoom={true}
        className="map-container"
      >
        <MapView />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* State boundaries overlay using GeoJSON */}
        <StateBoundaries />
        
        {/* Heat map circles - smaller and more subtle */}
        {heatMapData.map((heat, idx) => (
          <Circle
            key={`heat-${idx}`}
            center={[heat.lat, heat.lng]}
            radius={heat.radius}
            pathOptions={{
              fillColor: "#ef4444",
              fillOpacity: heat.opacity,
              color: "transparent",
              weight: 0,
            }}
          />
        ))}
        
        {/* Arc paths connecting locations */}
        {arcPaths.map((path, idx) => (
          <Polyline
            key={`arc-${idx}`}
            positions={path}
            pathOptions={{
              color: "#ef4444",
              weight: 1.5,
              opacity: 0.6,
            }}
          />
        ))}
        
        {/* Markers */}
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={[location.lat, location.lng]}
            icon={createCustomIcon()}
          >
            <Popup className="custom-popup" maxWidth={220}>
              <div className="p-3">
                <h3 className="font-semibold text-gray-900 text-sm mb-2">{location.name}</h3>
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
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-500 mb-2 font-medium">Photos</p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {location.photos.map((photo, idx) => (
                        <div key={idx} className="relative w-full h-20 rounded-md overflow-hidden border border-gray-200 shadow-sm">
                          <Image
                            src={photo.src}
                            alt={photo.alt}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      <style jsx global>{`
        .map-container {
          background-color: #fafafa;
        }
        .leaflet-container {
          background-color: #fafafa !important;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
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
        .custom-marker div {
          transition: all 0.2s ease;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .custom-marker:hover div {
          transform: scale(1.6);
          box-shadow: 0 3px 8px rgba(0,0,0,0.3);
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
