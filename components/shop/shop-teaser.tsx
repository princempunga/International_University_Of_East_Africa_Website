"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ShoppingBag, ArrowRight } from "lucide-react"

const teaserProducts = [
  { name: "IUEA Hoodie", price: "UGX 65,000", image: "/pic1.jfif" },
  { name: "Executive Polo", price: "UGX 45,000", image: "/pic2.jfif" },
  { name: "Tech Backpack", price: "UGX 85,000", image: "/pic3.jfif" },
  { name: "Premium Cap", price: "UGX 25,000", image: "/pic4.jpg" },
]

export function ShopTeaser() {
  return (
    <section className="py-24 bg-white relative overflow-hidden z-1 border-t-4 border-[#8B0000]" style={{ border: '1px solid rgba(139,0,0,0.2)', borderRadius: '0' }}>
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#8B0000]/10 blur-[120px] rounded-full translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-[#8B0000]/5 blur-[100px] rounded-full -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#8B0000] text-sm font-bold tracking-[0.3em] uppercase mb-4 block">
              IUEA Merchandise
            </span>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-[#1A0A00] mb-6 leading-tight">
              Rep Your <br />
              <span className="text-[#8B0000]">University</span>
            </h2>
            <p className="text-[#4B4B4B] text-lg mb-10 max-w-md leading-relaxed">
              From premium hoodies to essential stationery, explore the official
              IUEA collection. High-quality gear for students who value excellence.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link
                href="/shop"
                className="px-8 py-4 bg-[#8B0000] text-white rounded-xl font-bold flex items-center gap-2 hover:bg-[#6B0000] transition-all transform hover:scale-105"
              >
                Visit Official Store
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/shop"
                className="px-8 py-4 bg-white border-2 border-[#8B0000] text-[#8B0000] rounded-xl font-bold flex items-center gap-2 hover:bg-[#8B0000]/5 transition-all"
              >
                View Catalogue
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[rgba(139,0,0,0.2)]">
              <div>
                <p className="text-[#8B0000] font-bold text-2xl">UGX 20K+</p>
                <p className="text-[#6B7280] text-xs uppercase tracking-wider mt-1">Starting price</p>
              </div>
              <div>
                <p className="text-[#8B0000] font-bold text-2xl">50+</p>
                <p className="text-[#6B7280] text-xs uppercase tracking-wider mt-1">Products available</p>
              </div>
              <div>
                <p className="text-[#8B0000] font-bold text-2xl">Free</p>
                <p className="text-[#6B7280] text-xs uppercase tracking-wider mt-1">Campus delivery</p>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Product Grid */}
          <div className="flex justify-center lg:justify-end">
            <div className="grid grid-cols-2 gap-6">
              {teaserProducts.map((product, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: idx * 0.1,
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                  }}
                  whileHover={{
                    rotate: idx % 2 === 0 ? -2 : 2,
                    y: -8,
                    scale: 1.02,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  className="bg-[#FAFAFA] border border-[rgba(139,0,0,0.15)] p-4 rounded-[12px] shadow-2xl w-[160px] h-[180px] flex flex-col items-center justify-between"
                >
                  <div className="relative w-full h-24 mb-1">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-[#1A0A00] font-bold text-[12px] line-clamp-1">{product.name}</h3>
                    <p className="text-[#8B0000] font-bold text-[11px] mt-0.5">{product.price}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
