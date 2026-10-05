import { useId } from "react"
import { cn } from "../utils/cn.ts"

type CrystalProps = {
  className?: string
  reactive?: boolean
}

export function Crystal({ className, reactive = true }: CrystalProps) {
  const gradientId = `cg-${useId().replace(/:/g, "")}`

  return (
    <span
      data-crystal={reactive ? "" : undefined}
      className={cn("inline-grid shrink-0", reactive && "crystal-spin", className)}
      aria-hidden="true"
    >
      <svg viewBox="0 0 64 64" className="h-full w-full drop-shadow-[0_0_10px_rgba(70,217,255,0.65)]">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#F8FBFF" />
            <stop offset="0.4" stopColor="#46D9FF" />
            <stop offset="1" stopColor="#1E8CFF" />
          </linearGradient>
        </defs>
        <path d="M32 3 54 24 32 61 10 24Z" fill={`url(#${gradientId})`} />
        <path d="M32 3 54 24 32 27Z" fill="#fff" opacity="0.38" />
        <path d="M10 24 32 27 32 61Z" fill="#06152F" opacity="0.28" />
        <path d="M32 3 54 24 32 61 10 24Z" fill="none" stroke="#FFD76A" strokeWidth="1.4" />
      </svg>
    </span>
  )
}
