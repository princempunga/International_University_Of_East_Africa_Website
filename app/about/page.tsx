"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { History, Target, Eye, Shield, Award, Users, BookOpen } from "lucide-react"
import { useCMSSEO } from "@/hooks/useCMSSEO"


export default function AboutPage() {
  const seoComponent = useCMSSEO('about', {
    title: 'About IUEA | Our Mission, Vision & History',
    description: 'Learn about the International University of East Africa — our history, mission, and core values.',
  })

  return (
    <main className="min-h-screen">
      {seoComponent}
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1562774053-701939374585?w=1600"
            alt="About IUEA"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#1A0A00]/70" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2 text-white/60 text-sm mb-6"
          >
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>&gt;</span>
            <span className="text-white">About</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl lg:text-7xl font-serif font-bold text-white mb-6"
          >
            About IUEA
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-white/80 max-w-2xl mx-auto"
          >
            IUEA is a premier private university licensed by the Uganda National Council for Higher Education (NCHE), combining traditional academic excellence with modern innovation.
          </motion.p>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="story" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#E8B84B] text-sm font-semibold tracking-widest uppercase">Our Journey</span>
            <h2 className="mt-4 text-4xl font-serif text-[#1A0A00]">The Story of IUEA</h2>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gray-200 hidden md:block" />
            
            <div className="space-y-12">
              {[
                { year: "2011", event: "IUEA was officially founded and licensed by the Uganda National Council for Higher Education (NCHE) with a focus on technology." },
                { year: "2015", event: "Rapid expansion of academic programs and the launch of the dedicated Engineering and E-mobility labs." },
                { year: "2019", event: "Acquisition and demolition of the adjacent Wonder World Amusement Park to facilitate massive campus expansion and modern auditorium construction." },
                { year: "2022", event: "Inauguration of the 1500-seat state-of-the-art auditorium and high-tech RTX computer labs." },
                { year: "2024", event: "Reached milestone of over 10,000 students from 40+ countries, solidifying our status as a global hub." }
              ].map((milestone, idx) => (
                <motion.div 
                  key={milestone.year}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className={`flex flex-col md:flex-row items-center gap-8 ${idx % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                >
                  <div className="flex-1 text-center md:text-left">
                    <div className={`p-6 bg-[#F5F0E8] rounded-2xl shadow-sm hover:shadow-md transition-shadow ${idx % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                      <span className="text-2xl font-bold text-[#8B0000]">{milestone.year}</span>
                      <p className="mt-2 text-[#1A0A00]">{milestone.event}</p>
                    </div>
                  </div>
                  <div className="relative z-10 w-12 h-12 rounded-full bg-[#8B0000] border-4 border-white shadow-md flex items-center justify-center shrink-0">
                    <div className="w-3 h-3 rounded-full bg-white" />
                  </div>
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Global Partnerships */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-[#1A0A00]">Global Partnerships</h2>
            <p className="text-[#6B5B4F] mt-4">Collaborating with world-class institutions to provide global opportunities.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {["Tokat Gaziosmanpasa University", "Sunmaker Oil & Gas", "EcoBrixs Recycling", "Zhengzhou Railway College"].map((partner) => (
              <div key={partner} className="flex items-center justify-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-sm font-bold text-[#8B0000] text-center">{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-[#F5F0E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: "Our Mission", text: "To provide an excellent education that includes practical experience and skills to ensure that students are prepared for the world of work." },
              { icon: Eye, title: "Our Vision", text: "To be the Technological University of Choice in Africa." },
              { icon: Shield, title: "Our Values", text: "Integrity, Innovation, Inclusivity, and Excellence in all our academic and professional pursuits." }
            ].map((item, idx) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="p-8 bg-white rounded-2xl shadow-sm text-center hover:-translate-y-2 transition-transform"
              >
                <div className="w-16 h-16 rounded-full bg-[#8B0000]/10 flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-[#8B0000]" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#1A0A00] mb-4">{item.title}</h3>
                <p className="text-[#6B5B4F]">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#E8B84B] text-sm font-semibold tracking-widest uppercase">Our Leadership</span>
            <h2 className="mt-4 text-4xl font-serif text-[#1A0A00] mb-16">Meet Our Executive Team</h2>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {[
              { name: "Amb. (Dr.) Amina Mohamed", title: "Chancellor", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400" },
              { name: "Prof. Emeka Akaezuwa", title: "Vice Chancellor", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" },
              { name: "Dr. Lakshmi Bhabuu", title: "Acting DVC & Dean FST", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400" },
              { name: "Dr. Abdulsalam Ibrahim Shema", title: "Dean, Faculty of Engineering", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400" },
              { name: "Emmanuel Sebijjo Ssemmanda", title: "Dean, Faculty of Law", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400" }
            ].map((leader, idx) => (
              <motion.div 
                key={leader.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group"
              >
                <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-[#F5F0E8] group-hover:border-[#E8B84B] transition-colors mb-6">
                  <Image src={leader.image} alt={leader.name} fill className="object-cover" />
                </div>
                <h4 className="text-lg font-bold text-[#1A0A00]">{leader.name}</h4>
                <p className="text-sm text-[#8B0000]">{leader.title}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <Link href="/about/leadership" className="px-8 py-3 border-2 border-[#8B0000] text-[#8B0000] rounded-full font-semibold hover:bg-[#8B0000] hover:text-white transition-all">
              View All Leadership
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-[#8B0000] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: "9K+", label: "Students", icon: Users },
              { value: "62+", label: "Programs", icon: BookOpen },
              { value: "45+", label: "Partners", icon: Award },
              { value: "28", label: "Years of Excellence", icon: Target }
            ].map((stat, idx) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditations Section */}
      <section className="py-20 bg-[#F5F0E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-serif text-[#1A0A00] mb-12"
          >
            Accreditations & Partnerships
          </motion.h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center opacity-70">
            {['NCHE', 'IUCEA', 'ACU', 'AfriQAN', 'IAU', 'ISO'].map((logo, idx) => (
              <motion.div 
                key={logo}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="h-20 bg-white rounded-lg flex items-center justify-center font-bold text-[#1A0A00] shadow-sm"
              >
                {logo}
              </motion.div>
            ))}
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8"
          >
            <Link href="/about/accreditation" className="text-[#8B0000] font-semibold hover:underline">
              Learn more about our accreditations
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Campus Gallery */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-serif text-[#1A0A00] mb-12 text-center"
          >
            Campus Gallery
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { src: "/pic1.jfif", alt: "IUEA Campus" },
              { src: "/pic2.jfif", alt: "IUEA Students" },
              { src: "/pic3.jfif", alt: "IUEA Facilities" }
            ].map((image, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative shadow-md group"
              >
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: '12px' }}
                  className="transition-transform duration-500 group-hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>


    </main>
  )
}
