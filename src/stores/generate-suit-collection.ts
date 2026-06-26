import { TAROT_CARDS } from "@/cards/tarot-cards";
import type { TarotSuit } from "./use-collection-store";
import type { Reading } from "./use-reading-store";

export const generateSuitCollection = (
	suitName: string,
	allReadings: Reading[],
): TarotSuit => {
	const suitCards = TAROT_CARDS.filter((card) => card.suit === suitName);

	const suitReadings = allReadings.filter(
		(reading) => reading.card.suit === suitName,
	);

	const readingsByCard = suitReadings.reduce((map, r) => {
		const key = r.card.name;
		map.set(key, [...(map.get(key) ?? []), r]);
		return map;
	}, new Map<string, Reading[]>());

	const cards = suitCards
		.sort((a, b) => (a?.order ?? 0) - (b?.order ?? 0))
		.map((card) => {
			const cardReadings = readingsByCard.get(card.name) ?? [];
			return {
				name: card.name,
				image: card.image,
				collected: cardReadings.length > 0,
				seen: cardReadings.length,
				foil: cardReadings.filter((r) => r.foil).length,
				deprived: cardReadings.filter((r) => r.deprived).length,
				reversed: cardReadings.filter((r) => r.reversed).length,
				order: card.order ?? -1,
				words: card.description.split(", ").slice(0, 3),
			};
		});

	const count = cards.filter((card) => card.collected).length;

	return {
		name: suitName === "Major" ? "Major Arcana" : suitName,
		total: suitCards.length,
		count,
		cards,
	};
};
