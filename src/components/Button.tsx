import type { ReactNode } from "react"
import { cn } from "../utils/cn.ts"

type ButtonProps = {
  href?: string
  children: ReactNode
  variant?: "gold" | "ghost"
  disabled?: boolean
  className?: string
  onClick?: () => void
  ariaLabel?: string
}

const variants = {
  gold: "bg-gradient-to-r from-gold to-gold-bright text-navy shadow-[0_0_22px_rgba(245,185,66,0.32)] hover:shadow-[0_0_36px_rgba(255,215,106,0.55)]",
  ghost:
    "border border-cyan/40 bg-navy/60 text-ice shadow-[0_0_18px_rgba(30,140,255,0.15)] hover:border-gold/80 hover:shadow-[0_0_28px_rgba(70,217,255,0.32)]",
}

export function Button({ href, children, variant = "gold", disabled = false, className, onClick, ariaLabel }: ButtonProps) {
  const classes = cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-center font-display text-[11px] font-bold tracking-[0.16em] transition duration-300 hover:-translate-y-0.5",
    variants[variant],
    disabled && "pointer-events-none opacity-45 hover:translate-y-0 hover:shadow-none",
    className,
  )

  if (href && !disabled) {
    const external = href.startsWith("http")
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer noopener" : undefined}
        onClick={onClick}
      >
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} disabled={disabled} aria-label={ariaLabel} onClick={onClick} title={disabled ? "Available when the official link is published" : undefined}>
      {children}
    </button>
  )
}
