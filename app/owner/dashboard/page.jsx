// app/owner/dashboard/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import OwnerStatsCard from "@/components/owner/StatsCard";
import RecentBookingsTable from "@/components/owner/RecentBookingsTable";
import QuickActions from "@/components/owner/QuickActions";
import RevenueChart from "@/components/owner/RevenueChart";

// Mock data - In real app, this would come from API
const mockVenues = [
    {
        id: 1,
        name: "Emerald Garden Lawn",
        image: "https://images.unsplash.com/photo-1549451371-64aa98a6f660?w=800&auto=format&fit=crop",
        type: "Lawn",
        location: "Mumbai",
        capacity: "500 guests",
        price: "₹45,000",
        rating: 4.8,
    },
    {
        id: 2,
        name: "Royal Banquet Hall",
        image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w-800&auto=format&fit=crop",
        type: "Banquet Hall",
        location: "Delhi",
        capacity: "300 guests",
        price: "₹65,000",
        rating: 4.9,
    },
    {
        id: 3,
        name: "Skyline Rooftop",
        image: "https://images.unsplash.com/photo-1492684223066-dd23140edf6d?w=800&auto=format&fit=crop",
        type: "Rooftop",
        location: "Bangalore",
        capacity: "200 guests",
        price: "₹35,000",
        rating: 4.7,
    },
    {
        id: 4,
        name: "Grand Palace Hall",
        image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&auto=format&fit=crop",
        type: "Hall",
        location: "Jaipur",
        capacity: "1000 guests",
        price: "₹1,20,000",
        rating: 4.6,
    },
];

const mockBookings = [
    {
        id: "BK001",
        venueId: 1,
        venueName: "Royal Emerald Lawn",
        customerName: "John Doe",
        date: "2024-03-15",
        time: "14:00 - 22:00",
        guests: 250,
        status: "confirmed",
        totalAmount: 425000,
        paymentStatus: "paid",
        eventType: "Wedding",
        contact: "+91 98765 43210",
    },
    {
        id: "BK002",
        venueId: 2,
        venueName: "Skyline Rooftop",
        customerName: "Sarah Smith",
        date: "2024-03-20",
        time: "18:00 - 02:00",
        guests: 150,
        status: "pending",
        totalAmount: 285000,
        paymentStatus: "pending",
        eventType: "Birthday Party",
        contact: "+91 98765 43211",
    },
    {
        id: "BK003",
        venueId: 1,
        venueName: "Royal Emerald Lawn",
        customerName: "Robert Johnson",
        date: "2024-03-25",
        time: "16:00 - 00:00",
        guests: 80,
        status: "confirmed",
        totalAmount: 156000,
        paymentStatus: "partial",
        eventType: "Corporate Event",
        contact: "+91 98765 43212",
    },
    {
        id: "BK004",
        venueId: 4,
        venueName: "Serenity Garden",
        customerName: "Emily Davis",
        date: "2024-04-10",
        time: "12:00 - 20:00",
        guests: 300,
        status: "confirmed",
        totalAmount: 540000,
        paymentStatus: "paid",
        eventType: "Wedding Reception",
        contact: "+91 98765 43213",
    },
    {
        id: "BK005",
        venueId: 1,
        venueName: "Royal Emerald Lawn",
        customerName: "Michael Brown",
        date: "2024-04-15",
        time: "19:00 - 03:00",
        guests: 200,
        status: "cancelled",
        totalAmount: 380000,
        paymentStatus: "refunded",
        eventType: "Annual Celebration",
        contact: "+91 98765 43214",
    },
    {
        id: "BK006",
        venueId: 2,
        venueName: "Skyline Rooftop",
        customerName: "Lisa Wilson",
        date: "2024-04-22",
        time: "15:00 - 23:00",
        guests: 120,
        status: "confirmed",
        totalAmount: 216000,
        paymentStatus: "paid",
        eventType: "Engagement",
        contact: "+91 98765 43215",
    },
    {
        id: "BK007",
        venueId: 1,
        venueName: "Royal Emerald Lawn",
        customerName: "David Miller",
        date: "2024-05-05",
        time: "17:00 - 01:00",
        guests: 400,
        status: "pending",
        totalAmount: 720000,
        paymentStatus: "pending",
        eventType: "Wedding",
        contact: "+91 98765 43216",
    },
];

