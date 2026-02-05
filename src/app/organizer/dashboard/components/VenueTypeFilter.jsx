// components/dashboard/VenueTypeFilter.jsx
import { FaHotel } from 'react-icons/fa';
import { GiPartyPopper } from 'react-icons/gi';

const VenueTypeFilter = () => {
  const venueTypes = [
    { name: "Hall", icon: <FaHotel />, count: 5, active: true },
    { name: "Lawn", icon: <GiPartyPopper />, count: 4, active: false },
  
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {venueTypes.map((type, index) => (
        <button 
          key={index}
          className={`flex items-center space-x-2 px-4 py-3 rounded-xl ${type.active ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
        >
          <span>{type.icon}</span>
          <span>{type.name}</span>
          <span className={`px-2 py-1 text-xs rounded-full ${type.active ? 'bg-white/20' : 'bg-gray-100'}`}>
            {type.count}
          </span>
        </button>
      ))}
    </div>
  );
};

export default VenueTypeFilter;