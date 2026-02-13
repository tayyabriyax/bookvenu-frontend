// components/dashboard/StatsCard.js
export default function StatsCard({ title, value, change, icon, color }) {
    const colorClasses = {
        emerald: "bg-emerald-50 text-emerald-700",
        blue: "bg-blue-50 text-blue-700",
        green: "bg-green-50 text-green-700",
        amber: "bg-amber-50 text-amber-700",
        red: "bg-red-50 text-red-700",
        orange: "bg-orange-50 text-orange-700",
    };

    const iconClasses = {
        emerald: "bg-emerald-100 text-emerald-600",
        blue: "bg-blue-100 text-blue-600",
        green: "bg-green-100 text-green-600",
        amber: "bg-amber-100 text-amber-600",
        red: "bg-red-100 text-red-600",
        orange: "bg-orange-100 text-orange-600",
    };

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
                    <p className={`mt-1 text-sm ${colorClasses[color]}`}>
                        {change}
                    </p>
                </div>
                <div className={`rounded-lg p-3 ${iconClasses[color]}`}>
                    <span className="text-2xl">{icon}</span>
                </div>
            </div>
            {/* Progress Bar (optional) */}
            <div className="mt-4">
                <div className="h-2 w-full rounded-full bg-gray-200">
                    <div
                        className={`h-full rounded-full ${colorClasses[color].split(' ')[0]}`}
                        style={{ width: '75%' }}
                    ></div>
                </div>
            </div>
        </div>
    );
}