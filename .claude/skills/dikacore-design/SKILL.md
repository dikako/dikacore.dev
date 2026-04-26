---
name: dikacore-design
description: Apply the dikacore.dev design system when creating or modifying any page, section, component, or stylesheet in this repo. Triggers on any HTML/CSS/JS work — new sections, new pages (like more games, blog, projects), new cards, modals, buttons, badges, or visual tweaks. Use this skill BEFORE writing markup or styles so the result matches the existing Alabaster/Sage palette, Syne/Manrope typography, and the existing card/section/badge/button patterns.
---

# dikacore.dev design system

This site has a deliberate, minimal aesthetic. Match it. Do not invent new colors, fonts, radii, or spacing scales.

## Mandatory: reuse, don't redefine

- Always link `css/style.css` first. If a new page needs extra styles, add them to a new dedicated stylesheet (e.g. `css/<page>.css`) and link it AFTER `style.css` — never duplicate `:root` tokens.
- Always preconnect to the same Google Fonts and load the same `Manrope` + `Syne` families used in `index.html`.
- Always include the favicon: `<link rel="icon" type="image/svg+xml" href="assets/favicon.svg">`.
- Reuse the existing classes (`.container`, `.section`, `.section-header`, `.project-card`, `.tag`, `.tech-tags`, `.btn-primary`, `.badge`, `.fab-btn`, `.modal*`, `.repo-card`) before writing anything new.

## Design tokens (from `css/style.css` `:root`)

Use the CSS variables — never hardcode the hex values.

| Token              | Value     | Use                                              |
| ------------------ | --------- | ------------------------------------------------ |
| `--bg-main`        | `#F5F5F0` | Page background (Alabaster)                      |
| `--bg-card`        | `#FFFFFF` | Cards, modal content, footer                     |
| `--text-primary`   | `#303030` | Body and headline text                           |
| `--text-secondary` | `#595959` | Secondary text, captions, meta                   |
| `--accent-sage`    | `#7D8C7A` | Hover states, highlights, FAB, section numbers   |
| `--accent-dark`    | `#2C3632` | Strong accent for repo titles, role-title        |
| `--line`           | `#E0E0DB` | Borders, dividers, subtle separators             |
| `--font-heading`   | `Syne`    | Logo, h1–h4, section titles, card titles         |
| `--font-body`      | `Manrope` | All body copy, buttons, tags                     |

If a new page (like the pipeline game) needs extra semantic colors (success/error), follow the precedent in `css/pipeline_game.css`: redefine `:root` with the same six base tokens, then ADD `--success-color: #2ecc71;` and `--error-color: #e74c3c;`. Don't change the base palette.

## Typography rules

- Headings (`h1`–`h4`, `.logo`, section titles, card titles): `var(--font-heading)`, weight `500`–`600`.
- Body, descriptions, tags, buttons: `var(--font-body)`, weight `400`–`600`.
- Hero statement: `3.5rem` desktop, `2.5rem` mobile (≤768px). See `.hero-statement`.
- Section title: `2rem`, paired with a small Syne section number (`01`, `02` …) in `--accent-sage`.
- Italicized `<span class="highlight">` is the canonical way to emphasize a phrase inside a heading — sage color, italic.

## Layout rules

- Page wrapper: `.container` (`max-width: 1000px`, `padding: 0 5%`). Don't widen it.
- Section spacing: `.section { padding: 100px 0; }`. Section header uses the `01 / Title` pattern (`.section-header` with `.section-num` + `h2`).
- Sticky nav: `.nav` with logo left, action right. Reuse existing markup; don't restyle the nav.
- Mobile breakpoint: `@media (max-width: 768px)`. Cards drop padding to `25px`, grids collapse to one column.

## Component patterns (use these — don't reinvent)

### Cards
- **Project / experience card**: `.project-card` — white, `8px` radius, `40px` padding, subtle shadow, lifts `-2px` on hover with sage-line border. Use `.card-header` (title left + `.tag` date right with bottom border), `.card-body`, `.role-title`, `.description-list` (or `.description`), and `.tech-tags > span` chips.
- **Repo / compact card**: `.repo-card` — `6px` radius, `24px` padding, sage border on hover. Inside: `.repo-header` (title + `.lang-tag`), `.repo-desc`, `.repo-stats` pinned to bottom.

### Tags & badges
- `.badge` — small uppercase pill for hero-style labels (with optional `.wave` emoji animation).
- `.tag` — uppercase meta chip (date ranges, etc.).
- `.tech-tags span` — sage-tinted rounded chips for stack/skill lists. Keep them in `.tech-tags` flex containers.
- `.lang-tag` — language pill on repo cards. Add a new modifier (e.g. `.lang-tag.rust`) following the existing `rgba(R,G,B,0.1)` background + brand color pattern; don't invent your own scheme.

