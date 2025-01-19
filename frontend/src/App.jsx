import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Product from './pages/Product'
import Footer from './components/Footer'
import PlaceOrder from './pages/PlaceOrder'
import Login from './pages/Login'
import Orders from './pages/Orders'
import SearchBar from './components/SearchBar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OtherPage from './components/OtherPage'
import Profile from './pages/Profile'
import Pripolicy from './pages/Pripolicy'
import { useLocation} from 'react-router-dom';
import { useEffect } from 'react';
const App = () => {
  const location = useLocation();

  useEffect(() => {
      // Prevent page from scrolling to the top when navigating
      window.scrollTo(0, 0);
  }, [location]);
  return (
    <div className='bg-black text-white min-h-screen'>
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        <ToastContainer 
          theme="dark"
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
        />
        <Navbar />
        <SearchBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/collection' element={<Collection />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/place-order' element={<PlaceOrder />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/privacy-policy' element={<Pripolicy/>}/>
          <Route path='/*' element={<OtherPage/>}/>
        </Routes>
        <Footer />
      </div>
    </div>
  )
}

export default App
