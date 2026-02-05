// components/dashboard/VenuesGrid.jsx
'use client';

import { useState, useEffect } from 'react';
import VenueCard from './VenueCard';

const VenuesGrid = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you'd fetch from your API endpoint
    // For now, we'll use the provided data structure
    const fetchVenues = async () => {
      try {
        // Simulating API call
        const response = {
          "lawns": [
            {
              "_id": "6984713b7a6bc404ac560cb8",
              "ownerId": "69830bb47a6bc404ac560c88",
              "name": "Royal Palace Lawn",
              "city": "Lahore",
              "address": "Model Town",
              "capacity": 500,
              "perHeadPricing": [
                {
                  "dishName": "Chicken",
                  "price": 1500,
                  "_id": "6984713b7a6bc404ac560cb9"
                },
                {
                  "dishName": "Beef",
                  "price": 2000,
                  "_id": "6984713b7a6bc404ac560cba"
                }
              ],
              "amenities": [
                "Parking",
                "AC",
                "Stage",
                "Generator"
              ],
              "description": "Premium wedding lawn with full services",
              "images": [
                {
                  "url": "https://res.cloudinary.com/dzr9qivjg/image/upload/v1770287418/bookvenu/lawns/gc8zd3xtnz7eaqi7kpg8.png",
                  "public_id": "bookvenu/lawns/d9tcbchl5lc22u1klvql",
                  "_id": "6984713b7a6bc404ac560cbb"
                },
                  {
                  "url": "https://res.cloudinary.com/dzr9qivjg/image/upload/v1770287418/bookvenu/lawns/gc8zd3xtnz7eaqi7kpg8.png",
                  "public_id": "bookvenu/lawns/d9tcbchl5lc22u1klvql",
                  "_id": "6984713b7a6bc404ac560cb3"
                }
              ],
              "status": "pending",
              "unavailableDates": [],
              "createdAt": "2026-02-05T10:30:19.359Z",
              "updatedAt": "2026-02-05T10:30:19.359Z",
              "__v": 0
            },
            {
              "_id": "69845a3e7a6bc404ac560ca7",
              "ownerId": "69830bb47a6bc404ac560c88",
              "name": "Royal Palace Lawn 2",
              "city": "Lahore",
              "address": "Garden Town",
              "capacity": 300,
              "perHeadPricing": [
                {
                  "dishName": "Chicken",
                  "price": 1200,
                  "_id": "69845a3e7a6bc404ac560ca8"
                }
              ],
              "amenities": [
                "Parking",
                "Garden",
                "Pool",
                "Catering"
              ],
              "description": "Beautiful garden lawn for events",
              "images": [
              
              ],
              "status": "active",
              "unavailableDates": [],
              "createdAt": "2026-02-05T08:52:14.076Z",
              "updatedAt": "2026-02-05T08:52:14.076Z",
              "__v": 0
            }
          ]
        };

        // Transform API data to match VenueCard props
        const transformedVenues = response.lawns.map((venue, index) => ({
          id: venue._id,
          name: venue.name,
          type: "Lawn", // You can make this dynamic based on venue type
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
        />
      ))}
    </div>
  );
};

export default VenuesGrid;