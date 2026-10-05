import { useEffect, useRef } from "react"
import { useLockBody } from "../hooks/useLockBody.ts"
import { CloseIcon } from "./Icons.tsx"

export type LightboxItem = {
  src: string
  alt: string
  title: string
}

export function Lightbox({
  items,
  index,
  onClose,
  onIndex,
}: {
  items: LightboxItem[]
  index: number | null
  onClose: () => void
  onIndex: (index: number) => void
}) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const open = index !== null
  useLockBody(open)

  useEffect(() => {
    if (!open || index === null) return
    const root = dialogRef.current
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const focusable = () =>
      root ? [...root.querySelectorAll<HTMLElement>("button, [href], [tabindex]:not([tabindex='-1'])")] : []
    focusable()[0]?.focus()

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
      if (event.key === "ArrowRight") onIndex((index + 1) % items.length)
      if (event.key === "ArrowLeft") onIndex((index - 1 + items.length) % items.length)
      if (event.key === "Tab") {
        const nodes = focusable()
        if (!nodes.length) return
        const first = nodes[0]
        const last = nodes[nodes.length - 1]
        if (!first || !last) return
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("keydown", onKey)
      previouslyFocused?.focus()
    }
  }, [open, index, items.length, onClose, onIndex])

  if (index === null) return null
  const item = items[index]
  if (!item) return null

  return (
    <div
      ref={dialogRef}
      className="fixed inset-0 z-[70] grid place-items-center bg-navy/88 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      onClick={onClose}
    >
      <div className="relative w-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
        <p id="lightbox-title" className="mb-3 text-center font-display text-xs tracking-[0.22em] text-gold-bright sm:text-sm">
          {item.title}
        </p>
        <img src={item.src} alt={item.alt} className="mx-auto max-h-[74vh] w-auto max-w-full rounded-2xl object-contain shadow-[0_0_40px_rgba(30,140,255,0.28)]" />
        <div className="mt-4 flex items-center justify-center gap-3">
          <button type="button" className="min-h-11 rounded-full border border-cyan/40 px-4 font-display text-[11px] tracking-[0.16em]" onClick={() => onIndex((index - 1 + items.length) % items.length)}>
            PREV
          </button>
          <button type="button" className="grid h-11 w-11 place-items-center rounded-full border border-gold/50" onClick={onClose} aria-label="Close gallery">
            <CloseIcon className="h-5 w-5" />
          </button>
          <button type="button" className="min-h-11 rounded-full border border-cyan/40 px-4 font-display text-[11px] tracking-[0.16em]" onClick={() => onIndex((index + 1) % items.length)}>
            NEXT
          </button>
        </div>
      </div>
    </div>
  )
}
