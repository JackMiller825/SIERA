import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { assets } from "../config/assets.ts"
import { SmartImage } from "./SmartImage.tsx"

export function EraGate() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const dark = useTransform(scrollYProgress, [0.12, 0.58], [0.82, 0.12])
  const wash = useTransform(scrollYProgress, [0.2, 0.7], [0, 0.62])
  const scale = useTransform(scrollYProgress, [0.05, 0.7], [1.12, 1])

  return (
    <section ref={ref} id="era" className="relative h-[165vh] scroll-mt-24 md:h-[190vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div style={{ scale }} className="absolute inset-0">
          <SmartImage image={assets.eraGate} alt="" fill sizes="100vw" className="object-center" />
        </motion.div>
        <motion.div style={{ opacity: dark }} className="absolute inset-0 bg-navy" />
        <motion.div
          style={{ opacity: wash }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,215,106,0.55),transparent_28%),radial-gradient(circle_at_50%_60%,rgba(30,140,255,0.55),transparent_42%)]"
        />
        <div className="portal pointer-events-none absolute inset-[10%] md:inset-[18%]" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-cyan to-transparent opacity-80" aria-hidden="true" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <p className="font-display text-[11px] tracking-[0.36em] text-cyan">THE GATE</p>
          <h2 className="mt-4 max-w-4xl font-display text-5xl leading-none font-bold text-ice sm:text-7xl">ENTER THE ERA</h2>
          <p className="mt-6 max-w-xl text-lg text-ice/85">Beyond AI lies an intelligence civilization without boundaries.</p>
          <p className="mt-6 font-display text-xs tracking-[0.28em] text-gold-bright">SCROLL TO ENTER.</p>
        </div>
      </div>
    </section>
  )
}
