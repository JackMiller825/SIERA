import { assets } from "../config/assets.ts"
import { project } from "../config/project.ts"
import { footerNavigation } from "../data/navigation.ts"
import { isLiveUrl } from "../utils/token.ts"
import { SmartImage } from "./SmartImage.tsx"

export function Footer() {
  const links = [
    { label: "Ethereum", href: project.ethereumUrl },
    { label: "Uniswap", href: isLiveUrl(project.uniswapUrl) ? project.uniswapUrl : project.uniswapHomeUrl },
    { label: "Etherscan", href: isLiveUrl(project.etherscanUrl) ? project.etherscanUrl : project.etherscanHomeUrl },
    { label: "DexTools", href: isLiveUrl(project.dextoolsUrl) ? project.dextoolsUrl : project.dextoolsHomeUrl },
    { label: "X", href: project.twitterUrl },
    { label: "Telegram", href: project.telegramUrl },
  ]

  return (
    <footer className="border-t border-cyan/15 bg-navy px-5 py-14">
      <div className="mx-auto grid w-full max-w-[1120px] gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <a href="#home" className="inline-flex items-center gap-2" aria-label="Back to top">
            <span className="block h-9 w-9 shrink-0">
              <SmartImage image={assets.coin} alt="" fit="contain" maxWidth={256} sizes="36px" className="h-9 w-9" />
            </span>
            <span>
              <span className="block font-display text-sm tracking-[0.16em]">SUPER INTELLIGENCE ERA</span>
              <span className="mt-1 block text-xs tracking-[0.2em] text-gold">{project.ticker}</span>
            </span>
          </a>
          <p className="mt-4 max-w-sm text-sm text-ice/65">An independent community token on the Ethereum network, told as a fictional universe.</p>
        </div>
        <nav aria-label="Footer">
          <p className="font-display text-[11px] tracking-[0.22em] text-cyan">NAVIGATION</p>
          <ul className="mt-4 space-y-2">
            {footerNavigation.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-sm text-ice/80 hover:text-gold-bright">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="font-display text-[11px] tracking-[0.22em] text-cyan">LINKS</p>
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
            {links.map((item) => (
              <li key={item.label}>
                {isLiveUrl(item.href) ? (
                  <a href={item.href} className="text-sm text-ice/80 hover:text-gold-bright" target="_blank" rel="noreferrer noopener">
                    {item.label}
                  </a>
                ) : (
                  <span className="text-sm text-ice/40" title="Official link coming soon">
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 w-full max-w-[1120px] border-t border-white/10 pt-6 text-sm text-ice/60">
        <p>© 2026 Super Intelligence Era.</p>
        <p className="mt-1">Community-driven fictional entertainment project.</p>
        <p className="mt-4 max-w-3xl leading-relaxed">{project.disclaimer}</p>
      </div>
    </footer>
  )
}
