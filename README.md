# Bentley Motors — Interactive Showcase

A premium, Awwwards-inspired website for Bentley Motors featuring an interactive 3D car model, cinematic loader animation, glassmorphism UI, and scroll-driven GSAP animations.

## Tech Stack

- **React 19** with Vite 8
- **Tailwind CSS 4** for utility-first styling
- **GSAP** with ScrollTrigger for scroll-driven and entrance animations
- **React Three Fiber** + Drei for the interactive 3D Bentley model
- **Three.js** for WebGL rendering

## Features

- **Cinematic Loader** — Fullscreen boot sequence with percentage counter, expanding divider lines, and cinematic door-open reveal
- **Interactive 3D Model** — Orbit-controllable Bentley GLB model with auto-rotation, lighting, and studio environment
- **Glassmorphism Panels** — Every section wrapped in frosted-glass containers with subtle border glow and backdrop blur
- **Scroll Animations** — Sections, cards, and text elements animate into view with staggered reveals and parallax effects
- **Floating Navbar** — Pill-shaped glass navigation bar that compacts on scroll, with animated link underlines and mobile hamburger menu
- **Responsive Design** — Fully responsive across desktop, tablet, and mobile breakpoints

## Sections

| Section | Description |
|---------|-------------|
| Loader | Cinematic fullscreen loading screen with percentage counter |
| Hero | Full-viewport hero with background image, headline animation, and performance stats |
| 3D Showcase | Interactive Bentley model with orbit controls |
| Mulliner | Bespoke craftsmanship showcase with parallax images |
| Specifications | Model selector cards (Continental GT, GTC, GT Speed) |
| Customization | Exterior, interior, and wheel configurator with color swatches |
| Testimonials | Owner stories with quote cards |
| Footer | Navigation links, social icons, and company info |

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Opens the dev server at `http://localhost:5173`.

### Production Build

```bash
npm run build
```

Output goes to `dist/`. Preview the build locally:

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## Project Structure

```
bentley/
├── public/              # Static assets (favicon, 3D models)
│   └── models/          # GLB model files
├── src/
│   ├── assets/          # Images (hero bg, Mulliner photos, logo)
│   ├── components/
│   │   ├── Loader.jsx           # Cinematic fullscreen loader
│   │   ├── Navbar.jsx           # Floating glass navigation bar
│   │   ├── HeroSection.jsx      # Hero with parallax background
│   │   ├── HeroStage.jsx        # 3D model canvas and scene
│   │   ├── ModelInfoSection.jsx  # Model details overlay
│   │   ├── GlassPanel.jsx       # Reusable glassmorphism container
│   │   ├── MullinerSection.jsx   # Craftsmanship showcase
│   │   ├── SpecificationSelector.jsx
│   │   ├── CustomizationSection.jsx
│   │   ├── TestimonialsSection.jsx
│   │   ├── Footer.jsx
│   │   ├── Icon.jsx             # SVG icon library
│   │   ├── Pagination.jsx
│   │   ├── CTAButton.jsx
│   │   └── PlayButton.jsx
│   ├── utils/
│   │   └── animations.js       # Reusable GSAP animation helpers
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css               # Global styles and theme variables
├── index.html
├── vite.config.js
└── package.json
```

## Performance

- Component-scoped ScrollTrigger cleanup (no global kills)
- `React.memo` on leaf components (Icon, GlassPanel, NavLink)
- Static style objects extracted to module scope
- Manual Vite chunks for vendor, Three.js, and GSAP
- `useGLTF.preload()` for early 3D model fetching
- Frame-rate-independent `useFrame` rotation
- `transform` and `opacity` only animations (GPU-accelerated)
- Mobile-safe `background-attachment` handling
- Hero image preloading for faster LCP

## License

This project is for demonstration purposes only. Bentley Motors is a registered trademark of Bentley Motors Limited.
