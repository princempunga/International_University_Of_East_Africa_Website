"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle, FileText, Info } from "lucide-react"


export default function RequirementsPage() {
  return (
    <main className="min-h-screen bg-white">

      
      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 bg-white border-b border-[rgba(139,0,0,0.1)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-serif font-bold text-[#1A0A00] mb-6"
          >
            Entry Requirements
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-[#6B5B4F] max-w-2xl mx-auto"
          >
            Find out what you need to start your application at the International University of East Africa.
          </motion.p>
        </div>
      </section>

      {/* Requirements Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Undergraduate */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-10 bg-white border border-[rgba(139,0,0,0.2)] rounded-3xl"
            >
              <h2 className="text-3xl font-serif font-bold text-[#1A0A00] mb-8 flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-[#8B0000]" />
                Undergraduate Programs
              </h2>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl">
                  <h4 className="font-bold text-[#1A0A00] mb-2">Direct Entry</h4>
                  <p className="text-sm text-[#6B5B4F]">UACE (A-Level) with at least two (2) principal passes obtained at the same sitting, and UCE (O-Level) with at least five (5) passes.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl">
                  <h4 className="font-bold text-[#1A0A00] mb-2">Diploma Entry</h4>
                  <p className="text-sm text-[#6B5B4F]">A relevant diploma from a recognized institution with at least a credit or second-class lower division.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl">
                  <h4 className="font-bold text-[#1A0A00] mb-2">Mature Age Entry</h4>
                  <p className="text-sm text-[#6B5B4F]">Candidate must be at least 25 years old and have passed the mature age entry examination from an NCHE-accredited center.</p>
                </div>
              </div>
            </motion.div>

            {/* Postgraduate */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-10 bg-white border border-[rgba(139,0,0,0.2)] rounded-3xl"
            >
              <h2 className="text-3xl font-serif font-bold mb-8 flex items-center gap-3 text-[#8B0000]">
                <CheckCircle className="w-8 h-8 text-[#8B0000]" />
                Postgraduate Programs
              </h2>
              <div className="space-y-6">
                <div className="bg-[#F9F9F9] border border-[rgba(139,0,0,0.15)] p-6 rounded-2xl">
                  <h4 className="font-bold mb-2 text-[#1A0A00]">Master's Programs</h4>
                  <p className="text-sm text-[#374151]">A Bachelor's degree from a recognized institution with at least a second-class lower division or equivalent.</p>
                </div>
                <div className="bg-[#F9F9F9] border border-[rgba(139,0,0,0.15)] p-6 rounded-2xl">
                  <h4 className="font-bold mb-2 text-[#1A0A00]">PhD Programs</h4>
                  <p className="text-sm text-[#374151]">A Master's degree in a relevant field from a recognized university, with a proven track record of research.</p>
                </div>
                <div className="bg-[#F9F9F9] border border-[rgba(139,0,0,0.15)] p-6 rounded-2xl">
                  <h4 className="font-bold mb-2 text-[#1A0A00]">Professional Experience</h4>
                  <p className="text-sm text-[#374151]">Some programs may require at least 2 years of relevant working experience.</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Required Documents */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 p-10 bg-[#8B0000] text-white rounded-3xl"
          >
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-serif font-bold mb-6 flex items-center gap-3">
                  <FileText className="w-8 h-8 text-white" />
                  Required Documents
                </h2>
                <ul className="grid sm:grid-cols-2 gap-4">
                  {[
                    "Academic Transcripts",
                    "Certificates/Diplomas",
                    "Valid Identification (ID/Passport)",
                    "Passport Size Photos",
                    "Letter of Recommendation",
                    "Application Fee Receipt"
                  ].map((doc) => (
                    <li key={doc} className="flex items-center gap-2 text-white/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:w-1/2 p-8 bg-white/10 rounded-2xl backdrop-blur-sm">
                <div className="flex gap-4 mb-4">
                  <Info className="w-6 h-6 text-white shrink-0" />
                  <p className="text-sm text-white/90">International students must have their academic documents verified and equated by UNEB (for O & A levels) or NCHE (for higher qualifications).</p>
                </div>
                <a
                  href="https://Applicants.iuea.ac.ug"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 bg-white text-[#8B0000] rounded-xl font-bold text-center hover:bg-gray-100 transition-colors"
                  style={{ textDecoration: 'none' }}
                >
                  Start Application
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


    </main>
  )
}
