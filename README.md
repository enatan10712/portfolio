# Enatan Dereje — Portfolio Website

Modern, minimal-elite portfolio showcasing data science, web security, and development work.

## 🎯 Design Philosophy

**Visual Language:** Ultra-clean, recruiter-friendly, high-signal design with generous white space, crisp typography, and restrained use of accent color (#3dd4c9).

**Key Principles:**
- Dark-first with optional light mode
- Minimal animations that enhance clarity (not showboating)
- Fast, accessible, SEO-ready, mobile-first
- Every element must earn its spot — prioritize legibility and recruiter scanning patterns

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS with custom design tokens
- **Animations:** Framer Motion (micro-interactions only)
- **Theme:** next-themes for dark/light mode
- **Blog:** Markdown with gray-matter & remark
- **Deployment:** Vercel-ready

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
portfolio/
├── app/                    # Next.js app router pages
│   ├── about/             # About page
│   ├── api/               # API routes
│   ├── blog/              # Blog listings & posts
│   ├── contact/           # Contact form
│   ├── projects/          # Project listings & details
│   ├── skills/            # Skills & tech stack
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable React components
│   ├── Header.tsx         # Sticky navigation
│   ├── Footer.tsx         # Site footer
│   ├── ThemeToggle.tsx    # Dark/light mode toggle
│   ├── ProjectCard.tsx    # Project preview card
│   ├── SkillBadge.tsx     # Skill display
│   ├── ContactForm.tsx    # Contact form with validation
│   ├── MinimalTerminalTile.tsx  # Optional terminal display
│   └── CTAButtons.tsx     # Call-to-action buttons
├── lib/                   # Utilities & helpers
│   ├── design-tokens.js   # Design system tokens
│   └── utils.ts           # Helper functions
├── data/                  # Content data
│   └── projects.json      # Project metadata
├── public/                # Static assets
│   └── resume.pdf         # Downloadable resume
└── scripts/               # Automation scripts
    └── add-project.js     # Add new projects easily
```

## 🎨 Design Tokens

Located in `lib/design-tokens.js` for easy theme customization:

### Colors
- **Dark Background:** #0b0f14
- **Light Background:** #ffffff
- **Accent:** #3dd4c9 (muted teal-blue)
- **Secondary:** Cool gray scale

### Typography
- **Font:** Inter (Google Fonts)
- **Base Size:** 16px
- **Line Height:** 1.5 (balanced)
- **Letter Spacing:** Wide for headlines

### Layout
- **Max Width:** 1100px
- **Gutters:** Generous spacing (1.5rem mobile, 2rem desktop)
- **Grid:** 3-4 columns on desktop, single column mobile

## ✏️ Customization Checklist

### 1. Personal Information
- [ ] Update name in `app/layout.tsx` and `app/page.tsx`
- [ ] Change social links in `components/Footer.tsx`
- [ ] Update contact email in `app/contact/page.tsx`
- [ ] Modify about bio in `app/about/page.tsx`

### 2. Projects
- [ ] Edit `data/projects.json` with your projects
- [ ] Add detailed project pages in `app/projects/[slug]/page.tsx`
- [ ] Upload project images to `public/projects/`
- [ ] Update GitHub/demo links

### 3. Resume
- [ ] Replace `public/resume.pdf` with your resume
- [ ] Match resume styling to site theme (dark background)

### 4. Skills
- [ ] Update skill categories in `app/skills/page.tsx`
- [ ] Add/remove certifications
- [ ] Modify technology descriptions

### 5. Blog (Optional)
- [ ] Create markdown files in `content/blog/`
- [ ] Update blog post metadata
- [ ] Add featured images

### 6. Branding
- [ ] Update favicon in `public/`
- [ ] Modify color scheme in `tailwind.config.js`
- [ ] Adjust design tokens in `lib/design-tokens.js`

## 📝 Adding New Projects

### Method 1: Use the script
```bash
node scripts/add-project.js
```

### Method 2: Manual
1. Edit `data/projects.json`
2. Add project entry with required fields:
```json
{
  "title": "Project Name",
  "slug": "project-name",
  "summary": "One-line impact statement",
  "tech": ["Python", "Docker"],
  "category": ["ML", "DevOps"],
  "github": "https://github.com/...",
  "demo": "https://...",
  "featured": true
}
```
3. Create detail page in `app/projects/[slug]/page.tsx`

## 🎯 Features

### Core Pages
- ✅ **Home:** Hero with stats, featured projects, quick skills
- ✅ **Projects:** Filterable grid with detailed project pages
- ✅ **Skills:** Categorized tech stack with descriptions
- ✅ **About:** Bio, timeline, quick facts
- ✅ **Blog:** Markdown posts with pagination
- ✅ **Contact:** Form with validation & spam protection

### Components
- ✅ Sticky header with navigation
- ✅ Dark/light theme toggle
- ✅ Project cards with hover effects
- ✅ Skill badges with animations
- ✅ Contact form with honeypot
- ✅ Minimal terminal tile (collapsible)
- ✅ Responsive footer with social links

### Developer Experience
- ✅ TypeScript for type safety
- ✅ Tailwind for rapid styling
- ✅ Framer Motion for smooth animations
- ✅ ESLint & Prettier ready
- ✅ Design tokens for easy theming

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel dashboard
3. Configure environment variables (if using contact form email)
4. Deploy

### Other Platforms
Works with any platform supporting Next.js:
- Netlify
- Railway
- AWS Amplify
- DigitalOcean App Platform

## 📊 Performance

Built with performance in mind:
- Lazy-loaded images with next/image
- Minimal JavaScript
- Tree-shaken TailwindCSS
- Code splitting via Next.js

**Target Lighthouse Scores:** 90+ on all metrics

## ♿ Accessibility

- Semantic HTML
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus rings on all interactive elements
- Respects prefers-reduced-motion
- Strong color contrast (WCAG AA)

## 📧 Contact Form Setup

The contact form requires backend integration:

### Option 1: Email Service (Recommended)
```typescript
// In app/api/contact/route.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'contact@yourdomain.com',
  to: 'your-email@example.com',
  subject: `Portfolio Contact: ${subject}`,
  text: message,
});
```

### Option 2: FormSpree / Formcarry
Update form action to their endpoint.

### Option 3: Database
Store submissions in PostgreSQL, MongoDB, or Supabase.

## 🎬 Embedded Demos

To embed Streamlit/Gradio demos:

```tsx
<iframe
  src="https://your-streamlit-app.streamlit.app"
  className="w-full h-[600px] rounded-lg border-0"
  allow="accelerometer; camera; microphone"
/>
```

## 📄 License

This portfolio template is MIT licensed — use it however you like!

## 🙋 Support

Questions or need help? Reach out via:
- GitHub Issues
- Email: enatan@example.com
- LinkedIn: linkedin.com/in/enatandereje

---

**Built with clarity, engineered thoughtfully.**
