// app/owner/venues/[id]/page.js
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import ImageGallery from "@/components/ImageGallery";
import AvailabilityCalendar from "@/components/AvailabilityCalendar";
import AmenitiesList from "@/components/AmenitiesList";
import MenuList from "@/components/MenuList";
import VenueStats from "@/components/owner/VenueStats";
import VenueBookingsTable from "@/components/owner/VenueBookingsTable";

// Mock data - In real app, this would come from API based on ID
const mockVenue = {
    id: 1,
    name: "Royal Emerald Lawn & Banquet",
    city: "Mumbai",
    address: "123 Palm Grove Road, Bandra West, Mumbai 400050",
    type: "lawn",
    status: "active", // active, inactive, pending
    listingDate: "2024-01-15",
    lastUpdated: "2024-02-20",

    capacity: {
        min: 100,
        max: 500,
        ideal: 300
    },
    rating: 4.8,
    totalReviews: 124,

    description: "A stunning outdoor venue with lush green lawns, elegant banquet facilities, and professional event management services. Perfect for weddings, corporate events, and social gatherings.",
    detailedDescription: "Located in the heart of Mumbai, Royal Emerald Lawn offers a perfect blend of natural beauty and modern amenities. Our venue features beautifully manicured gardens, elegant banquet halls, and a dedicated team to ensure your event is memorable.",

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
        }
    ],

    pricing: {
        venueRental: 50000,
        basePricePerPerson: 1200,
        serviceCharge: 18, // percentage
        taxes: 5, // percentage
        additionalHourRate: 5000,
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
    ],

    // Owner-specific data
    stats: {
        totalBookings: 45,
        upcomingBookings: 8,
        revenueThisMonth: 1250000,
        revenueTotal: 8500000,
        averageRating: 4.8,
        occupancyRate: 78, // percentage
        pendingPayments: 3,
        cancellationsThisMonth: 2,
    },

    bookings: [
        {
            id: "BK001",
            customer: "John Doe",
            date: "2024-03-15",
            time: "14:00 - 22:00",
            guests: 250,
            amount: 425000,
            status: "confirmed",
            paymentStatus: "paid",
            eventType: "Wedding"
        },
        {
            id: "BK002",
            customer: "Sarah Smith",
            date: "2024-03-20",
            time: "18:00 - 02:00",
            guests: 150,
            amount: 285000,
            status: "pending",
            paymentStatus: "pending",
            eventType: "Birthday Party"
        },
        {
            id: "BK003",
            customer: "Robert Johnson",
            date: "2024-03-25",
            time: "16:00 - 00:00",
            guests: 80,
            amount: 156000,
            status: "confirmed",
            paymentStatus: "partial",
            eventType: "Corporate Event"
        }
    ]
};

