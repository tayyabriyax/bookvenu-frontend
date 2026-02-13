// components/bookings/BookingTableRow.js
export default function BookingTableRow({ booking, onViewDetails, onCancel, onViewInvoice, onViewVenue, onReBook }) {
    const getStatusColor = (status) => {
        switch (status) {
            case "confirmed": return "bg-emerald-100 text-emerald-800";
            case "pending": return "bg-amber-100 text-amber-800";
            case "completed": return "bg-blue-100 text-blue-800";
            case "cancelled": return "bg-red-100 text-red-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    const canCancel = () => {
        const today = new Date();
        const bookingDate = new Date(booking.date);
        const daysDifference = Math.floor((bookingDate - today) / (1000 * 60 * 60 * 24));
        return ["confirmed", "pending"].includes(booking.status) && daysDifference >= 7;
    };

    const isUpcoming = new Date(booking.date) > new Date();

    return (
        <tr className="hover:bg-gray-50">
            {/* Venue Details */}
            <td className="whitespace-nowrap px-6 py-4">
                <div className="flex items-center">
                    <div className="h-12 w-12 shrink-0">
                        <div className="h-12 w-12 rounded-lg bg-linear-to-br from-emerald-400 to-teal-500"></div>
                    </div>
                    <div className="ml-4">
                        <div className="font-medium text-gray-900">{booking.venueName}</div>
                        <div className="text-sm text-gray-500">{booking.id}</div>
                        <div className="text-xs text-gray-400">{booking.eventType}</div>
                    </div>
                </div>
            </td>

            {/* Date & Time */}
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
                {isUpcoming && (
                    <div className="text-xs text-blue-600">
                        {(() => {
                            const today = new Date();
                            const bookingDate = new Date(booking.date);
                            const diffDays = Math.floor((bookingDate - today) / (1000 * 60 * 60 * 24));
                            return diffDays === 0 ? "Today" : diffDays === 1 ? "Tomorrow" : `In ${diffDays} days`;
                        })()}
                    </div>
                )}
            </td>

            {/* Guests */}
            <td className="whitespace-nowrap px-6 py-4">
                <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{booking.guests}</div>
                    <div className="text-xs text-gray-500">guests</div>
                </div>
            </td>

            {/* Amount */}
            <td className="whitespace-nowrap px-6 py-4">
                <div className="text-right">
                    <div className="text-lg font-bold text-emerald-700">₹{booking.totalAmount.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">
                        {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                    </div>
                </div>
            </td>

            {/* Status */}
            <td className="whitespace-nowrap px-6 py-4">
                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(booking.status)}`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
            </td>

            {/* Actions */}
            <td className="whitespace-nowrap px-6 py-4">
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                        <button
                            onClick={() => onViewDetails(booking.id)}
                            className="rounded-lg bg-emerald-600 px-3 py-1 text-xs font-medium text-white hover:bg-emerald-700"
                        >
                            View
                        </button>
                        <button
                            onClick={() => onViewInvoice(booking.id)}
                            className="rounded-lg border border-gray-300 bg-white px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Invoice
                        </button>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => onViewVenue(booking.venueId)}
                            className="rounded-lg border border-gray-300 bg-white px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Venue
                        </button>
                        {canCancel() && (
                            <button
                                onClick={() => onCancel(booking.id)}
                                className="rounded-lg border border-red-300 bg-white px-3 py-1 text-xs font-medium text-red-700 hover:bg-red-50"
                            >
                                Cancel
                            </button>
                        )}
                        {booking.status === "completed" && (
                            <button
                                onClick={() => onReBook(booking)}
                                className="rounded-lg bg-linear-to-r from-teal-600 to-emerald-600 px-3 py-1 text-xs font-medium text-white hover:from-teal-700 hover:to-emerald-700"
                            >
                                Re-book
                            </button>
                        )}
                    </div>
                </div>
            </td>
        </tr>
    );
}