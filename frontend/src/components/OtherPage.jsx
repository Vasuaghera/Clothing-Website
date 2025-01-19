import React from 'react'
import { assets } from '../assets/assets'
import { div } from 'motion/react-client'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css'
import { useEffect } from 'react';
const OtherPage = () => {
      useEffect(() => {
            AOS.init({
              duration: 700, 
            });
          }, []);
  const {visible} = useContext(ShopContext) ;
    return (
    <div data-aos="zoom-in" >
        
        <div  className='relative'>
            <img className='mx-auto w-[40rem]' src="src\assets\404.png" alt="" />
        </div>
        <div className='absolute -translate-y-[6rem] translate-x-[7rem]'>
        <Link to="/login" class={`relative  inline-block text-lg group ${visible ? 'hidden' : ''}`}>
    <span class="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
        <span class="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
        <span class="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
        <span class="relative">HOME PAGE</span>
    </span>
    <span class="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
</Link>
    
        </div> 
    </div>
  )
}

export default OtherPage