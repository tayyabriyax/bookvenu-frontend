// components/owner/VenueTableRow.js
export default function VenueTableRow({ venue, isSelected, onToggleSelect, onView, onEdit, onManageDishes, onDelete }) {
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
        <tr className={`hover:bg-gray-50 ${isSelected ? "bg-emerald-50" : ""}`}>
            {/* Checkbox */}
            <td className="whitespace-nowrap px-6 py-4">
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggleSelect(venue.id)}
                    className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
            </td>

            {/* Venue Details */}
            <td className="whitespace-nowrap px-6 py-4">
                <div className="flex items-center">
                    <div className="h-12 w-12 shrink-0">
                        <div className="h-12 w-12 rounded-lg bg-linear-to-br from-emerald-400 to-teal-500"></div>
                    </div>
                    <div className="ml-4">
                        <div className="font-bold text-gray-900">{venue.name}</div>
                        <div className="text-sm text-gray-500 capitalize">{venue.type}</div>
                        <div className="text-xs text-gray-400">
                            Listed: {new Date(venue.createdAt).toLocaleDateString()}
                        </div>
                    </div>
                </div>
            </td>

            {/* Location & Capacity */}
            <td className="whitespace-nowrap px-6 py-4">
                <div className="text-sm text-gray-900">{venue.city}</div>
                <div className="text-sm text-gray-500">{venue.address}</div>
                <div className="text-sm font-medium text-gray-900">
                    {venue.capacity.min} - {venue.capacity.max} guests
                </div>
                <div className="text-sm font-bold text-emerald-700">
                    ₹{venue.pricePerHead.toLocaleString()}/head
                </div>
            </td>

            {/* Performance */}
            <td className="whitespace-nowrap px-6 py-4">
                <div className="space-y-1">
                    <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Bookings:</span>
                        <span className="font-medium text-gray-900">{venue.totalBookings}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Revenue:</span>
                        <span className="font-medium text-gray-900">₹{venue.revenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Rating:</span>
                        <span className="font-medium text-gray-900">
                            {venue.rating ? `★ ${venue.rating}` : "No ratings"}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Reviews:</span>
                        <span className="font-medium text-gray-900">{venue.reviews}</span>
                    </div>
                </div>
            </td>

            {/* Status */}
            <td className="whitespace-nowrap px-6 py-4">
                <div className="space-y-2">
                    {getStatusBadge(venue.status)}
                    {getApprovalBadge(venue.approvalStatus)}
                </div>
            </td>

            {/* Actions */}
            <td className="whitespace-nowrap px-6 py-4">
                <div className="flex flex-col gap-2">
                    <div className="flex gap-1">
                        <button
                            onClick={() => onView(venue.id)}
                            className="rounded bg-emerald-600 px-3 py-1 text-xs font-medium text-white hover:bg-emerald-700"
                        >
                            View
                        </button>
                        <button
                            onClick={() => onEdit(venue.id)}
                            className="rounded border border-gray-300 bg-white px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Edit
                        </button>
                    </div>
                    <div className="flex gap-1">
                        <button
                            onClick={() => onManageDishes(venue.id)}
                            className="rounded border border-blue-300 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100"
                        >
                            Dishes
                        </button>
                        <button
                            onClick={() => onDelete(venue.id)}
                            className="rounded border border-red-300 bg-red-50 px-3 py-1 text-xs font-medium text-red-700 hover:bg-red-100"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </td>
        </tr>
    );
}