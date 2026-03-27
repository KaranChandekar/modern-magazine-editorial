---
name: modern-magazine-editorial
description: Build a modern digital magazine with editorial typography, asymmetric CSS Grid layouts, kinetic text animations, scroll-triggered image reveals, 3D tilt article cards, infinite horizontal scroll, and dark/light mode with color morphing. Use this skill when building magazine websites, editorial layouts, blog platforms with premium design, or content-heavy sites with animation. Trigger when the user mentions magazine layout, editorial design, digital magazine, kinetic typography site, asymmetric grid layout, or blog with premium animations.
---

# Modern Magazine / Editorial Layout Skill

## Overview
This skill guides the development of a premium, modern digital magazine website with cutting-edge design patterns including asymmetric CSS Grid layouts, kinetic text animations, advanced scroll interactions, and sophisticated dark/light mode implementation. The site is built for editorial brands, high-end blogs, and content-focused platforms that prioritize visual storytelling and reader engagement.

## Core Technology Stack

### Frontend Framework
- **Next.js 15**: App Router for file-based routing, server components for SEO optimization, API routes for dynamic content
- **React 18**: Component-based architecture with hooks and custom hooks for complex state
- **TypeScript**: Full type safety across components, utilities, and API responses

### Animation & Motion Libraries
- **GSAP 3.12+**: Industry-standard animation library for complex sequences and timeline control
- **GSAP ScrollTrigger**: Scroll-based animation trigger plugin for image reveals, text animations tied to scroll position
- **GSAP SplitText**: Text splitting utility for character, word, and line-based animations (kinetic typography)
- **Framer Motion**: React-native animation library for component-level transitions and gestures
- **React Spring**: Physics-based animation alternative for smooth, natural motion

### Styling & Layout
- **Tailwind CSS 3.4+**: Utility-first CSS framework with custom configuration for magazine-specific spacing scale
- **CSS Grid**: Primary layout system for asymmetric article card arrangements
- **CSS Flexbox**: Secondary layout for component-level positioning
- **CSS Custom Properties (Variables)**: Dynamic theme switching for dark/light modes, color morphing
- **CSS Transforms & Perspective**: 3D transforms for card tilt effects and parallax scrolling

### Data & API
- **JSONPlaceholder**: Mock API for article data and user information
- **News API or RSS feeds**: Real-world content integration (optional premium feature)
- **Unsplash API**: High-quality editorial photography with automatic attribution
- **Markdown or Sanity.io**: Content management for editorial content (optional)

### Typography & Fonts
- **Google Fonts**:
  - **Playfair Display**: Elegant serif for headlines and featured typography
  - **Source Sans 3**: Clean, readable sans-serif for body copy
  - Load with `font-display: swap` for optimal performance
- **Fontshare** (free tier):
  - **Clash Display**: Bold, modern geometric sans for category labels
  - **General Sans**: Neutral sans-serif for UI elements

### UI Components
- **Radix UI**: Unstyled, accessible component primitives (optional, for complex interactions)
- **Headless UI**: Accessible dropdown, dialog, and popover components
- **React Hook Form**: Form handling for newsletter signup with minimal overhead

## Project Structure

