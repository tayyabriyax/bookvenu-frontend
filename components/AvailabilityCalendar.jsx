// components/AvailabilityCalendar.js
"use client";

import { useState, useEffect } from "react";

export default function AvailabilityCalendar({ availableDates }) {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState("");

    // Get days in month
    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    // Get first day of month
    const getFirstDayOfMonth = (year, month) => {
        return new Date(year, month, 1).getDay();
    };

    // Generate calendar days
    const generateCalendarDays = () => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const daysInMonth = getDaysInMonth(year, month);
        const firstDay = getFirstDayOfMonth(year, month);

        const days = [];

        // Add empty cells for days before first day
        for (let i = 0; i < firstDay; i++) {
            days.push(null);
        }

        // Add days of the month
        for (let i = 1; i <= daysInMonth; i++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            const isAvailable = availableDates.includes(dateStr);
            const isToday = dateStr === new Date().toISOString().split('T')[0];
            const isSelected = dateStr === selectedDate;

            days.push({
                date: i,
                dateStr,
                isAvailable,
                isToday,
                isSelected
            });
        }

        return days;
    };

    // Navigation
    const prevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const days = generateCalendarDays();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="mb-6 flex items-center justify-between">
                <h4 className="text-lg font-semibold text-gray-900">Availability Calendar</h4>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={prevMonth}
                        className="rounded-lg p-2 hover:bg-gray-100"
                    >
                        ←
                    </button>
                    <span className="font-medium text-gray-900">
                        {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                    </span>
                    <button
                        onClick={nextMonth}
                        className="rounded-lg p-2 hover:bg-gray-100"
                    >
                        →
                    </button>
                </div>
            </div>

            {/* Legend */}
            <div className="mb-4 flex flex-wrap gap-4">
                <div className="flex items-center">
                    <div className="mr-2 h-3 w-3 rounded-full bg-emerald-500"></div>
                    <span className="text-sm text-gray-600">Available</span>
                </div>
                <div className="flex items-center">
                    <div className="mr-2 h-3 w-3 rounded-full bg-gray-300"></div>
                    <span className="text-sm text-gray-600">Booked</span>
                </div>
                <div className="flex items-center">
                    <div className="mr-2 h-3 w-3 rounded-full bg-amber-500"></div>
                    <span className="text-sm text-gray-600">Today</span>
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
                {/* Day Headers */}
                {dayNames.map(day => (
                    <div key={day} className="text-center text-sm font-medium text-gray-500">
                        {day}
                    </div>
                ))}

                {/* Calendar Days */}
                {days.map((day, index) => (
                    <div key={index} className="aspect-square">
                        {day ? (
                            <button
                                onClick={() => day.isAvailable && setSelectedDate(day.dateStr)}
                                className={`h-full w-full rounded-lg text-sm transition-all ${day.isSelected
                                        ? "bg-emerald-600 text-white"
                                        : day.isToday
                                            ? "bg-amber-100 text-amber-900"
                                            : day.isAvailable
                                                ? "bg-emerald-100 text-gray-900 hover:bg-emerald-200"
                                                : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                    } ${!day.isAvailable && "line-through"}`}
                                disabled={!day.isAvailable}
                            >
                                {day.date}
                                {!day.isAvailable && (
                                    <div className="text-xs text-gray-400">Booked</div>
                                )}
                            </button>
                        ) : (
                            <div></div>
                        )}
                    </div>
                ))}
            </div>

            {/* Selected Date Info */}
            {selectedDate && (
                <div className="mt-6 rounded-lg bg-emerald-50 p-4">
                    <p className="text-emerald-800">
                        <span className="font-semibold">Selected Date:</span> {new Date(selectedDate).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </p>
                    <p className="mt-1 text-sm text-emerald-700">
                        This date is available for booking
                    </p>
                </div>
            )}

            <p className="mt-4 text-sm text-gray-500">
                * Calendar shows availability for venue only. Please check with manager for specific time slots.
            </p>
        </div>
    );
}