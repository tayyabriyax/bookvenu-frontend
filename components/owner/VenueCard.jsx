// components/owner/VenueCard.js
export default function VenueCard({ venue, isSelected, onToggleSelect, onView, onEdit, onManageDishes, onDelete }) {
    const getStatusBadge = (status) => {
        const badges = {
            approved: "bg-emerald-100 text-emerald-800",
            pending: "bg-amber-100 text-amber-800",
            rejected: "bg-red-100 text-red-800",
        };

        return (
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${badges[status]}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const getApprovalBadge = (approvalStatus) => {
        const badges = {
            active: "bg-green-100 text-green-800",
            inactive: "bg-gray-100 text-gray-800",
            under_review: "bg-blue-100 text-blue-800",
        };

        const statusText = approvalStatus === "under_review" ? "Under Review" : approvalStatus;

        return (
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${badges[approvalStatus]}`}>
                {statusText.charAt(0).toUpperCase() + statusText.slice(1)}
            </span>
        );
    };

    return (
        <div className={`rounded-xl border ${isSelected ? "border-emerald-300 bg-emerald-50" : "border-gray-200 bg-white"} p-6 shadow-sm`}>
            {/* Header */}
            <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                    <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onToggleSelect(venue.id)}
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <div className="h-16 w-16 rounded-lg bg-linear-to-br from-emerald-400 to-teal-500"></div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="font-bold text-gray-900">{venue.name}</h3>
                            <div className="flex gap-1">
                                {getStatusBadge(venue.status)}
                                {getApprovalBadge(venue.approvalStatus)}
                            </div>
                        </div>
                        <div className="mt-1 text-sm text-gray-600">
                            <span className="capitalize">{venue.type}</span> • {venue.city}
                        </div>
                    </div>
                </div>
            </div>

            {/* Details Grid */}
            <div className="my-4 grid grid-cols-2 gap-4 border-y border-gray-100 py-4">
                <div>
                    <div className="text-sm text-gray-600">Capacity</div>
                    <div className="font-medium text-gray-900">
                        {venue.capacity.min} - {venue.capacity.max} guests
                    </div>
                </div>
                <div>
                    <div className="text-sm text-gray-600">Price</div>
                    <div className="font-bold text-emerald-700">₹{venue.pricePerHead.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">per head</div>
                </div>
                <div>
                    <div className="text-sm text-gray-600">Bookings</div>
                    <div className="font-medium text-gray-900">{venue.totalBookings}</div>
                </div>
                <div>
                    <div className="text-sm text-gray-600">Revenue</div>
                    <div className="font-medium text-gray-900">₹{venue.revenue.toLocaleString()}</div>
                </div>
            </div>

            {/* Rejection Reason */}
            {venue.status === "rejected" && venue.rejectionReason && (
                <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3">
                    <div className="text-sm font-medium text-red-800">Rejection Reason:</div>
                    <div className="text-sm text-red-700">{venue.rejectionReason}</div>
                </div>
            )}

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2">
                <button
                    onClick={() => onView(venue.id)}
                    className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                >
                    View
                </button>
                <button
                    onClick={() => onEdit(venue.id)}
                    className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Edit
                </button>
                <button
                    onClick={() => onManageDishes(venue.id)}
                    className="rounded-lg border border-blue-300 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100"
                >
                    Dishes
                </button>
                <button
                    onClick={() => onDelete(venue.id)}
                    className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-100"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}