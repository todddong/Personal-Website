"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const allSlides = [
  { src: "/media/swim-1.jpg", alt: "Swim Photo 1" },
  { src: "/media/swim-2.jpg", alt: "Swim Photo 2" },
  { src: "/media/swim-3.jpg", alt: "Swim Photo 3" },
  { src: "/media/swim-team-podium.jpg", alt: "Swim Team Podium" },
  { src: "/media/general/photo-1.jpg", alt: "Photo 1" },
  { src: "/media/general/photo-2.jpg", alt: "Photo 2" },
  { src: "/media/general/photo-3.jpg", alt: "Photo 3" },
  { src: "/media/general/photo-4.jpg", alt: "Photo 4" },
  { src: "/media/general/photo-5.jpg", alt: "Photo 5" },
  { src: "/media/general/photo-6.jpg", alt: "Photo 6" },
];

export default function AthleteSystems() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-advance slideshow
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % allSlides.length);
    }, 4000); // Change slide every 4 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % allSlides.length);
    // Reset auto-advance timer
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % allSlides.length);
    }, 4000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + allSlides.length) % allSlides.length);
    // Reset auto-advance timer
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % allSlides.length);
    }, 4000);
  };

  return (
    <section
      ref={sectionRef}
      id="athlete-systems"
      className="py-24 px-4 md:px-8 relative bg-gradient-to-b from-transparent to-gray-900/30"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold mb-16 text-center"
        >
          About me
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Swim Slideshow */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] rounded-lg overflow-hidden border border-gray-800 group"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={allSlides[currentSlide].src}
                  alt={allSlides[currentSlide].alt}
                  fill
                  className={`object-cover ${
                    allSlides[currentSlide].src === "/media/swim-2.jpg"
                      ? "object-[center_35%]"
                      : ""
                  }`}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `
                        <div class="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-blue-900/20 flex items-center justify-center">
                          <div class="text-center text-gray-500">
                            <p class="text-sm mb-2">Swim Photo</p>
                            <p class="text-xs">Add swim photos to public/media folder</p>
                          </div>
                        </div>
                      `;
                    }
                  }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all opacity-0 group-hover:opacity-100"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all opacity-0 group-hover:opacity-100"
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
              {allSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentSlide
                      ? 'w-8 bg-blue-400'
                      : 'w-2 bg-gray-600 hover:bg-gray-500'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Right: About Me Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <p className="text-xl text-gray-300 leading-relaxed">
              Todd Dong Bio
            </p>
            
            <p className="text-gray-400 leading-relaxed">
              &quot;I am a CS student at Carnegie Mellon University and a member of the Varsity swim team. Being a student-athlete requires a high level of commitment, discipline, and time management, and I take pride in applying that same dedication to my academic and professional pursuits. I am currently working toward a degree in Computer Science with a concentration in Machine Learning.&quot;
            </p>

            <div className="space-y-3 mt-6">
              <div className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span className="text-gray-400">Born in Cleveland, moved to Nashville</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span className="text-gray-400">Passion for exploring new places</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span className="text-gray-400">Love trying new food</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span className="text-gray-400">Enjoy going to the gym</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span className="text-gray-400">Love meeting new people</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Photo Preview Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-4"
        >
          {allSlides.map((slide, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
              onClick={() => setCurrentSlide(index)}
              className={`relative h-32 rounded-lg overflow-hidden border transition-all group ${
                index === currentSlide
                  ? 'border-blue-400 border-2'
                  : 'border-gray-800 hover:border-gray-700'
              }`}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className={`object-cover transition-all duration-300 ${
                  index === currentSlide
                    ? 'opacity-100'
                    : 'opacity-70 group-hover:opacity-100 group-hover:scale-110'
                }`}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent && !parent.querySelector('.placeholder')) {
                    const placeholder = document.createElement('div');
                    placeholder.className = 'placeholder absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center';
                    placeholder.innerHTML = `<span class="text-gray-600 text-xs">${index + 1}</span>`;
                    parent.appendChild(placeholder);
                  }
                }}
              />
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

