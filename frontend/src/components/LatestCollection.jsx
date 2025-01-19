import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const LatestCollection = () => {
    const [latestProducts, setLatestProducts] = useState([]);
    const { products, visible } = useContext(ShopContext);

    useEffect(() => {
        if (products.length > 0) {
            setLatestProducts(products.slice(0, 12)); // Display 12 items
        }
    }, [products]);

    return (
        <section className="py-16 px-4 bg-black">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto mb-12 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-white text-3xl md:text-4xl font-light tracking-[0.2em] mb-4">
                        LATEST COLLECTION
                    </h2>
                    <div className="w-20 h-[1px] bg-white/30 mx-auto mb-6"></div>
                    <p className="text-gray-400 text-sm tracking-wider">
                        Discover Our Newest Arrivals
                    </p>
                </motion.div>
            </div>

            {/* Products Grid */}
            <div className={`max-w-7xl mx-auto ${visible ? 'hidden' : ''}`}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    {latestProducts.map((item, index) => (
                        <motion.div
                            key={item._id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link to={`/product/${item._id}`} className="group block">
                                {/* Product Image */}
                                <div className="relative overflow-hidden bg-gray-900 aspect-[3/4]">
                                    <img
                                        src={item.image[0]}
                                        alt={item.name}
                                        className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                                    />
                                    {/* Quick View Overlay */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <span className="text-white text-sm tracking-wider px-4 py-2 border border-white/30 hover:bg-white hover:text-black transition-colors duration-300">
                                            QUICK VIEW
                                        </span>
                                    </div>
                                </div>

                                {/* Product Info */}
                                <div className="mt-4 text-center">
                                    <h3 className="text-white text-sm tracking-wider mb-2 group-hover:text-gray-300 transition-colors duration-300">
                                        {item.name}
                                    </h3>
                                    <div className="text-gray-400 text-sm font-light">
                                        ${item.price.toFixed(2)}
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LatestCollection;
