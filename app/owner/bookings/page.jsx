// app/owner/bookings/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import OwnerBookingsTable from "@/components/owner/OwnerBookingsTable";
import BookingsFilter from "@/components/owner/BookingsFilter";

// Mock data - In real app, this would come from API
const mockBookings = [
    {
        id: "BK001",
        customer: {
            id: 101,
            name: "John Doe",
            email: "john@example.com",
            phone: "+91 98765 43210",
        },
        venue: {
            id: 1,
            name: "Royal Emerald Lawn",
            type: "lawn",
        },
        date: "2024-03-15",
        time: "14:00 - 22:00",
        guests: 250,
        totalAmount: 425000,
        status: "confirmed",
        paymentStatus: "paid",
        eventType: "Wedding",
        bookingDate: "2024-02-10",
        specialRequests: "Floral decoration and live music required",
    },
    {
        id: "BK002",
        customer: {
            id: 102,
            name: "Sarah Smith",
            email: "sarah@example.com",
            phone: "+91 98765 43211",
        },
        venue: {
            id: 2,
            name: "Skyline Rooftop",
            type: "rooftop",
        },
        date: "2024-03-20",
        time: "18:00 - 02:00",
        guests: 150,
        totalAmount: 285000,
        status: "pending",
        paymentStatus: "pending",
        eventType: "Birthday Party",
        bookingDate: "2024-02-15",
        specialRequests: "Projector and whiteboard required",
    },
    {
        id: "BK003",
        customer: {
            id: 103,
            name: "Robert Johnson",
            email: "robert@example.com",
            phone: "+91 98765 43212",
        },
        venue: {
            id: 1,
            name: "Royal Emerald Lawn",
            type: "lawn",
        },
        date: "2024-03-25",
        time: "16:00 - 00:00",
        guests: 80,
        totalAmount: 156000,
        status: "confirmed",
        paymentStatus: "partial",
        eventType: "Corporate Event",
        bookingDate: "2024-02-05",
        specialRequests: "Stage setup with lighting",
    },
    {
        id: "BK004",
        customer: {
            id: 104,
            name: "Emily Davis",
            email: "emily@example.com",
            phone: "+91 98765 43213",
        },
        venue: {
            id: 3,
            name: "Serenity Garden",
            type: "garden",
        },
        date: "2024-04-10",
        time: "12:00 - 20:00",
        guests: 300,
        totalAmount: 540000,
        status: "confirmed",
        paymentStatus: "paid",
        eventType: "Wedding Reception",
        bookingDate: "2024-03-01",
        specialRequests: "Mandap decoration and DJ setup",
    },
    {
        id: "BK005",
        customer: {
            id: 105,
            name: "Michael Brown",
            email: "michael@example.com",
            phone: "+91 98765 43214",
        },
        venue: {
            id: 1,
            name: "Royal Emerald Lawn",
            type: "lawn",
        },
        date: "2024-01-20",
        time: "19:00 - 03:00",
        guests: 200,
        totalAmount: 380000,
        status: "cancelled",
        paymentStatus: "refunded",
        eventType: "Annual Celebration",
        bookingDate: "2023-12-15",
        specialRequests: "Stage setup with lighting",
    },
    {
        id: "BK006",
        customer: {
            id: 106,
            name: "Lisa Wilson",
            email: "lisa@example.com",
            phone: "+91 98765 43215",
        },
        venue: {
            id: 2,
            name: "Skyline Rooftop",
            type: "rooftop",
        },
        date: "2024-04-22",
        time: "15:00 - 23:00",
        guests: 120,
        totalAmount: 216000,
        status: "confirmed",
        paymentStatus: "paid",
        eventType: "Engagement",
        bookingDate: "2024-02-20",
        specialRequests: "Photography backdrop",
    },
    {
        id: "BK007",
        customer: {
            id: 107,
            name: "David Miller",
            email: "david@example.com",
            phone: "+91 98765 43216",
        },
        venue: {
            id: 1,
            name: "Royal Emerald Lawn",
            type: "lawn",
        },
        date: "2024-05-05",
        time: "17:00 - 01:00",
        guests: 400,
        totalAmount: 720000,
        status: "pending",
        paymentStatus: "pending",
        eventType: "Wedding",
        bookingDate: "2024-03-10",
        specialRequests: "Royal decoration theme",
    },
    {
        id: "BK008",
        customer: {
            id: 108,
            name: "Jennifer Taylor",
            email: "jennifer@example.com",
            phone: "+91 98765 43217",
        },
        venue: {
            id: 4,
            name: "Crystal Ballroom",
            type: "hall",
        },
        date: "2024-04-15",
        time: "19:00 - 03:00",
        guests: 180,
        totalAmount: 324000,
        status: "confirmed",
        paymentStatus: "paid",
        eventType: "Corporate Gala",
        bookingDate: "2024-03-05",
        specialRequests: "VIP seating arrangement",
    },
];

