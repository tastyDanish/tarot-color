import type { Reading } from "@/stores/use-reading-store";
import type { Database } from "@/lib/database.types";

type ReadingRow = Database["public"]["Tables"]["readings"]["Row"];

export const mapDbReadingToReading = (
	reading: ReadingRow,
	streak: number = 1,
): Reading => {
	const variations = Array.isArray(reading.variations)
		? reading.variations
		: [];

	return {
		card: {
			name: reading.card_name,
			image: reading.alternate_art ?? reading.card_image, // fallback if alternate_art exists
			description: "", // fill if you want or leave empty
			reversed: "", // fill if you want or leave empty
			suit: reading.card_suit as
				| "Major"
				| "Cups"
				| "Wands"
				| "Swords"
				| "Pentacles",
			order: reading.card_order,
		},
		words: reading.words as { word: string; color: string }[], // cast Json to expected type
		expiration: new Date(reading.expires_at),
		new: false,
		foil: variations.includes("foil"),
		reversed: variations.includes("reversed"),
		streak,
	};
};
