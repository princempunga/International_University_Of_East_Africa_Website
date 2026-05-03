"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, GraduationCap, Clock, BookOpen, CheckCircle2 } from "lucide-react"

const programs = [
  { 
    name: "BSc Computer Science", 
    desc: "Master the art of computing, from algorithms to AI, and build the future of technology.",
    duration: "3 Years",
    slug: "bsc-computer-science"
  },
  { 
    name: "BSc Software Engineering", 
    desc: "Learn to design, develop, and maintain complex software systems in a real-world environment.",
    duration: "4 Years",
    slug: "bsc-software-engineering"
  },
  { 
    name: "BSc Information Technology", 
    desc: "Gain the skills to manage and implement IT solutions across diverse industries.",
    duration: "3 Years",
    slug: "bsc-information-technology"
  },
  { 
    name: "Bachelor of Laws (LLB)", 
    desc: "Develop a deep understanding of legal principles and prepare for a career in law.",
    duration: "4 Years",
    slug: "llb-laws"
  },
  { 
    name: "BSc Civil Engineering", 
    desc: "Design and build the infrastructure that powers modern civilization.",
    duration: "4 Years",
    slug: "bsc-civil-engineering"
  },
  { 
    name: "BSc Nursing", 
    desc: "Prepare for a compassionate and professional career in healthcare and patient care.",
    duration: "4 Years",
    slug: "bsc-nursing"
  }
]

export default function UndergraduateProgramsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-[#8B0000] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/hero.jpg" 
            alt="Undergraduate Programs" 
            fill 
            className="object-cover opacity-30"
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
            <GraduationCap className="w-4 h-4 text-white" />
            Undergraduate Excellence
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl lg:text-7xl font-serif font-bold text-white mb-6"
          >
            Shape Your Future
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-white/80 max-w-2xl mx-auto"
          >
            Our undergraduate programs are designed to provide you with the skills, knowledge, and mindset to lead in your chosen field.
          </motion.p>
        </div>
      </section>

      {/* Program Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, idx) => (
              <motion.div
                key={program.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-[#F5F0E8] rounded-[2.5rem] p-8 hover:bg-[#8B0000] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-[#8B0000] transition-colors">
                  <BookOpen className="w-6 h-6 text-[#8B0000] group-hover:text-white" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#1A0A00] mb-4 group-hover:text-white transition-colors">
                  {program.name}
                </h3>
                <p className="text-[#6B5B4F] mb-6 group-hover:text-white/80 transition-colors leading-relaxed">
                  {program.desc}
                </p>
                <div className="flex items-center gap-2 text-sm font-bold text-[#8B0000] group-hover:text-white transition-colors mb-8">
                  <Clock className="w-4 h-4" />
                  {program.duration}
                </div>
                <Link 
                  href={`/academics/programs/${program.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#1A0A00] group-hover:text-white border-b-2 border-[#1A0A00]/10 group-hover:border-white/20 pb-1 transition-all"
                >
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why IUEA Section */}
      <section className="py-24 bg-white border-t-4 border-[#8B0000] text-[#1A0A00]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-[#1A0A00] mb-8">Why Choose IUEA for Undergraduate?</h2>
              <div className="space-y-6">
                {[
                  { title: "Global Accreditation", desc: "Degrees recognized worldwide for quality and excellence." },
                  { title: "Innovation Hub", desc: "Access to cutting-edge technology and research labs." },
                  { title: "Career Placement", desc: "Strong industry partnerships and internship opportunities." },
                  { title: "Diverse Community", desc: "Study alongside students from over 45 different nations." }
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="mt-1">
                      <CheckCircle2 className="w-6 h-6 text-[#8B0000]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-[#1A0A00] mb-1">{item.title}</h4>
                      <p className="text-[#6B7280] text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[600px] rounded-[3rem] overflow-hidden">
              <Image 
                src="/pic6.jpg" 
                alt="Campus Life" 
                fill 
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#F5F0E8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-serif font-bold text-[#1A0A00] mb-6">Ready to Start Your Journey?</h2>
          <p className="text-[#6B5B4F] mb-10 text-lg">
            Applications for the 2026 intake are now open. Secure your spot in one of Africa's leading universities.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="https://Applicants.iuea.ac.ug"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 bg-[#8B0000] text-white rounded-full font-bold hover:bg-[#6B0000] transition-all shadow-xl hover:-translate-y-1"
              style={{ textDecoration: 'none' }}
            >
              Apply Online Now
            </a>
            <Link 
              href="/contact"
              className="px-10 py-4 border-2 border-[#8B0000] text-[#8B0000] rounded-full font-bold hover:bg-[#8B0000] hover:text-white transition-all"
            >
              Speak to an Advisor
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
