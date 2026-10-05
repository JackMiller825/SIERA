import { MotionConfig } from "framer-motion"
import { useCallback, useState } from "react"
import { AILab } from "./components/AILab.tsx"
import { Comics } from "./components/Comics.tsx"
import { Community } from "./components/Community.tsx"
import { CursorGlow } from "./components/CursorGlow.tsx"
import { EraGate } from "./components/EraGate.tsx"
import { Evolution } from "./components/Evolution.tsx"
import { FinalCTA } from "./components/FinalCTA.tsx"
import { Footer } from "./components/Footer.tsx"
import { Hero } from "./components/Hero.tsx"
import { HowToBuy } from "./components/HowToBuy.tsx"
import { IntelligenceSlider } from "./components/IntelligenceSlider.tsx"
import { Loader } from "./components/Loader.tsx"
import { Media } from "./components/Media.tsx"
import { Memes } from "./components/Memes.tsx"
import { Navbar } from "./components/Navbar.tsx"
import { Origin } from "./components/Origin.tsx"
import { Stickers } from "./components/Stickers.tsx"
import { TokenInfo } from "./components/TokenInfo.tsx"
import { Universe } from "./components/Universe.tsx"
import { heroPreload } from "./config/assets.ts"

function heroReady() {
  const image = new Image()
  image.src = heroPreload
  return image.complete && image.naturalWidth > 0
}

export default function App() {
  const [booting, setBooting] = useState(() => !heroReady())
  const finishBoot = useCallback(() => setBooting(false), [])

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[90] focus:rounded-full focus:bg-gold focus:px-4 focus:py-3 focus:font-display focus:text-xs focus:tracking-[0.14em] focus:text-navy"
      >
        Skip to content
      </a>
      {booting ? <Loader onDone={finishBoot} /> : null}
      <CursorGlow />
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Origin />
        <Evolution />
        <EraGate />
        <Universe />
        <AILab />
        <IntelligenceSlider />
        <TokenInfo />
        <HowToBuy />
        <Media />
        <Comics />
        <Memes />
        <Stickers />
        <Community />
        <FinalCTA />
      </main>
      <Footer />
    </MotionConfig>
  )
}
