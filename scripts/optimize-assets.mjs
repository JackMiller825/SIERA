import { mkdir, writeFile, access } from "node:fs/promises"
import path from "node:path"
import sharp from "sharp"

const root = path.resolve(import.meta.dirname, "..")
const uploads = path.join(root, "assets")
const masters = path.join(root, "assets-src")
const outDir = path.join(root, "public", "assets")
const optDir = path.join(outDir, "optimized")

const uuid = {
  mascot: "162cc960-058d-4bbd-832d-110af6cc5ee9.png",
  space: "9797a6d8-8c10-463c-9664-2930ad5aa4e5.jpg",
  origin: "d67ba070-8c83-4da1-81e9-399c587c977c.png",
  evolution: "5e085464-4189-4260-b4e3-ecd474257928.png",
  evolutionPanels: "06f6083f-70e1-4f6e-a952-1b25079188a7.png",
  governance: "fc2dca6a-d75c-47dd-98c3-e8a502f209b5.png",
  quick: "85d04032-be28-4eab-a17d-c51c257a13a2.png",
  gate: "1e1accdc-f9ce-4226-96ae-34e97de2d006.png",
  lab: "ddd1b696-7a91-401f-acb0-359ee3cb7a81.png",
  city: "7528a1cc-8b3a-4d62-ae32-e0ba17ea472a.png",
  memesCard: "9b676ea1-1e19-4982-b5c6-5122856e6c42.png",
  community: "aedf0b71-344b-43bc-a865-b2daa9e4cd54.png",
  updates: "7b68bbbc-64b9-4122-9b82-9a072d94fe7c.png",
  emblem: "3a9e635e-28b8-401f-ad5d-6933e5f38a87.png",
  banner: "bf4b5fca-6189-46a7-8e1d-bc408b5282f1.png",
  roadA: "7e3e3404-a82b-4bfb-a7f5-ec77a2af5e26.png",
  roadB: "6feb9d0a-bdac-4ce9-859c-30c6a8b21fed.png",
  roadC: "990efa1b-9111-420e-a45b-81b87630dd71.png",
  roadD: "bf87bb7d-49fb-41e2-a1ba-8ee9b733005f.png",
  night: "d1d71619-aaec-4ce7-a67b-145e625e9b44.png",
}

async function exists(file) {
  try {
    await access(file)
    return true
  } catch {
    return false
  }
}

function upload(name) {
  return path.join(uploads, uuid[name])
}

