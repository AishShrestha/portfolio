# Ayush Shrestha — AI Engineer Portfolio

A premium, animated personal portfolio built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and Three.js. Dark, futuristic, glassmorphic, and highly interactive — designed to feel like it belongs to someone building next-generation AI systems.

![Built with Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)

## ✨ Features

- **Cinematic animations** — page reveal, word-by-word text, parallax, scroll-driven timeline
- **3D particle field** — GPU-rendered floating particles via React Three Fiber
- **Aurora background** — drifting gradient blobs with noise texture
- **Custom cursor** — dot + trailing ring with magnetic hover detection
- **Command palette** — `⌘K` / `Ctrl+K` to navigate, open socials, toggle theme
- **Interactive terminal** — a working mini-shell (`help`, `about`, `projects`, …)
- **Magnetic buttons** — elements that subtly follow the cursor
- **3D tilt cards** — project & skill cards tilt on hover with glare
- **Smooth scrolling** — Lenis-powered buttery scroll
- **Scroll progress bar** — gradient indicator at the top
- **Preloader** — animated loading screen on first paint
- **Glassmorphism** — frosted panels throughout
- **Theme toggle** — dark/light switch
- **SEO-ready** — metadata, OpenGraph, sitemap, robots
- **Responsive & accessible** — reduced-motion support, keyboard nav, semantic HTML

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion, GSAP
- **3D:** Three.js + React Three Fiber + Drei
- **Smooth scroll:** Lenis
- **Icons:** Lucide
- **Command palette:** cmdk

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Build for production
npm run build && npm start
```

The site runs at `http://localhost:3000`.

## 📁 Project Structure

```
src/
├── app/                  # Next.js App Router
│   ├── layout.tsx        # Root layout + metadata + fonts
│   ├── page.tsx          # Home page (assembles all sections)
│   ├── globals.css       # Theme, glassmorphism, animations
│   ├── robots.ts         # SEO robots
│   └── sitemap.ts        # SEO sitemap
├── components/
│   ├── layout/           # Navbar, Footer
│   ├── providers/        # ThemeProvider, SmoothScroll
│   ├── sections/         # Hero, About, Skills, Projects, Experience, Terminal, Blog, Contact
│   ├── three/            # ParticleScene (R3F)
│   └── ui/               # Reusable: Reveal, Magnetic, TiltCard, AuroraBackground, CustomCursor, CommandPalette, etc.
├── hooks/                # useMousePosition, useScrollProgress
└── lib/                  # Data (projects, skills, experience, site) + utils
```

## 🎨 Customization

All content lives in `src/lib/`:
- `site.ts` — name, title, socials, SEO config
- `projects.ts` — project cards
- `skills.ts` — skill categories
- `experience.ts` — experience timeline

The color palette is defined in `tailwind.config.ts` (`bg`, `accent.purple/blue/cyan`).

## 📝 Wiring the Contact Form

The contact form in `src/components/sections/contact.tsx` currently simulates a send. To make it real, POST the form data to an API route (e.g. `/api/contact`) or a service like Resend, Formspree, or EmailJS.

## 🌐 Deploy

Deploy on Vercel (recommended), Netlify, or any Node host:

```bash
npm run build
npm start
```

---

Built with care in Nepal.