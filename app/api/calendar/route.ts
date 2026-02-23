import { NextResponse } from 'next/server';

export const revalidate = 3600;

export async function GET() {
    try {
        const url = 'https://calendar.google.com/calendar/ical/info%40olivabeachapartment.com/public/basic.ics';

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch iCal: ${response.statusText}`);
        }
        const text = await response.text();

        const occupiedDates: { start: string, end: string }[] = [];

        // Simple and robust parsing of iCal text
        const events = text.split('BEGIN:VEVENT');

        // Skip the first split as it's the calendar header
        for (let i = 1; i < events.length; i++) {
            const eventText = events[i];

            // Extract DTSTART
            const startMatch = eventText.match(/DTSTART(?:;[^:]+)?:(\d{8}(?:T\d{6}Z)?)/);
            // Extract DTEND
            const endMatch = eventText.match(/DTEND(?:;[^:]+)?:(\d{8}(?:T\d{6}Z)?)/);

            if (startMatch && endMatch) {
                // Formatting YYYYMMDD to YYYY-MM-DD
                const formatIcalDate = (icalDate: string) => {
                    return `${icalDate.slice(0, 4)}-${icalDate.slice(4, 6)}-${icalDate.slice(6, 8)}`;
                };

                const startDate = formatIcalDate(startMatch[1]);
                const endDate = formatIcalDate(endMatch[1]);

                occupiedDates.push({ start: startDate, end: endDate });
            }
        }

        return NextResponse.json({ success: true, data: occupiedDates });

    } catch (error) {
        console.error('Failed to parse Google Calendar feed:', error);
        return NextResponse.json(
            { error: 'Failed to load calendar data' },
            { status: 500 }
        );
    }
}
