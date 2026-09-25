import type { Context } from "@netlify/functions";
import { errorResponse, setPhaseFlipped } from "../data-triple";

export default async (req: Request, context: Context) => {
	try {
		if (req.method !== "POST") {
			return new Response("Method not allowed", { status: 405 });
		}

		const { user_id, reading_id, index } = await req.json();
		if (!user_id || !reading_id || !Number.isInteger(index) || index < 0) {
			return new Response("bad request", { status: 400 });
		}

		await setPhaseFlipped(user_id, reading_id, index);
		return Response.json({ ok: true });
	} catch (err) {
		return errorResponse(err);
	}
};
