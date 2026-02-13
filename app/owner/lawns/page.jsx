// app/owner/venues/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import StatusFilter from "@/components/owner/StatusFilter";

// Mock data
const mockVenues = [
    {
        id: 1,
        name: "Royal Emerald Lawn",
        type: "lawn",
        location: "Bandra West, Mumbai",
        capacity: "500 guests",
        price: "₹50,000",
        rating: 4.8,
        status: "active",
        bookings: 45,
        revenue: 1250000,
        image: "https://images.unsplash.com/photo-1549451371-64aa98a6f660?w=800&auto=format&fit=crop",
        lastBooking: "2024-03-15",
        pendingApprovals: 2
    },
    {
        id: 2,
        name: "Skyline Rooftop",
        type: "rooftop",
        location: "Andheri East, Mumbai",
        capacity: "300 guests",
        price: "₹35,000",
        rating: 4.6,
        status: "active",
        bookings: 32,
        revenue: 890000,
        image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&auto=format&fit=crop",
        lastBooking: "2024-03-18",
        pendingApprovals: 0
    },
    {
        id: 3,
        name: "Serenity Garden",
        type: "garden",
        location: "Koregaon Park, Pune",
        capacity: "400 guests",
        price: "₹40,000",
        rating: 4.7,
        status: "pending",
        bookings: 18,
        revenue: 450000,
        image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&auto=format&fit=crop",
        lastBooking: "2024-03-10",
        pendingApprovals: 1
    },
    {
        id: 4,
        name: "Crystal Ballroom",
        type: "hall",
        location: "Whitefield, Bangalore",
        capacity: "600 guests",
        price: "₹75,000",
        rating: 4.9,
        status: "active",
        bookings: 67,
        revenue: 2100000,
        image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&auto=format&fit=crop",
        lastBooking: "2024-03-20",
        pendingApprovals: 3
    },
    {
        id: 5,
        name: "Ocean Pearl Banquet",
        type: "hall",
        location: "Marine Drive, Mumbai",
        capacity: "350 guests",
        price: "₹55,000",
        rating: 4.5,
        status: "inactive",
        bookings: 12,
        revenue: 320000,
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop",
        lastBooking: "2024-02-28",
        pendingApprovals: 0
    },
    {
        id: 6,
        name: "Green Valley Lawn",
        type: "lawn",
        location: "Lavelle Road, Bangalore",
        capacity: "800 guests",
        price: "₹65,000",
        rating: 4.7,
        status: "active",
        bookings: 54,
        revenue: 1750000,
        image: "https://images.unsplash.com/photo-1549451371-64aa98a6f660?w=800&auto=format&fit=crop",
        lastBooking: "2024-03-17",
        pendingApprovals: 1
    }
];

