// components/owner/RecentBookingsTable.js
export default function RecentBookingsTable({ bookings, onConfirm, onReject, onView }) {
    const getStatusBadge = (status) => {
        const badges = {
            confirmed: "bg-emerald-100 text-emerald-800",
            pending: "bg-amber-100 text-amber-800",
            completed: "bg-blue-100 text-blue-800",
            cancelled: "bg-red-100 text-red-800",
        };

        return (
            <span className={`rounded-full px-2 py-1 text-xs font-medium ${badges[status]}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const getPaymentBadge = (status) => {
        const badges = {
            paid: "bg-green-100 text-green-800",
            pending: "bg-amber-100 text-amber-800",
            partial: "bg-blue-100 text-blue-800",
            refunded: "bg-gray-100 text-gray-800",
        };

        return (
            <span className={`rounded-full px-2 py-1 text-xs font-medium ${badges[status]}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    if (bookings.length === 0) {
        return (
            <div className="rounded-lg border-2 border-dashed border-gray-300 py-8 text-center">
                <div className="mx-auto max-w-sm">
                    <div className="mb-4 text-4xl">📭</div>
                    <p className="text-gray-600">No recent bookings</p>
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-gray-200">
                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                            Customer & Venue
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                            Date
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                            Amount
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                            Status
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {bookings.map((booking) => (
                        <tr key={booking.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3">
                                <div>
                                    <div className="font-medium text-gray-900">{booking.customerName}</div>
                                    <div className="text-sm text-gray-600">{booking.venueName}</div>
                                    <div className="text-xs text-gray-500">{booking.eventType}</div>
                                </div>
                            </td>
                            <td className="px-4 py-3">
                                <div className="text-sm text-gray-900">
                                    {new Date(booking.date).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </div>
                                <div className="text-xs text-gray-500">{booking.time}</div>
                            </td>
                            <td className="px-4 py-3">
                                <div className="text-sm font-medium text-gray-900">
                                    ₹{booking.totalAmount.toLocaleString()}
                                </div>
                                <div className="text-xs">
                                    {getPaymentBadge(booking.paymentStatus)}
                                </div>
                            </td>
                            <td className="px-4 py-3">
                                {getStatusBadge(booking.status)}
                            </td>
                            <td className="px-4 py-3">
                                <div className="flex flex-col gap-1">
                                    <button
                                        onClick={() => onView(booking.id)}
                                        className="text-xs text-emerald-600 hover:text-emerald-700"
                                    >
                                        View
                                    </button>
                                    {booking.status === "pending" && (
                                        <div className="flex gap-1">
                                            <button
                                                onClick={() => onConfirm(booking.id)}
                                                className="flex-1 rounded bg-emerald-600 px-2 py-1 text-xs text-white hover:bg-emerald-700"
                                            >
                                                ✓
                                            </button>
                                            <button
                                                onClick={() => onReject(booking.id)}
                                                className="flex-1 rounded bg-red-600 px-2 py-1 text-xs text-white hover:bg-red-700"
                                            >
                                                ✗
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}