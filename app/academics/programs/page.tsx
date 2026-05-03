"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Clock, GraduationCap, BookOpen, Search } from "lucide-react"

const allPrograms = [
  { 
    name: "BSc Computer Science", 
    faculty: "Science & Technology", 
    duration: "3 Years", 
    level: "Undergraduate",
    slug: "bsc-computer-science"
  },
  { 
    name: "BSc Information Technology", 
    faculty: "Science & Technology", 
    duration: "3 Years", 
    level: "Undergraduate",
    slug: "bsc-information-technology"
  },
  { 
    name: "BSc Software Engineering", 
    faculty: "Science & Technology", 
    duration: "4 Years", 
    level: "Undergraduate",
    slug: "bsc-software-engineering"
  },
  { 
    name: "BSc Data Science", 
    faculty: "Science & Technology", 
    duration: "3 Years", 
    level: "Undergraduate",
    slug: "bsc-data-science"
  },
  { 
    name: "Master of Business Administration (MBA)", 
    faculty: "Business & Management", 
    duration: "2 Years", 
    level: "Postgraduate",
    slug: "mba"
  },
  { 
    name: "MSc Project Management", 
    faculty: "Business & Management", 
    duration: "2 Years", 
    level: "Postgraduate",
    slug: "msc-project-management"
  },
  { 
    name: "BSc Civil Engineering", 
    faculty: "Engineering", 
    duration: "4 Years", 
    level: "Undergraduate",
    slug: "bsc-civil-engineering"
  },
  { 
    name: "Bachelor of Laws (LLB)", 
    faculty: "Law & Governance", 
    duration: "4 Years", 
    level: "Undergraduate",
    slug: "llb-laws"
  },
  { 
    name: "BSc Nursing", 
    faculty: "Health Sciences", 
    duration: "4 Years", 
    level: "Undergraduate",
    slug: "bsc-nursing"
  },
  { 
    name: "Bachelor of Education (Primary)", 
    faculty: "Education", 
    duration: "3 Years", 
    level: "Undergraduate",
    slug: "bed-primary"
  }
]

const faculties = ["All", "Science & Technology", "Business & Management", "Engineering", "Law & Governance"]

export default function ProgramsPage() {
  const [activeTab, setActiveTab] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPrograms = allPrograms.filter(program => {
    const matchesTab = activeTab === "All" || program.faculty === activeTab
    const matchesSearch = program.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTab && matchesSearch
  })

  return (
    <main className="min-h-screen">
      
      <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 bg-[#F5F0E8] overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-15">
          <Image 
            src="/hero.jpg" 
            alt="Programs Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 text-[#6B5B4F] text-sm mb-6"
          >
            <Link href="/" className="hover:text-[#1A0A00] transition-colors">Home</Link>
            <span>&gt;</span>
            <Link href="/academics" className="hover:text-[#1A0A00] transition-colors">Academics</Link>
            <span>&gt;</span>
            <span className="text-[#1A0A00]">Programs</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl lg:text-7xl font-serif font-bold text-[#1A0A00] mb-6"
          >
            All Programs
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-[#6B5B4F] max-w-2xl mx-auto"
          >
            Explore our diverse range of courses designed to ignite your passion and build your career.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-8 items-center justify-between mb-12">
            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-2">
              {faculties.map((faculty) => (
                <button
                  key={faculty}
                  onClick={() => setActiveTab(faculty)}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                    activeTab === faculty 
                    ? "bg-[#8B0000] text-white shadow-lg" 
                    : "bg-[#F5F0E8] text-[#1A0A00] hover:bg-[#E8DCC4]"
                  }`}
                >
                  {faculty}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B5B4F]" />
              <input 
                type="text" 
                placeholder="Search programs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-[#F5F0E8] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#8B0000] transition-all"
              />
            </div>
          </div>

          {/* Programs List */}
          <div className="bg-[#F5F0E8]/50 rounded-3xl overflow-hidden border border-black/5">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#8B0000] text-white">
                    <th className="px-8 py-5 font-bold uppercase tracking-wider text-xs">Program Name</th>
                    <th className="px-8 py-5 font-bold uppercase tracking-wider text-xs">Faculty</th>
                    <th className="px-8 py-5 font-bold uppercase tracking-wider text-xs">Level</th>
                    <th className="px-8 py-5 font-bold uppercase tracking-wider text-xs">Duration</th>
                    <th className="px-8 py-5 font-bold uppercase tracking-wider text-xs">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  <AnimatePresence mode="popLayout">
                    {filteredPrograms.map((program) => (
                      <motion.tr 
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        key={program.slug}
                        className="bg-white hover:bg-[#F5F0E8] transition-colors group"
                      >
                        <td className="px-8 py-6">
                          <span className="font-bold text-[#1A0A00] group-hover:text-[#8B0000] transition-colors">{program.name}</span>
                        </td>
                        <td className="px-8 py-6">
                          <span className="text-sm text-[#6B5B4F]">{program.faculty}</span>
                        </td>
                        <td className="px-8 py-6">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold bg-white border border-black/10 text-[#8B0000] uppercase tracking-wide">
                            {program.level}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-2 text-sm text-[#6B5B4F]">
                            <Clock className="w-4 h-4" />
                            {program.duration}
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <Link 
                            href={`/academics/programs/${program.slug}`}
                            className="inline-flex items-center gap-2 text-sm font-bold text-[#8B0000] hover:gap-3 transition-all"
                          >
                            View Details <ArrowRight className="w-4 h-4" />
                          </Link>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
            {filteredPrograms.length === 0 && (
              <div className="py-20 text-center">
                <BookOpen className="w-12 h-12 text-[#6B5B4F]/20 mx-auto mb-4" />
                <p className="text-[#6B5B4F]">No programs found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Need Help CTA */}
      <section className="py-20 bg-[#8B0000] text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">Need help choosing?</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-10 text-lg">
            Our career counselors are available to help you find the program that best fits your goals and interests.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="px-10 py-4 bg-[#E8B84B] text-[#1A0A00] rounded-full font-bold hover:bg-[#D4A73D] transition-all hover:shadow-xl hover:-translate-y-1">
              Speak to an Advisor
            </Link>
            <a
              href="https://Applicants.iuea.ac.ug"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 border-2 border-white rounded-full font-bold hover:bg-white/10 transition-all"
              style={{ textDecoration: 'none' }}
            >
              Apply Today
            </a>
          </div>
        </div>
      </section>

    </main>
  )
}