// Venue Card Component
function VenueCard({ venue, isSelected, onToggleSelect, onView, onEdit, onManageDishes, onDelete }) {
    const router = useRouter();
    const [showActions, setShowActions] = useState(false);

    const getStatusColor = (status) => {
        switch (status) {
            case "active":
                return "bg-emerald-100 text-emerald-800 border-emerald-200";
            case "pending":
                return "bg-amber-100 text-amber-800 border-amber-200";
            case "inactive":
                return "bg-gray-100 text-gray-800 border-gray-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "active":
                return "✓";
            case "pending":
                return "⏳";
            case "inactive":
                return "⏸️";
            default:
                return "";
        }
    };

    return (
        <div
            className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            onMouseEnter={() => setShowActions(true)}
            onMouseLeave={() => setShowActions(false)}
        >
            {/* Selection Checkbox */}
            <div className="absolute left-3 top-3 z-20">
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => {
                        e.stopPropagation();
                        onToggleSelect(venue.id);
                    }}
                    className="h-5 w-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
            </div>

            {/* Status Badge */}
            <div className="absolute right-3 top-3 z-20">
                <span className={`rounded-full border px-3 py-1.5 text-xs font-medium ${getStatusColor(venue.status)}`}>
                    {getStatusIcon(venue.status)} {venue.status.charAt(0).toUpperCase() + venue.status.slice(1)}
                </span>
            </div>

            {/* Image Section */}
            <div
                className="relative h-56 cursor-pointer overflow-hidden"
                onClick={() => onView(venue.id)}
            >
                {venue.image ? (
                    <img
                        src={venue.image}
                        alt={venue.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="h-full w-full bg-linear-to-br from-emerald-400 to-teal-500" />
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

                {/* Venue Type Badge */}
                <div className="absolute bottom-3 left-3">
                    <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold capitalize text-emerald-700 backdrop-blur-sm">
                        {venue.type}
                    </span>
                </div>

                {/* Rating Badge */}
                <div className="absolute bottom-3 right-3">
                    <span className="flex items-center gap-1 rounded-full bg-amber-500 px-2.5 py-1.5 text-xs font-semibold text-white">
                        ★ {venue.rating}
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
                {/* Header */}
                <div className="mb-4 flex items-start justify-between">
                    <div>
                        <h3
                            className="cursor-pointer text-xl font-bold text-gray-900 hover:text-emerald-600"
                            onClick={() => onView(venue.id)}
                        >
                            {venue.name}
                        </h3>
                        <p className="mt-1 flex items-center gap-1 text-sm text-gray-600">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {venue.location}
                        </p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="mb-4 grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-gray-50 p-3">
                        <p className="text-xs text-gray-500">Capacity</p>
                        <p className="text-sm font-semibold text-gray-900">{venue.capacity}</p>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-3">
                        <p className="text-xs text-gray-500">Base Price</p>
                        <p className="text-sm font-semibold text-emerald-700">{venue.price}</p>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-3">
                        <p className="text-xs text-gray-500">Total Bookings</p>
                        <p className="text-sm font-semibold text-gray-900">{venue.bookings}</p>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-3">
                        <p className="text-xs text-gray-500">Revenue</p>
                        <p className="text-sm font-semibold text-emerald-700">₹{(venue.revenue / 100000).toFixed(1)}L</p>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">Last booking:</span>
                        <span className="text-xs font-medium text-gray-900">
                            {new Date(venue.lastBooking).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                        </span>
                    </div>
                    {venue.pendingApprovals > 0 && (
                        <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-800">
                            {venue.pendingApprovals} pending
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function OwnerVenuesPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [venues, setVenues] = useState(mockVenues);
    const [filteredVenues, setFilteredVenues] = useState(mockVenues);
    const [selectedVenues, setSelectedVenues] = useState([]);
    const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"

    const [filters, setFilters] = useState({
        status: "all",
        type: "all",
        location: "all",
        sortBy: "newest",
        search: "",
    });

    useEffect(() => {
        // Check authentication
        const userData = localStorage.getItem("bookvenu_user");
        if (!userData) {
            router.push("/login?redirect=/owner/venues");
            return;
        }

        const user = JSON.parse(userData);
        if (user.role !== "owner") {
            router.push("/dashboard");
            return;
        }

        setTimeout(() => {
            setLoading(false);
        }, 800);
    }, [router]);

    // Apply filters
    useEffect(() => {
        let result = [...venues];

        if (filters.status !== "all") {
            result = result.filter(v => v.status === filters.status);
        }

        if (filters.type !== "all") {
            result = result.filter(v => v.type === filters.type);
        }

        if (filters.location !== "all") {
            result = result.filter(v => v.location.includes(filters.location));
        }

        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            result = result.filter(v =>
                v.name.toLowerCase().includes(searchLower) ||
                v.location.toLowerCase().includes(searchLower) ||
                v.type.toLowerCase().includes(searchLower)
            );
        }

        // Sorting
        result.sort((a, b) => {
            switch (filters.sortBy) {
                case "newest":
                    return new Date(b.lastBooking) - new Date(a.lastBooking);
                case "oldest":
                    return new Date(a.lastBooking) - new Date(b.lastBooking);
                case "name_asc":
                    return a.name.localeCompare(b.name);
                case "name_desc":
                    return b.name.localeCompare(a.name);
                case "bookings_desc":
                    return b.bookings - a.bookings;
                case "revenue_desc":
                    return b.revenue - a.revenue;
                default:
                    return new Date(b.lastBooking) - new Date(a.lastBooking);
            }
        });

        setFilteredVenues(result);
    }, [filters, venues]);

    const handleViewVenue = (venueId) => {
        router.push(`/owner/lawns/${venueId}`);
    };

    const handleEditVenue = (venueId) => {
        router.push(`/owner/lawns/${venueId}/edit`);
    };

    const handleManageDishes = (venueId) => {
        router.push(`/owner/lawns/${venueId}/dishes`);
    };

    const handleDeleteVenue = (venueId) => {
        if (confirm("Are you sure you want to delete this venue? This action cannot be undone.")) {
            setVenues(venues.filter(v => v.id !== venueId));
            alert("Venue deleted successfully!");
        }
    };

    const handleToggleSelect = (venueId) => {
        setSelectedVenues(prev =>
            prev.includes(venueId)
                ? prev.filter(id => id !== venueId)
                : [...prev, venueId]
        );
    };

    const handleSelectAll = () => {
        if (selectedVenues.length === filteredVenues.length) {
            setSelectedVenues([]);
        } else {
            setSelectedVenues(filteredVenues.map(v => v.id));
        }
    };

    const handleBulkAction = (action) => {
        if (selectedVenues.length === 0) {
            alert("Please select at least one venue");
            return;
        }

        switch (action) {
            case "activate":
                setVenues(venues.map(v =>
                    selectedVenues.includes(v.id)
                        ? { ...v, status: "active" }
                        : v
                ));
                alert(`${selectedVenues.length} venue(s) activated successfully!`);
                setSelectedVenues([]);
                break;
            case "deactivate":
                setVenues(venues.map(v =>
                    selectedVenues.includes(v.id)
                        ? { ...v, status: "inactive" }
                        : v
                ));
                alert(`${selectedVenues.length} venue(s) deactivated successfully!`);
                setSelectedVenues([]);
                break;
            case "delete":
                if (confirm(`Are you sure you want to delete ${selectedVenues.length} venue(s)?`)) {
                    setVenues(venues.filter(v => !selectedVenues.includes(v.id)));
                    alert(`${selectedVenues.length} venue(s) deleted successfully!`);
                    setSelectedVenues([]);
                }
                break;
        }
    };

    const getUniqueLocations = () => {
        return [...new Set(venues.map(v => v.location.split(',')[1]?.trim() || v.location))].sort();
    };

    const getUniqueTypes = () => {
        return [...new Set(venues.map(v => v.type))].sort();
    };

    const stats = {
        total: venues.length,
        active: venues.filter(v => v.status === "active").length,
        pending: venues.filter(v => v.status === "pending").length,
        inactive: venues.filter(v => v.status === "inactive").length,
        totalBookings: venues.reduce((sum, v) => sum + v.bookings, 0),
        totalRevenue: venues.reduce((sum, v) => sum + v.revenue, 0),
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <div className="mb-4 text-6xl">🏢</div>
                    <p className="text-gray-600">Loading venues...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header Actions */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setViewMode("grid")}
                        className={`rounded-lg p-2 ${viewMode === "grid"
                            ? "bg-emerald-100 text-emerald-700"
                            : "text-gray-500 hover:bg-gray-100"
                            }`}
                        title="Grid View"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                    </button>
                    <button
                        onClick={() => setViewMode("list")}
                        className={`rounded-lg p-2 ${viewMode === "list"
                            ? "bg-emerald-100 text-emerald-700"
                            : "text-gray-500 hover:bg-gray-100"
                            }`}
                        title="List View"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => router.push("/owner/venues/add")}
                        className="rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700"
                    >
                        + Add New Venue
                    </button>
                </div>
            </div>

            {/* Filters */}
            {/* <StatusFilter
                filters={filters}
                types={getUniqueTypes()}
                locations={getUniqueLocations()}
                onFilterChange={setFilters}
            /> */}

            {/* Stats Summary */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="rounded-xl border border-gray-200 bg-white p-4">
                    <div className="text-sm text-gray-600">Total Venues</div>
                    <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-4">
                    <div className="text-sm text-gray-600">Active</div>
                    <div className="text-2xl font-bold text-emerald-600">{stats.active}</div>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-4">
                    <div className="text-sm text-gray-600">Pending</div>
                    <div className="text-2xl font-bold text-amber-600">{stats.pending}</div>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-4">
                    <div className="text-sm text-gray-600">Total Revenue</div>
                    <div className="text-2xl font-bold text-teal-600">₹{(stats.totalRevenue / 1000000).toFixed(1)}M</div>
                </div>
            </div>

            {/* Bulk Actions */}
            {selectedVenues.length > 0 && (
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                    <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                        <div className="flex items-center gap-2">
                            <div className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800">
                                {selectedVenues.length} venue(s) selected
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => handleBulkAction("activate")}
                                className="rounded-lg border border-emerald-600 bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                            >
                                Activate Selected
                            </button>
                            <button
                                onClick={() => handleBulkAction("deactivate")}
                                className="rounded-lg border border-amber-600 bg-white px-4 py-2 text-sm font-medium text-amber-700 hover:bg-amber-50"
                            >
                                Deactivate Selected
                            </button>
                            <button
                                onClick={() => handleBulkAction("delete")}
                                className="rounded-lg border border-red-600 bg-white px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
                            >
                                Delete Selected
                            </button>
                            <button
                                onClick={() => setSelectedVenues([])}
                                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Clear Selection
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Select All Bar */}
            {filteredVenues.length > 0 && (
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={selectedVenues.length === filteredVenues.length}
                            onChange={handleSelectAll}
                            className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="text-sm text-gray-600">
                            Select All ({filteredVenues.length} venues)
                        </span>
                    </div>
                    <span className="text-sm text-gray-500">
                        Showing {filteredVenues.length} of {venues.length} venues
                    </span>
                </div>
            )}

            {/* Venues Display - Grid View (Default) */}
            {viewMode === "grid" && (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredVenues.length === 0 ? (
                        <div className="col-span-full rounded-xl border-2 border-dashed border-gray-300 bg-white py-16 text-center">
                            <div className="mx-auto max-w-sm">
                                <div className="mb-4 text-6xl">🏢</div>
                                <h3 className="mb-2 text-xl font-semibold text-gray-900">No venues found</h3>
                                <p className="mb-6 text-gray-600">
                                    {filters.status !== "all" || filters.type !== "all" || filters.search
                                        ? "No venues match your filters. Try adjusting them."
                                        : "You haven't listed any venues yet."}
                                </p>
                                <button
                                    onClick={() => router.push("/owner/lawns/create")}
                                    className="rounded-lg bg-emerald-600 px-6 py-3 text-white hover:bg-emerald-700"
                                >
                                    List Your First Venue
                                </button>
                            </div>
                        </div>
                    ) : (
                        filteredVenues.map((venue) => (
                            <VenueCard
                                key={venue.id}
                                venue={venue}
                                isSelected={selectedVenues.includes(venue.id)}
                                onToggleSelect={handleToggleSelect}
                                onView={handleViewVenue}
                                onEdit={handleEditVenue}
                                onManageDishes={handleManageDishes}
                                onDelete={handleDeleteVenue}
                            />
                        ))
                    )}
                </div>
            )}

            {/* Venues Display - List View (Alternative) */}
            {viewMode === "list" && (
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b border-gray-200 bg-gray-50">
                                <tr>
                                    <th className="w-12 px-6 py-3 text-left">
                                        <input
                                            type="checkbox"
                                            checked={selectedVenues.length === filteredVenues.length && filteredVenues.length > 0}
                                            onChange={handleSelectAll}
                                            className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                        />
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Venue Details
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Location & Capacity
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Performance
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
                                {filteredVenues.map((venue) => (
                                    <tr key={venue.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedVenues.includes(venue.id)}
                                                onChange={() => handleToggleSelect(venue.id)}
                                                className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-12 w-12 overflow-hidden rounded-lg">
                                                    {venue.image ? (
                                                        <img src={venue.image} alt={venue.name} className="h-full w-full object-cover" />
                                                    ) : (
                                                        <div className="h-full w-full bg-linear-to-br from-emerald-400 to-teal-500" />
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900">{venue.name}</div>
                                                    <div className="text-sm text-gray-500 capitalize">{venue.type}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900">{venue.location}</div>
                                            <div className="text-sm text-gray-500">{venue.capacity}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">{venue.bookings} bookings</div>
                                            <div className="text-sm text-emerald-700">₹{(venue.revenue / 100000).toFixed(1)}L</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`rounded-full px-3 py-1 text-xs font-medium ${venue.status === "active"
                                                ? "bg-emerald-100 text-emerald-800"
                                                : venue.status === "pending"
                                                    ? "bg-amber-100 text-amber-800"
                                                    : "bg-gray-100 text-gray-800"
                                                }`}>
                                                {venue.status.charAt(0).toUpperCase() + venue.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleViewVenue(venue.id)}
                                                    className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                                                >
                                                    View
                                                </button>
                                                <button
                                                    onClick={() => handleEditVenue(venue.id)}
                                                    className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => router.push(`/owner/venues/${venue.id}/availability`)}
                                                    className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                                                >
                                                    Availability
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}