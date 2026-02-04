// app/setup/components/BookingsTile.jsx
import { 
  FaCalendarCheck, FaSearch, FaFilter, FaEdit, FaTrash, 
  FaShoppingCart, FaDollarSign, FaUsers, FaCheckCircle, FaClock 
} from 'react-icons/fa';

const BookingsTile = () => {
  // Bookings data
  const bookings = [
    { id: "#BK001", customer: "Priya Sharma", venue: "Grand Palace", date: "15 Dec 2023", time: "7:00 PM", guests: 150, amount: "₹85,000", status: "Confirmed", color: "bg-emerald-100 text-emerald-700" },
    { id: "#BK002", customer: "Raj Patel", venue: "Royal Banquet", date: "20 Dec 2023", time: "6:30 PM", guests: 100, amount: "₹65,000", status: "Pending", color: "bg-amber-100 text-amber-700" },
    { id: "#BK003", customer: "Anjali Singh", venue: "Sky Garden", date: "25 Dec 2023", time: "8:00 PM", guests: 80, amount: "₹45,000", status: "Confirmed", color: "bg-emerald-100 text-emerald-700" },
    { id: "#BK004", customer: "Vikram Mehta", venue: "Lakeview Resorts", date: "28 Dec 2023", time: "5:00 PM", guests: 200, amount: "₹1,20,000", status: "Confirmed", color: "bg-emerald-100 text-emerald-700" },
    { id: "#BK005", customer: "Neha Kapoor", venue: "Grand Palace", date: "30 Dec 2023", time: "7:30 PM", guests: 120, amount: "₹75,000", status: "Pending", color: "bg-amber-100 text-amber-700" },
    { id: "#BK006", customer: "Arjun Reddy", venue: "Royal Banquet", date: "2 Jan 2024", time: "6:00 PM", guests: 90, amount: "₹55,000", status: "Cancelled", color: "bg-rose-100 text-rose-700" }
  ];

  // Booking status options
  const statusOptions = ["All", "Confirmed", "Pending", "Cancelled"];

  return (
    <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 h-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 gap-3 md:gap-0">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center space-x-2">
            <FaCalendarCheck className="text-emerald-600" />
            <span>All Bookings</span>
          </h2>
          <p className="text-gray-600 text-sm md:text-base mt-1">Manage and track all venue bookings</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search bookings..." 
              className="pl-10 pr-4 py-2.5 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 text-sm w-full"
            />
          </div>
          <button className="flex items-center justify-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-lg hover:shadow-md transition-all duration-200 text-sm">
            <FaFilter /> <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Status Filter */}
      <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
        {statusOptions.map((status, index) => (
          <button 
            key={index}
            className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg ${
              status === 'All' ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white' : 
              status === 'Confirmed' ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' :
              status === 'Pending' ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' :
              'bg-rose-100 text-rose-700 hover:bg-rose-200'
            } text-sm md:text-base`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Bookings Table */}
      <div className="overflow-x-auto max-h-[400px]">
        <table className="w-full min-w-[600px]">
          <thead className="sticky top-0 bg-white">
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2 md:px-4 text-sm md:text-base font-semibold text-gray-700">Booking ID</th>
              <th className="text-left py-3 px-2 md:px-4 text-sm md:text-base font-semibold text-gray-700">Customer</th>
              <th className="text-left py-3 px-2 md:px-4 text-sm md:text-base font-semibold text-gray-700">Date & Time</th>
              <th className="text-left py-3 px-2 md:px-4 text-sm md:text-base font-semibold text-gray-700">Amount</th>
              <th className="text-left py-3 px-2 md:px-4 text-sm md:text-base font-semibold text-gray-700">Status</th>
              <th className="text-left py-3 px-2 md:px-4 text-sm md:text-base font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-2 md:px-4">
                  <span className="font-mono text-sm md:text-base font-semibold text-gray-800">{booking.id}</span>
                </td>
                <td className="py-3 px-2 md:px-4">
                  <div>
                    <p className="font-semibold text-gray-800 text-sm md:text-base">{booking.customer}</p>
                    <p className="text-gray-500 text-xs md:text-sm">{booking.venue}</p>
                  </div>
                </td>
                <td className="py-3 px-2 md:px-4">
                  <div>
                    <p className="text-gray-800 text-sm md:text-base">{booking.date}</p>
                    <p className="text-gray-500 text-xs md:text-sm">{booking.time} • {booking.guests} guests</p>
                  </div>
                </td>
                <td className="py-3 px-2 md:px-4">
                  <div className="flex items-center space-x-1">
                    <FaDollarSign className="text-emerald-500" />
                    <span className="font-bold text-gray-800 text-sm md:text-base">{booking.amount}</span>
                  </div>
                </td>
                <td className="py-3 px-2 md:px-4">
                  <span className={`px-3 py-1 rounded-full text-xs md:text-sm font-semibold ${booking.color}`}>
                    {booking.status}
                  </span>
                </td>
                <td className="py-3 px-2 md:px-4">
                  <div className="flex items-center space-x-1 md:space-x-2">
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                      <FaEdit className="text-violet-600 text-sm md:text-base" />
                    </button>
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                      <FaShoppingCart className="text-blue-600 text-sm md:text-base" />
                    </button>
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                      <FaTrash className="text-rose-600 text-sm md:text-base" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bookings Summary */}
      <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-3 md:p-4">
            <div className="flex items-center space-x-2">
              <FaCheckCircle className="text-emerald-500" />
              <div>
                <p className="text-sm text-gray-600">Confirmed</p>
                <p className="text-xl md:text-2xl font-bold text-gray-800">4</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-3 md:p-4">
            <div className="flex items-center space-x-2">
              <FaClock className="text-amber-500" />
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-xl md:text-2xl font-bold text-gray-800">2</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl p-3 md:p-4">
            <div className="flex items-center space-x-2">
              <FaUsers className="text-violet-500" />
              <div>
                <p className="text-sm text-gray-600">Total Guests</p>
                <p className="text-xl md:text-2xl font-bold text-gray-800">740</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl p-3 md:p-4">
            <div className="flex items-center space-x-2">
              <FaDollarSign className="text-rose-500" />
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-xl md:text-2xl font-bold text-gray-800">₹4.4L</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingsTile;