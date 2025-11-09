# Certificates Folder

## 📜 How to Add Your Certificates

### Step 1: Prepare Your Certificate Images

1. **Scan or screenshot** your certificates
2. **Recommended format:** JPG or PNG
3. **Recommended size:** 1920x1080px or 16:9 aspect ratio
4. **File naming:** Use descriptive names like `ml-specialization.jpg`, `aws-certification.jpg`

### Step 2: Add Images to This Folder

Place your certificate images in this folder:
```
/public/certificates/
├── ml-cert.jpg
├── aws-cert.jpg
├── ceh-cert.jpg
└── ...
```

### Step 3: Update the Data File

Edit `data/certificates.json` with your certificate details:

```json
{
  "id": "unique-id",
  "title": "Certificate Name",
  "issuer": "Issuing Organization",
  "date": "Month Year",
  "image": "/certificates/your-image.jpg",
  "credentialUrl": "https://verify-link.com",
  "skills": ["Skill 1", "Skill 2", "Skill 3"]
}
```

### Example Certificate Entry

```json
{
  "id": "cert-aws-sa",
  "title": "AWS Certified Solutions Architect - Associate",
  "issuer": "Amazon Web Services",
  "date": "January 2024",
  "image": "/certificates/aws-solutions-architect.jpg",
  "credentialUrl": "https://aws.amazon.com/verification/...",
  "skills": ["AWS", "Cloud Architecture", "EC2", "S3", "Lambda"]
}
```

### Tips for Best Results

✅ **Use high-quality scans** (300 DPI minimum)  
✅ **Keep images under 500KB** for fast loading  
✅ **Use consistent naming** (lowercase, hyphens)  
✅ **Include verification links** when available  
✅ **Add relevant skills** for better context  

### Image Optimization

Before uploading, optimize your images:

```bash
# Using ImageMagick (optional)
convert input.jpg -resize 1920x1080 -quality 85 output.jpg
```

Or use online tools:
- [TinyPNG](https://tinypng.com/)
- [Squoosh](https://squoosh.app/)
- [ImageOptim](https://imageoptim.com/)

---

**Your certificates will automatically appear on the Blog page!** 🎓✨
