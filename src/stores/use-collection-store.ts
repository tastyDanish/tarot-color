import { supabase } from "@/db/client";
import { create } from "zustand";
import type { Reading } from "./use-reading-store";
import { mapDbReadingToReading } from "@/db/mappers";
import { generateSuitCollection } from "./generate-suit-collection";

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
type CollectionState = {
	readings: Reading[] | null;
	loading: boolean;
	error: string | null;
	major: TarotSuit | null;
	pentacles: TarotSuit | null;
	cups: TarotSuit | null;
	swords: TarotSuit | null;
	wands: TarotSuit | null;

	loadReadings: (userId: string) => Promise<void>;
	clear: () => void;
};

export const useCollectionStore = create<CollectionState>((set) => ({
	readings: null,
	loading: false,
	error: null,
	major: null,
	pentacles: null,
	cups: null,
	swords: null,
	wands: null,

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

		set({ readings, loading: false, major, cups, pentacles, swords, wands });
	},

	clear: () => set({ readings: null, error: null }),
}));
