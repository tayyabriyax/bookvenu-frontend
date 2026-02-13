// components/Hero.js
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Hero() {
    const router = useRouter();
    const [search, setSearch] = useState({
        city: "",
        venueType: "",
        capacity: "",
    });

    const handleSearch = () => {
        const query = new URLSearchParams({
            ...(search.city && { city: search.city }),
            ...(search.venueType && { type: search.venueType }),
            ...(search.capacity && { capacity: search.capacity }),
        }).toString();

        router.push(`/lawns${query ? `?${query}` : ""}`);
    };

    return (
        <section className="relative overflow-hidden bg-linear-to-br from-emerald-50 via-white to-teal-50 py-20 md:py-32">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-4xl text-center">
                    {/* Heading */}
                    <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-6xl">
                        Find Your Perfect
                        <span className="block text-emerald-600">Venue Space</span>
                    </h1>
                    <p className="mb-10 text-lg text-gray-600 md:text-xl">
                        Book stunning lawns, halls, and venues for your special occasions.
                        From intimate gatherings to grand celebrations.
                    </p>

                    {/* Search Box */}
                    <div className="mb-12 rounded-2xl bg-white p-6 shadow-xl md:p-8">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                            {/* City Input */}
                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    City
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter city name"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                                    value={search.city}
                                    onChange={(e) => setSearch({ ...search, city: e.target.value })}
                                />
                            </div>

                            {/* Venue Type Select */}
                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Venue Type
                                </label>
                                <select
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                                    value={search.venueType}
                                    onChange={(e) => setSearch({ ...search, venueType: e.target.value })}
                                >
                                    <option value="">All Types</option>
                                    <option value="lawn">Lawn</option>
                                    <option value="hall">Hall</option>
                                </select>
                            </div>

                            {/* Capacity Input */}
                            {/* <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Capacity
                                </label>
                                <input
                                    type="number"
                                    placeholder="Min guests"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                                    value={search.capacity}
                                    onChange={(e) => setSearch({ ...search, capacity: e.target.value })}
                                />
                            </div> */}
                        </div>

                        {/* Search Button */}
                        <div className="mt-6">
                            <button
                                onClick={handleSearch}
                                className="w-full rounded-lg bg-linear-to-r from-emerald-600 to-teal-600 px-8 py-4 text-lg font-semibold text-white hover:from-emerald-700 hover:to-teal-700 transition-all transform hover:-translate-y-1 hover:shadow-2xl"
                            >
                                Search Venues
                            </button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-emerald-600 md:text-4xl">500+</div>
                            <div className="text-gray-600">Venues Listed</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-emerald-600 md:text-4xl">50+</div>
                            <div className="text-gray-600">Cities</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-emerald-600 md:text-4xl">10K+</div>
                            <div className="text-gray-600">Bookings</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-emerald-600 md:text-4xl">4.8★</div>
                            <div className="text-gray-600">Avg Rating</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}