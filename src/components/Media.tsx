import { assets } from "../config/assets.ts"
import { project } from "../config/project.ts"
import { isLiveUrl } from "../utils/token.ts"
import { Button } from "./Button.tsx"
import { SectionHeading } from "./Section.tsx"
import { SmartImage } from "./SmartImage.tsx"

const cards = [
  {
    title: "MEMES",
    copy: "Intelligence evolved. The memes somehow got worse.",
    href: "#memes",
    label: "VIEW MEMES",
    image: assets.mediaMemes,
    alt: "SIERA roadmap artwork leading into the meme archives.",
  },
  {
    title: "THE STORY",
    copy: "Follow SIERA from the final days of AI into the beginning of Super Intelligence.",
    href: "#comics",
    label: "READ COMICS",
    image: assets.mediaStory,
    alt: "SIERA roadmap from humanity through AI, AGI, and SI toward a brighter era.",
  },
  {
    title: "TRANSMISSIONS",
    copy: "Updates, announcements and signals from beyond the AI Era.",
    href: "#updates",
    label: "VIEW UPDATES",
    image: assets.mediaUpdates,
    alt: "Night roadmap of the SIERA universe, used as the cover for transmissions.",
  },
]

export function Media() {
  return (
    <section id="media" className="relative scroll-mt-24 py-20 md:py-28">
      <div className="wrap">
        <SectionHeading id="media-title" eyebrow="THE ARCHIVES" title="TRANSMISSIONS FROM THE SI ERA" />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {cards.map((card) => (
            <article key={card.title} className="glass overflow-hidden rounded-3xl transition duration-300 hover:-translate-y-1 hover:border-gold/50">
              <div className="relative aspect-[21/10] bg-navy">
                <SmartImage image={card.image} alt={card.alt} fill fit="contain" sizes="(min-width: 1024px) 360px, 100vw" />
              </div>
              <div className="p-5">
                <h3 className="font-display text-2xl text-ice">{card.title}</h3>
                <p className="mt-3 min-h-16 text-ice/75">{card.copy}</p>
                <div className="mt-5">
                  <Button href={card.href} variant="ghost">
                    {card.label}
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div id="updates" className="gold-ring mt-8 scroll-mt-28 rounded-3xl bg-deep/70 p-6 md:p-8">
          <h3 className="font-display text-2xl text-ice">SIGNALS</h3>
          <p className="mt-3 max-w-2xl text-ice/75">
            Official updates are posted on the project channels. If a message is not on those channels, it is not from SIERA.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button href={project.twitterUrl} variant="ghost" disabled={!isLiveUrl(project.twitterUrl)}>
              FOLLOW ON X
            </Button>
            <Button href={project.telegramUrl} disabled={!isLiveUrl(project.telegramUrl)}>
              JOIN TELEGRAM
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
