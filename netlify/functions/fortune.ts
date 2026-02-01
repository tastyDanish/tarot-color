import { Handler } from "@netlify/functions";
import "dotenv/config";
import { drawCard } from "../../src/lib/card-utils";

const handler: Handler = async () => {
	try {
		const newFortune = drawCard();

		const fortune = {
			card_name: newFortune.card.name,
			card_suit: newFortune.card.suit,
			card_order: newFortune.card.order,
			words: newFortune.words,
		};

		return {
			statusCode: 200,
			headers: {
				"Content-Type": "application/json",
				"Cache-Control": "public, max-age=300",
			},
			body: JSON.stringify(fortune),
		};
	} catch (err) {
		if (err instanceof Error) {
			console.log("ERROR - final:", err.message);
		} else {
			console.log("ERROR - final:", err);
		}
		return {
			statusCode: 500,
			body: JSON.stringify({ error: "Unexpected server error", detail: err }),
		};
	}
};

export { handler };
