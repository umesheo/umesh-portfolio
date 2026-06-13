# Umesh Budhathoki — Portfolio

An award-winning style personal portfolio for **Umesh Budhathoki**, Business Systems Developer & Analyst at Buller District Council. Built with **React**, **Three.js** (react-three-fiber), **Framer Motion** and **Lenis** smooth scrolling.

## Highlights

- **Interactive 3D hero** — a distorted metallic blob with an additive particle field that reacts to the cursor (react-three-fiber + drei).
- **Buttery smooth scrolling** via Lenis with reduced-motion fallback.
- **Custom cursor** with magnetic buttons and blend-mode ring.
- **Scroll-reveal animations**, animated stat counters, marquee and a preloader.
- **Fully responsive** with a mobile menu and `prefers-reduced-motion` support.

## Sections

Hero · About & Education · Experience timeline · Projects (NotchBar, Coast Waters, BDC Connect, Nemean) · Skills · Contact.

## Getting started

```bash
npm install
npm run dev      # start dev server at http://localhost:5173
npm run build    # production build to /dist
npm run preview  # preview the production build
```

## Tech stack

| Area        | Tools                                            |
| ----------- | ------------------------------------------------ |
| Framework   | React 19 + Vite                                  |
| 3D          | three, @react-three/fiber, @react-three/drei     |
| Animation   | framer-motion                                    |
| Smooth scroll | lenis                                          |
| Styling     | Hand-written CSS design system (`src/styles/global.css`) |

## Editing content

All copy (profile, experience, projects, skills, education) lives in
[`src/data/content.js`](src/data/content.js) — update it there and the UI follows.

Project screenshots live in `public/projects/`.