export default function OwnerVenueDetailPage() {
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

    const handleEditVenue = () => {
        router.push(`/owner/lawns/${venue.id}/edit`);
    };

    const handleManageAvailability = () => {
        router.push(`/owner/lawns/${venue.id}/availability`);
    };

    const handleManageMenu = () => {
        router.push(`/owner/lawns/${venue.id}/dishes`);
    };

    const handleViewAllBookings = () => {
        router.push(`/owner/bookings?venue=${venue.name}`);
    };

    const handleViewCalendar = () => {
        router.push(`/owner/calendar?venue=${venue.id}`);
    };

    const handleToggleStatus = () => {
        if (confirm(`Are you sure you want to ${venue.status === "active" ? "deactivate" : "activate"} this venue?`)) {
            const newStatus = venue.status === "active" ? "inactive" : "active";
            setVenue({ ...venue, status: newStatus });
            alert(`Venue ${newStatus === "active" ? "activated" : "deactivated"} successfully!`);
        }
    };

    const handleDeleteVenue = () => {
        if (confirm("Are you sure you want to delete this venue? This action cannot be undone.")) {
            // API call to delete venue
            alert("Venue deleted successfully!");
            router.push("/owner/venues");
        }
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
                        <button onClick={() => router.push("/owner/dashboard")} className="hover:text-emerald-600">
                            Dashboard
                        </button>
                        <span className="mx-2">/</span>
                        <button onClick={() => router.push("/owner/venues")} className="hover:text-emerald-600">
                            Venues
                        </button>
                        <span className="mx-2">/</span>
                        <span className="text-gray-900">{venue.name}</span>
                    </nav>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Header with Actions */}
                <div className="mb-8">
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
                                <span className={`rounded-full px-3 py-1 text-sm font-medium capitalize ${venue.status === "active"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : venue.status === "inactive"
                                        ? "bg-red-100 text-red-800"
                                        : "bg-amber-100 text-amber-800"
                                    }`}>
                                    {venue.status}
                                </span>
                                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 capitalize">
                                    {venue.type}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={handleEditVenue}
                                className="rounded-lg border border-emerald-600 bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700"
                            >
                                ✏️ Edit Venue
                            </button>
                            <button
                                onClick={handleViewCalendar}
                                className="rounded-lg border border-blue-600 bg-white px-4 py-2 font-medium text-blue-700 hover:bg-blue-50"
                            >
                                📅 View Calendar
                            </button>
                            <button
                                onClick={handleToggleStatus}
                                className={`rounded-lg px-4 py-2 font-medium ${venue.status === "active"
                                    ? "border border-red-600 bg-white text-red-700 hover:bg-red-50"
                                    : "border border-emerald-600 bg-white text-emerald-700 hover:bg-emerald-50"
                                    }`}
                            >
                                {venue.status === "active" ? "⏸️ Deactivate" : "▶️ Activate"}
                            </button>
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

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Left Column - Venue Details */}
                    <div className="lg:col-span-2">
                        {/* Venue Stats */}
                        <div className="mb-8">
                            <VenueStats stats={venue.stats} />
                        </div>

                        {/* Image Gallery */}
                        <div className="mb-8">
                            <ImageGallery images={venue.images} />
                        </div>

                        {/* Tabs */}
                        <div className="mb-8 border-b">
                            <div className="flex space-x-8 overflow-x-auto">
                                {["overview", "bookings", "amenities", "menu", "policies", "reviews"].map((tab) => (
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
                                        <h3 className="mb-4 text-xl font-semibold text-gray-900">Venue Details</h3>
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
                                                <span className="mr-2 text-2xl">💰</span>
                                                <div>
                                                    <div className="font-semibold">Pricing</div>
                                                    <div className="text-2xl font-bold text-gray-900">
                                                        ₹{venue.pricing.basePricePerPerson.toLocaleString()}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        per person (base)
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="rounded-xl border border-gray-200 bg-white p-6">
                                            <div className="mb-2 flex items-center text-gray-700">
                                                <span className="mr-2 text-2xl">📊</span>
                                                <div>
                                                    <div className="font-semibold">Occupancy</div>
                                                    <div className="text-2xl font-bold text-gray-900">
                                                        {venue.stats.occupancyRate}%
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        Current month
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="mb-4 text-lg font-semibold text-gray-900">Quick Actions</h4>
                                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                            <button
                                                onClick={handleManageAvailability}
                                                className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-4 hover:border-emerald-300 hover:bg-emerald-50"
                                            >
                                                <span className="mb-2 text-2xl">📅</span>
                                                <span className="text-sm font-medium">Manage Availability</span>
                                            </button>
                                            <button
                                                onClick={handleManageMenu}
                                                className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-4 hover:border-emerald-300 hover:bg-emerald-50"
                                            >
                                                <span className="mb-2 text-2xl">🍽️</span>
                                                <span className="text-sm font-medium">Update Menu</span>
                                            </button>
                                            <button
                                                onClick={handleViewAllBookings}
                                                className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-4 hover:border-emerald-300 hover:bg-emerald-50"
                                            >
                                                <span className="mb-2 text-2xl">📋</span>
                                                <span className="text-sm font-medium">All Bookings</span>
                                            </button>
                                            <button
                                                onClick={handleViewCalendar}
                                                className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-4 hover:border-emerald-300 hover:bg-emerald-50"
                                            >
                                                <span className="mb-2 text-2xl">📊</span>
                                                <span className="text-sm font-medium">View Calendar</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === "bookings" && (
                                <div>
                                    <div className="mb-6 flex items-center justify-between">
                                        <h3 className="text-xl font-semibold text-gray-900">Recent Bookings</h3>
                                        <button
                                            onClick={handleViewAllBookings}
                                            className="font-medium text-emerald-600 hover:text-emerald-700"
                                        >
                                            View All Bookings →
                                        </button>
                                    </div>
                                    <VenueBookingsTable bookings={venue.bookings} />
                                </div>
                            )}

                            {activeTab === "amenities" && (
                                <div>
                                    <div className="mb-6 flex items-center justify-between">
                                        <h3 className="text-xl font-semibold text-gray-900">Amenities</h3>
                                        <button
                                            onClick={() => router.push(`/owner/venues/${venue.id}/edit#amenities`)}
                                            className="font-medium text-emerald-600 hover:text-emerald-700"
                                        >
                                            Edit Amenities →
                                        </button>
                                    </div>
                                    <AmenitiesList amenities={venue.amenities} />
                                </div>
                            )}

                            {activeTab === "menu" && (
                                <div>
                                    <div className="mb-6 flex items-center justify-between">
                                        <h3 className="text-xl font-semibold text-gray-900">Menu</h3>
                                        <button
                                            onClick={handleManageMenu}
                                            className="font-medium text-emerald-600 hover:text-emerald-700"
                                        >
                                            Manage Menu →
                                        </button>
                                    </div>
                                    <MenuList menu={venue.menu} />
                                </div>
                            )}

                            {activeTab === "policies" && (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-semibold text-gray-900">Venue Policies</h3>
                                        <button
                                            onClick={() => router.push(`/owner/venues/${venue.id}/edit#policies`)}
                                            className="font-medium text-emerald-600 hover:text-emerald-700"
                                        >
                                            Edit Policies →
                                        </button>
                                    </div>
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
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-xl font-semibold text-gray-900">Availability</h3>
                                <button
                                    onClick={handleManageAvailability}
                                    className="font-medium text-emerald-600 hover:text-emerald-700"
                                >
                                    Manage Availability →
                                </button>
                            </div>
                            <AvailabilityCalendar availableDates={venue.availability} />
                        </div>
                    </div>

                    {/* Right Column - Management Panel */}
                    <div className="lg:sticky lg:top-8 lg:h-fit">
                        <div className="rounded-xl border border-gray-200 bg-white p-6">
                            <h3 className="mb-6 text-lg font-semibold text-gray-900">Venue Management</h3>

                            {/* Quick Stats */}
                            <div className="mb-6 space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Listed Date</span>
                                    <span className="font-medium">{new Date(venue.listingDate).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Last Updated</span>
                                    <span className="font-medium">{new Date(venue.lastUpdated).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Venue Type</span>
                                    <span className="font-medium capitalize">{venue.type}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Current Status</span>
                                    <span className={`font-medium ${venue.status === "active"
                                        ? "text-emerald-600"
                                        : venue.status === "inactive"
                                            ? "text-red-600"
                                            : "text-amber-600"
                                        }`}>
                                        {venue.status.charAt(0).toUpperCase() + venue.status.slice(1)}
                                    </span>
                                </div>
                            </div>

                            {/* Pricing Summary */}
                            <div className="mb-6">
                                <h4 className="mb-4 font-medium text-gray-900">Pricing Summary</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">Venue Rental:</span>
                                        <span className="font-medium">₹{venue.pricing.venueRental.toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">Base Price per Person:</span>
                                        <span className="font-medium">₹{venue.pricing.basePricePerPerson.toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">Service Charge:</span>
                                        <span className="font-medium">{venue.pricing.serviceCharge}%</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">Additional Hour Rate:</span>
                                        <span className="font-medium">₹{venue.pricing.additionalHourRate.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Management Actions */}
                            <div className="space-y-3">
                                <button
                                    onClick={handleEditVenue}
                                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 py-3 font-medium text-white hover:bg-emerald-700"
                                >
                                    ✏️ Edit Venue Details
                                </button>

                                <button
                                    onClick={handleManageAvailability}
                                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-blue-600 bg-white py-3 font-medium text-blue-700 hover:bg-blue-50"
                                >
                                    📅 Manage Availability
                                </button>

                                <button
                                    onClick={handleManageMenu}
                                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-purple-600 bg-white py-3 font-medium text-purple-700 hover:bg-purple-50"
                                >
                                    🍽️ Update Menu & Pricing
                                </button>

                                <button
                                    onClick={handleViewCalendar}
                                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white py-3 font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    📊 View Booking Calendar
                                </button>

                                <div className="pt-4 border-t">
                                    <button
                                        onClick={handleDeleteVenue}
                                        className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-600 bg-white py-3 font-medium text-red-700 hover:bg-red-50"
                                    >
                                        🗑️ Delete Venue
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Support & Help */}
                        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6">
                            <h4 className="mb-3 font-medium text-gray-900">Need Help?</h4>
                            <p className="mb-4 text-sm text-gray-600">
                                Contact our support team for any issues with your venue listing.
                            </p>
                            <button
                                onClick={() => alert("Support contact modal would open here")}
                                className="w-full rounded-lg border border-gray-300 bg-white py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Contact Support
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}