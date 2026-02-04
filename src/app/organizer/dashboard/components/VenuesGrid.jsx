// components/dashboard/VenuesGrid.jsx
import VenueCard from './VenueCard';

const VenuesGrid = () => {
  const venues = [
    {
      id: 1,
      name: "Grand Palace Hotel",
      type: "Hotel",
      location: "Mumbai",
      rating: 4.8,
      bookings: 24,
      revenue: "₹85,000",
      status: "Active",
      imageColor: "from-violet-400 to-purple-400",
      amenities: ["500 Guests", "Garden", "Pool", "AC Hall"]
    },
    {
      id: 2,
      name: "Royal Banquet Hall",
      type: "Banquet Hall",
      location: "Delhi",
      rating: 4.5,
      bookings: 18,
      revenue: "₹65,000",
      status: "Active",
      imageColor: "from-emerald-400 to-teal-400",
      amenities: ["300 Guests", "Parking", "Stage", "Catering"]
    },
    {
      id: 3,
      name: "Sky Garden Restaurant",
      type: "Restaurant",
      location: "Bangalore",
      rating: 4.2,
      bookings: 12,
      revenue: "₹45,000",
      status: "Pending",
      imageColor: "from-amber-400 to-orange-400",
      amenities: ["150 Guests", "Rooftop", "Bar", "Music"]
    },
    {
      id: 4,
      name: "Lakeview Resorts",
      type: "Resort",
      location: "Goa",
      rating: 4.9,
      bookings: 32,
      revenue: "₹1,20,000",
      status: "Active",
      imageColor: "from-rose-400 to-pink-400",
      amenities: ["1000 Guests", "Lake View", "Spa", "Pool Party"]
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {venues.map((venue) => (
        <VenueCard 
          key={venue.id}
          name={venue.name}
          type={venue.type}
          location={venue.location}
          rating={venue.rating}
          bookings={venue.bookings}
          revenue={venue.revenue}
          status={venue.status}
          imageColor={venue.imageColor}
          amenities={venue.amenities}
        />
      ))}
    </div>
  );
};

export default VenuesGrid;