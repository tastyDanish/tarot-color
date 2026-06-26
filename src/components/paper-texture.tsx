import { cn } from "@/lib/utils";
import { useMemo } from "react";

type PaperTextureProps = {
  opacity: number;
  zLevel?: string;
};

const PaperTexture = ({ opacity, zLevel }: PaperTextureProps) => {
  const randomTextureStyle = useMemo(() => {
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const flipX = Math.random() > 0.5 ? -1 : 1;
    const flipY = Math.random() > 0.5 ? -1 : 1;

    return {
      backgroundImage: "url('/paper-texture.jpg')",
      backgroundSize: "cover",
      backgroundPosition: `${x}% ${y}%`,
      transform: `scale(${flipX}, ${flipY})`,
    };
  }, []);

  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none mix-blend-multiply",
        zLevel ? zLevel : "z-40"
      )}
      style={{ ...randomTextureStyle, opacity: opacity / 100 }}
    />
  );
};

export default PaperTexture;
