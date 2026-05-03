"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Zap, Target, BookOpen, UserCheck, Calendar } from "lucide-react"

const courses = [
  { title: "Graphic Design Basics", duration: "4 Weeks", category: "Technology" },
  { title: "Excel for Business", duration: "2 Weeks", category: "Business" },
  { title: "Public Speaking & Advocacy", duration: "3 Weeks", category: "Communication" },
  { title: "Introduction to Python", duration: "6 Weeks", category: "Technology" },
  { title: "Fundamentals of Law", duration: "4 Weeks", category: "Legal" },
  { title: "Basic First Aid & Healthcare", duration: "2 Weeks", category: "Health" }
]

export default function ShortCoursesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 bg-[#F5F0E8] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#8B0000]/10 rounded-full text-[#8B0000] text-sm font-bold mb-8"
            >
              <Zap className="w-4 h-4" />
              Fast-Track Your Skills
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl lg:text-7xl font-serif font-bold text-[#1A0A00] mb-6"
            >
              Short <span className="text-[#8B0000]">Courses</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-[#6B5B4F] mb-10"
            >
              Master new skills in weeks, not years. Our intensive short courses are designed for rapid personal and professional development.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, idx) => (
              <motion.div
                key={course.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 bg-white border border-gray-100 rounded-[2rem] hover:shadow-xl transition-all group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="px-3 py-1 bg-[#F5F0E8] text-[#8B0000] rounded-full text-[10px] font-bold uppercase tracking-widest">
                    {course.category}
                  </div>
                  <Calendar className="w-5 h-5 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-[#1A0A00] mb-4 group-hover:text-[#8B0000] transition-colors">{course.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                  <BookOpen className="w-4 h-4" />
                  Duration: <span className="font-bold text-[#1A0A00]">{course.duration}</span>
                </div>
                <a
                  href="https://Applicants.iuea.ac.ug"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-bold text-[#8B0000] group-hover:gap-3 transition-all"
                  style={{ textDecoration: 'none' }}
                >
                  Enroll Now <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-white border-t-4 border-[#8B0000] text-[#1A0A00]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: Target, title: "Industry Relevant", desc: "Courses designed to address current market needs and skill gaps." },
              { icon: UserCheck, title: "Expert Tutors", desc: "Learn from practitioners who bring years of industry experience." },
              { icon: Zap, title: "Immediate Impact", desc: "Gain skills you can apply to your project or job the very next day." }
            ].map((b) => (
              <div key={b.title} className="text-center">
                <div className="w-16 h-16 bg-[#8B0000]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <b.icon className="w-8 h-8 text-[#8B0000]" />
                </div>
                <h4 className="text-xl font-bold text-[#1A0A00] mb-4">{b.title}</h4>
                <p className="text-[#6B7280] leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-serif font-bold text-[#1A0A00] mb-6">Don't Wait to Grow Your Skills</h2>
          <p className="text-gray-500 mb-10 text-lg">
            Our next batch of short courses starts soon. Limited slots available to ensure quality interactive sessions.
          </p>
          <a
            href="https://Applicants.iuea.ac.ug"
            target="_blank"
            rel="noopener noreferrer"
            className="px-12 py-4 bg-[#8B0000] text-white rounded-full font-bold hover:bg-[#6B0000] transition-all shadow-xl inline-flex items-center gap-2"
            style={{ textDecoration: 'none' }}
          >
            Register Now <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </main>
  )
}
