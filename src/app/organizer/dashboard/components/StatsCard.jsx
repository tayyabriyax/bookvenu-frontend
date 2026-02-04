// components/dashboard/StatsCard.jsx
import { FaChartLine } from 'react-icons/fa';

const StatsCard = ({ label, value, icon, color, change }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 mb-2">{label}</p>
          <p className="text-3xl font-bold text-gray-800">{value}</p>
          <span className="inline-flex items-center text-sm text-emerald-600 font-semibold mt-2">
            <FaChartLine className="mr-1" /> {change}
          </span>
        </div>
        <div className={`w-14 h-14 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center`}>
          <div className="text-white text-2xl">{icon}</div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;