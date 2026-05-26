"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Users, BookOpen, Globe } from "lucide-react"

const defaultStats = [
  { icon: Users, value: "9K+", label: "Students" },
  { icon: BookOpen, value: "62+", label: "Programs" },
  { icon: Globe, value: "45+", label: "Countries" },
]

interface HeroProps {
  titleMain?: string;
  titleAccent?: string;
  subtitle?: string;
  image?: string;
  buttonText?: string;
  buttonLink?: string;
  stats?: Array<{ icon: any, value: string, label: string }>;
}

export function Hero({ 
  titleMain, 
  titleAccent,
  subtitle, 
  image = "/hero.png", 
  buttonText = "Apply Now", 
  buttonLink = "https://Applicants.iuea.ac.ug",
  stats: dynamicStats
}: HeroProps) {
  const displayStats = dynamicStats || defaultStats;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0D0505]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt="IUEA University graduates"
          className="absolute inset-0 w-full h-full object-cover object-[center_top]"
        />
        <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(105deg, rgba(10, 2, 2, 0.9) 0%, rgba(60, 0, 0, 0.8) 45%, rgba(0, 0, 0, 0.4) 100%)' }} />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[100px] lg:pt-20">
        <div className="max-w-3xl mx-auto lg:mx-0 text-center lg:text-left">
          {/* Badge Pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center lg:justify-start"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 border border-[#E8B84B]/40 rounded-full text-[10px] tracking-[2px] text-[#E8B84B] uppercase font-bold bg-[#E8B84B]/5">
              ✦ NCHE ACCREDITED · KAMPALA, UGANDA
            </span>
          </motion.div>

          {/* Heading - RESTORED ORIGINAL STYLE */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 lg:mt-8"
          >
            <span className="block text-white font-serif font-bold leading-tight" style={{ fontSize: 'clamp(36px, 8vw, 88px)' }}>
              {titleMain || "Learning to"}
            </span>
            <span className="block text-[#E8B84B] italic font-serif font-bold leading-tight" style={{ fontSize: 'clamp(40px, 9vw, 96px)' }}>
              {titleAccent || "Succeed"}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-6 text-white/70 mx-auto lg:mx-0 text-[15px] lg:text-lg leading-relaxed max-w-[480px]"
          >
            {subtitle || "Shaping Africa's future through world-class education, cutting-edge research, and transformative experiences since 1998."}
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
          >
            <a
              href={buttonLink}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-4 bg-[#E8B84B] text-[#1A0A00] rounded-full font-bold text-lg hover:bg-[#D4A73D] transition-all"
            >
              {buttonText}
              <ArrowRight className="w-5 h-5" />
            </a>
            <Link
              href="/academics"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-4 border-2 border-white/40 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all"
            >
              Explore Programs
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0 }}
            className="mt-16 lg:mt-20 flex flex-col sm:flex-row justify-center lg:justify-start gap-8 lg:gap-16"
          >
            {displayStats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center lg:items-start">
                <div className="text-xl lg:text-3xl font-bold text-white flex items-center gap-2">
                  {stat.icon && <stat.icon className="w-5 h-5 text-[#E8B84B]/60" />}
                  {stat.value}
                </div>
                <div className="text-[10px] lg:text-xs text-white/40 uppercase tracking-[2px] mt-1 font-semibold">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
