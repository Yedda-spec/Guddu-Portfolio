# Portfolio Blueprint — Reusable Architecture Spec

> **Purpose of this file:** Give this whole file to Claude (or any coding agent) along with a new
> person's bio/photos/links, and say: *"Build a portfolio using this exact architecture, animation
> system, and layout — but with this person's content instead."* The goal is a pixel-and-motion
> twin of this site with a different identity, tools, and case-study content.
>
> **What must stay identical:** tech stack, file structure, animation logic/timing, scroll
> mechanics, component structure, typography choice, and the light-grid/grain visual language.
>
> **What is expected to change:** all copy, images/video URLs, social links, accent color (site
> uses sky-blue — swap for whatever suits the new person), and the exact number of craft items /
> testimonials / experience entries.

---

## 1. Tech Stack

- **React 19** + **Vite** (rolldown-vite, `vite@^8`) — no router, single-page scroll site.
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin (no `tailwind.config.js` needed — v4 is CSS-first).
- **Framer Motion** (`framer-motion@^13`) for every animation: entrance fades, scroll-linked
  transforms, `AnimatePresence` modals, spring-smoothed scroll, layout transitions.
- **oxlint** for linting. No TypeScript — plain `.jsx`.
- No backend, no CMS, no auth. All content lives in one JSON file (`src/data/profile.json`) and
  images are hosted externally (Cloudinary in the reference build) rather than bundled.
- Video/testimonial assets are hosted on **Google Drive** and embedded via a tiny helper that
  converts a Drive "share" link into an `/preview` iframe URL and a thumbnail URL.

### package.json (recreate exactly, only bump versions if newer ones are current)

```json
{
  "name": "tmp-scaffold",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "oxlint",
    "preview": "vite preview"
  },
  "dependencies": {
    "@tailwindcss/vite": "^4.3.3",
    "framer-motion": "^13.4.0",
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "tailwindcss": "^4.3.3"
  },
  "devDependencies": {
    "@types/react": "^19.2.18",
    "@types/react-dom": "^19.2.7",
    "@vitejs/plugin-react": "^6.1.1",
    "oxlint": "^1.81.0",
    "vite": "^8.3.0"
  }
}
```

### vite.config.js

```js
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

### index.html — fonts are load-bearing for the visual identity

Three Google Fonts drive the whole look: a serif display face for headings, a clean sans for body
copy, and a handwriting script for "personal note" accents (sticky-note checklist, testimonial
names, quote text, footer's rotating word).

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&family=Inter:wght@400;500&family=Caveat:wght@500;600;700&display=swap"
      rel="stylesheet"
    />
    <title>{{SITE_TITLE}}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

Font roles (keep these mappings for the new build):
- `font-serif` (Playfair Display, via Tailwind's default serif stack once Playfair is loaded first) → all big section headings ("Craft i'm proud of", "the journey so far", "what people say about me", footer "lets ___ incredible work together.", nav logo wordmark).
- `font-[Inter]` / default sans → body copy, nav links, buttons, bullet text.
- `'Caveat', cursive` (applied inline via `style={{ fontFamily: "'Caveat', cursive" }}`) → the italic first line of the About paragraph block styling context, sticky-note checklist text in Hero, testimonial person name + quote text, footer's rotating verb.

---

## 2. File Structure

```
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── favicon.svg
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── components/
│   │   ├── Nav.jsx
│   │   ├── Hero.jsx
│   │   ├── AboutCard.jsx
│   │   ├── CraftGallery.jsx
│   │   ├── Experience.jsx
│   │   ├── Testimonials.jsx
│   │   ├── Footer.jsx
│   │   └── FloatingWhatsapp.jsx
│   ├── data/
│   │   └── profile.json        <- the ONLY data file that matters; everything else is dead
│   └── lib/
│       └── drive.js            <- Google Drive link → embed/thumbnail URL helper
```

> **Do not recreate** a `companies.json` / `caseStudies.json` pair or a `public/assets/svg`
> / `public/assets/craft` folder of placeholder images — those existed in an earlier phase of the
> reference project and are now dead weight, imported nowhere. Everything the site renders comes
> out of `profile.json` plus remote image/video URLs.

---

## 3. Global Design System

### Color language
- Base palette is **black-on-white** (`bg-white text-black` on the root wrapper). No dark mode.
- One accent color runs through "Experience" and "Testimonials" section labels/dots/pills: **sky
  blue** (`sky-50` background wash, `sky-500`/`sky-600`/`sky-900` for accents). **This is the one
  thing you should swap per person** — pick an accent that fits their brand, and replace every
  `sky-*` Tailwind class consistently.
- Footer is a bold gradient block: `bg-gradient-to-b from-sky-300 via-sky-500 to-sky-600` with a
  looping background video and a soft blue gradient scrim on top, plus a giant faint
  `mix-blend-overlay` first-name watermark at the very bottom. Swap the base gradient colors to
  match the new accent; keep the mechanic (video bg + scrim + oversized name watermark).
- WhatsApp green (`#25D366`) is hardcoded for the floating CTA — keep as-is (it's WhatsApp's brand
  color, not a theme color), unless the new person doesn't use WhatsApp, in which case swap the
  whole floating-CTA component for their preferred contact channel using the same reveal/nudge
  mechanic.

