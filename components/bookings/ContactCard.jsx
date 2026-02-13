// components/booking/ContactCard.js
export default function ContactCard({ owner, onContact }) {
    const handleCall = (phoneNumber) => {
        alert(`Calling ${phoneNumber}`);
    };

    const handleEmail = (email) => {
        alert(`Opening email to ${email}`);
    };

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h4 className="mb-4 text-lg font-semibold text-gray-900">Venue Owner Contact</h4>

            <div className="space-y-4">
                {/* Owner Info */}
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-emerald-400 to-teal-500">
                        <span className="text-xl text-white">👤</span>
                    </div>
                    <div>
                        <div className="font-bold text-gray-900">{owner.name}</div>
                        <div className="text-sm text-gray-600">{owner.role}</div>
                    </div>
                </div>

                {/* Contact Details */}
                <div className="space-y-3">
                    <div>
                        <div className="text-sm text-gray-600">Email</div>
                        <div className="flex items-center justify-between">
                            <a
                                href={`mailto:${owner.email}`}
                                className="font-medium text-gray-900 hover:text-emerald-600"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleEmail(owner.email);
                                }}
                            >
                                {owner.email}
                            </a>
                            <button
                                onClick={() => handleEmail(owner.email)}
                                className="text-emerald-600 hover:text-emerald-700"
                            >
                                📧
                            </button>
                        </div>
                    </div>

                    <div>
                        <div className="text-sm text-gray-600">Phone</div>
                        <div className="flex items-center justify-between">
                            <a
                                href={`tel:${owner.phone}`}
                                className="font-medium text-gray-900 hover:text-emerald-600"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleCall(owner.phone);
                                }}
                            >
                                {owner.phone}
                            </a>
                            <button
                                onClick={() => handleCall(owner.phone)}
                                className="text-emerald-600 hover:text-emerald-700"
                            >
                                📞
                            </button>
                        </div>
                    </div>

                    {owner.alternatePhone && (
                        <div>
                            <div className="text-sm text-gray-600">Alternate Phone</div>
                            <div className="flex items-center justify-between">
                                <a
                                    href={`tel:${owner.alternatePhone}`}
                                    className="font-medium text-gray-900 hover:text-emerald-600"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleCall(owner.alternatePhone);
                                    }}
                                >
                                    {owner.alternatePhone}
                                </a>
                                <button
                                    onClick={() => handleCall(owner.alternatePhone)}
                                    className="text-emerald-600 hover:text-emerald-700"
                                >
                                    📞
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Availability */}
                <div className="rounded-lg bg-gray-50 p-3">
                    <div className="text-sm font-medium text-gray-700">Availability</div>
                    <div className="text-sm text-gray-600">{owner.availability}</div>
                    <div className="mt-1 text-xs text-gray-500">
                        Response time: {owner.responseTime}
                    </div>
                </div>

                {/* Contact Button */}
                <button
                    onClick={onContact}
                    className="w-full rounded-lg border border-emerald-600 bg-emerald-50 py-3 font-medium text-emerald-700 hover:bg-emerald-100"
                >
                    💬 Send Message
                </button>
            </div>
        </div>
    );
}