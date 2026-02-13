// app/owner/lawns/create/page.js (Updated with dishes step)
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/owner/ImageUpload";
import AmenitiesSelector from "@/components/owner/AmenitiesSelector";
import DishesManager from "@/components/owner/DishesManager";
import { InputField } from "@/components/InputField";
import { TextArea } from "@/components/TextArea";

const venueTypes = [
    { id: "lawn", label: "Lawn", icon: "🌿" },
    { id: "hall", label: "Hall", icon: "🏢" },
];

export default function CreateVenuePage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [step, setStep] = useState(1);
    const totalSteps = 4; // Updated from 3 to 4

    const [formData, setFormData] = useState({
        // Step 1: Basic Information
        name: "",
        venueType: "",
        city: "",
        address: "",
        description: "",

        // Step 2: Capacity & Pricing
        capacity: "",
        venueRentalFee: "",
        additionalCharges: "",
        pricePerHead: [], // Changed to array for dishes

        // Step 3: Amenities & Contact
        amenities: [],
        contactName: "",
        contactEmail: "",
        contactPhone: "",
        policies: "",

        // Step 4: Images
        images: [],
    });

    useEffect(() => {
        // Check authentication and role
        const userData = localStorage.getItem("bookvenu_user");
        if (!userData) {
            router.push("/login?redirect=/owner/lawns/create");
            return;
        }

        const user = JSON.parse(userData);
        if (user.role !== "owner") {
            router.push("/dashboard");
            return;
        }

        setUser(user);
    }, [router]);

    const validateStep = (stepNumber) => {
        const newErrors = {};

        // if (stepNumber === 1) {
        //     if (!formData.name.trim()) newErrors.name = "Venue name is required";
        //     if (!formData.venueType) newErrors.venueType = "Please select a venue type";
        //     if (!formData.city) newErrors.city = "City is required";
        //     if (!formData.address.trim()) newErrors.address = "Address is required";
        // }

        if (stepNumber === 2) {
            if (!formData.capacity || formData.capacity < 1) newErrors.capacity = "Capacity is required";
        }

        if (stepNumber === 3) {
            if (formData.amenities.length < 3) newErrors.amenities = "Please select at least 3 amenities";
            if (!formData.contactEmail.trim()) newErrors.contactEmail = "Contact email is required";
            if (!formData.contactPhone.trim()) newErrors.contactPhone = "Contact phone is required";
        }

        if (stepNumber === 4) {
            if (formData.images.length < 3) newErrors.images = "Please upload at least 3 images";
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
            alert("Please add at least one dish in Step 2");
            setStep(2);
            return;
        }

        setLoading(true);

        // Simulate API call with multipart/form-data
        setTimeout(() => {
            // Create FormData object for multipart upload
            const formDataObj = new FormData();

            // Append all form fields
            Object.keys(formData).forEach(key => {
                if (key === 'images') {
                    formData.images.forEach((image, index) => {
                        formDataObj.append(`images[${index}]`, image.file);
                    });
                } else if (key === 'amenities' || key === 'pricePerHead') {
                    formDataObj.append(key, JSON.stringify(formData[key]));
                } else {
                    formDataObj.append(key, formData[key]);
                }
            });

            // Add owner info
            formDataObj.append('ownerId', user?.id || '');
            formDataObj.append('ownerName', user?.name || '');
            formDataObj.append('ownerEmail', user?.email || '');

            console.log('Form Data to be sent:', {
                ...formData,
                pricePerHead: formData.pricePerHead, // This will be the array of dishes
                amenities: formData.amenities,
                images: formData.images.map(img => img.file.name)
            });

            alert('Venue created successfully! Redirecting to your venues list.');
            router.push('/owner/lawns');

            setLoading(false);
        }, 2000);
    };

    const handleImageUpload = (files) => {
        const newImages = files.map(file => ({
            id: Date.now() + Math.random(),
            file,
            preview: URL.createObjectURL(file),
            name: file.name,
            size: (file.size / 1024 / 1024).toFixed(2) + ' MB'
        }));

        setFormData(prev => ({
            ...prev,
            images: [...prev.images, ...newImages]
        }));
    };

    const handleRemoveImage = (imageId) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter(img => img.id !== imageId)
        }));
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

    if (!user) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <div className="mb-4 text-6xl">🔒</div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Header */}
            {/* <header className="border-b bg-white">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                        <div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => router.push("/owner/lawns")}
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    ← Back to My Venues
                                </button>
                            </div>
                            <h1 className="mt-2 text-2xl font-bold text-gray-900 md:text-3xl">
                                Add New Venue
                            </h1>
                            <p className="text-gray-600">
                                List your venue and start accepting bookings
                            </p>
                        </div>
                    </div>
                </div>
            </header> */}

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

                                <InputField
                                    label={"Venue Name *"}
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder={"e.g., Royal Emerald Lawn"}
                                    errors={errors.name} />

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

                                <InputField
                                    label={"City *"}
                                    value={formData.city}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                    placeholder={"e.g., Bahawalpur"}
                                    errors={errors.city} />

                                <TextArea
                                    label={"Address *"}
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    placeholder={"Full address with landmarks"}
                                    rows={3}
                                    errors={errors.address} />

                                <TextArea
                                    label={"Description"}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder={"Describe your venue in detail. Include special features, ambiance, and what makes it unique."}
                                    rows={5}
                                    errors={errors.description} />

                            </div>
                        )}

                        {/* Step 2: Dishes & Pricing */}
                        {step === 2 && (
                            <div className="space-y-6">
                                <h3 className="text-xl font-semibold text-gray-900">Dishes & Pricing</h3>

                                <InputField
                                    label={"Capacity *"}
                                    type="number"
                                    value={formData.capacity}
                                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                                    placeholder={"e.g., 200"}
                                    errors={errors.capacity} />

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Venue Rental Fee (Rs)
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                            Rs
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
                                            placeholder="e.g., 5000"
                                        />
                                    </div>
                                    {errors.venueRentalFee && (
                                        <p className="mt-1 text-sm text-red-600">{errors.venueRentalFee}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Additional Charges (Rs)
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                            Rs
                                        </div>
                                        <input
                                            type="number"
                                            value={formData.additionalCharges}
                                            onChange={(e) => setFormData({ ...formData, additionalCharges: e.target.value })}
                                            min="0"
                                            className={`w-full rounded-lg border px-4 py-3 pl-10 focus:outline-none focus:ring-2 ${errors.venueRentalFee
                                                ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                                : "border-gray-300 focus:border-emerald-500 focus:ring-emerald-200"
                                                }`}
                                            placeholder="e.g., 5000"
                                        />
                                    </div>
                                    {errors.additionalCharges && (
                                        <p className="mt-1 text-sm text-red-600">{errors.additionalCharges}</p>
                                    )}
                                </div>

                                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                                    <div className="text-sm font-medium text-gray-700">Dishes Summary</div>
                                    <div className="mt-2 text-2xl font-bold text-emerald-700">
                                        {formData.pricePerHead.length} dishes added
                                    </div>
                                    <div className="mt-1 text-sm text-gray-600">
                                        Minimum 1 dish required
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
                                        Add dishes with their prices. These will be shown as "Price per head" options.
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
                                        Optional: Define your venue's policies
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

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Venue Images *
                                    </label>
                                    <ImageUpload
                                        images={formData.images}
                                        onUpload={handleImageUpload}
                                        onRemove={handleRemoveImage}
                                    />
                                    {errors.images && (
                                        <p className="mt-1 text-sm text-red-600">{errors.images}</p>
                                    )}
                                    <div className="mt-2 text-sm text-gray-500">
                                        {formData.images.length} images uploaded (minimum 3)
                                    </div>
                                    <div className="mt-2 text-xs text-gray-500">
                                        Upload high-quality images of your venue. First image will be used as cover.
                                        Supported formats: JPG, PNG, WebP. Max size: 5MB per image.
                                    </div>
                                </div>

                                {/* Review Section */}
                                <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
                                    <h4 className="mb-4 text-lg font-semibold text-gray-900">Review Your Listing</h4>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div>
                                            <div className="text-sm text-gray-600">Venue Name</div>
                                            <div className="font-medium text-gray-900">{formData.name || "Not set"}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-600">Venue Type</div>
                                            <div className="font-medium text-gray-900 capitalize">
                                                {formData.venueType || "Not set"}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-600">Location</div>
                                            <div className="font-medium text-gray-900">{formData.city || "Not set"}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-600">Capacity</div>
                                            <div className="font-medium text-gray-900">
                                                {formData.capacityMin && formData.capacityMax
                                                    ? `${formData.capacityMin} - ${formData.capacityMax} guests`
                                                    : "Not set"}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-600">Dishes</div>
                                            <div className="font-medium text-gray-900">
                                                {formData.pricePerHead.length} dishes added
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-600">Amenities</div>
                                            <div className="font-medium text-gray-900">
                                                {formData.amenities.length} amenities selected
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
                                disabled={loading}
                                className={`rounded-lg px-6 py-3 font-medium text-white ${loading
                                    ? "cursor-not-allowed bg-gray-400"
                                    : "bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                                    }`}
                            >
                                {loading ? (
                                    <span className="flex items-center">
                                        <svg className="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        {step === totalSteps ? "Creating Venue..." : "Validating..."}
                                    </span>
                                ) : (
                                    step === totalSteps ? "Create Venue" : "Next Step →"
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Tips Section */}
                    <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-6">
                        <h4 className="mb-3 font-semibold text-emerald-800">Tips for a successful listing:</h4>
                        <ul className="space-y-2 text-sm text-emerald-700">
                            <li>• Use high-quality, well-lit photos that showcase your venue</li>
                            <li>• Be detailed in your description - mention what makes your venue unique</li>
                            <li>• Set competitive pricing based on your location and amenities</li>
                            <li>• Be clear about your policies and cancellation terms</li>
                            <li>• Respond quickly to booking inquiries to improve your ranking</li>
                            <li>• Add a variety of dishes to cater to different customer preferences</li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    );
}