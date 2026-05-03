"use client"

import { motion } from "framer-motion"
import { Star, Award, ShieldCheck } from "lucide-react"
import Image from "next/image"

const awards = [
  {
    category: "East Africa Quality Brands Awards",
    items: [
      "Best Climate Action and Food Security Innovation in East Africa 2023",
      "Best Partners in Climate Action in East Africa 2023",
      "Best E-Mobility and Research University 2022",
      "Best Innovative University 2022",
    ],
  },
  {
    category: "West Nile Quality Brands Awards",
    items: ["Judes Choice Award for IUEA 2022"],
  },
  {
    category: "Office of the President of Uganda",
    items: ["Uganda Science and Innovations Award 2021"],
  },
  {
    category: "Consumers Choice Awards",
    items: [
      "Platinum Best Private University in Uganda, 2021/ 2020 / 2019 / 2018",
    ],
  },
]

export function AccreditationAwards() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Accreditation Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-serif font-bold text-[#8B0000] mb-12">
              Accreditation & Certification
            </h2>
            
            <div className="flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
              <div className="relative w-48 h-48 flex-shrink-0 flex items-center justify-center">
                <Image
                  src="/IUEA-Charter-Badge.png"
                  alt="IUEA Charter Badge"
                  width={192}
                  height={192}
                  className="object-contain drop-shadow-xl"
                />
              </div>
              <div className="text-center md:text-left relative z-10">
                <h3 className="text-2xl font-serif font-bold text-[#1A0A00] mb-4">
                  Chartered University
                </h3>
                <p className="text-[#6B5B4F] leading-relaxed text-lg">
                  The International University of East Africa (IUEA) is a fully{" "}
                  <span className="font-bold text-[#1A0A00]">CHARTERED</span> private
                  University in Uganda.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Awards Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-serif font-bold text-[#8B0000] mb-12">
              Awards
            </h2>

            <div className="space-y-10">
              {awards.map((section, idx) => (
                <div key={section.category}>
                  <h3 className="text-[#8B0000] font-bold text-lg mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    {section.category}
                  </h3>
                  <ul className="space-y-4">
                    {section.items.map((item, itemIdx) => (
                      <motion.li
                        key={itemIdx}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: itemIdx * 0.1 }}
                        className="flex items-start gap-3 group"
                      >
                        <Star className="w-5 h-5 text-[#E8B84B] mt-1 flex-shrink-0 group-hover:scale-125 transition-transform" />
                        <span className="text-[#6B5B4F] text-lg leading-tight">
                          {item}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
        <ShieldCheck className="w-[600px] h-[600px] text-[#8B0000]" />
      </div>
    </section>
  )
}
