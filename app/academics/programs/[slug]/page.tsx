import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, GraduationCap, Clock, BookOpen, Target, Briefcase, CheckCircle2, Users, FlaskConical, Heart } from "lucide-react"
import { MotionDiv } from "@/components/motion-components"

const programDetails: Record<string, any> = {
  "bsc-computer-science": {
    name: "BSc Computer Science",
    faculty: "Science & Technology",
    overview: "Our Computer Science program is designed to equip students with the technical and analytical skills needed to solve complex problems through technology. From software development to artificial intelligence, students explore the full spectrum of computing.",
    requirements: [
      "UACE with at least 2 principal passes in Mathematics and Physics",
      "UCE with 5 passes including English and Mathematics",
      "International equivalent qualifications are welcome"
    ],
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80",
    careers: ["Software Developer", "Data Scientist", "Systems Analyst", "AI Engineer"]
  },
  "mba": {
    name: "Master of Business Administration (MBA)",
    faculty: "Business & Management",
    image: "https://images.unsplash.com/photo-1454165833767-6216d518f0e3?w=1200&q=80",
    overview: "The MBA program at IUEA is tailored for professionals seeking to advance their leadership and management skills. We focus on strategic thinking, entrepreneurship, and global business practices.",
    requirements: [
      "A Bachelor's degree from a recognized institution",
      "At least 2 years of professional work experience",
      "Satisfactory performance in the entry interview"
    ],
    careers: ["Business Development Manager", "Operations Manager", "Entrepreneur", "Management Consultant"]
  },
  "bsc-civil-engineering": {
    name: "BSc Civil Engineering",
    faculty: "Engineering",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=80",
    overview: "Students in Civil Engineering learn to design, build, and maintain the infrastructure that supports modern society. Our hands-on approach covers structural, hydraulic, and environmental engineering.",
    requirements: [
      "UACE with 2 principal passes in Mathematics and Physics",
      "Diploma in Engineering for mature entry students",
      "Credit in English and Mathematics at UCE"
    ],
    careers: ["Structural Engineer", "Project Manager", "Urban Planner", "Site Engineer"]
  },
  "llb-laws": {
    name: "Bachelor of Laws (LLB)",
    faculty: "Law & Governance",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80",
    overview: "Our LLB program provides a comprehensive foundation in legal theory and practice. We emphasize ethical reasoning, advocacy, and the role of law in societal development.",
    requirements: [
      "UACE with at least 2 principal passes",
      "Pass in the University Law Pre-entry Exam",
      "Minimum of 5 credits at UCE including English"
    ],
    careers: ["Legal Practitioner", "Corporate Counsel", "Public Administrator", "Human Rights Advocate"]
  },
  "bsc-information-technology": {
    name: "BSc Information Technology",
    faculty: "Science & Technology",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80",
    overview: "This program focuses on the practical application of technology in business environments. Students master networking, database management, and information security.",
    requirements: [
      "UACE with at least 2 principal passes",
      "Credit in Mathematics and English at UCE",
      "Interest in digital innovation and systems"
    ],
    careers: ["IT Manager", "Network Administrator", "Database Specialist", "Cybersecurity Analyst"]
  },
  "bsc-software-engineering": {
    name: "BSc Software Engineering",
    faculty: "Science & Technology",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1200&q=80",
    overview: "Software Engineering focuses on the systematic development of large-scale software systems. We emphasize modern methodologies, quality assurance, and project management.",
    requirements: [
      "UACE with 2 principal passes in Science subjects",
      "Proficiency in Mathematics",
      "UCE with 5 credits including English"
    ],
    careers: ["Full-Stack Developer", "QA Engineer", "Software Architect", "Mobile App Developer"]
  },
  "bsc-nursing": {
    name: "BSc Nursing",
    faculty: "Health Sciences",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80",
    overview: "Our Nursing program combines rigorous academic study with extensive clinical practice to prepare compassionate and competent healthcare professionals.",
    requirements: [
      "UACE with principal passes in Biology and Chemistry",
      "Registration with the Nursing Council (for upgrades)",
      "Physical and mental fitness assessment"
    ],
    careers: ["Registered Nurse", "Public Health Officer", "Nurse Educator", "Clinical Researcher"]
  },
  "bsc-data-science": {
    name: "BSc Data Science",
    faculty: "Science & Technology",
    image: "https://images.unsplash.com/photo-1551288049-bbda0231f1c2?w=1200&q=80",
    overview: "Data Science students learn to extract insights from complex datasets using statistical modeling, machine learning, and data visualization.",
    requirements: [
      "UACE with principal passes in Mathematics",
      "Background in computing or statistics is an advantage",
      "Strong analytical and logical reasoning skills"
    ],
    careers: ["Data Analyst", "Machine Learning Engineer", "Business Intelligence Analyst", "Data Architect"]
  },
  "msc-project-management": {
    name: "MSc Project Management",
    faculty: "Business & Management",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&q=80",
    overview: "Advance your career in project leadership. This master's program covers planning, risk management, and the execution of complex projects across industries.",
    requirements: [
      "Bachelor's degree in any field",
      "Relevant work experience in project environments",
      "Strong communication and organizational skills"
    ],
    careers: ["Senior Project Manager", "Operations Director", "Program Lead", "Risk Consultant"]
  },
  "bed-primary": {
    name: "Bachelor of Education (Primary)",
    faculty: "Education",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80",
    overview: "Prepare to shape the future of young learners. This program focuses on pedagogy, child development, and curriculum implementation for primary education.",
    requirements: [
      "Diploma in Education (Primary) or equivalent",
      "At least 2 principal passes at UACE",
      "Passion for teaching and community development"
    ],
    careers: ["Primary School Teacher", "Educational Administrator", "Curriculum Specialist", "Education Consultant"]
  },
  "msc-information-technology": {
    name: "MSc Information Technology",
    faculty: "Science & Technology",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80",
    overview: "Our MSc in IT is designed for professionals seeking to lead in the digital era. The curriculum covers advanced topics in cybersecurity, data analytics, and IT strategic management.",
    requirements: [
      "Bachelor's degree in IT, Computer Science, or Engineering",
      "Minimum CGPA of 2.5 or equivalent",
      "Professional certification is an added advantage"
    ],
    careers: ["IT Director", "Cybersecurity Architect", "Systems Integrator", "Tech Consultant"]
  },
  "llm-postgrad": {
    name: "Master of Laws (LLM)",
    faculty: "Law & Governance",
    image: "https://images.unsplash.com/photo-1453948575184-d548569c1586?w=1200&q=80",
    overview: "The LLM program offers advanced legal training for practitioners and researchers. Students can specialize in Commercial Law, Human Rights, or International Law.",
    requirements: [
      "Bachelor of Laws (LLB) degree from a recognized university",
      "Good standing with the relevant Law Council",
      "Letter of recommendation"
    ],
    careers: ["Senior Counsel", "Legal Researcher", "Policy Advisor", "Judiciary Officer"]
  },
  "pgd-education": {
    name: "Postgraduate Diploma in Education",
    faculty: "Education",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1200&q=80",
    overview: "This program is designed for graduates who wish to transition into the teaching profession. It covers educational psychology, pedagogy, and school management.",
    requirements: [
      "Bachelor's degree in a teachable subject",
      "Commitment to educational excellence",
      "Successful interview"
    ],
    careers: ["High School Teacher", "Education Officer", "Training Coordinator", "Lecturer"]
  },
  "phd-business": {
    name: "PhD in Business Administration",
    faculty: "Business & Management",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=80",
    overview: "The PhD program is the pinnacle of academic achievement in business. It focuses on original research that contributes significantly to business theory and practice.",
    requirements: [
      "Master's degree in Business or a related field",
      "Strong research proposal",
      "Minimum GPA of 3.5 in Master's degree"
    ],
    careers: ["University Professor", "Research Director", "Chief Strategy Officer", "Economist"]
  },
  "cpa-uganda": {
    name: "Certified Public Accountant (CPA)",
    faculty: "Business & Management",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&q=80",
    overview: "Prepare for the CPA Uganda professional exams. Our training covers all levels from foundation to professional, ensuring you master accounting standards.",
    requirements: [
      "Degree or Diploma in any field",
      "A-Level certificates for entry-level students",
      "Registration with ICPAU"
    ],
    careers: ["Chartered Accountant", "Financial Auditor", "Tax Consultant", "Finance Director"]
  },
  "ccna": {
    name: "Cisco Certified Network Associate (CCNA)",
    faculty: "Science & Technology",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?w=1200&q=80",
    overview: "Gain the skills to install, configure, operate, and troubleshoot medium-size routed and switched networks. This is a foundational certification for IT professionals.",
    requirements: [
      "Basic understanding of computers",
      "Interest in networking and telecommunications",
      "Open to all students and professionals"
    ],
    careers: ["Network Technician", "Support Engineer", "Network Administrator", "Systems Engineer"]
  },
  "pmp-cert": {
    name: "Project Management Professional (PMP)",
    faculty: "Business & Management",
    image: "https://images.unsplash.com/photo-1454165833767-6216d518f0e3?w=1200&q=80",
    overview: "The PMP is the world's leading project management certification. We provide intensive training based on the PMBOK guide to prepare you for the global exam.",
    requirements: [
      "Bachelor's degree with 3 years of project experience",
      "Or High School diploma with 5 years of experience",
      "35 contact hours of formal PM education"
    ],
    careers: ["Global Project Manager", "Operations Lead", "Change Manager", "Portfolio Manager"]
  },
  "digital-marketing": {
    name: "Digital Marketing Certification",
    faculty: "Business & Management",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    overview: "Learn to dominate the digital landscape. This course covers SEO, SEM, content marketing, social media strategy, and data-driven marketing analytics.",
    requirements: [
      "Basic computer literacy",
      "Interest in marketing and sales",
      "Open to all creative minds"
    ],
    careers: ["Digital Marketing Manager", "SEO Specialist", "Social Media Strategist", "Content Creator"]
  },
  "hr-professional": {
    name: "Human Resource Management Professional",
    faculty: "Business & Management",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2959213?w=1200&q=80",
    overview: "This certification prepares you for the complexities of modern HR. Focus on talent acquisition, employee relations, and strategic HR planning.",
    requirements: [
      "Degree or Diploma in HR or related field",
      "Working knowledge of office tools",
      "Commitment to people management"
    ],
    careers: ["HR Manager", "Talent Acquisition Lead", "Employee Relations Officer", "HR Consultant"]
  },
  "cybersecurity-professional": {
    name: "Cybersecurity & Ethical Hacking",
    faculty: "Science & Technology",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80",
    overview: "Learn to think like a hacker to better defend your organization. This course covers penetration testing, vulnerability assessment, and network security.",
    requirements: [
      "Solid background in IT or Networking",
      "Knowledge of at least one programming language",
      "High ethical standards"
    ],
    careers: ["Ethical Hacker", "Security Analyst", "Penetration Tester", "Incident Responder"]
  }
}

