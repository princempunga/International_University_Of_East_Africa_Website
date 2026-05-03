"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, ArrowRight } from "lucide-react"

const news = [
  {
    image: "/JOT_1087.jpg",
    badge: "Research",
    date: "April 15, 2026",
    title: "IUEA Partners with MIT on AI Research Initiative",
    excerpt: "A groundbreaking partnership that will bring cutting-edge AI research opportunities to East Africa.",
    href: "/news/mit-partnership",
  },
  {
    image: "/JOT_1091.jpg",
    badge: "Academic",
    date: "May 20, 2025",
    title: "IUEA 2025 Graduation Ceremony Announced",
    excerpt: "We are proud to announce the dates for our 2025 graduation ceremony, celebrating the achievements of our exceptional students.",
    href: "/news/graduation-2025-announcement",
  },
  {
    image: "/JOT_1351.jpg",
    badge: "Achievement",
    date: "April 5, 2026",
    title: "Engineering Students Win Regional Innovation Competition",
    excerpt: "Our team's sustainable energy solution earned top honors at the East African Tech Summit.",
    href: "/news/innovation-award",
  },
  {
    image: "/JOT_1353.jpg",
    badge: "Campus",
    date: "March 28, 2026",
    title: "New State-of-the-Art Library Opens Its Doors",
    excerpt: "The modern facility features 24/7 access, collaborative spaces, and over 100,000 volumes.",
    href: "/news/new-library",
  },
]

export function NewsEvents() {
  const [email, setEmail] = useState("")

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setEmail("")
    alert("Thank you for subscribing!")
  }

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12"
        >
          <div>
            <span className="text-[#E8B84B] text-sm font-semibold tracking-[0.2em] uppercase">
              Stay Updated
            </span>
            <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-serif text-[#1A0A00]">
              News & Events
            </h2>
          </div>

          {/* Newsletter */}
          <form onSubmit={handleSubscribe} className="flex gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-4 py-3 w-full sm:w-64 border border-[#E8E0D5] rounded-lg bg-white text-[#1A0A00] placeholder:text-[#6B5B4F] focus:outline-none focus:ring-2 focus:ring-[#8B0000]/20 focus:border-[#8B0000]"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#8B0000] text-white font-semibold rounded-lg hover:bg-[#6B0000] transition-colors"
            >
              Join
            </button>
          </form>
        </motion.div>

        {/* News Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {news.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative h-[200px] overflow-hidden rounded-t-[12px]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-[#8B0000] text-white text-xs font-semibold rounded-full shadow-sm">
                  {item.badge}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 text-sm text-[#6B5B4F]">
                  <Calendar className="w-4 h-4" />
                  {item.date}
                </div>
                <h3 className="mt-3 text-lg font-serif font-semibold text-[#1A0A00] line-clamp-2 group-hover:text-[#8B0000] transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-[#6B5B4F] line-clamp-2 leading-relaxed">
                  {item.excerpt}
                </p>
                <Link
                  href={item.href}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#8B0000] transition-all"
                >
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
