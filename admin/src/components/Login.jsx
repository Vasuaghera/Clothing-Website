import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi'

const Login = ({setToken}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault()
            setLoading(true)
            const response = await axios.post(backendUrl + '/api/user/admin', {email, password})
            if (response.data.success) {
                setToken(response.data.token)
                toast.success('Welcome back!')
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-black p-4'>
            {/* Login Container */}
            <div className='w-full max-w-md relative'>
                {/* Decorative Elements */}
                <div className='absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-white/10 to-transparent rounded-full blur-2xl'/>
                <div className='absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-r from-white/10 to-transparent rounded-full blur-2xl'/>

                {/* Login Form */}
                <div className='bg-zinc-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-8 relative overflow-hidden shadow-2xl'>
                    {/* Header */}
                    <div className='text-center mb-8'>
                        <h1 className='text-3xl font-bold text-white mb-2'>Admin Panel</h1>
                        <p className='text-gray-400'>Sign in to your account</p>
                    </div>

                    <form onSubmit={onSubmitHandler} className='space-y-6'>
                        {/* Email Field */}
                        <div>
                            <label className='text-gray-300 text-sm font-medium mb-2 block'>
                                Email Address
                            </label>
                            <div className='relative'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <FiMail className='h-5 w-5 text-gray-400' />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='w-full pl-10 pr-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:ring-2 focus:ring-white/20 focus:border-transparent outline-none text-white placeholder-gray-500 transition-all'
                                    placeholder='your@email.com'
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className='text-gray-300 text-sm font-medium mb-2 block'>
                                Password
                            </label>
                            <div className='relative'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <FiLock className='h-5 w-5 text-gray-400' />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='w-full pl-10 pr-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:ring-2 focus:ring-white/20 focus:border-transparent outline-none text-white placeholder-gray-500 transition-all'
                                    placeholder='Enter your password'
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className='w-full bg-white text-black font-medium py-3 px-4 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed'
                        >
                            {loading ? (
                                <div className='w-6 h-6 border-2 border-black/20 border-t-black rounded-full animate-spin'/>
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    <FiArrowRight className='w-5 h-5' />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className='mt-6 text-center text-sm text-gray-400'>
                        Forever Admin Dashboard
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login