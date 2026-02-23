"use client";

import { useState, useEffect } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, parseISO } from "date-fns";
import { useLocale } from "next-intl";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

// Get date-fns locales conditionally based on language
import { enUS, sk, de } from "date-fns/locale";

interface OccupiedDate {
    start: string;
    end: string;
}

export default function CustomCalendar({ occupiedText }: { occupiedText: string }) {
    const locale = useLocale();
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [occupiedDates, setOccupiedDates] = useState<OccupiedDate[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Pick the correct date-fns locale
    const dateFnsLocale = locale === "sk" ? sk : locale === "de" ? de : enUS;

    useEffect(() => {
        const fetchCalendarData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch("/api/calendar");
                const data = await response.json();

                if (data.success) {
                    setOccupiedDates(data.data);
                } else {
                    setError("Failed to load availability.");
                }
            } catch (err) {
                console.error(err);
                setError("Error connecting to calendar server.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchCalendarData();
    }, []);

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

    // Calculate dates for the grid
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    // Start grid at Monday for Europe layout (weekStartsOn: 1)
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const dateFormat = "d";
    const days = eachDayOfInterval({ start: startDate, end: endDate });

    // Generate localized day names (Mon, Tue, etc.)
    const weekDays = [];
    let d = startDate;
    for (let i = 0; i < 7; i++) {
        weekDays.push(
            <div key={i} className="font-bold text-gray-500 text-sm py-2 text-center uppercase tracking-wider">
                {format(d, "EEE", { locale: dateFnsLocale })}
            </div>
        );
        d = addMonths(d, 0); // Need to add 1 day correctly. Fixed below.
    }

    // Function to check if a specific day falls within any `OccupiedDate` range
    const isOccupied = (day: Date) => {
        return occupiedDates.some((range) => {
            const start = parseISO(range.start);
            const end = parseISO(range.end);
            return day >= start && day < end; // `< end` because checkout day is usually free
        });
    };

    return (
        <div className="bg-white p-4 sm:p-8 rounded-3xl shadow-2xl relative select-none">
            {/* Calendar Header */}
            <div className="flex justify-between items-center mb-6">
                <button onClick={prevMonth} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                    <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>
                <h3 className="text-2xl font-bold text-gray-800 capitalize">
                    {format(currentMonth, "MMMM yyyy", { locale: dateFnsLocale })}
                </h3>
                <button onClick={nextMonth} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                    <ChevronRight className="w-6 h-6 text-gray-700" />
                </button>
            </div>

            {/* Calendar Loading State Overlay */}
            {isLoading && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-3xl">
                    <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                    <p className="text-gray-600 font-semibold">Loading Dates...</p>
                </div>
            )}

            {/* Calendar Error State Overlay */}
            {error && !isLoading && (
                <div className="absolute inset-0 bg-white/90 z-10 flex flex-col items-center justify-center rounded-3xl p-6 text-center">
                    <p className="text-red-500 font-bold mb-2">Oops!</p>
                    <p className="text-gray-600">{error}</p>
                </div>
            )}

            {/* Days of week header */}
            <div className="grid grid-cols-7 mb-2">
                {["1", "2", "3", "4", "5", "6", "0"].map((dayIndex) => {
                    // Creating a dummy date for formatting just to get correct weekday names starting Monday
                    const tempDate = new Date(2024, 0, parseInt(dayIndex)); // 2024-01-01 was a Monday
                    return (
                        <div key={dayIndex} className="font-bold text-gray-400 text-xs sm:text-sm py-2 text-center uppercase tracking-wider">
                            {format(tempDate, "EEE", { locale: dateFnsLocale })}
                        </div>
                    )
                })}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2">
                {days.map((day, i) => {
                    const occupied = isOccupied(day);
                    const isCurrentMonth = isSameMonth(day, monthStart);
                    const isToday = isSameDay(day, new Date());

                    return (
                        <div
                            key={i}
                            className={`
                                relative h-16 sm:h-24 p-1 sm:p-2 transition-all flex flex-col
                                ${!isCurrentMonth ? "bg-transparent pointer-events-none" : "bg-white text-gray-800 border-gray-200 border rounded-xl hover:border-primary/50"}
                                ${isToday && !occupied && isCurrentMonth ? "border-primary ring-1 ring-primary" : ""}
                                ${occupied && isCurrentMonth ? "bg-red-50 border-red-200" : ""}
                            `}
                        >
                            {isCurrentMonth && (
                                <>
                                    {/* Number in the corner */}
                                    <span className={`text-sm font-semibold mb-1 ${isToday && !occupied ? 'text-primary' : ''} ${occupied ? 'text-red-600' : ''}`}>
                                        {format(day, dateFormat)}
                                    </span>

                                    {/* Occupied Chip */}
                                    {occupied && (
                                        <div className="mt-auto bg-red-500 text-white text-[10px] sm:text-xs font-bold px-1 py-0.5 sm:py-1 rounded-md text-center truncate">
                                            {occupiedText}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Legend Footer */}
            <div className="mt-6 pt-4 border-t flex justify-end items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-md border bg-white"></div>
                    Available
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-md bg-red-500"></div>
                    {occupiedText}
                </div>
            </div>
        </div>
    );
}
