"use client"

import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Users, BookOpen, Globe, ArrowRight } from "lucide-react"

const stats = [
  { icon: Users, value: "9K+", label: "Students" },
  { icon: BookOpen, value: "62+", label: "Programs" },
  { icon: Globe, value: "45+", label: "Countries" },
]

export function Hero() {

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0D0505]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/hero.png"
          alt="IUEA University graduates"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
          }}
        />
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: 'linear-gradient(105deg, rgba(10, 2, 2, 0.85) 0%, rgba(60, 0, 0, 0.70) 45%, rgba(0, 0, 0, 0.30) 100%)'
          }}
        />
      </div>

      {/* Content */}
      <AnimatePresence>
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="max-w-3xl">
            {/* Badge Pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                border: '1px solid rgba(232,184,75,0.4)',
                borderRadius: '9999px',
                fontSize: '12px',
                letterSpacing: '2px',
                color: '#E8B84B',
                textTransform: 'uppercase',
                fontWeight: 600,
                backgroundColor: 'rgba(232,184,75,0.05)'
              }}>
                ✦ NCHE ACCREDITED · KAMPALA, UGANDA
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8"
            >
              <span style={{
                display: 'block',
                color: 'white',
                fontSize: 'clamp(48px, 7vw, 88px)',
                fontFamily: 'var(--font-playfair), serif',
                fontWeight: 700,
                lineHeight: 1.1
              }}>
                Learning to
              </span>
              <span style={{
                display: 'block',
                color: '#E8B84B',
                fontStyle: 'italic',
                fontSize: 'clamp(52px, 8vw, 96px)',
                fontFamily: 'var(--font-playfair), serif',
                fontWeight: 700,
                lineHeight: 1.1
              }}>
                Succeed
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              style={{
                marginTop: '24px',
                fontSize: '18px',
                color: 'rgba(255,255,255,0.75)',
                maxWidth: '480px',
                lineHeight: 1.7,
                fontFamily: 'var(--font-dm-sans), sans-serif'
              }}
            >
              Shaping Africa{"'"}s future through world-class education, cutting-edge research, and transformative experiences since 1998.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              style={{
                marginTop: '40px',
                display: 'flex',
                gap: '16px',
                flexWrap: 'wrap'
              }}
            >
              <a
                href="https://Applicants.iuea.ac.ug"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 px-9 py-4 bg-[#E8B84B] text-[#1A0A00] rounded-full font-bold text-lg hover:bg-[#D4A73D] hover:-translate-y-0.5 transition-all duration-300"
                style={{ textDecoration: 'none' }}
              >
                Apply Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                href="/academics"
                className="inline-flex items-center gap-2 px-9 py-4 border-2 border-white/60 text-white rounded-full font-bold text-lg hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300"
              >
                Explore Programs
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.0 }}
              className="mt-20 flex items-center gap-10 lg:gap-16"
            >
              {stats.map((stat, index) => (
                <div key={stat.label} className="flex items-center gap-10 lg:gap-16">
                  <div className="flex flex-col">
                    <div className="text-3xl font-bold text-white flex items-center gap-2">
                      <stat.icon className="w-5 h-5 text-[#E8B84B]/60" />
                      {stat.value}
                    </div>
                    <div className="text-xs text-white/40 uppercase tracking-[2px] mt-1 font-semibold">{stat.label}</div>
                  </div>
                  {index < stats.length - 1 && (
                    <div className="h-10 w-[1px] bg-[#E8B84B]/20" />
                  )}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </AnimatePresence>

      {/* Watermark Crest */}
      <div
        style={{
          position: 'absolute',
          right: '5%',
          top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: 'var(--font-playfair), serif',
          fontSize: '400px',
          fontWeight: 700,
          color: 'white',
          opacity: 0.04,
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 5
        }}
      >
        I
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] text-white/30 uppercase tracking-[3px]">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5 text-[#E8B84B]/50" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
