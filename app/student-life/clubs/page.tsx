"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Cpu, Globe, Users, Music, Camera, PenTool } from "lucide-react"


const clubs = [
  { name: "Tech Innovators Club", icon: Cpu, category: "Technology", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600" },
  { name: "International Students Assoc.", icon: Globe, category: "Cultural", image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600" },
  { name: "Debate & Public Speaking", icon: Users, category: "Academic", image: "https://images.unsplash.com/photo-1475721027187-4024733923f7?w=600" },
  { name: "Music & Performing Arts", icon: Music, category: "Arts", image: "https://images.unsplash.com/photo-1514525253361-bee87184919a?w=600" },
  { name: "Photography Society", icon: Camera, category: "Hobbies", image: "https://images.unsplash.com/photo-1452780212940-6f5c0d14d73b?w=600" },
  { name: "Design & Creative Hub", icon: PenTool, category: "Arts", image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=600" }
]

export default function ClubsPage() {
  return (
    <main className="min-h-screen bg-white">

      
      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 bg-[#8B0000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-serif font-bold text-white mb-6"
          >
            Clubs & Societies
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80 max-w-2xl mx-auto"
          >
            Pursue your passions, build your network, and develop leadership skills outside the classroom.
          </motion.p>
        </div>
      </section>

      {/* Clubs Listing */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clubs.map((club, idx) => (
              <motion.div 
                key={club.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative h-96 rounded-3xl overflow-hidden shadow-xl"
              >
                <Image src={club.image} alt={club.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#8B0000]/90 via-[#8B0000]/40 to-transparent flex flex-col justify-end p-8">
                  <div className="w-12 h-12 bg-[#8B0000] rounded-xl flex items-center justify-center mb-4">
                    <club.icon className="w-6 h-6 text-[#E8B84B]" />
                  </div>
                  <span className="text-[#E8B84B] text-xs font-bold uppercase tracking-widest mb-2">{club.category}</span>
                  <h3 className="text-2xl font-bold text-white mb-4">{club.name}</h3>
                  <button className="text-sm font-semibold text-white/80 hover:text-white underline">Join this Club</button>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-20 p-12 bg-[#F5F0E8] rounded-[3rem] text-center">
            <h2 className="text-3xl font-serif font-bold text-[#1A0A00] mb-6">Want to start a new club?</h2>
            <p className="text-[#6B5B4F] mb-8 max-w-xl mx-auto">
              If you have a unique passion and want to build a community, we support students in establishing new recognized societies.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3 bg-[#8B0000] text-white rounded-full font-bold hover:bg-[#6B0000] transition-colors">
              Contact Student Union
            </Link>
          </div>
        </div>
      </section>


    </main>
  )
}
