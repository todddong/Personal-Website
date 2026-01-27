"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

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
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white py-16">
      {/* Grid Background */}
      <div className="absolute inset-0 grid-pattern opacity-20 z-0" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-8 md:px-12">
        {/* Headshot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-gray-200 shadow-lg">
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
          className="text-4xl md:text-5xl font-bold mb-3 text-gray-900 text-center"
        >
          <TypingText text="Todd Dong" speed={150} delay={0} />
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-base md:text-lg text-gray-600 mb-1 text-center"
        >
          <TypingText text="Computer Science @ Carnegie Mellon" speed={80} delay={1500} />
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-sm md:text-base text-gray-500 font-light text-center"
        >
          <TypingText text="Machine Learning Research Assistant • Student Athlete • Incoming Software Engineering Intern at First Citizens Bank" speed={50} delay={4500} />
        </motion.p>

        {/* Circular Video - Small and Centered */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.5 }}
          transition={{ duration: 0.8 }}
          className="mt-8 relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
        >
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
        </motion.div>
      </div>
    </section>
  );
}

