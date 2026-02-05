// app/organizer-dashboard/page.jsx
"use client";
import React from 'react';
import Header from '../dashboard/components/Header';
import StatsGrid from '../dashboard/components/StatsGrid';
import QuickActions from '../dashboard/components/QuickActions';
import VenuesSection from '../dashboard/components/VenuesSection';
import SidebarContent from '../dashboard/components/SidebarContent';

const OrganizerDashboard = () => {
  return (
    <div> <Header />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-rose-50 to-amber-50 p-3 sm:p-4 md:p-6">

        <QuickActions />


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mt-6 lg:mt-8">
          <div className="lg:col-span-2">

            <StatsGrid />
            <VenuesSection />
          </div>

          <div className="space-y-6 lg:space-y-8 ">
            <SidebarContent />
          </div>
        </div>
      </div>
    </div>
  );
};


export default OrganizerDashboard;