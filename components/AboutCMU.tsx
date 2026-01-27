"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { GraduationCap, MapPin, Calendar, Award, TrendingUp } from "lucide-react";

export default function AboutCMU() {
  return (
    <section id="about-cmu" className="py-12 px-4 md:px-8 relative bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-[#93C572]">
            About Carnegie Mellon
          </h2>
          <p className="text-gray-500 text-sm max-w-2xl mx-auto">
            My journey at one of the world&apos;s leading computer science programs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[300px] rounded-2xl overflow-hidden border-2 border-gray-300 group order-2 md:order-1 shadow-sm"
          >
            <Image
              src="/media/cmu-about.jpg"
              alt="Carnegie Mellon University"
              fill
              className="object-cover transition-all duration-700 group-hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = `
                    <div class="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-red-900/20 flex items-center justify-center">
                      <div class="text-center text-gray-500">
                        <p class="text-sm mb-2">CMU Photo</p>
                        <p class="text-xs">Add cmu-about.jpg to public/media folder</p>
                      </div>
                    </div>
                  `;
                }
              }}
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 order-1 md:order-2"
          >
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="text-[#93C572]" size={24} />
              <h3 className="text-xl font-semibold text-gray-900">Carnegie Mellon University</h3>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <Calendar className="text-[#93C572]" size={16} />
                <span>Expected Graduation: May 2027</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <MapPin className="text-[#93C572]" size={16} />
                <span>Pittsburgh, Pennsylvania</span>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-200">
              <h4 className="text-base font-semibold text-gray-900 mb-2">Degree Program</h4>
              <p className="text-gray-600 text-sm mb-3">
                Bachelor of Science in Computer Science with concentration in Machine Learning
              </p>
            </div>

            <div className="pt-3 border-t border-gray-200">
              <h4 className="text-base font-semibold text-gray-900 mb-2">Relevant Courses</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "Fundamentals of Programming",
                  "Imperative Computation",
                  "Mathematical Foundations for Computer Science",
                  "Functional Programming",
                  "Computer Systems",
                  "Linear Transformations",
                ].map((course, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full border border-gray-200"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-gray-200">
              <h4 className="text-base font-semibold text-gray-900 mb-2">Extracurriculars</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "CMU Varsity Swim and Dive",
                  "Volunteer Swim Coach",
                  "Asian Student Association",
                  "ScottyLabs",
                  "HackCMU",
                ].map((activity, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full border border-gray-200"
                  >
                    {activity}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Statistics Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="text-center p-4 bg-gray-50 border-2 border-gray-300 rounded-2xl hover:border-gray-400 transition-all shadow-sm">
            <Award className="text-[#93C572] mx-auto mb-2" size={24} />
            <div className="text-2xl md:text-3xl font-bold text-[#93C572] mb-1">#1</div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">CS Ranking</div>
          </div>
          <div className="text-center p-4 bg-gray-50 border-2 border-gray-300 rounded-2xl hover:border-gray-400 transition-all shadow-sm">
            <TrendingUp className="text-[#93C572] mx-auto mb-2" size={24} />
            <div className="text-2xl md:text-3xl font-bold text-[#93C572] mb-1">#2</div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">AI Ranking</div>
          </div>
          <div className="text-center p-4 bg-gray-50 border-2 border-gray-300 rounded-2xl hover:border-gray-400 transition-all shadow-sm">
            <GraduationCap className="text-[#93C572] mx-auto mb-2" size={24} />
            <div className="text-2xl md:text-3xl font-bold text-[#93C572] mb-1">#1</div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">Software Engineering</div>
          </div>
          <div className="text-center p-4 bg-gray-50 border-2 border-gray-300 rounded-2xl hover:border-gray-400 transition-all shadow-sm">
            <Award className="text-[#93C572] mx-auto mb-2" size={24} />
            <div className="text-2xl md:text-3xl font-bold text-[#93C572] mb-1">#1</div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">Cybersecurity</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

