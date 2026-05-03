"use client"

import { motion } from "framer-motion"
import { UserPlus, Briefcase, GraduationCap, MapPin, Send } from "lucide-react"

export default function AlumniRegisterPage() {
  return (
    <main className="min-h-screen bg-[#F5F0E8]">

      
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif font-bold text-[#1A0A00]">Join the Alumni Network</h1>
            <p className="text-[#6B5B4F] mt-2">Update your details and stay connected with the IUEA community.</p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[3rem] shadow-xl overflow-hidden p-8 md:p-12"
          >
            <form className="space-y-8">
              {/* Personal Info */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                  <UserPlus className="w-6 h-6 text-[#8B0000]" />
                  <h3 className="text-xl font-bold text-[#1A0A00]">Personal Details</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#1A0A00]">Full Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#8B0000]" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#1A0A00]">Email Address</label>
                    <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#8B0000]" placeholder="john@example.com" />
                  </div>
                </div>
              </div>

              {/* Graduation Info */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                  <GraduationCap className="w-6 h-6 text-[#8B0000]" />
                  <h3 className="text-xl font-bold text-[#1A0A00]">Academic Information</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#1A0A00]">Program Completed</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#8B0000]" placeholder="e.g. BSc Computer Science" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#1A0A00]">Graduation Year</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#8B0000]">
                      <option>Select Year</option>
                      {[...Array(30)].map((_, i) => (
                        <option key={i}>{2026 - i}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Career Info */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                  <Briefcase className="w-6 h-6 text-[#8B0000]" />
                  <h3 className="text-xl font-bold text-[#1A0A00]">Professional Status</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#1A0A00]">Current Employer</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#8B0000]" placeholder="e.g. Google" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#1A0A00]">Job Title</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#8B0000]" placeholder="e.g. Lead Developer" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#1A0A00]">Country of Residence</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="text" className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#8B0000]" placeholder="e.g. Uganda" />
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button type="submit" className="w-full py-4 bg-[#8B0000] text-white rounded-2xl font-bold hover:bg-[#6B0000] transition-all flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" />
                  Register Now
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>


    </main>
  )
}
