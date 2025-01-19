import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import RelatedProducts from '../components/RelatedProducts'
import { FiShoppingBag, FiStar, FiTruck, FiRefreshCw, FiShield, FiThumbsUp, FiMessageSquare, FiUser } from 'react-icons/fi'
import { toast } from 'react-toastify'

const Product = () => {
  const { productId } = useParams()
  const { products, currency, addToCart } = useContext(ShopContext)
  const [productData, setProductData] = useState(false)
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')
  const [activeTab, setActiveTab] = useState('description')

  const handleAddToCart = () => {
    if (!size) {
      toast.error('Please select a size first')
      return
    }
    addToCart(productData._id, size)
    toast.success('Product added to cart successfully!')
  }

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image[0])
        return null
      }
    })
  }

  useEffect(() => {
    fetchProductData()
  }, [productId, products])

  return productData ? (
    <div className='min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white'>
      <div className='max-w-7xl mx-auto px-4 py-10'>
        {/* Product Section */}
        <div className='grid md:grid-cols-2 gap-12'>
          {/* Image Gallery */}
          <div className='space-y-6'>
            {/* Main Image */}
            <div className='aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900 p-8 relative group'>
              <img 
                src={image} 
                alt={productData.name}
                className='w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500'
              />
            </div>
            {/* Thumbnail Gallery */}
            <div className='grid grid-cols-4 gap-4'>
              {productData.image.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setImage(img)}
                  className={`
                    aspect-square rounded-2xl overflow-hidden
                    ${img === image 
                      ? 'ring-2 ring-white shadow-lg shadow-white/10' 
                      : 'opacity-50 hover:opacity-100'
                    }
                    transition duration-300 transform hover:scale-105
                  `}
                >
                  <img 
                    src={img} 
                    alt={`${productData.name} ${index + 1}`}
                    className='w-full h-full object-cover'
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className='space-y-8'>
            {/* Basic Info */}
            <div className='space-y-4'>
              <div className='inline-block px-3 py-1 rounded-full bg-white/10 text-sm font-medium'>
                {productData.category} / {productData.subCategory}
              </div>
              <h1 className='text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent'>
                {productData.name}
              </h1>
              <div className='flex items-center gap-2'>
                <div className='flex'>
                  {[1, 2, 3, 4].map((star) => (
                    <FiStar key={star} className='w-5 h-5 text-yellow-500 fill-yellow-500' />
                  ))}
                  <FiStar className='w-5 h-5 text-gray-500' />
                </div>
                <span className='text-gray-400'>(122 reviews)</span>
              </div>
              <p className='text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent'>
                {currency}{productData.price}
              </p>
              <p className='text-gray-400 leading-relaxed text-lg'>{productData.description}</p>
            </div>

            {/* Size Selection */}
            <div className='space-y-4'>
              <h3 className='font-medium text-lg'>Select Size</h3>
              <div className='flex flex-wrap gap-3'>
                {productData.sizes.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSize(item)}
                    className={`
                      px-6 py-3 rounded-xl font-medium
                      transform transition-all duration-200
                      ${item === size 
                        ? 'bg-white text-black scale-105 shadow-lg' 
                        : 'bg-white/10 text-white hover:bg-white/20'
                      }
                    `}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={!size}
              className={`
                w-full py-5 rounded-2xl font-medium text-lg
                flex items-center justify-center gap-3
                transform transition-all duration-300
                ${size 
                  ? 'bg-gradient-to-r from-white to-gray-200 text-black hover:scale-[1.02]' 
                  : 'bg-zinc-800 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              <FiShoppingBag className='w-6 h-6' />
              Add to Cart
            </button>

            {/* Features */}
            <div className='grid grid-cols-3 gap-6 pt-6'>
              {[
                { icon: FiTruck, text: 'Free Shipping' },
                { icon: FiRefreshCw, text: 'Easy Returns' },
                { icon: FiShield, text: 'Secure Payment' }
              ].map((feature, index) => (
                <div key={index} className='group cursor-pointer'>
                  <div className='text-center space-y-3 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors'>
                    <feature.icon className='w-7 h-7 mx-auto text-gray-400 group-hover:text-white transition-colors' />
                    <p className='text-sm text-gray-400 group-hover:text-white transition-colors'>{feature.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

       

        {/* Related Products */}
        <div className='mt-20'>
          <RelatedProducts 
            category={productData.category} 
            subCategory={productData.subCategory} 
          />
        </div>
      </div>
    </div>
  ) : (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-zinc-900'>
      <div className='w-10 h-10 border-3 border-white/20 border-t-white rounded-full animate-spin'></div>
    </div>
  )
}

export default Product
