"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  FileText, 
  Send, 
  CheckCircle2, 
  ArrowRight, 
  Globe, 
  Mail, 
  Phone,
  BookOpen,
  Download,
  Info
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function RequestProspectusPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
  }

  return (
    <main className="min-h-screen bg-[#F5F0E8] font-sans">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center overflow-hidden bg-[#8B0000]">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/pic1.jpg" 
            alt="University Campus"
            fill
            className="object-cover opacity-40 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#8B0000] via-[#8B0000]/80 to-transparent" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <span className="text-[#E8B84B] text-sm font-black uppercase tracking-[0.3em]">Admissions 2026</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight"
            >
              Request a <br />
              <span className="text-[#E8B84B]">Prospectus</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/80 text-xl leading-relaxed max-w-lg"
            >
              Everything you need to know about life at IUEA, our programs, 
              and how to join our vibrant academic community.
            </motion.p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20 pb-24">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Form Area */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-[40px] p-8 md:p-12 shadow-2xl shadow-black/5 border border-white"
                >
                  <div className="mb-10">
                    <h2 className="text-3xl font-serif font-bold text-[#1A0A00] mb-4">Tell us about yourself</h2>
                    <p className="text-gray-500">Please fill in the details below to receive your digital or physical prospectus.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
                        <input required type="text" placeholder="John Doe" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#8B0000]/20 focus:border-[#8B0000] transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                        <input required type="email" placeholder="john@example.com" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#8B0000]/20 focus:border-[#8B0000] transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Phone Number</label>
                        <input required type="tel" placeholder="+256 700 000 000" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#8B0000]/20 focus:border-[#8B0000] transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Country of Residence</label>
                        <input required type="text" placeholder="Uganda" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#8B0000]/20 focus:border-[#8B0000] transition-all" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Program of Interest</label>
                      <select className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#8B0000]/20 focus:border-[#8B0000] transition-all appearance-none cursor-pointer">
                        <option>Select a Faculty</option>
                        <option>Science & Technology</option>
                        <option>Business & Management</option>
                        <option>Engineering</option>
                        <option>Law & Governance</option>
                        <option>Health Sciences</option>
                      </select>
                    </div>

                    <div className="space-y-4">
                      <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Prospectus Type</label>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <label className="relative flex items-center p-6 border-2 border-gray-100 rounded-2xl cursor-pointer hover:bg-gray-50 transition-all group">
                          <input type="radio" name="type" className="hidden" defaultChecked />
                          <div className="w-6 h-6 rounded-full border-2 border-[#8B0000] mr-4 flex items-center justify-center">
                            <div className="w-3 h-3 bg-[#8B0000] rounded-full" />
                          </div>
                          <div>
                            <p className="font-bold text-[#1A0A00]">Digital Copy</p>
                            <p className="text-xs text-gray-500">Sent instantly to your email</p>
                          </div>
                        </label>
                        <label className="relative flex items-center p-6 border-2 border-gray-100 rounded-2xl cursor-pointer hover:bg-gray-50 transition-all group">
                          <input type="radio" name="type" className="hidden" />
                          <div className="w-6 h-6 rounded-full border-2 border-gray-300 mr-4 flex items-center justify-center">
                            <div className="w-3 h-3 bg-transparent rounded-full" />
                          </div>
                          <div>
                            <p className="font-bold text-[#1A0A00]">Physical Copy</p>
                            <p className="text-xs text-gray-500">Delivered to your address</p>
                          </div>
                        </label>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-[70px] bg-[#8B0000] text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-[#6B0000] transition-all shadow-xl shadow-[#8B0000]/20 active:scale-95 disabled:opacity-70 mt-12"
                    >
                      {isSubmitting ? (
                         <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full" />
                      ) : (
                        <>
                          Send My Request
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-[40px] p-12 md:p-20 text-center shadow-2xl shadow-black/5 border border-white"
                >
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-10">
                    <CheckCircle2 className="w-12 h-12 text-green-600" />
                  </div>
                  <h2 className="text-4xl font-serif font-bold text-[#1A0A00] mb-6">Request Received!</h2>
                  <p className="text-gray-500 text-lg mb-12 max-w-md mx-auto">
                    We've sent a digital copy of the 2026 Prospectus to your email. 
                    If you requested a physical copy, it will be dispatched within 48 hours.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="px-10 py-5 bg-[#8B0000] text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-[#6B0000] transition-all shadow-lg shadow-[#8B0000]/20">
                      <Download className="w-5 h-5" />
                      Download Now
                    </button>
                    <Link href="/" className="px-10 py-5 border-2 border-gray-100 text-[#1A0A00] rounded-2xl font-bold hover:bg-gray-50 transition-all">
                      Back to Home
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-8">
            <div className="bg-[#8B0000] rounded-[32px] p-8 text-white">
              <BookOpen className="w-10 h-10 text-[#E8B84B] mb-6" />
              <h3 className="text-xl font-serif font-bold mb-4">What's Inside?</h3>
              <ul className="space-y-4">
                {[
                  "Complete 2026 Program Guide",
                  "Tuition & Scholarship Info",
                  "Campus Life & Facilities",
                  "Career Development Services",
                  "Step-by-Step Application Guide"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                    <div className="w-1.5 h-1.5 bg-[#E8B84B] rounded-full mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-[32px] p-8 shadow-xl shadow-black/5 border border-white">
              <Info className="w-10 h-10 text-[#8B0000] mb-6" />
              <h3 className="text-xl font-serif font-bold text-[#1A0A00] mb-4">Other Documents</h3>
              <div className="space-y-4">
                <button className="w-full p-4 bg-gray-50 rounded-2xl flex items-center justify-between group hover:bg-[#8B0000] transition-all">
                  <span className="text-sm font-bold text-gray-600 group-hover:text-white transition-colors">Fee Structure</span>
                  <Download className="w-4 h-4 text-[#8B0000] group-hover:text-white transition-colors" />
                </button>
                <button className="w-full p-4 bg-gray-50 rounded-2xl flex items-center justify-between group hover:bg-[#8B0000] transition-all">
                  <span className="text-sm font-bold text-gray-600 group-hover:text-white transition-colors">Academic Calendar</span>
                  <Download className="w-4 h-4 text-[#8B0000] group-hover:text-white transition-colors" />
                </button>
              </div>
            </div>

            <div className="bg-white rounded-[32px] p-8 shadow-xl shadow-black/5 border border-white text-center">
              <h3 className="text-lg font-serif font-bold text-[#1A0A00] mb-4">Speak to Admissions</h3>
              <div className="flex flex-col gap-3">
                <a href="tel:+256700000000" className="flex items-center justify-center gap-3 py-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <Phone className="w-4 h-4 text-[#8B0000]" />
                  <span className="text-sm font-bold">+256 700 000 000</span>
                </a>
                <a href="mailto:admissions@iuea.ac.ug" className="flex items-center justify-center gap-3 py-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <Mail className="w-4 h-4 text-[#8B0000]" />
                  <span className="text-sm font-bold">admissions@iuea.ac.ug</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
