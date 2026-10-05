import { motion } from "framer-motion"
import { assets } from "../config/assets.ts"
import { project } from "../config/project.ts"
import { Button } from "./Button.tsx"
import { Particles, Starfield } from "./Starfield.tsx"
import { SmartImage } from "./SmartImage.tsx"

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
}

export function Hero() {
  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0">
        <div className="kenburns absolute inset-0">
          <SmartImage
            image={assets.heroSpace}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-[center_40%]"
          />
        </div>
        <Starfield />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/88 to-navy/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/50" />
        <Particles />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1280px] flex-col px-5 pt-24 pb-16 lg:flex-row lg:items-center lg:px-10">
        <motion.div className="z-10 w-full min-w-0 lg:w-[54%]" variants={container} initial="hidden" animate="show">
          <motion.p variants={item} className="font-display text-[11px] tracking-[0.42em] text-cyan">
            WELCOME TO
          </motion.p>
          <motion.h1 variants={item} className="mt-4 max-w-full font-display text-[clamp(2.55rem,4.3vw,4.35rem)] leading-[0.9] font-extrabold tracking-tight">
            <span className="block">SUPER</span>
            <span className="block text-gradient-cyan">INTELLIGENCE</span>
            <span className="block">ERA</span>
          </motion.h1>
          <motion.p variants={item} className="mt-4 font-display text-4xl text-gradient-gold sm:text-5xl">
            {project.ticker}
          </motion.p>
          <motion.div variants={item} className="mt-6 max-w-md space-y-2 text-base leading-relaxed text-ice/85 sm:text-lg">
            <p>AI changed the world.</p>
            <p>AGI learned everything.</p>
            <p>Then intelligence evolved one more time.</p>
            <p className="pt-1 text-ice">The AI Era is over.</p>
            <p className="font-display text-sm tracking-[0.16em] text-gold-bright">The SI Era begins.</p>
          </motion.div>
          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
            <Button href="#origin">ENTER THE ERA</Button>
            <Button href="#how-to-buy" variant="ghost">
              BUY {project.ticker}
            </Button>
          </motion.div>
          <motion.p variants={item} className="mt-8 font-display text-xs tracking-[0.2em] text-ice/80 sm:text-sm">
            HUMAN <span className="text-cyan">→</span> AI <span className="text-cyan">→</span> AGI <span className="text-gold">→</span>{" "}
            <span className="text-gold-bright">SI</span>
          </motion.p>
        </motion.div>

        <motion.div
          className="pointer-events-none relative mx-auto mt-4 w-[88%] max-w-md lg:absolute lg:right-[2%] lg:bottom-0 lg:mt-0 lg:h-[88%] lg:w-[46%] lg:max-w-none"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute inset-[12%] -z-10 rounded-full bg-electric/25 blur-3xl" aria-hidden="true" />
          <SmartImage
            image={assets.heroCharacter}
            alt="SIERA, a white crowned mascot with a blue visor, royal blue and gold clothing, and a glowing blue crystal."
            priority
            fit="contain"
            sizes="(min-width: 1024px) 50vw, 88vw"
            className="mx-auto max-h-[58vh] w-auto max-w-full object-bottom drop-shadow-[0_18px_30px_rgba(30,140,255,0.35)] lg:max-h-[82vh]"
          />
        </motion.div>
      </div>

      <a href="#origin" className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] tracking-[0.32em] text-ice/70">
        <span>SCROLL</span>
        <span className="scroll-mouse" aria-hidden="true" />
      </a>
    </section>
  )
}
