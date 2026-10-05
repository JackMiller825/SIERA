import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { assets } from "../config/assets.ts"
import { useMediaQuery } from "../hooks/useMediaQuery.ts"
import { cn } from "../utils/cn.ts"
import { SmartImage } from "./SmartImage.tsx"

export function NeuralHorizon({ edge = "top", speed = 70 }: { edge?: "top" | "bottom"; speed?: number }) {
  const reduce = useReducedMotion()
  const desktop = useMediaQuery("(min-width: 1024px)")
  const { scrollY } = useScroll()
  const distance = desktop && !reduce ? speed : 0
  const y = useTransform(scrollY, [0, 2200], [0, edge === "top" ? distance : -distance * 1.4])
  const image = edge === "top" ? assets.neuralTop : assets.neuralBottom

  return (
    <motion.div
      style={{ y }}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-x-0 z-0 h-28 opacity-40 md:h-44", edge === "top" ? "-top-6" : "-bottom-6")}
    >
      <div className="relative h-full">
        <SmartImage image={image} alt="" fill sizes="100vw" />
      </div>
    </motion.div>
  )
}
