"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Artificial Neural Network for Number Recognition",
    description: "Built and trained a 3-layer neural network with TensorFlow on 60,000 MNIST image dataset to classify handwritten digits",
    problem: "Handwritten digit recognition requires robust models that work across varied image dimensions and real-world inputs",
    system: "3-layer neural network with image normalization, grayscale conversion, resizing, inversion, and center of mass alignment. Trained using Adam optimizer achieving peak accuracy in 5 epochs",
    impact: "Improved classification accuracy from 92% to 98% on real-world inputs, achieving peak accuracy in less than 30 seconds",
    tech: ["Python", "TensorFlow", "Neural Networks", "Computer Vision"],
    link: "#",
    github: "#",
  },
  {
    title: "AI Nutrition Estimator",
    description: "HackCMU 2025 AI Track project: Calorie estimation system with 85-95% accuracy for common foods",
    problem: "Nutrition tracking requires accurate calorie estimation across diverse food items and serving sizes",
    system: "Full-stack application combining frontend, backend, SQL database, and USDA food database for comprehensive food search system",
    impact: "Led complete project lifecycle from ideation through deployment, achieving 85-95% accuracy for common foods",
    tech: ["Python", "HTML", "JavaScript", "SQL", "USDA API"],
    link: "#",
    github: "#",
  },
  {
    title: "AI Workout Assistant for CMU Swim Team",
    description: "Wrapped OpenAI's API to generate tailored routines supporting 1 million+ unique plans for any sport or workout goals",
    problem: "Generic workout plans don't adapt to individual needs, goals, and constraints for athletes",
    system: "AI-powered recommendation system that generates personalized gym and cardio routines based on user preferences and goals",
    impact: "Created personalized routines for 20+ teammates during swim offseason, helping maintain strength and conditioning. Resulted in personal weight loss of over 10 lbs",
    tech: ["JavaScript", "HTML", "CSS", "OpenAI API"],
    link: "#",
    github: "#",
  },
  {
    title: "Bookly",
    description: "A modern book management and tracking application",
    problem: "Users need an efficient way to manage, track, and organize their reading lists and book collections",
    system: "Full-stack application with intuitive interface for book discovery, tracking reading progress, and managing personal libraries",
    impact: "Provides users with a streamlined solution for organizing their reading journey and discovering new books",
    tech: ["JavaScript", "React", "Node.js", "Database"],
    link: "#",
    github: "https://github.com/DeerEdge/Bookly",
  },
  {
    title: "AI Wordle Game",
    description: "Designed and programmed traditional Wordle as well as a computer guessing mode, with advanced hints based on user input and multiple guessing algorithms",
    problem: "Wordle games lack intelligent computer opponents with varying difficulty levels and adaptive hint systems",
    system: "Python-based Wordle implementation with traditional gameplay and AI computer mode featuring multiple guessing algorithms and advanced hint generation based on user input",
    impact: "Created an engaging word puzzle game with competitive AI opponents, demonstrating algorithm design and game development skills",
    tech: ["Python", "Algorithms", "Game Development"],
    link: "#",
    github: "https://github.com/todddong/15-112-Term-Project",
  },
  {
    title: "Coming soon ... 👀",
    description: "Exciting new project in development",
    problem: "",
    system: "",
    impact: "",
    tech: [],
    link: "#",
    github: "#",
    isPlaceholder: true,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-4 md:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold mb-16 text-center"
        >
          Projects
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <div className="flex gap-2">
                  {project.link !== "#" && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}
                  {project.github !== "#" && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      <Github size={20} />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-gray-400 mb-4 text-sm">{project.description}</p>

              {!project.isPlaceholder && (
                <>
                  <div className="space-y-3 mb-4">
                    <div>
                      <span className="text-xs text-gray-500 uppercase tracking-wide">Problem</span>
                      <p className="text-gray-300 text-sm mt-1">{project.problem}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 uppercase tracking-wide">System</span>
                      <p className="text-gray-300 text-sm mt-1">{project.system}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 uppercase tracking-wide">Impact</span>
                      <p className="text-gray-300 text-sm mt-1">{project.impact}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-800/50 text-gray-300 text-xs rounded-full border border-gray-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

