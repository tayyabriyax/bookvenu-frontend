// app/setup/page.jsx
"use client";
import React, { useState } from 'react';
import TabsNavigation from './components/TabsNavigation';
import DishesTile from './components/DishesTile';
import BookingsTile from './components/BookingsTile';
import StaffTile from './components/StaffTile';
import ReviewsTile from './components/ReviewsTile ';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import Header from '../components/Header';

const SetupPage = () => {
  const [activeTab, setActiveTab] = useState('dishes');
  
  // All available tabs
  const tabs = [
    { id: 'dishes', name: 'Dishes', color: 'violet' },
    { id: 'bookings', name: 'Bookings', color: 'emerald' },
    { id: 'staff', name: 'Staff', color: 'blue' },
    { id: 'reviews', name: 'Reviews', color: 'amber' },
    { id: 'settings', name: 'Settings', color: 'gray' }
  ];

  // Find current tab index
  const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
  
  // Get next tab for mobile navigation
  const getNextTab = () => {
    const nextIndex = (currentIndex + 1) % tabs.length;
    return tabs[nextIndex];
  };
  
  // Get previous tab for mobile navigation
  const getPrevTab = () => {
    const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    return tabs[prevIndex];
  };

  // Render the active component
  const renderActiveComponent = () => {
    switch(activeTab) {
      case 'dishes':
        return <DishesTile />;
      case 'bookings':
        return <BookingsTile />;
      case 'staff':
        return <StaffTile />;
      case 'reviews':
        return <ReviewsTile />;
      case 'settings':
        return (
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Settings</h2>
            <p className="text-gray-600">Settings component will be here</p>
          </div>
        );
      default:
        return <DishesTile />;
    }
  };

  // Get color for current tab
  const getTabColor = (tabId) => {
    const tab = tabs.find(t => t.id === tabId);
    return tab?.color || 'violet';
  };

  return (
    <>
    <Header
    title='Venue'
    subtitle='Manage Your Detail Here'
    pageName={'Setup & Management'}
    showSettings={false}
    showBackButton={true}

    
    />
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-rose-50 to-amber-50 p-4 md:p-6">
      
      <TabsNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Content - Single column for all screen sizes */}
      <div className="mt-6 md:mt-8">
        {/* Active Tab Indicator for Desktop */}
        <div className="hidden lg:flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className={`px-4 py-2 bg-gradient-to-r from-${getTabColor(activeTab)}-500 to-${getTabColor(activeTab)}-600 text-white font-semibold rounded-xl`}>
              {tabs.find(t => t.id === activeTab)?.name}
            </div>
            <p className="text-gray-600">
              Active Tab: <span className="font-semibold text-gray-800">{tabs.find(t => t.id === activeTab)?.name}</span>
            </p>
          </div>
          
          {/* Desktop Tab Navigation */}
          <div className="flex items-center space-x-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? `bg-gradient-to-r from-${tab.color}-500 to-${tab.color}-600 text-white shadow-md`
                    : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-800 border border-gray-200'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Active Component - Shows only one at a time */}
        <div className="mb-6">
          {renderActiveComponent()}
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <div className="flex justify-between items-center mb-6">
            <button 
              onClick={() => setActiveTab(getPrevTab().id)}
              className={`px-4 py-3 bg-gradient-to-r from-${getTabColor(getPrevTab().id)}-500 to-${getTabColor(getPrevTab().id)}-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 inline-flex items-center space-x-2`}
            >
              <FaChevronLeft />
              <span>{getPrevTab().name}</span>
            </button>
            
            <div className={`px-4 py-2 bg-gradient-to-r from-${getTabColor(activeTab)}-500 to-${getTabColor(activeTab)}-600 text-white font-semibold rounded-xl`}>
              {tabs.find(t => t.id === activeTab)?.name}
            </div>
            
            <button 
              onClick={() => setActiveTab(getNextTab().id)}
              className={`px-4 py-3 bg-gradient-to-r from-${getTabColor(getNextTab().id)}-500 to-${getTabColor(getNextTab().id)}-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 inline-flex items-center space-x-2`}
            >
              <span>{getNextTab().name}</span>
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats - Always visible */}
      {/* <div className="mt-8">
        <div className="bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl md:rounded-2xl p-4 md:p-6 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold">12</p>
              <p className="text-white/80 text-sm md:text-base">Active {tabs.find(t => t.id === activeTab)?.name}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold">48</p>
              <p className="text-white/80 text-sm md:text-base">Total This Month</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold">₹2.4L</p>
              <p className="text-white/80 text-sm md:text-base">Revenue</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold">94%</p>
              <p className="text-white/80 text-sm md:text-base">Satisfaction</p>
            </div>
          </div>
        </div>
      </div> */}
    </div>
    </>
  );
};

export default SetupPage;