// components/dashboard/Header.jsx
import { FaUser, FaBell } from 'react-icons/fa';

const Header = () => {
  return (
    <div className="mb-6 md:mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-4 sm:gap-0">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
            Organizer Dashboard
          </h1>
          <p className="text-gray-600 text-sm md:text-base">Manage your venues and bookings</p>
        </div>
        
        <div className="flex items-center  space-x-3 md:space-x-4 w-full sm:w-auto">
          
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center">
              <FaUser className="text-white text-base md:text-xl" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-gray-800 text-sm md:text-base truncate">John Organizer</p>
              <p className="text-gray-500 text-xs md:text-sm">Venue Manager</p>
            </div>
            <button className="p-2 md:p-3 bg-white rounded-lg md:rounded-xl shadow hover:shadow-md md:shadow-lg md:hover:shadow-xl transition-all duration-200">
            <FaBell className="text-gray-600 text-lg md:text-xl" />
          </button>
          <button className="p-2 md:p-3 bg-white rounded-lg md:rounded-xl shadow hover:shadow-md md:shadow-lg md:hover:shadow-xl transition-all duration-200">
            <FaBell className="text-gray-600 text-lg md:text-xl" />
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;