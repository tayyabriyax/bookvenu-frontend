// components/dashboard/VenuesGrid.jsx
'use client';

import { useState, useEffect } from 'react';
import VenueCard from '../../organizer/dashboard/components/VenueCard';
import { venueForOrganizer, venueForPublic } from '@/app/organizer/dashboard/venue/action';
import { usePathname } from "next/navigation";



const VenuesGrid = ({ filters }) => {
  const pathname = usePathname();
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVenues = async () => {
      setLoading(true);
      try {
        let response;

        if (pathname.startsWith("/organizer")) {
          response = await venueForOrganizer();
        } else {
          // 🔥 filters passed here
          response = await venueForPublic(filters);
        }

        const transformedVenues = response.lawns.map((venue, index) => ({
          id: venue._id,
          name: venue.name,
          type: "Lawn",
          location: `${venue.city}, ${venue.address}`,
          rating: 4.5,
          status: venue.status === "pending" ? "Pending" : "Active",
          imageColor: getImageColor(index),
          amenities: venue.amenities,
          capacity: venue.capacity,
          images: venue.images,
        }));

        setVenues(transformedVenues);
      } catch (error) {
        console.error("Error fetching venues:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, [pathname, filters]); 

  // Helper function to assign gradient colors based on index
  const getImageColor = (index) => {
    const colors = [
      "from-violet-400 to-purple-400",
      "from-emerald-400 to-teal-400",
      "from-amber-400 to-orange-400",
      "from-rose-400 to-pink-400"
    ];
    return colors[index % colors.length];
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
            <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
      {venues.map((venue) => (
        <VenueCard
          key={venue.id}
          id={venue.id}
          name={venue.name}
          type={venue.type}
          location={venue.location}
          rating={venue.rating}
          //   bookings={venue.bookings}
          //   revenue={venue.revenue}
          status={venue.status}
          imageColor={venue.imageColor}
          amenities={venue.amenities}
          capacity={venue.capacity}
          images={venue.images}
          iseditable={false}
        />
      ))}
    </div>
  );
};

export default VenuesGrid;