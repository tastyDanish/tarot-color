import { supabase } from "@/db/client";
import { create } from "zustand";
import type { Reading } from "./use-reading-store";
import { mapDbReadingToReading } from "@/db/mappers";
import { generateSuitCollection } from "./generate-suit-collection";
import { groupColors } from "@/lib/color-utils";

export type TarotSuit = {
	name: string;
	total: number;
	count: number;
	cards: {
		name: string;
		image: string;
		collected: boolean;
	}[];
};

type MostCommonCard = {
	name: string;
	image: string;
	count: number;
};

type CollectionState = {
	readings: Reading[] | null;
	loading: boolean;
	error: string | null;
	major: TarotSuit | null;
	pentacles: TarotSuit | null;
	cups: TarotSuit | null;
	swords: TarotSuit | null;
	wands: TarotSuit | null;
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
		{ name: string; image: string; count: number }
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
			};
		} else {
			cardCountMap[key].count += 1;
		}
	}

	const mostCommon = Object.values(cardCountMap).reduce(
		(prev, current) => current.count > prev.count ? current : prev,
		{ name: "", image: "", count: 0 },
	);

	return mostCommon.count > 0 ? mostCommon : null;
};

// --- Store ---
export const useCollectionStore = create<CollectionState>((set) => ({
	readings: null,
	loading: false,
	error: null,
	major: null,
	pentacles: null,
	cups: null,
	swords: null,
	wands: null,
	mostCommonCard: null,
	auraColor: null,

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

		const major = generateSuitCollection("Major", readings);
		const cups = generateSuitCollection("Cups", readings);
		const pentacles = generateSuitCollection("Pentacles", readings);
		const swords = generateSuitCollection("Swords", readings);
		const wands = generateSuitCollection("Wands", readings);
		const mostCommonCard = findMostCommonCard(readings);
		const auraColor = getAuraColor(readings);

		set({
			readings,
			loading: false,
			major,
			cups,
			pentacles,
			swords,
			wands,
			mostCommonCard,
			auraColor,
		});
	},

	clear: () =>
		set({
			readings: null,
			error: null,
			major: null,
			cups: null,
			pentacles: null,
			swords: null,
			wands: null,
			mostCommonCard: null,
			auraColor: null,
		}),
}));
