"use client"

import { useState, useEffect } from "react"
import { Search, Filter, MoreHorizontal, Eye, Download, CheckCircle, Clock, XCircle, Truck, X, User, MapPin, Phone, Mail, Package, CreditCard } from "lucide-react"
import api from "@/lib/api"
import { motion, AnimatePresence } from "framer-motion"
import { formatCurrency } from "@/lib/utils"

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const [search, setSearch] = useState("")

  const fetchOrders = async () => {
    try {
      const response = await api.getOrders()
      if (response.success) {
        setOrders(response.data)
      }
    } catch (error) {
      console.error("Failed to fetch orders")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const handleStatusUpdate = async (orderId: number, newStatus: string) => {
    setIsUpdating(true)
    try {
      const res = await fetch(`http://localhost:8000/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('iuea_token')}`
        },
        body: JSON.stringify({ order_status: newStatus })
      })
      const data = await res.json()
      if (data.success) {
        setOrders(prev => prev.map(o => o.id === orderId ? data.data : o))
        if (selectedOrder?.id === orderId) setSelectedOrder(data.data)
      }
    } catch (error) {
      console.error("Failed to update status")
    } finally {
      setIsUpdating(false)
    }
  }

  const getStatusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return 'bg-green-50 text-green-600 border-green-100'
      case 'processing': return 'bg-blue-50 text-blue-600 border-blue-100'
      case 'shipped': return 'bg-indigo-50 text-indigo-600 border-indigo-100'
      case 'pending': return 'bg-amber-50 text-amber-600 border-amber-100'
      case 'cancelled': return 'bg-red-50 text-red-600 border-red-100'
      default: return 'bg-gray-50 text-gray-600 border-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return <CheckCircle className="w-3 h-3" />
      case 'processing': return <Clock className="w-3 h-3" />
      case 'shipped': return <Truck className="w-3 h-3" />
      case 'pending': return <Clock className="w-3 h-3" />
      case 'cancelled': return <XCircle className="w-3 h-3" />
      default: return null
    }
  }

  const filteredOrders = orders.filter(o => 
    o.order_number.toLowerCase().includes(search.toLowerCase()) ||
    o.customer_name.toLowerCase().includes(search.toLowerCase()) ||
    o.customer_email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-black text-[#1A0A00]">Manage Orders</h1>
          <p className="text-gray-500 font-medium mt-1">Track and process customer orders from the university shop.</p>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by Order ID or Customer..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-100 bg-gray-50/50 outline-none focus:border-[#8B0000] transition-all text-sm"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-100 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-50">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 text-gray-400 text-[11px] font-black uppercase tracking-widest">
                <th className="px-8 py-4">Order Details</th>
                <th className="px-8 py-4">Customer</th>
                <th className="px-8 py-4 text-center">Items</th>
                <th className="px-8 py-4">Total Amount</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-8 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-4 border-[#8B0000] border-t-transparent rounded-full animate-spin" />
                      <p className="text-sm font-bold text-gray-400">Loading orders...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-8 py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center">
                        <Package className="w-8 h-8 text-gray-300" />
                      </div>
                      <p className="text-gray-400 font-medium">No orders found.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/30 transition-colors group">
                    <td className="px-8 py-5">
                      <p className="font-black text-sm text-[#8B0000] tracking-tighter">#{order.order_number}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                        {new Date(order.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </p>
                    </td>
                    <td className="px-8 py-5">
                      <p className="font-bold text-sm text-[#1A0A00]">{order.customer_name}</p>
                      <p className="text-xs text-gray-400 font-medium">{order.customer_email}</p>
                    </td>
                    <td className="px-8 py-5 text-center">
                      <span className="px-2 py-1 bg-gray-100 rounded-lg text-xs font-bold text-gray-600">
                        {order.items?.length || 0}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <p className="font-black text-sm text-[#1A0A00]">UGX {formatCurrency(order.total)}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{order.payment_method?.replace('_', ' ')}</p>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${getStatusStyle(order.order_status)}`}>
                        {getStatusIcon(order.order_status)}
                        {order.order_status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button 
                        onClick={() => setSelectedOrder(order)}
                        className="p-2 hover:bg-[#8B0000] hover:text-white text-gray-400 rounded-xl transition-all shadow-sm hover:shadow-lg hover:shadow-red-900/20"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-[40px] w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-[#8B0000] text-white">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-2xl font-serif font-black">Order #{selectedOrder.order_number}</h2>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border bg-white/10 border-white/20`}>
                      {selectedOrder.order_status}
                    </span>
                  </div>
                  <p className="text-white/60 text-sm font-medium">Placed on {new Date(selectedOrder.created_at).toLocaleString()}</p>
                </div>
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="p-3 hover:bg-white/10 rounded-2xl transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 bg-[#fafafa]">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column: Items */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                      <h3 className="text-lg font-serif font-bold text-[#1A0A00] mb-6 flex items-center gap-2">
                        <Package className="w-5 h-5 text-[#8B0000]" /> Ordered Items
                      </h3>
                      <div className="space-y-4">
                        {selectedOrder.items?.map((item: any) => (
                          <div key={item.id} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center border border-gray-200 overflow-hidden font-black text-[#8B0000] text-xs">
                              IMG
                            </div>
                            <div className="flex-1">
                              <p className="font-bold text-[#1A0A00]">{item.product_name}</p>
                              <p className="text-xs text-gray-400">Qty: {item.quantity} × UGX {formatCurrency(item.product_price)}</p>
                            </div>
                            <p className="font-black text-[#1A0A00]">UGX {formatCurrency(item.subtotal)}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                      <h3 className="text-lg font-serif font-bold text-[#1A0A00] mb-6 flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-[#8B0000]" /> Payment Summary
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>Subtotal</span>
                          <span className="font-bold text-[#1A0A00]">UGX {formatCurrency(selectedOrder.subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>Delivery Fee ({selectedOrder.delivery_method?.replace('_', ' ')})</span>
                          <span className="font-bold text-[#1A0A00]">UGX {formatCurrency(selectedOrder.delivery_fee)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>Tax (VAT 18%)</span>
                          <span className="font-bold text-[#1A0A00]">UGX {formatCurrency(selectedOrder.tax)}</span>
                        </div>
                        <div className="pt-3 border-t border-gray-100 flex justify-between">
                          <span className="font-serif font-bold text-[#1A0A00]">Total Amount</span>
                          <span className="text-xl font-black text-[#8B0000]">UGX {formatCurrency(selectedOrder.total)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Customer & Status */}
                  <div className="space-y-6">
                    <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                      <h3 className="text-lg font-serif font-bold text-[#1A0A00] mb-6">Customer Info</h3>
                      <div className="space-y-4">
                        <div className="flex gap-3">
                          <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center shrink-0">
                            <User className="w-5 h-5 text-gray-400" />
                          </div>
                          <div>
                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Name</p>
                            <p className="text-sm font-bold text-[#1A0A00]">{selectedOrder.customer_name}</p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center shrink-0">
                            <Mail className="w-5 h-5 text-gray-400" />
                          </div>
                          <div>
                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Email</p>
                            <p className="text-sm font-bold text-[#1A0A00]">{selectedOrder.customer_email}</p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center shrink-0">
                            <Phone className="w-5 h-5 text-gray-400" />
                          </div>
                          <div>
                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Phone</p>
                            <p className="text-sm font-bold text-[#1A0A00]">{selectedOrder.customer_phone}</p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center shrink-0">
                            <MapPin className="w-5 h-5 text-gray-400" />
                          </div>
                          <div>
                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Delivery Address</p>
                            <p className="text-sm font-bold text-[#1A0A00]">{selectedOrder.delivery_address}, {selectedOrder.delivery_city}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                      <h3 className="text-lg font-serif font-bold text-[#1A0A00] mb-6">Update Status</h3>
                      <div className="space-y-2">
                        {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
                          <button
                            key={status}
                            disabled={isUpdating || selectedOrder.order_status === status}
                            onClick={() => handleStatusUpdate(selectedOrder.id, status)}
                            className={`w-full py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                              selectedOrder.order_status === status
                              ? 'bg-[#8B0000] text-white shadow-lg shadow-red-900/20'
                              : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
