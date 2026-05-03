"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Search, Globe, Award, BookOpen, Lightbulb, Microscope } from "lucide-react"

export default function ResearchProgramsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-[#1A0A00] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/pic10.jpg" alt="Research Programs" fill className="object-cover opacity-20" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-[#E8B84B] text-sm font-bold mb-8"
          >
            <Microscope className="w-4 h-4" />
            Pioneering African Research
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl lg:text-8xl font-serif font-bold text-white mb-6"
          >
            Research at <span className="text-[#E8B84B]">IUEA</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-white/70 max-w-3xl mx-auto"
          >
            Driving innovation and solving continental challenges through rigorous academic inquiry and practical research initiatives.
          </motion.p>
        </div>
      </section>

      {/* Research Pillars */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Lightbulb, title: "Innovation", desc: "Developing technological solutions for real-world African challenges." },
              { icon: Globe, title: "Sustainability", desc: "Research focused on climate change, renewable energy, and green tech." },
              { icon: Search, title: "Inquiry", desc: "Fostering a culture of deep academic investigation and critical thinking." },
              { icon: Award, title: "Impact", desc: "Ensuring our research translates into policy changes and social growth." }
            ].map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 bg-[#F5F0E8] rounded-3xl text-center hover:bg-[#8B0000] hover:text-white transition-all duration-500"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <pillar.icon className="w-8 h-8 text-[#8B0000]" />
                </div>
                <h4 className="text-xl font-bold mb-4">{pillar.title}</h4>
                <p className="text-sm opacity-70 leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Research Projects */}
      <section className="py-24 bg-[#faf9f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-serif font-bold text-[#1A0A00] mb-4">Active Research Areas</h2>
              <p className="text-[#6B5B4F]">Join our faculty and students in exploring the frontiers of knowledge in these critical domains.</p>
            </div>
            <Link href="/research" className="px-8 py-3 bg-[#1A0A00] text-white rounded-full font-bold hover:bg-[#8B0000] transition-all">
              View All Publications
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "Renewable Energy in Sub-Saharan Africa", lead: "Dr. James Mukasa", status: "Active" },
              { title: "AI-Driven Healthcare for Rural Communities", lead: "Prof. Sarah Nakato", status: "Ongoing" },
              { title: "Legal Frameworks for Digital Economies", lead: "Justice (Rtd) Richard Kato", status: "Active" },
              { title: "Sustainable Urban Infrastructure in Kampala", lead: "Eng. David Okello", status: "Active" }
            ].map((project) => (
              <div key={project.title} className="bg-white p-10 rounded-[3rem] shadow-sm border border-black/5 hover:border-[#8B0000] transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-[#8B0000]/10 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-[#8B0000]" />
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-bold uppercase tracking-widest">
                    {project.status}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-[#1A0A00] mb-4">{project.title}</h3>
                <p className="text-sm text-gray-500 mb-6">Lead Researcher: <span className="text-[#1A0A00] font-bold">{project.lead}</span></p>
                <Link href="#" className="inline-flex items-center gap-2 font-bold text-[#8B0000] hover:gap-3 transition-all">
                  Read Abstract <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#8B0000] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-8">Join the Vanguard of African Innovation</h2>
          <p className="text-white/80 mb-12 text-lg">
            We are always looking for passionate researchers and PhD candidates to join our collaborative ecosystem.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link 
              href="/contact"
              className="px-12 py-5 bg-[#E8B84B] text-[#1A0A00] rounded-full font-bold hover:bg-white transition-all shadow-xl"
            >
              Collaborate with Us
            </Link>
            <a
              href="https://Applicants.iuea.ac.ug"
              target="_blank"
              rel="noopener noreferrer"
              className="px-12 py-5 border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-all"
              style={{ textDecoration: 'none' }}
            >
              Apply for PhD
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
