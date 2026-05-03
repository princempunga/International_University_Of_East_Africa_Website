"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { 
  ShoppingCart, 
  Package, 
  Mail, 
  GraduationCap, 
  ArrowUpRight, 
  MoreVertical,
  Plus,
  PlusCircle,
  FileText,
  Upload
} from "lucide-react"
import api from "@/lib/api"

const stats = [
  { name: "Total Orders (today)", value: "12", icon: ShoppingCart, color: "text-red-600", bg: "bg-red-50", link: "/admin/orders" },
  { name: "Products in Shop", value: "48", icon: Package, color: "text-amber-600", bg: "bg-amber-50", link: "/admin/products" },
  { name: "Unread Messages", value: "3", icon: Mail, color: "text-blue-600", bg: "bg-blue-50", link: "/admin/messages" },
  { name: "Active Intake", value: "Jan 2026", icon: GraduationCap, color: "text-green-600", bg: "bg-green-50", link: "/admin/intakes" },
]

const recentOrders = [
  { id: "#ORD-7231", customer: "John Doe", amount: "UGX 75,000", status: "pending", date: "2 mins ago" },
  { id: "#ORD-7230", customer: "Alice Nakato", amount: "UGX 150,000", status: "processing", date: "15 mins ago" },
  { id: "#ORD-7229", customer: "Samuel Okello", amount: "UGX 25,000", status: "delivered", date: "1 hour ago" },
  { id: "#ORD-7228", customer: "Sarah B.", amount: "UGX 45,000", status: "delivered", date: "3 hours ago" },
  { id: "#ORD-7227", customer: "James P.", amount: "UGX 10,000", status: "cancelled", date: "5 hours ago" },
]

const recentMessages = [
  { id: 1, name: "Maria Kemigisa", subject: "Inquiry about Jan Intake", date: "10:30 AM" },
  { id: 2, name: "David Ssemwanga", subject: "Product Support - Hoodie", date: "Yesterday" },
  { id: 3, name: "Blessing K.", subject: "Alumni Membership", date: "2 days ago" },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.getStats()
        if (response.success) {
          setDashboardData(response.data)
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats")
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  return (
    <div className="space-y-10">
      {/* Stats Cards */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
      >
        {stats.map((stat) => (
          <motion.div 
            key={stat.name}
            variants={item}
            className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
          >
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <p className="text-gray-500 text-sm font-bold mb-1">{stat.name}</p>
            <h3 className="text-3xl font-serif font-black text-gray-900">{stat.value}</h3>
            <a href={stat.link} className="mt-4 flex items-center gap-1 text-[11px] font-black text-[#8B0000] uppercase tracking-wider hover:gap-2 transition-all">
              View All <ArrowUpRight className="w-3 h-3" />
            </a>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="xl:col-span-2 bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden"
        >
          <div className="p-8 flex items-center justify-between border-b border-gray-50">
            <h2 className="text-xl font-serif font-bold text-gray-900">Recent Orders</h2>
            <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-400">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 text-gray-400 text-[11px] font-black uppercase tracking-widest">
                  <th className="px-8 py-4">Order #</th>
                  <th className="px-8 py-4">Customer</th>
                  <th className="px-8 py-4">Amount</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/30 transition-colors">
                    <td className="px-8 py-5 font-bold text-sm text-[#8B0000]">{order.id}</td>
                    <td className="px-8 py-5 font-bold text-sm text-gray-900">{order.customer}</td>
                    <td className="px-8 py-5 font-medium text-sm text-gray-500">{order.amount}</td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        order.status === 'pending' ? 'bg-amber-50 text-amber-600' :
                        order.status === 'processing' ? 'bg-blue-50 text-blue-600' :
                        order.status === 'delivered' ? 'bg-green-50 text-green-600' :
                        'bg-red-50 text-red-600'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right text-xs text-gray-400 font-medium">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Side Panels */}
        <div className="space-y-8">
          {/* Recent Messages */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-8"
          >
            <h2 className="text-xl font-serif font-bold text-gray-900 mb-6">Unread Messages</h2>
            <div className="space-y-6">
              {recentMessages.map((msg) => (
                <div key={msg.id} className="group cursor-pointer">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-bold text-gray-900 group-hover:text-[#8B0000] transition-colors">{msg.name}</p>
                    <span className="text-[10px] text-gray-400 font-medium">{msg.date}</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-3 truncate">{msg.subject}</p>
                  <button className="text-xs font-black text-[#8B0000] uppercase tracking-wider hover:underline">
                    Reply Now
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="rounded-[32px] p-8 text-white" style={{ background: 'linear-gradient(135deg, #8B0000 0%, #6B0000 100%)' }}
          >
            <h2 className="text-xl font-serif font-bold mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center justify-center p-4 bg-white/5 rounded-2xl hover:bg-[#8B0000] transition-all gap-2 border border-white/5">
                <PlusCircle className="w-5 h-5 text-[#E8B84B]" />
                <span className="text-[10px] font-black uppercase tracking-tighter">Add Product</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 bg-white/5 rounded-2xl hover:bg-[#8B0000] transition-all gap-2 border border-white/5">
                <FileText className="w-5 h-5 text-[#E8B84B]" />
                <span className="text-[10px] font-black uppercase tracking-tighter">New Article</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 bg-white/5 rounded-2xl hover:bg-[#8B0000] transition-all gap-2 border border-white/5">
                <Upload className="w-5 h-5 text-[#E8B84B]" />
                <span className="text-[10px] font-black uppercase tracking-tighter">Upload Photo</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 bg-white/5 rounded-2xl hover:bg-[#8B0000] transition-all gap-2 border border-white/5">
                <Plus className="w-5 h-5 text-[#E8B84B]" />
                <span className="text-[10px] font-black uppercase tracking-tighter">New Intake</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
