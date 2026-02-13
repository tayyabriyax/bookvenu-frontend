// components/owner/QuickActions.js
import { useRouter } from "next/navigation";

export default function QuickActions() {
    const router = useRouter();

    const actions = [
        {
            icon: "🏢",
            title: "Add New Venue",
            description: "List a new venue for booking",
            onClick: () => router.push("/owner/venues/add"),
            color: "emerald",
        },
        {
            icon: "📅",
            title: "View Calendar",
            description: "Check venue availability",
            onClick: () => router.push("/owner/calendar"),
            color: "blue",
        },
        {
            icon: "💰",
            title: "Manage Payments",
            description: "Track and manage payments",
            onClick: () => router.push("/owner/payments"),
            color: "amber",
        },
        {
            icon: "📊",
            title: "View Analytics",
            description: "Performance insights",
            onClick: () => router.push("/owner/analytics"),
            color: "purple",
        },
    ];

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
                {actions.map((action, index) => (
                    <button
                        key={index}
                        onClick={action.onClick}
                        className="flex flex-col items-center justify-center rounded-lg border border-gray-200 p-4 text-center hover:border-emerald-300 hover:bg-emerald-50"
                    >
                        <span className="mb-2 text-2xl">{action.icon}</span>
                        <div className="text-sm font-medium text-gray-900">{action.title}</div>
                    </button>
                ))}
            </div>
        </div>
    );
}