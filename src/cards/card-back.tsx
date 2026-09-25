import PaperTexture from "@/components/paper-texture";
import { cn } from "@/lib/utils";
import { type CardSize, SIZE_CLASSES } from "./types";

type CardBackProps = {
  size?: CardSize;
};

const CardBack = ({ size = "large" }: CardBackProps) => {
  return (
    <div
      className={cn(
        "absolute inset-0 backface-hidden border border-t-amber-100/40 border-l-amber-100/20 border-b-amber-100/20 border-r-amber-100/20 rounded-xl overflow-hidden"
      )}
      style={{
        transform: "rotateY(180deg)",
        WebkitBackfaceVisibility: "hidden",
        WebkitPerspective: 0,
      }}>
      <div className="bg bg-[#211829] p-3 overflow-hidden w-full h-full rounded-xl flex justify-center items-center">
        <div
          className={cn(
            "relative overflow-hidden flex justify-center items-center rounded-xl bg-amber-950 bg-cover bg-center",
            SIZE_CLASSES[size]
          )}
          style={{ backgroundImage: "url(/goblin-card-back.png)" }}></div>

        <PaperTexture
          opacity={40}
          zLevel="z-10"
        />
      </div>
    </div>
  );
};

export default CardBack;
