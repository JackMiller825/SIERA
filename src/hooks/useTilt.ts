import { useEffect, useRef } from "react"

export function useTilt<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!fine || reduce) return

    const onMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect()
      const px = (event.clientX - rect.left) / rect.width - 0.5
      const py = (event.clientY - rect.top) / rect.height - 0.5
      element.style.transform = `perspective(900px) rotateY(${px * 8}deg) rotateX(${-py * 8}deg) translateY(-4px)`
    }
    const reset = () => {
      element.style.transform = ""
    }

    element.addEventListener("pointermove", onMove)
    element.addEventListener("pointerleave", reset)
    return () => {
      element.removeEventListener("pointermove", onMove)
      element.removeEventListener("pointerleave", reset)
    }
  }, [])

  return ref
}
