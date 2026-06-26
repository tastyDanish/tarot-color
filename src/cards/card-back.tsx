import PaperTexture from "@/components/paper-texture";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type CardBackProps = {
  isReversed?: boolean;
  children: ReactNode;
};

const CardBack = ({ children, isReversed }: CardBackProps) => {
  return (
    <div
      className={cn(
        "absolute backface-hidden bg-orange-100 p-4 justify-center items-center rounded-xl overflow-hidden",
        isReversed ? "left-0" : "right-0"
      )}
      style={{
        transform: "rotateY(180deg)",
        WebkitBackfaceVisibility: "hidden",
        WebkitPerspective: 0,
      }}>
      <div className="relative overflow-hidden  flex justify-center items-center rounded-xl bg-amber-950">
        <div className="absolute bg-orange-100 h-full w-1" />
        <div className="absolute bg-orange-100 h-30 w-30 rounded-full transform-x-30" />
        <div className="absolute border-orange-100 border-4 h-40 w-40 rounded-full" />
        <div className="absolute border-orange-100 border-4 h-48 w-48 rounded-full" />

        {children}
      </div>

      <PaperTexture opacity={80} />
    </div>
  );
};

export default CardBack;
