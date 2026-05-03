"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Phone, Mail, ArrowRight } from "lucide-react"

export function CTABanner() {
  return (
    <section className="bg-[#8B0000] overflow-hidden">
      {/* CTA Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-serif text-white leading-tight text-balance"
        >
          Your Journey to{" "}
          <span className="text-white italic">Excellence</span>{" "}
          Starts Here
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <a
            href="https://Applicants.iuea.ac.ug"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-[#8B0000] rounded-full font-semibold hover:bg-gray-100 transition-colors"
            style={{ textDecoration: 'none' }}
          >
            Apply Online
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <Link
            href="/prospectus"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-colors"
          >
            Request Prospectus
          </Link>
        </motion.div>

        {/* Contact Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex flex-wrap justify-center gap-8 text-white/80"
        >
          <a
            href="tel:+256414123456"
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <Phone className="w-5 h-5" />
            +256 414 123 456
          </a>
          <a
            href="mailto:admissions@iuea.ac.ug"
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <Mail className="w-5 h-5" />
            admissions@iuea.ac.ug
          </a>
        </motion.div>
      </div>
    </section>
  )
}
