# 🚀 How to Add Your Projects

## 📋 Quick Steps

### 1️⃣ Add Project to List

**Edit this file:**
```
portfolio/data/projects.json
```

**Add your project:**
```json
{
  "title": "Your Project Name",
  "slug": "your-project-name",
  "summary": "One-line description with impact/results.",
  "tech": ["Python", "React", "Docker"],
  "category": ["ML", "Security", "DevOps", "Visualization"],
  "github": "https://github.com/yourusername/project",
  "demo": "https://your-demo-url.com",
  "featured": true
}
```

### 2️⃣ Save & See It!

- **Home page** (`/`) - Shows featured projects (featured: true)
- **Projects page** (`/projects`) - Shows all projects
- **Auto-refreshes** when you save!

---

## 🎯 Complete Example

Let's add a project called "AI Chatbot":

### Step 1: Edit projects.json

Open: `portfolio/data/projects.json`

Add this entry:

```json
{
  "title": "AI Chatbot with RAG",
  "slug": "ai-chatbot",
  "summary": "Context-aware chatbot using retrieval-augmented generation. Reduced response errors by 80% with custom knowledge base.",
  "tech": ["Python", "LangChain", "OpenAI", "FastAPI", "React"],
  "category": ["ML", "Visualization"],
  "github": "https://github.com/enatandereje/ai-chatbot",
  "demo": "https://ai-chatbot-demo.vercel.app",
  "featured": true
}
```

### Step 2: Add Project Image (Optional)

**Save image as:**
```
portfolio/public/projects/ai-chatbot.jpg
```

**Update projects.json:**
```json
{
  "title": "AI Chatbot with RAG",
  "slug": "ai-chatbot",
  "image": "/projects/ai-chatbot.jpg",  // Add this line
  "summary": "...",
  ...
}
```

---

## 📝 Field Explanations

### Required Fields:

#### **title** (string)
Project name displayed on cards
```json
"title": "Forex Trading Bot"
```

#### **slug** (string)
URL-friendly version (lowercase, hyphens, no spaces)
```json
"slug": "forex-trading-bot"
```
Will create URL: `/projects/forex-trading-bot`

#### **summary** (string)
One compelling sentence with impact/results
```json
"summary": "Automated trading bot achieving 15% monthly returns. Uses ML to predict market trends."
```

#### **tech** (array)
Technologies used (3-6 items recommended)
```json
"tech": ["Python", "TensorFlow", "Docker", "AWS"]
```

#### **category** (array)
Filter categories (choose from: ML, Security, DevOps, Visualization)
```json
"category": ["ML", "DevOps"]
```

#### **github** (string)
GitHub repository URL
```json
"github": "https://github.com/enatandereje/project-name"
```

### Optional Fields:

#### **demo** (string)
Live demo URL (Streamlit, Heroku, Vercel, etc.)
```json
"demo": "https://project-demo.streamlit.app"
```

#### **image** (string)
Project screenshot/thumbnail
```json
"image": "/projects/project-name.jpg"
```
Place image in: `public/projects/`

#### **featured** (boolean)
Show on home page? (true/false)
```json
"featured": true  // Shows on home
"featured": false // Only on /projects page
```

---

## 🎨 Real Project Examples

### Machine Learning Project
```json
{
  "title": "Customer Churn Prediction",
  "slug": "churn-prediction",
  "summary": "Predictive model reducing customer churn by 35%. Built with ensemble learning and feature engineering.",
  "tech": ["Python", "Scikit-learn", "Pandas", "Streamlit"],
  "category": ["ML", "Visualization"],
  "github": "https://github.com/enatandereje/churn-prediction",
  "demo": "https://churn-predictor.streamlit.app",
  "image": "/projects/churn-prediction.jpg",
  "featured": true
}
```

### Security Project
```json
{
  "title": "Network Vulnerability Scanner",
  "slug": "vuln-scanner",
  "summary": "Automated network security scanner detecting 20+ vulnerability types. Scans 1000+ hosts per hour.",
  "tech": ["Python", "Nmap", "SQLite", "Flask"],
  "category": ["Security", "DevOps"],
  "github": "https://github.com/enatandereje/vuln-scanner",
  "featured": true
}
```