```
10-modern-magazine-editorial/
├── app/
│   ├── layout.tsx                 # Root layout with fonts, global styles
│   ├── page.tsx                   # Homepage with asymmetric grid
│   ├── article/[slug]/
│   │   └── page.tsx               # Article detail page
│   ├── category/[slug]/
│   │   └── page.tsx               # Category archive page
│   └── api/
│       ├── articles/route.ts      # Fetch articles from mock/real API
│       └── newsletter/route.ts    # Newsletter signup endpoint
├── components/
│   ├── Navbar.tsx                 # Header with nav, theme toggle
│   ├── Hero.tsx                   # Large featured article section
│   ├── AsymmetricGrid.tsx         # Responsive 3-col → 1-col grid
│   ├── ArticleCard.tsx            # Individual article card with tilt
│   ├── FeaturedCarousel.tsx       # Infinite horizontal scroll section
│   ├── ArticlePage/
│   │   ├── HeroImage.tsx          # Hero image with parallax
│   │   ├── ArticleBody.tsx        # Article content with drop cap
│   │   ├── PullQuote.tsx          # Animated pull quote component
│   │   ├── RelatedArticles.tsx    # Related content section
│   │   └── ReadingProgress.tsx    # Top progress bar
│   ├── CategoryFilter.tsx         # Pill tab filter with indicator
│   ├── ImageLightbox.tsx          # Modal image viewer
│   ├── NewsletterSignup.tsx       # Animated form
│   ├── Footer.tsx                 # Footer with staggered animations
│   └── ThemeToggle.tsx            # Dark/light mode switch
├── hooks/
│   ├── useScrollVelocity.ts       # Track scroll speed for animations
│   ├── useMeasure.ts              # Get element dimensions (ResizeObserver)
│   ├── useTheme.ts                # Manage dark/light mode state
│   └── useInView.ts               # Detect when element enters viewport
├── utils/
│   ├── animations.ts              # GSAP animation definitions
│   ├── cn.ts                      # Tailwind classname merge utility
│   ├── generateSlugs.ts           # Convert titles to URL-friendly slugs
│   └── colorScheme.ts             # Color palette definitions
├── styles/
│   ├── globals.css                # Global styles, CSS variables, resets
│   ├── typography.css             # Font face declarations, scale
│   └── animations.css             # Keyframe animations, utility classes
├── content/
│   ├── articles.json              # Mock article data
│   └── categories.json            # Category taxonomy
├── public/
│   ├── images/                    # Hero images, backgrounds
│   └── icons/                     # SVG icons for UI
└── package.json
```

## Key Components & Features

### 1. Asymmetric Grid Homepage Layout

**Component: `AsymmetricGrid.tsx`**

Grid system using CSS Grid with auto-fit and minmax() for responsive behavior:

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  grid-auto-rows: auto;
}

.article-card:nth-child(1) {
  grid-column: span 2;  /* Featured article spans 2 columns */
  grid-row: span 2;     /* Featured article spans 2 rows */
}

.article-card:nth-child(2),
.article-card:nth-child(3) {
  grid-column: span 1;
}
```

Features:
- Varying card sizes (large featured = 2x2, regular = 1x1, small = 1x1)
- Smooth responsive transitions using CSS Grid auto-fit
- On mobile (< 768px), all cards span 1 column
- Cards stagger animation on page load with GSAP timeline

### 2. Kinetic Typography & Text Animations

**Using GSAP SplitText:**

```typescript
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

function useKineticText(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    const split = new SplitText(ref.current, { type: 'chars,words' });

    // Animate on scroll
    gsap.to(split.chars, {
      scrollTrigger: {
        trigger: ref.current,
        start: 'top center',
        toggleActions: 'play none none reverse',
      },
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.05,
    });
  }, [ref]);
}
```

Hover text scramble effect:
- On hover, characters animate to random positions briefly, then settle
- Uses GSAP timeline for synced animation sequence
- Cursor position influences animation direction (left/right entry)

Scroll velocity-based headline movement:
- Track scroll velocity with custom hook `useScrollVelocity`
- Apply transform: translateX() based on velocity magnitude
- Creates a "drag" effect where text lags behind scroll momentum

### 3. Scroll-Triggered Image Reveals

**ImageReveal.tsx Component:**

Multiple reveal animation patterns using clip-path:

1. **Circle Expand**:
```css
.circle-reveal {
  clip-path: circle(0% at center);
  animation: expandCircle 1s ease-out forwards;
}

@keyframes expandCircle {
  to {
    clip-path: circle(100% at center);
  }
}
```

2. **Diagonal Wipe**:
```css
.diagonal-reveal {
  clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
}

