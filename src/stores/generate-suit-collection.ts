import { TAROT_CARDS } from "@/cards/tarot-cards";
import type { TarotSuit } from "./use-collection-store";
import type { Reading } from "./use-reading-store";

export const generateSuitCollection = (
	suitName: string,
	allReadings: Reading[],
): TarotSuit => {
	const suitCards = TAROT_CARDS.filter((card) => card.suit === suitName);
	const seenCardNames = new Set(
		allReadings
			.filter((reading) => reading.card.suit === suitName)
			.map((reading) => reading.card.name),
	);

	const cards = suitCards.sort((a, b) => (a?.order ?? 0) - (b?.order ?? 0)).map(
		(card) => ({
			name: card.name,
			image: card.image,
			collected: seenCardNames.has(card.name),
		})
	);

	const count = cards.filter((card) => card.collected).length;

	return {
		name: suitName === "Major" ? "Major Arcana" : suitName,
		total: suitCards.length,
		count,
		cards,
	};
};
