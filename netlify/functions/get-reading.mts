import type { Config, Context } from "@netlify/functions";
import {
	createReading,
	getExistingReading,
	saveFallbackReading,
} from "../data";

export default async (req: Request, context: Context) => {
	try {
		if (req.method !== "POST") {
			return new Response("Method not allowed", { status: 405 });
		}

		const body = await req.json();
		const { user_id, fallback_reading, expiration, current_time } = body;

		if (!user_id) {
			console.log("no user_id?");
			return new Response("missing user id", { status: 400 });
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
