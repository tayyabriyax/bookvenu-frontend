// app/lawns/page.js
"use client";

import { useState, useEffect } from "react";
import VenueCard from "@/components/VenueCard";
import FilterSidebar from "@/components/FilterSidebar";
import SortBar from "@/components/SortBar";
import Pagination from "@/components/Pagination";

// Mock data - In real app, this would come from API
const mockVenues = [
    {
        id: 1,
        name: "Royal Emerald Lawn",
        city: "Mumbai",
        type: "lawn",
        capacity: 500,
        pricePerHead: 1200,
        image: "https://images.unsplash.com/photo-1549451371-64aa98a6f660?w=800&auto=format&fit=crop",
        rating: 4.8,
        totalReviews: 124,
        amenities: ["Parking", "AC", "Catering"],
        dishes: ["Continental", "Indian", "Chinese"],
        createdAt: "2024-01-15",
    },
    {
        id: 2,
        name: "Grand Palace Banquet Hall",
        city: "Delhi",
        type: "hall",
        capacity: 300,
        pricePerHead: 1800,
        image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&auto=format&fit=crop",
        rating: 4.9,
        totalReviews: 89,
        amenities: ["Parking", "AC", "Stage", "Dance Floor"],
        dishes: ["Mughlai", "North Indian", "Italian"],
        createdAt: "2024-02-10",
    },
    {
        id: 3,
        name: "Skyline Rooftop Garden",
        city: "Bangalore",
        type: "rooftop",
        capacity: 150,
        pricePerHead: 1500,
        image: "https://images.unsplash.com/photo-1492684223066-dd23140edf6d?w=800&auto=format&fit=crop",
        rating: 4.7,
        totalReviews: 67,
        amenities: ["City View", "Bar", "Lighting"],
        dishes: ["Fusion", "BBQ", "Mocktails"],
        createdAt: "2024-01-28",
    },
    {
        id: 4,
        name: "Serenity Wedding Lawn",
        city: "Mumbai",
        type: "lawn",
        capacity: 800,
        pricePerHead: 900,
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&auto=format&fit=crop",
        rating: 4.5,
        totalReviews: 203,
        amenities: ["Garden", "Pool", "Changing Rooms"],
        dishes: ["South Indian", "Vegetarian", "Desserts"],
        createdAt: "2023-12-05",
    },
    {
        id: 5,
        name: "Crystal Ballroom",
        city: "Delhi",
        type: "hall",
        capacity: 400,
        pricePerHead: 2200,
        image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&auto=format&fit=crop",
        rating: 4.6,
        totalReviews: 45,
        amenities: ["AC", "Chandeliers", "VIP Lounge"],
        dishes: ["Continental", "Chinese", "Live Counters"],
        createdAt: "2024-02-20",
    },
    {
        id: 6,
        name: "Green Valley Garden",
        city: "Bangalore",
        type: "garden",
        capacity: 200,
        pricePerHead: 1100,
        image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&auto=format&fit=crop",
        rating: 4.4,
        totalReviews: 78,
        amenities: ["Natural", "Outdoor", "Kids Area"],
        dishes: ["Organic", "Local Cuisine"],
        createdAt: "2024-01-10",
    },
    {
        id: 7,
        name: "Luxury Banquet Hall",
        city: "Mumbai",
        type: "hall",
        capacity: 600,
        pricePerHead: 1600,
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop",
        rating: 4.8,
        totalReviews: 156,
        amenities: ["Valet Parking", "AC", "Projector"],
        dishes: ["Multi-cuisine", "Live Kitchen"],
        createdAt: "2024-02-15",
    },
    {
        id: 8,
        name: "Ocean View Lawn",
        city: "Goa",
        type: "lawn",
        capacity: 350,
        pricePerHead: 1400,
        image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&auto=format&fit=crop",
        rating: 4.9,
        totalReviews: 92,
        amenities: ["Beach Access", "Bar", "Sound System"],
        dishes: ["Seafood", "Goan", "Portuguese"],
        createdAt: "2024-02-01",
    },
    {
        id: 9,
        name: "Heritage Palace",
        city: "Jaipur",
        type: "palace",
        capacity: 1000,
        pricePerHead: 2500,
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop",
        rating: 4.7,
        totalReviews: 201,
        amenities: ["Heritage", "Gardens", "Royal Rooms"],
        dishes: ["Rajasthani", "Royal Thali"],
        createdAt: "2023-11-20",
    },
    {
        id: 10,
        name: "Modern Conference Hall",
        city: "Hyderabad",
        type: "hall",
        capacity: 250,
        pricePerHead: 1300,
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&auto=format&fit=crop",
        rating: 4.3,
        totalReviews: 34,
        amenities: ["WiFi", "Projector", "Whiteboard", "Catering"],
        dishes: ["Corporate Meals", "Snacks"],
        createdAt: "2024-02-25",
    },
    {
        id: 11,
        name: "Riverfront Lawn",
        city: "Kolkata",
        type: "lawn",
        capacity: 450,
        pricePerHead: 1000,
        image: "https://images.unsplash.com/photo-1473773508845-188df298d2d1?w=800&auto=format&fit=crop",
        rating: 4.5,
        totalReviews: 112,
        amenities: ["River View", "Boating", "Fireworks"],
        dishes: ["Bengali", "Chinese", "Continental"],
        createdAt: "2024-01-05",
    },
    {
        id: 12,
        name: "Sunset Terrace",
        city: "Pune",
        type: "rooftop",
        capacity: 120,
        pricePerHead: 1700,
        image: "https://images.unsplash.com/photo-1490380169520-0a4b88d52565?w=800&auto=format&fit=crop",
        rating: 4.6,
        totalReviews: 56,
        amenities: ["Sunset View", "DJ Setup", "Lighting"],
        dishes: ["Finger Food", "Cocktails", "Desserts"],
        createdAt: "2024-02-18",
    },
];

