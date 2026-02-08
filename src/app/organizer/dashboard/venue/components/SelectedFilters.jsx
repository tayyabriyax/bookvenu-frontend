// components/dashboard/FilterVenue/SelectedFilters.jsx
import { FaTimes } from 'react-icons/fa';

const SelectedFilters = ({ filters, onChange }) => {
  const hasActiveFilters = () => {
    return filters.city ||
           filters.venueType !== 'all' ||
           filters.minCapacity ||
           filters.maxCapacity ||
           filters.priceRange !== 'all' ||
           filters.amenities.length > 0 ||
           filters.rating > 0 ||
           filters.dish !== 'all';
  };

  if (!hasActiveFilters()) return null;

  const venueTypes = {
    'all': 'All Types',
    'hall': 'Banquet Hall',
    'lawn': 'Lawn',
    'hotel': 'Hotel',
    'restaurant': 'Restaurant'
  };

  const priceRanges = {
    'all': 'Any Price',
    'budget': 'Budget',
    'standard': 'Standard',
    'premium': 'Premium',
    'luxury': 'Luxury'
  };

  const dishes = {
    'all': 'All Dishes',
    'chicken': 'Chicken',
    'beef': 'Beef',
    'vegetarian': 'Vegetarian',
    'seafood': 'Seafood'
  };

  return (
    <div className="mt-6 pt-6 border-t border-gray-200">
      <h4 className="text-gray-700 font-medium mb-3">Active Filters:</h4>
      <div className="flex flex-wrap gap-2">
        {filters.city && (
          <FilterChip
            label={`City: ${filters.city}`}
            onRemove={() => onChange('city', '')}
          />
        )}
        
        {filters.venueType !== 'all' && (
          <FilterChip
            label={`Type: ${venueTypes[filters.venueType]}`}
            onRemove={() => onChange('venueType', 'all')}
          />
        )}
        
        {filters.minCapacity && filters.maxCapacity && (
          <FilterChip
            label={`Capacity: ${filters.minCapacity}-${filters.maxCapacity}`}
            onRemove={() => {
              onChange('minCapacity', '');
              onChange('maxCapacity', '');
            }}
          />
        )}
        
        {filters.priceRange !== 'all' && (
          <FilterChip
            label={`Price: ${priceRanges[filters.priceRange]}`}
            onRemove={() => onChange('priceRange', 'all')}
          />
        )}
        
        {filters.amenities.length > 0 && (
          <FilterChip
            label={`${filters.amenities.length} amenities`}
            onRemove={() => onChange('amenities', [])}
          />
        )}
        
        {filters.rating > 0 && (
          <FilterChip
            label={`Rating: ${filters.rating}+`}
            onRemove={() => onChange('rating', 0)}
          />
        )}
        
        {filters.dish !== 'all' && (
          <FilterChip
            label={`Cuisine: ${dishes[filters.dish]}`}
            onRemove={() => onChange('dish', 'all')}
          />
        )}
      </div>
    </div>
  );
};

const FilterChip = ({ label, onRemove }) => (
  <div className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
    {label}
    <button
      onClick={onRemove}
      className="ml-1 hover:text-blue-900"
    >
      <FaTimes className="text-xs" />
    </button>
  </div>
);

export default SelectedFilters;