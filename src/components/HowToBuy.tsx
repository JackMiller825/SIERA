import { assets } from "../config/assets.ts"
import { project } from "../config/project.ts"
import { buySteps } from "../data/steps.ts"
import { buyUrl } from "../utils/token.ts"
import { Button } from "./Button.tsx"
import { Section, SectionHeading } from "./Section.tsx"
import { SmartImage } from "./SmartImage.tsx"

export function HowToBuy() {
  return (
    <Section id="how-to-buy" className="bg-deep/30">
      <div className="wrap grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <SectionHeading id="buy-title" eyebrow="ENTER THE ERA" title="HOW TO GET $SIERA" />
          <ol className="mt-8 space-y-3">
            {buySteps.map((step) => (
              <li key={step.index} className="glass flex gap-4 rounded-2xl p-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/40 font-display text-xs text-gold-bright">
                  {step.index}
                </span>
                <span>
                  <span className="block font-display text-sm tracking-[0.12em] text-ice">{step.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-ice/75">{step.copy}</span>
                </span>
              </li>
            ))}
          </ol>
          <div className="mt-6">
            <Button href={buyUrl() || "#token"} disabled={!buyUrl()}>
              BUY {project.ticker}
            </Button>
          </div>
          <p className="mt-5 max-w-xl rounded-2xl border border-gold/30 bg-gold/10 px-4 py-3 text-sm leading-relaxed text-gold-bright">
            Always confirm the official {project.ticker} contract address from this website before swapping.
          </p>
        </div>
        <div className="overflow-hidden rounded-3xl border border-cyan/20 bg-deep shadow-[0_0_36px_rgba(30,140,255,0.16)]">
          <SmartImage
            image={assets.quickStart}
            alt="The SIERA mascot presenting a four-step illustration for getting the token."
            fit="contain"
            sizes="(min-width: 1024px) 520px, 100vw"
          />
        </div>
      </div>
    </Section>
  )
}
