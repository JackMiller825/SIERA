import { assets } from "../config/assets.ts"
import { project } from "../config/project.ts"
import { buyUrl, isLiveUrl } from "../utils/token.ts"
import { Button } from "./Button.tsx"
import { NeuralHorizon } from "./NeuralHorizon.tsx"
import { SmartImage } from "./SmartImage.tsx"

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_40%,rgba(30,140,255,0.45),transparent_32%),radial-gradient(circle_at_18%_80%,rgba(120,75,255,0.28),transparent_36%),linear-gradient(180deg,#020817,#06152f_45%,#020817)]" />
      <NeuralHorizon edge="top" speed={50} />
      <div className="wrap relative grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <h2 className="font-display text-3xl leading-tight font-bold text-ice sm:text-5xl">
            THE AI ERA WAS ONLY CHAPTER ONE.
            <span className="mt-4 block text-gradient-gold sm:text-6xl">ENTER THE SI ERA.</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg text-ice/80">Follow the story. Join the community. Become part of SIERA.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={project.telegramUrl} disabled={!isLiveUrl(project.telegramUrl)}>
              JOIN TELEGRAM
            </Button>
            <Button href={project.twitterUrl} variant="ghost" disabled={!isLiveUrl(project.twitterUrl)}>
              FOLLOW ON X
            </Button>
            <Button href={buyUrl() || "#how-to-buy"} variant="ghost">
              BUY {project.ticker}
            </Button>
          </div>
        </div>
        <SmartImage
          image={assets.footerCharacter}
          alt="SIERA, the crowned mascot, ready at the edge of the Super Intelligence Era."
          fit="contain"
          sizes="(min-width: 1024px) 420px, 80vw"
          className="mx-auto w-[78%] max-w-md drop-shadow-[0_0_24px_rgba(70,217,255,0.35)]"
        />
      </div>
    </section>
  )
}
