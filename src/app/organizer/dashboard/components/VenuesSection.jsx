// components/dashboard/VenuesSection.jsx
import { FaFilter, FaSearch,FaChevronRight  } from 'react-icons/fa';
import VenueTypeFilter from './VenueTypeFilter';
import VenuesGrid from './VenuesGrid';

const VenuesSection = () => {
  return (
    <div>
      {/* Venues List Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Your Venues</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search venues..." 
              className="pl-12 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200">
            <FaFilter /> <span>Filter</span>
          </button>
        </div>
      </div>

      <VenueTypeFilter />
      <VenuesGrid />
      
      {/* View All Button */}
      <div className="mt-6 text-center">
        <button className="px-8 py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 inline-flex items-center space-x-2">
          <span>View All Venues</span>
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default VenuesSection;