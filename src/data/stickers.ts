import { assets } from "../config/assets.ts"

const alts = [
  "Circular sticker of SIERA's crowned head and blue visor.",
  "Circular sticker close-up of the SIERA visor.",
  "Circular sticker of SIERA pointing forward.",
  "Circular sticker of the blue crystal in SIERA's hand.",
  "Circular sticker of the full crowned SIERA figure.",
  "Circular sticker of SIERA's royal suit and cape.",
  "Circular sticker of SIERA's lower pose and gold trim.",
  "Circular sticker of the official SIERA coin emblem.",
  "Die-cut sticker of SIERA with a blue aura.",
  "Die-cut sticker of SIERA with a gold aura.",
  "Die-cut sticker of SIERA with a purple aura.",
  "Die-cut sticker of SIERA with a cyan aura.",
] as const

export const stickers = alts.map((alt, index) => {
  const id = String(index + 1).padStart(2, "0") as keyof typeof assets.stickers
  return {
    id,
    alt,
    image: assets.stickers[id],
    rotate: (index % 7) - 3,
  }
})
