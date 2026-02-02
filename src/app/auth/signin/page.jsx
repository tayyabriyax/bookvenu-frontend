'use client'
import { FaHeart, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaFileContract, FaShieldAlt, FaGoogle, FaFacebookF, FaStar, FaQuoteLeft, FaCalendar, FaUsers, FaCheckCircle, FaChevronRight } from 'react-icons/fa';
import { GiFlowerTwirl, GiChampagneCork, GiGlassCelebration, GiPartyPopper } from 'react-icons/gi';
import { useState } from 'react';

const page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  const handleSubmit = () => {
    e.preventDefault();
    console.log('Login attempted with:', { email, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-rose-50 to-amber-50 flex">
      {/* Left Section - Brand & Info */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden ">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-amber-300 to-rose-300 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full opacity-15 blur-2xl"></div>
        </div>

        {/* Floating Icons */}
        <div className="absolute top-20 left-20 animate-bounce">
          <GiFlowerTwirl className="text-emerald-400 text-4xl opacity-30" />
        </div>
        <div className="absolute bottom-20 right-20 animate-pulse">
          <GiChampagneCork className="text-amber-400 text-4xl opacity-30" />
        </div>
        <div className="absolute top-1/2 right-1/4 animate-float">
          <GiPartyPopper className="text-rose-400 text-3xl opacity-30" />
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12">
          {/* Logo */}
          <div className="mb-12">
            <div className="flex flex-col items-center">
              <div className="p-6 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 mb-6">
                <FaHeart className="h-16 w-16 text-white animate-pulse" />
              </div>
              <h1 className="text-6xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent font-serif mb-2">
                Book<span className="text-emerald-600">Venu</span>
              </h1>
              <p className="text-gray-600 text-lg">Where Dreams Find Venues</p>
            </div>
          </div>

          {/* Stats Tiles */}
          {/* <div className="grid grid-cols-2 gap-6 w-full max-w-2xl mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 bg-gradient-to-r ${stat.color} rounded-xl`}>
                    <div className="text-white text-xl">{stat.icon}</div>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                    <p className="text-gray-600 text-sm">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div> */}



          {/* Testimonial */}
          <div className="relative w-full max-w-2xl">
            <div className="absolute -top-4 -left-4">
              <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center">
                <FaQuoteLeft className="text-white text-sm" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-violet-500 to-pink-500 rounded-2xl p-6 text-white">
              <p className="text-lg font-semibold mb-4 text-center">
                Terms & Privacy
              </p>

              <div className="flex justify-center space-x-8 mb-4">
                {/* Terms Card */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-3 border border-white/30">
                    <FaFileContract className="text-white text-2xl" />
                  </div>
                  <p className="font-bold text-white">Terms of Service</p>
                  <p className="text-white/80 text-xs mt-1">Read our terms</p>
                </div>

                {/* Privacy Policy Card */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-3 border border-white/30">
                    <FaShieldAlt className="text-white text-2xl" />
                  </div>
                  <p className="font-bold text-white">Privacy Policy</p>
                  <p className="text-white/80 text-xs mt-1">Your data security</p>
                </div>
              </div>

              <p className="text-center text-sm text-white/80 mt-4 italic">
                By signing in, you agree to our Terms and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center lg:pl-8  lg:overflow-hidden">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-10 text-center mt-5">
            <div className="flex flex-col items-center">
              <div className="p-4 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 rounded-2xl shadow-xl mb-4">
                <FaHeart className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent font-serif">
                Book<span className="text-emerald-600">Venu</span>
              </h1>
              <p className="text-gray-600 mt-2">Welcome back! Sign in to continue</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-md rounded-3xl shadow-2xl p-8 sm:p-10 border border-white/30">


            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  <div className="flex items-center space-x-2">
                    <FaEnvelope className="text-violet-600" />
                    <span>Email Address</span>
                  </div>
                </label>
                <div className="relative">
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
                    className="block w-full pl-12 pr-4 py-4 border-2 border-violet-200 rounded-2xl placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-violet-300 focus:border-violet-400 text-gray-900 bg-white/80 transition-all duration-200 shadow-sm"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  <div className="flex items-center space-x-2">
                    <FaLock className="text-rose-600" />
                    <span>Password</span>
                  </div>
                </label>
                <div className="relative">
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
                    className="block w-full pl-12 pr-12 py-4 border-2 border-rose-200 rounded-2xl placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-rose-300 focus:border-rose-400 text-gray-900 bg-white/80 transition-all duration-200 shadow-sm"
                    placeholder="Enter your password"
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-2 rounded-full bg-gradient-to-r from-rose-100 to-pink-100 hover:from-rose-200 hover:to-pink-200 transition-all duration-200 shadow-sm"
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

              {/* Remember & Forgot */}
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
                <a href="#" className="text-sm font-semibold text-violet-600 hover:text-violet-700">
                  Forgot password?
                </a>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                className="w-full flex justify-center items-center space-x-3 py-4 px-4 border border-transparent rounded-2xl shadow-xl text-lg font-bold text-white bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 hover:from-violet-700 hover:via-purple-700 hover:to-pink-700 focus:outline-none focus:ring-4 focus:ring-violet-300 transform hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-200"
              >
                <FaHeart className="h-5 w-5" />
                <span>Sign In to Dashboard</span>
              </button>
            </form>

            {/* Divider */}
            <div className="mt-8">
              <div className="relative">


              </div>

              {/* Social Login */}

            </div>

            {/* Sign Up Link */}
            <div className="mt-8 text-center p-4 rounded-2xl bg-gradient-to-r from-violet-50 to-pink-50 border border-violet-200">
              <p className="text-sm text-gray-600">
                New to BookVenu?{' '}
                <a href="#" className="font-bold text-violet-600 hover:text-violet-700">
                  Create your free account
                </a>
              </p>
              <p className="mt-1 text-xs text-gray-500">Start planning your dream wedding today!</p>
            </div>
          </div>

          {/* Footer Note */}
          <div className="lg:hidden lg:mt-8 text-center mt-8  ">
            <div className="relative w-full max-w-2xl">
              <div className="absolute -top-4 left-4">
                <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center">
                  <FaQuoteLeft className="text-white text-sm" />
                </div>
              </div>

              <div className="bg-gradient-to-r from-violet-500 to-pink-500 rounded-t-1xl p-6 text-white">
                <p className="text-lg font-semibold mb-4 text-center">
                  Terms & Privacy
                </p>

                <div className="flex justify-center space-x-8 mb-4">
                  {/* Terms Card */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-3 border border-white/30">
                      <FaFileContract className="text-white text-2xl" />
                    </div>
                    <p className="font-bold text-white">Terms of Service</p>
                    <p className="text-white/80 text-xs mt-1">Read our terms</p>
                  </div>

                  {/* Privacy Policy Card */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-3 border border-white/30">
                      <FaShieldAlt className="text-white text-2xl" />
                    </div>
                    <p className="font-bold text-white">Privacy Policy</p>
                    <p className="text-white/80 text-xs mt-1">Your data security</p>
                  </div>
                </div>

                <p className="text-center text-sm text-white/80 mt-4 italic">
                  By signing in, you agree to our Terms and Privacy Policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;