### index.css — global utility classes (recreate verbatim, these are load-bearing for the visual style)

```css
@import "tailwindcss";

.hero-grid-bg {
  background-color: #ffffff;
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.06) 1px, transparent 1px);
  background-size: 48px 48px;
}

.grain-overlay {
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E");
  mix-blend-mode: overlay;
}
```

- `.hero-grid-bg` — a faint 48px graph-paper grid, **scoped only to the Hero section**. No other
  section gets this pattern.
- `.grain-overlay` — an SVG fractal-noise film-grain texture blended with `mix-blend-mode:
  overlay`, used over the full-bleed photo in the About section to keep it from looking like a flat
  stock photo.

### lib/drive.js — Google Drive embed helper (recreate verbatim)

```js
export function driveFileId(link) {
  const match = (link || "").match(/\/d\/([^/]+)/);
  return match ? match[1] : "";
}

export function driveEmbedUrl(link) {
  const id = driveFileId(link);
  return id ? `https://drive.google.com/file/d/${id}/preview` : link || "";
}

export function driveThumbnailUrl(link) {
  const id = driveFileId(link);
  return id ? `https://drive.google.com/thumbnail?id=${id}&sz=w1000` : "";
}
```

This lets the content owner just paste a normal "Anyone with the link" Google Drive share URL into
`profile.json` for any video (craft item, testimonial video, resume PDF) and the component
converts it into an embeddable iframe `src` or an `<img>` thumbnail — no manual video hosting/CDN
setup required. **Keep this pattern** if the new person also wants to self-serve video uploads via
Drive; if they'd rather use YouTube/Vimeo/direct MP4, swap this helper for an equivalent one but
preserve the same call sites (`driveEmbedUrl`, `driveThumbnailUrl`).

---

## 4. Data Contract — `src/data/profile.json`

This is the single source of truth. Every component imports named fields straight from this file
(`import { name, role, ... } from "../data/profile.json"`). To retarget the whole site at a new
person, you mostly just rewrite this file plus swap the accent color and a couple of hardcoded
strings (nav logo wordmark, footer video URL, WhatsApp nudge target).

```json
{
  "name": "{{Full Name}}",
  "role": "{{Primary Role / Title}}",
  "location": "{{City, Country}}",
  "openToWork": true,
  "experienceYears": "{{N}}",
  "bio": "{{2-3 sentence professional bio, used nowhere visible right now but kept as data — see note below}}",
  "avatar": "{{unused currently — safe to keep or drop}}",
  "heroTagline": "{{One punchy sentence headline for the Hero, e.g. 'A video editor building on stories. Crafting cuts, motion & moments.'}}",
  "heroImages": {
    "photo": "{{portrait photo URL}}",
    "cautionSign": "{{decorative sticker image URL}}",
    "computer": "{{decorative sticker image URL}}",
    "coffee": "{{decorative sticker image URL}}",
    "cabinet": "{{decorative sticker image URL}}",
    "nameTag": "{{decorative sticker image URL}}",
    "notepad": "{{decorative sticker image URL — has an overlaid handwritten checklist, see Hero.jsx}}",
    "welcomeMat": "{{decorative sticker image URL}}",
    "footerClouds": "{{currently unused — safe to keep or drop}}"
  },
  "email": "{{contact email}}",
  "phone": "{{contact phone, any format — digits get stripped programmatically for tel:/wa.me links}}",
  "instagram": "{{instagram handle, no @}}",
  "resumeLink": "{{Google Drive share link to resume/portfolio PDF}}",
  "externalLink": "{{their old/alternate site, currently unused in components}}",
  "tools": ["{{tool 1}}", "{{tool 2}}", "..."],
  "skills": ["{{skill 1}}", "{{skill 2}}", "..."],
  "education": [
    { "degree": "{{degree}}", "institution": "{{institution}}", "year": "{{year range}}" }
  ],
  "craftItems": [
    {
      "id": "{{slug}}",
      "title": "{{work title, e.g. client/brand name}}",
      "image": "{{poster/cover image URL, ideally portrait 3:4}}",
      "type": "video | pdf",
      "vertical": true,
      "link": "{{Google Drive share link to the video or PDF}}"
    }
  ],
  "testimonials": [
    {
      "id": "{{slug}}",
      "name": "{{person name}}",
      "role": "{{their role/title}}",
      "quote": "{{one-line pull quote}}",
      "link": "{{Google Drive share link to a vertical video testimonial, or omit/empty to show 'coming soon'}}"
    }
  ]
}
```

Notes on fields that exist in the JSON but aren't wired into any component yet (`bio`, `avatar`,
`tools`, `skills`, `education`, `externalLink`, `heroImages.footerClouds`): these were scaffolded
for a fuller "About/Resume" section that never got built out in the reference site. Keep them in
the JSON for future use, but don't block on filling them in — the live site doesn't render them.

`companies.json` and `caseStudies.json` (with empty-string placeholder schemas) exist in the
reference repo's `src/data/` folder but are **imported by nothing**. Do not recreate them.

---

## 5. Section-by-Section Breakdown

Layout order in `App.jsx` (recreate this exact order and section `id`s — Nav's anchor links and
the WhatsApp `IntersectionObserver` trigger depend on the `id="experience"` section existing):

```jsx
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import AboutCard from "./components/AboutCard";
import CraftGallery from "./components/CraftGallery";
import Experience from "./components/Experience";
import Testimonials from "./components/Testimonials";
import FloatingWhatsapp from "./components/FloatingWhatsapp";

