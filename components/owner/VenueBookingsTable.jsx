// components/owner/VenueBookingsTable.js
export default function VenueBookingsTable({ bookings }) {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
        });
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case "confirmed":
                return <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-800">✓</span>;
            case "pending":
                return <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">⏳</span>;
            case "cancelled":
                return <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">✗</span>;
            default:
                return null;
        }
    };

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                Booking ID
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                Customer
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                Date & Time
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                Amount
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {bookings.map((booking) => (
                            <tr key={booking.id} className="hover:bg-gray-50">
                                <td className="whitespace-nowrap px-4 py-4">
                                    <div className="font-medium text-gray-900">{booking.id}</div>
                                    <div className="text-xs text-gray-500">{booking.eventType}</div>
                                </td>
                                <td className="whitespace-nowrap px-4 py-4">
                                    <div className="font-medium text-gray-900">{booking.customer}</div>
                                </td>
                                <td className="whitespace-nowrap px-4 py-4">
                                    <div className="font-medium text-gray-900">{formatDate(booking.date)}</div>
                                    <div className="text-xs text-gray-500">{booking.time}</div>
                                </td>
                                <td className="whitespace-nowrap px-4 py-4">
                                    <div className="font-bold text-gray-900">₹{booking.amount.toLocaleString()}</div>
                                    <div className="text-xs text-gray-500">{booking.guests} guests</div>
                                </td>
                                <td className="whitespace-nowrap px-4 py-4">
                                    <div className="flex items-center gap-2">
                                        {getStatusBadge(booking.status)}
                                        <span className="text-sm capitalize">{booking.status}</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}