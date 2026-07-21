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

Hosted on **Cloudflare** as a Worker with static assets. Deploys are currently **manual (Direct Upload)** — the site does *not* update when you push to GitHub. Follow the steps below every time you want changes to go live.

### Deploying a new build

**1. Build the site**

```bash
cd mustatar
npm install      # only needed if dependencies changed
npm run build
```

This regenerates the `dist/` folder. Open it in Finder with:

```bash
open dist
```

**2. Upload to Cloudflare**

1. Go to <https://dash.cloudflare.com> → **Workers & Pages**.
2. Open the project (**`polished-king-783b`**).
3. Open the **Deployments** tab → click **Create deployment** (or **Upload assets**).
4. **Drag the `dist` folder** onto the upload area, or click to browse and select it.
5. Click **Deploy**.

Deployment takes ~30 seconds. The custom domain (`mustatar.com.sa`) updates automatically — no DNS changes needed.

> **Important:** upload the **`dist` folder itself** (or its contents) so that `index.html` sits at the **top level** of the upload. If it ends up nested inside another folder, the site will 404.

**3. Verify it went live**

Hard-refresh the site (`Cmd/Ctrl + Shift + R`) and confirm your change is visible. To check the deployed build from the terminal:

```bash
# should print the current title
curl -s https://mustatar.com.sa/ | grep -o "<title>[^<]*</title>"

# confirm an asset loads
curl -s -o /dev/null -w "%{http_code}\n" https://mustatar.com.sa/robots.txt
```

Because filenames are content-hashed (e.g. `index-BbCve7-0.js`), browsers pick up new builds immediately — no cache busting needed.

### Rolling back

In the **Deployments** tab, find a previous deployment and choose **Rollback** (⋯ menu). Useful if a build breaks something.

### Automating deploys (optional)

Manual uploads get tedious. Two ways to remove the step:

**a) Connect the GitHub repo** — Workers & Pages → project → **Settings → Builds** → connect `FahadAlsulaiman/mustatar`, with:
- Build command: `npm run build`
- Output directory: `dist`

Every push to `main` then deploys automatically.

**b) Deploy from the CLI** with Wrangler (already a dev dependency):

```bash
npx wrangler login                  # one-time
npm run build
npx wrangler pages deploy dist
```

---

## Domain & email notes

- **DNS** is managed by Cloudflare (nameservers `mimi.ns.cloudflare.com`, `newt.ns.cloudflare.com`); the domain remains registered with souqt2.
- **Email runs on Google Workspace.** The five `ASPMX…GOOGLE.COM` MX records plus the SPF / DKIM / DMARC `TXT` records must stay in Cloudflare DNS, set to **DNS only** (grey cloud).

> **Do not enable Cloudflare Email Routing.** It would replace the Google MX records and break `Info@mustatar.com.sa`.

- `robots.txt` intentionally declares only the sitemap — Cloudflare injects its own managed crawl rules (search engines allowed, AI-training crawlers blocked) above it.
