// app/owner/lawns/[id]/dishes/page.js
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import AddDishModal from "@/components/owner/AddDishModal";

// Mock data - In real app, fetch from API based on venue ID
const mockVenue = {
    id: 1,
    name: "Royal Emerald Lawn",
    type: "lawn",
    city: "Mumbai",
    status: "approved",
    pricePerHead: [
        { dishName: "Paneer Tikka", price: 450 },
        { dishName: "Chicken Biryani", price: 550 },
        { dishName: "Butter Chicken", price: 600 },
        { dishName: "Vegetable Platter", price: 350 },
        { dishName: "Soft Drinks", price: 150 },
        { dishName: "Mocktails", price: 250 },
        { dishName: "Salad Bar", price: 300 },
        { dishName: "Dessert Counter", price: 400 },
    ],
};

export default function ManageDishesPage() {
    const params = useParams();
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [venue, setVenue] = useState(mockVenue);
    const [dishes, setDishes] = useState(mockVenue.pricePerHead);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDish, setEditingDish] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        // Check authentication and role
        const userData = localStorage.getItem("bookvenu_user");
        if (!userData) {
            router.push(`/login?redirect=/owner/lawns/${params.id}/dishes`);
            return;
        }

        const user = JSON.parse(userData);
        if (user.role !== "owner") {
            router.push("/dashboard");
            return;
        }

        setUser(user);

        // Simulate fetching venue data
        setTimeout(() => {
            setLoading(false);
        }, 800);
    }, [params.id, router]);

    const handleAddDish = (newDish) => {
        setDishes(prev => [...prev, { ...newDish, price: parseFloat(newDish.price) }]);
        setIsModalOpen(false);
    };

    const handleEditDish = (updatedDish) => {
        setDishes(prev => prev.map(dish =>
            dish === editingDish ? { ...updatedDish, price: parseFloat(updatedDish.price) } : dish
        ));
        setEditingDish(null);
        setIsModalOpen(false);
    };

    const handleDeleteDish = (dishToDelete) => {
        if (dishes.length <= 1) {
            alert("You must have at least one dish in your menu.");
            return;
        }

        if (confirm(`Are you sure you want to delete "${dishToDelete.dishName}"?`)) {
            setDishes(prev => prev.filter(dish => dish !== dishToDelete));
        }
    };

    const handleStartEdit = (dish) => {
        setEditingDish(dish);
        setIsModalOpen(true);
    };

    const handleSaveChanges = () => {
        // In real app, send API request to update dishes
        setVenue(prev => ({
            ...prev,
            pricePerHead: dishes
        }));

        alert("Menu updated successfully!");
    };

    const handleBulkDelete = () => {
        if (dishes.length === 0) {
            alert("No dishes to delete");
            return;
        }

        if (confirm(`Delete all ${dishes.length} dishes? This action cannot be undone.`)) {
            setDishes([]);
        }
    };

    const handleAddSampleDishes = () => {
        const sampleDishes = [
            { dishName: "Paneer Tikka", price: 450 },
            { dishName: "Chicken Biryani", price: 550 },
            { dishName: "Butter Chicken", price: 600 },
            { dishName: "Vegetable Platter", price: 350 },
            { dishName: "Soft Drinks", price: 150 },
        ];

        setDishes(prev => [...prev, ...sampleDishes]);
    };

    // Filter dishes based on search term
    const filteredDishes = dishes.filter(dish =>
        dish.dishName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculate statistics
    const stats = {
        totalDishes: dishes.length,
        averagePrice: dishes.length > 0
            ? Math.round(dishes.reduce((sum, dish) => sum + dish.price, 0) / dishes.length)
            : 0,
        minPrice: dishes.length > 0
            ? Math.min(...dishes.map(dish => dish.price))
            : 0,
        maxPrice: dishes.length > 0
            ? Math.max(...dishes.map(dish => dish.price))
            : 0,
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <div className="mb-4 text-6xl">🍽️</div>
                    <p className="text-gray-600">Loading menu...</p>
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
                                    onClick={() => router.push(`/owner/lawns/${params.id}`)}
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    ← Back to Venue Details
                                </button>
                            </div>
                            <div className="mt-2 flex flex-col gap-2 md:flex-row md:items-center">
                                <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                                    Manage Menu: {venue.name}
                                </h1>
                                <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800">
                                    {dishes.length} dishes
                                </span>
                            </div>
                            <p className="mt-2 text-gray-600">
                                Manage per-head pricing for your venue
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={handleSaveChanges}
                                className="rounded-lg bg-linear-to-r from-emerald-600 to-teal-600 px-6 py-2 font-semibold text-white hover:from-emerald-700 hover:to-teal-700"
                                disabled={dishes.length === 0}
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                {/* Stats Cards */}
                <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                    <div className="rounded-lg border border-gray-200 bg-white p-4">
                        <div className="text-sm text-gray-600">Total Dishes</div>
                        <div className="text-2xl font-bold text-gray-900">{stats.totalDishes}</div>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-white p-4">
                        <div className="text-sm text-gray-600">Avg. Price</div>
                        <div className="text-2xl font-bold text-emerald-700">₹{stats.averagePrice}</div>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-white p-4">
                        <div className="text-sm text-gray-600">Min Price</div>
                        <div className="text-2xl font-bold text-blue-700">₹{stats.minPrice}</div>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-white p-4">
                        <div className="text-sm text-gray-600">Max Price</div>
                        <div className="text-2xl font-bold text-amber-700">₹{stats.maxPrice}</div>
                    </div>
                </div>

                {/* Action Bar */}
                <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6">
                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                        {/* Search */}
                        <div className="relative md:w-1/3">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                🔍
                            </div>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search dishes..."
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 pl-10 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                            >
                                <span>+</span>
                                Add New Dish
                            </button>
                            <button
                                onClick={handleAddSampleDishes}
                                className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                <span>📋</span>
                                Add Sample Dishes
                            </button>
                            <button
                                onClick={handleBulkDelete}
                                disabled={dishes.length === 0}
                                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium ${dishes.length === 0
                                        ? "cursor-not-allowed border border-gray-300 bg-gray-100 text-gray-400"
                                        : "border border-red-300 bg-white text-red-700 hover:bg-red-50"
                                    }`}
                            >
                                <span>🗑️</span>
                                Delete All
                            </button>
                        </div>
                    </div>
                </div>

                {/* Dishes Table */}
                <div className="mb-8 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    {dishes.length === 0 ? (
                        <div className="py-16 text-center">
                            <div className="mx-auto max-w-sm">
                                <div className="mb-4 text-6xl">🍽️</div>
                                <h3 className="mb-2 text-xl font-semibold text-gray-900">No dishes added yet</h3>
                                <p className="mb-6 text-gray-600">
                                    Add dishes to create your venue's menu
                                </p>
                                <div className="space-y-3">
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="rounded-lg bg-emerald-600 px-6 py-3 text-white hover:bg-emerald-700"
                                    >
                                        + Add Your First Dish
                                    </button>
                                    <button
                                        onClick={handleAddSampleDishes}
                                        className="block w-full rounded-lg border border-gray-300 bg-white px-6 py-3 text-gray-700 hover:bg-gray-50"
                                    >
                                        📋 Add Sample Menu
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Desktop Table */}
                            <div className="hidden md:block">
                                <table className="w-full">
                                    <thead className="border-b border-gray-200 bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Dish Name
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Price
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {filteredDishes.map((dish, index) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <div className="font-medium text-gray-900">{dish.dishName}</div>
                                                    <div className="text-sm text-gray-500">Dish #{index + 1}</div>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <div className="flex items-center">
                                                        <span className="text-2xl font-bold text-emerald-700">₹{dish.price}</span>
                                                        <span className="ml-2 text-sm text-gray-500">per head</span>
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleStartEdit(dish)}
                                                            className="rounded-lg border border-gray-300 bg-white px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteDish(dish)}
                                                            className="rounded-lg border border-red-300 bg-white px-3 py-1 text-xs font-medium text-red-700 hover:bg-red-50"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Cards */}
                            <div className="md:hidden">
                                {filteredDishes.map((dish, index) => (
                                    <div key={index} className="border-b border-gray-200 p-4">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <div className="font-bold text-gray-900">{dish.dishName}</div>
                                                <div className="text-sm text-gray-500">Dish #{index + 1}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-lg font-bold text-emerald-700">₹{dish.price}</div>
                                                <div className="text-xs text-gray-500">per head</div>
                                            </div>
                                        </div>
                                        <div className="mt-4 flex gap-2">
                                            <button
                                                onClick={() => handleStartEdit(dish)}
                                                className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteDish(dish)}
                                                className="flex-1 rounded-lg border border-red-300 bg-white px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Tips Section */}
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6">
                    <h4 className="mb-3 font-semibold text-emerald-800">Menu Management Tips:</h4>
                    <ul className="space-y-2 text-sm text-emerald-700">
                        <li>• Add a variety of dishes to cater to different customer preferences</li>
                        <li>• Include vegetarian, non-vegetarian, and beverage options</li>
                        <li>• Set competitive prices based on your location and quality</li>
                        <li>• You must have at least one dish in your menu</li>
                        <li>• Changes are saved automatically when you click "Save Changes"</li>
                        <li>• Consider adding package deals (e.g., "Standard Package", "Premium Package")</li>
                    </ul>
                </div>

                {/* Summary Section */}
                {dishes.length > 0 && (
                    <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6">
                        <h4 className="mb-4 text-lg font-semibold text-gray-900">Menu Summary</h4>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <div className="mb-3 text-sm font-medium text-gray-700">Dishes by Price Range</div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Budget (₹0-300):</span>
                                        <span className="font-medium text-gray-900">
                                            {dishes.filter(d => d.price <= 300).length} dishes
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Standard (₹301-600):</span>
                                        <span className="font-medium text-gray-900">
                                            {dishes.filter(d => d.price > 300 && d.price <= 600).length} dishes
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Premium (₹601+):</span>
                                        <span className="font-medium text-gray-900">
                                            {dishes.filter(d => d.price > 600).length} dishes
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="mb-3 text-sm font-medium text-gray-700">Price Statistics</div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Total Menu Value:</span>
                                        <span className="font-bold text-emerald-700">
                                            ₹{dishes.reduce((sum, dish) => sum + dish.price, 0)}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Average Price:</span>
                                        <span className="font-medium text-gray-900">₹{stats.averagePrice}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Price Range:</span>
                                        <span className="font-medium text-gray-900">
                                            ₹{stats.minPrice} - ₹{stats.maxPrice}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Add/Edit Dish Modal */}
            <AddDishModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingDish(null);
                }}
                onAdd={handleAddDish}
                onEdit={handleEditDish}
                editingDish={editingDish}
            />
        </main>
    );
}