"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  FlaskConical, 
  Globe, 
  Lightbulb, 
  BookOpen, 
  Search, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Users, 
  Award,
  BarChart3,
  Microscope,
  FileText
} from "lucide-react"

export default function ResearchPage() {
  return (
    <main className="min-h-screen bg-white">
      
      {/* Cinematic Hero */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#8B0000]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1600"
            alt="Research"
            fill
            className="object-cover opacity-40 scale-105 animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#8B0000]/60 to-[#8B0000]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white text-sm font-bold mb-8"
          >
            <Microscope className="w-4 h-4 text-white" />
            Excellence in Innovation
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl lg:text-8xl font-serif font-bold text-white mb-6"
          >
            Research at <span className="text-white italic underline underline-offset-8 decoration-white/30">IUEA</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed"
          >
            We are dedicated to pioneering research that addresses the unique challenges of the African continent while contributing to the global body of knowledge.
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-[#8B0000] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Research Centers", value: "8+" },
              { label: "Annual Publications", value: "150+" },
              { label: "Research Grants", value: "$2M+" },
              { label: "PhD Researchers", value: "45+" }
            ].map((stat, idx) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white/50 text-sm font-medium uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Research Pillars */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-[#1A0A00] mb-6">Our Research Pillars</h2>
            <p className="text-[#6B5B4F] max-w-2xl mx-auto">Focusing our academic inquiry where it matters most for sustainable development.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: Zap, 
                title: "Sustainable Energy", 
                desc: "Exploring solar, wind, and bio-energy solutions specifically tailored for rural and urban African contexts.",
                bg: "bg-[#F5F0E8]"
              },
              { 
                icon: ShieldCheck, 
                title: "Digital Sovereignty", 
                desc: "Researching cybersecurity, blockchain, and AI ethics to secure Africa's digital future.",
                bg: "bg-[#F5F0E8]"
              },
              { 
                icon: Globe, 
                title: "Urban Governance", 
                desc: "Studies on sustainable infrastructure, waste management, and policy frameworks for growing cities.",
                bg: "bg-[#F5F0E8]"
              }
            ].map((pillar, idx) => (
              <motion.div 
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`p-10 ${pillar.bg} rounded-[3rem] border border-black/5 hover:border-[#8B0000] transition-all group`}
              >
                <div className="w-16 h-16 bg-[#8B0000] rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <pillar.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#1A0A00] mb-4">{pillar.title}</h3>
                <p className="text-[#6B5B4F] leading-relaxed mb-6">{pillar.desc}</p>
                <div className="h-1 w-12 bg-[#8B0000]/20 rounded-full group-hover:w-24 transition-all" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Information Section */}
      <section className="py-24 bg-[#F5F0E8]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Left: Ethics & Funding */}
            <div className="space-y-12">
              <div>
                <h3 className="text-3xl font-serif font-bold text-[#1A0A00] mb-6 flex items-center gap-3">
                  <Award className="w-8 h-8 text-[#8B0000]" />
                  Research Ethics & Quality
                </h3>
                <p className="text-[#6B5B4F] leading-relaxed mb-6">
                  Every research project at IUEA undergoes a rigorous review by our **Institutional Review Board (IRB)**. We ensure that all studies meet international ethical standards, particularly concerning human subjects, data privacy, and environmental impact.
                </p>
                <ul className="space-y-4">
                  {["International Peer Review", "Ethical Compliance Monitoring", "Plagiarism Detection Systems"].map(item => (
                    <li key={item} className="flex items-center gap-3 text-sm font-bold text-[#1A0A00]">
                      <div className="w-2 h-2 bg-[#8B0000] rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-3xl font-serif font-bold text-[#1A0A00] mb-6 flex items-center gap-3">
                  <BarChart3 className="w-8 h-8 text-[#8B0000]" />
                  Funding & Support
                </h3>
                <p className="text-[#6B5B4F] leading-relaxed">
                  We support our researchers through the **IUEA Internal Research Fund** and by facilitating partnerships with international grant-making bodies. Our dedicated Office of Research and Grants provides assistance in proposal writing and financial management.
                </p>
              </div>
            </div>

            {/* Right: Student Research */}
            <div className="bg-white border border-[rgba(139,0,0,0.2)] rounded-[3rem] p-10 lg:p-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#8B0000] rounded-full blur-[120px] opacity-5" />
              <h3 className="text-3xl font-serif font-bold text-[#8B0000] mb-8">Undergraduate Research</h3>
              <p className="text-[#374151] mb-10 text-lg leading-relaxed">
                At IUEA, research isn't just for faculty. We encourage our undergraduate students to participate in the **Student Research Initiative (SRI)**, where they can work as research assistants or lead their own mentored projects.
              </p>
              <div className="space-y-6">
                {[
                  { title: "Annual Research Expo", desc: "Showcase your findings to industry leaders." },
                  { title: "Mentorship Program", desc: "Work one-on-one with senior professors." },
                  { title: "Publication Support", desc: "Get help publishing your work in student journals." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-6 bg-[#F9F9F9] rounded-2xl border border-[rgba(139,0,0,0.15)]">
                    <div className="w-10 h-10 bg-[#8B0000] rounded-xl flex items-center justify-center shrink-0">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1A0A00] mb-1">{item.title}</h4>
                      <p className="text-xs text-[#6B7280]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Project - Enlarged */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-[4rem] overflow-hidden bg-[#8B0000] min-h-[600px] flex items-center">
            <div className="absolute inset-0 z-0">
              <Image src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200" alt="Featured" fill className="object-cover opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#8B0000] via-[#8B0000]/80 to-transparent" />
            </div>
            <div className="relative z-10 p-12 lg:p-24 lg:w-2/3">
              <div className="flex items-center gap-3 text-white font-bold text-sm uppercase tracking-widest mb-6 opacity-80">
                <span className="w-10 h-px bg-white/50" />
                Flagship Project 2026
              </div>
              <h2 className="text-4xl lg:text-6xl font-serif font-bold text-white mb-8">AI-Driven Agricultural Optimization</h2>
              <p className="text-white/70 text-lg mb-10 leading-relaxed">
                Integrating satellite imagery with low-cost IoT soil sensors to provide smallholder farmers with real-time yield predictions and precision irrigation alerts via SMS.
              </p>
              <div className="flex flex-wrap gap-6">
                <Link href="#" className="px-10 py-4 bg-white text-[#8B0000] rounded-full font-bold hover:bg-gray-100 transition-all">Read Case Study</Link>
                <Link href="/contact" className="px-10 py-4 border border-white/30 text-white rounded-full font-bold hover:bg-white/10 transition-all">Partner With Us</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Network - More Info */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-serif font-bold text-[#1A0A00] mb-4">Collaborative Network</h2>
              <p className="text-[#6B5B4F]">We believe in the power of partnership. Our researchers collaborate with the world's leading institutions to bring global best practices to local problems.</p>
            </div>
            <div className="flex gap-4">
              <div className="px-6 py-3 bg-[#F5F0E8] rounded-xl text-sm font-bold text-[#8B0000]">50+ Partners</div>
              <div className="px-6 py-3 bg-[#F5F0E8] rounded-xl text-sm font-bold text-[#8B0000]">Global Mobility</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'UNESCO', label: 'Academic Standards' },
              { name: 'World Bank', label: 'Development Grants' },
              { name: 'Microsoft Research', label: 'AI & Cloud Computing' },
              { name: 'MIT Media Lab', label: 'Innovative Tech' }
            ].map((partner) => (
              <div key={partner.name} className="group p-8 bg-[#F5F0E8] rounded-3xl text-center hover:bg-[#8B0000] transition-all">
                <div className="text-xl font-bold text-[#1A0A00] group-hover:text-white mb-2">{partner.name}</div>
                <div className="text-[10px] uppercase tracking-widest text-[#8B0000] group-hover:text-white/50">{partner.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-[#8B0000] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 text-white">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-8">Join the Vanguard of Innovation</h2>
          <p className="text-white/80 mb-12 text-lg">
            Whether you are a prospective PhD candidate, a researcher looking for collaboration, or an industry partner, we want to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/contact" className="px-12 py-5 bg-white text-[#8B0000] rounded-full font-bold hover:bg-gray-100 transition-all shadow-xl">
              Collaborate With Us
            </Link>
            <Link href="/academics/programs/phd-business" className="px-12 py-5 border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-all">
              Apply for PhD
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
