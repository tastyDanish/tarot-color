import type { TarotCardStats } from "@/stores/use-collection-store";
import type { AxisStrategy, StarEncoding } from "./types";

// ── Helpers ───────────────────────────────────────────────────────────────────

function linearNorm(
  cards: TarotCardStats[],
  fn: (c: TarotCardStats, i: number) => number,
): Map<string, number> {
  const vals = cards.map(fn);
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  return new Map(
    cards.map((c, i) => [
      c.name,
      max === min ? 0.5 : (vals[i] - min) / (max - min),
    ]),
  );
}

function histogramBuckets(
  cards: TarotCardStats[],
  fn: (c: TarotCardStats) => number,
  buckets = 4,
): Map<string, number> {
  const vals = cards.map(fn);
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const counts = Array(buckets).fill(0) as number[];

  const assigned = cards.map((c) => {
    const v = fn(c);
    const b = Math.min(
      buckets - 1,
      Math.floor(((v - min) / (max - min + 0.0001)) * buckets),
    );
    const slot = counts[b]++;
    return { name: c.name, bucket: b, slot };
  });

  return new Map(
    assigned.map(({ name, bucket, slot }) => [
      name,
      (bucket + 0.5) / buckets +
      (slot - (counts[bucket] - 1) / 2) * 0.04,
    ]),
  );
}

// Simple hash to get a stable float from a string
function nameHash(name: string): number {
  let h = 0;
  for (let i = 0; i < name.length; i++) {
    h = (Math.imul(31, h) + name.charCodeAt(i)) | 0;
  }
  return (h >>> 0) / 0xffffffff; // 0–1
}

// ── Custom hand-placed layouts ────────────────────────────────────────────────
// Edit these to place cards wherever you want (0–1 range)

const CUSTOM_X: Record<string, number> = {
  "The Fool": 0.1,
  "The High Priestess": 0.35,
  "The Tower": 0.6,
  "The Star": 0.82,
  "The World": 0.95,
};

const CUSTOM_Y: Record<string, number> = {
  "The Fool": 0.8,
  "The High Priestess": 0.3,
  "The Tower": 0.55,
  "The Star": 0.2,
  "The World": 0.65,
};

// ── Strategy definitions ──────────────────────────────────────────────────────

