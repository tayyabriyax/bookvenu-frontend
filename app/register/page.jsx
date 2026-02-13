// app/register/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "customer",
        agreeToTerms: false,
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        } else if (formData.name.length < 2) {
            newErrors.name = "Name must be at least 2 characters";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = "You must agree to the terms and conditions";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            // Mock registration - In real app, this would be an API call
            const userData = {
                name: formData.name,
                email: formData.email,
                role: formData.role,
                createdAt: new Date().toISOString(),
            };

            // Save user data to localStorage (simulating auth)
            localStorage.setItem("bookvenu_user", JSON.stringify(userData));
            localStorage.setItem("bookvenu_token", "mock-jwt-token");

            alert(`Registration successful! Welcome to BookVenu.`);

            // Auto-login and redirect based on role
            if (formData.role === "owner") {
                router.push("/owner/dashboard");
            } else {
                router.push("/dashboard");
            }

            setLoading(false);
        }, 1500);
    };

    const handleDemoRole = (role) => {
        const demoData = {
            customer: {
                name: "John Customer",
                email: "customer@example.com",
                password: "password123",
                confirmPassword: "password123",
            },
            owner: {
                name: "Venue Owner",
                email: "owner@example.com",
                password: "password123",
                confirmPassword: "password123",
            },
        };

        setFormData({
            ...formData,
            ...demoData[role],
            role: role,
        });
    };

    return (
        <main className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-teal-50 py-12">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-md">
                    {/* Logo */}
                    <div className="mb-8 text-center">
                        <Link href="/" className="inline-flex items-center gap-2">
                            <div className="h-10 w-10 rounded-lg bg-linear-to-br from-emerald-500 to-teal-600"></div>
                            <span className="text-2xl font-bold text-gray-900">BookVenu</span>
                        </Link>
                        <p className="mt-2 text-gray-600">Create your account and start booking venues</p>
                    </div>

                    {/* Registration Card */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
                        <h1 className="mb-6 text-2xl font-bold text-gray-900">Create Account</h1>

                        {errors.general && (
                            <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-800">
                                {errors.general}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 ${errors.name
                                            ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                            : "border-gray-300 focus:border-emerald-500 focus:ring-emerald-200"
                                        }`}
                                    placeholder="John Doe"
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 ${errors.email
                                            ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                            : "border-gray-300 focus:border-emerald-500 focus:ring-emerald-200"
                                        }`}
                                    placeholder="you@example.com"
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                )}
                            </div>

                            {/* Role Selection */}
                            <div>
                                <label className="mb-3 block text-sm font-medium text-gray-700">
                                    I want to join as *
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    <label className={`cursor-pointer rounded-lg border-2 p-4 text-center transition-all ${formData.role === "customer"
                                            ? "border-emerald-500 bg-emerald-50"
                                            : "border-gray-200 hover:border-gray-300"
                                        }`}>
                                        <input
                                            type="radio"
                                            name="role"
                                            value="customer"
                                            checked={formData.role === "customer"}
                                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                            className="sr-only"
                                        />
                                        <div className="mb-2 text-2xl">👤</div>
                                        <div className="font-medium">Customer</div>
                                        <p className="mt-1 text-xs text-gray-500">Book venues for events</p>
                                    </label>

                                    <label className={`cursor-pointer rounded-lg border-2 p-4 text-center transition-all ${formData.role === "owner"
                                            ? "border-teal-500 bg-teal-50"
                                            : "border-gray-200 hover:border-gray-300"
                                        }`}>
                                        <input
                                            type="radio"
                                            name="role"
                                            value="owner"
                                            checked={formData.role === "owner"}
                                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                            className="sr-only"
                                        />
                                        <div className="mb-2 text-2xl">🏢</div>
                                        <div className="font-medium">Venue Owner</div>
                                        <p className="mt-1 text-xs text-gray-500">List and manage venues</p>
                                    </label>
                                </div>

                                <div className="mt-3 space-y-2">
                                    {formData.role === "customer" && (
                                        <div className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">
                                            As a customer, you can browse and book venues, manage your bookings, and save favorite venues.
                                        </div>
                                    )}
                                    {formData.role === "owner" && (
                                        <div className="rounded-lg bg-teal-50 p-3 text-sm text-teal-700">
                                            As a venue owner, you can list your venues, manage bookings, set pricing, and reach thousands of customers.
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Password *
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 ${errors.password
                                                ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                                : "border-gray-300 focus:border-emerald-500 focus:ring-emerald-200"
                                            }`}
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showPassword ? "🙈" : "👁️"}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                                )}
                                <p className="mt-1 text-xs text-gray-500">
                                    Must be at least 6 characters long
                                </p>
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Confirm Password *
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 ${errors.confirmPassword
                                                ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                                : "border-gray-300 focus:border-emerald-500 focus:ring-emerald-200"
                                            }`}
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showConfirmPassword ? "🙈" : "👁️"}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                                )}
                            </div>

                            {/* Terms Agreement */}
                            <div>
                                <label className="flex items-start">
                                    <input
                                        type="checkbox"
                                        checked={formData.agreeToTerms}
                                        onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                                        className="mt-1 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">
                                        I agree to the{" "}
                                        <Link href="/terms" className="text-emerald-600 hover:text-emerald-700">
                                            Terms of Service
                                        </Link>{" "}
                                        and{" "}
                                        <Link href="/privacy" className="text-emerald-600 hover:text-emerald-700">
                                            Privacy Policy
                                        </Link>
                                        *
                                    </span>
                                </label>
                                {errors.agreeToTerms && (
                                    <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full rounded-lg py-3 font-semibold text-white transition-all ${loading
                                        ? "cursor-not-allowed bg-gray-400"
                                        : formData.role === "owner"
                                            ? "bg-linear-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 hover:shadow-lg"
                                            : "bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 hover:shadow-lg"
                                    }`}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Creating Account...
                                    </span>
                                ) : (
                                    `Sign Up as ${formData.role === "owner" ? "Venue Owner" : "Customer"}`
                                )}
                            </button>
                        </form>

                        {/* Demo Registration Buttons */}
                        <div className="mt-6">
                            <p className="mb-3 text-center text-sm text-gray-600">Quick demo signup:</p>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => handleDemoRole("customer")}
                                    className="rounded-lg border border-emerald-600 bg-emerald-50 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-100"
                                >
                                    Customer Demo
                                </button>
                                <button
                                    onClick={() => handleDemoRole("owner")}
                                    className="rounded-lg border border-teal-600 bg-teal-50 py-2 text-sm font-medium text-teal-700 hover:bg-teal-100"
                                >
                                    Owner Demo
                                </button>
                            </div>
                        </div>

                        {/* Divider */}
                        {/* <div className="my-8 flex items-center">
                            <div className="grow border-t border-gray-300"></div>
                            <span className="mx-4 text-sm text-gray-500">OR</span>
                            <div className="grow border-t border-gray-300"></div>
                        </div> */}

                        {/* Social Registration */}
                        {/* <div className="space-y-3">
                            <button className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 hover:bg-gray-50">
                                <svg className="h-5 w-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                <span>Continue with Google</span>
                            </button>
                        </div> */}

                        {/* Login Link */}
                        <p className="mt-8 text-center text-gray-600">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="font-semibold text-emerald-600 hover:text-emerald-700"
                            >
                                Sign in here
                            </Link>
                        </p>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-6 text-center text-sm text-gray-500">
                        By creating an account, you agree to our{" "}
                        <Link href="/terms" className="text-emerald-600 hover:text-emerald-700">
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-emerald-600 hover:text-emerald-700">
                            Privacy Policy
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}