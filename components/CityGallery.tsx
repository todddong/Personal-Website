"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin, Pause, Play, X } from "lucide-react";
import CloudImage from "./CloudImage";
import { localPathToSupabasePath } from "@/lib/imageUtils";

const SLIDE_DURATION = 7000;

type PersonalPhoto = {
  src: string;
  alt: string;
};

type City = {
  slug: string;
  name: string;
  region: string;
  period?: string;
  stock: string;
  photos: PersonalPhoto[];
};

const cities: City[] = [
  {
    slug: "pittsburgh",
    name: "Pittsburgh",
    region: "Pennsylvania, USA",
    period: "2024 — Present",
    stock: "/media/cities/pittsburgh.jpg",
    photos: [
      { src: "/media/general/photo-6.jpg", alt: "Downtown Pittsburgh" },
      { src: "/media/cmu-about.jpg", alt: "Schenley Park sunset" },
      { src: "/media/swim-1.jpg", alt: "CMU varsity swimming" },
    ],
  },
  {
    slug: "raleigh",
    name: "Raleigh",
    region: "North Carolina, USA",
    period: "Summer 2026",
    stock: "/media/cities/raleigh.jpg",
    photos: [
      { src: "/media/general/raleigh-2.jpg", alt: "Foosball outside the office" },
      { src: "/media/general/raleigh-3.jpg", alt: "Sunset at Lake Johnson" },
    ],
  },
  {
    slug: "anchorage",
    name: "Anchorage",
    region: "Alaska, USA",
    period: "Summer 2025",
    stock: "/media/cities/anchorage.jpg",
    photos: [
      { src: "/media/general/photo-3.jpg", alt: "Flat Top Mountain hike" },
      { src: "/media/alaska/alaska-3.jpg", alt: "Girdwood, Alaska" },
      { src: "/media/alaska/alaska-11.jpg", alt: "Port of Anchorage" },
    ],
  },
  {
    slug: "nashville",
    name: "Nashville",
    region: "Tennessee, USA",
    period: "Childhood",
    stock: "/media/cities/nashville.jpg",
    photos: [{ src: "/media/alaska/nashville.jpg", alt: "Nashville, Tennessee" }],
  },
  {
    slug: "chicago",
    name: "Chicago",
    region: "Illinois, USA",
    stock: "/media/cities/chicago.jpg",
    photos: [{ src: "/media/general/chicago-bean.png", alt: "Cloud Gate, Millennium Park" }],
  },
  {
    slug: "san-francisco",
    name: "San Francisco",
    region: "California, USA",
    period: "Summer 2026",
    stock: "/media/cities/san-francisco.jpg",
    photos: [
      { src: "/media/alaska/golden gate.jpg", alt: "Golden Gate Bridge" },
      { src: "/media/general/sf-2.jpg", alt: "Planning session at Data + AI Summit" },
      { src: "/media/general/sf-3.jpg", alt: "Databricks Student Fellows cohort" },
      { src: "/media/general/sf-4.jpg", alt: "With my Datathon teammate" },
      { src: "/media/general/sf-5.jpg", alt: "Clam chowder at Fisherman's Wharf" },
    ],
  },
  {
    slug: "los-angeles",
    name: "Los Angeles",
    region: "California, USA",
    stock: "/media/cities/los-angeles.jpg",
    photos: [{ src: "/media/alaska/santa monica.jpg", alt: "Santa Monica Pier" }],
  },
  {
    slug: "miami",
    name: "Miami",
    region: "Florida, USA",
    stock: "/media/cities/miami.jpg",
    photos: [
      { src: "/media/alaska/south beach.jpg", alt: "South Beach" },
      { src: "/media/alaska/lincoln road.jpg", alt: "Lincoln Road, Miami Beach" },
    ],
  },
  {
    slug: "austin",
    name: "Austin",
    region: "Texas, USA",
    stock: "/media/cities/austin.jpg",
    photos: [{ src: "/media/general/austin-river.png", alt: "Kayaking in Austin" }],
  },
  {
    slug: "washington-dc",
    name: "Washington, D.C.",
    region: "USA",
    stock: "/media/cities/washington-dc.jpg",
    photos: [{ src: "/media/general/washington-dc-tidal-basin.png", alt: "Tidal Basin, Washington DC" }],
  },
  {
    slug: "new-orleans",
    name: "New Orleans",
    region: "Louisiana, USA",
    stock: "/media/cities/new-orleans.jpg",
    photos: [{ src: "/media/general/audubon-zoo-new-orleans.png", alt: "Audubon Zoo, New Orleans" }],
  },
  {
    slug: "shanghai",
    name: "Shanghai",
    region: "China",
    stock: "/media/cities/shanghai.jpg",
    photos: [{ src: "/media/alaska/shanghai.jpg", alt: "Shanghai, China" }],
  },
  {
    slug: "cleveland",
    name: "Cleveland",
    region: "Ohio, USA",
    period: "Born",
    stock: "/media/cities/cleveland.jpg",
    photos: [{ src: "/media/alaska/cleveland.jpg", alt: "Cleveland, Ohio" }],
  },
  {
    slug: "yosemite",
    name: "Yosemite & Tahoe",
    region: "California / Nevada, USA",
    stock: "/media/cities/yosemite.jpg",
    photos: [
      { src: "/media/general/yosemite.jpg", alt: "Yosemite National Park" },
      { src: "/media/general/lake tahoe.jpg", alt: "Lake Tahoe" },
    ],
  },
  {
    slug: "bahamas",
    name: "Bahamas",
    region: "The Caribbean",
    stock: "/media/cities/bahamas.jpg",
    photos: [{ src: "/media/general/bahamas.jpg", alt: "Bahamas" }],
  },
  {
    slug: "atlanta",
    name: "Atlanta",
    region: "Georgia, USA",
    stock: "/media/cities/atlanta.jpg",
    photos: [
      { src: "/media/swim-team-podium.jpg", alt: "Swim team podium at Emory" },
      { src: "/media/general/stone mountain.jpg", alt: "Stone Mountain, Georgia" },
      { src: "/media/general/photo-4.jpg", alt: "Lake Lanier" },
    ],
  },
  {
    slug: "orlando",
    name: "Orlando",
    region: "Florida, USA",
    stock: "/media/cities/orlando.jpg",
    photos: [{ src: "/media/alaska/universal florida.jpg", alt: "Universal Studios, Orlando" }],
  },
];

