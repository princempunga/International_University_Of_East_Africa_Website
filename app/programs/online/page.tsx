"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Monitor, Globe, Laptop, ShieldCheck, PlayCircle, Smartphone } from "lucide-react"

export default function OnlineLearningPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-[#8B0000] overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image src="/hero.jpg" alt="Online Learning" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#8B0000] to-transparent z-0" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white text-sm font-bold mb-8 border border-white/20"
            >
              <Monitor className="w-4 h-4 text-white" />
              IUEA E-Learning Platform
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight"
            >
              Education <br /> Without <span className="text-white italic underline underline-offset-8 decoration-white/30">Boundaries</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-white/70 max-w-xl mb-10 leading-relaxed"
            >
              Access quality higher education from anywhere in the world. Our robust e-learning platform brings the classroom to you.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="https://Applicants.iuea.ac.ug"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-4 bg-white text-[#8B0000] rounded-full font-bold hover:bg-gray-100 transition-all"
                style={{ textDecoration: 'none' }}
              >
                Enroll in Online Program
              </a>
              <button className="px-10 py-4 border border-white/20 text-white rounded-full font-bold hover:bg-white/10 transition-all flex items-center gap-2">
                <PlayCircle className="w-5 h-5" /> How it Works
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-[#1A0A00]">The IUEA Online Experience</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { icon: Globe, title: "Study Anywhere", desc: "Our platform is accessible from any device, anywhere in the world with an internet connection." },
              { icon: Laptop, title: "Interactive Platform", desc: "Engage with faculty and peers through live sessions, discussion boards, and digital workshops." },
              { icon: Smartphone, title: "Mobile Friendly", desc: "Download our mobile app to keep up with your studies on the go, even when offline." },
              { icon: ShieldCheck, title: "Same Accreditation", desc: "Our online degrees carry the same prestige and accreditation as our on-campus programs." },
              { icon: PlayCircle, title: "Recorded Lectures", desc: "Missed a session? All live lectures are recorded and available in our digital library." },
              { icon: Monitor, title: "24/7 Tech Support", desc: "Our dedicated technical team is available around the clock to ensure your learning is seamless." }
            ].map((f, idx) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-10 rounded-[3rem] bg-[#F5F0E8] border border-black/5 hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <f.icon className="w-6 h-6 text-[#8B0000]" />
                </div>
                <h4 className="text-xl font-bold text-[#1A0A00] mb-4">{f.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial / Story Section */}
      <section className="py-24 bg-[#F5F0E8] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-[#8B0000] rounded-full blur-[100px] opacity-10" />
              <div className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl rotate-3">
                <Image src="/pic10.jpg" alt="Student Learning" fill className="object-cover" />
              </div>
            </div>
            <div>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-[#1A0A00] mb-8">Flexible Learning for Busy Professionals</h2>
              <p className="text-lg text-[#6B5B4F] mb-8 leading-relaxed">
                "As a working mother, IUEA's online platform allowed me to pursue my Master's degree without sacrificing my time with family or my career. The quality of interaction was just as high as being in a physical classroom."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#8B0000] flex items-center justify-center text-white font-bold">AN</div>
                <div>
                  <p className="font-bold text-[#1A0A00]">Amina Namugerwa</p>
                  <p className="text-sm text-[#8B0000]">MBA Online Graduate, 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#8B0000] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">Ready to Join Our Digital Campus?</h2>
          <p className="text-white/80 mb-10 text-lg">
            No need to wait for a specific intake date for some of our certificate programs. Start your journey today.
          </p>
          <a
            href="https://Applicants.iuea.ac.ug"
            target="_blank"
            rel="noopener noreferrer"
            className="px-12 py-5 bg-white text-[#8B0000] rounded-full font-bold hover:bg-gray-100 transition-all shadow-xl inline-flex items-center gap-2"
            style={{ textDecoration: 'none' }}
          >
            Apply for Online Study <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </main>
  )
}
