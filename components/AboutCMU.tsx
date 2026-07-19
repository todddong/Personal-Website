"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  MapPin,
  Calendar,
  Waves,
  Users,
  Layers,
  LifeBuoy,
  HeartHandshake,
  Code,
} from "lucide-react";

const rankings = [
  { rank: "#1", label: "CS Program" },
  { rank: "#2", label: "Artificial Intelligence" },
  { rank: "#1", label: "Software Engineering" },
  { rank: "#1", label: "Cybersecurity" },
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

const activities = [
  { icon: Waves, label: "CMU Varsity Swim and Dive" },
  { icon: Users, label: "Asian Students Association Mentor" },
  { icon: Layers, label: "Databricks Student Fellow" },
  { icon: LifeBuoy, label: "Volunteer Swim Coach" },
  { icon: HeartHandshake, label: "Special Olympics Volunteer" },
  { icon: Code, label: "Scotty Labs Student Developer" },
];

export default function AboutCMU() {
  return (
    <section id="education" className="relative bg-cream px-6 pb-12 pt-16 md:px-10 md:pb-14 md:pt-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 md:mb-10"
        >
          <span className="section-label">Education</span>
          <h2 className="mt-3 font-serif text-4xl tracking-tight text-cmu text-balance md:text-5xl">
            Carnegie Mellon University
          </h2>
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-stone-600">
            <span className="font-medium text-ink">
              B.S. in Computer Science · Machine Learning Concentration
            </span>
            <span className="flex items-center gap-1.5 text-stone-500">
              <Calendar size={14} className="text-clay" />
              Aug 2024 - May 2028
            </span>
            <span className="flex items-center gap-1.5 text-stone-500">
              <MapPin size={14} className="text-clay" />
              Pittsburgh, PA
            </span>
          </div>
        </motion.div>

        <div className="grid items-start gap-8 md:grid-cols-[1fr_1.4fr] lg:gap-12">
          {/* Photo + rankings */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-3"
          >
            <div className="group relative h-[180px] overflow-hidden rounded-2xl border border-line shadow-sm sm:h-[220px] md:h-[230px]">
              <Image
                src="/media/cmu-about.jpg"
                alt="Carnegie Mellon University"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Rankings — compact strip */}
            <div className="grid grid-cols-4 gap-2">
              {rankings.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                  className="rounded-xl border border-line bg-white p-2.5 text-center"
                >
                  <p className="font-serif text-lg leading-none text-clay">
                    {item.rank}
                  </p>
                  <p className="mt-1 text-[10px] leading-tight text-stone-600">
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Courses + involvement */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-6"
          >
            <div>
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink">
                Relevant Courses
              </h4>
              <div className="flex flex-wrap gap-2">
                {courses.map((course, index) => (
                  <motion.span
                    key={course.code}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-xs text-stone-600 transition-colors hover:border-clay/40"
                  >
                    <span className="font-medium tabular-nums text-clay">
                      {course.code}
                    </span>
                    {course.name}
                  </motion.span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink">
                Leadership &amp; Involvement
              </h4>
              <div className="flex flex-wrap gap-2">
                {activities.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <motion.span
                      key={activity.label}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.04 }}
                      className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-xs text-stone-600 transition-colors hover:border-clay/40"
                    >
                      <Icon size={12} className="shrink-0 text-clay" />
                      {activity.label}
                    </motion.span>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
