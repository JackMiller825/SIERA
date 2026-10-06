import { useState } from "react"
import { assets } from "../config/assets.ts"
import { stages } from "../data/stages.ts"
import { cn } from "../utils/cn.ts"
import { Crystal } from "./Crystal.tsx"
import { Section, SectionHeading } from "./Section.tsx"
import { SmartImage } from "./SmartImage.tsx"

const environments = [
  "bg-[radial-gradient(circle_at_28%_18%,rgba(245,185,66,0.5),transparent_36%),linear-gradient(180deg,#4a2d12,#120c08_58%,#020817)]",
  "bg-[radial-gradient(circle_at_72%_28%,rgba(30,140,255,0.62),transparent_42%),linear-gradient(180deg,#071a3a,#020817)]",
  "bg-[radial-gradient(circle_at_50%_36%,rgba(120,75,255,0.7),transparent_46%),linear-gradient(180deg,#1a0836,#020817)]",
  "bg-[radial-gradient(circle_at_38%_24%,rgba(255,215,106,0.48),transparent_26%),radial-gradient(circle_at_70%_62%,rgba(30,140,255,0.55),transparent_40%),linear-gradient(180deg,#071833,#020817)]",
]

export function IntelligenceSlider() {
  const [value, setValue] = useState(0)
  const stage = stages[value] ?? stages[0]

  return (
    <Section id="level" className="overflow-hidden bg-deep/35">
      <div className="wrap">
        <SectionHeading id="level-title" eyebrow="ENTERTAINMENT ONLY" title="CURRENT INTELLIGENCE LEVEL" align="center" />

        <div className="relative mx-auto mt-10 max-w-4xl overflow-hidden rounded-[2rem] border border-cyan/25 shadow-[0_0_40px_rgba(30,140,255,0.16)]">
          {environments.map((environment, index) => (
            <div key={environment} className={cn("absolute inset-0 transition-opacity duration-700", environment, index === value ? "opacity-100" : "opacity-0")} />
          ))}
          <div className="relative z-10 grid gap-6 px-5 py-8 sm:px-10 md:grid-cols-[1fr_0.8fr] md:items-center">
            <div>
              <p className="font-display text-xs tracking-[0.28em] text-cyan">LEVEL {stage.index}</p>
              <p className="mt-3 font-display text-5xl text-ice">{stage.name}</p>
              <p className="mt-3 max-w-sm text-lg text-ice/85">{stage.detail}</p>
              <div aria-live="polite" className="mt-6 min-h-16">
                {value === stages.length - 1 ? (
                  <p className="font-display text-lg leading-tight text-gradient-gold sm:text-2xl">
                    CONGRATULATIONS.
                    <span className="mt-1 block">YOU HAVE STOPPED ASKING PERMISSION.</span>
                  </p>
                ) : (
                  <p className="text-sm text-ice/70">Keep going. Super is further along the slider.</p>
                )}
              </div>
            </div>
            <div className="relative">
              <Crystal className="absolute top-0 right-6 h-10 w-10" />
              <SmartImage
                image={assets.heroCharacter}
                alt=""
                fit="contain"
                sizes="280px"
                maxWidth={640}
                className={cn(
                  "mx-auto w-48 sm:w-60",
                  value === 0 && "drop-shadow-[0_16px_20px_rgba(245,185,66,0.35)]",
                  value === 1 && "drop-shadow-[0_0_18px_rgba(70,217,255,0.75)]",
                  value === 2 && "drop-shadow-[0_0_18px_rgba(120,75,255,0.8)]",
                  value === 3 && "drop-shadow-[0_0_16px_rgba(255,215,106,0.9)]",
                )}
              />
            </div>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-3xl">
          <label htmlFor="intelligence-level" className="sr-only">
            Current intelligence level
          </label>
          <input
            id="intelligence-level"
            className="intel-range"
            type="range"
            min={0}
            max={3}
            step={1}
            value={value}
            aria-valuemin={0}
            aria-valuemax={3}
            aria-valuenow={value}
            aria-valuetext={stage.name}
            onChange={(event) => setValue(Number(event.target.value))}
          />
          <div className="mt-4 grid grid-cols-4 gap-2">
            {stages.map((item, index) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={value === index}
                onClick={() => setValue(index)}
                className={cn(
                  "min-h-11 rounded-2xl border px-1 py-2 font-display text-[10px] tracking-[0.12em] sm:text-xs",
                  value === index ? "border-gold bg-gold/15 text-gold-bright" : "border-cyan/25 text-ice/70",
                )}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