export function makePrng(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function hashStr(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

export const X_STRATEGIES: AxisStrategy[] = [
  {
    id: "order",
    label: "card order",
    compute: (cards, seed = 42) => {
      const sorted = [...cards].sort((a, b) => a.order - b.order);

      // Fisher-Yates shuffle with seeded PRNG
      const rand = makePrng(seed);
      for (let i = sorted.length - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        [sorted[i], sorted[j]] = [sorted[j], sorted[i]];
      }

      const map = new Map<string, number>();
      sorted.forEach((card, i) => {
        const base = sorted.length === 1 ? 0.5 : i / (sorted.length - 1);
        const jitter = (rand() - 0.5) * 0.04;
        map.set(card.name, Math.max(0, Math.min(1, base + jitter)));
      });
      return map;
    },
  },
  {
    id: "seen",
    label: "Times seen",
    compute: (cards) => linearNorm(cards, (c) => c.seen),
  },
  {
    id: "hist-seen",
    label: "Seen (histogram)",
    hasGrid: true,
    compute: (cards) => histogramBuckets(cards, (c) => c.seen),
  },
  {
    id: "hist-foil",
    label: "Foil (histogram)",
    hasGrid: true,
    compute: (cards) => histogramBuckets(cards, (c) => c.foil),
  },
  {
    id: "custom",
    label: "Hand-placed",
    compute: (cards) =>
      new Map(cards.map((c) => [c.name, CUSTOM_X[c.name] ?? 0.5])),
  },
];

export const Y_STRATEGIES: AxisStrategy[] = [
  {
    id: "reversed",
    label: "Reversed ratio",
    compute: (cards) => linearNorm(cards, (c) => c.reversed / (c.seen || 1)),
  },
  {
    id: "seen",
    label: "seen count",
    compute: (cards) => {
      const base = linearNorm(cards, (c, i) => i % 2 === 0 ? -c.seen : c.seen);
      const map = new Map<string, number>();
      for (const card of cards) {
        const hash = nameHash(card.name);
        const jitter = (hash - 0.5) * 2 * 0.1;
        map.set(
          card.name,
          Math.max(0, Math.min(1, (base.get(card.name) ?? 0.5) + jitter)),
        );
      }
      return map;
    },
  },
  {
    id: "deprived",
    label: "Deprived",
    compute: (cards) => linearNorm(cards, (c) => c.deprived),
  },
  {
    id: "hist-foil",
    label: "Foil (histogram)",
    hasGrid: true,
    compute: (cards) => histogramBuckets(cards, (c) => c.foil),
  },
  {
    id: "custom",
    label: "Hand-placed",
    compute: (cards) =>
      new Map(cards.map((c) => [c.name, CUSTOM_Y[c.name] ?? 0.5])),
  },
];

// ── Star visual encoder ───────────────────────────────────────────────────────

export type StarRole = "reversed" | "foil" | "deprived" | "default";

const uniqueMax = (
  cards: TarotCardStats[],
  key: keyof TarotCardStats,
): number | null => {
  const vals = cards.map((c) => c[key] as number);
  const max = Math.max(...vals);
  if (max === 0) return null;
  const winners = vals.filter((v) => v === max);
  return winners.length === 1 ? max : null;
};

export const getStarRole = (
  card: TarotCardStats,
  allCards: TarotCardStats[],
): StarRole => {
  const maxReversed = uniqueMax(allCards, "reversed");
  const maxFoil = uniqueMax(allCards, "foil");
  const maxDeprived = uniqueMax(allCards, "deprived");

  if (maxReversed !== null && card.reversed === maxReversed) return "reversed";
  if (maxFoil !== null && card.foil === maxFoil) return "foil";
  if (maxDeprived !== null && card.deprived === maxDeprived) return "deprived";
  return "default";
};

export const encodeCard = (
  card: TarotCardStats,
  allCards: TarotCardStats[],
): StarEncoding => {
  const maxSeen = Math.max(...allCards.map((c) => c.seen), 1);
  const seenRatio = card.seen / maxSeen;
  const role = getStarRole(card, allCards);

  const roleColors: Record<StarRole, { hue: number; saturation: number }> = {
    reversed: { hue: 5, saturation: 100 }, // red
    foil: { hue: 45, saturation: 90 }, // gold
    deprived: { hue: 220, saturation: 10 }, // grey-blue
    default: { hue: 220, saturation: 50 }, // blue
  };

  return {
    r: 9 + Math.pow(seenRatio, 2) * 20,
    opacity: 0.45 + seenRatio * 0.55,
    filled: card.collected,
    ...roleColors[role],
  };
};

// ── Test data ─────────────────────────────────────────────────────────────────

export const TEST_CARDS: TarotCardStats[] = [
  {
    name: "The Fool",
    image: "",
    collected: true,
    seen: 3,
    foil: 3,
    deprived: 1,
    reversed: 8,
    order: 0,
    words: [],
  },
  {
    name: "The High Priestess",
    image: "",
    collected: true,
    seen: 4,
    foil: 1,
    deprived: 0,
    reversed: 4,
    order: 2,
    words: [],
  },
  {
    name: "The Tower",
    image: "",
    collected: true,
    seen: 2,
    foil: 0,
    deprived: 3,
    reversed: 5,
    order: 16,
    words: [],
  },
  {
    name: "The Star",
    image: "",
    collected: false,
    seen: 2,
    foil: 0,
    deprived: 2,
    reversed: 0,
    order: 17,
    words: [],
  },
  {
    name: "The World",
    image: "",
    collected: true,
    seen: 4,
    foil: 5,
    deprived: 0,
    reversed: 2,
    order: 21,
    words: [],
  },
];
