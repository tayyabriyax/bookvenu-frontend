import { useEffect, useState } from "react";
import { getBookingsforOrganizer } from "../venue/action";
import {
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaUser,
  FaCalendarAlt,
  FaMoneyBillWave
} from "react-icons/fa";

const RecentBookings = () => {
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecentBookingRequest = async () => {
    try {
      setLoading(true);
      setError(null);
      const recentBookingsData = await getBookingsforOrganizer();
      console.log("API Response:", recentBookingsData);

      // Check if data exists and has expected structure
      if (!recentBookingsData || !recentBookingsData.bookings) {
        throw new Error("Invalid data structure received from API");
      }

      // Map your API response into the format your component uses
      const bookings = recentBookingsData.bookings
       .filter(b => b.status.toLowerCase() === "pending")
      .map((b) => ({
        id: b._id,
        customer: b.customerId?.name || "N/A",
        customerEmail: b.customerId?.email || "",
        venue: b.lawnId?.name || "N/A",
        venueType: b.lawnId?.type || "Venue",
        amount: b.totalPrice || 0,
        status: b.status || "Pending",
        date: b.createdAt ? new Date(b.createdAt).toLocaleDateString() : "N/A",
        guestCount: b.guestCount || "N/A",
        eventDate: b.eventDate ? new Date(b.eventDate).toLocaleDateString() : "N/A"
      }));

      setRecentBookings(bookings);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      setError(error.message || "Failed to load bookings");
      // Set empty array to prevent errors
      setRecentBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentBookingRequest();
  }, []);

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
      case 'approved':
        return <FaCheckCircle className="text-emerald-500" />;
      case 'pending':
      case 'waiting':
        return <FaClock className="text-amber-500" />;
      case 'cancelled':
      case 'rejected':
        return <FaTimesCircle className="text-rose-500" />;
      default:
        return <FaClock className="text-gray-500" />;
    }
  };

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
      case 'approved':
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case 'pending':
      case 'waiting':
        return "bg-amber-50 text-amber-700 border-amber-200";
      case 'cancelled':
      case 'rejected':
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Customer Requests</h2>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="flex items-center justify-between p-4">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                  <div className="h-3 bg-gray-200 rounded w-24"></div>
                </div>
                <div className="space-y-2 text-right">
                  <div className="h-4 bg-gray-200 rounded w-20 ml-auto"></div>
                  <div className="h-6 bg-gray-200 rounded-full w-24 ml-auto"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Customer Requests</h2>
        </div>
        <div className="text-center py-8">
          <FaTimesCircle className="text-rose-400 text-4xl mx-auto mb-3" />
          <p className="text-gray-600">Error loading bookings</p>
          <p className="text-sm text-gray-500 mt-1">{error}</p>
          <button
            onClick={fetchRecentBookingRequest}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (recentBookings.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Customer Requests</h2>
        </div>
        <div className="text-center py-8">
          <FaCalendarAlt className="text-gray-400 text-4xl mx-auto mb-3" />
          <p className="text-gray-600">No booking requests yet</p>
          <p className="text-sm text-gray-500 mt-1">Customer requests will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Customer Requests</h2>
          <p className="text-sm text-gray-500 mt-1">
            Recent booking requests from customers
          </p>
        </div>
        <button
          onClick={fetchRecentBookingRequest}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Refresh
        </button>
      </div>

      <div className="space-y-1">
        {recentBookings.map((booking) => (
          <div
            key={booking.id}
            className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-xl border border-gray-100 transition-all duration-200 hover:border-gray-200 hover:shadow-sm"
          >
            {/* Left Side - Customer & Venue Info */}
            <div className="flex items-center gap-2">
              <div className="p-3  bg-blue-50 rounded-xl">
                <FaUser className="text-blue-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-gray-800">{booking.customer}</p>
                  {/* {booking.customerEmail && (
                    <span className="text-xs text-gray-500">({booking.customerEmail})</span>
                  )} */}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-gray-600">{booking.venue}</span>
                  {booking.venueType && (
                    <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
                      {booking.venueType}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                  {booking.date && (
                    <span className="flex items-center gap-1">
                      <FaCalendarAlt className="text-xs" />
                      Booked: {booking.date}
                    </span>
                  )}
                  {booking.eventDate && booking.eventDate !== "N/A" && (
                    <span className="flex items-center gap-1">
                      <FaCalendarAlt className="text-xs" />
                      Event: {booking.eventDate}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right Side - Amount & Status */}
            <div className="text-right">
              <div className="flex items-center gap-0 justify-end mb-1">
                <p className="font-bold text-gray-400">
                  {formatCurrency(booking.amount)}
                </p>
              </div>
              <div className="flex items-center gap-1 justify-end">
                <div className="flex items-center gap-1">
                  {getStatusIcon(booking.status)}
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 text-xs rounded-full border ${getStatusStyle(booking.status)}`}
                  >
                    {booking.status}
                    {booking.guestCount && booking.guestCount !== "N/A" && (
                      <span className="ml-1">• {booking.guestCount} guests</span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center text-sm text-gray-500">
         
          <span className="font-medium">
            Total: {recentBookings.length} requests
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecentBookings;