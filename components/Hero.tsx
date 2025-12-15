"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.0; // Normal playback speed
    }
  }, []);

  return (
    <section className="relative h-screen flex overflow-hidden">
      {/* Grid Background - Only on left side */}
      <div className="absolute left-0 top-0 bottom-0 w-1/2 grid-pattern opacity-30 z-0" />
      
      {/* Left Side - Content */}
      <div className="relative z-10 w-1/2 flex flex-col items-center justify-center px-8 md:px-12">
        {/* Headshot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-gray-700/50 shadow-2xl">
            <Image
              src="/media/headshot.PNG"
              alt="Todd Dong"
              fill
              className="object-cover scale-150"
              priority
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-4 gradient-text text-center"
        >
          Todd Dong
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-300 mb-2 text-center"
        >
          Computer Science @ Carnegie Mellon
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base md:text-lg text-gray-400 font-light text-center"
        >
          Machine Learning Research Assistant • Student Athlete • Incoming Software Engineering Intern at First Citizens Bank
        </motion.p>
      </div>

      {/* Right Side - Video */}
      <div className="relative w-1/2 z-10 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          preload="auto"
        >
          <source src="/media/swim-video.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}

