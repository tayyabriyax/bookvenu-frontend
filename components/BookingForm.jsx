// components/BookingForm.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BookingForm({ venue, onBookNow }) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        date: "",
        guests: venue.capacity.min,
        selectedDishes: [],
        notes: "",
    });

    const [totalPrice, setTotalPrice] = useState(0);
    const [isCalculating, setIsCalculating] = useState(false);

    // Calculate total price whenever form data changes
    useEffect(() => {
        setIsCalculating(true);

        // Simulate calculation delay
        setTimeout(() => {
            calculateTotalPrice();
            setIsCalculating(false);
        }, 300);
    }, [formData.guests, formData.selectedDishes]);

    const calculateTotalPrice = () => {
        let total = 0;

        // Base venue rental
        total += venue.pricing.venueRental;

        // Food cost per person
        const foodPerPerson = formData.selectedDishes.reduce((sum, dishId) => {
            const dish = venue.menu.flatMap(cat => cat.items).find(d => d.id === dishId);
            return sum + (dish?.price || 0);
        }, 0);

        total += foodPerPerson * formData.guests;

        // Add service charge and taxes
        const serviceCharge = total * (venue.pricing.serviceCharge / 100);
        const taxes = (total + serviceCharge) * (venue.pricing.taxes / 100);

        total += serviceCharge + taxes;

        setTotalPrice(Math.round(total));
    };

    const handleDishToggle = (dishId) => {
        setFormData(prev => ({
            ...prev,
            selectedDishes: prev.selectedDishes.includes(dishId)
                ? prev.selectedDishes.filter(id => id !== dishId)
                : [...prev.selectedDishes, dishId]
        }));
    };

    const handleSubmit = () => {
        // Check if user is logged in (in real app)
        const isLoggedIn = false; // This would come from auth context

        if (!isLoggedIn) {
            alert("Please login to book this venue");
            router.push("/login?redirect=/lawns/" + venue.id);
            return;
        }

        if (!formData.date) {
            alert("Please select a date");
            return;
        }

        const bookingData = {
            ...formData,
            totalPrice,
            venueId: venue.id,
            venueName: venue.name,
        };

        onBookNow(bookingData);
    };

    // Get next 30 days for date picker
    const getNext30Days = () => {
        const dates = [];
        const today = new Date();

        for (let i = 1; i <= 30; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            dates.push(date.toISOString().split('T')[0]);
        }

        return dates;
    };

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
            <h3 className="mb-6 text-xl font-bold text-gray-900">Book This Venue</h3>

            <div className="space-y-6">
                {/* Date Picker */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Select Date *
                    </label>
                    <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                        required
                    />
                    <p className="mt-1 text-sm text-gray-500">
                        Select from available dates
                    </p>
                </div>

                {/* Guests Count */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Number of Guests *
                    </label>
                    <div className="flex items-center">
                        <button
                            type="button"
                            onClick={() => formData.guests > venue.capacity.min && setFormData({ ...formData, guests: formData.guests - 1 })}
                            className="rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 px-4 py-3 hover:bg-gray-100"
                        >
                            -
                        </button>
                        <input
                            type="number"
                            value={formData.guests}
                            onChange={(e) => {
                                const value = parseInt(e.target.value);
                                if (value >= venue.capacity.min && value <= venue.capacity.max) {
                                    setFormData({ ...formData, guests: value });
                                }
                            }}
                            min={venue.capacity.min}
                            max={venue.capacity.max}
                            className="w-full border-y border-gray-300 px-4 py-3 text-center focus:border-emerald-500 focus:outline-none"
                        />
                        <button
                            type="button"
                            onClick={() => formData.guests < venue.capacity.max && setFormData({ ...formData, guests: formData.guests + 1 })}
                            className="rounded-r-lg border border-l-0 border-gray-300 bg-gray-50 px-4 py-3 hover:bg-gray-100"
                        >
                            +
                        </button>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                        Min {venue.capacity.min}, Max {venue.capacity.max} guests
                    </p>
                </div>

                {/* Dish Selection */}
                <div>
                    <label className="mb-3 block text-sm font-medium text-gray-700">
                        Select Menu Items
                    </label>
                    <div className="max-h-60 space-y-3 overflow-y-auto rounded-lg border border-gray-200 p-4">
                        {venue.menu.slice(0, 3).map(category => (
                            <div key={category.category} className="mb-4">
                                <h4 className="mb-2 font-medium text-gray-900">{category.category}</h4>
                                {category.items.slice(0, 3).map(item => (
                                    <label key={item.id} className="mb-2 flex items-center justify-between rounded-lg border border-gray-200 p-3 hover:bg-gray-50">
                                        <div>
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.selectedDishes.includes(item.id)}
                                                    onChange={() => handleDishToggle(item.id)}
                                                    className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                                />
                                                <span className="ml-2 font-medium">{item.name}</span>
                                            </div>
                                            <p className="ml-6 text-sm text-gray-500">{item.description}</p>
                                        </div>
                                        <span className="font-semibold text-emerald-700">₹{item.price}</span>
                                    </label>
                                ))}
                            </div>
                        ))}
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                        Select dishes to include in your package
                    </p>
                </div>

                {/* Notes */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Special Requirements
                    </label>
                    <textarea
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Any special requests or requirements..."
                        rows={3}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    />
                </div>

                {/* Price Breakdown */}
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <h4 className="mb-3 font-medium text-gray-900">Price Breakdown</h4>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span>Venue Rental</span>
                            <span>₹{venue.pricing.venueRental.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Food & Beverages ({formData.guests} guests)</span>
                            <span>
                                {isCalculating ? "Calculating..." : `₹${(totalPrice - venue.pricing.venueRental).toLocaleString()}`}
                            </span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Service Charge ({venue.pricing.serviceCharge}%)</span>
                            <span>₹{(totalPrice * (venue.pricing.serviceCharge / 100)).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Taxes ({venue.pricing.taxes}%)</span>
                            <span>₹{(totalPrice * (venue.pricing.taxes / 100)).toLocaleString()}</span>
                        </div>
                        <div className="border-t pt-2">
                            <div className="flex justify-between font-bold text-gray-900">
                                <span>Total Amount</span>
                                <span className="text-lg">
                                    {isCalculating ? "Calculating..." : `₹${totalPrice.toLocaleString()}`}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Book Now Button */}
                <button
                    onClick={handleSubmit}
                    disabled={!formData.date || isCalculating}
                    className={`w-full rounded-lg py-4 font-bold text-white transition-all ${!formData.date || isCalculating
                            ? "cursor-not-allowed bg-gray-400"
                            : "bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 hover:shadow-xl"
                        }`}
                >
                    {isCalculating ? "Calculating..." : "Book Now"}
                </button>

                {/* Terms */}
                <p className="text-center text-xs text-gray-500">
                    By booking, you agree to our Terms of Service and Privacy Policy
                </p>
            </div>
        </div>
    );
}