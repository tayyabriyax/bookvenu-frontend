// components/owner/AddDishModal.js (Updated with proper CSS)
"use client";

import { useState, useEffect } from "react";

export default function AddDishModal({ isOpen, onClose, onAdd, onEdit, editingDish }) {
    const [formData, setFormData] = useState({
        dishName: "",
        price: "",
    });
    const [errors, setErrors] = useState({});

    // Reset form when modal opens/closes or when editingDish changes
    useEffect(() => {
        if (isOpen) {
            if (editingDish) {
                setFormData({
                    dishName: editingDish.dishName,
                    price: editingDish.price.toString(),
                });
            } else {
                setFormData({
                    dishName: "",
                    price: "",
                });
            }
            setErrors({});
        }
    }, [isOpen, editingDish]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.dishName.trim()) {
            newErrors.dishName = "Dish name is required";
        } else if (formData.dishName.trim().length < 2) {
            newErrors.dishName = "Dish name must be at least 2 characters";
        }

        if (!formData.price) {
            newErrors.price = "Price is required";
        } else if (parseFloat(formData.price) <= 0) {
            newErrors.price = "Price must be greater than 0";
        } else if (parseFloat(formData.price) > 10000) {
            newErrors.price = "Price seems too high. Please verify.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        if (editingDish) {
            onEdit(formData);
        } else {
            onAdd(formData);
        }

        setFormData({ dishName: "", price: "" });
    };

    const handlePriceChange = (value) => {
        // Allow only numbers and one decimal point
        const regex = /^\d*\.?\d*$/;
        if (regex.test(value)) {
            setFormData(prev => ({ ...prev, price: value }));
        }
    };

    // Sample dishes for quick addition
    const sampleDishes = [
        { dishName: "Paneer Tikka", price: "450" },
        { dishName: "Chicken Biryani", price: "550" },
        { dishName: "Butter Chicken", price: "600" },
        { dishName: "Vegetable Platter", price: "350" },
        { dishName: "Soft Drinks", price: "150" },
        { dishName: "Mocktails", price: "250" },
    ];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg bg-gray-50 p-4">
            <div
                className="relative w-full max-w-md rounded-xl bg-white shadow-xl"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
                {/* Modal header */}
                <div className="flex items-center justify-between border-b border-gray-200 p-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                            <span className="text-xl">🍽️</span>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                                {editingDish ? "Edit Dish" : "Add New Dish"}
                            </h3>
                            <p className="text-sm text-gray-500">
                                {editingDish
                                    ? "Update dish details and pricing"
                                    : "Add a new dish to your venue's menu"}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Modal body */}
                <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Dish Name *
                            </label>
                            <input
                                type="text"
                                value={formData.dishName}
                                onChange={(e) => setFormData({ ...formData, dishName: e.target.value })}
                                className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 ${errors.dishName
                                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                        : "border-gray-300 focus:border-emerald-500 focus:ring-emerald-200"
                                    }`}
                                placeholder="e.g., Paneer Tikka, Chicken Biryani"
                                autoFocus
                            />
                            {errors.dishName && (
                                <p className="mt-2 text-sm text-red-600">{errors.dishName}</p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Price (₹) *
                            </label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                    ₹
                                </div>
                                <input
                                    type="text"
                                    value={formData.price}
                                    onChange={(e) => handlePriceChange(e.target.value)}
                                    className={`w-full rounded-lg border px-4 py-3 pl-10 pr-24 focus:outline-none focus:ring-2 ${errors.price
                                            ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                            : "border-gray-300 focus:border-emerald-500 focus:ring-emerald-200"
                                        }`}
                                    placeholder="e.g., 450"
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                                    per head
                                </div>
                            </div>
                            {errors.price && (
                                <p className="mt-2 text-sm text-red-600">{errors.price}</p>
                            )}
                        </div>

                        {/* Sample Dishes */}
                        {!editingDish && (
                            <div>
                                <label className="mb-3 block text-sm font-medium text-gray-700">
                                    Quick Add Samples
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    {sampleDishes.map((sample, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            onClick={() => setFormData(sample)}
                                            className="rounded-lg border border-gray-200 bg-white p-3 text-left hover:border-emerald-300 hover:bg-emerald-50"
                                        >
                                            <div className="font-medium text-gray-900">{sample.dishName}</div>
                                            <div className="text-sm font-semibold text-emerald-700">₹{sample.price}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </form>
                </div>

                {/* Modal footer */}
                <div className="flex justify-end gap-3 border-t border-gray-200 p-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700"
                    >
                        {editingDish ? "Update Dish" : "Add Dish"}
                    </button>
                </div>
            </div>
        </div>
    );
}