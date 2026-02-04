"use client";

import {
  FaUtensils,
  FaCalendarCheck,
  FaUsers,
  FaStar,
  FaCog,
  FaComments,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";
import { useState, useRef } from "react";

const TabsNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "dishes", title: "Dishes", icon: <FaUtensils />, badge: "6" },
    { id: "bookings", title: "Bookings", icon: <FaCalendarCheck />, badge: "6" },
    { id: "staff", title: "Staff", icon: <FaUsers />, badge: "4" },
    { id: "reviews", title: "Reviews", icon: <FaStar />, badge: "12" },
    { id: "feedback", title: "Feedback", icon: <FaComments />, badge: "New" },
    { id: "settings", title: "Settings", icon: <FaCog />, badge: "" }
  ];

  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (dir) => {
    scrollContainerRef.current?.scrollBy({
      left: dir === "left" ? -200 : 200,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setShowLeftArrow(el.scrollLeft > 0);
    setShowRightArrow(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  return (
    <div className="mb-6 md:mb-8">
      {/* Desktop */}
      <div className="hidden lg:flex border-b border-gray-200">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-4 border-b-2 font-semibold transition ${
              activeTab === tab.id
                ? "border-violet-600 text-violet-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <div className="flex flex-col items-center space-y-1">
              {tab.icon}
              <span className="text-sm">{tab.title}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Mobile */}
      <div className="lg:hidden relative">
        {showLeftArrow && (
          <button onClick={() => scroll("left")} className="arrow left-0">
            <FaChevronLeft />
          </button>
        )}

        {showRightArrow && (
          <button onClick={() => scroll("right")} className="arrow right-0">
            <FaChevronRight />
          </button>
        )}

        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto hide-scrollbar border-b border-gray-200"
        >
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 border-b-2 ${
                activeTab === tab.id
                  ? "border-violet-600 text-violet-600"
                  : "border-transparent text-gray-500"
              }`}
            >
              <div className="flex flex-col items-center min-w-[80px]">
                {tab.icon}
                <span className="text-xs">{tab.title}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabsNavigation;
