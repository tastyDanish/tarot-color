import { create } from "zustand";
import type { TarotCard } from "@/cards/tarot-cards";
import { generateReading } from "@/cards/readings";
import { mapDbReadingToReading } from "@/db/mappers";
import { getNextMidnight } from "@/lib/time-utils";

export type WordColor = {
	word: string;
	color: string;
};

export type Reading = {
	card: TarotCard;
	words: WordColor[];
	expiration: Date;
	new: boolean;
	reversed?: boolean;
	foil?: boolean;
};

const LOCAL_STORAGE_KEY = "divination-as-a-service-2";

const loadFromStorage = (): Reading | null => {
	try {
		const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (!raw) return null;

		const saved: Reading = JSON.parse(raw);
		saved.expiration = new Date(saved.expiration);
		saved.reversed = saved.reversed ?? false;
		return saved;
	} catch {
		return null;
	}
};

const saveToStorage = (reading: Reading) => {
	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(reading));
};

type ReadingState = {
	reading: Reading | null;
	isLoading: boolean;
	loadReading: (userId?: string) => Promise<void>;
};

export const useReadingStore = create<ReadingState>((set) => ({
	reading: null,
	isLoading: false,

	loadReading: async (userId?: string) => {
		set({ isLoading: true });

		const localReading = loadFromStorage();

		const expiration = getNextMidnight();
		const currentTime = new Date();

		// If no user, just use the local reading or generate one
		if (!userId) {
			if (localReading && localReading.expiration > currentTime) {
				const reading = localReading;
				saveToStorage({ ...reading, new: false });
				set({ reading, isLoading: false });
				return;
			} else {
				const reading = generateReading(expiration);
				saveToStorage({ ...reading, new: true });
				set({ reading, isLoading: false });
				return;
			}
		}

		// Call Netlify function with userId and optional fallback
		const res = await fetch("/.netlify/functions/get-reading", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				user_id: userId,
				fallback_reading: localReading,
				expiration,
				current_time: currentTime,
			}),
		});

		if (!res.ok) {
			console.error("Failed to fetch reading from API");
			set({ isLoading: false });
			return;
		}

		const { reading } = await res.json();
		const loadedReading: Reading = mapDbReadingToReading(reading);
		saveToStorage({ ...loadedReading });
		set({ reading: loadedReading, isLoading: false });
	},
}));
