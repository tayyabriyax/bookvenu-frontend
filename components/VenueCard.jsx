// components/VenueCard.js
import { useRouter } from "next/navigation";

export default function VenueCard({ venue }) {
    const router = useRouter();

    return (
        <div className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
                <div className="h-full w-full bg-linear-to-br from-emerald-400 to-teal-500" />

                {/* Venue Type Badge */}
                <div className="absolute left-3 top-3">
                    <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-emerald-700 capitalize">
                        {venue.type}
                    </span>
                </div>

                {/* Rating */}
                <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/60 px-3 py-1 text-white backdrop-blur-sm">
                    <span className="text-sm font-bold">★ {venue.rating}</span>
                    <span className="text-xs opacity-90">({venue.totalReviews})</span>
                </div>

                {/* City */}
                <div className="absolute bottom-3 left-3">
                    <span className="rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-gray-800">
                        📍 {venue.city}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="mb-2 text-lg font-bold text-gray-900 group-hover:text-emerald-700">
                    {venue.name}
                </h3>

                {/* Details */}
                <div className="mb-4 space-y-3">
                    <div className="flex items-center text-gray-600">
                        <svg className="mr-2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="text-sm">Capacity: <strong>{venue.capacity.toLocaleString()}+ guests</strong></span>
                    </div>

                    <div className="flex items-center text-gray-600">
                        <svg className="mr-2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm">Starting from <strong>₹{venue.pricePerHead.toLocaleString()}</strong> per head</span>
                    </div>
                </div>

                {/* Amenities */}
                <div className="mb-5">
                    <div className="mb-2 flex items-center text-sm text-gray-500">
                        <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Popular dishes:
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {venue.dishes.slice(0, 3).map((dish, index) => (
                            <span
                                key={index}
                                className="rounded-full bg-emerald-50 px-3 py-1 text-xs text-emerald-700"
                            >
                                {dish}
                            </span>
                        ))}
                        {venue.dishes.length > 3 && (
                            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                                +{venue.dishes.length - 3} more
                            </span>
                        )}
                    </div>
                </div>

                {/* View Details Button */}
                <button
                    onClick={() => router.push(`/lawns/${venue.id}`)}
                    className="w-full rounded-lg bg-linear-to-r from-emerald-600 to-teal-600 py-3 font-semibold text-white transition-all hover:from-emerald-700 hover:to-teal-700"
                >
                    View Details
                </button>
            </div>
        </div>
    );
}