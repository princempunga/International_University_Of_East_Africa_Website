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
import api from "@/lib/api"
import { AlertCircle } from "lucide-react"

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("")
  const [email, setEmail] = useState("")
  const [isTracking, setIsTracking] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [orderData, setOrderData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsTracking(true)
    setError(null)
    try {
      const res = await api.trackOrder(orderNumber.startsWith('#') ? orderNumber.substring(1) : orderNumber)
      if (res?.success) {
        setOrderData(res.data)
        setShowResult(true)
      } else {
        throw new Error(res?.message || "Order not found")
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsTracking(false)
    }
  }

  const getStatusSteps = (status: string) => {
    const statuses = ["pending", "processing", "shipped", "delivered"]
    const currentIndex = statuses.indexOf(status)
    
    return [
      {
        status: currentIndex >= 0 ? "completed" : "pending",
        icon: ShoppingBag,
        title: "Order Placed",
        date: "Confirmed",
        desc: "Your order has been received"
      },
      {
        status: currentIndex > 0 ? "completed" : currentIndex === 0 ? "current" : "pending",
        icon: Package,
        title: "Order Processed",
        date: currentIndex >= 1 ? "Processed" : "Pending",
        desc: "Your items are being prepared"
      },
      {
        status: currentIndex > 1 ? "completed" : currentIndex === 1 ? "current" : "pending",
        icon: Truck,
        title: "Out for Delivery",
        date: currentIndex >= 2 ? "In Transit" : "Pending",
        desc: "Your order is on its way"
      },
      {
        status: currentIndex === 3 ? "completed" : currentIndex === 2 ? "current" : "pending",
        icon: CheckCircle,
        title: "Delivered",
        date: currentIndex === 3 ? "Delivered" : "Pending",
        desc: "Order has been delivered"
      }
    ]
  }

  const steps = orderData ? getStatusSteps(orderData.order_status) : []

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

              {error && (
                <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-medium">
                  <AlertCircle className="w-5 h-5" />
                  {error}
                </div>
              )}

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
                    <h2 className="text-3xl font-serif font-bold text-[#8B0000]">#{orderData.order_number}</h2>
                    <p className="text-gray-500 font-medium">
                      Placed on {new Date(orderData.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="md:text-right">
                    <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">Order Status</p>
                    <p className="text-xl font-bold text-[#1A0A00] uppercase tracking-tighter">{orderData.order_status}</p>
                    <div className="mt-2 space-y-1">
                      {orderData.items?.slice(0, 2).map((item: any, i: number) => (
                        <p key={i} className="text-xs text-[#8B0000] font-bold">
                          {item.product_name} × {item.quantity}
                        </p>
                      ))}
                      {orderData.items?.length > 2 && (
                        <p className="text-[10px] text-gray-400 font-bold">+ {orderData.items.length - 2} more items</p>
                      )}
                    </div>
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
                        {orderData.delivery_address}<br />
                        {orderData.delivery_city}, Uganda
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
                        <p className="text-sm text-gray-600 font-medium uppercase tracking-tighter">
                          {orderData.delivery_method?.replace('_', ' ')}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5 text-[#8B0000]" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Contact Details</p>
                        <p className="text-sm text-gray-600 font-medium">{orderData.customer_phone}</p>
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
                <button 
                  onClick={() => {
                    const html2pdf = (require('html2pdf.js') as any);
                    const element = document.createElement('div');
                    element.innerHTML = `
                      <div style="font-family: 'Inter', sans-serif; padding: 40px; color: #1a0a00; line-height: 1.6; background: white;">
                        <div style="text-align: center; margin-bottom: 40px; border-bottom: 2px solid #8b0000; padding-bottom: 20px;">
                          <div style="font-size: 24px; font-weight: 900; color: #8b0000; text-transform: uppercase; margin-bottom: 5px;">International University of East Africa</div>
                          <div style="font-size: 12px; font-weight: 700; color: #666;">Official Store Receipt</div>
                        </div>

                        <div style="display: flex; justify-content: space-between; margin-bottom: 40px;">
                          <div style="width: 50%;">
                            <h4 style="margin: 0 0 10px 0; font-size: 10px; text-transform: uppercase; color: #999; letter-spacing: 1px;">Order Number</h4>
                            <p style="margin: 0; font-weight: 700; font-size: 14px;">#${orderData.order_number}</p>
                            <p style="font-size: 11px; color: #999; margin-top: 5px;">Placed on ${new Date(orderData.created_at).toLocaleDateString()}</p>
                          </div>
                          <div style="width: 50%; text-align: right;">
                            <h4 style="margin: 0 0 10px 0; font-size: 10px; text-transform: uppercase; color: #999; letter-spacing: 1px;">Customer Details</h4>
                            <p style="margin: 0; font-weight: 700; font-size: 14px;">${orderData.customer_name}</p>
                            <p style="font-weight: 500; font-size: 11px; margin: 0;">${orderData.customer_email}</p>
                            <p style="font-weight: 500; font-size: 11px; margin: 0;">${orderData.customer_phone}</p>
                          </div>
                        </div>

                        <div style="display: flex; justify-content: space-between; margin-bottom: 40px;">
                          <div style="width: 50%;">
                            <h4 style="margin: 0 0 10px 0; font-size: 10px; text-transform: uppercase; color: #999; letter-spacing: 1px;">Shipping Address</h4>
                            <p style="margin: 0; font-weight: 700; font-size: 14px;">${orderData.delivery_address}</p>
                            <p style="margin: 0; font-weight: 700; font-size: 14px;">${orderData.delivery_city}, Uganda</p>
                          </div>
                          <div style="width: 50%; text-align: right;">
                            <h4 style="margin: 0 0 10px 0; font-size: 10px; text-transform: uppercase; color: #999; letter-spacing: 1px;">Payment Method</h4>
                            <p style="margin: 0; font-weight: 700; font-size: 14px; text-transform: uppercase;">${orderData.payment_method?.replace('_', ' ')}</p>
                          </div>
                        </div>

                        <table style="width: 100%; border-collapse: collapse; margin-bottom: 40px;">
                          <thead>
                            <tr style="background: #f9f9f9;">
                              <th style="text-align: left; padding: 12px; font-size: 10px; text-transform: uppercase;">Product</th>
                              <th style="text-align: left; padding: 12px; font-size: 10px; text-transform: uppercase;">Qty</th>
                              <th style="text-align: left; padding: 12px; font-size: 10px; text-transform: uppercase;">Size/Color</th>
                              <th style="text-align: right; padding: 12px; font-size: 10px; text-transform: uppercase;">Subtotal</th>
                            </tr>
                          </thead>
                          <tbody>
                            ${orderData.items?.map((item: any) => `
                              <tr>
                                <td style="padding: 12px; border-bottom: 1px solid #eee; font-size: 13px;"><strong>${item.product_name}</strong></td>
                                <td style="padding: 12px; border-bottom: 1px solid #eee; font-size: 13px;">${item.quantity}</td>
                                <td style="padding: 12px; border-bottom: 1px solid #eee; font-size: 13px;">${item.size || 'N/A'} / ${item.color || 'N/A'}</td>
                                <td style="padding: 12px; border-bottom: 1px solid #eee; font-size: 13px; text-align: right;">UGX ${item.subtotal?.toLocaleString()}</td>
                              </tr>
                            `).join('')}
                          </tbody>
                        </table>

                        <div style="margin-left: auto; width: 250px;">
                          <div style="display: flex; justify-content: space-between; padding: 5px 0; font-size: 12px;"><span>Subtotal</span><span>UGX ${orderData.subtotal?.toLocaleString()}</span></div>
                          <div style="display: flex; justify-content: space-between; padding: 5px 0; font-size: 12px;"><span>Delivery Fee</span><span>UGX ${orderData.delivery_fee?.toLocaleString()}</span></div>
                          <div style="display: flex; justify-content: space-between; padding: 5px 0; font-size: 12px;"><span>Tax (VAT 18%)</span><span>UGX ${orderData.tax?.toLocaleString()}</span></div>
                          <div style="display: flex; justify-content: space-between; border-top: 2px solid #8b0000; margin-top: 10px; padding-top: 10px; font-size: 16px; font-weight: 900; color: #8b0000;"><span>Total Paid</span><span>UGX ${orderData.total?.toLocaleString()}</span></div>
                        </div>

                        <div style="text-align: center; margin-top: 60px; font-size: 10px; color: #999; border-top: 1px solid #eee; padding-top: 20px;">
                          <p style="margin: 5px 0;">Thank you for shopping with IUEA. This is an official computer-generated receipt.</p>
                          <p style="margin: 5px 0; font-weight: 700;">International University of East Africa - Learning to Succeed</p>
                        </div>
                      </div>
                    `;

                    const opt = {
                      margin: 0,
                      filename: `IUEA_Receipt_${orderData.order_number}.pdf`,
                      image: { type: 'jpeg', quality: 0.98 },
                      html2canvas: { scale: 2 },
                      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
                    };

                    html2pdf().from(element).set(opt).save();
                  }}
                  className="flex-1 h-[60px] border-2 border-[#8B0000] text-[#8B0000] rounded-full font-bold hover:bg-[#8B0000]/5 transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Receipt (PDF)
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
