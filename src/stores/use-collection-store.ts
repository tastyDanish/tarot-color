import { supabase } from "@/db/client";
import { create } from "zustand";
import type { Reading } from "./use-reading-store";
import { mapDbReadingToReading } from "@/db/mappers";
import { generateSuitCollection } from "./generate-suit-collection";
import { groupColors } from "@/lib/color-utils";

export type TarotCardStats = {
	name: string;
	image: string;
	collected: boolean;
	seen: number;
	foil: number;
	deprived: number;
	reversed: number;
	order: number;
	words: string[];
};

export type TarotSuit = {
	name: string;
	total: number;
	count: number;
	cards: TarotCardStats[];
};

export const VALID_SUITS = ["Major", "Cups", "Swords", "Wands", "Pentacles"];

type MostCommonCard = {
	name: string;
	image: string;
	count: number;
};

type CollectionState = {
	readings: Reading[] | null;
	loading: boolean;
	error: string | null;
	cards: Map<string, TarotSuit> | null;
	allCards: TarotCardStats[] | null;
	mostCommonCard: MostCommonCard | null;
	auraColor: string | null;

	loadReadings: (userId: string) => Promise<void>;
	clear: () => void;
};

// --- Aura Color Utilities ---
const hexToRgb = (hex: string) => {
	const parsed = hex.replace("#", "");
	const bigint = parseInt(parsed, 16);
	return {
		r: (bigint >> 16) & 255,
		g: (bigint >> 8) & 255,
		b: bigint & 255,
	};
};

const getAuraColor = (readings: Reading[]): string | null => {
	const allColors = readings.flatMap((r) => r.words?.map((w) => w.color) || []);
	if (allColors.length === 0) return null;

	const rgbList = allColors.map(hexToRgb);
	return groupColors(rgbList);
};

// --- Most Common Card ---
const findMostCommonCard = (readings: Reading[]): MostCommonCard | null => {
	const cardCountMap: Record<
		string,
		{
			name: string;
			image: string;
			count: number;
			suit?: string;
			order?: number;
		}
	> = {};

	for (const reading of readings) {
		const card = reading.card;
		if (!card) continue;

		const key = card.name;

		if (!cardCountMap[key]) {
			cardCountMap[key] = {
				name: card.name,
				image: card.image,
				count: 1,
				suit: card.suit,
				order: card.order,
			};
		} else {
			cardCountMap[key].count += 1;
		}
	}

	const mostCommon = Object.values(cardCountMap).reduce(
		(prev, current) => {
			if (current.count > prev.count) {
				return current;
			}
			if (current.count < prev.count) {
				return prev;
			}

			// Tie-breaker: Major Arcana preferred
			const currentIsMajor = current.suit === "Major";
			const prevIsMajor = prev.suit === "Major";
			if (currentIsMajor && !prevIsMajor) return current;
			if (!currentIsMajor && prevIsMajor) return prev;

			// Final tie-breaker: higher `order` value wins
			const currentOrder = current.order ?? -1;
			const prevOrder = prev.order ?? -1;
			if (currentOrder > prevOrder) return current;
			if (currentOrder < prevOrder) return prev;

			// Final fallback: alphabetically by name (stable-ish)
			return current.name < prev.name ? current : prev;
		},
		{ name: "", image: "", count: 0, suit: undefined, order: undefined },
	);

	return mostCommon.count > 0
		? {
			name: mostCommon.name,
			image: mostCommon.image,
			count: mostCommon.count,
		}
		: null;
};

// --- Store ---
export const useCollectionStore = create<CollectionState>((set) => ({
	readings: null,
	loading: false,
	error: null,
	cards: null,
	mostCommonCard: null,
	auraColor: null,
	allCards: null,

	loadReadings: async (userId) => {
		set({ loading: true, error: null });

		const { data, error } = await supabase
			.from("readings")
			.select("*")
			.eq("user_id", userId)
			.order("created_at", { ascending: false });

		if (error) {
			set({ error: error.message, loading: false });
			return;
		}

		const readings = data.map(mapDbReadingToReading);

		const cards = new Map<string, TarotSuit>();

		VALID_SUITS.forEach((suit) => {
			cards.set(suit, generateSuitCollection(suit, readings));
		});

		const allCards = [...cards.values()].flatMap((v) => v.cards);
		const mostCommonCard = findMostCommonCard(readings);
		const auraColor = getAuraColor(readings);

		set({
			readings,
			loading: false,
			cards,
			mostCommonCard,
			auraColor,
			allCards,
		});
	},

	clear: () =>
		set({
			readings: null,
			error: null,
			cards: null,
			mostCommonCard: null,
			auraColor: null,
		}),
}));
