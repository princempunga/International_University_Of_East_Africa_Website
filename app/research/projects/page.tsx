"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Lightbulb, Rocket, Zap, Globe } from "lucide-react"


const projects = [
  { 
    title: "Project AgroAI", 
    status: "ONGOING", 
    icon: Lightbulb, 
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800",
    desc: "Using AI and IoT for predictive crop analytics to support small-scale farmers in the East African region."
  },
  { 
    title: "EcoPower Mini-Grids", 
    status: "COMPLETED", 
    icon: Zap, 
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800",
    desc: "Deployment of hybrid solar-biomass mini-grids for off-grid communities in Northern Uganda."
  },
  { 
    title: "Legal-Tech Africa", 
    status: "ONGOING", 
    icon: Globe, 
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800",
    desc: "A digital platform to facilitate access to justice and legal information for marginalized groups."
  },
  { 
    title: "IUEA Sat-1", 
    status: "PLANNING", 
    icon: Rocket, 
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800",
    desc: "A student-led project to design, build, and launch a CubeSat for atmospheric research and telecommunications."
  }
]

export default function ResearchProjectsPage() {
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
            Innovation Projects
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80 max-w-2xl mx-auto"
          >
            Turning research into real-world impact and scalable technological solutions.
          </motion.p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <motion.div 
                key={project.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative h-[450px] rounded-[3rem] overflow-hidden shadow-xl"
              >
                <Image src={project.image} alt={project.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-10">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-14 h-14 bg-[#8B0000] rounded-2xl flex items-center justify-center">
                      <project.icon className="w-8 h-8 text-[#E8B84B]" />
                    </div>
                    <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
                      project.status === "ONGOING" ? "bg-blue-500 text-white" : 
                      project.status === "COMPLETED" ? "bg-green-500 text-white" : "bg-[#E8B84B] text-[#1A0A00]"
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">{project.title}</h3>
                  <p className="text-white/70 leading-relaxed mb-6 line-clamp-3">{project.desc}</p>
                  <button className="self-start text-sm font-bold text-[#E8B84B] hover:text-white transition-colors">Project Portfolio →</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


    </main>
  )
}
