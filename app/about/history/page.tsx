"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"


export default function HistoryPage() {
  return (
    <main className="min-h-screen">

      
      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#1A0A00]">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600" 
            alt="History Background"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A0A00]/30 via-[#1A0A00]/50 to-[#1A0A00]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 text-[#E8B84B] text-sm mb-6"
          >
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>&gt;</span>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <span>&gt;</span>
            <span className="text-white">History</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl lg:text-7xl font-serif font-bold text-white mb-6"
          >
            Our History
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-white/80 max-w-2xl mx-auto"
          >
            A journey of innovation, excellence, and transformation since 1998.
          </motion.p>
        </div>
      </section>

      {/* Detailed Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {[
              { 
                year: "1998", 
                title: "Founding Vision", 
                content: "IUEA was founded with the vision of becoming a center of excellence in technological and management education in East Africa. The initial campus was established in Kampala with a handful of dedicated staff and students.",
                image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800"
              },
              { 
                year: "2005", 
                title: "Expansion & Growth", 
                content: "The university expanded its academic offerings to include Business Management and Information Technology. This period saw a significant increase in student enrollment and the development of new campus facilities.",
                image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800"
              },
              { 
                year: "2010", 
                title: "Full Accreditation", 
                content: "A major milestone was reached when IUEA received full accreditation from the National Council for Higher Education (NCHE) of Uganda, affirming the quality and standards of its programs.",
                image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800"
              },
              { 
                year: "2015", 
                title: "Technological Leap", 
                content: "IUEA invested heavily in state-of-the-art laboratories and research facilities, particularly in Engineering and Health Sciences. The university became known for its hands-on approach to technical education.",
                image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800"
              },
              { 
                year: "2020", 
                title: "Digital Transformation", 
                content: "Responding to global challenges, IUEA accelerated its digital transformation, launching robust e-learning platforms and virtual classrooms to ensure uninterrupted education for its diverse student body.",
                image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800"
              },
              { 
                year: "2026", 
                title: "Future Horizons", 
                content: "Today, IUEA stands as a beacon of innovation and academic excellence. We continue to expand our research capabilities and global partnerships, preparing our students for the challenges of the 21st century.",
                image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800"
              }
            ].map((milestone, idx) => (
              <motion.div 
                key={milestone.year}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-6xl font-bold text-[#E8B84B]/20 font-serif">{milestone.year}</span>
                  <div className="h-px flex-1 bg-gray-200" />
                </div>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className={idx % 2 === 0 ? "md:order-1" : "md:order-2"}>
                    <h2 className="text-3xl font-serif font-bold text-[#1A0A00] mb-6">{milestone.title}</h2>
                    <p className="text-[#6B5B4F] leading-relaxed text-lg">{milestone.content}</p>
                  </div>
                  <div className={`relative h-80 rounded-2xl overflow-hidden shadow-xl ${idx % 2 === 0 ? "md:order-2" : "md:order-1"}`}>
                    <Image src={milestone.image} alt={milestone.title} fill className="object-cover" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


    </main>
  )
}