const ITEMS_PER_PAGE = 6;

export default function LawnsPage() {
    const [venues, setVenues] = useState(mockVenues);
    const [filteredVenues, setFilteredVenues] = useState(mockVenues);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState("newest");
    const [filters, setFilters] = useState({
        city: "",
        type: "",
        minCapacity: "",
        maxCapacity: "",
        dish: "",
        minPrice: "",
        maxPrice: "",
    });
    const [showFilters, setShowFilters] = useState(false);

    // Apply filters and sorting
    useEffect(() => {
        let result = [...venues];

        // Apply filters
        if (filters.city) {
            result = result.filter(venue =>
                venue.city.toLowerCase().includes(filters.city.toLowerCase())
            );
        }

        if (filters.type) {
            result = result.filter(venue => venue.type === filters.type);
        }

        if (filters.minCapacity) {
            result = result.filter(venue => venue.capacity >= parseInt(filters.minCapacity));
        }

        if (filters.maxCapacity) {
            result = result.filter(venue => venue.capacity <= parseInt(filters.maxCapacity));
        }

        if (filters.dish) {
            result = result.filter(venue =>
                venue.dishes.some(dish =>
                    dish.toLowerCase().includes(filters.dish.toLowerCase())
                )
            );
        }

        if (filters.minPrice) {
            result = result.filter(venue => venue.pricePerHead >= parseInt(filters.minPrice));
        }

        if (filters.maxPrice) {
            result = result.filter(venue => venue.pricePerHead <= parseInt(filters.maxPrice));
        }

        // Apply sorting
        switch (sortBy) {
            case "price_low_high":
                result.sort((a, b) => a.pricePerHead - b.pricePerHead);
                break;
            case "price_high_low":
                result.sort((a, b) => b.pricePerHead - a.pricePerHead);
                break;
            case "capacity_high_low":
                result.sort((a, b) => b.capacity - a.capacity);
                break;
            case "newest":
                result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case "rating":
                result.sort((a, b) => b.rating - a.rating);
                break;
        }

        setFilteredVenues(result);
        setCurrentPage(1); // Reset to first page when filters change
    }, [filters, sortBy, venues]);

    // Pagination logic
    const totalPages = Math.ceil(filteredVenues.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedVenues = filteredVenues.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handleFilterChange = (newFilters) => {
        setFilters({ ...filters, ...newFilters });
    };

    const clearFilters = () => {
        setFilters({
            city: "",
            type: "",
            minCapacity: "",
            maxCapacity: "",
            dish: "",
            minPrice: "",
            maxPrice: "",
        });
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="border-b bg-white">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="mb-2 text-3xl font-bold text-gray-900 md:text-4xl">
                        Browse Venues
                    </h1>
                    <p className="text-gray-600">
                        Discover perfect venues for your special occasion
                    </p>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Mobile Filter Button */}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 text-white lg:hidden"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        {showFilters ? "Hide Filters" : "Show Filters"}
                    </button>

                    {/* Filters Sidebar */}
                    <div className={`${showFilters ? "block" : "hidden"} lg:block lg:w-1/4`}>
                        <FilterSidebar
                            filters={filters}
                            onFilterChange={handleFilterChange}
                            onClearFilters={clearFilters}
                        />
                    </div>

                    {/* Main Content */}
                    <div className="lg:w-3/4">
                        {/* Results Header */}
                        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">
                                    {filteredVenues.length} venues found
                                    {filters.city && ` in ${filters.city}`}
                                </h2>
                                <p className="text-gray-600">
                                    Showing {Math.min(startIndex + 1, filteredVenues.length)}-
                                    {Math.min(startIndex + ITEMS_PER_PAGE, filteredVenues.length)} of {filteredVenues.length} venues
                                </p>
                            </div>

                            <SortBar sortBy={sortBy} onSortChange={setSortBy} />
                        </div>

                        {/* Active Filters */}
                        {(filters.city || filters.type || filters.dish) && (
                            <div className="mb-6 flex flex-wrap gap-2">
                                {filters.city && (
                                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-800">
                                        City: {filters.city}
                                    </span>
                                )}
                                {filters.type && (
                                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-800">
                                        Type: {filters.type}
                                    </span>
                                )}
                                {filters.dish && (
                                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-800">
                                        Dish: {filters.dish}
                                    </span>
                                )}
                                <button
                                    onClick={clearFilters}
                                    className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200"
                                >
                                    Clear all
                                </button>
                            </div>
                        )}

                        {/* Venues Grid */}
                        {paginatedVenues.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {paginatedVenues.map((venue) => (
                                        <VenueCard key={venue.id} venue={venue} />
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="mt-12">
                                        <Pagination
                                            currentPage={currentPage}
                                            totalPages={totalPages}
                                            onPageChange={setCurrentPage}
                                        />
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="rounded-xl border-2 border-dashed border-gray-300 bg-white py-16 text-center">
                                <div className="mx-auto max-w-md">
                                    <div className="mb-4 text-6xl">🏢</div>
                                    <h3 className="mb-2 text-xl font-semibold text-gray-900">
                                        No venues found
                                    </h3>
                                    <p className="mb-6 text-gray-600">
                                        Try adjusting your filters to find more venues
                                    </p>
                                    <button
                                        onClick={clearFilters}
                                        className="rounded-lg bg-emerald-600 px-6 py-3 text-white hover:bg-emerald-700"
                                    >
                                        Clear All Filters
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}