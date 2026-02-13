// app/owner/lawns/[id]/edit/page.js
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import ImageUpload from "@/components/owner/ImageUpload";
import AmenitiesSelector from "@/components/owner/AmenitiesSelector";
import DishesManager from "@/components/owner/DishesManager";

const venueTypes = [
    { id: "lawn", label: "Lawn", icon: "🌿" },
    { id: "hall", label: "Banquet Hall", icon: "🏢" },
    { id: "rooftop", label: "Rooftop", icon: "🏙️" },
    { id: "garden", label: "Garden", icon: "🌳" },
    { id: "beach", label: "Beach", icon: "🏖️" },
    { id: "palace", label: "Palace", icon: "🏰" },
    { id: "conference", label: "Conference Hall", icon: "💼" },
    { id: "farmhouse", label: "Farmhouse", icon: "🏡" },
];

const cities = [
    "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai",
    "Kolkata", "Pune", "Goa", "Jaipur", "Ahmedabad", "Lucknow"
];

const capacityOptions = [
    { label: "Small (1-100 guests)", min: 1, max: 100 },
    { label: "Medium (101-300 guests)", min: 101, max: 300 },
    { label: "Large (301-600 guests)", min: 301, max: 600 },
    { label: "Extra Large (601-1000 guests)", min: 601, max: 1000 },
    { label: "Mega (1000+ guests)", min: 1001, max: 5000 },
];

// Mock venue data - In real app, fetch from API based on ID
const mockVenue = {
    id: 1,
    name: "Royal Emerald Lawn",
    venueType: "lawn",
    city: "Mumbai",
    address: "123 Palm Grove Road, Bandra West, Mumbai 400050",
    description: "A stunning outdoor venue with lush green lawns, elegant banquet facilities, and professional event management services. Perfect for weddings, corporate events, and social gatherings.",

    capacityMin: 100,
    capacityMax: 500,
    pricePerHead: [
        { dishName: "Paneer Tikka", price: 450 },
        { dishName: "Chicken Biryani", price: 550 },
        { dishName: "Butter Chicken", price: 600 },
        { dishName: "Vegetable Platter", price: 350 },
        { dishName: "Soft Drinks", price: 150 },
    ],
    venueRentalFee: 50000,

    amenities: ["parking", "ac", "wifi", "stage", "dance_floor", "catering", "bar"],
    contactName: "Rajesh Kumar",
    contactEmail: "rajesh@royalemerald.com",
    contactPhone: "+91 98765 43210",
    policies: "50% advance payment required at booking. Full payment 7 days before event. Cancellation 30+ days before: 80% refund. Cancellation 15-30 days before: 50% refund. Cancellation less than 15 days: No refund.",

    images: [
        { id: 1, name: "main.jpg", size: "1.2 MB", preview: "🏢", isExisting: true },
        { id: 2, name: "garden.jpg", size: "0.8 MB", preview: "🌿", isExisting: true },
        { id: 3, name: "hall.jpg", size: "1.5 MB", preview: "🏢", isExisting: true },
    ],

    status: "approved",
    approvalStatus: "active",
    totalBookings: 12,
    revenue: 425000,
    rating: 4.8,
    reviews: 124,
    createdAt: "2024-01-15",
    updatedAt: "2024-02-20",
};

