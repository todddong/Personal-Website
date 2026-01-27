"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Youtube } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

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
    title: "CMU x Databricks x UN Datathon Winner",
    description: "First Place Winner — CMU x Databricks x UN Datathon. Data science competition project featuring interactive dashboard, map visualizations, and deep search capabilities for analyzing complex datasets",
    problem: "Large-scale datasets require intuitive visualization and search tools to extract meaningful insights and patterns",
    system: "Interactive web dashboard with map visualizations, deep search functionality, and comprehensive data analysis pipeline built with Jupyter Notebooks and data science tools",
    impact: "Won first place at the CMU x Databricks x UN Datathon. Developed comprehensive data analysis solution with interactive visualizations, enabling users to explore and understand complex datasets through intuitive interface",
    tech: ["Python", "Jupyter Notebooks", "Data Science", "Data Visualization", "Interactive Dashboard"],
    link: "https://youtu.be/_cCfMuyg-Jw",
    github: "https://github.com/45seconds/datathon-2026",
    youtube: "https://youtu.be/_cCfMuyg-Jw",
    image: "/media/general/databricks rewards.jpg",
    previewImages: [
      "/media/general/datathon-research.png",
      "/media/general/datathon-country-view.png",
    ],
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group bg-white border-2 border-gray-300 rounded-2xl p-4 hover:border-gray-400 transition-all duration-300 shadow-sm hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-normal text-gray-900 group-hover:text-[#93C572] transition-colors">
          {project.title}
        </h3>
        <div className="flex gap-2">
          {(project as any).youtube && (
            <a
              href={(project as any).youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-red-400 transition-colors"
              title="Video Demo"
            >
              <Youtube size={20} />
            </a>
          )}
          {project.link !== "#" && project.link !== (project as any).youtube && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#93C572] transition-colors"
            >
              <ExternalLink size={20} />
            </a>
          )}
          {project.github !== "#" && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#93C572] transition-colors"
            >
              <Github size={20} />
            </a>
          )}
        </div>
      </div>

      {/* Expanded content within the same card */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            <p className="text-gray-600 mb-4 text-sm mt-4">{project.description}</p>

            {(project as any).previewImages && (project as any).previewImages.length > 0 && (
              <div className="grid grid-cols-2 gap-2 mb-4">
                {(project as any).previewImages.map((img: string, idx: number) => (
                  <div key={idx} className="relative w-full h-32 rounded-lg overflow-hidden border border-gray-800">
                    <Image
                      src={img}
                      alt={`${project.title} preview ${idx + 1}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            )}

            {(project as any).image && !(project as any).previewImages && (
              <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden border border-gray-800">
                <Image
                  src={(project as any).image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="space-y-3 mb-4">
              <div>
                <span className="text-xs text-gray-500 uppercase tracking-wide">Problem</span>
                <p className="text-gray-600 text-sm mt-1">{project.problem}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500 uppercase tracking-wide">System</span>
                <p className="text-gray-600 text-sm mt-1">{project.system}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500 uppercase tracking-wide">Impact</span>
                <p className="text-gray-600 text-sm mt-1">{project.impact}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full border border-gray-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-8 px-4 md:px-8 relative bg-[#faf8f4] border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xl md:text-2xl font-normal mb-6 text-left text-[#93C572]"
        >
          projects
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

