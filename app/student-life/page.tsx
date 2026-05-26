"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Users, Home, Trophy, Utensils, Music, Heart } from "lucide-react"
import { useCMSSEO } from "@/hooks/useCMSSEO"


export default function StudentLifePage() {
  const seoComponent = useCMSSEO('student-life', { title: 'Student Life | IUEA', description: 'Discover clubs, sports, accommodation and vibrant student life at IUEA.' })

  return (
    <main className="min-h-screen">
      {seoComponent}

      
      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600"
            alt="Student Life"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#8B0000]/60" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl lg:text-8xl font-serif font-bold text-white mb-6"
          >
            Campus Life
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80 max-w-2xl mx-auto"
          >
            A vibrant multicultural community where academic excellence meets personal growth and lifelong friendships.
          </motion.p>
        </div>
      </section>

      {/* Life Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Users, title: "Clubs & Societies", desc: "Join over 30 student-led organizations, from tech clubs to cultural societies.", link: "/student-life/clubs" },
              { icon: Home, title: "Accommodation", desc: "Find a home away from home with our safe and comfortable on-campus and near-campus housing.", link: "/student-life/accommodation" },
              { icon: Trophy, title: "Sports & Athletics", desc: "Compete at the highest level or stay fit with our state-of-the-art sports facilities.", link: "/student-life/sports" },
              { icon: Utensils, title: "Dining & Cafeteria", desc: "Enjoy a variety of local and international cuisines at our multiple campus dining points.", link: "#" },
              { icon: Music, title: "Arts & Culture", desc: "Express your creativity through music, dance, drama, and fine arts programs.", link: "#" },
              { icon: Heart, title: "Health & Wellness", desc: "Comprehensive health services and counseling to support your physical and mental well-being.", link: "#" }
            ].map((item, idx) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-10 bg-white border border-[rgba(139,0,0,0.1)] rounded-3xl hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-[#8B0000] transition-colors">
                  <item.icon className="w-6 h-6 text-[#8B0000] group-hover:text-white" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#1A0A00] mb-4">{item.title}</h3>
                <p className="text-[#6B5B4F] mb-6">{item.desc}</p>
                <Link href={item.link} className="font-bold text-[#8B0000] hover:underline">Learn More →</Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Highlight */}
      <section className="py-20 bg-[#F9F9F9] border-y border-[rgba(139,0,0,0.05)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-serif font-bold text-[#1A0A00] mb-4">Experience the Vibe</h2>
              <p className="text-[#6B5B4F]">Take a look at the moments that define the IUEA experience. From classrooms to the sports field.</p>
            </div>
            <Link href="/gallery" className="px-8 py-3 bg-[#8B0000] text-white rounded-full font-bold hover:bg-[#6B0000] transition-colors">
              View Full Gallery
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "https://images.unsplash.com/photo-1523240715632-990aef95e347?w=600",
              "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600",
              "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600",
              "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600"
            ].map((img, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative h-64 rounded-2xl overflow-hidden shadow-md"
              >
                <Image src={img} alt="Campus Life" fill className="object-cover hover:scale-110 transition-transform duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Highlight */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-[#1A0A00]">World-Class Facilities</h2>
            <p className="text-[#6B5B4F] mt-4">Cutting-edge infrastructure designed to support innovation and excellence.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "RTX-Powered Computer Labs", desc: "Specialized labs equipped with high-end NVIDIA RTX hardware for 3D rendering, coding, and AI research." },
              { title: "1500-Seat Auditorium", desc: "A modern, air-conditioned hub for major conferences, cultural events, and graduation ceremonies." },
              { title: "Solar-Powered AstroTurf", desc: "High-tech AstroTurf pitch with professional solar lighting for night-time football and sports events." },
              { title: "Engineering & E-mobility Labs", desc: "Hands-on research facilities for mechanical, electrical, and petroleum engineering projects." },
              { title: "Digital E-Library", desc: "24/7 access to thousands of journals, books, and research papers via our high-speed network." },
              { title: "IUEA OnlineU", desc: "Advanced e-learning platform providing seamless access to lectures and academic materials anywhere." }
            ].map((f, i) => (
              <div key={i} className="p-8 bg-white border border-[rgba(139,0,0,0.15)] rounded-2xl">
                <h4 className="text-lg font-bold text-[#8B0000] mb-3">{f.title}</h4>
                <p className="text-sm text-[#6B5B4F] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


    </main>
  )
}
