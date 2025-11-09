# Quick Start Guide

Get your portfolio up and running in 5 minutes.

## Prerequisites

- Node.js 18+ installed
- Git installed
- Text editor (VS Code recommended)

## Installation

```bash
# Navigate to the portfolio directory
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit **http://localhost:3000** — your portfolio is live! 🎉

## First Steps

### 1. Update Personal Information

**In `app/page.tsx`:**
```tsx
<h1>Your Name</h1>  <!-- Change "Enatan Dereje" -->
<h2>Your Title</h2>  <!-- Change role description -->
```

**In `app/layout.tsx`:**
```tsx
export const metadata = {
  title: "Your Name — Your Title",
  description: "Your tagline",
  // ...
}
```

**In `components/Footer.tsx`:**
- Update social links (GitHub, LinkedIn, Telegram)
- Change email address

### 2. Add Your Projects

**Option A: Use the script**
```bash
node scripts/add-project.js
```

**Option B: Edit manually**

Edit `data/projects.json`:
```json
{
  "title": "Your Project",
  "slug": "your-project",
  "summary": "Impact statement",
  "tech": ["Python", "Docker"],
  "category": ["ML"],
  "github": "https://github.com/...",
  "featured": true
}
```

### 3. Replace Resume

Replace `public/resume.pdf` with your actual resume. Match the site's dark theme for consistency.

### 4. Customize About Page

Edit `app/about/page.tsx`:
- Update bio text
- Modify timeline with your experience
- Change quick facts

### 5. Update Skills

Edit `app/skills/page.tsx`:
- Add/remove skill categories
- Modify skill descriptions
- Update certifications

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repo at **vercel.com** for automatic deployments.

## File Structure Overview

```
portfolio/
├── app/              Pages (Home, Projects, Skills, etc.)
├── components/       Reusable UI components
├── lib/             Utilities & design tokens
├── data/            Content (projects.json)
├── public/          Static files (resume, images)
├── styles/          Global CSS
└── scripts/         Helper scripts
```

## Common Tasks

### Add a Blog Post
1. Create `content/blog/your-post.md`
2. Add frontmatter (title, date, tags)
3. Post automatically appears

### Change Theme Colors
Edit `lib/design-tokens.js` or `tailwind.config.js`

### Add New Page
1. Create folder in `app/your-page/`
2. Add `page.tsx`
3. Add route to Header navigation

## Troubleshooting

**Port 3000 already in use?**
```bash
npm run dev -- -p 3001  # Use different port
```

**Build errors?**
```bash
rm -rf .next node_modules
npm install
npm run build
```

**Lint errors?**
These will resolve after running `npm install`. TypeScript errors are expected until dependencies are installed.

## Next Steps

1. **Read** `README.md` for full documentation
2. **Check** `DESIGN_NOTES.md` for design system details
3. **Review** `ACCESSIBILITY.md` for a11y guidelines
4. **Explore** `STREAMLIT_INTEGRATION.md` for demo embeds

## Support

- 📧 Questions? Open an issue on GitHub
- 📖 Read full docs in README.md
- 🎨 Design tokens in lib/design-tokens.js

---

**Built with clarity. Engineered thoughtfully.**
