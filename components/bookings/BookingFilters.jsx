// components/bookings/BookingFilters.js
export default function BookingFilters({ filters, eventTypes, onFilterChange }) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {/* Status Filter */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Status
                    </label>
                    <select
                        value={filters.status}
                        onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    >
                        <option value="all">All Status</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>

                {/* Date Range Filter */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Date Range
                    </label>
                    <select
                        value={filters.dateRange}
                        onChange={(e) => onFilterChange({ ...filters, dateRange: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    >
                        <option value="all">All Dates</option>
                        <option value="upcoming">Upcoming</option>
                        <option value="past">Past Events</option>
                        <option value="thisMonth">This Month</option>
                    </select>
                </div>

                {/* Event Type Filter */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Event Type
                    </label>
                    <select
                        value={filters.eventType}
                        onChange={(e) => onFilterChange({ ...filters, eventType: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    >
                        <option value="all">All Event Types</option>
                        {eventTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Sort By */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Sort By
                    </label>
                    <select
                        value={filters.sortBy}
                        onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    >
                        <option value="date_desc">Date (Newest First)</option>
                        <option value="date_asc">Date (Oldest First)</option>
                        <option value="amount_desc">Amount (High to Low)</option>
                        <option value="amount_asc">Amount (Low to High)</option>
                        <option value="guests_desc">Guests (High to Low)</option>
                        <option value="guests_asc">Guests (Low to High)</option>
                    </select>
                </div>
            </div>

            {/* Search Bar */}
            <div className="mt-6">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    Search Bookings
                </label>
                <div className="relative">
                    <input
                        type="text"
                        value={filters.search}
                        onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
                        placeholder="Search by venue name, booking ID, or event type..."
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 pl-10 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        🔍
                    </div>
                </div>
            </div>

            {/* Active Filters */}
            {(filters.status !== "all" || filters.dateRange !== "all" || filters.eventType !== "all" || filters.search) && (
                <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span className="text-sm text-gray-600">Active filters:</span>
                    {filters.status !== "all" && (
                        <button
                            onClick={() => onFilterChange({ ...filters, status: "all" })}
                            className="flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-800"
                        >
                            Status: {filters.status}
                            <span>×</span>
                        </button>
                    )}
                    {filters.dateRange !== "all" && (
                        <button
                            onClick={() => onFilterChange({ ...filters, dateRange: "all" })}
                            className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
                        >
                            Date: {filters.dateRange}
                            <span>×</span>
                        </button>
                    )}
                    {filters.eventType !== "all" && (
                        <button
                            onClick={() => onFilterChange({ ...filters, eventType: "all" })}
                            className="flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-800"
                        >
                            Event: {filters.eventType}
                            <span>×</span>
                        </button>
                    )}
                    {filters.search && (
                        <button
                            onClick={() => onFilterChange({ ...filters, search: "" })}
                            className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800"
                        >
                            Search: "{filters.search}"
                            <span>×</span>
                        </button>
                    )}
                    <button
                        onClick={() => onFilterChange({
                            status: "all",
                            dateRange: "all",
                            eventType: "all",
                            sortBy: "date_desc",
                            search: "",
                        })}
                        className="text-sm text-red-600 hover:text-red-700"
                    >
                        Clear all
                    </button>
                </div>
            )}
        </div>
    );
}