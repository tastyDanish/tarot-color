import { TAROT_CARDS } from "../src/cards/tarot-cards";
import { Reading } from "../src/stores/use-reading-store";

export const getSuit = (reading: Reading) => {
	if (reading.card.suit == null) {
		return TAROT_CARDS.find((s) => s.name === reading.card.name)?.suit;
	}
	return reading.card.suit;
};

export const getOrder = (reading: Reading) => {
	if (reading.card.order == null) {
		return TAROT_CARDS.find((s) => s.name === reading.card.name)?.order;
	}
	return reading.card.order;
};

export const computeStreak = (dates: string[]): number => {
	const toUTCDate = (d: string) => new Date(d).toISOString().split("T")[0];

	// Dedupe and sort by date string descending (newest first)
	const sortedDates = [...new Set(dates.map(toUTCDate))].sort((a, b) =>
		a < b ? 1 : -1
	);

	let streak = 0;
	const expected = new Date(sortedDates[0]);

	for (const dateStr of sortedDates) {
		const current = new Date(dateStr);

		if (
			current.toISOString().split("T")[0] ===
				expected.toISOString().split("T")[0]
		) {
			streak++;
			expected.setUTCDate(expected.getUTCDate() - 1); // Go back one day
		} else {
			break;
		}
	}

	return streak;
};
