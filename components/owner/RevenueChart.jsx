// components/owner/RevenueChart.js
export default function RevenueChart({ data }) {
    const maxRevenue = Math.max(...data.map(d => d.revenue));

    return (
        <div className="space-y-4">
            {/* Chart Bars */}
            <div className="flex h-48 items-end justify-between">
                {data.map((item, index) => (
                    <div key={index} className="flex flex-1 flex-col items-center">
                        <div className="relative w-3/4">
                            <div
                                className="w-full rounded-t-lg bg-linear-to-t from-emerald-500 to-teal-400"
                                style={{
                                    height: `${(item.revenue / maxRevenue) * 100}%`,
                                    minHeight: '20px'
                                }}
                            ></div>
                            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-gray-600">
                                {item.month}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Revenue Values */}
            <div className="flex justify-between pt-6">
                {data.map((item, index) => (
                    <div key={index} className="flex-1 text-center">
                        <div className="text-sm font-medium text-gray-900">
                            ₹{(item.revenue / 100000).toFixed(1)}L
                        </div>
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div className="mt-4 flex items-center justify-center gap-4">
                <div className="flex items-center">
                    <div className="mr-2 h-3 w-3 rounded-full bg-linear-to-r from-emerald-500 to-teal-400"></div>
                    <span className="text-sm text-gray-600">Monthly Revenue</span>
                </div>
            </div>
        </div>
    );
}