// components/dashboard/QuickActions.js
import { useRouter } from "next/navigation";

export default function QuickActions() {
    const router = useRouter();

    const actions = [
        {
            icon: "🏢",
            title: "Book New Venue",
            description: "Find and book venues for your events",
            onClick: () => router.push("/lawns"),
            color: "emerald",
        },
        {
            icon: "❤️",
            title: "Favorite Venues",
            description: "View your saved venues",
            onClick: () => router.push("/dashboard/favorites"),
            color: "red",
        },
        {
            icon: "💳",
            title: "Make Payment",
            description: "Pay for pending bookings",
            onClick: () => router.push("/dashboard/payments"),
            color: "blue",
        },
        {
            icon: "📋",
            title: "View All Bookings",
            description: "See complete booking history",
            onClick: () => router.push("/dashboard/bookings"),
            color: "purple",
        },
    ];

    const colorClasses = {
        emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
        red: "bg-red-50 text-red-700 border-red-200",
        blue: "bg-blue-50 text-blue-700 border-blue-200",
        purple: "bg-purple-50 text-purple-700 border-purple-200",
    };

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Quick Actions</h3>
            <div className="space-y-3">
                {actions.map((action, index) => (
                    <button
                        key={index}
                        onClick={action.onClick}
                        className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-all hover:shadow-md ${colorClasses[action.color]}`}
                    >
                        <span className="text-2xl">{action.icon}</span>
                        <div>
                            <div className="font-medium">{action.title}</div>
                            <div className="text-sm opacity-75">{action.description}</div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}