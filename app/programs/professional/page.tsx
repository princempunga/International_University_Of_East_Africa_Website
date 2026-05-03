"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Briefcase, Award, Zap, CheckCircle, Globe } from "lucide-react"

const courses = [
  { 
    name: "Certified Public Accountant (CPA)", 
    desc: "Gain the gold standard qualification in accounting and finance recognized across the globe.",
    partner: "ICPAU",
    slug: "cpa-uganda"
  },
  { 
    name: "Cisco Certified Network Associate (CCNA)", 
    desc: "Master the fundamentals of networking and prepare for a career in network administration.",
    partner: "Cisco Networking Academy",
    slug: "ccna"
  },
  { 
    name: "Project Management Professional (PMP)", 
    desc: "Achieve the most industry-recognized certification for project managers.",
    partner: "PMI",
    slug: "pmp-cert"
  },
  { 
    name: "Digital Marketing Certification", 
    desc: "Learn to build brands and grow businesses using modern digital marketing strategies.",
    partner: "IUEA Innovation Lab",
    slug: "digital-marketing"
  },
  { 
    name: "Human Resource Management Professional", 
    desc: "Develop advanced skills in talent management, organizational behavior, and labor law.",
    partner: "Professional Board",
    slug: "hr-professional"
  },
  { 
    name: "Cybersecurity & Ethical Hacking", 
    desc: "Learn to protect organizations from cyber threats and secure digital assets.",
    partner: "IUEA Tech Center",
    slug: "cybersecurity-professional"
  }
]

export default function ProfessionalProgramsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-[#F5F0E8] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[#8B0000]/5 -skew-x-12 translate-x-1/4" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:w-2/3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#8B0000]/10 rounded-full text-[#8B0000] text-sm font-bold mb-8"
            >
              <Briefcase className="w-4 h-4" />
              Industry-Aligned Certifications
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl lg:text-7xl font-serif font-bold text-[#1A0A00] mb-8 leading-tight"
            >
              Professional <br /> <span className="text-[#8B0000]">Certifications</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-[#6B5B4F] max-w-xl mb-10 leading-relaxed"
            >
              Accelerate your career with industry-recognized professional courses designed for immediate impact in the job market.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link href="#courses" className="px-10 py-4 bg-[#8B0000] text-white rounded-full font-bold hover:bg-[#1A0A00] transition-all inline-flex items-center gap-2">
                Browse Courses <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
        
        <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-[600px] rounded-l-[5rem] overflow-hidden shadow-2xl">
          <Image src="/pic6.jpg" alt="Professional Education" fill className="object-cover" />
        </div>
      </section>

      {/* Courses Grid */}
      <section id="courses" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {courses.map((course, idx) => (
              <motion.div
                key={course.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white rounded-3xl p-8 border border-gray-100 hover:border-[#8B0000] hover:shadow-2xl transition-all duration-500"
              >
                <div className="w-14 h-14 bg-[#F5F0E8] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#8B0000] transition-colors">
                  <Award className="w-6 h-6 text-[#8B0000] group-hover:text-white" />
                </div>
                <div className="text-[10px] font-bold text-[#8B0000] uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Globe className="w-3 h-3" />
                  {course.partner}
                </div>
                <h3 className="text-2xl font-bold text-[#1A0A00] mb-4 group-hover:text-[#8B0000] transition-colors">
                  {course.name}
                </h3>
                <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                  {course.desc}
                </p>
                <Link 
                  href={`/academics/programs/${course.slug}`}
                  className="w-full py-3 border-2 border-gray-100 rounded-xl font-bold text-sm text-[#1A0A00] flex items-center justify-center gap-2 group-hover:bg-[#8B0000] group-hover:text-white group-hover:border-[#8B0000] transition-all"
                >
                  Course Details <Zap className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-24 bg-[#8B0000] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold">Why Get Certified at IUEA?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: "Fast-Track Career", desc: "Gain certifications in 3-6 months and improve your employability immediately." },
              { title: "Global Partnerships", desc: "Our courses are partnered with world-leading institutions like Cisco and PMI." },
              { title: "Practical Focus", desc: "Hands-on training from industry experts who bring real-world experience to the classroom." }
            ].map((benefit) => (
              <div key={benefit.title} className="text-center p-8 bg-white/5 rounded-[3rem] backdrop-blur-sm border border-white/10">
                <CheckCircle className="w-10 h-10 text-[#E8B84B] mx-auto mb-6" />
                <h4 className="text-xl font-bold mb-4">{benefit.title}</h4>
                <p className="text-white/60 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold text-[#1A0A00] mb-6">Boost Your Professional Profile</h2>
          <p className="text-gray-500 mb-10 text-lg">
            Registration is currently ongoing for all professional certifications. Start today and transform your career.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="https://Applicants.iuea.ac.ug"
              target="_blank"
              rel="noopener noreferrer"
              className="px-12 py-4 bg-[#1A0A00] text-white rounded-full font-bold hover:bg-[#8B0000] transition-all shadow-lg"
              style={{ textDecoration: 'none' }}
            >
              Enroll Now
            </a>
            <Link 
              href="/contact"
              className="px-12 py-4 border-2 border-[#1A0A00] text-[#1A0A00] rounded-full font-bold hover:bg-gray-50 transition-all"
            >
              Request a Callback
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
