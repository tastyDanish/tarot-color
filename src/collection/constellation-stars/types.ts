import type { TarotCardStats } from "@/stores/use-collection-store";

export type AxisStrategy = {
  id: string;
  label: string;
  compute: (cards: TarotCardStats[], seed: number) => Map<string, number>;
  hasGrid?: boolean;
};

export type StarEncoding = {
  r: number;
  opacity: number;
  filled: boolean;
  hue: number;
  saturation: number;
};

export type StarPosition = {
  card: TarotCardStats;
  cx: number;
  cy: number;
  enc: StarEncoding;
};
