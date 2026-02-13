// app/admin/users/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminUsersPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");

    useEffect(() => {
        setTimeout(() => {
            setUsers([
                {
                    id: 1,
                    name: "Rajesh Sharma",
                    email: "rajesh@example.com",
                    phone: "+91 98765 43210",
                    role: "owner",
                    status: "active",
                    verified: true,
                    joinDate: "2023-12-15",
                    totalVenues: 3,
                    totalBookings: 45,
                    totalRevenue: 1250000,
                    lastActive: "2024-02-12"
                },
                {
                    id: 2,
                    name: "Priya Patel",
                    email: "priya@example.com",
                    phone: "+91 98765 43211",
                    role: "owner",
                    status: "active",
                    verified: false,
                    joinDate: "2024-01-20",
                    totalVenues: 1,
                    totalBookings: 12,
                    totalRevenue: 350000,
                    lastActive: "2024-02-11"
                },
                {
                    id: 3,
                    name: "Amit Kumar",
                    email: "amit@example.com",
                    phone: "+91 98765 43212",
                    role: "owner",
                    status: "suspended",
                    verified: true,
                    joinDate: "2023-10-05",
                    totalVenues: 2,
                    totalBookings: 28,
                    totalRevenue: 780000,
                    lastActive: "2024-02-10",
                    suspensionReason: "Multiple policy violations"
                },
                {
                    id: 4,
                    name: "John Doe",
                    email: "john@example.com",
                    phone: "+91 98765 43213",
                    role: "customer",
                    status: "active",
                    verified: true,
                    joinDate: "2024-02-01",
                    totalBookings: 3,
                    totalSpent: 125000,
                    lastActive: "2024-02-12"
                },
                {
                    id: 5,
                    name: "Sarah Smith",
                    email: "sarah@example.com",
                    phone: "+91 98765 43214",
                    role: "customer",
                    status: "active",
                    verified: true,
                    joinDate: "2023-11-15",
                    totalBookings: 8,
                    totalSpent: 450000,
                    lastActive: "2024-02-11"
                }
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    const filteredUsers = users.filter(user => {
        if (filter !== "all" && user.role !== filter) return false;
        if (search) {
            const searchLower = search.toLowerCase();
            return user.name.toLowerCase().includes(searchLower) ||
                user.email.toLowerCase().includes(searchLower) ||
                user.phone.includes(search);
        }
        return true;
    });

    const handleVerifyUser = (userId) => {
        setUsers(users.map(u =>
            u.id === userId ? { ...u, verified: true } : u
        ));
        alert("User verified successfully!");
    };

    const handleSuspendUser = (userId) => {
        const reason = prompt("Reason for suspension:");
        if (reason) {
            setUsers(users.map(u =>
                u.id === userId ? { ...u, status: "suspended", suspensionReason: reason } : u
            ));
            alert("User suspended successfully!");
        }
    };

    const handleActivateUser = (userId) => {
        setUsers(users.map(u =>
            u.id === userId ? { ...u, status: "active", suspensionReason: null } : u
        ));
        alert("User activated successfully!");
    };

    const stats = {
        totalOwners: users.filter(u => u.role === "owner").length,
        totalCustomers: users.filter(u => u.role === "customer").length,
        activeUsers: users.filter(u => u.status === "active").length,
        pendingVerification: users.filter(u => u.role === "owner" && !u.verified).length
    };

    if (loading) {
        return (
            <div className="flex h-[80vh] items-center justify-center">
                <div className="text-center">
                    <div className="mb-4 text-6xl animate-pulse">👥</div>
                    <p className="text-gray-600">Loading users...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                    <p className="mt-2 text-gray-600">
                        Manage platform users, verify owners, and handle disputes
                    </p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                <div className="rounded-xl border border-gray-200 bg-white p-6">
                    <p className="text-sm text-gray-600">Total Users</p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">{users.length}</p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-6">
                    <p className="text-sm text-gray-600">Venue Owners</p>
                    <p className="mt-2 text-3xl font-bold text-indigo-600">{stats.totalOwners}</p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-6">
                    <p className="text-sm text-gray-600">Customers</p>
                    <p className="mt-2 text-3xl font-bold text-emerald-600">{stats.totalCustomers}</p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-6">
                    <p className="text-sm text-gray-600">Pending Verification</p>
                    <p className="mt-2 text-3xl font-bold text-amber-600">{stats.pendingVerification}</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3">
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                        <option value="all">All Users</option>
                        <option value="owner">Venue Owners</option>
                        <option value="customer">Customers</option>
                    </select>
                    <div className="relative">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search users..."
                            className="w-64 rounded-lg border border-gray-300 py-2 pl-4 pr-10 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
                    </div>
                </div>
                <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
                    + Invite New Owner
                </button>
            </div>

            {/* Users Table */}
            <div className="rounded-xl border border-gray-200 bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="border-b border-gray-200 bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    User
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Role
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Verification
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Joined
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Activity
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                                                <span className="font-medium">{user.name.charAt(0)}</span>
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{user.name}</p>
                                                <p className="text-sm text-gray-600">{user.email}</p>
                                                <p className="text-xs text-gray-500">{user.phone}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`rounded-full px-3 py-1 text-xs font-medium ${user.role === "owner"
                                                ? "bg-purple-100 text-purple-800"
                                                : "bg-blue-100 text-blue-800"
                                            }`}>
                                            {user.role === "owner" ? "🏢 Owner" : "👤 Customer"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`rounded-full px-3 py-1 text-xs font-medium ${user.status === "active"
                                                ? "bg-emerald-100 text-emerald-800"
                                                : "bg-red-100 text-red-800"
                                            }`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.verified ? (
                                            <span className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                                                <span>✓</span> Verified
                                            </span>
                                        ) : (
                                            <button
                                                onClick={() => handleVerifyUser(user.id)}
                                                className="rounded bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700 hover:bg-amber-200"
                                            >
                                                Verify Now
                                            </button>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm text-gray-900">
                                            {new Date(user.joinDate).toLocaleDateString()}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm text-gray-900">
                                            {user.role === "owner"
                                                ? `${user.totalBookings} bookings • ₹${(user.totalRevenue / 100000).toFixed(1)}L`
                                                : `${user.totalBookings} bookings • ₹${(user.totalSpent / 100000).toFixed(1)}L`
                                            }
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Last active: {new Date(user.lastActive).toLocaleDateString()}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => router.push(`/admin/users/${user.id}`)}
                                                className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                                            >
                                                View
                                            </button>
                                            {user.status === "active" ? (
                                                <button
                                                    onClick={() => handleSuspendUser(user.id)}
                                                    className="rounded-lg border border-red-300 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50"
                                                >
                                                    Suspend
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleActivateUser(user.id)}
                                                    className="rounded-lg border border-emerald-300 px-3 py-1.5 text-xs font-medium text-emerald-700 hover:bg-emerald-50"
                                                >
                                                    Activate
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}