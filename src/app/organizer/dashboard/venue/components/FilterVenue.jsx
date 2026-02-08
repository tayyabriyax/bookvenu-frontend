// components/dashboard/FilterVenue/FilterVenue.jsx
'use client';

import { useState } from 'react';
import { FaFilter, FaSearch, FaSync } from 'react-icons/fa';
import SearchBar from './SearchBar';
import BasicFilters from './BasicFilters';
import FeaturesFilters from './FeaturesFilters';
import AdvancedFilters from './AdvancedFilters';
import SelectedFilters from './SelectedFilters';

const FilterVenue = ({ onFilterChange, initialFilters = {} }) => {
  const [filters, setFilters] = useState({
    city: initialFilters.city || '',
    venueType: initialFilters.venueType || 'all',
    minCapacity: initialFilters.minCapacity || '',
    maxCapacity: initialFilters.maxCapacity || '',
    dish: initialFilters.dish || 'all',
    search: initialFilters.search || '',
    page: initialFilters.page || 1,
    limit: initialFilters.limit || 10,
    sort: initialFilters.sort || 'newest',
    priceRange: initialFilters.priceRange || 'all',
    amenities: initialFilters.amenities || [],
    rating: initialFilters.rating || 0,
    ...initialFilters
  });

  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value, page: 1 };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      city: '',
      venueType: 'all',
      minCapacity: '',
      maxCapacity: '',
      dish: 'all',
      search: '',
      page: 1,
      limit: 10,
      sort: 'newest',
      priceRange: 'all',
      amenities: [],
      rating: 0
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const handleSubmit = () => {
    onFilterChange(filters);
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 mb-6">
      {/* Header */}
      <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
        <div className="flex items-center gap-3">
          <FaFilter className="text-blue-600" />
          <h3 className="font-semibold text-gray-800">Filter Venues</h3>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-600 hover:text-gray-800"
        >
          {isExpanded ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {/* Search Bar - Always Visible */}
      <div className="p-4">
        <SearchBar
          search={filters.search}
          onChange={(value) => handleFilterChange('search', value)}
          onSubmit={handleSubmit}
        />
      </div>

      {/* Expandable Filters Section */}
      {isExpanded && (
        <>
          {/* Tabs */}
          <div className="px-4 border-t border-b border-gray-200">
            <div className="flex gap-1">
              <TabButton
                active={activeTab === 'basic'}
                onClick={() => setActiveTab('basic')}
                label="Basic"
              />
              <TabButton
                active={activeTab === 'features'}
                onClick={() => setActiveTab('features')}
                label="Features"
              />
              <TabButton
                active={activeTab === 'advanced'}
                onClick={() => setActiveTab('advanced')}
                label="Advanced"
              />
            </div>
          </div>

          {/* Filter Content */}
          <div className="p-4">
            {activeTab === 'basic' && (
              <BasicFilters
                filters={filters}
                onChange={handleFilterChange}
              />
            )}

            {activeTab === 'features' && (
              <FeaturesFilters
                filters={filters}
                onChange={handleFilterChange}
              />
            )}

            {activeTab === 'advanced' && (
              <AdvancedFilters
                filters={filters}
                onChange={handleFilterChange}
              />
            )}

            {/* Selected Filters */}
            <SelectedFilters
              filters={filters}
              onChange={handleFilterChange}
            />

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSubmit}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700"
              >
                Apply Filters
              </button>
              <button
                onClick={handleReset}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 flex items-center gap-2"
              >
                <FaSync />
                Reset
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const TabButton = ({ active, onClick, label }) => (
  <button
    onClick={onClick}
    className={`flex-1 py-3 text-sm font-medium ${active
      ? 'text-blue-600 border-b-2 border-blue-600'
      : 'text-gray-500 hover:text-gray-700'
    }`}
  >
    {label}
  </button>
);

export default FilterVenue;