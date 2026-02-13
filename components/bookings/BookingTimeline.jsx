// components/booking/BookingTimeline.js
export default function BookingTimeline({ timeline }) {
    return (
        <div className="relative">
            {timeline.map((step, index) => (
                <div key={index} className="relative flex gap-4 pb-8 last:pb-0">
                    {/* Timeline Line */}
                    {index < timeline.length - 1 && (
                        <div className="absolute left-4 top-8 h-full w-0.5 bg-gray-200"></div>
                    )}

                    {/* Icon */}
                    <div className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${step.status === "completed"
                            ? "bg-emerald-500"
                            : step.status === "in-progress"
                                ? "bg-blue-500"
                                : "bg-gray-300"
                        }`}>
                        {step.status === "completed" ? (
                            <span className="text-white">✓</span>
                        ) : (
                            <span className="text-white">{index + 1}</span>
                        )}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                        <div className="flex flex-col gap-1">
                            <div className="font-medium text-gray-900">{step.step}</div>
                            <div className="text-sm text-gray-500">
                                {step.date} • {step.time}
                            </div>
                        </div>
                        {step.status === "pending" && (
                            <div className="mt-2 text-xs text-gray-500">Awaiting action</div>
                        )}
                        {step.status === "completed" && (
                            <div className="mt-2 text-xs text-emerald-600">Completed</div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}