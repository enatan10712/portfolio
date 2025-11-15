# 📝 How to Add Your Own Projects

Your projects section is now empty and ready for your real projects!

---

## 🎯 Quick Add Guide

### **Step 1: Edit the JSON File**

Open: `portfolio/data/projects.json`

Currently it's empty:
```json
[]
```

### **Step 2: Add Your Project**

Replace with your project data:

```json
[
  {
    "title": "Your Project Name",
    "slug": "your-project-name",
    "summary": "One compelling sentence describing your project with impact/results.",
    "tech": ["Python", "SQL", "Jupyter"],
    "category": ["ML", "Visualization"],
    "github": "https://github.com/yourusername/project-repo",
    "demo": "https://your-demo-link.com",
    "image": "/projects/your-project-image.jpg",
    "featured": true
  }
]
```

### **Step 3: Save & Refresh**

- Save the file
- Refresh browser
- Your project appears!

---

## 📋 Field Descriptions

### **Required Fields:**

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `title` | String | Project name | "Customer Churn Prediction" |
| `slug` | String | URL-friendly name | "customer-churn" |
| `summary` | String | Impact statement | "ML model with 92% accuracy" |
| `tech` | Array | Technologies used | ["Python", "SQL"] |
| `category` | Array | Project categories | ["ML", "DevOps"] |
| `github` | String | GitHub repo URL | "https://github.com/..." |

### **Optional Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `demo` | String | Live demo URL |
| `image` | String | Project image path |
| `featured` | Boolean | Show on home page? |

---

## 📂 Categories Available

Choose from these:
- `"ML"` - Machine Learning
- `"Security"` - Security projects
- `"DevOps"` - Infrastructure/pipelines
- `"Visualization"` - Dashboards/analytics

---

## 🖼️ Adding Images

### **Step 1: Save Image**
Place image in: `portfolio/public/projects/`

### **Step 2: Reference in JSON**
```json
{
  "image": "/projects/my-project.jpg"
}
```

**Image specs:**
- Size: 800x600px recommended
- Format: JPG, PNG, or SVG
- File size: Under 200KB

---

## ✨ Example Project Entry

```json
{
  "title": "Sales Forecasting Model",
  "slug": "sales-forecasting",
  "summary": "Time-series forecasting achieving 88% accuracy using Python and SQL on 1M+ records.",
  "tech": ["Python", "Pandas", "Prophet", "SQL", "Jupyter"],
  "category": ["ML", "Visualization"],
  "github": "https://github.com/enatandereje/sales-forecast",
  "demo": "https://colab.research.google.com/drive/your-notebook-id",
  "image": "/projects/sales-forecast.jpg",
  "featured": true
}
```

---

## 📊 Multiple Projects

Add multiple projects by separating with commas:

```json
[
  {
    "title": "First Project",
    "slug": "first-project",
    ...
  },
  {
    "title": "Second Project",
    "slug": "second-project",
    ...
  },
  {
    "title": "Third Project",
    "slug": "third-project",
    ...
  }
]
```

**Important:** No comma after the last project!

---

## 🎯 Featured vs Regular

### **Featured Projects** (`featured: true`)
- ✅ Show on home page (max 3)
- ✅ Show on /projects page
- Use for your best work

### **Regular Projects** (`featured: false`)
- ❌ Don't show on home
- ✅ Show on /projects page
- Use for other projects

---

## 🔄 Update Project Count

After adding projects, update your stats in `app/page.tsx`:

```tsx
const stats = [
  { label: "Years Experience", value: 3, suffix: "+" },
  { label: "Projects Completed", value: 5, suffix: "+" },  // Update this!
  { label: "Technologies", value: 20, suffix: "+" },
];
```

---

## ✅ Quick Checklist

Before adding a project:
- [ ] Have project title
- [ ] Have unique slug
- [ ] Have compelling summary
- [ ] List 3-6 technologies
- [ ] Choose category
- [ ] Have GitHub URL
- [ ] (Optional) Have demo URL
- [ ] (Optional) Have project image

---

## 🚀 When You're Ready

1. **Create your project** (follow guides in REAL_PROJECTS_GUIDE.md)
2. **Deploy it** (GitHub, Colab, Streamlit)
3. **Get links** (GitHub URL, demo URL)
4. **Add to JSON** (follow format above)
5. **Save & refresh** - It appears!

---

## 📖 Full Guides Available

- **REAL_PROJECTS_GUIDE.md** - Build 6 real projects
- **QUICK_PROJECT_SETUP.md** - 10-minute project setup
- **HOW_TO_ACCESS_PROJECTS.md** - Deployment guide

---

## 💡 Pro Tips

1. **Start with 1-2 projects** - Don't overwhelm yourself
2. **Make them featured** - Show your best work
3. **Include metrics** - "92% accuracy", "$2M revenue"
4. **Add images** - Visual appeal matters
5. **Keep summaries short** - One impactful sentence
6. **Update regularly** - Add new projects as you build

---

## 🎨 Current Setup

**Right now:**
- ✅ Projects section is empty
- ✅ Ready for your projects
- ✅ All styling is done
- ✅ Images folder exists
- ✅ Just add to JSON!

**After you add:**
- ✅ Projects show on home page
- ✅ Projects show on /projects page
- ✅ Filters work automatically
- ✅ Images display
- ✅ Links are clickable

---

## 🆘 Troubleshooting

### **Projects not showing?**
- Check JSON syntax (use jsonlint.com)
- Make sure no trailing commas
- Refresh browser (Ctrl + F5)

### **Image not loading?**
- Check file is in /public/projects/
- Check path starts with /projects/
- Check filename matches exactly

### **Featured not working?**
- Make sure `"featured": true` (lowercase, no quotes on true)
- Only first 3 featured projects show on home

---

**Your portfolio is clean and ready for YOUR real projects!** ✨

**Add them whenever you're ready!** 🚀
