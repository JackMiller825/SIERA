import type { ImageAsset } from "../types/image.ts"

export function assetName(image: ImageAsset): string {
  const file = image.src.split("/").pop() ?? ""
  return file.replace(/\.[^.]+$/, "")
}

export function variantSrc(image: ImageAsset, width: number, ext: "webp" | "avif"): string {
  return `/assets/optimized/${assetName(image)}-${width}.${ext}`
}

export function srcSet(image: ImageAsset, ext: "webp" | "avif", maxWidth?: number): string {
  return image.widths
    .filter((width) => (maxWidth ? width <= maxWidth : true))
    .map((width) => `${variantSrc(image, width, ext)} ${width}w`)
    .join(", ")
}

export function largestVariant(image: ImageAsset, ext: "webp" | "avif" = "webp"): string {
  if (!image.widths.length) return image.src
  const width = Math.max(...image.widths)
  return variantSrc(image, width, ext)
}