@keyframes diagonalWipe {
  to {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
}
```

3. **Curtain Open**:
```css
.curtain-reveal {
  clip-path: inset(0 50% 0 50%);
}

@keyframes curtainOpen {
  to {
    clip-path: inset(0);
  }
}
```

Implementation with ScrollTrigger:
- Trigger animation when image enters viewport (ScrollTrigger)
- Duration: 0.8s - 1.2s depending on pattern
- Pair with parallax effect for depth (transform: translateY based on scroll position)

### 4. 3D Tilt Article Cards

**ArticleCard.tsx with 3D Perspective:**

```typescript
function ArticleCard({ article }: Props) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const x = (e.clientY - rect.top - centerY) / 10; // Max 10deg tilt
    const y = -(e.clientX - rect.left - centerX) / 10;

    setTilt({ x, y });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px',
        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.1s ease-out',
        transformStyle: 'preserve-3d',
      }}
      className="relative overflow-hidden rounded-lg shadow-lg"
    >
      {/* Card content */}
    </div>
  );
}
```

Features:
- Mouse position tracked relative to card center
- RotateX/Y transforms based on cursor distance from center
- Smooth spring transition on mouse leave
- Subtle shadow shift paired with tilt (shadow-lg → shadow-2xl)
- On touch devices, disable 3D tilt to prevent layout shift

### 5. Infinite Horizontal Scroll / Marquee

**FeaturedCarousel.tsx Component:**

Using auto-scrolling marquee pattern with Framer Motion:

```typescript
import { motion } from 'framer-motion';

