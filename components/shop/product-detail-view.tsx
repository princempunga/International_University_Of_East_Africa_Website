"use client"

import { useState } from "react"
import { Product } from "@/data/products"
import { useCart } from "@/context/cart-context"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Minus, Plus, ShoppingCart, Truck, RefreshCw, ShieldCheck, Share2, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ProductCard } from "./product-card"
import { useRouter } from "next/navigation"

export function ProductDetailView({ product, relatedProducts }: { product: Product, relatedProducts: Product[] }) {
  const { addToCart, showToast } = useCart()
  const router = useRouter()
  
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : "")
  const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0] : "")
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("Description")
  const [mainImage, setMainImage] = useState(product.image)

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
      category: product.category,
      slug: product.slug,
      size: selectedSize || undefined,
      color: selectedColor || undefined
    })
    showToast(`✓ ${product.name} added to cart!`)
  }

  const handleBuyNow = () => {
    handleAddToCart()
    router.push("/shop/checkout")
  }

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
      showToast("✓ Link copied to clipboard!")
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-[#8B0000]">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/shop" className="hover:text-[#8B0000]">Shop</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-400 truncate">{product.category}</span>
        <ChevronRight className="w-4 h-4" />
        <span className="font-semibold text-[#1A0A00] truncate">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Left - Image Gallery */}
        <div className="space-y-6">
          <motion.div 
            layoutId={`img-${product.id}`}
            className="relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden border bg-gray-50 group"
          >
            <Image
              src={mainImage}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </motion.div>
          
          <div className="grid grid-cols-4 gap-4">
            {[product.image, ...Array(3).fill(product.image)].map((img, i) => (
              <button
                key={i}
                onClick={() => setMainImage(img)}
                className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                  mainImage === img ? "border-[#8B0000] scale-95" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={img} alt={`${product.name} thumbnail`} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right - Product Info */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex gap-2">
              {product.originalPrice && (
                <span className="bg-[#8B0000] text-white px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                  SALE
                </span>
              )}
              {product.isNew && (
                <span className="bg-white text-[#8B0000] px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg border border-[#8B0000]/10">
                  NEW
                </span>
              )}
              {product.isBestseller && (
                <span className="bg-[#1A0A00] text-white px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg border border-white/20">
                  BESTSELLER
                </span>
              )}
            </div>
            <span className="text-sm font-medium text-gray-400">{product.category}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1A0A00] mb-4">
            {product.name}
          </h1>

          <div className="flex items-center gap-4 mb-6 pb-6 border-b">
            <div className="flex items-center gap-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-[#8B0000] text-[#8B0000]" : "text-gray-300"}`} />
                ))}
              </div>
              <span className="text-sm font-bold text-[#1A0A00] ml-1">{product.rating}</span>
            </div>
            <span className="text-sm text-gray-400">({product.reviews} reviews)</span>
          </div>

          <div className="flex items-baseline gap-3 mb-8">
            <span className="text-4xl font-bold text-[#8B0000]">
              UGX {product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xl text-gray-400 line-through">
                UGX {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Selectors */}
          <div className="space-y-8 mb-10">
            {product.sizes && (
              <div>
                <h4 className="text-sm font-bold text-[#1A0A00] mb-4 flex justify-between">
                  Select Size <span>Size Guide</span>
                </h4>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 flex items-center justify-center rounded-xl font-bold transition-all border ${
                        selectedSize === size 
                          ? "bg-[#8B0000] border-[#8B0000] text-white" 
                          : "border-gray-200 text-gray-600 hover:border-[#8B0000]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.colors && (
              <div>
                <h4 className="text-sm font-bold text-[#1A0A00] mb-4">Select Color</h4>
                <div className="flex flex-wrap gap-4">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`group relative w-8 h-8 rounded-full transition-all ${
                        selectedColor === color ? "ring-2 ring-offset-2 ring-[#8B0000]" : ""
                      }`}
                      style={{ backgroundColor: color.toLowerCase() === 'crimson' ? '#8B0000' : color.toLowerCase() }}
                    >
                      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {color}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h4 className="text-sm font-bold text-[#1A0A00] mb-4">Quantity</h4>
              <div className="flex items-center w-32 border border-gray-200 rounded-xl p-1">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-[#8B0000]"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="flex-1 text-center font-bold">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-[#8B0000]"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <button 
              onClick={handleAddToCart}
              className="flex-1 py-4 bg-[#8B0000] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#6B0000] transition-all transform hover:scale-[1.02]"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
            <button 
              onClick={handleBuyNow}
              className="flex-1 py-4 bg-white border-2 border-[#8B0000] text-[#8B0000] rounded-xl font-bold hover:bg-[#8B0000]/5 transition-all transform hover:scale-[1.02]"
            >
              Buy Now →
            </button>
          </div>

          {/* Features List */}
          <div className="grid grid-cols-2 gap-4 pt-8 border-t">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <ShieldCheck className="w-5 h-5 text-green-600" />
              Official IUEA Merchandise
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Truck className="w-5 h-5 text-blue-600" />
              Free delivery over UGX 100k
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <RefreshCw className="w-5 h-5 text-[#8B0000]" />
              30-day return policy
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Share2 className="w-5 h-5 text-purple-600 cursor-pointer" onClick={handleShare} />
              Share with friends
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-20 lg:mt-32">
        <div className="flex border-b">
          {["Description", "Specifications", "Reviews"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-4 text-sm font-bold transition-all relative ${
                activeTab === tab ? "text-[#8B0000]" : "text-gray-400 hover:text-[#1A0A00]"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-1 bg-[#8B0000]" />
              )}
            </button>
          ))}
        </div>
        
        <div className="py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "Description" && (
                <div className="prose max-w-none text-gray-600 leading-relaxed">
                  <p className="mb-4">
                    Experience the excellence of IUEA with this official university merchandise. 
                    Designed for students, faculty, and alumni who want to showcase their pride 
                    in our institution. Each piece is crafted with the highest quality materials 
                    to ensure durability and comfort.
                  </p>
                  <p>
                    Whether you're on campus, at a regional competition, or representing IUEA internationally, 
                    our merchandise collection reflects the "Learning to Succeed" philosophy that 
                    defines our community. Support your university while looking your best.
                  </p>
                </div>
              )}
              {activeTab === "Specifications" && (
                <table className="w-full text-left border-collapse">
                  <tbody>
                    {[
                      ["Material", "Premium Cotton Blend / High-Grade Synthetic"],
                      ["Dimensions", "Standard Academic Fit"],
                      ["Weight", "Varies by size"],
                      ["Manufacturer", "Official IUEA Apparel Division"],
                      ["Care", "Machine wash cold, tumble dry low"]
                    ].map(([key, val], i) => (
                      <tr key={i} className="border-b last:border-0">
                        <td className="py-4 font-bold text-[#1A0A00] w-1/3">{key}</td>
                        <td className="py-4 text-gray-600">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {activeTab === "Reviews" && (
                <div className="space-y-8">
                  {[
                    { name: "John Doe", date: "Jan 12, 2026", rating: 5, text: "Excellent quality! The colors are vibrant and it fits perfectly." },
                    { name: "Mary Smith", date: "Dec 28, 2025", rating: 4, text: "Great backpack, very sturdy and holds everything I need for class." },
                    { name: "David Okello", date: "Nov 15, 2025", rating: 5, text: "Best purchase I've made on campus. Rep the red and gold!" }
                  ].map((rev, i) => (
                    <div key={i} className="pb-8 border-b last:border-0">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-bold text-[#1A0A00]">{rev.name}</h5>
                        <span className="text-xs text-gray-400">{rev.date}</span>
                      </div>
                      <div className="flex mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < rev.rating ? "fill-[#8B0000] text-[#8B0000]" : "text-gray-300"}`} />
                        ))}
                      </div>
                      <p className="text-gray-600 text-sm">{rev.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16 pt-16 border-t">
        <h2 className="text-3xl font-serif font-bold text-[#1A0A00] mb-10">You may also like</h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-8">
          {relatedProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  )
}
