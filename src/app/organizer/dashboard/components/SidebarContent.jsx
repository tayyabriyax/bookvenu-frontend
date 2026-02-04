// components/dashboard/SidebarContent.jsx
import RecentBookings from './RecentBookings';
import UpcomingEvents from './UpcomingEvents';
import SupportCard from './SupportCard';

const SidebarContent = () => {
  return (
    <>
      <RecentBookings />
      <UpcomingEvents />
      <SupportCard />
    </>
  );
};

export default SidebarContent;