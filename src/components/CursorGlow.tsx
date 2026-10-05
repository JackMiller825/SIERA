import { useEffect, useRef } from "react"

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!fine || reduce) return

    node.hidden = false
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let cx = x
    let cy = y
    let frame = 0
    let running = false

    const paintCrystals = () => {
      const rx = (x / window.innerWidth - 0.5) * 16
      const ry = (y / window.innerHeight - 0.5) * -12
      document.querySelectorAll<HTMLElement>("[data-crystal]").forEach((crystal) => {
        crystal.style.transform = `rotateX(${ry}deg) rotateY(${rx}deg)`
      })
    }

    const loop = () => {
      cx += (x - cx) * 0.22
      cy += (y - cy) * 0.22
      node.style.transform = `translate3d(${cx - 10}px, ${cy - 10}px, 0)`
      if (Math.abs(x - cx) < 0.4 && Math.abs(y - cy) < 0.4) {
        running = false
        return
      }
      frame = requestAnimationFrame(loop)
    }

    const onMove = (event: PointerEvent) => {
      x = event.clientX
      y = event.clientY
      node.style.opacity = "1"
      const target = event.target
      const interactive = target instanceof Element && Boolean(target.closest("a, button, input, label, [data-cursor='interactive']"))
      node.dataset.tone = interactive ? "gold" : "blue"
      paintCrystals()
      if (!running) {
        running = true
        frame = requestAnimationFrame(loop)
      }
    }

    const hide = () => {
      node.style.opacity = "0"
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    document.documentElement.addEventListener("mouseleave", hide)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("pointermove", onMove)
      document.documentElement.removeEventListener("mouseleave", hide)
    }
  }, [])

  return (
    <div
      ref={ref}
      hidden
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-30 h-5 w-5 rounded-full bg-cyan opacity-0 mix-blend-screen shadow-[0_0_18px_6px_rgba(70,217,255,0.9)] data-[tone=gold]:bg-gold-bright data-[tone=gold]:shadow-[0_0_18px_6px_rgba(255,215,106,0.95)]"
    />
  )
}
