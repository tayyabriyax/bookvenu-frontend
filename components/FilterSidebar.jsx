// components/FilterSidebar.js
export default function FilterSidebar({ filters, onFilterChange, onClearFilters }) {
    const venueTypes = [
        { id: "lawn", label: "Lawn" },
        { id: "hall", label: "Banquet Hall" },
        { id: "rooftop", label: "Rooftop" },
        { id: "garden", label: "Garden" },
        { id: "palace", label: "Palace" },
        { id: "beach", label: "Beach" },
    ];

    const cities = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Goa", "Jaipur"];

    const popularDishes = [
        "Continental",
        "Indian",
        "Chinese",
        "Mughlai",
        "Italian",
        "Seafood",
        "Vegetarian",
        "BBQ",
    ];

    return (
        <div className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <button
                    onClick={onClearFilters}
                    className="text-sm text-emerald-600 hover:text-emerald-700"
                >
                    Clear all
                </button>
            </div>

            <div className="space-y-6">
                {/* City Filter */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        City
                    </label>
                    <select
                        value={filters.city}
                        onChange={(e) => onFilterChange({ city: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    >
                        <option value="">All Cities</option>
                        {cities.map((city) => (
                            <option key={city} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Venue Type Filter */}
                <div>
                    <label className="mb-3 block text-sm font-medium text-gray-700">
                        Venue Type
                    </label>
                    <div className="space-y-2">
                        {venueTypes.map((type) => (
                            <label key={type.id} className="flex items-center">
                                <input
                                    type="radio"
                                    name="venueType"
                                    value={type.id}
                                    checked={filters.type === type.id}
                                    onChange={(e) => onFilterChange({ type: e.target.value })}
                                    className="h-4 w-4 border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                />
                                <span className="ml-2 text-gray-700">{type.label}</span>
                            </label>
                        ))}
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="venueType"
                                value=""
                                checked={!filters.type}
                                onChange={() => onFilterChange({ type: "" })}
                                className="h-4 w-4 border-gray-300 text-emerald-600 focus:ring-emerald-500"
                            />
                            <span className="ml-2 text-gray-700">All Types</span>
                        </label>
                    </div>
                </div>

                {/* Capacity Range */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Capacity
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <input
                                type="number"
                                placeholder="Min"
                                value={filters.minCapacity}
                                onChange={(e) => onFilterChange({ minCapacity: e.target.value })}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                            />
                        </div>
                        <div>
                            <input
                                type="number"
                                placeholder="Max"
                                value={filters.maxCapacity}
                                onChange={(e) => onFilterChange({ maxCapacity: e.target.value })}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                            />
                        </div>
                    </div>
                </div>

                {/* Dish Search */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Search by Dish/Cuisine
                    </label>
                    <input
                        type="text"
                        placeholder="e.g., Chinese, Italian"
                        value={filters.dish}
                        onChange={(e) => onFilterChange({ dish: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    />

                    {/* Popular Dishes */}
                    <div className="mt-3 flex flex-wrap gap-2">
                        {popularDishes.map((dish) => (
                            <button
                                key={dish}
                                onClick={() => onFilterChange({ dish })}
                                className={`rounded-full px-3 py-1 text-sm ${filters.dish === dish
                                        ? "bg-emerald-100 text-emerald-800"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                            >
                                {dish}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Price Range */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Price Range (per head)
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <input
                                type="number"
                                placeholder="Min ₹"
                                value={filters.minPrice}
                                onChange={(e) => onFilterChange({ minPrice: e.target.value })}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                            />
                        </div>
                        <div>
                            <input
                                type="number"
                                placeholder="Max ₹"
                                value={filters.maxPrice}
                                onChange={(e) => onFilterChange({ maxPrice: e.target.value })}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                            />
                        </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                        Current range: ₹{filters.minPrice || 0} - ₹{filters.maxPrice || "∞"}
                    </div>
                </div>
            </div>

            <button
                onClick={() => {
                    // In real app, this would trigger search
                    console.log("Applying filters:", filters);
                }}
                className="mt-6 w-full rounded-lg bg-emerald-600 py-3 font-medium text-white hover:bg-emerald-700"
            >
                Apply Filters
            </button>
        </div>
    );
}