export async function generateStaticParams() {
  return [
    { slug: "bsc-computer-science" },
    { slug: "mba" },
    { slug: "bsc-civil-engineering" },
    { slug: "llb-laws" },
    { slug: "bsc-information-technology" },
    { slug: "bsc-software-engineering" },
    { slug: "bsc-nursing" },
    { slug: "bsc-data-science" },
    { slug: "msc-project-management" },
    { slug: "bed-primary" },
    { slug: "msc-information-technology" },
    { slug: "llm-postgrad" },
    { slug: "pgd-education" },
    { slug: "phd-business" },
    { slug: "cpa-uganda" },
    { slug: "ccna" },
    { slug: "pmp-cert" },
    { slug: "digital-marketing" },
    { slug: "hr-professional" },
    { slug: "cybersecurity-professional" }
  ]
}

export default async function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const program = programDetails[slug]

  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F0E8]">
        <div className="text-center">
          <h1 className="text-4xl font-serif font-bold text-[#1A0A00] mb-4">Program Not Found</h1>
          <Link href="/academics/programs" className="text-[#8B0000] font-bold hover:underline">
            Back to All Programs
          </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-white pb-20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#8B0000]">
        <div className="absolute inset-0 z-0">
          <Image 
            src={program.image || "/pic1.jpg"} 
            alt={program.name}
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-[#8B0000]/80 mix-blend-multiply" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center">
            <MotionDiv
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <Link href="/academics/programs" className="inline-flex items-center gap-2 text-[#E8B84B] hover:text-white transition-colors text-sm font-medium">
                <ArrowLeft className="w-4 h-4" />
                Back to Programs
              </Link>
            </MotionDiv>
            
            <MotionDiv
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-4 py-1.5 bg-[#8B0000] text-[#E8B84B] rounded-full text-[11px] font-bold tracking-[0.2em] uppercase mb-6 border border-[#E8B84B]/30"
            >
              {program.faculty}
            </MotionDiv>
            
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-bold text-white mb-6">
                {program.name}
              </h1>
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <MotionDiv 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 lg:p-12 rounded-[2rem] shadow-xl shadow-black/5 border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-6 h-6 text-[#8B0000]" />
                <h2 className="text-2xl font-serif font-bold text-[#1A0A00]">Program Overview</h2>
              </div>
              <p className="text-[#6B5B4F] text-lg leading-relaxed">
                {program.overview}
              </p>
            </MotionDiv>

            {/* Entry Requirements */}
            <MotionDiv 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#F5F0E8] p-8 lg:p-12 rounded-[2rem] border border-[#8B0000]/5"
            >
              <div className="flex items-center gap-3 mb-8">
                <CheckCircle2 className="w-6 h-6 text-[#8B0000]" />
                <h2 className="text-2xl font-serif font-bold text-[#1A0A00]">Entry Requirements</h2>
              </div>
              <ul className="grid gap-4">
                {program.requirements.map((req: string, i: number) => (
                  <li key={i} className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm">
                    <div className="w-6 h-6 rounded-full bg-[#8B0000] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <span className="text-[#1A0A00] font-medium leading-tight">{req}</span>
                  </li>
                ))}
              </ul>
            </MotionDiv>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Career Opportunities */}
            <MotionDiv
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-8 rounded-[2rem] shadow-xl shadow-black/5 border border-[#8B0000]/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <Briefcase className="w-6 h-6 text-[#8B0000]" />
                <h2 className="text-xl font-serif font-bold text-[#1A0A00]">Career Opportunities</h2>
              </div>
              <div className="space-y-4">
                {program.careers.map((career: string, i: number) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-transparent hover:border-[#8B0000]/20 transition-all group">
                    <div className="w-1.5 h-1.5 bg-[#8B0000] rounded-full group-hover:scale-150 transition-transform" />
                    <span className="text-[#6B5B4F] group-hover:text-[#8B0000] transition-colors font-medium">{career}</span>
                  </div>
                ))}
              </div>
            </MotionDiv>

            {/* Apply Banner */}
            <MotionDiv
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#8B0000] p-8 rounded-[2rem] text-center text-white shadow-2xl shadow-[#8B0000]/20"
            >
              <GraduationCap className="w-12 h-12 text-[#E8B84B] mx-auto mb-4" />
              <h3 className="text-2xl font-serif font-bold mb-4">Ready to start?</h3>
              <p className="text-white/70 mb-8 text-sm">
                Applications for the 2026 academic year are now open. Secure your future today.
              </p>
              <a
                href="https://Applicants.iuea.ac.ug"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-4 bg-[#E8B84B] text-[#1A0A00] rounded-xl font-bold hover:bg-[#D4A73D] transition-colors"
                style={{ textDecoration: 'none' }}
              >
                Apply Now
              </a>
            </MotionDiv>
          </div>

      </div>
    </div>

      {/* Program Highlights */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Target, title: "Hands-on Projects", desc: "Apply theory to real-world challenges through practical coursework." },
              { icon: Users, title: "Industry Mentors", desc: "Learn from experienced professionals who guide your career path." },
              { icon: FlaskConical, title: "Modern Labs", desc: "Access state-of-the-art facilities equipped with the latest technology." },
              { icon: Heart, title: "Career Support", desc: "Dedicated guidance to help you transition from study to employment." }
            ].map((highlight, i) => (
              <MotionDiv
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-[#F5F0E8] rounded-3xl text-center group hover:bg-[#8B0000] transition-all duration-500"
              >
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#E8B84B] transition-colors">
                  <highlight.icon className="w-6 h-6 text-[#8B0000]" />
                </div>
                <h3 className="text-lg font-bold text-[#1A0A00] mb-2 group-hover:text-white transition-colors">{highlight.title}</h3>
                <p className="text-sm text-[#6B5B4F] group-hover:text-white/70 transition-colors">{highlight.desc}</p>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Related Programs */}
      <section className="py-20 bg-[#F5F0E8]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-[#1A0A00]">You Might Also Like</h2>
            <p className="text-[#6B5B4F] mt-2">Explore related programs within the {program.faculty}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(programDetails)
              .filter(([pSlug, pData]) => pData.faculty === program.faculty && pSlug !== slug)
              .slice(0, 3)
              .map(([pSlug, pData], i) => (
                <MotionDiv
                  key={pSlug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-black/5 hover:shadow-xl transition-all group"
                >
                  <span className="text-[10px] font-bold tracking-widest text-[#8B0000] uppercase mb-2 block">{pData.faculty}</span>
                  <h3 className="text-xl font-bold text-[#1A0A00] mb-4 group-hover:text-[#8B0000] transition-colors">{pData.name}</h3>
                  <Link 
                    href={`/academics/programs/${pSlug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#8B0000] group-hover:gap-3 transition-all"
                  >
                    View Details <ArrowLeft className="w-4 h-4 rotate-180" />
                  </Link>
                </MotionDiv>
              ))}
          </div>
        </div>
      </section>
    </main>
  )
}
