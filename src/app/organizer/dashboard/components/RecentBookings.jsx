// components/dashboard/RecentBookings.jsx
const RecentBookings = () => {
  const recentBookings = [
    { id: "#BK001", customer: "Priya Sharma", venue: "Grand Palace", date: "15 Dec 2023", amount: "₹25,000", status: "Confirmed" },
    { id: "#BK002", customer: "Raj Patel", venue: "Royal Banquet", date: "20 Dec 2023", amount: "₹18,000", status: "Pending" },
    { id: "#BK003", customer: "Anjali Singh", venue: "Sky Garden", date: "25 Dec 2023", amount: "₹12,000", status: "Confirmed" }
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Recent Bookings</h2>
        <button className="text-violet-600 hover:text-violet-700 font-semibold text-sm">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {recentBookings.map((booking) => (
          <div key={booking.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
            <div>
              <p className="font-semibold text-gray-800">{booking.customer}</p>
              <p className="text-sm text-gray-500">{booking.venue}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-800">{booking.amount}</p>
              <span className={`inline-block px-2 py-1 text-xs rounded ${booking.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                {booking.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentBookings;