"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, MapPin, Phone, Mail } from "lucide-react"
import Image from "next/image"



const socials = [
  { icon: Facebook, href: "https://facebook.com/iueauganda", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com/iuea_uganda", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com/iuea_uganda", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com/school/iuea", label: "LinkedIn" },
  { icon: Youtube, href: "https://youtube.com/iueauganda", label: "YouTube" },
]

import { usePathname } from "next/navigation"

export function Footer() {
  const pathname = usePathname()
  const [email, setEmail] = useState("")

  // Do not show footer on login or admin pages
  if (pathname.startsWith('/login') || pathname.startsWith('/admin')) return null

  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Admissions", href: "/admissions" },
    { name: "Academic Calendar", href: "/calendar" },
    { name: "Student Portal", href: "https://Applicants.iuea.ac.ug" },
    { name: "Library", href: "/library" },
    { name: "Careers", href: "/careers" },
  ]

  const programs = [
    { name: "Undergraduate", href: "/programs/undergraduate" },
    { name: "Postgraduate", href: "/programs/postgraduate" },
    { name: "Professional Courses", href: "/programs/professional" },
    { name: "Online Learning", href: "/programs/online" },
    { name: "Short Courses", href: "/programs/short-courses" },
    { name: "Research Programs", href: "/programs/research" },
  ]

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setEmail("")
    alert("Thank you for subscribing!")
  }

  return (
    <footer className="bg-[#2D2D2D] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center sm:text-left">
          {/* Column 1: Logo & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center sm:items-start"
          >
            <Link href="/" className="inline-block bg-white p-4 rounded-2xl mb-2">
              <div className="relative w-48 h-10">
                <Image 
                  src="/Website-Logo.png" 
                  alt="IUEA Logo" 
                  fill 
                  className="object-contain" 
                />
              </div>
            </Link>
            <p className="mt-6 text-white/70 text-sm leading-relaxed">
              International University of East Africa — Transforming lives through quality education since 2011.
            </p>
            <div className="mt-6 flex items-center justify-center sm:justify-start gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#3D3D3D] flex items-center justify-center hover:bg-[#E8B84B] transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith('http') ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-[#E8B84B] transition-colors"
                      style={{ textDecoration: 'none' }}
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-[#E8B84B] transition-colors"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Programs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-6">Programs</h3>
            <ul className="space-y-3">
              {programs.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-[#E8B84B] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Contact & Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4 text-white/70">
              <li className="flex items-start justify-center sm:justify-start gap-3">
                <MapPin className="w-5 h-5 shrink-0 text-[#E8B84B]" />
                <span className="max-w-[250px] sm:max-w-none">Plot No. 1112/1121, Kansanga Ggaba Road, Kampala, Uganda</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-3">
                <Phone className="w-5 h-5 shrink-0 text-[#E8B84B]" />
                <a href="tel:800335335" className="hover:text-[#E8B84B]">
                  800 335 335
                </a>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-3">
                <Mail className="w-5 h-5 shrink-0 text-[#E8B84B]" />
                <a href="mailto:info@iuea.ac.ug" className="hover:text-[#E8B84B]">
                  info@iuea.ac.ug
                </a>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-8 flex flex-col items-center sm:items-start">
              <h4 className="text-sm font-semibold mb-3">Stay Updated</h4>
              <form onSubmit={handleSubscribe} className="flex w-full max-w-sm sm:max-w-none">
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-4 py-2.5 bg-[#3D3D3D] border border-white/10 rounded-l-lg text-white placeholder:text-white/50 focus:outline-none focus:border-[#E8B84B]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#E8B84B] text-[#1A0A00] font-semibold rounded-r-lg hover:bg-[#D4A73D] transition-colors"
                >
                  Join
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-white/60">
          <p>&copy; 2026 International University of East Africa. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-[#E8B84B] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#E8B84B] transition-colors">
              Terms of Service
            </Link>
            <Link href="/accessibility" className="hover:text-[#E8B84B] transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
