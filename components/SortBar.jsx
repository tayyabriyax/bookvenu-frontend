// components/SortBar.js
export default function SortBar({ sortBy, onSortChange }) {
    const sortOptions = [
        { id: "newest", label: "Newest First" },
        { id: "price_low_high", label: "Price: Low to High" },
        { id: "price_high_low", label: "Price: High to Low" },
        { id: "capacity_high_low", label: "Capacity: High to Low" },
        { id: "rating", label: "Highest Rated" },
    ];

    return (
        <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
            <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            >
                {sortOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}