### Full Stack Project
```json
{
  "title": "Real-Time Analytics Dashboard",
  "slug": "analytics-dashboard",
  "summary": "Live data visualization platform processing 100k events/second. Built with microservices architecture.",
  "tech": ["React", "Node.js", "MongoDB", "Redis", "Docker"],
  "category": ["Visualization", "DevOps"],
  "github": "https://github.com/enatandereje/analytics-dashboard",
  "demo": "https://analytics.example.com",
  "image": "/projects/analytics-dashboard.png",
  "featured": true
}
```

---

## 🖼️ Adding Project Images

### Step 1: Prepare Image
- **Size:** 800x600px or 16:9 aspect ratio
- **Format:** JPG or PNG
- **File size:** Under 200KB
- **Content:** Screenshot of your project

### Step 2: Save to Folder
```
portfolio/public/projects/your-project-name.jpg
```

### Step 3: Reference in JSON
```json
{
  "title": "Your Project",
  "slug": "your-project",
  "image": "/projects/your-project-name.jpg",
  ...
}
```

**Note:** Path must start with `/projects/` not `public/projects/`

---

## 🎯 Featured vs Non-Featured

### Featured Projects (featured: true)
- ✅ Show on **home page** (3 most recent)
- ✅ Show on **projects page**
- Use for your best/most impressive work

### Regular Projects (featured: false)
- ❌ Don't show on home page
- ✅ Show on **projects page** only
- Use for older or minor projects

**Recommendation:** Keep 3-5 projects as featured

---

## 📂 Using the Helper Script

### Quick Add (Interactive):

```bash
node scripts/add-project.js
```

**It will ask you:**
1. Project title
2. Summary
3. Technologies (comma-separated)
4. Categories (comma-separated)
5. GitHub URL
6. Demo URL (optional)
7. Featured? (y/n)

**Automatically:**
- Creates slug from title
- Adds to projects.json
- Validates format

---

## 🔗 Linking Your GitHub Projects

### If Project is on GitHub:

1. Go to your GitHub repo
2. Copy the URL: `https://github.com/yourusername/repo-name`
3. Add to projects.json:
   ```json
   "github": "https://github.com/yourusername/repo-name"
   ```

### If Project Has Live Demo:

**Streamlit:**
```json
"demo": "https://your-app.streamlit.app"
```

**Heroku:**
```json
"demo": "https://your-app.herokuapp.com"
```

**Vercel:**
```json
"demo": "https://your-app.vercel.app"
```

**Custom Domain:**
```json
"demo": "https://yourproject.com"
```

---

## 📝 Full projects.json Template

```json
[
  {
    "title": "Project 1 Name",
    "slug": "project-1-name",
    "summary": "Impact statement with numbers/results.",
    "tech": ["Tech1", "Tech2", "Tech3"],
    "category": ["ML"],
    "github": "https://github.com/username/project1",
    "demo": "https://project1-demo.com",
    "image": "/projects/project1.jpg",
    "featured": true
  },
  {
    "title": "Project 2 Name",
    "slug": "project-2-name",
    "summary": "Another compelling description.",
    "tech": ["Tech4", "Tech5"],
    "category": ["Security", "DevOps"],
    "github": "https://github.com/username/project2",
    "featured": true
  },
  {
    "title": "Project 3 Name",
    "slug": "project-3-name",
    "summary": "Third project description.",
    "tech": ["Tech6", "Tech7", "Tech8"],
    "category": ["Visualization"],
    "github": "https://github.com/username/project3",
    "demo": "https://project3.app",
    "featured": false
  }
]
```

