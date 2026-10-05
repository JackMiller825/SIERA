import { useEffect, useRef } from "react"

type Star = {
  x: number
  y: number
  r: number
  p: number
  s: number
  gold: boolean
}

export function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const context = canvas.getContext("2d")
    if (!context) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const stars: Star[] = Array.from({ length: 80 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.3 + 0.25,
      p: Math.random() * Math.PI * 2,
      s: Math.random() * 0.6 + 0.2,
      gold: Math.random() > 0.84,
    }))

    let frame = 0
    let running = true
    let dpr = 1

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.max(1, canvas.clientWidth * dpr)
      canvas.height = Math.max(1, canvas.clientHeight * dpr)
    }
    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(canvas)

    const draw = (time: number) => {
      if (!running) return
      context.clearRect(0, 0, canvas.width, canvas.height)
      for (const star of stars) {
        const alpha = reduce ? 0.7 : 0.3 + (Math.sin(time * 0.001 * star.s + star.p) + 1) * 0.32
        context.beginPath()
        context.fillStyle = star.gold ? `rgba(255, 215, 106, ${alpha})` : `rgba(190, 226, 255, ${alpha})`
        context.arc(star.x * canvas.width, star.y * canvas.height, star.r * dpr, 0, Math.PI * 2)
        context.fill()
      }
      if (!reduce) frame = requestAnimationFrame(draw)
    }

    const start = () => {
      if (running) return
      running = true
      frame = requestAnimationFrame(draw)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(frame)
    }

    const visibility = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) start()
      else stop()
    })
    visibility.observe(canvas)
    const onHide = () => {
      if (document.hidden) stop()
      else start()
    }
    document.addEventListener("visibilitychange", onHide)
    frame = requestAnimationFrame(draw)

    return () => {
      stop()
      observer.disconnect()
      visibility.disconnect()
      document.removeEventListener("visibilitychange", onHide)
    }
  }, [])

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden="true" />
}

const particles = [
  { left: "8%", top: "18%", size: 3, color: "#46D9FF", delay: "0s", duration: "11s" },
  { left: "18%", top: "62%", size: 5, color: "#FFD76A", delay: "1.2s", duration: "13s" },
  { left: "72%", top: "16%", size: 4, color: "#1E8CFF", delay: "0.4s", duration: "9s" },
  { left: "84%", top: "38%", size: 3, color: "#FFD76A", delay: "2s", duration: "12s" },
  { left: "63%", top: "72%", size: 6, color: "#46D9FF", delay: "0.8s", duration: "15s" },
  { left: "42%", top: "28%", size: 3, color: "#F5B942", delay: "1.6s", duration: "10s" },
  { left: "30%", top: "78%", size: 4, color: "#784BFF", delay: "0.2s", duration: "14s" },
  { left: "90%", top: "74%", size: 3, color: "#46D9FF", delay: "2.4s", duration: "11s" },
  { left: "52%", top: "12%", size: 2, color: "#F8FBFF", delay: "1s", duration: "8s" },
  { left: "14%", top: "40%", size: 4, color: "#1E8CFF", delay: "1.8s", duration: "12s" },
]

export function Particles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((particle) => (
        <span
          key={`${particle.left}-${particle.top}`}
          className="particle"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            background: particle.color,
            boxShadow: `0 0 12px ${particle.color}`,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
          }}
        />
      ))}
    </div>
  )
}
