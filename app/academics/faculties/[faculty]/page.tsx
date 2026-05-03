import Image from "next/image"
import Link from "next/link"
import { MotionDiv, MotionSection } from "@/components/motion-components"

import { Cpu, Briefcase, HardHat, Scale, Heart, BookOpen, Clock, DollarSign, Users, FlaskConical } from "lucide-react"

const facultyData = {
  "science-technology": {
    name: "Science & Technology",
    icon: Cpu,
    hero: "/pic6.jpg",
    dean: "Dr. Lakshmi Bhabuu",
    deanMessage: "The Faculty of Science & Technology is the heartbeat of IUEA. We focus on hands-on innovation and preparing students for the rapidly evolving tech landscape in Africa.",
    programs: [
      { name: "BSc Information Technology", duration: "3 Years" },
      { name: "BSc Computer Science", duration: "3 Years" },
      { name: "BSc Software Engineering", duration: "4 Years" },
      { name: "BSc Climate-Smart Agriculture", duration: "3 Years" },
      { name: "BSc Environmental Science", duration: "3 Years" }
    ],
    research: ["Artificial Intelligence", "Cybersecurity", "Climate Smart Agriculture", "Blockchain"]
  },
  "business-management": {
    name: "Business & Management",
    icon: Briefcase,
    hero: "/hero.jpg",
    dean: "Dr. Justine Nalwoga",
    deanMessage: "We bridge the gap between theory and practice, ensuring our business graduates are ready to lead and innovate in the global marketplace.",
    programs: [
      { name: "Bachelor of Business Administration", duration: "3 Years" },
      { name: "BSc Procurement & Logistics", duration: "3 Years" },
      { name: "Bachelor of Public Administration", duration: "3 Years" },
      { name: "MBA", duration: "2 Years" }
    ],
    research: ["Sustainable Business", "Digital Marketing", "Financial Technology", "Supply Chain"]
  },
  "engineering": {
    name: "Engineering",
    icon: HardHat,
    hero: "/pic10.jpg",
    dean: "Dr. Abdulsalam Ibrahim Shema",
    deanMessage: "At the Faculty of Engineering, we build the future. Our students engage in real-world projects that solve infrastructure and energy challenges.",
    programs: [
      { name: "BSc Civil Engineering", duration: "4 Years" },
      { name: "BSc Electrical Engineering", duration: "4 Years" },
      { name: "BSc Petroleum Engineering", duration: "4 Years" },
      { name: "BSc Mechatronics & Robotics", duration: "4 Years" },
      { name: "BSc Mining Engineering", duration: "4 Years" },
      { name: "BSc Architecture", duration: "5 Years" }
    ],
    research: ["Smart Infrastructure", "Renewable Energy", "Mining Technology", "Sustainable Design"]
  },
  "law-governance": {
    name: "Law & Governance",
    icon: Scale,
    hero: "/pic6.jpg",
    dean: "Emmanuel Sebijjo Ssemmanda",
    deanMessage: "We train ethical legal professionals who will uphold the rule of law and advocate for justice across the continent.",
    programs: [
      { name: "Bachelor of Laws (LLB)", duration: "4 Years" }
    ],
    research: ["Human Rights", "Digital Law", "Constitutionalism", "International Law"]
  }
}

export async function generateStaticParams() {
  return Object.keys(facultyData).map((faculty) => ({
    faculty,
  }))
}

