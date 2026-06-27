import { PALETTES } from "@/colors/palettes";
import {
	depriveColor,
	deprivePalette,
	generatePalette,
} from "@/colors/random-palettes";
import {
	getRandomItem,
	getRandomItemArray,
	getRandomSubSet,
	shuffleArray,
} from "@/lib/random-utils";
import { TAROT_CARDS, type TarotCard } from "./tarot-cards";
import type { Reading, WordColor } from "@/stores/use-reading-store";

export type ReadingCard = {
	card: TarotCard;
	reversed: boolean;
	foil: boolean;
	deprived: boolean;
};
const getReadingCard = (card?: TarotCard): ReadingCard => ({
	card: card ? card : getRandomItem(TAROT_CARDS),
	reversed: Math.random() <= 0.12,
	foil: Math.random() <= 0.07,
	deprived: Math.random() <= 0.03,
});

const getWords = (
	card: TarotCard,
	reversed: boolean,
	count: number,
	usedWords?: Set<string>,
) => {
	const wordsRaw = (reversed ? card.reversed : card.description)
		.split(",")
		.map((w) => w.trim());

	const available = usedWords
		? wordsRaw.filter((w) => !usedWords.has(w))
		: wordsRaw;

	const pool = available.length >= count ? available : wordsRaw;

	const chosen = getRandomSubSet(pool, count);

	if (usedWords) {
		chosen.forEach((w) => usedWords.add(w));
	}

	return chosen;
};

export const generateDailySingle = (expiration: Date): Reading => {
	const reading = getReadingCard();

	const palette = Math.random() > 0.2
		? generatePalette()
		: shuffleArray(getRandomItem(PALETTES));

	const finalPalette = reading.deprived ? deprivePalette(palette) : palette;

	const chosenWords = getWords(reading.card, reading.reversed, 5);

	const words: WordColor[] = chosenWords.map((word, i) => ({
		word,
		color: finalPalette[i % finalPalette.length],
	}));

	return {
		id: "client-side",
		card: reading.card,
		words,
		expiration,
		reversed: reading.reversed,
		foil: reading.foil,
		flipped: false,
		deprived: reading.deprived,
		alternateArt: "goblin",
	};
};

type ReadingPhase = {
	title: string;
	card: ReadingCard;
	words: string[];
	color: string;
};

type TripleReading = {
	id: string;
	readingPhases: ReadingPhase[];
};

export const generateMulti = (count: number): TripleReading => {
	const colors = generatePalette(3);
	if (colors.length !== count) {
		throw new Error("Color count does not match draw count");
	}

	const titles = ["Past", "Present", "Future"];
	if (titles.length !== count) {
		throw new Error("Color count does not match draw count");
	}

	const usedWords = new Set<string>();

	const phases = getRandomItemArray(TAROT_CARDS, count).map((c, i) => {
		const reading = getReadingCard(c);

		const color = colors[i];

		return {
			title: titles[i],
			card: reading,
			words: getWords(reading.card, reading.reversed, 2, usedWords),
			color: reading.deprived ? depriveColor(color) : color,
		};
	});

	return {
		id: "client-side",
		readingPhases: phases,
	};
};
