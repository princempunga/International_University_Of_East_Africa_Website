"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ProductCard } from "@/components/shop/product-card"
import api from "@/lib/api"
import { Loader2, Package } from "lucide-react"
import { transformProduct } from "@/lib/utils"

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<string[]>(["All Products"])
  const [activeCategory, setActiveCategory] = useState("All Products")
  const [displayCount, setDisplayCount] = useState(12)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          api.getPublicProducts({ status: 'active' }),
          api.getCategories()
        ])

        if (prodRes?.success) {
          setProducts(prodRes.data.map(transformProduct))
        }
        if (catRes?.success) {
          setCategories(["All Products", ...catRes.data.map((c: any) => c.name)])
        }
      } catch (error) {
        console.error("Failed to fetch shop data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredProducts = products.filter(p => 
    activeCategory === "All Products" || p.category === activeCategory
  )

  const displayedProducts = filteredProducts.slice(0, displayCount)

  return (
    <main className="min-h-screen bg-[#faf9f7]">


      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-[#8B0000]">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/pic6.jpg" 
            alt="Store Background"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#8B0000]/60 via-[#6B0000]/70 to-[#8B0000]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">
              IUEA Official Store
            </h1>
            <p className="text-[#E8B84B] text-xl md:text-2xl font-medium mb-10">
              Wear your pride. Rep your university.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <button className="px-8 py-4 bg-[#E8B84B] text-[#1A0A00] rounded-full font-bold hover:bg-[#D4A73D] transition-all transform hover:scale-105">
                Shop Now →
              </button>
              <button className="px-8 py-4 border-2 border-white text-white rounded-full font-bold hover:bg-white hover:text-[#1A0A00] transition-all">
                View Lookbook
              </button>
            </div>
            
            <p className="text-white/60 text-sm">
              Free delivery on orders above UGX 100,000
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Bar */}
      <section className="sticky top-20 z-40 bg-white shadow-sm border-b overflow-x-auto scrollbar-hide">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-start lg:justify-center h-16 gap-2 min-w-max">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat)
                setDisplayCount(12)
              }}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                activeCategory === cat 
                  ? "bg-[#8B0000] text-white" 
                  : "bg-white text-[#1A0A00] hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-32">
              <Loader2 className="w-12 h-12 text-[#8B0000] animate-spin mb-4" />
              <p className="text-gray-500 font-medium">Fetching the latest merchandise...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-8">
                <AnimatePresence mode="popLayout">
                  {displayedProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {displayCount < filteredProducts.length && (
                <div className="mt-16 text-center">
                  <button 
                    onClick={() => setDisplayCount(prev => prev + 8)}
                    className="px-10 py-4 border-2 border-[#8B0000] text-[#8B0000] rounded-xl font-bold hover:bg-[#8B0000] hover:text-white transition-all"
                  >
                    Load More Products
                  </button>
                </div>
              )}

              {filteredProducts.length === 0 && (
                <div className="text-center py-20">
                  <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <Package className="w-10 h-10 text-gray-300" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-[#1A0A00] mb-2">No Products Found</h3>
                  <p className="text-gray-500 text-lg">We couldn't find any products in the "{activeCategory}" category.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>


    </main>
  )
}
