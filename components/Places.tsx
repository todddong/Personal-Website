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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-left"
        >
          <h2 className="text-xl md:text-2xl font-normal text-[#93C572]">
            places
          </h2>
          <p className="text-sm md:text-base text-gray-500 mt-1">
            click on the red markers :)
          </p>
        </motion.div>

        <LocationMap />
      </div>
    </section>
  );
}
