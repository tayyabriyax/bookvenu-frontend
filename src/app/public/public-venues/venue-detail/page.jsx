// app/venues/[id]/page.jsx
"use client";
import React, { useState } from 'react';
import { 
  FaMapMarkerAlt, FaUsers, FaStar, FaCalendar, FaHeart, 
  FaShareAlt, FaPhone, FaEnvelope, FaCheck, FaChevronLeft,
  FaChevronRight, FaBookmark, FaWifi, FaParking, FaSnowflake,
  FaMusic, FaBolt
} from 'react-icons/fa';
import Header from '../../../organizer/dashboard/components/Header';

const VenueDetailPage = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  // Data from your API response
  const venue = {
    _id: "6984713b7a6bc404ac560cb8",
    ownerId: "69830bb47a6bc404ac560c88",
    name: "Royal Palace Lawn",
    city: "Lahore",
    address: "Model Town",
    capacity: 500,
    perHeadPricing: [
      { dishName: "Chicken", price: 1500, _id: "6984713b7a6bc404ac560cb9" },
      { dishName: "Beef", price: 2000, _id: "6984713b7a6bc404ac560cba" }
    ],
    amenities: ["Parking", "AC", "Stage", "Generator"],
    description: "Premium wedding lawn with full services",
    images: [
      { url: "https://res.cloudinary.com/dzr9qivjg/image/upload/v1770287416/bookvenu/lawns/d9tcbchl5lc22u1klvql.png", public_id: "bookvenu/lawns/d9tcbchl5lc22u1klvql", _id: "6984713b7a6bc404ac560cbb" },
      { url: "https://res.cloudinary.com/dzr9qivjg/image/upload/v1770287418/bookvenu/lawns/ijj9kloifxnbvqjudr52.png", public_id: "bookvenu/lawns/ijj9kloifxnbvqjudr52", _id: "6984713b7a6bc404ac560cbc" },
      { url: "https://res.cloudinary.com/dzr9qivjg/image/upload/v1770287418/bookvenu/lawns/gc8zd3xtnz7eaqi7kpg8.png", public_id: "bookvenu/lawns/gc8zd3xtnz7eaqi7kpg8", _id: "6984713b7a6bc404ac560cbd" }
    ],
    status: "pending",
    unavailableDates: [],
    createdAt: "2026-02-05T10:30:19.359Z",
    updatedAt: "2026-02-05T10:30:19.359Z",
    __v: 0
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % venue.images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + venue.images.length) % venue.images.length);
  };

  const getAmenityIcon = (amenity) => {
    switch(amenity.toLowerCase()) {
      case 'parking': return <FaParking />;
      case 'ac': return <FaSnowflake />;
      case 'stage': return <FaMusic />;
      case 'generator': return <FaBolt />;
      default: return <FaCheck />;
    }
  };

  // Calculate min price
  const minPrice = Math.min(...venue.perHeadPricing.map(d => d.price));

  return (
    <>
     <Header
                   title="Venue"
                   subtitle="Detailed information about your selected venue"
                   pageName="Venue Details"
                  //  showHome={true}
                   showBackButton={true}
                  //  user={false}
                   showSettings={false}
                   showNotifications={false}


   
               />
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-rose-50 to-amber-50">
      {/* Header Navigation */}
      

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
              <div className="relative h-96 md:h-[500px]">
                <img
                  src={venue.images[activeImageIndex].url}
                  alt={venue.name}
                  className="w-full h-full object-cover"
                />
                
                {venue.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white transition-all duration-200"
                    >
                      <FaChevronLeft />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white transition-all duration-200"
                    >
                      <FaChevronRight />
                    </button>
                  </>
                )}
                
                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm text-white rounded-full text-sm">
                  {activeImageIndex + 1} / {venue.images.length}
                </div>
              </div>
              
              {/* Thumbnail Strip */}
              {venue.images.length > 1 && (
                <div className="flex overflow-x-auto p-4 space-x-2 bg-gray-50">
                  {venue.images.map((image, index) => (
                    <button
                      key={image._id}
                      onClick={() => setActiveImageIndex(index)}
                      className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 ${activeImageIndex === index ? 'border-violet-500' : 'border-transparent'}`}
                    >
                      <img
                        src={image.url}
                        alt={`${venue.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Venue Header */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
                    {venue.name}
                  </h1>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <FaMapMarkerAlt className="text-rose-500" />
                      <span>{venue.city}, {venue.address}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    venue.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {venue.status === 'pending' ? 'Pending Verification' : 'Verified'}
                  </span>
                </div>
              </div>

              {/* Capacity & Price */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <FaUsers className="text-white text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Maximum Capacity</p>
                      <p className="text-2xl font-bold text-gray-800">{venue.capacity} guests</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                      <FaStar className="text-white text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Starting Price</p>
                      <p className="text-2xl font-bold text-gray-800">₹{minPrice}/person</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Description</h3>
                <p className="text-gray-700 leading-relaxed">{venue.description}</p>
              </div>

              {/* Created Date */}
              <div className="flex items-center space-x-2 text-gray-600 text-sm">
                <FaCalendar />
                <span>Listed on {new Date(venue.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Amenities</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {venue.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100">
                    <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg">{getAmenityIcon(amenity)}</span>
                    </div>
                    <span className="font-medium text-gray-800">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Details */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Per Head Pricing</h3>
              
              <div className="space-y-4">
                {venue.perHeadPricing.map((dish) => (
                  <div key={dish._id} className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                        <FaStar className="text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-lg">{dish.dishName}</h4>
                        <p className="text-gray-600">Per person</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-800">₹{dish.price}</p>
                      <p className="text-gray-600 text-sm">per head</p>
                    </div>
                  </div>
                ))}
              </div>
              
             
            </div>
          </div>

          {/* Right Column - Booking & Contact */}
          <div className="space-y-8">
            {/* Booking Card */}
            <div className="bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl p-6 text-white ">
              <h3 className="text-xl font-bold mb-6">Book This Venue</h3>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-white/80 mb-2">Event Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="Select date"
                  />
                </div>
                
                <div>
                  <label className="block text-white/80 mb-2">Number of Guests</label>
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      max={venue.capacity}
                      defaultValue="100"
                      className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70">
                      guests
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-white/80 mb-2">Package</label>
                  <select className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50">
                    <option value="">Select Package</option>
                    {venue.perHeadPricing.map((dish) => (
                      <option key={dish._id} value={dish._id}>
                        {dish.dishName} - ₹{dish.price}/person
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <button className="w-full py-4 bg-white text-violet-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-200 mb-4">
                Check Availability & Price
              </button>
            </div>

            {/* Venue Info Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Venue Information</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Status</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    venue.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {venue.status}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Capacity</span>
                  <span className="font-semibold text-gray-800">{venue.capacity} guests</span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Location</span>
                  <span className="font-semibold text-gray-800">{venue.city}</span>
                </div>
                
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-600">Listed Date</span>
                  <span className="font-semibold text-gray-800">
                    {new Date(venue.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Actions */}
            <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Owner</h3>
              
              <div className="space-y-3">
                <button className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2">
                  <FaPhone />
                  <span>Call Owner</span>
                </button>
                
                <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2">
                  <FaEnvelope />
                  <span>Send Message</span>
                </button>
                
              </div>
            </div>

            {/* Unavailable Dates */}
            {venue.unavailableDates.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Unavailable Dates</h3>
                <div className="space-y-2">
                  {venue.unavailableDates.map((date, index) => (
                    <div key={index} className="flex items-center justify-between py-2">
                      <span className="text-gray-600">
                        {new Date(date).toLocaleDateString()}
                      </span>
                      <span className="px-2 py-1 bg-rose-100 text-rose-700 rounded text-sm">
                        Booked
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default VenueDetailPage;