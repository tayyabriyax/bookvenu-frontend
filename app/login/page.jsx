// app/login/page.js
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    // const redirectTo = searchParams.get("redirect") || "/";

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const validateForm = () => {
        const newErrors = {};

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

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            // Mock authentication - In real app, this would be an API call
            const mockUsers = [
                { email: "customer@example.com", password: "password123", role: "customer" },
                { email: "owner@example.com", password: "password123", role: "owner" },
            ];

            const user = mockUsers.find(
                u => u.email === formData.email && u.password === formData.password
            );

            if (user) {
                // Save user data to localStorage (simulating auth)
                localStorage.setItem("bookvenu_user", JSON.stringify({
                    email: user.email,
                    role: user.role,
                    name: user.role === "customer" ? "John Customer" : "Venue Owner",
                }));

                // Save remember me preference
                if (formData.rememberMe) {
                    localStorage.setItem("bookvenu_remember", "true");
                }

                // Role-based redirect
                let redirectPath = redirectTo;
                if (redirectTo === "/" && user.role === "owner") {
                    redirectPath = "/owner/dashboard";
                } else if (redirectTo === "/" && user.role === "customer") {
                    redirectPath = "/dashboard";
                }

                alert(`Login successful! Redirecting to ${redirectPath}`);
                router.push(redirectPath);
            } else {
                setErrors({ general: "Invalid email or password" });
            }

            setLoading(false);
        }, 1000);
    };

    const handleDemoLogin = (role) => {
        const demoCredentials = {
            customer: { email: "customer@example.com", password: "password123" },
            owner: { email: "owner@example.com", password: "password123" },
        };

        setFormData({
            email: demoCredentials[role].email,
            password: demoCredentials[role].password,
            rememberMe: false,
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
                        <p className="mt-2 text-gray-600">Welcome back! Please login to continue.</p>
                    </div>

                    {/* Login Card */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
                        <h1 className="mb-6 text-2xl font-bold text-gray-900">Sign In</h1>

                        {errors.general && (
                            <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-800">
                                {errors.general}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
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

                            {/* Password */}
                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Password *
                                    </label>
                                    <Link
                                        href="/forgot-password"
                                        className="text-sm text-emerald-600 hover:text-emerald-700"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
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
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                                    className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                />
                                <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
                                    Remember me
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full rounded-lg py-3 font-semibold text-white transition-all ${loading
                                        ? "cursor-not-allowed bg-gray-400"
                                        : "bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 hover:shadow-lg"
                                    }`}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Signing in...
                                    </span>
                                ) : (
                                    "Sign In"
                                )}
                            </button>
                        </form>

                        {/* Demo Login Buttons */}
                        <div className="mt-6">
                            <p className="mb-3 text-center text-sm text-gray-600">Quick demo login:</p>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => handleDemoLogin("customer")}
                                    className="rounded-lg border border-emerald-600 bg-emerald-50 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-100"
                                >
                                    Customer Demo
                                </button>
                                <button
                                    onClick={() => handleDemoLogin("owner")}
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

                        {/* Social Login */}
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

                            <button className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 hover:bg-gray-50">
                                <svg className="h-5 w-5" fill="#1877F2" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                                <span>Continue with Facebook</span>
                            </button>
                        </div> */}

                        {/* Sign Up Link */}
                        <p className="mt-8 text-center text-gray-600">
                            Don't have an account?{" "}
                            <Link
                                href="/register"
                                className="font-semibold text-emerald-600 hover:text-emerald-700"
                            >
                                Sign up now
                            </Link>
                        </p>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-6 text-center text-sm text-gray-500">
                        By signing in, you agree to our{" "}
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