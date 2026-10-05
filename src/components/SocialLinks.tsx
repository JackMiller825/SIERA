import type { ReactNode } from "react"
import { project } from "../config/project.ts"
import { cn } from "../utils/cn.ts"
import { isLiveUrl } from "../utils/token.ts"
import { TelegramIcon, XIcon } from "./Icons.tsx"

function IconLink({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  const className =
    "grid h-11 w-11 place-items-center rounded-full border border-cyan/35 bg-navy/55 text-ice transition hover:border-gold hover:text-gold-bright"
  if (!isLiveUrl(href)) {
    return (
      <button type="button" className={cn(className, "cursor-not-allowed opacity-50")} disabled aria-label={`${label}, coming soon`}>
        {children}
      </button>
    )
  }
  return (
    <a href={href} className={className} aria-label={label} target="_blank" rel="noreferrer noopener">
      {children}
    </a>
  )
}

export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <IconLink href={project.twitterUrl} label="SIERA on X">
        <XIcon className="h-4 w-4" />
      </IconLink>
      <IconLink href={project.telegramUrl} label="SIERA on Telegram">
        <TelegramIcon className="h-4 w-4" />
      </IconLink>
    </div>
  )
}
