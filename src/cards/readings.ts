import { PALETTES } from "@/colors/palettes";
import { deprivePalette, generatePalette } from "@/colors/random-palettes";
import {
	getRandomItem,
	getRandomSubSet,
	shuffleArray,
} from "@/lib/random-utils";
import { TAROT_CARDS } from "./tarot-cards";
import type { Reading, WordColor } from "@/stores/use-reading-store";

export const generateReading = (expiration: Date): Reading => {
	const card = getRandomItem(TAROT_CARDS);
	const reversed = Math.random() <= 0.12;
	const foil = Math.random() <= 0.07;
	const deprived = Math.random() <= 0.03;

	const palette = Math.random() > 0.2
		? generatePalette()
		: shuffleArray(getRandomItem(PALETTES));

	const finalPalette = deprived ? deprivePalette(palette) : palette;

	const wordsRaw = (reversed ? card.reversed : card.description)
		.split(",")
		.map((w) => w.trim());
	const chosenWords = getRandomSubSet(wordsRaw, 5);

	const words: WordColor[] = chosenWords.map((word, i) => ({
		word,
		color: finalPalette[i % finalPalette.length],
	}));

	const reading: Reading = {
		id: "client-side",
		card,
		words,
		expiration,
		reversed,
		foil,
		flipped: false,
		deprived,
	};

	return reading;
};
