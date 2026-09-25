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

export type DrawnCard = {
	card: TarotCard;
	reversed: boolean;
	foil: boolean;
	deprived: boolean;
};
const getReadingCard = (card?: TarotCard): DrawnCard => ({
	card: card ? card : getRandomItem(TAROT_CARDS),
	// reversed: Math.random() <= 1,
	// foil: Math.random() <= 1,
	// deprived: Math.random() <= 1,
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

export type ReadingPhase = {
	title: string;
	drawn: DrawnCard;
	words: string[];
	color: string;
};

type TripleReading = {
	id: string;
	readingPhases: ReadingPhase[];
};

export const generateMulti = (titles: string[]): TripleReading => {
	const colors = generatePalette(titles.length);

	const usedWords = new Set<string>();

	const phases = getRandomItemArray(TAROT_CARDS, titles.length).map((c, i) => {
		const drawn = getReadingCard(c);

		const color = colors[i];

		return {
			title: titles[i],
			drawn,
			words: getWords(drawn.card, drawn.reversed, 2, usedWords),
			color: drawn.deprived ? depriveColor(color) : color,
		};
	});

	return {
		id: "client-side",
		readingPhases: phases,
	};
};
