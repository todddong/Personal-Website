"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Trophy, Award } from "lucide-react";

const achievements = [
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
    <section id="awards" className="py-24 px-4 md:px-8 relative bg-gradient-to-b from-transparent to-gray-900/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Awards & Accolades
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Recognition and achievements across academics, athletics, and leadership
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] rounded-lg overflow-hidden border border-gray-800 group"
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
            <div className="flex items-center gap-3 mb-6">
              <Trophy className="text-blue-400" size={32} />
              <h3 className="text-2xl font-semibold text-white">Awards & Recognition</h3>
            </div>
            
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-3 p-3 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-gray-700 transition-all"
                >
                  <Award className="text-blue-400 mt-0.5 flex-shrink-0" size={18} />
                  <span className="text-gray-300">{achievement}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

