"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Users, Briefcase, Award, Calendar, ArrowRight } from "lucide-react"

export function AlumniContent() {
  return (
    <main className="min-h-screen">

      
      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#8B0000]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1600"
            alt="Alumni"
            fill
            className="object-cover opacity-50"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-8xl font-serif font-bold text-white mb-6"
          >
            IUEA Alumni
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80 max-w-2xl mx-auto mb-10"
          >
            A lifelong community of over 24,000 professionals, leaders, and innovators across the globe.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <Link href="/alumni/register" className="px-10 py-4 bg-[#8B0000] text-white rounded-full font-bold hover:bg-[#6B0000] transition-all">
              Join the Network
            </Link>
            <Link href="/alumni/directory" className="px-10 py-4 border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-all">
              Alumni Directory
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Alumni Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-[#1A0A00]">Lifelong Benefits</h2>
            <p className="text-[#6B5B4F] mt-2">Staying connected to IUEA comes with exclusive opportunities.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Users, title: "Networking", desc: "Access to professional networking events and mentorship programs." },
              { icon: Briefcase, title: "Career Support", desc: "Exclusive job postings and career counseling services for life." },
              { icon: Award, title: "Special Discounts", desc: "Discounts on short courses, postgraduate programs, and campus events." },
              { icon: Calendar, title: "Alumni Events", desc: "Invitations to homecoming galas, reunions, and regional meetups." }
            ].map((benefit, idx) => (
              <motion.div 
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 bg-white border border-[rgba(139,0,0,0.1)] rounded-3xl text-center"
              >
                <div className="w-16 h-16 bg-[#8B0000] rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-[#1A0A00] mb-2">{benefit.title}</h4>
                <p className="text-sm text-[#6B5B4F]">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-[#F9F9F9] border-y border-[rgba(139,0,0,0.05)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif font-bold text-[#1A0A00] mb-12 text-center">Alumni Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                name: "Sarah Nalwanga", 
                title: "Software Engineer at Google", 
                year: "Class of 2018", 
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600",
                quote: "IUEA gave me the technical foundation and global perspective I needed to excel in my career."
              },
              { 
                name: "David Okello", 
                title: "Entrepreneur & Founder of SolarTech", 
                year: "Class of 2015", 
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600",
                quote: "The innovation lab at IUEA was where my startup journey truly began. I am proud to be an alumnus."
              },
              { 
                name: "Mary Anyango", 
                title: "Policy Advisor at UN", 
                year: "Class of 2012", 
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600",
                quote: "My years at IUEA shaped my understanding of governance and leadership in the African context."
              }
            ].map((story, idx) => (
              <motion.div 
                key={story.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-[3rem] shadow-sm flex flex-col items-center text-center"
              >
                <div className="relative w-24 h-24 rounded-full overflow-hidden mb-6 border-4 border-white shadow-md">
                  <Image src={story.image} alt={story.name} fill className="object-cover" />
                </div>
                <h4 className="font-bold text-[#1A0A00] mb-1">{story.name}</h4>
                <p className="text-xs text-[#8B0000] font-bold uppercase mb-4">{story.year}</p>
                <p className="text-sm text-[#1A0A00] font-serif italic mb-6">"{story.quote}"</p>
                <p className="text-sm text-[#6B5B4F]">{story.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Give Back Section */}
      <section className="py-20 bg-[#8B0000] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">Give Back to Your Alma Mater</h2>
          <p className="text-white/80 mb-10">
            Support the next generation of students through mentoring, guest lectures, or contributions to our scholarship fund.
          </p>
          <button className="px-10 py-4 bg-white text-[#8B0000] rounded-full font-bold hover:bg-gray-100 transition-all flex items-center justify-center gap-2 mx-auto">
            Get Involved <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

    </main>
  )
}
