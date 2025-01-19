import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'
import AOS from 'aos';
import 'aos/dist/aos.css'
import { useEffect } from 'react';
const Contact = () => {
   useEffect(() => {
            AOS.init({
              duration: 700, 
            });
          }, []);
  return (
    <div>
      
      <div className='text-center text-2xl pt-10 border-t'>
      <div  data-aos="zoom-in"><Title text1={'CONTACT'} text2={'US'} /></div>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img  data-aos="fade-right"  className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p data-aos="fade-left" className='font-semibold text-xl text-gray-600'>Our Service</p>
          <p data-aos="fade-left" className=' text-gray-500'>Tel: (415) 555-0132 <br /> Email: frenchEliteService@gmail.com</p>
          <p data-aos="fade-left" className='font-semibold text-xl text-gray-600'>Careers at French Elite</p>
          <p data-aos="fade-left" className=' text-gray-500'>Learn more about our teams and job openings.</p>
          <button data-aos="fade-left" className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>
      </div>

      <NewsletterBox/>
    </div>
  )
}

export default Contact
