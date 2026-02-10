import { TAROT_CARDS, type TarotCard } from "@/cards/tarot-cards";
import { PALETTES } from "@/colors/palettes";
import { deprivePalette, generatePalette } from "@/colors/random-palettes";
import type { Reading, WordColor } from "@/stores/use-reading-store";
import { getRandomItem, getRandomSubSet, shuffleArray } from "./random-utils";

export type Fortune = {
	card: TarotCard;
	words: WordColor[];
	reversed: boolean;
	foil: boolean;
	flipped: boolean;
	deprived: boolean;
};

export const drawCard = (): Fortune => {
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

	return {
		card,
		words,
		reversed,
		foil,
		flipped: false,
		deprived,
	};
};

export const getVariations = (reading: Reading) => {
	const variations: string[] = [];
	if (reading.reversed) variations.push("reversed");
	if (reading.foil) variations.push("foil");
	if (reading.deprived) variations.push("deprived");

	return variations;
};
