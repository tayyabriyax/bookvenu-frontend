// components/dashboard/SupportCard.jsx
import { FaUsers } from 'react-icons/fa';

const SupportCard = () => {
  return (
    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 text-white">
      <div className="text-center">
        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
          <FaUsers className="text-2xl" />
        </div>
        <h3 className="text-xl font-bold mb-2">Need Help?</h3>
        <p className="text-white/80 mb-6">Our support team is here to help you 24/7</p>
        <button className="w-full py-3 bg-white text-emerald-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-200">
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default SupportCard;