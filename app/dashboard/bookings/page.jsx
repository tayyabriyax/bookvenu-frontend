// app/dashboard/bookings/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BookingFilters from "@/components/bookings/BookingFilters";
import BookingCard from "@/components/bookings/BookingCard";
import BookingTableRow from "@/components/bookings/BookingTableRow";

// Mock data - In real app, this would come from API
const mockBookings = [
    {
        id: "BK001",
        venueName: "Royal Emerald Lawn",
        venueImage: "https://images.unsplash.com/photo-1549451371-64aa98a6f660?w=800&auto=format&fit=crop",
        venueId: 1,
        date: "2024-03-15",
        time: "14:00 - 22:00",
        guests: 250,
        status: "confirmed",
        totalAmount: 425000,
        paymentStatus: "paid",
        createdAt: "2024-02-10",
        eventType: "Wedding",
        specialRequests: "Floral decoration and live music required",
        bookingType: "fullDay",
    },
    {
        id: "BK002",
        venueName: "Grand Palace Banquet",
        venueImage: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&auto=format&fit=crop",
        venueId: 2,
        date: "2024-03-20",
        time: "18:00 - 02:00",
        guests: 150,
        status: "pending",
        totalAmount: 285000,
        paymentStatus: "pending",
        createdAt: "2024-02-15",
        eventType: "Corporate Event",
        specialRequests: "Projector and whiteboard required",
        bookingType: "evening",
    },
    {
        id: "BK003",
        venueName: "Skyline Rooftop",
        venueImage: "https://images.unsplash.com/photo-1492684223066-dd23140edf6d?w=800&auto=format&fit=crop",
        venueId: 3,
        date: "2024-02-28",
        time: "16:00 - 00:00",
        guests: 80,
        status: "completed",
        totalAmount: 156000,
        paymentStatus: "paid",
        createdAt: "2024-01-20",
        eventType: "Birthday Party",
        specialRequests: "Cake cutting arrangement",
        bookingType: "evening",
    },
    {
        id: "BK004",
        venueName: "Serenity Garden",
        venueImage: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&auto=format&fit=crop",
        venueId: 4,
        date: "2024-04-10",
        time: "12:00 - 20:00",
        guests: 300,
        status: "confirmed",
        totalAmount: 540000,
        paymentStatus: "partial",
        createdAt: "2024-03-01",
        eventType: "Wedding Reception",
        specialRequests: "Mandap decoration and DJ setup",
        bookingType: "fullDay",
    },
    {
        id: "BK005",
        venueName: "Crystal Ballroom",
        venueImage: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&auto=format&fit=crop",
        venueId: 5,
        date: "2024-01-20",
        time: "19:00 - 03:00",
        guests: 200,
        status: "cancelled",
        totalAmount: 380000,
        paymentStatus: "refunded",
        createdAt: "2023-12-15",
        eventType: "Annual Celebration",
        specialRequests: "Stage setup with lighting",
        bookingType: "evening",
    },
    {
        id: "BK006",
        venueName: "Ocean View Resort",
        venueImage: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&auto=format&fit=crop",
        venueId: 6,
        date: "2024-03-25",
        time: "15:00 - 23:00",
        guests: 120,
        status: "confirmed",
        totalAmount: 216000,
        paymentStatus: "paid",
        createdAt: "2024-02-20",
        eventType: "Engagement",
        specialRequests: "Photography backdrop",
        bookingType: "evening",
    },
    {
        id: "BK007",
        venueName: "Heritage Palace",
        venueImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop",
        venueId: 7,
        date: "2024-05-05",
        time: "17:00 - 01:00",
        guests: 400,
        status: "pending",
        totalAmount: 720000,
        paymentStatus: "pending",
        createdAt: "2024-03-10",
        eventType: "Wedding",
        specialRequests: "Royal decoration theme",
        bookingType: "fullDay",
    },
    {
        id: "BK008",
        venueName: "Modern Conference Hall",
        venueImage: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&auto=format&fit=crop",
        venueId: 8,
        date: "2024-02-15",
        time: "09:00 - 17:00",
        guests: 100,
        status: "completed",
        totalAmount: 135000,
        paymentStatus: "paid",
        createdAt: "2024-01-05",
        eventType: "Conference",
        specialRequests: "WiFi and printing facilities",
        bookingType: "daytime",
    },
    {
        id: "BK009",
        venueName: "Riverfront Lawn",
        venueImage: "https://images.unsplash.com/photo-1473773508845-188df298d2d1?w=800&auto=format&fit=crop",
        venueId: 9,
        date: "2024-04-22",
        time: "11:00 - 19:00",
        guests: 180,
        status: "confirmed",
        totalAmount: 324000,
        paymentStatus: "paid",
        createdAt: "2024-03-05",
        eventType: "Baby Shower",
        specialRequests: "Pastel theme decoration",
        bookingType: "daytime",
    },
    {
        id: "BK010",
        venueName: "Sunset Terrace",
        venueImage: "https://images.unsplash.com/photo-1490380169520-0a4b88d52565?w=800&auto=format&fit=crop",
        venueId: 10,
        date: "2023-12-20",
        time: "18:00 - 02:00",
        guests: 90,
        status: "completed",
        totalAmount: 162000,
        paymentStatus: "paid",
        createdAt: "2023-11-10",
        eventType: "New Year Party",
        specialRequests: "Fireworks display",
        bookingType: "evening",
    },
];

