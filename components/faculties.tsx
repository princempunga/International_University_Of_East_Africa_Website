"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const faculties = [
  {
    name: "Science & Technology",
    description: "Advancing innovation through cutting-edge computer science, IT and software engineering programs.",
    programs: 14,
    students: 1820,
    slug: "science-technology",
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=900&q=80",
  },
  {
    name: "Business & Management", 
    description: "Developing tomorrow's global business leaders with world-class MBA and management programs.",
    programs: 12,
    students: 2340,
    slug: "business-management",
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=900&q=80",
  },
  {
    name: "Engineering",
    description: "Building Africa's infrastructure with hands-on civil, electrical and mechanical engineering expertise.",
    programs: 10,
    students: 1450,
    slug: "engineering",
    image: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=900&q=80",
  },
  {
    name: "Law & Governance",
    description: "Shaping justice and governance across East Africa through rigorous legal education and practice.",
    programs: 8,
    students: 980,
    slug: "law-governance",
    image: "https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8?w=900&q=80",
  }
]

export function Faculties() {
  return (
    <section className="py-[100px] bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-[#E8B84B] text-[11px] font-semibold tracking-[3px] uppercase"
          >
            Academic Excellence
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-4xl sm:text-5xl font-serif text-[#1A0A00]"
          >
            Our Faculties
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faculties.map((faculty, index) => (
            <motion.div
              key={faculty.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.7, 
                delay: index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <Link href={`/academics/faculties/${faculty.slug}`}>
                <motion.div
                  whileHover="hover"
                  className="relative block w-full h-[380px] rounded-[20px] overflow-hidden cursor-pointer shadow-sm"
                >
                  {/* Crimson Overlay Animation */}
                  <motion.div 
                    variants={{
                      hover: { opacity: 0.35 }
                    }}
                    initial={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 bg-[#8B0000] z-1 pointer-events-none rounded-[20px]"
                  />

                  {/* Background Image */}
                  <motion.div 
                    variants={{
                      hover: { scale: 1.08 }
                    }}
                    initial={{ scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute inset-0 z-0"
                  >
                    <Image
                      src={faculty.image}
                      alt={faculty.name}
                      fill
                      className="object-cover"
                    />
                  </motion.div>

                  {/* Overlay */}
                  <motion.div 
                    variants={{
                      hover: { opacity: 0.9 }
                    }}
                    initial={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 z-10" 
                    style={{
                      background: 'linear-gradient(to top, rgba(10,0,0,0.92) 0%, rgba(10,0,0,0.5) 50%, transparent 100%)'
                    }}
                  />

                  {/* Content Wrapper */}
                  <motion.div 
                    variants={{
                      hover: { y: -8 }
                    }}
                    initial={{ y: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute inset-0 z-20 p-7 flex flex-col justify-end"
                  >
                    <span className="text-[#E8B84B] text-[11px] font-semibold tracking-[3px] uppercase">
                      Faculty
                    </span>
                    <h3 className="mt-1.5 text-[28px] font-serif font-bold text-white leading-tight">
                      {faculty.name}
                    </h3>
                    <p className="mt-2 text-sm text-white/75 line-clamp-2 leading-relaxed">
                      {faculty.description}
                    </p>
                    
                    {/* Gold Divider Line */}
                    <motion.div 
                      variants={{
                        hover: { width: 80 }
                      }}
                      initial={{ width: 40 }}
                      transition={{ duration: 0.4 }}
                      className="my-3 h-[1px] bg-[#E8B84B]/50" 
                    />

                    <div className="flex items-center gap-2 text-[13px] text-[#E8B84B] font-medium mb-4">
                      <span>{faculty.programs} Programs</span>
                      <span className="w-1 h-1 rounded-full bg-[#E8B84B]/50" />
                      <span>{faculty.students.toLocaleString()} Students</span>
                    </div>

                    <div className="inline-flex items-center gap-2 text-sm font-medium text-white transition-all">
                      Explore Faculty
                      <motion.div
                        variants={{
                          hover: { x: 6 }
                        }}
                        initial={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
