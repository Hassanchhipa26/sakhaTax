# Sakha Tax Consultancy — Frontend

Production React frontend for Sakha Tax Consultancy, built with Vite, Tailwind CSS v4, React Router, Framer Motion, React Icons and React Hook Form.

## Tech Stack

- **React 19** (Vite)
- **Tailwind CSS v4** — design tokens defined in `src/index.css` via `@theme`
- **React Router DOM v7** — routing in `src/router/AppRouter.jsx`
- **Framer Motion** — page/section animations
- **React Hook Form** — contact form validation
- **Axios** — API client (`src/services/api.js`)
- **React Icons** (Feather + Font Awesome subsets)

## Getting Started

```bash
npm install
cp .env.example .env   # then set VITE_API_URL to your backend URL
npm run dev             # http://localhost:5173
```

## Build

```bash
npm run build      # outputs to dist/
npm run preview    # preview the production build locally
```

## Folder Structure

```
src/
  assets/          static assets
  components/
    common/        Button, ServiceCard, ContactForm, SuccessAlert, SectionHeading, PageHeader
    layout/        Navbar, Footer, StickyCTA
    home/          Hero, StatsBar, ServicesPreview, WhyChooseUs, Testimonials, CTASection
  layouts/         MainLayout (Navbar + Outlet + Footer)
  pages/           Home, About, Services, Contact, NotFound
  hooks/           useCountUp (animated stat counters)
  services/        api.js (axios instance), contactService.js
  utils/           validators.js (Indian mobile / email regex)
  constants/       services.js (17 services with ledger-style form codes), site.js (business info, stats, testimonials)
  router/          AppRouter.jsx
```

## Design System

Colors, fonts and the signature "ledger grid" texture are defined as CSS custom properties in `src/index.css` under `@theme`:

- Primary `#0F4C81` · Secondary `#1B9AAA` · Accent `#00C896`
- Display font: Poppins · Body font: Inter · Data/mono font: IBM Plex Mono
- `.ledger-grid` / `.ledger-grid-fine` utility classes reproduce the ruled-ledger-paper motif used in the hero and service cards

## Backend Integration

The contact form (`src/components/common/ContactForm.jsx`) posts to `POST {VITE_API_URL}/contact` via `src/services/contactService.js`. Until the backend (see the sibling `/server` project) is running and `VITE_API_URL` is set, submissions will show an error state — this is intentional; the form does not fake a success response.

## Environment Variables

| Variable        | Description                          |
|------------------|---------------------------------------|
| `VITE_API_URL`   | Base URL of the backend API, e.g. `http://localhost:5000/api` |

## SEO

Meta tags, Open Graph tags, `robots.txt` and `sitemap.xml` are set up in `index.html` and `public/`. Update the canonical domain in both files once the production domain is known.
