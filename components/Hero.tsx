"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import CloudImage from "./CloudImage";

function TypingText({ text, speed = 100, delay = 0 }: { text: string; speed?: number; delay?: number }) {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [isTyping, setIsTyping] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (delay > 0 && !hasStarted) {
      const delayTimeout = setTimeout(() => {
        setHasStarted(true);
      }, delay);
      return () => clearTimeout(delayTimeout);
    } else if (delay === 0) {
      setHasStarted(true);
    }
  }, [delay, hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [text, speed, hasStarted]);

  // Cursor only visible during typing
  useEffect(() => {
    if (isTyping && hasStarted) {
      // Keep cursor visible during typing
      setShowCursor(true);
    } else if (!isTyping && hasStarted) {
      // Hide cursor after typing is complete
      setShowCursor(false);
    }
  }, [isTyping, hasStarted]);

  return (
    <span>
      {displayedText}
      {hasStarted && isTyping && (
        <span className="text-gray-900">|</span>
      )}
    </span>
  );
}

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.0; // Normal playback speed
    }
  }, []);

  return (
    <section className="relative min-h-0 sm:min-h-screen flex items-center justify-center overflow-hidden bg-[#faf8f4] pt-16 sm:pt-14 py-2 sm:py-4">
      {/* Grid Background */}
      <div className="absolute inset-0 grid-pattern opacity-20 z-0" />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-1 sm:px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-3 gap-1 sm:gap-4 md:gap-6 lg:gap-12 items-center justify-items-stretch">
          {/* Left Side - Two Logos */}
          <div className="flex flex-col items-center justify-center">
            {/* CS Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative w-20 h-20 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-60 lg:h-60 xl:w-64 xl:h-64 rounded-lg overflow-hidden border-2 border-gray-200 shadow-md">
                <CloudImage
                  src="alaska/cs logo.png"
                  alt="CS Logo"
                  fill
                  className="object-cover"
                  priority
                  objectFit="cover"
                  quality={90}
                  sizes="(max-width: 640px) 80px, (max-width: 1024px) 160px, 256px"
                  fallback="/media/alaska/cs logo.png"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
            </motion.div>
            
            {/* X separator - centered between logos */}
            <div className="flex items-center justify-center my-0.5 sm:my-2">
              <div className="text-gray-400 text-sm sm:text-lg md:text-xl lg:text-2xl font-light">×</div>
            </div>
            
            {/* CMU Swim Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative w-20 h-20 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-60 lg:h-60 xl:w-64 xl:h-64 rounded-lg overflow-hidden border-2 border-gray-200 shadow-md">
                <CloudImage
                  src="alaska/cmu swim logo.webp"
                  alt="CMU Swim Logo"
                  fill
                  className="object-cover"
                  priority
                  objectFit="cover"
                  quality={90}
                  sizes="(max-width: 640px) 80px, (max-width: 1024px) 160px, 256px"
                  fallback="/media/alaska/cmu swim logo.webp"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
            </motion.div>
          </div>

          {/* Middle - Headshot and Name */}
          <div className="flex flex-col items-center justify-center">
            {/* Headshot */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-0.5 sm:mb-2 md:mb-3"
            >
              <div className="relative w-20 h-20 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 rounded-full overflow-hidden border-2 border-gray-200 shadow-lg">
                <CloudImage
                  src="headshot.PNG"
                  alt="Todd Dong"
                  fill
                  className="object-cover scale-150"
                  priority
                  objectFit="cover"
                  quality={90}
                  sizes="(max-width: 640px) 80px, (max-width: 1024px) 160px, 224px"
                  fallback="/media/headshot.PNG"
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
              className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-0.5 sm:mb-2 md:mb-3 text-gray-900 text-center"
            >
              <TypingText text="Todd Dong" speed={150} delay={0} />
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 text-center"
            >
              <TypingText text="Computer Science @ Carnegie Mellon" speed={80} delay={1500} />
            </motion.p>
          </div>

          {/* Right Side - Video in Rounded Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-full max-w-[60px] sm:max-w-[80px] md:max-w-[120px] lg:max-w-[160px] xl:max-w-xs ml-auto aspect-[9/16] rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden border-2 sm:border-3 md:border-4 border-gray-300 shadow-lg sm:shadow-xl md:shadow-2xl"
          >
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: 'center center' }}
              preload="auto"
            >
              <source src="/media/swim-video.mp4" type="video/mp4" />
            </video>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

