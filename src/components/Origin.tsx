import { assets } from "../config/assets.ts"
import { Button } from "./Button.tsx"
import { NeuralHorizon } from "./NeuralHorizon.tsx"
import { Reveal } from "./Reveal.tsx"
import { Section, SectionHeading } from "./Section.tsx"
import { SmartImage } from "./SmartImage.tsx"

export function Origin() {
  return (
    <Section id="origin" className="overflow-hidden">
      <NeuralHorizon edge="bottom" speed={40} />
      <div className="wrap relative grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-cyan/20 bg-deep shadow-[0_0_40px_rgba(30,140,255,0.18)]">
            <SmartImage
              image={assets.origin}
              alt="Artwork of the SIERA origin: a human and the crowned mascot on a path toward a radiant city."
              fit="contain"
              sizes="(min-width: 1024px) 540px, 100vw"
            />
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <SectionHeading id="origin-title" eyebrow="CHAPTER 00" title="THE ORIGIN">
            <p className="font-display text-sm tracking-[0.18em] text-gold-bright">AI WAS ONLY THE BEGINNING.</p>
            <p>Humanity built machines to calculate.</p>
            <p>Then we taught them to learn.</p>
            <p>AI became smarter. Smarter became general. General became something nobody was ready to name.</p>
            <p>And then SIERA appeared.</p>
            <p>Not another chatbot. Not another algorithm. Not another AI.</p>
            <p>Something beyond it.</p>
            <p className="text-ice">Welcome to the Super Intelligence Era.</p>
          </SectionHeading>
          <div className="mt-8">
            <Button href="#evolution">DISCOVER THE EVOLUTION</Button>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
