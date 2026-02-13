// components/owner/BookingsFilter.js
"use client";

export default function BookingsFilter({ filters, venues, onFilterChange }) {
    const handleFilterChange = (key, value) => {
        onFilterChange({ ...filters, [key]: value });
    };

    const handleResetFilters = () => {
        onFilterChange({
            status: "all",
            venue: "all",
            dateRange: "all",
            paymentStatus: "all",
            sortBy: "date_desc",
            search: "",
        });
    };

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Filters & Sorting</h3>
                <button
                    onClick={handleResetFilters}
                    className="text-sm text-emerald-600 hover:text-emerald-700"
                >
                    Reset all filters
                </button>
            </div>

            {/* Search Input */}
            <div className="mb-6">
                <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                    <input
                        type="text"
                        value={filters.search}
                        onChange={(e) => handleFilterChange("search", e.target.value)}
                        placeholder="Search bookings by ID, customer name, venue, or event type..."
                        className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                    {filters.search && (
                        <button
                            onClick={() => handleFilterChange("search", "")}
                            className="absolute inset-y-0 right-0 flex items-center pr-3"
                        >
                            <svg
                                className="h-5 w-5 text-gray-400 hover:text-gray-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {/* Status Filter */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Booking Status
                    </label>
                    <select
                        value={filters.status}
                        onChange={(e) => handleFilterChange("status", e.target.value)}
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-emerald-500"
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>

                {/* Venue Filter */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Venue
                    </label>
                    <select
                        value={filters.venue}
                        onChange={(e) => handleFilterChange("venue", e.target.value)}
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-emerald-500"
                    >
                        <option value="all">All Venues</option>
                        {venues.map((venue) => (
                            <option key={venue} value={venue}>
                                {venue}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Date Range Filter */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Date Range
                    </label>
                    <select
                        value={filters.dateRange}
                        onChange={(e) => handleFilterChange("dateRange", e.target.value)}
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-emerald-500"
                    >
                        <option value="all">All Dates</option>
                        <option value="upcoming">Upcoming</option>
                        <option value="past">Past</option>
                        <option value="thisMonth">This Month</option>
                        <option value="nextMonth">Next Month</option>
                    </select>
                </div>

                {/* Payment Status Filter */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Payment Status
                    </label>
                    <select
                        value={filters.paymentStatus}
                        onChange={(e) => handleFilterChange("paymentStatus", e.target.value)}
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-emerald-500"
                    >
                        <option value="all">All Payments</option>
                        <option value="paid">Paid</option>
                        <option value="pending">Pending</option>
                        <option value="partial">Partial</option>
                        <option value="refunded">Refunded</option>
                    </select>
                </div>

                {/* Sorting Options */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Sort By
                    </label>
                    <select
                        value={filters.sortBy}
                        onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-emerald-500"
                    >
                        <option value="date_desc">Event Date (Newest First)</option>
                        <option value="date_asc">Event Date (Oldest First)</option>
                        <option value="amount_desc">Amount (High to Low)</option>
                        <option value="amount_asc">Amount (Low to High)</option>
                        <option value="guests_desc">Guests (High to Low)</option>
                        <option value="guests_asc">Guests (Low to High)</option>
                        <option value="newest">Booking Date (Newest First)</option>
                        <option value="oldest">Booking Date (Oldest First)</option>
                    </select>
                </div>
            </div>

            {/* Active Filters Display */}
            {(filters.status !== "all" ||
                filters.venue !== "all" ||
                filters.dateRange !== "all" ||
                filters.paymentStatus !== "all" ||
                filters.search) && (
                    <div className="mt-6 flex flex-wrap gap-2">
                        <div className="text-sm text-gray-600">Active filters:</div>
                        {filters.status !== "all" && (
                            <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800">
                                Status: {filters.status}
                                <button
                                    onClick={() => handleFilterChange("status", "all")}
                                    className="ml-2 text-emerald-600 hover:text-emerald-800"
                                >
                                    ×
                                </button>
                            </span>
                        )}
                        {filters.venue !== "all" && (
                            <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                                Venue: {filters.venue}
                                <button
                                    onClick={() => handleFilterChange("venue", "all")}
                                    className="ml-2 text-blue-600 hover:text-blue-800"
                                >
                                    ×
                                </button>
                            </span>
                        )}
                        {filters.dateRange !== "all" && (
                            <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800">
                                Date: {filters.dateRange}
                                <button
                                    onClick={() => handleFilterChange("dateRange", "all")}
                                    className="ml-2 text-purple-600 hover:text-purple-800"
                                >
                                    ×
                                </button>
                            </span>
                        )}
                        {filters.paymentStatus !== "all" && (
                            <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
                                Payment: {filters.paymentStatus}
                                <button
                                    onClick={() => handleFilterChange("paymentStatus", "all")}
                                    className="ml-2 text-amber-600 hover:text-amber-800"
                                >
                                    ×
                                </button>
                            </span>
                        )}
                        {filters.search && (
                            <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800">
                                Search: "{filters.search}"
                                <button
                                    onClick={() => handleFilterChange("search", "")}
                                    className="ml-2 text-gray-600 hover:text-gray-800"
                                >
                                    ×
                                </button>
                            </span>
                        )}
                    </div>
                )}
        </div>
    );
}