// components/owner/StatsCard.js
export default function OwnerStatsCard({ title, value, change, icon, color, onClick }) {
    const colorClasses = {
        emerald: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:border-emerald-300",
        blue: "bg-blue-50 text-blue-700 border-blue-200 hover:border-blue-300",
        amber: "bg-amber-50 text-amber-700 border-amber-200 hover:border-amber-300",
        red: "bg-red-50 text-red-700 border-red-200 hover:border-red-300",
    };

    const iconClasses = {
        emerald: "bg-emerald-100 text-emerald-600",
        blue: "bg-blue-100 text-blue-600",
        amber: "bg-amber-100 text-amber-600",
        red: "bg-red-100 text-red-600",
    };

    return (
        <button
            onClick={onClick}
            className={`w-full rounded-xl border p-6 text-left transition-all hover:shadow-md ${colorClasses[color]}`}
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium">{title}</p>
                    <p className="mt-2 text-3xl font-bold">{value}</p>
                    <p className="mt-1 text-sm">
                        {change}
                    </p>
                </div>
                <div className={`rounded-lg p-3 ${iconClasses[color]}`}>
                    <span className="text-2xl">{icon}</span>
                </div>
            </div>
        </button>
    );
}