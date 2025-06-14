import { rgbToHex } from "./color-utils";

export const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  });

export const fetchPalette = async (): Promise<string[]> => {
  const body = { model: "default" };
  const res = await fetch("/.netlify/functions/colormind", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("Failed to fetch palette");
  const data = await res.json();
  return data.result.map((rgb: number[]) => rgbToHex(rgb));
};
