import { useState } from "react"
import type { ImageAsset } from "../types/image.ts"
import { cn } from "../utils/cn.ts"
import { srcSet } from "../utils/images.ts"
import { Crystal } from "./Crystal.tsx"

type SmartImageProps = {
  image: ImageAsset
  alt: string
  className?: string
  sizes?: string
  priority?: boolean
  maxWidth?: number
  fit?: "cover" | "contain"
  fill?: boolean
}

export function SmartImage({
  image,
  alt,
  className,
  sizes = "100vw",
  priority = false,
  maxWidth,
  fit = "cover",
  fill = false,
}: SmartImageProps) {
  const [failed, setFailed] = useState(false)
  const webp = srcSet(image, "webp", maxWidth)
  const avif = srcSet(image, "avif", maxWidth)
  const fitClass = fit === "cover" ? "object-cover" : "object-contain"

  if (failed) {
    return (
      <div
        role={alt ? "img" : undefined}
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
        className={cn("grid min-h-40 place-items-center bg-deep px-4 text-center", fill && "absolute inset-0", className)}
      >
        <div>
          <Crystal className="mx-auto h-8 w-8" reactive={false} />
          <p className="mt-2 font-display text-[10px] tracking-[0.22em] text-cyan">SIGNAL PENDING</p>
        </div>
      </div>
    )
  }

  return (
    <picture className={cn("block", fill ? "absolute inset-0 h-full w-full" : "w-full")}>
      {!priority && avif ? <source type="image/avif" srcSet={avif} sizes={sizes} /> : null}
      {webp ? <source type="image/webp" srcSet={webp} sizes={sizes} /> : null}
      <img
        src={image.src}
        alt={alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        onError={() => setFailed(true)}
        className={cn(fill ? "h-full w-full" : "h-auto w-full", fitClass, className)}
      />
    </picture>
  )
}
