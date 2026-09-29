# GO LEGALS — Premium Legal Services Website

A complete, production-ready static website for **GO LEGALS**, an Indian legal-services practice focused on property law, documentation, verification, due diligence, drafting and registration assistance.

---

## Project

GO LEGALS Premium Legal Services Website

## Technology

- **HTML5**
- **CSS3**
- **Vanilla JavaScript**

No frameworks, no build system, no package manager, no backend, no database.

---

## Local Running

Open the project folder and double-click `index.html` (or open it in any modern browser).

```text
go-legals/
├── index.html
├── services.html
├── about.html
├── contact.html
├── 404.html
├── README.md
├── css/
│   ├── style.css
│   └── responsive.css
├── js/
│   └── script.js
└── assets/
    ├── fonts/
    ├── icons/
    ├── images/
    │   ├── hero-poster.webp
    │   ├── documentation-detail.webp
    │   ├── property-detail.webp
    │   └── og-cover.jpg
    ├── logo/
    │   ├── logo.svg
    │   └── favicon.svg
    └── video/
        └── go-legals-hero.mp4
```

No `npm`, no server and no compilation step is required. A local server is only optional (for example `npx serve` or any static file server) if you prefer testing over `http://`.

---

## Hero Video — Development Source

The current local source folder is:

```text
C:\Users\Welcome\OneDrive\Desktop\New folder
```

The source video was inspected (1920×1080, 24 fps, 10 s, H.264) and re-encoded for the web: audio removed, optimised bitrate, fast-start enabled.

> **This Windows path is a development asset source only. It must never appear in the production website.** The deployed site references the video only through the relative path below.

## Hero Video — Production Location

```text
assets/video/go-legals-hero.mp4
```

Referenced in `index.html` as:

```html
<video class="hero-video" autoplay muted loop playsinline preload="metadata"
       poster="assets/images/hero-poster.webp">
    <source src="assets/video/go-legals-hero.mp4" type="video/mp4">
</video>
```

If the video cannot play, the poster remains visible and the site stays fully functional.

## Hero Poster

```text
assets/images/hero-poster.webp
```

Derived from the supplied hero video so the poster always matches the footage.

---

## Configuration — Replace Placeholders

All configuration lives at the top of `js/script.js`:

```javascript
const GO_LEGALS_CONFIG = {
    whatsappNumber: "91XXXXXXXXXX",
    formspreeEndpoint: "YOUR_FORMSPREE_ENDPOINT",
    emailAddress: "YOUR_EMAIL_ADDRESS",
    callNumber: "91XXXXXXXXXX",
    companyName: "Go Legals"
};
```

### WhatsApp

Replace:

```javascript
whatsappNumber: "91XXXXXXXXXX"
```

with the real international number — digits only, **no** `+`, spaces, brackets or hyphens (example: `919876543210`).

Until it is configured, WhatsApp buttons show a clear notice instead of opening an invalid link.

### Formspree

Create a form at [formspree.io](https://formspree.io), then replace:

```javascript
formspreeEndpoint: "YOUR_FORMSPREE_ENDPOINT"
```

with the endpoint URL, for example `https://formspree.io/f/abcdefgh`.

Until it is configured, the **Submit Consultation Request** option shows the submission-failure message — it never reports a false success.

### Email

Replace:

```javascript
emailAddress: "YOUR_EMAIL_ADDRESS"
```

with the real receiving address (used by the **Send by Email** option and the email contact buttons).

### Call

Replace:

```javascript
callNumber: "91XXXXXXXXXX"
```

with the real phone number used by the mobile **Call** button.

---

## Enquiry Wizard

One centralised, reusable wizard (`js/script.js`) is used from:

- Hero CTA and header CTA
- Every service CTA (with the service preselected via `openEnquiryWizard("Service Name")`)
- Contact page and consultation sections
- The mobile action bar

Four steps: **Your Details → Legal Requirement → Property Details → Review & Submit**, with:

- Step validation with inline messages
- Conditional fields for Form 26QB, Document Review, Consultation, Builder and Resale property
- Review list with per-step edit controls
- Three clearly separated submission options: WhatsApp, Email and Formspree
- Success and error states (a failed request is never reported as a success)
- Focus trap, Escape to close, focus restoration, scroll lock, reduced-motion support

---

## GitHub Pages

1. Push the `go-legals` folder to a GitHub repository.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the branch (for example `main`) and the folder `/ (root)`.
5. Save and wait for the deployment to finish.
6. Open the generated URL, for example:

```text
https://username.github.io/repository-name/
```

7. Test every page, the enquiry wizard, WhatsApp and the Formspree submission.

All links and assets are **relative** (`index.html`, `css/style.css`, `assets/...`) so the site works at any repository path with no rewrites, no server code and no build step.

---

## Accessibility & Performance Notes

- Semantic HTML5, labelled controls, visible focus states, skip link
- Mobile menu and wizard trap keyboard focus, respond to `Escape` and restore focus
- `prefers-reduced-motion` disables entrance animations, pauses the hero video and prefers the poster
- Self-hosted variable fonts (no third-party font requests), lazy-loaded below-the-fold images
- `webp` imagery, compressed `mp4` hero video with poster fallback

## Legal

Website content is provided for general informational purposes and does not by itself constitute legal advice or establish an advocate-client relationship.

© GO LEGALS. All Rights Reserved.
