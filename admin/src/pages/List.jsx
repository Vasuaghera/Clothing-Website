import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { FiTrash2, FiImage, FiTag, FiDollarSign, FiPackage } from 'react-icons/fi'

const List = ({ token }) => {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setList(response.data.products.reverse())
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/product/remove',
        { id },
        { headers: { token } }
      )

      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Products List</h2>
        <span className="text-sm text-gray-400">{list.length} products</span>
      </div>

      <div className="bg-zinc-900/50 rounded-xl border border-white/5 overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-[1fr_2fr_1fr_1fr_auto] gap-4 p-4 border-b border-white/5 bg-black/20">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-400">
            <FiImage className="w-4 h-4" />
            <span>Image</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-gray-400">
            <FiTag className="w-4 h-4" />
            <span>Product Details</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-gray-400">
            <FiPackage className="w-4 h-4" />
            <span>Category</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-gray-400">
            <FiDollarSign className="w-4 h-4" />
            <span>Price</span>
          </div>
          <div className="w-20 text-center text-sm font-medium text-gray-400">
            Action
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-white/5">
          {list.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_2fr_1fr_1fr_auto] gap-4 p-4 items-center hover:bg-white/5 transition-colors"
            >
              {/* Image */}
              <div className="relative group">
                <img
                  src={item.image[0]}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg border border-white/5"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <span className="text-xs text-white">View</span>
                </div>
              </div>

              {/* Product Details */}
              <div>
                <h3 className="font-medium text-white truncate">{item.name}</h3>
                <p className="text-sm text-gray-400 truncate">{item.description}</p>
              </div>

              {/* Category */}
              <div>
                <span className="px-3 py-1 bg-white/5 rounded-full text-sm text-gray-300">
                  {item.category}
                </span>
                <p className="text-xs text-gray-400 mt-1">{item.subCategory}</p>
              </div>

              {/* Price */}
              <div className="font-medium text-white">
                {currency}
                {item.price}
              </div>

              {/* Action */}
              <div className="w-20 text-center">
                <button
                  onClick={() => removeProduct(item._id)}
                  className="p-2 hover:bg-red-500/10 rounded-lg transition-colors group"
                >
                  <FiTrash2 className="w-5 h-5 text-red-500 group-hover:text-red-400 transition-colors" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {list.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          No products found. Add some products to see them here.
        </div>
      )}
    </div>
  )
}

export default List