"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from "lucide-react"
import Image from "next/image"

export default function ContactPage() {
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
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#1A0A00]">Full Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#8B0000]" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#1A0A00]">Email Address</label>
                    <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#8B0000]" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#1A0A00]">Subject</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#8B0000]">
                    <option>General Inquiry</option>
                    <option>Admissions</option>
                    <option>Academic Support</option>
                    <option>International Students</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#1A0A00]">Message</label>
                  <textarea rows={5} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#8B0000]" placeholder="How can we help you?"></textarea>
                </div>
                <button type="submit" className="w-full py-4 bg-[#8B0000] text-white rounded-xl font-bold hover:bg-[#6B0000] transition-all flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
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
