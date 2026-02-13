// app/dashboard/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import StatsCard from "@/components/dashboard/StatsCard";
import BookingsTable from "@/components/dashboard/BookingsTable";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentActivity from "@/components/dashboard/RecentActivity";

// Mock data - In real app, this would come from API
const mockBookings = [
    {
        id: "BK001",
        venueName: "Royal Emerald Lawn",
        venueImage: "https://images.unsplash.com/photo-1549451371-64aa98a6f660?w=800&auto=format&fit=crop",
        date: "2024-03-15",
        time: "14:00 - 22:00",
        guests: 250,
        status: "confirmed",
        totalAmount: 425000,
        paymentStatus: "paid",
    },
    {
        id: "BK002",
        venueName: "Grand Palace Banquet",
        venueImage: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&auto=format&fit=crop",
        date: "2024-03-20",
        time: "18:00 - 02:00",
        guests: 150,
        status: "pending",
        totalAmount: 285000,
        paymentStatus: "pending",
    },
    {
        id: "BK003",
        venueName: "Skyline Rooftop",
        venueImage: "https://images.unsplash.com/photo-1492684223066-dd23140edf6d?w=800&auto=format&fit=crop",
        date: "2024-02-28",
        time: "16:00 - 00:00",
        guests: 80,
        status: "completed",
        totalAmount: 156000,
        paymentStatus: "paid",
    },
    {
        id: "BK004",
        venueName: "Serenity Garden",
        venueImage: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&auto=format&fit=crop",
        date: "2024-04-10",
        time: "12:00 - 20:00",
        guests: 300,
        status: "confirmed",
        totalAmount: 540000,
        paymentStatus: "partial",
    },
    {
        id: "BK005",
        venueName: "Crystal Ballroom",
        venueImage: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&auto=format&fit=crop",
        date: "2024-01-20",
        time: "19:00 - 03:00",
        guests: 200,
        status: "cancelled",
        totalAmount: 380000,
        paymentStatus: "refunded",
    },
    {
        id: "BK006",
        venueName: "Ocean View Resort",
        venueImage: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&auto=format&fit=crop",
        date: "2024-03-25",
        time: "15:00 - 23:00",
        guests: 120,
        status: "confirmed",
        totalAmount: 216000,
        paymentStatus: "paid",
    },
    {
        id: "BK007",
        venueName: "Heritage Palace",
        venueImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop",
        date: "2024-05-05",
        time: "17:00 - 01:00",
        guests: 400,
        status: "pending",
        totalAmount: 720000,
        paymentStatus: "pending",
    },
    {
        id: "BK008",
        venueName: "Modern Conference Hall",
        venueImage: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&auto=format&fit=crop",
        date: "2024-02-15",
        time: "09:00 - 17:00",
        guests: 100,
        status: "completed",
        totalAmount: 135000,
        paymentStatus: "paid",
    },
];

const mockStats = {
    totalBookings: 24,
    upcomingBookings: 3,
    completedBookings: 18,
    totalSpent: 2850000,
    favoriteVenues: 5,
    pendingPayments: 2,
};