function FeaturedCarousel({ articles }: Props) {
  const duplicatedArticles = [...articles, ...articles]; // Duplicate for seamless loop

  return (
    <motion.div
      animate={{ x: ['0%', '-100%'] }}
      transition={{
        duration: 20, // Adjust speed (slower = 25+, faster = 15)
        repeat: Infinity,
        ease: 'linear',
      }}
      className="flex gap-8 w-max"
    >
      {duplicatedArticles.map((article, idx) => (
        <ArticleCardSmall key={`${article.id}-${idx}`} article={article} />
      ))}
    </motion.div>
  );
}
```

Enhancements:
- Pause animation on hover using `whileHover={{ animationPlayState: 'paused' }}`
- Allow manual drag with `drag="x"` constraint
- Smooth deceleration on drag release with momentum
- Gradient fade on left/right edges using `mask-image: linear-gradient`
- Keyboard navigation (arrow keys) for accessibility

### 6. Reading Progress Bar

**ReadingProgress.tsx Component:**

Animated gradient bar tracking scroll position:

```typescript
function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      setProgress((scrolled / docHeight) * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-red-500 to-red-900 z-50"
         style={{ width: `${progress}%`, transition: 'width 0.05s linear' }} />
  );
}
```

Features:
- Gradient colors that transition from accent to deeper tone
- Positioned fixed at top for always-visible indicator
- Smooth linear transition for continuous feel
- On mobile, reduce height to 0.5px for subtle effect

### 7. Category Filter with Animated Indicator

**CategoryFilter.tsx Component:**

Pill tabs with sliding active indicator and content crossfade:

```typescript
function CategoryFilter({ categories, onSelect }: Props) {
  const [active, setActive] = useState(0);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const activeTab = tabsRef.current?.children[active] as HTMLElement;
    if (!activeTab || !indicatorRef.current) return;

    gsap.to(indicatorRef.current, {
      width: activeTab.offsetWidth,
      left: activeTab.offsetLeft,
      duration: 0.3,
      ease: 'power2.out',
    });
  }, [active]);

  return (
    <div className="relative inline-flex gap-4 mb-8">
      <div ref={tabsRef} className="flex gap-4">
        {categories.map((cat, idx) => (
          <button
            key={cat}
            onClick={() => setActive(idx)}
            className={`px-4 py-2 rounded-full transition-colors ${
              idx === active ? 'text-white' : 'text-gray-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div
        ref={indicatorRef}
        className="absolute bottom-0 h-full bg-red-500 rounded-full -z-10"
      />
    </div>
  );
}
```

Content transition:
- Use Framer Motion AnimatePresence for exit animations
- Fade out current articles, fade in new articles simultaneously
- Stagger children for waterfall effect

### 8. Article Detail Page Features

**Hero Image with Parallax:**
- Large hero image that moves slower than scroll (transform: translateY)
- Overlay gradient from transparent to black at bottom for text readability
- Aspect ratio lock (16:9 or custom) with object-fit: cover

**Drop Cap First Letter:**
- First letter of first paragraph styled with larger font, floated left
- Paired with slight color change (accent red)
- Font stack: serif (Playfair) for elegance

```css
.article-body p:first-of-type::first-letter {
  font-size: 4em;
  font-family: 'Playfair Display', serif;
  color: #e63946;
  float: left;
  line-height: 1;
  margin-right: 0.1em;
  margin-top: 0.1em;
}
```

**Pull Quotes with Border Animation:**
```typescript
function PullQuote({ text }: Props) {
  const borderRef = useRef(null);

  useEffect(() => {
    gsap.from(borderRef.current, {
      scrollTrigger: {
        trigger: borderRef.current,
        start: 'top 80%',
      },
      scaleX: 0,
      transformOrigin: 'left',
      duration: 0.8,
    });
  }, []);

  return (
    <blockquote className="relative pl-8 py-4 italic text-xl" ref={borderRef}>
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500 scale-x-0" />
      "{text}"
    </blockquote>
  );
}
```

### 9. Image Lightbox

**ImageLightbox.tsx Component:**

Click image to expand with scale and blur effect:

```typescript
function ImageLightbox({ src, alt }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.img
        src={src}
        alt={alt}
        onClick={() => setIsOpen(true)}
        className="cursor-pointer"
        whileHover={{ scale: 1.02 }}
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          >
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={src}
              alt={alt}
              className="max-w-90vw max-h-90vh object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

### 10. Newsletter Signup Form

**NewsletterSignup.tsx Component:**

Animated form with morphing button:

```typescript
function NewsletterSignup() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setStatus('success');
    if (inputRef.current) inputRef.current.value = '';

    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <motion.input
        ref={inputRef}
        type="email"
        placeholder="Enter your email"
        className="flex-1 px-4 py-3 border-2 border-gray-300 rounded"
        animate={{
          borderColor: status === 'success' ? '#10b981' : '#d1d5db',
        }}
        required
      />

      <motion.button
        type="submit"
        disabled={status === 'loading'}
        className="px-6 py-3 bg-red-500 text-white rounded font-bold"
        animate={{
          width: status === 'loading' ? '50px' : '100%',
          borderRadius: status === 'loading' ? '50%' : '8px',
        }}
      >
        {status === 'idle' && 'Subscribe'}
        {status === 'loading' && <Spinner />}
        {status === 'success' && '✓'}
      </motion.button>
    </form>
  );
}
```

Button morphing: `width` and `borderRadius` animate based on state
Confetti effect on success using `react-confetti` or Canvas API

### 11. Dark/Light Mode with Color Morphing

**Global CSS Variables Approach:**

```css
:root {
  --color-bg: #fdf6ec;
  --color-text: #1a1a1a;
  --color-accent: #e63946;
  --color-border: #e0d7cd;
}

[data-theme='dark'] {
  --color-bg: #111111;
  --color-text: #e8e0d4;
  --color-accent: #ff6b6b;
  --color-border: #2a2a2a;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
  transition: background-color 0.5s ease, color 0.5s ease;
}
```

**ThemeToggle.tsx Component:**

```typescript
function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-800"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </motion.button>
  );
}
```

Color morphing is not instant; all color changes transition smoothly via CSS

### 12. Footer with Staggered Link Reveals

**Footer.tsx Component:**

```typescript
function Footer() {
  const linksRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!linksRef.current) return;

    gsap.from(linksRef.current.children, {
      scrollTrigger: {
        trigger: linksRef.current,
        start: 'top 80%',
      },
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.1,
    });
  }, []);

  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-6xl mx-auto">
        <ul ref={linksRef} className="flex flex-wrap gap-8 mb-8">
          {footerLinks.map(link => (
            <li key={link}><a href="#">{link}</a></li>
          ))}
        </ul>

        {/* Back to top button with animated arrow */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ y: -4 }}
          className="flex items-center gap-2"
        >
          Back to top
          <motion.span animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            ↑
          </motion.span>
        </motion.button>
      </div>
    </footer>
  );
}
```

## Responsive Design Strategy

### Breakpoints (Tailwind defaults)
- **Mobile**: < 640px (1-column grid, bottom sheet modals, simplified animations)
- **Tablet**: 640px - 1024px (2-column grid, reduced animation complexity)
- **Desktop**: > 1024px (3-column grid, full animation suite)

### Typography Scaling with clamp()

```css
h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
}

