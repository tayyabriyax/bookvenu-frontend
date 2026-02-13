"use client"

import { useRouter } from "next/navigation";

// components/Header.js
export default function Header() {
    const router = useRouter();
    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
            <nav className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <div className="h-10 w-10 rounded-lg bg-linear-to-br from-emerald-500 to-teal-600"></div>
                        <span className="text-2xl font-bold text-gray-900">BookVenu</span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden items-center space-x-8 md:flex">
                        <a href="#" className="text-gray-700 hover:text-emerald-600 transition-colors">
                            Discover
                        </a>
                        <a href="#" className="text-gray-700 hover:text-emerald-600 transition-colors">
                            Categories
                        </a>
                        <a href="#" className="text-gray-700 hover:text-emerald-600 transition-colors">
                            For Vendors
                        </a>
                        <a href="#" className="text-gray-700 hover:text-emerald-600 transition-colors">
                            Contact
                        </a>
                    </div>

                    {/* Auth Buttons */}
                    <div className="flex items-center space-x-4">
                        <button onClick={() => router.push("/login")} className="hidden text-gray-700 hover:text-emerald-600 transition-colors md:block">
                            Sign In
                        </button>
                        <button onClick={() => router.push("/register")} className="rounded-lg bg-emerald-600 px-6 py-2 text-white hover:bg-emerald-700 transition-colors">
                            Sign Up
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
}