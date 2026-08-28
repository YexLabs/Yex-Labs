import sharp from "sharp"

const USAGE =
  "Usage: node scripts/dither.mjs --in <path> --out <path> --width <n> --height <n> [--dot <n>] [--contrast <n>]"

const failUsage = (message) => {
  console.error(`Error: ${message}`)
  console.error(USAGE)
  process.exit(1)
}

const parsePositiveInteger = (value, flag) => {
  const parsed = Number(value)

  if (!Number.isInteger(parsed) || parsed <= 0) {
    failUsage(`${flag} must be a positive integer.`)
  }

  return parsed
}

const parseArguments = (argv) => {
  const allowedFlags = new Set([
    "in",
    "out",
    "width",
    "height",
    "dot",
    "contrast"
  ])
  const raw = new Map()

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index]

    if (!token.startsWith("--") || token.length === 2) {
      failUsage(`Unrecognised argument: ${token || "(empty)"}.`)
    }

    const flag = token.slice(2)
    if (!allowedFlags.has(flag)) {
      failUsage(`Unrecognised argument: ${token}.`)
    }

    const value = argv[index + 1]
    if (!value || value.startsWith("--")) {
      failUsage(`Missing value for --${flag}.`)
    }

    if (raw.has(flag)) {
      failUsage(`Duplicate argument: --${flag}.`)
    }

    raw.set(flag, value)
    index += 1
  }

  for (const requiredFlag of ["in", "out", "width", "height"]) {
    if (!raw.has(requiredFlag)) {
      failUsage(`Missing required argument: --${requiredFlag}.`)
    }
  }

  const width = parsePositiveInteger(raw.get("width"), "--width")
  const height = parsePositiveInteger(raw.get("height"), "--height")
  const dot = raw.has("dot") ? parsePositiveInteger(raw.get("dot"), "--dot") : 2
  const contrast = raw.has("contrast") ? Number(raw.get("contrast")) : 1.15

  if (!Number.isFinite(contrast) || contrast <= 0) {
    failUsage("--contrast must be a finite number greater than zero.")
  }

  if (width % dot !== 0 || height % dot !== 0) {
    failUsage("--width and --height must be divisible by --dot.")
  }

  return {
    input: raw.get("in"),
    output: raw.get("out"),
    width,
    height,
    dot,
    contrast
  }
}

const clampByte = (value) => Math.min(255, Math.max(0, value))

const applyContrast = (data, contrast) => {
  const contrasted = new Float64Array(data.length)

  for (let index = 0; index < data.length; index += 1) {
    contrasted[index] = clampByte((data[index] - 128) * contrast + 128)
  }

  return contrasted
}

const ditherAtkinson = (values, width, height) => {
  const output = Buffer.alloc(values.length)

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const index = y * width + x
      const outputValue = values[index] < 128 ? 0 : 255
      const errorShare = (values[index] - outputValue) / 8

      output[index] = outputValue

      // Atkinson deliberately propagates only 6/8 of the error.
      if (x + 1 < width) {
        values[index + 1] += errorShare
      }
      if (x + 2 < width) {
        values[index + 2] += errorShare
      }
      if (y + 1 < height) {
        if (x > 0) {
          values[index + width - 1] += errorShare
        }
        values[index + width] += errorShare
        if (x + 1 < width) {
          values[index + width + 1] += errorShare
        }
      }
      if (y + 2 < height) {
        values[index + width * 2] += errorShare
      }
    }
  }

  return output
}

const ditherImage = async ({ input, output, width, height, dot, contrast }) => {
  const reducedWidth = width / dot
  const reducedHeight = height / dot
  const { data, info } = await sharp(input)
    .rotate()
    .resize(reducedWidth, reducedHeight, {
      fit: "cover",
      position: "attention"
    })
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true })

  if (info.channels !== 1) {
    throw new Error(
      `Expected a grayscale buffer, received ${info.channels} channels.`
    )
  }

  const contrasted = applyContrast(data, contrast)
  const dithered = ditherAtkinson(contrasted, reducedWidth, reducedHeight)

  await sharp(dithered, {
    raw: {
      width: reducedWidth,
      height: reducedHeight,
      channels: 1
    }
  })
    .resize(width, height, { kernel: "nearest" })
    .png()
    .toFile(output)
}

const main = async () => {
  const options = parseArguments(process.argv.slice(2))
  await ditherImage(options)
  console.log(
    `Wrote ${options.output} (${options.width}x${options.height}), dot size ${options.dot}`
  )
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error)
  console.error(`Dither failed: ${message}`)
  process.exitCode = 1
})
