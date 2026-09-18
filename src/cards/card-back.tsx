import PaperTexture from "@/components/paper-texture";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type CardBackProps = {
  children: ReactNode;
};

const CardBack = ({ children }: CardBackProps) => {
  return (
    <div
      className={cn(
        "absolute inset-0 backface-hidden border border-t-amber-100/40 border-l-amber-100/20 border-b-slate-800/40 border-r-slate-800/20 rounded-xl overflow-hidden"
      )}
      style={{
        transform: "rotateY(180deg)",
        WebkitBackfaceVisibility: "hidden",
        WebkitPerspective: 0,
      }}>
      <div className="bg bg-[#211829] p-3 overflow-hidden w-full h-full rounded-xl">
        <div
          className="relative overflow-hidden flex justify-center items-center rounded-xl bg-amber-950 bg-cover bg-center w-full h-full"
          style={{ backgroundImage: "url(/goblin-card-back.png)" }}>
          {children}
        </div>

        <PaperTexture
          opacity={40}
          zLevel="z-10"
        />
      </div>
    </div>
  );
};

export default CardBack;
