"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";

// Fix for default marker icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Custom marker icon
const createCustomIcon = (color: string = "#3b82f6") => {
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="
      width: 20px;
      height: 20px;
      background-color: ${color};
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      cursor: pointer;
      transition: transform 0.2s;
    "></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
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
        role: "Bachelor of Science in Computer Science, ML Concentration",
        period: "2024 - Present",
        description: "Expected May 2027. Extracurriculars: CMU Varsity Swim and Dive, Volunteer swim lessons coach, Asian Student Association, ScottyLabs, HackCMU.",
      },
      {
        title: "CMU Varsity Swim Team",
        role: "Division III Athlete",
        period: "2024 - Present",
        description: "Competing at the Division III varsity level.",
      },
      {
        title: "Carnegie Mellon Human Computer Interaction Institute",
        role: "Machine Learning Research Assistant",
        period: "Aug 2025 - Present",
        description: "Replicated, extended, and optimized ML pipelines for AI Collaborative Learning.",
      },
    ],
    color: "#3b82f6", // blue
  },
  {
    id: 2,
    name: "Anchorage, AK",
    lat: 61.2181,
    lng: -149.9003,
    activities: [
      {
        title: "University of Alaska Anchorage AI Lab",
        role: "Software Engineering Intern",
        period: "Jun 2025 - Aug 2025",
        description: "Led project as the sole software developer for a user-friendly text assist application for individuals with hearing-impairments.",
      },
    ],
    color: "#10b981", // green
  },
  {
    id: 3,
    name: "Raleigh, NC",
    lat: 35.7796,
    lng: -78.6382,
    activities: [
      {
        title: "First Citizens Bank",
        role: "Incoming Software Engineering Intern",
        period: "2026",
        description: "Upcoming software engineering internship at First Citizens Bank.",
      },
    ],
    color: "#f59e0b", // amber
  },
];

// Component to set map view
function MapView() {
  const map = useMap();
  
  useEffect(() => {
    map.setView([39.8283, -98.5795], 4); // Center on US
  }, [map]);
  
  return null;
}

export default function LocationMap() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="w-full h-[500px] bg-gray-900/50 border border-gray-800 rounded-lg flex items-center justify-center">
        <p className="text-gray-400">Loading map...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full h-[500px] rounded-lg overflow-hidden border border-gray-800 shadow-lg"
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
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={[location.lat, location.lng]}
            icon={createCustomIcon(location.color)}
          >
            <Popup className="custom-popup" maxWidth={300}>
              <div className="p-2">
                <h3 className="font-bold text-lg text-gray-900 mb-2">{location.name}</h3>
                <div className="space-y-3">
                  {location.activities.map((activity, idx) => (
                    <div key={idx} className="border-b border-gray-200 pb-2 last:border-0 last:pb-0">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="font-semibold text-gray-800 text-sm">{activity.title}</h4>
                        <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{activity.period}</span>
                      </div>
                      <p className="text-blue-600 text-xs mb-1">{activity.role}</p>
                      <p className="text-gray-600 text-xs leading-relaxed">{activity.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      <style jsx global>{`
        .map-container {
          background-color: #0a0a0a;
        }
        .leaflet-container {
          background-color: #0a0a0a !important;
        }
        .leaflet-tile-container img {
          filter: brightness(0.7) contrast(1.2);
        }
        .custom-popup .leaflet-popup-content-wrapper {
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
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
          transform: scale(1.3);
        }
        .leaflet-control-zoom {
          border: 1px solid rgba(255,255,255,0.1) !important;
          background: rgba(17,24,39,0.95) !important;
          border-radius: 6px !important;
        }
        .leaflet-control-zoom a {
          background-color: rgba(17,24,39,0.95) !important;
          color: white !important;
          border-color: rgba(255,255,255,0.1) !important;
          border-radius: 4px !important;
        }
        .leaflet-control-zoom a:hover {
          background-color: rgba(59,130,246,0.9) !important;
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
