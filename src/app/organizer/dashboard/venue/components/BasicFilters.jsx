// components/dashboard/FilterVenue/BasicFilters.jsx
import { FaMapMarkerAlt, FaUsers, FaRupeeSign } from 'react-icons/fa';

const BasicFilters = ({ filters, onChange }) => {
  const cities = [
    'Bahawalpur', 'Lahore', 'Karachi', 'Islamabad', 'Rawalpindi',
    'Multan', 'Faisalabad', 'Gujranwala', 'Peshawar'
  ];

  const venueTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'hall', label: 'Banquet Hall' },
    { value: 'lawn', label: 'Lawn' },
    { value: 'hotel', label: 'Hotel' },
    { value: 'restaurant', label: 'Restaurant' }
  ];

  const priceRanges = [
    { value: 'all', label: 'Any Price' },
    { value: 'budget', label: 'Budget (<₹1000)' },
    { value: 'standard', label: 'Standard (₹1000-3000)' },
    { value: 'premium', label: 'Premium (₹3000-5000)' },
    { value: 'luxury', label: 'Luxury (₹5000+)' }
  ];

  return (
    <div className="space-y-6">
      {/* Location */}
      <div>
        <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
          <FaMapMarkerAlt />
          Location
        </label>
        <select
          value={filters.city}
          onChange={(e) => onChange('city', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 outline-none"
        >
          <option value="">All Cities</option>
          {cities.map(city => (
            <option key={city} value={city.toLowerCase()}>{city}</option>
          ))}
        </select>
      </div>

      {/* Venue Type */}
      <div>
        <label className="text-gray-700 font-medium mb-2 block">Venue Type</label>
        <div className="grid grid-cols-2 gap-2">
          {venueTypes.map(type => (
            <button
              key={type.value}
              onClick={() => onChange('venueType', type.value)}
              className={`p-3 rounded-lg text-sm ${filters.venueType === type.value
                ? 'bg-blue-100 text-blue-700 border border-blue-300'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Capacity */}
      <div>
        <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
          <FaUsers />
          Capacity
        </label>
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Min"
            value={filters.minCapacity}
            onChange={(e) => onChange('minCapacity', e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:border-blue-500 outline-none"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxCapacity}
            onChange={(e) => onChange('maxCapacity', e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:border-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
          <FaRupeeSign />
          Price Range
        </label>
        <select
          value={filters.priceRange}
          onChange={(e) => onChange('priceRange', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 outline-none"
        >
          {priceRanges.map(range => (
            <option key={range.value} value={range.value}>{range.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default BasicFilters;