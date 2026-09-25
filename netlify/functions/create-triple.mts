import type { Context } from "@netlify/functions";
import { errorResponse, insertTriple, validatePayload } from "../data-triple";

export default async (req: Request, context: Context) => {
	try {
		if (req.method !== "POST") {
			return new Response("Method not allowed", { status: 405 });
		}

		const { user_id, reading } = await req.json();
		if (!user_id) return new Response("missing user id", { status: 400 });

		const payload = validatePayload(reading, "fresh");
		if (!payload) return new Response("invalid reading", { status: 400 });

		const result = await insertTriple(user_id, payload);

		// 409 tells the client "you already have one", with that reading attached
		return Response.json(
			{ reading: result.reading },
			{ status: result.created ? 200 : 409 },
		);
	} catch (err) {
		return errorResponse(err);
	}
};
