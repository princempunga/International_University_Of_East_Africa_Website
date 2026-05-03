"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Trophy, Clock, Search, BookOpen } from "lucide-react"

const postgradPrograms = [
  { 
    name: "Master of Business Administration (MBA)", 
    desc: "Develop advanced leadership and management skills to excel in the global business landscape.",
    duration: "2 Years",
    slug: "mba"
  },
  { 
    name: "MSc Project Management", 
    desc: "Master the methodologies and tools required to lead complex projects across various sectors.",
    duration: "2 Years",
    slug: "msc-project-management"
  },
  { 
    name: "MSc Information Technology", 
    desc: "Stay ahead of the curve with advanced knowledge in cybersecurity, data science, and IT strategy.",
    duration: "2 Years",
    slug: "msc-information-technology"
  },
  { 
    name: "Master of Laws (LLM)", 
    desc: "Specialize in diverse areas of law and enhance your legal research and advocacy skills.",
    duration: "2 Years",
    slug: "llm-postgrad"
  },
  { 
    name: "Postgraduate Diploma in Education", 
    desc: "Prepare for a career in teaching and educational leadership at various levels.",
    duration: "1 Year",
    slug: "pgd-education"
  },
  { 
    name: "PhD in Business Administration", 
    desc: "Conduct original research and contribute to the advancement of business knowledge.",
    duration: "3-5 Years",
    slug: "phd-business"
  }
]

export default function PostgraduateProgramsPage() {
  return (
    <main className="min-h-screen bg-[#faf9f7]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-[#8B0000] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/pic10.jpg" 
            alt="Postgraduate Programs" 
            fill 
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#8B0000]/40 via-[#8B0000]/60 to-[#8B0000]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white text-sm font-bold mb-8"
          >
            <Trophy className="w-4 h-4 text-white" />
            Advanced Research & Leadership
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl lg:text-7xl font-serif font-bold text-white mb-6"
          >
            Advance Your Career
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-white/80 max-w-2xl mx-auto"
          >
            Deepen your expertise and expand your professional horizons with our world-class postgraduate degrees.
          </motion.p>
        </div>
      </section>

      {/* Program Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {postgradPrograms.map((program, idx) => (
              <motion.div
                key={program.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-black/5 hover:border-[#8B0000] transition-all duration-500 hover:shadow-xl group"
              >
                <div className="w-16 h-16 bg-[#F5F0E8] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#8B0000] transition-colors">
                  <BookOpen className="w-8 h-8 text-[#8B0000] group-hover:text-white" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#1A0A00] mb-4">
                  {program.name}
                </h3>
                <p className="text-[#6B5B4F] mb-8 leading-relaxed">
                  {program.desc}
                </p>
                <div className="flex items-center gap-6 pt-6 border-t border-dashed border-gray-200">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#8B0000]">
                    <Clock className="w-4 h-4" />
                    {program.duration}
                  </div>
                  <Link 
                    href={`/academics/programs/${program.slug}`}
                    className="flex-1 text-right text-sm font-bold text-[#1A0A00] hover:text-[#8B0000] transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Research & Innovation */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2 relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#8B0000]/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-[#8B0000]/10 rounded-full blur-3xl" />
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl">
                <Image 
                  src="/hero.jpg" 
                  alt="Research" 
                  width={600}
                  height={800}
                  className="object-cover"
                />
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-[#1A0A00] mb-8">Excellence in Research</h2>
              <p className="text-lg text-[#6B5B4F] mb-10 leading-relaxed">
                At IUEA, we believe that postgraduate education is not just about learning existing knowledge—it's about creating new knowledge. Our students are mentored by global experts and have access to advanced labs.
              </p>
              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-[#1A0A00] mb-2 flex items-center gap-2">
                    <Search className="w-5 h-5 text-[#8B0000]" />
                    Innovation Labs
                  </h4>
                  <p className="text-sm text-[#6B5B4F]">Equipped with the latest technology for data science, robotics, and engineering.</p>
                </div>
                <div>
                  <h4 className="font-bold text-[#1A0A00] mb-2 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-[#8B0000]" />
                    Expert Mentorship
                  </h4>
                  <p className="text-sm text-[#6B5B4F]">Work closely with professors who are leaders in their respective research fields.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#8B0000] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-8">Take the Next Step in Your Professional Journey</h2>
          <p className="text-white/80 mb-12 text-lg">
            Join a community of high-achievers and visionaries. Our admissions team is ready to guide you through the process.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a
              href="https://Applicants.iuea.ac.ug"
              target="_blank"
              rel="noopener noreferrer"
              className="px-12 py-5 bg-white text-[#8B0000] rounded-full font-bold hover:bg-gray-100 transition-all shadow-xl"
              style={{ textDecoration: 'none' }}
            >
              Start Your Application
            </a>
            <Link 
              href="/contact"
              className="px-12 py-5 border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-all"
            >
              Contact Admissions
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
