// app/venues/add/page.jsx
"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import {
    FaUpload, FaPlus, FaTrash, FaMapMarkerAlt, FaUsers,
    FaList, FaImage, FaDollarSign, FaCity, FaHome, FaCheck,
    FaStar, FaCalendar, FaWifi, FaParking, FaGlassCheers, FaMusic,
    FaArrowAltCircleLeft,
    FaPlusCircle,
    FaCartPlus,
    FaTypo3,
    FaChevronUp
} from 'react-icons/fa';
import { GiFlowerTwirl, GiPartyPopper } from 'react-icons/gi';
import Header from '../../components/Header';
import { FcDataEncryption } from 'react-icons/fc';
import { addVenuebyOrganizer } from '../action';
import toast from 'react-hot-toast';

const AddVenuePage = () => {
    const router = useRouter();

    const [images, setImages] = useState([]);
    const [imageMeta, setImageMeta] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        city: '',
        address: '',
        venueType: '',
        capacity: '',
        amenities: ['Parking', 'AC', 'Stage', 'Generator'],
        description: '',
        perHeadPricing: [{ dishName: 'Chicken', price: 1500 }],
        images: [],           // File[]
        imagePreviews: []     // string[]
    });

    const [newAmenity, setNewAmenity] = useState('');
    const [newDish, setNewDish] = useState({ dishName: '', price: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Venue Data:', formData);

        try {
            const payload = {
                name: formData.name,
                venueType: formData.venueType,
                city: formData.city,
                address: formData.address,
                capacity: Number(formData.capacity),
                description: formData.description,
                amenities: formData.amenities,
                images: formData.images,          // File[]
                imageMeta: imageMeta,             // 🔥 [{}, {}, {}]
                perHeadPricing: formData.perHeadPricing,
            };

            const response = await addVenuebyOrganizer(payload);
            console.log("Venue added successfully:", response);
            toast.success("Venue added successfully! Awaiting admin approval.");

            // Optional: reset form or show success message
            setFormData({
                venueType: "",
                city: "",
                address: "",
                capacity: "",
                description: "",
                amenities: [],
                perHeadPricing: [],
                images: [],
                imagePreviews: []
            });
            setImageMeta([]);
            router.push("/organizer/dashboard/");

        } catch (error) {
            console.error("Failed to add venue:", error);
            // Optional: show error notification to user
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const addAmenity = () => {
        if (newAmenity.trim()) {
            setFormData(prev => ({
                ...prev,
                amenities: [...prev.amenities, newAmenity.trim()]
            }));
            setNewAmenity('');
        }
    };

    const removeAmenity = (index) => {
        setFormData(prev => ({
            ...prev,
            amenities: prev.amenities.filter((_, i) => i !== index)
        }));
    };

    const addDish = () => {
        if (newDish.dishName.trim() && newDish.price) {
            setFormData(prev => ({
                ...prev,
                perHeadPricing: [...prev.perHeadPricing, { ...newDish, price: parseInt(newDish.price) }]
            }));
            setNewDish({ dishName: '', price: '' });
        }
    };

    const removeDish = (index) => {
        setFormData(prev => ({
            ...prev,
            perHeadPricing: prev.perHeadPricing.filter((_, i) => i !== index)
        }));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);

        if (formData.images.length + files.length > 5) {
            toast.error("You can upload a maximum of 5 images.");
            return;
        }

        const previews = files.map(file => URL.createObjectURL(file));

        // 🔥 CREATE `{}` ARRAY HERE
        const meta = files.map((_, index) => ({
            index: formData.images.length + index,
            alt: "",
            isCover: formData.images.length === 0 && index === 0
        }));

        setFormData(prev => ({
            ...prev,
            images: [...prev.images, ...files],
            imagePreviews: [...prev.imagePreviews, ...previews]
        }));

        // 🔥 SAVE META
        setImageMeta(prev => [...prev, ...meta]);

        e.target.value = "";
    };



    const removeImage = (index) => {
        URL.revokeObjectURL(formData.imagePreviews[index]);

        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
            imagePreviews: prev.imagePreviews.filter((_, i) => i !== index)
        }));

        // 🔥 REMOVE META TOO
        setImageMeta(prev => prev.filter((_, i) => i !== index));
    };


    const suggestedAmenities = [
        'Parking', 'AC', 'Stage', 'Generator', 'WiFi', 'Sound System',
        'Lighting', 'Catering', 'Decoration', 'Security', 'Valet Parking',
        'Swimming Pool', 'Garden', 'Lawn', 'Bridal Room', 'VIP Lounge'
    ];

    const popularCities = ['Bahawalpur', 'Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan'];

    return (
        <>
            <Header
                title="Venue "
                subtitle="Add a new venue to your listings"
                pageName="Add New Venue"
                showBackButton={true}
            // showHome={true}

            />


            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-rose-50 to-amber-50 p-4 md:p-6">
                {/* Header */}



                {/* Form Container */}
                <div className="max-w-6xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Basic Information Card */}
                        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl flex items-center justify-center">
                                    <FaHome className="text-white text-xl" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">Basic Information</h2>
                                    <p className="text-gray-600">Enter essential details about your venue</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Name Field */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        <div className="flex items-center space-x-2">
                                            <FaStar className="text-violet-600" />
                                            <span>Venue Name *</span>
                                        </div>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Royal Palace Lawn"
                                        className="w-full px-4 py-3 border-2 border-violet-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400 bg-white/80 transition-all duration-200"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        <div className="flex items-center space-x-2">
                                            <FaChevronUp className="text-purple-600" />
                                            <span>Venue Type *</span>
                                        </div>
                                    </label>
                                    <select
                                        name="venueType"
                                        value={formData.venueType}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border-2 border-purple-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400 bg-white/80 transition-all duration-200"
                                    >
                                        <option value="">Select venue type</option>
                                        <option value="lawn">Lawn</option>
                                        <option value="hall">Hall</option>
                                    </select>

                                </div>


                                {/* Capacity Field */}
                                <div className="md:col-span-1">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        <div className="flex items-center space-x-2">
                                            <FaUsers className="text-amber-600" />
                                            <span>Maximum Capacity *</span>
                                        </div>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            name="capacity"
                                            value={formData.capacity}
                                            onChange={handleChange}
                                            required
                                            min="1"
                                            placeholder="500"
                                            className="w-full px-4 py-3 pl-12 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400 bg-white/80 transition-all duration-200"
                                        />
                                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                                            <FaUsers />
                                        </div>
                                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                            guests
                                        </div>
                                    </div>
                                </div>


                                {/* Address Field */}
                                <div className="md:col-span-1">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        <div className="flex items-center space-x-2">
                                            <FaMapMarkerAlt className="text-rose-600" />
                                            <span>Complete Address *</span>
                                        </div>
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                        placeholder="Model Town, Street # 5, Lahore"
                                        className="w-full px-4 py-3 border-2 border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-400 bg-white/80 transition-all duration-200"
                                    />
                                </div>


                                {/* City Field */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        <div className="flex items-center space-x-2">
                                            <FaCity className="text-emerald-600" />
                                            <span>City *</span>
                                        </div>
                                    </label>

                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter your city"
                                        className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 bg-white/80"
                                    />

                                    {/* Optional quick-select buttons */}
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {popularCities.map(city => (
                                            <button
                                                key={city}
                                                type="button"
                                                onClick={() => setFormData(prev => ({ ...prev, city }))}
                                                className={`px-3 py-1 rounded-lg text-sm ${formData.city === city
                                                    ? 'bg-emerald-100 text-emerald-700'
                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {city}
                                            </button>
                                        ))}
                                    </div>
                                </div>


                            </div>
                        </div>

                        {/* Amenities Card */}
                        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                                    <GiFlowerTwirl className="text-white text-xl" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">Amenities & Facilities</h2>
                                    <p className="text-gray-600">Select available amenities at your venue</p>
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Available Amenities
                                </label>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {formData.amenities.map((amenity, index) => (
                                        <div key={index} className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl border border-violet-200">
                                            <span className="text-violet-700 font-medium">{amenity}</span>
                                            <button
                                                type="button"
                                                onClick={() => removeAmenity(index)}
                                                className="text-rose-500 hover:text-rose-700"
                                            >
                                                <FaTrash className="text-sm" />
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                {/* Add Amenity */}
                                <div className="flex gap-3 mb-6">
                                    <input
                                        type="text"
                                        value={newAmenity}
                                        onChange={(e) => setNewAmenity(e.target.value)}
                                        placeholder="Add custom amenity"
                                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400"
                                    />
                                    <button
                                        type="button"
                                        onClick={addAmenity}
                                        className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-md transition-all duration-200"
                                    >
                                        <FaCartPlus className="text-2xl" />
                                    </button>
                                </div>

                                {/* Suggested Amenities */}
                                <div>
                                    <p className="text-sm text-gray-600 mb-3">Popular amenities:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {suggestedAmenities.map((amenity, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                onClick={() => {
                                                    if (!formData.amenities.includes(amenity)) {
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            amenities: [...prev.amenities, amenity]
                                                        }));
                                                    }
                                                }}
                                                disabled={formData.amenities.includes(amenity)}
                                                className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${formData.amenities.includes(amenity)
                                                    ? 'bg-emerald-100 text-emerald-700 cursor-default'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {amenity === 'WiFi' && <FaWifi />}
                                                {amenity === 'Parking' && <FaParking />}
                                                {amenity === 'Sound System' && <FaMusic />}
                                                {amenity === 'Swimming Pool' && <FaGlassCheers />}
                                                <span>{amenity}</span>
                                                {formData.amenities.includes(amenity) && <FaCheck className="text-emerald-500" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Pricing Card */}
                        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                                    <FaDollarSign className="text-white text-xl" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">Per Head Pricing *</h2>
                                    <p className="text-gray-600">Add dishes with their prices</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {formData.perHeadPricing.map((dish, index) => (
                                    <div key={index} className="flex items-center gap-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                                        <div className="flex-1">
                                            <input
                                                type="text"
                                                value={dish.dishName}
                                                onChange={(e) => {
                                                    const newPricing = [...formData.perHeadPricing];
                                                    newPricing[index].dishName = e.target.value;
                                                    setFormData(prev => ({ ...prev, perHeadPricing: newPricing }));
                                                }}
                                                placeholder="Dish Name"
                                                className="w-full px-4 py-2 bg-white rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300"
                                            />
                                        </div>
                                        <div className="w-32">
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    value={dish.price}
                                                    onChange={(e) => {
                                                        const newPricing = [...formData.perHeadPricing];
                                                        newPricing[index].price = e.target.value;
                                                        setFormData(prev => ({ ...prev, perHeadPricing: newPricing }));
                                                    }}
                                                    placeholder="Price"
                                                    className="w-full px-4 py-2 pl-8 bg-white rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300"
                                                />
                                                <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                                                    ₹
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeDish(index)}
                                            className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                ))}

                                {/* Add New Dish */}
                                <div className="flex items-center flex-col sm:flex-row gap-2 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200">
                                    <div className="flex-1 w-full sm:w-auto">
                                        <input
                                            type="text"
                                            value={newDish.dishName}
                                            onChange={(e) => setNewDish(prev => ({ ...prev, dishName: e.target.value }))}
                                            placeholder="New Dish Name"
                                            className="w-full px-4 py-2 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                                        />
                                    </div>
                                    <div className="w-full sm:w-auto">
                                        <div className="relative">
                                            <input
                                                type="number"
                                                value={newDish.price}
                                                onChange={(e) => setNewDish(prev => ({ ...prev, price: e.target.value }))}
                                                placeholder="Price"
                                                className="w-full px-4 py-2 pl-8 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                                            />
                                            <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                                                Rs.
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={addDish}
                                        className="w-full sm:w-auto px-4 py-2 flex items-center justify-center bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-lg hover:shadow-md transition-all duration-200"
                                    >
                                        <FaCartPlus className="text-2xl" />
                                    </button>

                                </div>
                            </div>
                        </div>

                        {/* Description Card */}
                        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                                    <FaList className="text-white text-xl" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">Description</h2>
                                    <p className="text-gray-600">Describe your venue in detail</p>
                                </div>
                            </div>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={6}
                                placeholder="Premium wedding lawn with full services including catering, decoration, photography, and event planning. Perfect for large weddings and corporate events..."
                                className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 bg-white/80 transition-all duration-200 resize-none"
                            />
                        </div>

                        {/* Images Card */}
                        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl flex items-center justify-center">
                                    <FaImage className="text-white text-xl" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">Venue Images *</h2>
                                    <p className="text-gray-600">Upload high-quality photos of your venue</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                {formData.imagePreviews?.map((src, index) => (
                                    <div key={index} className="relative group">
                                        <img src={src} alt={`Venue ${index + 1}`} className="w-full h-40 object-cover rounded-xl" />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-2 right-2 p-2 bg-white/90 rounded-full text-rose-600 hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                ))}
                                {/* Upload Button */}
                                <label className="cursor-pointer">
                                    <div className="w-full h-40 border-2 border-dashed border-rose-300 rounded-xl flex flex-col items-center justify-center bg-rose-50 hover:bg-rose-100 transition-all duration-200">
                                        <FaUpload className="text-rose-400 text-3xl mb-3" />
                                        <span className="text-rose-600 font-semibold">Upload Image</span>
                                        <span className="text-rose-400 text-sm mt-1">Max 5 photos</span>
                                    </div>
                                    <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                                </label>
                            </div>


                            <p className="text-sm text-gray-500">
                                Upload at least 3 high-quality images. Recommended size: 1200x800px
                            </p>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center">
                           
                            <button
                                type="submit"
                                className="px-8 py-4 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-200  w-full cursor-pointer  flex items-center justify-center"
                            >
                                <div className="flex items-center space-x-3">
                                    <GiPartyPopper />
                                    <span>Submit Venue for Approval</span>
                                </div>
                            </button>
                        </div>
                    </form>

                    {/* Progress Indicator */}
                   
                </div>
            </div>
        </>
    );
};

export default AddVenuePage;