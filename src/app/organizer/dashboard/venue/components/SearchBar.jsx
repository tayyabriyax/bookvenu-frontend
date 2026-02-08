// components/dashboard/FilterVenue/SearchBar.jsx
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ search, onChange, onSubmit }) => {
  return (
    <div className="relative">
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        value={search}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search venues..."
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
      />
    </div>
  );
};

export default SearchBar;