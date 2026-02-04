// components/dashboard/StatsGrid.jsx
import { FaHotel, FaCalendarCheck, FaDollarSign, FaStar } from 'react-icons/fa';
import StatsCard from './StatsCard';

const StatsGrid = () => {
  const stats = [
    { label: "Total Venues", value: "12", icon: <FaHotel />, color: "from-violet-500 to-purple-500", change: "+2" },
    { label: "Bookings", value: "48", icon: <FaCalendarCheck />, color: "from-emerald-500 to-teal-500", change: "+8" },
    { label: "Revenue", value: "₹2.4L", icon: <FaDollarSign />, color: "from-amber-500 to-orange-500", change: "+12%" },
    { label: "Rating", value: "4.7★", icon: <FaStar />, color: "from-rose-500 to-pink-500", change: "+0.2" }
  ];

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
      {stats.map((stat, index) => (
        <StatsCard 
          key={index}
          label={stat.label}
          value={stat.value}
          icon={stat.icon}
          color={stat.color}
          change={stat.change}
        />
      ))}
    </div>
  );
};

export default StatsGrid;