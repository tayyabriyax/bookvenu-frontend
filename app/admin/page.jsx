// app/admin/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminDashboardPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({});
    const [recentActivity, setRecentActivity] = useState([]);
    const [pendingApprovals, setPendingApprovals] = useState([]);

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setStats({
                totalVenues: 156,
                pendingVenues: 12,
                activeVenues: 132,
                rejectedVenues: 12,
                totalUsers: 2847,
                venueOwners: 189,
                customers: 2658,
                totalBookings: 1234,
                upcomingBookings: 345,
                completedBookings: 789,
                cancelledBookings: 100,
                totalRevenue: 45678900,
                monthlyRevenue: 5678900,
                growthRate: 23.5,
                platformFee: 456789
            });

            setPendingApprovals([
                {
                    id: 1,
                    name: "Grand Palace Lawn",
                    owner: "Rajesh Sharma",
                    location: "Jaipur, Rajasthan",
                    type: "lawn",
                    capacity: 800,
                    submittedDate: "2024-02-10",
                    documents: ["ownership.pdf", "license.pdf"],
                    status: "pending"
                },
                {
                    id: 2,
                    name: "Skyview Banquet",
                    owner: "Priya Patel",
                    location: "Ahmedabad, Gujarat",
                    type: "hall",
                    capacity: 500,
                    submittedDate: "2024-02-11",
                    documents: ["ownership.pdf", "insurance.pdf"],
                    status: "pending"
                },
                {
                    id: 3,
                    name: "Ocean Breeze Rooftop",
                    owner: "Amit Kumar",
                    location: "Mumbai, Maharashtra",
                    type: "rooftop",
                    capacity: 300,
                    submittedDate: "2024-02-12",
                    documents: ["ownership.pdf", "safety_certificate.pdf"],
                    status: "pending"
                }
            ]);

            setRecentActivity([
                {
                    id: 1,
                    type: "venue_approved",
                    message: "Approved 'Royal Emerald Lawn'",
                    user: "Admin",
                    time: "10 min ago",
                    icon: "✅"
                },
                {
                    id: 2,
                    type: "user_verified",
                    message: "Verified owner 'Sunil Verma'",
                    user: "Admin",
                    time: "25 min ago",
                    icon: "👤"
                },
                {
                    id: 3,
                    type: "booking",
                    message: "New booking #BK1234 created",
                    user: "John Doe",
                    time: "1 hour ago",
                    icon: "📅"
                },
                {
                    id: 4,
                    type: "venue_rejected",
                    message: "Rejected 'Sunset Garden' - incomplete docs",
                    user: "Admin",
                    time: "2 hours ago",
                    icon: "❌"
                },
                {
                    id: 5,
                    type: "payment",
                    message: "Platform fee collected: ₹45,678",
                    user: "System",
                    time: "3 hours ago",
                    icon: "💰"
                }
            ]);

            setLoading(false);
        }, 1000);
    }, []);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }).format(amount);
    };

    const StatCard = ({ title, value, icon, color, subtext, trend }) => (
        <div className="rounded-xl border border-gray-200 bg-white p-6 transition-all hover:shadow-lg">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
                    {subtext && <p className="mt-1 text-xs text-gray-500">{subtext}</p>}
                    {trend && (
                        <p className="mt-2 flex items-center text-xs font-medium text-emerald-600">
                            <span className="mr-1">↑</span> {trend}% from last month
                        </p>
                    )}
                </div>
                <div className={`rounded-full ${color} p-4`}>
                    <span className="text-2xl">{icon}</span>
                </div>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="flex h-[80vh] items-center justify-center">
                <div className="text-center">
                    <div className="mb-4 text-6xl animate-pulse">🛠️</div>
                    <p className="text-gray-600">Loading admin dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="mt-2 text-gray-600">
                    Welcome back! Here's what's happening with your platform today.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Total Venues"
                    value={stats.totalVenues}
                    icon="🏢"
                    color="bg-indigo-100 text-indigo-600"
                    subtext={`${stats.pendingVenues} pending, ${stats.activeVenues} active`}
                />
                <StatCard
                    title="Total Users"
                    value={stats.totalUsers}
                    icon="👥"
                    color="bg-purple-100 text-purple-600"
                    subtext={`${stats.venueOwners} owners, ${stats.customers} customers`}
                />
                <StatCard
                    title="Total Bookings"
                    value={stats.totalBookings}
                    icon="📅"
                    color="bg-emerald-100 text-emerald-600"
                    subtext={`${stats.upcomingBookings} upcoming`}
                    trend={12.5}
                />
                <StatCard
                    title="Total Revenue"
                    value={formatCurrency(stats.totalRevenue)}
                    icon="💰"
                    color="bg-amber-100 text-amber-600"
                    subtext={`Platform fee: ${formatCurrency(stats.platformFee)}`}
                    trend={23.5}
                />
            </div>

            {/* Secondary Stats */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="rounded-xl border border-gray-200 bg-white p-6">
                    <h3 className="text-lg font-semibold text-gray-900">Monthly Revenue</h3>
                    <p className="mt-2 text-3xl font-bold text-emerald-600">
                        {formatCurrency(stats.monthlyRevenue)}
                    </p>
                    <p className="mt-1 text-sm text-gray-600">
                        ↑ {stats.growthRate}% from last month
                    </p>
                    <div className="mt-4 h-2 w-full rounded-full bg-gray-200">
                        <div className="h-2 w-3/4 rounded-full bg-emerald-600"></div>
                    </div>
                    <p className="mt-2 text-xs text-gray-500">75% of monthly target</p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-6">
                    <h3 className="text-lg font-semibold text-gray-900">Booking Status</h3>
                    <div className="mt-4 space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Upcoming</span>
                            <span className="font-semibold text-gray-900">{stats.upcomingBookings}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Completed</span>
                            <span className="font-semibold text-gray-900">{stats.completedBookings}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Cancelled</span>
                            <span className="font-semibold text-gray-900">{stats.cancelledBookings}</span>
                        </div>
                    </div>
                    <div className="mt-4 flex justify-between rounded-lg bg-gray-50 p-3">
                        <span className="text-sm font-medium text-gray-700">Success Rate</span>
                        <span className="text-sm font-bold text-emerald-700">
                            {Math.round((stats.completedBookings / stats.totalBookings) * 100)}%
                        </span>
                    </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-6">
                    <h3 className="text-lg font-semibold text-gray-900">Platform Health</h3>
                    <div className="mt-4 space-y-4">
                        <div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Server Status</span>
                                <span className="flex items-center gap-1 font-medium text-emerald-600">
                                    <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                                    Operational
                                </span>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Response Time</span>
                                <span className="font-medium text-gray-900">245ms</span>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Active Users</span>
                                <span className="font-medium text-gray-900">147</span>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Support Tickets</span>
                                <span className="font-medium text-amber-600">12</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Pending Approvals */}
                <div className="lg:col-span-2">
                    <div className="rounded-xl border border-gray-200 bg-white">
                        <div className="flex items-center justify-between border-b border-gray-200 p-6">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Pending Venue Approvals
                                </h2>
                                <p className="mt-1 text-sm text-gray-600">
                                    {stats.pendingVenues} venues awaiting review
                                </p>
                            </div>
                            <Link
                                href="/admin/approvals"
                                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                            >
                                View All
                            </Link>
                        </div>
                        <div className="divide-y divide-gray-200">
                            {pendingApprovals.map((venue) => (
                                <div key={venue.id} className="p-6 hover:bg-gray-50">
                                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                                        <div className="flex items-start gap-4">
                                            <div className="rounded-full bg-amber-100 p-3 text-amber-600">
                                                🏢
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{venue.name}</h3>
                                                <p className="mt-1 text-sm text-gray-600">{venue.owner}</p>
                                                <div className="mt-2 flex flex-wrap items-center gap-3">
                                                    <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                                                        {venue.location}
                                                    </span>
                                                    <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium capitalize text-gray-800">
                                                        {venue.type}
                                                    </span>
                                                    <span className="text-xs text-gray-500">
                                                        Capacity: {venue.capacity} guests
                                                    </span>
                                                </div>
                                                <div className="mt-2 flex items-center gap-2">
                                                    <span className="text-xs text-gray-500">
                                                        Submitted: {new Date(venue.submittedDate).toLocaleDateString()}
                                                    </span>
                                                    <span className="text-xs text-gray-400">•</span>
                                                    <span className="text-xs font-medium text-amber-600">
                                                        {venue.documents.length} documents
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => router.push(`/admin/approvals/${venue.id}`)}
                                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                            >
                                                Review
                                            </button>
                                            <button
                                                onClick={() => alert(`Approving ${venue.name}`)}
                                                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => alert(`Rejecting ${venue.name}`)}
                                                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="lg:col-span-1">
                    <div className="rounded-xl border border-gray-200 bg-white">
                        <div className="border-b border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                            <p className="mt-1 text-sm text-gray-600">Latest platform updates</p>
                        </div>
                        <div className="divide-y divide-gray-200">
                            {recentActivity.map((activity) => (
                                <div key={activity.id} className="p-4 hover:bg-gray-50">
                                    <div className="flex items-start gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                                            <span className="text-sm">{activity.icon}</span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-900">{activity.message}</p>
                                            <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                                                <span>{activity.user}</span>
                                                <span>•</span>
                                                <span>{activity.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-gray-200 p-4">
                            <Link
                                href="/admin/activity"
                                className="block text-center text-sm font-medium text-indigo-600 hover:text-indigo-700"
                            >
                                View All Activity
                            </Link>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6">
                        <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
                        <div className="mt-4 grid grid-cols-2 gap-3">
                            <button
                                onClick={() => router.push("/admin/approvals")}
                                className="flex flex-col items-center gap-2 rounded-lg border border-gray-200 p-4 hover:border-indigo-300 hover:bg-indigo-50"
                            >
                                <span className="text-2xl">✅</span>
                                <span className="text-xs font-medium text-gray-700">Review Venues</span>
                            </button>
                            <button
                                onClick={() => router.push("/admin/users")}
                                className="flex flex-col items-center gap-2 rounded-lg border border-gray-200 p-4 hover:border-indigo-300 hover:bg-indigo-50"
                            >
                                <span className="text-2xl">👥</span>
                                <span className="text-xs font-medium text-gray-700">Manage Users</span>
                            </button>
                            <button
                                onClick={() => router.push("/admin/analytics")}
                                className="flex flex-col items-center gap-2 rounded-lg border border-gray-200 p-4 hover:border-indigo-300 hover:bg-indigo-50"
                            >
                                <span className="text-2xl">📊</span>
                                <span className="text-xs font-medium text-gray-700">View Reports</span>
                            </button>
                            <button
                                onClick={() => router.push("/admin/settings")}
                                className="flex flex-col items-center gap-2 rounded-lg border border-gray-200 p-4 hover:border-indigo-300 hover:bg-indigo-50"
                            >
                                <span className="text-2xl">⚙️</span>
                                <span className="text-xs font-medium text-gray-700">Settings</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}