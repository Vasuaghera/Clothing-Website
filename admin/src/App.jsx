import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = '$'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  return (
    <div className='min-h-screen bg-black text-white'>
      <ToastContainer 
        theme="dark"
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        className="mt-16"
      />
      
      {token === "" ? (
        <div className="min-h-screen flex items-center justify-center">
          <Login setToken={setToken} />
        </div>
      ) : (
        <div className='flex'>
          {/* Sidebar - Desktop */}
          <aside 
            className={`
              hidden md:block
              ${sidebarOpen ? 'w-80' : 'w-20'} 
              min-h-screen
              bg-zinc-900/50
              border-r border-white/5
              transition-all duration-300
              fixed left-0 top-0
            `}
          >
            <Sidebar isCollapsed={!sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          </aside>

          {/* Main Content */}
          <main className={`flex-1 min-h-screen ${sidebarOpen ? 'md:ml-80' : 'md:ml-20'} transition-all duration-300`}>
            {/* Top Navigation */}
            <nav className='h-16 bg-zinc-900/50 border-b border-white/5 sticky top-0 z-40 backdrop-blur-sm'>
              <Navbar 
                setToken={setToken} 
                toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                isSidebarOpen={sidebarOpen}
              />
            </nav>

            {/* Page Content */}
            <div className='p-6 max-w-[1600px] mx-auto'>
              {/* Mobile Sidebar Toggle */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className='md:hidden mb-4 p-2 rounded-lg hover:bg-white/5 transition-colors'
              >
                <svg 
                  className="w-6 h-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              {/* Content Area */}
              <div className='space-y-6'>
                {/* Page Header */}
                <header className='bg-zinc-900/30 rounded-xl border border-white/5 p-6'>
                  <Routes>
                    <Route path='/add' element={<Add token={token} />} />
                    <Route path='/list' element={<List token={token} />} />
                    <Route path='/orders' element={<Orders token={token} />} />
                  </Routes>
                </header>
              </div>
            </div>
          </main>

          {/* Mobile Sidebar */}
          <div 
            className={`
              fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden z-50
              transition-opacity duration-300
              ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
            `}
            onClick={() => setSidebarOpen(false)}
          >
            <div 
              className={`
                w-80 h-full bg-zinc-900 border-r border-white/5
                transition-transform duration-300
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
              `}
              onClick={e => e.stopPropagation()}
            >
              <Sidebar isCollapsed={false} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App