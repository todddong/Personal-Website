"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Palette } from "lucide-react";

// Candidate accents to pair with Carnegie Red (#C41230). Orange (Clay) is the default.
const accents = [
  { name: "Clay", hex: "#d97757", rgb: "217 119 87", darkRgb: "201 100 66" },
  { name: "Gold", hex: "#d9a441", rgb: "217 164 65", darkRgb: "192 143 46" },
  { name: "Steel Blue", hex: "#4a6fa5", rgb: "74 111 165", darkRgb: "61 93 140" },
  { name: "Forest", hex: "#4f7a5a", rgb: "79 122 90", darkRgb: "65 101 73" },
  { name: "Purple", hex: "#8b5cf6", rgb: "139 92 246", darkRgb: "124 76 224" },
  { name: "Warm Gray", hex: "#8a837b", rgb: "138 131 123", darkRgb: "116 110 102" },
  { name: "Carnegie Red", hex: "#C41230", rgb: "196 18 48", darkRgb: "163 15 40" },
];

export default function AccentPicker() {
  const [active, setActive] = useState(accents[0].name);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("accent");
      const found = accents.find((a) => a.name === saved);
      if (found) apply(found, false);
    } catch {}
  }, []);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const apply = (accent: typeof accents[0], persist = true) => {
    document.documentElement.style.setProperty("--c-clay", accent.rgb);
    document.documentElement.style.setProperty("--c-clay-dark", accent.darkRgb);
    setActive(accent.name);
    if (persist) {
      try {
        localStorage.setItem("accent", accent.name);
      } catch {}
    }
  };

  const activeAccent = accents.find((a) => a.name === active) ?? accents[0];

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Choose accent color"
        title="Accent color"
        className="rounded-full border border-line p-2 text-stone-600 transition-colors hover:border-clay hover:text-clay"
      >
        <Palette size={15} style={{ color: isOpen ? activeAccent.hex : undefined }} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full z-50 mt-2 flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-2 shadow-lg"
          >
            {accents.map((accent) => (
              <button
                key={accent.name}
                onClick={() => apply(accent)}
                title={accent.name}
                aria-label={`Accent: ${accent.name}`}
                className={`h-5 w-5 rounded-full border-2 transition-transform hover:scale-110 ${
                  active === accent.name ? "border-ink" : "border-transparent"
                }`}
                style={{ backgroundColor: accent.hex }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
