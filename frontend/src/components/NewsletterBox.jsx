import React, { useState } from 'react';
import { motion } from 'framer-motion';

const NewsletterBox = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const onSubmitHandler = (event) => {
        event.preventDefault();
        setIsSubmitted(true);
        // Add your newsletter subscription logic here
        setEmail('');
        setTimeout(() => setIsSubmitted(false), 3000);
    };

    return (
        <section className="py-24 bg-black relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0ibm9uZSI+PC9yZWN0Pgo8cGF0aCBkPSJNMzAgMzBtLTI4IDBhMjggMjggMCAxIDAgNTYgMCAyOCAyOCAwIDEgMC01NiAwIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMC41IiBmaWxsPSJub25lIiBvcGFjaXR5PSIwLjMiPjwvcGF0aD4KPC9zdmc+')] bg-repeat opacity-20"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 relative">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto"
                >
                    {/* Header */}
                    <span className="text-white/60 text-sm tracking-[0.4em] uppercase">Newsletter</span>
                    <h2 className="text-3xl font-light tracking-[0.2em] text-white mt-4 mb-6">
                        STAY INFORMED
                    </h2>
                    <p className="text-white/60 text-sm tracking-wider mb-12 max-w-xl mx-auto">
                        Subscribe to our newsletter and be the first to receive exclusive offers, 
                        early access to new collections, and fashion insights.
                    </p>

                    {/* Newsletter Form */}
                    <div className="relative">
                        <form onSubmit={onSubmitHandler} className="relative">
                            <div className="flex flex-col sm:flex-row gap-4 items-stretch max-w-xl mx-auto">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                    className="flex-1 bg-white/5 border border-white/10 text-white px-6 py-4 
                                             outline-none focus:border-white/20 transition-colors duration-300
                                             placeholder:text-white/30 text-sm tracking-wider"
                                />
                                <button
            type="submit"
            className="group relative overflow-hidden bg-white text-black px-8 py-4 
                     text-sm tracking-[0.2em] transition-transform duration-300 
                     hover:scale-105"
        >
            <div className="absolute inset-0 bg-black transform translate-y-full 
                          group-hover:translate-y-0 transition-transform duration-300"></div>
            <span className="relative z-10 group-hover:text-white 
                           transition-colors duration-300">
                SUBSCRIBE
            </span>
        </button>
                            </div>
                        </form>

                        {/* Success Message */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: isSubmitted ? 1 : 0, y: isSubmitted ? 0 : 10 }}
                            transition={{ duration: 0.3 }}
                            className="absolute -bottom-8 left-0 right-0 text-center"
                        >
                            {isSubmitted && (
                                <p className="text-white/60 text-sm tracking-wider">
                                    Thank you for subscribing!
                                </p>
                            )}
                        </motion.div>
                    </div>

                    {/* Bottom Decorative Element */}
                    <div className="max-w-xs mx-auto mt-20">
                        <div className="flex items-center justify-center gap-4">
                            <div className="w-full h-[1px] bg-gradient-to-r from-transparent to-white/20"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                            <div className="w-full h-[1px] bg-gradient-to-l from-transparent to-white/20"></div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default NewsletterBox;
