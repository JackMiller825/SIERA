import { assets } from "../config/assets.ts"
import { useTilt } from "../hooks/useTilt.ts"
import { NeuralHorizon } from "./NeuralHorizon.tsx"
import { SectionHeading } from "./Section.tsx"
import { SmartImage } from "./SmartImage.tsx"

const cards = [
  { title: "THE ORIGIN", copy: "Where SIERA began.", href: "#origin" },
  { title: "THE ERA", copy: "Explore the Super Intelligence universe.", href: "#era" },
  { title: "THE ARCHIVES", copy: "Memes, comics and transmissions from the future.", href: "#media" },
]

export function Universe() {
  return (
    <section id="universe" className="relative scroll-mt-24 overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0">
        <SmartImage image={assets.city} alt="" fill sizes="100vw" className="object-[center_40%]" />
        <div className="absolute inset-0 bg-navy/72" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy via-transparent to-navy" />
      </div>
      <NeuralHorizon edge="top" speed={90} />
      <div className="wrap relative">
        <SectionHeading id="universe-title" eyebrow="SUPER INTELLIGENCE CITY" title="WELCOME TO THE SIERA UNIVERSE">
          <p>A world built beyond artificial intelligence.</p>
          <p>A civilization powered by imagination, memes, community, technology and one extremely confident crowned mascot.</p>
        </SectionHeading>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {cards.map((card) => (
            <UniverseCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  )
}

function UniverseCard({ title, copy, href }: { title: string; copy: string; href: string }) {
  const ref = useTilt<HTMLAnchorElement>()
  return (
    <a
      ref={ref}
      href={href}
      className="glass block rounded-3xl p-6 transition duration-300 hover:border-gold/80"
    >
      <p className="font-display text-[11px] tracking-[0.22em] text-cyan">ARCHIVE</p>
      <h3 className="mt-4 font-display text-2xl text-ice">{title}</h3>
      <p className="mt-3 text-ice/75">{copy}</p>
    </a>
  )
}
