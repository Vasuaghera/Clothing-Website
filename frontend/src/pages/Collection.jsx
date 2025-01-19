import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import { motion, AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Collection = () => {
    useEffect(() => {
        AOS.init({ duration: 700 });
    }, []);

    const { products, search, showSearch } = useContext(ShopContext);
    const [showFilter, setShowFilter] = useState(false);
    const [showSort, setShowSort] = useState(false);
    const [filterProducts, setFilterProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sortType, setSortType] = useState('relevant');

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showSort && !event.target.closest('.sort-dropdown')) {
                setShowSort(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showSort]);

    // Filter Handlers
    const toggleCategory = (e) => {
        if (category.includes(e.target.value)) {
            setCategory(prev => prev.filter(item => item !== e.target.value));
        } else {
            setCategory(prev => [...prev, e.target.value]);
        }
    };

    const toggleSubCategory = (e) => {
        if (subCategory.includes(e.target.value)) {
            setSubCategory(prev => prev.filter(item => item !== e.target.value));
        } else {
            setSubCategory(prev => [...prev, e.target.value]);
        }
    };

    // Filter Logic
    const applyFilter = () => {
        let productsCopy = products.slice();

        if (showSearch && search) {
            productsCopy = productsCopy.filter(item => 
                item.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (category.length > 0) {
            productsCopy = productsCopy.filter(item => 
                category.includes(item.category)
            );
        }

        if (subCategory.length > 0) {
            productsCopy = productsCopy.filter(item => 
                subCategory.includes(item.subCategory)
            );
        }

        setFilterProducts(productsCopy);
    };

    // Sort Logic
    const sortProduct = () => {
        let fpCopy = filterProducts.slice();

        switch (sortType) {
            case 'low-high':
                setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
                break;
            case 'high-low':
                setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
                break;
            case 'newest':
                setFilterProducts(fpCopy.sort((a, b) => (
                    new Date(b.createdAt) - new Date(a.createdAt)
                )));
                break;
            case 'bestsellers':
                setFilterProducts(fpCopy.sort((a, b) => (b.sales - a.sales)));
                break;
            default:
                applyFilter();
                break;
        }
    };

    useEffect(() => {
        applyFilter();
    }, [category, subCategory, search, showSearch, products]);

  

    useEffect(() => {
        sortProduct();
    }, [sortType]);

    return (
        <div className="min-h-screen bg-black py-12">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <Title text1="DISCOVER" text2="OUR COLLECTION" variant="luxury" />

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filter Sidebar */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:w-64 flex-shrink-0"
                    >
                        {/* Filter Toggle for Mobile */}
                        <button 
                            onClick={() => setShowFilter(!showFilter)}
                            className="lg:hidden w-full flex items-center justify-between px-4 py-3 
                                     bg-white/5 border border-white/10 text-white mb-4"
                        >
                            <span className="text-sm tracking-wider">FILTERS</span>
                            <svg 
                                className={`w-4 h-4 transform transition-transform ${showFilter ? 'rotate-180' : ''}`}
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Filter Content */}
                        <AnimatePresence>
                            {(showFilter || window.innerWidth >= 1024) && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="space-y-6"
                                >
                                    {/* Categories */}
                                    <div className="bg-white/5 border border-white/10 p-6">
                                        <h3 className="text-white text-sm tracking-[0.2em] mb-4">CATEGORIES</h3>
                                        <div className="space-y-3">
                                            {['Men', 'Women', 'Kids'].map((item) => (
                                                <label key={item} className="flex items-center gap-3 group cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        value={item}
                                                        onChange={toggleCategory}
                                                        checked={category.includes(item)}
                                                        className="w-4 h-4 bg-transparent border border-white/20 
                                                                 checked:bg-white checked:border-white"
                                                    />
                                                    <span className="text-white/60 text-sm tracking-wider 
                                                                   group-hover:text-white transition-colors duration-300">
                                                        {item}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Types */}
                                    <div className="bg-white/5 border border-white/10 p-6">
                                        <h3 className="text-white text-sm tracking-[0.2em] mb-4">TYPES</h3>
                                        <div className="space-y-3">
                                            {['Topwear', 'Bottomwear', 'Winterwear'].map((item) => (
                                                <label key={item} className="flex items-center gap-3 group cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        value={item}
                                                        onChange={toggleSubCategory}
                                                        checked={subCategory.includes(item)}
                                                        className="w-4 h-4 bg-transparent border border-white/20 
                                                                 checked:bg-white checked:border-white"
                                                    />
                                                    <span className="text-white/60 text-sm tracking-wider 
                                                                   group-hover:text-white transition-colors duration-300">
                                                        {item}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Products Grid */}
                   {/* Products Grid */}
<div className="flex-1">
    {/* Luxury Sort Options */}
    <div className="flex justify-end mb-8">
        <div className="relative group sort-dropdown">
            <button
                onClick={() => setShowSort(!showSort)}
                className="flex items-center gap-4 bg-[#111111] border border-white/10 
                          px-8 py-4 min-w-[240px] group
                          transition-all duration-300 hover:bg-[#111111] hover:border-white/20"
            >
                {/* Sort Icon */}
                <svg
                    className="w-4 h-4 text-white/40 
                             transition-colors duration-300 group-hover:text-white/60"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M3 4h13M3 8h9M3 12h5m0 0v6m0-6h14"
                    />
                </svg>

                {/* Sort Text */}
                <span className="flex-1 text-left">
                    <span className="block text-[10px] text-white/40 tracking-[0.2em] mb-0.5 group-hover:text-white/60">
                        SORT BY
                    </span>
                    <span className="block text-sm text-white tracking-[0.1em]">
                        {sortType === 'relevant' && 'RELEVANT'}
                        {sortType === 'low-high' && 'PRICE: LOW TO HIGH'}
                        {sortType === 'high-low' && 'PRICE: HIGH TO LOW'}
                        {sortType === 'newest' && 'NEWEST ARRIVALS'}
                        {sortType === 'bestsellers' && 'BESTSELLERS'}
                    </span>
                </span>

                {/* Arrow Icon */}
                <svg
                    className={`w-4 h-4 text-white/40  
                             transition-all duration-300 transform ${showSort ? 'rotate-180' : ''} group-hover:text-white/60`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M19 9l-7 7-7-7"
                    />
                </svg>

                {/* Animated Border Line */}
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20 
                             scale-x-0 group-hover:scale-x-100 transition-transform 
                             duration-500 origin-left"/>
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {showSort && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-full mt-2 w-[240px] bg-[#111111] 
                                 border border-white/10 shadow-xl shadow-black/50 z-50"
                    >
                        {[
                            { value: 'relevant', label: 'RELEVANT' },
                            { value: 'low-high', label: 'PRICE: LOW TO HIGH' },
                            { value: 'high-low', label: 'PRICE: HIGH TO LOW' },
                            { value: 'newest', label: 'NEWEST ARRIVALS' },
                            { value: 'bestsellers', label: 'BESTSELLERS' }
                        ].map((option, index) => (
                            <motion.button
                                key={option.value}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => {
                                    setSortType(option.value);
                                    setShowSort(false);
                                }}
                                className={`w-full text-left px-8 py-4 text-sm tracking-wider
                                          transition-all duration-300 flex items-center justify-between
                                          bg-[#111111] text-white hover:bg-[#222222] hover:text-white`}
                            >
                                <span>{option.label}</span>
                                {sortType === option.value && (
                                    <motion.svg
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.5"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </motion.svg>
                                )}
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    </div>

    {/* Products Grid */}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {filterProducts.map((item, index) => (
            <ProductItem
                key={item._id}
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image}
            />
        ))}
    </div>

    {/* No Results Message */}
    {filterProducts.length === 0 && (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
        >
            <p className="text-white/60 text-sm tracking-wider">
                No products found matching your criteria.
            </p>
        </motion.div>
    )}
</div>

                </div>
            </div>
        </div>
    );
};

export default Collection;
