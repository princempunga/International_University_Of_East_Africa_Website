import { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"
import { Hero } from "@/components/hero"

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("home")
}
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

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
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
