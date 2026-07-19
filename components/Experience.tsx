"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  MapPin,
  Briefcase,
  Code,
  Layers,
  GraduationCap,
  BookOpen,
  ChevronDown,
  Waves,
  Users,
  LifeBuoy,
  HeartHandshake,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

// Ordered oldest → newest; rendered left → right so the most recent sits on the right
const timeline = [
  {
    year: "Aug 2024 - May 2028",
    title: "Carnegie Mellon University",
    role: "B.S. in Computer Science",
    location: "Pittsburgh, PA",
    description:
      "B.S. in Computer Science with a concentration in Machine Learning.",
    icon: GraduationCap,
    logo: "/media/logos/cmu-wordmark.png",
  },
  {
    year: "2024 - Present",
    title: "CMU Varsity Swim Team",
    role: "NCAA Division III Athlete",
    location: "Pittsburgh, PA",
    description:
      "NCAA qualifier and school record holder (400 free relay) — 7th all-time at CMU in the 100 free, 4x Scholastic All-American.",
    icon: Trophy,
    logo: "/media/logos/ncaa.png",
  },
  {
    year: "Jan 2025 - Aug 2025",
    title: "Carnegie Mellon Scotty Labs",
    role: "Software Developer",
    location: "Pittsburgh, PA",
    description:
      "Improved UX on the open-source cmueats.com and shipped a dining review system used by 1,000+ students.",
    icon: Code,
    logo: "/media/logos/scotty-labs.png",
  },
  {
    year: "Jun 2025 - Aug 2025",
    title: "University of Alaska Anchorage AI Lab",
    role: "Software Engineering Intern",
    location: "Anchorage, AK",
    description:
      "Sole developer of a Whisper-powered accessibility app that converts live and uploaded audio to text for hearing-impaired users.",
    icon: Code,
    logo: "/media/logos/uaa.png",
  },
  {
    year: "Aug 2025 - May 2026",
    title: "Carnegie Mellon HCII",
    role: "Machine Learning Research Assistant",
    location: "Pittsburgh, PA",
    description:
      "Led software development for the AI Collaborative Learning research team — 18% faster LLM pipelines and a coauthored abstract accepted for full-paper submission.",
    icon: Code,
    logo: "/media/logos/cmu.jpg",
  },
  {
    year: "May 2026 - Present",
    title: "First Citizens Bank",
    role: "Software Engineering Intern",
    location: "Raleigh, NC",
    description:
      "Launched a self-service webhook onboarding console for enterprise bank clients, backed by a 9-endpoint REST API with OAuth-enforced data isolation.",
    icon: Briefcase,
    logo: "/media/logos/first-citizens.jpg",
  },
  {
    year: "Jun 2026 - Present",
    title: "Databricks",
    role: "Student Fellow",
    location: "San Francisco, CA",
    description:
      "1 of 37 selected for the inaugural Student Fellows cohort — exploring enterprise and agentic AI at the 2026 Data + AI Summit.",
    icon: Layers,
    logo: "/media/logos/databricks.png",
  },
];

const activities = [
  { icon: Waves, label: "CMU Varsity Swim and Dive" },
  { icon: Users, label: "Asian Students Association Mentor" },
  { icon: Layers, label: "Databricks Student Fellow" },
  { icon: LifeBuoy, label: "Volunteer Swim Coach" },
  { icon: HeartHandshake, label: "Special Olympics Volunteer" },
  { icon: Code, label: "Scotty Labs Student Developer" },
];

const courses = [
  { code: "15-112", name: "Fundamentals of Programming" },
  { code: "15-122", name: "Imperative Computation" },
  { code: "15-150", name: "Functional Programming" },
  { code: "15-151", name: "Mathematical Foundations for CS" },
  { code: "15-213", name: "Computer Systems" },
  { code: "15-251", name: "Theoretical Computer Science" },
  { code: "21-241", name: "Linear Transformations" },
  { code: "21-259", name: "Multivariable Calculus" },
  { code: "05-391", name: "Human Centered Software" },
];

