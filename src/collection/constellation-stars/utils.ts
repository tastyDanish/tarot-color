import type { TarotCardStats } from "@/stores/use-collection-store";
import { makePrng } from "./strategies";

export const getStarSet = (cards: TarotCardStats[], seed: number) => {
	const rand = makePrng(seed);
	const limit = 4 + Math.floor(rand() * 4); // 4–7

	const picked = new Set<string>();
	const result: TarotCardStats[] = [];

	const pick = (card: TarotCardStats) => {
		if (!picked.has(card.name)) {
			picked.add(card.name);
			result.push(card);
		}
	};

	const top = (fn: (c: TarotCardStats) => number) =>
		[...cards].sort((a, b) => fn(b) - fn(a))[0];

	const topFoil = top((c) => c.foil);
	const topReversed = top((c) => c.reversed);
	const topDeprived = top((c) => c.deprived);
	const topSeen = top((c) => c.seen);

	// ensure at least one of each type exists before picking
	if (topFoil?.foil > 0) pick(topFoil);
	if (topReversed?.reversed > 0) pick(topReversed);
	if (topDeprived?.deprived > 0) pick(topDeprived);
	if (topSeen?.seen > 0) pick(topSeen);

	// fill remaining slots with seeded-random picks
	const remaining = cards.filter((c) => !picked.has(c.name));
	const shuffled = [...remaining].sort(() => rand() - 0.5);
	for (const card of shuffled) {
		if (result.length >= limit) break;
		pick(card);
	}

	return result;
};
