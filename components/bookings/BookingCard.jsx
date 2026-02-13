// components/bookings/BookingCard.js
export default function BookingCard({ booking, onViewDetails, onCancel, onViewInvoice, onViewVenue, onReBook }) {
    const getStatusColor = (status) => {
        switch (status) {
            case "confirmed": return "bg-emerald-100 text-emerald-800";
            case "pending": return "bg-amber-100 text-amber-800";
            case "completed": return "bg-blue-100 text-blue-800";
            case "cancelled": return "bg-red-100 text-red-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    const getPaymentColor = (status) => {
        switch (status) {
            case "paid": return "bg-green-100 text-green-800";
            case "pending": return "bg-amber-100 text-amber-800";
            case "partial": return "bg-blue-100 text-blue-800";
            case "refunded": return "bg-gray-100 text-gray-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    const canCancel = () => {
        const today = new Date();
        const bookingDate = new Date(booking.date);
        const daysDifference = Math.floor((bookingDate - today) / (1000 * 60 * 60 * 24));
        return ["confirmed", "pending"].includes(booking.status) && daysDifference >= 7;
    };

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <div className="h-12 w-12 rounded-lg bg-linear-to-br from-emerald-400 to-teal-500"></div>
                        <div>
                            <h3 className="font-bold text-gray-900">{booking.venueName}</h3>
                            <p className="text-sm text-gray-500">{booking.id} • {booking.eventType}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${getPaymentColor(booking.paymentStatus)}`}>
                        {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                    </span>
                </div>
            </div>

            {/* Details Grid */}
            <div className="my-4 grid grid-cols-2 gap-4 border-y border-gray-100 py-4">
                <div>
                    <div className="text-sm text-gray-600">Date</div>
                    <div className="font-medium text-gray-900">
                        {new Date(booking.date).toLocaleDateString('en-US', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        })}
                    </div>
                </div>
                <div>
                    <div className="text-sm text-gray-600">Time</div>
                    <div className="font-medium text-gray-900">{booking.time}</div>
                </div>
                <div>
                    <div className="text-sm text-gray-600">Guests</div>
                    <div className="font-medium text-gray-900">{booking.guests} people</div>
                </div>
                <div>
                    <div className="text-sm text-gray-600">Total Amount</div>
                    <div className="font-bold text-emerald-700">₹{booking.totalAmount.toLocaleString()}</div>
                </div>
            </div>

            {/* Special Requests */}
            {booking.specialRequests && (
                <div className="mb-4 rounded-lg bg-gray-50 p-3">
                    <div className="text-sm font-medium text-gray-700">Special Requests:</div>
                    <div className="text-sm text-gray-600">{booking.specialRequests}</div>
                </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => onViewDetails(booking.id)}
                    className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                >
                    View Details
                </button>
                <button
                    onClick={() => onViewInvoice(booking.id)}
                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    View Invoice
                </button>
                <button
                    onClick={() => onViewVenue(booking.venueId)}
                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    View Venue
                </button>

                {canCancel() && (
                    <button
                        onClick={() => onCancel(booking.id)}
                        className="rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
                    >
                        Cancel Booking
                    </button>
                )}

                {booking.status === "completed" && (
                    <button
                        onClick={() => onReBook(booking)}
                        className="rounded-lg bg-linear-to-r from-teal-600 to-emerald-600 px-4 py-2 text-sm font-medium text-white hover:from-teal-700 hover:to-emerald-700"
                    >
                        Re-book
                    </button>
                )}
            </div>
        </div>
    );
}