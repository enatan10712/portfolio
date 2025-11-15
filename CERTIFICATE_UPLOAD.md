# 📜 How to Upload Your Certificates

## 🎯 Quick Steps

### 1️⃣ Prepare Your Certificate Images

**Scan or Screenshot:**
- Use your phone scanner app (Adobe Scan, Microsoft Lens)
- Or screenshot from your certificate platform
- Or scan with a physical scanner

**Save as:**
- Format: `.jpg` or `.png`
- Name: Something descriptive like `aws-certification.jpg`

---

### 2️⃣ Add Images to Project

**Copy your certificate images to:**
```
portfolio/public/certificates/
```

**Full path:**
```
c:\Users\enata\Desktop\pjt\portfolio\public\certificates\
```

**Example:**
```
portfolio/public/certificates/
├── aws-solutions-architect.jpg
├── ml-specialization.png
├── ethical-hacker-cert.jpg
└── python-certificate.jpg
```

---

### 3️⃣ Update Certificate Data

**Open this file:**
```
portfolio/data/certificates.json
```

**Add your certificate info:**

```json
{
  "id": "cert-aws-2024",
  "title": "AWS Certified Solutions Architect",
  "issuer": "Amazon Web Services",
  "date": "November 2023",
  "image": "/certificates/aws-solutions-architect.jpg",
  "credentialUrl": "https://www.credly.com/badges/your-badge-id",
  "skills": ["AWS", "Cloud Architecture", "DevOps"]
}
```

---

## 📋 Complete Example

Let's say you have an AWS certification:

### Step 1: Save Image
- Save as: `aws-cert-2024.jpg`
- Place in: `c:\Users\enata\Desktop\pjt\portfolio\public\certificates\aws-cert-2024.jpg`

### Step 2: Edit certificates.json

Open: `portfolio/data/certificates.json`

Replace the sample data with:

```json
[
  {
    "id": "cert-aws-sa-2024",
    "title": "AWS Certified Solutions Architect - Associate",
    "issuer": "Amazon Web Services",
    "date": "November 2024",
    "image": "/certificates/aws-cert-2024.jpg",
    "credentialUrl": "https://www.credly.com/badges/abc123",
    "skills": ["AWS", "Cloud Computing", "Architecture", "EC2", "S3"]
  }
]
```

### Step 3: Save & Refresh

1. Save the `certificates.json` file
2. Your browser will auto-refresh
3. Go to `/blog` page
4. Scroll down to see your certificate!

---

## 🎨 Real Certificate Examples

### Machine Learning Certificate
```json
{
  "id": "cert-ml-stanford",
  "title": "Machine Learning Specialization",
  "issuer": "Stanford University - Coursera",
  "date": "October 2024",
  "image": "/certificates/ml-stanford.jpg",
  "credentialUrl": "https://coursera.org/verify/ABCD1234",
  "skills": ["Machine Learning", "Python", "Neural Networks", "TensorFlow"]
}
```

### Security Certificate
```json
{
  "id": "cert-ceh-2024",
  "title": "Certified Ethical Hacker (CEH)",
  "issuer": "EC-Council",
  "date": "September 2024",
  "image": "/certificates/ceh-cert.jpg",
  "credentialUrl": "https://aspen.eccouncil.org/Verify",
  "skills": ["Penetration Testing", "Ethical Hacking", "Network Security"]
}
```

### Data Science Certificate
```json
{
  "id": "cert-ds-ibm",
  "title": "IBM Data Science Professional Certificate",
  "issuer": "IBM",
  "date": "August 2024",
  "image": "/certificates/ibm-data-science.png",
  "credentialUrl": "https://coursera.org/verify/professional-cert/XYZ789",
  "skills": ["Python", "SQL", "Data Visualization", "Machine Learning"]
}
```

---

## 🖼️ Image Optimization Tips

### Best Practices:
✅ **Resolution:** 1920x1080px or larger  
✅ **File size:** Under 500KB  
✅ **Format:** JPG (for photos) or PNG (for text)  
✅ **Naming:** Use hyphens, lowercase, no spaces  

### Tools to Optimize:

