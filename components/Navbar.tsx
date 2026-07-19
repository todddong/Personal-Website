"use client";

import { motion, useScroll, useSpring, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import AccentPicker from "./AccentPicker";

const navItems = [
  { label: "about", href: "#about" },
  { label: "experience", href: "#experience" },
  { label: "projects", href: "#projects" },
  { label: "places", href: "#places" },
  { label: "gallery", href: "#gallery" },
  { label: "contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 24);
  });

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? "border-b border-line bg-cream/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="flex h-16 items-center justify-between">
          {/* Wordmark */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setIsMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="font-serif text-lg tracking-tight text-ink transition-colors hover:text-clay"
          >
            todd dong
          </a>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className="text-sm text-stone-600 transition-colors hover:text-clay"
              >
                {item.label}
              </a>
            ))}
            <div className="flex items-center gap-2">
              <AccentPicker />
              <button
                onClick={toggleTheme}
                className="rounded-full border border-line p-2 text-stone-600 transition-colors hover:border-clay hover:text-clay"
                aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
              >
                {isDark ? <Sun size={15} /> : <Moon size={15} />}
              </button>
            </div>
          </div>

          {/* Mobile: accent picker + theme toggle + menu button */}
          <div className="flex items-center gap-1 md:hidden">
            <AccentPicker />
            <button
              onClick={toggleTheme}
              className="p-2 text-stone-600 transition-colors hover:text-clay"
              aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-stone-600 transition-colors hover:text-ink"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-line md:hidden"
            >
              <div className="flex flex-col py-3">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleClick(e, item.href)}
                    className="px-2 py-2.5 text-sm text-stone-600 transition-colors hover:text-clay"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll progress */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-clay/70"
        style={{ scaleX: progress }}
        aria-hidden
      />
    </motion.nav>
  );
}
