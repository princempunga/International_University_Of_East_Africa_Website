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
  { name: "Shop", href: "/shop" },
  { name: "Contact", href: "/contact" },
]

export function Navbar() {
  const pathname = usePathname()
  const { cartCount } = useCart()
  const { isAuthenticated, user } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState("Home")
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  const isSolidPage = pathname !== "/"

  useEffect(() => {
    setIsMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80)
    }

    // Set active link based on current path
    const currentLink = navLinks.find(link =>
      pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
    )
    if (currentLink) setActiveLink(currentLink.name)

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pathname])

  const showSolid = true

  if (!isMounted) return null

  // Do not show navbar on login or admin pages
  if (pathname.startsWith('/login') || pathname.startsWith('/admin')) return null

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 bg-white shadow-[0_2px_20px_rgba(0,0,0,0.08)] py-3 transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link href="/" className="flex items-center group shrink-0 mr-12 xl:mr-16">
              <Image
                src="/Website-Logo.png"
                alt="IUEA Logo"
                height={60}
                width={180}
                className="h-11 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative group"
                  onMouseEnter={() => setHoveredLink(link.name)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <Link
                    href={link.href}
                    onClick={() => setActiveLink(link.name)}
                    className={`flex items-center gap-1 text-[15px] font-medium transition-all duration-200 ${showSolid
                      ? (activeLink === link.name ? "text-[#8B0000]" : "text-[#2D1B00]")
                      : "text-white/90 hover:text-white"
                      } hover:text-[#8B0000]`}
                    style={{ fontFamily: 'var(--font-dm-sans), sans-serif' }}
                  >
                    {link.name}
                    {link.submenu && <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180 opacity-50" />}

                    {activeLink === link.name && (
                      <motion.div
                        layoutId="activeLink"
                        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#E8B84B]"
                        initial={false}
                      />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {link.submenu && (
                    <AnimatePresence>
                      {hoveredLink === link.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute left-1/2 -translate-x-1/2 mt-4 w-52 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
                        >
                          <div className="py-2">
                            {link.submenu.map((sub) => (
                              sub.href.startsWith('http') ? (
                                <a
                                  key={sub.name}
                                  href={sub.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block px-5 py-3 text-[14px] text-[#2D1B00] hover:bg-gray-50 hover:text-[#8B0000] transition-colors font-medium"
                                  style={{ textDecoration: 'none' }}
                                >
                                  {sub.name}
                                </a>
                              ) : (
                                <Link
                                  key={sub.name}
                                  href={sub.href}
                                  className="block px-5 py-3 text-[14px] text-[#2D1B00] hover:bg-gray-50 hover:text-[#8B0000] transition-colors font-medium"
                                >
                                  {sub.name}
                                </Link>
                              )
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              <Link
                href="/shop/cart"
                className={`relative p-2 rounded-full transition-all ${showSolid
                  ? "text-[#1A0A00] hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
                  }`}
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#8B0000] text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </Link>

              {isAuthenticated && (
                <Link
                  href="/admin/dashboard"
                  className="hidden sm:inline-flex items-center px-6 py-[10px] bg-[#1A0A00] text-[#E8B84B] rounded-full font-bold text-[15px] hover:bg-[#2D1B00] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 shadow-lg shadow-black/20 whitespace-nowrap"
                  style={{ fontFamily: 'var(--font-dm-sans), sans-serif' }}
                >
                  Admin Portal
                </Link>
              )}

              <a
                href="https://Applicants.iuea.ac.ug"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center px-6 py-[10px] bg-[#8B0000] text-white rounded-full font-bold text-[15px] hover:bg-[#6B0000] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 shadow-lg shadow-crimson/20 whitespace-nowrap"
                style={{ fontFamily: 'var(--font-dm-sans), sans-serif', textDecoration: 'none' }}
              >
                Apply Now
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className={`lg:hidden p-2 rounded-lg ${showSolid ? "text-[#1A0A00]" : "text-white"
                  }`}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-white z-[70] lg:hidden overflow-y-auto"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-50">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10">
                    <Image
                      src="/Website-Logo.png"
                      alt="IUEA Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-[#1A0A00]" />
                </button>
              </div>

              <div className="p-6">
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <div key={link.name}>
                      <Link
                        href={link.href}
                        onClick={() => {
                          if (!link.submenu) {
                            setActiveLink(link.name)
                            setIsMobileMenuOpen(false)
                          }
                        }}
                        className={`flex items-center justify-between text-[17px] font-semibold py-4 border-b border-gray-50 transition-colors ${activeLink === link.name ? "text-[#8B0000]" : "text-[#1A0A00]"
                          }`}
                      >
                        {link.name}
                        {link.submenu && <ChevronDown className="w-4 h-4 opacity-30" />}
                      </Link>
                      {link.submenu && (
                        <div className="pl-4 mt-1 flex flex-col gap-1 mb-4 bg-gray-50/50 rounded-xl">
                          {link.submenu.map((sub) => (
                            sub.href.startsWith('http') ? (
                              <a
                                key={sub.name}
                                href={sub.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-[14px] text-gray-600 py-3 px-2 hover:text-[#8B0000] transition-colors"
                                style={{ textDecoration: 'none' }}
                              >
                                {sub.name}
                              </a>
                            ) : (
                              <Link
                                key={sub.name}
                                href={sub.href}
                                onClick={() => {
                                  setActiveLink(link.name)
                                  setIsMobileMenuOpen(false)
                                }}
                                className="text-[14px] text-gray-600 py-3 px-2 hover:text-[#8B0000] transition-colors"
                              >
                                {sub.name}
                              </Link>
                            )
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>
                <div className="mt-8">
                  <a
                    href="https://Applicants.iuea.ac.ug"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full py-4 bg-[#8B0000] text-white rounded-2xl text-center font-bold shadow-xl shadow-crimson/20"
                    style={{ textDecoration: 'none' }}
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
