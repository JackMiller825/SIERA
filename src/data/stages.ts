export const stages = [
  {
    id: "human",
    index: "01",
    name: "HUMAN",
    line: "Created Intelligence.",
    detail: "A curious humanity seeks a better future.",
  },
  {
    id: "ai",
    index: "02",
    name: "AI",
    line: "Learned From Humans.",
    detail: "We learn from humans.",
  },
  {
    id: "agi",
    index: "03",
    name: "AGI",
    line: "Learned Everything.",
    detail: "We understand everything.",
  },
  {
    id: "si",
    index: "04",
    name: "SI",
    line: "Stopped Asking Permission.",
    detail: "We stop asking permission.",
  },
] as const

export type StageId = (typeof stages)[number]["id"]
