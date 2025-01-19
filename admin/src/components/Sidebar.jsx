import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { assets } from '../assets/assets'
import { FiPlusCircle, FiList, FiShoppingBag, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const [activeMenu, setActiveMenu] = useState(null)
  const location = useLocation()

  const menuItems = [
    {
      title: 'Add Items',
      icon: <FiPlusCircle className="w-5 h-5" />,
      path: '/add',
    },
    {
      title: 'List Items',
      icon: <FiList className="w-5 h-5" />,
      path: '/list',
    },
    {
      title: 'Orders',
      icon: <FiShoppingBag className="w-5 h-5" />,
      path: '/orders',
    },
  ]

  return (
    <div className="h-full flex flex-col bg-zinc-900">
      {/* Sidebar Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-white/5">
        <div className="flex items-center space-x-3">
         
        </div>
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-white/5 rounded-lg transition-colors duration-200"
        >
          {isCollapsed ? (
            <FiChevronRight className="w-5 h-5 text-gray-400" />
          ) : (
            <FiChevronLeft className="w-5 h-5 text-gray-400" />
          )}
        </button>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path
          
          return (
            <NavLink
            key={index}
            to={item.path}
            className={`flex items-center space-x-3 px-3 py-3 rounded-lg
              transition-all duration-200
              ${isActive ? 'bg-gray-600 text-white' : 'text-gray-400 group-hover:text-white'}
              ${isCollapsed ? 'justify-center' : ''}
              group relative
              outline-none
            `}
            style={{ WebkitTapHighlightColor: 'transparent' }}
            onMouseEnter={() => setActiveMenu(index)}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <div className={`flex items-center ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
              {item.icon}
            </div>
          
            {!isCollapsed && (
              <span className={`font-medium ${isActive ? 'text-white' : ''}`}>
                {item.title}
              </span>
            )}
          
            {/* Tooltip for collapsed state */}
            {isCollapsed && activeMenu === index && (
              <div className="absolute left-full ml-3 px-3 py-2 bg-zinc-800 text-white text-sm rounded-lg whitespace-nowrap shadow-lg border border-white/10 z-50">
                {item.title}
              </div>
            )}
          </NavLink>
          
          
          )
        })}
      </div>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-white/5">
        <div className={`
          flex items-center space-x-3
          px-3 py-3 rounded-lg
          bg-white/5 hover:bg-white/10
          transition-colors duration-200
          ${isCollapsed ? 'justify-center' : ''}
        `}>
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <span className="text-sm font-medium text-white">A</span>
          </div>
          {!isCollapsed && (
            <div className="flex-1">
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-xs text-gray-400">admin@forever.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Sidebar