export default function App() {
  return (
    <div className="bg-white text-black min-h-screen">
      <Nav />
      <FloatingWhatsapp />
      <section id="hero"><Hero /></section>
      <section id="about"><AboutCard /></section>
      <section id="craft"><CraftGallery /></section>
      <section id="experience"><Experience /></section>
      <section id="testimonials"><Testimonials /></section>
      <Footer />
    </div>
  );
}
```

### 5.1 Nav — sticky glass header

- `sticky top-0 z-50 border-b border-black/5 bg-white/70 backdrop-blur-md` — frosted-glass sticky
  bar.
- Logo is a hardcoded first-name wordmark in `font-serif text-2xl font-semibold`, linking to
  `#hero`. **Swap the text**, keep the styling.
- Desktop nav links come from a hardcoded array (not JSON) linking to section anchors plus one
  external link to the resume:
  ```js
  const links = [
    { href: "#about", label: "About" },
    { href: "#craft", label: "Craft" },
    { href: "#experience", label: "Experience" },
    { href: resumeLink, label: "Portfolio", external: true },
  ];
  ```
- Right-side quick actions: phone icon (`tel:` link), Instagram icon, and a solid black pill CTA
  button ("Let's talk") linking `mailto:`. All icons are hand-drawn inline SVGs (no icon library
  dependency) — recreate the same inline-SVG approach for whatever icons the new person needs
  rather than pulling in a package.
- Mobile: hamburger toggles an animated dropdown panel via `AnimatePresence` +
  `motion.div` animating `height`/`opacity` (`0.25s` duration) — a full-width menu with the same
  links plus phone/Instagram/email repeated as rows.

### 5.2 Hero — "sticker collage" desktop layout, stacked headline on mobile

