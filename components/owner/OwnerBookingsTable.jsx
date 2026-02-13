// components/owner/OwnerBookingsTable.js
export default function OwnerBookingsTable({
    bookings,
    selectedBookings,
    onToggleSelect,
    onConfirm,
    onReject,
    onViewDetails
}) {
    const getStatusBadge = (status) => {
        const badges = {
            confirmed: "bg-emerald-100 text-emerald-800",
            pending: "bg-amber-100 text-amber-800",
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

    const isUpcoming = (date) => {
        return new Date(date) > new Date();
    };

    if (bookings.length === 0) {
        return (
            <div className="rounded-xl border-2 border-dashed border-gray-300 bg-white py-16 text-center">
                <div className="mx-auto max-w-sm">
                    <div className="mb-4 text-6xl">📭</div>
                    <h3 className="mb-2 text-xl font-semibold text-gray-900">No bookings found</h3>
                    <p className="mb-6 text-gray-600">
                        No bookings match your current filters
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            {/* Desktop View */}
            <div className="hidden md:block">
                <table className="w-full">
                    <thead className="border-b border-gray-200 bg-gray-50">
                        <tr>
                            <th className="w-12 px-6 py-3 text-left">
                                <input
                                    type="checkbox"
                                    checked={selectedBookings.length === bookings.length && bookings.length > 0}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            bookings.forEach(b => onToggleSelect(b.id));
                                        } else {
                                            bookings.forEach(b => onToggleSelect(b.id));
                                        }
                                    }}
                                    className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                />
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                Customer & Venue
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                Date & Event
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                Guests & Amount
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
                        {bookings.map((booking) => (
                            <tr key={booking.id} className={`hover:bg-gray-50 ${selectedBookings.includes(booking.id) ? "bg-emerald-50" : ""}`}>
                                {/* Checkbox */}
                                <td className="whitespace-nowrap px-6 py-4">
                                    <input
                                        type="checkbox"
                                        checked={selectedBookings.includes(booking.id)}
                                        onChange={() => onToggleSelect(booking.id)}
                                        className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                    />
                                </td>

                                {/* Customer & Venue */}
                                <td className="whitespace-nowrap px-6 py-4">
                                    <div>
                                        <div className="font-bold text-gray-900">{booking.customer.name}</div>
                                        <div className="text-sm text-gray-600">{booking.venue.name}</div>
                                        <div className="text-xs text-gray-500">
                                            {booking.customer.email}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {booking.customer.phone}
                                        </div>
                                    </div>
                                </td>

                                {/* Date & Event */}
                                <td className="whitespace-nowrap px-6 py-4">
                                    <div className="text-sm font-medium text-gray-900">
                                        {new Date(booking.date).toLocaleDateString('en-US', {
                                            weekday: 'short',
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </div>
                                    <div className="text-sm text-gray-500">{booking.time}</div>
                                    <div className="text-xs text-gray-600 capitalize">
                                        {booking.eventType}
                                    </div>
                                    {isUpcoming(booking.date) && (
                                        <div className="mt-1 text-xs text-blue-600">
                                            {(() => {
                                                const today = new Date();
                                                const bookingDate = new Date(booking.date);
                                                const diffDays = Math.floor((bookingDate - today) / (1000 * 60 * 60 * 24));
                                                return diffDays === 0 ? "Today" : diffDays === 1 ? "Tomorrow" : `In ${diffDays} days`;
                                            })()}
                                        </div>
                                    )}
                                </td>

                                {/* Guests & Amount */}
                                <td className="whitespace-nowrap px-6 py-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-600">👥</span>
                                            <span className="font-bold text-gray-900">{booking.guests}</span>
                                            <span className="text-sm text-gray-500">guests</span>
                                        </div>
                                        <div className="text-lg font-bold text-emerald-700">
                                            ₹{booking.totalAmount.toLocaleString()}
                                        </div>
                                        <div className="text-xs">
                                            {getPaymentBadge(booking.paymentStatus)}
                                        </div>
                                    </div>
                                </td>

                                {/* Status */}
                                <td className="whitespace-nowrap px-6 py-4">
                                    <div className="space-y-2">
                                        {getStatusBadge(booking.status)}
                                        <div className="text-xs text-gray-500">
                                            Booked: {new Date(booking.bookingDate).toLocaleDateString()}
                                        </div>
                                    </div>
                                </td>

                                {/* Actions */}
                                <td className="whitespace-nowrap px-6 py-4">
                                    <div className="flex flex-col gap-2">
                                        <button
                                            onClick={() => onViewDetails(booking.id)}
                                            className="rounded-lg bg-emerald-600 px-3 py-1 text-xs font-medium text-white hover:bg-emerald-700"
                                        >
                                            View
                                        </button>

                                        {booking.status === "pending" && (
                                            <div className="flex gap-1">
                                                <button
                                                    onClick={() => onConfirm(booking.id)}
                                                    className="flex-1 rounded bg-emerald-600 px-2 py-1 text-xs text-white hover:bg-emerald-700"
                                                >
                                                    ✓ Confirm
                                                </button>
                                                <button
                                                    onClick={() => onReject(booking.id)}
                                                    className="flex-1 rounded bg-red-600 px-2 py-1 text-xs text-white hover:bg-red-700"
                                                >
                                                    ✗ Reject
                                                </button>
                                            </div>
                                        )}

                                        {booking.status === "confirmed" && booking.paymentStatus === "pending" && (
                                            <button
                                                onClick={() => alert(`Follow up payment for ${booking.id}`)}
                                                className="rounded bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700"
                                            >
                                                Follow up Payment
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile View */}
            <div className="md:hidden">
                {bookings.map((booking) => (
                    <div
                        key={booking.id}
                        className={`border-b border-gray-200 p-4 ${selectedBookings.includes(booking.id) ? "bg-emerald-50" : ""}`}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                                <input
                                    type="checkbox"
                                    checked={selectedBookings.includes(booking.id)}
                                    onChange={() => onToggleSelect(booking.id)}
                                    className="mt-1 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                />
                                <div>
                                    <div className="font-bold text-gray-900">{booking.customer.name}</div>
                                    <div className="text-sm text-gray-600">{booking.venue.name}</div>
                                    <div className="mt-2 flex items-center gap-2">
                                        {getStatusBadge(booking.status)}
                                        {getPaymentBadge(booking.paymentStatus)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-4 border-t border-gray-100 pt-4">
                            <div>
                                <div className="text-sm text-gray-600">Date</div>
                                <div className="font-medium text-gray-900">
                                    {new Date(booking.date).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </div>
                                <div className="text-sm text-gray-500">{booking.time}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600">Guests</div>
                                <div className="font-bold text-gray-900">{booking.guests}</div>
                                <div className="text-sm text-gray-500">people</div>
                            </div>
                            <div className="col-span-2">
                                <div className="text-sm text-gray-600">Amount</div>
                                <div className="text-xl font-bold text-emerald-700">₹{booking.totalAmount.toLocaleString()}</div>
                            </div>
                        </div>

                        <div className="mt-4 flex gap-2">
                            <button
                                onClick={() => onViewDetails(booking.id)}
                                className="flex-1 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                            >
                                View
                            </button>

                            {booking.status === "pending" && (
                                <>
                                    <button
                                        onClick={() => onConfirm(booking.id)}
                                        className="flex-1 rounded-lg border border-emerald-600 bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                                    >
                                        Confirm
                                    </button>
                                    <button
                                        onClick={() => onReject(booking.id)}
                                        className="flex-1 rounded-lg border border-red-600 bg-white px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
                                    >
                                        Reject
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}