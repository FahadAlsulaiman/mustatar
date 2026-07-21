# مُستطر — Mustatar Lawyers & Consultants

Bilingual (Arabic / English) landing page for **Mustatar Lawyers & Consultants**, a Saudi law firm based in Riyadh.

**Live:** https://mustatar.com.sa

---

## Features

- **Fully bilingual** — Arabic (RTL) and English (LTR) with a one-click toggle. Direction, layout, `<title>`, and meta description all switch together, with a smooth crossfade.
- **Sections** — Hero, About (Vision / Mission), Services, Team, Clients, Service Request form, Contact (map), Footer.
- **Working contact form** — delivers to `Info@mustatar.com.sa` via [Web3Forms](https://web3forms.com), with the sender's address set as `Reply-To`.
- **Robust validation** — per-field inline errors, letters-only name, real email check, and international phone validation via `libphonenumber-js`.
- **Searchable country-code picker** — countries with flags and localized names, Saudi Arabia default, Arabic-Indic numerals auto-converted to English digits.
- **Anti-spam** — randomized honeypot field, time-trap, length caps (no CAPTCHA friction). Cloudflare Turnstile is wired up but dormant behind a flag.
- **SEO** — meta + Open Graph + Twitter tags, `LegalService` JSON-LD structured data, sitemap, robots.txt, social share image.
- **Accessible** — WCAG AA colour contrast, labelled form fields, keyboard-friendly, `sr-only` headings.
- **Fast** — self-hosted subsetted fonts, WebP imagery, code-split form, preloaded hero assets.

## Tech stack

| | |
|---|---|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS |
| Icons | lucide-react |
| Phone validation | libphonenumber-js |
| Form delivery | Web3Forms |
| Hosting / DNS | Cloudflare |

---

## Quick start

```bash
npm install
npm run dev      # dev server at http://localhost:5173
```

### Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start the dev server (HMR) |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

---

## Project structure

```
src/
  components/
    Navbar.jsx          Fixed nav; transparent over hero, solid on scroll
    Hero.jsx            Skyline background + gold geometric strip (mirrors with language)
    About.jsx           Intro + Vision / Mission cards
    Services.jsx        Six service cards
    Team.jsx            Lead partner on own row, remaining members below
    Clients.jsx         Client list (supports optional logos)
    ServiceRequest.jsx  Contact form: validation, anti-spam, Web3Forms delivery
    PhoneInput.jsx      Searchable country-code picker + number field
    Contact.jsx         OpenStreetMap embed + contact details
    Footer.jsx          Links, services, contact info, company profile download
    Turnstile.jsx       Cloudflare Turnstile widget (dormant)
    CardPattern.jsx     Shared gold pattern accent used on cards
  i18n/
    translations.js     ALL site copy, both languages  <- edit content here
    LanguageContext.jsx Language state, dir/lang sync, SEO tags, fade transition
  fonts.css             Self-hosted Tajawal @font-face rules
  index.css             Tailwind entry + global styles

public/
  hero/                 logo.webp, skyline.webp, pattern-gold.webp
  fonts/                Tajawal woff2 (400/500/700 x arabic/latin)
  og-image.jpg, robots.txt, sitemap.xml

functions/
  api/contact.js        Cloudflare Pages Function (CAPTCHA verify) — unused while dormant
```

---

## Editing content

**All text lives in [`src/i18n/translations.js`](src/i18n/translations.js)** — one `ar` object and one `en` object with identical shapes. Change copy there and it updates everywhere (including the footer services list and SEO tags).

```js
export const translations = {
  ar: { nav: {...}, about: {...}, services: {...}, team: {...}, clients: {...} },
  en: { /* same keys */ },
}
```

Keep both languages in sync — if you add a key to `ar`, add it to `en` too.

**Client logos:** each entry in `clients.items` is `{ name, logo }`. Drop an image in `public/clients/` and set `logo: '/clients/name.png'`; otherwise a placeholder icon is shown.

---

## Configuration

### Contact form (Web3Forms)

The access key is in [`src/components/ServiceRequest.jsx`](src/components/ServiceRequest.jsx):

```js
const WEB3FORMS_ACCESS_KEY = '...'
```

It is public by design. **Restrict it to `mustatar.com.sa` in the Web3Forms dashboard** so it can't be used from other sites. Free tier: 250 submissions/month.

### CAPTCHA (currently off)

Cloudflare Turnstile is fully implemented but disabled:

```js
const CAPTCHA_ENABLED = false   // ServiceRequest.jsx
```

To enable: set it to `true` and put your real site key in [`src/components/Turnstile.jsx`](src/components/Turnstile.jsx). The token is then sent to Web3Forms for server-side verification.

---

## Deployment

Hosted on **Cloudflare** as a Worker with static assets.

```bash
npm run build     # produces dist/
```

Then upload the **`dist/` folder** in the Cloudflare dashboard (Workers & Pages → your project → Deployments → Create deployment).

> Deploys are currently manual (Direct Upload). Connecting the GitHub repo — or using `wrangler pages deploy dist` — would make every push deploy automatically.

---

## Domain & email notes

- **DNS** is managed by Cloudflare (nameservers `mimi.ns.cloudflare.com`, `newt.ns.cloudflare.com`); the domain remains registered with souqt2.
- **Email runs on Google Workspace.** The five `ASPMX…GOOGLE.COM` MX records plus the SPF / DKIM / DMARC `TXT` records must stay in Cloudflare DNS, set to **DNS only** (grey cloud).

> **Do not enable Cloudflare Email Routing.** It would replace the Google MX records and break `Info@mustatar.com.sa`.

- `robots.txt` intentionally declares only the sitemap — Cloudflare injects its own managed crawl rules (search engines allowed, AI-training crawlers blocked) above it.
