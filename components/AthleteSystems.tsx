"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import CloudImage from "./CloudImage";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDE_DURATION = 5000;

const allSlides = [
  { src: "swim-1.jpg", alt: "Swim Photo 1" },
  { src: "swim-2.jpg", alt: "Swim Photo 2" },
  { src: "swim-3.jpg", alt: "Swim Photo 3" },
  { src: "swim-team-podium.jpg", alt: "Swim Team Podium" },
  { src: "general/sushi.jpg", alt: "Sushi" },
  { src: "general/photo-2.jpg", alt: "Photo 2" },
  { src: "general/photo-3.jpg", alt: "Photo 3" },
  { src: "general/photo-4.jpg", alt: "Photo 4" },
  { src: "general/photo-5.jpg", alt: "Photo 5" },
  { src: "general/photo-6.jpg", alt: "Photo 6" },
];

export default function AthleteSystems() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-advance slideshow
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % allSlides.length);
    }, SLIDE_DURATION);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const resetTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % allSlides.length);
    }, SLIDE_DURATION);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % allSlides.length);
    resetTimer();
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + allSlides.length) % allSlides.length);
    resetTimer();
  };

  return (
    <section id="about" className="relative bg-sand px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 md:mb-14"
        >
          <span className="section-label">About</span>
          <h2 className="section-heading">
            Discipline, in and out of the pool
          </h2>
        </motion.div>

        <div className="grid items-center gap-10 md:grid-cols-2 lg:gap-16">
          {/* Left: slideshow */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="group relative h-[260px] overflow-hidden rounded-3xl border border-line shadow-sm sm:h-[320px] md:h-[380px] lg:h-[420px]"
          >
            {/* Crossfade + slow Ken Burns drift */}
            <AnimatePresence>
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.08 }}
                  transition={{ duration: SLIDE_DURATION / 1000 + 1, ease: "linear" }}
                  className="absolute inset-0"
                >
                  <CloudImage
                    src={allSlides[currentSlide].src}
                    alt={allSlides[currentSlide].alt}
                    fill
                    className="object-cover"
                    objectFit="cover"
                    objectPosition={
                      allSlides[currentSlide].src === "swim-1.jpg"
                        ? "0% center"
                        : allSlides[currentSlide].src === "swim-2.jpg"
                          ? "45% 35%"
                          : "center center"
                    }
                    fallback={`/media/${allSlides[currentSlide].src}`}
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows — appear on hover */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-cream/80 p-2 text-ink opacity-0 shadow-sm backdrop-blur-sm transition-all hover:bg-cream group-hover:opacity-100"
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-cream/80 p-2 text-ink opacity-0 shadow-sm backdrop-blur-sm transition-all hover:bg-cream group-hover:opacity-100"
              aria-label="Next slide"
            >
              <ChevronRight size={20} />
            </button>

            {/* Counter */}
            <div className="absolute bottom-4 left-4 z-10 rounded-full bg-ink/40 px-3 py-1 backdrop-blur-sm">
              <span className="text-xs font-medium tabular-nums text-cream">
                {String(currentSlide + 1).padStart(2, "0")} /{" "}
                {String(allSlides.length).padStart(2, "0")}
              </span>
            </div>

            {/* Progress line */}
            <div className="absolute bottom-0 left-0 right-0 z-10 h-[3px] bg-ink/10">
              <motion.div
                key={currentSlide}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
                className="h-full bg-clay"
              />
            </div>
          </motion.div>

          {/* Right: bio */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-5"
          >
            <p className="text-base leading-relaxed text-stone-600 md:text-lg">
              Being a student-athlete means living by a schedule most people
              would call unreasonable — morning practice, lectures, lifting,
              problem sets. I&apos;ve learned to love it. That rhythm of
              showing up and iterating, every single day, is exactly how I
              approach engineering: consistent effort, honest feedback,
              measurable progress.
            </p>
            <p className="text-base leading-relaxed text-stone-600 md:text-lg">
              I&apos;m pursuing a B.S. in Computer Science with a concentration
              in machine learning, and I compete in sprint freestyle for
              CMU&apos;s varsity swim team — an NCAA qualifier, school record
              holder in the 400 free relay, and 7th all-time in the 100 free.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {["CS @ CMU", "ML Concentration", "Varsity Swimmer", "Photographer"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-line bg-cream px-3 py-1 text-xs text-stone-600"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
