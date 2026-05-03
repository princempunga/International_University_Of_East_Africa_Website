"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Shield, Wifi, Coffee, MapPin, CheckCircle } from "lucide-react"


export default function AccommodationPage() {
  return (
    <main className="min-h-screen">

      
      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#F5F0E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-5xl lg:text-7xl font-serif font-bold text-[#1A0A00] mb-6">Home Away From Home</h1>
              <p className="text-xl text-[#6B5B4F] mb-8">
                Comfortable, secure, and convenient housing options designed to enhance your university experience.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-3 bg-[#8B0000] text-white rounded-full font-bold hover:bg-[#6B0000] transition-colors">Book a Room</button>
                <button className="px-8 py-3 border-2 border-gray-200 text-[#1A0A00] rounded-full font-bold hover:border-[#8B0000] transition-all">View Pricing</button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative h-[400px] lg:h-[500px] rounded-[3rem] overflow-hidden shadow-2xl"
            >
              <Image src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800" alt="Student Room" fill className="object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: "24/7 Security", desc: "CCTV surveillance and professional security personnel." },
              { icon: Wifi, title: "High-Speed WiFi", desc: "Uninterrupted internet access for study and leisure." },
              { icon: Coffee, title: "Common Areas", desc: "Shared lounges and study rooms for collaboration." },
              { icon: MapPin, title: "Prime Location", desc: "Walking distance to lecture halls and campus facilities." }
            ].map((item, idx) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 bg-[#F5F0E8] rounded-full flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-[#8B0000]" />
                </div>
                <h4 className="font-bold text-[#1A0A00] mb-2">{item.title}</h4>
                <p className="text-sm text-[#6B5B4F]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Room Types */}
      <section className="py-20 bg-[#F5F0E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif font-bold text-[#1A0A00] mb-12 text-center">Room Options</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Single Premium", price: "$1,200/sem", features: ["Private Bathroom", "Study Desk", "Balcony", "AC Included"], image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600" },
              { name: "Shared Double", price: "$800/sem", features: ["Shared Bathroom", "Two Study Desks", "Spacious Wardrobes", "High-Speed WiFi"], image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600" },
              { name: "Executive Suite", price: "$1,800/sem", features: ["Mini Kitchenette", "Living Area", "Private Laundry", "Priority Parking"], image: "https://images.unsplash.com/photo-1505691938895-1758d7eaa511?w=600" }
            ].map((room, idx) => (
              <motion.div 
                key={room.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-[2rem] overflow-hidden shadow-lg group"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image src={room.image} alt={room.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 px-4 py-2 bg-[#8B0000] text-white rounded-full font-bold text-sm">
                    {room.price}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-[#1A0A00] mb-6">{room.name}</h3>
                  <ul className="space-y-3 mb-8">
                    {room.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-[#6B5B4F]">
                        <CheckCircle className="w-5 h-5 text-[#8B0000]" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-4 border-2 border-[#8B0000] text-[#8B0000] rounded-xl font-bold hover:bg-[#8B0000] hover:text-white transition-all">Select Room</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


    </main>
  )
}
