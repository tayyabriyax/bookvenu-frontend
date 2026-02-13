// components/owner/StatusFilter.js
export default function StatusFilter({ filters, cities, types, onFilterChange }) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
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
                        <option value="approved">Approved</option>
                        <option value="pending">Pending</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>

                {/* Venue Type Filter */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Venue Type
                    </label>
                    <select
                        value={filters.type}
                        onChange={(e) => onFilterChange({ ...filters, type: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    >
                        <option value="all">All Types</option>
                        {types.map((type) => (
                            <option key={type} value={type} className="capitalize">
                                {type}
                            </option>
                        ))}
                    </select>
                </div>

                {/* City Filter */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        City
                    </label>
                    <select
                        value={filters.city}
                        onChange={(e) => onFilterChange({ ...filters, city: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    >
                        <option value="all">All Cities</option>
                        {cities.map((city) => (
                            <option key={city} value={city}>
                                {city}
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
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="revenue_high">Revenue: High to Low</option>
                        <option value="revenue_low">Revenue: Low to High</option>
                        <option value="bookings_high">Bookings: High to Low</option>
                        <option value="bookings_low">Bookings: Low to High</option>
                        <option value="rating_high">Rating: High to Low</option>
                        <option value="name_asc">Name: A to Z</option>
                        <option value="name_desc">Name: Z to A</option>
                    </select>
                </div>
            </div>

            {/* Active Filters */}
            {(filters.status !== "all" || filters.type !== "all" || filters.city !== "all") && (
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
                    {filters.type !== "all" && (
                        <button
                            onClick={() => onFilterChange({ ...filters, type: "all" })}
                            className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
                        >
                            Type: {filters.type}
                            <span>×</span>
                        </button>
                    )}
                    {filters.city !== "all" && (
                        <button
                            onClick={() => onFilterChange({ ...filters, city: "all" })}
                            className="flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-800"
                        >
                            City: {filters.city}
                            <span>×</span>
                        </button>
                    )}
                    <button
                        onClick={() => onFilterChange({
                            status: "all",
                            type: "all",
                            city: "all",
                            sortBy: "newest",
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