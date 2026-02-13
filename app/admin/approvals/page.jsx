// app/admin/approvals/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function VenueApprovalsPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [venues, setVenues] = useState([]);
    const [filter, setFilter] = useState("pending");
    const [selectedVenue, setSelectedVenue] = useState(null);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [rejectionReason, setRejectionReason] = useState("");

    useEffect(() => {
        setTimeout(() => {
            setVenues([
                {
                    id: 1,
                    name: "Grand Palace Lawn",
                    owner: {
                        id: 101,
                        name: "Rajesh Sharma",
                        email: "rajesh@example.com",
                        phone: "+91 98765 43210",
                        verified: true,
                        totalVenues: 2
                    },
                    location: "Jaipur, Rajasthan",
                    address: "123 Palace Road, Jaipur - 302001",
                    type: "lawn",
                    capacity: 800,
                    pricePerPlate: 1800,
                    venueRental: 75000,
                    description: "Luxurious lawn venue with palace views...",
                    amenities: ["Pool", "Parking", "WiFi", "Stage"],
                    images: 12,
                    documents: [
                        { name: "Ownership Deed", url: "#", verified: true },
                        { name: "Trade License", url: "#", verified: false },
                        { name: "Fire Safety Certificate", url: "#", verified: true }
                    ],
                    submittedDate: "2024-02-10",
                    status: "pending",
                    priority: "high",
                    notes: "Owner has 2 other verified venues"
                },
                {
                    id: 2,
                    name: "Skyview Banquet",
                    owner: {
                        id: 102,
                        name: "Priya Patel",
                        email: "priya@example.com",
                        phone: "+91 98765 43211",
                        verified: false,
                        totalVenues: 0
                    },
                    location: "Ahmedabad, Gujarat",
                    address: "45 Skyline Tower, Ahmedabad - 380001",
                    type: "hall",
                    capacity: 500,
                    pricePerPlate: 1500,
                    venueRental: 55000,
                    description: "Modern banquet hall with city views...",
                    amenities: ["AC", "Parking", "WiFi", "Stage"],
                    images: 8,
                    documents: [
                        { name: "Ownership Deed", url: "#", verified: false },
                        { name: "GST Certificate", url: "#", verified: false }
                    ],
                    submittedDate: "2024-02-11",
                    status: "pending",
                    priority: "medium"
                },
                {
                    id: 3,
                    name: "Ocean Breeze Rooftop",
                    owner: {
                        id: 103,
                        name: "Amit Kumar",
                        email: "amit@example.com",
                        phone: "+91 98765 43212",
                        verified: true,
                        totalVenues: 1
                    },
                    location: "Mumbai, Maharashtra",
                    address: "78 Marine Drive, Mumbai - 400001",
                    type: "rooftop",
                    capacity: 300,
                    pricePerPlate: 2200,
                    venueRental: 85000,
                    description: "Stunning rooftop with sea view...",
                    amenities: ["Bar", "Pool", "Parking", "WiFi"],
                    images: 15,
                    documents: [
                        { name: "Ownership Deed", url: "#", verified: true },
                        { name: "Liquor License", url: "#", verified: true },
                        { name: "Safety Certificate", url: "#", verified: true }
                    ],
                    submittedDate: "2024-02-12",
                    status: "pending",
                    priority: "high"
                }
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    const handleApprove = (venueId) => {
        if (confirm("Are you sure you want to approve this venue?")) {
            setVenues(venues.map(v =>
                v.id === venueId ? { ...v, status: "approved" } : v
            ));
            alert("Venue approved successfully! Owner will be notified.");
        }
    };

    const handleReject = (venueId) => {
        setSelectedVenue(venues.find(v => v.id === venueId));
        setShowReviewModal(true);
    };

    const handleRejectConfirm = () => {
        if (!rejectionReason) {
            alert("Please provide a reason for rejection");
            return;
        }

        setVenues(venues.map(v =>
            v.id === selectedVenue.id
                ? { ...v, status: "rejected", rejectionReason }
                : v
        ));
        setShowReviewModal(false);
        setSelectedVenue(null);
        setRejectionReason("");
        alert("Venue rejected. Owner will be notified with feedback.");
    };

    const filteredVenues = venues.filter(v =>
        filter === "all" ? true : v.status === filter
    );

    const getPriorityBadge = (priority) => {
        switch (priority) {
            case "high":
                return <span className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-800">High Priority</span>;
            case "medium":
                return <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-800">Medium</span>;
            default:
                return <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-800">Low</span>;
        }
    };

    if (loading) {
        return (
            <div className="flex h-[80vh] items-center justify-center">
                <div className="text-center">
                    <div className="mb-4 text-6xl animate-pulse">✅</div>
                    <p className="text-gray-600">Loading approvals...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Venue Approvals</h1>
                    <p className="mt-2 text-gray-600">
                        Review and verify venue listings before they go live
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                        <option value="pending">Pending Review</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                        <option value="all">All Venues</option>
                    </select>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                <div className="rounded-xl border border-gray-200 bg-white p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Pending Review</p>
                            <p className="mt-2 text-3xl font-bold text-amber-600">
                                {venues.filter(v => v.status === "pending").length}
                            </p>
                        </div>
                        <div className="rounded-full bg-amber-100 p-3 text-amber-600">
                            ⏳
                        </div>
                    </div>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Approved Today</p>
                            <p className="mt-2 text-3xl font-bold text-emerald-600">5</p>
                        </div>
                        <div className="rounded-full bg-emerald-100 p-3 text-emerald-600">
                            ✅
                        </div>
                    </div>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Avg. Review Time</p>
                            <p className="mt-2 text-3xl font-bold text-blue-600">2.4h</p>
                        </div>
                        <div className="rounded-full bg-blue-100 p-3 text-blue-600">
                            ⏱️
                        </div>
                    </div>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Approval Rate</p>
                            <p className="mt-2 text-3xl font-bold text-purple-600">78%</p>
                        </div>
                        <div className="rounded-full bg-purple-100 p-3 text-purple-600">
                            📊
                        </div>
                    </div>
                </div>
            </div>

            {/* Venues List */}
            <div className="rounded-xl border border-gray-200 bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="border-b border-gray-200 bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Venue Details
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Owner
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Documents
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Submitted
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {filteredVenues.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center">
                                        <div className="text-gray-500">
                                            <span className="mb-2 text-4xl">📭</span>
                                            <p className="mt-2">No venues found</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredVenues.map((venue) => (
                                    <tr key={venue.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-start gap-3">
                                                <div className="rounded-lg bg-indigo-100 p-2">
                                                    <span className="text-lg">
                                                        {venue.type === "lawn" ? "🏞️" : venue.type === "hall" ? "🏛️" : "🌆"}
                                                    </span>
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <p className="font-medium text-gray-900">{venue.name}</p>
                                                        {getPriorityBadge(venue.priority)}
                                                    </div>
                                                    <p className="mt-1 text-sm text-gray-600">{venue.location}</p>
                                                    <p className="mt-1 text-xs text-gray-500">
                                                        Capacity: {venue.capacity} • ₹{venue.pricePerPlate}/plate
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-medium text-gray-900">{venue.owner.name}</p>
                                            <p className="text-sm text-gray-600">{venue.owner.email}</p>
                                            <div className="mt-1 flex items-center gap-2">
                                                {venue.owner.verified ? (
                                                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">
                                                        ✓ Verified
                                                    </span>
                                                ) : (
                                                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                                                        ⚠ Unverified
                                                    </span>
                                                )}
                                                <span className="text-xs text-gray-500">
                                                    {venue.owner.totalVenues} venues
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                {venue.documents.map((doc, idx) => (
                                                    <div key={idx} className="flex items-center gap-1 text-xs">
                                                        <span className="text-gray-500">📄</span>
                                                        <span className="text-gray-600">{doc.name}</span>
                                                        {doc.verified ? (
                                                            <span className="text-emerald-600">✓</span>
                                                        ) : (
                                                            <span className="text-amber-600">⚠</span>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-gray-900">
                                                {new Date(venue.submittedDate).toLocaleDateString()}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {Math.floor((new Date() - new Date(venue.submittedDate)) / (1000 * 60 * 60))}h ago
                                            </p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`rounded-full px-3 py-1 text-xs font-medium ${venue.status === "pending"
                                                    ? "bg-amber-100 text-amber-800"
                                                    : venue.status === "approved"
                                                        ? "bg-emerald-100 text-emerald-800"
                                                        : "bg-red-100 text-red-800"
                                                }`}>
                                                {venue.status.charAt(0).toUpperCase() + venue.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => setSelectedVenue(venue)}
                                                    className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                                                >
                                                    Review
                                                </button>
                                                {venue.status === "pending" && (
                                                    <>
                                                        <button
                                                            onClick={() => handleApprove(venue.id)}
                                                            className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-700"
                                                        >
                                                            Approve
                                                        </button>
                                                        <button
                                                            onClick={() => handleReject(venue.id)}
                                                            className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700"
                                                        >
                                                            Reject
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Review Modal */}
            {showReviewModal && selectedVenue && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="w-full max-w-2xl rounded-xl bg-white p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-xl font-semibold text-gray-900">Review Venue</h3>
                            <button
                                onClick={() => {
                                    setShowReviewModal(false);
                                    setSelectedVenue(null);
                                    setRejectionReason("");
                                }}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="mb-6">
                            <h4 className="font-medium text-gray-900">{selectedVenue.name}</h4>
                            <p className="mt-1 text-sm text-gray-600">{selectedVenue.location}</p>
                        </div>

                        <div className="mb-6 grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-gray-500">Owner</p>
                                <p className="text-sm font-medium text-gray-900">{selectedVenue.owner.name}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Capacity</p>
                                <p className="text-sm font-medium text-gray-900">{selectedVenue.capacity} guests</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Price/Plate</p>
                                <p className="text-sm font-medium text-gray-900">₹{selectedVenue.pricePerPlate}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Venue Rental</p>
                                <p className="text-sm font-medium text-gray-900">₹{selectedVenue.venueRental}</p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <p className="text-xs text-gray-500">Documents Status</p>
                            <div className="mt-2 space-y-2">
                                {selectedVenue.documents.map((doc, idx) => (
                                    <div key={idx} className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                                        <div className="flex items-center gap-2">
                                            <span>📄</span>
                                            <span className="text-sm text-gray-700">{doc.name}</span>
                                        </div>
                                        {doc.verified ? (
                                            <span className="text-xs font-medium text-emerald-600">Verified</span>
                                        ) : (
                                            <span className="text-xs font-medium text-amber-600">Pending Verification</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Rejection Reason (if rejecting)
                            </label>
                            <textarea
                                value={rejectionReason}
                                onChange={(e) => setRejectionReason(e.target.value)}
                                placeholder="Provide feedback to the venue owner..."
                                rows={3}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={handleRejectConfirm}
                                className="flex-1 rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
                            >
                                Reject Venue
                            </button>
                            <button
                                onClick={() => handleApprove(selectedVenue.id)}
                                className="flex-1 rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700"
                            >
                                Approve Venue
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}