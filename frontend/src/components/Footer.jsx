import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';
import { RiInstagramFill } from "react-icons/ri";
import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <footer className="bg-black pt-20 pb-6">
            <div className="max-w-7xl mx-auto px-4">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/10">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <Link to='/'>
                                                <img className='w-36 mb-10 -mt-10' src={assets.logo} alt="" style={{ filter: 'invert(1)' }} />
                                            </Link>
                            <p className="text-white/60 text-sm leading-relaxed tracking-wide">
                                At French Elite, we specialize in offering the finest and most stylish topwear 
                                for men and women. Our collection blends timeless elegance with modern trends, 
                                ensuring every piece stands out in quality and design.
                            </p>
                        </motion.div>
                    </div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h3 className="text-white text-sm tracking-[0.3em] mb-6">QUICK LINKS</h3>
                        <ul className="space-y-3">
                            {['Home', 'Collection', 'About', 'Contact'].map((item, index) => (
                                <li key={index}>
                                    <Link 
                                        to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                        className="text-white/60 text-sm tracking-wider hover:text-white 
                                                 transition-colors duration-300 inline-block"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h3 className="text-white text-sm tracking-[0.3em] mb-6">GET IN TOUCH</h3>
                        <ul className="space-y-3">
                            <li className="text-white/60 text-sm tracking-wider">
                                <span className="block text-white/40 text-xs tracking-[0.2em] mb-1">CALL US</span>
                                +1-212-456-7890
                            </li>
                            <li className="text-white/60 text-sm tracking-wider">
                                <span className="block text-white/40 text-xs tracking-[0.2em] mb-1">EMAIL</span>
                                frenchEliteService@gmail.com
                            </li>
                            <li className="pt-4">
                                <a 
                                    href="https://www.instagram.com/frencheliteindia/" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-block group"
                                >
                                    <RiInstagramFill 
                                        size={24} 
                                        className="text-white/60 group-hover:text-white transition-colors duration-300" 
                                    />
                                </a>
                            </li>
                        </ul>
                    </motion.div>
                </div>

                {/* Copyright */}
                <div className="pt-6">
                    <p className="text-white/40 text-xs tracking-wider text-center">
                        © 2024 French Elite. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