const monthlyRevenue = [
    { month: "Jan", revenue: 850000 },
    { month: "Feb", revenue: 920000 },
    { month: "Mar", revenue: 1250000 },
    { month: "Apr", revenue: 980000 },
    { month: "May", revenue: 1150000 },
    { month: "Jun", revenue: 1050000 },
];

export default function OwnerDashboard() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [venues, setVenues] = useState(mockVenues);
    const [bookings, setBookings] = useState(mockBookings);
    const [stats, setStats] = useState({
        totalVenues: 0,
        activeVenues: 0,
        totalBookings: 0,
        activeBookings: 0,
        monthlyRevenue: 0,
        totalRevenue: 0,
        pendingActions: 0,
    });

    useEffect(() => {
        // Check authentication and role
        const userData = localStorage.getItem("bookvenu_user");
        if (!userData) {
            router.push("/login?redirect=/owner/dashboard");
            return;
        }

        const user = JSON.parse(userData);
        if (user.role !== "owner") {
            router.push("/dashboard");
            return;
        }

        setUser(user);

        // Calculate stats
        const calculatedStats = {
            totalVenues: venues.length,
            activeVenues: venues.filter(v => v.status === "active").length,
            totalBookings: bookings.length,
            activeBookings: bookings.filter(b =>
                ["confirmed", "pending"].includes(b.status) &&
                new Date(b.date) >= new Date()
            ).length,
            monthlyRevenue: monthlyRevenue[monthlyRevenue.length - 1].revenue,
            totalRevenue: venues.reduce((sum, venue) => sum + venue.revenue, 0),
            pendingActions: bookings.filter(b =>
                b.status === "pending" || b.paymentStatus === "pending"
            ).length,
        };

        setStats(calculatedStats);

        // Simulate API loading
        setTimeout(() => {
            setLoading(false);
        }, 800);
    }, [router, venues, bookings]);

    const handleConfirmBooking = (bookingId) => {
        setBookings(bookings.map(booking =>
            booking.id === bookingId
                ? { ...booking, status: "confirmed" }
                : booking
        ));
        alert("Booking confirmed successfully!");
    };

    const handleRejectBooking = (bookingId) => {
        setBookings(bookings.map(booking =>
            booking.id === bookingId
                ? { ...booking, status: "cancelled", paymentStatus: "refunded" }
                : booking
        ));
        alert("Booking rejected successfully!");
    };

    const handleViewBooking = (bookingId) => {
        router.push(`/owner/bookings/${bookingId}`);
    };

    const handleAddVenue = () => {
        router.push("/owner/lawns/create");
    };

    const [activeVenueTab, setActiveVenueTab] = useState('all');

    // Filter venues based on active tab
    const filteredVenues = venues.filter(venue => {
        if (activeVenueTab === 'all') return true;
        return venue.type === activeVenueTab;
    });

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <div className="mb-4 text-6xl">🏠</div>
                    <p className="text-gray-600">Loading owner dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Header - Keep this as is */}
            {/* <header className="border-b bg-white">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                                Welcome back, {user?.name || "Venue Owner"}!
                            </h1>
                            <p className="text-gray-600">
                                Manage your venues and bookings
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={handleAddVenue}
                                className="rounded-lg bg-linear-to-r from-emerald-600 to-teal-600 px-6 py-2 font-semibold text-white hover:from-emerald-700 hover:to-teal-700"
                            >
                                + Add New Venue
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
            </header> */}

            <div className="container mx-auto px-4 py-8">
                {/* Stats Grid - Updated to match new layout */}
                <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <OwnerStatsCard
                        title="Total Venues"
                        value={stats.totalVenues}
                        change={`${stats.activeVenues} active`}
                        icon="🏢"
                        color="emerald"
                        onClick={() => router.push("/owner/lawns")}
                    />
                    <OwnerStatsCard
                        title="Total Bookings"
                        value={stats.totalBookings}
                        change={`${stats.activeBookings} upcoming`}
                        icon="📅"
                        color="blue"
                        onClick={() => router.push("/owner/bookings")}
                    />
                    <OwnerStatsCard
                        title="Monthly Revenue"
                        value={`₹${(stats.monthlyRevenue / 100000).toFixed(1)}L`}
                        change={`₹${stats.totalRevenue.toLocaleString()} total`}
                        icon="💰"
                        color="amber"
                        onClick={() => router.push("/owner/analytics")}
                    />
                    <OwnerStatsCard
                        title="Pending Actions"
                        value={stats.pendingActions}
                        change="Require attention"
                        icon="⏰"
                        color="red"
                        onClick={() => router.push("/owner/bookings?filter=pending")}
                    />
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Left Column - Revenue Chart & Venues Grid */}
                    <div className="lg:col-span-2">
                        {/* Revenue Chart */}
                        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6">
                            <div className="mb-6 flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Revenue Overview</h3>
                                    <p className="text-sm text-gray-600">Last 6 months performance</p>
                                </div>
                                <select className="rounded-lg border border-gray-300 px-4 py-2 text-sm">
                                    <option>Last 6 Months</option>
                                    <option>Last 12 Months</option>
                                    <option>Year to Date</option>
                                </select>
                            </div>
                            <RevenueChart data={monthlyRevenue} />
                        </div>

                        {/* Venues Grid with Tabs */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6">
                            <div className="mb-6 flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Your Venues</h3>
                                    <p className="text-sm text-gray-600">Manage all your listed venues</p>
                                </div>
                                <button
                                    onClick={() => router.push("/owner/lawns")}
                                    className="font-medium text-emerald-600 hover:text-emerald-700"
                                >
                                    View All →
                                </button>
                            </div>

                            {/* Venue Type Tabs */}
                            <div className="mb-6">
                                <div className="flex space-x-1 rounded-lg bg-gray-100 p-1">
                                    <button
                                        className={`flex-1 rounded-md px-4 py-2 text-sm font-medium ${activeVenueTab === 'all' ? 'bg-white text-emerald-700 shadow' : 'text-gray-600 hover:text-gray-900'}`}
                                        onClick={() => setActiveVenueTab('all')}
                                    >
                                        All Venues
                                    </button>
                                    <button
                                        className={`flex-1 rounded-md px-4 py-2 text-sm font-medium ${activeVenueTab === 'lawn' ? 'bg-white text-emerald-700 shadow' : 'text-gray-600 hover:text-gray-900'}`}
                                        onClick={() => setActiveVenueTab('lawn')}
                                    >
                                        🏞️ Lawns
                                    </button>
                                    <button
                                        className={`flex-1 rounded-md px-4 py-2 text-sm font-medium ${activeVenueTab === 'hall' ? 'bg-white text-emerald-700 shadow' : 'text-gray-600 hover:text-gray-900'}`}
                                        onClick={() => setActiveVenueTab('hall')}
                                    >
                                        🏛️ Halls
                                    </button>
                                    <button
                                        className={`flex-1 rounded-md px-4 py-2 text-sm font-medium ${activeVenueTab === 'rooftop' ? 'bg-white text-emerald-700 shadow' : 'text-gray-600 hover:text-gray-900'}`}
                                        onClick={() => setActiveVenueTab('rooftop')}
                                    >
                                        🌆 Rooftops
                                    </button>
                                </div>
                            </div>

                            {/* Venues Grid */}
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {filteredVenues.slice(0, 4).map((venue) => (
                                    <div
                                        key={venue.id}
                                        className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                                        onClick={() => router.push(`/owner/lawns/${venue.id}`)}
                                    >
                                        <div className="relative h-48 overflow-hidden">
                                            <div className="h-full w-full bg-linear-to-br from-emerald-400 to-teal-500" />
                                            <div className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-emerald-700">
                                                {venue.type}
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <div className="mb-2 flex items-center justify-between">
                                                <h3 className="text-lg font-semibold text-gray-900">{venue.name}</h3>
                                                <span className="flex items-center text-amber-500">
                                                    ★ {venue.rating}
                                                </span>
                                            </div>
                                            <p className="mb-3 text-gray-600">{venue.location}</p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-500">{venue.capacity}</span>
                                                <span className="text-lg font-bold text-emerald-700">{venue.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {filteredVenues.length > 4 && (
                                <div className="mt-6 text-center">
                                    <button
                                        onClick={() => router.push("/owner/venues")}
                                        className="rounded-lg border border-gray-300 bg-white px-6 py-2 font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        View All {filteredVenues.length} Venues
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Sidebar with Bookings and Quick Actions */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <QuickActions />

                        {/* Recent Bookings (in venues format) */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6">
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
                                <button
                                    onClick={() => router.push("/owner/bookings")}
                                    className="font-medium text-emerald-600 hover:text-emerald-700"
                                >
                                    View All →
                                </button>
                            </div>
                            <div className="space-y-4">
                                {bookings.slice(0, 5).map((booking) => (
                                    <div
                                        key={booking.id}
                                        className="rounded-lg border border-gray-200 p-4 hover:border-emerald-300 hover:bg-emerald-50"
                                    >
                                        <div className="mb-2 flex items-center justify-between">
                                            <div className="font-medium text-gray-900">
                                                {booking.customerName}
                                            </div>
                                            <span className={`rounded-full px-2 py-1 text-xs font-medium ${booking.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' :
                                                booking.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                {booking.status === 'confirmed' ? '✓ Confirmed' :
                                                    booking.status === 'pending' ? '⏳ Pending' : '✗ Cancelled'}
                                            </span>
                                        </div>

                                        {/* <div className="mb-3">
                                            <p className="text-sm font-medium text-gray-900">{booking.venueName}</p>
                                            <p className="text-sm text-gray-600">
                                                {new Date(booking.date).toLocaleDateString()} • {booking.time}
                                            </p>
                                        </div> */}

                                        {/* <div className="mb-3 flex items-center justify-between">
                                            <div className="text-sm">
                                                <span className="text-gray-600">Guests: </span>
                                                <span className="font-medium">{booking.guests}</span>
                                            </div>
                                            <div className="text-sm">
                                                <span className="text-gray-600">Amount: </span>
                                                <span className="font-bold text-emerald-700">₹{booking.totalAmount.toLocaleString()}</span>
                                            </div>
                                        </div> */}

                                        <div className="flex items-center justify-between">
                                            <div className="text-xs text-gray-500">
                                                {new Date(booking.date).toLocaleDateString()} • {booking.time}
                                            </div>
                                            <button
                                                onClick={() => handleViewBooking(booking.id)}
                                                className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                                            >
                                                View Details →
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                {bookings.length === 0 && (
                                    <div className="py-4 text-center text-gray-500">
                                        No bookings yet
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Pending Actions */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6">
                            <h3 className="mb-4 text-lg font-semibold text-gray-900">Requires Attention</h3>
                            <div className="space-y-3">
                                {bookings
                                    .filter(b => b.status === "pending" || b.paymentStatus === "pending")
                                    .slice(0, 3)
                                    .map((booking) => (
                                        <div key={booking.id} className="rounded-lg border border-amber-200 bg-amber-50 p-3">
                                            <div className="mb-2 flex items-center justify-between">
                                                <div className="font-medium text-gray-900">{booking.customerName}</div>
                                                <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
                                                    {booking.status === "pending" ? "New Booking" : "Payment Pending"}
                                                </span>
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                {booking.venueName} • {new Date(booking.date).toLocaleDateString()}
                                            </div>
                                            <div className="mt-2 text-sm font-medium text-gray-900">
                                                ₹{booking.totalAmount.toLocaleString()}
                                            </div>
                                            <div className="mt-2 flex gap-2">
                                                {booking.status === "pending" && (
                                                    <>
                                                        <button
                                                            onClick={() => handleConfirmBooking(booking.id)}
                                                            className="flex-1 rounded bg-emerald-600 px-3 py-1 text-xs font-medium text-white hover:bg-emerald-700"
                                                        >
                                                            Confirm
                                                        </button>
                                                        <button
                                                            onClick={() => handleRejectBooking(booking.id)}
                                                            className="flex-1 rounded bg-red-600 px-3 py-1 text-xs font-medium text-white hover:bg-red-700"
                                                        >
                                                            Reject
                                                        </button>
                                                    </>
                                                )}
                                                {booking.paymentStatus === "pending" && booking.status === "confirmed" && (
                                                    <button
                                                        onClick={() => handleViewBooking(booking.id)}
                                                        className="w-full rounded bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700"
                                                    >
                                                        Follow up Payment
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                {bookings.filter(b => b.status === "pending" || b.paymentStatus === "pending").length === 0 && (
                                    <div className="py-2 text-center text-sm text-gray-500">
                                        No pending actions
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}