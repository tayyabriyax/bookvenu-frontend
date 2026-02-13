// components/dashboard/BookingsTable.js
export default function BookingsTable({ bookings, onViewBooking, onCancelBooking }) {
    const getStatusBadge = (status) => {
        const badges = {
            confirmed: "bg-emerald-100 text-emerald-800",
            pending: "bg-amber-100 text-amber-800",
            completed: "bg-blue-100 text-blue-800",
            cancelled: "bg-red-100 text-red-800",
        };

        return (
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${badges[status]}`}>
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
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${badges[status]}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    if (bookings.length === 0) {
        return (
            <div className="rounded-xl border-2 border-dashed border-gray-300 bg-white py-12 text-center">
                <div className="mx-auto max-w-sm">
                    <div className="mb-4 text-6xl">📅</div>
                    <h3 className="mb-2 text-xl font-semibold text-gray-900">No bookings found</h3>
                    <p className="text-gray-600">
                        You don't have any bookings matching the selected filter.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            {/* Mobile View */}
            <div className="md:hidden">
                {bookings.slice(0, 5).map((booking) => (
                    <div key={booking.id} className="border-b border-gray-200 p-4">
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="flex items-center gap-2">
                                    <div className="h-10 w-10 rounded-lg bg-linear-to-br from-emerald-400 to-teal-500"></div>
                                    <div>
                                        <h4 className="font-medium text-gray-900">{booking.venueName}</h4>
                                        <p className="text-sm text-gray-500">{booking.id}</p>
                                    </div>
                                </div>

                                <div className="mt-3 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Date:</span>
                                        <span className="font-medium">{new Date(booking.date).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Guests:</span>
                                        <span className="font-medium">{booking.guests}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Amount:</span>
                                        <span className="font-medium">₹{booking.totalAmount.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                            <div className="flex gap-2">
                                {getStatusBadge(booking.status)}
                                {getPaymentBadge(booking.paymentStatus)}
                            </div>
                            <button
                                onClick={() => onViewBooking(booking.id)}
                                className="text-sm text-emerald-600 hover:text-emerald-700"
                            >
                                View
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop View */}
            <div className="hidden md:block">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="border-b border-gray-200 bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Venue
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Date & Time
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Guests
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Amount
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {bookings.slice(0, 5).map((booking) => (
                                <tr key={booking.id} className="hover:bg-gray-50">
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 shrink-0">
                                                <div className="h-10 w-10 rounded-lg bg-linear-to-br from-emerald-400 to-teal-500"></div>
                                            </div>
                                            <div className="ml-4">
                                                <div className="font-medium text-gray-900">{booking.venueName}</div>
                                                <div className="text-sm text-gray-500">{booking.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <div className="text-sm text-gray-900">
                                            {new Date(booking.date).toLocaleDateString('en-US', {
                                                weekday: 'short',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </div>
                                        <div className="text-sm text-gray-500">{booking.time}</div>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <div className="text-sm text-gray-900">{booking.guests}</div>
                                        <div className="text-sm text-gray-500">guests</div>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <div className="text-sm font-medium text-gray-900">
                                            ₹{booking.totalAmount.toLocaleString()}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {getPaymentBadge(booking.paymentStatus)}
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        {getStatusBadge(booking.status)}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => onViewBooking(booking.id)}
                                                className="text-sm text-emerald-600 hover:text-emerald-700"
                                            >
                                                View
                                            </button>
                                            {(booking.status === "pending" || booking.status === "confirmed") && (
                                                <button
                                                    onClick={() => onCancelBooking(booking.id)}
                                                    className="text-sm text-red-600 hover:text-red-700"
                                                >
                                                    Cancel
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}