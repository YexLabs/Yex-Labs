import fs from "node:fs/promises";

import sharp from "sharp";

// Design token: paper #fbfbf8. Mark colors and geometry come from mark.svg.
const MARK_PATH = "public/art/mark.svg";
const PAPER = "#fbfbf8";
const MARK_INSET = 0.68;
const PLATE_RADIUS = 0.18;

const readMark = async () => {
  try {
    return await fs.readFile(MARK_PATH);
  } catch (error) {
    throw new Error(`Unable to read ${MARK_PATH}.`, { cause: error });
  }
};

const renderPlatedArtwork = (markBuffer, size) => {
  const markSvg = markBuffer.toString("utf8");
  const openingTagEnd = markSvg.indexOf(">");
  const closingTagStart = markSvg.lastIndexOf("</svg>");
  const viewBox = markSvg
    .slice(0, openingTagEnd)
    .match(/\bviewBox="([^"]+)"/)?.[1];

  if (openingTagEnd < 0 || closingTagStart < 0 || !viewBox) {
    throw new Error(`Unable to parse ${MARK_PATH}.`);
  }

  const markSize = size * MARK_INSET;
  const markOffset = (size - markSize) / 2;
  const radius = size * PLATE_RADIUS;
  const markContent = markSvg.slice(openingTagEnd + 1, closingTagStart);
  const nestedMark = `<svg x="${markOffset}" y="${markOffset}" width="${markSize}" height="${markSize}" viewBox="${viewBox}">${markContent}</svg>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><rect width="${size}" height="${size}" rx="${radius}" fill="${PAPER}"/>${nestedMark}</svg>`;
};

const renderPng = async (markBuffer, size) =>
  sharp(Buffer.from(renderPlatedArtwork(markBuffer, size)))
    .png({ compressionLevel: 9, adaptiveFiltering: false })
    .toBuffer();

const buildIco = (images) => {
  const directorySize = 6 + images.length * 16;
  const imageBytes = images.reduce((total, image) => total + image.data.length, 0);
  const ico = Buffer.alloc(directorySize + imageBytes);

  ico.writeUInt16LE(0, 0);
  ico.writeUInt16LE(1, 2);
  ico.writeUInt16LE(images.length, 4);

  let imageOffset = directorySize;
  images.forEach(({ size, data }, index) => {
    const entryOffset = 6 + index * 16;
    ico[entryOffset] = size === 256 ? 0 : size;
    ico[entryOffset + 1] = size === 256 ? 0 : size;
    ico[entryOffset + 2] = 0;
    ico[entryOffset + 3] = 0;
    ico.writeUInt16LE(1, entryOffset + 4);
    ico.writeUInt16LE(32, entryOffset + 6);
    ico.writeUInt32LE(data.length, entryOffset + 8);
    ico.writeUInt32LE(imageOffset, entryOffset + 12);
    data.copy(ico, imageOffset);
    imageOffset += data.length;
  });

  return ico;
};

const writeOutput = async (outputPath, data) => {
  await fs.writeFile(outputPath, data);
  const { size } = await fs.stat(outputPath);
  console.log(`${outputPath} (${size} bytes)`);
};

const generateIcons = async () => {
  await fs.mkdir("app", { recursive: true });
  const markBuffer = await readMark();

  const icon = await renderPng(markBuffer, 512);
  const appleIcon = await renderPng(markBuffer, 180);
  const faviconImages = await Promise.all(
    [16, 32, 48].map(async (size) => ({ size, data: await renderPng(markBuffer, size) }))
  );
  const favicon = buildIco(faviconImages);

  await writeOutput("app/icon.png", icon);
  await writeOutput("app/apple-icon.png", appleIcon);
  await writeOutput("app/favicon.ico", favicon);
};

try {
  await generateIcons();
} catch (error) {
  console.error("Failed to generate icons.", error);
  process.exit(1);
}
