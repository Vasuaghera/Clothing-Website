import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { FiPackage, FiUser, FiMapPin, FiPhone, FiCalendar, FiCreditCard, FiTruck } from 'react-icons/fi'

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchAllOrders = async () => {
    if (!token) return null

    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
      if (response.data.success) {
        setOrders(response.data.orders.reverse())
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/order/status',
        { orderId, status: event.target.value },
        { headers: { token } }
      )
      if (response.data.success) {
        await fetchAllOrders()
        toast.success('Order status updated')
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [token])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
      </div>
    )
  }

  const getStatusColor = (status) => {
    const colors = {
      'Order Placed': 'bg-blue-500/10 text-blue-400',
      'Packing': 'bg-yellow-500/10 text-yellow-400',
      'Shipped': 'bg-purple-500/10 text-purple-400',
      'Out for delivery': 'bg-orange-500/10 text-orange-400',
      'Delivered': 'bg-green-500/10 text-green-400'
    }
    return colors[status] || 'bg-gray-500/10 text-gray-400'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Orders</h2>
        <span className="text-sm text-gray-400">{orders.length} orders</span>
      </div>

      <div className="space-y-4">
        {orders.map((order, index) => (
          <div key={index} className="bg-zinc-900/50 rounded-xl border border-white/5 overflow-hidden">
            {/* Order Header */}
            <div className="p-4 bg-black/20 border-b border-white/5 flex flex-wrap gap-4 items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                  <FiPackage className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Order ID</p>
                  <p className="text-white font-medium">{order._id.slice(-8).toUpperCase()}</p>
                </div>
              </div>
              <select
                onChange={(event) => statusHandler(event, order._id)}
                value={order.status}
                className={`px-4 py-2 rounded-lg font-medium outline-none border-2 border-transparent focus:border-white/10 transition-colors ${getStatusColor(order.status)}`}
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>

            {/* Order Content */}
            <div className="p-4">
              <div className="grid gap-4 md:grid-cols-[2fr_1fr_1fr]">
                {/* Customer & Items */}
                <div className="space-y-4">
                  {/* Customer Details */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-400">
                      <FiUser className="w-4 h-4" />
                      <span className="text-white font-medium">
                        {order.address.firstName} {order.address.lastName}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <FiMapPin className="w-4 h-4" />
                      <span>
                        {order.address.street}, {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <FiPhone className="w-4 h-4" />
                      <span>{order.address.phone}</span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-400">Order Items</p>
                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 bg-white/5 p-2 rounded-lg">
                          <img src={item.image} alt={item.name} className="w-10 h-10 rounded object-cover" />
                          <div>
                            <p className="text-white">{item.name}</p>
                            <p className="text-sm text-gray-400">Size: {item.size} × {item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Payment Details */}
                <div className="space-y-3">
                  <p className="text-sm font-medium text-gray-400">Payment Info</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-400">
                      <FiCreditCard className="w-4 h-4" />
                      <span>Method: {order.paymentMethod}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <FiCalendar className="w-4 h-4" />
                      <span>Date: {new Date(order.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white font-medium">
                      <FiTruck className="w-4 h-4" />
                      <span>Status: {order.status}</span>
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="space-y-3">
                  <p className="text-sm font-medium text-gray-400">Order Summary</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-400">
                      <span>Items</span>
                      <span>{order.items.length}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Payment</span>
                      <span>{order.payment ? 'Completed' : 'Pending'}</span>
                    </div>
                    <div className="flex justify-between text-white font-medium">
                      <span>Total Amount</span>
                      <span>{currency}{order.amount}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            No orders found.
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders