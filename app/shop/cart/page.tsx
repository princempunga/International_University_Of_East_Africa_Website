"use client"

import { useCart } from "@/context/cart-context"
import { motion, AnimatePresence } from "framer-motion"
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag, CreditCard, ShieldCheck, Truck } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart()

  const deliveryFee = cartTotal > 100000 ? 0 : 15000
  const vat = cartTotal * 0.18
  const grandTotal = cartTotal + deliveryFee + vat

  return (
    <main className="min-h-screen bg-[#faf9f7]">


      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-serif font-bold text-[#1A0A00] mb-12">Your Shopping Cart</h1>

          {cart.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-12 text-center shadow-sm"
            >
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-10 h-10 text-gray-300" />
              </div>
              <h2 className="text-2xl font-bold text-[#1A0A00] mb-4">Your cart is empty</h2>
              <p className="text-gray-500 mb-8">Looks like you haven't added any IUEA merchandise yet.</p>
              <Link 
                href="/shop"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#8B0000] text-white rounded-xl font-bold hover:bg-[#6B0000] transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
                Start Shopping
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Left - Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                <AnimatePresence mode="popLayout">
                  {cart.map((item) => (
                    <motion.div
                      key={`${item.id}-${item.size}-${item.color}`}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="bg-white rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 shadow-sm group"
                    >
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      
                      <div className="flex-1 text-center sm:text-left">
                        <Link href={`/shop/${item.slug}`} className="text-lg font-bold text-[#1A0A00] hover:text-[#8B0000] transition-colors">
                          {item.name}
                        </Link>
                        <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-1 text-sm text-gray-500 font-medium">
                          {item.size && <span>Size: <span className="text-[#1A0A00]">{item.size}</span></span>}
                          {item.color && <span>Color: <span className="text-[#1A0A00]">{item.color}</span></span>}
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="flex items-center w-28 border border-gray-100 rounded-xl p-1 bg-gray-50">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1, item.size, item.color)}
                            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-[#8B0000]"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="flex-1 text-center font-bold text-sm">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1, item.size, item.color)}
                            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-[#8B0000]"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="text-right min-w-[100px]">
                          <p className="text-lg font-bold text-[#1A0A00]">
                            UGX {(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>

                        <button 
                          onClick={() => removeFromCart(item.id, item.size, item.color)}
                          className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                <div className="pt-6">
                  <Link href="/shop" className="inline-flex items-center gap-2 text-[#8B0000] font-bold hover:translate-x-[-4px] transition-all">
                    <ArrowLeft className="w-5 h-5" />
                    Continue Shopping
                  </Link>
                </div>
              </div>

              {/* Right - Order Summary */}
              <div className="space-y-6">
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                  <h2 className="text-xl font-bold text-[#1A0A00] mb-8">Order Summary</h2>
                  
                  <div className="space-y-4 mb-8 pb-8 border-b border-dashed">
                    <div className="flex justify-between text-gray-600 font-medium">
                      <span>Subtotal</span>
                      <span>UGX {cartTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 font-medium">
                      <span>Delivery Fee</span>
                      <span className={deliveryFee === 0 ? "text-green-600" : ""}>
                        {deliveryFee === 0 ? "FREE" : `UGX ${deliveryFee.toLocaleString()}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-600 font-medium">
                      <span>Tax (18% VAT)</span>
                      <span>UGX {vat.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-end mb-10">
                    <span className="text-gray-500 font-medium">Total</span>
                    <span className="text-3xl font-bold text-[#8B0000]">
                      UGX {grandTotal.toLocaleString()}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Promo code"
                        className="flex-1 px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8B0000]/20"
                      />
                      <button className="px-6 py-3 bg-[#1A0A00] text-white rounded-xl font-bold text-sm hover:bg-black transition-all">
                        Apply
                      </button>
                    </div>
                    
                    <Link 
                      href="/shop/checkout"
                      className="w-full py-4 bg-[#8B0000] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#6B0000] transition-all transform hover:scale-[1.02]"
                    >
                      Proceed to Checkout
                      <CreditCard className="w-5 h-5" />
                    </Link>
                  </div>

                  <div className="mt-8 flex flex-wrap justify-center gap-3 opacity-90 items-center">
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '4px 10px',
                      background: '#FFCC00',
                      borderRadius: '6px',
                      fontWeight: 800,
                      fontSize: '11px',
                      color: '#000000',
                    }}>MTN</span>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '4px 10px',
                      background: '#FF0000',
                      borderRadius: '6px',
                      fontWeight: 800,
                      fontSize: '11px',
                      color: '#FFFFFF',
                    }}>airtel</span>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '4px 10px',
                      background: '#1A1F71',
                      borderRadius: '6px',
                      fontWeight: 900,
                      fontSize: '11px',
                      color: '#FFFFFF',
                      fontStyle: 'italic',
                    }}>VISA</span>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0px',
                    }}>
                      <span style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: '#EB001B',
                        display: 'inline-block',
                        marginRight: '-6px'
                      }}/>
                      <span style={{
                        width: '20px',
                        height: '20px',
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
                      fontSize: '11px',
                      color: '#FFFFFF',
                    }}>Pay<span style={{color:'#009CDE'}}>Pal</span></span>
                  </div>
                </div>

                <div className="bg-[#1A0A00] rounded-2xl p-6 text-white space-y-4">
                  <div className="flex items-center gap-4">
                    <ShieldCheck className="w-10 h-10 text-[#E8B84B]" />
                    <div>
                      <p className="font-bold">Secure Payment</p>
                      <p className="text-xs text-white/60">Fully encrypted transaction processing</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Truck className="w-10 h-10 text-[#E8B84B]" />
                    <div>
                      <p className="font-bold">Tracked Delivery</p>
                      <p className="text-xs text-white/60">Real-time order tracking via SMS/Email</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>


    </main>
  )
}
