import { create } from "zustand";
import type { TarotCard } from "@/cards/tarot-cards";
import { generateDailySingle } from "@/cards/readings";
import { mapDbReadingToReading } from "@/db/mappers";
import { getNextMidnight } from "@/lib/time-utils";
import { getArt } from "@/lib/string-utils";

export type WordColor = {
	word: string;
	color: string;
};

export type Reading = {
	id: string;
	card: TarotCard;
	words: WordColor[];
	expiration: Date;
	reversed?: boolean;
	foil?: boolean;
	streak?: number;
	flipped?: boolean;
	deprived?: boolean;
	alternateArt?: string | null;
};

const LOCAL_STORAGE_KEY = "divination-as-a-service-2";

const loadFromStorage = (): Reading | null => {
	try {
		const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (!raw) return null;

		const saved: Reading = JSON.parse(raw);
		saved.expiration = new Date(saved.expiration);
		saved.reversed = saved.reversed ?? false;
		saved.flipped = saved.flipped ?? true;
		saved.deprived = saved.deprived ?? false;
		return saved;
	} catch {
		return null;
	}
};

const saveToStorage = (reading: Reading) => {
	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(reading));
};

const preloadArt = (reading: Reading) => {
	const art = getArt({
		card: reading.card.image,
		art: reading.alternateArt ?? null,
	});
	if (!art) return;
	const img = new Image();
	img.src = art;
};

type ReadingState = {
	reading: Reading | null;
	isLoading: boolean;
	setIsFlipped: (
		settings: { flipped: boolean; userId: string | null; readingId: string },
	) => void;
	loadReading: (userId?: string) => Promise<void>;
};

export const useReadingStore = create<ReadingState>((set, get) => ({
	reading: null,
	isLoading: true,
	setIsFlipped: async (settings) => {
		const { flipped, userId, readingId } = settings;
		const reading = get().reading;
		if (reading) {
			saveToStorage({ ...reading, flipped });
			set({ reading: { ...reading, flipped } });

			if (userId) {
				await fetch("/.netlify/functions/update-flipped", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						user_id: userId,
						reading_id: readingId,
						is_flipped: flipped,
					}),
				});
			}
		}
	},
	loadReading: async (userId?: string) => {
		set({ isLoading: true });

		const localReading = loadFromStorage();
		const expiration = getNextMidnight();
		const currentTime = new Date();
		const ONE_DAY_MS = 24 * 60 * 60 * 1000;

		const isConsecutiveDay = !!localReading &&
			expiration.getTime() - localReading.expiration.getTime() === ONE_DAY_MS;

		const newStreak = isConsecutiveDay ? (localReading!.streak ?? 0) + 1 : 1;

		if (!userId) {
			if (localReading && localReading.expiration > currentTime) {
				const reading = localReading;
				saveToStorage({ ...reading });
				preloadArt(reading);
				set({ reading, isLoading: false });
				return;
			} else {
				const reading = generateDailySingle(expiration);
				const fullReading = { ...reading, streak: newStreak };
				saveToStorage(fullReading);
				preloadArt(fullReading);
				set({ reading: fullReading, isLoading: false });
				return;
			}
		}

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

		const { reading, streak } = await res.json();
		const loadedReading: Reading = mapDbReadingToReading(reading, streak);
		saveToStorage({ ...loadedReading });
		preloadArt(loadedReading);

		set({ reading: { ...loadedReading }, isLoading: false });
	},
}));
