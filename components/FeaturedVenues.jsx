// components/FeaturedVenues.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const venues = [
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

export default function FeaturedVenues() {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === venues.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? venues.length - 1 : prev - 1));
    };

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                        Featured Venues
                    </h2>
                    <p className="text-gray-600">
                        Discover our most popular venue spaces
                    </p>
                </div>

                {/* Desktop Grid View */}
                <div className="hidden grid-cols-1 gap-8 md:grid md:grid-cols-3 lg:grid-cols-4">
                    {venues.map((venue) => (
                        <div
                            key={venue.id}
                            className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                            onClick={() => router.push(`/lawns/${venue.id}`)}
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

                {/* Mobile Carousel */}
                <div className="relative md:hidden">
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-300"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {venues.map((venue) => (
                                <div
                                    key={venue.id}
                                    className="w-full shrink-0 px-4"
                                    onClick={() => router.push(`/venue/${venue.id}`)}
                                >
                                    <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
                                        <div className="relative h-48">
                                            <div className="h-full w-full bg-linear-to-br from-emerald-400 to-teal-500" />
                                            <div className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-emerald-700">
                                                {venue.type}
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <div className="mb-2 flex items-center justify-between">
                                                <h3 className="text-lg font-semibold">{venue.name}</h3>
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
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Carousel Controls */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg backdrop-blur-sm"
                    >
                        ←
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg backdrop-blur-sm"
                    >
                        →
                    </button>

                    {/* Dots Indicator */}
                    <div className="mt-6 flex justify-center space-x-2">
                        {venues.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`h-2 w-2 rounded-full ${index === currentIndex ? "bg-emerald-600" : "bg-gray-300"
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* View All Button */}
                <div className="mt-12 text-center">
                    <button
                        onClick={() => router.push("/lawns")}
                        className="rounded-lg border-2 border-emerald-600 px-8 py-3 font-semibold text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors"
                    >
                        View All Venues →
                    </button>
                </div>
            </div>
        </section>
    );
}