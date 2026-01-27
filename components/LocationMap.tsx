"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline, GeoJSON } from "react-leaflet";
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
  },
  {
    id: 2,
    name: "Anchorage, AK",
    lat: 61.2181,
    lng: -149.9003,
    activities: [
      {
        title: "University of Alaska Anchorage AI Lab",
        period: "Jun 2025 - Aug 2025",
        logo: "/media/logos/uaa.png",
      },
    ],
  },
  {
    id: 3,
    name: "Raleigh, NC",
    lat: 35.7796,
    lng: -78.6382,
    activities: [
      {
        title: "First Citizens Bank",
        period: "2026",
        logo: "/media/logos/first-citizens.jpg",
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

// Component to set map view
function MapView() {
  const map = useMap();
  
  useEffect(() => {
    map.setView([39.8283, -98.5795], 4); // Center on US
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
            <Popup className="custom-popup" maxWidth={200}>
              <div className="p-2">
                {location.activities.map((activity, idx) => (
                  <div key={idx} className="mb-2 last:mb-0">
                    <div className="flex items-center gap-2 mb-1">
                      {activity.logo && (
                        <div className="relative w-6 h-6 bg-white rounded border border-gray-200 overflow-hidden flex-shrink-0">
                          <Image
                            src={activity.logo}
                            alt={`${activity.title} logo`}
                            fill
                            className="object-contain p-0.5"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-800 text-xs leading-tight">{activity.title}</h4>
                        <span className="text-xs text-gray-500">{activity.period}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      <style jsx global>{`
        .map-container {
          background-color: #f9fafb;
        }
        .leaflet-container {
          background-color: #f9fafb !important;
        }
        .leaflet-tile-container img {
          filter: brightness(1) contrast(1);
        }
        .custom-popup .leaflet-popup-content-wrapper {
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          padding: 0;
        }
        .custom-popup .leaflet-popup-tip {
          background: white;
        }
        .custom-marker {
          background: transparent !important;
          border: none !important;
        }
        .custom-marker div {
          transition: transform 0.2s ease;
        }
        .custom-marker:hover div {
          transform: scale(1.5);
        }
        .leaflet-control-zoom {
          border: 1px solid rgba(0,0,0,0.1) !important;
          background: rgba(255,255,255,0.95) !important;
          border-radius: 6px !important;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1) !important;
        }
        .leaflet-control-zoom a {
          background-color: rgba(255,255,255,0.95) !important;
          color: #333 !important;
          border-color: rgba(0,0,0,0.1) !important;
          border-radius: 4px !important;
        }
        .leaflet-control-zoom a:hover {
          background-color: rgba(59,130,246,0.1) !important;
          color: #3b82f6 !important;
        }
        .leaflet-popup-close-button {
          color: #666 !important;
        }
        .leaflet-popup-close-button:hover {
          color: #000 !important;
        }
      `}</style>
    </motion.div>
  );
}
