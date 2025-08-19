import PaperTexture from "@/components/paper-texture";
import type { ReactNode } from "react";

type CardBackProps = {
  children: ReactNode;
};

const CardBack = ({ children }: CardBackProps) => {
  return (
    <div
      className="absolute backface-hidden bg-orange-100 p-4 justify-center items-center rounded-xl overflow-hidden shadow-md"
      style={{
        transform: "rotateY(180deg)",
        WebkitBackfaceVisibility: "hidden",
        WebkitPerspective: 0,
      }}>
      <div className="relative overflow-hidden  flex justify-center items-center rounded-xl bg-amber-950">
        <div className="absolute bg-orange-100 h-full w-1" />
        <div className="absolute bg-orange-100 h-30 w-30 rounded-full transform-x-30" />
        <div className="absolute border-orange-100 border-4 h-40 w-40 rounded-full" />
        <div className="absolute border-orange-100 border-4 h-50 w-50 rounded-full" />

        {children}
      </div>

      <PaperTexture opacity={80} />
    </div>
  );
};

export default CardBack;
