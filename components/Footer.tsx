"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Github, Linkedin } from "lucide-react";

const contact = [
  {
    label: "School Email",
    value: "todddong@andrew.cmu.edu",
    href: "mailto:todddong@andrew.cmu.edu",
    icon: Mail,
  },
  {
    label: "Personal Email",
    value: "todddong06@gmail.com",
    href: "mailto:todddong06@gmail.com",
    icon: Mail,
  },
  {
    label: "Phone",
    value: "(440) 228-6103",
    href: "tel:+14402286103",
    icon: Phone,
  },
];

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
];

export default function Footer() {
  return (
    <footer id="contact" className="py-16 px-4 md:px-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-12 text-center"
        >
          Contact Me
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {contact.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col items-center text-center p-6 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-gray-700 transition-all group"
              >
                <Icon className="text-blue-400 mb-3 group-hover:scale-110 transition-transform" size={24} />
                <span className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                  {item.label}
                </span>
                <span className="text-gray-300 text-sm">{item.value}</span>
              </motion.a>
            );
          })}
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mb-8">
          {social.map((item) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Icon size={24} />
              </motion.a>
            );
          })}
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Todd Dong. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

