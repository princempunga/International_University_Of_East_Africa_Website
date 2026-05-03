"use client"

import { motion } from "framer-motion"
import { Calendar as CalendarIcon, Clock, Bell, Download, ChevronRight, FileText, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const sessions = [
  {
    name: "January Intake 2026",
    status: "Upcoming",
    dates: [
      { event: "Orientation", date: "Jan 12 - 16" },
      { event: "Lectures Begin", date: "Jan 19" },
      { event: "Late Reg. Deadline", date: "Feb 06" },
      { event: "Mid-Semester", date: "Mar 09 - 13" },
      { event: "Final Exams", date: "Apr 20 - May 01" },
    ]
  },
  {
    name: "May Intake 2025",
    status: "Active",
    dates: [
      { event: "Orientation", date: "May 12 - 16" },
      { event: "Lectures Begin", date: "May 19" },
      { event: "Mid-Semester", date: "Jul 07 - 11" },
      { event: "Final Exams", date: "Aug 18 - 29" },
      { event: "Graduation", date: "Dec 15" },
    ]
  },
  {
    name: "Aug/Sept Intake 2025",
    status: "Upcoming",
    dates: [
      { event: "Registration", date: "Aug 25 - 29" },
      { event: "Lectures Begin", date: "Sep 01" },
      { event: "Guild Elections", date: "Oct 15" },
      { event: "End Sem Exams", date: "Dec 01 - 12" },
    ]
  }
]

export default function CalendarPage() {
  return (
    <main className="min-h-screen bg-[#F5F0E8]">

      {/* Compact Hero */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden bg-[#8B0000]">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image 
            src="/pic6.jpg" 
            alt="Calendar Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-6xl font-serif font-bold text-white mb-4"
          >
            Academic Calendar
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/70 max-w-2xl mx-auto"
          >
            Key dates and intake schedules for the 2025/2026 academic year.
          </motion.p>
        </div>
      </section>

      {/* Horizontal Calendar Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch overflow-x-auto pb-8 scrollbar-hide">
            {sessions.map((session, idx) => (
              <motion.div
                key={session.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex-1 min-w-[320px] max-w-[400px] bg-white rounded-3xl p-8 shadow-sm border border-black/5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                  <h3 className="text-xl font-serif font-bold text-[#1A0A00]">{session.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                    session.status === "Active" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                  }`}>
                    {session.status}
                  </span>
                </div>
                
                <div className="space-y-4">
                  {session.dates.map((item, i) => (
                    <div key={i} className="flex items-center justify-between group">
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#8B0000] group-hover:scale-150 transition-transform" />
                        <span className="text-[#1A0A00] text-sm font-medium">{item.event}</span>
                      </div>
                      <span className="text-[#6B5B4F] text-xs font-bold bg-[#F5F0E8] px-2 py-1 rounded-lg">
                        {item.date}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Info Grid */}
          <div className="grid md:grid-cols-2 gap-8 mt-12 max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white p-8 rounded-3xl border border-[rgba(139,0,0,0.2)] shadow-sm flex items-start gap-6"
            >
              <div className="w-12 h-12 bg-[#8B0000]/10 rounded-2xl flex items-center justify-center shrink-0">
                <Bell className="w-6 h-6 text-[#8B0000]" />
              </div>
              <div>
                <h4 className="font-bold text-[#1A0A00] mb-2">Important Notice</h4>
                <p className="text-[#374151] text-sm leading-relaxed mb-4">
                  May 2025 intake registration is active. Late fees apply after May 30th.
                </p>
                <button className="text-[#8B0000] text-sm font-bold flex items-center gap-2 hover:underline">
                  <FileText className="w-4 h-4" /> Download Full Calendar (PDF)
                </button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-black/5 flex items-start gap-6"
            >
              <div className="w-12 h-12 bg-[#F5F0E8] rounded-2xl flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-[#8B0000]" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-[#1A0A00] mb-4">Upcoming Deadlines</h4>
                <div className="space-y-2">
                  {[
                    { label: "Tuition Deposit", due: "Week 4" },
                    { label: "Module Registration", due: "Week 2" }
                  ].map((d) => (
                    <div key={d.label} className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
                      <span className="text-[#6B5B4F]">{d.label}</span>
                      <span className="font-bold text-[#8B0000]">{d.due}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold text-[#1A0A00] mb-8">Ready to Start Your Future?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://Applicants.iuea.ac.ug"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 bg-[#8B0000] text-white rounded-full font-bold hover:bg-[#6B0000] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-2"
              style={{ textDecoration: 'none' }}
            >
              Apply for Next Intake <ChevronRight className="w-5 h-5" />
            </a>
            <Link href="/contact" className="px-10 py-4 border-2 border-[#8B0000] text-[#8B0000] rounded-full font-bold hover:bg-[#8B0000]/5 transition-all">
              Speak with Admissions
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
