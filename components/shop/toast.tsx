"use client"

import { useCart } from "@/context/cart-context"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle } from "lucide-react"

import { usePathname } from "next/navigation"

export function Toast() {
  const { toast } = useCart()
  const pathname = usePathname()

  // Do not show toast on login or admin pages
  if (pathname.startsWith('/login') || pathname.startsWith('/admin')) return null

  return (
    <AnimatePresence>
      {toast.show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
          className="fixed bottom-8 right-8 z-[9999] flex items-center gap-3 bg-white px-6 py-4 rounded-xl shadow-2xl border-l-4 border-[#8B0000]"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-[#1A0A00]">{toast.message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