async function neuralSvg(edge) {
  const w = 1920
  const h = 520
  const nodes = []
  for (let i = 0; i < 48; i++) {
    const x = 30 + ((i * 83) % (w - 60))
    const band = edge === "top" ? 24 + (i % 8) * 26 : h - 36 - (i % 8) * 26
    const y = band + ((i * 13) % 22)
    nodes.push({ x, y, r: 1.6 + (i % 4) * 0.7, gold: i % 5 === 0 })
  }
  const lines = []
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i]
      const b = nodes[j]
      const dx = a.x - b.x
      const dy = a.y - b.y
      if (dx * dx + dy * dy < 180 * 180 && (i + j) % 3 !== 0) {
        lines.push(`<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="${a.gold || b.gold ? "#F5B942" : "#46D9FF"}" stroke-opacity="0.45" stroke-width="1"/>`)
      }
    }
  }
  const dots = nodes
    .map(
      (n) =>
        `<circle cx="${n.x}" cy="${n.y}" r="${n.r}" fill="${n.gold ? "#FFD76A" : "#46D9FF"}"/>`,
    )
    .join("")
  const glowY = edge === "top" ? 40 : h - 40
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <defs>
      <filter id="g" x="-20%" y="-40%" width="140%" height="180%"><feGaussianBlur stdDeviation="18"/></filter>
      <linearGradient id="fade" x1="0" y1="${edge === "top" ? 0 : 1}" x2="0" y2="${edge === "top" ? 1 : 0}">
        <stop offset="0" stop-color="#ffffff" stop-opacity="1"/>
        <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
      </linearGradient>
      <mask id="m"><rect width="${w}" height="${h}" fill="url(#fade)"/></mask>
    </defs>
    <g mask="url(#m)">
      <ellipse cx="960" cy="${glowY}" rx="760" ry="46" fill="#1E8CFF" opacity="0.45" filter="url(#g)"/>
      <ellipse cx="480" cy="${glowY}" rx="180" ry="20" fill="#F5B942" opacity="0.4" filter="url(#g)"/>
      <ellipse cx="1460" cy="${glowY}" rx="220" ry="24" fill="#784BFF" opacity="0.35" filter="url(#g)"/>
      ${lines.join("")}
      ${dots}
    </g>
  </svg>`)
}

async function circularSticker(input, extract, ring, glow) {
  const size = 768
  const inner = 620
  const resized = await sharp(input).extract(extract).resize(inner, inner, { fit: "cover" }).png().toBuffer()
  const mask = Buffer.from(
    `<svg width="${inner}" height="${inner}"><circle cx="${inner / 2}" cy="${inner / 2}" r="${inner / 2}" fill="#fff"/></svg>`,
  )
  const circled = await sharp(resized).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer()
  const frame = Buffer.from(`<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <defs><filter id="b" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="10"/></filter></defs>
    <circle cx="${size / 2}" cy="${size / 2}" r="292" fill="none" stroke="${glow}" stroke-width="16" filter="url(#b)" opacity="0.95"/>
    <circle cx="${size / 2}" cy="${size / 2}" r="300" fill="none" stroke="${ring}" stroke-width="8"/>
  </svg>`)
  return sharp({
    create: { width: size, height: size, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([
      { input: circled, top: (size - inner) / 2, left: (size - inner) / 2 },
      { input: frame },
    ])
    .png()
    .toBuffer()
}

async function dieCut(input, glow) {
  const body = await sharp(input).resize({ width: 640, height: 860, fit: "inside" }).png().toBuffer()
  const meta = await sharp(body).metadata()
  const width = 860
  const height = 980
  const aura = Buffer.from(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs><filter id="b"><feGaussianBlur stdDeviation="26"/></filter></defs>
    <ellipse cx="${width / 2}" cy="500" rx="240" ry="280" fill="${glow}" opacity="0.8" filter="url(#b)"/>
  </svg>`)
  return sharp({
    create: { width, height, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([
      { input: aura },
      { input: body, top: 36, left: Math.round((width - (meta.width ?? 640)) / 2) },
    ])
    .png()
    .toBuffer()
}

async function ensureGeneratedMasters() {
  await mkdir(masters, { recursive: true })
  const marker = path.join(masters, "siera-og-image-1200x630.png")
  if (await exists(marker)) return
  if (!(await exists(upload("mascot")))) {
    console.log("No upload masters found. Using existing public assets.")
    return
  }

  const mascot = upload("mascot")
  const emblem = upload("emblem")
  const copies = [
    ["siera-hero-character-transparent.png", mascot],
    ["siera-footer-character.png", mascot],
    ["siera-hero-space-bg.png", upload("space")],
    ["siera-origin-story.png", upload("origin")],
    ["siera-evolution-human-ai-agi-si.png", upload("evolution")],
    ["siera-governance.png", upload("governance")],
    ["siera-quick-start.png", upload("quick")],
    ["siera-era-gate.png", upload("gate")],
    ["siera-ai-lab.png", upload("lab")],
    ["siera-superintelligence-city.png", upload("city")],
    ["siera-media-memes.png", upload("memesCard")],
    ["siera-media-story.png", upload("evolutionPanels")],
    ["siera-media-updates.png", upload("updates")],
    ["siera-community.png", upload("community")],
    ["siera-comic-01.png", upload("origin")],
    ["siera-comic-02.png", upload("evolutionPanels")],
    ["siera-comic-03.png", upload("evolution")],
    ["siera-comic-04.png", upload("memesCard")],
    ["siera-comic-05.png", upload("community")],
    ["siera-comic-06.png", upload("city")],
    ["siera-meme-01.png", upload("roadA")],
    ["siera-meme-02.png", upload("lab")],
    ["siera-meme-03.png", upload("gate")],
    ["siera-meme-04.png", upload("night")],
    ["siera-meme-05.png", upload("roadB")],
    ["siera-meme-06.png", upload("updates")],
    ["siera-meme-07.png", upload("roadC")],
    ["siera-meme-08.png", upload("roadD")],
    ["siera-meme-09.png", upload("governance")],
    ["siera-meme-10.png", upload("banner")],
    ["siera-meme-11.png", emblem],
    ["siera-meme-12.png", upload("memesCard")],
  ]

  const { copyFile } = await import("node:fs/promises")
  for (const [name, src] of copies) {
    await copyFile(src, path.join(masters, name))
  }

  await sharp(await neuralSvg("top")).png().toFile(path.join(masters, "siera-neural-horizon-top.png"))
  await sharp(await neuralSvg("bottom")).png().toFile(path.join(masters, "siera-neural-horizon-bottom.png"))

  const crops = [
    { extract: { left: 390, top: 0, width: 540, height: 540 }, ring: "#FFD76A", glow: "#46D9FF" },
    { extract: { left: 450, top: 30, width: 460, height: 460 }, ring: "#46D9FF", glow: "#1E8CFF" },
    { extract: { left: 0, top: 450, width: 540, height: 540 }, ring: "#F5B942", glow: "#784BFF" },
    { extract: { left: 760, top: 150, width: 520, height: 520 }, ring: "#46D9FF", glow: "#FFD76A" },
    { extract: { left: 260, top: 0, width: 780, height: 780 }, ring: "#FFD76A", glow: "#1E8CFF" },
    { extract: { left: 300, top: 220, width: 700, height: 700 }, ring: "#F8FBFF", glow: "#46D9FF" },
    { extract: { left: 160, top: 560, width: 640, height: 640 }, ring: "#F5B942", glow: "#46D9FF" },
    { extract: { left: 90, top: 90, width: 1070, height: 1070 }, ring: "#FFD76A", glow: "#1E8CFF", src: emblem },
  ]
  for (let i = 0; i < crops.length; i++) {
    const crop = crops[i]
    const buffer = await circularSticker(crop.src ?? mascot, crop.extract, crop.ring, crop.glow)
    const name = `siera-sticker-${String(i + 1).padStart(2, "0")}.png`
    await sharp(buffer).png().toFile(path.join(masters, name))
  }
  const glows = ["#1E8CFF", "#FFD76A", "#784BFF", "#46D9FF"]
  for (let i = 0; i < glows.length; i++) {
    const buffer = await dieCut(mascot, glows[i])
    const name = `siera-sticker-${String(i + 9).padStart(2, "0")}.png`
    await sharp(buffer).png().toFile(path.join(masters, name))
  }

  await sharp(emblem)
    .resize(256, 256)
    .png({ compressionLevel: 9 })
    .toFile(path.join(masters, "siera-favicon.png"))

  const banner = await sharp(upload("banner")).resize(1200, 400, { fit: "cover", position: "centre" }).png().toBuffer()
  await sharp({
    create: { width: 1200, height: 630, channels: 3, background: { r: 2, g: 8, b: 23 } },
  })
    .composite([{ input: banner, top: 115, left: 0 }])
    .png({ compressionLevel: 9 })
    .toFile(path.join(masters, "siera-og-image-1200x630.png"))

  console.log("Prepared masters in assets-src/")
}

const jobs = [
  ["siera-hero-space-bg", "jpg", [640, 1280, 1920]],
  ["siera-hero-character-transparent", "png", [320, 480]],
  ["siera-footer-character", "png", [320, 448]],
  ["siera-neural-horizon-top", "png", [960, 1600]],
  ["siera-neural-horizon-bottom", "png", [960, 1600]],
  ["siera-origin-story", "jpg", [640, 1280, 1600]],
  ["siera-evolution-human-ai-agi-si", "jpg", [640, 1280, 1600]],
  ["siera-governance", "jpg", [640, 1280, 1600]],
  ["siera-quick-start", "jpg", [640, 1280, 1600]],
  ["siera-era-gate", "jpg", [640, 1280, 1920]],
  ["siera-ai-lab", "jpg", [640, 1280, 1600]],
  ["siera-superintelligence-city", "jpg", [640, 1280, 1920]],
  ["siera-media-memes", "jpg", [640, 1200]],
  ["siera-media-story", "jpg", [640, 1200]],
  ["siera-media-updates", "jpg", [640, 1200]],
  ["siera-community", "jpg", [640, 1280, 1600]],
  ["siera-favicon", "png", []],
  ["siera-coin", "png", [128, 256, 512]],
  ["siera-og-image-1200x630", "png", []],
]

for (let i = 1; i <= 6; i++) jobs.push([`siera-comic-${String(i).padStart(2, "0")}`, "jpg", [640, 1280]])
for (let i = 1; i <= 12; i++) jobs.push([`siera-meme-${String(i).padStart(2, "0")}`, "jpg", [480, 960]])
for (let i = 1; i <= 12; i++) jobs.push([`siera-sticker-${String(i).padStart(2, "0")}`, "png", [384, 768]])

async function publish(name, fallback, widths) {
  const srcPng = path.join(masters, `${name}.png`)
  const srcJpg = path.join(masters, `${name}.jpg`)
  const src = (await exists(srcPng)) ? srcPng : srcJpg
  if (!(await exists(src))) {
    console.warn("missing master", name)
    return null
  }
  const meta = await sharp(src).metadata()
  const keepAlpha = fallback === "png"
  const ext = keepAlpha ? "png" : "jpg"
  const cap = widths.length ? Math.max(...widths) : (meta.width ?? 1600)
  const resize = (meta.width ?? 0) > cap ? { width: cap, withoutEnlargement: true } : undefined
  const baseImage = () => {
    let pipeline = sharp(src, { animated: false })
    if (!keepAlpha) pipeline = pipeline.flatten({ background: "#020817" })
    if (resize) pipeline = pipeline.resize(resize)
    return pipeline
  }
  const dest = path.join(outDir, `${name}.${ext}`)
  if (ext === "png") await baseImage().png({ compressionLevel: 9 }).toFile(dest)
  else await baseImage().jpeg({ quality: 76, mozjpeg: true }).toFile(dest)

  const saved = await sharp(dest).metadata()
  const used = []
  for (const width of widths) {
    if ((meta.width ?? width) < width) continue
    const variant = () => {
      let pipeline = sharp(src, { animated: false })
      if (!keepAlpha) pipeline = pipeline.flatten({ background: "#020817" })
      return pipeline.resize({ width, withoutEnlargement: true })
    }
    const file = path.join(optDir, `${name}-${width}`)
    await variant().webp({ quality: 74, effort: 4 }).toFile(`${file}.webp`)
    try {
      await variant().avif({ quality: 46, effort: 3 }).toFile(`${file}.avif`)
    } catch (error) {
      console.warn("avif skipped", name, width, error.message)
    }
    used.push(width)
  }
  return {
    src: `/assets/${name}.${ext}`,
    width: saved.width ?? cap,
    height: saved.height ?? meta.height ?? 1,
    widths: used,
  }
}

async function main() {
  sharp.cache(false)
  await ensureGeneratedMasters()
  await mkdir(optDir, { recursive: true })
  const manifest = {}
  for (const [name, fallback, widths] of jobs) {
    process.stdout.write(`optimizing ${name}\n`)
    const item = await publish(name, fallback, widths)
    if (item) manifest[name] = item
  }
  const body = `import type { ImageAsset } from "../types/image.ts"\n\nexport const images: Record<string, ImageAsset> = ${JSON.stringify(manifest, null, 2)}\n`
  await mkdir(path.join(root, "src", "generated"), { recursive: true })
  await writeFile(path.join(root, "src", "generated", "manifest.ts"), body)
  console.log(`Wrote ${Object.keys(manifest).length} images`)
}

await main()
