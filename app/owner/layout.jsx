// app/owner/layout.js
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function OwnerRootLayout({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [pageTitle, setPageTitle] = useState("Dashboard"); // Default title
    const [showBackButton, setShowBackButton] = useState(false);
    const [pageActions, setPageActions] = useState(null);

    const notificationRef = useRef(null);
    const profileRef = useRef(null);

    // Mock notifications
    useEffect(() => {
        setNotifications([
            {
                id: 1,
                type: "booking",
                message: "New booking request from John Doe",
                time: "5 min ago",
                read: false,
                link: "/owner/bookings/BK001"
            },
            {
                id: 2,
                type: "payment",
                message: "Payment received for booking #BK002",
                time: "1 hour ago",
                read: false,
                link: "/owner/bookings/BK002"
            },
            {
                id: 3,
                type: "review",
                message: "New 5-star review on Royal Emerald Lawn",
                time: "2 hours ago",
                read: true,
                link: "/owner/venues/1#reviews"
            }
        ]);
    }, []);

    // Get user from localStorage
    useEffect(() => {
        const userData = localStorage.getItem("bookvenu_user");
        if (userData) {
            setUser(JSON.parse(userData));
        } else {
            router.push("/login?redirect=/owner/dashboard");
        }
    }, [router]);

    // Check role
    useEffect(() => {
        if (user && user.role !== "owner") {
            router.push("/dashboard");
        }
    }, [user, router]);

    // Close dropdowns when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setIsNotificationsOpen(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Set page title and back button based on pathname
    useEffect(() => {
        // Dashboard
        if (pathname === "/owner/dashboard") {
            setPageTitle(`Welcome back, ${user?.name || "Venue Owner"}!`);
            setShowBackButton(false);
            setPageActions(
                <button
                    onClick={() => router.push("/owner/lawns/create")}
                    className="rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700"
                >
                    + Add New Venue
                </button>
            );
        }
        // Venues list
        else if (pathname === "/owner/lawns") {
            setPageTitle("My Venues");
            setShowBackButton(false);
            setPageActions(
                <button
                    onClick={() => router.push("/owner/lawns/create")}
                    className="rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700"
                >
                    + Add New Venue
                </button>
            );
        }
        // Add venue
        else if (pathname === "/owner/lawns/create") {
            setPageTitle("Add New Venue");
            setShowBackButton(true);
            setPageActions(
                <button
                    type="submit"
                    form="add-venue-form"
                    className="rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700"
                >
                    Save Venue
                </button>
            );
        }
        // Venue details (dynamic route)
        else if (pathname.match(/^\/owner\/lawns\/\d+$/)) {
            setPageTitle("Venue Details"); // This will be overridden by the page component
            setShowBackButton(true);
            setPageActions(null); // Page will set its own actions via context
        }
        // Venue availability
        else if (pathname.includes("/availability")) {
            setPageTitle("Manage Availability");
            setShowBackButton(true);
            setPageActions(
                <button
                    onClick={() => {/* This will be handled by the page */ }}
                    className="rounded-lg border border-emerald-600 bg-white px-4 py-2 font-medium text-emerald-600 hover:bg-emerald-50"
                >
                    📦 Bulk Block Dates
                </button>
            );
        }
        // Bookings
        else if (pathname === "/owner/bookings") {
            setPageTitle("Bookings Management");
            setShowBackButton(false);
            setPageActions(
                <button
                    onClick={() => alert("Export feature")}
                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
                >
                    📥 Export CSV
                </button>
            );
        }
        // Booking details
        else if (pathname.match(/^\/owner\/bookings\/\w+$/)) {
            setPageTitle("Booking Details");
            setShowBackButton(true);
            setPageActions(null);
        }
        // Calendar
        else if (pathname === "/owner/calendar") {
            setPageTitle("Booking Calendar");
            setShowBackButton(false);
            setPageActions(
                <button
                    onClick={() => alert("Export calendar")}
                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
                >
                    📥 Export
                </button>
            );
        }
        // Analytics
        else if (pathname === "/owner/analytics") {
            setPageTitle("Analytics & Reports");
            setShowBackButton(false);
            setPageActions(
                <select className="rounded-lg border border-gray-300 px-3 py-2 text-sm">
                    <option>Last 30 Days</option>
                    <option>Last 90 Days</option>
                    <option>Year to Date</option>
                    <option>Custom Range</option>
                </select>
            );
        }
        // Profile
        else if (pathname === "/owner/profile") {
            setPageTitle("My Profile");
            setShowBackButton(true);
            setPageActions(
                <button
                    className="rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700"
                >
                    Save Changes
                </button>
            );
        }
        // Settings
        else if (pathname === "/owner/settings") {
            setPageTitle("Settings");
            setShowBackButton(true);
            setPageActions(null);
        }
    }, [pathname, user, router]);

    const handleLogout = () => {
        localStorage.removeItem("bookvenu_user");
        router.push("/");
    };

    const markAsRead = (notificationId) => {
        setNotifications(notifications.map(notif =>
            notif.id === notificationId ? { ...notif, read: true } : notif
        ));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(notif => ({ ...notif, read: true })));
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    const navigation = [
        { name: "Dashboard", href: "/owner/dashboard", icon: "📊" },
        { name: "Venues", href: "/owner/lawns", icon: "🏢" },
        { name: "Bookings", href: "/owner/bookings", icon: "📅" },
        // { name: "Calendar", href: "/owner/calendar", icon: "🗓️" },
        // { name: "Analytics", href: "/owner/analytics", icon: "📈" },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 border-b bg-white shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex h-16 items-center justify-between">
                        {/* Left section - Logo and mobile menu */}
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
                            >
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>

                            <Link href="/owner/dashboard" className="flex items-center gap-2">
                                <span className="text-2xl font-bold text-emerald-600">BookVenu</span>
                                <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-800">
                                    Owner
                                </span>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex lg:items-center lg:gap-6">
                            {navigation.map((item) => {
                                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive
                                                ? "bg-emerald-50 text-emerald-700"
                                                : "text-gray-700 hover:bg-gray-100"
                                            }`}
                                    >
                                        <span>{item.icon}</span>
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Right section - Notifications & Profile */}
                        <div className="flex items-center gap-3">
                            {/* Notifications */}
                            <div className="relative" ref={notificationRef}>
                                <button
                                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                                    className="relative rounded-lg p-2 text-gray-600 hover:bg-gray-100"
                                >
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                    {unreadCount > 0 && (
                                        <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                                            {unreadCount}
                                        </span>
                                    )}
                                </button>

                                {/* Notifications Dropdown */}
                                {isNotificationsOpen && (
                                    <div className="absolute right-0 mt-2 w-96 rounded-lg border border-gray-200 bg-white shadow-xl">
                                        <div className="flex items-center justify-between border-b p-4">
                                            <h3 className="font-semibold text-gray-900">Notifications</h3>
                                            {unreadCount > 0 && (
                                                <button
                                                    onClick={markAllAsRead}
                                                    className="text-xs font-medium text-emerald-600 hover:text-emerald-700"
                                                >
                                                    Mark all as read
                                                </button>
                                            )}
                                        </div>
                                        <div className="max-h-96 overflow-y-auto">
                                            {notifications.length === 0 ? (
                                                <div className="p-8 text-center text-gray-500">
                                                    <div className="mb-2 text-4xl">🔔</div>
                                                    <p>No notifications</p>
                                                </div>
                                            ) : (
                                                <div className="divide-y">
                                                    {notifications.map((notification) => (
                                                        <Link
                                                            key={notification.id}
                                                            href={notification.link}
                                                            onClick={() => {
                                                                markAsRead(notification.id);
                                                                setIsNotificationsOpen(false);
                                                            }}
                                                            className={`block p-4 hover:bg-gray-50 ${!notification.read ? 'bg-emerald-50/50' : ''
                                                                }`}
                                                        >
                                                            <div className="flex items-start gap-3">
                                                                <div className="text-xl">
                                                                    {notification.type === 'booking' && '📅'}
                                                                    {notification.type === 'payment' && '💰'}
                                                                    {notification.type === 'review' && '⭐'}
                                                                </div>
                                                                <div className="flex-1">
                                                                    <p className="text-sm text-gray-900">
                                                                        {notification.message}
                                                                    </p>
                                                                    <p className="mt-1 text-xs text-gray-500">
                                                                        {notification.time}
                                                                    </p>
                                                                </div>
                                                                {!notification.read && (
                                                                    <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                                                                )}
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <div className="border-t p-4 text-center">
                                            <Link
                                                href="/owner/notifications"
                                                onClick={() => setIsNotificationsOpen(false)}
                                                className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
                                            >
                                                View all notifications
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* User Profile */}
                            <div className="relative" ref={profileRef}>
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center gap-3 rounded-lg p-2 hover:bg-gray-100"
                                >
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                                        <span className="text-sm font-medium">
                                            {user?.name?.charAt(0) || 'O'}
                                        </span>
                                    </div>
                                    <div className="hidden text-left lg:block">
                                        <p className="text-sm font-medium text-gray-900">
                                            {user?.name || "Owner"}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {user?.email || "owner@bookvenu.com"}
                                        </p>
                                    </div>
                                    <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {/* Profile Dropdown */}
                                {isProfileOpen && (
                                    <div className="absolute right-0 mt-2 w-56 rounded-lg border border-gray-200 bg-white shadow-xl">
                                        <div className="border-b p-3 lg:hidden">
                                            <p className="text-sm font-medium text-gray-900">{user?.name || "Owner"}</p>
                                            <p className="text-xs text-gray-500">{user?.email || "owner@bookvenu.com"}</p>
                                        </div>
                                        <div className="p-2">
                                            <Link
                                                href="/owner/profile"
                                                onClick={() => setIsProfileOpen(false)}
                                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                <span>👤</span>
                                                Your Profile
                                            </Link>
                                            <Link
                                                href="/owner/settings"
                                                onClick={() => setIsProfileOpen(false)}
                                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                <span>⚙️</span>
                                                Settings
                                            </Link>
                                            <Link
                                                href="/owner/help"
                                                onClick={() => setIsProfileOpen(false)}
                                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                <span>❓</span>
                                                Help & Support
                                            </Link>
                                        </div>
                                        <div className="border-t p-2">
                                            <button
                                                onClick={handleLogout}
                                                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                                            >
                                                <span>🚪</span>
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Mobile Navigation Menu */}
                    {isMobileMenuOpen && (
                        <div className="border-t py-4 lg:hidden">
                            <div className="flex flex-col space-y-2">
                                {navigation.map((item) => {
                                    const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium ${isActive
                                                    ? "bg-emerald-50 text-emerald-700"
                                                    : "text-gray-700 hover:bg-gray-100"
                                                }`}
                                        >
                                            <span className="text-xl">{item.icon}</span>
                                            {item.name}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Page Header with Back Button and Title */}
            <div className="border-b bg-white">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        <div className="flex items-center gap-4">
                            {showBackButton && (
                                <button
                                    onClick={() => router.back()}
                                    className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
                                >
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Back
                                </button>
                            )}
                            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                                {pageTitle}
                            </h1>
                        </div>
                        {pageActions && (
                            <div className="flex items-center gap-3">
                                {pageActions}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                {children}
            </div>
        </div>
    );
}