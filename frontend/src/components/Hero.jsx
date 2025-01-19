import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { assets } from '../assets/assets';

const Hero = () => {
  const {visible} = useContext(ShopContext);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: assets.hero_img ,
      title: "Luxury Defined",
      subtitle: "PREMIUM COLLECTION 2024"
    },
   
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`relative h-screen overflow-hidden ${visible ? 'hidden': ''}`}>
      {/* Background Slider */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            currentSlide === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img 
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center filter brightness-[0.3]"
          />
        </div>
      ))}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent opacity-90"></div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl" data-aos="fade-up">
            <div className='flex items-center gap-3 mb-6'>
              <div className='w-12 h-[2px] bg-white'></div>
              <p className='font-medium text-sm md:text-base text-gray-200 tracking-[0.2em]'>
                {slides[currentSlide].subtitle}
              </p>
            </div>

            <h1 className="prata-regular text-5xl md:text-7xl lg:text-8xl text-white leading-tight mb-8"
                data-aos="fade-right" 
                data-aos-delay="200">
              {slides[currentSlide].title}
            </h1>

            <p className="text-gray-200 text-lg mb-10 max-w-md leading-relaxed"
               data-aos="fade-up" 
               data-aos-delay="400">
              Experience the epitome of luxury fashion with our meticulously curated collection. 
              Where style meets sophistication.
            </p>

            <div className="flex gap-6" data-aos="fade-up" data-aos-delay="600">
              
              <Link 
                to="/about" 
                className="px-10 py-4 border border-white text-white font-medium hover:bg-white hover:text-black transition-all duration-300 rounded-sm"
              >
                EXPLORE NOW
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Hero;