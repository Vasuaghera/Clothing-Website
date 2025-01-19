import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const [visible, setVisible] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes('collection')) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [location]);

    return (
        <AnimatePresence>
            {showSearch && visible && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="fixed top-[85px] left-0 right-0 z-40 bg-black/95 backdrop-blur-md 
                             border-t border-b border-white/10"
                >
                    <div className="max-w-7xl mx-auto px-4 py-6">
                        <div className="relative">
                            {/* Search Input */}
                            <div className="relative max-w-2xl mx-auto">
                                <input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 text-white px-12 py-4 
                                             outline-none focus:border-white/20 transition-colors duration-300
                                             placeholder:text-white/30 text-sm tracking-wider"
                                    type="text"
                                    placeholder="Search products..."
                                    autoFocus
                                />
                                
                                {/* Search Icon */}
                                <svg 
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth="1.5" 
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>

                                {/* Clear Input Button */}
                                {search && (
                                    <button
                                        onClick={() => setSearch('')}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 
                                                 text-white/40 hover:text-white transition-colors duration-300"
                                    >
                                        <svg 
                                            className="w-5 h-5" 
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                        >
                                            <path 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                strokeWidth="1.5" 
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                )}
                            </div>

                            {/* Close Search Button */}
                            <button
  onClick={() => setShowSearch(false)}
  className="absolute -right-12 top-1/2 -translate-y-1/2 
            bg-black text-white/40 hover:text-white transition-colors duration-300 rounded-full p-2"
>
  <svg 
    className="w-5 h-5" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth="1.5" 
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
</button>

                        </div>


                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SearchBar;
