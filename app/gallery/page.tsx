"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, Maximize2, X } from "lucide-react"
import Image from "next/image"

const categories = ["All", "Campus", "Graduation", "Events", "Labs", "Sports"]

const galleryImages = [
  { id: 1, src: "/pic1.jfif", alt: "IUEA Campus Life", category: "Campus" },
  { id: 2, src: "/pic2.jfif", alt: "IUEA Campus Life", category: "Campus" },
  { id: 3, src: "/pic3.jfif", alt: "IUEA Graduation", category: "Graduation" },
  { id: 4, src: "/pic4.jpg", alt: "IUEA Graduation", category: "Graduation" },
  { id: 5, src: "/pic4.jpeg", alt: "IUEA Events", category: "Events" },
  { id: 6, src: "/pic6.jpg", alt: "IUEA Events", category: "Events" },
  { id: 7, src: "/pic7.jfif", alt: "IUEA Labs", category: "Labs" },
  { id: 8, src: "/pic8.jfif", alt: "IUEA Labs", category: "Labs" },
  { id: 9, src: "/pic9.jpg", alt: "IUEA Sports", category: "Sports" },
  { id: 10, src: "/pic10.jpg", alt: "IUEA Sports", category: "Sports" },
  { id: 11, src: "/pic11.jpg", alt: "IUEA Campus Life", category: "Campus" },
  { id: 12, src: "/pic12.jpg", alt: "IUEA Campus Life", category: "Campus" },
]

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null)

  const filteredImages = galleryImages.filter(
    img => selectedCategory === "All" || img.category === selectedCategory
  )

  return (
    <main className="min-h-screen bg-white">


      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 bg-[#8B0000] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/hero.jpg" 
            alt="Gallery Background"
            fill
            className="object-cover opacity-30 grayscale-[20%]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#8B0000]/40 via-[#8B0000]/60 to-[#8B0000]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-serif font-bold text-white mb-6"
          >
            Visual Journey
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80 max-w-2xl mx-auto"
          >
            Capturing the moments, facilities, and people that make IUEA the heartbeat of technology and innovation in East Africa.
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-12 bg-[#F5F0E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${selectedCategory === cat
                    ? "bg-[#8B0000] text-white shadow-lg scale-105"
                    : "bg-white text-[#1A0A00] hover:bg-gray-100"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {filteredImages.map((image) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="relative group cursor-pointer aspect-square rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    className="transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#8B0000]/80 via-[#8B0000]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="text-white text-xs font-bold uppercase tracking-wider mb-2">{image.category}</span>
                    <h3 className="text-white font-serif text-lg font-bold">{image.alt}</h3>
                  </div>
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-5 h-5 text-white" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 sm:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-10 h-10" />
            </button>
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl aspect-[4/3] rounded-3xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white font-bold text-sm mb-2 uppercase">{selectedImage.category}</p>
                <h2 className="text-white text-3xl font-serif font-bold">{selectedImage.alt}</h2>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


    </main>
  )
}
