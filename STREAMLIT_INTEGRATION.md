# Streamlit/Gradio Integration Guide

This guide shows how to safely embed interactive ML demos (Streamlit, Gradio, or custom apps) in your portfolio project pages.

## Basic Iframe Embedding

### Streamlit App

```tsx
// In app/projects/[slug]/page.tsx

<div className="card p-0 overflow-hidden">
  <iframe
    src="https://your-app.streamlit.app"
    className="w-full h-[700px] border-0"
    title="Interactive Demo"
    allow="accelerometer; camera; microphone"
    sandbox="allow-scripts allow-same-origin allow-forms"
  />
</div>
```

### Gradio App

```tsx
<iframe
  src="https://your-space.hf.space"
  className="w-full h-[600px] border-0 rounded-lg"
  title="Model Demo"
  allow="accelerometer; camera; microphone"
/>
```

## Responsive Iframe Component

Create a reusable component for better UX:

```tsx
// components/DemoEmbed.tsx
"use client";

import { useState } from "react";

interface DemoEmbedProps {
  src: string;
  title: string;
  height?: string;
}

export default function DemoEmbed({ src, title, height = "700px" }: DemoEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="card p-0 overflow-hidden relative">
      {!isLoaded && !hasError && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-dark-surface"
          style={{ height }}
        >
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-accent mb-4" />
            <p className="text-dark-text-secondary">Loading demo...</p>
          </div>
        </div>
      )}

      {hasError && (
        <div
          className="flex items-center justify-center bg-dark-surface"
          style={{ height }}
        >
          <div className="text-center">
            <p className="text-red-400 mb-2">Failed to load demo</p>
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-hover"
            >
              Open in new tab →
            </a>
          </div>
        </div>
      )}

      <iframe
        src={src}
        className="w-full border-0"
        style={{ height }}
        title={title}
        allow="accelerometer; camera; microphone"
        sandbox="allow-scripts allow-same-origin allow-forms"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />
    </div>
  );
}
```

### Usage

```tsx
import DemoEmbed from "@/components/DemoEmbed";

<DemoEmbed
  src="https://your-streamlit-app.streamlit.app"
  title="Forex Predictor Demo"
  height="800px"
/>
```

## Deployment Options

### 1. Streamlit Cloud (Recommended)

**Pros:**
- Free tier available
- Auto-deploys from GitHub
- Built-in authentication
- SSL included

**Setup:**
```bash
# 1. Create streamlit app
# app.py
import streamlit as st

st.title("Your Demo")
# ... your code

# 2. requirements.txt
streamlit
pandas
scikit-learn

# 3. Push to GitHub
# 4. Deploy at share.streamlit.io
```

### 2. Hugging Face Spaces

**Pros:**
- Free GPU options
- Great for ML models
- CDN-backed
- Gradio integration

**Setup:**
```python
# app.py for Gradio
import gradio as gr

def predict(input):
    # Your model logic
    return output

demo = gr.Interface(fn=predict, inputs="text", outputs="text")
demo.launch()
```

### 3. Self-Hosted

**Docker Compose Example:**
```yaml
version: '3.8'
services:
  streamlit-demo:
    build: ./demos/forex-predictor
    ports:
      - "8501:8501"
    environment:
      - MODEL_PATH=/models/forex_model.pkl
```

## Security Considerations

### Iframe Sandbox Attributes

```html
sandbox="
  allow-scripts          <!-- Required for app functionality -->
  allow-same-origin      <!-- Required for Streamlit -->
  allow-forms            <!-- If demo has input forms -->
  allow-downloads        <!-- If users can download results -->
  allow-popups           <!-- Only if needed -->
"
```

### Content Security Policy

Add to `next.config.mjs`:
```javascript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/projects/:slug',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self'; frame-src 'self' https://*.streamlit.app https://*.hf.space"
          }
        ]
      }
    ];
  }
};
```

## Performance Optimization

### 1. Lazy Loading

```tsx
"use client";

import dynamic from 'next/dynamic';

const DemoEmbed = dynamic(() => import('@/components/DemoEmbed'), {
  loading: () => <div className="h-[700px] bg-dark-surface animate-pulse" />,
  ssr: false,
});
```

### 2. Intersection Observer

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

export default function LazyDemo({ src, title }) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
        }
      },
      { rootMargin: "100px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="min-h-[700px]">
      {shouldLoad ? (
        <iframe src={src} title={title} className="w-full h-[700px]" />
      ) : (
        <div className="h-[700px] bg-dark-surface flex items-center justify-center">
          <p className="text-dark-text-secondary">Scroll to load demo</p>
        </div>
      )}
    </div>
  );
}
```

## Fallback for Failed Embeds

```tsx
<div className="card p-6">
  <h3 className="text-xl font-bold mb-4">Interactive Demo</h3>
  <p className="text-dark-text-secondary mb-4">
    The embedded demo may take a moment to load. If it doesn't appear:
  </p>
  <div className="flex gap-4">
    <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
      Open Demo in New Tab
    </a>
    <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
      View Source Code
    </a>
  </div>
</div>
```

## Mobile Responsiveness

```tsx
<div className="card p-0 overflow-hidden">
  {/* Show iframe on desktop */}
  <div className="hidden md:block">
    <iframe src={src} className="w-full h-[700px]" />
  </div>

  {/* Show link on mobile */}
  <div className="md:hidden p-8 text-center">
    <p className="text-dark-text-secondary mb-4">
      This demo works best on desktop. Click below to open in a new tab.
    </p>
    <a href={src} target="_blank" rel="noopener noreferrer" className="btn-primary">
      Open Demo
    </a>
  </div>
</div>
```

## Example: Complete Integration

```tsx
// app/projects/forex-predictor/page.tsx

export default function ForexPredictorPage() {
  return (
    <div className="min-h-screen">
      <section className="section pt-32">
        <div className="container-custom max-w-4xl">
          {/* Project description */}
          <h1 className="text-4xl font-bold mb-6">Forex Predictor</h1>
          <p className="text-dark-text-secondary mb-8">
            Interactive dashboard for real-time FX signal generation...
          </p>

          {/* Demo embed */}
          <div className="my-12">
            <h2 className="text-2xl font-bold mb-4">Try it Yourself</h2>
            <DemoEmbed
              src="https://forex-predictor.streamlit.app"
              title="Forex Predictor Interactive Demo"
              height="800px"
            />
            <p className="text-sm text-dark-text-secondary mt-4">
              Note: This demo uses cached data. Real-time predictions require API keys.
            </p>
          </div>

          {/* Additional content */}
        </div>
      </section>
    </div>
  );
}
```

## Testing Embedded Demos

```bash
# Test iframe loading
curl -I https://your-demo.streamlit.app

# Check CSP headers
curl -I https://your-portfolio.com/projects/demo

# Verify CORS
# Open browser console and check for errors
```

---

**Best Practices:**
- Always provide a fallback link
- Show loading states
- Test on mobile devices
- Monitor demo uptime
- Keep demos simple and focused
