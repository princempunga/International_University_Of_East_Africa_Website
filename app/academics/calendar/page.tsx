"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar as CalendarIcon, Clock, Bell, Download, ChevronRight, FileText, CheckCircle2, Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import api from "@/lib/api"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

export default function CalendarPage() {
  const [intakes, setIntakes] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchIntakes = async () => {
      try {
        const response = await api.getPublishedIntakes()
        if (response?.success) {
          setIntakes(response.data)
        }
      } catch (error) {
        console.error("Failed to fetch intakes", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchIntakes()
  }, [])

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "TBA"
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const generatePDF = () => {
    const doc = new jsPDF()

    // Header
    doc.setFontSize(22)
    doc.setTextColor(139, 0, 0)
    doc.text("International University of East Africa", 105, 20, { align: "center" })
    
    doc.setFontSize(16)
    doc.setTextColor(26, 10, 0)
    doc.text("Academic Calendar", 105, 30, { align: "center" })

    doc.setFontSize(10)
    doc.setTextColor(100, 100, 100)
    doc.text(`Generated on ${new Date().toLocaleDateString()}`, 105, 38, { align: "center" })

    let startY = 50

    if (intakes.length === 0) {
      doc.text("No active intakes available at this time.", 105, startY, { align: "center" })
    }

    intakes.forEach((intake, index) => {
      if (index > 0) {
         startY = (doc as any).lastAutoTable.finalY + 15
         if (startY > 250) {
           doc.addPage()
           startY = 20
         }
      }

      doc.setFontSize(14)
      doc.setTextColor(26, 10, 0)
      doc.text(intake.name + ` (${intake.status.toUpperCase()})`, 14, startY)

      const tableData = []
      tableData.push(["Application Deadline", formatDate(intake.application_deadline)])
      if (intake.orientation_date) tableData.push(["Orientation", formatDate(intake.orientation_date)])
      if (intake.lectures_start_date) tableData.push(["Lectures Begin", formatDate(intake.lectures_start_date)])
      if (intake.late_registration_deadline) tableData.push(["Late Registration", formatDate(intake.late_registration_deadline)])
      if (intake.mid_semester_date) tableData.push(["Mid-Semester", formatDate(intake.mid_semester_date)])
      if (intake.final_exams_date) tableData.push(["Final Exams", formatDate(intake.final_exams_date)])
      if (intake.graduation_date) tableData.push(["Graduation", formatDate(intake.graduation_date)])
      tableData.push(["Intake Ends", formatDate(intake.end_date)])

      autoTable(doc, {
        startY: startY + 5,
        head: [['Event', 'Date']],
        body: tableData,
        theme: 'striped',
        headStyles: { fillColor: [139, 0, 0] },
        styles: { fontSize: 10, cellPadding: 4 },
        columnStyles: {
          0: { cellWidth: 100, fontStyle: 'bold' },
          1: { cellWidth: 'auto' }
        }
      })
    })

    doc.save("IUEA_Academic_Calendar.pdf")
  }

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
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 w-full text-gray-500">
                <Loader2 className="w-8 h-8 animate-spin mb-4 text-[#8B0000]" />
                <p>Loading academic calendar...</p>
              </div>
            ) : intakes.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 w-full text-gray-500">
                <CalendarIcon className="w-12 h-12 mb-4 text-gray-300" />
                <p>No published intakes at this time.</p>
              </div>
            ) : (
              intakes.map((intake, idx) => (
                <motion.div
                  key={intake.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex-1 min-w-[320px] max-w-[400px] bg-white rounded-3xl p-8 shadow-sm border border-black/5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                    <h3 className="text-xl font-serif font-bold text-[#1A0A00]">{intake.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      intake.status === "active" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                    }`}>
                      {intake.status}
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Application Deadline */}
                    <div className="flex items-center justify-between group">
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#8B0000] group-hover:scale-150 transition-transform" />
                        <span className="text-[#1A0A00] text-sm font-medium">Application Deadline</span>
                      </div>
                      <span className="text-[#6B5B4F] text-xs font-bold bg-[#F5F0E8] px-2 py-1 rounded-lg">
                        {formatDate(intake.application_deadline)}
                      </span>
                    </div>

                    {/* Orientation */}
                    {intake.orientation_date && (
                      <div className="flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#8B0000] group-hover:scale-150 transition-transform" />
                          <span className="text-[#1A0A00] text-sm font-medium">Orientation</span>
                        </div>
                        <span className="text-[#6B5B4F] text-xs font-bold bg-[#F5F0E8] px-2 py-1 rounded-lg">
                          {formatDate(intake.orientation_date)}
                        </span>
                      </div>
                    )}

                    {/* Lectures Begin */}
                    {intake.lectures_start_date && (
                      <div className="flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#8B0000] group-hover:scale-150 transition-transform" />
                          <span className="text-[#1A0A00] text-sm font-medium">Lectures Begin</span>
                        </div>
                        <span className="text-[#6B5B4F] text-xs font-bold bg-[#F5F0E8] px-2 py-1 rounded-lg">
                          {formatDate(intake.lectures_start_date)}
                        </span>
                      </div>
                    )}

                    {/* Late Registration Deadline */}
                    {intake.late_registration_deadline && (
                      <div className="flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#8B0000] group-hover:scale-150 transition-transform" />
                          <span className="text-[#1A0A00] text-sm font-medium">Late Registration</span>
                        </div>
                        <span className="text-[#6B5B4F] text-xs font-bold bg-[#F5F0E8] px-2 py-1 rounded-lg">
                          {formatDate(intake.late_registration_deadline)}
                        </span>
                      </div>
                    )}

                    {/* Mid Semester */}
                    {intake.mid_semester_date && (
                      <div className="flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#8B0000] group-hover:scale-150 transition-transform" />
                          <span className="text-[#1A0A00] text-sm font-medium">Mid-Semester</span>
                        </div>
                        <span className="text-[#6B5B4F] text-xs font-bold bg-[#F5F0E8] px-2 py-1 rounded-lg">
                          {formatDate(intake.mid_semester_date)}
                        </span>
                      </div>
                    )}

                    {/* Final Exams */}
                    {intake.final_exams_date && (
                      <div className="flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#8B0000] group-hover:scale-150 transition-transform" />
                          <span className="text-[#1A0A00] text-sm font-medium">Final Exams</span>
                        </div>
                        <span className="text-[#6B5B4F] text-xs font-bold bg-[#F5F0E8] px-2 py-1 rounded-lg">
                          {formatDate(intake.final_exams_date)}
                        </span>
                      </div>
                    )}

                    {/* Graduation */}
                    {intake.graduation_date && (
                      <div className="flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#8B0000] group-hover:scale-150 transition-transform" />
                          <span className="text-[#1A0A00] text-sm font-medium">Graduation</span>
                        </div>
                        <span className="text-[#6B5B4F] text-xs font-bold bg-[#F5F0E8] px-2 py-1 rounded-lg">
                          {formatDate(intake.graduation_date)}
                        </span>
                      </div>
                    )}

                    {/* End Date */}
                    <div className="flex items-center justify-between group pt-2 mt-2 border-t border-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#8B0000]/30" />
                        <span className="text-gray-500 text-sm font-medium">Intake Ends</span>
                      </div>
                      <span className="text-gray-500 text-xs font-medium">
                        {formatDate(intake.end_date)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
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
                <button onClick={generatePDF} className="text-[#8B0000] text-sm font-bold flex items-center gap-2 hover:underline">
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
