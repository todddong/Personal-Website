"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamically import the map component to avoid SSR issues
const LocationMap = dynamic(() => import("./LocationMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] sm:h-[700px] md:h-[800px] bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center">
      <p className="text-gray-400">Loading map...</p>
    </div>
  ),
});

export default function Places() {
  return (
    <section id="places" className="py-6 sm:py-8 px-4 sm:px-6 md:px-8 relative bg-[#faf8f4] border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xl md:text-2xl font-normal mb-6 text-left text-[#93C572]"
        >
          places
        </motion.h2>

        <LocationMap />
      </div>
    </section>
  );
}
