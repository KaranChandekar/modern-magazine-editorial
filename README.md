# VOGUE Editorial — Modern Digital Magazine

A premium digital magazine website built with Next.js 15, featuring editorial typography, immersive animations, and a sophisticated reading experience.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-purple?logo=framer)

## Features

### Homepage
- **Full-viewport hero** with parallax scrolling, multi-layer gradients, and animated content entry
- **Asymmetric CSS Grid** — 3-column desktop, 2-column tablet, 1-column mobile with featured article spanning 2×2
- **3D tilt article cards** — mouse-tracking perspective transforms with shadow enhancement, disabled on touch devices
- **Scroll-triggered image reveals** — three clip-path patterns: circle expand, diagonal wipe, curtain open
- **Infinite horizontal carousel** — pure CSS marquee that pauses in place on hover and resumes seamlessly
- **Animated category filters** — pill tabs with spring-animated sliding indicator and content crossfade

### Article Detail Pages
- **Parallax hero images** with gradient overlays
- **Drop cap typography** — large serif first letter with accent color
- **Pull quotes** with animated border draw-in on scroll
- **Reading progress bar** — fixed gradient bar tracking scroll position
- **Image lightbox** — click-to-expand with scale animation and blur backdrop
- **Related articles** section with card animations

### Interactive Features
- **Dark/light mode** — smooth CSS variable transitions, localStorage persistence, system preference detection
- **Newsletter signup** — morphing button states (idle → spinner → checkmark), input border color transitions
- **Responsive navbar** — transparent over hero, blurred/themed on scroll, animated mobile menu
- **Back-to-top button** with animated arrow indicator
- **Staggered footer animations** on scroll

### Design & Performance
- **Fluid typography** using `clamp()` across all headings and body text
- **Custom color scheme** — warm cream/charcoal light mode, near-black/warm white dark mode
- **`prefers-reduced-motion`** support for all animations
- **Keyboard accessible** with visible focus indicators
- **Semantic HTML** with proper heading hierarchy
- **Optimized images** via Next.js Image component

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 3.4 + CSS Custom Properties |
| Animations | Framer Motion 11 + CSS Keyframes |
| Typography | Playfair Display (serif) + Source Sans 3 (sans) |
| Layout | CSS Grid + Flexbox |

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with fonts and global styles
│   ├── page.tsx                # Homepage with hero, carousel, and grid
│   ├── globals.css             # CSS variables, animations, utilities
│   └── article/[slug]/
│       └── page.tsx            # Article detail with parallax and progress
├── components/
│   ├── Navbar.tsx              # Adaptive header with theme toggle
│   ├── Hero.tsx                # Full-viewport parallax hero
│   ├── ArticleCard.tsx         # 3D tilt card with image reveals
│   ├── FeaturedCarousel.tsx    # CSS marquee infinite scroll
│   ├── CategoryFilter.tsx      # Animated pill tab filters
│   ├── NewsletterSignup.tsx    # Morphing form with states
│   ├── ImageLightbox.tsx       # Modal image viewer
│   ├── ReadingProgress.tsx     # Scroll progress indicator
│   ├── ThemeToggle.tsx         # Dark/light mode switch
│   └── Footer.tsx              # Staggered animated footer
├── hooks/
│   ├── useTheme.ts             # Theme state management
│   ├── useScrollProgress.ts    # Scroll percentage tracking
│   └── useInView.ts            # Intersection Observer hook
├── content/
│   └── articles.ts             # Article data and helper functions
└── utils/
    └── cn.ts                   # Tailwind class merge utility
```

## Color Palette

| Token | Light Mode | Dark Mode |
|-------|-----------|-----------|
| Background | `#faf5ee` cream | `#0e0e0e` near-black |
| Text | `#1a1a1a` charcoal | `#e8e0d4` warm white |
| Accent | `#e63946` red | `#ff6b6b` bright red |
| Border | `#e0d7cd` tan | `#252525` dark gray |

## License

MIT
