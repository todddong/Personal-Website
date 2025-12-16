"use client";

import { motion } from "framer-motion";
import { Code, Database, Cpu, Zap } from "lucide-react";

const skills = [
  {
    category: "Languages",
    items: ["Python", "C", "Java", "JavaScript", "HTML", "CSS", "SML"],
    icon: Code,
  },
  {
    category: "Tools & Libraries",
    items: ["VS Code", "Git", "Cursor", "TensorFlow", "NumPy", "Matplotlib", "scikit-learn", "Django", "Jupyter", "LaTeX"],
    icon: Zap,
  },
  {
    category: "Machine Learning",
    items: ["Neural Networks", "Computer Vision", "Speech Recognition", "LLMs", "ML Pipelines"],
    icon: Cpu,
  },
  {
    category: "Certifications",
    items: ["Machine Learning (Stanford/DeepLearning.AI)", "AWS Cloud Practitioner", "CITI Research"],
    icon: Database,
  },
];

const metrics: Array<{ label: string; value: string; suffix: string }> = [];

export default function SkillsMetrics() {
  return (
    <section id="skills" className="py-24 px-4 md:px-8 relative bg-gradient-to-b from-transparent to-gray-900/30">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold mb-16 text-center"
        >
          Skills & Metrics
        </motion.h2>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="text-blue-400" size={24} />
                  <h3 className="text-xl font-semibold text-white">{skill.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 bg-gray-800/50 text-gray-300 text-sm rounded-full border border-gray-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Metrics */}
        {metrics.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-all duration-300 text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
                  {metric.value}
                  {metric.suffix && <span className="text-2xl">{metric.suffix}</span>}
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wide">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

