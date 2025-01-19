import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { FiArrowRight } from 'react-icons/fi'
// import ProductCard from './ProductCard'

const BestSeller = () => {
  const { products, navigate } = useContext(ShopContext)
  const bestsellerProducts = products.filter(item => item.bestseller).slice(0, 4)

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Bestsellers
            </h2>
            <p className="text-gray-400 mt-1">Our most popular products</p>
          </div>
          <button
            onClick={() => navigate('/shop')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            View All
            <FiArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellerProducts.map((product, index) => (
            <div
              key={product._id}
              className="transform transition-transform duration-300 hover:scale-[1.02]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 text-center lg:hidden">
          <button
            onClick={() => navigate('/shop')}
            className="px-6 py-3 bg-white/10 hover:bg-white/15 rounded-xl text-white font-medium transition-colors inline-flex items-center gap-2"
          >
            View All Products
            <FiArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default BestSeller 