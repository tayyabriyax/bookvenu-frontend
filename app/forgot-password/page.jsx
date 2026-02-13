// app/forgot-password/page.js
"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.trim()) {
            setMessage("Please enter your email address");
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setMessage("Please enter a valid email address");
            return;
        }

        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setMessage(`Password reset instructions have been sent to ${email}`);
            setLoading(false);
        }, 1000);
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
                        <p className="mt-2 text-gray-600">Reset your password</p>
                    </div>

                    {/* Forgot Password Card */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
                        <h1 className="mb-6 text-2xl font-bold text-gray-900">Forgot Password</h1>

                        <p className="mb-6 text-gray-600">
                            Enter your email address and we'll send you instructions to reset your password.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                                    placeholder="you@example.com"
                                />
                            </div>

                            {/* Success Message */}
                            {message && (
                                <div className={`rounded-lg p-4 ${message.includes("sent")
                                        ? "bg-emerald-50 text-emerald-800"
                                        : "bg-red-50 text-red-800"
                                    }`}>
                                    {message}
                                </div>
                            )}

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
                                        Sending...
                                    </span>
                                ) : (
                                    "Send Reset Instructions"
                                )}
                            </button>
                        </form>

                        {/* Back to Login */}
                        <div className="mt-6 text-center">
                            <Link
                                href="/login"
                                className="text-emerald-600 hover:text-emerald-700"
                            >
                                ← Back to Sign In
                            </Link>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-6 text-center text-sm text-gray-500">
                        Didn't receive the email? Check your spam folder or{" "}
                        <button
                            onClick={() => setEmail("")}
                            className="text-emerald-600 hover:text-emerald-700"
                        >
                            try again with a different email
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}