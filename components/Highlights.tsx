"use client";

import { motion, AnimatePresence } from "framer-motion";
import CloudImage from "./CloudImage";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// Add your Alaska photos here - they'll automatically appear in the gallery
// Using Supabase Storage paths (relative to 'images' bucket)
const alaskaHighlights = [
  { src: "alaska/alaska-1.jpg", alt: "Alaska Highlight 1", title: "Anchorage" },
  { src: "alaska/alaska-2.jpg", alt: "Alaska Highlight 2", title: "Alaska" },
  { src: "alaska/alaska-3.jpg", alt: "Alaska Highlight 3", title: "Alaska" },
  { src: "alaska/alaska-4.jpg", alt: "Alaska Highlight 4", title: "Alaska" },
  { src: "alaska/alaksa-5.jpg", alt: "Alaska Highlight 5", title: "Alaska" },
  { src: "alaska/alaska-6.jpg", alt: "Alaska Highlight 6", title: "Alaska" },
  { src: "alaska/alaska-7.jpg", alt: "Alaska Highlight 7", title: "Alaska" },
  { src: "alaska/alaska-8.jpg", alt: "Alaska Highlight 8", title: "Alaska" },
  { src: "alaska/alaska-9.jpg", alt: "Alaska Highlight 9", title: "Alaska" },
  { src: "alaska/alaska-10.jpg", alt: "Alaska Highlight 10", title: "Alaska" },
  { src: "alaska/alaska-11.jpg", alt: "Alaska Highlight 11", title: "Alaska" },
  { src: "alaska/alaska-12.jpg", alt: "Alaska Highlight 12", title: "Alaska" },
  { src: "alaska/alaska-13.jpg", alt: "Alaska Highlight 13", title: "Alaska" },
];

function HighlightItem({ 
  highlight, 
  index, 
  onSelect 
}: { 
  highlight: typeof alaskaHighlights[0]; 
  index: number;
  onSelect: (index: number) => void;
}) {
  const [imageError, setImageError] = useState(false);

  if (imageError) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="relative group cursor-pointer overflow-hidden rounded-lg border border-gray-300 hover:border-gray-400 transition-all duration-300 hover:scale-[1.04]"
      onClick={() => onSelect(index)}
    >
      <div className="aspect-square relative overflow-hidden">
        <CloudImage
          src={highlight.src}
          alt={highlight.alt}
          fill
          className="object-cover group-hover:scale-125 transition-transform duration-300 ease-out"
          objectFit="cover"
          fallback={`/media/${highlight.src}`}
          onError={() => setImageError(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <span className="text-white font-medium text-xs drop-shadow-lg">
            {highlight.title}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Highlights() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentSlide = selectedIndex ?? 0;
  const currentHighlight = alaskaHighlights[currentSlide];

  // Auto-advance slideshow when lightbox is open
  useEffect(() => {
    if (selectedIndex === null) return;
    intervalRef.current = setInterval(() => {
      setSelectedIndex((prev) => (prev === null ? 0 : (prev + 1) % alaskaHighlights.length));
    }, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [selectedIndex]);

  const nextSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev === null ? 0 : (prev + 1) % alaskaHighlights.length));
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setSelectedIndex((p) => (p === null ? 0 : (p + 1) % alaskaHighlights.length));
    }, 4000);
  };

  const prevSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) =>
      prev === null ? 0 : (prev - 1 + alaskaHighlights.length) % alaskaHighlights.length
    );
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setSelectedIndex((p) => (p === null ? 0 : (p + 1) % alaskaHighlights.length));
    }, 4000);
  };

  return (
    <section id="highlights" className="py-6 px-4 sm:px-6 md:px-8 relative bg-[#faf8f4] border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-left mb-4"
        >
          <h2 className="text-sm sm:text-base md:text-xl lg:text-2xl font-normal mb-1 sm:mb-2 text-[#93C572]">
            alaska highlights
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm max-w-2xl">
            Summer 2025 internship in Anchorage — exploring the Last Frontier
          </p>
        </motion.div>

        <div className="grid grid-cols-6 gap-0.5 sm:gap-1">
          {alaskaHighlights.map((highlight, index) => (
            <HighlightItem
              key={index}
              highlight={highlight}
              index={index}
              onSelect={setSelectedIndex}
            />
          ))}
        </div>

        {/* Lightbox Slideshow Modal */}
        <AnimatePresence>
          {selectedIndex !== null && currentHighlight && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
              onClick={() => setSelectedIndex(null)}
            >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="relative max-w-6xl max-h-[90vh] w-full rounded-2xl overflow-hidden bg-black/50 group/slideshow"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute top-4 right-4 z-20 text-gray-900 hover:text-gray-600 transition-colors bg-white/90 rounded-full p-2 shadow-md"
              >
                <X size={24} />
              </button>

              <div className="relative w-full h-full aspect-video rounded-2xl overflow-hidden bg-black/50">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 rounded-2xl overflow-hidden [&_img]:rounded-2xl [&_span]:rounded-2xl [&_span]:overflow-hidden"
                  >
                    <CloudImage
                      src={currentHighlight.src}
                      alt={currentHighlight.alt}
                      fill
                      className="object-contain rounded-2xl"
                      objectFit="contain"
                      fallback={`/media/${currentHighlight.src}`}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-900 rounded-full p-2 sm:p-2.5 shadow-md transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft size={22} className="sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-900 rounded-full p-2 sm:p-2.5 shadow-md transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight size={22} className="sm:w-6 sm:h-6" />
              </button>

              {/* Slide Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                {alaskaHighlights.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedIndex(index);
                    }}
                    className={`h-2 rounded-full transition-all ${
                      index === currentSlide
                        ? "w-8 bg-[#93C572]"
                        : "w-2 bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

