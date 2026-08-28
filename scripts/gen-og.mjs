import fs from "node:fs/promises";

import opentype from "opentype.js";
import sharp from "sharp";

const OUTPUT_PATH = "public/art/og.png";
const MARK_PATH = "public/art/mark.svg";
const GEIST_PIXEL_PATH = "scripts/fonts/GeistPixel.ttf";
const LORA_PATH = "scripts/fonts/Lora.ttf";
const WIDTH = 1200;
const HEIGHT = 630;

// Design tokens: ink #0b1014 · on-ink #f4f5f2 · signal #41a1cf · paper #fbfbf8.
const TOKENS = {
  ink: "#0b1014",
  onInk: "#f4f5f2",
  signal: "#41a1cf",
  paper: "#fbfbf8"
};

const readRequiredFile = async (filePath) => {
  try {
    return await fs.readFile(filePath);
  } catch (error) {
    throw new Error(`Required asset is missing or unreadable: ${filePath}`, {
      cause: error
    });
  }
};

const loadRequiredFont = (filePath) => {
  try {
    return opentype.loadSync(filePath);
  } catch (error) {
    throw new Error(`Required font is missing or unreadable: ${filePath}`, {
      cause: error
    });
  }
};

const baselineAt = (font, content, size, top) =>
  top - font.getPath(content, 0, 0, size).getBoundingBox().y1;

const textPath = (font, runs, fill, opacity) => {
  const pathData = runs
    .map(({ content, x, baselineY, size }) =>
      font.getPath(content, x, baselineY, size).toPathData(2)
    )
    .join(" ");
  const opacityAttribute = opacity === undefined ? "" : ` fill-opacity="${opacity}"`;

  return `<path d="${pathData}" fill="${fill}"${opacityAttribute}/>`;
};

const embedMark = (markBuffer) => {
  // The source mark's brain block is ink; recolour that fill so it remains visible on this ink card.
  const markSvg = markBuffer.toString("utf8").replaceAll(TOKENS.ink, TOKENS.onInk);
  const openingTagEnd = markSvg.indexOf(">");
  const closingTagStart = markSvg.lastIndexOf("</svg>");
  const viewBox = markSvg
    .slice(0, openingTagEnd)
    .match(/\bviewBox="([^"]+)"/)?.[1];

  if (openingTagEnd < 0 || closingTagStart < 0 || !viewBox) {
    throw new Error(`Unable to parse ${MARK_PATH}.`);
  }

  const markContent = markSvg.slice(openingTagEnd + 1, closingTagStart);
  return `<svg x="80" y="70" width="56" height="56" viewBox="${viewBox}">${markContent}</svg>`;
};

const generateOg = async () => {
  const markBuffer = await readRequiredFile(MARK_PATH);
  const geistPixel = loadRequiredFont(GEIST_PIXEL_PATH);
  const lora = loadRequiredFont(LORA_PATH);
  const wordmarkBaseline = baselineAt(geistPixel, "Yex Labs", 34, 78);
  const headlineBaseline = baselineAt(lora, "The company brain", 62, 290);
  const footnoteBaseline = baselineAt(
    geistPixel,
    "FORWARD-DEPLOYED AI · TORONTO",
    18,
    520
  );
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${TOKENS.ink}"/>
  ${embedMark(markBuffer)}
  <rect x="80" y="250" width="96" height="2" fill="${TOKENS.signal}"/>
  ${textPath(geistPixel, [{ content: "Yex Labs", x: 156, baselineY: wordmarkBaseline, size: 34 }], TOKENS.onInk)}
  ${textPath(
    lora,
    [
      { content: "The company brain", x: 80, baselineY: headlineBaseline, size: 62 },
      { content: "for local business.", x: 80, baselineY: headlineBaseline + 72, size: 62 }
    ],
    TOKENS.onInk
  )}
  ${textPath(
    geistPixel,
    [{ content: "FORWARD-DEPLOYED AI · TORONTO", x: 80, baselineY: footnoteBaseline, size: 18 }],
    TOKENS.onInk,
    0.45
  )}
</svg>`;

  await fs.mkdir("public/art", { recursive: true });
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9, adaptiveFiltering: false }).toFile(OUTPUT_PATH);

  const { size } = await fs.stat(OUTPUT_PATH);
  console.log(`${OUTPUT_PATH} (${size} bytes)`);
};

try {
  await generateOg();
} catch (error) {
  console.error(`Failed to generate ${OUTPUT_PATH}.`, error);
  process.exit(1);
}
