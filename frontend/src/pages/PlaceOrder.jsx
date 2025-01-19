import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import CartTotal from '../components/CartTotal'
import axios from 'axios'
import { toast } from 'react-toastify'
import { 
  IoLocationOutline, 
  IoCallOutline, 
  IoMailOutline, 
  IoPersonOutline,
  IoCashOutline,
  IoCardOutline,
  IoWalletOutline,
  IoArrowForward,
  IoHomeOutline,
  IoEarthOutline,
  IoBusinessOutline,
  IoMapOutline
} from 'react-icons/io5'

const PlaceOrder = () => {
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext)
  const [method, setMethod] = useState('cod')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setFormData(data => ({ ...data, [name]: value }))
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name:'Order Payment',
      description:'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response)
        try {
          
          const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay',response,{headers:{token}})
          if (data.success) {
            navigate('/orders')
            setCartItems({})
          }
        } catch (error) {
          console.log(error)
          toast.error(error)
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {

      let orderItems = []

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }
      

      switch (method) {

        // API Calls for COD
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place',orderData,{headers:{token}})
          if (response.data.success) {
            setCartItems({})
            navigate('/orders')
          } else {
            toast.error(response.data.message)
          }
          break;

        case 'stripe':
          const responseStripe = await axios.post(backendUrl + '/api/order/stripe',orderData,{headers:{token}})
          if (responseStripe.data.success) {
            const {session_url} = responseStripe.data
            window.location.replace(session_url)
          } else {
            toast.error(responseStripe.data.message)
          }
          break;

        case 'razorpay':

          const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, {headers:{token}})
          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order)
          }

          break;

        default:
          break;
      }


    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  console.log('Current payment method:', method)

  return (
    <div className='min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white px-4 py-14'>
      <div className='max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-10'>
          Checkout
        </h1>

        <form onSubmit={onSubmitHandler} className='grid lg:grid-cols-[1fr_380px] gap-8'>
          {/* Left Side - Delivery Information */}
          <div className='space-y-8'>
            {/* Personal Information */}
            <div className='bg-white/5 rounded-2xl p-6'>
              <h2 className='text-xl font-medium mb-6 flex items-center gap-2'>
                <IoPersonOutline className='w-5 h-5 text-white' />
                Personal Information
              </h2>
              <div className='grid sm:grid-cols-2 gap-4'>
                <div className='space-y-1'>
                  <label className='text-sm text-gray-400'>First Name</label>
                  <input 
                    required 
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={onChangeHandler}
                    className='w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 focus:border-white/20 focus:outline-none transition-colors'
                    placeholder='John'
                  />
                </div>
                <div className='space-y-1'>
                  <label className='text-sm text-gray-400'>Last Name</label>
                  <input 
                    required 
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={onChangeHandler}
                    className='w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 focus:border-white/20 focus:outline-none transition-colors'
                    placeholder='Doe'
                  />
                </div>
              </div>
              <div className='grid sm:grid-cols-2 gap-4 mt-4'>
                <div className='space-y-1'>
                  <label className='text-sm text-gray-400'>Email Address</label>
                  <div className='relative'>
                    <IoMailOutline className='absolute left-4 top-3 w-5 h-5 text-white' />
                    <input 
                      required 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={onChangeHandler}
                      className='w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-2.5 focus:border-white/20 focus:outline-none transition-colors'
                      placeholder='john@example.com'
                    />
                  </div>
                </div>
                <div className='space-y-1'>
                  <label className='text-sm text-gray-400'>Phone Number</label>
                  <div className='relative'>
                    <IoCallOutline className='absolute left-4 top-3 w-5 h-5 text-white' />
                    <input 
                      required 
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={onChangeHandler}
                      className='w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-2.5 focus:border-white/20 focus:outline-none transition-colors'
                      placeholder='+1 (234) 567-8900'
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className='bg-white/5 rounded-2xl p-6'>
              <h2 className='text-xl font-medium mb-6 flex items-center gap-2'>
                <IoLocationOutline className='w-5 h-5 text-white' />
                Delivery Address
              </h2>
              <div className='space-y-4'>
                <div className='space-y-1'>
                  <label className='text-sm text-gray-400'>Street Address</label>
                  <div className='relative'>
                    <IoHomeOutline className='absolute left-4 top-3 w-5 h-5 text-white' />
                    <input 
                      required 
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={onChangeHandler}
                      className='w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-2.5 focus:border-white/20 focus:outline-none transition-colors'
                      placeholder='123 Main Street'
                    />
                  </div>
                </div>
                <div className='grid sm:grid-cols-2 gap-4'>
                  <div className='space-y-1'>
                    <label className='text-sm text-gray-400'>City</label>
                    <div className='relative'>
                      <IoBusinessOutline className='absolute left-4 top-3 w-5 h-5 text-white' />
                      <input 
                        required 
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={onChangeHandler}
                        className='w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-2.5 focus:border-white/20 focus:outline-none transition-colors'
                        placeholder='New York'
                      />
                    </div>
                  </div>
                  <div className='space-y-1'>
                    <label className='text-sm text-gray-400'>State</label>
                    <div className='relative'>
                      <IoMapOutline className='absolute left-4 top-3 w-5 h-5 text-white' />
                      <input 
                        required 
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={onChangeHandler}
                        className='w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-2.5 focus:border-white/20 focus:outline-none transition-colors'
                        placeholder='NY'
                      />
                    </div>
                  </div>
                </div>
                <div className='grid sm:grid-cols-2 gap-4'>
                  <div className='space-y-1'>
                    <label className='text-sm text-gray-400'>ZIP Code</label>
                    <input 
                      required 
                      type="text"
                      name="zipcode"
                      value={formData.zipcode}
                      onChange={onChangeHandler}
                      className='w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 focus:border-white/20 focus:outline-none transition-colors'
                      placeholder='10001'
                    />
                  </div>
                  <div className='space-y-1'>
                    <label className='text-sm text-gray-400'>Country</label>
                    <div className='relative'>
                      <IoEarthOutline className='absolute left-4 top-3 w-5 h-5 text-white' />
                      <input 
                        required 
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={onChangeHandler}
                        className='w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-2.5 focus:border-white/20 focus:outline-none transition-colors'
                        placeholder='United States'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method - Fixed Selection */}
            <div className='bg-white/5 rounded-2xl p-6'>
              <h2 className='text-xl font-medium mb-6 flex items-center gap-2'>
                <IoWalletOutline className='w-5 h-5 text-white' />
                Payment Method
              </h2>
              <div className='grid sm:grid-cols-2 gap-4'>
                {/* <button
                  type="button"
                  onClick={() => setMethod('razorpay')}
                  className={`p-4 rounded-xl border transition-all duration-200 ${
                    method === 'razorpay' 
                      ? 'bg-white/10 border-white/20' 
                      : 'border-white/10 hover:bg-white/5'
                  } flex items-center gap-3`}
                >
                  <IoCardOutline className={`w-5 h-5 ${
                    method === 'razorpay' ? 'text-white' : 'text-gray-400'
                  }`} />
                  <span className={method === 'razorpay' ? 'text-white' : 'text-gray-400'}>
                    Razorpay
                  </span>
                </button> */}
                <button
                  type="button"
                  onClick={() => setMethod('cod')}
                  className={`p-4 rounded-xl border transition-all duration-200 ${
                    method === 'cod' 
                      ? 'bg-white/10 border-white/20' 
                      : 'border-white/10 hover:bg-white/5'
                  } flex items-center gap-3`}
                >
                  <IoCashOutline  />
                  <span >
                    Cash on Delivery
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Order Summary */}
          <div className='space-y-8'>
            <div className='bg-white/5 rounded-2xl p-6'>
              <h2 className='text-xl font-medium mb-6 flex items-center gap-2'>
                <IoWalletOutline className='w-5 h-5 text-white' />
                Order Summary
              </h2>
              <CartTotal />
              <button
                type="submit"
                className='w-full mt-6 py-4 bg-gradient-to-r from-white to-gray-200 text-black rounded-xl font-medium
                         flex items-center justify-center gap-2 transform transition-transform hover:scale-[1.02]'
              >
                Place Order
                <IoArrowForward className='w-5 h-5' />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PlaceOrder
