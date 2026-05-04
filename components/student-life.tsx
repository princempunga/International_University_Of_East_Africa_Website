"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

const images = [
  { url: "/pic1.jfif", caption: "Campus Life" },
  { url: "/pic2.jfif", caption: "Campus Life" },
  { url: "/pic3.jfif", caption: "Campus Life" },
  { url: "/pic4.jpg", caption: "Campus Life" },
  { url: "/pic4.jpeg", caption: "Campus Life" },
  { url: "/pic6.jpg", caption: "Campus Life" },
  { url: "/pic7.jfif", caption: "Campus Life" },
  { url: "/pic8.jfif", caption: "Campus Life" },
  { url: "/pic9.jpg", caption: "Campus Life" },
  { url: "/pic10.jpg", caption: "Campus Life" },
  { url: "/pic11.jpg", caption: "Campus Life" },
  { url: "/pic12.jpg", caption: "Campus Life" },
]

export function StudentLife() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [visibleCount, setVisibleCount] = useState(3)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Update visible count based on window size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCount(1)
      else if (window.innerWidth < 1024) setVisibleCount(2)
      else setVisibleCount(3)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [])

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  // Auto-slide logic
  useEffect(() => {
    if (!isHovered) {
      timerRef.current = setInterval(nextSlide, 3500)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isHovered, nextSlide])

  // Get current visible images
  const visibleImages = Array.from({ length: visibleCount }).map((_, i) => {
    return images[(currentIndex + i) % images.length]
  })

  return (
    <section className="py-20 sm:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-[#E8B84B] text-sm font-semibold tracking-[0.2em] uppercase">
            Life at IUEA
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-serif text-[#1A0A00]">
            Student Life Gallery
          </h2>
        </motion.div>

        {/* Carousel Container */}
        <div
          className="relative max-w-[1200px] mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-[#8B0000] active:scale-95 transition-all md:left-[-20px] md:w-12 md:h-12"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-[#8B0000] active:scale-95 transition-all md:right-[-20px] md:w-12 md:h-12"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Grid Layout for Fade + Scale Transition */}
          <div className="grid gap-5" style={{ gridTemplateColumns: `repeat(${visibleCount}, 1fr)` }}>
            {visibleImages.map((image, i) => (
              <div key={i} className="relative h-[400px] sm:h-[320px] rounded-[16px] overflow-hidden group cursor-pointer bg-gray-100">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={image.url}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{
                      duration: 0.6,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    className="absolute inset-0"
                  >
                    <img
                      src={image.url}
                      alt={image.caption}
                      className="w-full h-full object-cover"
                      style={{
                        transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end">
                      <div className="p-6 w-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                        <p className="text-white text-sm font-medium">{image.caption}</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${currentIndex % images.length === idx ? "w-8 bg-[#8B0000]" : "w-2 bg-gray-300"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-[#8B0000] font-semibold hover:gap-3 transition-all"
          >
            View Full Gallery
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
