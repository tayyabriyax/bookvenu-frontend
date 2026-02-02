'use client'
import { FaHeart, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaFileContract, FaShieldAlt, FaGoogle, FaFacebookF, FaStar, FaQuoteLeft, FaCalendar, FaUsers, FaCheckCircle, FaChevronRight } from 'react-icons/fa';
import { GiFlowerTwirl, GiChampagneCork, GiGlassCelebration, GiPartyPopper } from 'react-icons/gi';
import { useState } from 'react';
import { useRouter } from "next/navigation";


const page = () => {
      const router = useRouter();

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
                By signing up, you agree to our Terms and Privacy Policy
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
              <p className="text-gray-600 mt-2">Welcome back!  Sign Up to continue</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-md rounded-3xl shadow-2xl p-8 sm:p-10 border border-white/30">
            <div className="lg:-mt-5 ">
              {/* <p className=" text-gray-600 font-semibold mb-6 text-lg">Join as</p> */}
              <h1 className=" text-center text-4xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent font-serif">
                JOIN <span className="text-emerald-600"> AS</span>
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                {/* Organizer Button Tile */}
                <div className="group">
                  <button  onClick={() => router.push("/auth/signin")} className="w-full h-full bg-gradient-to-br from-white to-white/90 backdrop-blur-sm rounded-2xl p-6 border-2 border-violet-100 hover:border-violet-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="flex flex-col items-center space-y-4">
                      {/* Icon Circle */}
                      <div className="w-20 h-20 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <FaCalendar className="text-white text-2xl" />
                      </div>

                      {/* Text */}
                      <div className="text-center">
                        <p className="text-xl font-bold text-gray-800 mb-2">Organizer</p>
                        <p className="text-sm text-gray-600 mb-4">List & manage venues</p>
                      </div>

                      {/* Arrow */}
                      <div className="w-10 h-10 bg-gradient-to-r from-violet-100 to-purple-100 rounded-full flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-violet-200 group-hover:to-purple-200 transition-all duration-300">
                        <FaChevronRight className="text-violet-600 group-hover:text-violet-700 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </button>
                </div>

                {/* Customer Button Tile */}
                <div className="group">
                  <button    onClick={() => router.push("/auth/signin")} className="w-full h-full bg-gradient-to-br from-white to-white/90 backdrop-blur-sm rounded-2xl p-6 border-2 border-rose-100 hover:border-rose-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="flex flex-col items-center space-y-4">
                      {/* Icon Circle */}
                      <div className="w-20 h-20 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <FaHeart className="text-white text-2xl" />
                      </div>

                      {/* Text */}
                      <div className="text-center">
                        <p className="text-xl font-bold text-gray-800 mb-2">Customer</p>
                        <p className="text-sm text-gray-600 mb-4">Book wedding venues</p>
                      </div>

                      {/* Arrow */}
                      <div className="w-10 h-10 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-rose-200 group-hover:to-pink-200 transition-all duration-300">
                        <FaChevronRight className="text-rose-600 group-hover:text-rose-700 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="mt-8">
              <div className="relative">


              </div>

              {/* Social Login */}

            </div>

            {/* Sign Up Link */}
            <div className="mt-8 text-center p-4 rounded-2xl bg-gradient-to-r from-violet-50 to-pink-50 border border-violet-200">
              <p className="text-sm text-gray-600">
                Already on BookVenu?{' '}
                <a href="#" className="font-bold text-violet-600 hover:text-violet-700">
                  Go and Sign in
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
                  By signing up, you agree to our Terms and Privacy Policy
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