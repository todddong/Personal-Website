"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Youtube, Award } from "lucide-react";
import Image from "next/image";

type Project = {
  title: string;
  badge?: string;
  description: string;
  tech: string[];
  link: string;
  github: string;
  youtube?: string;
  previewImages?: string[];
  previewFit?: "cover" | "contain";
  previewPosition?: string;
};

const projects: Project[] = [
  {
    title: "Humanitarian Aid Allocation Intelligence Platform",
    badge: "1st Place",
    description:
      "1st place at the Databricks x UN Hackathon — agents forecasting crises across 2M+ rows of UN data.",
    tech: ["Python", "JavaScript", "SQL", "Supabase"],
    link: "https://youtu.be/_cCfMuyg-Jw",
    github: "https://github.com/45seconds/datathon-2026",
    youtube: "https://youtu.be/_cCfMuyg-Jw",
    previewImages: [
      "/media/general/datathon-research.png",
      "/media/general/datathon-country-view.png",
    ],
  },
  {
    title: "Healthcare Access Gap Mapper",
    badge: "Code for Good",
    description:
      "Agentic data app mapping healthcare access gaps across 10,000+ Indian ICU facilities.",
    tech: ["Python", "Next.js", "SQL", "Genie", "Lakehouse"],
    link: "https://devpost.com/software/medindia",
    github: "https://github.com/DeerEdge/databricks-apps-agents",
    previewImages: [
      "/media/general/medindia-map.png",
      "/media/general/medindia-chat.png",
    ],
  },
  {
    title: "Neural Network for Digit Recognition",
    description:
      "TensorFlow network trained on 60,000 MNIST digits — 98% real-world accuracy.",
    tech: ["Python", "TensorFlow", "Computer Vision"],
    link: "#",
    github: "https://github.com/todddong/Digit-Detector",
    previewImages: ["/media/general/digit-mnist.png"],
    previewPosition: "center top",
  },
  {
    title: "AI Nutrition Estimator",
    description:
      "Calorie estimator reaching 85–95% accuracy on common foods, built at HackCMU 2025.",
    tech: ["Python", "JavaScript", "SQL", "USDA API"],
    link: "#",
    github: "https://github.com/todddong/HackCMU-2025",
    previewImages: ["/media/general/hackcmu-scottylabs.png"],
    previewFit: "contain",
  },
  {
    title: "AI Workout Assistant",
    description:
      "OpenAI-powered training routine generator used by 20+ CMU swim teammates.",
    tech: ["JavaScript", "HTML", "CSS", "OpenAI API"],
    link: "#",
    github: "https://github.com/todddong/AI-Workout-Assistant",
    youtube: "https://youtu.be/o8jpGh9b0dQ",
    previewImages: ["/media/general/workout-demo.png"],
  },
  {
    title: "AI Wordle",
    description:
      "Wordle with a computer-guessing mode and adaptive hints — 15-112 term project.",
    tech: ["Python", "Algorithms", "Game Dev"],
    link: "#",
    github: "https://github.com/todddong/15-112-Term-Project",
    youtube: "https://www.youtube.com/watch?v=79BA4dGW4vg",
    previewImages: ["/media/general/wordle-demo.png"],
    previewPosition: "62% 20%",
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group flex flex-col rounded-2xl border border-line bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="mb-2.5 flex items-start justify-between">
        <span className="font-serif text-sm text-stone-400">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex gap-3">
          {project.youtube && (
            <a
              href={project.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-400 transition-colors hover:text-clay"
              title="Video demo"
            >
              <Youtube size={17} />
            </a>
          )}
          {project.link !== "#" && project.link !== project.youtube && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-400 transition-colors hover:text-clay"
            >
              <ExternalLink size={17} />
            </a>
          )}
          {project.github !== "#" && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-400 transition-colors hover:text-clay"
            >
              <Github size={17} />
            </a>
          )}
        </div>
      </div>

      <div className="mb-1.5 flex flex-wrap items-center gap-2">
        <h3 className="text-base font-semibold leading-snug text-ink transition-colors group-hover:text-clay">
          {project.title}
        </h3>
        {project.badge && (
          <span className="inline-flex items-center gap-1 rounded-full bg-clay/10 px-2 py-0.5 text-[11px] font-medium text-clay">
            <Award size={10} />
            {project.badge}
          </span>
        )}
      </div>

      <p className="mb-3.5 flex-1 text-[13px] leading-relaxed text-stone-600">
        {project.description}
      </p>

      {project.previewImages && project.previewImages.length > 0 && (
        <div className="mb-3.5 grid grid-cols-2 gap-2">
          {project.previewImages.map((img, idx) => (
            <div
              key={idx}
              className="relative h-20 w-full overflow-hidden rounded-lg border border-line bg-paper"
            >
              <Image
                src={img}
                alt={`${project.title} preview ${idx + 1}`}
                fill
                style={{ objectPosition: project.previewPosition ?? "center" }}
                className={`transition-transform duration-300 group-hover:scale-105 ${
                  project.previewFit === "contain"
                    ? "object-contain p-1"
                    : "object-cover"
                }`}
              />
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-1.5">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-sand px-2 py-0.5 text-[11px] text-stone-600"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative bg-sand px-6 pb-14 pt-12 md:px-10 md:pb-16 md:pt-14">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 md:mb-10"
        >
          <span className="section-label">Projects</span>
          <h2 className="section-heading">Selected work</h2>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
