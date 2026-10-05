import { assets } from "../config/assets.ts"

const alts = [
  "Full-body SIERA pointing forward, glowing crystal in the other hand.",
  "Full-body SIERA mirrored, crystal and pointing hand swapped.",
  "Full-body SIERA in a wider stance, cape spread, crystal raised.",
  "Full-body SIERA standing with the crystal held up.",
  "Full-body SIERA, a smaller pose of the crowned mascot with the crystal.",
  "SIERA from the waist up, crystal ringed with light.",
  "SIERA from the chest up, pointing, crystal beside the cape.",
  "Close-up of SIERA pointing straight ahead.",
  "Close-up of SIERA presenting the glowing crystal.",
  "Close-up of SIERA's crowned face, visor, and pointing hand.",
  "Circular coin reading Super Intelligence Era and $SIERA.",
  "Circular $SIERA coin emblem.",
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
