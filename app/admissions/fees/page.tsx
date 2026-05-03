"use client"

import { motion } from "framer-motion"
import { DollarSign, CreditCard, PieChart, ShieldCheck } from "lucide-react"


const feeStructure = [
  { faculty: "Business & Management", avgTuition: "$565", functional: "$120" },
  { faculty: "Science & Technology", avgTuition: "$630", functional: "$130" },
  { faculty: "Software Engineering", avgTuition: "$795", functional: "$170" },
  { faculty: "Engineering (Civil/Elect)", avgTuition: "$900", functional: "$190" },
  { faculty: "Law (LLB)", avgTuition: "$720", functional: "$130" },
  { faculty: "MBA", avgTuition: "$430", functional: "$100" }
]

export default function FeesPage() {
  return (
    <main className="min-h-screen bg-white">

      
      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 bg-[#1A0A00]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-serif font-bold text-white mb-6"
          >
            Fees & Funding
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80 max-w-2xl mx-auto"
          >
            Transparent pricing and flexible payment options to help you invest in your future.
          </motion.p>
        </div>
      </section>

      {/* Overview Cards */}
      <section className="py-20 bg-[#F5F0E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: PieChart, title: "Cost Structure", desc: "Our fees are divided into tuition and functional fees for transparency." },
              { icon: CreditCard, title: "Payment Plans", desc: "Pay in installments to manage your finances more effectively." },
              { icon: ShieldCheck, title: "Secure Payments", desc: "Multiple secure payment channels available, including mobile money." }
            ].map((item, idx) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 bg-white rounded-3xl text-center shadow-sm"
              >
                <div className="w-16 h-16 bg-[#8B0000]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-[#8B0000]" />
                </div>
                <h3 className="text-xl font-bold text-[#1A0A00] mb-4">{item.title}</h3>
                <p className="text-[#6B5B4F]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fee Table */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-[#1A0A00]">Average Semester Fees</h2>
            <p className="text-[#6B5B4F] mt-2">Prices are in USD and vary for Ugandan vs International students.</p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="overflow-x-auto rounded-3xl border border-gray-100 shadow-xl"
          >
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#8B0000] text-white">
                  <th className="px-8 py-6 font-bold">Faculty</th>
                  <th className="px-8 py-6 font-bold">Avg. Tuition</th>
                  <th className="px-8 py-6 font-bold">Functional Fees</th>
                  <th className="px-8 py-6 font-bold">Total (USD)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {feeStructure.map((row) => (
                  <tr key={row.faculty} className="hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-6 font-bold text-[#1A0A00]">{row.faculty}</td>
                    <td className="px-8 py-6 text-[#6B5B4F]">{row.avgTuition}</td>
                    <td className="px-8 py-6 text-[#6B5B4F]">{row.functional}</td>
                    <td className="px-8 py-6 font-bold text-[#8B0000]">
                      ${parseInt(row.avgTuition.replace('$','').replace(',','')) + parseInt(row.functional.replace('$',''))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
          
          <div className="mt-12 p-8 bg-[#F5F0E8] rounded-3xl flex items-center gap-6">
            <div className="w-12 h-12 rounded-full bg-[#E8B84B] flex items-center justify-center shrink-0">
              <DollarSign className="w-6 h-6 text-[#8B0000]" />
            </div>
            <div>
              <h4 className="font-bold text-[#1A0A00]">Note on Currency</h4>
              <p className="text-sm text-[#6B5B4F]">Fees can be paid in Uganda Shillings (UGX) at the prevailing university exchange rate.</p>
            </div>
          </div>
        </div>
      </section>


    </main>
  )
}
