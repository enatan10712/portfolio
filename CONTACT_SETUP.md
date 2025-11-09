# 📧 Contact Form Email Setup Guide

Your contact form is ready! Here's how to connect it to send emails to **enatan10712@gmail.com**.

---

## 🚀 Quick Setup (Recommended: Resend)

### Option 1: Resend (Easiest, Free Tier)

**Why Resend?**
- ✅ Free tier: 100 emails/day
- ✅ No credit card required
- ✅ Simple API
- ✅ Takes 5 minutes

#### Step 1: Sign Up
1. Go to [resend.com](https://resend.com)
2. Sign up with GitHub or email
3. Verify your email

#### Step 2: Get API Key
1. Go to API Keys section
2. Click "Create API Key"
3. Name it "Portfolio Contact Form"
4. Copy the API key (starts with `re_`)

#### Step 3: Add to Project

Create `.env.local` file in your portfolio folder:
```bash
RESEND_API_KEY=re_your_api_key_here
RECIPIENT_EMAIL=enatan10712@gmail.com
```

#### Step 4: Install Resend

```bash
npm install resend
```

#### Step 5: Update API Route

Replace the content in `app/api/contact/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message, honeypot } = body;

    // Honeypot check
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

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Use this for testing
      to: [process.env.RECIPIENT_EMAIL || 'enatan10712@gmail.com'],
      subject: `Portfolio Contact: ${subject}`,
      replyTo: email,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
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
```

#### Step 6: Test It!

1. Restart your dev server: `npm run dev`
2. Go to `/contact` page
3. Fill out the form
4. Check **enatan10712@gmail.com** for the email!

**Note:** With free tier, you can only send FROM `onboarding@resend.dev`. To use your own domain, you need to verify it (optional).

---

## Option 2: Gmail with Nodemailer (Free, More Setup)

### Step 1: Enable App Password

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification (if not already)
3. Go to "App passwords"
4. Generate password for "Mail"
5. Copy the 16-character password

### Step 2: Install Nodemailer

```bash
npm install nodemailer
```

### Step 3: Add to .env.local

```bash
GMAIL_USER=enatan10712@gmail.com
GMAIL_APP_PASSWORD=your_16_char_password
RECIPIENT_EMAIL=enatan10712@gmail.com
```

### Step 4: Update API Route

```typescript
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message, honeypot } = body;

    if (honeypot) {
      return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
    }

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Send email
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject: `Portfolio Contact: ${subject}`,
      replyTo: email,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    return NextResponse.json({ message: "Message sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
```

---

## Option 3: SendGrid (Professional)

### Step 1: Sign Up
1. Go to [sendgrid.com](https://sendgrid.com)
2. Free tier: 100 emails/day
3. Verify your email

### Step 2: Create API Key
1. Settings → API Keys
2. Create API Key
3. Copy it (starts with `SG.`)

### Step 3: Install SendGrid

```bash
npm install @sendgrid/mail
```

### Step 4: Add to .env.local

```bash
SENDGRID_API_KEY=SG.your_api_key
RECIPIENT_EMAIL=enatan10712@gmail.com
```

### Step 5: Update API Route

```typescript
import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message, honeypot } = body;

    if (honeypot) {
      return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
    }

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    await sgMail.send({
      to: process.env.RECIPIENT_EMAIL || 'enatan10712@gmail.com',
      from: 'your-verified-email@yourdomain.com', // Must be verified in SendGrid
      subject: `Portfolio Contact: ${subject}`,
      replyTo: email,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    return NextResponse.json({ message: "Message sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("SendGrid error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
```

---

## 🔒 Security Tips

### Never commit .env.local!

Already in `.gitignore`:
```
.env*.local
.env
```

### For Production (Vercel)

1. Go to your Vercel project
2. Settings → Environment Variables
3. Add:
   - `RESEND_API_KEY` (or `GMAIL_APP_PASSWORD`)
   - `RECIPIENT_EMAIL=enatan10712@gmail.com`
4. Redeploy

---

## ✅ Testing Checklist

- [ ] Install email service package
- [ ] Add API key to `.env.local`
- [ ] Update `app/api/contact/route.ts`
- [ ] Restart dev server (`npm run dev`)
- [ ] Fill out contact form
- [ ] Check **enatan10712@gmail.com**
- [ ] Verify reply-to works
- [ ] Test spam protection (fill honeypot field)

---

## 🎯 Recommendation

**Use Resend** for the easiest setup:
- No Gmail app passwords needed
- Free tier is generous
- Simple API
- Works perfectly with Vercel

**Total setup time: 5 minutes!**

---

## 📧 Current Status

Right now, the form:
✅ Validates all inputs  
✅ Has spam protection  
✅ Shows success/error messages  
✅ Logs to console  

❌ Doesn't actually send emails yet

**Follow Option 1 (Resend) above to enable email sending!**

---

## 🆘 Troubleshooting

### "Failed to send message"
- Check API key is correct in `.env.local`
- Restart dev server after adding env variables
- Check console for specific error

### Emails not arriving
- Check spam folder
- Verify email address is correct
- Check email service dashboard for delivery status

### "Invalid submission"
- Honeypot field was filled (spam protection working!)

---

**Once set up, all contact form submissions will go to enatan10712@gmail.com! 📬**
