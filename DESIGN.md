# Yex Labs — design system

Light throughout. Warm paper canvas, serif display, monospace labels, and
exactly one saturated panel per page. Nothing here is near-black except type
and the primary button.

---

## Where this came from

The reference is [cofounder.co](https://cofounder.co). What follows is measured
off the live site, not eyeballed — the numbers are from computed styles.

### What cofounder actually does

**Type.** H1 46px / weight 400. H2 40px / 400. H3 36px / 400 with **+0.32px**
tracking. Body 15px / **weight 460** / +0.15px. Micro-label 11px with
**+1.32px** tracking, uppercase.

Two things matter here. Nothing is ever bold — the heaviest thing on the page is
a 460 body weight, and headings are *lighter* than the text under them. And
display tracking is **positive**, not the negative tracking most tech sites
reach for. The result reads calm rather than urgent.

**Hierarchy is alpha, not a palette.** One ink colour at three opacities:
headings solid `#171717`, body `rgba(38,35,35,0.7)`, muted `0.5`. There is no
separate "grey-500". This is why a page that is 95% off-white never goes muddy —
every text tone is the same pigment, just thinner.

**Two-tone headlines.** A sentence opens solid and its continuation drops to
muted, inside the same heading. This is where hierarchy comes from on a light
page, in place of weight or a second typeface. It is the single most
transferable move on the site.

**Decimal chapter numbering.** `1.0 — LAUNCH`, then `1.1`, `1.2`, `1.3` as rows
beneath it. The page reads as a manual with chapters rather than a feature list.

**Layout.** The page shell is `max-w-[1440px]` with 20px gutters; inner content
blocks sit at ~720px (hero copy) and ~1052px (sections). Left-aligned section
headline over a left-copy / right-diagram split. Under each diagram, a
three-column row of short notes with a bold lead-in and an em dash. Cards are
white with hairline borders and small radii.

**The hero is full-bleed media with overlaid copy** — not type on paper with a
picture beneath. Getting this backwards changes the whole character of the first
screen.

**One saturated section.** Everything is off-white except a single blue panel
that arrives once, carries the "what you get" message, and leaves. Colour is
punctuation, not decoration.

### What we take, and what we don't

Taken: the light canvas, alpha-based hierarchy, two-tone headlines, decimal
chapters, the single saturated panel, generous air, hairline cards.

Not taken: their sans display face and pixel-art illustration. Yex Labs keeps
the Lora serif display and documentary photography — that is our register, and
copying theirs wholesale would make us a clone rather than a peer.

---

## Tokens

### Surfaces

| Token | Value | Use |
|---|---|---|
| `--paper` | `#fbfbf8` | Page canvas |
| `--paper-warm` | `#f5f5f2` | Alternating section bands |
| `--paper-card` | `#ffffff` | Cards and plates |
| `--accent-surface` | `#0b6f9e` | The one saturated panel, once per page |

### Text — one ink, stepped by contrast

The steps are set by measured contrast against `--paper`, not by eye.

| Token | Value | Contrast | Use |
|---|---|---|---|
| `--text` | `#171717` | 17:1 | Headings, solid |
| `--text-soft` | `rgba(38,35,35,0.72)` | 5.96:1 | Body copy |
| `--text-muted` | `rgba(38,35,35,0.64)` | 4.57:1 | Secondary copy, two-tone headline tail |
| `--text-faint` | `rgba(38,35,35,0.62)` | 4.31:1 | 11px mono labels, captions |

On the accent panel these invert to `--on-accent` at 1 / 0.75 / 0.5.

**This was got wrong once, and it is worth recording.** Copying cofounder's
alpha values directly — muted `0.5`, faint `0.35` — measured **3.08:1** and
**2.09:1** on our paper. The muted half of the hero headline visibly dropped
out, and every small mono label was failing AA. Alpha hierarchy is only safe
when each step is checked against the surface it lands on; a value that looks
right in a screenshot of someone else's site can be well under the threshold on
yours. Re-derive these if the canvas colour ever changes.

### Accent

`--signal #41a1cf` is decorative — borders, rules, tick marks. `--signal-deep
#0b6f9e` is the accessible text step and the accent surface. The **filled button
is never accent-coloured** — it is `--button-solid #171717`, because a chromatic
fill would compete with the saturated panel for attention.

### Type

Display is Lora at weight 400, tracking `-0.012em`. Body is Inter Tight at
weight 450, tracking `+0.01em`, line-height 1.5. Labels are JetBrains Mono at
11px, uppercase, `0.12em` tracking, `--text-faint`.

Display scale: `clamp(40px, 5vw, 64px)` / h2 `clamp(30px, 3.2vw, 44px)` / h3
`clamp(21px, 1.9vw, 29px)`.

### Shape

Radius ladder: **8** buttons · **12** cards · **16** plates · **24** large
surfaces · pill for nav and chips. Never mix 4px and 24px on one surface.
Hairlines and fills carry structure; shadows are used only on glass.

Container is **1120px**. Sections `clamp(64px, 6.5vw, 104px)`.

---

## Rules

- **Headings are never heavier than 400.** Size and the serif do the work.
- **Hierarchy is alpha on one ink**, never a second grey.
- **One saturated panel per page.** If a second one appears, one of them is wrong.
- **The filled button is near-black**, not accent-coloured.
- **Monospace is the label voice** — 11px, uppercase, wide tracking, faint.
- **Two-tone headlines** wherever a headline runs to a second clause.
- **No near-black surfaces.** The page is paper from top to bottom.

---

## Components

**Floating nav pill.** Light glass, weightless at the top of the page, firming
up on scroll. Serif wordmark and a live local clock on the left, mono links,
outlined action on the right. One rule on every route — no colour flip.

**Glass.** Three layers: a blurred translucent fill, a specular sheen raked at
155°, and a lit rim along the top edge that reads as the thickness of the pane.
Used only where something sits behind it worth blurring — the nav, and panels on
the accent surface. Over flat paper a blur reads as nothing, so paper cards use
fill plus hairline instead.

**Atmospheric card.** The accent panel, inset at 24px radius with `clamp(34px,
5vw, 88px)` of internal padding, so the colour arrives as a framed object rather
than a full-bleed band.

**Hero.** Full-bleed. A dithered wave field fills the section edge to edge, the
copy rides in an overlay above it, and the header sits transparent on top.

The field is a WebGL fragment shader — Perlin noise into fbm into a wave
pattern, then an 8x8 Bayer ordered dither — rendered on one full-screen
triangle in `app/components/DitherField.tsx`. The GLSL is ported from the React
Bits `Dither` background (MIT + Commons Clause); the runtime around it is ours.

It is a port rather than an install, for two reasons worth keeping:

1. **It does not work as shipped.** `@react-three/fiber` v8 reaches into
   `React.__SECRET_INTERNALS…ReactCurrentOwner`. Next 15 vendors its own React
   at `next/dist/compiled/react` and aliases the app-router client bundle to
   it, and that copy does not expose the field. The page throws on mount. The
   alternative was upgrading the whole app to React 19 for a background.
2. **It costs 672 kB raw / 166 kB gzipped** in three, postprocessing and
   react-three-fiber. Total client JS went 765 kB -> 1630 kB. The port is a few
   kB and renders identically.

Two changes were needed to make the shader run under a plain WebGL1 context:
the two upstream passes (waves to a buffer, dither as postprocess) are fused
into one, and the `const float[64]` Bayer table is built recursively instead.
GLSL ES 1.00 forbids indexing an array with a non-constant expression —
`'[]' : array index expression can only contain const or loop symbols` — which
three sidesteps by compiling as GLSL ES 3.00 under WebGL2.

The field fails quiet: no WebGL, or a shader that will not compile, leaves the
canvas blank and the paper background shows. It is decorative and must never
take the page down. In development it logs the reason. This is how cofounder builds theirs — their artwork is a `<video>` set
`absolute right-0 top-0 h-full object-cover object-right`, with the copy in an
`absolute inset-0` layer and a transparent `fixed` header at z-201.

One deliberate divergence. Their headline is white — it works because their
artwork is a mid-tone blue sky. Ours is a high-key daylit interior with white
walls, so white type would vanish. The copy stays near-black and a paper scrim
rakes in from the left.

**The scrim must hold across the whole copy column, not taper through it.** The
copy runs to about 65% of the width. It took two rounds to get right, and the
second one is the instructive failure:

1. The curve was down to α 0.18 by the end of the headline, putting the muted
   clause at **2.55:1** over a 177-luma photograph.
2. The hero was then reshot with a calmer, deeper left third. That helped the
   solid type but **hurt the muted grey** — contrast fell to **3.30:1**.
   Mid-grey text over a mid-tone ground is the worst case, because the text
   sits between the extremes instead of against one. Darkening a background is
   only a win for type at one end of the scale.
3. The scrim now holds 0.92 → 0.82 across the whole copy column and releases
   after it, which is affordable precisely because the left third is calm —
   there is no detail there worth revealing.

Measured at 1440px: headline start **15.93:1**, mid **4.30:1**, tail
**3.81:1**, lead **5.68:1**.

The hero frame itself is composed for this: its left third carries 39% of the
right's per-pixel gradient and sits 3 levels darker. Type gets a plane, and the
subject keeps the light.

Anything that changes the hero image, the scrim, or the muted tone invalidates
those numbers — re-measure by sampling the rendered pixels, not by eye.

If we ever want the white-on-image treatment exactly, the hero frame has to be
commissioned with a mid-tone region on the left to sit type on. That is an image
direction decision, not a CSS one.

**Figures.** `Fig. 1` and `Fig. 2` are one argument in two frames — the same six
system boxes at byte-identical coordinates, unconnected and then wired to a
central brain. If either file's geometry changes, both must change.

Both are animated, and the motion *is* the argument rather than decoration:

- **Fig. 1** gives each box an activity light on its own interval — 3.7s, 4.3s,
  5.1s, 4.7s, 6.1s, 5.3s. The durations are mutually incommensurate and start
  mid-cycle on negative delays, so the six never fall into step. Six systems
  recording, none of them coordinated. That is the section's claim.
- **Fig. 2** sends a pulse inward along every connector, and three rings
  accelerate outward from the centre like a portal opening. `pathLength="100"`
  normalises all six lines so one dash pattern drives connectors of six
  different lengths.

  The easing is the effect: `cubic-bezier(0.16, 0.8, 0.3, 1)` leaves slowly and
  then runs away, which reads as acceleration rather than a uniform ripple. A
  linear ring is a pond; an eased one is a portal.

  `transform-box: fill-box` is required on anything scaled here. SVG otherwise
  resolves `transform-origin` against the viewBox corner and the rings fly off
  toward the top left.

  **The brain is the one filled object in the figure**, and that is deliberate.
  It was first drawn as a `#41a1cf` outline on the `#0b6f9e` ground — signal
  blue on blue — which made the core of the argument the faintest thing in the
  frame while six satellite boxes popped in white. Everything else is a white
  outline; the brain is a solid white plate with its label inverted into the
  surface blue. It is the only inverted type in the figure, and that is what
  makes the centre read as the subject.

Animation lives in a `<style>` block inside each SVG. These load through
`next/image` as `<img>`, which runs declarative CSS animation but blocks
scripts, so the `prefers-reduced-motion` guard has to be written inside each
file — the page stylesheet cannot reach in.

**Section backdrop.** Where a column runs out before its neighbour does, a
washed-back image gives the space a ground rather than leaving it dead. Held at
0.14 opacity under a feathered veil, which measures out to an effective
background near paper, so body copy stays above 5:1. Atmosphere must not cost
legibility.

---

## Imagery

Documentary photography, bright and airy, desaturated and cool-neutral. Real
rooms with the evidence of daily work in them. People appear mid-task and never
posing. No legible signage, logos or brand marks in any frame.

Assets, provenance and the generation pipeline are documented in
[ASSETS.md](ASSETS.md); credits in [CREDITS.md](CREDITS.md).
