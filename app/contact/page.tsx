"use client"

import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: ""
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMsg("")

    try {
      const res = await fetch("http://localhost:8000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()

      if (!res.ok) throw new Error(data.message || "Something went wrong")

      setStatus("success")
      setFormData({ name: "", email: "", subject: "General Inquiry", message: "" })
    } catch (err: any) {
      setStatus("error")
      setErrorMsg(err.message)
    }
  }

  return (
    <main className="min-h-screen bg-white">

      
      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#8B0000]">
        <div className="absolute inset-0 z-0">
          <Image src="/pic10.jpg" alt="Contact Hero" fill className="object-cover opacity-40" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-[#8B0000]/40 via-[#8B0000]/60 to-[#8B0000]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-serif font-bold text-white mb-6"
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80 max-w-2xl mx-auto"
          >
            Have questions? We're here to help. Reach out to us via any of the channels below.
          </motion.p>
        </div>
      </section>

      {/* Contact Info Grid */}
      <section className="py-20 bg-[#F5F0E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: MapPin, title: "Our Location", detail: "Plot No. 1112/1121, Kansanga Ggaba Road, Kampala, Uganda" },
              { icon: Phone, title: "Phone Number", detail: "800 335 335 (Toll-Free) / (+256) 705 722 300" },
              { icon: Mail, title: "Email Address", detail: "info@iuea.ac.ug / apply@iuea.ac.ug" },
              { icon: Clock, title: "Office Hours", detail: "Mon - Fri: 8:00 AM - 5:00 PM" }
            ].map((item, idx) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 bg-white rounded-3xl text-center shadow-sm"
              >
                <div className="w-12 h-12 bg-[#8B0000]/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-6 h-6 text-[#8B0000]" />
                </div>
                <h4 className="font-bold text-[#1A0A00] mb-2">{item.title}</h4>
                <p className="text-sm text-[#6B5B4F]">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form & Map */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-8">
                <MessageSquare className="w-8 h-8 text-[#8B0000]" />
                <h2 className="text-3xl font-serif font-bold text-[#1A0A00]">Send us a Message</h2>
              </div>

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-50 border border-green-100 rounded-3xl p-8 text-center"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-green-900 mb-2">Message Sent!</h3>
                    <p className="text-green-700 mb-6">Thank you for reaching out. We have received your message and will get back to you shortly.</p>
                    <button 
                      onClick={() => setStatus("idle")}
                      className="px-6 py-2 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {status === "error" && (
                      <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-medium mb-6">
                        <AlertCircle className="w-5 h-5" />
                        {errorMsg}
                      </div>
                    )}
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-[#1A0A00]">Full Name</label>
                        <input 
                          type="text" 
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#8B0000]" 
                          placeholder="John Doe" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-[#1A0A00]">Email Address</label>
                        <input 
                          type="email" 
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#8B0000]" 
                          placeholder="john@example.com" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-[#1A0A00]">Subject</label>
                      <select 
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#8B0000]"
                      >
                        <option>General Inquiry</option>
                        <option>Admissions</option>
                        <option>Academic Support</option>
                        <option>International Students</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-[#1A0A00]">Message</label>
                      <textarea 
                        rows={5} 
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#8B0000]" 
                        placeholder="How can we help you?"
                      ></textarea>
                    </div>
                    <button 
                      type="submit" 
                      disabled={status === "loading"}
                      className="w-full py-4 bg-[#8B0000] text-white rounded-xl font-bold hover:bg-[#6B0000] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {status === "loading" ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                      Send Message
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Google Map Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[500px] lg:h-auto rounded-3xl overflow-hidden shadow-xl"
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15959.02526555198!2d32.5802279!3d0.3204997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbb0e8b15e219%3A0x4466986447814237!2sInternational%20University%20of%20East%20Africa!5e0!3m2!1sen!2sug!4v1700000000000!5m2!1sen!2sug" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </section>


    </main>
  )
}
