"use client"

import { Faculties } from "@/components/faculties"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, BookOpen, GraduationCap, Calendar, Zap } from "lucide-react"
import { useCMSSEO } from "@/hooks/useCMSSEO"


export default function AcademicsPage() {
  const seoComponent = useCMSSEO('academics', { title: 'Academics | IUEA', description: 'Explore IUEA's diverse academic programs across multiple faculties.' })

  return (
    <main className="min-h-screen">
      {seoComponent}

      
      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <img 
          src="/pic4.jpg"
          alt="Academics"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.65)'
        }} />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 text-white/60 text-sm mb-6"
          >
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>&gt;</span>
            <span className="text-white">Academics</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl lg:text-7xl font-serif font-bold text-white mb-6"
          >
            Academic Excellence
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-white/80 max-w-2xl mx-auto"
          >
            Empowering students with knowledge, skills, and values to thrive in a global economy.
          </motion.p>
        </div>
      </section>

      {/* Faculties Section - Reuse component */}
      <Faculties />

      {/* Search & Program Highlights */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-serif font-bold text-[#1A0A00] mb-8">Find Your Program</h2>
              <p className="text-[#6B5B4F] text-lg mb-8">
                Discover from over 62 accredited undergraduate and postgraduate programs designed to prepare you for the future of work.
              </p>
              <div className="relative mb-12">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="What would you like to study?" 
                  className="w-full pl-12 pr-6 py-4 rounded-xl border border-gray-200 focus:border-[#8B0000] focus:ring-1 focus:ring-[#8B0000] outline-none"
                />
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="/academics/programs" className="px-8 py-3 bg-[#8B0000] text-white rounded-full font-semibold hover:bg-[#6B0000] transition-colors">
                  Browse All Programs
                </Link>
                <Link href="/admissions/requirements" className="px-8 py-3 border-2 border-gray-200 text-[#1A0A00] rounded-full font-semibold hover:border-[#8B0000] transition-all">
                  Check Requirements
                </Link>
              </div>
            </motion.div>
            
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: BookOpen, title: "Undergraduate", desc: "Foundational degrees across all faculties.", link: "/academics/programs?level=undergraduate" },
                { icon: GraduationCap, title: "Postgraduate", desc: "Master's and PhD programs for advanced research.", link: "/academics/programs?level=postgraduate" },
                { icon: Calendar, title: "Calendar", desc: "Key academic dates and deadlines.", link: "/academics/calendar" },
                { icon: Zap, title: "Short Courses", desc: "Professional development and certifications.", link: "/academics/programs?level=short" }
              ].map((item, idx) => (
                <motion.div 
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6 bg-white border border-gray-100 rounded-2xl hover:shadow-lg transition-shadow group"
                >
                  <Link href={item.link}>
                    <item.icon className="w-10 h-10 text-[#8B0000] mb-4 group-hover:scale-110 transition-transform" />
                    <h4 className="font-bold text-[#1A0A00] mb-2">{item.title}</h4>
                    <p className="text-xs text-[#6B5B4F]">{item.desc}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Research Highlights Section */}
      <section className="py-20 bg-[#8B0000] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-serif font-bold mb-6">Research at IUEA</h2>
            <p className="text-white/70 max-w-2xl mx-auto mb-12">
              Our research initiatives focus on solving regional and global challenges through technology and innovation.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "AI & Data Science", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600" },
              { title: "Renewable Energy", image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600" },
              { title: "Legal Innovation", image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600" }
            ].map((res, idx) => (
              <motion.div 
                key={res.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative h-64 rounded-2xl overflow-hidden group"
              >
                <Image src={res.image} alt={res.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                  <h4 className="text-xl font-bold">{res.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12">
            <Link href="/research" className="text-[#E8B84B] font-semibold hover:underline">
              Explore our research centers →
            </Link>
          </div>
        </div>
      </section>


    </main>
  )
}
