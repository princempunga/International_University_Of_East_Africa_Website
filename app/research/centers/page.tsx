"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Cpu, Zap, Scale, Leaf } from "lucide-react"


const centers = [
  { 
    name: "Center for Artificial Intelligence", 
    icon: Cpu, 
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800",
    desc: "Dedicated to advancing machine learning, robotics, and natural language processing tailored for African contexts."
  },
  { 
    name: "Renewable Energy Laboratory", 
    icon: Zap, 
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800",
    desc: "Developing affordable solar, wind, and biomass solutions to power rural communities and industries."
  },
  { 
    name: "Governance & Rule of Law Institute", 
    icon: Scale, 
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800",
    desc: "Conducting legal research and policy analysis to promote transparency, justice, and human rights."
  },
  { 
    name: "Sustainable Development Hub", 
    icon: Leaf, 
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800",
    desc: "Integrating social, economic, and environmental research to achieve the UN Sustainable Development Goals."
  }
]

export default function ResearchCentersPage() {
  return (
    <main className="min-h-screen bg-white">

      
      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 bg-[#1A0A00]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-serif font-bold text-white mb-6"
          >
            Research Centers
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80 max-w-2xl mx-auto"
          >
            Specialized hubs of innovation and academic excellence.
          </motion.p>
        </div>
      </section>

      {/* Centers Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {centers.map((center, idx) => (
              <motion.div 
                key={center.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`flex flex-col lg:flex-row bg-[#F5F0E8] rounded-[3rem] overflow-hidden ${idx % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}
              >
                <div className="lg:w-1/2 relative h-80 lg:h-auto">
                  <Image src={center.image} alt={center.name} fill className="object-cover" />
                </div>
                <div className="lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center">
                  <div className="w-16 h-16 bg-[#8B0000] rounded-2xl flex items-center justify-center mb-8">
                    <center.icon className="w-8 h-8 text-[#E8B84B]" />
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-[#1A0A00] mb-6">{center.name}</h3>
                  <p className="text-lg text-[#6B5B4F] leading-relaxed mb-10">{center.desc}</p>
                  <button className="self-start px-8 py-3 bg-[#8B0000] text-white rounded-full font-bold hover:bg-[#6B0000] transition-colors">Visit Center Page</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


    </main>
  )
}
