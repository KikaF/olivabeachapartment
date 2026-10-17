import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const response = await fetch("https://formspree.io/f/xgaeeklk", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(body)
        });

        if (response.ok) {
            return NextResponse.json({ success: true });
        } else {
            const data = await response.json();
            return NextResponse.json(
                { error: data.error || "Failed to submit form to Formspree." },
                { status: response.status }
            );
        }
    } catch (error) {
        console.error("Contact API Route Error:", error);
        return NextResponse.json(
            { error: "An unexpected error occurred." },
            { status: 500 }
        );
    }
}
