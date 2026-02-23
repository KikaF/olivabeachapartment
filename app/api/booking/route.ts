import { NextResponse } from 'next/server';
import { BrevoClient } from '@getbrevo/brevo';

const brevoApiKey = process.env.BREVO_API_KEY;

export async function POST(request: Request) {
    try {
        const { firstName, lastName, email, guests, checkIn, checkOut, message } = await request.json();

        if (!firstName || !lastName || !email || !checkIn || !checkOut) {
            return NextResponse.json(
                { error: 'First name, last name, email, check-in, and check-out are required fields.' },
                { status: 400 }
            );
        }

        if (!brevoApiKey) {
            console.warn('BREVO_API_KEY is not set. Simulating successful email send.');
            return NextResponse.json({ success: true, message: 'Email simulated (no API key).' });
        }

        const contactEmail = process.env.CONTACT_EMAIL;
        if (!contactEmail) {
            console.error('CONTACT_EMAIL environment variable is missing.');
            return NextResponse.json(
                { error: 'Server configuration error. Please try again later.' },
                { status: 500 }
            );
        }

        // Initialize Brevo API
        const brevo = new BrevoClient({
            apiKey: brevoApiKey,
        });

        const data = await brevo.transactionalEmails.sendTransacEmail({
            subject: `New Booking Request from ${firstName} ${lastName}`,
            htmlContent: `
        <h2>New Booking Request</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Guests:</strong> ${guests}</p>
        <p><strong>Check-in:</strong> ${checkIn}</p>
        <p><strong>Check-out:</strong> ${checkOut}</p>
        <p><strong>Message:</strong></p>
        <p>${message ? message.replace(/\n/g, '<br>') : 'None'}</p>
      `,
            sender: { name: "Booking Form", email: contactEmail },
            to: [{ email: contactEmail }],
            replyTo: { email: email, name: `${firstName} ${lastName}` }
        });

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Booking Form Error:', error);
        return NextResponse.json(
            { error: 'An unexpected error occurred or failed to send email.' },
            { status: 500 }
        );
    }
}
