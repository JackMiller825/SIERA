import type { ReactNode } from "react"
import { cn } from "../utils/cn.ts"
import { Crystal } from "./Crystal.tsx"

export function Section({ id, children, className }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={cn("relative scroll-mt-24 py-20 md:py-28", className)}>
      {children}
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  id,
  children,
  align = "left",
}: {
  eyebrow?: string
  title: string
  id?: string
  children?: ReactNode
  align?: "left" | "center"
}) {
  return (
    <header className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? (
        <p className="inline-flex items-center gap-2 font-display text-[11px] tracking-[0.32em] text-cyan">
          <Crystal className="h-4 w-4" reactive={false} />
          {eyebrow}
        </p>
      ) : null}
      <h2 id={id} className="mt-4 font-display text-3xl leading-[1.05] font-bold text-ice sm:text-5xl">
        {title}
      </h2>
      {children ? <div className="mt-5 space-y-4 text-base leading-relaxed text-ice/80 sm:text-lg">{children}</div> : null}
    </header>
  )
}
