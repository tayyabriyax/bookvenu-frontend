import { useState } from "react";

// components/MenuList.js
export default function MenuList({ menu }) {
    const [expandedCategory, setExpandedCategory] = useState(null);

    return (
        <div>
            <h3 className="mb-6 text-xl font-semibold text-gray-900">Menu & Pricing</h3>
            <p className="mb-6 text-gray-600">
                All prices are per person. Minimum order of {menu[0]?.items[0]?.perPerson ? "per person" : "full service"} applies.
            </p>

            <div className="space-y-6">
                {menu.map(category => (
                    <div key={category.category} className="rounded-xl border border-gray-200">
                        <button
                            onClick={() => setExpandedCategory(expandedCategory === category.category ? null : category.category)}
                            className="flex w-full items-center justify-between p-6 text-left"
                        >
                            <div>
                                <h4 className="text-lg font-semibold text-gray-900">{category.category}</h4>
                                <p className="text-sm text-gray-500">{category.items.length} items available</p>
                            </div>
                            <svg
                                className={`h-5 w-5 transform transition-transform ${expandedCategory === category.category ? "rotate-180" : ""
                                    }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {expandedCategory === category.category && (
                            <div className="border-t border-gray-200 p-6">
                                <div className="space-y-4">
                                    {category.items.map(item => (
                                        <div key={item.id} className="flex items-start justify-between rounded-lg border border-gray-100 p-4">
                                            <div>
                                                <div className="font-medium text-gray-900">{item.name}</div>
                                                <p className="mt-1 text-sm text-gray-600">{item.description}</p>
                                                {item.perPerson && (
                                                    <span className="mt-2 inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                                                        Per Person
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-right">
                                                <div className="text-lg font-bold text-emerald-700">₹{item.price}</div>
                                                {item.perPerson && (
                                                    <div className="text-sm text-gray-500">per person</div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-8 rounded-lg bg-emerald-50 p-6">
                <h4 className="mb-2 font-semibold text-emerald-800">Note:</h4>
                <ul className="space-y-1 text-emerald-700">
                    <li>• All prices are exclusive of taxes and service charges</li>
                    <li>• Custom menu options available on request</li>
                    <li>• Dietary restrictions can be accommodated with advance notice</li>
                    <li>• Outside food and beverages are not permitted</li>
                </ul>
            </div>
        </div>
    );
}