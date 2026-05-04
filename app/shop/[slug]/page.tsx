import { ProductDetailView } from "@/components/shop/product-detail-view"
import { notFound } from "next/navigation"
import api from "@/lib/api"
import { transformProduct } from "@/lib/utils"

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params
  
  let product = null
  let relatedProducts = []

  try {
    const res = await api.getProductBySlug(slug)
    if (res?.success) {
      product = transformProduct(res.data)
      
      // Fetch related products (same category)
      const relatedRes = await api.getPublicProducts({ 
        category_id: res.data.category_id,
        status: 'active'
      })
      if (relatedRes?.success) {
        relatedProducts = relatedRes.data
          .filter((p: any) => p.id !== res.data.id)
          .slice(0, 4)
          .map(transformProduct)
      }
    }
  } catch (error) {
    console.error("Error fetching product:", error)
  }

  if (!product) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white">

      <div className="pt-28 pb-20">
        <ProductDetailView product={product} relatedProducts={relatedProducts} />
      </div>

    </main>
  )
}
