import { createClient } from "@supabase/supabase-js";

const {
	VITE_SUPABASE_URL,
	SUPABASE_SERVICE_KEY,
} = process.env;

const supabase = createClient(
	VITE_SUPABASE_URL ?? "",
	SUPABASE_SERVICE_KEY ?? "",
);

const DAY_MS = 86_400_000;

export type DbPhase = {
	title: string;
	card_name: string;
	reversed: boolean;
	foil: boolean;
	deprived: boolean;
	words: string[];
	color: string;
};

export type TriplePayload = {
	spread_name: string;
	phases: DbPhase[];
	flipped: boolean[];
	expiration: string; // ISO
};

// "fresh" = brand new draw, must have a full ~7 day window.
// "fallback" = migrating a local reading, so it may have less time left.
const isRecord = (v: unknown): v is Record<string, unknown> =>
	typeof v === "object" && v !== null;

const parsePhase = (p: unknown): DbPhase | null => {
	if (!isRecord(p)) return null;
	const { title, card_name, words, color } = p;

	if (
		typeof title !== "string" ||
		typeof card_name !== "string" ||
		typeof color !== "string" ||
		!Array.isArray(words)
	) {
		return null;
	}

	// rebuild a clean object so stray client fields never reach the DB
	return {
		title,
		card_name,
		color,
		reversed: p.reversed === true,
		foil: p.foil === true,
		deprived: p.deprived === true,
		words: words.map(String),
	};
};

export const validatePayload = (
	raw: unknown,
	mode: "fresh" | "fallback",
): TriplePayload | null => {
	if (!isRecord(raw)) return null;
	const { spread_name, phases, flipped, expiration } = raw;

	if (typeof spread_name !== "string") return null;
	if (!Array.isArray(phases) || phases.length < 1 || phases.length > 5) {
		return null;
	}
	if (!Array.isArray(flipped) || flipped.length !== phases.length) return null;
	if (!flipped.every((f) => typeof f === "boolean")) return null;
	if (typeof expiration !== "string") return null;

	const parsedPhases = phases
		.map(parsePhase)
		.filter((p): p is DbPhase => p !== null);
	if (parsedPhases.length !== phases.length) return null;

	// The client owns its midnight; we only reject absurd values.
	const expiresMs = new Date(expiration).getTime();
	const remaining = expiresMs - Date.now();
	if (Number.isNaN(remaining) || remaining <= 0 || remaining > 8.1 * DAY_MS) {
		return null;
	}
	// A fresh draw should have a nearly full week left (stops 1-minute expiries).
	if (mode === "fresh" && remaining < 5.9 * DAY_MS) return null;

	return {
		spread_name,
		phases: parsedPhases,
		flipped,
		expiration: new Date(expiresMs).toISOString(),
	};
};

export const getExistingTriple = async (user_id: string) => {
	const { data, error } = await supabase
		.from("triple_readings")
		.select("*")
		.eq("user_id", user_id)
		.gt("expires_at", new Date().toISOString())
		.order("expires_at", { ascending: false })
		.limit(1)
		.maybeSingle();

	if (error) throw error;
	return data;
};

export const insertTriple = async (user_id: string, p: TriplePayload) => {
	const { data, error } = await supabase
		.from("triple_readings")
		.insert({
			user_id,
			spread_name: p.spread_name,
			phases: p.phases,
			flipped: p.flipped,
			expires_at: p.expiration,
		})
		.select()
		.single();

	if (error) {
		// 23P01 = exclusion violation: they already have an active reading
		if (error.code === "23P01") {
			const existing = await getExistingTriple(user_id);
			if (existing) return { reading: existing, created: false };
		}
		throw error;
	}
	return { reading: data, created: true };
};

export const setPhaseFlipped = async (
	user_id: string,
	reading_id: string,
	index: number,
) => {
	const { error } = await supabase.rpc("set_triple_phase_flipped", {
		p_user_id: user_id,
		p_reading_id: reading_id,
		p_index: index,
	});
	if (error) throw error;
};

export const errorResponse = (err: unknown) => {
	console.log("ERROR - triple:", err instanceof Error ? err.message : err);
	return Response.json({ error: "Unexpected server error" }, { status: 500 });
};
