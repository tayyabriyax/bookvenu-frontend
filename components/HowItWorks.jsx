// components/HowItWorks.js
const steps = [
    {
        number: "01",
        title: "Search & Explore",
        description: "Browse through our curated collection of venues. Use filters to find your perfect match.",
        icon: "🔍",
    },
    {
        number: "02",
        title: "Check Availability",
        description: "Select your preferred dates and check real-time availability of the venue.",
        icon: "📅",
    },
    {
        number: "03",
        title: "Book Instantly",
        description: "Secure your booking with our easy online payment system.",
        icon: "💳",
    },
    {
        number: "04",
        title: "Celebrate Stress-Free",
        description: "Show up and enjoy your event while we handle the venue coordination.",
        icon: "🎉",
    },
];

export default function HowItWorks() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                        How BookVenu Works
                    </h2>
                    <p className="text-gray-600">
                        Four simple steps to book your dream venue
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {steps.map((step) => (
                        <div
                            key={step.number}
                            className="group relative rounded-2xl border border-gray-100 p-8 shadow-sm transition-all duration-300 hover:border-emerald-200 hover:shadow-xl"
                        >
                            {/* Step Number */}
                            <div className="absolute -top-4 left-8 flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-r from-emerald-500 to-teal-600 text-sm font-bold text-white">
                                {step.number}
                            </div>

                            {/* Icon */}
                            <div className="mb-6 text-4xl">{step.icon}</div>

                            {/* Content */}
                            <h3 className="mb-3 text-xl font-semibold text-gray-900">
                                {step.title}
                            </h3>
                            <p className="text-gray-600">{step.description}</p>

                            {/* Hover Line */}
                            <div className="absolute bottom-0 left-0 h-1 w-0 bg-linear-to-r from-emerald-500 to-teal-600 transition-all duration-300 group-hover:w-full"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}