import { createClient } from "@supabase/supabase-js";
import { computeStreak, getOrder, getSuit } from "./utils";
import { generateReading } from "../src/cards/readings";
import { mapDbReadingToReading } from "../src/db/mappers";
import { Reading } from "../src/stores/use-reading-store";

const {
	VITE_SUPABASE_URL,
	SUPABASE_SERVICE_KEY,
} = process.env;

// Connect to our database
const supabase = createClient(
	VITE_SUPABASE_URL ?? "",
	SUPABASE_SERVICE_KEY ?? "",
);

export const getExistingReading = async (
	user_id: string,
	current_time: Date,
) => {
	const { data: existing, error } = await supabase
		.from("readings")
		.select("*")
		.eq("user_id", user_id)
		.order("created_at", { ascending: false })
		.limit(1)
		.maybeSingle();

	if (error) {
		console.log("ERROR - existing: ", error.message);
		return {
			statusCode: 500,
			body: JSON.stringify({ error: "Error querying readings" }),
		};
	}

	if (existing && new Date(existing.expires_at) > new Date(current_time)) {
		const streak = await getCurrentStreak(user_id);

		return {
			statusCode: 200,
			body: JSON.stringify({
				reading: existing,
				streak,
				source: "db",
			}),
		};
	}

	return null;
};

const getCurrentStreak = async (user_id: string) => {
	const { data: allDates, error: streakError } = await supabase
		.from("readings")
		.select("expires_at")
		.eq("user_id", user_id);

	if (streakError || allDates == null) {
		console.log("ERROR - streak query: ", streakError.message);
		return -1;
	} else {
		return computeStreak(allDates.map((r) => r.expires_at));
	}
};

export const createReading = async (user_id: string, expiration: string) => {
	const newReading = generateReading(new Date(expiration));
	const variations: string[] = [];
	if (newReading.reversed) variations.push("reversed");
	if (newReading.foil) variations.push("foil");

	const readingToInsert = {
		card_name: newReading.card.name,
		card_image: newReading.card.image,
		card_suit: newReading.card.suit,
		card_order: newReading.card.order,
		words: newReading.words,
		variations,
		alternate_art: null,
		user_id,
		created_at: new Date().toISOString(),
		expires_at: newReading.expiration.toISOString(),
		is_flipped: newReading.flipped,
	};

	const { data: insertedReading, error: insertError } = await supabase
		.from("readings")
		.insert([readingToInsert]).select().single();

	if (insertError) {
		console.log("ERROR - newReading: ", insertError.message);
		return {
			statusCode: 500,
			body: JSON.stringify({ error: "Failed to save generated reading" }),
		};
	}

	const streak = await getCurrentStreak(user_id);

	return {
		statusCode: 200,
		body: JSON.stringify({
			reading: insertedReading,
			streak,
			source: "generated",
		}),
	};
};

export const saveFallbackReading = async (
	fallback_reading: Reading,
	user_id: string,
) => {
	const actualReading: Reading = fallback_reading;

	const variations: string[] = [];

	if (actualReading.reversed) variations.push("reversed");
	if (actualReading.foil) variations.push("foil");

	const readingToSave = {
		card_name: actualReading.card.name,
		card_image: actualReading.card.image,
		words: actualReading.words,
		card_order: getOrder(actualReading),
		card_suit: getSuit(actualReading),
		variations,
		alternate_art: null,
		user_id,
		created_at: new Date().toISOString(),
		expires_at: new Date(fallback_reading.expiration).toISOString(),
		is_flipped: actualReading.flipped,
	};

	const { data: insertedReading, error: insertErr } = await supabase
		.from("readings")
		.insert([readingToSave]);

	if (insertErr) {
		console.log("ERROR - fallback: ", insertErr.message);

		return {
			statusCode: 500,
			body: JSON.stringify({ error: "Failed to save fallback reading" }),
		};
	}

	const streak = await getCurrentStreak(user_id);

	return {
		statusCode: 200,
		body: JSON.stringify({
			reading: mapDbReadingToReading(insertedReading, streak),
			streak,
			source: "fallback",
		}),
	};
};
