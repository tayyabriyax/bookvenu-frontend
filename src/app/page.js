'use client'
import Image from "next/image";
import { FaHeart, FaCalendar, FaMapMarkerAlt, FaStar, FaUsers, FaCheckCircle, FaChevronRight, FaEnvelope } from "react-icons/fa";
import { GiFlowerTwirl, GiPartyPopper, GiChampagneCork, GiGlassCelebration } from "react-icons/gi";
import { useRouter } from "next/navigation";
import VenuesGrid from "./public/public-venues/VenuesGrid";

export default function Home() {
  const router = useRouter();

  const features = [
    { icon: <FaCalendar />, title: "Easy Booking", desc: "Book venues in just 3 clicks" },
    { icon: <FaMapMarkerAlt />, title: "500+ Venues", desc: "Curated locations across India" },
    { icon: <FaUsers />, title: "24/7 Support", desc: "Dedicated wedding planners" },
    { icon: <FaStar />, title: "4.8★ Rating", desc: "From 2000+ couples" },
  ];

  const venueTypes = [
    { name: "Beach Weddings", icon: <GiFlowerTwirl />, color: "from-blue-500 to-cyan-400" },
    { name: "Garden Venues", icon: <GiFlowerTwirl />, color: "from-emerald-500 to-teal-400" },
    { name: "Grand Hotels", icon: <GiGlassCelebration />, color: "from-purple-500 to-pink-400" },
    { name: "Destination", icon: <FaMapMarkerAlt />, color: "from-amber-500 to-orange-400" },
  ];

  const testimonials = [
    { name: "Priya & Raj", text: "Found our dream venue in Mumbai within budget!", venue: "Taj Lands End" },
    { name: "Anjali & Vikram", text: "Seamless booking experience. Highly recommend!", venue: "Leela Palace" },
    { name: "Neha & Arjun", text: "Saved 30% compared to traditional planners", venue: "ITC Grand Chola" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-rose-50 to-amber-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-violet-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-1">
              <div className="relative w-12 h-12 hidden md:block">
                {/* Replace with your logo */}
                <div className="w-full h-full bg-gradient-to-r from-violet-600 to-pink-600 rounded-2xl flex items-center justify-center">
                  <FaHeart className="text-white text-xl" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
                  Book<span className="text-emerald-600">Venu</span>
                </h1>
                <p className="text-xs text-gray-500">Where Dreams Find Venues</p>
              </div>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-1">
              <button onClick={() => router.push("/auth/signin")} className="px-6 py-2.5 text-violet-700 font-semibold rounded-xl hover:bg-violet-50 transition-all duration-200">
                Sign In
              </button>
              <button onClick={() => router.push("/auth/signup")} className="px-3 py-2.5 bg-gradient-to-r from-violet-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 ">
                Sign Up Free
              </button>
            </div>
          </div>
        </div>
      </nav>
      

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-r from-amber-300 to-rose-300 rounded-full opacity-20 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-violet-100 to-pink-100 rounded-full mb-6">
              <GiPartyPopper className="text-pink-500" />
              <span className="text-sm font-semibold text-violet-700">Over 500+ Venues Booked This Month!</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Your Dream Wedding
              </span>
              <br />
              <span className="text-gray-800">Starts With The Perfect</span>
              <span className="text-emerald-600 ml-3">Venue</span>
            </h1>

            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Discover, compare, and book stunning wedding venues across India.
              From beach resorts to palace hotels - find your perfect match.
            </p>

            {/* Search Bar */}
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-2 mb-12">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1">
                  <div className="flex items-center p-4">
                    <FaMapMarkerAlt className="text-violet-500 mr-3" />
                    <input
                      type="text"
                      placeholder="Where do you want to get married?"
                      className="w-full outline-none text-lg"
                    />
                  </div>
                </div>
                <div className="flex-1 border-l border-gray-200">
                  <div className="flex items-center p-4">
                    <FaCalendar className="text-pink-500 mr-3" />
                    <input
                      type="text"
                      placeholder="Wedding Date"
                      className="w-full outline-none text-lg"
                    />
                  </div>
                </div>
                <button className="px-8 py-4 bg-gradient-to-r from-violet-600 to-pink-600 text-white font-bold rounded-xl flex items-center justify-center space-x-2 hover:shadow-xl transition-all duration-200">
                  <span>Find Venues</span>
                  <FaChevronRight />
                </button>
              </div>
            </div>
          </div>

          <VenuesGrid/>
        </div>
      </section>




      {/* Features Section */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-white/80 rounded-2xl p-6 shadow-lg border border-violet-100 hover:shadow-xl transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-r from-violet-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                  <div className="text-white text-xl">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Venue Types */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Find Your Perfect <span className="text-emerald-600">Venue Type</span>
            </h2>
            <p className="text-gray-600 text-lg">Explore curated venues by category</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {venueTypes.map((type, index) => (
              <div key={index} className="group">
                <div className={`bg-gradient-to-br ${type.color} rounded-2xl p-8 text-center transform group-hover:-translate-y-2 transition-all duration-300 shadow-lg group-hover:shadow-2xl`}>
                  <div className="w-20 h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-6">
                    <div className="text-white text-3xl">{type.icon}</div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{type.name}</h3>
                  <p className="text-white/90 mb-6">50+ venues available</p>
                  <button className="px-6 py-2 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full hover:bg-white/30 transition-all duration-200">
                    Explore
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-r from-violet-50 to-pink-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Real Stories from <span className="text-rose-600">Happy Couples</span>
            </h2>
            <p className="text-gray-600 text-lg">Join 2000+ couples who found their dream venue</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full flex items-center justify-center">
                    <GiChampagneCork className="text-white text-xl" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.venue}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">{testimonial.text}</p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-amber-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-32 -translate-x-32"></div>

            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-6">Ready to Plan Your Dream Wedding?</h2>
              <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto">
                Create your free account and get personalized venue recommendations
              </p>

              <div className="flex flex-col md:flex-row gap-4 justify-center max-w-xl mx-auto">
                <div className="flex-1 bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center">
                    <FaEnvelope className="mr-3" />
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="bg-transparent outline-none text-white placeholder-white/70 w-full"
                    />
                  </div>
                </div>
                <button className="px-8 py-4 bg-white text-violet-700 font-bold rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-lg">
                  Get Started Free
                </button>
              </div>

              <p className="mt-6 text-sm text-white/70">
                Join for free. No credit card required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <FaHeart className="text-white" />
                </div>
                <h2 className="text-2xl font-bold">
                  Book<span className="text-emerald-400">Venu</span>
                </h2>
              </div>
              <p className="text-gray-400">Making wedding dreams come true since 2023</p>
            </div>

            <div className="flex items-center space-x-6">
              <button className="px-6 py-2 border border-violet-400 text-violet-400 rounded-xl hover:bg-violet-400 hover:text-white transition-all duration-200">
                Become a Partner
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl hover:shadow-lg transition-all duration-200">
                List Your Venue
              </button>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} BookVenu. All rights reserved. | Mumbai, India</p>
            <p className="mt-2 text-sm">Designed with ❤️ for every couple's special day</p>
          </div>
        </div>
      </footer>
    </div>
  );
}