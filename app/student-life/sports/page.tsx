"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Trophy, Medal, Target, Users } from "lucide-react"


export default function SportsPage() {
  return (
    <main className="min-h-screen">

      
      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 bg-[#8B0000] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1526676037777-05a232554f77?w=1600"
            alt="Sports"
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
            IUEA Athletics
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80 max-w-2xl mx-auto"
          >
            Fostering discipline, teamwork, and excellence through a wide range of competitive and recreational sports.
          </motion.p>
        </div>
      </section>

      {/* Sport Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Trophy, title: "Competitive Teams", desc: "Our university teams compete in national and regional inter-university championships." },
              { icon: Medal, title: "Scholarships", desc: "Talented athletes can apply for sports-based tuition grants and scholarships." },
              { icon: Target, title: "Modern Facilities", desc: "Access to professional-grade football pitches, basketball courts, and gym facilities." },
              { icon: Users, title: "Intramural Sports", desc: "Fun and competitive sports leagues for all students, regardless of skill level." }
            ].map((item, idx) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#8B0000] p-8 rounded-[2rem] text-white"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-[#8B0000]" />
                </div>
                <h4 className="font-bold text-white mb-2">{item.title}</h4>
                <p className="text-sm text-white/80">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Sports */}
      <section className="py-20 bg-[#F5F0E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif font-bold text-[#1A0A00] mb-12 text-center">Our Featured Sports</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Football (Soccer)", image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600" },
              { name: "Basketball", image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600" },
              { name: "Volleyball", image: "https://images.unsplash.com/photo-1592656670411-b145c0f7d020?w=600" },
              { name: "Swimming", image: "https://images.unsplash.com/photo-1530549387631-6c12946b99ad?w=600" },
              { name: "Rugby", image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600" },
              { name: "Track & Field", image: "https://images.unsplash.com/photo-1461896756913-64756ef80cbe?w=600" }
            ].map((sport, idx) => (
              <motion.div 
                key={sport.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative h-80 rounded-3xl overflow-hidden group"
              >
                <Image src={sport.image} alt={sport.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#8B0000]/90 to-transparent flex items-end p-8">
                  <h3 className="text-2xl font-bold text-white">{sport.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


    </main>
  )
}
