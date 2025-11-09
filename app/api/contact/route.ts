import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message, honeypot } = body;

    // Honeypot check - reject if filled
    if (honeypot) {
      return NextResponse.json(
        { error: "Invalid submission" },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Log the submission
    console.log("Contact form submission:", { name, email, subject, message });
    console.log("TO: enatan10712@gmail.com");
    
    // In production, you would send email via a service like:
    // - Resend (recommended, free tier)
    // - SendGrid
    // - Nodemailer with Gmail
    // 
    // See setup instructions in CONTACT_SETUP.md

    // Simulate sending email
    // await sendEmail({
    //   to: "your-email@example.com",
    //   from: email,
    //   subject: `Portfolio Contact: ${subject}`,
    //   text: `From: ${name} (${email})\n\n${message}`,
    // });

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
