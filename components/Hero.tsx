"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import CloudImage from "./CloudImage";
import { usePortraitMobile } from "@/hooks/usePortraitMobile";

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
  const [currentTime, setCurrentTime] = useState("");
  const isPortraitMobile = usePortraitMobile();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = 1.0;
    const play = () => video.play().catch(() => {});
    play();
    video.addEventListener("loadeddata", play);
    return () => video.removeEventListener("loadeddata", play);
  }, []);

  useEffect(() => {
    const formatTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      setCurrentTime(`${hours > 12 ? hours - 12 : hours || 12}:${minutes.toString().padStart(2, "0")}`);
    };
    formatTime();
    const interval = setInterval(formatTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const phoneScreenContent = (
    <div className={`absolute overflow-hidden bg-black ${isPortraitMobile ? "inset-0.5 sm:inset-1 rounded-[1.25rem] sm:rounded-[1.5rem]" : "inset-1.5 sm:inset-2 md:inset-2.5 rounded-[1.625rem] sm:rounded-[2rem] md:rounded-[2.375rem]"}`}>
      {isPortraitMobile ? (
        <div className="absolute inset-0 bg-white rounded-[1.125rem] sm:rounded-[1.25rem]" aria-hidden />
      ) : (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full min-w-0 min-h-0 object-cover object-center brightness-110 contrast-105"
          style={{ width: "100%", height: "100%" }}
          preload="auto"
        >
          <source src="/media/swim-video.mp4" type="video/mp4" />
        </video>
      )}
      {/* Notch (camera) - always visible; clean minimal pill in portrait */}
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 bg-black z-20 ${isPortraitMobile ? "w-[18%] min-w-[16px] h-1 sm:h-1.5 rounded-full" : "w-[36%] min-w-[28px] h-3.5 sm:h-4 md:h-5 rounded-b-xl sm:rounded-b-2xl"}`}
        aria-hidden
      />
      {!isPortraitMobile && (
        <div className="absolute top-1 sm:top-1.5 md:top-2 left-1 sm:left-1.5 md:left-2 right-1 sm:right-1.5 md:right-2 z-10 flex flex-row items-center pointer-events-none">
            <div className="flex-1 flex justify-start min-w-0">
              <span className="text-white text-[10px] sm:text-xs md:text-sm font-semibold tabular-nums leading-none ml-3">
                {currentTime}
              </span>
            </div>
            <div className="w-[36%] min-w-[28px] max-w-[80px] shrink-0" aria-hidden />
            <div className="flex-1 flex flex-row items-center justify-end gap-1 sm:gap-1.5 pl-1 min-w-0 pr-0.5">
              <img
                src="/icons/cellular-bars.png"
                alt=""
                className="h-[12px] sm:h-3.5 md:h-4 w-auto shrink-0 object-contain"
                style={{ mixBlendMode: "lighten", maxWidth: "14px" }}
                aria-hidden
              />
              <img
                src="/icons/wifi-icon.png"
                alt=""
                className="h-[18px] sm:h-5 md:h-6 w-[18px] sm:w-5 md:w-6 shrink-0 object-contain aspect-square"
                style={{ filter: "brightness(0) invert(1)" }}
                aria-hidden
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 12"
                className="h-[14px] sm:h-4 md:h-5 w-[18px] sm:w-5 md:w-6 shrink-0"
                aria-hidden
              >
                <rect x="1" y="2.5" width="14" height="7" rx="1.8" ry="1.8" fill="white" />
                <rect x="15" y="3.5" width="2" height="5" rx="0.9" ry="0.9" fill="white" />
                <rect x="2.2" y="3.5" width="11.6" height="5" rx="1.4" ry="1.4" fill="white" />
              </svg>
            </div>
          </div>
      )}
    </div>
  );

  return (
    <section className="relative min-h-0 sm:min-h-screen flex items-center justify-center overflow-hidden bg-[#faf8f4] pt-16 sm:pt-14 py-2 sm:py-4">
      {/* Grid Background */}
      <div className="absolute inset-0 grid-pattern opacity-20 z-0" />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-2 gap-2 sm:gap-4 md:gap-6 lg:gap-12 items-center justify-items-center min-w-0">
          {/* Left - Headshot and Name (always left column on mobile + desktop) */}
          <div className="flex flex-col items-center justify-center min-w-0 w-full">
            {/* Headshot - proportions preserved (1:1 circle) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-0.5 sm:mb-2 md:mb-3 shrink-0"
            >
              <div className="relative w-14 h-14 min-[380px]:w-16 min-[380px]:h-16 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 rounded-full overflow-hidden border-2 border-gray-200 shadow-lg aspect-square">
                <CloudImage
                  src="headshot.PNG"
                  alt="Todd Dong"
                  fill
                  className="object-cover scale-[1.7]"
                  priority
                  objectFit="cover"
                  objectPosition="92% 48%"
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
              className="text-sm sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-0.5 sm:mb-2 md:mb-3 text-gray-900 text-center min-w-0 break-words"
            >
              <TypingText text="Todd Dong" speed={150} delay={0} />
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-[10px] sm:text-sm md:text-base lg:text-lg text-gray-600 text-center min-w-0 break-words line-clamp-2"
            >
              <TypingText text="Computer Science @ Carnegie Mellon" speed={80} delay={1500} />
            </motion.p>
          </div>

          {/* Right - Phone (portrait: arrows + rotating phone + message; else phone only) */}
          {isPortraitMobile ? (
            <div className="flex flex-col items-center gap-2 sm:gap-3 w-full min-w-0 justify-self-center">
              <div className="flex flex-row items-center justify-center gap-3 sm:gap-4">
                {/* Left: curved arrow high to low (parallel to left side of phone) */}
                <div className="shrink-0 flex items-center text-gray-500" aria-hidden>
                  <svg viewBox="0 0 16 48" className="w-4 h-12 sm:w-5 sm:h-14 md:w-6 md:h-16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 4 Q2 24 8 44" />
                    <path d="M8 44 L5 38 M8 44 L11 38" />
                  </svg>
                </div>
                <motion.div
                  animate={{ rotate: [0, -90, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                  className="shrink-0 w-full max-w-[70px] min-[400px]:max-w-[90px] sm:max-w-[140px] md:max-w-[200px] min-w-0 aspect-[9/16]"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative w-full h-full rounded-[1.25rem] sm:rounded-[1.5rem] md:rounded-[2rem] bg-black p-0.5 sm:p-1 shadow-[0_0_0_2px_rgba(0,0,0,0.1),0_25px_50px_-12px_rgba(0,0,0,0.25)]"
                  >
                    {phoneScreenContent}
                  </motion.div>
                </motion.div>
                {/* Right: curved arrow low to high (parallel to right side of phone) */}
                <div className="shrink-0 flex items-center text-gray-500" aria-hidden>
                  <svg viewBox="0 0 16 48" className="w-4 h-12 sm:w-5 sm:h-14 md:w-6 md:h-16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 44 Q14 24 8 4" />
                    <path d="M8 4 L5 10 M8 4 L11 10" />
                  </svg>
                </div>
              </div>
              <p className="text-gray-600 text-center text-xs sm:text-sm font-medium px-2">
                Recommended to view in landscape mode
              </p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-[70px] min-[400px]:max-w-[90px] sm:max-w-[140px] md:max-w-[200px] lg:max-w-[260px] xl:max-w-[320px] min-w-0 aspect-[9/16] rounded-[1.5rem] sm:rounded-[2.5rem] md:rounded-[3rem] bg-black p-1 sm:p-2 md:p-2.5 shadow-[0_0_0_2px_rgba(0,0,0,0.1),0_25px_50px_-12px_rgba(0,0,0,0.25)] justify-self-center"
            >
              {phoneScreenContent}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

