// app/owner/venues/[id]/availability/page.js
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function VenueAvailabilityPage() {
    const params = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [venue, setVenue] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [blockedDates, setBlockedDates] = useState([]); // Only blocked dates
    const [bookedDates, setBookedDates] = useState([]); // Booked dates (cannot be blocked)
    const [bulkBlockMode, setBulkBlockMode] = useState(false);
    const [dateRange, setDateRange] = useState({
        startDate: null,
        endDate: null
    });
    const [blockReason, setBlockReason] = useState("");
    const [showBlockModal, setShowBlockModal] = useState(false);
    const [selectedBlocks, setSelectedBlocks] = useState([]);

    // Filter states
    const [filterMonth, setFilterMonth] = useState("all");
    const [filterReason, setFilterReason] = useState("all");

    // Mock data - In real app, fetch from API
    useEffect(() => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setVenue({
                id: params.id,
                name: "Royal Emerald Lawn & Banquet",
                type: "lawn",
                capacity: 500
            });

            // Mock booked dates (cannot be modified)
            setBookedDates([
                { date: "2024-03-15", bookingId: "BK001", customer: "John Doe", guests: 250, time: "14:00 - 22:00" },
                { date: "2024-03-20", bookingId: "BK002", customer: "Sarah Smith", guests: 150, time: "18:00 - 02:00" },
                { date: "2024-03-25", bookingId: "BK003", customer: "Robert Johnson", guests: 80, time: "16:00 - 00:00" },
                { date: "2024-04-10", bookingId: "BK004", customer: "Emily Davis", guests: 300, time: "12:00 - 20:00" },
                { date: "2024-04-22", bookingId: "BK006", customer: "Lisa Wilson", guests: 120, time: "15:00 - 23:00" },
                { date: "2024-04-15", bookingId: "BK008", customer: "Jennifer Taylor", guests: 180, time: "19:00 - 03:00" },
            ]);

            // Mock blocked dates (manually blocked by owner)
            setBlockedDates([
                {
                    id: "BL001",
                    date: "2024-03-18",
                    reason: "Maintenance - Lawn renovation",
                    blockedBy: "owner",
                    createdAt: "2024-02-15"
                },
                {
                    id: "BL002",
                    date: "2024-03-19",
                    reason: "Private event - Staff party",
                    blockedBy: "owner",
                    createdAt: "2024-02-20"
                },
                {
                    id: "BL003",
                    date: "2024-04-01",
                    reason: "Public holiday",
                    blockedBy: "owner",
                    createdAt: "2024-02-25"
                },
                {
                    id: "BL004",
                    date: "2024-04-02",
                    reason: "Public holiday",
                    blockedBy: "owner",
                    createdAt: "2024-02-25"
                },
                {
                    id: "BL005",
                    date: "2024-04-25",
                    reason: "Maintenance - Electrical work",
                    blockedBy: "owner",
                    createdAt: "2024-03-01"
                },
                {
                    id: "BL006",
                    date: "2024-04-26",
                    reason: "Maintenance - Electrical work",
                    blockedBy: "owner",
                    createdAt: "2024-03-01"
                },
                {
                    id: "BL007",
                    date: "2024-05-01",
                    reason: "Labour Day",
                    blockedBy: "owner",
                    createdAt: "2024-03-05"
                },
            ]);

            setLoading(false);
        }, 500);
    }, [params.id]);

    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString("en-IN", {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    };

    const formatMonthYear = (date) => {
        return date.toLocaleDateString("en-IN", {
            month: "long",
            year: "numeric"
        });
    };

    const isDateBooked = (dateStr) => {
        return bookedDates.some(b => b.date === dateStr);
    };

    const isDateBlocked = (dateStr) => {
        return blockedDates.some(b => b.date === dateStr);
    };

    const isPastDate = (dateStr) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const checkDate = new Date(dateStr);
        checkDate.setHours(0, 0, 0, 0);
        return checkDate < today;
    };

    const getDateStatus = (dateStr) => {
        if (isPastDate(dateStr)) return "past";
        if (isDateBooked(dateStr)) return "booked";
        if (isDateBlocked(dateStr)) return "blocked";
        return "available"; // All future dates are available by default
    };

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const handleDateClick = (dateStr) => {
        const status = getDateStatus(dateStr);

        if (status === "past") {
            alert("Past dates cannot be modified.");
            return;
        }

        if (status === "booked") {
            alert("This date is already booked and cannot be blocked.");
            return;
        }

        setSelectedDate(dateStr);

        if (status === "available") {
            // Open block modal for available dates
            setShowBlockModal(true);
        } else if (status === "blocked") {
            // Prompt to unblock
            const block = blockedDates.find(b => b.date === dateStr);
            if (block) {
                if (confirm(`Do you want to unblock ${formatDate(dateStr)}?`)) {
                    handleUnblockDate(block.id);
                }
            }
        }
    };

    const handleBlockDate = () => {
        if (!selectedDate) return;

        const newBlock = {
            id: `BL${String(blockedDates.length + 1).padStart(3, '0')}`,
            date: selectedDate,
            reason: blockReason || "Blocked by owner",
            blockedBy: "owner",
            createdAt: new Date().toISOString().split('T')[0]
        };

        setBlockedDates([...blockedDates, newBlock]);
        setShowBlockModal(false);
        setBlockReason("");
        setSelectedDate(null);
        alert(`Date ${formatDate(selectedDate)} has been blocked successfully!`);
    };

    const handleBulkBlockDates = () => {
        if (!dateRange.startDate || !dateRange.endDate) return;

        const start = new Date(dateRange.startDate);
        const end = new Date(dateRange.endDate);
        const dates = [];
        const currentDate = new Date(start);

        while (currentDate <= end) {
            const dateStr = currentDate.toISOString().split('T')[0];
            // Only block if not already booked and not already blocked
            if (!isDateBooked(dateStr) && !isDateBlocked(dateStr) && !isPastDate(dateStr)) {
                dates.push({
                    id: `BL${String(blockedDates.length + dates.length + 1).padStart(3, '0')}`,
                    date: dateStr,
                    reason: blockReason || "Bulk block by owner",
                    blockedBy: "owner",
                    createdAt: new Date().toISOString().split('T')[0]
                });
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }

        setBlockedDates([...blockedDates, ...dates]);
        setBulkBlockMode(false);
        setDateRange({ startDate: null, endDate: null });
        setBlockReason("");
        alert(`${dates.length} dates have been blocked successfully!`);
    };

    const handleUnblockDate = (blockId) => {
        const blockToRemove = blockedDates.find(b => b.id === blockId);
        if (blockToRemove) {
            setBlockedDates(blockedDates.filter(b => b.id !== blockId));
            alert(`Date ${formatDate(blockToRemove.date)} is now available for booking!`);
        }
    };

    const handleBulkUnblock = () => {
        if (selectedBlocks.length === 0) {
            alert("Please select at least one blocked date to unblock");
            return;
        }

        if (confirm(`Are you sure you want to unblock ${selectedBlocks.length} date(s)?`)) {
            setBlockedDates(blockedDates.filter(b => !selectedBlocks.includes(b.id)));
            setSelectedBlocks([]);
            alert(`${selectedBlocks.length} date(s) have been unblocked successfully!`);
        }
    };

    const handleToggleSelectBlock = (blockId) => {
        setSelectedBlocks(prev =>
            prev.includes(blockId)
                ? prev.filter(id => id !== blockId)
                : [...prev, blockId]
        );
    };

    const handleSelectAllBlocks = () => {
        if (selectedBlocks.length === filteredBlockedDates.length) {
            setSelectedBlocks([]);
        } else {
            setSelectedBlocks(filteredBlockedDates.map(b => b.id));
        }
    };

    // Generate calendar days
    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        const days = [];

        // Add empty cells for days before the first day of month
        const firstDayIndex = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.
        // Adjust for Monday as first day
        const offset = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

        for (let i = 0; i < offset; i++) {
            days.push(null);
        }

        // Add days of the month
        for (let d = 1; d <= lastDay.getDate(); d++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            days.push(dateStr);
        }

        return days;
    };

    const filteredBlockedDates = blockedDates.filter(block => {
        if (filterMonth !== "all") {
            const blockMonth = new Date(block.date).getMonth();
            if (blockMonth !== parseInt(filterMonth)) return false;
        }
        if (filterReason !== "all") {
            if (filterReason === "maintenance" && !block.reason.toLowerCase().includes("maintenance")) return false;
            if (filterReason === "holiday" && !block.reason.toLowerCase().includes("holiday")) return false;
            if (filterReason === "private" && !block.reason.toLowerCase().includes("private")) return false;
            if (filterReason === "other") {
                if (block.reason.toLowerCase().includes("maintenance") ||
                    block.reason.toLowerCase().includes("holiday") ||
                    block.reason.toLowerCase().includes("private")) return false;
            }
        }
        return true;
    });

    const getMonthOptions = () => {
        const months = new Set();
        blockedDates.forEach(block => {
            const date = new Date(block.date);
            months.add(date.getMonth());
        });
        return Array.from(months).sort();
    };

    const calendarDays = getDaysInMonth(currentMonth);
    const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    // Calculate stats
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const futureBlockedDates = blockedDates.filter(b => {
        const blockDate = new Date(b.date);
        blockDate.setHours(0, 0, 0, 0);
        return blockDate >= today;
    }).length;

    const futureBookedDates = bookedDates.filter(b => {
        const bookDate = new Date(b.date);
        bookDate.setHours(0, 0, 0, 0);
        return bookDate >= today;
    }).length;

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <div className="mb-4 text-6xl">📅</div>
                    <p className="text-gray-600">Loading availability...</p>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Breadcrumb */}
            <div className="border-b bg-white">
                <div className="container mx-auto px-4 py-4">
                    <nav className="flex items-center text-sm text-gray-600">
                        <button onClick={() => router.push("/owner/dashboard")} className="hover:text-emerald-600">
                            Dashboard
                        </button>
                        <span className="mx-2">/</span>
                        <button onClick={() => router.push("/owner/venues")} className="hover:text-emerald-600">
                            Venues
                        </button>
                        <span className="mx-2">/</span>
                        <button onClick={() => router.push(`/owner/venues/${params.id}`)} className="hover:text-emerald-600">
                            {venue?.name}
                        </button>
                        <span className="mx-2">/</span>
                        <span className="text-gray-900">Availability</span>
                    </nav>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
                                Manage Availability
                            </h1>
                            <p className="mt-2 text-gray-600">
                                {venue?.name} • Block dates to make them unavailable for booking
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setBulkBlockMode(!bulkBlockMode)}
                                className={`rounded-lg px-4 py-2 font-medium ${bulkBlockMode
                                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                                    : "border border-emerald-600 bg-white text-emerald-600 hover:bg-emerald-50"
                                    }`}
                            >
                                {bulkBlockMode ? "Cancel Bulk Block" : "📦 Bulk Block Dates"}
                            </button>
                            <button
                                onClick={() => router.push(`/owner/venues/${params.id}`)}
                                className="rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
                            >
                                ← Back to Venue
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Summary */}
                <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
                    <div className="rounded-xl border border-gray-200 bg-white p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm text-gray-600">Available Dates</div>
                                <div className="text-3xl font-bold text-emerald-600">
                                    {/* All future dates minus blocked and booked */}
                                    ∞
                                </div>
                                <div className="text-xs text-gray-500">All future dates available by default</div>
                            </div>
                            <div className="rounded-full bg-emerald-100 p-3 text-emerald-600">
                                📅
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl border border-gray-200 bg-white p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm text-gray-600">Blocked Dates</div>
                                <div className="text-3xl font-bold text-amber-600">{futureBlockedDates}</div>
                                <div className="text-xs text-gray-500">Temporarily unavailable</div>
                            </div>
                            <div className="rounded-full bg-amber-100 p-3 text-amber-600">
                                ⛔
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl border border-gray-200 bg-white p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm text-gray-600">Booked Dates</div>
                                <div className="text-3xl font-bold text-blue-600">{futureBookedDates}</div>
                                <div className="text-xs text-gray-500">Confirmed bookings</div>
                            </div>
                            <div className="rounded-full bg-blue-100 p-3 text-blue-600">
                                ✅
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl border border-gray-200 bg-white p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm text-gray-600">Blocked this month</div>
                                <div className="text-3xl font-bold text-purple-600">
                                    {blockedDates.filter(b => {
                                        const date = new Date(b.date);
                                        return date.getMonth() === currentMonth.getMonth() &&
                                            date.getFullYear() === currentMonth.getFullYear();
                                    }).length}
                                </div>
                                <div className="text-xs text-gray-500">{formatMonthYear(currentMonth)}</div>
                            </div>
                            <div className="rounded-full bg-purple-100 p-3 text-purple-600">
                                📊
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Left Column - Calendar */}
                    <div className="lg:col-span-2">
                        <div className="rounded-xl border border-gray-200 bg-white p-6">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-900">Availability Calendar</h2>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <span className="h-3 w-3 rounded-full bg-emerald-500"></span>
                                        <span className="text-sm text-gray-600">Available</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="h-3 w-3 rounded-full bg-amber-500"></span>
                                        <span className="text-sm text-gray-600">Blocked</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="h-3 w-3 rounded-full bg-blue-500"></span>
                                        <span className="text-sm text-gray-600">Booked</span>
                                    </div>
                                </div>
                            </div>

                            {/* Month Navigation */}
                            <div className="mb-6">
                                <div className="flex items-center justify-between">
                                    <button
                                        onClick={handlePrevMonth}
                                        className="rounded-lg p-2 hover:bg-gray-100"
                                    >
                                        ←
                                    </button>
                                    <h3 className="text-lg font-semibold">{formatMonthYear(currentMonth)}</h3>
                                    <button
                                        onClick={handleNextMonth}
                                        className="rounded-lg p-2 hover:bg-gray-100"
                                    >
                                        →
                                    </button>
                                </div>
                            </div>

                            {/* Calendar Grid */}
                            <div className="mb-6">
                                <div className="grid grid-cols-7 gap-1">
                                    {weekdays.map(day => (
                                        <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                                            {day}
                                        </div>
                                    ))}

                                    {calendarDays.map((dateStr, index) => {
                                        if (!dateStr) {
                                            return <div key={`empty-${index}`} className="min-h-25 rounded-lg border border-gray-100 bg-gray-50 p-2"></div>;
                                        }

                                        const status = getDateStatus(dateStr);
                                        const isSelected = selectedDate === dateStr;
                                        const isToday = dateStr === new Date().toISOString().split('T')[0];
                                        const blockedInfo = blockedDates.find(b => b.date === dateStr);

                                        return (
                                            <div
                                                key={dateStr}
                                                onClick={() => handleDateClick(dateStr)}
                                                className={`
                                                    relative min-h-25 cursor-pointer rounded-lg border p-2 transition-all
                                                    ${status === 'past' ? 'bg-gray-50 opacity-60' : 'hover:shadow-md'}
                                                    ${status === 'available' ? 'border-emerald-200 bg-emerald-50' : ''}
                                                    ${status === 'blocked' ? 'border-amber-200 bg-amber-50' : ''}
                                                    ${status === 'booked' ? 'border-blue-200 bg-blue-50' : ''}
                                                    ${isToday ? 'ring-2 ring-emerald-500' : ''}
                                                    ${isSelected ? 'ring-2 ring-emerald-600' : ''}
                                                    ${status === 'available' && !isPastDate(dateStr) ? 'hover:border-emerald-400 hover:bg-emerald-100' : ''}
                                                    ${status === 'blocked' && !isPastDate(dateStr) ? 'hover:border-amber-400 hover:bg-amber-100' : ''}
                                                `}
                                            >
                                                <div className="mb-1 flex justify-between">
                                                    <span className={`
                                                        text-sm font-medium
                                                        ${status === 'past' ? 'text-gray-400' : 'text-gray-900'}
                                                    `}>
                                                        {dateStr.split('-')[2]}
                                                    </span>
                                                    {status === 'booked' && (
                                                        <span className="text-xs text-blue-600" title="Booked">📋</span>
                                                    )}
                                                    {status === 'blocked' && (
                                                        <span className="text-xs text-amber-600" title="Blocked">⛔</span>
                                                    )}
                                                </div>

                                                {status === 'booked' && (
                                                    <div className="text-xs text-blue-700">
                                                        {bookedDates.find(b => b.date === dateStr)?.guests} guests
                                                    </div>
                                                )}

                                                {status === 'blocked' && blockedInfo && (
                                                    <div className="text-xs text-amber-700">
                                                        {blockedInfo.reason.length > 15
                                                            ? blockedInfo.reason.substring(0, 15) + '...'
                                                            : blockedInfo.reason}
                                                    </div>
                                                )}

                                                {status === 'available' && !isPastDate(dateStr) && (
                                                    <div className="mt-2 text-center">
                                                        <span className="rounded px-2 py-1 text-xs font-medium text-emerald-800">
                                                            Available
                                                        </span>
                                                    </div>
                                                )}

                                                {status === 'past' && (
                                                    <div className="mt-2 text-center">
                                                        <span className="text-xs text-gray-500">
                                                            Past
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Bulk Block Mode */}
                            {bulkBlockMode && (
                                <div className="mt-6 rounded-xl border-2 border-emerald-200 bg-emerald-50 p-6">
                                    <h3 className="mb-4 font-semibold text-emerald-900">Bulk Block Dates</h3>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                Start Date
                                            </label>
                                            <DatePicker
                                                selected={dateRange.startDate}
                                                onChange={(date) => setDateRange({ ...dateRange, startDate: date })}
                                                minDate={new Date()}
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:ring-emerald-500"
                                                placeholderText="Select start date"
                                                dateFormat="dd/MM/yyyy"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                End Date
                                            </label>
                                            <DatePicker
                                                selected={dateRange.endDate}
                                                onChange={(date) => setDateRange({ ...dateRange, endDate: date })}
                                                minDate={dateRange.startDate || new Date()}
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:ring-emerald-500"
                                                placeholderText="Select end date"
                                                dateFormat="dd/MM/yyyy"
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Reason for blocking (optional)
                                        </label>
                                        <input
                                            type="text"
                                            value={blockReason}
                                            onChange={(e) => setBlockReason(e.target.value)}
                                            placeholder="e.g., Maintenance, Holiday, Private Event"
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:ring-emerald-500"
                                        />
                                    </div>
                                    <div className="mt-6 flex gap-3">
                                        <button
                                            onClick={handleBulkBlockDates}
                                            disabled={!dateRange.startDate || !dateRange.endDate}
                                            className="flex-1 rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
                                        >
                                            Block Selected Range
                                        </button>
                                        <button
                                            onClick={() => setBulkBlockMode(false)}
                                            className="rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Legend and Info */}
                            <div className="mt-4 text-sm text-gray-500">
                                <p>💡 <span className="font-medium">Available by default:</span> All future dates are available unless blocked or booked.</p>
                                <p className="mt-1">📌 Click on an <span className="text-emerald-600 font-medium">available</span> date to block it. Click on a <span className="text-amber-600 font-medium">blocked</span> date to unblock it.</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Blocked Dates List */}
                    <div className="space-y-6">
                        <div className="rounded-xl border border-gray-200 bg-white p-6">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-900">Blocked Dates</h2>
                                <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
                                    {filteredBlockedDates.length} blocked
                                </span>
                            </div>

                            {/* Filters */}
                            <div className="mb-6 grid gap-3">
                                <select
                                    value={filterMonth}
                                    onChange={(e) => setFilterMonth(e.target.value)}
                                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                                >
                                    <option value="all">All Months</option>
                                    {getMonthOptions().map(month => (
                                        <option key={month} value={month}>
                                            {new Date(2024, month, 1).toLocaleDateString('en-IN', { month: 'long' })}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    value={filterReason}
                                    onChange={(e) => setFilterReason(e.target.value)}
                                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                                >
                                    <option value="all">All Reasons</option>
                                    <option value="maintenance">Maintenance</option>
                                    <option value="holiday">Holiday</option>
                                    <option value="private">Private Event</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            {/* Bulk Actions */}
                            {selectedBlocks.length > 0 && (
                                <div className="mb-4 rounded-lg bg-amber-50 p-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-amber-800">
                                            {selectedBlocks.length} selected
                                        </span>
                                        <button
                                            onClick={handleBulkUnblock}
                                            className="text-sm font-medium text-red-600 hover:text-red-700"
                                        >
                                            Unblock Selected
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Blocked Dates List */}
                            <div className="max-h-100 space-y-3 overflow-y-auto">
                                {filteredBlockedDates.length === 0 ? (
                                    <div className="py-8 text-center text-gray-500">
                                        <div className="mb-2 text-4xl">📭</div>
                                        <p>No blocked dates found</p>
                                        <p className="mt-2 text-sm">All future dates are available by default</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex items-center gap-2 border-b pb-2">
                                            <input
                                                type="checkbox"
                                                checked={selectedBlocks.length === filteredBlockedDates.length && filteredBlockedDates.length > 0}
                                                onChange={handleSelectAllBlocks}
                                                className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                            />
                                            <span className="text-xs text-gray-500">Select All</span>
                                        </div>
                                        {filteredBlockedDates.map((block) => (
                                            <div
                                                key={block.id}
                                                className="rounded-lg border border-gray-200 p-4 hover:border-amber-300 hover:bg-amber-50"
                                            >
                                                <div className="mb-2 flex items-start justify-between">
                                                    <div className="flex items-start gap-2">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedBlocks.includes(block.id)}
                                                            onChange={() => handleToggleSelectBlock(block.id)}
                                                            className="mt-1 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                                        />
                                                        <div>
                                                            <div className="font-medium text-gray-900">
                                                                {formatDate(block.date)}
                                                            </div>
                                                            <div className="text-sm text-gray-600">
                                                                {block.reason}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => handleUnblockDate(block.id)}
                                                        className="rounded p-1 text-gray-400 hover:bg-red-100 hover:text-red-600"
                                                        title="Unblock date"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                                <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                                                    <span>Blocked: {formatDate(block.createdAt)}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Block Date Modal */}
            {showBlockModal && selectedDate && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="w-full max-w-md rounded-xl bg-white p-6">
                        <h3 className="mb-4 text-xl font-semibold text-gray-900">Block Date</h3>
                        <div className="mb-4">
                            <p className="text-sm text-gray-600">
                                You are about to block:
                            </p>
                            <p className="mt-1 text-lg font-medium text-gray-900">
                                {formatDate(selectedDate)}
                            </p>
                        </div>
                        <div className="mb-6">
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Reason for blocking (optional)
                            </label>
                            <input
                                type="text"
                                value={blockReason}
                                onChange={(e) => setBlockReason(e.target.value)}
                                placeholder="e.g., Maintenance, Holiday, Private Event"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:ring-emerald-500"
                                autoFocus
                            />
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={handleBlockDate}
                                className="flex-1 rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700"
                            >
                                Block Date
                            </button>
                            <button
                                onClick={() => {
                                    setShowBlockModal(false);
                                    setBlockReason("");
                                    setSelectedDate(null);
                                }}
                                className="rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}