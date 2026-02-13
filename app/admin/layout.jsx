// app/admin/layout.js
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function AdminLayout({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef(null);

    // useEffect(() => {
    //     // Check authentication and role
    //     const userData = localStorage.getItem("bookvenu_user");
    //     if (!userData) {
    //         router.push("/login?redirect=/admin");
    //         return;
    //     }

    //     const user = JSON.parse(userData);
    //     if (user.role !== "admin") {
    //         router.push("/dashboard");
    //         return;
    //     }

    //     setUser(user);
    // }, [router]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("bookvenu_user");
        router.push("/");
    };

    const navigation = [
        { name: "Dashboard", href: "/admin", icon: "📊", exact: true },
        { name: "Venue Approvals", href: "/admin/approvals", icon: "✅", badge: 3 },
        { name: "Users", href: "/admin/users", icon: "👥" },
        { name: "Bookings", href: "/admin/bookings", icon: "📅" },
        { name: "Analytics", href: "/admin/analytics", icon: "📈" },
        { name: "Settings", href: "/admin/settings", icon: "⚙️" },
    ];

    const isActive = (href, exact = false) => {
        if (exact) return pathname === href;
        return pathname.startsWith(href);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Admin Navbar */}
            <nav className="sticky top-0 z-50 border-b bg-linear-to-r from-indigo-700 to-purple-700 text-white shadow-lg">
                <div className="container mx-auto px-4">
                    <div className="flex h-16 items-center justify-between">
                        {/* Left section */}
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="rounded-lg p-2 text-white/80 hover:bg-white/10 lg:hidden"
                            >
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>

                            <Link href="/admin" className="flex items-center gap-2">
                                <span className="text-2xl font-bold text-white">BookVenu</span>
                                <span className="rounded-full bg-white/20 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
                                    Admin
                                </span>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex lg:items-center lg:gap-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                                        isActive(item.href, item.exact)
                                            ? "bg-white text-indigo-700"
                                            : "text-white/90 hover:bg-white/10"
                                    }`}
                                >
                                    <span>{item.icon}</span>
                                    {item.name}
                                    {item.badge && (
                                        <span className="ml-1 rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
                                            {item.badge}
                                        </span>
                                    )}
                                </Link>
                            ))}
                        </div>

                        {/* Profile */}
                        <div className="relative" ref={profileRef}>
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-3 rounded-lg p-2 hover:bg-white/10"
                            >
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm">
                                    <span className="text-sm font-medium">
                                        {user?.name?.charAt(0) || 'A'}
                                    </span>
                                </div>
                                <div className="hidden text-left lg:block">
                                    <p className="text-sm font-medium text-white">
                                        {user?.name || "Admin"}
                                    </p>
                                    <p className="text-xs text-white/70">
                                        {user?.email || "admin@bookvenu.com"}
                                    </p>
                                </div>
                                <svg className="h-4 w-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Profile Dropdown */}
                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-56 rounded-lg border border-gray-200 bg-white shadow-xl">
                                    <div className="border-b p-3 lg:hidden">
                                        <p className="text-sm font-medium text-gray-900">{user?.name || "Admin"}</p>
                                        <p className="text-xs text-gray-500">{user?.email || "admin@bookvenu.com"}</p>
                                    </div>
                                    <div className="p-2">
                                        <Link
                                            href="/admin/profile"
                                            onClick={() => setIsProfileOpen(false)}
                                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            <span>👤</span>
                                            My Profile
                                        </Link>
                                        <Link
                                            href="/admin/settings"
                                            onClick={() => setIsProfileOpen(false)}
                                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            <span>⚙️</span>
                                            Settings
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

                    {/* Mobile Menu */}
                    {isMobileMenuOpen && (
                        <div className="border-t border-white/10 py-4 lg:hidden">
                            <div className="flex flex-col space-y-1">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium ${
                                            isActive(item.href, item.exact)
                                                ? "bg-white text-indigo-700"
                                                : "text-white/90 hover:bg-white/10"
                                        }`}
                                    >
                                        <span className="text-xl">{item.icon}</span>
                                        {item.name}
                                        {item.badge && (
                                            <span className="ml-auto rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
                                                {item.badge}
                                            </span>
                                        )}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Page Content */}
            <div className="container mx-auto px-4 py-8">
                {children}
            </div>
        </div>
    );
}