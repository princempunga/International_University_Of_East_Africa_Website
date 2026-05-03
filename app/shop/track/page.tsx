"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ShoppingBag, 
  Package, 
  Truck, 
  CheckCircle, 
  ChevronRight, 
  MapPin, 
  Phone, 
  Mail,
  Search,
  Download,
  ArrowLeft
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("")
  const [email, setEmail] = useState("")
  const [isTracking, setIsTracking] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault()
    setIsTracking(true)
    // Simulate API call
    setTimeout(() => {
      setIsTracking(false)
      setShowResult(true)
    }, 1500)
  }

  const steps = [
    {
      status: "completed",
      icon: ShoppingBag,
      title: "Order Placed",
      date: "April 29, 2026 at 9:01 AM",
      desc: "Your order has been confirmed"
    },
    {
      status: "completed",
      icon: Package,
      title: "Order Processed",
      date: "April 29, 2026 at 11:30 AM",
      desc: "Your items are being prepared"
    },
    {
      status: "current",
      icon: Truck,
      title: "Out for Delivery",
      date: "Expected May 3, 2026",
      desc: "Your order is on its way"
    },
    {
      status: "pending",
      icon: CheckCircle,
      title: "Delivered",
      date: "Pending",
      desc: "Order will be delivered to your address"
    }
  ]

  return (
    <main className="min-h-screen bg-[#F5F0E8] font-sans">
      {/* Hero Strip */}
      <section className="relative h-[120px] bg-[#8B0000] flex items-center pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-white">Track Your Order</h1>
            <nav className="flex items-center gap-2 text-xs text-white/70 uppercase tracking-widest font-bold">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white">Track Order</span>
            </nav>
          </div>
        </div>
      </section>

      <div className="max-w-[700px] mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key="lookup"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[32px] p-8 md:p-12 shadow-xl shadow-black/5 border border-white/20"
            >
              <div className="text-center mb-10">
                <div className="w-16 h-16 bg-[#8B0000]/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Search className="w-8 h-8 text-[#8B0000]" />
                </div>
                <h2 className="text-3xl font-serif font-bold text-[#1A0A00] mb-3">Enter Your Order Details</h2>
                <p className="text-gray-500">Enter your order number and email to track your delivery status</p>
              </div>

              <form onSubmit={handleTrack} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Order Number</label>
                  <input
                    required
                    type="text"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    placeholder="e.g. #IUEA-2026-6101"
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#8B0000]/20 focus:border-[#8B0000] transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email used during checkout"
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#8B0000]/20 focus:border-[#8B0000] transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isTracking}
                  className="w-full h-[60px] bg-[#8B0000] text-white rounded-full font-bold flex items-center justify-center gap-3 hover:bg-[#6B0000] transition-all shadow-lg shadow-[#8B0000]/20 active:scale-95 disabled:opacity-70"
                >
                  {isTracking ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                    />
                  ) : (
                    <>
                      Track Order
                      <ArrowLeft className="w-5 h-5 rotate-180" />
                    </>
                  )}
                </button>
              </form>

              <p className="text-center text-xs text-gray-400 mt-10">
                Need help? <Link href="/contact" className="text-[#8B0000] font-bold hover:underline">Contact Support</Link>
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              {/* Order Header Card */}
              <div className="bg-white rounded-[32px] p-8 shadow-xl shadow-black/5 border border-white">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-black uppercase tracking-tighter bg-[#8B0000]/10 text-[#8B0000] px-3 py-1 rounded-full">Order Details</span>
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-[#8B0000]">{orderNumber || "#IUEA-2026-6101"}</h2>
                    <p className="text-gray-500 font-medium">Placed on April 29, 2026</p>
                  </div>
                  <div className="md:text-right">
                    <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">Estimated Delivery</p>
                    <p className="text-xl font-bold text-[#1A0A00]">May 3, 2026</p>
                    <p className="text-sm text-[#8B0000] font-medium mt-1">IUEA Phone Case × 1</p>
                  </div>
                </div>
              </div>

              {/* Tracking Timeline */}
              <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-xl shadow-black/5 border border-white">
                <h3 className="text-xl font-serif font-bold text-[#1A0A00] mb-12">Tracking Status</h3>
                
                <div className="relative space-y-0">
                  {steps.map((step, idx) => (
                    <div key={idx} className="relative flex gap-8 pb-12 last:pb-0">
                      {/* Connecting Line */}
                      {idx !== steps.length - 1 && (
                        <div className={`absolute left-7 top-14 w-0.5 h-[calc(100%-14px)] z-0 ${
                          step.status === "completed" ? "bg-[#8B0000]" : "bg-gray-200 border-l-2 border-dashed border-gray-300"
                        }`} />
                      )}

                      {/* Icon Circle */}
                      <div className="relative z-10 flex-shrink-0">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                          step.status === "completed" 
                            ? "bg-[#16A34A] text-white shadow-lg shadow-green-200" 
                            : step.status === "current"
                            ? "bg-[#8B0000] text-white shadow-lg shadow-[#8B0000]/30 animate-pulse"
                            : "bg-gray-100 text-gray-400"
                        }`}>
                          <step.icon className={`w-6 h-6 ${step.status === "current" && "animate-bounce"}`} />
                        </div>
                      </div>

                      {/* Text Content */}
                      <div className="pt-1">
                        <h4 className={`text-lg font-bold mb-1 ${
                          step.status === "pending" ? "text-gray-400" : "text-[#1A0A00]"
                        }`}>
                          {step.title}
                        </h4>
                        <p className={`text-xs font-black uppercase tracking-widest mb-2 ${
                          step.status === "pending" ? "text-gray-300" : "text-[#8B0000]"
                        }`}>
                          {step.date}
                        </p>
                        <p className={`text-sm ${
                          step.status === "pending" ? "text-gray-400" : "text-gray-500"
                        }`}>
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Details Card */}
              <div className="bg-white rounded-[32px] p-8 shadow-xl shadow-black/5 border border-white">
                <h3 className="text-xl font-serif font-bold text-[#1A0A00] mb-8">Delivery Information</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-[#8B0000]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Shipping Address</p>
                      <p className="text-sm text-gray-600 leading-relaxed font-medium">
                        IUEA Main Campus, Kansanga<br />
                        Block B, Room 204<br />
                        Kampala, Uganda
                      </p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center shrink-0">
                        <Truck className="w-5 h-5 text-[#8B0000]" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Shipping Method</p>
                        <p className="text-sm text-gray-600 font-medium">Campus Delivery</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5 text-[#8B0000]" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Contact Details</p>
                        <p className="text-sm text-gray-600 font-medium">+256 700 000 000</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-50 flex justify-center">
                   <Link href="/contact" className="text-sm font-bold text-[#8B0000] hover:underline flex items-center gap-2">
                     <Mail className="w-4 h-4" />
                     Contact Support for Help
                   </Link>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/shop" 
                  className="flex-1 h-[60px] bg-[#8B0000] text-white rounded-full font-bold flex items-center justify-center gap-2 hover:bg-[#6B0000] transition-all shadow-lg shadow-[#8B0000]/20"
                >
                  Continue Shopping
                </Link>
                <button className="flex-1 h-[60px] border-2 border-[#8B0000] text-[#8B0000] rounded-full font-bold hover:bg-[#8B0000]/5 transition-all flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />
                  Download Receipt
                </button>
              </div>

              <button 
                onClick={() => setShowResult(false)}
                className="w-full text-center text-sm font-bold text-gray-400 hover:text-[#8B0000] transition-colors mt-4"
              >
                Track another order
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx global>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pulse {
          animation: pulse 2s infinite ease-in-out;
        }
      `}</style>
    </main>
  )
}
