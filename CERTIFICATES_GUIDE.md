# 📜 Certificate Upload Guide

## Quick Start

Your portfolio now has a **Certificate Gallery** on the Blog page! Here's how to add your certificates:

## 📋 Step-by-Step Instructions

### 1️⃣ Prepare Your Certificates

**Scan or screenshot your certificates:**
- Use high resolution (300 DPI minimum)
- Save as JPG or PNG
- Recommended aspect ratio: 16:9 (landscape)
- Optimize file size (keep under 500KB)

**Example tools:**
- Mobile scanner apps (Adobe Scan, Microsoft Lens)
- Desktop scanner
- Screenshot tool (Windows Snipping Tool, macOS Screenshot)

### 2️⃣ Add Images to the Folder

Place your certificate images in:
```
portfolio/public/certificates/
```

**File naming best practices:**
```
✅ Good: aws-solutions-architect.jpg
✅ Good: ml-specialization-stanford.png
✅ Good: ethical-hacker-cert.jpg

❌ Bad: IMG_1234.jpg
❌ Bad: Certificate (1).png
❌ Bad: my cert.jpeg (spaces in filename)
```

### 3️⃣ Update the Certificate Data

Edit `data/certificates.json` and add your certificate details:

```json
{
  "id": "cert-unique-id",
  "title": "Your Certificate Name",
  "issuer": "Issuing Organization",
  "date": "Month Year",
  "image": "/certificates/your-image.jpg",
  "credentialUrl": "https://credential-verification-url.com",
  "skills": ["Skill 1", "Skill 2", "Skill 3"]
}
```

### 4️⃣ Real Example

```json
{
  "id": "cert-aws-2024",
  "title": "AWS Certified Solutions Architect - Associate",
  "issuer": "Amazon Web Services",
  "date": "January 2024",
  "image": "/certificates/aws-solutions-architect.jpg",
  "credentialUrl": "https://www.credly.com/badges/abc123...",
  "skills": ["AWS", "Cloud Architecture", "DevOps", "Infrastructure"]
}
```

## 🎯 Features

### Interactive Gallery
- ✅ **Click to enlarge** - View certificates in full screen
- ✅ **Responsive grid** - 3 columns on desktop, 1 on mobile
- ✅ **Smooth animations** - Fade-in and hover effects
- ✅ **Verification links** - Direct links to credential verification
- ✅ **Skills badges** - Show related technologies

### Certificate Modal
When clicked, each certificate opens in a modal with:
- Full-size image view
- Certificate details (title, issuer, date)
- Skills covered
- Verification button (if URL provided)
- Close button / click outside to dismiss

## 🎨 Customization

### Change Grid Layout

In `app/blog/page.tsx`, modify the grid:

```tsx
{/* 2 columns instead of 3 */}
<div className="grid md:grid-cols-2 gap-6">

{/* 4 columns on large screens */}
<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
```

### Move Certificates to Different Page

Want certificates on the Skills page instead?

1. Copy the certificates section from `app/blog/page.tsx`
2. Paste into `app/skills/page.tsx`
3. Import the component and data at the top

```tsx
import CertificateCard from "@/components/CertificateCard";
import certificatesData from "@/data/certificates.json";
```

### Filter Certificates by Category

Add a category field to certificates.json:

```json
{
  "category": "Cloud",
  ...
}
```

Then filter in the component:
```tsx
{certificatesData
  .filter(cert => cert.category === "Cloud")
  .map(cert => <CertificateCard {...cert} />)
}
```

## 📊 Recommended Certificate Sources

### Popular Platforms with Verification
- **Coursera** - coursera.org/verify
- **Credly** - credly.com
- **AWS Certification** - aws.amazon.com/verification
- **Microsoft Learn** - learn.microsoft.com
- **CompTIA** - comptia.org/certifications
- **EC-Council** - eccouncil.org
- **Google Cloud** - cloud.google.com/certification

### How to Find Verification URLs
1. Log into your certificate platform
2. Go to your earned certificates
3. Look for "Share" or "Verify" button
4. Copy the public verification link

## 🔧 Troubleshooting

### Images Not Showing?

**Check these:**
1. ✅ Image is in `/public/certificates/` folder
2. ✅ Path in JSON starts with `/certificates/` (not `public/`)
3. ✅ Filename matches exactly (case-sensitive)
4. ✅ Image format is supported (JPG, PNG, WebP)

**Correct path:**
```json
"image": "/certificates/my-cert.jpg"  ✅
```

**Incorrect paths:**
```json
"image": "public/certificates/my-cert.jpg"  ❌
"image": "certificates/my-cert.jpg"  ❌
"image": "./certificates/my-cert.jpg"  ❌
```

### Certificate Looks Blurry?

Use higher resolution images:
- Minimum: 1280x720px
- Recommended: 1920x1080px
- Ideal: 2560x1440px

### Modal Not Opening?

Check browser console for errors. Common issues:
- Missing image file
- Invalid JSON syntax in certificates.json
- Browser JavaScript disabled

## 🚀 Advanced: Bulk Upload Script

Create a script to batch process certificates:

```javascript
// scripts/add-certificate.js
const fs = require('fs');
const path = require('path');

const newCert = {
  id: `cert-${Date.now()}`,
  title: process.argv[2],
  issuer: process.argv[3],
  date: process.argv[4],
  image: `/certificates/${process.argv[5]}`,
  skills: process.argv.slice(6)
};

const certsPath = path.join(__dirname, '../data/certificates.json');
const certs = JSON.parse(fs.readFileSync(certsPath, 'utf8'));
certs.push(newCert);
fs.writeFileSync(certsPath, JSON.stringify(certs, null, 2));

console.log('✅ Certificate added!');
```

**Usage:**
```bash
node scripts/add-certificate.js "AWS Cert" "Amazon" "Jan 2024" "aws.jpg" "AWS" "Cloud"
```

## 📱 Mobile Optimization

The certificate gallery is fully responsive:
- **Mobile:** 1 column, full width
- **Tablet:** 2 columns
- **Desktop:** 3 columns
- **Large screens:** 3-4 columns

Touch-friendly with large tap targets.

## ♿ Accessibility

The component includes:
- ✅ Keyboard navigation (Tab, Enter, Escape)
- ✅ Screen reader support (ARIA labels)
- ✅ Alt text on images
- ✅ Focus indicators
- ✅ High contrast support

---

**Need help?** Check the component at `components/CertificateCard.tsx` or refer to the main README.md

**Ready to deploy?** Your certificates will automatically be included in production builds! 🎓✨
