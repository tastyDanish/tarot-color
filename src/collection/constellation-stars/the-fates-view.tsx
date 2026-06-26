import type { TarotCardStats } from "@/stores/use-collection-store";

import { useMemo, useRef, useState } from "react";
import { Star } from "./Star";
import { useIsMd } from "@/lib/use-is-md";
import {
  encodeCard,
  hashStr,
  TEST_CARDS,
  X_STRATEGIES,
  Y_STRATEGIES,
} from "./strategies";

interface TheFatesViewProps {
  id: string;
  cards?: TarotCardStats[];
}

const H = 280;
const PAD = 48;

// Build a minimum spanning tree (Kruskal's) to connect all stars
function buildConstellationEdges(
  positions: { card: { name: string }; cx: number; cy: number }[]
) {
  if (positions.length < 2) return [];

  // Build all edges sorted by distance
  const edges: { i: number; j: number; dist: number }[] = [];
  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      const dx = positions[i].cx - positions[j].cx;
      const dy = positions[i].cy - positions[j].cy;
      edges.push({ i, j, dist: Math.sqrt(dx * dx + dy * dy) });
    }
  }
  edges.sort((a, b) => a.dist - b.dist);

  // Union-Find for Kruskal's MST
  const parent = positions.map((_, i) => i);
  const find = (x: number): number =>
    parent[x] === x ? x : (parent[x] = find(parent[x]));
  const union = (a: number, b: number) => {
    parent[find(a)] = find(b);
  };

  const mstEdges: { i: number; j: number }[] = [];
  for (const { i, j } of edges) {
    if (find(i) !== find(j)) {
      union(i, j);
      mstEdges.push({ i, j });
    }
    if (mstEdges.length === positions.length - 1) break;
  }

  return mstEdges;
}

const TheFatesView = ({ cards = TEST_CARDS, id }: TheFatesViewProps) => {
  const [hovered, setHovered] = useState<TarotCardStats | null>(null);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const wrapperRef = useRef<HTMLDivElement>(null);

  const isMd = useIsMd();
  const W = isMd ? 400 : 280;

  const xStrat = X_STRATEGIES.find((s) => s.id === "order")!;
  const yStrat = Y_STRATEGIES.find((s) => s.id === "seen")!;

  const positions = useMemo(() => {
    const seed = hashStr(id);
    const xMap = xStrat.compute(cards, seed);
    const yMap = yStrat.compute(cards, seed);
    return cards.map((card) => ({
      card,
      cx: PAD + (xMap.get(card.name) ?? 0.5) * (W - PAD * 2),
      cy: PAD + (yMap.get(card.name) ?? 0.5) * (H - PAD * 2),
      enc: encodeCard(card, cards),
    }));
  }, [W, cards, id, xStrat, yStrat]);

  const edges = useMemo(() => buildConstellationEdges(positions), [positions]);

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative"
        ref={wrapperRef}>
        {hovered && (
          <div
            className="pointer-events-none absolute rounded-sm px-2.5 py-1.5 text-[10px] tracking-widest whitespace-nowrap z-20 -translate-x-1/2 translate-y-[-130%] bg-slate-900 border border-slate-600 text-slate-200"
            style={{ left: mousePos.x, top: mousePos.y }}>
            {hovered.name} · seen {hovered.seen}x
          </div>
        )}
      </div>

      <svg
        width={W}
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        onMouseMove={handleMouseMove}>
        {/* Constellation lines — drawn beneath stars */}
        {edges.map(({ i, j }) => {
          const a = positions[i];
          const b = positions[j];
          const isHighlighted =
            hovered?.name === a.card.name || hovered?.name === b.card.name;

          return (
            <g key={`${a.card.name}-${b.card.name}`}>
              {/* Glow layer — only visible on highlight */}
              <line
                x1={a.cx}
                y1={a.cy}
                x2={b.cx}
                y2={b.cy}
                stroke="#94a3b8"
                strokeWidth={4}
                strokeOpacity={isHighlighted ? 0.25 : 0}
                style={{
                  transition: "stroke-opacity 0.3s",
                  filter: "blur(3px)",
                }}
              />
              {/* Base line — always visible */}
              <line
                x1={a.cx}
                y1={a.cy}
                x2={b.cx}
                y2={b.cy}
                stroke={isHighlighted ? "#cbd5e1" : "#334155"}
                strokeWidth={isHighlighted ? 2 : 1.5}
                strokeOpacity={isHighlighted ? 1 : 0.9}
                style={{
                  transition:
                    "stroke 0.3s, stroke-opacity 0.3s, stroke-width 0.3s",
                }}
              />
            </g>
          );
        })}

        {/* Stars — drawn on top of lines */}
        {positions.map(({ card, cx, cy, enc }) => (
          <Star
            key={card.name}
            cx={cx}
            cy={cy}
            enc={enc}
            isHovered={hovered?.name === card.name}
            isSelected={false}
            onEnter={() => setHovered(card)}
            onLeave={() => setHovered(null)}
          />
        ))}
      </svg>
    </div>
  );
};

export default TheFatesView;
