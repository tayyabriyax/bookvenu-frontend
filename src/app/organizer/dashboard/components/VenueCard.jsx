// components/dashboard/VenueCard.jsx
import { FaMapMarkerAlt, FaStar, FaCalendarCheck, FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const VenueCard = ({
  name,
  type,
  location,
  rating,
  bookings,
  revenue,
  status,
  imageColor,
  amenities
}) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Venue Image/Header */}
      <div className={`h-48 bg-gradient-to-r ${imageColor} relative`}>
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
            {status}
          </span>
        </div>
        <div className="absolute bottom-4 left-4">
          <h3 className="text-2xl font-bold text-white">{name}</h3>
          <div className="flex items-center space-x-2 text-white/90">
            <FaMapMarkerAlt /> <span>{location}</span>
          </div>
        </div>
      </div>
      
      {/* Venue Details */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm">
              {type}
            </span>
            <div className="flex items-center space-x-1">
              <FaStar className="text-amber-400" />
              <span className="font-semibold">{rating}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Revenue</p>
            <p className="text-xl font-bold text-gray-800">{revenue}</p>
          </div>
        </div>
        
        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-6">
          {amenities.map((amenity, index) => (
            <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              {amenity}
            </span>
          ))}
        </div>
        
        {/* Stats & Actions */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FaCalendarCheck className="text-gray-400" />
              <span className="font-semibold">{bookings} bookings</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <FaEye className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <FaEdit className="text-violet-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <FaTrash className="text-rose-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueCard;