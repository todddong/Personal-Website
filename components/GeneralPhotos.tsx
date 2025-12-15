"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";

// Add your general photos here - they'll automatically appear in the gallery
const generalPhotos = [
  { src: "/media/general/photo-1.jpg", alt: "Photo 1" },
  { src: "/media/general/photo-2.jpg", alt: "Photo 2" },
  { src: "/media/general/photo-3.jpg", alt: "Photo 3" },
  { src: "/media/general/photo-4.jpg", alt: "Photo 4" },
  { src: "/media/general/photo-5.jpg", alt: "Photo 5" },
  { src: "/media/general/photo-6.jpg", alt: "Photo 6" },
  { src: "/media/general/photo-7.jpg", alt: "Photo 7" },
  { src: "/media/general/photo-8.jpg", alt: "Photo 8" },
  { src: "/media/general/photo-9.jpg", alt: "Photo 9" },
];

function PhotoItem({ 
  photo, 
  index, 
  onSelect 
}: { 
  photo: typeof generalPhotos[0]; 
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
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group cursor-pointer overflow-hidden rounded-lg border border-gray-800 hover:border-gray-700 transition-all"
      onClick={() => onSelect(photo.src)}
    >
      <div className="aspect-[4/3] relative">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          onError={() => setImageError(true)}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
      </div>
    </motion.div>
  );
}

export default function GeneralPhotos() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="general-photos" className="py-24 px-4 md:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            General Photos
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Moments and memories from my journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {generalPhotos.map((photo, index) => (
            <PhotoItem
              key={index}
              photo={photo}
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
                  alt="Selected photo"
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

