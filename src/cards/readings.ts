import { PALETTES } from "@/colors/palettes";
import { generatePalette } from "@/colors/random-palettes";
import {
	getRandomItem,
	getRandomSubSet,
	shuffleArray,
} from "@/lib/random-utils";
import { getNextMidnight } from "@/lib/time-utils";
import { TAROT_CARDS } from "./tarot-cards";
import type { Reading, WordColor } from "@/stores/use-reading-store";

export const generateReading = (): Reading => {
	const card = getRandomItem(TAROT_CARDS);
	const reversed = Math.random() <= 0.12;
	const foil = Math.random() <= 0.07;

	const palette = Math.random() > 0.2
		? generatePalette()
		: shuffleArray(getRandomItem(PALETTES));

	const wordsRaw = (reversed ? card.reversed : card.description)
		.split(",")
		.map((w) => w.trim());
	const chosenWords = getRandomSubSet(wordsRaw, 5);

	const words: WordColor[] = chosenWords.map((word, i) => ({
		word,
		color: palette[i % palette.length],
	}));

	const expiration = getNextMidnight();

	const reading: Reading = {
		card,
		words,
		expiration,
		new: true,
		reversed,
		foil,
	};

	return reading;
};
