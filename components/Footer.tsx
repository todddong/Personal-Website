"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Github, Linkedin, Youtube, ArrowUpRight } from "lucide-react";

const social = [
  {
    name: "GitHub",
    href: "https://github.com/todddong",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/todd-dong-795732324",
    icon: Linkedin,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@ToddDongCMU",
    icon: Youtube,
  },
];

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-line bg-cream px-6 pb-10 pt-20 md:px-10 md:pt-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="section-label">Contact</span>
          <h2 className="mt-3 font-serif text-4xl tracking-tight text-ink md:text-5xl">
            Get in touch
          </h2>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href="mailto:todddong@andrew.cmu.edu"
              className="group inline-flex items-center gap-2 font-serif text-xl text-clay underline decoration-clay/30 decoration-2 underline-offset-4 transition-colors hover:decoration-clay md:text-2xl"
            >
              todddong@andrew.cmu.edu
              <ArrowUpRight
                size={20}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex flex-col gap-2 text-sm text-stone-500 sm:flex-row sm:gap-6">
            <a
              href="mailto:todddong06@gmail.com"
              className="flex items-center gap-2 transition-colors hover:text-clay"
            >
              <Mail size={14} />
              todddong06@gmail.com
            </a>
            <a
              href="tel:+14402286103"
              className="flex items-center gap-2 transition-colors hover:text-clay"
            >
              <Phone size={14} />
              (440) 228-6103
            </a>
          </div>

          <div className="flex items-center gap-4">
            {social.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  className="text-stone-500 transition-colors hover:text-clay"
                >
                  <Icon size={19} />
                </a>
              );
            })}
          </div>
        </motion.div>

        <div className="mt-8 text-sm text-stone-400">
          <p>© {new Date().getFullYear()} Todd Dong. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
