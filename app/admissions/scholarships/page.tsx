"use client"

import { motion } from "framer-motion"
import { Award, Star, Users, GraduationCap, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"


export default function ScholarshipsPage() {
  return (
    <main className="min-h-screen bg-white">

      
      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 bg-[#8B0000] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/pic6.jpg" alt="Scholarships Background" fill className="object-cover opacity-50" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-[#8B0000]/30 via-[#8B0000]/50 to-[#8B0000]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-serif font-bold text-white mb-6"
          >
            Scholarships & Aid
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80 max-w-2xl mx-auto"
          >
            Rewarding excellence and supporting talent from across Africa and beyond.
          </motion.p>
        </div>
      </section>

      {/* Types of Scholarships */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                icon: Star,
                title: "African Innovator Scholarship",
                desc: "A prestigious award for students with groundbreaking technology and innovation ideas that can solve local problems.",
                criteria: ["Evidence of innovative project", "Strong STEM background", "Leadership potential"]
              },
              {
                icon: GraduationCap,
                title: "African Scholar Scholarship",
                desc: "Merit-based scholarships for high-achieving students from all African nations.",
                criteria: ["UACE: 2 Principal Passes", "GPA of 4.0+ for transfers", "Excellent entry interview"]
              },
              {
                icon: Award,
                title: "Sports Excellence Scholarship",
                desc: "For elite athletes who represent the university in national and regional competitions.",
                criteria: ["National team representation", "Proven track record in sports", "Maintaining academic standards"]
              },
              {
                icon: Users,
                title: "Vulnerable Groups Scholarship",
                desc: "Supporting talented students from disadvantaged backgrounds and vulnerable communities.",
                criteria: ["Proven financial need", "Community recommendation", "Academic commitment"]
              }
            ].map((s, idx) => (
              <motion.div 
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-10 bg-[#F5F0E8] rounded-3xl"
              >
                <div className="w-16 h-16 bg-[#8B0000] rounded-2xl flex items-center justify-center mb-6">
                  <s.icon className="w-8 h-8 text-[#E8B84B]" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#1A0A00] mb-4">{s.title}</h3>
                <p className="text-[#6B5B4F] mb-8">{s.desc}</p>
                <div className="space-y-3">
                  <h4 className="font-bold text-sm text-[#8B0000] uppercase tracking-wider">Criteria:</h4>
                  {s.criteria.map((c) => (
                    <div key={c} className="flex items-center gap-2 text-sm text-[#1A0A00]">
                      <CheckCircle className="w-4 h-4 text-[#8B0000]" />
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-[#8B0000] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">Apply for Financial Aid</h2>
          <p className="text-white/70 mb-10">
            Scholarship applications are open for the 2026 academic year. Make sure to submit your general admission application first.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="https://Applicants.iuea.ac.ug"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 bg-[#E8B84B] text-[#1A0A00] rounded-full font-bold hover:bg-[#D4A73D] transition-all"
              style={{ textDecoration: 'none' }}
            >
              Apply for Admission
            </a>
            <Link href="/contact" className="px-10 py-4 border-2 border-white rounded-full font-bold hover:bg-white/10 transition-all">
              Contact Scholarship Office
            </Link>
          </div>
        </div>
      </section>


    </main>
  )
}
