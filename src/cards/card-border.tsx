import { type ReactNode } from "react";
import FoilAnimation from "./foil-animation";
import { cn } from "@/lib/utils";
import PaperTexture from "@/components/paper-texture";

type Size = "small" | "medium" | "large";

type CardBorderProps = {
  size: Size;
  isFoil?: boolean;
  isReversed?: boolean;
  children: ReactNode;
};

const CardBorder = ({
  children,
  isReversed,
  isFoil,
  size,
}: CardBorderProps) => {
  const getBorderRounded = () => {
    if (size == "small") return "rounded";
    if (size == "medium") return "rounded-lg";
    if (size == "large") return "rounded-xl";
    return "rounded-l";
  };

  const getBorderPadding = () => {
    if (size == "small") return "p-1";
    if (size == "medium") return "p-2";
    if (size == "large") return "p-3";
    return "p-2";
  };

  return (
    <div
      className={cn(
        "relative bg-stone-100 rounded-xl w-full h-full overflow-hidden backface-hidden shadow-xl  border border-amber-950/25 border-t-amber-50/25 border-l-amber-50/25",
        getBorderRounded(),
        isReversed ? "left-0" : "right-0"
      )}
      style={{ WebkitBackfaceVisibility: "hidden", WebkitPerspective: 0 }}>
      <div
        className={cn(
          "relative w-full h-full overflow-hidden flex items-center justify-center",
          getBorderPadding(),
          getBorderRounded()
        )}>
        <div
          className={cn(
            "bg-slate-950 rounded-md p-1 w-full h-full flex items-center justify-center"
          )}>
          <div
            className={cn(
              "overflow-hidden  flex justify-center items-center w-full",
              size == "small"
                ? "rounded"
                : size == "medium"
                  ? "rounded"
                  : "rounded-2xl"
            )}>
            <div className="z-10">{children}</div>
          </div>
        </div>
        <PaperTexture opacity={60} />
        {isFoil && <FoilAnimation />}
      </div>
    </div>
  );
};

export default CardBorder;
