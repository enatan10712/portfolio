import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (apiKey) {
      const resend = new Resend(apiKey);
      const { data, error } = await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: process.env.CONTACT_EMAIL || 'enatan@example.com',
        subject: `New Portfolio Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      });

      if (error) {
        return NextResponse.json({ error }, { status: 400 });
      }

      return NextResponse.json({ message: 'Email sent successfully', data });
    } else {
      // Log for development if no API key
      console.log('Mock email sent:', { name, email, message });
      return NextResponse.json({ message: 'Mock email sent successfully (no API key)' });
    }
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
