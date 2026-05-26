"use client"

import { useState, useEffect, use } from "react"
import Image from "next/image"
import Link from "next/link"
import { MotionDiv } from "@/components/motion-components"
import { Calendar, User, Tag, Share2, ArrowLeft, Loader2, Newspaper } from "lucide-react"
import api from "@/lib/api"
import { notFound } from "next/navigation"
import { SEO } from "@/components/seo"
import { ArticleSchema, BreadcrumbSchema } from "@/components/structured-data"

export default function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [article, setArticle] = useState<any>(null)
  const [relatedArticles, setRelatedArticles] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const [articleRes, relatedRes] = await Promise.all([
          api.getNewsBySlug(slug),
          api.getPublicNews({ limit: 3 })
        ])

        if (articleRes?.success) {
          setArticle(articleRes.data)
        }
        if (relatedRes?.success) {
          setRelatedArticles(relatedRes.data.filter((a: any) => a.slug !== slug).slice(0, 3))
        }
      } catch (err) {
        console.error("Failed to fetch article:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchArticle()
  }, [slug])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F0E8]">
        <Loader2 className="w-12 h-12 text-[#8B0000] animate-spin mb-4" />
        <p className="text-gray-500 font-medium font-serif">Loading article...</p>
      </div>
    )
  }

  if (!article) return notFound()

  return (
    <main className="min-h-screen bg-white">
      <SEO
        title={article.title}
        description={article.excerpt || article.content?.replace(/<[^>]*>/g, '').slice(0, 155)}
        ogTitle={article.title}
        ogDescription={article.excerpt || article.content?.replace(/<[^>]*>/g, '').slice(0, 155)}
        ogImage={article.image_url}
        canonicalUrl={`https://www.iuea.ac.ug/news/${article.slug}`}
        pageType="article"
      />
      <ArticleSchema
        title={article.title}
        description={article.excerpt || ''}
        image={article.image_url}
        url={`https://www.iuea.ac.ug/news/${article.slug}`}
        publishedAt={article.published_at || article.created_at}
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'News', url: '/news' },
        { name: article.title, url: `/news/${article.slug}` },
      ]} />

      {/* Article Header */}
      <section className="pt-32 pb-12 lg:pt-48 bg-[#F5F0E8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/news" className="inline-flex items-center gap-2 text-[#8B0000] font-semibold mb-8 hover:gap-3 transition-all uppercase text-xs tracking-widest">
            <ArrowLeft className="w-4 h-4" /> Back to News
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <span className="px-4 py-1 bg-[#8B0000] text-white text-[10px] font-black rounded-full uppercase tracking-wider">
              {article.category}
            </span>
            <div className="flex items-center gap-2 text-sm text-[#6B5B4F]">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(article.published_at || article.created_at)}</span>
            </div>
          </div>
          <h1 className="text-4xl lg:text-6xl font-serif font-bold text-[#1A0A00] mb-8 leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center justify-between py-6 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#8B0000] flex items-center justify-center text-white font-bold text-xs">
                {article.author?.name?.[0] || "I"}
              </div>
              <div>
                <p className="text-sm font-bold text-[#1A0A00]">{article.author?.name || "IUEA Correspondent"}</p>
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
            className="relative h-[500px] rounded-[40px] overflow-hidden mb-12 shadow-2xl bg-gray-50"
          >
            {article.image_url ? (
              <Image src={article.image_url} alt={article.title} fill className="object-cover" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <Newspaper className="w-20 h-20 text-gray-200" />
              </div>
            )}
          </MotionDiv>
          
          <div 
            className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-[#1A0A00] prose-p:text-[#6B5B4F] prose-strong:text-[#1A0A00] prose-li:text-[#6B5B4F] prose-img:rounded-[32px]"
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
      {relatedArticles.length > 0 && (
        <section className="py-20 bg-[#F5F0E8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-serif font-bold text-[#1A0A00] mb-12">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedArticles.map((item) => (
                <div key={item.slug} className="bg-white p-8 rounded-[32px] shadow-sm hover:shadow-xl transition-all duration-300 group">
                  <Link href={`/news/${item.slug}`}>
                    <span className="text-[10px] font-black text-[#8B0000] uppercase tracking-widest mb-4 block">{item.category}</span>
                    <h4 className="text-xl font-bold text-[#1A0A00] mb-6 group-hover:text-[#8B0000] transition-colors line-clamp-2">{item.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-[#6B5B4F] font-medium">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(item.published_at || item.created_at)}</span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}


    </main>
  )
}

