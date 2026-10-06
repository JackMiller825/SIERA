/**
 * Central project configuration.
 * Unknown token fields stay empty. The site shows them as "COMING SOON"
 * and keeps swap, chart, and contract actions disabled until real values exist.
 * siteUrl is the public canonical origin.
 */
export const project = {
  name: "Super Intelligence Era",
  ticker: "$SIERA",
  chain: "Ethereum",
  contractAddress: "",
  totalSupply: "1,000,000,000",
  buyTax: "0%",
  sellTax: "0%",
  lpStatus: "BURNT",
  ownershipStatus: "RENOUNCED",
  uniswapUrl: "",
  etherscanUrl: "",
  dextoolsUrl: "",
  dexscreenerUrl: "",
  twitterUrl: "https://x.com/siera_eth",
  telegramUrl: "https://t.me/siera_eth",
  siteUrl: "https://siera.world",
  ethereumUrl: "https://ethereum.org",
  uniswapHomeUrl: "https://uniswap.org",
  etherscanHomeUrl: "https://etherscan.io",
  dextoolsHomeUrl: "https://www.dextools.io",
  disclaimer: "$SIERA is a community-driven entertainment token and fictional brand concept.",
} as const
