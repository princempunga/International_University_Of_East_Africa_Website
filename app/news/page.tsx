"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, Tag, ArrowRight, Search } from "lucide-react"


const newsItems = [
  {
    slug: "mit-partnership",
    title: "IUEA Partners with MIT on AI Research Initiative",
    category: "Research",
    date: "April 15, 2026",
    image: "/JOT_1087.jpg",
    excerpt: "IUEA is proud to announce a landmark collaboration with MIT to launch a new Artificial Intelligence Research Initiative."
  },
  {
    slug: "graduation-2025-announcement",
    title: "IUEA 2025 Graduation Ceremony Announced",
    category: "Academic",
    date: "May 20, 2025",
    image: "/JOT_1091.jpg",
    excerpt: "We are proud to announce the dates for our 2025 graduation ceremony, celebrating the achievements of our exceptional students."
  },
  {
    slug: "innovation-award",
    title: "Engineering Students Win Regional Innovation Competition",
    category: "Achievement",
    date: "April 5, 2026",
    image: "/JOT_1351.jpg",
    excerpt: "Our Engineering students have once again proven their excellence by winning the top prize at the East African Innovation Competition."
  },
  {
    slug: "new-library",
    title: "New State-of-the-Art Library Opens Its Doors",
    category: "Campus",
    date: "March 28, 2026",
    image: "/JOT_1353.jpg",
    excerpt: "The IUEA community is celebrating the official opening of our new ultra-modern library facility designed for 21st-century learning."
  },
  {
    slug: "new-innovation-lab-launch",
    title: "State-of-the-Art Innovation Lab Opens",
    category: "Technology",
    date: "April 12, 2025",
    image: "/JOT_1354.jpg",
    excerpt: "IUEA continues to lead in technology education with the launch of our new multi-million dollar innovation laboratory."
  },
  {
    slug: "sports-gala-highlights",
    title: "Highlights from the Annual Sports Gala",
    category: "Student Life",
    date: "March 28, 2025",
    image: "/JOT_1360.jpg",
    excerpt: "From thrilling football matches to track events, see the best moments from our recently concluded sports gala."
  }
]

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-white">

      
      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 bg-[#8B0000] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/pic10.jpg" 
            alt="News & Events Background"
            fill
            className="object-cover opacity-40"
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
            News & Events
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80 max-w-2xl mx-auto"
          >
            Stay informed about the latest happenings at IUEA, from academic achievements to campus life.
          </motion.p>
        </div>
      </section>

      {/* Search & Categories */}
      <section className="py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-6 justify-between items-center">
          <div className="flex gap-4 overflow-x-auto pb-2 w-full md:w-auto">
            {["All", "Academic", "Technology", "Events", "Student Life"].map((cat) => (
              <button key={cat} className="px-6 py-2 rounded-full border border-gray-200 text-sm font-semibold hover:border-[#8B0000] hover:text-[#8B0000] transition-colors whitespace-nowrap">
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search news..." className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-100 bg-[#F5F0E8] outline-none focus:ring-1 focus:ring-[#8B0000]" />
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {newsItems.map((news, idx) => (
              <motion.article 
                key={news.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group flex flex-col h-full"
              >
                <Link href={`/news/${news.slug}`} className="relative h-64 rounded-3xl overflow-hidden mb-6 block">
                  <Image src={news.image} alt={news.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 px-4 py-1 bg-[#E8B84B] text-[#1A0A00] text-xs font-bold rounded-full uppercase tracking-wider">
                    {news.category}
                  </div>
                </Link>
                <div className="flex items-center gap-2 text-sm text-[#6B5B4F] mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>{news.date}</span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#1A0A00] mb-4 group-hover:text-[#8B0000] transition-colors">
                  <Link href={`/news/${news.slug}`}>{news.title}</Link>
                </h3>
                <p className="text-[#6B5B4F] mb-6 flex-1 line-clamp-3">
                  {news.excerpt}
                </p>
                <Link href={`/news/${news.slug}`} className="inline-flex items-center gap-2 font-bold text-[#8B0000] group-hover:gap-3 transition-all">
                  Read More <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.article>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="mt-20 flex justify-center gap-4">
            <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#8B0000] hover:text-white transition-colors">1</button>
            <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#8B0000] hover:text-white transition-colors">2</button>
            <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#8B0000] hover:text-white transition-colors">3</button>
          </div>
        </div>
      </section>


    </main>
  )
}
