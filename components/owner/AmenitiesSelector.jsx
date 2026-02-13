// components/owner/AmenitiesSelector.js
const amenitiesList = [
    { id: "parking", label: "Parking", icon: "🅿️" },
    { id: "ac", label: "Air Conditioning", icon: "❄️" },
    { id: "wifi", label: "Free WiFi", icon: "📶" },
    { id: "stage", label: "Stage", icon: "🎭" },
    { id: "dance_floor", label: "Dance Floor", icon: "💃" },
    { id: "sound_system", label: "Sound System", icon: "🔊" },
    { id: "projector", label: "Projector", icon: "📽️" },
    { id: "catering", label: "Catering", icon: "👨‍🍳" },
    { id: "bar", label: "Bar", icon: "🍸" },
    { id: "pool", label: "Swimming Pool", icon: "🏊" },
    { id: "garden", label: "Garden", icon: "🌿" },
    { id: "valet", label: "Valet Parking", icon: "🚗" },
    { id: "generator", label: "Generator Backup", icon: "⚡" },
    { id: "bridal_room", label: "Bridal Room", icon: "👰" },
    { id: "kids_area", label: "Kids Play Area", icon: "🧒" },
    { id: "changing_rooms", label: "Changing Rooms", icon: "🚿" },
    { id: "security", label: "Security", icon: "👮" },
    { id: "fireworks", label: "Fireworks Allowed", icon: "🎆" },
    { id: "dj_booth", label: "DJ Booth", icon: "🎧" },
    { id: "decorations", label: "Decorations", icon: "🎨" },
];

export default function AmenitiesSelector({ selectedAmenities, onToggleAmenity }) {
    const categories = {
        "Basic Facilities": ["parking", "ac", "wifi", "generator", "security"],
        "Event Features": ["stage", "dance_floor", "sound_system", "projector", "dj_booth", "fireworks"],
        "Food & Beverage": ["catering", "bar"],
        "Additional Amenities": ["pool", "garden", "valet", "bridal_room", "kids_area", "changing_rooms", "decorations"],
    };

    return (
        <div className="space-y-6">
            {Object.entries(categories).map(([category, amenityIds]) => (
                <div key={category}>
                    <h4 className="mb-3 text-sm font-medium text-gray-700">{category}</h4>
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                        {amenityIds.map((amenityId) => {
                            const amenity = amenitiesList.find(a => a.id === amenityId);
                            if (!amenity) return null;

                            const isSelected = selectedAmenities.includes(amenity.id);

                            return (
                                <label
                                    key={amenity.id}
                                    className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-all ${isSelected
                                            ? "border-emerald-500 bg-emerald-50"
                                            : "border-gray-200 hover:border-gray-300"
                                        }`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={() => onToggleAmenity(amenity.id)}
                                        className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                    />
                                    {/* <span className="text-xl">{amenity.icon}</span> */}
                                    <span className="text-sm font-medium">{amenity.label}</span>
                                </label>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}