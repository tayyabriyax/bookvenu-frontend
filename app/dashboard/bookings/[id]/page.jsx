// app/booking/[id]/page.js
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import BookingTimeline from "@/components/bookings/BookingTimeline";
import InvoiceDetails from "@/components/bookings/InvoiceDetails";
import ContactCard from "@/components/bookings/ContactCard";

// Mock data - In real app, this would come from API based on booking ID
const mockBooking = {
    id: "BK001",
    venue: {
        id: 1,
        name: "Royal Emerald Lawn & Banquet",
        image: "https://images.unsplash.com/photo-1549451371-64aa98a6f660?w=1200&auto=format&fit=crop",
        type: "lawn",
        address: "123 Palm Grove Road, Bandra West, Mumbai 400050",
        city: "Mumbai",
        capacity: {
            min: 100,
            max: 500
        },
        amenities: ["Parking", "AC", "Stage", "Dance Floor", "Catering"]
    },

    bookingDetails: {
        date: "2024-03-15",
        time: "14:00 - 22:00",
        duration: "8 hours",
        guests: 250,
        eventType: "Wedding",
        eventName: "John & Sarah's Wedding",
        specialRequests: "Floral decoration and live music required. Please ensure stage is ready by 1 PM.",
        bookingType: "fullDay",
        createdAt: "2024-02-10T10:30:00Z",
        updatedAt: "2024-02-12T14:20:00Z"
    },

    menuSelection: [
        {
            category: "Vegetarian",
            items: [
                { id: 1, name: "Paneer Tikka", price: 450, quantity: 250, total: 112500 },
                { id: 2, name: "Vegetable Biryani", price: 350, quantity: 250, total: 87500 },
                { id: 3, name: "Malai Kofta", price: 400, quantity: 250, total: 100000 },
            ]
        },
        {
            category: "Non-Vegetarian",
            items: [
                { id: 4, name: "Chicken Tikka", price: 550, quantity: 250, total: 137500 },
                { id: 5, name: "Butter Chicken", price: 600, quantity: 250, total: 150000 },
            ]
        },
        {
            category: "Beverages",
            items: [
                { id: 6, name: "Soft Drinks", price: 150, quantity: 250, total: 37500 },
                { id: 7, name: "Mocktails", price: 250, quantity: 250, total: 62500 },
            ]
        }
    ],

    pricing: {
        venueRental: 50000,
        foodAndBeverages: 687500,
        decoration: 25000,
        serviceCharge: 18, // percentage
        taxes: 5, // percentage
        discount: 20000,
        advancePaid: 200000,
        balanceDue: 557500,
        totalAmount: 757500
    },

    status: {
        booking: "confirmed",
        payment: "partial",
        timeline: [
            { step: "Booking Created", date: "2024-02-10", time: "10:30 AM", status: "completed" },
            { step: "Advance Payment", date: "2024-02-10", time: "11:45 AM", status: "completed" },
            { step: "Menu Finalized", date: "2024-02-12", time: "02:20 PM", status: "completed" },
            { step: "Venue Confirmation", date: "2024-03-01", time: "Pending", status: "pending" },
            { step: "Final Payment", date: "2024-03-08", time: "Pending", status: "pending" },
            { step: "Event Day", date: "2024-03-15", time: "Pending", status: "pending" }
        ]
    },

    owner: {
        name: "Rajesh Kumar",
        role: "Venue Manager",
        email: "rajesh@royalemerald.com",
        phone: "+91 98765 43210",
        alternatePhone: "+91 98765 43211",
        availability: "10:00 AM - 7:00 PM",
        responseTime: "Usually within 2 hours"
    },

    documents: [
        { name: "Booking Confirmation", type: "PDF", size: "1.2 MB", uploaded: "2024-02-10" },
        { name: "Advance Receipt", type: "PDF", size: "0.8 MB", uploaded: "2024-02-10" },
        { name: "Menu Contract", type: "PDF", size: "1.5 MB", uploaded: "2024-02-12" },
        { name: "Cancellation Policy", type: "PDF", size: "0.5 MB", uploaded: "2024-02-10" }
    ]
};

