"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";

// Add your Alaska photos here - they'll automatically appear in the gallery
// Name them: alaska-1.jpg, alaska-2.jpg, etc. in the public/media/alaska folder
const alaskaHighlights = [
  { src: "/media/alaska/alaska-1.jpg", alt: "Alaska Highlight 1", title: "Anchorage" },
  { src: "/media/alaska/alaska-2.jpg", alt: "Alaska Highlight 2", title: "Alaska" },
  { src: "/media/alaska/alaska-3.jpg", alt: "Alaska Highlight 3", title: "Alaska" },
  { src: "/media/alaska/alaska-4.jpg", alt: "Alaska Highlight 4", title: "Alaska" },
  { src: "/media/alaska/alaska-5.jpg", alt: "Alaska Highlight 5", title: "Alaska" },
  { src: "/media/alaska/alaska-6.jpg", alt: "Alaska Highlight 6", title: "Alaska" },
  { src: "/media/alaska/alaska-7.jpg", alt: "Alaska Highlight 7", title: "Alaska" },
  { src: "/media/alaska/alaska-8.jpg", alt: "Alaska Highlight 8", title: "Alaska" },
  { src: "/media/alaska/alaska-9.jpg", alt: "Alaska Highlight 9", title: "Alaska" },
  { src: "/media/alaska/alaska-10.jpg", alt: "Alaska Highlight 10", title: "Alaska" },
  { src: "/media/alaska/alaska-11.jpg", alt: "Alaska Highlight 11", title: "Alaska" },
  { src: "/media/alaska/alaska-12.jpg", alt: "Alaska Highlight 12", title: "Alaska" },
  { src: "/media/alaska/alaska-13.jpg", alt: "Alaska Highlight 13", title: "Alaska" },
];

function HighlightItem({ 
  highlight, 
  index, 
  onSelect 
}: { 
  highlight: typeof alaskaHighlights[0]; 
  index: number;
  onSelect: (src: string) => void;
}) {
  const [imageError, setImageError] = useState(false);

  if (imageError) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="relative group cursor-pointer overflow-hidden rounded-lg border border-gray-800 hover:border-blue-400/50 transition-all shadow-lg hover:shadow-2xl"
      onClick={() => onSelect(highlight.src)}
    >
      <div className="aspect-[4/3] relative overflow-hidden">
        <Image
          src={highlight.src}
          alt={highlight.alt}
          fill
          className="object-cover group-hover:scale-125 transition-transform duration-700 ease-out"
          onError={() => setImageError(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <span className="text-white font-medium text-sm">
            {highlight.title}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Highlights() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="highlights" className="py-24 px-4 md:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Alaska Highlights
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Summer 2025 internship in Anchorage — exploring the Last Frontier
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {alaskaHighlights.map((highlight, index) => (
            <HighlightItem
              key={index}
              highlight={highlight}
              index={index}
              onSelect={setSelectedImage}
            />
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="relative max-w-6xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full p-2"
              >
                <X size={24} />
              </button>
              <div className="relative w-full h-full aspect-video">
                <Image
                  src={selectedImage}
                  alt="Selected highlight"
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

