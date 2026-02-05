// components/dashboard/VenueCard.jsx
'use client';

import {
  FaMapMarkerAlt,
  FaStar,
  FaCalendarCheck,
  FaEye,
  FaEdit,
  FaTrash,
  FaUsers,
  FaRupeeSign
} from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const VenueCard = ({
  id,
  name,
  type,
  location,
  rating,
  bookings,
  revenue,
  status,
  imageColor,
  amenities = [],
  capacity,
  images = [],
  pricing = []
}) => {
  const router = useRouter();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Venue Image/Header */}
      <div className="h-48 relative">
        {images.length > 0 ? (
          <Image
            src={images[0].url}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className={`h-full bg-gradient-to-r ${imageColor}`}></div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              status === 'Active'
                ? 'bg-emerald-100 text-emerald-700'
                : status === 'pending'
                ? 'bg-amber-100 text-amber-700'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {status}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-2xl font-bold text-white">{name}</h3>
          <div className="flex items-center gap-2 text-white/90 text-sm">
            <FaMapMarkerAlt />
            <span>{location}</span>
            <span className="ml-2 flex items-center gap-1">
              <FaUsers />
              <span>{capacity} Guests</span>
            </span>
          </div>
        </div>
      </div>

      {/* Venue Details */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm">
              {type}
            </span>
            <div className="flex items-center gap-1">
              <FaStar className="text-amber-400" />
              <span className="font-semibold">{rating}</span>
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-500">Revenue</p>
            <p className="text-xl font-bold text-gray-800">{revenue}</p>
          </div>
        </div>

        {/* Pricing Info */}
        {pricing.length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2 font-semibold">Pricing (per head):</p>
            <div className="flex flex-wrap gap-2">
              {pricing.slice(0, 3).map((item, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm flex items-center gap-1"
                >
                  <FaRupeeSign className="text-xs" />
                  {item.dishName}: {formatPrice(item.price)}
                </span>
              ))}
              {pricing.length > 3 && (
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  +{pricing.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-6">
          {amenities.slice(0, 4).map((amenity, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
            >
              {amenity}
            </span>
          ))}
          {amenities.length > 4 && (
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              +{amenities.length - 4} more
            </span>
          )}
        </div>

        {/* Stats & Actions */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <FaCalendarCheck className="text-gray-400" />
              <span className="font-semibold">{bookings} bookings</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <FaUsers />
              <span className="text-sm">{capacity} capacity</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push(`/organizer/dashboard/venue/venue-detail?venue_id=${id}`)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="View Details"
            >
              <FaEye className="text-gray-600" />
            </button>

            <button
              onClick={() => router.push(`/dashboard/venues/${id}/edit`)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Edit Venue"
            >
              <FaEdit className="text-violet-600" />
            </button>

            <button
              onClick={() => router.push(`/dashboard/venues/${id}/delete`)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Delete Venue"
            >
              <FaTrash className="text-rose-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueCard;