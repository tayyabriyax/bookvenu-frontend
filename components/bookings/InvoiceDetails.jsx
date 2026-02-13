// components/booking/InvoiceDetails.js
export default function InvoiceDetails({ pricing, onMakePayment }) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h4 className="mb-4 text-lg font-semibold text-gray-900">Invoice Summary</h4>

            <div className="space-y-3">
                <div className="flex justify-between">
                    <span className="text-gray-600">Venue Rental</span>
                    <span className="font-medium">₹{pricing.venueRental.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Food & Beverages</span>
                    <span className="font-medium">₹{pricing.foodAndBeverages.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Decoration</span>
                    <span className="font-medium">₹{pricing.decoration.toLocaleString()}</span>
                </div>

                {pricing.discount > 0 && (
                    <div className="flex justify-between text-emerald-600">
                        <span>Discount</span>
                        <span className="font-medium">-₹{pricing.discount.toLocaleString()}</span>
                    </div>
                )}

                <div className="flex justify-between border-t border-gray-200 pt-3">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">
                        ₹{(pricing.venueRental + pricing.foodAndBeverages + pricing.decoration - pricing.discount).toLocaleString()}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-600">Service Charge ({pricing.serviceCharge}%)</span>
                    <span className="font-medium">
                        ₹{Math.round((pricing.venueRental + pricing.foodAndBeverages + pricing.decoration - pricing.discount) * (pricing.serviceCharge / 100)).toLocaleString()}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-600">Taxes ({pricing.taxes}%)</span>
                    <span className="font-medium">
                        ₹{Math.round((pricing.totalAmount - pricing.venueRental - pricing.foodAndBeverages - pricing.decoration) * (pricing.taxes / 100)).toLocaleString()}
                    </span>
                </div>

                <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                        <span>Total Amount</span>
                        <span>₹{pricing.totalAmount.toLocaleString()}</span>
                    </div>
                </div>

                <div className="space-y-2 border-t border-gray-200 pt-3">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Advance Paid</span>
                        <span className="font-medium text-emerald-600">₹{pricing.advancePaid.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Balance Due</span>
                        <span className="font-bold text-red-600">₹{pricing.balanceDue.toLocaleString()}</span>
                    </div>
                </div>

                {pricing.balanceDue > 0 && (
                    <button
                        onClick={onMakePayment}
                        className="mt-4 w-full rounded-lg bg-linear-to-r from-emerald-600 to-teal-600 py-3 font-medium text-white hover:from-emerald-700 hover:to-teal-700"
                    >
                        Pay Balance ₹{pricing.balanceDue.toLocaleString()}
                    </button>
                )}

                <div className="text-center text-xs text-gray-500 mt-3">
                    Payment due: 7 days before event
                </div>
            </div>
        </div>
    );
}