export default function BookingDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const [booking, setBooking] = useState(mockBooking);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("overview");

    useEffect(() => {
        // Check authentication
        const userData = localStorage.getItem("bookvenu_user");
        if (!userData) {
            router.push(`/login?redirect=/booking/${params.id}`);
            return;
        }

        // Simulate API loading
        setTimeout(() => {
            setLoading(false);
        }, 800);
    }, [params.id, router]);

    const handleDownloadInvoice = () => {
        alert(`Invoice for booking ${booking.id} would be downloaded`);
    };

    const handleContactOwner = () => {
        alert(`Opening chat with ${booking.owner.name}`);
    };

    const handleCancelBooking = () => {
        const today = new Date();
        const bookingDate = new Date(booking.bookingDetails.date);
        const daysDifference = Math.floor((bookingDate - today) / (1000 * 60 * 60 * 24));

        if (daysDifference < 7) {
            alert("Bookings can only be cancelled at least 7 days before the event date.");
            return;
        }

        if (confirm("Are you sure you want to cancel this booking? A cancellation fee may apply.")) {
            alert("Booking cancellation request submitted. The venue owner will contact you shortly.");
            // In real app, update booking status via API
        }
    };

    const handleMakePayment = () => {
        router.push(`/payment/${booking.id}?amount=${booking.pricing.balanceDue}`);
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <div className="mb-4 text-6xl">📋</div>
                    <p className="text-gray-600">Loading booking details...</p>
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
                                    onClick={() => router.push("/dashboard/bookings")}
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    ← Back to Bookings
                                </button>
                            </div>
                            <div className="mt-2 flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
                                <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                                    Booking #{booking.id}
                                </h1>
                                <div className="flex gap-2">
                                    <span className={`rounded-full px-3 py-1 text-sm font-medium ${booking.status.booking === "confirmed"
                                            ? "bg-emerald-100 text-emerald-800"
                                            : booking.status.booking === "pending"
                                                ? "bg-amber-100 text-amber-800"
                                                : booking.status.booking === "cancelled"
                                                    ? "bg-red-100 text-red-800"
                                                    : "bg-blue-100 text-blue-800"
                                        }`}>
                                        {booking.status.booking.charAt(0).toUpperCase() + booking.status.booking.slice(1)}
                                    </span>
                                    <span className={`rounded-full px-3 py-1 text-sm font-medium ${booking.status.payment === "paid"
                                            ? "bg-green-100 text-green-800"
                                            : booking.status.payment === "partial"
                                                ? "bg-blue-100 text-blue-800"
                                                : "bg-amber-100 text-amber-800"
                                        }`}>
                                        {booking.status.payment.charAt(0).toUpperCase() + booking.status.payment.slice(1)} Payment
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={handleDownloadInvoice}
                                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                📥 Download Invoice
                            </button>
                            <button
                                onClick={handleContactOwner}
                                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                            >
                                💬 Contact Owner
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2">
                        {/* Tabs */}
                        <div className="mb-6 border-b">
                            <div className="flex space-x-8 overflow-x-auto">
                                {["overview", "menu", "documents", "support"].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium capitalize ${activeTab === tab
                                                ? "border-emerald-500 text-emerald-600"
                                                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tab Content */}
                        <div className="space-y-8">
                            {activeTab === "overview" && (
                                <>
                                    {/* Venue Card */}
                                    <div className="rounded-xl border border-gray-200 bg-white p-6">
                                        <div className="flex flex-col gap-6 md:flex-row">
                                            <div className="md:w-1/3">
                                                <div className="aspect-square overflow-hidden rounded-lg bg-linear-to-br from-emerald-400 to-teal-500">
                                                    <div className="flex h-full items-center justify-center">
                                                        <span className="text-6xl text-white/30">🏢</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="md:w-2/3">
                                                <h3 className="mb-2 text-xl font-bold text-gray-900">
                                                    {booking.venue.name}
                                                </h3>
                                                <div className="mb-4 flex items-center gap-2">
                                                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800 capitalize">
                                                        {booking.venue.type}
                                                    </span>
                                                    <span className="text-gray-600">📍 {booking.venue.city}</span>
                                                </div>
                                                <p className="mb-4 text-gray-600">{booking.venue.address}</p>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <div className="text-sm text-gray-600">Capacity</div>
                                                        <div className="font-medium text-gray-900">
                                                            {booking.venue.capacity.min} - {booking.venue.capacity.max} guests
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm text-gray-600">Booking Type</div>
                                                        <div className="font-medium text-gray-900 capitalize">
                                                            {booking.bookingDetails.bookingType}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mt-4">
                                                    <div className="text-sm font-medium text-gray-700">Amenities:</div>
                                                    <div className="mt-2 flex flex-wrap gap-2">
                                                        {booking.venue.amenities.map((amenity, index) => (
                                                            <span
                                                                key={index}
                                                                className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                                                            >
                                                                {amenity}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Event Details */}
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        {/* Event Info */}
                                        <div className="rounded-xl border border-gray-200 bg-white p-6">
                                            <h4 className="mb-4 text-lg font-semibold text-gray-900">Event Details</h4>
                                            <div className="space-y-4">
                                                <div>
                                                    <div className="text-sm text-gray-600">Event Name</div>
                                                    <div className="font-medium text-gray-900">
                                                        {booking.bookingDetails.eventName}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-sm text-gray-600">Event Type</div>
                                                    <div className="font-medium text-gray-900">
                                                        {booking.bookingDetails.eventType}
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <div className="text-sm text-gray-600">Date</div>
                                                        <div className="font-medium text-gray-900">
                                                            {new Date(booking.bookingDetails.date).toLocaleDateString('en-US', {
                                                                weekday: 'long',
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric'
                                                            })}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm text-gray-600">Time</div>
                                                        <div className="font-medium text-gray-900">
                                                            {booking.bookingDetails.time}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-sm text-gray-600">Duration</div>
                                                    <div className="font-medium text-gray-900">
                                                        {booking.bookingDetails.duration}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-sm text-gray-600">Number of Guests</div>
                                                    <div className="text-2xl font-bold text-emerald-700">
                                                        {booking.bookingDetails.guests}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Timeline */}
                                        <div className="rounded-xl border border-gray-200 bg-white p-6">
                                            <h4 className="mb-4 text-lg font-semibold text-gray-900">Booking Timeline</h4>
                                            <BookingTimeline timeline={booking.status.timeline} />
                                        </div>
                                    </div>

                                    {/* Special Requests */}
                                    {booking.bookingDetails.specialRequests && (
                                        <div className="rounded-xl border border-gray-200 bg-white p-6">
                                            <h4 className="mb-4 text-lg font-semibold text-gray-900">Special Requests & Notes</h4>
                                            <div className="rounded-lg bg-gray-50 p-4">
                                                <p className="text-gray-700">{booking.bookingDetails.specialRequests}</p>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}

                            {activeTab === "menu" && (
                                <div className="rounded-xl border border-gray-200 bg-white p-6">
                                    <h4 className="mb-6 text-lg font-semibold text-gray-900">Selected Menu Items</h4>
                                    <div className="space-y-6">
                                        {booking.menuSelection.map((category, catIndex) => (
                                            <div key={catIndex} className="border-t pt-6 first:border-t-0 first:pt-0">
                                                <h5 className="mb-4 text-lg font-medium text-gray-900">
                                                    {category.category} ({category.items.reduce((sum, item) => sum + item.quantity, 0)} servings)
                                                </h5>
                                                <div className="overflow-hidden rounded-lg border border-gray-200">
                                                    <table className="w-full">
                                                        <thead className="bg-gray-50">
                                                            <tr>
                                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                                                                    Item Name
                                                                </th>
                                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                                                                    Price per Person
                                                                </th>
                                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                                                                    Quantity
                                                                </th>
                                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                                                                    Total
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="divide-y divide-gray-200">
                                                            {category.items.map((item, itemIndex) => (
                                                                <tr key={itemIndex} className="hover:bg-gray-50">
                                                                    <td className="whitespace-nowrap px-4 py-3">
                                                                        <div className="font-medium text-gray-900">{item.name}</div>
                                                                    </td>
                                                                    <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                                                                        ₹{item.price}
                                                                    </td>
                                                                    <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                                                                        {item.quantity} servings
                                                                    </td>
                                                                    <td className="whitespace-nowrap px-4 py-3 font-medium text-emerald-700">
                                                                        ₹{item.total.toLocaleString()}
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                        <tfoot className="bg-gray-50">
                                                            <tr>
                                                                <td colSpan="3" className="px-4 py-3 text-right font-medium text-gray-700">
                                                                    {category.category} Subtotal:
                                                                </td>
                                                                <td className="whitespace-nowrap px-4 py-3 font-bold text-gray-900">
                                                                    ₹{category.items.reduce((sum, item) => sum + item.total, 0).toLocaleString()}
                                                                </td>
                                                            </tr>
                                                        </tfoot>
                                                    </table>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === "documents" && (
                                <div className="rounded-xl border border-gray-200 bg-white p-6">
                                    <h4 className="mb-6 text-lg font-semibold text-gray-900">Booking Documents</h4>
                                    <div className="space-y-3">
                                        {booking.documents.map((doc, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between rounded-lg border border-gray-200 p-4 hover:bg-gray-50"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
                                                        <span className="text-red-600">📄</span>
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900">{doc.name}</div>
                                                        <div className="text-sm text-gray-500">
                                                            {doc.type} • {doc.size} • Uploaded {doc.uploaded}
                                                        </div>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => alert(`Downloading ${doc.name}`)}
                                                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                                >
                                                    Download
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === "support" && (
                                <div className="rounded-xl border border-gray-200 bg-white p-6">
                                    <h4 className="mb-6 text-lg font-semibold text-gray-900">Support & Help</h4>
                                    <div className="space-y-6">
                                        <div>
                                            <h5 className="mb-3 font-medium text-gray-900">Frequently Asked Questions</h5>
                                            <div className="space-y-3">
                                                <details className="rounded-lg border border-gray-200 p-4">
                                                    <summary className="cursor-pointer font-medium text-gray-900">
                                                        Can I modify my booking?
                                                    </summary>
                                                    <p className="mt-2 text-gray-600">
                                                        Modifications can be made up to 7 days before the event date. Contact the venue owner directly for any changes.
                                                    </p>
                                                </details>
                                                <details className="rounded-lg border border-gray-200 p-4">
                                                    <summary className="cursor-pointer font-medium text-gray-900">
                                                        What is the cancellation policy?
                                                    </summary>
                                                    <p className="mt-2 text-gray-600">
                                                        Cancellations 30+ days before: 80% refund. 15-30 days: 50% refund. Less than 15 days: No refund.
                                                    </p>
                                                </details>
                                                <details className="rounded-lg border border-gray-200 p-4">
                                                    <summary className="cursor-pointer font-medium text-gray-900">
                                                        How do I make the final payment?
                                                    </summary>
                                                    <p className="mt-2 text-gray-600">
                                                        Final payment is due 7 days before the event. You can make payment through the "Make Payment" button on this page.
                                                    </p>
                                                </details>
                                            </div>
                                        </div>
                                        <div>
                                            <h5 className="mb-3 font-medium text-gray-900">Need Immediate Help?</h5>
                                            <p className="text-gray-600">
                                                Call our customer support at +91 1800 123 4567 or email support@bookvenu.com
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-6">
                        {/* Invoice Summary */}
                        <InvoiceDetails pricing={booking.pricing} onMakePayment={handleMakePayment} />

                        {/* Owner Contact */}
                        <ContactCard owner={booking.owner} onContact={handleContactOwner} />

                        {/* Action Buttons */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6">
                            <h4 className="mb-4 text-lg font-semibold text-gray-900">Booking Actions</h4>
                            <div className="space-y-3">
                                <button
                                    onClick={handleMakePayment}
                                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-linear-to-r from-emerald-600 to-teal-600 py-3 font-medium text-white hover:from-emerald-700 hover:to-teal-700"
                                >
                                    💳 Make Payment
                                </button>
                                <button
                                    onClick={handleContactOwner}
                                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-emerald-600 bg-white py-3 font-medium text-emerald-600 hover:bg-emerald-50"
                                >
                                    💬 Contact Owner
                                </button>
                                {booking.status.booking === "confirmed" && (
                                    <button
                                        onClick={handleCancelBooking}
                                        className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-600 bg-white py-3 font-medium text-red-600 hover:bg-red-50"
                                    >
                                        ❌ Cancel Booking
                                    </button>
                                )}
                                <button
                                    onClick={() => router.push(`/lawns/${booking.venue.id}`)}
                                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-600 bg-white py-3 font-medium text-gray-600 hover:bg-gray-50"
                                >
                                    🏢 View Venue
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}