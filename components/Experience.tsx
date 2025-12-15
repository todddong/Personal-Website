"use client";

import { motion } from "framer-motion";
import { GraduationCap, Trophy, MapPin, Briefcase, Code } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const timeline = [
  {
    year: "2024 - Present",
    title: "Carnegie Mellon University",
    role: "Bachelor of Science in Computer Science, ML Concentration",
    location: "Pittsburgh, PA",
    description: "Expected May 2027. Extracurriculars: CMU Varsity Swim and Dive, Volunteer swim lessons coach, Asian Student Association, ScottyLabs, HackCMU.",
    icon: GraduationCap,
    logo: "/media/logos/cmu.jpg",
  },
  {
    year: "2024 - Present",
    title: "CMU Varsity Swim Team",
    role: "Division III Athlete",
    location: "Pittsburgh, PA",
    description: "Competing at the Division III varsity level. Achievements: CMU Top 10 all time (7th, 100 free), School Record Holder (400 free relay), USA Swimming Scholastic All American (4x), CMU Conference Team.",
    icon: Trophy,
    logo: "/media/logos/cmu.jpg",
  },
  {
    year: "Jun 2025 - Aug 2025",
    title: "University of Alaska Anchorage AI Lab",
    role: "Software Engineering Intern",
    location: "Anchorage, AK",
    description: "Led project as the sole software developer for a user-friendly text assist application for individuals with hearing-impairments. Implemented OpenAI Whisper for high accuracy speech recognition to convert live audio and uploaded mp3 files to text. Deployed full stack solution combining speech to text, LLMs, and user database system using Django framework.",
    icon: Code,
    logo: "/media/logos/uaa.png",
  },
  {
    year: "Aug 2025 - Present",
    title: "Carnegie Mellon Human Computer Interaction Institute",
    role: "Machine Learning Research Assistant",
    location: "Pittsburgh, PA",
    description: "Replicated, extended, and optimized ML pipelines for AI Collaborative Learning, improving reliability and scalability. Cleaned up, optimized, and documented over 50% of previous existing codebase increasing runtime efficiency by 18%. Recreated and hand documented 1,000+ test results to ensure cross-run consistency and improve model benchmarking.",
    icon: Code,
    logo: "/media/logos/cmu.jpg",
  },
  {
    year: "2026",
    title: "First Citizens Bank",
    role: "Incoming Software Engineering Intern",
    location: "Raleigh, NC",
    description: "Upcoming software engineering internship at First Citizens Bank.",
    icon: Briefcase,
    logo: "/media/logos/first-citizens.jpg",
  },
];

function TimelineItem({ item, index }: { item: typeof timeline[0]; index: number }) {
  const Icon = item.icon;
  const [logoError, setLogoError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative pl-20"
    >
      {/* Icon - Always show original icon */}
      <div className="absolute left-0 top-0 w-16 h-16 bg-gray-900 border-2 border-gray-800 rounded-full flex items-center justify-center z-10">
        <Icon className="text-blue-400" size={24} />
      </div>

      {/* Content */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-all">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-xl font-semibold text-white mb-1">{item.title}</h3>
            <p className="text-blue-400 text-sm mb-2">{item.role}</p>
          </div>
          <div className="flex flex-col items-end ml-4">
            <span className="text-gray-500 text-sm whitespace-nowrap mb-2">
              {item.year}
            </span>
            {/* Logo under the date */}
            {item.logo && !logoError && (
              <div className="relative w-16 h-16 bg-white rounded-lg p-1.5 border border-gray-700 overflow-hidden">
                <Image
                  src={item.logo}
                  alt={`${item.title} logo`}
                  fill
                  className="object-contain"
                  onError={() => setLogoError(true)}
                />
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
          <MapPin size={14} />
          <span>{item.location}</span>
        </div>
        
        <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-4 md:px-8 relative bg-gradient-to-b from-transparent to-gray-900/30">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold mb-16 text-center"
        >
          Experience
        </motion.h2>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-800" />

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <TimelineItem key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

