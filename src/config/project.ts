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
  totalSupply: "",
  buyTax: "",
  sellTax: "",
  lpStatus: "",
  ownershipStatus: "",
  uniswapUrl: "",
  etherscanUrl: "",
  dextoolsUrl: "",
  dexscreenerUrl: "",
  twitterUrl: "",
  telegramUrl: "",
  siteUrl: "https://siera.world",
  ethereumUrl: "https://ethereum.org",
  uniswapHomeUrl: "https://uniswap.org",
  etherscanHomeUrl: "https://etherscan.io",
  dextoolsHomeUrl: "https://www.dextools.io",
  disclaimer:
    "$SIERA is a community-driven entertainment token and fictional brand concept. Digital assets are highly volatile and may lose all value. Nothing on this website is financial advice or a promise of returns. Always verify the official contract address before interacting with any token.",
} as const
