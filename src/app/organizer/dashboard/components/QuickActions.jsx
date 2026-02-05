"use client";

import { useRouter } from "next/navigation";
import { FaPlus, FaUser, FaCog, FaChartLine } from "react-icons/fa";
import QuickActionTile from "./QuickActionTile";

const QuickActions = () => {
  const router = useRouter();

  const quickActions = [
    { 
      title: "Add Venue", 
      icon: <FaPlus />, 
      description: "List new venue", 
      color: "bg-gradient-to-r from-violet-500 to-purple-500",
      path: "/organizer/dashboard/venue/add-venue" // route to navigate
    },
    { 
      title: "Profile", 
      icon: <FaUser />, 
      description: "Edit profile", 
      color: "bg-gradient-to-r from-emerald-500 to-teal-500",
      path: "/organizer/profile"
    },
    { 
      title: "Setup & Management", 
      icon: <FaCog />, 
      description: "Dishes & Bookings", 
      color: "bg-gradient-to-r from-amber-500 to-orange-500",
      path: "/organizer/dashboard/setup"
    },
    { 
      title: "Analytics", 
      icon: <FaChartLine />, 
      description: "View reports", 
      color: "bg-gradient-to-r from-rose-500 to-pink-500",
      path: "/organizer/analytics"
    }
  ];

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Quick Actions</h2>
 
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 cursor-pointer">
        {quickActions.map((action, index) => (
          <QuickActionTile 
            key={index}
            title={action.title}
            icon={action.icon}
            description={action.description}
            color={action.color}
            onClick={() => router.push(action.path)} // navigate on click
          />
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
