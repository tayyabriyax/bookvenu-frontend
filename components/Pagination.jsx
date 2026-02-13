// components/Pagination.js
export default function Pagination({ currentPage, totalPages, onPageChange }) {
    const getPageNumbers = () => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];
        let l;

        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
                range.push(i);
            }
        }

        range.forEach((i) => {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push('...');
                }
            }
            rangeWithDots.push(i);
            l = i;
        });

        return rangeWithDots;
    };

    return (
        <div className="flex items-center justify-center space-x-2">
            {/* Previous Button */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`rounded-lg border px-4 py-2 ${currentPage === 1
                        ? "cursor-not-allowed border-gray-200 text-gray-400"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
            >
                ← Previous
            </button>

            {/* Page Numbers */}
            {getPageNumbers().map((page, index) => (
                <button
                    key={index}
                    onClick={() => typeof page === 'number' && onPageChange(page)}
                    className={`flex h-10 w-10 items-center justify-center rounded-lg border ${page === currentPage
                            ? "border-emerald-600 bg-emerald-600 text-white"
                            : page === "..."
                                ? "border-transparent"
                                : "border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                    disabled={page === "..."}
                >
                    {page}
                </button>
            ))}

            {/* Next Button */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`rounded-lg border px-4 py-2 ${currentPage === totalPages
                        ? "cursor-not-allowed border-gray-200 text-gray-400"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
            >
                Next →
            </button>
        </div>
    );
}