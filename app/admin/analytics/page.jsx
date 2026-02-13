// app/admin/analytics/page.js
"use client";

import { useState, useEffect } from "react";

export default function AdminAnalyticsPage() {
    const [loading, setLoading] = useState(true);
    const [timeframe, setTimeframe] = useState("month");

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);

    if (loading) {
        return (
            <div className="flex h-[80vh] items-center justify-center">
                <div className="text-center">
                    <div className="mb-4 text-6xl animate-pulse">📊</div>
                    <p className="text-gray-600">Loading analytics...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
                    <p className="mt-2 text-gray-600">
                        Platform performance and growth metrics
                    </p>
                </div>
                <select
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                    <option value="week">Last 7 Days</option>
                    <option value="month">Last 30 Days</option>
                    <option value="quarter">Last 90 Days</option>
                    <option value="year">Year to Date</option>
                </select>
            </div>

            {/* Analytics content would go here */}
            <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
                <span className="text-6xl">📈</span>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                    Analytics Dashboard
                </h3>
                <p className="mt-2 text-gray-600">
                    This section would include revenue charts, user growth graphs,
                    booking trends, venue performance metrics, and platform health indicators.
                </p>
            </div>
        </div>
    );
}