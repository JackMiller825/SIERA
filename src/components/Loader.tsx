import { useEffect, useState } from "react"
import { heroPreload } from "../config/assets.ts"
import { cn } from "../utils/cn.ts"
import { Crystal } from "./Crystal.tsx"

const stages = ["HUMAN", "AI", "AGI", "SI"]

export function Loader({ onDone }: { onDone: () => void }) {
  const [index, setIndex] = useState(0)
  const [welcome, setWelcome] = useState(false)

  useEffect(() => {
    const started = performance.now()
    let settled = false
    let welcomeTimer = 0
    const timers = stages.map((_, stageIndex) => window.setTimeout(() => setIndex(stageIndex), 160 * (stageIndex + 1)))

    const finish = () => {
      if (settled) return
      settled = true
      if (performance.now() - started < 140) {
        onDone()
        return
      }
      setWelcome(true)
      welcomeTimer = window.setTimeout(onDone, 360)
    }

    const image = new Image()
    image.src = heroPreload
    if (image.complete) finish()
    else {
      image.onload = finish
      image.onerror = finish
    }
    const cap = window.setTimeout(finish, 2000)

    return () => {
      settled = true
      timers.forEach((timer) => window.clearTimeout(timer))
      window.clearTimeout(cap)
      window.clearTimeout(welcomeTimer)
    }
  }, [onDone])

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-navy px-6" role="status" aria-live="polite">
      <div className="text-center">
        <Crystal className="mx-auto h-16 w-16" />
        <p className="mt-6 font-display text-xs tracking-[0.28em] text-ice sm:text-sm">
          {welcome ? "WELCOME TO THE ERA." : "INITIALIZING INTELLIGENCE..."}
        </p>
        <ol className="mt-5 flex flex-wrap justify-center gap-3">
          {stages.map((stage, stageIndex) => (
            <li
              key={stage}
              className={cn(
                "font-display text-[11px] tracking-[0.18em]",
                stageIndex <= index || welcome ? "text-gold-bright" : "text-ice/30",
              )}
            >
              {stage}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
