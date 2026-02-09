// components/dashboard/VenuesGrid.jsx
'use client';

import { useState, useEffect } from 'react';
import VenueCard from './VenueCard';
import { venueForOrganizer } from '../venue/action';


const VenuesGrid = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you'd fetch from your API endpoint
    // For now, we'll use the provided data structure
    const fetchVenues = async () => {
      try {
        // Simulating API call
        const response = await venueForOrganizer()

        // Transform API data to match VenueCard props
        const transformedVenues = response.lawns.map((venue, index) => ({
          id: venue._id,
          name: venue.name,
          type: venue.venueType || "Venue", // You can make this dynamic based on venue type
          location: `${venue.city}, ${venue.address}`,
          rating: 4.5, // You might need to calculate this from reviews
          bookings: 15, // You might need to fetch this from bookings API
          revenue: "₹85,000", // Calculate from bookings
          status: venue.status === "pending" ? "Pending" : "Active",
          imageColor: getImageColor(index), // Helper function for gradient
          amenities: venue.amenities,
          capacity: venue.capacity,
          pricing: venue.perHeadPricing,
          images: venue.images,
          description: venue.description
        }));

        setVenues(transformedVenues);
      } catch (error) {
        console.error("Error fetching venues:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);



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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {venues.map((venue) => (
        <VenueCard 
          key={venue.id}
          id={venue.id}
          name={venue.name}
          type={venue.type}
          location={venue.location}
          rating={venue.rating}
          bookings={venue.bookings}
          revenue={venue.revenue}
          status={venue.status}
          imageColor={venue.imageColor}
          amenities={venue.amenities}
          capacity={venue.capacity}
          images={venue.images}
          iseditable={true}
        />
      ))}
    </div>
  );
};

export default VenuesGrid;