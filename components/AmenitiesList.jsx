// components/AmenitiesList.js
export default function AmenitiesList({ amenities }) {
    return (
        <div>
            <h3 className="mb-6 text-xl font-semibold text-gray-900">Amenities & Facilities</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {amenities.map((amenity, index) => (
                    <div
                        key={index}
                        className={`flex items-center rounded-lg border p-4 ${amenity.available
                                ? "border-gray-200 bg-white"
                                : "border-gray-100 bg-gray-50 opacity-60"
                            }`}
                    >
                        <span className="mr-3 text-2xl">{amenity.icon}</span>
                        <div>
                            <div className="font-medium text-gray-900">{amenity.name}</div>
                            <div className={`text-sm ${amenity.available ? "text-emerald-600" : "text-gray-500"
                                }`}>
                                {amenity.available ? "Available" : "Not Available"}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}