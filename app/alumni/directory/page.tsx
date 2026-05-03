"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Search, MapPin, Briefcase, GraduationCap, Filter } from "lucide-react"


const alumni = [
  { name: "Sarah Nalwanga", program: "BSc Computer Science", year: "2018", city: "Mountain View, USA", role: "Software Engineer", company: "Google", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400" },
  { name: "David Okello", program: "BSc Electrical Engineering", year: "2015", city: "Kampala, Uganda", role: "CEO", company: "SolarTech", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400" },
  { name: "Mary Anyango", program: "LLB Laws", year: "2012", city: "Nairobi, Kenya", role: "Policy Advisor", company: "United Nations", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400" },
  { name: "Isaac Newton", program: "BSc Mechanical Engineering", year: "2019", city: "London, UK", role: "Senior Engineer", company: "Rolls Royce", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400" },
  { name: "Grace Hopper", program: "BSc Information Technology", year: "2020", city: "Kigali, Rwanda", role: "Product Manager", company: "Andela", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400" },
  { name: "Nelson Mandela", program: "Bachelor of Public Admin", year: "2010", city: "Johannesburg, SA", role: "Director", company: "Global Hope", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400" }
]

export default function AlumniDirectoryPage() {
  return (
    <main className="min-h-screen bg-[#F5F0E8]">

      
      {/* Hero */}
      <section className="relative pt-32 pb-12 lg:pt-48 lg:pb-20 bg-[#1A0A00]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-serif font-bold text-white mb-6"
          >
            Alumni Directory
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80 max-w-2xl mx-auto"
          >
            Reconnect with old friends and expand your professional network.
          </motion.p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-6 justify-between items-center">
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search by name, company or year..." className="w-full pl-10 pr-4 py-4 rounded-2xl bg-[#F5F0E8] border-none outline-none focus:ring-1 focus:ring-[#8B0000]" />
          </div>
          <div className="flex flex-wrap gap-4 w-full lg:w-auto">
            <div className="flex items-center gap-2 px-6 py-4 bg-[#F5F0E8] rounded-2xl font-bold text-sm text-[#1A0A00] cursor-pointer hover:bg-gray-200 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filter by Faculty</span>
            </div>
            <div className="flex items-center gap-2 px-6 py-4 bg-[#F5F0E8] rounded-2xl font-bold text-sm text-[#1A0A00] cursor-pointer hover:bg-gray-200 transition-colors">
              <MapPin className="w-4 h-4" />
              <span>Filter by Region</span>
            </div>
          </div>
        </div>
      </section>

      {/* Alumni Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {alumni.map((person, idx) => (
              <motion.div 
                key={person.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-6 mb-8">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden shadow-md">
                    <Image src={person.image} alt={person.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1A0A00]">{person.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-[#8B0000] font-bold mt-1">
                      <GraduationCap className="w-3 h-3" />
                      <span>{person.program} ({person.year})</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-sm text-[#6B5B4F]">
                    <Briefcase className="w-4 h-4 text-[#8B0000]" />
                    <span>{person.role} at <strong>{person.company}</strong></span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#6B5B4F]">
                    <MapPin className="w-4 h-4 text-[#8B0000]" />
                    <span>{person.city}</span>
                  </div>
                </div>
                
                <button className="w-full py-3 border border-gray-100 rounded-xl font-bold text-[#1A0A00] hover:bg-[#8B0000] hover:text-white hover:border-[#8B0000] transition-all">
                  View Profile
                </button>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <button className="px-10 py-4 bg-[#8B0000] text-white rounded-full font-bold hover:bg-[#6B0000] transition-colors">
              Load More Alumni
            </button>
          </div>
        </div>
      </section>


    </main>
  )
}