export default function MyBookingsPage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookings, setBookings] = useState(mockBookings);
    const [filteredBookings, setFilteredBookings] = useState(mockBookings);

    const [filters, setFilters] = useState({
        status: "all",
        dateRange: "all",
        eventType: "all",
        sortBy: "date_desc",
        search: "",
    });

    useEffect(() => {
        // Check authentication
        const userData = localStorage.getItem("bookvenu_user");
        if (!userData) {
            router.push("/login?redirect=/dashboard/bookings");
            return;
        }

        setUser(JSON.parse(userData));

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

        // Filter by event type
        if (filters.eventType !== "all") {
            result = result.filter(booking => booking.eventType === filters.eventType);
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
        }

        // Search filter
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            result = result.filter(booking =>
                booking.venueName.toLowerCase().includes(searchLower) ||
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
                default:
                    return new Date(b.date) - new Date(a.date);
            }
        });

        setFilteredBookings(result);
    }, [filters, bookings]);

    const handleCancelBooking = (bookingId) => {
        const booking = bookings.find(b => b.id === bookingId);
        if (!booking) return;

        const today = new Date();
        const bookingDate = new Date(booking.date);
        const daysDifference = Math.floor((bookingDate - today) / (1000 * 60 * 60 * 24));

        if (daysDifference < 7) {
            alert("Bookings can only be cancelled at least 7 days before the event date.");
            return;
        }

        if (confirm("Are you sure you want to cancel this booking? A cancellation fee may apply.")) {
            setBookings(bookings.map(b =>
                b.id === bookingId
                    ? { ...b, status: "cancelled", paymentStatus: "refunded" }
                    : b
            ));
            alert("Booking cancelled successfully. Refund will be processed within 5-7 business days.");
        }
    };

    const handleViewInvoice = (bookingId) => {
        // In real app, this would generate/download invoice
        alert(`Invoice for booking ${bookingId} would be downloaded`);
    };

    const handleViewDetails = (bookingId) => {
        router.push(`/dashboard/bookings/${bookingId}`);
    };

    const handleViewVenue = (venueId) => {
        router.push(`/lawns/${venueId}`);
    };

    const handleReBook = (booking) => {
        if (confirm(`Would you like to book ${booking.venueName} again?`)) {
            router.push(`/lawns/${booking.venueId}?rebook=true`);
        }
    };

    const eventTypes = [...new Set(bookings.map(b => b.eventType))];

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <div className="mb-4 text-6xl">📅</div>
                    <p className="text-gray-600">Loading your bookings...</p>
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
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => router.push("/dashboard")}
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    ← Back to Dashboard
                                </button>
                            </div>
                            <h1 className="mt-2 text-2xl font-bold text-gray-900 md:text-3xl">
                                My Bookings
                            </h1>
                            <p className="text-gray-600">
                                View and manage all your venue bookings
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => router.push("/lawns")}
                                className="rounded-lg bg-linear-to-r from-emerald-600 to-teal-600 px-6 py-2 font-semibold text-white hover:from-emerald-700 hover:to-teal-700"
                            >
                                + New Booking
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                {/* Stats Summary */}
                <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                    <div className="rounded-lg border border-gray-200 bg-white p-4">
                        <div className="text-sm text-gray-600">Total Bookings</div>
                        <div className="text-2xl font-bold text-gray-900">{bookings.length}</div>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-white p-4">
                        <div className="text-sm text-gray-600">Upcoming</div>
                        <div className="text-2xl font-bold text-blue-600">
                            {bookings.filter(b => new Date(b.date) > new Date() && b.status !== "cancelled").length}
                        </div>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-white p-4">
                        <div className="text-sm text-gray-600">Completed</div>
                        <div className="text-2xl font-bold text-emerald-600">
                            {bookings.filter(b => b.status === "completed").length}
                        </div>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-white p-4">
                        <div className="text-sm text-gray-600">Cancelled</div>
                        <div className="text-2xl font-bold text-red-600">
                            {bookings.filter(b => b.status === "cancelled").length}
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="mb-6">
                    <BookingFilters
                        filters={filters}
                        eventTypes={eventTypes}
                        onFilterChange={setFilters}
                    />
                </div>

                {/* Bookings Count and Export */}
                <div className="mb-4 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            {filteredBookings.length} bookings found
                        </h2>
                        <p className="text-sm text-gray-600">
                            Showing all your bookings matching the selected filters
                        </p>
                    </div>
                    <button
                        onClick={() => alert("Export feature would download bookings as CSV")}
                        className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm hover:bg-gray-50"
                    >
                        <span>📥</span>
                        Export as CSV
                    </button>
                </div>

                {/* Mobile View - Cards */}
                <div className="md:hidden">
                    {filteredBookings.length === 0 ? (
                        <div className="rounded-xl border-2 border-dashed border-gray-300 bg-white py-16 text-center">
                            <div className="mx-auto max-w-sm">
                                <div className="mb-4 text-6xl">📭</div>
                                <h3 className="mb-2 text-xl font-semibold text-gray-900">No bookings found</h3>
                                <p className="mb-6 text-gray-600">
                                    {filters.status !== "all" || filters.search
                                        ? "No bookings match your filters. Try adjusting them."
                                        : "You haven't made any bookings yet."}
                                </p>
                                <button
                                    onClick={() => router.push("/lawns")}
                                    className="rounded-lg bg-emerald-600 px-6 py-3 text-white hover:bg-emerald-700"
                                >
                                    Book Your First Venue
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredBookings.map((booking) => (
                                <BookingCard
                                    key={booking.id}
                                    booking={booking}
                                    onViewDetails={handleViewDetails}
                                    onCancel={handleCancelBooking}
                                    onViewInvoice={handleViewInvoice}
                                    onViewVenue={handleViewVenue}
                                    onReBook={handleReBook}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Desktop View - Table */}
                <div className="hidden md:block">
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                        {filteredBookings.length === 0 ? (
                            <div className="py-16 text-center">
                                <div className="mx-auto max-w-sm">
                                    <div className="mb-4 text-6xl">📭</div>
                                    <h3 className="mb-2 text-xl font-semibold text-gray-900">No bookings found</h3>
                                    <p className="mb-6 text-gray-600">
                                        {filters.status !== "all" || filters.search
                                            ? "No bookings match your filters. Try adjusting them."
                                            : "You haven't made any bookings yet."}
                                    </p>
                                    <button
                                        onClick={() => router.push("/lawns")}
                                        className="rounded-lg bg-emerald-600 px-6 py-3 text-white hover:bg-emerald-700"
                                    >
                                        Book Your First Venue
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <table className="w-full">
                                    <thead className="border-b border-gray-200 bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Venue Details
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Date & Time
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Guests
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Amount
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {filteredBookings.map((booking) => (
                                            <BookingTableRow
                                                key={booking.id}
                                                booking={booking}
                                                onViewDetails={handleViewDetails}
                                                onCancel={handleCancelBooking}
                                                onViewInvoice={handleViewInvoice}
                                                onViewVenue={handleViewVenue}
                                                onReBook={handleReBook}
                                            />
                                        ))}
                                    </tbody>
                                </table>
                            </>
                        )}
                    </div>
                </div>

                {/* Pagination would go here in real app */}
                {filteredBookings.length > 10 && (
                    <div className="mt-8 flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                            Showing 1 to 10 of {filteredBookings.length} bookings
                        </div>
                        <div className="flex gap-2">
                            <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50">
                                ← Previous
                            </button>
                            <button className="rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium">
                                1
                            </button>
                            <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50">
                                2
                            </button>
                            <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50">
                                3
                            </button>
                            <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50">
                                Next →
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}