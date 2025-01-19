import React, { useContext, useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';

const Navbar = () => {
    const { visible, setVisible, token, backendUrl, userPresent, setUserPresent, setShowSearch, navigate, getCartCount } = useContext(ShopContext);
    const location = useLocation();
    
    const handleClick = () => {
        // Try multiple scroll methods for better browser compatibility
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Fallback method
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        
        setVisible(false);
    };

    // Add effect to scroll to top on route change
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }, [location.pathname]);

    useEffect(() => {
        if (visible) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [visible]);

    return (
        <div className='fixed top-0 left-0 right-0 z-50 bg-black'>
            <div className='flex items-center justify-between py-5 font-medium px-4 max-w-7xl mx-auto'>
                <Link to='/' onClick={handleClick}>
                    <img className='w-36' src={assets.logo} alt="" style={{ filter: 'invert(1)' }} />
                </Link>

                <ul className='hidden sm:flex gap-5 text-sm text-white'>
                    <NavLink to="/" className='flex flex-col items-center gap-1' onClick={handleClick}>
                        <p>HOME</p>
                        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                    </NavLink>
                    <NavLink to='/collection' className='flex flex-col items-center gap-1' onClick={handleClick}>
                        <p>COLLECTION</p>
                        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                    </NavLink>
                    <NavLink to='/about' className='flex flex-col items-center gap-1' onClick={handleClick}>
                        <p>ABOUT</p>
                        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                    </NavLink>
                    <NavLink to='/contact' className='flex flex-col items-center gap-1' onClick={handleClick}>
                        <p>CONTACT</p>
                        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                    </NavLink>
                </ul>

                <div className='flex items-center gap-6'>
                    <img 
                        onClick={() => { 
                            setShowSearch(true); 
                            navigate('/collection');
                            handleClick(); 
                        }} 
                        className='w-5 cursor-pointer' 
                        src={assets.search_icon} 
                        alt="" 
                        style={{ filter: 'invert(1)' }}
                    />
                    
                    <div className='group relative'>
                        <img 
                            className='w-5 cursor-pointer' 
                            onClick={() => {
                                if (token) {
                                    navigate('/profile');
                                } else {
                                    navigate('/login');
                                }
                                handleClick();
                            }} 
                            src={assets.profile_icon} 
                            alt="" 
                            style={{ filter: 'invert(1)' }}
                        />
                    </div>

                    <Link to='/cart' className='relative' onClick={handleClick}>
                        <img 
                            className='w-5 min-w-5' 
                            src={assets.cart_icon} 
                            alt="" 
                            style={{ filter: 'invert(1)' }}
                        />
                        <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-white text-black aspect-square rounded-full text-[8px]'>
                            {getCartCount()}
                        </p>
                    </Link>

                    <img 
                        onClick={() => setVisible(true)} 
                        className='w-5 cursor-pointer sm:hidden' 
                        src={assets.menu_icon} 
                        alt="" 
                        style={{ filter: 'invert(1)' }}
                    />
                </div>

                {/* Sidebar Menu For Small Screens */}
                <div className={`fixed top-0 right-0 bottom-0 bg-black text-white transition-all duration-300 ease-in-out ${visible ? 'w-full' : 'w-0'}`}>
                    <div className='flex flex-col'>
                        <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 hover:bg-gray-900 transition-colors'>
                            <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="" style={{ filter: 'invert(1)' }} />
                            <p>Back</p>
                        </div>
                        <NavLink onClick={handleClick} to="/" className='py-2 pl-6 border-b border-gray-800 hover:bg-gray-900 transition-colors'>HOME</NavLink>
                        <NavLink onClick={handleClick} to='/collection' className='py-2 pl-6 border-b border-gray-800 hover:bg-gray-900 transition-colors'>COLLECTION</NavLink>
                        <NavLink onClick={handleClick} to='/about' className='py-2 pl-6 border-b border-gray-800 hover:bg-gray-900 transition-colors'>ABOUT</NavLink>
                        <NavLink onClick={handleClick} to='/contact' className='py-2 pl-6 border-b border-gray-800 hover:bg-gray-900 transition-colors'>CONTACT</NavLink>
                        {token.length === 0 ? (
                            <NavLink onClick={handleClick} to='/login' className='py-2 pl-6 border-b border-gray-800 hover:bg-gray-900 transition-colors'>
                                ACCOUNT
                            </NavLink>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;