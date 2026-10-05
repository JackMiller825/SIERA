import { project } from "../config/project.ts"

export function isLiveUrl(url: string): boolean {
  const value = url.trim()
  return value.length > 0 && value !== "#"
}

export function displayStatus(value: string): string {
  const trimmed = value.trim()
  if (!trimmed || trimmed.toUpperCase() === "COMING_SOON") return "COMING SOON"
  return trimmed
}

export function isContractAddress(value: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(value.trim())
}

export function buyUrl(): string {
  return isLiveUrl(project.uniswapUrl) ? project.uniswapUrl : ""
}

export function contractUrl(): string {
  return isLiveUrl(project.etherscanUrl) ? project.etherscanUrl : ""
}

export function chartUrl(): string {
  if (isLiveUrl(project.dexscreenerUrl)) return project.dexscreenerUrl
  if (isLiveUrl(project.dextoolsUrl)) return project.dextoolsUrl
  return ""
}
