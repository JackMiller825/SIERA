import { images } from "../generated/manifest.ts"
import type { ImageAsset } from "../types/image.ts"

function image(name: string): ImageAsset {
  const found = images[name]
  if (!found) throw new Error(`Missing asset "${name}". Add the file under assets-src/ and run npm run assets.`)
  return found
}

const comicIds = ["01", "02", "03", "04", "05", "06"] as const
const packIds = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"] as const

export const assets = {
  heroCharacter: image("siera-hero-character-transparent"),
  heroSpace: image("siera-hero-space-bg"),
  neuralTop: image("siera-neural-horizon-top"),
  neuralBottom: image("siera-neural-horizon-bottom"),
  origin: image("siera-origin-story"),
  evolution: image("siera-evolution-human-ai-agi-si"),
  governance: image("siera-governance"),
  quickStart: image("siera-quick-start"),
  eraGate: image("siera-era-gate"),
  aiLab: image("siera-ai-lab"),
  city: image("siera-superintelligence-city"),
  mediaMemes: image("siera-media-memes"),
  mediaStory: image("siera-media-story"),
  mediaUpdates: image("siera-media-updates"),
  community: image("siera-community"),
  footerCharacter: image("siera-footer-character"),
  og: image("siera-og-image-1200x630"),
  favicon: image("siera-favicon"),
  coin: image("siera-coin"),
  comics: Object.fromEntries(comicIds.map((id) => [id, image(`siera-comic-${id}`)])) as Record<(typeof comicIds)[number], ImageAsset>,
  memes: Object.fromEntries(packIds.map((id) => [id, image(`siera-meme-${id}`)])) as Record<(typeof packIds)[number], ImageAsset>,
  stickers: Object.fromEntries(packIds.map((id) => [id, image(`siera-sticker-${id}`)])) as Record<(typeof packIds)[number], ImageAsset>,
}

export const heroPreload = "/assets/optimized/siera-hero-space-bg-1280.webp"
