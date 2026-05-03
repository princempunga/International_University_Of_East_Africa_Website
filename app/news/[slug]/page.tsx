import Image from "next/image"
import Link from "next/link"
import { MotionDiv } from "@/components/motion-components"
import { Calendar, User, Tag, Share2, ArrowLeft } from "lucide-react"

const newsData = {
  // ... (keeping newsData as is)
  "graduation-2025-announcement": {
    title: "IUEA 2025 Graduation Ceremony Announced",
    category: "Academic",
    date: "May 20, 2025",
    author: "Admissions Office",
    image: "/JOT_1091.jpg",
    content: `
      <p>The International University of East Africa (IUEA) is delighted to announce the dates for its 2025 graduation ceremony. This milestone event will celebrate the hard work, dedication, and achievements of our graduands across all faculties.</p>
      <p>The ceremony is scheduled to take place on <strong>December 15, 2025</strong>, at the University Main Grounds. We expect to confer degrees, diplomas, and certificates upon over 1,500 students who have successfully completed their academic requirements.</p>
      <h3>Key Information for Graduands:</h3>
      <ul>
        <li>Clearing for graduation must be completed by October 30, 2025.</li>
        <li>Graduation gowns will be available for pick-up starting November 15.</li>
        <li>Each graduand is allowed two guests inside the main tent.</li>
      </ul>
      <p>We look forward to hosting parents, guardians, and distinguished guests as we celebrate the next generation of leaders and innovators. Stay tuned for more updates on our social media channels.</p>
    `
  },
  "new-innovation-lab-launch": {
    title: "State-of-the-Art Innovation Lab Opens",
    category: "Technology",
    date: "April 12, 2025",
    author: "Faculty of S&T",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600",
    content: `
      <p>In a significant step towards becoming Africa's leading technology hub, IUEA has officially opened its new multi-million dollar Innovation and Research Laboratory. The facility was inaugurated by the Minister of Science and Technology.</p>
      <p>The new lab is equipped with the latest in robotics, artificial intelligence hardware, and high-performance computing clusters. It aims to provide students and faculty with the tools needed to conduct world-class research and develop solutions for local challenges.</p>
      <p>During the launch, the Vice Chancellor noted, "This lab is not just about equipment; it's about fostering a culture of curiosity and invention. We want our students to be creators, not just consumers of technology."</p>
    `
  },
  "sports-gala-highlights": {
    title: "Highlights from the Annual Sports Gala",
    category: "Student Life",
    date: "March 28, 2025",
    author: "Dean of Students",
    image: "https://images.unsplash.com/photo-1526676037777-05a232554f77?w=1600",
    content: `
      <p>The IUEA annual sports gala concluded last weekend with the Faculty of Engineering emerging as the overall winners. The three-day event saw students competing in football, basketball, track and field, and indoor games.</p>
      <p>The atmosphere was electric as faculties battled for the top spot. One of the highlights was the 100m sprint, where new campus records were set in both the men's and women's categories.</p>
      <p>Dean of Students remarked, "The sports gala is an essential part of university life. It builds teamwork, leadership, and healthy competition among our diverse student body."</p>
    `
  },
  "mit-partnership": {
    title: "IUEA Partners with MIT on AI Research Initiative",
    category: "Research",
    date: "April 15, 2026",
    author: "Office of the VC",
    image: "/JOT_1087.jpg",
    content: `
      <p>IUEA is proud to announce a landmark collaboration with the Massachusetts Institute of Technology (MIT) to launch a new Artificial Intelligence Research Initiative. This partnership aims to foster innovation and develop AI solutions tailored to the African context.</p>
      <p>The initiative will focus on key areas such as agriculture, healthcare, and sustainable energy. Selected IUEA students and faculty will have the opportunity to collaborate with MIT researchers on high-impact projects.</p>
    `
  },
  "innovation-award": {
    title: "Engineering Students Win Regional Innovation Competition",
    category: "Achievement",
    date: "April 5, 2026",
    author: "Faculty of Engineering",
    image: "/JOT_1351.jpg",
    content: `
      <p>Our Engineering students have once again proven their excellence by winning the top prize at the East African Regional Innovation Competition. Their project, a low-cost solar-powered irrigation system, was praised for its potential to transform small-scale farming.</p>
      <p>The team competed against 50 other universities from across the region. "This win is a testament to the practical, problem-solving education we receive at IUEA," said the team lead.</p>
    `
  },
  "new-library": {
    title: "New State-of-the-Art Library Opens Its Doors",
    category: "Campus",
    date: "March 28, 2026",
    author: "Library Services",
    image: "/JOT_1353.jpg",
    content: `
      <p>The IUEA community is celebrating the official opening of our new ultra-modern library facility. Designed to support 21st-century learning, the library features extensive digital resources, collaborative study pods, and quiet research zones.</p>
      <p>With 24/7 access for final-year students and an expanded collection of over 150,000 volumes, the new library is set to become the academic heart of our campus.</p>
    `
  }
}

