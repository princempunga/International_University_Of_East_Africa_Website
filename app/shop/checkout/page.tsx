"use client"

import { useState } from "react"
import { useCart } from "@/context/cart-context"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, Truck, CreditCard, ChevronRight, MapPin, Phone, Mail, Building, Landmark, Smartphone } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import api from "@/lib/api"
import { Loader2, AlertCircle } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart()
  const [step, setStep] = useState(1) // 1: Delivery, 2: Payment, 3: Confirmation
  const [deliveryMethod, setDeliveryMethod] = useState("kampala")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [placedOrder, setPlacedOrder] = useState<any>(null)

  // Form states
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    delivery_address: "",
    delivery_city: "",
    notes: ""
  })

  const deliveryFee = deliveryMethod === "pickup" ? 0 : deliveryMethod === "kampala" ? 10000 : 25000
  const vat = cartTotal * 0.18
  const grandTotal = cartTotal + deliveryFee + vat

  const handleNextStep = async () => {
    if (step === 2) {
      // Place real order
      setIsSubmitting(true)
      setError(null)
      try {
        const orderData = {
          ...formData,
          delivery_method: deliveryMethod === "pickup" ? "campus_pickup" : deliveryMethod,
          payment_method: "mtn_momo", // Defaulting to one for now
          items: cart.map(item => ({
            product_id: item.id,
            quantity: item.quantity,
            size: item.size,
            color: item.color
          }))
        }

        const res = await fetch("http://localhost:8000/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify(orderData)
        })
        const data = await res.json()

        if (!res.ok) throw new Error(data.message || "Failed to place order")

        setPlacedOrder(data.data)
        setStep(3)
        clearCart()
      } catch (err: any) {
        setError(err.message)
      } finally {
        setIsSubmitting(false)
      }
    } else {
      // Basic validation for step 1
      if (step === 1 && (!formData.customer_name || !formData.customer_email || !formData.customer_phone)) {
        setError("Please fill in all required fields.")
        return
      }
      setError(null)
      setStep(step + 1)
    }
    window.scrollTo(0, 0)
  }

  const steps = [
    { id: 1, name: "Delivery", icon: Truck },
    { id: 2, name: "Payment", icon: CreditCard },
    { id: 3, name: "Confirmation", icon: CheckCircle2 }
  ]

  return (
    <main className="min-h-screen bg-[#faf9f7]">


      <div className="pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex items-center justify-between relative max-w-2xl mx-auto">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 z-0" />
              {steps.map((s) => (
                <div key={s.id} className="relative z-10 flex flex-col items-center gap-2">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                    step >= s.id ? "bg-[#8B0000] text-white scale-110 shadow-lg shadow-[#8B0000]/20" : "bg-white text-gray-400"
                  }`}>
                    <s.icon className="w-5 h-5" />
                  </div>
                  <span className={`text-xs font-bold transition-colors ${step >= s.id ? "text-[#8B0000]" : "text-gray-400"}`}>
                    {s.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-8"
                  >
                    <div className="bg-white rounded-3xl p-8 shadow-sm">
                      <h2 className="text-2xl font-bold text-[#1A0A00] mb-8 flex items-center gap-3">
                        <MapPin className="w-6 h-6 text-[#8B0000]" />
                        Delivery Information
                      </h2>

                      {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-medium">
                          <AlertCircle className="w-5 h-5" />
                          {error}
                        </div>
                      )}
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-600">Full Name <span className="text-red-500">*</span></label>
                          <input 
                            type="text" 
                            required
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B0000]/20" 
                            placeholder="John Doe" 
                            value={formData.customer_name}
                            onChange={(e) => setFormData({...formData, customer_name: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-600">Email Address <span className="text-red-500">*</span></label>
                          <input 
                            type="email" 
                            required
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B0000]/20" 
                            placeholder="john@example.com" 
                            value={formData.customer_email}
                            onChange={(e) => setFormData({...formData, customer_email: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-600">Phone Number <span className="text-red-500">*</span></label>
                          <input 
                            type="tel" 
                            required
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B0000]/20" 
                            placeholder="+256 700 000 000" 
                            value={formData.customer_phone}
                            onChange={(e) => setFormData({...formData, customer_phone: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-600">Street Address</label>
                          <input 
                            type="text" 
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B0000]/20" 
                            placeholder="Apt, Suite, Building, Street" 
                            value={formData.delivery_address}
                            onChange={(e) => setFormData({...formData, delivery_address: e.target.value})}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-600">City / District</label>
                            <input 
                              type="text" 
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B0000]/20" 
                              placeholder="Kampala" 
                              value={formData.delivery_city}
                              onChange={(e) => setFormData({...formData, delivery_city: e.target.value})}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-3xl p-8 shadow-sm">
                      <h2 className="text-xl font-bold text-[#1A0A00] mb-6">Select Delivery Method</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                          { id: "pickup", name: "Campus Pickup", price: "FREE", icon: Building },
                          { id: "kampala", name: "Kampala Delivery", price: "UGX 10k", icon: Truck },
                          { id: "upcountry", name: "Upcountry", price: "UGX 25k", icon: Truck }
                        ].map((m) => (
                          <button
                            key={m.id}
                            onClick={() => setDeliveryMethod(m.id)}
                            className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                              deliveryMethod === m.id ? "border-[#8B0000] bg-[#8B0000]/5" : "border-gray-100 hover:border-gray-200"
                            }`}
                          >
                            <m.icon className={`w-6 h-6 ${deliveryMethod === m.id ? "text-[#8B0000]" : "text-gray-400"}`} />
                            <span className="text-xs font-bold">{m.name}</span>
                            <span className="text-[10px] text-gray-500">{m.price}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <button 
                      onClick={handleNextStep}
                      className="w-full py-5 bg-[#8B0000] text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#6B0000] transition-all"
                    >
                      Continue to Payment
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-8"
                  >
                    <div className="bg-white rounded-3xl p-8 shadow-sm">
                      <h2 className="text-2xl font-bold text-[#1A0A00] mb-8 flex items-center gap-3">
                        <CreditCard className="w-6 h-6 text-[#8B0000]" />
                        Payment Method
                      </h2>
                      
                      <div className="space-y-4">
                        {/* Mobile Money */}
                        <div className="p-6 rounded-2xl border-2 border-[#8B0000] bg-[#8B0000]/5">
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                              <Smartphone className="w-6 h-6 text-[#8B0000]" />
                              <div>
                                <p className="font-bold">Mobile Money</p>
                                <p className="text-xs text-gray-500">MTN or Airtel Money</p>
                              </div>
                            </div>
                            <div className="flex gap-3">
                              <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                padding: '4px 10px',
                                background: '#FFCC00',
                                borderRadius: '6px',
                                fontWeight: 800,
                                fontSize: '13px',
                                color: '#000000',
                                letterSpacing: '0.5px'
                              }}>MTN</span>
                              <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                padding: '4px 10px',
                                background: '#FF0000',
                                borderRadius: '6px',
                                fontWeight: 800,
                                fontSize: '13px',
                                color: '#FFFFFF',
                                letterSpacing: '0.5px'
                              }}>airtel</span>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500">Mobile Number</label>
                            <input type="tel" className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B0000]/20 font-bold" placeholder="07XX XXX XXX" />
                          </div>
                        </div>

                        {/* Card Payment */}
                        <div className="p-6 rounded-2xl border border-gray-100 hover:bg-gray-50 cursor-pointer transition-all">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 opacity-60">
                              <Landmark className="w-6 h-6" />
                             <div>
                                <p className="font-bold">Credit / Debit Card / PayPal</p>
                                <p className="text-xs">Visa, Mastercard, PayPal</p>
                              </div>
                            </div>
                            <div className="flex gap-3 opacity-90 items-center">
                              <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                padding: '4px 12px',
                                background: '#1A1F71',
                                borderRadius: '6px',
                                fontWeight: 900,
                                fontSize: '14px',
                                color: '#FFFFFF',
                                fontStyle: 'italic',
                                letterSpacing: '1px'
                              }}>VISA</span>
                              <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0px',
                                padding: '2px 4px',
                              }}>
                                <span style={{
                                  width: '24px',
                                  height: '24px',
                                  borderRadius: '50%',
                                  background: '#EB001B',
                                  display: 'inline-block',
                                  marginRight: '-8px'
                                }}/>
                                <span style={{
                                  width: '24px',
                                  height: '24px',
                                  borderRadius: '50%',
                                  background: '#F79E1B',
                                  display: 'inline-block',
                                  opacity: 0.9
                                }}/>
                              </span>
                              <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                padding: '4px 10px',
                                background: '#003087',
                                borderRadius: '6px',
                                fontWeight: 800,
                                fontSize: '13px',
                                color: '#FFFFFF',
                              }}>Pay<span style={{color:'#009CDE'}}>Pal</span></span>
                            </div>
                          </div>
                        </div>

                        {/* Bank Transfer */}
                        <div className="p-6 rounded-2xl border border-gray-100 hover:bg-gray-50 cursor-pointer transition-all">
                          <div className="flex items-center gap-3 opacity-60">
                            <Landmark className="w-6 h-6" />
                            <div>
                              <p className="font-bold">Bank Transfer</p>
                              <p className="text-xs">Standard Chartered, Centenary, Stanbic</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={handleNextStep}
                      className="w-full py-5 bg-[#8B0000] text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#6B0000] transition-all"
                    >
                      Complete Payment: UGX {formatCurrency(grandTotal)}
                    </button>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-[40px] p-12 text-center shadow-xl border border-green-50"
                  >
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
                      >
                        <CheckCircle2 className="w-12 h-12 text-green-600" />
                      </motion.div>
                    </div>
                    
                    <h2 className="text-3xl font-serif font-bold text-[#1A0A00] mb-4">Order Confirmed!</h2>
                    <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                      Thank you for your purchase. Your order <span className="font-bold text-[#1A0A00]">#IUEA-2026-{Math.floor(Math.random() * 9000) + 1000}</span> has been placed successfully.
                    </p>

                    <div className="bg-[#F5F0E8] rounded-2xl p-6 mb-10 inline-block text-left">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Next Steps</p>
                      <ul className="space-y-3 text-sm text-[#1A0A00]">
                        <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#8B0000]" /> Check your email for a detailed summary</li>
                        <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#8B0000]" /> SMS confirmation will be sent shortly</li>
                        <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#8B0000]" /> We'll notify you when it's out for delivery</li>
                      </ul>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link href="/shop" className="px-8 py-4 bg-[#1A0A00] text-white rounded-xl font-bold hover:bg-black transition-all">
                        Continue Shopping
                      </Link>
                      <Link href="/shop/track" className="px-8 py-4 border-2 border-[#8B0000] text-[#8B0000] rounded-xl font-bold hover:bg-[#8B0000] hover:text-white transition-all text-center">
                        Track My Order
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Order Summary Sidebar */}
            {step < 3 && (
              <div className="space-y-6">
                <div className="bg-white rounded-3xl p-8 shadow-sm sticky top-32">
                  <h3 className="text-lg font-bold text-[#1A0A00] mb-6">Order Summary</h3>
                  
                  <div className="max-h-[300px] overflow-y-auto mb-6 pr-2 space-y-4">
                    {cart.map((item) => (
                      <div key={`${item.id}-${item.size}`} className="flex gap-4">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-50 relative flex-shrink-0">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold truncate">{item.name}</p>
                          <p className="text-[10px] text-gray-500">Qty: {item.quantity} • {item.size || "Standard"}</p>
                        </div>
                        <p className="text-xs font-bold">UGX {formatCurrency(item.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 pt-6 border-t border-dashed">
                    <div className="flex justify-between text-xs font-medium text-gray-500">
                      <span>Subtotal</span>
                      <span>UGX {formatCurrency(cartTotal)}</span>
                    </div>
                    <div className="flex justify-between text-xs font-medium text-gray-500">
                      <span>Delivery Fee</span>
                      <span>UGX {formatCurrency(deliveryFee)}</span>
                    </div>
                    <div className="flex justify-between text-xs font-medium text-gray-500">
                      <span>Tax (18% VAT)</span>
                      <span>UGX {formatCurrency(vat)}</span>
                    </div>
                    <div className="flex justify-between items-end pt-3 text-[#8B0000]">
                      <span className="text-sm font-bold">Grand Total</span>
                      <span className="text-xl font-bold">UGX {formatCurrency(grandTotal)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>


    </main>
  )
}
