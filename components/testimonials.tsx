"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    quote: "IUEA transformed my career trajectory completely. The blend of theoretical knowledge and practical skills I gained here prepared me for the competitive job market. The faculty's dedication to student success is truly remarkable.",
    name: "Amara Okonkwo",
    program: "BSc Computer Science",
    year: "Class of 2024",
    image: "/Say.jpg",
  },
  {
    quote: "The MBA program at IUEA opened doors I never thought possible. The international exposure, industry connections, and mentorship I received have been invaluable. I'm now leading a team at a Fortune 500 company.",
    name: "Kwame Mensah",
    program: "MBA",
    year: "Class of 2023",
    image: "/pic11.jpg",
  },
  {
    quote: "Studying nursing at IUEA was the best decision I ever made. The clinical rotations, state-of-the-art simulation labs, and caring professors shaped me into a confident healthcare professional serving my community.",
    name: "Fatima Nakitende",
    program: "BSc Nursing",
    year: "Class of 2024",
    image: "/pic12.jpg",
  },
]

export function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const prev = () => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const next = () => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  }

  return (
    <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
      {/* Decorative Quote */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 pointer-events-none">
        <Quote className="w-32 h-32 text-[#8B0000]/15" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#8B0000] text-sm font-semibold tracking-[0.2em] uppercase">
            Student Voices
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-serif text-[#1A0A00]">
            What Our Students Say
          </h2>
        </motion.div>

        {/* Testimonial Slider */}
        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="text-center"
            >
              {/* Quote */}
              <p className="text-lg sm:text-2xl lg:text-3xl font-serif italic text-[#1A0A00] leading-relaxed px-2">
                &ldquo;{testimonials[current].quote}&rdquo;
              </p>

              {/* Author */}
              <div className="mt-10 flex flex-col items-center">
                <div className="relative w-[60px] h-[60px] rounded-full overflow-hidden ring-4 ring-[#8B0000]/20">
                  <Image
                    src={testimonials[current].image}
                    alt={testimonials[current].name}
                    fill
                    className="object-cover"
                    style={{ objectPosition: 'center 15%' }}
                  />
                </div>
                <h4 className="mt-4 text-lg font-semibold text-[#1A0A00]">
                  {testimonials[current].name}
                </h4>
                <p className="text-[#8B0000] font-medium">
                  {testimonials[current].program} · {testimonials[current].year}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={prev}
              className="p-3 rounded-full border border-[#E8E0D5] hover:border-[#8B0000] hover:bg-[#8B0000] group transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-[#1A0A00] group-hover:text-white transition-colors" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > current ? 1 : -1)
                    setCurrent(index)
                  }}
                  className={`h-1.5 rounded-full transition-all ${
                    index === current 
                      ? "bg-[#8B0000] w-6 sm:w-8" 
                      : "bg-[#E8E0D5] w-1.5 sm:w-2.5"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-3 rounded-full border border-[#E8E0D5] hover:border-[#8B0000] hover:bg-[#8B0000] group transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-[#1A0A00] group-hover:text-white transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
