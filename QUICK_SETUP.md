# ⚡ Quick Setup Guide

## 📧 Contact Form → enatan10712@gmail.com

### Current Status:
✅ Form is ready and validates inputs  
✅ Email destination: **enatan10712@gmail.com**  
❌ Email sending not configured yet (just logs to console)

### To Actually Send Emails (5 minutes):

1. **Sign up at [resend.com](https://resend.com)** (free, no credit card)
2. **Get API Key** from dashboard
3. **Create `.env.local` file** in portfolio folder:
   ```
   RESEND_API_KEY=re_your_key_here
   RECIPIENT_EMAIL=enatan10712@gmail.com
   ```
4. **Install Resend:**
   ```bash
   npm install resend
   ```
5. **See full instructions:** `CONTACT_SETUP.md`

**Until then:** Form submissions will show success but only log to console.

---

## 📜 Upload Your Certificates

### Super Quick Steps:

#### 1. Add Images
Put certificate images here:
```
portfolio/public/certificates/
```

Example:
```
portfolio/public/certificates/
├── aws-cert.jpg
├── ml-certificate.png
└── security-cert.jpg
```

#### 2. Update Data File
Edit `portfolio/data/certificates.json`:

```json
[
  {
    "id": "cert-1",
    "title": "AWS Certified Solutions Architect",
    "issuer": "Amazon Web Services",
    "date": "November 2024",
    "image": "/certificates/aws-cert.jpg",
    "credentialUrl": "https://credly.com/badges/...",
    "skills": ["AWS", "Cloud", "DevOps"]
  }
]
```

#### 3. Save & Refresh
- Save the file
- Browser auto-refreshes
- Go to `/blog` page
- Scroll down to see your certificates!

**See full guide:** `CERTIFICATE_UPLOAD.md`

---

## 📂 File Locations

### Contact Form Files:
- **API Route:** `app/api/contact/route.ts`
- **Component:** `components/ContactForm.tsx`
- **Page:** `app/contact/page.tsx`
- **Setup Guide:** `CONTACT_SETUP.md`

### Certificate Files:
- **Images Folder:** `public/certificates/`
- **Data File:** `data/certificates.json`
- **Component:** `components/CertificateCard.tsx`
- **Display Page:** `app/blog/page.tsx` (bottom section)
- **Upload Guide:** `CERTIFICATE_UPLOAD.md`

---

## ✅ Quick Checklist

### Contact Form:
- [x] Form validates inputs
- [x] Spam protection (honeypot)
- [x] Shows success/error messages
- [x] Email destination set: enatan10712@gmail.com
- [ ] Email service configured (see CONTACT_SETUP.md)

### Certificates:
- [x] Certificate gallery created
- [x] Sample certificate showing
- [x] Click to enlarge works
- [x] Responsive design
- [ ] Add your real certificates (see CERTIFICATE_UPLOAD.md)

---

## 🎯 Current Email: enatan10712@gmail.com

This email is now set in:
- Contact page social links
- API route comments
- Environment variable examples
- All documentation

---

## 📖 Full Documentation

- **Complete Contact Setup:** `CONTACT_SETUP.md`
- **Certificate Upload:** `CERTIFICATE_UPLOAD.md`
- **Premium Features:** `PREMIUM_TWEAKS.md`
- **Main README:** `README.md`
- **Design System:** `DESIGN_NOTES.md`

---

## 🚀 Next Steps

1. **Test the contact form** at `/contact`
2. **Add 1-2 certificates** to see how it looks
3. **Set up email sending** (5 min with Resend)
4. **Deploy to production** when ready!

---

**Questions? Check the detailed guides above!** 📚✨
