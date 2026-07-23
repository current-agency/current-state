# Current — Design System

**Current** (currentagency.com) is a full-stack digital agency that combines ongoing experience optimization with lifecycle marketing. Current is part of the Code and Theory Network, a digital-first collective. The brand archetype is "The Clever Consultant" — bringing expertise with humility and turning serious work into a thoughtful, enjoyable experience.

This design system encodes the visual + verbal foundations from Current's official Brand Guidelines (v1.0, January 2026) into reusable tokens, assets, and HTML components.

---

## Sources

- **Brand Guidelines PDF** — `uploads/CUR_Brand Guidelines.pdf` (56 pages). Plain-text extraction at `uploads/_brand-guidelines.txt`.
- **Figma file** — `CUR_Brand System Foundations.fig`, mounted as a virtual filesystem.
  - `/Foundations/Logo`, `/Foundations/Typography`, `/Foundations/Current-Brand-Color-Hex`, `/Foundations/Icons`, `/Foundations/Patterns`, `/Foundations/Textures` — primary token definitions.
  - `/Photography` — photo treatment + stock photography direction.
  - `/Current-Slides` — 60 slide frames demonstrating real-world deck application.
  - `/Cover` — title slide.
- **Uploaded raw assets** — fonts (Aeonik OTF + Aeonik Fono OTF), 3 logo variants in 3 colors each, 10 bitmap icons, 15 line icons, 9 brand patterns, 8 textures (Array, Drift, Fade, Haze, Mesh, Pulse, Shear, Swell). All copied into `assets/` and `fonts/`.

---

## Index

| File / folder | What's in it |
| --- | --- |
| `README.md` | This file. Brand context, content + visual foundations, iconography. |
| `SKILL.md` | Cross-compatible Agent Skill manifest. |
| `colors_and_type.css` | All colors, type, spacing, radii, motion tokens as CSS custom properties + utility classes. |
| `fonts/` | Aeonik & Aeonik Fono OTFs (Regular + Bold). |
| `assets/logo/` | Logotype + logomark, in black, blue, white. |
| `assets/icons/bitmap/` | 10 bitmap-style icons (8-bit/pixel signature). |
| `assets/icons/line/` | 15 line-style icons (strategic narrative slides). |
| `assets/patterns/` | 9 brand patterns (geometric — overlay/tile). |
| `assets/textures/` | 8 gradient textures (Array, Drift, Fade, Haze, Mesh, Pulse, Shear, Swell). |
| `preview/` | Cards rendered in the Design System tab. |
| `slides/` | HTML deck templates: title, agenda, big quote, comparison, etc. |
| `ui_kits/` | Higher-level recreations of marketing surfaces. |

---

## Brand Archetype & Drives

**The Clever Consultant.** Current is *Intelligent, Witty, Approachable, Empathetic*.

**Drives:** Helping clients succeed when the path isn't clear. Delivering high-quality work with thoughtful insight. Engaging creatively to elevate the client experience.

**Fears:** Being seen as too rigid, corporate, or impersonal. Overpromising what can't be delivered.

**Core values:** Curiosity (powered by questions), Partnership (collaboration powers progress), Humility (ideas over egos), Ownership (accountable, deliver with integrity).

---

## CONTENT FUNDAMENTALS

**Voice.** Confident but never corporate. Current writes the way a clever consultant talks — short, plain-spoken sentences with the occasional pithy turn. The voice is *intelligent, witty, approachable, empathetic*. Avoid jargon, sales-deck superlatives, and exclamation marks.

**Person & address.** First-person plural — *we, our, us* — when speaking as the agency. Second-person *you / your* when speaking to the client. Never *I*. The "we" is collective and warm: "We're powered by curiosity," "we ask questions, follow ideas wherever they lead."

**Casing.** Sentence case for every headline, title, and section header. Title Case is reserved for proper nouns and the names of palette colors (Current, Node, Static, Flow, Depth, Signal). Eyebrows use mono in ALL CAPS with 6% letter-spacing — this is the *only* place ALL CAPS appears.

**Sentence rhythm.** Short → short → longer. Lists of three are common ("Create. Optimize. Amplify.", "Curiosity, Partnership, Ownership"). Sentence fragments are allowed when punchy ("Built to Grow.", "Energy never stands still.").

**Punctuation.**
- Periods at the end of standalone words/fragments in marketing lockups: "create. optimize. Amplify." (note: the deck samples mix lowercase + Title-cased final word — both appear).
- Em dashes for asides, never hyphens used as dashes.
- Smart quotes only.
- Avoid exclamation marks except in genuinely warm, casual contexts (internal docs).

**Numerals & metrics.** Numbers ≥10 in figures (98%, 204K). Stats are paired with a one-line label in mono ("204K — Lorem ipsum dolor"). Use the mono (Aeonik Fono) family for any number, percentage, or data point that should read as evidence.

