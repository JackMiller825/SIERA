import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useState } from "react"
import { navigation } from "../data/navigation.ts"
import { useActiveSection } from "../hooks/useActiveSection.ts"
import { useLockBody } from "../hooks/useLockBody.ts"
import { cn } from "../utils/cn.ts"
import { buyUrl } from "../utils/token.ts"
import { Button } from "./Button.tsx"
import { CloseIcon } from "./Icons.tsx"
import { Crystal } from "./Crystal.tsx"
import { SocialLinks } from "./SocialLinks.tsx"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection()
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])
  useLockBody(open)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const buyHref = buyUrl() || "#how-to-buy"

  return (
    <>
    <header className={cn("fixed inset-x-0 top-0 z-40 transition duration-300", scrolled || open ? "nav-glass" : "bg-transparent")}>
      <div className="flex h-16 items-center gap-3 px-4 md:h-[4.5rem] md:px-6">
        <a href="#home" className="flex items-center gap-2" aria-label="Super Intelligence Era home">
          <Crystal className="h-8 w-8" />
          <span className="leading-none">
            <span className="block font-display text-sm tracking-[0.18em] text-ice">SIERA</span>
            <span className="mt-1 block text-[10px] tracking-[0.22em] text-gold">$SIERA</span>
          </span>
        </a>

        <nav className="ml-4 hidden items-center min-[1180px]:flex" aria-label="Primary">
          {navigation.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={cn(
                "rounded-full px-2.5 py-2 font-display text-[10px] tracking-[0.14em] uppercase",
                active === item.id ? "text-gold-bright" : "text-ice/75 hover:text-ice",
              )}
              aria-current={active === item.id ? "true" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-2 min-[1180px]:flex">
          <SocialLinks />
          <Button href={buyHref}>BUY $SIERA</Button>
        </div>

        <button
          type="button"
          className="ml-auto grid h-11 w-11 place-items-center rounded-full border border-cyan/30 min-[1180px]:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon />}
        </button>
      </div>
      <motion.div style={{ scaleX }} className="h-px origin-left bg-gradient-to-r from-cyan via-gold to-cyan" />

    </header>
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-50 flex flex-col bg-navy/96 px-6 pt-6 pb-10 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-center justify-between">
              <span className="font-display tracking-[0.2em] text-ice">SIERA</span>
              <button type="button" className="grid h-11 w-11 place-items-center rounded-full border border-cyan/30" aria-label="Close menu" onClick={() => setOpen(false)}>
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>
            <nav className="mt-8 flex flex-1 flex-col gap-1 overflow-y-auto" aria-label="Mobile">
              {navigation.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * index }}
                  className="border-b border-white/10 py-3 font-display text-2xl tracking-[0.12em] text-ice uppercase"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <SocialLinks />
              <Button href={buyHref} onClick={() => setOpen(false)}>
                BUY $SIERA
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}
