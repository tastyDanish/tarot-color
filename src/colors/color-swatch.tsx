import { capitalize } from "@/lib/string-utils";
import { motion } from "motion/react";
import useSWR from "swr";

const rgbToHex = (rgb: number[]): string =>
  "#" + rgb.map((x) => x.toString(16).padStart(2, "0")).join("");

const fetchPalette = async (): Promise<string[]> => {
  const body = { model: "default" };

  const res = await fetch("/.netlify/functions/colormind", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error("Failed to fetch palette");

  const data = await res.json();
  return data.result.map((rgb: number[]) => rgbToHex(rgb));
};

type ColorSwatchProps = {
  words: string[];
  image: string;
  isVisible: boolean;
};

const ColorSwatch = ({ words, isVisible }: ColorSwatchProps) => {
  const { data, error, isLoading } = useSWR("random-palette", fetchPalette, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 0,
  });

  if (isLoading) return <div className="w-[340px]"></div>;
  if (error) return <div>Error loading palette: {error.message}</div>;

  return (
    <motion.div className=" relative flex flex-col gap-4 h-full w-full text-2xl items-start justify-center overflow-hidden md:pl-4 md:-mt-4">
      {data?.map((color, i) => (
        <motion.div
          key={color}
          className="flex flex-col items-start w-full text-border-white  font-extrabold text2xl rounded-md relative overflow-hidden"
          initial={{ x: -340 }}
          animate={{ x: isVisible ? 0 : -340 }}
          transition={{
            delay: 0.7 + i * 0.3,
            duration: 0.5,
            ease: "easeOut",
          }}
          title={color}>
          <div className="px-4  text-amber-100">
            {capitalize(words[i]?.trim()) ?? "uh oh broken"}
          </div>
          <div
            style={{ backgroundColor: color }}
            className="h-12 rounded-b-md w-full z-20 relative"
          />
          {/* <div
            className="absolute inset-0 opacity-30 pointer-events-none z-0"
            style={textureStyle}
          /> */}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ColorSwatch;
