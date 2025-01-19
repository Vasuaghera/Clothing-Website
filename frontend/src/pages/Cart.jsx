import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import CartTotal from '../components/CartTotal'
import { 
  IoCartOutline,
  IoAddCircleOutline,
  IoRemoveCircleOutline,
  IoTrashBinOutline,
  IoArrowForward,
  IoBagCheckOutline,
  IoStorefrontOutline,
  IoCardOutline,
  IoShirtOutline,
  IoPricetagOutline,
  IoCloseCircleOutline
} from 'react-icons/io5'

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext)
  const [cartData, setCartData] = useState([])

  useEffect(() => {
    if (products.length > 0) {
      const tempData = []
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            })
          }
        }
      }
      setCartData(tempData)
    }
  }, [cartItems, products])

  const handleQuantityChange = (id, size, value) => {
    if (value >= 1) {
      updateQuantity(id, size, value)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white px-4 py-14'>
      <div className='max-w-6xl mx-auto'>
        {/* Header */}
        <div className='flex items-center justify-between mb-10'>
          <div className='flex items-center gap-3'>
            <IoCartOutline className='w-8 h-8' />
            <div>
              <h1 className='text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent'>
                Shopping Cart
              </h1>
              <p className='text-gray-400 mt-1 flex items-center gap-2'>
                <IoBagCheckOutline className='w-4 h-4' />
                {cartData.length} items
              </p>
            </div>
          </div>
         
        </div>

        {cartData.length > 0 ? (
          <div className='grid lg:grid-cols-[1fr_380px] gap-8'>
            {/* Cart Items */}
            <div className='space-y-4'>
              {cartData.map((item, index) => {
                const productData = products.find((product) => product._id === item._id)
                return (
                  <div 
                    key={index} 
                    className='bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-colors'
                  >
                    <div className='flex gap-6'>
                      {/* Product Image */}
                      <div className='w-32 h-32 rounded-xl overflow-hidden bg-white/5 relative group'>
                        <img 
                          className='w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300' 
                          src={productData.image[0]} 
                          alt={productData.name} 
                        />
                      </div>

                      {/* Product Details */}
                      <div className='flex-1 flex flex-col'>
                        <div className='flex-1'>
                          <h3 className='text-lg font-medium'>{productData.name}</h3>
                          <div className='flex items-center gap-2 text-gray-400 text-sm mt-1'>
                            <IoShirtOutline className='w-4 h-4 text-black' />
                            <span>Size: {item.size}</span>
                          </div>
                          <div className='flex items-center gap-2 text-xl font-medium mt-2'>
                            <IoPricetagOutline className='w-5 h-5 text-black' />
                            <span>{currency}{productData.price}</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className='flex items-center justify-between mt-4'>
                          {/* Quantity Controls */}
                          <div className='flex items-center gap-4 bg-white/5 rounded-xl p-2'>
                            <button
                              onClick={() => handleQuantityChange(item._id, item.size, item.quantity - 1)}
                              className='p-1.5 rounded-lg hover:bg-white/10 transition-colors text-black hover:text-black'
                            >
                              <IoRemoveCircleOutline className='w-5 h-5' />
                            </button>
                            <span className='w-8 text-center font-medium'>{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item._id, item.size, item.quantity + 1)}
                              className='p-1.5 rounded-lg hover:bg-white/10 transition-colors text-black hover:text-black'
                            >
                              <IoAddCircleOutline className='w-5 h-5' />
                            </button>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => updateQuantity(item._id, item.size, 0)}
                            className='p-2 text-red-500 hover:text-red-400 transition-colors rounded-lg hover:bg-red-400/10'
                          >
                            <IoTrashBinOutline className='w-5 h-5' />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Cart Summary */}
            <div className='bg-white/5 rounded-2xl p-6 h-fit'>
              <div className='flex items-center gap-2 mb-6'>
                <IoCardOutline className='w-6 h-6 text-black' />
                <h3 className='text-xl font-medium'>Order Summary</h3>
              </div>
              <CartTotal />
              <button
                onClick={() => navigate('/place-order')}
                className='w-full mt-6 py-4 bg-gradient-to-r from-white to-gray-200 text-black rounded-xl font-medium
                         flex items-center justify-center gap-2 transform transition-transform hover:scale-[1.02]'
              >
                Proceed to Checkout
                <IoArrowForward className='w-5 h-5 text-black' />
              </button>
            </div>
          </div>
        ) : (
          // Empty Cart State
          <div className='text-center py-20'>
            <div className='w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center'>
              <IoCloseCircleOutline className='w-10 h-10 text-black' />
            </div>
            <h2 className='text-2xl font-medium mb-2'>Your cart is empty</h2>
            <p className='text-gray-400 mb-8'>Looks like you haven't added anything to your cart yet</p>
            <button
              onClick={() => navigate('/collection')}
              className='px-8 py-3 bg-white text-black rounded-xl font-medium hover:bg-gray-100 transition-colors
                       flex items-center gap-2 mx-auto'
            >
              <IoStorefrontOutline className='w-5 h-5 text-black' />
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
