"use client"

import { useState } from "react"
import { Product } from "@/data/products"
import { useCart } from "@/context/cart-context"
import { motion } from "framer-motion"
import { Star, ShoppingCart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, showToast } = useCart()
  const [imgError, setImgError] = useState(false)

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      category: product.category,
      slug: product.slug,
      size: product.sizes ? product.sizes[0] : undefined,
      color: product.colors ? product.colors[0] : undefined
    })
    showToast(`✓ ${product.name} added to cart!`)
  }

  return (
    <Link href={`/shop/${product.slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ y: -8 }}
        viewport={{ once: true }}
        className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col h-full overflow-hidden"
      >
        {/* Image Container */}
        <div className="relative h-[280px] overflow-hidden bg-[#faf9f7] rounded-t-2xl">
          {!imgError ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gray-50">
              <ShoppingCart className="w-12 h-12 text-gray-200 mb-2" />
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{product.name}</p>
            </div>
          )}
          
          {/* Badge System */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            {product.originalPrice && (
              <span className="bg-[#8B0000] text-white px-3 py-1.5 text-[9px] font-black uppercase tracking-tighter rounded-full shadow-lg">
                SALE
              </span>
            )}
            {product.isNew && (
              <span className="bg-white text-[#8B0000] px-3 py-1.5 text-[9px] font-black uppercase tracking-tighter rounded-full shadow-lg border border-[#8B0000]/10">
                NEW
              </span>
            )}
            {product.isBestseller && (
              <span className="bg-[#1A0A00] text-white px-3 py-1.5 text-[9px] font-black uppercase tracking-tighter rounded-full shadow-lg border border-white/20">
                BESTSELLER
              </span>
            )}
          </div>

          {/* Sliding Add to Cart Button */}
          <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-20">
            <button
              onClick={handleQuickAdd}
              className="w-full bg-[#8B0000] text-white py-3.5 rounded-xl font-bold text-xs shadow-xl hover:bg-[#6B0000] transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              ADD TO CART
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-2">
            {product.category}
          </span>
          <h3 className="text-[17px] font-bold text-[#1A0A00] mb-3 line-clamp-2 group-hover:text-[#8B0000] transition-colors font-serif">
            {product.name}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${i < Math.floor(product.rating) ? "fill-[#8B0000] text-[#8B0000]" : "text-gray-200"}`}
                />
              ))}
            </div>
            <span className="text-[11px] text-gray-400 font-medium">({product.reviews})</span>
          </div>

          <div className="mt-auto flex items-center gap-3">
            <span className="text-[20px] font-black text-[#8B0000]">
              UGX {product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-300 line-through font-medium">
                UGX {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
