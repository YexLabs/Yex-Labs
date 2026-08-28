/**
 * Build the generated image masters into the site's JPEG assets.
 *
 * For each entry in scripts/photo-sources.json, this reads the local PNG
 * master, honours its orientation, crops and resizes it to the declared output
 * size, writes a quality-86 mozjpeg, and regenerates CREDITS.md from the same
 * manifest. The masters in public/art/generated/ are the source files; this
 * script has no network step.
 */

import { readFile, mkdir, writeFile, access, stat } from "node:fs/promises"
import path from "node:path"
import sharp from "sharp"

const SOURCES = "scripts/photo-sources.json"

async function loadManifest() {
  try {
    const raw = await readFile(SOURCES, "utf8")
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed.photos) || parsed.photos.length === 0) {
      throw new Error("`photos` must be a non-empty array")
    }
    if (!parsed.provenance || typeof parsed.provenance.statement !== "string") {
      throw new Error("`provenance.statement` must be present")
    }
    return parsed
  } catch (error) {
    throw new Error(`Cannot read ${SOURCES}: ${error.message}`)
  }
}

async function assertSource(photo) {
  try {
    await access(photo.src)
  } catch {
    throw new Error(`${photo.id}: source missing at ${photo.src}`)
  }
}

async function buildOne(photo) {
  await assertSource(photo)

  await mkdir(path.dirname(photo.out), { recursive: true })

  await sharp(photo.src)
    .rotate()
    .resize(photo.width, photo.height, { fit: "cover", position: "attention" })
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(photo.out)

  /* metadata() does not report file size for a path input — stat it. */
  const { size } = await stat(photo.out)
  console.log(
    `  ${photo.id}  ${photo.out}  ${photo.width}x${photo.height}  ${Math.round(size / 1024)}kB`
  )
}

async function buildAll(photos) {
  console.log(`Building ${photos.length} assets`)
  for (const photo of photos) {
    await buildOne(photo)
  }
}

async function writeCredits(photos, provenance) {
  const rows = photos
    .map(
      (p) =>
        `| \`${p.id}\` | \`${p.out}\` | ${p.subject} |`
    )
    .join("\n")

  const body = `# Image credits

${provenance.statement}

| Asset | Output | Subject |
|---|---|---|
${rows}

Regenerate with \`npm run photos\`. The source manifest is
\`scripts/photo-sources.json\`.
`

  await writeFile("CREDITS.md", body)
  console.log("  wrote CREDITS.md")
}

async function main() {
  const { photos, provenance } = await loadManifest()
  await buildAll(photos)
  await writeCredits(photos, provenance)
}

main().catch((error) => {
  console.error(`Photo pipeline failed: ${error.message}`)
  process.exit(1)
})
