# Yex Labs — visual assets

Every asset the site references now exists. There are no placeholder frames left
in the codebase; `AssetFrame` and the pending-asset registry have been deleted.

The derived rasters come from committed masters and deterministic generators —
re-running them reproduces the site outputs, so nothing here is a mystery blob.

The five imagery masters are AI-generated for this project with the Codex
built-in image_gen tool, not photographs of real businesses. They depict no real
business, person, brand or place. The masters in `public/art/generated/` are the
source of truth; the JPEGs in `public/art/` are derived outputs.

They are commissioned **bright and airy** to sit on the light canvas — see
[DESIGN.md](DESIGN.md). The hero is additionally composed with a **calm left
third**: measured, its left third carries 39% of the right's per-pixel gradient
and sits 3 levels darker, so the headline has a quiet plane to rest on instead
of fighting window glazing. A9 is a background region rather than a subject —
even light, no focal point, higher mean luma so it recedes behind type. An earlier low-key set was regenerated when the site
moved off its dark theme; a dark frame on a `#fbfbf8` page reads as a hole.

---

## Delivered

| ID | Asset | Path | Produced by |
|---|---|---|---|
| **A1** | Hero — bright shop counter, calm left third | `public/art/hero.jpg` | `npm run photos` — **currently unused**, the hero now renders a dithered wave field |
| **A2** | `Fig. 1` — six systems, no shared memory | `public/art/fig-1-isolated-systems.svg` | hand-authored |
| **A3** | `Fig. 2` — the company brain | `public/art/fig-2-company-brain.svg` | hand-authored |
| **A4** | Deployment — an engineer at work on site | `public/art/deployment.jpg` | `npm run photos` |
| **A5a** | Food service | `public/art/industry-a.jpg` | `npm run photos` |
| **A5b** | Clinics & salons | `public/art/industry-b.jpg` | `npm run photos` |
| **A5c** | Trades & workshops | `public/art/industry-c.jpg` | `npm run photos` |
| **A6** | Paper grain | `public/art/grain.png` | `npm run gen:grain` |
| **A7** | Logo mark + favicons | `public/art/mark.svg`, `app/icon.png`, `app/apple-icon.png`, `app/favicon.ico` | `npm run gen:icons` |
| **A8** | Open Graph card | `public/art/og.png` | `npm run gen:og` |
| **A9** | Section backdrop — calm interior, no focal point | `public/art/backdrop.jpg` | `npm run photos` |

`mark.svg` is the single source of truth for the logo geometry — both the icon
set and the OG card read it at run time. Changing the mark changes everything
downstream.

`scripts/fonts/*.ttf` (Lora, Geist Pixel — both OFL) are vendored for
build-time asset generation, because the OG card outlines its text with
`opentype.js` rather than relying on system font resolution.

---

## Generated imagery

All five imagery masters are AI-generated for this project with the Codex
built-in `image_gen` tool, not photographs of real businesses. They depict no
real business, person, brand or place. The masters in
`public/art/generated/` are the source of truth, and provenance is recorded in
`scripts/photo-sources.json` and surfaced in `CREDITS.md`.

```
npm run photos          crop + resize masters into public/art/
```

Swapping an image master means editing one entry in
`scripts/photo-sources.json` and re-running. No component changes.

---

## Still to do: the dither treatment

A coarse black-and-white dither reading as **printed ink, not a filtered
photo** remains an open option. It is deliberately a separate step, so that
swapping an image never means re-deriving the effect and changing the effect
never means regenerating images.

Worth re-deciding before committing to it. The treatment was specified when the
site was dark and the imagery needed rescuing; on the current light canvas with
bright, high-key photography it is a stylistic choice rather than a fix, and it
would work against the "bright and clear" register the design now targets.

`scripts/dither.mjs` is a working hand-written Atkinson implementation:

```
node scripts/dither.mjs --in <src> --out <dest> --width <n> --height <n> [--dot <n>] [--contrast <n>]
```

It is correct but naive: it diffuses error in sRGB space. Proper dithering
diffuses in **linear light**, which is exactly where the established libraries
earn their keep.

### Open-source options evaluated

| Project | Stars | Licence | Notes |
|---|---|---|---|
| [makew0rld/didder](https://github.com/makew0rld/didder) | 519 | GPL-3.0 | CLI. Strongest option — correct linear-light handling, Atkinson / Burkes / Floyd-Steinberg / ordered Bayer, serpentine scanning, custom palettes. Ships prebuilt macOS, Linux and Windows binaries, so no Go toolchain is needed. Using a GPL tool to process images does not affect the licence of the output. |
| [makew0rld/dither](https://github.com/makew0rld/dither) | 463 | MPL-2.0 | The Go library behind didder. Use if embedding rather than shelling out. |
| [esimov/dithergo](https://github.com/esimov/dithergo) | 171 | MIT | Go, permissive, several algorithms. Lighter than didder, fewer controls. |
| [andrewstephens75/as-dithered-image](https://github.com/andrewstephens75/as-dithered-image) | 250 | MIT | **Runtime** custom element that dithers client-side at true device-pixel resolution — dots stay 1:1 crisp at any DPI, which a baked raster cannot guarantee. Costs JS and risks a flash before hydration. |
| [niccolofanton/dithering-shader](https://github.com/niccolofanton/dithering-shader) | 272 | MIT | Real-time Bayer dithering as a WebGL post-process. Overkill unless the hero becomes a live 3D scene. |

Avoided: `noopkat/floyd-steinberg` and `Boring-Software-Inc/dither-kit` (no
licence file), and `Tezumie/Image-to-Pixel` (unclear licence). Unlicensed code
is not safe to use in a commercial project.

### Recommendation

If the dither goes ahead, bake it at build time with **didder**, keeping the
current colour files as its input. Baked output costs no JS, works without it,
caches well, and the art direction is fixed so there is nothing to compute per
viewer.

This has **not** been installed — it means downloading a prebuilt binary from
GitHub releases, which is the owner's decision, not the pipeline's.
