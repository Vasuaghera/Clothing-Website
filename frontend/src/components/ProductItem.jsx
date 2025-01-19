import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProductItem = ({ id, image, name, price }) => {
    const { currency } = useContext(ShopContext);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <Link 
                onClick={() => scrollTo(0, 0)} 
                to={`/product/${id}`}
                className="block group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Image Container */}
                <div className="relative overflow-hidden bg-[#111111]">
                    {/* Main Image */}
                    <motion.div
                        animate={{ 
                            scale: isHovered ? 1.05 : 1,
                            opacity: isHovered ? 0.9 : 1
                        }}
                        transition={{ duration: 0.4 }}
                        className="aspect-[3/4]"
                    >
                        <img 
                            src={image[0]} 
                            alt={name}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    {/* Quick View Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-black/20 flex items-center justify-center"
                    >
                        <span className="px-6 py-2 bg-white/10 backdrop-blur-sm text-white text-xs tracking-[0.2em]
                                     border border-white/20">
                            QUICK VIEW
                        </span>
                    </motion.div>
                </div>

                {/* Product Info */}
                <div className="mt-4 space-y-1">
                    <motion.h3
                        animate={{ 
                            color: isHovered ? 'rgb(255, 255, 255)' : 'rgb(200, 200, 200)'
                        }}
                        transition={{ duration: 0.3 }}
                        className="text-sm tracking-wide font-light"
                    >
                        {name}
                    </motion.h3>
                    
                    <div className="flex items-center justify-between">
                        <p className="text-white text-sm tracking-wider">
                            {currency}{price}
                        </p>
                        
                        {/* Arrow Icon */}
                        <motion.svg
                            animate={{ 
                                x: isHovered ? 4 : 0,
                                opacity: isHovered ? 1 : 0
                            }}
                            transition={{ duration: 0.3 }}
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth="1.5" 
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                        </motion.svg>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default ProductItem;
