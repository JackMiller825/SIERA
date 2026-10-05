import { useState, type KeyboardEvent } from "react"
import { comics } from "../data/comics.ts"
import { largestVariant } from "../utils/images.ts"
import { Lightbox } from "./Lightbox.tsx"
import { SectionHeading } from "./Section.tsx"
import { SmartImage } from "./SmartImage.tsx"

export function Comics() {
  const [index, setIndex] = useState<number | null>(null)
  const items = comics.map((comic) => ({
    src: largestVariant(comic.image),
    alt: comic.alt,
    title: `${comic.id} — ${comic.title}`,
  }))

  function onGalleryKey(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return
    const buttons = [...event.currentTarget.querySelectorAll<HTMLButtonElement>("button")]
    const current = buttons.indexOf(document.activeElement as HTMLButtonElement)
    if (current < 0) return
    event.preventDefault()
    const next = event.key === "ArrowRight" ? current + 1 : current - 1
    buttons[(next + buttons.length) % buttons.length]?.focus()
  }

  return (
    <section id="comics" className="scroll-mt-24 py-16 md:py-24" aria-labelledby="comics-title">
      <div className="wrap">
        <SectionHeading id="comics-title" eyebrow="SIX TRANSMISSIONS" title="THE STORY" />
        <div
          className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-3 lg:overflow-visible"
          onKeyDown={onGalleryKey}
          aria-label="Comic gallery"
        >
          {comics.map((comic, comicIndex) => (
            <article key={comic.id} className="w-[82%] shrink-0 snap-center lg:w-auto">
              <button
                type="button"
                className="block w-full overflow-hidden rounded-3xl border border-cyan/25 bg-deep text-left transition hover:border-gold/70"
                onClick={() => setIndex(comicIndex)}
                aria-label={`Open comic ${comic.id}, ${comic.title}`}
              >
                <div className="relative aspect-[2/1]">
                  <SmartImage image={comic.image} alt="" fill fit="contain" maxWidth={640} sizes="(min-width: 1024px) 30vw, 82vw" />
                </div>
              </button>
              <h3 className="mt-3 font-display text-sm tracking-[0.08em] text-ice">
                {comic.id} — {comic.title}
              </h3>
            </article>
          ))}
        </div>
        <p className="mt-2 text-xs tracking-[0.16em] text-ice/50 lg:hidden">SWIPE THE STORY. ARROW KEYS MOVE BETWEEN PANELS.</p>
      </div>
      <Lightbox items={items} index={index} onClose={() => setIndex(null)} onIndex={setIndex} />
    </section>
  )
}
