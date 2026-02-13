// components/owner/VenueStats.js
export default function VenueStats({ stats }) {
    return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-xl border border-gray-200 bg-white p-4">
                <div className="text-sm text-gray-600">Total Bookings</div>
                <div className="text-2xl font-bold text-gray-900">{stats.totalBookings}</div>
                <div className="text-xs text-gray-500">{stats.upcomingBookings} upcoming</div>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-4">
                <div className="text-sm text-gray-600">Monthly Revenue</div>
                <div className="text-2xl font-bold text-emerald-600">
                    ₹{(stats.revenueThisMonth / 100000).toFixed(1)}L
                </div>
                <div className="text-xs text-gray-500">
                    ₹{(stats.revenueTotal / 1000000).toFixed(1)}M total
                </div>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-4">
                <div className="text-sm text-gray-600">Occupancy Rate</div>
                <div className="text-2xl font-bold text-blue-600">{stats.occupancyRate}%</div>
                <div className="text-xs text-gray-500">This month</div>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-4">
                <div className="text-sm text-gray-600">Avg. Rating</div>
                <div className="text-2xl font-bold text-amber-600">{stats.averageRating}</div>
                <div className="text-xs text-gray-500">Based on reviews</div>
            </div>
        </div>
    );
}