import type { Config, Context } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";

const {
	VITE_SUPABASE_URL,
	SUPABASE_SERVICE_KEY,
} = process.env;

// Connect to our database
const supabase = createClient(
	VITE_SUPABASE_URL ?? "",
	SUPABASE_SERVICE_KEY ?? "",
);

export default async (req: Request, context: Context) => {
	try {
		if (req.method !== "POST") {
			return new Response("Method not allowed", { status: 405 });
		}

		const body = await req.json();
		const { user_id, reading_id, is_flipped } = body;

		if (!user_id) {
			return new Response("missing user id", { status: 400 });
		}

		const { error } = await supabase.from("readings").update({
			is_flipped,
		}).eq("id", reading_id);

		if (error) {
			console.log("ERROR - existing: ", error.message);
			return new Response("Error querrying reading", { status: 500 });
		}

		return new Response("Card is flipped!");
	} catch (err) {
		if (err instanceof Error) {
			console.log("ERROR - final:", err.message);
		} else {
			console.log("ERROR - final:", err);
		}
		return new Response(
			JSON.stringify({ error: "Unexpected server error", detail: err }),
			{ status: 500 },
		);
	}
};
