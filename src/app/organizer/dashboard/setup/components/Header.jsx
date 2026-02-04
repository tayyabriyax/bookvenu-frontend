// app/setup/components/Header.jsx
import { FaArrowAltCircleLeft, FaPlus } from 'react-icons/fa';

const Header = () => {
  return (
    <div className="mb-6 md:mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 gap-4 md:gap-0">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
            Setup & Management
          </h1>
          <p className="text-gray-600 text-sm md:text-base">Manage dishes, bookings, and venue settings</p>
        </div>
        
        <div className="flex items-center space-x-3 md:space-x-4">
          <button className="px-4 py-2.5 md:px-6 md:py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white font-semibold rounded-lg md:rounded-xl hover:shadow-md md:hover:shadow-lg transition-all duration-200 flex items-center space-x-2 text-sm md:text-base">
            <FaArrowAltCircleLeft className="text-white" /> <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;