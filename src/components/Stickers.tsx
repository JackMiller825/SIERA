import { stickers } from "../data/stickers.ts"
import { Section, SectionHeading } from "./Section.tsx"
import { SmartImage } from "./SmartImage.tsx"

export function Stickers() {
  return (
    <Section id="stickers" className="overflow-hidden">
      <div className="wrap">
        <SectionHeading id="stickers-title" eyebrow="POCKET LORE" title="SIERA REACTION PACK" align="center">
          <p>Twelve ways to answer when someone is still talking about AI.</p>
        </SectionHeading>
        <div className="sticker-stage mt-10 grid grid-cols-3 gap-3 rounded-3xl border border-cyan/15 p-3 sm:grid-cols-4 sm:p-5 lg:grid-cols-6">
          {stickers.map((sticker, index) => (
            <div
              key={sticker.id}
              className="sticker-float"
              style={{ animationDelay: `${index * 0.28}s`, ["--rot" as string]: `${sticker.rotate}deg` }}
            >
              <div className="grid aspect-square place-items-center p-1 transition duration-300 hover:scale-[1.08]">
                <SmartImage image={sticker.image} alt={sticker.alt} fit="contain" maxWidth={384} sizes="(min-width: 1024px) 16vw, 30vw" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
