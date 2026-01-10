import { Handler } from "@netlify/functions";
import "dotenv/config";
import {
	createReading,
	getExistingReading,
	saveFallbackReading,
} from "../data";

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

		const result = await getExistingReading(user_id, current_time);
		if (result) return result;

		if (
			fallback_reading &&
			new Date(fallback_reading.expiration) > new Date(current_time)
		) {
			return await saveFallbackReading(fallback_reading, user_id);
		}

		return await createReading(user_id, expiration);
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
