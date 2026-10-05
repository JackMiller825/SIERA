import { useState } from "react"
import { memes } from "../data/memes.ts"
import { largestVariant } from "../utils/images.ts"
import { DownloadIcon, ShareIcon } from "./Icons.tsx"
import { Lightbox } from "./Lightbox.tsx"
import { SectionHeading } from "./Section.tsx"
import { SmartImage } from "./SmartImage.tsx"

export function Memes() {
  const [open, setOpen] = useState<number | null>(null)
  const [note, setNote] = useState("")
  const items = memes.map((meme) => ({
    src: largestVariant(meme.image),
    alt: meme.alt,
    title: meme.title,
  }))

  async function share(title: string) {
    const url = `${window.location.origin}${window.location.pathname}#memes`
    if (navigator.share) {
      try {
        await navigator.share({ title, url })
      } catch {
        /* user dismissed the share sheet */
      }
      return
    }
    await navigator.clipboard.writeText(url)
    setNote("Link copied.")
    window.setTimeout(() => setNote(""), 1600)
  }

  function download(src: string, id: string) {
    const anchor = document.createElement("a")
    anchor.href = src
    anchor.download = `siera-meme-${id}`
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
  }

  return (
    <section id="memes" className="scroll-mt-24 py-16 md:py-24" aria-labelledby="memes-title">
      <div className="wrap">
        <SectionHeading id="memes-title" eyebrow="LOW SIGNAL, HIGH CONFIDENCE" title="MEMES">
          <p>Intelligence evolved. The memes somehow got worse.</p>
        </SectionHeading>
        <div className="masonry mt-8">
          {memes.map((meme, index) => (
            <article key={meme.id} className="group relative overflow-hidden rounded-2xl border border-cyan/25 bg-deep transition duration-300 hover:border-gold">
              <button type="button" className="block w-full" onClick={() => setOpen(index)} aria-label={`Open meme, ${meme.title}`}>
                <div className="relative aspect-square overflow-hidden bg-navy">
                  <SmartImage
                    image={meme.image}
                    alt={meme.alt}
                    fill
                    fit="contain"
                    maxWidth={960}
                    sizes="(min-width: 1100px) 24vw, 46vw"
                    className="transition duration-300 group-hover:scale-[1.03]"
                  />
                </div>
              </button>
              <div className="meme-actions absolute top-3 right-3 flex gap-2 transition">
                <button
                  type="button"
                  className="grid h-11 w-11 place-items-center rounded-full border border-cyan/40 bg-navy/80 text-ice hover:border-gold hover:text-gold-bright"
                  aria-label={`Download ${meme.title}`}
                  onClick={() => download(meme.image.src, meme.id)}
                >
                  <DownloadIcon className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  className="grid h-11 w-11 place-items-center rounded-full border border-cyan/40 bg-navy/80 text-ice hover:border-gold hover:text-gold-bright"
                  aria-label={`Share ${meme.title}`}
                  onClick={() => share(meme.title)}
                >
                  <ShareIcon className="h-4 w-4" />
                </button>
              </div>
              <p className="px-3 py-3 font-display text-[11px] tracking-[0.14em] text-ice/80">{meme.title}</p>
            </article>
          ))}
        </div>
        <p className="mt-3 min-h-5 text-sm text-cyan" aria-live="polite">
          {note}
        </p>
      </div>
      <Lightbox items={items} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </section>
  )
}
