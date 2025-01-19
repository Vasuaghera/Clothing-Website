import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiMail, FiLock, FiUser, FiArrowRight } from 'react-icons/fi'

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl, userPresent, setUserPresent, username, setuserName, useremail, setuserEmail, userpass, setuserPass } = useContext(ShopContext)
  useEffect(() => {
    if (token) {
      navigate('/'); // Redirect to homepage or another route after login
    }
  }, [token, navigate]);
  const [name, setName] = useState('')
  const [password, setPasword] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true)
    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('useremail', email);
          localStorage.setItem('username', name);
          localStorage.setItem('userpass', password);
          toast.success("Sign up Successful")
          setuserName(name);
          setuserEmail(email);
          setuserPass(password);
          setEmail('');
          setName('');
          setPasword('');
          navigate('/');
          setUserPresent(true);
        } else {
          toast.error(response.data.message)
        }
      } else {
        const response = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('useremail', email);
          localStorage.setItem('userpass', password);
          toast.success("Login Successful")
          setuserEmail(email);
          setuserPass(password);
          setEmail('');
          setName('');
          setPasword('');
          navigate('/');
          setUserPresent(true);
        } else {
          toast.error(response.data.message)
        }
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
        {/* <div className='absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-white/10 to-transparent rounded-full blur-2xl'/>
        <div className='absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-r from-white/10 to-transparent rounded-full blur-2xl'/> */}

        {/* Login Form */}
        <div className='bg-zinc-900/50 mt-10 backdrop-blur-xl rounded-2xl border border-white/10 p-8 relative overflow-hidden shadow-2xl'>
          {/* Header */}
          <div className='text-center mb-8'>
            <h1 className='text-3xl font-bold text-white mb-2'>{currentState}</h1>
            <p className='text-gray-400'>Welcome to Forever</p>
          </div>

          <form onSubmit={onSubmitHandler} className='space-y-6'>
            {/* Name Field - Only for Sign Up */}
            {currentState === 'Sign Up' && (
              <div >  
                <label className='text-gray-300 text-sm font-medium mb-2 block'>
                  Full Name
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <FiUser className='h-5 w-5 text-gray-400' />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='w-full pl-10 pr-4 py-3 bg-black/30 border border-white/10 rounded-lg focus:ring-2 focus:ring-white/20 focus:border-transparent outline-none text-white placeholder-gray-500 transition-all'
                    placeholder='John Doe'
                    required
                  />
                </div>
              </div>
            )}

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
                  onChange={(e) => setPasword(e.target.value)}
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
                  <span>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</span>
                  <FiArrowRight className='w-5 h-5' />
                </>
              )}
            </button>
          </form>

          {/* Toggle between Login and Sign Up */}
          <div className='mt-6 text-center text-sm text-gray-400'>
            {currentState === 'Login' ? "Don't have an account? " : "Already have an account? "}
            <span
              onClick={() => setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login')}
              className='text-white underline cursor-pointer hover:text-gray-300 transition-colors'
            >
              {currentState === 'Login' ? 'Create one' : 'Sign in'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login