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
import { useState } from 'react';
import toast from 'react-hot-toast';

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
  pricing = [],
  iseditable,
  onDelete // Added prop for delete handler
}) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = (e) => {
  e.stopPropagation(); // Prevent card click

  // Show a toast with custom confirmation
  toast((t) => (
    <div className="flex flex-col gap-3">
      <p className="text-sm">Are you sure you want to delete "{name}"? This action cannot be undone.</p>
      <div className="flex justify-end gap-2 mt-2">
        <button
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
          onClick={() => toast.dismiss(t.id)}
        >
          Cancel
        </button>
        <button
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm flex items-center justify-center"
          onClick={async () => {
            setIsDeleting(true); // show spinner
            try {
              if (onDelete) {
                await onDelete(id); // remove from parent state
                await deleteVenuebyOrganizer(id); // call API
                toast.success("Venue deleted successfully");
              }
              toast.dismiss(t.id); // close confirmation toast
            } catch (err) {
              console.error("Error deleting venue:", err);
              toast.error("Failed to delete venue");
            } finally {
              setIsDeleting(false);
            }
          }}
        >
          {isDeleting ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Delete"
          )}
        </button>
      </div>
    </div>
  ), { duration: Infinity }); // keep toast open until action
};

  

  const handleCardClick = (e) => {
    // Don't navigate if clicked on delete button or if we're in delete mode
    if (e.target.closest('.delete-btn') || isDeleting) {
      return;
    }

    if (iseditable) {
      router.push(`/organizer/dashboard/venue/venue-detail?venue_id=${id}`);
    } else {
      router.push(`public/public-venues/venue-detail?venue_id=${id}`);
    }
  };



  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer relative group"
    >
      {/* Venue Image/Header */}
      <div className="h-48 relative">
        {images.length > 0 ? (
          <Image
            src={images[0].url}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        ) : (
          <div className={`h-full bg-gradient-to-r ${imageColor}`}></div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${status === 'Active' || status === 'active'
                ? 'bg-emerald-100 text-emerald-700'
                : status === 'pending'
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-gray-100 text-gray-700'
              }`}
          >
            {status}
          </span>
        </div>

        {/* Delete Button - Top Right (Only for editable cards) */}
        {iseditable && (
          <div className="absolute top-4 right-4 flex gap-2 delete-btn">
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg"
              title="Delete Venue"
            >
              {isDeleting ? (
                <div className="w-4 h-4 border-2 border-rose-600 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <FaTrash className="text-rose-600" />
              )}
            </button>


          </div>
        )}

        {/* Venue Info Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-2xl font-bold text-white">{name}</h3>
          <div className="flex items-center gap-2 text-white/90 text-sm mt-1">
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
          {iseditable && (
            <div className="text-right">
              <p className="text-sm text-gray-500">Revenue</p>
              <p className="text-xl font-bold text-gray-800">{revenue}</p>
            </div>
          )}
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
            {iseditable && (
              <div className="flex items-center gap-2">
                <FaCalendarCheck className="text-gray-400" />
                <span className="font-semibold">{bookings} bookings</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-gray-600">
              <FaUsers />
              <span className="text-sm">{capacity} capacity</span>
            </div>
          </div>

          {/* Quick View Button (Optional) */}
          {!iseditable && (
            <button
              onClick={handleCardClick}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FaEye />
              <span className="text-sm">View Details</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VenueCard;