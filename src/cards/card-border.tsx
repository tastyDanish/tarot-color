import { type ReactNode } from "react";
import FoilAnimation from "./foil-animation";
import { cn } from "@/lib/utils";

type Size = "small" | "medium" | "large";

type CardBorderProps = {
  size: Size;
  isFoil?: boolean;
  children: ReactNode;
};

const textureStyle = {
  backgroundImage: "url('/paper-texture.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "30% 0%",
};

const CardBorder = ({ children, isFoil, size }: CardBorderProps) => {
  const getBorder = () => {
    if (size == "small") return "p-1 reounded";
    if (size == "medium") return "p-2 rounded-lg";
    if (size == "large") return "p-4 rounded-xl";
    return "p-2 rounded-l";
  };
  return (
    <div
      className={cn(
        "absolute bg-stone-100 backface-hidden overflow-hidden shadow-md",
        getBorder()
      )}
      style={{ WebkitBackfaceVisibility: "hidden", WebkitPerspective: 0 }}>
      <div className={cn("bg-slate-950 rounded-md p-1")}>
        <div
          className={cn(
            "overflow-hidden  flex justify-center items-center",
            size == "small"
              ? "rounded"
              : size == "medium"
              ? "rounded"
              : "rounded-2xl"
          )}>
          <div className="z-10">{children}</div>
        </div>
      </div>
      <div
        className="absolute inset-0 opacity-40 pointer-events-none z-0"
        style={textureStyle}
      />
      {isFoil && <FoilAnimation />}
    </div>
  );
};

export default CardBorder;
