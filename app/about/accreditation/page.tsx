"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle, ShieldCheck, Globe, Award } from "lucide-react"


export default function AccreditationPage() {
  return (
    <main className="min-h-screen">

      
      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#1A0A00]">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/hero.jpg" 
            alt="Accreditation Background"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A0A00]/40 via-[#1A0A00]/60 to-[#1A0A00]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="flex items-center justify-center gap-2 text-[#E8B84B] text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>&gt;</span>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <span>&gt;</span>
            <span className="text-white">Accreditation</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-serif font-bold text-white mb-6">Accreditations</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Ensuring the highest standards of academic quality and institutional integrity.
          </p>
        </div>
      </section>

      {/* Main Accreditation */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-serif font-bold text-[#1A0A00] mb-8">NCHE Accredited</h2>
              <p className="text-[#6B5B4F] text-lg leading-relaxed mb-8">
                The International University of East Africa is fully licensed and accredited by the National Council for Higher Education (NCHE) in Uganda. This accreditation ensures that our curriculum, facilities, and staff meet the rigorous standards required for academic excellence.
              </p>
              <ul className="space-y-4">
                {[
                  "Recognized by the Ministry of Education",
                  "Programs aligned with national standards",
                  "Quality assurance protocols in place",
                  "Institutional integrity verified"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[#1A0A00] font-medium">
                    <CheckCircle className="w-6 h-6 text-[#8B0000]" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image src="/pic6.jpg" alt="Accreditation Certificate" fill className="object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Other Bodies */}
      <section className="py-20 bg-[#F5F0E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-[#1A0A00]">Membership & Certifications</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: ShieldCheck, title: "IUCEA", desc: "Member of the Inter-University Council for East Africa." },
              { icon: Globe, title: "IAU", desc: "Affiliated with the International Association of Universities." },
              { icon: Award, title: "ACU", desc: "Member of the Association of Commonwealth Universities." },
              { icon: CheckCircle, title: "AfriQAN", desc: "Part of the African Quality Assurance Network." }
            ].map((item, idx) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-[#8B0000]/10 rounded-lg flex items-center justify-center mb-6">
                  <item.icon className="w-6 h-6 text-[#8B0000]" />
                </div>
                <h3 className="text-xl font-bold text-[#1A0A00] mb-3">{item.title}</h3>
                <p className="text-sm text-[#6B5B4F]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


    </main>
  )
}
