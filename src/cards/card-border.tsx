import { type ReactNode } from "react";
import FoilAnimation from "./foil-animation";
import { cn } from "@/lib/utils";

type CardBorderProps = {
  isSmall?: boolean;
  isFoil?: boolean;
  children: ReactNode;
};

const textureStyle = {
  backgroundImage: "url('/paper-texture.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "30% 0%",
};

const CardBorder = ({ children, isFoil, isSmall }: CardBorderProps) => {
  return (
    <div
      className={cn(
        "absolute bg-stone-100 backface-hidden overflow-hidden shadow-md",
        isSmall ? "p-1 rounded" : "p-4 rounded-xl"
      )}
      style={{ WebkitBackfaceVisibility: "hidden", WebkitPerspective: 0 }}>
      <div className="bg-slate-950 p-1 rounded-md">
        <div
          className={cn(
            "overflow-hidden  flex justify-center items-center",
            isSmall ? "rounded" : "rounded-2xl"
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
