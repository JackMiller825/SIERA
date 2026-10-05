import { assets } from "../config/assets.ts"
import { Reveal } from "./Reveal.tsx"
import { Section, SectionHeading } from "./Section.tsx"
import { SmartImage } from "./SmartImage.tsx"

export function AILab() {
  return (
    <Section id="lab" className="overflow-hidden">
      <div className="wrap grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <SectionHeading id="lab-title" eyebrow="BEFORE THE CROWN" title="THE LAB">
            <p className="font-display text-sm tracking-[0.16em] text-gold-bright">BEFORE SI, THERE WAS AI.</p>
            <p>Humanity spent decades teaching machines how to think.</p>
            <p>Millions of models. Billions of parameters. Countless experiments.</p>
            <p>And then one experiment looked back.</p>
          </SectionHeading>
          <blockquote className="mt-8 border-l-2 border-gold pl-4">
            <p className="text-ice/80">The scientists called it a breakthrough.</p>
            <p className="mt-1 font-display text-sm tracking-[0.12em] text-gold-bright">SIERA called it Tuesday.</p>
          </blockquote>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="overflow-hidden rounded-3xl border border-cyan/20 bg-deep shadow-[0_0_36px_rgba(120,75,255,0.18)]">
            <SmartImage
              image={assets.aiLab}
              alt="SIERA roadmap of the path from humanity through AI and AGI into the brighter era."
              fit="contain"
              sizes="(min-width: 1024px) 540px, 100vw"
            />
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
