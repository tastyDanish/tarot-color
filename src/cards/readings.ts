import type { Reading } from "@/stores/use-reading-store";
import { drawCard } from "@/lib/card-utils";

export const generateReading = (expiration: Date): Reading => {
	const card = drawCard();

	const reading: Reading = {
		...card,
		id: "client-side",
		expiration,
	};

	return reading;
};
