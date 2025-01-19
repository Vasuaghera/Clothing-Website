import React from 'react'
import { assets } from '../assets/assets'
import { FiMenu, FiBell, FiLogOut, FiUser } from 'react-icons/fi'

const Navbar = ({ setToken, toggleSidebar, isSidebarOpen }) => {
  const handleLogout = () => {
    localStorage.clear()
    setToken('')
  }

  return (
    <nav className="h-16 px-6 flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center space-x-6">
        {/* Mobile Menu Toggle */}
        <button 
          onClick={toggleSidebar}
          className="p-2 hover:bg-white/5 rounded-lg transition-colors duration-200"
        >
          <FiMenu className="w-6 h-6 text-white" />
        </button>

        {/* Logo */}
        <div className="flex items-center space-x-3">
          
          <span className="text-lg font-semibold text-white hidden sm:block">
            Forever Admin
          </span>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative">
          <button className="p-2 hover:bg-white/5 rounded-lg transition-colors duration-200">
            {/* <FiBell className="w-5 h-5 text-gray-300" /> */}
            {/* Notification Badge */}
            <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></span>
          </button>
        </div>

        {/* Admin Profile */}
        <div className="flex items-center space-x-3">
          <div className="hidden md:block text-right">
            <p className="text-sm font-medium text-white">Admin User</p>
            <p className="text-xs text-gray-400">Super Admin</p>
          </div>
          <div className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center">
            <FiUser className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors duration-200 group"
        >
          <FiLogOut className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors duration-200" />
          <span className="hidden sm:block text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-200">
            Logout
          </span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar