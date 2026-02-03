'use client'
import { FaHeart, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser, FaFileContract, FaShieldAlt, FaGoogle, FaFacebookF, FaQuoteLeft } from 'react-icons/fa';
import { GiFlowerTwirl, GiChampagneCork, GiPartyPopper } from 'react-icons/gi';
import { useState } from 'react';
import { registerUser } from '../action';


const SignUpCustomerPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    fullname: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    role:'customer'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sign up attempted with:', formData);
    // Call the registerUser function
    registerUser(formData)
      .then(response => {
        console.log('Registration successful:', response);
        // Handle successful registration (e.g., redirect, show message)
      })
      .catch(error => {
        console.error('Registration failed:', error);
        // Handle registration error (e.g., show error message)
      });
  };

  const handleChange = (e) => {
    const { name, value, type, checked, } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));



  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-rose-50 to-amber-50 flex">
      {/* Left Section - Brand & Info */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
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

          {/* Benefits for Customers */}
          <div className="w-full max-w-2xl mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Join Thousands of <span className="text-rose-600">Happy Couples</span>
            </h2>

            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-violet-50 to-white rounded-2xl">
                <div className="p-3 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl">
                  <FaHeart className="text-white text-lg" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Personalized Venue Matching</p>
                  <p className="text-gray-600 text-sm">Get recommendations based on your preferences</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-rose-50 to-white rounded-2xl">
                <div className="p-3 bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl">
                  <GiChampagneCork className="text-white text-lg" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Free Wedding Planning Tools</p>
                  <p className="text-gray-600 text-sm">Budget calculators, checklist, and more</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-emerald-50 to-white rounded-2xl">
                <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl">
                  <GiFlowerTwirl className="text-white text-lg" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">24/7 Support</p>
                  <p className="text-gray-600 text-sm">Dedicated wedding planners to help you</p>
                </div>
              </div>
            </div>
          </div>

          {/* Terms & Privacy */}
          <div className="relative w-full max-w-2xl">
            <div className="bg-gradient-to-r from-violet-500 to-pink-500 rounded-2xl p-6 text-white shadow-xl">
              <p className="text-lg font-semibold mb-4 text-center">
                Terms & Privacy
              </p>

              <div className="flex justify-center space-x-8 mb-4">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-3 border border-white/30">
                    <FaFileContract className="text-white text-2xl" />
                  </div>
                  <p className="font-bold text-white">Terms of Service</p>
                  <p className="text-white/80 text-xs mt-1">Read our terms</p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-3 border border-white/30">
                    <FaShieldAlt className="text-white text-2xl" />
                  </div>
                  <p className="font-bold text-white">Privacy Policy</p>
                  <p className="text-white/80 text-xs mt-1">Your data security</p>
                </div>
              </div>

              <p className="text-center text-sm text-white/80 mt-4 italic">
                By signing up, you agree to our Terms and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Sign Up Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center ">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-10 text-center">
            <div className="flex flex-col items-center">
              <div className="p-4 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 rounded-2xl shadow-xl mb-4">
                <FaHeart className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent font-serif">
                Book<span className="text-emerald-600">Venu</span>
              </h1>
              <p className="text-gray-600 mt-2">Create your free account</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-md  rounded-t-3xl rounded-b-none  lg:rounded-3xl shadow-2xl p-8 sm:p-10 border border-white/30">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
                Join as Customer
              </h2>
              <p className="text-gray-600 mt-2">Start planning your dream wedding</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Full Name Field */}
              <div>
                <label htmlFor="fullname" className="block text-sm font-semibold text-gray-700 mb-2">
                  <div className="flex items-center space-x-2">
                    <FaUser className="text-violet-600" />
                    <span>Full Name</span>
                  </div>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-violet-500" />
                  </div>
                  <input
                    id="fullname"
                    name="fullname"
                    type="text"
                    autoComplete="name"
                    required
                    value={formData.fullname}
                    onChange={handleChange}
                    className="block w-full pl-12 pr-4 py-4 border-2 border-violet-200 rounded-2xl placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-violet-300 focus:border-violet-400 text-gray-900 bg-white/80 transition-all duration-200 shadow-sm"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  <div className="flex items-center space-x-2">
                    <FaEnvelope className="text-pink-600" />
                    <span>Email Address</span>
                  </div>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaEnvelope className="h-5 w-5 text-pink-500" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-12 pr-4 py-4 border-2 border-pink-200 rounded-2xl placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-pink-300 focus:border-pink-400 text-gray-900 bg-white/80 transition-all duration-200 shadow-sm"
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
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full pl-12 pr-12 py-4 border-2 border-rose-200 rounded-2xl placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-rose-300 focus:border-rose-400 text-gray-900 bg-white/80 transition-all duration-200 shadow-sm"
                    placeholder="Create a password"
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

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                  <div className="flex items-center space-x-2">
                    <FaLock className="text-emerald-600" />
                    <span>Confirm Password</span>
                  </div>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-emerald-500" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="block w-full pl-12 pr-4 py-4 border-2 border-emerald-200 rounded-2xl placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-emerald-300 focus:border-emerald-400 text-gray-900 bg-white/80 transition-all duration-200 shadow-sm"
                    placeholder="Confirm your password"
                  />
                </div>
              </div>

              {/* Terms Agreement */}
              <div className="flex items-start space-x-3 p-4 bg-gradient-to-r from-violet-50 to-pink-50 rounded-2xl border border-violet-200">
                <input
                  id="acceptTerms"
                  name="acceptTerms"
                  type="checkbox"
                  required
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  className="h-5 w-5 text-violet-600 focus:ring-violet-500 border-gray-300 rounded-lg mt-1"
                />
                <label htmlFor="acceptTerms" className="block text-sm text-gray-700">
                  I agree to the <a href="#" className="font-semibold text-violet-600 hover:text-violet-700">Terms of Service</a> and <a href="#" className="font-semibold text-rose-600 hover:text-rose-700">Privacy Policy</a>. I understand that my data will be processed in accordance with these policies.
                </label>
              </div>

              {/* Sign Up Button */}
              <button
                type="submit"
                className="w-full flex justify-center items-center space-x-3 py-4 px-4 border border-transparent rounded-2xl shadow-xl text-lg font-bold text-white bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 hover:from-violet-700 hover:via-purple-700 hover:to-pink-700 focus:outline-none focus:ring-4 focus:ring-violet-300 transform hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-200"
              >
                <FaHeart className="h-5 w-5" />
                <span>Create Account</span>
              </button>
            </form>



            {/* Login Link */}
            <div className="mt-8 text-center p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <a href="/auth/signin" className="font-bold text-emerald-600 hover:text-emerald-700">
                  Sign in here
                </a>
              </p>
              <p className="mt-1 text-xs text-gray-500">Return to your wedding planning dashboard</p>
            </div>
          </div>

          {/* Mobile Terms Section */}
          <div className="lg:hidden   ">
            <div className="bg-gradient-to-r from-violet-500 to-pink-500  p-6 text-white shadow-xl">
              <p className="text-lg font-semibold mb-4 text-center">
                Terms & Privacy
              </p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col items-center p-4 bg-white/10 rounded-xl">
                  <FaFileContract className="text-white text-2xl mb-2" />
                  <p className="font-bold text-sm text-center">Terms of Service</p>
                </div>

                <div className="flex flex-col items-center p-4 bg-white/10 rounded-xl">
                  <FaShieldAlt className="text-white text-2xl mb-2" />
                  <p className="font-bold text-sm text-center">Privacy Policy</p>
                </div>
              </div>

              <p className="text-center text-sm text-white/80">
                By signing up, you agree to our Terms and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpCustomerPage;