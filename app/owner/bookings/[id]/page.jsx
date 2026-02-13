// app/owner/bookings/[id]/page.js
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function OwnerBookingDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [booking, setBooking] = useState(null);
    const [activeTab, setActiveTab] = useState("overview");
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [cancellationReason, setCancellationReason] = useState("");
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [paymentAmount, setPaymentAmount] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("cash");

    // Mock data - In real app, fetch from API based on ID
    useEffect(() => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setBooking({
                id: params.id,
                bookingReference: "BK001",
                status: "confirmed",
                paymentStatus: "paid",
                paymentMethod: "online",
                bookingDate: "2024-02-10",
                lastUpdated: "2024-02-11",

                // Customer Details
                customer: {
                    id: 101,
                    name: "John Doe",
                    email: "john.doe@example.com",
                    phone: "+91 98765 43210",
                    alternatePhone: "+91 98765 43211",
                    address: "42, Green Park Extension, New Delhi - 110016",
                    totalBookings: 3,
                    totalSpent: 845000,
                    joinDate: "2023-12-15"
                },

                // Venue Details
                venue: {
                    id: 1,
                    name: "Royal Emerald Lawn & Banquet",
                    type: "lawn",
                    address: "123 Palm Grove Road, Bandra West, Mumbai - 400050",
                    owner: {
                        id: 201,
                        name: "Rajesh Sharma",
                        phone: "+91 98765 43220"
                    },
                    price: {
                        basePrice: 1200,
                        venueRental: 50000,
                        additionalHourRate: 5000
                    }
                },

                // Event Details
                event: {
                    type: "Wedding",
                    subType: "North Indian Wedding",
                    date: "2024-03-15",
                    time: "14:00 - 22:00",
                    duration: 8,
                    guests: 250,
                    expectedGuests: 250,
                    confirmedGuests: 245,
                    setupTime: "12:00",
                    breakDownTime: "23:00"
                },

                // Menu Details
                menu: {
                    package: "Premium Wedding Package",
                    cuisine: "North Indian",
                    type: "veg",
                    items: [
                        { name: "Paneer Tikka", quantity: 250, price: 450 },
                        { name: "Veg Biryani", quantity: 250, price: 350 },
                        { name: "Malai Kofta", quantity: 250, price: 400 },
                        { name: "Butter Naan", quantity: 500, price: 50 },
                        { name: "Gulab Jamun", quantity: 250, price: 100 },
                    ],
                    beverages: [
                        { name: "Soft Drinks", quantity: 250, price: 150 },
                        { name: "Mineral Water", quantity: 250, price: 50 },
                    ],
                    totalMenuCost: 375000,
                    perPlateCost: 1500
                },

                // Add-ons
                addons: [
                    { id: 1, name: "DJ Setup", price: 25000, quantity: 1 },
                    { id: 2, name: "Floral Decoration", price: 45000, quantity: 1 },
                    { id: 3, name: "Photography", price: 35000, quantity: 1 },
                    { id: 4, name: "Additional Hours", price: 5000, quantity: 2, unit: "hours" },
                ],

                // Pricing Breakdown
                pricing: {
                    venueRental: 50000,
                    perPlateTotal: 375000,
                    addonsTotal: 115000,
                    serviceCharge: 97200,
                    discount: 25000,
                    tax: 10800,
                    totalAmount: 425000,
                    advancePaid: 212500,
                    balanceAmount: 212500,
                    paymentDueDate: "2024-03-08"
                },

                // Payment History
                paymentHistory: [
                    {
                        id: "PAY001",
                        date: "2024-02-10",
                        amount: 212500,
                        method: "online",
                        status: "success",
                        transactionId: "TXN123456789",
                        reference: "Advance payment"
                    }
                ],

                // Timeline
                timeline: [
                    {
                        date: "2024-02-10 14:30",
                        action: "Booking Created",
                        user: "John Doe",
                        description: "Booking request submitted"
                    },
                    {
                        date: "2024-02-10 15:45",
                        action: "Payment Received",
                        user: "John Doe",
                        description: "Advance payment of ₹2,12,500 received"
                    },
                    {
                        date: "2024-02-11 10:00",
                        action: "Booking Confirmed",
                        user: "Rajesh Sharma (Owner)",
                        description: "Booking confirmed by venue owner"
                    }
                ],

                // Special Requests
                specialRequests: "Floral decoration with red roses and marigolds. Live music required during dinner. Vegan options needed for 20 guests.",

                // Notes
                notes: [
                    {
                        id: 1,
                        date: "2024-02-12 09:00",
                        user: "Rajesh Sharma (Owner)",
                        content: "Customer requested special arrangement for elderly guests. Arranged seating near stage.",
                        type: "internal"
                    }
                ],

                // Staff Assignment
                staffAssigned: [
                    { name: "Priya Singh", role: "Event Manager", phone: "+91 98765 43230" },
                    { name: "Amit Kumar", role: "Chef", phone: "+91 98765 43231" }
                ]
            });
            setLoading(false);
        }, 800);
    }, [params.id]);

    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    };

    const formatDateTime = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    const formatCurrency = (amount) => {
        if (!amount && amount !== 0) return "₹0";
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }).format(amount);
    };

    const getStatusBadge = (status) => {
        if (!status) return null;
        switch (status) {
            case "confirmed":
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-medium text-emerald-800">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-600"></span>
                        ✓ Confirmed
                    </span>
                );
            case "pending":
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1.5 text-xs font-medium text-amber-800">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-600"></span>
                        ⏳ Pending
                    </span>
                );
            case "cancelled":
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1.5 text-xs font-medium text-red-800">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                        ✗ Cancelled
                    </span>
                );
            case "completed":
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1.5 text-xs font-medium text-blue-800">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-600"></span>
                        ✓ Completed
                    </span>
                );
            default:
                return null;
        }
    };

    const getPaymentStatusBadge = (status) => {
        if (!status) return null;
        switch (status) {
            case "paid":
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-medium text-emerald-800">
                        ✓ Paid
                    </span>
                );
            case "partial":
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1.5 text-xs font-medium text-blue-800">
                        ⚡ Partial
                    </span>
                );
            case "pending":
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1.5 text-xs font-medium text-amber-800">
                        ⏳ Pending
                    </span>
                );
            case "refunded":
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-800">
                        ↩ Refunded
                    </span>
                );
            default:
                return null;
        }
    };

    const handleConfirmBooking = () => {
        if (!booking) return;
        if (confirm("Are you sure you want to confirm this booking?")) {
            setBooking({ ...booking, status: "confirmed" });
            alert("Booking confirmed successfully!");
        }
    };

    const handleRejectBooking = () => {
        setShowCancelModal(true);
    };

    const handleCancelBooking = () => {
        if (!booking) return;
        if (!cancellationReason) {
            alert("Please provide a reason for cancellation");
            return;
        }

        setBooking({
            ...booking,
            status: "cancelled",
            paymentStatus: "refunded",
            cancellationReason: cancellationReason
        });
        setShowCancelModal(false);
        alert("Booking cancelled and refund processed successfully!");
    };

    const handleRecordPayment = () => {
        if (!booking) return;
        if (!paymentAmount) {
            alert("Please enter payment amount");
            return;
        }

        const newPayment = {
            id: `PAY${String(booking.paymentHistory.length + 1).padStart(3, '0')}`,
            date: new Date().toISOString().split('T')[0],
            amount: parseFloat(paymentAmount),
            method: paymentMethod,
            status: "success",
            transactionId: `TXN${Date.now()}`,
            reference: "Manual payment"
        };

        setBooking({
            ...booking,
            paymentHistory: [...booking.paymentHistory, newPayment],
            pricing: {
                ...booking.pricing,
                advancePaid: booking.pricing.advancePaid + parseFloat(paymentAmount),
                balanceAmount: booking.pricing.balanceAmount - parseFloat(paymentAmount)
            },
            paymentStatus: booking.pricing.balanceAmount - parseFloat(paymentAmount) <= 0 ? "paid" : "partial"
        });

        setShowPaymentModal(false);
        setPaymentAmount("");
        alert("Payment recorded successfully!");
    };

    const handleAddNote = () => {
        if (!booking) return;
        const note = prompt("Add internal note:");
        if (note) {
            const newNote = {
                id: booking.notes.length + 1,
                date: new Date().toISOString().split('T')[0],
                user: "Rajesh Sharma (Owner)",
                content: note,
                type: "internal"
            };
            setBooking({ ...booking, notes: [...booking.notes, newNote] });
            alert("Note added successfully!");
        }
    };

    const handleContactCustomer = () => {
        if (!booking?.customer?.phone) return;
        window.location.href = `tel:${booking.customer.phone}`;
    };

    const handleEmailCustomer = () => {
        if (!booking?.customer?.email) return;
        window.location.href = `mailto:${booking.customer.email}`;
    };

    const handleViewInvoice = () => {
        alert("Invoice PDF would be generated/downloaded");
    };

    const handlePrintBooking = () => {
        window.print();
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

    if (!booking) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <div className="mb-4 text-6xl">🔍</div>
                    <h3 className="mb-2 text-xl font-semibold text-gray-900">Booking not found</h3>
                    <p className="mb-6 text-gray-600">The booking you're looking for doesn't exist.</p>
                    <button
                        onClick={() => router.push("/owner/bookings")}
                        className="rounded-lg bg-emerald-600 px-6 py-3 text-white hover:bg-emerald-700"
                    >
                        View All Bookings
                    </button>
                </div>
            </div>
        );
    }

    // Page Actions
    const pageActions = (
        <>
            {booking.status === "pending" && (
                <>
                    <button
                        onClick={handleConfirmBooking}
                        className="rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700"
                    >
                        ✓ Confirm Booking
                    </button>
                    <button
                        onClick={handleRejectBooking}
                        className="rounded-lg border border-red-600 bg-white px-4 py-2 font-medium text-red-700 hover:bg-red-50"
                    >
                        ✗ Reject Booking
                    </button>
                </>
            )}
            {booking.status === "confirmed" && booking.paymentStatus !== "paid" && (
                <button
                    onClick={() => setShowPaymentModal(true)}
                    className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
                >
                    💰 Record Payment
                </button>
            )}
            <button
                onClick={handleViewInvoice}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
            >
                📄 View Invoice
            </button>
            <button
                onClick={handlePrintBooking}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
            >
                🖨️ Print
            </button>
        </>
    );

    return (
        <div className="space-y-6">
            {/* Booking Header */}
            <div className="rounded-xl border border-gray-200 bg-white p-6">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                    <div>
                        <div className="mb-2 flex items-center gap-3">
                            <h2 className="text-2xl font-bold text-gray-900">
                                Booking #{booking.bookingReference}
                            </h2>
                            {getStatusBadge(booking.status)}
                            {getPaymentStatusBadge(booking.paymentStatus)}
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                            <span>📅 Booked on: {formatDate(booking.bookingDate)}</span>
                            <span>🔄 Last updated: {formatDate(booking.lastUpdated)}</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {pageActions}
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="rounded-xl border border-gray-200 bg-white p-4">
                    <div className="text-sm text-gray-600">Event Date</div>
                    <div className="text-lg font-bold text-gray-900">{formatDate(booking.event.date)}</div>
                    <div className="text-xs text-gray-500">{booking.event.time}</div>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-4">
                    <div className="text-sm text-gray-600">Venue</div>
                    <div className="text-lg font-bold text-gray-900">{booking.venue.name}</div>
                    <div className="text-xs text-gray-500">{booking.venue.type}</div>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-4">
                    <div className="text-sm text-gray-600">Guests</div>
                    <div className="text-lg font-bold text-gray-900">{booking.event.guests}</div>
                    <div className="text-xs text-gray-500">Confirmed: {booking.event.confirmedGuests}</div>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-4">
                    <div className="text-sm text-gray-600">Total Amount</div>
                    <div className="text-lg font-bold text-emerald-700">{formatCurrency(booking.pricing.totalAmount)}</div>
                    <div className="text-xs text-gray-500">Paid: {formatCurrency(booking.pricing.advancePaid)}</div>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 bg-white">
                <div className="flex space-x-6 overflow-x-auto px-6">
                    {["overview", "customer", "pricing", "menu", "timeline", "documents"].map((tab) => (
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
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    {/* Overview Tab */}
                    {activeTab === "overview" && (
                        <div className="space-y-6">
                            {/* Event Details */}
                            <div className="rounded-xl border border-gray-200 bg-white p-6">
                                <h3 className="mb-4 text-lg font-semibold text-gray-900">Event Details</h3>
                                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                                    <div>
                                        <p className="text-xs text-gray-500">Event Type</p>
                                        <p className="font-medium text-gray-900">{booking.event.type}</p>
                                        <p className="text-xs text-gray-500">{booking.event.subType}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Duration</p>
                                        <p className="font-medium text-gray-900">{booking.event.duration} hours</p>
                                        <p className="text-xs text-gray-500">Setup: {booking.event.setupTime}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Expected Guests</p>
                                        <p className="font-medium text-gray-900">{booking.event.expectedGuests}</p>
                                        <p className="text-xs text-gray-500">Confirmed: {booking.event.confirmedGuests}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Special Requests */}
                            <div className="rounded-xl border border-gray-200 bg-white p-6">
                                <h3 className="mb-4 text-lg font-semibold text-gray-900">Special Requests</h3>
                                <p className="text-gray-700">{booking.specialRequests}</p>
                            </div>

                            {/* Add-ons */}
                            <div className="rounded-xl border border-gray-200 bg-white p-6">
                                <h3 className="mb-4 text-lg font-semibold text-gray-900">Add-ons & Services</h3>
                                <div className="space-y-3">
                                    {booking.addons.map((addon, index) => (
                                        <div key={index} className="flex items-center justify-between border-b border-gray-100 pb-2 last:border-0">
                                            <div>
                                                <p className="font-medium text-gray-900">{addon.name}</p>
                                                <p className="text-xs text-gray-500">Qty: {addon.quantity} {addon.unit || 'unit'}</p>
                                            </div>
                                            <p className="font-medium text-gray-900">{formatCurrency(addon.price * addon.quantity)}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Notes */}
                            <div className="rounded-xl border border-gray-200 bg-white p-6">
                                <div className="mb-4 flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-gray-900">Notes</h3>
                                    <button
                                        onClick={handleAddNote}
                                        className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        + Add Note
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {booking.notes.map((note) => (
                                        <div key={note.id} className="rounded-lg bg-gray-50 p-4">
                                            <div className="mb-2 flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className={`text-xs font-medium ${note.type === 'internal' ? 'text-amber-600' : 'text-blue-600'
                                                        }`}>
                                                        {note.type === 'internal' ? 'Internal Note' : 'Customer Note'}
                                                    </span>
                                                    <span className="text-xs text-gray-500">{formatDateTime(note.date)}</span>
                                                </div>
                                                <span className="text-xs font-medium text-gray-700">{note.user}</span>
                                            </div>
                                            <p className="text-sm text-gray-700">{note.content}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Customer Tab */}
                    {activeTab === "customer" && (
                        <div className="space-y-6">
                            {/* Customer Info */}
                            <div className="rounded-xl border border-gray-200 bg-white p-6">
                                <h3 className="mb-4 text-lg font-semibold text-gray-900">Customer Information</h3>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="col-span-2 flex items-center gap-4 border-b border-gray-100 pb-4">
                                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-2xl font-bold text-emerald-700">
                                            {booking.customer.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-xl font-semibold text-gray-900">{booking.customer.name}</p>
                                            <div className="mt-1 flex items-center gap-4">
                                                <span className="text-sm text-gray-600">Customer since {formatDate(booking.customer.joinDate)}</span>
                                                <span className="text-sm font-medium text-emerald-700">{booking.customer.totalBookings} bookings</span>
                                                <span className="text-sm font-medium text-emerald-700">₹{(booking.customer.totalSpent / 100000).toFixed(1)}L spent</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Email</p>
                                        <p className="font-medium text-gray-900">{booking.customer.email}</p>
                                        <button
                                            onClick={handleEmailCustomer}
                                            className="mt-1 text-xs text-emerald-600 hover:text-emerald-700"
                                        >
                                            Send Email
                                        </button>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Phone</p>
                                        <p className="font-medium text-gray-900">{booking.customer.phone}</p>
                                        <p className="text-xs text-gray-500">Alt: {booking.customer.alternatePhone}</p>
                                        <button
                                            onClick={handleContactCustomer}
                                            className="mt-1 text-xs text-emerald-600 hover:text-emerald-700"
                                        >
                                            Call Customer
                                        </button>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-xs text-gray-500">Address</p>
                                        <p className="text-sm text-gray-900">{booking.customer.address}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Venue Owner Info */}
                            <div className="rounded-xl border border-gray-200 bg-white p-6">
                                <h3 className="mb-4 text-lg font-semibold text-gray-900">Venue Contact</h3>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-gray-900">{booking.venue.owner.name}</p>
                                        <p className="text-sm text-gray-600">Venue Owner</p>
                                        <p className="mt-2 text-sm text-gray-700">{booking.venue.owner.phone}</p>
                                    </div>
                                    <button
                                        onClick={() => window.location.href = `tel:${booking.venue.owner.phone}`}
                                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        Call Owner
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Pricing Tab */}
                    {activeTab === "pricing" && (
                        <div className="space-y-6">
                            {/* Price Breakdown */}
                            <div className="rounded-xl border border-gray-200 bg-white p-6">
                                <h3 className="mb-4 text-lg font-semibold text-gray-900">Price Breakdown</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Venue Rental</span>
                                        <span className="font-medium text-gray-900">{formatCurrency(booking.pricing.venueRental)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Food & Beverages ({booking.event.guests} guests)</span>
                                        <span className="font-medium text-gray-900">{formatCurrency(booking.pricing.perPlateTotal)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Add-ons & Services</span>
                                        <span className="font-medium text-gray-900">{formatCurrency(booking.pricing.addonsTotal)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Service Charge (18%)</span>
                                        <span className="font-medium text-gray-900">{formatCurrency(booking.pricing.serviceCharge)}</span>
                                    </div>
                                    <div className="flex justify-between text-emerald-600">
                                        <span>Discount</span>
                                        <span className="font-medium">-{formatCurrency(booking.pricing.discount)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Tax (5%)</span>
                                        <span className="font-medium text-gray-900">{formatCurrency(booking.pricing.tax)}</span>
                                    </div>
                                    <div className="flex justify-between border-t border-gray-200 pt-3 text-lg font-bold">
                                        <span>Total Amount</span>
                                        <span className="text-emerald-700">{formatCurrency(booking.pricing.totalAmount)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Status */}
                            <div className="rounded-xl border border-gray-200 bg-white p-6">
                                <h3 className="mb-4 text-lg font-semibold text-gray-900">Payment Status</h3>
                                <div className="mb-4 grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-gray-500">Total Amount</p>
                                        <p className="text-xl font-bold text-gray-900">{formatCurrency(booking.pricing.totalAmount)}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Amount Paid</p>
                                        <p className="text-xl font-bold text-emerald-700">{formatCurrency(booking.pricing.advancePaid)}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Balance Due</p>
                                        <p className="text-xl font-bold text-amber-700">{formatCurrency(booking.pricing.balanceAmount)}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Due Date</p>
                                        <p className="font-medium text-gray-900">{formatDate(booking.pricing.paymentDueDate)}</p>
                                    </div>
                                </div>

                                {/* Payment Progress */}
                                <div className="mt-4">
                                    <div className="mb-2 flex justify-between text-sm">
                                        <span className="text-gray-600">Payment Progress</span>
                                        <span className="font-medium text-gray-900">
                                            {Math.round((booking.pricing.advancePaid / booking.pricing.totalAmount) * 100)}%
                                        </span>
                                    </div>
                                    <div className="h-2.5 w-full rounded-full bg-gray-200">
                                        <div
                                            className="h-2.5 rounded-full bg-emerald-600"
                                            style={{ width: `${(booking.pricing.advancePaid / booking.pricing.totalAmount) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Payment History */}
                                <div className="mt-6">
                                    <h4 className="mb-3 text-sm font-semibold text-gray-900">Payment History</h4>
                                    <div className="space-y-3">
                                        {booking.paymentHistory.map((payment) => (
                                            <div key={payment.id} className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-medium text-gray-900">{formatCurrency(payment.amount)}</span>
                                                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-800">
                                                            {payment.method}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-gray-500">{payment.date} • {payment.transactionId}</p>
                                                </div>
                                                <span className="text-xs text-gray-600">{payment.reference}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Menu Tab */}
                    {activeTab === "menu" && (
                        <div className="space-y-6">
                            <div className="rounded-xl border border-gray-200 bg-white p-6">
                                <div className="mb-4 flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">Menu Details</h3>
                                        <p className="text-sm text-gray-600">{booking.menu.package} • {booking.menu.cuisine}</p>
                                    </div>
                                    <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-sm font-medium text-emerald-800">
                                        ₹{booking.menu.perPlateCost}/plate
                                    </span>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <h4 className="mb-2 text-sm font-medium text-gray-900">Food Items</h4>
                                        <div className="space-y-2">
                                            {booking.menu.items.map((item, index) => (
                                                <div key={index} className="flex items-center justify-between border-b border-gray-100 pb-2">
                                                    <div>
                                                        <p className="font-medium text-gray-900">{item.name}</p>
                                                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                                    </div>
                                                    <p className="font-medium text-gray-900">{formatCurrency(item.price * item.quantity)}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="mb-2 text-sm font-medium text-gray-900">Beverages</h4>
                                        <div className="space-y-2">
                                            {booking.menu.beverages.map((item, index) => (
                                                <div key={index} className="flex items-center justify-between border-b border-gray-100 pb-2">
                                                    <div>
                                                        <p className="font-medium text-gray-900">{item.name}</p>
                                                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                                    </div>
                                                    <p className="font-medium text-gray-900">{formatCurrency(item.price * item.quantity)}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex justify-between border-t border-gray-200 pt-3">
                                        <span className="font-semibold text-gray-900">Total Menu Cost</span>
                                        <span className="font-bold text-emerald-700">{formatCurrency(booking.menu.totalMenuCost)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Timeline Tab */}
                    {activeTab === "timeline" && (
                        <div className="rounded-xl border border-gray-200 bg-white p-6">
                            <h3 className="mb-6 text-lg font-semibold text-gray-900">Booking Timeline</h3>
                            <div className="relative">
                                <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200"></div>
                                <div className="space-y-6">
                                    {booking.timeline.map((event, index) => (
                                        <div key={index} className="relative flex items-start gap-4">
                                            <div className="absolute left-0 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white ring-2 ring-gray-200">
                                                <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                                            </div>
                                            <div className="ml-12 flex-1">
                                                <div className="mb-1 flex items-center justify-between">
                                                    <p className="font-medium text-gray-900">{event.action}</p>
                                                    <p className="text-xs text-gray-500">{formatDateTime(event.date)}</p>
                                                </div>
                                                <p className="text-sm text-gray-600">{event.description}</p>
                                                <p className="mt-1 text-xs text-gray-500">by {event.user}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Staff Assignment */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">Staff Assignment</h3>
                            <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
                                Manage
                            </button>
                        </div>
                        <div className="space-y-4">
                            {booking.staffAssigned.map((staff, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-gray-900">{staff.name}</p>
                                        <p className="text-xs text-gray-500">{staff.role}</p>
                                    </div>
                                    <a
                                        href={`tel:${staff.phone}`}
                                        className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        Call
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6">
                        <h3 className="mb-4 text-lg font-semibold text-gray-900">Quick Actions</h3>
                        <div className="space-y-3">
                            <button
                                onClick={() => router.push(`/owner/venues/${booking.venue.id}/availability`)}
                                className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                📅 Check Venue Availability
                            </button>
                            <button
                                onClick={() => router.push(`/owner/venues/${booking.venue.id}/menu`)}
                                className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                🍽️ Update Menu Prices
                            </button>
                            <button
                                onClick={() => alert("Send booking confirmation email")}
                                className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                📧 Send Confirmation Email
                            </button>
                            <button
                                onClick={() => alert("Send payment reminder")}
                                className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                ⏰ Send Payment Reminder
                            </button>
                        </div>
                    </div>

                    {/* Venue Info */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6">
                        <h3 className="mb-4 text-lg font-semibold text-gray-900">Venue Information</h3>
                        <div className="space-y-3">
                            <div>
                                <p className="font-medium text-gray-900">{booking.venue.name}</p>
                                <p className="text-xs text-gray-500 capitalize">{booking.venue.type}</p>
                            </div>
                            <p className="text-sm text-gray-600">{booking.venue.address}</p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => router.push(`/owner/venues/${booking.venue.id}`)}
                                    className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    View Venue
                                </button>
                                <button
                                    onClick={() => router.push(`/owner/venues/${booking.venue.id}/edit`)}
                                    className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Edit Venue
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Support */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6">
                        <h3 className="mb-3 text-lg font-semibold text-gray-900">Need Help?</h3>
                        <p className="mb-4 text-sm text-gray-600">
                            Contact BookVenu support for assistance with this booking.
                        </p>
                        <button
                            onClick={() => alert("Contact support")}
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            📞 Contact Support
                        </button>
                    </div>
                </div>
            </div>

            {/* Cancellation Modal */}
            {showCancelModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="w-full max-w-md rounded-xl bg-white p-6">
                        <h3 className="mb-4 text-xl font-semibold text-gray-900">Cancel Booking</h3>
                        <div className="mb-4">
                            <p className="text-sm text-gray-600">
                                Are you sure you want to cancel booking #{booking.bookingReference}?
                            </p>
                            <p className="mt-2 text-sm font-medium text-amber-700">
                                This will process a refund to the customer.
                            </p>
                        </div>
                        <div className="mb-6">
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Reason for cancellation
                            </label>
                            <textarea
                                value={cancellationReason}
                                onChange={(e) => setCancellationReason(e.target.value)}
                                placeholder="Please provide a reason for cancellation..."
                                rows={3}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:ring-emerald-500"
                            />
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={handleCancelBooking}
                                className="flex-1 rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
                            >
                                Yes, Cancel Booking
                            </button>
                            <button
                                onClick={() => {
                                    setShowCancelModal(false);
                                    setCancellationReason("");
                                }}
                                className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Payment Modal */}
            {showPaymentModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="w-full max-w-md rounded-xl bg-white p-6">
                        <h3 className="mb-4 text-xl font-semibold text-gray-900">Record Payment</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Payment Amount
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                                    <input
                                        type="number"
                                        value={paymentAmount}
                                        onChange={(e) => setPaymentAmount(e.target.value)}
                                        placeholder="0.00"
                                        className="w-full rounded-lg border border-gray-300 py-2 pl-8 pr-4 focus:border-emerald-500 focus:ring-emerald-500"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Payment Method
                                </label>
                                <select
                                    value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:ring-emerald-500"
                                >
                                    <option value="cash">Cash</option>
                                    <option value="online">Online Transfer</option>
                                    <option value="card">Card</option>
                                    <option value="cheque">Cheque</option>
                                </select>
                            </div>
                            <div className="mt-4 rounded-lg bg-emerald-50 p-4">
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium">Balance Due:</span>{' '}
                                    {formatCurrency(booking.pricing.balanceAmount)}
                                </p>
                                {paymentAmount > booking.pricing.balanceAmount && (
                                    <p className="mt-1 text-xs text-amber-600">
                                        Amount exceeds balance due!
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="mt-6 flex gap-3">
                            <button
                                onClick={handleRecordPayment}
                                disabled={!paymentAmount || paymentAmount > booking.pricing.balanceAmount}
                                className="flex-1 rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
                            >
                                Record Payment
                            </button>
                            <button
                                onClick={() => {
                                    setShowPaymentModal(false);
                                    setPaymentAmount("");
                                }}
                                className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}