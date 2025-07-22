import { Handler } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";
import { generateReading } from "../../src/cards/readings";
import { Reading } from "../../src/stores/use-reading-store";
import { TAROT_CARDS } from "../../src/cards/tarot-cards";

require("dotenv").config();

const {
	VITE_SUPABASE_URL,
	SUPABASE_SERVICE_KEY,
} = process.env;

// Connect to our database
const supabase = createClient(
	VITE_SUPABASE_URL ?? "",
	SUPABASE_SERVICE_KEY ?? "",
);

const getSuit = (reading: Reading) => {
	if (reading.card.suit == null) {
		return TAROT_CARDS.find((s) => s.name === reading.card.name)?.suit;
	}
	return reading.card.suit;
};

const getOrder = (reading: Reading) => {
	if (reading.card.order == null) {
		return TAROT_CARDS.find((s) => s.name === reading.card.name)?.order;
	}
	return reading.card.order;
};

const getStreak = (dates: string[]): number => {
	const toUTCDate = (d: string) => new Date(d).toISOString().split("T")[0];

	// Dedupe and sort by date string descending (newest first)
	const sortedDates = [...new Set(dates.map(toUTCDate))].sort((a, b) =>
		a < b ? 1 : -1
	);

	let streak = 0;
	let expected = new Date(sortedDates[0]);

	for (const dateStr of sortedDates) {
		const current = new Date(dateStr);

		if (
			current.toISOString().split("T")[0] ===
				expected.toISOString().split("T")[0]
		) {
			streak++;
			expected.setUTCDate(expected.getUTCDate() - 1); // Go back one day
		} else {
			break;
		}
	}

	return streak;
};

const computeStreak = async (user_id: string) => {
	const { data: allDates, error: streakError } = await supabase
		.from("readings")
		.select("expires_at")
		.eq("user_id", user_id);

	if (streakError) {
		console.log("ERROR - streak query: ", streakError.message);
		return {
			statusCode: 500,
			body: JSON.stringify({ error: "Failed to compute streak" }),
		};
	}

	return getStreak(allDates.map((r) => r.expires_at));
};

const handler: Handler = async (event) => {
	try {
		if (event.httpMethod !== "POST") {
			return {
				statusCode: 405,
				body: "Method Not Allowed",
			};
		}

		const body = JSON.parse(event.body || "{}");
		const { user_id, fallback_reading, expiration, current_time } = body;

		if (!user_id) {
			return {
				statusCode: 400,
				body: JSON.stringify({ error: "Missing user_id" }),
			};
		}

		// 1. Check for existing unexpired reading
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
			const streak = await computeStreak(user_id);

			return {
				statusCode: 200,
				body: JSON.stringify({
					reading: existing,
					streak,
					source: "db",
				}),
			};
		}

		// 2. Use fallback if provided
		if (
			fallback_reading &&
			new Date(fallback_reading.expiration) > new Date(current_time)
		) {
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
			};

			const { error: insertErr } = await supabase
				.from("readings")
				.insert([readingToSave]);

			if (insertErr) {
				console.log("ERROR - fallback: ", insertErr.message);

				return {
					statusCode: 500,
					body: JSON.stringify({ error: "Failed to save fallback reading" }),
				};
			}

			const streak = await computeStreak(user_id);

			return {
				statusCode: 200,
				body: JSON.stringify({
					reading: readingToSave,
					streak,
					source: "fallback",
				}),
			};
		}

		// 3. Generate a new one
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
		};

		const { error: insertError } = await supabase
			.from("readings")
			.insert([readingToInsert]);

		if (insertError) {
			console.log("ERROR - newReading: ", insertError.message);
			return {
				statusCode: 500,
				body: JSON.stringify({ error: "Failed to save generated reading" }),
			};
		}

		const streak = await computeStreak(user_id);

		return {
			statusCode: 200,
			body: JSON.stringify({
				reading: readingToInsert,
				streak,
				source: "generated",
			}),
		};
	} catch (err) {
		console.log("ERROR - final: ", err.message);

		return {
			statusCode: 500,
			body: JSON.stringify({ error: "Unexpected server error", detail: err }),
		};
	}
};

export { handler };
