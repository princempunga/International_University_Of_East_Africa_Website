"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, Maximize2, X, Loader2, Image as ImageIcon } from "lucide-react"
import Image from "next/image"
import { API_URL } from "@/lib/api"

const categories = ["All", "Campus", "Graduation", "Events", "Labs", "Sports", "General"]

export function GalleryContent() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [images, setImages] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<any | null>(null)

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch(`${API_URL}/gallery`)
        const data = await res.json()
        if (data.success) {
          // Normalize data: ensure src is full URL if needed
          const normalized = data.data.map((img: any) => ({
            id: img.id,
            src: img.image_url || img.image_path, // Handle both potential field names
            alt: img.title || "IUEA Gallery Image",
            category: img.category || "General"
          }))
          setImages(normalized)
        }
      } catch (error) {
        console.error("Failed to fetch gallery:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchGallery()
  }, [])

  const filteredImages = images.filter(
    img => selectedCategory === "All" || img.category.toLowerCase() === selectedCategory.toLowerCase()
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
      <section className="py-20 min-h-[400px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-[#8B0000] animate-spin mb-4" />
              <p className="text-gray-400 font-medium">Loading gallery...</p>
            </div>
          ) : filteredImages.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
              <ImageIcon className="w-16 h-16 text-gray-200 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No images found</h3>
              <p className="text-gray-500">There are no images in this category yet.</p>
            </div>
          ) : (
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
          )}
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
