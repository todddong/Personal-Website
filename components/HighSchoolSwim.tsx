"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Award } from "lucide-react";

const achievements = [
  "First Place — CMU x Databricks x UN Datathon 2026",
  "CMU Top 10 all time (7th, 100 free)",
  "School Record Holder (400 free relay)",
  "USA Swimming Scholastic All American (4x)",
  "CMU Conference Team",
  "National Latin Exam Gold",
  "Cum Laude Society",
  "AP Scholar with Distinction",
];

export default function HighSchoolSwim() {
  return (
    <section id="awards" className="relative bg-sand px-6 pb-16 pt-10 md:px-10 md:pb-20 md:pt-12">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 md:mb-10"
        >
          <span className="section-label">Recognition</span>
          <h2 className="section-heading">Awards &amp; accolades</h2>
        </motion.div>

        <div className="grid items-center gap-8 md:grid-cols-[1fr_1.4fr] lg:gap-12">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="group relative h-[180px] overflow-hidden rounded-2xl border border-line shadow-sm sm:h-[220px] md:h-[250px]"
          >
            <Image
              src="/media/highlights/highschool-highlights.jpg"
              alt="Swimming highlights"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="grid gap-2 sm:grid-cols-2"
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
                className="flex items-center gap-2.5 rounded-xl border border-line bg-white px-3 py-2"
              >
                <Award size={13} className="shrink-0 text-clay" />
                <span className="text-[13px] leading-snug text-stone-700">
                  {achievement}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
