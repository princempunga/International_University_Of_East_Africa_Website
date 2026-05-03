"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"


const leaders = [
  { name: "Prof. John Doe", title: "Vice Chancellor", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400", bio: "Prof. John Doe has over 30 years of experience in higher education management and is committed to fostering academic excellence." },
  { name: "Dr. Jane Smith", title: "Deputy VC Academic", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400", bio: "Dr. Jane Smith oversees all academic programs, ensuring they meet the highest international standards." },
  { name: "Mr. Robert Brown", title: "Deputy VC Finance", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400", bio: "Mr. Robert Brown manages the university's financial health and strategic investments." },
  { name: "Ms. Sarah Wilson", title: "Registrar", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400", bio: "Ms. Sarah Wilson is responsible for student records, admissions, and academic administration." },
  { name: "Dr. Michael Lee", title: "Dean of Students", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400", bio: "Dr. Michael Lee ensures a vibrant and supportive campus life for all students." },
  { name: "Prof. Alan Turing", title: "Dean, Science & Technology", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400", bio: "Leading the charge in digital transformation and innovative tech research." },
  { name: "Dr. Adam Smith", title: "Dean, Business & Management", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400", bio: "Shaping the next generation of global business leaders and entrepreneurs." },
  { name: "Ms. Marie Curie", title: "Dean, Health Sciences", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400", bio: "Committed to advancing healthcare education and community wellness." }
]

export default function LeadershipPage() {
  return (
    <main className="min-h-screen">

      
      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#8B0000]">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1600&q=80" 
            alt="Leadership Background"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A0A00]/40 via-[#1A0A00]/60 to-[#1A0A00]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="flex items-center justify-center gap-2 text-white/60 text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>&gt;</span>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <span>&gt;</span>
            <span className="text-white">Leadership</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-serif font-bold text-white mb-6">University Leadership</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Our vision is guided by a team of dedicated professionals committed to excellence.
          </p>
        </div>
      </section>

      {/* Leadership Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {leaders.map((leader, idx) => (
              <motion.div 
                key={leader.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                className="text-center group"
              >
                <div className="relative w-48 h-48 mx-auto rounded-2xl overflow-hidden mb-6 shadow-lg group-hover:-translate-y-2 transition-transform duration-300">
                  <Image src={leader.image} alt={leader.name} fill className="object-cover" />
                </div>
                <h3 className="text-xl font-bold text-[#1A0A00] mb-1">{leader.name}</h3>
                <p className="text-[#8B0000] font-semibold mb-4">{leader.title}</p>
                <p className="text-sm text-[#6B5B4F] line-clamp-3">{leader.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Board of Trustees Section */}
      <section className="py-20 bg-[#F5F0E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold text-[#1A0A00] mb-12">Board of Trustees</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {["Dr. Paul Williams", "Hon. Mary Katesi", "Prof. Silas Muli", "Ms. Florence Atieno"].map((name, idx) => (
              <motion.div 
                key={name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 bg-white rounded-xl shadow-sm"
              >
                <h4 className="font-bold text-[#1A0A00]">{name}</h4>
                <p className="text-sm text-[#6B5B4F]">Board Member</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


    </main>
  )
}
