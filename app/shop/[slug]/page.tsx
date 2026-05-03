import { products } from "@/data/products"
import { ProductDetailView } from "@/components/shop/product-detail-view"
import { notFound } from "next/navigation"

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <main className="min-h-screen bg-white">

      <div className="pt-28 pb-20">
        <ProductDetailView product={product} relatedProducts={relatedProducts} />
      </div>

    </main>
  )
}