function TimelineNode({
  item,
  index,
  isActive,
  onToggle,
}: {
  item: typeof timeline[0];
  index: number;
  isActive: boolean;
  onToggle: () => void;
}) {
  const Icon = item.icon;
  const [logoError, setLogoError] = useState(false);

  // Keep edge popovers inside the container on the single-row desktop layout
  const popoverPosition =
    index === 0
      ? "left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0"
      : index === timeline.length - 1
        ? "left-1/2 -translate-x-1/2 md:left-auto md:right-0 md:translate-x-0"
        : "left-1/2 -translate-x-1/2";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="group relative flex flex-col items-center px-2 text-center md:flex-1"
    >
      {/* Logo node on the line */}
      <button
        onClick={onToggle}
        aria-expanded={isActive}
        aria-label={`${item.title} details`}
        className={`relative z-10 flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border bg-paper p-1 shadow-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-md ${
          isActive ? "border-clay ring-2 ring-clay/30" : "border-line"
        }`}
      >
        {item.logo && !logoError ? (
          <span className="relative block h-full w-full overflow-hidden rounded-xl">
            <Image
              src={item.logo}
              alt={`${item.title} logo`}
              fill
              className="rounded-xl object-contain"
              onError={() => setLogoError(true)}
            />
          </span>
        ) : (
          <Icon className="text-clay" size={22} />
        )}
      </button>

      {/* Role + date */}
      <p className="mt-4 text-[11px] font-medium uppercase tracking-wide text-stone-400">
        {item.year}
      </p>
      <h3 className="mt-1 text-sm font-semibold leading-snug text-ink">
        {item.title}
      </h3>
      <p className="mt-0.5 text-xs font-medium text-clay">{item.role}</p>

      {/* Description popover — hover or click */}
      <div
        className={`pointer-events-none absolute top-full z-30 mt-2 w-56 rounded-2xl border border-line bg-white p-4 text-left shadow-xl transition-all duration-200 md:w-64 ${popoverPosition} ${
          isActive
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "translate-y-1 opacity-0 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100"
        }`}
      >
        <div className="mb-2 flex items-center gap-1.5 text-xs text-stone-500">
          <MapPin size={12} />
          <span>{item.location}</span>
        </div>
        <p className="text-[13px] leading-relaxed text-stone-600">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [coursesOpen, setCoursesOpen] = useState(false);

  return (
    <section id="experience" className="relative overflow-x-clip bg-cream px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 md:mb-14"
        >
          <span className="section-label">Experience</span>
          <h2 className="section-heading">Professional Experience</h2>
        </motion.div>

        {/* Horizontal timeline — oldest on the left, most recent on the right */}
        <div className="relative pb-36">
          {/* The line — through the center of the logo nodes (desktop) */}
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-line md:block" aria-hidden />
          <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-3 md:flex md:items-start">
            {timeline.map((item, index) => (
              <TimelineNode
                key={item.title}
                item={item}
                index={index}
                isActive={activeIndex === index}
                onToggle={() =>
                  setActiveIndex(activeIndex === index ? null : index)
                }
              />
            ))}
          </div>
        </div>

        {/* Leadership + courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-5"
        >
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink">
              Leadership &amp; Involvement
            </h4>
            <div className="flex flex-nowrap gap-2 overflow-x-auto pb-1">
              {activities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <span
                    key={activity.label}
                    className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-white px-2.5 py-1 text-[11px] text-stone-600 transition-colors hover:border-clay/40"
                  >
                    <Icon size={11} className="shrink-0 text-clay" />
                    {activity.label}
                  </span>
                );
              })}
            </div>
          </div>

          <div>
            <button
              onClick={() => setCoursesOpen(!coursesOpen)}
              aria-expanded={coursesOpen}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-clay hover:text-clay"
            >
              <BookOpen size={14} />
              Relevant Courses
              <ChevronDown
                size={14}
                className={`transition-transform duration-300 ${
                  coursesOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence initial={false}>
              {coursesOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="grid gap-2 pt-3 sm:grid-cols-2 lg:grid-cols-3">
                    {courses.map((course) => (
                      <span
                        key={course.code}
                        className="flex items-center gap-2.5 rounded-xl border border-line bg-white px-3 py-2 text-xs text-stone-600 transition-colors hover:border-clay/40"
                      >
                        <span className="w-12 shrink-0 font-medium tabular-nums text-clay">
                          {course.code}
                        </span>
                        <span className="truncate">{course.name}</span>
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
