"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Clock, Users, BookOpen, ChevronDown, ArrowRight } from "lucide-react"
import Link from "next/link"

const programs = [
  {
    name: "BSc Computer Science",
    level: "UNDERGRADUATE",
    description: "Master programming, algorithms, and software development with cutting-edge curriculum.",
    duration: "3 Years",
    students: "1,820",
    courses: "14",
    faculty: "Science & Technology",
    slug: "bsc-computer-science"
  },
  {
    name: "MBA",
    level: "POSTGRADUATE",
    description: "Transform your career with our internationally recognized Master of Business Administration.",
    duration: "2 Years",
    students: "2,340",
    courses: "12",
    faculty: "Business & Management",
    slug: "mba"
  },
  {
    name: "BSc Civil Engineering",
    level: "UNDERGRADUATE",
    description: "Design and build the infrastructure of tomorrow with hands-on engineering experience.",
    duration: "4 Years",
    students: "1,450",
    courses: "18",
    faculty: "Engineering",
    slug: "bsc-civil-engineering"
  },
  {
    name: "LLB Laws",
    level: "UNDERGRADUATE",
    description: "Develop a strong legal foundation for a successful career in law and governance.",
    duration: "4 Years",
    students: "980",
    courses: "16",
    faculty: "Law & Governance",
    slug: "llb-laws"
  },
  {
    name: "BSc Information Technology",
    level: "UNDERGRADUATE",
    description: "Build a career in IT with core skills in networking, systems, and security.",
    duration: "3 Years",
    students: "1,200",
    courses: "15",
    faculty: "Science & Technology",
    slug: "bsc-information-technology"
  },
  {
    name: "BSc Software Engineering",
    level: "UNDERGRADUATE",
    description: "Focus on the full software development lifecycle and modern engineering practices.",
    duration: "4 Years",
    students: "850",
    courses: "20",
    faculty: "Science & Technology",
    slug: "bsc-software-engineering"
  }
]

const faculties = ["All Faculties", "Science & Technology", "Business & Management", "Engineering", "Law & Governance"]
const levels = ["All Levels", "UNDERGRADUATE", "POSTGRADUATE"]

export function FeaturedPrograms() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFaculty, setSelectedFaculty] = useState("All Faculties")
  const [selectedLevel, setSelectedLevel] = useState("All Levels")

  const filteredPrograms = programs.filter((program) => {
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFaculty = selectedFaculty === "All Faculties" || program.faculty === selectedFaculty
    const matchesLevel = selectedLevel === "All Levels" || program.level === selectedLevel
    return matchesSearch && matchesFaculty && matchesLevel
  })

  return (
    <section className="py-20 sm:py-28 bg-white">
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
            Programs
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-serif text-[#1A0A00]">
            Featured Programs
          </h2>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col md:flex-row gap-4 mb-12"
        >
          {/* Search */}
          <div className="relative w-full md:flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B5B4F]" />
            <input
              type="text"
              placeholder="Search programs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-[#E8E0D5] rounded-lg bg-white text-[#1A0A00] placeholder:text-[#6B5B4F] focus:outline-none focus:ring-2 focus:ring-[#8B0000]/20 focus:border-[#8B0000]"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Faculty Dropdown */}
            <div className="relative w-full">
              <select
                value={selectedFaculty}
                onChange={(e) => setSelectedFaculty(e.target.value)}
                className="appearance-none w-full sm:w-48 px-4 py-3 pr-10 border border-[#E8E0D5] rounded-lg bg-white text-[#1A0A00] focus:outline-none focus:ring-2 focus:ring-[#8B0000]/20 focus:border-[#8B0000]"
              >
                {faculties.map((faculty) => (
                  <option key={faculty} value={faculty}>{faculty}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B5B4F] pointer-events-none" />
            </div>

            {/* Level Dropdown */}
            <div className="relative w-full">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="appearance-none w-full sm:w-40 px-4 py-3 pr-10 border border-[#E8E0D5] rounded-lg bg-white text-[#1A0A00] focus:outline-none focus:ring-2 focus:ring-[#8B0000]/20 focus:border-[#8B0000]"
              >
                {levels.map((level) => (
                  <option key={level} value={level}>{level === "All Levels" ? level : level.charAt(0) + level.slice(1).toLowerCase()}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B5B4F] pointer-events-none" />
            </div>
          </div>
        </motion.div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrograms.map((program, index) => (
            <motion.div
              key={program.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover="hover"
            >
              <div className="group h-full bg-white rounded-2xl border border-black/5 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col relative"
                   style={{ transform: "translateY(var(--translate-y, 0))" }}>
                <style jsx>{`
                  div {
                    --translate-y: 0;
                    transition: transform 0.3s ease;
                  }
                  div:hover {
                    --translate-y: -4px;
                  }
                `}</style>
                
                {/* Top Header Bar */}
                <motion.div 
                  className="w-full"
                  variants={{
                    hover: { height: 12 }
                  }}
                  initial={{ height: 8 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    backgroundColor: program.level === "UNDERGRADUATE" ? "#8B0000" : "#E8B84B"
                  }}
                />

                {/* Body Section */}
                <div className="p-6 lg:p-8 flex-1">
                  {/* Badge */}
                  <span className={`inline-block px-3 py-1 text-[11px] font-bold tracking-[1.5px] uppercase rounded-md ${
                    program.level === "UNDERGRADUATE" 
                      ? "bg-[#FFF0F0] text-[#8B0000]" 
                      : "bg-[#FFF8E8] text-[#C9860A]"
                  }`}>
                    {program.level}
                  </span>

                  {/* Program Name */}
                  <h3 className="mt-4 text-[20px] font-serif font-bold text-[#1A0A00] leading-tight line-clamp-2">
                    {program.name}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-[13px] text-[#6B7280] leading-relaxed line-clamp-3">
                    {program.description}
                  </p>

                  {/* Divider */}
                  <div className="my-5 border-t border-[#F0EDE8]" />

                  {/* Info Row */}
                  <div className="flex flex-wrap gap-y-3 gap-x-4">
                    <div className="flex items-center gap-1.5 text-[13px] text-[#6B7280]">
                      <Clock className="w-4 h-4 text-[#8B0000]/40" />
                      <span>{program.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[13px] text-[#6B7280]">
                      <Users className="w-4 h-4 text-[#8B0000]/40" />
                      <span>{program.students} Students</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[13px] text-[#6B7280]">
                      <BookOpen className="w-4 h-4 text-[#8B0000]/40" />
                      <span>{program.courses} Courses</span>
                    </div>
                  </div>
                </div>

                {/* Footer Section */}
                <div className="p-5 lg:px-8 lg:py-6 bg-[#FAFAF8] border-t border-[#F0EDE8] flex items-center justify-end mt-auto">
                  <div className="flex items-center gap-2">
                    <Link 
                      href={`/academics/programs/${program.slug}`}
                      className="px-4 py-2 text-[12px] font-bold text-[#8B0000] border border-[#8B0000]/20 rounded-full hover:bg-[#8B0000] hover:text-white transition-colors"
                    >
                      Details
                    </Link>
                    <a
                      href="https://Applicants.iuea.ac.ug"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-[#8B0000] text-white text-[12px] font-bold rounded-full hover:bg-[#a30000] transition-colors flex items-center gap-1 group/btn"
                      style={{ textDecoration: 'none' }}
                    >
                      Apply Now
                      <ArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredPrograms.length === 0 && (
          <div className="text-center py-12 text-[#6B5B4F]">
            No programs found matching your criteria.
          </div>
        )}
      </div>
    </section>
  )
}