function PolaroidPhoto({
  photo,
  rotation,
  offsetClass,
  onClick,
}: {
  photo: PersonalPhoto;
  rotation: number;
  offsetClass?: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 24, rotate: rotation * 1.6 }}
      animate={{ opacity: 1, y: 0, rotate: rotation }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ rotate: 0, scale: 1.06, zIndex: 30 }}
      onClick={onClick}
      className={`group relative block shrink-0 rounded-md bg-paper p-1.5 pb-5 shadow-xl shadow-night/30 ${offsetClass ?? ""}`}
      aria-label={`View photo: ${photo.alt}`}
    >
      <div className="relative h-24 w-20 overflow-hidden rounded-sm sm:h-32 sm:w-28 md:h-36 md:w-32">
        <CloudImage
          src={localPathToSupabasePath(photo.src)}
          alt={photo.alt}
          fill
          className="object-cover"
          objectFit="cover"
          fallback={photo.src}
        />
      </div>
      <span className="absolute bottom-1 left-0 right-0 truncate px-2 text-center text-[9px] font-medium text-[#78716c] sm:text-[10px]">
        {photo.alt}
      </span>
    </motion.button>
  );
}

export default function CityGallery() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [lightbox, setLightbox] = useState<{ cityIdx: number; photoIdx: number } | null>(null);
  const filmstripRef = useRef<HTMLDivElement | null>(null);

  const city = cities[index];
  const frozen = isPaused || isHovered || lightbox !== null;

  const goTo = useCallback((next: number) => {
    setIndex(((next % cities.length) + cities.length) % cities.length);
  }, []);

  useEffect(() => {
    if (frozen) return;
    const timer = setTimeout(() => goTo(index + 1), SLIDE_DURATION);
    return () => clearTimeout(timer);
  }, [index, frozen, goTo]);

  // Keep active thumbnail in view
  useEffect(() => {
    const strip = filmstripRef.current;
    const active = strip?.querySelector<HTMLElement>(`[data-city="${city.slug}"]`);
    if (strip && active) {
      strip.scrollTo({
        left: active.offsetLeft - strip.clientWidth / 2 + active.clientWidth / 2,
        behavior: "smooth",
      });
    }
  }, [city.slug]);

  const lightboxCity = lightbox ? cities[lightbox.cityIdx] : null;
  const lightboxPhoto = lightboxCity ? lightboxCity.photos[lightbox!.photoIdx] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Main stage */}
      <div
        className="group/stage relative h-[540px] w-full overflow-hidden rounded-3xl border border-line bg-night shadow-sm sm:h-[600px] md:h-[660px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence mode="popLayout">
          <motion.div
            key={city.slug}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={city.stock}
              alt={`${city.name} — ${city.region}`}
              fill
              priority={index === 0}
              sizes="(max-width: 1152px) 100vw, 1152px"
              className={`object-cover ${frozen ? "" : "kenburns"}`}
            />
            {/* Legibility gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/25 to-night/10" />
            <div className="absolute inset-0 bg-gradient-to-r from-night/40 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Progress bar */}
        <div className="absolute left-0 right-0 top-0 z-20 h-[3px] bg-paper/20">
          <div
            key={`${city.slug}-progress`}
            className="h-full bg-clay slide-progress"
            style={{ animationPlayState: frozen ? "paused" : "running" }}
          />
        </div>

        {/* Counter + pause */}
        <div className="absolute right-4 top-4 z-20 flex items-center gap-2 sm:right-6 sm:top-6">
          <span className="rounded-full bg-night/50 px-3 py-1 font-mono text-xs tracking-widest text-paper backdrop-blur-sm">
            {String(index + 1).padStart(2, "0")} / {String(cities.length).padStart(2, "0")}
          </span>
          <button
            onClick={() => setIsPaused((p) => !p)}
            className="rounded-full bg-night/50 p-2 text-paper backdrop-blur-sm transition-colors hover:bg-night/70"
            aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
          >
            {isPaused ? <Play size={13} /> : <Pause size={13} />}
          </button>
        </div>

        {/* City info */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-6 sm:p-8 md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={city.slug}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="max-w-xl"
              >
                <div className="mb-2 flex items-center gap-2 text-paper/80">
                  <MapPin size={13} />
                  <span className="text-xs font-medium uppercase tracking-[0.2em]">
                    {city.region}
                  </span>
                  {city.period && (
                    <span className="rounded-full border border-paper/30 px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-paper/90">
                      {city.period}
                    </span>
                  )}
                </div>
                <h3 className="font-serif text-4xl text-paper drop-shadow-md sm:text-5xl md:text-6xl">
                  {city.name}
                </h3>
              </motion.div>
            </AnimatePresence>

            {/* Personal photos — woven in like a travel journal */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${city.slug}-photos`}
                exit={{ opacity: 0 }}
                className="flex items-end pb-1 pl-1"
              >
                {city.photos.map((photo, i) => (
                  <PolaroidPhoto
                    key={photo.src}
                    photo={photo}
                    rotation={[-5, 3, -2, 4][i % 4]}
                    offsetClass={i > 0 ? "-ml-6 sm:-ml-8" : ""}
                    onClick={() => setLightbox({ cityIdx: index, photoIdx: i })}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Arrows */}
        <button
          onClick={() => goTo(index - 1)}
          className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-paper/90 p-2.5 text-night opacity-0 shadow-md transition-all hover:bg-paper group-hover/stage:opacity-100 sm:left-4"
          aria-label="Previous city"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => goTo(index + 1)}
          className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-paper/90 p-2.5 text-night opacity-0 shadow-md transition-all hover:bg-paper group-hover/stage:opacity-100 sm:right-4"
          aria-label="Next city"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Filmstrip */}
      <div
        ref={filmstripRef}
        className="filmstrip mt-4 flex gap-3 overflow-x-auto pb-2"
      >
        {cities.map((c, i) => (
          <button
            key={c.slug}
            data-city={c.slug}
            onClick={() => goTo(i)}
            className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border transition-all duration-300 ${
              i === index
                ? "border-clay ring-2 ring-clay"
                : "border-line opacity-70 hover:opacity-100"
            }`}
            aria-label={`Go to ${c.name}`}
          >
            <Image
              src={c.stock}
              alt={c.name}
              fill
              sizes="112px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night/70 to-transparent" />
            <span className="absolute bottom-1.5 left-2 right-2 truncate text-left text-[10px] font-medium text-paper">
              {c.name}
            </span>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && lightboxCity && lightboxPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-night/95 p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="relative max-h-[90vh] w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-12 right-0 z-20 rounded-full bg-paper/90 p-2 text-night shadow-md transition-colors hover:bg-paper"
                aria-label="Close"
              >
                <X size={20} />
              </button>
              {/* Enlarged polaroid — same white frame as the small cards */}
              <div className="relative rounded-lg bg-paper p-3 pb-16 shadow-2xl shadow-night/60 sm:p-4 sm:pb-20">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm">
                  <CloudImage
                    src={localPathToSupabasePath(lightboxPhoto.src)}
                    alt={lightboxPhoto.alt}
                    fill
                    className="object-contain"
                    objectFit="contain"
                    fallback={lightboxPhoto.src}
                  />
                </div>
                <div className="absolute bottom-4 left-0 right-0 text-center sm:bottom-6">
                  <p className="text-sm font-medium text-night">{lightboxPhoto.alt}</p>
                  <p className="mt-0.5 text-xs text-[#78716c]">
                    {lightboxCity.name} · {lightboxCity.region}
                  </p>
                </div>
              </div>
              {lightboxCity.photos.length > 1 && (
                <div className="mt-4 flex justify-center gap-3">
                  <button
                    onClick={() =>
                      setLightbox({
                        cityIdx: lightbox.cityIdx,
                        photoIdx:
                          (lightbox.photoIdx - 1 + lightboxCity.photos.length) %
                          lightboxCity.photos.length,
                      })
                    }
                    className="rounded-full bg-paper/90 p-2.5 text-night shadow-md transition-colors hover:bg-paper"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() =>
                      setLightbox({
                        cityIdx: lightbox.cityIdx,
                        photoIdx: (lightbox.photoIdx + 1) % lightboxCity.photos.length,
                      })
                    }
                    className="rounded-full bg-paper/90 p-2.5 text-night shadow-md transition-colors hover:bg-paper"
                    aria-label="Next photo"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes kenburns-zoom {
          from {
            transform: scale(1);
          }
          to {
            transform: scale(1.1);
          }
        }
        .kenburns {
          animation: kenburns-zoom ${SLIDE_DURATION + 1500}ms ease-out forwards;
        }
        @keyframes slide-progress-fill {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
        .slide-progress {
          animation: slide-progress-fill ${SLIDE_DURATION}ms linear forwards;
        }
        .filmstrip {
          scrollbar-width: thin;
          scrollbar-color: #d6d3cb transparent;
        }
      `}</style>
    </motion.div>
  );
}
