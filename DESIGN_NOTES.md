# Design Notes — Enatan Dereje Portfolio

## Visual Design Philosophy

This portfolio follows a **minimal-elite** design language inspired by premium consultancy websites and modern SaaS products. The goal is clarity, professionalism, and measurable impact — not flashy effects.

## Brand Tokens

### Color System

#### Dark Theme (Primary)
```
Background:     #0b0f14  (deep navy-black)
Surface:        #151a21  (elevated cards)
Surface Hover:  #1a2028  (interactive states)
Text Primary:   #e6eef6  (high contrast)
Text Secondary: #8b95a3  (reduced emphasis)
Border:         #1f2937  (subtle dividers)
Accent:         #3dd4c9  (muted teal-blue)
```

#### Light Theme (Alternative)
```
Background:     #ffffff  (pure white)
Surface:        #f9fafb  (subtle gray)
Text Primary:   #111827  (near-black)
Text Secondary: #6b7280  (medium gray)
Accent:         #0891b2  (darker teal)
```

### Typography Scale

- **Headline (H1):** 48-60px, Bold, -0.025em tracking
- **Section Title (H2):** 36-48px, Bold
- **Subsection (H3):** 24-30px, Semibold
- **Body:** 16px, Regular, 1.5 line-height
- **Small:** 14px (metadata, captions)
- **Micro:** 12px (badges, timestamps)

**Font Family:** Inter (loaded from Google Fonts)

### Spacing System

```
xs:  8px   (tight gaps)
sm:  12px  (compact spacing)
md:  16px  (base unit)
lg:  24px  (section padding)
xl:  32px  (generous spacing)
2xl: 48px  (section breaks)
3xl: 64px  (major divisions)
4xl: 96px  (hero spacing)
```

### Layout Grid

- **Max Width:** 1100px (readable, not too wide)
- **Columns:** 12-column grid
- **Gutters:** 24px (desktop), 16px (mobile)
- **Breakpoints:**
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

## Component Design

### Cards
- Border radius: 12px (rounded-xl)
- Padding: 24px
- Border: 1px subtle (context-aware)
- Hover: Scale 1.02, border color change
- Shadow: Minimal, only on hover

### Buttons
- **Primary:** Accent background, dark text, scale on hover
- **Secondary:** Border outline, hover fill
- **Ghost:** Text only, accent on hover

### Animations

**Philosophy:** Micro-interactions only. Every animation must serve a purpose.

- **Page Load:** Fade-up (0.5s, ease-out)
- **Scroll Reveal:** Stagger (0.1s delay per item)
- **Hover:** Scale (1.05), duration 200ms
- **Theme Toggle:** Color transition 200ms

**Respect `prefers-reduced-motion`** — all animations disabled if user prefers.

## Accessibility Standards

- **Color Contrast:** Minimum 4.5:1 (WCAG AA)
- **Focus Rings:** 2px accent color
- **Touch Targets:** Minimum 44x44px
- **ARIA Labels:** All interactive elements
- **Keyboard Navigation:** Full support
- **Screen Readers:** Semantic HTML

## Content Strategy

### Hero Section
- Name: Large, bold
- Title: Role subtitle
- Tagline: One-liner philosophy
- CTAs: Max 2 (View Projects, Resume)
- Visual: Right-side minimal tile (terminal or stats)

### Project Cards
- Thumbnail: 16:9 aspect ratio
- Title: Clear, specific
- Summary: One-line impact statement
- Tech Stack: Max 4 visible badges
- Links: Details, GitHub, Demo

### Skills Display
- Grouped by category
- Brief context (not just lists)
- Example: "Python — production ML pipelines & ETL"

## Performance Targets

- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3s
- **Lighthouse Score:** 90+ all categories
- **Bundle Size:** < 200KB (gzipped)

## Mobile-First Approach

1. Design for 375px viewport first
2. Progressive enhancement for tablet/desktop
3. Single-column layouts on mobile
4. Collapsible navigation
5. Touch-friendly targets

## SEO Strategy

- Semantic HTML
- Meta descriptions per page
- Open Graph tags
- JSON-LD structured data
- Fast page speed
- Mobile-friendly

## Iconography

- Minimal use of icons
- SVG only (scalable, customizable)
- Lucide icon style (outline, 24px)
- Icons support text, don't replace it

## White Space Philosophy

"White space is not wasted space."

- Generous padding around sections
- Breathing room between elements
- Let content be the focus
- Avoid visual clutter

---

**Design Mantra:** Every element must earn its spot. Clarity over flash. Signal over noise.
