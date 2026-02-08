// components/dashboard/FilterVenue/AdvancedFilters.jsx
import { FaSortAmountDown, FaCalendar } from 'react-icons/fa';

const AdvancedFilters = ({ filters, onChange }) => {
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' },
    { value: 'capacity_high', label: 'Capacity: High to Low' },
    { value: 'rating', label: 'Highest Rated' }
  ];

  return (
    <div className="space-y-6">
      {/* Sort By */}
      <div>
        <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
          <FaSortAmountDown />
          Sort By
        </label>
        <select
          value={filters.sort}
          onChange={(e) => onChange('sort', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 outline-none"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      {/* Results Per Page */}
      <div>
        <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
          <FaCalendar />
          Results Per Page
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[10, 20, 50].map(num => (
            <button
              key={num}
              onClick={() => onChange('limit', num)}
              className={`p-3 rounded-lg ${filters.limit === num
                ? 'bg-blue-100 text-blue-700 border border-blue-300'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent'
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilters;