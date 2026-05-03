"use client"

import { useState, useEffect } from "react"
import { Search, Filter, MoreHorizontal, Eye, Download, CheckCircle, Clock, XCircle, Truck } from "lucide-react"
import api from "@/lib/api"

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
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
    fetchOrders()
  }, [])

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'bg-green-50 text-green-600 border-green-100'
      case 'processing': return 'bg-blue-50 text-blue-600 border-blue-100'
      case 'pending': return 'bg-amber-50 text-amber-600 border-amber-100'
      case 'cancelled': return 'bg-red-50 text-red-600 border-red-100'
      default: return 'bg-gray-50 text-gray-600 border-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered': return <CheckCircle className="w-3 h-3" />
      case 'processing': return <Truck className="w-3 h-3" />
      case 'pending': return <Clock className="w-3 h-3" />
      case 'cancelled': return <XCircle className="w-3 h-3" />
      default: return null
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-black text-[#1A0A00]">Manage Orders</h1>
        <p className="text-gray-500 font-medium mt-1">Track and process customer orders from the university shop.</p>
      </div>

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by Order ID or Customer..." 
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-100 bg-gray-50/50 outline-none focus:border-[#8B0000] transition-all text-sm"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-100 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-50">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-100 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 text-gray-400 text-[11px] font-black uppercase tracking-widest">
                <th className="px-8 py-4">Order ID</th>
                <th className="px-8 py-4">Customer</th>
                <th className="px-8 py-4">Items</th>
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
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-8 py-12 text-center">
                    <p className="text-gray-400 font-medium">No orders found.</p>
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/30 transition-colors">
                    <td className="px-8 py-5 font-bold text-sm text-[#8B0000]">#{order.order_number}</td>
                    <td className="px-8 py-5">
                      <p className="font-bold text-sm text-[#1A0A00]">{order.customer_name}</p>
                      <p className="text-xs text-gray-400 font-medium">{order.customer_email}</p>
                    </td>
                    <td className="px-8 py-5 font-medium text-sm text-gray-500">
                      {order.items_count} {order.items_count === 1 ? 'item' : 'items'}
                    </td>
                    <td className="px-8 py-5 font-bold text-sm text-[#1A0A00]">UGX {order.total_amount?.toLocaleString()}</td>
                    <td className="px-8 py-5">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${getStatusStyle(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 hover:bg-gray-50 text-[#8B0000] rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-gray-50 text-gray-400 rounded-lg transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
