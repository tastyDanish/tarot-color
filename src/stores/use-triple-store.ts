import { create } from "zustand";
import { generateMulti, type ReadingPhase } from "@/cards/readings";
import { getNextMidnight } from "@/lib/time-utils";
import { mapDbTripleToSaved, mapSavedToDbPayload } from "@/db/triple-mappers";

export type TripleSaved = {
	id: string;
	spreadName: string;
	readingPhases: ReadingPhase[];
	flipped: boolean[];
	expiration: Date;
};

const LOCAL_STORAGE_KEY = "divination-as-a-service-triple-1";

const loadFromStorage = (): TripleSaved | null => {
	try {
		const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (!raw) return null;

		const saved: TripleSaved = JSON.parse(raw);
		if (
			!Array.isArray(saved.readingPhases) || saved.readingPhases.length === 0
		) {
			return null;
		}

		saved.expiration = new Date(saved.expiration);
		saved.flipped = saved.readingPhases.map((_, i) =>
			saved.flipped?.[i] ?? false
		);
		return saved;
	} catch {
		return null;
	}
};

const saveToStorage = (reading: TripleSaved) => {
	try {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(reading));
	} catch {
		// storage full / disabled: fail quietly, in-memory state still works
	}
};

const clearStorage = () => {
	try {
		localStorage.removeItem(LOCAL_STORAGE_KEY);
	} catch { /* empty */ }
};

type TripleState = {
	reading: TripleSaved | null;
	isLoading: boolean;
	userId: string | null;
	loadReading: (userId?: string) => Promise<void>;
	startReading: (spreadName: string, titles: string[]) => Promise<void>;
	setPhaseFlipped: (index: number) => Promise<void>;
	clearReading: () => void;
};

const post = (fn: string, body: unknown) =>
	fetch(`/.netlify/functions/${fn}`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
	});

const EXPIRY_DAYS = 6;

export const getTripleExpiration = () => {
	const date = new Date(getNextMidnight());
	date.setDate(date.getDate() + EXPIRY_DAYS);
	return date;
};

export const formatExpiryDate = (date: Date) =>
	date.toLocaleDateString(undefined, {
		weekday: "short",
		month: "short",
		day: "numeric",
	});

export const useTripleStore = create<TripleState>((set, get) => ({
	reading: null,
	isLoading: true,
	userId: null,

	loadReading: async (userId) => {
		set({ isLoading: true, userId: userId ?? null });

		const local = loadFromStorage();
		const validLocal = local && local.expiration > new Date() ? local : null;

		// signed out: local storage is the only source
		if (!userId) {
			if (!validLocal) clearStorage();
			set({ reading: validLocal, isLoading: false });
			return;
		}

		try {
			// the server returns its reading, or migrates our local one, or returns null
			const res = await post("get-triple", {
				user_id: userId,
				fallback_reading: validLocal ? mapSavedToDbPayload(validLocal) : null,
			});
			if (!res.ok) throw new Error(`get-triple failed: ${res.status}`);

			const { reading } = await res.json();
			if (reading) {
				const mapped = mapDbTripleToSaved(reading);
				saveToStorage(mapped);
				set({ reading: mapped, isLoading: false });
				return;
			}

			clearStorage();
			set({ reading: null, isLoading: false });
		} catch (err) {
			// offline / server error / unknown card name: keep whatever we have locally
			console.error(err);
			set({ reading: validLocal, isLoading: false });
		}
	},

	startReading: async (spreadName, titles) => {
		const userId = get().userId;
		const generated = generateMulti(titles);
		const local: TripleSaved = {
			id: generated.id, // "client-side" until the server assigns a real one
			spreadName,
			readingPhases: generated.readingPhases,
			flipped: generated.readingPhases.map(() => false),
			expiration: getTripleExpiration(),
		};

		if (userId) {
			try {
				const res = await post("create-triple", {
					user_id: userId,
					reading: mapSavedToDbPayload(local),
				});

				// 200 = created, 409 = they already had one (e.g. from another device).
				// Either way the server's version wins.
				if (res.ok || res.status === 409) {
					const { reading } = await res.json();
					const mapped = mapDbTripleToSaved(reading);
					saveToStorage(mapped);
					set({ reading: mapped });
					return;
				}
				throw new Error(`create-triple failed: ${res.status}`);
			} catch (err) {
				// fall through: keep the local reading, get-triple migrates it next load
				console.error(err);
			}
		}

		saveToStorage(local);
		set({ reading: local });
	},

	setPhaseFlipped: async (index) => {
		const userId = get().userId;
		const reading = get().reading;
		if (!reading || reading.flipped[index]) return;

		const flipped = reading.flipped.map((f, i) => (i === index ? true : f));
		const next = { ...reading, flipped };
		saveToStorage(next);
		set({ reading: next });

		// "client-side" means it isn't in the DB yet; the flipped array
		// travels with it when get-triple migrates it
		if (userId && reading.id !== "client-side") {
			try {
				await post("update-triple-flipped", {
					user_id: userId,
					reading_id: reading.id,
					index,
				});
			} catch (err) {
				console.error(err);
			}
		}
	},

	clearReading: () => {
		clearStorage();
		set({ reading: null });
	},
}));
