"use client"

import { motion } from "framer-motion"
import { FlaskConical, Building2, Landmark, Briefcase, Globe2, Users } from "lucide-react"

const features = [
  {
    icon: FlaskConical,
    title: "Research Excellence",
    description: "Cutting-edge research facilities and partnerships with global institutions driving innovation.",
  },
  {
    icon: Building2,
    title: "Industry Partnerships",
    description: "Strong connections with leading companies ensuring relevant curriculum and internship opportunities.",
  },
  {
    icon: Landmark,
    title: "Modern Campus",
    description: "State-of-the-art facilities including smart classrooms, advanced laboratories, and recreational spaces.",
  },
  {
    icon: Briefcase,
    title: "Career Support",
    description: "Dedicated career services team providing guidance, job placement, and professional development.",
  },
  {
    icon: Globe2,
    title: "Global Network",
    description: "International exchange programs and partnerships with universities across 5 continents.",
  },
  {
    icon: Users,
    title: "Diverse Community",
    description: "A vibrant multicultural environment with students from over 20 countries across Africa and beyond.",
  },
]

export function WhyChoose() {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#8B0000] text-sm font-semibold tracking-[0.2em] uppercase">
            Distinctly IUEA
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-serif text-[#1A0A00]">
            Why Choose IUEA?
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white rounded-xl p-8 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="w-14 h-14 bg-[#8B0000]/10 rounded-xl flex items-center justify-center group-hover:bg-[#8B0000] transition-colors">
                <feature.icon className="w-7 h-7 text-[#8B0000] group-hover:text-white transition-colors" />
              </div>
              <h3 className="mt-6 text-xl font-serif font-semibold text-[#1A0A00]">
                {feature.title}
              </h3>
              <p className="mt-3 text-[#6B5B4F] leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
