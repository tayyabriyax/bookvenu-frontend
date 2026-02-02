'use client'
import React from 'react'
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle, FaFacebookF,FaCalendar, FaHeart, FaRing, FaChampagneGlasses } from 'react-icons/fa6'
import { GiFlowerTwirl } from 'react-icons/gi'

const page = () => {
  const [showPassword, setShowPassword] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Login attempted with:', { email, password })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-rose-50 to-amber-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-amber-300 to-rose-300 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full opacity-15 blur-2xl"></div>
      </div>

      {/* Floating Icons */}
      <div className="absolute top-10 left-10 animate-bounce">
        <FaRing className="text-rose-400 text-2xl opacity-30" />
      </div>
      <div className="absolute top-20 right-20 animate-pulse">
        <GiFlowerTwirl className="text-emerald-400 text-3xl opacity-30" />
      </div>
      <div className="absolute bottom-20 left-1/4 animate-bounce delay-300">
        <FaChampagneGlasses className="text-amber-400 text-2xl opacity-30" />
      </div>

      {/* Logo/Header Section */}
      <div className="relative sm:mx-auto sm:w-full sm:max-w-md z-10">
        <div className="flex justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="p-4 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl transform rotate-6 hover:rotate-0 transition-transform duration-300">
              <FaHeart className="h-10 w-10 text-white animate-pulse" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent font-serif">
              Book<span className="text-emerald-600">Venu</span>
            </h1>
            <div className="flex space-x-2">
              <GiFlowerTwirl className="text-emerald-500" />
              <FaChampagneGlasses className="text-amber-500" />
              <FaRing className="text-rose-500" />
              < FaCalendar className="text-blue-500" />
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Find Your Perfect Wedding Venue
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Discover, book, and manage the perfect venue for your special day
          </p>
        </div>
      </div>

      <div className="relative mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10">
        <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-md py-8 px-6 shadow-2xl sm:rounded-3xl sm:px-10 border border-white/30">
          
          {/* Feature Highlights */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="bg-gradient-to-r from-violet-100 to-purple-100 rounded-xl p-3 text-center border border-violet-200">
              <div className="flex justify-center mb-1">
                <div className="p-2 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg">
                  < FaCalendar className="h-4 w-4 text-white" />
                </div>
              </div>
              <span className="text-xs font-semibold text-violet-700">Easy Booking</span>
            </div>
            <div className="bg-gradient-to-r from-emerald-100 to-teal-100 rounded-xl p-3 text-center border border-emerald-200">
              <div className="flex justify-center mb-1">
                <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg">
                  <GiFlowerTwirl className="h-4 w-4 text-white" />
                </div>
              </div>
              <span className="text-xs font-semibold text-emerald-700">Venue Preview</span>
            </div>
          </div>

          {/* Login Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                <div className="flex items-center space-x-2">
                  <FaEnvelope className="text-violet-600" />
                  <span>Email Address</span>
                </div>
              </label>
              <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-violet-500" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-12 pr-4 py-3.5 border-2 border-violet-200 rounded-2xl placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-violet-300 focus:border-violet-400 text-gray-900 bg-white/80 transition-all duration-200 shadow-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                <div className="flex items-center space-x-2">
                  <FaLock className="text-rose-600" />
                  <span>Password</span>
                </div>
              </label>
              <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-rose-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-12 pr-12 py-3.5 border-2 border-rose-200 rounded-2xl placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-rose-300 focus:border-rose-400 text-gray-900 bg-white/80 transition-all duration-200 shadow-sm"
                  placeholder="Enter your password"
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1.5 rounded-full bg-gradient-to-r from-rose-100 to-pink-100 hover:from-rose-200 hover:to-pink-200 transition-all duration-200 shadow-sm"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="h-4 w-4 text-rose-600" />
                    ) : (
                      <FaEye className="h-4 w-4 text-rose-600" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-5 w-5 text-violet-600 focus:ring-violet-500 border-gray-300 rounded-lg"
                />
                <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-700 font-medium">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-semibold bg-gradient-to-r from-violet-600 to-rose-600 bg-clip-text text-transparent hover:from-violet-700 hover:to-rose-700 transition-all">
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center items-center space-x-3 py-4 px-4 border border-transparent rounded-2xl shadow-xl text-sm font-bold text-white bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 hover:from-violet-700 hover:via-purple-700 hover:to-pink-700 focus:outline-none focus:ring-4 focus:ring-violet-300 transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <FaHeart className="h-4 w-4" />
                <span>Sign In to Book Venues</span>
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-dotted border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gradient-to-r from-white/90 to-white/70 text-gray-500 font-medium">Or continue with</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <a
                href="#"
                className="w-full inline-flex justify-center items-center space-x-2 py-3 px-4 border-2 border-gray-200 rounded-2xl shadow-sm bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-violet-300 hover:shadow-lg transition-all duration-200"
              >
                <FaGoogle className="h-5 w-5 text-red-500" />
                <span>Google</span>
              </a>

              <a
                href="#"
                className="w-full inline-flex justify-center items-center space-x-2 py-3 px-4 border-2 border-gray-200 rounded-2xl shadow-sm bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-blue-300 hover:shadow-lg transition-all duration-200"
              >
                <FaFacebookF className="h-5 w-5 text-blue-600" />
                <span>Facebook</span>
              </a>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="mt-8 text-center p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-rose-50 border border-amber-200">
            <p className="text-sm text-gray-600">
              New to BookVenu?{' '}
              <a href="#" className="font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent hover:from-emerald-700 hover:to-teal-700 transition-all">
                Create your free account
              </a>
            </p>
            <p className="mt-1 text-xs text-gray-500">Start planning your dream wedding today!</p>
          </div>

          {/* Quick Stats */}
          <div className="mt-6 grid grid-cols-3 gap-2 text-center">
            <div className="p-2 bg-gradient-to-b from-violet-50 to-white rounded-xl">
              <p className="text-lg font-bold text-violet-700">500+</p>
              <p className="text-xs text-gray-600">Venues</p>
            </div>
            <div className="p-2 bg-gradient-to-b from-rose-50 to-white rounded-xl">
              <p className="text-lg font-bold text-rose-700">2K+</p>
              <p className="text-xs text-gray-600">Bookings</p>
            </div>
            <div className="p-2 bg-gradient-to-b from-emerald-50 to-white rounded-xl">
              <p className="text-lg font-bold text-emerald-700">4.8★</p>
              <p className="text-xs text-gray-600">Rating</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center p-4 bg-gradient-to-r from-white/50 to-white/30 backdrop-blur-sm rounded-2xl shadow-lg">
          <p className="text-xs text-gray-500">
            By signing in, you agree to our{' '}
            <a href="#" className="font-semibold text-violet-600 hover:text-violet-700">
              Terms
            </a>{' '}
            and{' '}
            <a href="#" className="font-semibold text-rose-600 hover:text-rose-700">
              Privacy Policy
            </a>
          </p>
          <p className="mt-2 text-xs text-gray-400">
            © {new Date().getFullYear()} BookVenu. Making wedding dreams come true 💫
          </p>
        </div>
      </div>
    </div>
  )
}

export default page