**Online:**
- [TinyPNG](https://tinypng.com/) - Compress images
- [Squoosh](https://squoosh.app/) - Google's image compressor

**Desktop:**
- Windows: Use "Resize" in Photos app
- Mac: Preview → Tools → Adjust Size

**Quick Resize (Windows):**
1. Right-click image
2. Open with → Photos
3. Click "..." → Resize
4. Choose Large (1366px) or Custom

---

## 📂 File Naming Best Practices

### ✅ Good Names:
```
aws-solutions-architect.jpg
ml-specialization-stanford.png
certified-ethical-hacker.jpg
google-cloud-associate.jpg
```

### ❌ Bad Names:
```
Certificate (1).jpg  ❌ (spaces and generic)
IMG_1234.jpg         ❌ (not descriptive)
my cert.png          ❌ (spaces)
CERTIFICATE.JPG      ❌ (all caps)
```

---

## 🔗 Finding Verification URLs

### Coursera:
1. Go to your Coursera profile
2. Click on certificate
3. Look for "Share" button
4. Copy the verification link
5. Format: `https://coursera.org/verify/ABCD1234`

### Credly (AWS, CompTIA, etc.):
1. Log into Credly account
2. Click on your badge
3. Click "Share" or "Public URL"
4. Copy the link
5. Format: `https://www.credly.com/badges/your-badge-id`

### LinkedIn Learning:
1. Go to your certificates page
2. Click certificate
3. Copy the URL from browser
4. Format: `https://www.linkedin.com/learning/certificates/...`

### Udemy:
1. Go to your course page
2. Click certificate of completion
3. Download or copy URL
4. Format: `https://www.udemy.com/certificate/UC-...`

---

## 🎬 Step-by-Step Video Tutorial

### For Windows Users:

1. **Find your certificate** (email, course platform, download)
2. **Take screenshot** (Windows + Shift + S)
3. **Save screenshot** → Name it properly
4. **Open File Explorer**
5. **Navigate to:**
   ```
   c:\Users\enata\Desktop\pjt\portfolio\public\certificates\
   ```
6. **Paste your image** (Ctrl + V)
7. **Open in VS Code:**
   ```
   portfolio/data/certificates.json
   ```
8. **Add your certificate entry** (copy format from examples above)
9. **Save file** (Ctrl + S)
10. **Check browser** → Should auto-refresh!

---

## ✅ Quick Checklist

Before adding a certificate, make sure you have:

- [ ] Certificate image (JPG or PNG)
- [ ] Image is under 500KB
- [ ] Descriptive filename (lowercase, hyphens)
- [ ] Certificate title
- [ ] Issuing organization name
- [ ] Date issued (Month Year format)
- [ ] Verification URL (if available)
- [ ] Skills covered (3-6 skills)

---

## 🎯 Multiple Certificates at Once

If you have many certificates:

```json
[
  {
    "id": "cert-1",
    "title": "First Certificate",
    ...
  },
  {
    "id": "cert-2",
    "title": "Second Certificate",
    ...
  },
  {
    "id": "cert-3",
    "title": "Third Certificate",
    ...
  }
]
```

**Important:** 
- Separate each certificate with a comma
- Each certificate needs a unique `id`
- Last certificate should NOT have a comma after it

---

## 🚨 Common Mistakes

### 1. Wrong Image Path
```json
"image": "certificates/my-cert.jpg"  ❌
"image": "/certificates/my-cert.jpg" ✅ (must start with /)
```

### 2. Missing Comma
```json
{
  "id": "cert-1",
  "title": "Certificate 1"
  ...
}  ❌ Missing comma before next entry
{
  "id": "cert-2",
```

### 3. File Not in Right Folder
```
❌ portfolio/public/my-cert.jpg
✅ portfolio/public/certificates/my-cert.jpg
```

---

## 🎉 You're Done!

Once you add your certificates:

1. ✅ They appear on `/blog` page
2. ✅ Click to view full size
3. ✅ Shows verification link
4. ✅ Displays skills covered
5. ✅ Fully responsive
6. ✅ Works on mobile

---

## 🆘 Troubleshooting

### Certificate not showing?
- Check image is in `/public/certificates/` folder
- Check filename matches exactly in JSON (case-sensitive)
- Check JSON syntax (use [JSONLint](https://jsonlint.com/) to validate)
- Refresh browser (Ctrl + F5)

### Image looks blurry?
- Use higher resolution image (min 1280x720px)
- Save as PNG instead of JPG for text-heavy certificates

### Modal not opening?
- Check browser console for errors (F12)
- Clear browser cache
- Try a different browser

---

## 📧 Need Help?

If you're stuck:
1. Check the JSON syntax at [JSONLint.com](https://jsonlint.com/)
2. Make sure image path starts with `/certificates/`
3. Verify image file exists in the folder
4. Check browser console for errors (F12)

---

**Your certificates will look amazing! They're displayed in a professional grid with click-to-enlarge functionality.** 🎓✨

**Current sample certificate will be replaced as soon as you add your real ones!**
