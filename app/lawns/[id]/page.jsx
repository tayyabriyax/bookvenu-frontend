// app/lawns/[id]/page.js
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import ImageGallery from "@/components/ImageGallery";
import BookingForm from "@/components/BookingForm";
import AvailabilityCalendar from "@/components/AvailabilityCalendar";
import AmenitiesList from "@/components/AmenitiesList";
import MenuList from "@/components/MenuList";

// Mock data - In real app, this would come from API based on ID
const mockVenue = {
    id: 1,
    name: "Royal Emerald Lawn & Banquet",
    city: "Mumbai",
    address: "123 Palm Grove Road, Bandra West, Mumbai 400050",
    type: "lawn",
    capacity: {
        min: 100,
        max: 500,
        ideal: 300
    },
    rating: 4.8,
    totalReviews: 124,
    description: "A stunning outdoor venue with lush green lawns, elegant banquet facilities, and professional event management services. Perfect for weddings, corporate events, and social gatherings.",
    detailedDescription: "Located in the heart of Mumbai, Royal Emerald Lawn offers a perfect blend of natural beauty and modern amenities. Our venue features beautifully manicured gardens, elegant banquet halls, and a dedicated team to ensure your event is memorable. We provide complete event planning services including catering, decoration, and entertainment coordination.",

    images: [
        { id: 1, url: "https://images.unsplash.com/photo-1549451371-64aa98a6f660?w=1200&auto=format&fit=crop", alt: "Main Lawn Area" },
        { id: 2, url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&auto=format&fit=crop", alt: "Banquet Hall Interior" },
        { id: 3, url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&auto=format&fit=crop", alt: "Garden Area" },
        { id: 4, url: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&auto=format&fit=crop", alt: "Dining Setup" },
        { id: 5, url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&auto=format&fit=crop", alt: "Entrance Area" },
    ],

    amenities: [
        { name: "Air Conditioning", icon: "❄️", available: true },
        { name: "Free Parking", icon: "🅿️", available: true },
        { name: "WiFi", icon: "📶", available: true },
        { name: "Stage", icon: "🎭", available: true },
        { name: "Dance Floor", icon: "💃", available: true },
        { name: "Bridal Room", icon: "👰", available: true },
        { name: "Generator Backup", icon: "⚡", available: true },
        { name: "Catering Kitchen", icon: "👨‍🍳", available: true },
        { name: "Bar Service", icon: "🍸", available: true },
        { name: "Garden Area", icon: "🌿", available: true },
        { name: "Pool", icon: "🏊", available: false },
        { name: "Valet Parking", icon: "🚗", available: true },
    ],

    menu: [
        {
            category: "Vegetarian",
            items: [
                { id: 1, name: "Paneer Tikka", description: "Grilled cottage cheese with Indian spices", price: 450, perPerson: true },
                { id: 2, name: "Vegetable Biryani", description: "Fragrant rice with mixed vegetables", price: 350, perPerson: true },
                { id: 3, name: "Malai Kofta", description: "Creamy cottage cheese balls in rich gravy", price: 400, perPerson: true },
                { id: 4, name: "Mix Veg Platter", description: "Assorted vegetable dishes", price: 550, perPerson: true },
            ]
        },
        {
            category: "Non-Vegetarian",
            items: [
                { id: 5, name: "Chicken Tikka", description: "Grilled chicken with Indian spices", price: 550, perPerson: true },
                { id: 6, name: "Mutton Biryani", description: "Fragrant rice with tender mutton", price: 650, perPerson: true },
                { id: 7, name: "Butter Chicken", description: "Creamy tomato-based chicken curry", price: 600, perPerson: true },
                { id: 8, name: "Fish Fry", description: "Crispy fried fish with spices", price: 500, perPerson: true },
            ]
        },
        {
            category: "International",
            items: [
                { id: 9, name: "Pasta Station", description: "Live pasta counter with sauces", price: 700, perPerson: true },
                { id: 10, name: "Chinese Counter", description: "Live noodles and stir-fry station", price: 650, perPerson: true },
                { id: 11, name: "Salad Bar", description: "Assorted fresh salads", price: 300, perPerson: true },
                { id: 12, name: "Dessert Counter", description: "Assorted Indian and western desserts", price: 400, perPerson: true },
            ]
        },
        {
            category: "Beverages",
            items: [
                { id: 13, name: "Soft Drinks", description: "Unlimited refills", price: 150, perPerson: true },
                { id: 14, name: "Mocktails", description: "Assorted fruit-based drinks", price: 250, perPerson: true },
                { id: 15, name: "Tea/Coffee Station", description: "Unlimited tea and coffee", price: 100, perPerson: true },
                { id: 16, name: "Mineral Water", description: "Bottled water", price: 50, perPerson: true },
            ]
        }
    ],

    pricing: {
        venueRental: 50000,
        basePricePerPerson: 1200,
        serviceCharge: 18, // percentage
        taxes: 5, // percentage
    },

    availability: [
        "2024-03-15",
        "2024-03-20",
        "2024-03-25",
        "2024-03-28",
        "2024-04-05",
        "2024-04-10",
        "2024-04-15",
        "2024-04-20",
    ],

    policies: [
        "50% advance payment required at booking",
        "Full payment 7 days before event",
        "Cancellation 30+ days before: 80% refund",
        "Cancellation 15-30 days before: 50% refund",
        "Cancellation less than 15 days: No refund",
        "Venue rental includes 8 hours of usage",
        "Additional hours: ₹5,000 per hour",
        "Outside catering not allowed",
        "Decoration must be removed same day",
    ]
};

export default function VenueDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [venue, setVenue] = useState(mockVenue);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");

    // In real app, fetch data based on ID
    useEffect(() => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setVenue(mockVenue);
            setLoading(false);
        }, 500);
    }, [params.id]);

    const handleBookNow = (bookingData) => {
        console.log("Booking data:", bookingData);
        // In real app, redirect to login if not authenticated
        // then proceed to booking confirmation
        alert(`Booking initiated for ${venue.name} on ${bookingData.date} for ${bookingData.guests} guests. Total: ₹${bookingData.totalPrice}`);
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <div className="mb-4 text-6xl">🏢</div>
                    <p className="text-gray-600">Loading venue details...</p>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Breadcrumb */}
            <div className="border-b bg-white">
                <div className="container mx-auto px-4 py-4">
                    <nav className="flex items-center text-sm text-gray-600">
                        <button onClick={() => router.push("/")} className="hover:text-emerald-600">
                            Home
                        </button>
                        <span className="mx-2">/</span>
                        <button onClick={() => router.push("/lawns")} className="hover:text-emerald-600">
                            Venues
                        </button>
                        <span className="mx-2">/</span>
                        <span className="text-gray-900">{venue.name}</span>
                    </nav>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Left Column - Venue Details */}
                    <div className="lg:col-span-2">
                        {/* Header */}
                        <div className="mb-6">
                            <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
                                        {venue.name}
                                    </h1>
                                    <div className="mt-2 flex items-center gap-4">
                                        <div className="flex items-center gap-1">
                                            <span className="text-amber-500">★</span>
                                            <span className="font-semibold">{venue.rating}</span>
                                            <span className="text-gray-500">({venue.totalReviews} reviews)</span>
                                        </div>
                                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800 capitalize">
                                            {venue.type}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-emerald-700">
                                        Starting from ₹{venue.pricing.basePricePerPerson.toLocaleString()}
                                    </div>
                                    <div className="text-sm text-gray-500">per person</div>
                                </div>
                            </div>

                            <div className="flex items-center text-gray-600">
                                <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>{venue.address}</span>
                            </div>
                        </div>

                        {/* Image Gallery */}
                        <div className="mb-8">
                            <ImageGallery images={venue.images} />
                        </div>

                        {/* Tabs */}
                        <div className="mb-8 border-b">
                            <div className="flex space-x-8 overflow-x-auto">
                                {["overview", "amenities", "menu", "policies", "reviews"].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium capitalize ${activeTab === tab
                                            ? "border-emerald-500 text-emerald-600"
                                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tab Content */}
                        <div className="mb-8">
                            {activeTab === "overview" && (
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="mb-4 text-xl font-semibold text-gray-900">About This Venue</h3>
                                        <p className="text-gray-600">{venue.detailedDescription}</p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                        <div className="rounded-xl border border-gray-200 bg-white p-6">
                                            <div className="mb-2 flex items-center text-gray-700">
                                                <span className="mr-2 text-2xl">👥</span>
                                                <div>
                                                    <div className="font-semibold">Capacity</div>
                                                    <div className="text-2xl font-bold text-gray-900">
                                                        Up to {venue.capacity.max.toLocaleString()}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        Min {venue.capacity.min.toLocaleString()} guests
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="rounded-xl border border-gray-200 bg-white p-6">
                                            <div className="mb-2 flex items-center text-gray-700">
                                                <span className="mr-2 text-2xl">🏢</span>
                                                <div>
                                                    <div className="font-semibold">Venue Type</div>
                                                    <div className="text-2xl font-bold text-gray-900 capitalize">
                                                        {venue.type}
                                                    </div>
                                                    <div className="text-sm text-gray-500 capitalize">
                                                        {venue.type === "lawn" ? "Outdoor Lawn" : "Banquet Hall"}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="rounded-xl border border-gray-200 bg-white p-6">
                                            <div className="mb-2 flex items-center text-gray-700">
                                                <span className="mr-2 text-2xl">⭐</span>
                                                <div>
                                                    <div className="font-semibold">Rating</div>
                                                    <div className="text-2xl font-bold text-gray-900">
                                                        {venue.rating}/5
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {venue.totalReviews.toLocaleString()} reviews
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quick Amenities Preview */}
                                    <div>
                                        <h4 className="mb-4 text-lg font-semibold text-gray-900">Key Features</h4>
                                        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                                            {venue.amenities.slice(0, 8).map((amenity, index) => (
                                                <div key={index} className="flex items-center rounded-lg border border-gray-200 p-3">
                                                    <span className="mr-2">{amenity.icon}</span>
                                                    <span className="text-sm">{amenity.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === "amenities" && <AmenitiesList amenities={venue.amenities} />}
                            {activeTab === "menu" && <MenuList menu={venue.menu} />}

                            {activeTab === "policies" && (
                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold text-gray-900">Venue Policies</h3>
                                    <ul className="space-y-3">
                                        {venue.policies.map((policy, index) => (
                                            <li key={index} className="flex items-start">
                                                <span className="mr-3 mt-1 text-emerald-500">•</span>
                                                <span className="text-gray-600">{policy}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {activeTab === "reviews" && (
                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold text-gray-900">Reviews & Ratings</h3>
                                    <div className="rounded-xl border border-gray-200 bg-white p-6">
                                        <div className="text-center">
                                            <div className="mb-2 text-5xl font-bold text-gray-900">{venue.rating}</div>
                                            <div className="mb-4 flex justify-center">
                                                {"★".repeat(5).split("").map((star, i) => (
                                                    <span key={i} className={`text-2xl ${i < Math.floor(venue.rating) ? "text-amber-500" : "text-gray-300"}`}>
                                                        {star}
                                                    </span>
                                                ))}
                                            </div>
                                            <p className="text-gray-600">
                                                Based on {venue.totalReviews} reviews
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Availability Calendar */}
                        <div className="mb-8">
                            <h3 className="mb-4 text-xl font-semibold text-gray-900">Check Availability</h3>
                            <AvailabilityCalendar availableDates={venue.availability} />
                        </div>
                    </div>

                    {/* Right Column - Booking Form */}
                    <div className="lg:sticky lg:top-8 lg:h-fit">
                        <BookingForm
                            venue={venue}
                            onBookNow={handleBookNow}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}