This is the most distinctive section. Full viewport height (`h-[100vh] min-h-[820px]
md:min-h-[880px]`), `hero-grid-bg` background, and 8 absolutely-positioned "sticker" images
scattered across it at specific percentage coordinates and rotation angles — like a corkboard/desk
collage. Each sticker is rendered via a shared `Sticker` sub-component:

```jsx
function Sticker({ src, label, className, rotate = 0, fit = "contain", zoom = 1, grayscale = false, rounded = false, children }) {
  return (
    <div className={`absolute ${rounded ? "overflow-hidden rounded-[2rem]" : ""} ${className}`}
      style={{ transform: `rotate(${rotate}deg)`, boxShadow: rounded ? "0 2px 3px rgba(10,10,20,0.28), 0 20px 22px rgba(10,10,20,0.30), 0 55px 60px rgba(10,10,20,0.24)" : undefined }}>
      {src ? (
        <>
          <img src={src} alt={label} className={`w-full h-full object-${fit} ${grayscale ? "grayscale" : ""}`}
            style={{ filter: rounded ? undefined : softShadowFilter, ...(zoom !== 1 ? { transform: `scale(${zoom})` } : {}) }} />
          {children}
        </>
      ) : (
        <div className="w-full h-full min-h-16 rounded-lg border-2 border-dashed border-black/20 bg-black/[0.02] flex items-center justify-center">
          <span className="text-[10px] uppercase tracking-wide text-black/30 px-2 text-center">{label}</span>
        </div>
      )}
    </div>
  );
}
```

Key behavior to preserve:
- **Graceful placeholder state**: if a `heroImages.*` URL is an empty string, the sticker renders a
  dashed-border placeholder box labeled with the slot name instead of a broken image. This means
  you can scaffold the whole layout before final images exist.
- 7 plain image stickers positioned with absolute `left/top/width/height` percentages and individual
  `rotate` degrees (caution sign, photo, computer, coffee, cabinet, name tag, welcome mat) — all
  `hidden md:block` (desktop-only; the collage does not appear on mobile).
