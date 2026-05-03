"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react"


const events = [
  { 
    title: "Annual Alumni Homecoming Gala", 
    date: "December 20, 2026", 
    time: "6:00 PM - 11:00 PM", 
    location: "Kampala Serena Hotel", 
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800",
    desc: "A night of celebration, networking, and reminiscing. Join us for the biggest alumni event of the year."
  },
  { 
    title: "Tech Sector Meetup", 
    date: "August 15, 2026", 
    time: "2:00 PM - 5:00 PM", 
    location: "IUEA Innovation Lab", 
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800",
    desc: "Connect with fellow alumni working in the technology sector and discuss future collaborations."
  },
  { 
    title: "Nairobi Regional Reunion", 
    date: "October 10, 2026", 
    time: "4:00 PM - 8:00 PM", 
    location: "Nairobi, Kenya", 
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800",
    desc: "Our first regional meetup for alumni based in Kenya. Come and reconnect with your classmates."
  }
]

export default function AlumniEventsPage() {
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
            Alumni Events
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80 max-w-2xl mx-auto"
          >
            Reconnect, celebrate, and grow together at our exclusive alumni gatherings.
          </motion.p>
        </div>
      </section>

      {/* Events Listing */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {events.map((event, idx) => (
              <motion.div 
                key={event.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-[#F5F0E8] rounded-[3rem] overflow-hidden flex flex-col lg:flex-row group"
              >
                <div className="lg:w-1/3 relative h-64 lg:h-auto overflow-hidden">
                  <Image src={event.image} alt={event.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="lg:w-2/3 p-10 lg:p-16">
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm font-bold text-[#8B0000] shadow-sm">
                      <Calendar className="w-4 h-4" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm font-bold text-[#8B0000] shadow-sm">
                      <Clock className="w-4 h-4" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm font-bold text-[#8B0000] shadow-sm">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </div>
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-[#1A0A00] mb-4">{event.title}</h3>
                  <p className="text-[#6B5B4F] text-lg mb-8">{event.desc}</p>
                  <button className="flex items-center gap-2 font-bold text-[#8B0000] hover:gap-3 transition-all">
                    Register for Event <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


    </main>
  )
}
