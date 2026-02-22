import { NextResponse } from 'next/server';
import { BrevoClient } from '@getbrevo/brevo';

const brevoApiKey = process.env.BREVO_API_KEY;

export async function POST(request: Request) {
    try {
        const { name, email, message } = await request.json();

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Name, email, and message are required fields.' },
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
            subject: `New Contact Form Submission from ${name}`,
            htmlContent: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
            sender: { name: "Contact Form", email: contactEmail },
            to: [{ email: contactEmail }],
            replyTo: { email: email, name: name }
        });

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Contact Form Error:', error);
        return NextResponse.json(
            { error: 'An unexpected error occurred or failed to send email.' },
            { status: 500 }
        );
    }
}
