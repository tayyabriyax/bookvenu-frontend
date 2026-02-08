// components/dashboard/FilterVenue/FeaturesFilters.jsx
import { FaStar, FaUtensils } from 'react-icons/fa';

const FeaturesFilters = ({ filters, onChange }) => {
  const amenities = [
    { id: 'parking', label: 'Parking' },
    { id: 'wifi', label: 'WiFi' },
    { id: 'ac', label: 'Air Conditioning' },
    { id: 'pool', label: 'Swimming Pool' },
    { id: 'music', label: 'Music System' },
    { id: 'catering', label: 'Catering' }
  ];

  const dishes = [
    { value: 'all', label: 'All Dishes' },
    { value: 'chicken', label: 'Chicken' },
    { value: 'beef', label: 'Beef' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'seafood', label: 'Seafood' }
  ];

  const ratings = [
    { value: 0, label: 'Any Rating' },
    { value: 3, label: '3+ Stars' },
    { value: 4, label: '4+ Stars' },
    { value: 4.5, label: '4.5+ Stars' }
  ];

  const toggleAmenity = (amenityId) => {
    const newAmenities = filters.amenities.includes(amenityId)
      ? filters.amenities.filter(id => id !== amenityId)
      : [...filters.amenities, amenityId];
    onChange('amenities', newAmenities);
  };

  return (
    <div className="space-y-6">
      {/* Amenities */}
      <div>
        <label className="text-gray-700 font-medium mb-3 block">Amenities</label>
        <div className="grid grid-cols-2 gap-2">
          {amenities.map(amenity => (
            <button
              key={amenity.id}
              onClick={() => toggleAmenity(amenity.id)}
              className={`p-3 rounded-lg text-sm flex items-center gap-2 ${filters.amenities.includes(amenity.id)
                ? 'bg-green-100 text-green-700 border border-green-300'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${filters.amenities.includes(amenity.id) ? 'bg-green-500' : 'bg-gray-400'}`} />
              {amenity.label}
            </button>
          ))}
        </div>
      </div>

      {/* Dish Type */}
      <div>
        <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
          <FaUtensils />
          Cuisine Type
        </label>
        <select
          value={filters.dish}
          onChange={(e) => onChange('dish', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 outline-none"
        >
          {dishes.map(dish => (
            <option key={dish.value} value={dish.value}>{dish.label}</option>
          ))}
        </select>
      </div>

      {/* Rating */}
      <div>
        <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
          <FaStar />
          Minimum Rating
        </label>
        <div className="grid grid-cols-2 gap-2">
          {ratings.map(rating => (
            <button
              key={rating.value}
              onClick={() => onChange('rating', rating.value)}
              className={`p-3 rounded-lg text-sm ${filters.rating === rating.value
                ? 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent'
              }`}
            >
              {rating.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesFilters;