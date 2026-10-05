import { useState } from "react"
import { project } from "../config/project.ts"
import { cn } from "../utils/cn.ts"
import { buyUrl, chartUrl, contractUrl, displayStatus, isContractAddress } from "../utils/token.ts"
import { Button } from "./Button.tsx"
import { Section, SectionHeading } from "./Section.tsx"

const fields = [
  { label: "TOKEN NAME", value: project.name },
  { label: "SYMBOL", value: project.ticker },
  { label: "CHAIN", value: project.chain },
  { label: "CONTRACT ADDRESS", value: displayStatus(project.contractAddress), copy: true },
  { label: "TOTAL SUPPLY", value: displayStatus(project.totalSupply) },
  { label: "BUY TAX", value: displayStatus(project.buyTax) },
  { label: "SELL TAX", value: displayStatus(project.sellTax) },
  { label: "LP STATUS", value: displayStatus(project.lpStatus) },
  { label: "OWNERSHIP STATUS", value: displayStatus(project.ownershipStatus) },
]

export function TokenInfo() {
  const [copied, setCopied] = useState(false)
  const addressReady = isContractAddress(project.contractAddress)

  async function copyAddress() {
    if (!addressReady) return
    await navigator.clipboard.writeText(project.contractAddress)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <Section id="token">
      <div className="wrap">
        <SectionHeading id="token-title" eyebrow={project.chain.toUpperCase()} title={project.ticker}>
          <p className="font-display text-sm tracking-[0.16em] text-gold-bright">THE TOKEN OF THE SUPER INTELLIGENCE ERA</p>
        </SectionHeading>

        <dl className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {fields.map((field) => (
            <div key={field.label} className={cn("glass rounded-2xl p-4", field.copy && addressReady && "gold-ring")}>
              <dt className="font-display text-[10px] tracking-[0.2em] text-cyan">{field.label}</dt>
              <dd className="mt-2 flex items-start justify-between gap-3 text-lg break-all text-ice">
                <span>{field.value}</span>
                {field.copy && addressReady ? (
                  <button type="button" onClick={copyAddress} className="shrink-0 rounded-full border border-gold/50 px-3 py-2 font-display text-[10px] tracking-[0.14em] text-gold-bright">
                    {copied ? "COPIED" : "COPY"}
                  </button>
                ) : null}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={buyUrl()} disabled={!buyUrl()}>
            BUY ON UNISWAP
          </Button>
          <Button href={contractUrl()} variant="ghost" disabled={!contractUrl()}>
            VIEW CONTRACT
          </Button>
          <Button href={chartUrl()} variant="ghost" disabled={!chartUrl()}>
            VIEW CHART
          </Button>
        </div>

        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-ice/70">{project.disclaimer}</p>
      </div>
    </Section>
  )
}
