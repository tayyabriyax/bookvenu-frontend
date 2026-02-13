// components/owner/DishesManager.js
import { useState } from "react";

export default function DishesManager({ dishes, onAddDish, onUpdateDish, onRemoveDish }) {
    const [newDish, setNewDish] = useState({ dishName: "", price: "" });
    const [editingIndex, setEditingIndex] = useState(null);
    const [editDish, setEditDish] = useState({ dishName: "", price: "" });

    const handleAdd = () => {
        if (!newDish.dishName.trim() || !newDish.price) {
            alert("Please enter both dish name and price");
            return;
        }

        onAddDish({
            dishName: newDish.dishName.trim(),
            price: parseFloat(newDish.price)
        });

        setNewDish({ dishName: "", price: "" });
    };

    const handleStartEdit = (index, dish) => {
        setEditingIndex(index);
        setEditDish({ dishName: dish.dishName, price: dish.price });
    };

    const handleSaveEdit = (index) => {
        if (!editDish.dishName.trim() || !editDish.price) {
            alert("Please enter both dish name and price");
            return;
        }

        onUpdateDish(index, {
            dishName: editDish.dishName.trim(),
            price: parseFloat(editDish.price)
        });

        setEditingIndex(null);
        setEditDish({ dishName: "", price: "" });
    };

    const handleCancelEdit = () => {
        setEditingIndex(null);
        setEditDish({ dishName: "", price: "" });
    };

    return (
        <div className="space-y-6">
            {/* Add New Dish Form */}
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <h4 className="mb-3 text-sm font-medium text-gray-700">Add New Dish</h4>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                    <div className="md:col-span-2">
                        <label className="mb-1 block text-sm text-gray-600">Dish Name</label>
                        <input
                            type="text"
                            value={newDish.dishName}
                            onChange={(e) => setNewDish({ ...newDish, dishName: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                            placeholder="e.g., Chicken, Biryani"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm text-gray-600">Price (Rs)</label>
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">Rs</div>
                            <input
                                type="number"
                                value={newDish.price}
                                onChange={(e) => setNewDish({ ...newDish, price: e.target.value })}
                                min="0"
                                step="0.01"
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 pl-10 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                                placeholder="e.g., 450"
                            />
                        </div>
                    </div>
                </div>
                <button
                    onClick={handleAdd}
                    className="mt-3 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                >
                    + Add Dish
                </button>
            </div>

            {/* Dishes List */}
            <div>
                <h4 className="mb-3 text-sm font-medium text-gray-700">
                    Menu Dishes ({dishes.length})
                </h4>

                {dishes.length === 0 ? (
                    <div className="rounded-lg border-2 border-dashed border-gray-300 py-8 text-center">
                        <div className="text-gray-500">No dishes added yet</div>
                        <div className="mt-1 text-sm text-gray-400">
                            Add your first dish above
                        </div>
                    </div>
                ) : (
                    <div className="overflow-hidden rounded-lg border border-gray-200">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                                        Dish Name
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                                        Price
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {dishes.map((dish, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-4 py-3">
                                            {editingIndex === index ? (
                                                <input
                                                    type="text"
                                                    value={editDish.dishName}
                                                    onChange={(e) => setEditDish({ ...editDish, dishName: e.target.value })}
                                                    className="w-full rounded border border-gray-300 px-2 py-1"
                                                />
                                            ) : (
                                                <div className="font-medium text-gray-900">{dish.dishName}</div>
                                            )}
                                        </td>
                                        <td className="px-4 py-3">
                                            {editingIndex === index ? (
                                                <div className="relative">
                                                    <div className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500">₹</div>
                                                    <input
                                                        type="number"
                                                        value={editDish.price}
                                                        onChange={(e) => setEditDish({ ...editDish, price: e.target.value })}
                                                        min="0"
                                                        step="0.01"
                                                        className="w-32 rounded border border-gray-300 px-2 py-1 pl-8"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="font-medium text-emerald-700">Rs {dish.price}</div>
                                            )}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex gap-2">
                                                {editingIndex === index ? (
                                                    <>
                                                        <button
                                                            onClick={() => handleSaveEdit(index)}
                                                            className="rounded bg-emerald-600 px-3 py-1 text-xs font-medium text-white hover:bg-emerald-700"
                                                        >
                                                            Save
                                                        </button>
                                                        <button
                                                            onClick={handleCancelEdit}
                                                            className="rounded border border-gray-300 bg-white px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button
                                                            onClick={() => onRemoveDish(index)}
                                                            className="rounded border border-red-300 bg-white px-3 py-1 text-xs font-medium text-red-700 hover:bg-red-50"
                                                        >
                                                            Remove
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Sample Dishes */}
            {/* <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <h4 className="mb-2 text-sm font-medium text-blue-800">Sample Dishes (Click to Add)</h4>
                <div className="flex flex-wrap gap-2">
                    {[
                        { dishName: "Paneer Tikka", price: 450 },
                        { dishName: "Chicken Biryani", price: 550 },
                        { dishName: "Butter Chicken", price: 600 },
                        { dishName: "Vegetable Platter", price: 350 },
                        { dishName: "Soft Drinks", price: 150 },
                        { dishName: "Mocktails", price: 250 },
                    ].map((sample, index) => (
                        <button
                            key={index}
                            onClick={() => onAddDish(sample)}
                            className="rounded-full border border-blue-300 bg-white px-3 py-1 text-xs text-blue-700 hover:bg-blue-50"
                        >
                            {sample.dishName} (₹{sample.price})
                        </button>
                    ))}
                </div>
            </div> */}
        </div>
    );
}