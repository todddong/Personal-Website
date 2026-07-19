"use client";

import { motion } from "framer-motion";
import { FileDown, Github, Linkedin } from "lucide-react";
import Image from "next/image";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

// Hero album — swap these entries for the photos you want featured.
const heroPhotos = [
  { src: "/media/general/hero-databricks.jpg", alt: "Databricks Data + AI Summit", rotation: -5, position: "center 35%" },
  { src: "/media/general/hero-ny.jpg", alt: "New York", rotation: 4, position: "center" },
  { src: "/media/general/hero-ncaa.jpg", alt: "NCAA championships", rotation: 3, position: "center" },
  { src: "/media/general/hero-friends.jpg", alt: "Friends", rotation: -4, position: "center" },
];

function HeroAlbum() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative mx-auto w-full max-w-[300px] sm:max-w-[360px] lg:max-w-[400px]"
    >
      {/* Ambient glow behind the album */}
      <div
        className="absolute -inset-8 rounded-[3rem] bg-clay/15 blur-3xl dark:bg-clay/[0.06]"
        aria-hidden
      />

      <div className="relative grid grid-cols-2">
        {heroPhotos.map((photo, i) => (
          <motion.div
            key={photo.src}
            initial={{ opacity: 0, y: 24, rotate: photo.rotation * 1.6 }}
            animate={{ opacity: 1, y: 0, rotate: photo.rotation }}
            whileHover={{ rotate: 0, scale: 1.05, zIndex: 20 }}
            transition={{ duration: 0.5, delay: 0.4 + i * 0.12, ease: "easeOut" }}
            className={`relative rounded-md bg-paper p-2 pb-8 shadow-xl shadow-night/25 ${
              i % 2 === 1 ? "z-10 -ml-3 mt-10" : "-mr-3"
            } ${i > 1 ? "-mt-8" : ""}`}
          >
            <div className="relative aspect-square overflow-hidden rounded-sm">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="200px"
                style={{ objectPosition: photo.position }}
                className="object-cover"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section id="about" className="relative flex min-h-screen items-center overflow-hidden bg-cream px-6 pb-16 pt-28 md:px-10 lg:pt-24">
      {/* Ambient warm gradient wash */}
      <div
        className="pointer-events-none absolute -top-32 right-[-15%] h-[480px] w-[480px] rounded-full bg-clay/[0.07] blur-3xl dark:bg-clay/[0.02]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-[-20%] left-[-10%] h-[420px] w-[420px] rounded-full bg-[#d4c5a9]/20 blur-3xl dark:bg-transparent"
        aria-hidden
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
        {/* Left — introduction */}
        <div>
          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-7 font-serif text-3xl leading-[1.18] tracking-tight text-ink sm:text-4xl md:text-5xl"
          >
            Varsity Swimmer
            <br />
            Computer Science Student
            <br />
            <span className="text-cmu">Carnegie Mellon University</span>
          </motion.h1>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-10 max-w-xl text-lg leading-relaxed text-stone-600"
          >
            I&apos;m a rising junior studying computer science at Carnegie
            Mellon and a NCAA qualifier on the varsity swim team. Being a
            student athlete has made me more disciplined, improved my time
            management skills, and shaped me to be a better leader and
            teammate. My career interest is software engineering and in my
            free time I like to read, walk, and try new foods!
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="flex flex-wrap items-center gap-3"
          >
            <a
              href="https://github.com/todddong"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white/50 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-clay hover:text-clay"
            >
              <Github size={16} />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/todd-dong-795732324"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white/50 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-clay hover:text-clay"
            >
              <Linkedin size={16} />
              LinkedIn
            </a>
            <a
              href="/Todd-Dong-Resume.pdf"
              download="Todd Dong Resume.pdf"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white/50 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-clay hover:text-clay"
            >
              <FileDown size={16} />
              Resume
            </a>
          </motion.div>
        </div>

        {/* Right — staggered photo album */}
        <HeroAlbum />
      </div>
    </section>
  );
}
