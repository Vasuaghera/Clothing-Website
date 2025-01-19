import React from 'react';
import { motion } from 'framer-motion';

const OurPolicy = () => {
    const policies = [
        {
            icon: (
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" 
                          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            ),
            title: "GLOBAL SHIPPING",
            subtitle: "Worldwide Delivery",
            detail: "Free shipping on orders above $200. Express delivery available worldwide."
        },
        {
            icon: (
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" 
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            title: "SECURE PAYMENT",
            subtitle: "100% Protected",
            detail: "SSL secured checkout with all major credit cards and payment methods."
        },
        {
            icon: (
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" 
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
            ),
            title: "EASY RETURNS",
            subtitle: "Hassle-Free Process",
            detail: "Simple returns within 7 days. No questions asked exchange policy."
        }
    ];

    return (
        <section className="py-24 bg-black">
            <div className="max-w-7xl mx-auto px-4">
                {/* Luxury Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <span className="text-white/60 text-sm tracking-[0.4em] uppercase">Experience</span>
                    <h2 className="text-white text-3xl font-light tracking-[0.3em] mt-4 mb-2">
                        LUXURY SERVICES
                    </h2>
                    <p className="text-white/40 text-sm tracking-wider max-w-xl mx-auto">
                        Exceptional service and attention to detail for our distinguished clients
                    </p>
                </motion.div>

                {/* Premium Policy Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {policies.map((policy, index) => (
                        <motion.div
                            key={policy.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="relative overflow-hidden">
                                {/* Main Content */}
                                <div className="p-10 bg-[#111111] border-l border-white/10 
                                              transition-all duration-500 hover:bg-[#141414]">
                                    {/* Icon */}
                                    <div className="mb-8 group-hover:translate-y-[-5px] transition-transform duration-500">
                                        {policy.icon}
                                    </div>

                                    {/* Content */}
                                    <div className="relative">
                                        <h3 className="text-white/80 text-sm tracking-[0.3em] mb-2">
                                            {policy.title}
                                        </h3>
                                        <p className="text-white text-lg font-light tracking-wide mb-4">
                                            {policy.subtitle}
                                        </p>
                                        <p className="text-white/40 text-sm leading-relaxed">
                                            {policy.detail}
                                        </p>
                                    </div>

                                    {/* Decorative Elements */}
                                    <div className="absolute top-0 left-0 w-[2px] h-0 bg-white/20 
                                                  group-hover:h-full transition-all duration-700"></div>
                                    <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-white/20 
                                                  group-hover:w-full transition-all duration-700 delay-100"></div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Elegant Bottom Element */}
                <div className="max-w-xs mx-auto mt-20">
                    <div className="flex items-center justify-center gap-4">
                        <div className="w-full h-[1px] bg-gradient-to-r from-transparent to-white/20"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                        <div className="w-full h-[1px] bg-gradient-to-l from-transparent to-white/20"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurPolicy;