**Emoji.** Almost never in customer-facing copy. The only emoji that appears in the Foundations is 🎨 — used inside internal section-header banners as a wink, never on real client work.

**Tone examples drawn directly from the brand:**
- *"We create, maintain and optimize digital experiences that ensure our clients stay current in an ever-changing world."* — mission-style.
- *"We're naturally curious, we ask questions, follow ideas wherever they lead and love rethinking how things are done. We keep our egos in check and show up ready to learn, together."* — about-us paragraph.
- *"Energy never stands still."* — campaign tagline.
- *"Built to Grow."* — sub-tagline / merch line.
- *"create. optimize. Amplify."* — three-beat positioning.
- *"Grab attention — and hold it."* — headline lockup pattern.

**Do not write like.** Generic agency-speak ("We are passionate about..."), buzzword stacks ("synergy / disruption / next-gen"), or anything that sounds like it came from a stock LinkedIn post. Anything that overpromises a solution Current can't deliver violates the brand fears list and should be reworked.

---

## VISUAL FOUNDATIONS

### Colors
Current's palette is built around three primaries and three accents, with a tight expanded scale of tints/shades. Hex values come straight from the Foundations Figma frames.

| Token | Name | Hex | Role |
| --- | --- | --- | --- |
| `--cur-current` | **Current** | `#0100FE` | Brand blue. The defining color. Buttons, links, full-bleed hero panels, brand-statement backdrops. |
| `--cur-node` | **Node** | `#2C2C2C` | Primary text + dark canvas. Near-black with warmth. |
| `--cur-static` | **Static** | `#E7E8E3` | Off-white canvas / hairline rules. |
| `--cur-flow` | **Flow** | `#9FDFFE` | Pale sky-blue accent. Highlights, callouts on dark. |
| `--cur-depth` | **Depth** | `#035C4B` | Deep teal-green. Secondary surface for serious moments. |
| `--cur-signal` | **Signal** | `#A9FF92` | Neon lime. Sparingly for stat callouts and energy moments. |

Plus the expanded set: `--cur-current-deep #01008E`, `--cur-current-bright #00A4F5`, `--cur-depth-bright #077C66`, `--cur-depth-deep #01352B`, `--cur-node-mid #5C5C5C`, `--cur-static-stone #C1C2BB`, `--cur-static-bright #FBFCF9`, `--cur-signal-pale #E4FFDD`, `--cur-signal-deep #4DE723`.

**Pairings.** AA-compliant pairings in the guidelines: Current Blue + Static, Current Blue + Flow, Node + Static, Depth + Signal, Depth + Static. Avoid Signal on Static (insufficient contrast); avoid Flow on white.

### Typography
Two families do all the work:
- **Aeonik** (sans, Regular + Bold) — display, headlines, titles, body.
- **Aeonik Fono** (mono, Regular + Bold) — eyebrows, details, captions, numbers/stats.

The pairing creates intentional contrast: warm geometric sans next to crisp grid mono. Helvetica Neue is the approved system fallback.

**Scale (desktop):** Display 130/100 · H1 64 · H2 56 · H3 36 · Title 40/32/24 · Body 20/18/14 · Eyebrow 20/16 (mono, ALL CAPS, 6% tracking) · Details 20/16 (mono).

Display + heading lockups crunch their leading to ~95–100% with -2% tracking — the type sets dense and confident, never airy.

### Spacing & layout
- 8pt grid throughout. Common gaps: 8, 12, 16, 24, 32, 48, 64, 80, 120.
- Section sides on full-width compositions: 80–100px margin, 80px internal padding.
- Foundation header banners use a 10px radius and 80px padding.
- Slide canvases are 1920×1080 with substantial padded margins (100–170px).

### Backgrounds
Three modes: **Static (off-white)** for documents and product UI; **Current Blue (full-bleed)** for hero/brand statements with Flow or Static type on top; **Node (dark)** for serious / data-dense moments. Photo treatments are 8-bit pixelated portraits — a deliberate signal of engineering expertise. The eight gradient *textures* (Array, Drift, Fade, Haze, Mesh, Pulse, Shear, Swell) are duotone, slightly nostalgic, and used as deck backgrounds — never as accent shapes inside a layout.

### Patterns
9 geometric **brand patterns** that can be cropped, flipped, rotated, and tiled. Used as decorative overlays on backgrounds (often Current Blue) — never as content.

### Animation
Subtle and purposeful. Common easing curves: `cubic-bezier(0.2, 0.6, 0.2, 1)` and `cubic-bezier(0.16, 1, 0.3, 1)`. Durations 140 / 220 / 420 ms. The brand explicitly forbids logo distortion and flashy effects (rotation, drop-shadow on the logo, off-brand effects). Motion is fades, slides, soft scale (95% → 100%) — never bounce or spring.

