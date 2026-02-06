// components/dashboard/Header.jsx
'use client';

import { useState, useEffect } from 'react';
import {
  FaUser, FaBell, FaCog, FaHome, FaChevronLeft, FaSearch,
  FaMoon, FaSun, FaSignOutAlt, FaBars, FaTimes, FaUserCircle,
  FaCalendar, FaChartLine, FaEnvelope
} from 'react-icons/fa';
import { GiFlowerTwirl, GiPartyPopper } from 'react-icons/gi';
import { useRouter } from 'next/navigation';

const Header = ({
  title = "Organizer Dashboard",
  subtitle = "Manage your venues and bookings",
  showBackButton = false,
  showSearch = false,
  showNotifications = true,
  showSettings = true,
  showHome = false,
  showDarkMode = false,
  showMobileMenu = false,
  pageName = null,
  user = {
    name: "John Organizer",
    role: "Venue Manager",
    avatarColor: "from-violet-500 to-purple-500",
    email: "john@bookvenu.com"
  },
  notificationCount = 3,
  onSearch = (query) => console.log('Search:', query),
  onNotificationClick = () => console.log('Notifications clicked'),
  onSettingsClick = () => console.log('Settings clicked'),
  onProfileClick = () => console.log('Profile clicked'),
  customActions = []
}) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotificationsMenu, setShowNotificationsMenu] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Fix hydration by only rendering client-side features after mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleBack = () => {
    router.back();
  };

  const handleHome = () => {
    router.push('/dashboard');
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  const handleNotificationClick = () => {
    setShowNotificationsMenu(!showNotificationsMenu);
    setShowUserMenu(false);
    if (onNotificationClick) onNotificationClick();
  };

  const handleUserClick = () => {
    setShowUserMenu(!showUserMenu);
    setShowNotificationsMenu(false);
    if (onProfileClick) onProfileClick();
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Add dark mode logic here
  };

  // Sample notifications
  const notifications = [
    { id: 1, message: "New booking received for Royal Palace", time: "2 min ago", read: false },
    { id: 2, message: "Venue verification approved", time: "1 hour ago", read: true },
    { id: 3, message: "Payment received for booking #BK001", time: "3 hours ago", read: true }
  ];

  const userMenuItems = [
    { label: "My Profile", icon: <FaUserCircle />, action: () => router.push('/profile') },
    { label: "Calendar", icon: <FaCalendar />, action: () => router.push('/calendar') },
    { label: "Analytics", icon: <FaChartLine />, action: () => router.push('/analytics') },
    { label: "Messages", icon: <FaEnvelope />, badge: 5, action: () => router.push('/messages') },
    { label: "Logout", icon: <FaSignOutAlt />, action: () => console.log('Logout') }
  ];

  return (
    <>
      {/* Header Container - Use consistent static classes */}
      <div className="sticky top-0 z-50 bg-gradient-to-br from-white/90 via-white/80 to-white/70 backdrop-blur-md border-b border-white/30 shadow-sm">
        <div className="px-3 sm:px-4 md:px-6 py-3 md:py-4">
          {/* Main Header Content */}
          <div className="flex items-center justify-between">
            {/* Left Section - Logo & Title */}
            <div className="flex items-center space-x-3 md:space-x-4">
              {/* Mobile Menu Button - Only render on client */}
              {showMobileMenu && isClient && (
                <button
                  onClick={() => setShowMobileNav(!showMobileNav)}
                  className="lg:hidden p-2 rounded-xl bg-gradient-to-r from-violet-100 to-purple-100 text-violet-600 hover:shadow-md transition-all duration-200"
                >
                  {showMobileNav ? <FaTimes /> : <FaBars />}
                </button>
              )}

              {/* Logo/Back Button */}
              <div className="flex items-center space-x-3">
                {showBackButton ? (
                  <button
                    onClick={handleBack}
                    className=" cursor-pointer flex-shrink-0 p-2.5 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl hover:shadow-md hover:scale-105 transition-all duration-200 active:scale-95"
                  >
                    <FaChevronLeft className="text-lg" />
                  </button>
                ) : showHome ? (
                  <button
                    onClick={handleHome}
                    className="cursor-pointer flex-shrink-0 p-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:shadow-md hover:scale-105 transition-all duration-200"
                  >
                    <FaHome className="text-lg" />
                  </button>
                ) : (
                  <div className="hidden sm:flex items-center justify-center w-12 h-12 bg-gradient-to-r from-violet-600 to-pink-600 rounded-2xl shadow-lg">
                    <GiFlowerTwirl className="text-white text-xl" />
                  </div>
                )}

                {/* Title Section - Keep this static for SSR */}
                <div className="min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent truncate">
                      {title}
                    </h1>

                    {/* Page Name Badge */}
                    {pageName && (
                      <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-semibold rounded-full shadow-sm mr-[19px] md:mr-0">                        {pageName}
                      </span>
                    )}
                  </div>

                  <p className="text-gray-600 text-xs sm:text-sm md:text-base mt-0.5 truncate max-w-xs sm:max-w-md md:max-w-lg">
                    {subtitle}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Section - Actions */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Search Bar (Desktop) */}
              {showSearch && (
                <div className="hidden md:block w-48 lg:w-64">
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={handleSearch}
                      placeholder="Search..."
                      className="w-full pl-10 pr-4 py-2.5 bg-white/80 rounded-xl border border-violet-100 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400 text-sm backdrop-blur-sm"
                    />
                  </div>
                </div>
              )}

              {/* Dark Mode Toggle - Only on client */}
              {showDarkMode && isClient && (
                <button
                  onClick={toggleDarkMode}
                  className="hidden sm:flex p-2.5 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-600 rounded-xl hover:shadow-md transition-all duration-200"
                >
                  {darkMode ? <FaSun /> : <FaMoon />}
                </button>
              )}

              {/* Custom Actions */}
              {customActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className={`p-2.5 rounded-xl hover:shadow-md transition-all duration-200 ${action.className || 'bg-white text-gray-700'}`}
                  title={action.title}
                >
                  {action.icon}
                </button>
              ))}

              {/* Notifications - Use suppressHydrationWarning for dynamic content */}
              {showNotifications && (
                <div className="relative">
                  <button
                    onClick={handleNotificationClick}
                    className="relative p-2.5 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 group"
                  >
                    <FaBell className="text-gray-600 group-hover:text-violet-600 transition-colors" />
                    {notificationCount > 0 && (
                      <span
                        className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center"
                        suppressHydrationWarning
                      >
                        {notificationCount}
                      </span>
                    )}
                  </button>

                  {/* Notifications Dropdown - Only on client */}
                  {showNotificationsMenu && isClient && (
                    <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 animate-fadeIn">
                      <div className="p-4 border-b border-gray-100">
                        <h3 className="font-bold text-gray-800">Notifications</h3>
                        <p className="text-sm text-gray-600">{notifications.length} new updates</p>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map((notif) => (
                          <div
                            key={notif.id}
                            className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors ${!notif.read ? 'bg-violet-50' : ''}`}
                          >
                            <p className="text-sm text-gray-800 mb-1">{notif.message}</p>
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-gray-500">{notif.time}</span>
                              {!notif.read && (
                                <span className="w-2 h-2 bg-violet-500 rounded-full"></span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      <button className="w-full p-3 text-center text-violet-600 font-medium hover:bg-violet-50 rounded-b-2xl transition-colors">
                        View All Notifications
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Settings */}
              {showSettings && (
                <button
                  onClick={onSettingsClick}
                  className="hidden sm:flex p-2.5 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <FaCog className="text-gray-600 hover:text-violet-600 transition-colors" />
                </button>
              )}

              {/* User Profile */}
              <div className="relative">
                <button
                  onClick={handleUserClick}
                  className="flex items-center space-x-2 p-1.5 sm:p-2 rounded-xl hover:bg-white/50 transition-all duration-200 group cursor-pointer"
                >
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 ${user.avatarColor} rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-200 border-2 border-purple-200`}>
                    <FaUser className="text-purple-600 text-sm sm:text-base" />
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-sm font-semibold text-purple-800 truncate max-w-24">{user.name}</p>
                    <p className="text-xs text-purple-500 truncate max-w-24">{user.role}</p>
                  </div>
                </button>

                {/* User Menu Dropdown - Only on client */}
                {showUserMenu && isClient && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 animate-fadeIn">
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 ${user.avatarColor} rounded-xl flex items-center justify-center`}>
                          <FaUser className="text-purple-600 text-lg" />
                        </div>
                        <div>
                          <h3 className="font-bold text-purple-800">{user.name}</h3>
                          <p className="text-sm text-purple-600">{user.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      {userMenuItems.map((item, index) => (
                        <button
                          key={index}
                          onClick={item.action}
                          className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-gray-600">{item.icon}</span>
                            <span className="text-gray-800">{item.label}</span>
                          </div>
                          {item.badge && (
                            <span className="px-2 py-0.5 bg-rose-100 text-rose-700 text-xs rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Search Button */}
              {showSearch && (
                <button className="md:hidden p-2.5 bg-gradient-to-r from-violet-100 to-purple-100 text-violet-600 rounded-xl">
                  <FaSearch />
                </button>
              )}
            </div>
          </div>

          {/* Mobile Search Bar (Expanded) */}
          {showSearch && (
            <div className="mt-4 md:hidden">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-violet-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Search venues, bookings, customers..."
                  className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border-2 border-violet-100 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400 shadow-sm"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu - Only on client */}
      {showMobileNav && showMobileMenu && isClient && (
        <div className="lg:hidden fixed inset-0 top-16 z-40 bg-gradient-to-br from-white/95 via-white/90 to-white/85 backdrop-blur-lg">
          <div className="p-6">
            <div className="space-y-2">
              <button className="w-full flex items-center space-x-3 p-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl">
                <FaHome className="text-violet-600" />
                <span className="font-semibold text-gray-800">Dashboard</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-4 hover:bg-gray-50 rounded-2xl transition-colors">
                <FaCalendar className="text-emerald-600" />
                <span className="font-semibold text-gray-800">Calendar</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-4 hover:bg-gray-50 rounded-2xl transition-colors">
                <GiPartyPopper className="text-amber-600" />
                <span className="font-semibold text-gray-800">Venues</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-4 hover:bg-gray-50 rounded-2xl transition-colors">
                <FaChartLine className="text-blue-600" />
                <span className="font-semibold text-gray-800">Analytics</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style> */}
    </>
  );
};

export default Header;