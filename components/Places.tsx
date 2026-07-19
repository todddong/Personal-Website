"use client";

import { motion } from "framer-motion";
import CityGallery from "./CityGallery";

export default function Places() {
  return (
    <section id="places" className="relative bg-cream px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 md:mb-14"
        >
          <span className="section-label">Places</span>
          <h2 className="section-heading">Where I&apos;ve been</h2>
        </motion.div>

        <CityGallery />
      </div>
    </section>
  );
}
