"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { FileText, CreditCard, Award, HelpCircle, ArrowRight, ChevronDown } from "lucide-react"
import { useCMSSEO } from "@/hooks/useCMSSEO"

const faqs = [
  {
    q: "What are the entry requirements for undergraduate?",
    a: "A Uganda Certificate of Education (UCE) with at least 5 passes and Uganda Advanced Certificate of Education (UACE) with at least 2 principal passes, or equivalent qualifications."
  },
  {
    q: "When are the application deadlines?",
    a: "January intake deadline is November 30th. September intake deadline is July 31st. We recommend applying early as spaces are limited."
  },
  {
    q: "How much are the tuition fees?",
    a: "Tuition fees vary depending on your program and faculty. For the most up-to-date and detailed fee structure, please visit our dedicated Fees & Funding page."
  },
  {
    q: "Are scholarships available?",
    a: "Yes, IUEA offers merit-based scholarships, need-based financial aid, and sports scholarships. Visit our scholarships page for full details."
  },
  {
    q: "Can international students apply?",
    a: "Absolutely. IUEA welcomes students from over 45 countries. International students need to provide equivalent qualifications and a valid passport or student visa."
  },
  {
    q: "How do I apply online?",
    a: "Click \"Apply Now\" in the navbar, complete the 5-step application form, upload your documents, and submit. You will receive a confirmation email."
  },
  {
    q: "How long does admission take?",
    a: "After submitting a complete application, you will receive a decision within 2-3 weeks. Incomplete applications may take longer."
  },
  {
    q: "Is there student accommodation on campus?",
    a: "IUEA has limited on-campus accommodation. We also assist students in finding affordable off-campus housing near the university."
  }
]

export default function AdmissionsPage() {
  const seoComponent = useCMSSEO('admissions', { title: 'Admissions | IUEA', description: 'Apply to IUEA — find entry requirements, fees, and the application process.' })

  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <main className="min-h-screen">
      {seoComponent}
      
      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#8B0000] z-1">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.jpg"
            alt="Admissions"
            fill
            className="object-cover opacity-30"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-serif font-bold text-white mb-6"
          >
            Start Your Journey
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80 max-w-2xl mx-auto mb-10"
          >
            Join a community of innovators and leaders. Our admissions process is designed to find the best talent from around the world.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <a
              href="https://Applicants.iuea.ac.ug"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 bg-[#E8B84B] text-[#1A0A00] rounded-full font-bold text-lg hover:bg-[#D4A73D] transition-all shadow-xl"
              style={{ textDecoration: 'none' }}
            >
              Apply Now for 2026
            </a>
          </motion.div>
        </div>
      </section>

      {/* Admissions Tracks */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: FileText, 
                title: "Admission Requirements", 
                desc: "Check the academic qualifications and documents needed for your preferred program.",
                link: "/admissions/requirements"
              },
              { 
                icon: CreditCard, 
                title: "Fees & Funding", 
                desc: "View tuition fees, functional fees, and explore our flexible payment plans.",
                link: "/admissions/fees"
              },
              { 
                icon: Award, 
                title: "Scholarships", 
                desc: "Learn about merit-based and need-based financial aid opportunities for students.",
                link: "/admissions/scholarships"
              }
            ].map((track, idx) => (
              <motion.div 
                key={track.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 bg-[#F5F0E8] rounded-3xl group hover:bg-[#8B0000] transition-colors duration-500"
              >
                <div className="w-16 h-16 bg-[#8B0000] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#E8B84B] transition-colors">
                  <track.icon className="w-8 h-8 text-white group-hover:text-[#8B0000] transition-colors" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#1A0A00] mb-4 group-hover:text-white transition-colors">{track.title}</h3>
                <p className="text-[#6B5B4F] mb-8 group-hover:text-white/80 transition-colors">{track.desc}</p>
                <Link href={track.link} className="inline-flex items-center gap-2 font-bold text-[#8B0000] group-hover:text-[#E8B84B] transition-colors">
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps to Apply */}
      <section className="py-20 bg-[#F5F0E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-[#1A0A00]">4 Steps to Apply</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connector Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-[#8B0000]/10 -translate-y-1/2 z-0" />
            
            {[
              { step: "01", title: "Choose Program", desc: "Browse our faculties and find the right course for you." },
              { step: "02", title: "Prepare Docs", desc: "Gather your academic transcripts and identification." },
              { step: "03", title: "Submit Online", desc: "Fill out our easy multi-step application form." },
              { step: "04", title: "Get Offer", desc: "Wait for our admissions team to review and send your letter." }
            ].map((s, idx) => (
              <motion.div 
                key={s.step}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative z-10 bg-white p-8 rounded-2xl text-center shadow-sm"
              >
                <div className="w-12 h-12 bg-[#8B0000] text-white rounded-full flex items-center justify-center mx-auto mb-6 font-bold">
                  {s.step}
                </div>
                <h4 className="font-bold text-[#1A0A00] mb-2">{s.title}</h4>
                <p className="text-sm text-[#6B5B4F]">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-[#1A0A00] mb-4">Frequently Asked Questions</h2>
            <p className="text-[#6B7280]">Everything you need to know about joining IUEA</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className={`bg-white border-b border-gray-100 transition-all ${openFaq === idx ? 'border-l-4 border-l-[#E8B84B] shadow-sm' : ''}`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full py-6 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className={`text-lg font-bold ${openFaq === idx ? 'text-[#1A0A00]' : 'text-[#1A0A00]/80'}`}>
                    {faq.q}
                  </span>
                  <ChevronDown 
                    className={`w-5 h-5 text-[#8B0000] transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} 
                  />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 text-[#6B7280] text-sm leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>


    </main>
  )
}
