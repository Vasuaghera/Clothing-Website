import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { FiUpload, FiDollarSign, FiBox, FiType, FiAlignLeft, FiTag, FiLayers } from 'react-icons/fi'

const Add = ({token}) => {
  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("Men")
  const [subCategory, setSubCategory] = useState("Topwear")
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSizes] = useState([])

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestseller", bestseller)
      formData.append("sizes", JSON.stringify(sizes))

      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)

      const response = await axios.post(backendUrl + "/api/product/add", formData, {headers: {token}})

      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
        setSizes([])
        setBestseller(false)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-8 text-white">Add New Product</h2>
      
      <form onSubmit={onSubmitHandler} className="space-y-8">
        {/* Image Upload Section */}
        <div className="bg-zinc-900/50 p-6 rounded-xl border border-white/5">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
            <FiUpload className="w-5 h-5" />
            Product Images
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { state: image1, setState: setImage1, id: "image1" },
              { state: image2, setState: setImage2, id: "image2" },
              { state: image3, setState: setImage3, id: "image3" },
              { state: image4, setState: setImage4, id: "image4" },
            ].map((image, index) => (
              <label
                key={index}
                htmlFor={image.id}
                className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group border border-white/5"
              >
                <div className={`
                  absolute inset-0 
                  ${!image.state ? 'bg-black' : ''}
                  transition-all duration-300
                `}>
                  {!image.state ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white/50">
                      <FiUpload className="w-6 h-6 mb-2" />
                      <span className="text-xs">Upload Image</span>
                    </div>
                  ) : (
                    <img
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      src={URL.createObjectURL(image.state)}
                      alt=""
                    />
                  )}
                </div>
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex flex-col items-center">
                    <FiUpload className="w-6 h-6 text-white mb-2" />
                    <span className="text-xs text-white">Change Image</span>
                  </div>
                </div>
                <input
                  onChange={(e) => image.setState(e.target.files[0])}
                  type="file"
                  id={image.id}
                  className="hidden"
                  accept="image/*"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="bg-zinc-900/50 p-6 rounded-xl border border-white/5 space-y-6">
          <h3 className="text-lg font-semibold mb-4 text-white">Product Details</h3>
          
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              <FiType className="inline-block mr-2" />
              Product Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-black/20 border border-white/5 rounded-lg focus:outline-none focus:border-white/20 text-white"
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              <FiAlignLeft className="inline-block mr-2" />
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 bg-black/20 border border-white/5 rounded-lg focus:outline-none focus:border-white/20 text-white h-32"
              placeholder="Enter product description"
              required
            />
          </div>

          {/* Categories and Price */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                <FiTag className="inline-block mr-2" />
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 bg-black/20 border border-white/5 rounded-lg focus:outline-none focus:border-white/20 text-white"
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                <FiLayers className="inline-block mr-2" />
                Sub Category
              </label>
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full px-4 py-3 bg-black/20 border border-white/5 rounded-lg focus:outline-none focus:border-white/20 text-white"
              >
                <option value="Topwear">Topwear</option>
                <option value="Bottomwear">Bottomwear</option>
                <option value="Winterwear">Winterwear</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                <FiDollarSign className="inline-block mr-2" />
                Price
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-3 bg-black/20 border border-white/5 rounded-lg focus:outline-none focus:border-white/20 text-white"
                placeholder="0.00"
                required
              />
            </div>
          </div>

          {/* Sizes */}
          <div>
            <label className="block text-sm font-medium mb-3 text-gray-300">
              <FiBox className="inline-block mr-2" />
              Available Sizes
            </label>
            <div className="flex flex-wrap gap-3">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSizes(prev => 
                    prev.includes(size) 
                      ? prev.filter(item => item !== size)
                      : [...prev, size]
                  )}
                  className={`
                    px-4 py-2 rounded-lg font-medium transition-colors
                    ${sizes.includes(size)
                      ? 'bg-white text-black'
                      : 'bg-black/20 text-white border border-white/5 hover:border-white/20'
                    }
                  `}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Bestseller Toggle */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="bestseller"
              checked={bestseller}
              onChange={() => setBestseller(prev => !prev)}
              className="w-4 h-4 rounded border-white/5 bg-black/20 text-white focus:ring-0"
            />
            <label htmlFor="bestseller" className="text-sm font-medium text-gray-300 cursor-pointer">
              Add to bestseller collection
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors"
        >
          Add Product
        </button>
      </form>
    </div>
  )
}

export default Add