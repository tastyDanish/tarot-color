import { Handler } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const {
	VITE_SUPABASE_URL,
	SUPABASE_SERVICE_KEY,
} = process.env;

// Connect to our database
const supabase = createClient(
	VITE_SUPABASE_URL ?? "",
	SUPABASE_SERVICE_KEY ?? "",
);

const handler: Handler = async (event) => {
	try {
		if (event.httpMethod !== "POST") {
			return {
				statusCode: 405,
				body: "Method Not Allowed",
			};
		}

		const body = JSON.parse(event.body || "{}");
		const { user_id, reading_id, is_flipped } = body;

		if (!user_id) {
			return {
				statusCode: 400,
				body: JSON.stringify({ error: "Missing user_id" }),
			};
		}

		const { error } = await supabase.from("readings").update({
			is_flipped,
		}).eq("id", reading_id);

		if (error) {
			console.log("ERROR - existing: ", error.message);
			return {
				statusCode: 500,
				body: JSON.stringify({ error: "Error querying readings" }),
			};
		}

		return {
			statusCode: 200,
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
