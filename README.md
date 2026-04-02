# Wizkid Official Website

**Award-winning, production-grade multi-page Next.js website for Wizkid (Ayodeji Ibrahim Balogun).**  
Built with the aesthetic of a $500k agency project — dark, cinematic, Afrofuturist.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 14** (App Router) | Framework & routing |
| **TypeScript** (strict) | Type safety |
| **Tailwind CSS v3** | Styling with custom design tokens |
| **GSAP 3** + ScrollTrigger, Flip, TextPlugin | Advanced animations |
| **next-themes** | Dark/light mode |
| **Lucide React** | Icons |
| **Cormorant Garamond** + **Bebas Neue** + **DM Sans** | Typography trio |

---

## Quick Start

```bash
# 1. Clone or download the project
cd wizkid-website

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev

# 4. Open in browser
open http://localhost:3000
```

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (navbar, footer, cursor, theme)
│   ├── page.tsx                # Home page
│   ├── music/
│   │   ├── page.tsx
│   │   └── MusicPageClient.tsx
│   ├── tour/
│   │   ├── page.tsx
│   │   └── TourPageClient.tsx
│   ├── about/
│   │   ├── page.tsx
│   │   └── AboutPageClient.tsx
│   ├── shop/
│   │   ├── page.tsx
│   │   └── ShopPageClient.tsx
│   ├── gallery/
│   │   ├── page.tsx
│   │   └── GalleryPageClient.tsx
│   └── contact/
│       ├── page.tsx
│       └── ContactPageClient.tsx
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Fixed nav with mobile overlay
│   │   └── Footer.tsx          # Full-width footer
│   ├── ui/
│   │   ├── CustomCursor.tsx    # Gold dot + ring cursor
│   │   ├── ScrollProgress.tsx  # Gold progress bar
│   │   ├── DarkModeToggle.tsx  # Animated sun/moon toggle
│   │   └── MagneticButton.tsx  # Magnetic hover CTA button
│   └── home/
│       ├── Hero.tsx            # Full-viewport cinematic hero
│       ├── MarqueeSection.tsx  # Infinite scrolling ticker
│       ├── LatestRelease.tsx   # Album + tracklist player
│       ├── StatsSection.tsx    # Animated counter stats
│       ├── TourPreview.tsx     # 3 upcoming show cards
│       ├── ShopTeaser.tsx      # 3 product teasers
│       └── NewsletterCTA.tsx   # Email signup section
├── hooks/
│   ├── useGSAP.ts              # GSAP context hook
│   ├── useScrollTrigger.ts     # Scroll animation hook
│   ├── useMagneticEffect.ts    # Magnetic hover hook
│   └── useCustomCursor.ts      # Custom cursor logic
├── lib/
│   ├── gsap.ts                 # GSAP plugin registration
│   └── data/
│       ├── music.ts            # Discography data
│       ├── tour.ts             # Tour dates & VIP packages
│       ├── shop.ts             # Products & featured drop
│       └── gallery.ts          # Photos & videos
└── styles/
    └── globals.css             # CSS variables, animations, utilities
```

---

## Pages

### `/` — Home
Full cinematic hero with GSAP SplitText letter-by-letter title reveal, infinite marquee ticker, latest album section with animated progress bar, animated stat counters, 3-card tour preview, shop teaser grid, and newsletter CTA with gradient background.

### `/music` — Music
Parallax cinematic header, filterable discography grid (albums/singles/collabs) with click-to-flip tracklist cards, animated sliding filter tab underline, press quotes carousel, and streaming platform cards.

### `/tour` — Tour
Live countdown timer to next show, filterable tour dates table with animated staggered row entrances, ticket modal, 3-tier VIP packages with gold shimmer, and fan testimonial cards.

### `/about` — About
Typewriter text opener ("From Surulere to the world stage."), alternating-side scroll-triggered timeline from 1990–2024, biography sections, collaborator chip cloud, large pull quote, and awards wall.

### `/shop` — Shop
Animated hero, featured collector's drop with countdown timer, filterable product grid with hover image swap and limited edition badges, full slide-in cart drawer, and product detail modal with size selector.

### `/gallery` — Gallery
Mosaic hero that assembles on load, filter bar for live/studio/fashion/events, masonry photo grid with staggered entrance, full-screen lightbox with keyboard navigation, and music video carousel with YouTube embed modal.

### `/contact` — Contact
Particle canvas hero (80 gold particles with connections), 3 contact type cards (bookings/press/label), luxury floating-label form, fan message board, and social media cards with platform colors.

---

## Global Features

- **Custom Cursor** — Gold dot with lagging ring, expands on hover, hidden on touch devices
- **Scroll Progress Bar** — Thin gold line at top of viewport
- **Dark/Light Toggle** — Default dark; ivory cream in light mode; smooth 300ms CSS transitions
- **Mobile Menu** — Full-screen overlay with staggered GSAP link reveal
- **Responsive** — 320px → 1920px with mobile-first breakpoints
- **SEO** — Per-page metadata with Next.js Metadata API
- **Performance** — Next.js Image for all photos, font preloading via `<link>`, GSAP context cleanup

---

## Animation System

All animations use GSAP with proper cleanup:

```tsx
// Example usage in a component
useEffect(() => {
  registerGSAP() // registers ScrollTrigger, Flip, TextPlugin once
  
  const ctx = gsap.context(() => {
    gsap.fromTo('.my-element', 
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out',
        scrollTrigger: { trigger: '.my-section', start: 'top 80%', once: true }
      }
    )
  })
  
  return () => ctx.revert() // cleans up all animations
}, [])
```

---

## Design Tokens

All colors and theme variables are in `src/styles/globals.css`:

```css
:root {
  --bg: #F5F0E8;       /* Light: ivory */
  --fg: #080808;       /* Light: obsidian */
  --gold: #D4AF37;     /* Primary accent */
  --amber: #FF6B00;    /* Secondary accent */
}

.dark {
  --bg: #080808;       /* Dark: obsidian */
  --fg: #F5F0E8;       /* Dark: ivory */
}
```

Custom Tailwind tokens in `tailwind.config.ts` include `obsidian`, `gold`, `amber`, `ivory`, `charcoal`, plus custom animation keyframes for `marquee`, `float`, `pulse-gold`, and more.

---

## Available Scripts

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # ESLint
npm run format   # Prettier
```

---

## Browser Support

Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

---

*Made with ♡ in Lagos.*
