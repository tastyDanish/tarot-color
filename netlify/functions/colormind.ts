import type { Handler } from "@netlify/functions";
import fetch from "node-fetch"; // Remove this line if you're using Node 18+

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const response = await fetch("http://colormind.io/api/", {
      method: "POST",
      body: event.body,
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error: unknown) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Proxy failed",
        details: error instanceof Error ? error.message : String(error),
      }),
    };
  }
};
