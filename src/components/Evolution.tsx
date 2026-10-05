import { motion, useMotionValueEvent, useScroll } from "framer-motion"
import { useRef, useState } from "react"
import { assets } from "../config/assets.ts"
import { stages } from "../data/stages.ts"
import { cn } from "../utils/cn.ts"
import { Crystal } from "./Crystal.tsx"
import { Section, SectionHeading } from "./Section.tsx"
import { SmartImage } from "./SmartImage.tsx"

export function Evolution() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(-1)
  const [hover, setHover] = useState<number | null>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 50%"],
  })

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setActive(value <= 0.05 ? -1 : Math.min(stages.length - 1, Math.floor(value * stages.length)))
  })

  const current = hover ?? active

  return (
    <Section id="evolution" className="overflow-hidden bg-deep/40">
      <div ref={ref} className="wrap">
        <SectionHeading id="evolution-title" eyebrow="THE SIERA NARRATIVE" title="THE EVOLUTION OF INTELLIGENCE" align="center" />
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-ice/65">
          A fictional story told inside the SIERA universe. This progression is world-building, not a scientific claim.
        </p>

        <div className="relative mt-10 overflow-hidden rounded-3xl border border-cyan/20">
          <div className="relative aspect-[16/8] md:aspect-[21/8]">
            <SmartImage
              image={assets.evolution}
              alt="Cinematic artwork of the fictional path from human, to AI, to AGI, to the crowned SIERA mascot."
              fill
              sizes="(min-width: 1024px) 1100px, 100vw"
              className="object-[center_40%]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/20" />
          </div>
        </div>

        <div className="relative mt-12">
          <motion.div style={{ scaleY: scrollYProgress }} className="absolute top-0 bottom-0 left-4 w-px origin-top bg-gradient-to-b from-gold via-cyan to-violet md:hidden" />
          <motion.div style={{ scaleX: scrollYProgress }} className="absolute top-7 right-[8%] left-[8%] hidden h-px origin-left bg-gradient-to-r from-gold via-cyan to-violet md:block" />
          <ol className="relative grid gap-4 md:grid-cols-4">
            {stages.map((stage, index) => {
              const on = current === index
              return (
                <li
                  key={stage.id}
                  className={cn(
                    "glass rounded-3xl p-5 transition duration-300 md:ml-0",
                    on && "gold-ring md:scale-[1.04]",
                  )}
                  onMouseEnter={() => setHover(index)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover(index)}
                  onBlur={() => setHover(null)}
                >
                  <div className="flex items-center justify-between">
                    <span className={cn("font-display text-xs tracking-[0.22em]", on ? "text-gold-bright" : "text-cyan")}>{stage.index}</span>
                    <StageMark name={stage.name} active={on} />
                  </div>
                  <h3 className="mt-4 font-display text-2xl text-ice">{stage.name}</h3>
                  <p className="mt-2 text-ice/75">{stage.line}</p>
                </li>
              )
            })}
          </ol>
        </div>

        <div className={cn("mt-12 text-center transition", current === stages.length - 1 ? "text-gold-bright" : "text-ice")}>
          <p className="font-display text-sm tracking-[0.22em] sm:text-base">HUMAN → AI → AGI → SI</p>
          <p className="mt-3 font-display text-xl tracking-[0.08em] sm:text-3xl">THE FINAL EVOLUTION HAS BEGUN.</p>
        </div>
      </div>
    </Section>
  )
}

function StageMark({ name, active }: { name: string; active: boolean }) {
  return (
    <motion.span
      aria-hidden="true"
      animate={active ? { scale: 1.12, rotate: [0, -8, 6, 0] } : { scale: 1, rotate: 0 }}
      transition={{ duration: 0.6 }}
      className={cn("grid h-10 w-10 place-items-center rounded-full border", active ? "border-gold text-gold-bright shadow-[0_0_16px_rgba(245,185,66,0.45)]" : "border-cyan/30 text-cyan")}
    >
      {name === "SI" ? <Crystal className="h-5 w-5" reactive={false} /> : <StageGlyph name={name} />}
    </motion.span>
  )
}

function StageGlyph({ name }: { name: string }) {
  if (name === "HUMAN") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
        <circle cx="12" cy="8" r="3" />
        <path d="M6 19c1.2-3 3.2-4.5 6-4.5S16.8 16 18 19" strokeLinecap="round" />
      </svg>
    )
  }
  if (name === "AI") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="6" y="6" width="12" height="12" rx="2" />
        <path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" strokeLinecap="round" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <circle cx="7" cy="12" r="2" />
      <circle cx="17" cy="8" r="2" />
      <circle cx="16" cy="17" r="2" />
      <path d="M9 12h5M15 9.5 9.5 12M15 15.5 9.5 12.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}
