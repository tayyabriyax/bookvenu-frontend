export function InputField({
    label,
    type = "text",
    name,
    value,
    onChange,
    placeholder,
    errors = ""
}) {
    return (
        <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 ${errors
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:border-emerald-500 focus:ring-emerald-200"
                    }`}
                placeholder={placeholder}
            />
            {errors && (
                <p className="mt-1 text-sm text-red-600">{errors?.name}</p>
            )}
        </div>
    )
}