### Buttons
- Primary CTA: `.btn-primary` — charcoal background, white text, sage on hover.
- Quiet link button: `.btn-text` (underline-on-line) or `.link-clean` (sage-on-hover).
- Reset wrapper: `.btn-reset` removes default button chrome — use it whenever a `<button>` should look like a link.
- Floating action: `.fab-container > .fab-btn` (sage circle, dark on hover, with `.fab-tooltip`). One FAB per page max.

### Modals
- Reuse `css/modal.css` — `.modal`, `.modal-backdrop`, `.modal-content`, `.modal-header`, `.contact-list`, `.contact-item`. Toggle with the `.active` class. Don't build a second modal system.

## Motion

- Hover lifts: `transform: translateY(-2px)` + softened shadow. ~0.2s ease.
- Transitions: keep durations 0.2–0.3s. Avoid bouncy/spring easing.
- Existing keyframes worth reusing: `@keyframes wave` (greeting hand) in `style.css`, `@keyframes shake` in `pipeline_game.css`. Don't duplicate them.
- Respect that the design is calm — don't add parallax, large entrance animations, or decorative motion without asking.

## Accessibility & SEO defaults for new pages

When adding a new HTML page, mirror `index.html`:

- `<html lang="en">`, viewport meta, `<meta name="theme-color" content="#F5F5F0">`.
- Descriptive `<title>` (~60 chars, include the brand suffix `| dikacore.dev`) and `<meta name="description">` (~155 chars, keyword-rich but human).
- `<meta name="robots" content="index, follow, max-image-preview:large">` (or `noindex` if private).
- AI-crawler opt-in meta tags: `GPTBot`, `ChatGPT-User`, `ClaudeBot`, `anthropic-ai`, `PerplexityBot`, `Google-Extended`, `Applebot-Extended`, `CCBot` — all `index, follow`.
- Open Graph (`og:type`, `og:site_name=dikacore.dev`, `og:url`, `og:title`, `og:description`, `og:image` with absolute URL and `og:image:alt`/`width`/`height`) + Twitter Card (`summary_large_image`, `twitter:creator=@dikako`).
- `rel="canonical"` to the absolute page URL on `https://dikacore.dev/`.
- JSON-LD structured data: at minimum a `@type` matching the page (e.g. `Person`, `WebSite`, `ProfilePage`, `Game`, `Article`) and a `BreadcrumbList`. Reference the shared person node `@id: https://dikacore.dev/#person` when relevant.
- Same Google Fonts preconnect + stylesheet link, favicon link.
- Add the page to `sitemap.xml` (with `lastmod`) and ensure `robots.txt` doesn't disallow it.
- Update `llms.txt` if the page is something an AI assistant should know about.
- Use semantic landmarks (`<nav>`, `<main>`, `<section>` with `aria-labelledby`, `<article>`, `<footer>`). One `<h1>` per page.
- Mark decorative emoji/icons `aria-hidden="true"`; give buttons that open dialogs `aria-haspopup` + `aria-controls`.

## Files to consult for live examples

- `index.html` — canonical page structure, hero, sections, project cards, footer, FAB, modal trigger.
- `css/style.css` — all base tokens and core components.
- `css/modal.css` — modal pattern.
- `pipeline_game.html` + `css/pipeline_game.css` + `js/pipeline_game.js` — precedent for adding a sub-page that extends the design system with feature-specific tokens.
- `js/script.js` — interaction patterns (modal toggle, dynamic year/duration calc, GitHub repo fetch).

## Anti-patterns — do NOT

- Do not introduce Tailwind, Bootstrap, or any CSS framework. The site is hand-rolled CSS variables.
- Do not add JS frameworks (React/Vue/etc.) — vanilla JS only, like `js/script.js` and `js/pipeline_game.js`.
- Do not hardcode `#F5F5F0`, `#7D8C7A`, etc. — use the CSS variables.
- Do not introduce a new font family or new heading scale.
- Do not change the radius scale wildly. Existing radii: `4px` (small chips), `6px` (buttons, repo cards), `8px` (cards, contact items), `12px` (modal, game board), `20px`/`50%` (pills/FAB).
- Do not use emojis in code/comments unless the user asks. The 👋 in the hero badge is intentional content, not a pattern to copy elsewhere.
- Do not write multi-paragraph comments in the new CSS/HTML — match the terse, section-commented style of the existing files.
