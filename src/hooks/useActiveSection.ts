import { useEffect, useState } from "react"

const SECTION_IDS = ["home", "origin", "evolution", "universe", "token", "how-to-buy", "media", "community"]

export function useActiveSection(): string {
  const [active, setActive] = useState("home")

  useEffect(() => {
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter((node): node is HTMLElement => Boolean(node))
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setActive(visible.target.id)
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0.15, 0.4, 0.7] },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return active
}