export async function generateStaticParams() {
  return Object.keys(newsData).map((slug) => ({
    slug,
  }))
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = newsData[slug as keyof typeof newsData]

  if (!article) return <div>Article not found</div>

  return (
    <main className="min-h-screen bg-white">

      
      {/* Article Header */}
      <section className="pt-32 pb-12 lg:pt-48 bg-[#F5F0E8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/news" className="inline-flex items-center gap-2 text-[#8B0000] font-semibold mb-8 hover:gap-3 transition-all">
            <ArrowLeft className="w-4 h-4" /> Back to News
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <span className="px-4 py-1 bg-[#8B0000] text-white text-xs font-bold rounded-full uppercase tracking-wider">
              {article.category}
            </span>
            <div className="flex items-center gap-2 text-sm text-[#6B5B4F]">
              <Calendar className="w-4 h-4" />
              <span>{article.date}</span>
            </div>
          </div>
          <h1 className="text-4xl lg:text-6xl font-serif font-bold text-[#1A0A00] mb-8 leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center justify-between py-6 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100" alt={article.author} width={40} height={40} />
              </div>
              <div>
                <p className="text-sm font-bold text-[#1A0A00]">{article.author}</p>
                <p className="text-xs text-[#6B5B4F]">University Correspondent</p>
              </div>
            </div>
            <button className="flex items-center gap-2 text-[#6B5B4F] hover:text-[#8B0000] transition-colors">
              <Share2 className="w-5 h-5" />
              <span className="text-sm font-semibold">Share</span>
            </button>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionDiv 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative h-[500px] rounded-3xl overflow-hidden mb-12 shadow-2xl"
          >
            <Image src={article.image} alt={article.title} fill className="object-cover" />
          </MotionDiv>
          
          <div 
            className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-[#1A0A00] prose-p:text-[#6B5B4F] prose-strong:text-[#1A0A00] prose-li:text-[#6B5B4F]"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          
          {/* Tags */}
          <div className="mt-16 pt-8 border-t border-gray-100 flex items-center gap-4">
            <Tag className="w-5 h-5 text-[#8B0000]" />
            <div className="flex gap-2">
              {["Education", "IUEA", "Uganda", "Innovation"].map((tag) => (
                <span key={tag} className="px-4 py-1 bg-[#F5F0E8] text-[#6B5B4F] text-sm rounded-lg">#{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related News */}
      <section className="py-20 bg-[#F5F0E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-[#1A0A00] mb-12">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {Object.entries(newsData).slice(0, 3).map(([slug, item], idx) => (
              <div key={slug} className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                <Link href={`/news/${slug}`}>
                  <h4 className="font-bold text-[#1A0A00] mb-4 hover:text-[#8B0000] transition-colors">{item.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-[#6B5B4F]">
                    <Calendar className="w-3 h-3" />
                    <span>{item.date}</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>


    </main>
  )
}

