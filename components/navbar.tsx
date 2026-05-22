"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown, ShoppingCart } from "lucide-react"
import Image from "next/image"
import { useCart } from "@/context/cart-context"

import { useAuth } from "@/context/auth-context"

const navLinks = [
  { name: "Home", href: "/" },
  {
    name: "About",
    href: "/about",
    submenu: [
      { name: "Our Story", href: "/about#story" },
      { name: "History", href: "/about/history" },
      { name: "Leadership", href: "/about/leadership" },
      { name: "Accreditation", href: "/about/accreditation" },
    ]
  },
  {
    name: "Academics",
    href: "/academics",
    submenu: [
      { name: "Programs", href: "/academics/programs" },
      { name: "Faculties", href: "/academics#faculties" },
      { name: "Library", href: "/library" },
      { name: "Academic Calendar", href: "/academics/calendar" },
    ]
  },
  {
    name: "Admissions",
    href: "/admissions",
    submenu: [
      { name: "Apply Now", href: "https://Applicants.iuea.ac.ug" },
      { name: "Requirements", href: "/admissions/requirements" },
      { name: "Fees & Funding", href: "/admissions/fees" },
      { name: "Scholarships", href: "/admissions/scholarships" },
    ]
  },
  { name: "Research", href: "/research" },
  { name: "Alumni", href: "/alumni" },
  { name: "News", href: "/news" },
  { name: "Gallery", href: "/gallery" },
  { name: "IUEA Store", href: "/shop" },
  { name: "Contact", href: "/contact" },
]

export function Navbar() {
  const pathname = usePathname()
  const { cartCount } = useCart()
  const { isAuthenticated } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState("Home")
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [expandedMobileLink, setExpandedMobileLink] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const currentLink = navLinks.find(link =>
      pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
    )
    if (currentLink) setActiveLink(currentLink.name)
  }, [pathname])

  // We'll skip the isMounted return to ensure the layout shows up immediately
  // if (!isMounted) return null
  if (pathname.startsWith('/login') || pathname.startsWith('/admin')) return null

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md w-full">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/">
                <Image
                  src="/Website-Logo.png"
                  alt="IUEA Logo"
                  height={40}
                  width={140}
                  className="h-8 w-auto object-contain"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden xl:flex items-center space-x-6">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative group py-5"
                  onMouseEnter={() => setHoveredLink(link.name)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <Link
                    href={link.href}
                    className={`text-[15px] font-medium transition-colors hover:text-[#8B0000] flex items-center gap-1 ${
                      activeLink === link.name ? "text-[#8B0000]" : "text-[#2D1B00]"
                    }`}
                  >
                    {link.name}
                    {link.submenu && <ChevronDown className={`w-4 h-4 transition-transform ${hoveredLink === link.name ? 'rotate-180' : ''}`} />}
                  </Link>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {link.submenu && hoveredLink === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-0 top-full w-52 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-[100]"
                      >
                        {link.submenu.map((sub) => (
                          <Link 
                            key={sub.name} 
                            href={sub.href} 
                            className="block px-5 py-3 text-sm text-[#2D1B00] hover:bg-gray-50 hover:text-[#8B0000] transition-colors"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Cart */}
              <Link href="/shop/cart" className="relative p-2 text-[#1A0A00]">
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 w-5 h-5 bg-[#8B0000] text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="xl:hidden p-2 text-[#1A0A00]"
                aria-label="Open Menu"
              >
                <Menu className="w-7 h-7" />
              </button>

              {/* Apply Now (Desktop only) */}
              <a 
                href="https://Applicants.iuea.ac.ug" 
                className="hidden xl:inline-flex px-6 py-2 bg-[#8B0000] text-white rounded-full font-bold text-sm hover:bg-[#6B0000] transition-colors"
              >
                Apply Now
              </a>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[60] xl:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "tween", duration: 0.4 }}
              className="fixed top-0 left-0 right-0 bg-white z-[70] xl:hidden shadow-2xl rounded-b-[40px] max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <Image src="/Website-Logo.png" alt="Logo" width={120} height={35} className="h-8 w-auto object-contain" />
                  <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-gray-100 rounded-full">
                    <X className="w-6 h-6 text-[#1A0A00]" />
                  </button>
                </div>

                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => {
                    const hasSubmenu = link.submenu && link.submenu.length > 0;
                    const isExpanded = expandedMobileLink === link.name;

                    return (
                      <div key={link.name} className="border-b border-gray-50">
                        <div className="flex items-center justify-between">
                          <Link
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex-1 py-4 text-lg font-bold text-[#1A0A00]"
                          >
                            {link.name}
                          </Link>
                          {hasSubmenu && (
                            <button
                              onClick={() => setExpandedMobileLink(isExpanded ? null : link.name)}
                              className="p-4"
                            >
                              <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                            </button>
                          )}
                        </div>

                        {/* Mobile Submenu */}
                        <AnimatePresence>
                          {hasSubmenu && isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden bg-gray-50/50 rounded-xl"
                            >
                              <div className="py-2 pl-4 flex flex-col gap-1">
                                {link.submenu?.map((sub) => (
                                  <Link
                                    key={sub.name}
                                    href={sub.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="py-3 text-base text-[#6B5B4F] hover:text-[#8B0000] transition-colors"
                                  >
                                    {sub.name}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </nav>

                <div className="mt-8 pb-4">
                  <a
                    href="https://Applicants.iuea.ac.ug"
                    className="flex items-center justify-center w-full py-4 bg-[#8B0000] text-white rounded-2xl font-bold text-lg shadow-xl shadow-red-900/20"
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
