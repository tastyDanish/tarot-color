import { capitalize } from "@/lib/string-utils";
import { motion } from "motion/react";
import useSWR from "swr";

const rgbToHex = (rgb: number[]): string =>
  "#" + rgb.map((x) => x.toString(16).padStart(2, "0")).join("");

const fetchPalette = async (): Promise<string[]> => {
  const body = { model: "default" };

  const res = await fetch("http://colormind.io/api/", {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error("Failed to fetch palette");

  const data = await res.json();
  return data.result.map((rgb: number[]) => rgbToHex(rgb));
};

type ColorSwatchProps = {
  words: string[];
};

const ColorSwatch = ({ words }: ColorSwatchProps) => {
  const { data, error, isLoading } = useSWR("random-palette", fetchPalette, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 0,
  });

  if (isLoading) return <div></div>;
  if (error) return <div>Error loading palette: {error.message}</div>;

  return (
    <div className="flex flex-col gap-8 text-2xl items-start px-4 w-full pb-4">
      {data?.map((color, i) => (
        <motion.div
          key={color}
          className="flex flex-col items-start w-full"
          title={color}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: i * 0.2 + 0.2,
            duration: 0.5,
            ease: "easeOut",
          }}>
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.2 + 0.1, duration: 0.4 }}>
            {capitalize(words[i]?.trim()) ?? "uh oh broken"}
          </motion.div>

          <motion.div
            className="md:w-48 w-full h-10 rounded mt-2"
            style={{ backgroundColor: color }}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.2 + 0.2, duration: 0.4 }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default ColorSwatch;