export default function EditVenuePage() {
    const params = useParams();
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState({});
    const [step, setStep] = useState(1);
    const totalSteps = 4;

    const [formData, setFormData] = useState({
        // Step 1: Basic Information
        name: "",
        venueType: "",
        city: "",
        address: "",
        description: "",

        // Step 2: Capacity & Pricing
        capacityMin: "",
        capacityMax: "",
        pricePerHead: [],
        venueRentalFee: "",

        // Step 3: Amenities & Contact
        amenities: [],
        contactName: "",
        contactEmail: "",
        contactPhone: "",
        policies: "",

        // Step 4: Images
        images: [], // Mix of existing and new images
    });

    // Track images to be removed
    const [imagesToRemove, setImagesToRemove] = useState([]);

    useEffect(() => {
        // Check authentication and role
        const userData = localStorage.getItem("bookvenu_user");
        if (!userData) {
            router.push(`/login?redirect=/owner/lawns/${params.id}/edit`);
            return;
        }

        const user = JSON.parse(userData);
        if (user.role !== "owner") {
            router.push("/dashboard");
            return;
        }

        setUser(user);

        // Simulate fetching venue data
        setTimeout(() => {
            // Set form data from mock venue
            setFormData({
                name: mockVenue.name,
                venueType: mockVenue.venueType,
                city: mockVenue.city,
                address: mockVenue.address,
                description: mockVenue.description,
                capacityMin: mockVenue.capacityMin,
                capacityMax: mockVenue.capacityMax,
                pricePerHead: mockVenue.pricePerHead,
                venueRentalFee: mockVenue.venueRentalFee,
                amenities: mockVenue.amenities,
                contactName: mockVenue.contactName,
                contactEmail: mockVenue.contactEmail,
                contactPhone: mockVenue.contactPhone,
                policies: mockVenue.policies,
                images: mockVenue.images, // Existing images
            });
            setLoading(false);
        }, 1000);
    }, [params.id, router]);

    const validateStep = (stepNumber) => {
        const newErrors = {};

        if (stepNumber === 1) {
            if (!formData.name.trim()) newErrors.name = "Venue name is required";
            if (!formData.venueType) newErrors.venueType = "Please select a venue type";
            if (!formData.city) newErrors.city = "Please select a city";
            if (!formData.address.trim()) newErrors.address = "Address is required";
            if (!formData.description.trim()) newErrors.description = "Description is required";
            if (formData.description.length < 50) newErrors.description = "Description should be at least 50 characters";
        }

        if (stepNumber === 2) {
            if (!formData.capacityMin || formData.capacityMin < 1) newErrors.capacityMin = "Minimum capacity is required";
            if (!formData.capacityMax || formData.capacityMax < 1) newErrors.capacityMax = "Maximum capacity is required";
            if (parseInt(formData.capacityMin) > parseInt(formData.capacityMax)) {
                newErrors.capacityMax = "Maximum capacity must be greater than minimum";
            }
            if (!formData.venueRentalFee || formData.venueRentalFee < 0) newErrors.venueRentalFee = "Venue rental fee is required";
        }

        if (stepNumber === 3) {
            if (formData.amenities.length < 3) newErrors.amenities = "Please select at least 3 amenities";
            if (!formData.contactName.trim()) newErrors.contactName = "Contact person name is required";
            if (!formData.contactEmail.trim()) newErrors.contactEmail = "Contact email is required";
            if (!formData.contactPhone.trim()) newErrors.contactPhone = "Contact phone is required";
        }

        if (stepNumber === 4) {
            const totalImages = formData.images.filter(img => !imagesToRemove.includes(img.id)).length;
            if (totalImages < 3) newErrors.images = "Please keep at least 3 images";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNextStep = () => {
        if (validateStep(step)) {
            if (step < totalSteps) {
                setStep(step + 1);
                window.scrollTo(0, 0);
            } else {
                handleSubmit();
            }
        }
    };

    const handlePrevStep = () => {
        if (step > 1) {
            setStep(step - 1);
            window.scrollTo(0, 0);
        }
    };

    const handleSubmit = async () => {
        if (!validateStep(4)) return;

        // Validate dishes
        if (formData.pricePerHead.length === 0) {
            alert("Please keep at least one dish");
            setStep(2);
            return;
        }

        setSaving(true);

        // Simulate API call with multipart/form-data
        setTimeout(() => {
            // Create FormData object for multipart upload
            const formDataObj = new FormData();

            // Append all form fields
            Object.keys(formData).forEach(key => {
                if (key === 'images') {
                    // Only append new images (files), not existing ones
                    formData.images.forEach((image, index) => {
                        if (!image.isExisting) {
                            formDataObj.append(`newImages[${index}]`, image.file);
                        }
                    });
                } else if (key === 'amenities' || key === 'pricePerHead') {
                    formDataObj.append(key, JSON.stringify(formData[key]));
                } else {
                    formDataObj.append(key, formData[key]);
                }
            });

            // Add images to remove
            formDataObj.append('imagesToRemove', JSON.stringify(imagesToRemove));

            // Add venue ID
            formDataObj.append('id', params.id);

            // Add owner info
            formDataObj.append('ownerId', user?.id || '');

            console.log('Update Data:', {
                ...formData,
                imagesToRemove,
                pricePerHead: formData.pricePerHead,
                amenities: formData.amenities,
                newImagesCount: formData.images.filter(img => !img.isExisting).length
            });

            alert('Venue updated successfully!');
            router.push('/owner/lawns');

            setSaving(false);
        }, 2000);
    };

    const handleImageUpload = (files) => {
        const newImages = files.map(file => ({
            id: Date.now() + Math.random(),
            file,
            preview: URL.createObjectURL(file),
            name: file.name,
            size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
            isExisting: false
        }));

        setFormData(prev => ({
            ...prev,
            images: [...prev.images, ...newImages]
        }));
    };

    const handleRemoveImage = (imageId) => {
        const image = formData.images.find(img => img.id === imageId);

        if (image?.isExisting) {
            // Mark existing image for removal
            setImagesToRemove(prev => [...prev, imageId]);
        }

        // Remove from display immediately
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter(img => img.id !== imageId)
        }));
    };

    const handleRestoreImage = (imageId) => {
        // Remove from imagesToRemove if it was marked for removal
        setImagesToRemove(prev => prev.filter(id => id !== imageId));

        // In real app, you'd need to restore from original data
        // For now, we'll simulate by adding back the mock image
        const originalImage = mockVenue.images.find(img => img.id === imageId);
        if (originalImage) {
            setFormData(prev => ({
                ...prev,
                images: [...prev.images, originalImage]
            }));
        }
    };

    const handleAmenityToggle = (amenity) => {
        setFormData(prev => ({
            ...prev,
            amenities: prev.amenities.includes(amenity)
                ? prev.amenities.filter(a => a !== amenity)
                : [...prev.amenities, amenity]
        }));
    };

    const handleCapacityOption = (option) => {
        setFormData(prev => ({
            ...prev,
            capacityMin: option.min,
            capacityMax: option.max
        }));
    };

    const handleAddDish = (dish) => {
        setFormData(prev => ({
            ...prev,
            pricePerHead: [...prev.pricePerHead, dish]
        }));
    };

    const handleUpdateDish = (index, updatedDish) => {
        setFormData(prev => ({
            ...prev,
            pricePerHead: prev.pricePerHead.map((dish, i) =>
                i === index ? updatedDish : dish
            )
        }));
    };

    const handleRemoveDish = (index) => {
        setFormData(prev => ({
            ...prev,
            pricePerHead: prev.pricePerHead.filter((_, i) => i !== index)
        }));
    };

    const getStatusBadge = () => {
        const badges = {
            approved: { color: "emerald", text: "Approved" },
            pending: { color: "amber", text: "Pending Review" },
            rejected: { color: "red", text: "Rejected" },
        };

        const status = mockVenue.status;
        const badge = badges[status] || { color: "gray", text: "Unknown" };

        return (
            <span className={`ml-2 rounded-full px-3 py-1 text-sm font-medium bg-${badge.color}-100 text-${badge.color}-800`}>
                {badge.text}
            </span>
        );
    };

    const getApprovalBadge = () => {
        const badges = {
            active: { color: "green", text: "Active" },
            inactive: { color: "gray", text: "Inactive" },
            under_review: { color: "blue", text: "Under Review" },
        };

        const status = mockVenue.approvalStatus;
        const badge = badges[status] || { color: "gray", text: "Unknown" };

        return (
            <span className={`ml-2 rounded-full px-3 py-1 text-sm font-medium bg-${badge.color}-100 text-${badge.color}-800`}>
                {badge.text}
            </span>
        );
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <div className="mb-4 text-6xl">✏️</div>
                    <p className="text-gray-600">Loading venue data...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="border-b bg-white">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                        <div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => router.push(`/owner/lawns/${params.id}`)}
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    ← Back to Venue Details
                                </button>
                            </div>
                            <div className="mt-2 flex flex-col gap-2 md:flex-row md:items-center">
                                <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                                    Edit {formData.name}
                                </h1>
                                {getStatusBadge()}
                                {getApprovalBadge()}
                            </div>
                            <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                                <span>ID: {params.id}</span>
                                <span>•</span>
                                <span>{mockVenue.totalBookings} bookings</span>
                                <span>•</span>
                                <span>₹{mockVenue.revenue.toLocaleString()} revenue</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => router.push(`/owner/lawns/${params.id}`)}
                                className="rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                {/* Progress Steps */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        {[1, 2, 3, 4].map((stepNumber) => (
                            <div key={stepNumber} className="flex flex-1 items-center">
                                <div className="flex flex-col items-center">
                                    <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${step >= stepNumber
                                            ? "border-emerald-600 bg-emerald-600 text-white"
                                            : "border-gray-300 bg-white text-gray-500"
                                        }`}>
                                        {step > stepNumber ? "✓" : stepNumber}
                                    </div>
                                    <div className="mt-2 text-sm font-medium">
                                        {stepNumber === 1 && "Basic Info"}
                                        {stepNumber === 2 && "Dishes & Pricing"}
                                        {stepNumber === 3 && "Amenities"}
                                        {stepNumber === 4 && "Images"}
                                    </div>
                                </div>
                                {stepNumber < 4 && (
                                    <div className={`h-1 flex-1 mx-2 ${step > stepNumber ? "bg-emerald-600" : "bg-gray-300"
                                        }`}></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mx-auto max-w-4xl">
                    {/* Status Alert */}
                    {mockVenue.status === "pending" && (
                        <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
                            <div className="flex items-center">
                                <span className="mr-2 text-amber-600">⚠️</span>
                                <div>
                                    <div className="font-medium text-amber-800">Venue Under Review</div>
                                    <div className="text-sm text-amber-700">
                                        Your venue is currently being reviewed by our team. Some changes may require re-approval.
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {mockVenue.status === "rejected" && (
                        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
                            <div className="flex items-center">
                                <span className="mr-2 text-red-600">❌</span>
                                <div>
                                    <div className="font-medium text-red-800">Venue Rejected</div>
                                    <div className="text-sm text-red-700">
                                        Your venue was rejected. Please address the issues mentioned in the rejection email and update the details.
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Form */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 md:p-8">
                        {errors.general && (
                            <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-800">
                                {errors.general}
                            </div>
                        )}

                        {/* Step 1: Basic Information */}
                        {step === 1 && (
                            <div className="space-y-6">
                                <h3 className="text-xl font-semibold text-gray-900">Basic Information</h3>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Venue Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 ${errors.name
                                                ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                                : "border-gray-300 focus:border-emerald-500 focus:ring-emerald-200"
                                            }`}
                                        placeholder="e.g., Royal Emerald Lawn"
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Venue Type *
                                    </label>
                                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                                        {venueTypes.map((type) => (
                                            <label
                                                key={type.id}
                                                className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 p-4 text-center transition-all ${formData.venueType === type.id
                                                        ? "border-emerald-500 bg-emerald-50"
                                                        : "border-gray-200 hover:border-gray-300"
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="venueType"
                                                    value={type.id}
                                                    checked={formData.venueType === type.id}
                                                    onChange={(e) => setFormData({ ...formData, venueType: e.target.value })}
                                                    className="sr-only"
                                                />
                                                <span className="mb-2 text-2xl">{type.icon}</span>
                                                <span className="text-sm font-medium">{type.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {errors.venueType && (
                                        <p className="mt-1 text-sm text-red-600">{errors.venueType}</p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            City *
                                        </label>
                                        <select
                                            value={formData.city}
                                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                            className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 ${errors.city
                                                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                                    : "border-gray-300 focus:border-emerald-500 focus:ring-emerald-200"
                                                }`}
                                        >
                                            <option value="">Select City</option>
                                            {cities.map((city) => (
                                                <option key={city} value={city}>{city}</option>
                                            ))}
                                        </select>
                                        {errors.city && (
                                            <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Contact Person Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.contactName}
                                            onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                                            placeholder="Enter contact person name"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Address *
                                    </label>
                                    <textarea
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        rows={3}
                                        className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 ${errors.address
                                                ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                                : "border-gray-300 focus:border-emerald-500 focus:ring-emerald-200"
                                            }`}
                                        placeholder="Full address with landmarks"
                                    />
                                    {errors.address && (
                                        <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Description *
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows={5}
                                        className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 ${errors.description
                                                ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                                : "border-gray-300 focus:border-emerald-500 focus:ring-emerald-200"
                                            }`}
                                        placeholder="Describe your venue in detail. Include special features, ambiance, and what makes it unique."
                                    />
                                    {errors.description && (
                                        <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                                    )}
                                    <div className="mt-1 text-sm text-gray-500">
                                        {formData.description.length} characters (minimum 50)
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Dishes & Pricing */}
                        {step === 2 && (
                            <div className="space-y-6">
                                <h3 className="text-xl font-semibold text-gray-900">Dishes & Pricing</h3>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Quick Capacity Options
                                    </label>
                                    <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                                        {capacityOptions.map((option) => (
                                            <button
                                                key={option.label}
                                                type="button"
                                                onClick={() => handleCapacityOption(option)}
                                                className={`rounded-lg border p-3 text-left ${formData.capacityMin == option.min && formData.capacityMax == option.max
                                                        ? "border-emerald-500 bg-emerald-50"
                                                        : "border-gray-200 hover:border-gray-300"
                                                    }`}
                                            >
                                                <div className="font-medium">{option.label}</div>
                                                <div className="text-sm text-gray-600">
                                                    {option.min} - {option.max} guests
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Minimum Capacity *
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                value={formData.capacityMin}
                                                onChange={(e) => setFormData({ ...formData, capacityMin: e.target.value })}
                                                min="1"
                                                className={`w-full rounded-lg border px-4 py-3 pr-10 focus:outline-none focus:ring-2 ${errors.capacityMin
                                                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                                        : "border-gray-300 focus:border-emerald-500 focus:ring-emerald-200"
                                                    }`}
                                                placeholder="e.g., 100"
                                            />
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                                                guests
                                            </div>
                                        </div>
                                        {errors.capacityMin && (
                                            <p className="mt-1 text-sm text-red-600">{errors.capacityMin}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Maximum Capacity *
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                value={formData.capacityMax}
                                                onChange={(e) => setFormData({ ...formData, capacityMax: e.target.value })}
                                                min="1"
                                                className={`w-full rounded-lg border px-4 py-3 pr-10 focus:outline-none focus:ring-2 ${errors.capacityMax
                                                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                                        : "border-gray-300 focus:border-emerald-500 focus:ring-emerald-200"
                                                    }`}
                                                placeholder="e.g., 500"
                                            />
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                                                guests
                                            </div>
                                        </div>
                                        {errors.capacityMax && (
                                            <p className="mt-1 text-sm text-red-600">{errors.capacityMax}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Venue Rental Fee (₹) *
                                        </label>
                                        <div className="relative">
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                                ₹
                                            </div>
                                            <input
                                                type="number"
                                                value={formData.venueRentalFee}
                                                onChange={(e) => setFormData({ ...formData, venueRentalFee: e.target.value })}
                                                min="0"
                                                className={`w-full rounded-lg border px-4 py-3 pl-10 focus:outline-none focus:ring-2 ${errors.venueRentalFee
                                                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                                        : "border-gray-300 focus:border-emerald-500 focus:ring-emerald-200"
                                                    }`}
                                                placeholder="e.g., 50000"
                                            />
                                        </div>
                                        {errors.venueRentalFee && (
                                            <p className="mt-1 text-sm text-red-600">{errors.venueRentalFee}</p>
                                        )}
                                        <div className="mt-1 text-sm text-gray-500">
                                            Base fee for venue usage (8 hours)
                                        </div>
                                    </div>

                                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                                        <div className="text-sm font-medium text-gray-700">Dishes Summary</div>
                                        <div className="mt-2 text-2xl font-bold text-emerald-700">
                                            {formData.pricePerHead.length} dishes
                                        </div>
                                        <div className="mt-1 text-sm text-gray-600">
                                            Minimum 1 dish required
                                        </div>
                                    </div>
                                </div>

                                {/* Dishes Manager Component */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Menu Dishes *
                                    </label>
                                    <DishesManager
                                        dishes={formData.pricePerHead}
                                        onAddDish={handleAddDish}
                                        onUpdateDish={handleUpdateDish}
                                        onRemoveDish={handleRemoveDish}
                                    />
                                    <div className="mt-2 text-sm text-gray-500">
                                        Update your menu dishes and prices
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Cancellation & Policies
                                    </label>
                                    <textarea
                                        value={formData.policies}
                                        onChange={(e) => setFormData({ ...formData, policies: e.target.value })}
                                        rows={4}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                                        placeholder="Enter your venue policies, cancellation rules, terms and conditions..."
                                    />
                                    <div className="mt-1 text-sm text-gray-500">
                                        Update your venue policies
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Amenities */}
                        {step === 3 && (
                            <div className="space-y-6">
                                <h3 className="text-xl font-semibold text-gray-900">Amenities & Contact</h3>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Contact Information *
                                    </label>
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <div>
                                            <input
                                                type="email"
                                                value={formData.contactEmail}
                                                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                                                className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 ${errors.contactEmail
                                                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                                        : "border-gray-300 focus:border-emerald-500 focus:ring-emerald-200"
                                                    }`}
                                                placeholder="Contact Email"
                                            />
                                            {errors.contactEmail && (
                                                <p className="mt-1 text-sm text-red-600">{errors.contactEmail}</p>
                                            )}
                                        </div>
                                        <div>
                                            <input
                                                type="tel"
                                                value={formData.contactPhone}
                                                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                                                className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 ${errors.contactPhone
                                                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                                        : "border-gray-300 focus:border-emerald-500 focus:ring-emerald-200"
                                                    }`}
                                                placeholder="Contact Phone"
                                            />
                                            {errors.contactPhone && (
                                                <p className="mt-1 text-sm text-red-600">{errors.contactPhone}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Amenities *
                                    </label>
                                    <AmenitiesSelector
                                        selectedAmenities={formData.amenities}
                                        onToggleAmenity={handleAmenityToggle}
                                    />
                                    {errors.amenities && (
                                        <p className="mt-1 text-sm text-red-600">{errors.amenities}</p>
                                    )}
                                    <div className="mt-2 text-sm text-gray-500">
                                        {formData.amenities.length} amenities selected (minimum 3)
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Images */}
                        {step === 4 && (
                            <div className="space-y-6">
                                <h3 className="text-xl font-semibold text-gray-900">Venue Images</h3>

                                {/* Removed Images Alert */}
                                {imagesToRemove.length > 0 && (
                                    <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <span className="mr-2 text-amber-600">🗑️</span>
                                                <div>
                                                    <div className="font-medium text-amber-800">{imagesToRemove.length} images marked for removal</div>
                                                    <div className="text-sm text-amber-700">
                                                        These images will be deleted when you save changes
                                                    </div>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    // Restore all removed images
                                                    imagesToRemove.forEach(id => handleRestoreImage(id));
                                                }}
                                                className="text-sm text-amber-700 hover:text-amber-800"
                                            >
                                                Undo All
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Venue Images *
                                    </label>
                                    <ImageUpload
                                        images={formData.images}
                                        onUpload={handleImageUpload}
                                        onRemove={handleRemoveImage}
                                        isEditMode={true}
                                    />
                                    {errors.images && (
                                        <p className="mt-1 text-sm text-red-600">{errors.images}</p>
                                    )}
                                    <div className="mt-2 text-sm text-gray-500">
                                        {formData.images.length} images (minimum 3)
                                    </div>
                                    <div className="mt-2 text-xs text-gray-500">
                                        Upload new images or remove existing ones. First image will be used as cover.
                                        Click on existing images to remove them.
                                    </div>
                                </div>

                                {/* Review Section */}
                                <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
                                    <h4 className="mb-4 text-lg font-semibold text-gray-900">Update Summary</h4>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div>
                                            <div className="text-sm text-gray-600">Venue Name</div>
                                            <div className="font-medium text-gray-900">{formData.name}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-600">Venue Type</div>
                                            <div className="font-medium text-gray-900 capitalize">
                                                {formData.venueType}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-600">Location</div>
                                            <div className="font-medium text-gray-900">{formData.city}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-600">Capacity</div>
                                            <div className="font-medium text-gray-900">
                                                {formData.capacityMin} - {formData.capacityMax} guests
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-600">Dishes</div>
                                            <div className="font-medium text-gray-900">
                                                {formData.pricePerHead.length} dishes
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-600">Amenities</div>
                                            <div className="font-medium text-gray-900">
                                                {formData.amenities.length} amenities
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-600">Images</div>
                                            <div className="font-medium text-gray-900">
                                                {formData.images.length} images ({imagesToRemove.length} marked for removal)
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-600">Status</div>
                                            <div className="flex items-center">
                                                {getStatusBadge()}
                                                {getApprovalBadge()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="mt-8 flex justify-between">
                            <button
                                type="button"
                                onClick={handlePrevStep}
                                disabled={step === 1}
                                className={`rounded-lg px-6 py-3 font-medium ${step === 1
                                        ? "cursor-not-allowed border border-gray-300 text-gray-400"
                                        : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                                    }`}
                            >
                                ← Previous
                            </button>

                            <button
                                type="button"
                                onClick={handleNextStep}
                                disabled={saving}
                                className={`rounded-lg px-6 py-3 font-medium text-white ${saving
                                        ? "cursor-not-allowed bg-gray-400"
                                        : "bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                                    }`}
                            >
                                {saving ? (
                                    <span className="flex items-center">
                                        <svg className="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        {step === totalSteps ? "Saving Changes..." : "Validating..."}
                                    </span>
                                ) : (
                                    step === totalSteps ? "Update Venue" : "Next Step →"
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Tips Section */}
                    <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-6">
                        <h4 className="mb-3 font-semibold text-emerald-800">Editing Notes:</h4>
                        <ul className="space-y-2 text-sm text-emerald-700">
                            <li>• Changes may require re-approval if your venue is currently "Approved"</li>
                            <li>• Removing images will permanently delete them from your listing</li>
                            <li>• Updated information will be reflected immediately after saving</li>
                            <li>• If your venue has active bookings, some changes may be restricted</li>
                            <li>• Contact support if you need to make urgent changes to a booked venue</li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    );
}