**Important:**
- Separate projects with commas
- Last project should NOT have comma
- Valid JSON format (use [JSONLint](https://jsonlint.com/) to check)

---

## 🎨 Categories Explained

### **ML** (Machine Learning)
Use for: AI, ML models, data science, predictions

### **Security**
Use for: Pentesting, vulnerability scanners, security tools

### **DevOps**
Use for: CI/CD, infrastructure, automation, Docker/K8s

### **Visualization**
Use for: Dashboards, charts, data viz, web apps

**You can use multiple categories:**
```json
"category": ["ML", "Visualization"]  // ML project with dashboard
"category": ["Security", "DevOps"]   // Security automation tool
```

---

## 🚀 Where Projects Appear

### Home Page (`/`)
- Shows **3 featured projects** (featured: true)
- Grid layout with spotlight hover effects
- Links to project detail pages

### Projects Page (`/projects`)
- Shows **all projects**
- Filter by category (ML, Security, DevOps, Visualization)
- Grid layout with tech badges

### Project Detail Pages (`/projects/[slug]`)
- Currently uses template
- You can customize per project (see below)

---

## 📄 Creating Detailed Project Pages

For more detailed project pages, you can customize:

### Option 1: Use Template (Current)
All projects use the same template at:
```
app/projects/[slug]/page.tsx
```

### Option 2: Create Individual Pages
Create specific files:
```
app/projects/forex-predictor/page.tsx
app/projects/medical-diagnosis/page.tsx
```

**Example custom page:**
```tsx
export default function ForexPredictorPage() {
  return (
    <div className="min-h-screen">
      <section className="section pt-32">
        <div className="container-custom max-w-4xl">
          <h1 className="text-4xl font-bold mb-6">
            Forex Predictor
          </h1>
          
          <div className="card p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Problem</h2>
            <p>Describe the problem your project solves...</p>
          </div>

          <div className="card p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Solution</h2>
            <p>Explain your approach...</p>
          </div>

          {/* Add demo iframe if you have one */}
          <iframe 
            src="https://your-demo.streamlit.app"
            className="w-full h-[600px] rounded-lg"
          />
        </div>
      </section>
    </div>
  );
}
```

---

## ✅ Quick Checklist

Before adding a project:
- [ ] Project title (clear, descriptive)
- [ ] Unique slug (lowercase, hyphens)
- [ ] Compelling summary with results/impact
- [ ] 3-6 tech stack items
- [ ] Appropriate categories
- [ ] GitHub repository URL
- [ ] Demo URL (if available)
- [ ] Project image (optional but recommended)
- [ ] Decide if featured or not

---

## 🆘 Common Issues

### Projects not showing?
- Check JSON syntax (no trailing commas!)
- Use [JSONLint.com](https://jsonlint.com/) to validate
- Refresh browser (Ctrl + F5)
- Check console for errors (F12)

### Image not loading?
- Image must be in `/public/projects/` folder
- Path in JSON must start with `/projects/`
- Check filename matches exactly (case-sensitive)

### Wrong project showing?
- Check slug is unique
- Slug determines URL: `/projects/[slug]`
- No spaces or special characters in slug

---

## 📊 Project Stats

Your portfolio currently shows:
- **6 sample projects** (replace with yours!)
- **3 featured** on home page
- **4 categories** for filtering

**Recommendation:** Add 5-10 of your best projects

---

## 🎯 Tips for Great Projects

### Write Impact-Driven Summaries:
❌ "A chatbot that answers questions"
✅ "AI chatbot reducing support tickets by 60%"

### Show Results:
- Include numbers (accuracy, speed, cost savings)
- Mention technology innovations
- Highlight real-world impact

### Choose Tech Wisely:
- List 3-6 main technologies
- Don't list every library
- Focus on notable/impressive tech

### Good Demo Links:
- Make sure demo is live and working
- Use free hosting (Streamlit, Vercel, Heroku)
- If no demo, GitHub README with screenshots

---

## 🚀 Next Steps

1. **List your projects** (even if not perfect)
2. **Add best 3-5** to projects.json
3. **Set best 3 as featured**
4. **Add project images** for polish
5. **Test on home and projects pages**
6. **Add more projects over time**

---

**Your projects will automatically appear with all the premium styling!** 🎨✨

**Spotlight effects, hover animations, and filtering all work out of the box!**
