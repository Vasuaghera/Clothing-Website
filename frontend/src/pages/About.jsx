import React, { useEffect } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'
import AOS from 'aos'
import 'aos/dist/aos.css'

// Define features array
const features = [
  {
    title: "Premium Quality",
    description: "Every product meets our exceptional standards of quality and craftsmanship.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  },
  {
    title: "Exclusive Design",
    description: "Discover unique pieces that blend style with unmatched sophistication.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  },
  {
    title: "Expert Support",
    description: "Our dedicated team ensures your shopping experience is nothing short of perfect.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
  }
]

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    })
  }, [])

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#333,transparent_70%)]"/>
        <div className="container mx-auto px-4 pt-20 pb-32 relative">
          <div className="text-center" data-aos="fade-down">
            <Title text1={'ABOUT'} text2={'FOREVER'} />
            <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg font-light">
              Redefining luxury shopping since 2024
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          {/* Image Section */}
          <div className="relative group" data-aos="fade-right">
            <div className="absolute inset-0 bg-white/5 rounded-2xl transform rotate-3 transition-transform duration-300 group-hover:rotate-0"/>
            <img 
              className="relative rounded-2xl shadow-[0_0_25px_rgba(255,255,255,0.1)] transition-all duration-500 group-hover:scale-[1.02]" 
              src={assets.about_img} 
              alt="About Forever" 
            />
            <div className="absolute -bottom-6 right-6 bg-black px-8 py-4 rounded-full border border-white/10 shadow-lg">
              <span className="text-white/90 font-medium tracking-wider">EST. 2024</span>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-10" data-aos="fade-left">
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
              <h3 className="text-2xl font-bold text-white/90 mb-6">Our Legacy</h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                Forever emerged from a vision to create more than just a shopping destination. We crafted a sanctuary where luxury meets innovation, where every click leads to an discovery of exceptional products.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Our curated collection represents the pinnacle of style and quality, carefully selected to exceed the expectations of our discerning clientele.
              </p>
            </div>

            <div className="bg-gradient-to-r from-white/10 to-transparent p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-white/90 mb-4">Our Promise</h3>
              <p className="text-gray-400 leading-relaxed">
                To deliver an unparalleled shopping experience that transforms the ordinary into the extraordinary.
              </p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-32">
          <div className="text-center mb-16" data-aos="fade-up">
            <Title text1={'THE'} text2={'EXPERIENCE'} />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="group relative bg-gradient-to-b from-white/5 to-transparent p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2 border border-white/5 hover:border-white/10"
              >
                <div className="w-16 h-16 flex items-center justify-center mb-6 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white/90 mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="pb-32" data-aos="fade-up">
          <NewsletterBox />
        </div>
      </div>
    </div>
  )
}

export default About
