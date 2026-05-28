"use client"

import { useEffect, useState } from "react"
import { Hero } from "@/components/hero"
import { StatsBar } from "@/components/stats-bar"
import { Faculties } from "@/components/faculties"
import { FeaturedPrograms } from "@/components/featured-programs"
import { WhyChoose } from "@/components/why-choose"
import { AccreditationAwards } from "@/components/accreditation-awards"
import { StudentLife } from "@/components/student-life"
import { Testimonials } from "@/components/testimonials"
import { NewsEvents } from "@/components/news-events"
import { ShopTeaser } from "@/components/shop/shop-teaser"
import { CTABanner } from "@/components/cta-banner"

export function HomeContent() {
    const [pageData, setPageData] = useState<any>(null)

    useEffect(() => {
        fetch('http://localhost:8000/api/cms/pages/home')
            .then(res => res.json())
            .then(data => setPageData(data))
            .catch(err => console.error("CMS Load Error:", err))
    }, [])

    const getSection = (key: string) => pageData?.sections?.find((s: any) => s.section_key === key)?.content || {}

    const heroData = getSection('hero')
    const statsData = getSection('stats')

    return (
        <main className="min-h-screen">
            <Hero
                titleMain={heroData.title_main}
                titleAccent={heroData.title_accent}
                subtitle={heroData.subtitle}
                image={heroData.image}
                buttonText={heroData.button_text}
                buttonLink={heroData.button_link}
                stats={Array.isArray(statsData) ? statsData : undefined}
            />
            <StatsBar />
            <Faculties />
            <FeaturedPrograms />
            <WhyChoose />
            <AccreditationAwards />
            <StudentLife />
            <Testimonials />
            <NewsEvents />
            <ShopTeaser />
            <CTABanner />
        </main>
    )
}
