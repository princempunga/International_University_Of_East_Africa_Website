"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Book, Search, Globe, Clock, Shield, ArrowRight, Download, ExternalLink, Library as LibraryIcon } from "lucide-react"
import Link from "next/link"
import { useCMSSEO } from "@/hooks/useCMSSEO"

export default function LibraryPage() {
  const seoComponent = useCMSSEO('library', { title: 'Library | IUEA', description: 'Access IUEA's vast academic library resources and digital collections.' })

  return (
    <main className="min-h-screen bg-white">
      {seoComponent}

      
      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#8B0000]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1600"
            alt="University Library"
            fill
            className="object-cover opacity-30"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-8 border border-white/20"
          >
            <LibraryIcon className="w-10 h-10 text-white" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-serif font-bold text-white mb-6"
          >
            Knowledge Hub
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80 max-w-2xl mx-auto"
          >
            Access a world of information through our extensive physical collection and state-of-the-art e-library resources.
          </motion.p>
        </div>
      </section>

      {/* Stats & Hours */}
      <section className="py-12 bg-white border-y border-[rgba(139,0,0,0.1)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Volumes", value: "150,000+" },
              { label: "E-Journals", value: "25,000+" },
              { label: "Study Pods", value: "45" },
              { label: "Daily Visitors", value: "1,200+" }
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-[#8B0000]">{stat.value}</p>
                <p className="text-sm text-[#6B5B4F] font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Library Sections */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-serif font-bold text-[#1A0A00] mb-6">The Physical Collection</h2>
              <p className="text-[#6B5B4F] text-lg mb-8 leading-relaxed">
                Our main library, located at the heart of the campus, spans three floors of meticulously organized resources. From rare legal texts to the latest engineering manuals, we provide a quiet, inspiring environment for research and study.
              </p>
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <div className="flex gap-4 p-4 bg-[#F9F9F9] border border-[rgba(139,0,0,0.1)] rounded-xl">
                  <Clock className="w-6 h-6 text-[#8B0000] shrink-0" />
                  <div>
                    <h4 className="font-bold text-[#1A0A00]">Opening Hours</h4>
                    <p className="text-sm text-[#6B5B4F]">Mon-Fri: 8AM - 10PM</p>
                    <p className="text-sm text-[#6B5B4F]">Sat: 9AM - 6PM</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 bg-[#F9F9F9] border border-[rgba(139,0,0,0.1)] rounded-xl">
                  <Shield className="w-6 h-6 text-[#8B0000] shrink-0" />
                  <div>
                    <h4 className="font-bold text-[#1A0A00]">24/7 Access</h4>
                    <p className="text-sm text-[#6B5B4F]">Available for final-year research students.</p>
                  </div>
                </div>
              </div>
              <Link href="/contact" className="inline-flex items-center gap-2 text-[#8B0000] font-bold hover:gap-3 transition-all">
                Book a Study Pod <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image 
                src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800" 
                alt="Library Interior" 
                fill 
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* E-Library Resources */}
      <section className="py-20 bg-white border-t-4 border-[#8B0000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-[#1A0A00] mb-4">Digital Repository</h2>
            <p className="text-[#6B7280]">Access our premium e-resources from anywhere in the world.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: "ResearchGate & JSTOR", 
                desc: "Full access to millions of peer-reviewed articles and academic journals.",
                icon: Globe,
                link: "https://jstor.org"
              },
              { 
                title: "IEEE Xplore", 
                desc: "The world's highest quality technical literature in engineering and technology.",
                icon: Book,
                link: "https://ieeexplore.ieee.org"
              },
              { 
                title: "IUEA Publication Archive", 
                desc: "Explore research papers and theses published by our own faculty and students.",
                icon: Download,
                link: "#"
              }
            ].map((resource, i) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-[#F9F9F9] border border-[rgba(139,0,0,0.15)] rounded-3xl transition-colors"
              >
                <resource.icon className="w-10 h-10 text-[#8B0000] mb-6" />
                <h3 className="text-xl font-bold text-[#1A0A00] mb-4">{resource.title}</h3>
                <p className="text-[#374151] text-sm mb-8 leading-relaxed">{resource.desc}</p>
                <a 
                  href={resource.link} 
                  target="_blank" 
                  className="inline-flex items-center gap-2 text-[#8B0000] text-sm font-bold hover:underline"
                >
                  Access Resource <ExternalLink className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


    </main>
  )
}