### Hover & press
- Hover: link/button shifts to `--cur-current-deep` (#01008E) on Current Blue elements; subtle 4–6% darken on neutrals; underline thickens 1 → 2px on text links.
- Press: scale(0.98) + 8% darker. No glow, no inset shadows.
- Focus: 2px outline in Current Blue offset 2px (or Flow on dark surfaces).

### Borders, dividers, shadows
- Hairline dividers: 1px `rgba(231, 232, 227, 0.3–1.0)` (token: `--cur-line`, `--cur-line-strong`).
- Cards rounded at 6px (chips/swatches) or 10px (banners/tiles); never more than 16px.
- Shadow system is gentle: `0 8px 18px rgba(0,0,0,0.07)` on cards, `0 12px 32px rgba(0,0,0,0.12)` for popovers. Avoid large/blurry "AI gradient" shadows.

### Transparency & blur
Used sparingly. Hairline dividers use 30% alpha. Body copy on photo backgrounds gets a gentle gradient mask if needed for legibility — no glassmorphism.

### Imagery vibe
Photography is one of three flavors: **portraits** (natural light, candid, engineering culture), **lifestyle** (people in motion, real environments), **textures** (the duotone gradient set). Photo treatments use an **8-bit pixelation** as a deliberate craft signature. Color of imagery skews warm-neutral — never desaturated or hyper-saturated.

### Corner radii system
- Swatches, chips, small tiles → 6px
- Cards, banners, hero blocks → 10px
- Modals, large panels → 16px (rare)
- Pills (tags, eyebrow chips) → 999px

### Cards
The canonical card is: white surface, 10px radius, 8/18/0.07 shadow, 1px hairline border in `--cur-line-strong`, 24–32px internal padding. Use Current Blue cards for emphasis; use Node-dark cards for "serious" data moments.

### Layout rules
- Logo always sits in a corner with adequate clear space (= height of the "t" in the logotype, or height of "u" in the mark).
- Eyebrow + Title + Body is the canonical content stack: 20px mono eyebrow → 56–64px sans headline → 18–20px body, separated by 24/16px.
- Three-beat horizontal compositions ("create. / optimize. / Amplify.") read top-to-bottom on mobile.

---

## ICONOGRAPHY

Current ships **two complete in-house icon sets** plus a system of patterns and textures. No icon font; no Lucide/Heroicons substitution needed. Always pull from `assets/icons/`.

### Bitmap icons — `assets/icons/bitmap/` (10 SVGs)
Pixelated, 8-bit-style symbols. Per the guidelines: *"To use in high-level conceptual narratives and slides."* These are the brand's signature look — they reinforce the photo treatment (which is also pixelated). Use them at 64–160px so the pixel grid reads. Render in `--cur-current` (#0100FE) or white on Current Blue, never in arbitrary colors. Files: `bitmap-icon-01.svg` … `bitmap-icon-10.svg`.

### Line icons — `assets/icons/line/` (15 SVGs)
Clean geometric strokes — use in *"strategic narratives and slides."* Stroke weight is consistent across the set; colors should be `--cur-node`, `--cur-current`, or white. Sit them at 24–48px in body contexts, 80–120px when hero. Files: `line-icon-01.svg` … `line-icon-15.svg`.

### Patterns — `assets/patterns/` (9 SVGs)
Geometric tile-able overlays. Mostly used on Current Blue or Node backgrounds for movement and texture. Files: `pattern-1.svg` … `pattern-9.svg`. The Foundations note: *"can be cropped, flipped, rotated and/or tiled to create various seamless effects and motions."*

### Textures — `assets/textures/` (8 SVGs)
The named gradient series: **Array, Drift, Fade, Haze, Mesh, Pulse, Shear, Swell.** Duotone, slightly nostalgic. Used full-bleed as deck backgrounds. New gradient additions must "match our color palette and feature movement with a duotone and nostalgic vibe."

### Logos — `assets/logo/` (6 SVGs)
- `logotype-{black,blue,white}.svg` — the full logo lockup. Default for everything.
- `logomark-{black,blue,white}.svg` — secondary mark for tight social/avatar contexts only.

**Hard rules** (from the guidelines): never distort the logo; never use off-brand colors; never modify/animate (animations are explicitly exempted but only the approved ones); never rotate; never add shadows or off-brand effects.

### Emoji & unicode
Avoided in production / customer-facing surfaces. The 🎨 emoji used in internal Foundations banners is a one-off internal wink. Don't ship it.

---

## Caveats / TODO

- Aeonik & Aeonik Fono OTFs are bundled. Confirm Current has the licensed weights for web; the OTFs supplied are sufficient for design tooling but the full Aeonik Pro family (Light, Medium, etc) is referenced in the deck — request additional weights if needed.
- Photography — no actual photo files were uploaded. Examples in the kit use neutral placeholder swatches with a pixelation note; supply real treated portraits to fully exercise the system.
- The slide decks reference fonts (Resist Sans, Poppins, Helvetica Neue) that appear to be incidental copy-paste artifacts inside Figma — they're not part of the official type system. We model only Aeonik + Aeonik Fono.
