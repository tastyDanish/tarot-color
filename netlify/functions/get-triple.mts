import type { Context } from "@netlify/functions";
import {
	errorResponse,
	getExistingTriple,
	insertTriple,
	validatePayload,
} from "../data-triple";

export default async (req: Request, context: Context) => {
	try {
		if (req.method !== "POST") {
			return new Response("Method not allowed", { status: 405 });
		}

		const { user_id, fallback_reading } = await req.json();
		if (!user_id) return new Response("missing user id", { status: 400 });

		const existing = await getExistingTriple(user_id);
		if (existing) return Response.json({ reading: existing });

		// No DB reading: migrate the local one if it's still valid
		const payload = validatePayload(fallback_reading, "fallback");
		if (payload) {
			const { reading } = await insertTriple(user_id, payload);
			return Response.json({ reading });
		}

		// nothing anywhere: client shows the picker
		return Response.json({ reading: null });
	} catch (err) {
		return errorResponse(err);
	}
};
