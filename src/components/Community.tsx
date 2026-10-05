import { assets } from "../config/assets.ts"
import { project } from "../config/project.ts"
import { isLiveUrl } from "../utils/token.ts"
import { Button } from "./Button.tsx"
import { SectionHeading } from "./Section.tsx"
import { SmartImage } from "./SmartImage.tsx"

export function Community() {
  return (
    <section id="community" className="relative scroll-mt-24 overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0">
        <SmartImage image={assets.governance} alt="" fill sizes="100vw" className="opacity-30" />
        <div className="absolute inset-0 bg-navy/82" />
      </div>
      <div className="wrap relative grid items-center gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-3xl border border-cyan/25 shadow-[0_0_36px_rgba(30,140,255,0.2)]">
          <SmartImage
            image={assets.community}
            alt="The crowned SIERA mascot standing with a crowd of smaller mascots in a glowing city."
            fit="contain"
            sizes="(min-width: 1024px) 540px, 100vw"
          />
        </div>
        <div>
          <SectionHeading id="community-title" eyebrow="NOT A SOLO MIND" title="THE ERA BELONGS TO EVERYONE">
            <p>SIERA isn't one mind.</p>
            <p>It's a community.</p>
            <p>Creators. Meme makers. Builders. Explorers. Humans still pretending they understand AGI.</p>
            <p className="text-ice">Together, we enter the next era.</p>
          </SectionHeading>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={project.telegramUrl} disabled={!isLiveUrl(project.telegramUrl)}>
              JOIN TELEGRAM
            </Button>
            <Button href={project.twitterUrl} variant="ghost" disabled={!isLiveUrl(project.twitterUrl)}>
              FOLLOW ON X
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