- 1 sticker (`notepad`) has a `children` overlay: a hand-drawn checklist ("Curious" ✓, "Learning new
  things" ✓, "Hired" ○) styled in the Caveat cursive font, positioned absolutely inside the sticker.
  Reuse this pattern for the new person but swap the 2-3 checklist words to whatever
  traits/status fits them.
- Photo sticker uses `rounded` variant (rounded-2xl corners, drop-shadow via `boxShadow` instead of
  the `drop-shadow()` CSS filter used on the flat stickers).
- Headline text block: positioned absolutely (`top-[44%] ... md:left-[66%]` — bottom-half on
  mobile, right-side on desktop), animates in with `motion.div` (`opacity 0→1, y 24→0`, `0.6s`).
  Contains: an eyebrow row with a location pill and a conditional "Open to Work" pill (both
  `rounded-full bg-black/5 border border-black/10`), a bold `heroTagline` as an `<h1>`
  (`text-3xl md:text-4xl font-extrabold`), and a caption line `{name} · {role} ·
  {experienceYears}+ years experience`.

For a new person with fewer/no "sticker" assets, it's fine to reduce the number of stickers, but
keep the placeholder-box fallback mechanic and the absolute-position collage feel — don't collapse
this into a plain flexbox hero, that would lose the site's signature look.

### 5.3 About — pinned full-bleed photo that zooms in as you scroll past it

A scrollytelling section: a `220vh`-tall wrapper containing a `sticky top-0 h-screen` inner frame.
As the user scrolls through the wrapper, a `useScroll({ target: wrapperRef, offset: ["start end",
"start start"] })` progress value drives two `useTransform`s on the pinned background image:
`scale` goes `0.85 → 1` and `borderRadius` goes `32px → 0px` — so the photo starts slightly
inset/rounded and "expands" to full-bleed by the time it's pinned edge-to-edge, rather than zooming
while the text is being read.

```jsx
const { scrollYProgress } = useScroll({ target: wrapperRef, offset: ["start end", "start start"] });
const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
const radius = useTransform(scrollYProgress, [0, 1], [32, 0]);
```

Over the photo: a `bg-gradient-to-b from-black/45 via-black/35 to-black/55` dark scrim (for text
legibility) + the `.grain-overlay` texture on top. Centered text block (`AboutText`) staggers in 4
paragraphs with `whileInView` (`opacity 0→1, y 40→0`, `0.2s` stagger delay per paragraph, `once:
true`, `amount: 0.6` viewport trigger). First paragraph is styled as a large italic serif pull-quote
(`font-[Playfair_Display] text-3xl italic ... md:text-5xl`); the rest are smaller sans body text at
`text-white/70`.

**Respects `prefers-reduced-motion`**: `useReducedMotion()` short-circuits to a static, non-pinned
version of the same visual (no scroll-linked scale/radius transform) — keep this accessibility
fallback in the rebuild.

Content to swap: the 4 `paragraphs` (currently a hardcoded array inside the component, not JSON —
you can either keep it hardcoded per-person or lift it into `profile.json` as an array), and the
`BG_IMAGE` URL constant.

### 5.4 CraftGallery — horizontal-scroll "poster wall" driven by vertical scroll

Section heading: `font-serif text-4xl md:text-7xl`, "Craft i'm proud of" style — a big serif
statement line, swap the wording per person's craft/discipline.

Mechanic: a tall wrapper (`height: 100vh + travel px`, where `travel` is computed from measured
track width) contains a `sticky top-0 h-screen` viewport. Inside, a flex row of poster cards
(`trackRef`) is translated horizontally via `x = useTransform(smoothProgress, [0, 1], [range.start,
-range.end])`, where `smoothProgress` is the section's vertical scroll progress passed through a
`useSpring` (stiffness 45, damping 20, mass 0.6) for inertia/smoothing. In effect: scrolling down
the page drags the poster row sideways, spring-damped, fully pinned to the viewport while it plays
out.

The `range` (how far to translate) is computed on mount/resize by measuring actual DOM rects — not
hardcoded — so it self-adjusts to however many `craftItems` exist and their actual widths:

```js
useEffect(() => {
  function measure() {
    const track = trackRef.current;
    const cards = track?.children;
    if (!track || !cards || !cards.length) return;
    const viewportWidth = window.innerWidth;
    const trackWidth = track.scrollWidth;
    const trackRect = track.getBoundingClientRect();
    const revealIndex = Math.min(2, cards.length - 1);
    const revealCard = cards[revealIndex].getBoundingClientRect();
    const revealMidpoint = revealCard.left - trackRect.left + revealCard.width / 2;
    const end = Math.max(trackWidth - viewportWidth, 0);
    const start = Math.max(viewportWidth - revealMidpoint, 0);
    setRange({ start, end });
  }
  measure();
  window.addEventListener("resize", measure);
  return () => window.removeEventListener("resize", measure);
}, []);
```

Each `PosterCard`:
- Responsive width via `calc()` so 1.6 cards show on mobile, 2.2 on `sm`, 4 on `md`.
- Slight alternating rotation per card (`rotations = [-2, 1.5, -1, 2, -1.5, 1, -2, 1.5]`, cycled by
  index) for a scattered-photos feel; `hover:-translate-y-1` lift on hover.
- Full-bleed `image` (poster art, portrait 3:4) as the card background.
- If a Drive `link` is present, an inset thumbnail (via `driveThumbnailUrl`) overlays the poster
  near the top, with a centered play-button glyph overlaid if `type === "video"` (for PDFs, no
  play button).
- Clicking a card opens an `AnimatePresence` modal (dark scrim, scale-in card) that embeds the
  Drive iframe (`driveEmbedUrl`) — sized differently per type: PDF gets a fixed portrait window,
  vertical video gets a 9:16 box, horizontal video gets a 16:9 `max-w-3xl` box. If there's no link
  yet, shows a "coming soon" placeholder message instead of an iframe — never a broken embed.

Keep this exact spring-scroll-scrub + measured-range mechanic; it's the single most complex/most
distinctive interaction in the site. Content to swap: the heading copy and the `craftItems` array
in `profile.json` (any number of items works, the measurement logic adapts).

### 5.5 Experience — horizontal zigzag timeline

Section header block (reused pattern across Experience/Testimonials): small uppercase eyebrow with
a colored diamond glyph (`◆`) + label, big serif `h2`, gray supporting paragraph — all centered,
`max-w-2xl`.

The timeline itself is a horizontally-scrollable CSS grid (`overflow-x-auto`), one column per
experience entry, 5 grid rows: `[card-slot-top] [connector] [dot-row-with-full-width-line]
[connector] [card-slot-bottom]`. Each entry alternates `position: "top" | "bottom"` — if `top`, the
full experience card renders in the top slot and a small date pill renders in the bottom slot (and
vice versa) — producing a zigzag alternating pattern along a persistent horizontal line with dots
per column. A full-width horizontal line (`h-px bg-neutral-300` spanning `gridColumn: 1 / -1`) sits
on the dot row.

`ExperienceCard`: white rounded-2xl card with a colored square "logo" glyph (single letter, custom
`logoClass` background color per employer), title/company, and a bulleted list where bold spans
(`**text**`) are parsed out of a markdown-ish string at render time via a tiny regex-split
`renderBold()` helper — this lets bullet copy be written naturally with `**bold**` markers in the
data instead of JSX.

Content to swap: the `experience` array (currently hardcoded in-component, not JSON — fine to keep
that way, or lift to `profile.json`), and the accent color (`sky-*` classes on eyebrow/dot border/
date-pill border) to match the new theme.

### 5.6 Testimonials — 2-column "photo + quote card" layout with paperclip detail

Same eyebrow/heading pattern as Experience. Two-column responsive grid (`md:grid-cols-2`), each
entry rendered side-by-side as: a small polaroid-style video thumbnail (rotated slightly per index,
`rotations = [-3, 2, -2, 3]`) with a decorative paperclip SVG clipped to its top-left corner, the
person's name in Caveat cursive beneath it, their role in small gray text — next to a large
rounded gray quote card with the pull-quote also set in Caveat cursive at `text-xl sm:text-2xl`.

The thumbnail is a muted, non-interactive (`pointer-events-none`, `tabIndex={-1}`) autoplaying
Drive iframe embed used purely as a preview loop; clicking the whole card opens the same
full-screen 9:16 `AnimatePresence` modal pattern as CraftGallery, with an interactive iframe. If no
`link`, shows "Video coming soon" text in the thumbnail and "Video for ... coming soon." in the
modal state — same graceful-placeholder philosophy as everywhere else in the site.

Content to swap: the `testimonials` array in `profile.json`, and the accent color to match the new
theme (keep it consistent with whatever you chose for Experience).

### 5.7 Footer — full-bleed gradient block with looping video and giant name watermark

- `bg-gradient-to-b from-sky-300 via-sky-500 to-sky-600` (swap to new accent gradient) with an
  absolutely-positioned autoplaying/looping/muted background `<video>` behind a soft blue-gradient
  scrim (`linear-gradient` with 4 alpha stops) for legibility.
- Big serif headline "lets **___** incredible work together." where the blank is an
  auto-cycling word (`rotatingWords = ["design", "build", "create"]`, advances every 2000ms via
  `setInterval`) animated with `AnimatePresence mode="popLayout"` + vertical slide (`y: 100% →
  0% → -100%`, cursive italic Caveat font, absolutely positioned inside a fixed-width/height
  overflow-hidden mask so it looks like a flipping placard). Swap the 3 words to whatever verbs fit
  the new person's craft.
- Below: two columns — Email (mailto link) and Social (row of circular white icon buttons: currently
  Instagram / WhatsApp / Resume, each an inline SVG, `wa.me` link built from stripped phone digits).
  Swap the specific socials/icons to whatever channels the new person uses, keep the circular
  white-pill-on-gradient treatment.
- Copyright line (`© {year} {name}`), then a giant (`clamp(5rem, 18vw, 14rem)`) uppercase serif
  first-name watermark at `text-white/25 mix-blend-overlay` — a huge faint wordmark stamped across
  the bottom edge. Swap to the new person's first name; keep the oversized-watermark treatment
  (this is a strong, repeatable footer signature worth preserving for any personal portfolio).

### 5.8 FloatingWhatsapp — reveal-on-scroll CTA bubble with periodic "nudge" animation

- Fixed bottom-right circular WhatsApp-green button, hidden until the visitor scrolls the
  `#experience` section into view (`IntersectionObserver`, `threshold: 0.15`, fires once via a
  `useRef` guard so it doesn't re-hide/re-show on scroll-back).
- Once visible, enters with a spring/scale pop (`AnimatePresence`, `scale 0.4→1`, slide in from the
  right `x: 40→0`).
- Every random 4-10 seconds it does a small "nudge" — a quick scale-pulse + wiggle-rotate keyframe
  sequence (`scale: [1, 1.15, 0.95, 1.05, 1]`, `rotate: [0, -8, 8, -4, 0]`, 0.6s) — to draw the eye
  without being obnoxious, then re-schedules the next nudge recursively via `setTimeout`.
- Links to `https://wa.me/{digits}` with digits stripped from `profile.json.phone`.

If the new person doesn't use WhatsApp, replace with their preferred single primary contact
channel (Telegram, Calendly, email) but **keep the exact reveal-on-scroll + periodic-nudge
mechanic** — it's a nice, non-generic touch worth carrying over.

---

## 6. Animation Philosophy Summary (for consistency across new sections)

If you need to add or adapt a section, match these conventions already established across the
site:

1. **Section entrance**: wrap the whole section in a `motion.div` with `initial={{ opacity: 0, y:
   24 }}`, `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true }}`, `transition={{
   duration: 0.6 }}`.
2. **Staggered text within a section**: same fade/rise pattern per child, with `delay: i * 0.2` (or
   similar) and `viewport={{ once: true, amount: 0.6 }}`.
3. **Modals**: `AnimatePresence` + backdrop `opacity 0→1` + content `scale 0.9→1, opacity 0→1`,
   click-outside-to-close via a scrim `onClick` with `e.stopPropagation()` on the inner card.
4. **Scroll-linked (scrubbed) animation**: `useScroll({ target: ref, offset: [...] })` →
   `useTransform` → optionally `useSpring` for inertia — used for the About pin-zoom and the Craft
   horizontal drag. Always pair with a `useReducedMotion()` static fallback for anything that pins
   the viewport (like About does).
5. **Micro-delight loops** (footer word-cycle, WhatsApp nudge): plain `setInterval`/`setTimeout`
   state machines combined with `AnimatePresence`/keyframe arrays, not scroll-linked.
6. Respect **placeholder-first data**: every image/video slot must render a labeled dashed
   placeholder or a "coming soon" message when the corresponding data field is empty, never a
   broken image or empty iframe. This lets you scaffold the full site with fake/missing assets and
   fill in real content incrementally.

---

## 7. Build Steps for a New Person's Portfolio

1. Scaffold: `npm create vite@latest <name> -- --template react`, then swap in the exact
   `package.json` deps above, install `@tailwindcss/vite` + `tailwindcss` + `framer-motion`, wire
   `vite.config.js` and `index.html` (fonts) as shown.
2. Recreate `src/index.css`, `src/lib/drive.js`, and the full `src/components/*` set verbatim
   (structure + animation), changing only the accent color (`sky-*` → new choice), the footer
   video/gradient colors if desired, hardcoded copy (nav wordmark, section headings, About
   paragraphs, Experience entries, footer rotating words/socials).
3. Gather the new person's content into `src/data/profile.json` following the schema in Section 4
   — this alone repoints almost the entire Hero, CraftGallery, and Testimonials sections.
4. Host any photos/video posters externally (Cloudinary, or any static host) rather than bundling
   them — keeps the repo small and matches the reference site's approach. Host actual
   video/testimonial/resume files on Google Drive with "Anyone with the link can view" sharing, and
   just paste the share URLs into `profile.json` — the `drive.js` helper handles the rest.
5. Run `npm run dev`, fill in Hero stickers first (placeholders make gaps obvious), then
   craftItems, then testimonials, then experience entries, then footer/contact details last.
6. Sanity-check on mobile width: Hero collapses to headline-only (no stickers), Nav collapses to
   hamburger, Craft gallery still horizontally scroll-scrubs at reduced card width, Testimonials
   stack to 1 column, Experience timeline scrolls horizontally with `overflow-x-auto`.
