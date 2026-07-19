"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import CloudImage from "./CloudImage";
import { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// Add your Alaska photos here - they'll automatically appear in the collage
// Using Supabase Storage paths (relative to 'images' bucket)
const alaskaHighlights = [
  { src: "alaska/alaska-1.jpg", alt: "Alaska Highlight 1", title: "Anchorage" },
  { src: "alaska/alaska-2.jpg", alt: "Alaska Highlight 2", title: "Alaska" },
  { src: "alaska/alaska-3.jpg", alt: "Alaska Highlight 3", title: "Girdwood" },
  { src: "alaska/alaksa-5.jpg", alt: "Alaska Highlight 5", title: "Alaska" },
  { src: "alaska/alaska-6.jpg", alt: "Alaska Highlight 6", title: "Alaska" },
  { src: "alaska/alaska-7.jpg", alt: "Alaska Highlight 7", title: "Alaska" },
  { src: "alaska/alaska-8.jpg", alt: "Alaska Highlight 8", title: "Alaska" },
  { src: "alaska/alaska-9.jpg", alt: "Alaska Highlight 9", title: "Alaska" },
  { src: "alaska/alaska-10.jpg", alt: "Alaska Highlight 10", title: "Alaska" },
  { src: "alaska/alaska-11.jpg", alt: "Alaska Highlight 11", title: "Port of Anchorage" },
  { src: "alaska/alaska-12.jpg", alt: "Alaska Highlight 12", title: "Alaska" },
  { src: "alaska/alaska-13.jpg", alt: "Alaska Highlight 13", title: "Alaska" },
];

// Deterministic scatter so the collage feels hand-placed but stable across renders
const rotations = [-4, 3, -2, 5, -5, 2, 4, -3, 3, -4, 2, -2];
const verticalOffsets = [
  "md:mt-0",
  "md:mt-10",
  "md:mt-4",
  "md:mt-14",
  "md:mt-2",
  "md:mt-8",
  "md:mt-0",
  "md:mt-12",
  "md:mt-6",
  "md:mt-2",
  "md:mt-10",
  "md:mt-4",
];

function CollageItem({
  highlight,
  index,
  onSelect,
}: {
  highlight: typeof alaskaHighlights[0];
  index: number;
  onSelect: (index: number) => void;
}) {
  const [imageError, setImageError] = useState(false);

  if (imageError) return null;

  return (
    <motion.button
      initial={{ opacity: 0, y: 30, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: rotations[index % rotations.length] }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08, ease: "easeOut" }}
      whileHover={{ rotate: 0, scale: 1.05, zIndex: 20 }}
      onClick={() => onSelect(index)}
      className={`relative block w-[44%] cursor-pointer rounded-lg bg-paper p-2 pb-7 shadow-2xl shadow-night/50 sm:w-[30%] md:w-[22%] ${
        verticalOffsets[index % verticalOffsets.length]
      } ${index % 2 === 0 ? "-mr-3 md:-mr-5" : "-ml-1 md:-ml-4"}`}
      aria-label={`View ${highlight.title}`}
    >
      <div className="relative aspect-square overflow-hidden rounded-sm">
        <CloudImage
          src={highlight.src}
          alt={highlight.alt}
          fill
          className="object-cover"
          objectFit="cover"
          fallback={`/media/${highlight.src}`}
          onError={() => setImageError(true)}
        />
      </div>
    </motion.button>
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
    <section id="gallery" className="relative overflow-hidden px-6 py-20 md:px-10 md:py-28">
      {/* Denali backdrop */}
      <div className="absolute inset-0">
        <Image
          src="/media/cities/alaska-bg.jpg"
          alt="Wonder Lake and Denali, Alaska"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night/70 via-night/40 to-night/80" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 md:mb-16"
        >
          <span className="section-label text-clay">Gallery</span>
          <h2 className="section-heading text-paper">Alaska, summer 2025</h2>
          <p className="mt-3 max-w-2xl text-base text-paper/80">
            Shot between workdays during my internship in Anchorage — exploring
            the Last Frontier.
          </p>
        </motion.div>

        {/* Overlapping photo collage */}
        <div className="flex flex-wrap items-start justify-center gap-y-4 pb-6 md:pb-14">
          {alaskaHighlights.map((highlight, index) => (
            <CollageItem
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
              className="fixed inset-0 z-50 flex items-center justify-center bg-night/95 p-4"
              onClick={() => setSelectedIndex(null)}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="relative max-h-[90vh] w-full max-w-5xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedIndex(null)}
                  className="absolute -top-12 right-0 z-20 rounded-full bg-paper/90 p-2 text-night shadow-md transition-colors hover:bg-paper"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>

                {/* Enlarged polaroid frame */}
                <div className="relative rounded-lg bg-paper p-3 pb-16 shadow-2xl shadow-night/60 sm:p-4 sm:pb-20">
                  <div className="relative aspect-video w-full overflow-hidden rounded-sm">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0"
                      >
                        <CloudImage
                          src={currentHighlight.src}
                          alt={currentHighlight.alt}
                          fill
                          className="object-contain"
                          objectFit="contain"
                          fallback={`/media/${currentHighlight.src}`}
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Navigation arrows */}
                    <button
                      onClick={prevSlide}
                      className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-paper/90 p-2.5 text-night shadow-md transition-colors hover:bg-paper"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft size={22} />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-paper/90 p-2.5 text-night shadow-md transition-colors hover:bg-paper"
                      aria-label="Next slide"
                    >
                      <ChevronRight size={22} />
                    </button>
                  </div>

                </div>

                {/* Slide indicators */}
                <div className="mt-4 flex justify-center gap-1.5">
                  {alaskaHighlights.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedIndex(index);
                      }}
                      className={`h-1.5 rounded-full transition-all ${
                        index === currentSlide
                          ? "w-6 bg-clay"
                          : "w-1.5 bg-paper/60 hover:bg-paper"
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