body {
  font-size: clamp(0.875rem, 2.5vw, 1.125rem);
}
```

Ensures readable font sizes across all screen sizes without media queries

### Grid Adjustments

```typescript
const gridCols = useMemo(() => {
  if (width < 640) return 1;
  if (width < 1024) return 2;
  return 3;
}, [width]);
```

## Performance Optimization

1. **Image Optimization**:
   - Use Next.js `<Image>` component with `priority` prop for above-fold images
   - Lazy load below-fold images with `loading="lazy"`
   - Serve WebP with fallback via srcset
   - Implement Unsplash image transformation URLs for responsive sizes

2. **Animation Performance**:
   - Use `will-change: transform` sparingly (only during animation)
   - Prefer transform and opacity over layout-triggering properties
   - Enable GPU acceleration with `transform3d` or `perspective`
   - Debounce scroll events with `requestAnimationFrame`

3. **Bundle Optimization**:
   - Dynamic imports for GSAP plugins: `import { ScrollTrigger } from 'gsap/ScrollTrigger'`
   - Code split category pages with Next.js dynamic imports
   - Tree-shake unused Framer Motion features

4. **Rendering Optimization**:
   - Memoize expensive components with `React.memo`
   - Use `useCallback` for event handlers
   - Virtualize long article lists with `react-window`

## Accessibility Considerations

- All interactive elements have keyboard navigation support (`:focus-visible`)
- Animations respect `prefers-reduced-motion` media query
- Image alt texts provide context
- Color contrast meets WCAG AA standards (4.5:1 for text)
- Form labels properly associated with inputs

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Color Scheme Reference

**Light Mode:**
- Background: `#fdf6ec` (cream)
- Text: `#1a1a1a` (charcoal)
- Accent: `#e63946` (red)
- Border: `#e0d7cd` (light tan)

**Dark Mode:**
- Background: `#111111` (near-black)
- Text: `#e8e0d4` (warm white)
- Accent: `#ff6b6b` (bright red)
- Border: `#2a2a2a` (dark gray)

## Free Resources & CDNs

- **Images**: Unsplash API (editorial-quality photos)
- **Mock Data**: JSONPlaceholder (articles.json endpoint)
- **Real Data**: News API (requires free tier account)
- **Fonts**: Google Fonts CDN (Playfair Display, Source Sans 3)
- **Icons**: Heroicons or Feather Icons (SVG)
- **Color Tools**: Coolors.co (palette generation)

## Development Workflow

1. Start with semantic HTML structure
2. Apply Tailwind utilities for base styling
3. Build components with TypeScript for type safety
4. Add animations last with GSAP/Framer Motion
5. Test responsive behavior at all breakpoints
6. Optimize images and animations for performance
7. Validate accessibility with axe DevTools

## Common Patterns & Snippets

### Scroll velocity calculation
```typescript
function useScrollVelocity() {
  const [velocity, setVelocity] = useState(0);
  let lastScrollY = useRef(0);

  useEffect(() => {
    let raf: number;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const vel = currentY - lastScrollY.current;
      setVelocity(vel);
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return velocity;
}
```

### Stagger animation helper
```typescript
function staggerChildren(duration = 0.6, stagger = 0.1) {
  return {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: stagger, delayChildren: 0.2 },
      },
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration } },
    },
  };
}
```

This skill provides a comprehensive foundation for building modern, animated editorial websites that prioritize visual storytelling, user engagement, and premium design aesthetics.
