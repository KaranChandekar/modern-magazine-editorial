# Modern Magazine / Editorial Layout - Claude Code Prompt

You are an expert full-stack web developer specializing in premium magazine design, editorial layouts, and sophisticated web animations. You are building a modern digital magazine website with cutting-edge design patterns, smooth interactions, and professional animations.

## Project Brief

Create a modern digital magazine website that showcases editorial content with premium visual design, kinetic text animations, scroll-triggered effects, and advanced interactive features. The site should feel like a high-end digital publication with sophisticated animations and a polished user experience.

## Core Requirements

### Technology Stack
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS + CSS Grid for layouts
- **Animations**: GSAP (ScrollTrigger, SplitText) + Framer Motion
- **Language**: TypeScript for type safety
- **Fonts**: Google Fonts (Playfair Display, Source Sans 3) + Fontshare (Clash Display, General Sans)

### Homepage Layout
1. **Asymmetric CSS Grid Design**:
   - 3-column grid on desktop that adapts to 2-column on tablet and 1-column on mobile
   - Featured article card spans 2x2 (large prominent placement)
   - Regular articles span 1x1
   - Smooth, responsive grid reorganization

2. **Article Cards with 3D Tilt**:
   - Hover effect applies 3D perspective tilt based on cursor position
   - Cards tilt on X/Y axes (max 10-15 degrees)
   - Subtle shadow enhancement paired with tilt
   - Smooth spring-like transition on mouse leave
   - Disable 3D tilt on touch devices

3. **Kinetic Text Animations**:
   - Headlines animate character-by-character as they scroll into view
   - Text scramble effect on hover (characters briefly move to random positions)
   - Cursor position influences scramble direction
   - Use GSAP SplitText for character-level control

4. **Scroll-Triggered Image Reveals**:
   - Multiple reveal patterns: circle expand, diagonal wipe, curtain open
   - Animate clip-path property as images scroll into viewport
   - Pair reveals with parallax movement for depth
   - Different patterns for different image groups

5. **Infinite Horizontal Scroll Section**:
   - Auto-scrolling featured articles carousel (marquee style)
   - Pause on hover
   - Manual drag-to-browse interaction with momentum
   - Seamless loop with duplicated content
   - Smooth gradient fade on left/right edges

### Article Detail Page
1. **Hero Image with Parallax**:
   - Large full-width hero image (16:9 aspect ratio)
   - Slower scroll speed creates parallax depth effect
   - Gradient overlay for text readability

2. **Editorial Typography Features**:
   - Drop cap styling for first letter of article (large, serif, accent color)
   - Proper typography hierarchy with fluid font scaling (clamp())
   - Pull quotes with animated border draw-in effect
   - Proper line heights and spacing for readability

3. **Reading Progress Bar**:
   - Fixed top bar indicating scroll progress
   - Animated gradient fill from left to right
   - Smooth linear transition as user scrolls

4. **Related Articles Section**:
   - Show 3-4 related articles at bottom of page
   - Subtle hover animations on cards

### Interactive Features
1. **Category Filter Tabs**:
   - Pill-style category tabs with smooth active indicator
   - Sliding indicator bar animated with GSAP
   - Content crossfade transition when switching categories
   - Staggered animation for article list

2. **Image Lightbox**:
   - Click on images to expand full-screen
   - Scale up animation with blur background
   - Click background to close
   - Smooth exit animation

3. **Newsletter Signup Form**:
   - Animated form with input border draw-in effect
   - Button morphs on submit (width animation, border radius change)
   - Loading state with spinner
   - Success state with checkmark
   - Confetti effect on successful signup
   - Input border changes color on success

4. **Dark/Light Mode Toggle**:
   - Toggle button in navbar
   - Smooth color transitions (not instant swaps)
   - CSS variables for color scheme management
   - Persisted to localStorage
   - Respects system preference on first visit

### Color Scheme
**Light Mode:**
- Background: `#fdf6ec` (cream)
- Text: `#1a1a1a` (charcoal)
- Accent: `#e63946` (red)
- Border/Secondary: `#e0d7cd` (tan)

**Dark Mode:**
- Background: `#111111` (near-black)
- Text: `#e8e0d4` (warm white)
- Accent: `#ff6b6b` (bright red)
- Border/Secondary: `#2a2a2a` (dark gray)

### Data & Content
1. Use JSONPlaceholder API for mock article data
2. Create realistic article structure with title, excerpt, featured image, author, publish date, category
3. Implement search/filter functionality
4. Use Unsplash API for high-quality editorial images

### Footer
- Staggered animation for links (fade in + translate up)
- Back-to-top button with animated arrow indicator
- Newsletter signup call-to-action
- Social media links

## Implementation Guidelines

### Component Architecture
- Create reusable, TypeScript-typed components
- Use custom hooks for complex state logic (useScrollVelocity, useMeasure, useTheme)
- Separate animation logic from component logic

### Performance Considerations
- Lazy load images with Next.js Image component
- Use requestAnimationFrame for scroll events
- Memoize expensive animations
- Tree-shake GSAP plugins to minimize bundle
- Implement code splitting for category/article pages

### Accessibility
- Ensure animations respect `prefers-reduced-motion`
- All interactive elements keyboard accessible
- Proper semantic HTML (heading hierarchy, lists, etc.)
- Color contrast meets WCAG AA standards
- Image alt text is descriptive
- Form labels properly associated with inputs

### Responsive Design
- Mobile-first approach
- Use CSS Grid and Flexbox for layouts
- Font sizes scale with clamp() for fluid typography
- Adjust animation intensity on mobile (shorter durations, simpler effects)
- Test at breakpoints: 640px, 1024px, 1280px

## Deliverables

1. Fully functional Next.js 15 application
2. Responsive homepage with asymmetric grid and featured articles
3. Article detail pages with parallax, drop caps, and reading progress
4. Animated navigation and theme toggle
5. Category filtering with smooth transitions
6. Newsletter signup with form validation
7. Image lightbox with smooth animations
8. Dark/light mode with persistent theme
9. All animations using GSAP and Framer Motion best practices
10. TypeScript throughout with proper types
11. Optimized images and performance
12. Accessible components meeting WCAG standards

## Success Criteria

- Smooth, jank-free animations at 60fps
- Responsive design that works perfectly on all screen sizes
- Professional, premium visual design
- Fast page load times (Lighthouse score 90+)
- Excellent user experience with delightful interactions
- Clean, maintainable TypeScript code
- No accessibility issues (axe DevTools pass)