export default async function FacultyPage({ params }: { params: Promise<{ faculty: string }> }) {
  const { faculty } = await params
  const data = facultyData[faculty as keyof typeof facultyData]

  if (!data) return <div>Faculty not found</div>

  return (
    <main className="min-h-screen bg-white">

      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#8B0000]">
        <div className="absolute inset-0 z-0">
          <Image src={data.hero} alt={data.name} fill className="object-cover opacity-40" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-[#8B0000]/40 via-[#8B0000]/60 to-[#8B0000]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <MotionDiv 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 bg-[#8B0000] rounded-2xl flex items-center justify-center mx-auto mb-8 border-2 border-white/20"
          >
            <data.icon className="w-10 h-10 text-white" />
          </MotionDiv>
          <MotionDiv 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-5xl lg:text-7xl font-serif font-bold text-white mb-6">
              Faculty of <br /> {data.name}
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Excellence in {data.name.toLowerCase()} education and research for a better tomorrow.
            </p>
          </MotionDiv>
        </div>
      </section>

      {/* Dean Message */}
      <section className="py-20 bg-[#F5F0E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12 items-center">
            <MotionDiv 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
                <Image src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600" alt={data.dean} fill className="object-cover" />
              </div>
              <div className="mt-6 text-center lg:text-left">
                <h4 className="text-2xl font-bold text-[#1A0A00]">{data.dean}</h4>
                <p className="text-[#8B0000] font-bold uppercase tracking-widest text-sm">Dean of Faculty</p>
              </div>
            </MotionDiv>
            <MotionDiv 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <h2 className="text-3xl font-serif font-bold text-[#1A0A00] mb-6">Dean's Message</h2>
              <div className="relative">
                <span className="absolute -top-8 -left-4 text-8xl text-[#8B0000]/10 font-serif">&ldquo;</span>
                <p className="text-[#6B5B4F] text-xl leading-relaxed italic mb-8">
                  {data.deanMessage}
                </p>
                <div className="w-20 h-1 bg-[#8B0000]" />
              </div>
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-[#1A0A00] mb-4">Undergraduate & Postgraduate Programs</h2>
            <p className="text-[#6B5B4F]">Choose from our wide range of industry-aligned academic programs.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {data.programs.map((program, idx) => (
              <MotionDiv 
                key={program.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 bg-[#F5F0E8] rounded-3xl border-2 border-transparent hover:border-[#8B0000] transition-all group"
              >
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-xl font-bold text-[#1A0A00] group-hover:text-[#8B0000] transition-colors">{program.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-[#6B5B4F]">
                    <Clock className="w-4 h-4" />
                    <span>{program.duration}</span>
                  </div>
                </div>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <MotionSection 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <MotionDiv
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-serif font-bold text-[#1A0A00] mb-8">Faculty Research Areas</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.research.map((area) => (
                  <div key={area} className="flex items-center gap-3 p-4 bg-[#F5F0E8] rounded-xl">
                    <FlaskConical className="w-5 h-5 text-[#8B0000]" />
                    <span className="font-medium text-[#1A0A00]">{area}</span>
                  </div>
                ))}
              </div>
            </MotionDiv>
            <MotionDiv
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-[rgba(139,0,0,0.2)] p-10 rounded-3xl"
            >
              <h3 className="text-2xl font-serif font-bold text-[#8B0000] mb-4">Meet the Lecturers</h3>
              <p className="text-[#6B7280] mb-8 text-sm leading-relaxed">
                Our faculty boasts over 40 experienced lecturers and researchers from across the globe.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-8 gap-x-4 mb-10">
                {[
                  {
                    name: "Dr. James Okello",
                    title: "Senior Lecturer",
                    dept: "Computer Science",
                    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80"
                  },
                  {
                    name: "Dr. Sarah Nakato",
                    title: "Associate Professor",
                    dept: "Information Technology",
                    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80"
                  },
                  {
                    name: "Prof. Michael Ssali",
                    title: "Professor",
                    dept: "Software Engineering",
                    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80"
                  },
                  {
                    name: "Dr. Grace Atuhaire",
                    title: "Lecturer",
                    dept: "Data Science",
                    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80"
                  },
                  {
                    name: "Mr. David Mugisha",
                    title: "Assistant Lecturer",
                    dept: "Cybersecurity",
                    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80"
                  },
                  {
                    name: "Dr. Fatima Hassan",
                    title: "Senior Lecturer",
                    dept: "Artificial Intelligence",
                    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80"
                  }
                ].map((lecturer, i) => (
                  <div key={i} className="flex flex-col items-center text-center group">
                    <img 
                      src={lecturer.photo} 
                      alt={lecturer.name} 
                      className="w-16 h-16 rounded-full object-cover mb-3 border-2 border-[#8B0000]/10 group-hover:border-[#8B0000] transition-colors" 
                    />
                    <h4 className="font-serif font-bold text-[14px] text-[#1A0A00] leading-tight mb-1">{lecturer.name}</h4>
                    <p className="text-[#8B0000] text-[11px] font-bold uppercase tracking-wider mb-1">{lecturer.title}</p>
                    <p className="text-[#6B7280] text-[10px] leading-tight">{lecturer.dept}</p>
                  </div>
                ))}
              </div>

              <Link href="/about/leadership" className="text-[#8B0000] font-bold hover:underline flex items-center gap-2 text-sm">
                View Faculty Directory <span>→</span>
              </Link>
            </MotionDiv>
          </div>
        </div>
      </MotionSection>


    </main>
  )
}
