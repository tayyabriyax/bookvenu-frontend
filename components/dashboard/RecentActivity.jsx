// components/dashboard/RecentActivity.js
export default function RecentActivity({ bookings }) {
    const recentBookings = [...bookings]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 4);

    const getActivityIcon = (status) => {
        switch (status) {
            case 'confirmed': return '✅';
            case 'pending': return '⏳';
            case 'completed': return '🎉';
            case 'cancelled': return '❌';
            default: return '📝';
        }
    };

    const getActivityText = (booking) => {
        switch (booking.status) {
            case 'confirmed':
                return `Booking confirmed for ${booking.venueName}`;
            case 'pending':
                return `Awaiting confirmation for ${booking.venueName}`;
            case 'completed':
                return `Event completed at ${booking.venueName}`;
            case 'cancelled':
                return `Booking cancelled for ${booking.venueName}`;
            default:
                return `Booking updated for ${booking.venueName}`;
        }
    };

    const getTimeAgo = (date) => {
        const now = new Date();
        const bookingDate = new Date(date);
        const diffDays = Math.floor((now - bookingDate) / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return `${Math.floor(diffDays / 30)} months ago`;
    };

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Recent Activity</h3>
            <div className="space-y-4">
                {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                            <span className="text-lg">{getActivityIcon(booking.status)}</span>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-gray-900">{getActivityText(booking)}</p>
                            <div className="mt-1 flex items-center justify-between">
                                <span className="text-xs text-gray-500">
                                    {getTimeAgo(booking.date)}
                                </span>
                                <span className="text-xs font-medium text-gray-700">
                                    ₹{booking.totalAmount.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {recentBookings.length === 0 && (
                <div className="py-4 text-center text-gray-500">
                    No recent activity
                </div>
            )}
        </div>
    );
}