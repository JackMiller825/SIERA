# Super Intelligence Era ($SIERA)

A cinematic, story-first site for the Ethereum community token **Super Intelligence Era**. The narrative is fictional:

**HUMAN → AI → AGI → SI**

The AI Era is over. The SI Era begins.

## Run locally

```bash
npm install
npm run dev
```

The dev server listens on [http://127.0.0.1:47321](http://127.0.0.1:47321).

```bash
npm run build
npm run preview
```

## Configure the token

All live values live in `src/config/project.ts`. Leave a field empty until it is real. The site renders empty token fields as **COMING SOON** and disables Uniswap, chart, and contract actions. The copy button appears only after `contractAddress` is a real `0x` address.

The public site is [https://siera.world](https://siera.world). `siteUrl` in `src/config/project.ts` is that canonical origin. A push to `main` builds the site and publishes it with GitHub Pages.

Social buttons use `twitterUrl` and `telegramUrl`.

## Replace artwork

Canonical filenames live in `src/config/assets.ts` and are served from `public/assets/`.

1. Put replacement masters in `assets-src/` using the same filenames (`siera-hero-space-bg.png`, `siera-comic-01.png`, and so on).
2. Run `npm run assets`.

That rewrites optimized WebP and AVIF variants plus `src/generated/manifest.ts`. Do not rename the public filenames. Comic, meme, and sticker slots are seeded from the current key art so the galleries render before dedicated files arrive.

## Stack

React, TypeScript, Vite, Tailwind CSS, and Framer Motion. No backend.
