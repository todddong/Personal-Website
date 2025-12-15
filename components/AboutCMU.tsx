"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { GraduationCap, MapPin, Calendar, Award, TrendingUp } from "lucide-react";

export default function AboutCMU() {
  return (
    <section id="about-cmu" className="py-24 px-4 md:px-8 relative bg-gradient-to-b from-transparent to-gray-900/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            About Carnegie Mellon
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            My journey at one of the world&apos;s leading computer science programs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] rounded-lg overflow-hidden border border-gray-800 group order-2 md:order-1"
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
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="text-blue-400" size={32} />
              <h3 className="text-2xl font-semibold text-white">Carnegie Mellon University</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-300">
                <Calendar className="text-blue-400" size={20} />
                <span>Expected Graduation: May 2027</span>
              </div>
              
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="text-blue-400" size={20} />
                <span>Pittsburgh, Pennsylvania</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-800">
              <h4 className="text-lg font-semibold text-white mb-3">Degree Program</h4>
              <p className="text-gray-300 mb-4">
                Bachelor of Science in Computer Science with concentration in Machine Learning
              </p>
            </div>

            <div className="pt-4 border-t border-gray-800">
              <h4 className="text-lg font-semibold text-white mb-3">Relevant Courses</h4>
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
                    className="px-3 py-1 bg-gray-800/50 text-gray-300 text-sm rounded-full border border-gray-700"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-800">
              <h4 className="text-lg font-semibold text-white mb-3">Extracurriculars</h4>
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
                    className="px-3 py-1 bg-gray-800/50 text-gray-300 text-sm rounded-full border border-gray-700"
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
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <div className="text-center p-6 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-gray-700 transition-all">
            <Award className="text-blue-400 mx-auto mb-3" size={32} />
            <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">#1</div>
            <div className="text-sm text-gray-400 uppercase tracking-wide">CS Ranking (US News)</div>
          </div>
          <div className="text-center p-6 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-gray-700 transition-all">
            <TrendingUp className="text-blue-400 mx-auto mb-3" size={32} />
            <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">#2</div>
            <div className="text-sm text-gray-400 uppercase tracking-wide">AI Ranking</div>
          </div>
          <div className="text-center p-6 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-gray-700 transition-all">
            <GraduationCap className="text-blue-400 mx-auto mb-3" size={32} />
            <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">#1</div>
            <div className="text-sm text-gray-400 uppercase tracking-wide">Software Engineering</div>
          </div>
          <div className="text-center p-6 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-gray-700 transition-all">
            <Award className="text-blue-400 mx-auto mb-3" size={32} />
            <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">#1</div>
            <div className="text-sm text-gray-400 uppercase tracking-wide">Cybersecurity</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

