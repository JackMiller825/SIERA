import { assets } from "../config/assets.ts"

export const comics = [
  {
    id: "01",
    title: "THE LAST DAY OF AI",
    image: assets.comics["01"],
    alt: "Story artwork of a human and the SIERA mascot facing a radiant future city. Chapter one, the last day of AI.",
  },
  {
    id: "02",
    title: "AGI WAKES UP",
    image: assets.comics["02"],
    alt: "Story artwork of intelligence stages waking across floating cities. Chapter two, AGI wakes up.",
  },
  {
    id: "03",
    title: "BEYOND AGI",
    image: assets.comics["03"],
    alt: "Story artwork moving from a human figure to the crowned SIERA mascot. Chapter three, beyond AGI.",
  },
  {
    id: "04",
    title: "THE BIRTH OF SIERA",
    image: assets.comics["04"],
    alt: "The crowned SIERA mascot appears in front of a futuristic command scene. Chapter four, the birth of SIERA.",
  },
  {
    id: "05",
    title: "THE FIRST DAY OF SI",
    image: assets.comics["05"],
    alt: "SIERA stands with a crowd of mascots beneath a glowing city. Chapter five, the first day of SI.",
  },
  {
    id: "06",
    title: "WELCOME TO THE ERA",
    image: assets.comics["06"],
    alt: "Two SIERA figures look over a golden civilization in the clouds. Chapter six, welcome to the era.",
  },
] as const