export default function OwnerBookingsPage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookings, setBookings] = useState(mockBookings);
    const [filteredBookings, setFilteredBookings] = useState(mockBookings);
    const [selectedBookings, setSelectedBookings] = useState([]);

    const [filters, setFilters] = useState({
        status: "all",
        venue: "all",
        dateRange: "all",
        paymentStatus: "all",
        sortBy: "date_desc",
        search: "",
    });

    useEffect(() => {
        // Check authentication and role
        const userData = localStorage.getItem("bookvenu_user");
        if (!userData) {
            router.push("/login?redirect=/owner/bookings");
            return;
        }

        const user = JSON.parse(userData);
        if (user.role !== "owner") {
            router.push("/dashboard");
            return;
        }

        setUser(user);

        // Simulate API loading
        setTimeout(() => {
            setLoading(false);
        }, 800);
    }, [router]);

    // Apply filters whenever filters change
    useEffect(() => {
        let result = [...bookings];

        // Filter by status
        if (filters.status !== "all") {
            result = result.filter(booking => booking.status === filters.status);
        }

        // Filter by venue
        if (filters.venue !== "all") {
            result = result.filter(booking => booking.venue.name === filters.venue);
        }

        // Filter by payment status
        if (filters.paymentStatus !== "all") {
            result = result.filter(booking => booking.paymentStatus === filters.paymentStatus);
        }

        // Filter by date range
        const now = new Date();
        if (filters.dateRange === "upcoming") {
            result = result.filter(booking => new Date(booking.date) >= now);
        } else if (filters.dateRange === "past") {
            result = result.filter(booking => new Date(booking.date) < now);
        } else if (filters.dateRange === "thisMonth") {
            const thisMonth = now.getMonth();
            const thisYear = now.getFullYear();
            result = result.filter(booking => {
                const bookingDate = new Date(booking.date);
                return bookingDate.getMonth() === thisMonth &&
                    bookingDate.getFullYear() === thisYear;
            });
        } else if (filters.dateRange === "nextMonth") {
            const nextMonth = new Date(now);
            nextMonth.setMonth(now.getMonth() + 1);
            result = result.filter(booking => {
                const bookingDate = new Date(booking.date);
                return bookingDate.getMonth() === nextMonth.getMonth() &&
                    bookingDate.getFullYear() === nextMonth.getFullYear();
            });
        }

        // Search filter
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            result = result.filter(booking =>
                booking.customer.name.toLowerCase().includes(searchLower) ||
                booking.venue.name.toLowerCase().includes(searchLower) ||
                booking.id.toLowerCase().includes(searchLower) ||
                booking.eventType.toLowerCase().includes(searchLower)
            );
        }

        // Sorting
        result.sort((a, b) => {
            switch (filters.sortBy) {
                case "date_desc":
                    return new Date(b.date) - new Date(a.date);
                case "date_asc":
                    return new Date(a.date) - new Date(b.date);
                case "amount_desc":
                    return b.totalAmount - a.totalAmount;
                case "amount_asc":
                    return a.totalAmount - b.totalAmount;
                case "guests_desc":
                    return b.guests - a.guests;
                case "guests_asc":
                    return a.guests - b.guests;
                case "newest":
                    return new Date(b.bookingDate) - new Date(a.bookingDate);
                case "oldest":
                    return new Date(a.bookingDate) - new Date(b.bookingDate);
                default:
                    return new Date(b.date) - new Date(a.date);
            }
        });

        setFilteredBookings(result);
    }, [filters, bookings]);

    const handleConfirmBooking = (bookingId) => {
        setBookings(bookings.map(booking =>
            booking.id === bookingId
                ? { ...booking, status: "confirmed" }
                : booking
        ));
        alert("Booking confirmed successfully!");
    };

    const handleRejectBooking = (bookingId) => {
        if (confirm("Are you sure you want to reject this booking? This action cannot be undone.")) {
            setBookings(bookings.map(booking =>
                booking.id === bookingId
                    ? { ...booking, status: "cancelled", paymentStatus: "refunded" }
                    : booking
            ));
            alert("Booking rejected successfully!");
        }
    };

    const handleViewDetails = (bookingId) => {
        router.push(`/owner/bookings/${bookingId}`);
    };

    const handleToggleSelect = (bookingId) => {
        setSelectedBookings(prev =>
            prev.includes(bookingId)
                ? prev.filter(id => id !== bookingId)
                : [...prev, bookingId]
        );
    };

    const handleSelectAll = () => {
        if (selectedBookings.length === filteredBookings.length) {
            setSelectedBookings([]);
        } else {
            setSelectedBookings(filteredBookings.map(b => b.id));
        }
    };

    const handleBulkAction = (action) => {
        if (selectedBookings.length === 0) {
            alert("Please select at least one booking");
            return;
        }

        switch (action) {
            case "confirm":
                setBookings(bookings.map(booking =>
                    selectedBookings.includes(booking.id)
                        ? { ...booking, status: "confirmed" }
                        : booking
                ));
                alert(`${selectedBookings.length} booking(s) confirmed successfully!`);
                setSelectedBookings([]);
                break;
            case "reject":
                if (confirm(`Are you sure you want to reject ${selectedBookings.length} booking(s)? This action cannot be undone.`)) {
                    setBookings(bookings.map(booking =>
                        selectedBookings.includes(booking.id)
                            ? { ...booking, status: "cancelled", paymentStatus: "refunded" }
                            : booking
                    ));
                    alert(`${selectedBookings.length} booking(s) rejected successfully!`);
                    setSelectedBookings([]);
                }
                break;
            case "mark_paid":
                setBookings(bookings.map(booking =>
                    selectedBookings.includes(booking.id)
                        ? { ...booking, paymentStatus: "paid" }
                        : booking
                ));
                alert(`${selectedBookings.length} booking(s) marked as paid!`);
                setSelectedBookings([]);
                break;
        }
    };

    const getUniqueVenues = () => {
        return [...new Set(bookings.map(b => b.venue.name))].sort();
    };

    const stats = {
        total: bookings.length,
        pending: bookings.filter(b => b.status === "pending").length,
        confirmed: bookings.filter(b => b.status === "confirmed").length,
        cancelled: bookings.filter(b => b.status === "cancelled").length,
        totalRevenue: bookings
            .filter(b => b.status === "confirmed")
            .reduce((sum, b) => sum + b.totalAmount, 0),
        pendingPayments: bookings.filter(b =>
            b.paymentStatus === "pending" && b.status === "confirmed"
        ).length,
        upcoming: bookings.filter(b =>
            new Date(b.date) >= new Date() && b.status !== "cancelled"
        ).length,
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <div className="mb-4 text-6xl">📅</div>
                    <p className="text-gray-600">Loading bookings...</p>
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
                                    onClick={() => router.push("/owner/dashboard")}
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    ← Back to Dashboard
                                </button>
                            </div>
                            <h1 className="mt-2 text-2xl font-bold text-gray-900 md:text-3xl">
                                Bookings Management
                            </h1>
                            <p className="text-gray-600">
                                Manage all bookings for your venues
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => router.push("/owner/calendar")}
                                className="rounded-lg border border-emerald-600 bg-white px-4 py-2 font-semibold text-emerald-600 hover:bg-emerald-50"
                            >
                                📅 View Calendar
                            </button>
                        </div>
                    </div>
                </div>
            </header> */}

            <div className="container mx-auto px-4 py-8">
                {/* Stats Summary */}
                <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                    <div className="rounded-lg border border-gray-200 bg-white p-4">
                        <div className="text-sm text-gray-600">Total Bookings</div>
                        <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-white p-4">
                        <div className="text-sm text-gray-600">Pending Approval</div>
                        <div className="text-2xl font-bold text-amber-600">{stats.pending}</div>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-white p-4">
                        <div className="text-sm text-gray-600">Confirmed</div>
                        <div className="text-2xl font-bold text-emerald-600">{stats.confirmed}</div>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-white p-4">
                        <div className="text-sm text-gray-600">Total Revenue</div>
                        <div className="text-2xl font-bold text-teal-600">₹{(stats.totalRevenue / 100000).toFixed(1)}L</div>
                    </div>
                </div>

                {/* Filters */}
                <div className="mb-6">
                    <BookingsFilter
                        filters={filters}
                        venues={getUniqueVenues()}
                        onFilterChange={setFilters}
                    />
                </div>

                {/* Bulk Actions */}
                {selectedBookings.length > 0 && (
                    <div className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                            <div className="flex items-center gap-2">
                                <div className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800">
                                    {selectedBookings.length} booking(s) selected
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => handleBulkAction("confirm")}
                                    className="rounded-lg border border-emerald-600 bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                                >
                                    Confirm Selected
                                </button>
                                <button
                                    onClick={() => handleBulkAction("reject")}
                                    className="rounded-lg border border-red-600 bg-white px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
                                >
                                    Reject Selected
                                </button>
                                <button
                                    onClick={() => handleBulkAction("mark_paid")}
                                    className="rounded-lg border border-blue-600 bg-white px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50"
                                >
                                    Mark as Paid
                                </button>
                                <button
                                    onClick={() => setSelectedBookings([])}
                                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Clear Selection
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Bookings Count and Export */}
                <div className="mb-4 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            {filteredBookings.length} bookings found
                        </h2>
                        <p className="text-sm text-gray-600">
                            Showing all bookings matching the selected filters
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleSelectAll}
                            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm hover:bg-gray-50"
                        >
                            {selectedBookings.length === filteredBookings.length && filteredBookings.length > 0
                                ? "Deselect All"
                                : "Select All"}
                        </button>
                        <button
                            onClick={() => alert("Export feature would download bookings as CSV")}
                            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm hover:bg-gray-50"
                        >
                            📥 Export as CSV
                        </button>
                    </div>
                </div>

                {/* Bookings Table */}
                <div className="mb-8">
                    <OwnerBookingsTable
                        bookings={filteredBookings}
                        selectedBookings={selectedBookings}
                        onToggleSelect={handleToggleSelect}
                        onConfirm={handleConfirmBooking}
                        onReject={handleRejectBooking}
                        onViewDetails={handleViewDetails}
                    />
                </div>

                {/* Summary Section */}
                {filteredBookings.length > 0 && (
                    <div className="rounded-xl border border-gray-200 bg-white p-6">
                        <h4 className="mb-4 text-lg font-semibold text-gray-900">Bookings Summary</h4>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <div className="mb-3 text-sm font-medium text-gray-700">Status Distribution</div>
                                <div className="space-y-3">
                                    <div>
                                        <div className="mb-1 flex justify-between">
                                            <span className="text-sm text-gray-600">Confirmed</span>
                                            <span className="font-medium text-gray-900">
                                                {filteredBookings.filter(b => b.status === "confirmed").length}
                                            </span>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-gray-200">
                                            <div
                                                className="h-full rounded-full bg-emerald-500"
                                                style={{
                                                    width: `${(filteredBookings.filter(b => b.status === "confirmed").length / filteredBookings.length) * 100}%`
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mb-1 flex justify-between">
                                            <span className="text-sm text-gray-600">Pending</span>
                                            <span className="font-medium text-gray-900">
                                                {filteredBookings.filter(b => b.status === "pending").length}
                                            </span>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-gray-200">
                                            <div
                                                className="h-full rounded-full bg-amber-500"
                                                style={{
                                                    width: `${(filteredBookings.filter(b => b.status === "pending").length / filteredBookings.length) * 100}%`
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mb-1 flex justify-between">
                                            <span className="text-sm text-gray-600">Cancelled</span>
                                            <span className="font-medium text-gray-900">
                                                {filteredBookings.filter(b => b.status === "cancelled").length}
                                            </span>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-gray-200">
                                            <div
                                                className="h-full rounded-full bg-red-500"
                                                style={{
                                                    width: `${(filteredBookings.filter(b => b.status === "cancelled").length / filteredBookings.length) * 100}%`
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="mb-3 text-sm font-medium text-gray-700">Revenue Overview</div>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Confirmed Bookings Revenue</span>
                                        <span className="font-bold text-emerald-700">
                                            ₹{filteredBookings
                                                .filter(b => b.status === "confirmed")
                                                .reduce((sum, b) => sum + b.totalAmount, 0)
                                                .toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Pending Payments</span>
                                        <span className="font-medium text-amber-700">
                                            ₹{filteredBookings
                                                .filter(b => b.paymentStatus === "pending" && b.status === "confirmed")
                                                .reduce((sum, b) => sum + b.totalAmount, 0)
                                                .toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Average Booking Value</span>
                                        <span className="font-medium text-gray-900">
                                            ₹{filteredBookings.length > 0
                                                ? Math.round(filteredBookings.reduce((sum, b) => sum + b.totalAmount, 0) / filteredBookings.length)
                                                : 0}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}