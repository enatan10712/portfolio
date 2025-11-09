import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const recipientEmail = process.env.RECIPIENT_EMAIL || "enatan10712@gmail.com";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message, honeypot } = body;

    if (honeypot) {
      return NextResponse.json(
        { error: "Invalid submission" },
        { status: 400 }
      );
    }

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY environment variable.");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [recipientEmail],
      subject: `Portfolio Contact: ${subject}`,
      replyTo: email,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send message" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
