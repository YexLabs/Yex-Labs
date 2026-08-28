import fs from "node:fs/promises";
import sharp from "sharp";

const OUTPUT_PATH = "public/art/grain.png";
const SIZE = 512;
const SEED = 0x4f1a2b3c;
const PAPER_RGB = [251, 251, 248];
const OFFSET_MIN = -4;
const OFFSET_RANGE = 9;

const mulberry32 = (seed) => {
  let state = seed >>> 0;

  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
};

const generateGrain = async () => {
  // Opaque RGBA tile, paper-centred on --paper: #fbfbf8 (251/251/248).
  // Each pixel uses an achromatic +/-4-level offset: ~3% peak-to-peak;
  // the mean equals paper, so there is no tint.
  const random = mulberry32(SEED);
  const pixels = Buffer.alloc(SIZE * SIZE * 4);

  for (let pixel = 0; pixel < SIZE * SIZE; pixel += 1) {
    const delta = OFFSET_MIN + Math.floor(random() * OFFSET_RANGE);
    const bufferOffset = pixel * 4;

    pixels[bufferOffset] = Math.max(0, Math.min(255, PAPER_RGB[0] + delta));
    pixels[bufferOffset + 1] = Math.max(0, Math.min(255, PAPER_RGB[1] + delta));
    pixels[bufferOffset + 2] = Math.max(0, Math.min(255, PAPER_RGB[2] + delta));
    pixels[bufferOffset + 3] = 255;
  }

  await sharp(pixels, {
    raw: {
      width: SIZE,
      height: SIZE,
      channels: 4,
    },
  })
    .png({ compressionLevel: 9, adaptiveFiltering: false })
    .toFile(OUTPUT_PATH);

  const { size } = await fs.stat(OUTPUT_PATH);
  console.log(`${OUTPUT_PATH} (${size} bytes)`);
};

try {
  await generateGrain();
} catch (error) {
  console.error(`Failed to generate ${OUTPUT_PATH}.`, error);
  process.exit(1);
}
