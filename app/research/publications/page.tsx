"use client"

import { motion } from "framer-motion"
import { FileText, Download, Search, Calendar, User } from "lucide-react"


const publications = [
  { 
    title: "Advancing AI in Sub-Saharan Agriculture", 
    author: "Prof. John Doe, et al.", 
    date: "March 2025", 
    category: "Journal Article",
    journal: "African Tech Review"
  },
  { 
    title: "Constitutionalism and Digital Governance", 
    author: "Dr. Mary Katesi", 
    date: "January 2025", 
    category: "Book Chapter",
    journal: "Oxford Law Press"
  },
  { 
    title: "Efficiency of Solar Photovoltaics in Tropical Climates", 
    author: "Eng. Robert Stephenson", 
    date: "December 2024", 
    category: "Conference Paper",
    journal: "Global Energy Summit"
  },
  { 
    title: "Impact of E-Learning on Student Retention", 
    author: "Ms. Sarah Wilson", 
    date: "November 2024", 
    category: "Research Report",
    journal: "Higher Ed Quarterly"
  },
  { 
    title: "Economic Impacts of Mobile Money in Uganda", 
    author: "Dr. Adam Smith", 
    date: "October 2024", 
    category: "Journal Article",
    journal: "East African Economic Journal"
  }
]

export default function PublicationsPage() {
  return (
    <main className="min-h-screen bg-[#F5F0E8]">

      
      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 bg-[#8B0000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-serif font-bold text-white mb-6"
          >
            Academic Publications
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80 max-w-2xl mx-auto"
          >
            A repository of knowledge and research findings from our diverse academic community.
          </motion.p>
        </div>
      </section>

      {/* Publications List */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm">
            <div className="flex flex-col md:flex-row gap-6 mb-12 justify-between items-center">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Search publications..." className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-100 bg-[#F5F0E8] outline-none" />
              </div>
              <div className="flex gap-4">
                <select className="px-6 py-3 rounded-xl border border-gray-100 bg-[#F5F0E8] outline-none text-sm font-semibold">
                  <option>All Years</option>
                  <option>2025</option>
                  <option>2024</option>
                </select>
              </div>
            </div>

            <div className="space-y-8">
              {publications.map((pub, idx) => (
                <motion.div 
                  key={pub.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group flex flex-col md:flex-row md:items-center gap-6 p-6 rounded-2xl hover:bg-[#F5F0E8] transition-colors"
                >
                  <div className="w-16 h-16 bg-[#8B0000]/10 rounded-xl flex items-center justify-center shrink-0">
                    <FileText className="w-8 h-8 text-[#8B0000]" />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-bold text-[#8B0000] uppercase tracking-widest mb-1 block">{pub.category}</span>
                    <h3 className="text-xl font-bold text-[#1A0A00] mb-2 group-hover:text-[#8B0000] transition-colors">{pub.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-[#6B5B4F]">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{pub.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{pub.date}</span>
                      </div>
                      <div className="italic">Published in: {pub.journal}</div>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 px-6 py-3 bg-[#8B0000] text-white rounded-xl font-bold hover:bg-black transition-colors shrink-0">
                    <Download className="w-4 h-4" />
                    PDF
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>


    </main>
  )
}