export default function CustomerDashboard() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookings, setBookings] = useState(mockBookings);
    const [stats, setStats] = useState(mockStats);
    const [filter, setFilter] = useState("all");
    const [sortBy, setSortBy] = useState("date");

    useEffect(() => {
        // Check authentication
        const userData = localStorage.getItem("bookvenu_user");
        if (!userData) {
            router.push("/login?redirect=/dashboard");
            return;
        }

        setUser(JSON.parse(userData));

        // Simulate API loading
        setTimeout(() => {
            setLoading(false);
        }, 800);
    }, [router]);

    // Calculate stats from bookings
    useEffect(() => {
        const calculatedStats = {
            totalBookings: bookings.length,
            upcomingBookings: bookings.filter(b =>
                new Date(b.date) > new Date() &&
                ["confirmed", "pending"].includes(b.status)
            ).length,
            completedBookings: bookings.filter(b =>
                b.status === "completed"
            ).length,
            totalSpent: bookings
                .filter(b => b.status === "completed" || b.status === "confirmed")
                .reduce((sum, b) => sum + b.totalAmount, 0),
            favoriteVenues: 5, // Would come from API
            pendingPayments: bookings.filter(b =>
                b.paymentStatus === "pending" || b.paymentStatus === "partial"
            ).length,
        };

        setStats(calculatedStats);
    }, [bookings]);

    const filteredBookings = bookings.filter(booking => {
        if (filter === "all") return true;
        if (filter === "upcoming") {
            return new Date(booking.date) > new Date() &&
                ["confirmed", "pending"].includes(booking.status);
        }
        if (filter === "completed") return booking.status === "completed";
        if (filter === "pending") return booking.status === "pending";
        if (filter === "cancelled") return booking.status === "cancelled";
        return true;
    });

    // Sort bookings
    const sortedBookings = [...filteredBookings].sort((a, b) => {
        if (sortBy === "date") return new Date(a.date) - new Date(b.date);
        if (sortBy === "amount") return b.totalAmount - a.totalAmount;
        if (sortBy === "guests") return b.guests - a.guests;
        return 0;
    });

    const handleViewBooking = (bookingId) => {
        router.push(`/dashboard/bookings/${bookingId}`);
    };

    const handleCancelBooking = (bookingId) => {
        if (confirm("Are you sure you want to cancel this booking?")) {
            setBookings(bookings.map(booking =>
                booking.id === bookingId
                    ? { ...booking, status: "cancelled", paymentStatus: "refunded" }
                    : booking
            ));
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <div className="mb-4 text-6xl">👤</div>
                    <p className="text-gray-600">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="border-b bg-white">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                                Welcome back, {user?.name || "Customer"}!
                            </h1>
                            <p className="text-gray-600">
                                Manage your bookings and explore venues
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => router.push("/lawns")}
                                className="rounded-lg border border-emerald-600 bg-white px-6 py-2 font-semibold text-emerald-600 hover:bg-emerald-50"
                            >
                                Book New Venue
                            </button>
                            <button
                                onClick={() => {
                                    localStorage.removeItem("bookvenu_user");
                                    router.push("/");
                                }}
                                className="rounded-lg bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                {/* Stats Grid */}
                <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <StatsCard
                        title="Total Bookings"
                        value={stats.totalBookings}
                        change="+12% from last month"
                        icon="📅"
                        color="emerald"
                    />
                    <StatsCard
                        title="Upcoming Bookings"
                        value={stats.upcomingBookings}
                        change="Next booking in 5 days"
                        icon="⏳"
                        color="blue"
                    />
                    <StatsCard
                        title="Completed Bookings"
                        value={stats.completedBookings}
                        change="18 successful events"
                        icon="✅"
                        color="green"
                    />
                    <StatsCard
                        title="Total Amount Spent"
                        value={`₹${(stats.totalSpent / 100000).toFixed(1)}L`}
                        change="₹2.85M total"
                        icon="💰"
                        color="amber"
                    />
                    <StatsCard
                        title="Favorite Venues"
                        value={stats.favoriteVenues}
                        change="5 saved venues"
                        icon="❤️"
                        color="red"
                    />
                    <StatsCard
                        title="Pending Payments"
                        value={stats.pendingPayments}
                        change="₹1,00,500 due"
                        icon="⏰"
                        color="orange"
                    />
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Left Column - Bookings Table */}
                    <div className="lg:col-span-2">
                        {/* Bookings Header */}
                        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Recent Bookings</h2>
                                <p className="text-gray-600">Manage and track your bookings</p>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                {/* Filter Buttons */}
                                <div className="flex rounded-lg border border-gray-300 bg-white p-1">
                                    {["all", "upcoming", "completed", "pending", "cancelled"].map((filterType) => (
                                        <button
                                            key={filterType}
                                            onClick={() => setFilter(filterType)}
                                            className={`rounded-md px-3 py-1 text-sm font-medium capitalize ${filter === filterType
                                                ? "bg-emerald-600 text-white"
                                                : "text-gray-700 hover:bg-gray-100"
                                                }`}
                                        >
                                            {filterType}
                                        </button>
                                    ))}
                                </div>

                                {/* Sort Dropdown */}
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm"
                                >
                                    <option value="date">Sort by: Date</option>
                                    <option value="amount">Sort by: Amount</option>
                                    <option value="guests">Sort by: Guests</option>
                                </select>
                            </div>
                        </div>

                        {/* Bookings Table */}
                        <BookingsTable
                            bookings={sortedBookings}
                            onViewBooking={handleViewBooking}
                            onCancelBooking={handleCancelBooking}
                        />

                        {/* View All Button */}
                        {sortedBookings.length > 0 && (
                            <div className="mt-6 text-center">
                                <button
                                    onClick={() => router.push("/dashboard/bookings")}
                                    className="text-emerald-600 hover:text-emerald-700 font-medium"
                                >
                                    View all bookings →
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <QuickActions />

                        {/* Recent Activity */}
                        <RecentActivity bookings={bookings} />
                    </div>
                </div>
            </div>
        </main>
    );
}