"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Trophy, Award } from "lucide-react";

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
    <section id="awards" className="py-8 px-4 md:px-8 relative bg-[#faf8f4] border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xl md:text-2xl font-normal mb-6 text-left text-[#93C572]"
        >
          awards & accolades
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[300px] rounded-2xl overflow-hidden border-2 border-gray-300 group shadow-sm"
          >
            <Image
              src="/media/highlights/highschool-highlights.jpg"
              alt="High School Highlights"
              fill
              className="object-cover transition-all duration-700 group-hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = `
                    <div class="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-blue-900/20 flex items-center justify-center">
                      <div class="text-center text-gray-500">
                        <p class="text-sm mb-2">High School Photo</p>
                        <p class="text-xs">Add highschool-highlights.jpg to public/media/highlights folder</p>
                      </div>
                    </div>
                  `;
                }
              }}
            />
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="text-[#93C572]" size={24} />
              <h3 className="text-lg font-semibold text-gray-900">Awards & Recognition</h3>
            </div>
            
            <div className="space-y-2">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-2 p-2 bg-gray-50 border-2 border-gray-300 rounded-xl hover:border-gray-400 transition-all shadow-sm"
                >
                  <Award className="text-[#93C572] mt-0.5 flex-shrink-0" size={14} />
                  <span className="text-gray-700 text-sm">{achievement}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

