// components/dashboard/UpcomingEvents.jsx
import { FaTrash } from 'react-icons/fa';
import { GiFlowerTwirl } from 'react-icons/gi';

const UpcomingEvents = () => {
  return (
    <div className="bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl p-6 text-white">
      <h2 className="text-xl font-bold mb-6">Upcoming Events</h2>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl">
          <FaTrash className="text-2xl" />
          <div>
            <p className="font-semibold">Wedding - Sharma Family</p>
            <p className="text-white/80 text-sm">Dec 15, 2023 • 4:00 PM</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl">
          <GiFlowerTwirl className="text-2xl" />
          <div>
            <p className="font-semibold">Engagement - Patel & Co.</p>
            <p className="text-white/80 text-sm">Dec 20, 2023 • 6:00 PM</p>
          </div>
        </div>
      </div>
      
      <button className="w-full mt-6 py-3 bg-white text-violet-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-200">
        View Calendar
      </button>
    </div>
  );
};

export default UpcomingEvents;